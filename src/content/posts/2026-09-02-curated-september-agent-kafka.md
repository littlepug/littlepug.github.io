---
title: 九月技术精选：终端 Agent 爆火与 Kafka 调优
date: 2026-09-02
categories: curated
tags: [curated, ai, java, spring, bigdata, tools]
keywords: pi Agent Harness, Hibernate 批量插入, Spring Boot 4, Quarkus 3.27, Colibri 纯C推理, Kafka 调优, 终端编码 Agent
excerpt: 本周终端编码 Agent 赛道迎来新黑马——由 Flask 作者 Armin Ronacher 团队打造的 pi，以「一个二进制替代整套 Agent 框架」的理念一周涨粉数千。Java 侧，一条 @Transactional 批处理技巧把批量写入从 N+1 查询砍到 2 条 SQL；Spring Boot 4 与 Quarkus 3.27 的选型对比帮你厘清迁移取舍。另附纯 C 推理引擎 Colibri 与 Kafka 三套调优 Profile。
cover: /images/covers/curated-september-02-2026.svg
---

进入九月，两条主线在技术社区同时升温：一边是「Agent 运行时」的持续内卷——继 OpenAI 开源 Codex Harness 之后，又一款主打「极简内核」的终端编码 Agent 蹿红，把 Agent 工程之争从「谁家框架更全」推向「谁的内核更小」；另一边是后端老本行的「调优」话题——Hibernate 批量写入、Kafka 三套调优 Profile、Spring Boot 4 与 Quarkus 的选型，都是能直接落进生产环境的手艺活。本期精选围绕这两条主线，各挑了几条值得看的内容。

## 工具推荐

### earendil-works/pi：一个二进制替代整套 Agent 框架

**是什么**：`earendil-works/pi` 是一款 MIT 协议、用 TypeScript 写的极简终端编码 Agent harness，定位是「统一 LLM API + Agent 循环 + TUI + 编码 CLI，全部打包进一个进程」。它的作者是 libGDX 创始人 Mario Zechner，背后公司 Earendil 的联合创始人里有一位是 Flask 作者 Armin Ronacher。项目默认只提供 `read`、`write`、`edit`、`bash` 四个工具，系统提示词仅十来行，外加项目根目录的 `AGENTS.md` 约定。第三方榜单口径显示其 star 已逼近 10 万，本周周增约 3400+（增速居前，具体以 [GitHub 仓库](https://github.com/earendil-works/pi) 为准）。

```bash
# 一次性提问，输出结果即退出
pi -p "总结一下这个代码库的架构"

# 管道输入
cat README.md | pi -p "把这段文档翻译成英文"

# 只读模式（仅暴露指定工具）
pi --tools read,grep,find,ls -p "审查这个项目的安全问题"
```

交互模式下它还提供一批实用命令：`/model` 切换模型、`/compact` 手动压缩上下文（长会话省 token）、`/tree` 回到任意历史节点重开分支、`/fork` 从某条消息分叉出全新会话、`/share` 导出为 Gist。项目根目录放一个 `AGENTS.md` 就能让 pi 记住团队约定（如「本项目用 pnpm」「组件写在 src/components」），每次启动自动加载。

**为什么值得看**：它代表了一种清晰的工程主张——**Agent 不需要框架，Agent 需要一个能跑的最小内核**。当 LangChain 们还在用「组合表达智能」时，pi 已经用「进程边界表达工程」：`npm i -g` 一行装完，本地离线可跑，BYOK（自带模型 Key）接任意 provider，也能走 Ollama/vLLM 跑本地开源模型。对不想被 ChatGPT 界面锁定、又嫌弃重框架学习曲线的开发者来说，这是一条「可读、可扩展、可审查」的轻量路线。

**适合谁**：想自己掌控 Agent 运行时、做终端内 AI 结对编程的开发者；正在比较 Claude Code / OpenCode / Cursor 之外更轻量替代方案的小团队。

### Colibri：纯 C 引擎把 744B MoE 模型塞进 25GB 内存的笔记本

**是什么**：`JustVugg/colibri` 是一个 Apache-2.0、纯 C 编写、零运行时依赖的推理引擎，核心只有约 1300 行 C 代码（无 CUDA、无 PyTorch、无 BLAS）。它利用 MoE 模型「每个 token 只激活约 40B 参数」的结构特性，只把模型的稠密部分（注意力、共享专家、词嵌入，int4 约 9.9GB）常驻内存，而把 21,504 个路由专家（约 370GB）按需从 NVMe 磁盘流式加载，从而让 744B 参数的 GLM-5.2 在一台约 25GB 内存的消费级机器上跑起来。配套还有原生多 token 预测（MTP）投机解码、压缩 KV 缓存持久化、以及一个 OpenAI 兼容的 HTTP 网关。

```bash
git clone https://github.com/JustVugg/colibri.git
cd colibri/c && ./setup.sh
# 指向预转换的 int4 权重后交互式对话
COLI_MODEL=/path/to/GLM-5.2-colibri-int4 ./coli chat
# 启动 OpenAI 兼容 API 服务
./coli serve
```

**为什么值得看**：它是一次「工程上很惊艳」的示范——把 VRAM、RAM、NVMe 当作三层异构存储，像 JIT 编译器只编译热路径那样，只「即时」加载路由证明需要的专家权重。作者 7 月 9 日发布在 Show HN 后拿到 769 分，本周仍在 GitHub Trending 上被反复提及。需要诚实说明两点：一是速度不快（作者 WSL2 冷启动约 0.05–0.1 token/s，热投机解码约 2.2–2.8 token/forward，社区在 Apple M5 Max 上实测约 1 token/s）；二是「磁盘占用 370GB」换来的是「内存只要 25GB」，本质是空间换空间的权衡，而非免费午餐。

**适合谁**：对本地推理、MoE 系统架构、存储层次优化感兴趣的后端/系统工程师；想不花 GPU 集群的钱就把前沿开源模型跑起来做实验的开发者。纯业务后端可「了解即可」。

## 代码小技巧

### @Transactional 只负责事务，不负责批处理：Hibernate 批量插入

**是什么**：dev.to 上一篇高赞短文点破了一个「8/10 代码审查里都会犯」的误区——`@Transactional` 管的是事务边界，**并不会**把循环里的多次 `save()` 合并成批量 SQL。典型的反模式是：在一个 `@Transactional` 方法里 `for` 循环 `itemRepository.save(item)`，50 个子项就产生 50 次往返，属典型的 N+1 问题。

```java
@Transactional
public Order placeOrder(OrderDto dto) {
    Order order = new Order();
    orderRepository.save(order);           // 先保存父实体
    List<Item> items = dto.getItems().stream()
        .map(i -> new Item(i, order))
        .collect(Collectors.toList());
    itemRepository.saveAll(items);         // 一次批量 INSERT 全部子项
    return order;
}
```

关键在 `application.properties` 里显式开启 Hibernate 批处理（默认是关闭的）：

```properties
spring.jpa.properties.hibernate.jdbc.batch_size=50
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
```

**为什么值得看**：作者的实测结论是：50 个子项从「51 条 SQL」降到「2 条 SQL」，响应时间约快 40%，数据库负载大幅下降。这是一条「改一行配置 + 换一个 API」就能立刻落地的优化，比空谈「连接池调大」「加缓存」实在得多。补充一句注意事项：批量插入要配合 `GenerationType.SEQUENCE`（或显式分配主键）使用，`GenerationType.IDENTITY` 下 Hibernate 无法真正批处理，这也是很多人开了 batch_size 却发现没效果的原因。

**适合谁**：写 JPA/Hibernate 数据写入路径的后端开发者，尤其是批量导入、订单明细、日志落库这类「一次写多条」的场景。

## 技术科普

### Spring Boot 4 vs Quarkus 3.27：同一份需求，两条技术路线

**是什么**：dev.to 上一篇 2026 年 8 月底的对比文，把两个「同期都发了大版本」的 Java 框架拉到一个标准化场景里比较：REST 接口 + 一次 Postgres 查询，跑在 4 vCPU / 8GB 的 Kubernetes 上。文章核心不是「谁更快」的武断结论，而是把两者真正的结构性差异讲清楚——Spring Boot 4 的答案是**运行时模块化**（把 2.1MB 的单体 `spring-boot-autoconfigure` 拆成 70+ 个独立模块，PetClinic 示例里该 JAR 瘦身到 371KB，换来更快的启动、更小的 native image 和更干净的 IDE 提示），Quarkus 3.27 的答案是**编译期依赖注入**（DI 在构建期完成，启动时无反射扫描，这是它天生快和干净编译 native image 的根因）。

```java
// Spring Boot 4 的声明式 HTTP 客户端，接口即客户端
@HttpExchange(url = "https://api.example.com")
public interface OrderService {
    @GetExchange("/orders/{id}")
    Order findById(@PathVariable Long id);
}
```

**为什么值得看**：对大多数团队来说，真正要做的不是「迁移」，而是「厘清取舍」。文章给了一个务实的判断维度：Quarkus 的编译期 DI 带来冷启动与内存优势，代价是无法完全复刻 Spring 庞大生态的运行时灵活性；Spring Boot 4 保留了生态兼容（Java 17 基线不变，但默认切到 Jackson 3、移除 JUnit 4/Undertow，升级仍有隐形成本）。如果你在「换框架」和「继续 Spring」之间摇摆，这篇能帮你把决策锚定在自己的真实约束（冷启动敏感度、原生镜像需求、生态依赖）上，而不是营销话术上。

**适合谁**：负责新服务技术选型的架构师/技术负责人，以及被「微服务按内存计费」逼着重新审视框架成本的团队。

## 本周精选

### Kafka 调优三件套：高吞吐 / 低延迟 / 高可靠的成体系配置

**是什么**：data-dynamics.io 的 Kafka 性能系列第三篇，把分散在 producer、consumer、broker 三端的配置，按目标收敛成三套可直接抄的 Profile。它最值得看的地方在于把「看似冲突」的取舍显式化——同一个 `linger.ms`，高吞吐要调大、低延迟要归零；同一个 `acks`，高吞吐用 `1`、高可靠必须 `all` 并配 `min.insync.replicas=2`。

```properties
# 高吞吐：少交互、多批量
linger.ms=20            # 等批量攒够再发
batch.size=32768        # 32KB 批量阈值
compression.type=lz4    # 省网络/磁盘，轻微 CPU 代价
acks=1                  # 只等 Leader 确认（可接受少量丢失时）

# 低延迟：取消一切「等待」
linger.ms=0
batch.size=16384
fetch.min.bytes=1       # 有数据立即返回
fetch.max.wait.ms=10    # 拉取最多等 10ms
acks=1
enable.idempotence=true # 高并发在途请求下仍保序
```

**为什么值得看**：它纠正了一个常见误区——「调优」不是堆参数，而是**先定目标再定参数**。文中还补了一句关键的安全提醒：`min.insync.replicas=2` 必须和 `acks=all` 成对出现才有意义；只开 `acks=all` 不设 ISR 下限，等于白配置。对正在为「消息吞吐上不去」或「端到端延迟抖」抓头的团队，这套「目标 → 参数 → 代价」的映射表比零散的文章条目管用得多。

**适合谁**：Kafka 集群的运维/平台工程师、需要压吞吐或砍延迟的消息中间件与流处理开发者。

### Kafka 4.4.0：RC1 仍未开启，KAFKA-20970 仍是最后一个 blocker

**是什么**：承接上周的追踪——截至本周初，Apache Kafka 4.4.0 的 RC1 投票仍未开启。Release Plan 页面的 Open Issues 列表里，只剩 KAFKA-20970 一个未解决项：当 `auto.commit.interval.ms` 小于 `bootstrap.resolve.timeout.ms` 时会触发 busy loop（8 月 20 日记录、8 月 27 日仍有更新，经办人 Ken Huang，由 Chia-Ping Tsai 报告）。Code Freeze 已在 8 月 12 日生效，官方口径仍为「预计不早于 **9 月 14 日** 发布」。

**为什么值得看**：这既说明社区在数据正确性上仍把着关（busy loop、干净关闭数据丢失这类问题都不放行），也提醒依赖 4.4 新特性的团队——诸如 KIP-1191「share groups 死信队列」这类能力，还得等 RC 通过、正式发布后再说，别急着把生产压到 RC 上。对大多数现有 Kafka 用户，本周没有需要立即行动的事，保持关注即可。

**适合谁**：计划升级 Kafka 的运维团队、依赖 share groups / 分层存储等 4.4 新特性的流处理工程师。

## 来源

- earendil-works/pi 仓库：<https://github.com/earendil-works/pi>
- Pi: 极简 Agent Harness（SSP Github Daily）：<https://blog.csdn.net/weixin_46946948/article/details/164173428>
- pi（DeepWiki 架构解析）：<https://deepwiki.com/earendil-works/pi>
- Awesome Coding Agents（star 榜单）：<https://tiennm99.github.io/awesome-coding-agents>
- Stop Killing Your Database with @Transactional in Spring Boot（dev.to）：<https://dev.to/sayuri_kotikawaththa_/stop-killing-your-database-with-transactional-in-spring-boot-38pk>
- Spring Boot 4 vs Quarkus 3.27（dev.to）：<https://dev.to/jamilxt/spring-boot-4-vs-quarkus-327-which-java-framework-should-run-your-next-service-1e8e>
- Colibri 仓库：<https://github.com/JustVugg/colibri>
- Colibri — pure-C engine runs GLM-5.2 744B on a 25 GB laptop（AI TLDR）：<http://ai-tldr.dev/releases/justvugg-colibri>
- Kafka Performance 3: OS, Hardware, and Combined Tuning Profiles（data-dynamics.io）：<https://www.data-dynamics.io/en/blog/kafka-performance-os-profiles>
- Release Plan 4.4.0（Apache Kafka cwiki）：<https://cwiki.apache.org/confluence/x/GYGnGQ>
