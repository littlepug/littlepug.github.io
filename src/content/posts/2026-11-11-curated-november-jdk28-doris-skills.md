---
title: 十一月中旬技术精选：JDK 28 前瞻与向量搜索调优
date: 2026-11-11
categories: curated
tags: [curated, ai, java, spring, bigdata, tools]
keywords: 技术精选, JDK 28, Structured Concurrency, Value Objects, Simple JSON API, Spring AI 2.1, Elasticsearch 向量搜索, vectordb_document, Apache Doris Peer Read, anthropics skills, Worktrunk
excerpt: 十一月中旬技术精选聚焦后端开发者：JDK 28 早期访问版把结构化并发转正、引入 Value Objects 与标准 JSON API；Spring AI 2.1 支持自带向量与推理回放；Elasticsearch 9.5 用 vectordb_document 一个设置搞定向量搜索调优；Apache Doris 4.2 Peer Read 让存算分离冷查询提速 7.5 倍；另有 anthropics/skills 官方技能仓库与 Rust 工具 Worktrunk。每条附原文链接，可验证。
cover: /images/covers/curated-november-11-2026.svg
---

十一月中旬，后端技术圈有两条主线：一是 Java 语言本身的迭代节奏——JDK 28 早期访问版把结构化并发推上转正轨道，Value Objects 与标准 JSON API 同期亮相；二是「向量搜索」成为大数据组件的主战场——Elasticsearch 用单个索引设置搞定向量调优，Apache Doris 用 Peer Read 把存算分离的冷查询压缩到原来的七分之一。AI 侧，Spring AI 2.1 补上了自带向量与推理回放，GitHub 热榜被官方技能仓库刷屏。本期精选 **6 条** 内容，每条附「是什么 / 为什么值得看 / 适合谁」。

## 代码小技巧

### 1. JDK 28 早期访问：结构化并发转正，Value Objects 与标准 JSON API 同批亮相

- **是什么**：11 月 6 日更新的 JDK 28 早期访问版 Release Notes 揭示了几个值得后端关注的 JEP。最重的一条是 **JEP 543 Structured Concurrency**——与 401 的「Preview」标注不同，它没有标注预览，呼应了 Oracle 团队在 Devoxx Belgium 上的表态：结构化并发拟在 JDK 28 转正。同期还有 **JEP 401 Value Objects（Preview）**、**JEP 540 Simple JSON API（Incubator）**、**JEP 544 Ahead-of-Time Code Compilation**，以及 ZGC 的两条改进（**JEP 545** 更快启动预热、**JEP 546** 自适应堆）。

  结构化并发的核心是把「一组相关任务」当作一个工作单元来管理，补齐了虚拟线程留下的「协调」缺口：

```java
// 传统写法：两个 Future 各自为战，取消与错误处理要手动协调
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    Future<Customer> customer = scope.fork(() -> fetchCustomer(id));
    Future<Order>    order    = scope.fork(() -> fetchOrder(id));

    scope.join();                          // 等待所有子任务完成
    scope.throwIfFailed();                 // 任一失败即抛出，其余自动取消

    return new Invoice(customer.resultNow(), order.resultNow());
}
// 关闭 scope 时，保证所有子任务已终止，父子关系进入线程转储
```

  `fork()` 默认跑在虚拟线程上，`join()` 统一等待，一个子任务失败会触发兄弟任务取消，`close()` 保证子任务在作用域退出前收尾。配合 `Joiners`（`anySuccessfulOrThrow()` 等策略）和超时控制，并发的生命周期第一次和代码结构对齐。

- **为什么值得看**：虚拟线程解决的是「可扩展性」，不是「协调」。这套 API 让取消、异常、父子任务关系变得可推理——结构化线程转储能把并发任务还原成一棵树，排查死锁和悬挂远比现在的一堆平铺线程容易。而 Value Objects（无对象身份、按字段值判等）配合未来可能的扁平内存布局，是 Java 向数据导向编程迈出的又一步；标准 JSON API 则试图终结「每个项目都得引 Jackson/Gson」的历史。

- **适合谁**：正在或计划升级到 Java 21+/27 的后端团队，以及想用结构化并发替代手写 `CompletableFuture` 编排的开发者。

- **链接**：[JDK 28 Early-Access Release Notes](https://jdk.java.net/28/release-notes) · [Structured Concurrency Looms: Java's Next Concurrency Revolution — vvauban.com](https://blog.vvauban.com/blog/structured-concurrency-looms-java-s-next-concurrency-revolution.amp)

## Spring Boot 实践

### 2. Spring AI 2.1：自带向量（BYO Embeddings）+ 推理回放，向量写入不再被强制重算

- **是什么**：Spring AI 2.1.0-RC1（11 月 2 日前后）补上了两个务实能力。其一是 **Bring-Your-Own Embeddings**：新增 `VectorStore.upsert(List<Document>)`，允许把文档连同**预先算好的 `float[]` 向量**一起写入，`similaritySearch(float[], SearchRequest)` 则支持直接用查询向量检索；`topK`、相似度阈值、元数据过滤照常生效，`EmbeddedDocument` 在构造时就拒绝空向量和非有限值。这解决了一个长期痛点——过去 `VectorStore.add()` 总调用 store 配置的嵌入模型，批量导向量时要么重复烧 embedding 成本、要么绕道。

  其二是 **推理回放（Reasoning Replay）**：消息被建模为有序的 part 列表，推理过程、签名、工具调用在跨请求时不再丢失，也避免了多轮对话里「HTTP 400 或静默丢失前面推理」的问题。

  同期的 **Spring Cloud 2026.0.0-RC2（Paddington）** 也值得关注：Spring Cloud Config 新增 Google Cloud Storage 作为配置后端，可返回纯文本/二进制文件；Gateway 的 Server Web MVC 版补上 `LocalResponseCache` 过滤器；OpenFeign 支持嵌套 `@SpringQueryMap` 对象展开为嵌套查询参数。

```java
// 自带向量写入：向量来自批量任务或迁移，无需再次调用嵌入模型
float[] precomputed = embeddingModel.embed("green velvet armchair");
var doc = new EmbeddedDocument("sku-12345", precomputed, Map.of("sku", "12345"));
vectorStore.upsert(List.of(doc));

// 直接用查询向量检索
vectorStore.similaritySearch(embeddingModel.embed("绿色天鹅绒扶手椅"),
    SearchRequest.builder().topK(5).build());
```

- **为什么值得看**：向量检索是 RAG 和 Agent 的底座，而「向量成本」是多数团队最容易被忽略的一笔账。自带向量意味着向量可以来自批量任务、跨模型复用，甚至一次算好多处用，不必被 store 绑死在某个嵌入模型上。这对预算敏感、又想把 Elasticsearch/PGvector/Redis 当向量库的 Java 团队尤其实在。

- **适合谁**：用 Spring AI 构建 RAG/Agent 应用的 Java 团队；以及想把 Spring Cloud 配置迁到 GCS 的 Google Cloud 用户。

- **链接**：[Spring Ecosystem Update: Boot 4.2 and Framework 7.1 Hit RC1, Spring AI 2.1 Adds BYO Embeddings — JavaRubberDuck（2026-11-02）](https://javarubberduck.com/java/news-2026-11-02-spring) · [Spring Ecosystem Update: Boot 4.2.0-RC2, Paddington RC2 GCS Backend — JavaRubberDuck（2026-11-08）](https://javarubberduck.com/java/news-2026-11-08-spring)

## 大数据组件调优

### 3. Elasticsearch 9.5：`vectordb_document` 一个设置搞定向量搜索调优

- **是什么**：Elasticsearch 9.5（及 Serverless）引入 `vectordb_document` 索引模式，目标是把向量搜索的调优从「一坨配置旋钮」收敛到「一个设置」。它做三件事：用 bfloat16 存原始向量（磁盘占用减半）、把向量数据结构预加载进文件系统缓存、让 segment 合并以不受限且并行方式运行。建索引时一行 `"mode": "vectordb_document"` 即可。

  官方在四个数据集（20M 维 512 / 10M 维 1024 / 1M 维 3072 / 2.7M 维 4096）上跑单节点基准：配合 `bbq_hnsw` 时，高召回率下 QPS 最高提升约 2 倍；配合 `bbq_disk` 时，索引到可搜索状态的时间缩短约 20%，全程无需手动调优。收益来自两个叠加效应——bfloat16 让每个重排候选少读一半字节，而不受限的并行合并留下更少、更大的图（14–21 个 segment 对比 22–29 个），oversample 的边际成本被大幅压低。

```json
// 一行设置，向量搜索调优开箱即用（所有订阅档含 Basic 均可用）
PUT my-index
{
  "settings": { "index": { "mode": "vectordb_document" } }
}
```

- **为什么值得看**：向量搜索最耗计算的部分正是 oversample（HNSW 用 k×oversample 个候选换召回率），而 `vectordb_document` 恰好把最贵的那一段省下来了。对于「想做向量检索但不想养一个专职调优专家」的团队，这是把经验内化成默认值的典型示范。需要提醒的是，该模式在 9.5 作为新特性落地（8 月随 9.5 发布），并非本周刚出——把它当作「向量检索选型时的官方默认起点」更合适，具体 QPS 收益以你自己的数据规模实测为准。

- **适合谁**：在 Elasticsearch 上做向量检索/RAG 的后端团队，以及从专用向量数据库迁回 ES 以统一技术栈的架构师。

- **链接**：[One setting for production vector search: How vectordb_document mode tunes Elasticsearch automatically — Elastic](https://www.elastic.co/search-labs/blog/elasticsearch-vector-search-vectordb-document-mode) · [What's new in Elastic 9.5 — Elastic Discuss](https://discuss.elastic.co/t/what-s-new-in-elastic-9-5/388970)

### 4. Apache Doris 4.2 Peer Read：存算分离下跨计算组复用缓存，冷查询提速 7.5 倍

- **是什么**：即将发布的 Apache Doris 4.2 引入 Peer Read 机制，解决存算分离架构的一个结构性痛点——数据共享了、缓存没共享。此前，多个计算组（读写分离、离线隔离、弹性扩缩容）各自维护独立的本地 File Cache，读取组首次访问新写入数据时只能回源对象存储，单条主键点查延迟可达数秒；扩缩容后新节点本地缓存为空，性能也要一段时间才能恢复。

  Peer Read 的思路很直接：本地缓存未命中时，优先从「可能已缓存该数据」的其他节点（包括其他计算组）读取；对端没有或响应过慢，再回源对象存储。候选节点来源有二：扩缩容时由 FE 指定原 BE 作为最高优先级候选，以及查询时动态发现。实测某用户业务场景开启 Peer Read 后：主键点查冷查询平均耗时从 4.45 秒降到 0.59 秒（约 7.5 倍），P99 从 7.69 秒降到 1.52 秒，对象存储请求次数减少约 98%；TPC-H 1TB 冷读测试中 22 条查询总耗时降低约 51%。

- **为什么值得看**：这暴露了存算分离一个容易被低估的成本——缓存是「每计算组一份」，而对象存储的单次请求延迟远高于本地磁盘，冷查询往往被几十上百次小块 Footer/索引读取拖垮。Peer Read 不引入新缓存服务，直接复用各 BE 的 File Cache 做跨节点共享，是对「缓存孤岛」的轻量解法。对维护 Doris 存算分离集群的数据平台团队，这是扩缩容后性能抖动、读写分离首查慢这两个老问题的官解。

- **适合谁**：使用 Doris 存算分离架构的数据平台/后端团队，以及关注「对象存储 + 本地缓存」架构如何平衡成本与延迟的架构师。

- **链接**：[存算分离冷查询提速 7.5 倍！Apache Doris 4.2 Peer Read 实现跨计算组缓存复用 — SelectDB](https://www.selectdb.com/blog/1774)（InfoQ 写作社区转载：[点此](https://xie.infoq.cn/article/00420bac2553157a6e4235ca8)）

## AI 编程与 Agent

### 5. anthropics/skills：官方技能仓库冲上热榜，一个文件夹就是一份 SKILL.md

- **是什么**：`anthropics/skills` 是 Anthropic 官方的 Agent Skills 仓库，本周一度冲上 GitHub 热榜第一（11 月 10 日快照约 19 万 Star，Apache-2.0）。它的模型极简：一个 skill 就是一个带 `SKILL.md` 的文件夹，里面用 frontmatter（name、description）加正文告诉 Claude「按什么流程做某件专项任务」。仓库里既有创意设计、Web 测试、企业工作流等示例，也包含驱动 Claude 文档能力的 docx/pdf/pptx/xlsx 四组技能——README 明确说这批是「在真实生产里跑着」的参考实现。在 Claude Code 里一行 ` /plugin marketplace add anthropics/skills` 即可安装。

- **为什么值得看**：Skills 正在成为继 MCP 之后 Agent 扩展机制的第二个标准层——MCP 接工具、Skills 接「流程与上下文」。对后端开发者尤其有用的是两点：一是官方仓库给出了「一个 skill 该怎么写」的规范样本，照着改就能把团队的代码规范、部署流程、on-call 手册固化成 Claude 可加载的技能包；二是这波「技能生态」爆发的信号——同期的 `obra/superpowers`、`vercel-labs/agent-skills` 等第三方仓库也在快速涨星，说明可复用技能正在从个人 hack 变成团队资产。注意 Star 数各方口径不一，以仓库为准（待核实）。

- **适合谁**：重度使用 Claude Code 的后端开发者，以及想把团队内部规范沉淀成可复用 Agent 技能的技术负责人。

- **链接**：[anthropics/skills — GitHub](https://github.com/anthropics/skills)（Star 数待核实） · [GitHub 今日热榜 2026-11-10 — CSDN DevPress](https://devpress.csdn.net/aibjcy/6af27ce1e5f4ca4eff8f8396.html)

## 工具推荐

### 6. Worktrunk：Rust 写的 Git worktree 管理器，并行开多个 Agent 不再打架

- **是什么**：`max-sixty/worktrunk` 是一个用 Rust 写的命令行工具，把 Git worktree 做得像分支一样顺手，专为「并行跑多个 AI 编码 Agent」的场景而生。它本周登上 GitHub 周榜，Star 约 1 万+，MIT OR Apache-2.0 双许可。核心命令只有几个：`wt switch` 切/建工作区、`wt list` 看全部状态、`wt merge` 合并、`wt remove` 收尾清理——用分支名寻址、路径由可配置模板生成，你不再需要背 `../repo.feat` 到底在哪。

  对并行 Agent 工作流最实用的是这条：

```bash
# 一条命令开一个「Agent 工位」：建 worktree → 切过去 → 启动 Claude Code
wt switch -c -x claude feature-auth -- '给用户模块加鉴权'
wt switch -c -x claude feature-b     -- '修掉分页的 off-by-one'
wt switch -c -x claude feature-c     -- '给 API 补集成测试'
```

  `-x` 表示切换后直接执行命令，`--` 后面的内容原样作为初始 prompt 传给 Agent。三条命令、三个独立目录、三个并行开工的 Agent，互不踩脚。额外能力包括：在 APFS/btrfs/XFS 上用写时复制共享 `node_modules/`、`target/` 等构建缓存（开新工位几乎零冷启动）、`wt switch pr:123` 直接切到某个 PR 分支、`wt merge main` 一次完成 squash/rebase/合并/清理，以及基于 diff 生成 LLM commit message。

- **为什么值得看**：并行 Agent 最大的麻烦不是模型，是**目录打架**——几个 Agent 挤一个工作区，迟早有人改错文件。Git worktree 是官方给的隔离手段，但原生命令啰嗦（建一个 worktree 要把分支名打三遍）。Worktrunk 把它收成短命令，还把「建工位 → 跑 Agent → 合代码」串成一条线。和 Orca 这类带 GUI 的编排器不同，它更底层、更轻，可以和任何能从终端启动的 Agent 组合使用。需要留意的是共享缓存只支持 APFS/btrfs/XFS 三种文件系统，强制删除 worktree 的 `-f` 存在丢弃未提交工作的风险，合并前先确认。

- **适合谁**：日常并行开多个任务、常用 Claude Code 或 Codex 的开发者；以及想让「多 Agent 并行」变成日常默认工作流的团队。

- **链接**：[max-sixty/worktrunk — GitHub](https://github.com/max-sixty/worktrunk)（Star 数各方口径不一，以仓库为准，待核实） · [Worktrunk Wraps Git Worktrees for 5 to 10 Parallel Coding Agents — theterminal.space](https://theterminal.space/software/worktrunk-git-worktree-cli-agents-10k-stars)

## 来源

1. [JDK 28 Early-Access Release Notes — OpenJDK](https://jdk.java.net/28/release-notes)
2. [Structured Concurrency Looms: Java's Next Concurrency Revolution — vvauban.com](https://blog.vvauban.com/blog/structured-concurrency-looms-java-s-next-concurrency-revolution.amp)
3. [Spring Ecosystem Update: Boot 4.2 / Framework 7.1 RC1, Spring AI 2.1 BYO Embeddings — JavaRubberDuck（2026-11-02）](https://javarubberduck.com/java/news-2026-11-02-spring)
4. [Spring Ecosystem Update: Boot 4.2.0-RC2, Paddington RC2 GCS Backend — JavaRubberDuck（2026-11-08）](https://javarubberduck.com/java/news-2026-11-08-spring)
5. [One setting for production vector search: vectordb_document mode — Elastic](https://www.elastic.co/search-labs/blog/elasticsearch-vector-search-vectordb-document-mode)
6. [What's new in Elastic 9.5 — Elastic Discuss](https://discuss.elastic.co/t/what-s-new-in-elastic-9-5/388970)
7. [存算分离冷查询提速 7.5 倍！Apache Doris 4.2 Peer Read — SelectDB](https://www.selectdb.com/blog/1774)
8. [anthropics/skills — GitHub](https://github.com/anthropics/skills)
9. [GitHub 今日热榜 2026-11-10 — CSDN DevPress](https://devpress.csdn.net/aibjcy/6af27ce1e5f4ca4eff8f8396.html)
10. [max-sixty/worktrunk — GitHub](https://github.com/max-sixty/worktrunk)
11. [Worktrunk Wraps Git Worktrees for Parallel Coding Agents — theterminal.space](https://theterminal.space/software/worktrunk-git-worktree-cli-agents-10k-stars)
