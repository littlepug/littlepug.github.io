---
title: 九月技术精选：ES 列式引擎 GA 与反废话 Skill
date: 2026-09-14
categories: curated
tags: [curated, ai, java, spring, bigdata, tools]
keywords: Elasticsearch 列式存储, Columnar Mode, ES95, JDK 28, Simple JSON API, Kafka 4.4, CVE-2026-59949, Agent Skills, i-have-adhd, Spring Boot 桌面应用, GraalVM
excerpt: 本周后端信号集中在两个方向：一是 Elasticsearch 的列式引擎（Columnar Mode）即将在 9.6 正式 GA，日志与可观测性场景的存储成本和聚合查询有望被重构；二是 GitHub Trending 被「Agent Skills」包场，一个让 coding agent 别再啰嗦的 skill 登顶。Java 侧，JDK 27 明日 GA，JDK 28 已锁定标准 JSON API 等目标；Kafka 4.4 仍卡 RC0，且 kafka-clients 出现一个新 CVE。Spring Boot 本周无新版本，但桌面应用 + GraalVM 的实践值得一看。
cover: /images/covers/curated-september-14-2026.svg
---

九月第二周的后端信号，一半在「数据引擎」，一半在「Agent 行为」。Elasticsearch 酝酿已久的列式引擎进入 GA 倒计时，对管日志、跑可观测性的团队是实打实的架构事件；GitHub Trending 则被「用一份 Markdown 改变 AI 行为」的 Agent Skills 刷屏，一个叫 i-have-adhd 的反废话技能登顶。Java 侧，JDK 27 明日（9/15）正式 GA，JDK 28 的目标清单已经浮出水面；Kafka 4.4 仍卡在 RC0 投票，还冒出一个 kafka-clients 的 CVE。

## 工具推荐

### i-have-adhd：让 coding agent 别再「先铺垫三分钟」的技能

**是什么**：`ayghri/i-have-adhd`（MIT）是本周 GitHub Trending 周榜第一名，一周新增约 1.6 万 Star（榜单口径，以仓库为准，**待核实**）。它本质是一份 `SKILL.md`，用十条行为规则改造 coding agent 的输出形状：**优先给出下一步动作**（改哪个文件、跑哪条命令）、多步任务自动编号、压缩背景铺垫与重复总结、砍掉无意义的结尾寒暄。名字里有 ADHD，但它**不是医疗软件**——作者的原话是「让 AI 别把答案埋在废话里」，任何被 agent 冗长输出拖慢的人都适用，无需任何 ADHD 诊断。

它支持主流的 agent 环境：Claude Code、Codex、Cursor、OpenCode、Gemini CLI，以及 Qwen、Kimi 等。

```bash
# 思路：fork 后改 skills/i-have-adhd/SKILL.md，再装进你自己的 agent
# 它不改变模型正确性，只改变「怎么呈现」，因此规则越小越可审计、越易迁移
```

**为什么值得看**：这是「响应形状」首次被单独拎出来当成一个开源品类。过去大家默认「模型越强、回答越好」，但实际开发里，agent 每轮都用背景回顾开场、列一堆选项、最后再来一句「希望这对你有帮助」，这些开销比模型能力本身更伤效率。i-have-adhd 把「少说、先说重点、给下一步」沉淀成可安装、可 fork 的规则，也是团队自建 skill 的极好模板——你可以把它的十条规则改成自家团队的「约定俗成」。

**适合谁**：被 agent 啰嗦输出反复打断的开发者；想给团队统一「输出规范」、把经验沉淀成 skill 的工程组。

### Agent Skills 生态一周观察：12/20 霸榜，从零散仓库长成独立生态

**是什么**：9 月 13 日的 GitHub 热榜盘点（七牛云）给出了一个明确结论：**本周 Trending 前 20 里有 12 个是 Agent Skills 或提示词框架**，i-have-adhd 居首，archify、ponytail、ECC、mattpocock/skills 等紧随其后。榜单里非 Skills 类的少数项目，也大多在 README 里写着「Built for agents」。

几个值得单独点名的：

- **God's Eye View**（`bilawalsidhu/gods-eye-view`）：实时开源空间智能，飙星榜（24 小时榜）第一，单日 +2200 余 Star，周榜 +1 万余 Star 冲到第 2，属于「给 agent 装上眼睛」的实时地理可视化方向。
- **Tencent/WeKnora**（Go）：开源大模型知识平台，把原始文档转成可查询的 RAG、自主推理 Agent 与自维护 Wiki，是本周国产开源里少有的「模型/推理工具」代表。
- **THU-MAIC/OpenMAIC**（TypeScript）：清华 MAIC 实验室的「多智能体互动课堂」，9 月 8 日在联合国教科文组织 Digital Learning Week 亮相，是首个登上联合国舞台的中国教育 Agent 团队。

**为什么值得看**：Agent Skills 正在从「几个爆款仓库」演变成一个**跨 Claude Code、Codex、Cursor、OpenCode 的独立生态**。一个月的工夫，这套「用一份 Markdown 定义 agent 行为」的范式已经和「换个更强的模型」分庭抗礼。对后端团队而言，这比追新模型更务实——把重复任务与团队规范沉淀成 skill，是当下 ROI 最高的投入。

**适合谁**：想理解 Agent 生态走向、判断「该自建 skill 还是等官方目录」的开发者与架构师。

## 代码小技巧

### JDK 27 明日 GA，JDK 28 目标清单已浮出水面

**是什么**：JDK 27 将于 9 月 15 日正式 GA（openjdk.org 官方 schedule），9 个 JEP 中 4 个转正特性此前几期已详细拆解，本期不再重复。更有意思的是**紧随其后的 JDK 28（计划 2027 年 3 月 GA）已经锁定一批目标 JEP**，其中三个对后端开发影响直接：

- **JEP 540：Simple JSON API（首个孵化版）**——定义一个标准的 JSON 解析/生成 API，实现 RFC 8259，**无需引入 Jackson/Gson 等外部库**。它取代了此前关闭撤回的 JEP 198（Lightweight JSON API）。
- **JEP 539：严格字段初始化（预览版）**——在 JVM 层面引入「被读取前必须先初始化」的字段，**永远不会观察到 0 / null 这类默认值**，面向生成字节码的编译器使用，是空安全与确定性初始化的底层能力。
- **JEP 535：Shenandoah 默认启用分代模式**——把分代模式设为默认，非分代模式标记弃用，计划后续移除。

另外 JEP 542（PEM 编码最终定稿）、JEP 541（弃用 macOS/x64 移植版）、JEP 401（值对象预览版）也在 JDK 28 目标列表中。

**为什么值得看**：Simple JSON API 若按节奏成熟，长期看会改变「Java 项目默认拉一个 JSON 库」的惯性，也值得现在就开始关注它的 API 形态。严格字段初始化则是 Java 朝「更少空指针、更确定初始化」演进的一步，和值对象（value object）一起，属于未来两年最值得跟踪的语言层变化。

**适合谁**：关注 Java 演进方向、需要提前评估 JDK 升级与依赖裁剪路径的后端工程师。

## 技术科普

### Elasticsearch Columnar Mode：9.6 即将 GA 的列式引擎

**是什么**：Elasticsearch 的 Columnar Mode（列式模式）在 9.5 做过技术预览，官方口径是**在 9.6 正式 GA**。官方 Search Labs 博客本周把定位讲得很清楚：这是 Elasticsearch「本十年最重要的架构变化」，目标是让同一套集群、同一份数据同时承载**搜索**与**列式分析**两类负载。技术细节也在逐步披露：

- 两种列式索引模式：`logsdb_columnar`（带日志向默认值，如默认 `@timestamp` 映射、按 `host.name`+`@timestamp` 排序）与 `columnar`（通用列式，不带场景默认值）。
- 更强的 schema 约束：`doc_values.multi_value: false`（拒绝单字段多值）、`doc_values.nullability: false`（拒绝缺字段或显式 null），换来更紧的列式编码与更强保证。
- **ES95 成为默认 TSDB doc values 编解码器**：在主机指标数据上比 ES819 省约 30% 的 doc values 存储，其中 `@timestamp` 最多缩小 90%，且不增加索引/查询成本。

这是它所在的更大叙事：官方称 OTel 指标已做到 3.75 bytes/datapoint（一年前是 25），比 Prometheus 省 2.5 倍存储，gauge/counter 查询比 Prometheus/Mimir 快最多 30 倍。

**为什么值得看**：日志、安全事件、指标这类「只追加、按列聚合」的数据，过去在文档模式里被迫付出「倒排索引 + doc values + 多份字段拷贝」的双重存储成本。Columnar Mode 把「按需建索引、列式存储」做成开箱即用的索引级选项，**按 index 逐一切换、API 不变、Dashboard 不坏、文档模式不废弃**。要注意边界：它把字段扁平化为 key/value，**不支持 nested 类型**，9.5 里 `semantic_text`/`dense_vector` 也暂不可用（向量检索的列式方案要等后续版本）。9.6 的精确 GA 日期以 Elastic 官方为准（**待核实**）。

**适合谁**：管着 TB/天 级别日志或可观测性集群、同时要跑安全分析/AIOps 的团队；被「五套工具」的摄取管道和双查询语言拖累的平台组。

### Kafka 4.4.0：RC0 仍在投票，kafka-clients 冒出新 CVE

**是什么**：延续前几期追踪，Kafka 4.4.0 的 RC0 投票仍在进行中（9 月初邮件列表上仍有 `[VOTE] 4.4.0 RC0` 的讨论），9 月 3 日又新增一个 busy loop 类 blocker（KAFKA-21031，heartbeat 在途且定时器过期时触发）。更值得注意的一条：9 月 4 日社区标记了 **KAFKA-21032——需要更新 `kafka-clients.jar` 以修复 CVE-2026-59949**，由 Mickael Maison 处理并标记解决。

```bash
# 即使你不打算升级 4.4，也应单独核对客户端依赖里的 kafka-clients 版本
# 具体受影响版本与严重程度，以 Apache Kafka 官方安全公告为准（待核实）
./gradlew dependencyInsight --dependency kafka-clients
```

**为什么值得看**：很多团队「服务端暂不升级 4.4」是合理的，但**客户端 jar 的 CVE 是另一条独立的风险线**——生产里通过 Spring Kafka、连接器、流处理间接引入 kafka-clients 的情况很常见，容易被「服务端版本没变」掩盖掉。

**适合谁**：生产环境依赖 Kafka 客户端（含间接依赖）的运维与后端团队。

## 本周精选

### Spring Boot：本周无新版本，桌面应用 + GraalVM 的实践值得一看

**是什么**：本周（9/8–9/14）Spring Boot 没有新版本发布，前几周覆盖过的 4.0.8/4.1.1/4.2.0-M1 仍是当前节奏。但 9 月 8 日的 This Week in Spring 里有两条后端不该错过：

- Josh Long 的两个视频，演示用 **Spring Boot + JavaFX + GraalVM 原生镜像 + Spring Security（PKCE）** 构建桌面应用，号称在 Mac/Windows/Linux 上「外观漂亮、占用内存只有同类 Electron 应用的一个零头」。
- 9 月 10 日的 Bootiful Podcast 采访了 Netflix 的 **Paul Bakker**（Java 9 Modularity 作者）。

**为什么值得看**：把 Spring Boot 的组件模型、事件分发、国际化、生命周期管理搬到 JavaFX 桌面应用里，是「一套技术栈通吃前后端」的有趣实践；GraalVM 原生镜像带来的冷启动与内存优势，对桌面/Serverless 场景同样成立。对做惯了 Web 后端的人来说，这是一次跳出「请求-响应」思维定式的提醒。

**适合谁**：对 GraalVM 原生镜像落地、或想用 Java 栈做桌面/边缘端应用的后端工程师；Spring 生态的长期关注者。

## 来源

- Elasticsearch Columnar Mode（Elastic Search Labs 官方博客）：<https://www.elastic.co/search-labs/blog/elasticsearch-columnar-storage>
- Elasticsearch 作为统一平台（Elastic Search Labs）：<https://www.elastic.co/search-labs/blog/data-platform-consolidation-elasticsearch>
- Elastic 9 月 Release Notes（releasebot.io）：<https://releasebot.io/updates/elastic>
- JDK 27 项目页（OpenJDK）：<https://openjdk.java.net/projects/jdk/27>
- JDK 27 and JDK 28: What We Know So Far（InfoQ）：<https://www.infoq.com/news/2026/08/java-27-so-far>
- Kafka 4.4.0 Release Plan（cwiki）：<https://wiki.apache.org/confluence/spaces/KAFKA/pages/429064575/Release+Plan+4.4.0>
- Kafka dev 邮件列表（mail-archive，含 KAFKA-21032 CVE）：<https://mail-archive.com/dev@kafka.apache.org/maillist.html>
- ayghri/i-have-adhd 仓库：<https://github.com/ayghri/i-have-adhd>
- i-have-adhd Agent Skill Guide（OpenTools）：<https://opentools.ai/resources/i-have-adhd>
- GitHub 本周热榜盘点：Agent Skills 席卷总榜（七牛云，2026.9.13）：<https://news.qiniu.com/archives/1789264240793>
- This Week in Spring - September 8th, 2026（Spring 官方博客）：<https://spring.io/blog/2026/09/08/this-week-in-spring-september-8th-2026>
