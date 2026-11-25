---
title: 2026年11月25日技术精选：Elastic 9.6 与 Spring AI 2.1
date: 2026-11-25
categories: curated
tags: [curated, ai, java, spring, bigdata, tools]
keywords: 技术精选, Elasticsearch 9.6, ES|QL, 数据联邦, PromQL, Columnar Mode, Spring AI 2.1, MCP, Session API, JDK 28, 堆外内存, 反射后门, Kafka 4.4, KRaft, 分层存储, JNum, SkillEvaluator
excerpt: 十一月最后一周，Elastic 9.6 官宣：用 ES|QL 原地查询 Amazon S3 数据、PromQL 覆盖 top 100 Grafana 面板 92% 查询、列式模式新增 columnar codec。Spring AI 2.1.0 GA 上线无状态 MCP 与 Session API，正式取代 ChatMemory。JDK 28 堆外内存分配提速 6-18 倍、顺手关闭反射绕过构造器的后门，Kafka 4.4 升级指南明确仅支持 KRaft。另附 JNum、NVIDIA SkillEvaluator 两个开源项目。
cover: /images/covers/curated-november-25-2026.svg
---

十一月最后一周，后端技术圈的关键词是「**统一**」：Elastic 想把数据湖查询、列式分析、监控查询收进一个集群；Spring AI 想把 Agent 的会话记忆、工具审批、无状态 MCP 收进一个版本；JDK 28 则在悄悄给运行时「提速 + 封后门」。本期精选 **7 条** 内容，每条附「是什么 / 为什么值得看 / 适合谁」。

## 本周精选

### 1. Elastic 9.6：ES|QL 原地查询 S3，PromQL 覆盖 92% 监控面板

- **是什么**：11 月 24 日，Elastic 官方发布 [What's new in Elastic 9.6](https://www.elastic.co/blog/whats-new-elastic-9-6-0)，Serverless 已可用，ECH / Self-Managed 预计 12 月初上线。三大看点：**ES|QL Data Federation（技术预览）** 用注册数据源的方式，让 ES|QL 直接查询 Amazon S3 上的 Parquet / CSV / TSV / NDJSON 文件，全程无摄取、无重建索引，还带分区与目录剪枝跳过时间范围外的文件；**PromQL 转 GA**，覆盖 top 100 Grafana 面板约 **92%** 的查询（9.4 时仅 43.4%），新增 vector matching、`label_join`、`label_replace`、`topk` 等，存量监控面板无需改写即可对接；**Columnar Mode** 继续补强，新增高基数聚合与 columnar codec（对多值 keyword 字段做字典编码，加速分析并压缩存储），均处技术预览。另有 Logical Views（`FROM my_view`）、协调节点 LOOKUP JOIN、IN / NOT IN 子查询等 ES|QL 能力转 GA。

- **为什么值得看**：这是 Elastic「一个集群吃掉搜索、向量检索、日志、指标、数据湖分析」野心的集中体现。过去查 S3 冷数据要再起一套引擎（Presto / Spark），监控指标要单独接 Prometheus——现在都往 ES|QL 一条语法上收。对已经重度使用 ELK 的团队，意味着少维护一套查询引擎、少一套安全模型，也少一次数据搬家的成本。注意 ES|QL Data Federation 目前仅企业版、仅有状态部署、仅 S3，Columnar Mode 仍是技术预览，生产落地前要读清限制。

- **适合谁**：正在用 Elastic 做日志/可观测/检索，又想统一分析数据湖冷数据与监控指标的后端与平台团队。

- **链接**：[What's new in Elastic 9.6](https://www.elastic.co/blog/whats-new-elastic-9-6-0) · [Search Labs：Elasticsearch 9.6 特性详解](https://www.elastic.co/search-labs/blog/elasticsearch-9-6-whats-new)

### 2. Spring AI 2.1.0 GA：无状态 MCP + Session API，ChatMemory 退场

- **是什么**：11 月 20 日，Spring AI 2.1.0 正式发布到 Maven Central（同发 2.0.3 维护版），基于 Spring Boot 4.2，距 2.0.0 五个月，累计 **430 个提交、86 位贡献者**。重点：**MCP 2026-07-28 无状态协议**——去掉 initialize 握手与 session，每个请求自携带协议版本与客户端能力，服务端设 `spring.ai.mcp.server.protocol=MODERN` 即可，旧注解 `@McpTool` 等无需改动；**DecisionModel API** 把「是/否、多选、评分」变成带概率的强类型决策，已有 OpenAI、Ollama、System One 三个实现；**Session API 取代 ChatMemory**——append-only 事件日志 + 压缩 + 召回，裁剪发生在完整对话轮之间、裁剪内容仍可检索，ChatMemory 已弃用、计划在 3.0 移除；工具调用默认限流（每工具 40 次、每轮 150 次），并支持 `requiresConfirmation` 人工审批。同时修复 **13 个 CVE**。

- **为什么值得看**：这一版把「Agent 框架该长什么样」的骨架搭全了：会话记忆有事件溯源、工具执行有审批与限流、MCP 接入无状态化，等于把此前散落在社区方案里的最佳实践做进了官方基线。对已经在 Java 里做 AI 功能的团队，是「少造轮子」的信号；官方还预告 **Spring AI Agent** 项目将于 12 月初孵化，做多 Agent 的编排与组合，值得持续关注。

- **适合谁**：用 Spring 栈做 RAG / 工具调用 / Agent 的 Java 团队，以及正在评估「要不要从 LangChain 迁回 JVM 原生方案」的架构师。

- **链接**：[Spring AI 2.1.0 GA 公告](https://www.worldprogramming.org/posts/spring-ai-210-ga-and-203-ga-available-now-nyxqyo) · [JavaRubberDuck 解读](https://javarubberduck.com/java/news-2026-11-22-spring)

## 代码小技巧

### 3. JDK 28：堆外内存分配提速 6–18 倍，代码零改动

- **是什么**：Oracle 工程师 Per-Ake Minborg 在 11 月 21 日的 [Inside Java 通讯](https://inside.java/2026/11/21/inside-java-newsletter) 中披露，JDK 28 里 Foreign Function & Memory API（JEP 454）的受限 Arena 小对象分配从「每次调 native 分配器」改为「每线程内存池」，**无需改任何源码**：

```java
try (Arena arena = Arena.ofConfined()) {          // 单线程受限 Arena
    MemorySegment seg = arena.allocate(ValueLayout.JAVA_INT);
    nativeFunction.invokeExact(seg);
    int v = seg.get(ValueLayout.JAVA_INT, 0);
}
```

  官方基准显示，典型小分配场景提速约 **6–18 倍**。注意：这是「分配」速度，不是所有堆外操作的提速，也不等于整个应用的加速倍数，落到自己负载上要单独压测。

- **为什么值得看**：很多后端对「JNI / 堆外内存」还停留在「快但难写、还容易 SIGSEGV」的印象。这一改进让 FFM API 的分配开销进一步贴近原生，配合 JDK 28 的 AOT 编译（JEP 544）与 ZGC 启动提速（JEP 545），Java 在「低延迟、高吞吐、频繁进出原生内存」的场景里越来越有竞争力。无需改代码的收益，最值得在升级 JDK 28 时顺手验证。

- **适合谁**：用 Netty / 原生内存 / FFM 做高性能服务，或对 JVM 内存拓扑、GC 停顿敏感的 Java 团队。

- **链接**：[Inside Java 11 月刊](https://inside.java/2026/11/21/inside-java-newsletter) · [dev.to 摘录：堆外分配 6-18x](https://dev.to/protsenko/java-and-kotlin-news-value-classes-arrive-in-jdk-28-and-kotlin-25-2ol4)

### 4. JDK 28 关闭反射后门：`newConstructorForSerialization` 弃用

- **是什么**：JDK 28 早期访问版（11 月 20 日更新）对 `sun.reflect.ReflectionFactory` 动刀：单参数的 `newConstructorForSerialization(Class)` 对非 `Serializable` 类直接返回 `null`；双参数版本**弃用并计划移除，默认抛 `UnsupportedOperationException`**。历史上 Mockito、Objenesis、ByteBuddy 以及不少 JSON/二进制反序列化库都靠这个「关键内部 API」绕过构造器强造实例，JDK 28 默认封掉这条后门，受影响组件需加启动参数恢复：

```bash
# 临时恢复旧行为（尽快让依赖方升级）
-Djdk.reflect.allowNonSerializableConstruction=true
```

  官方建议相关框架迁移到 `sun.misc.Unsafe.allocateInstance`。

- **为什么值得看**：这不是语法糖，而是一次会影响**单元测试能否跑起来**的运行时变更——升级 JDK 28 后，mock 框架、序列化库若未跟进，测试会直接抛异常。它提醒我们：语言升级的风险往往不在语言本身，而在底层依赖对「非标准 API」的依赖。把 JDK 28 的早期访问版纳入 CI，跑一遍完整测试套件，比等到 GA 再踩坑划算得多。

- **适合谁**：维护共享库、字节码增强工具、序列化组件，或即将做 JDK 28 升级评估的团队。

- **链接**：[JDK 28 Early-Access Release Notes](https://jdk.java.net/28/release-notes) · [Java Weekly #7 解析](https://daily.steinslab.io/en/lang/2026-11-16-java-weekly-2026-w47)

## 技术科普

### 5. Kafka 4.4 仅支持 KRaft，分层存储到底怎么工作

- **是什么**：11 月 17 日合入的 KAFKA-21388 给 Kafka 4.4 补上正式升级指南，明确「**Kafka 4.4 仅支持 KRaft 模式，ZooKeeper 已移除**」，且要求软件与 metadata 版本至少 3.3.x，ZooKeeper 集群须先迁到 KRaft 再升 4.4.x。同周，debtman.dev 的两篇深度长文 [How Apache Kafka Actually Works](https://debtman.dev/blog/how-apache-kafka-actually-works) 与 [How Kafka Tiered Storage Actually Works](https://debtman.dev/blog/how-kafka-tiered-storage-actually-works) 从「分区日志、ISR、高水位、leader epoch」讲到分层存储（KIP-405）的完整机制：热段留在 broker 磁盘、冷段上传到 S3/HDFS，只有「非 active segment、最后偏移低于 last stable offset、超过上传延迟」的段才会被搬运，且上传的是 `.log` / `.index` / `.timeindex` / `.snapshot` / `.leader_epoch_checkpoint` 五个文件，保证远端只含已提交数据。

- **为什么值得看**：Kafka 4.x 的 KRaft 化是过去两年最大的架构变更，而分层存储是「用对象存储换磁盘成本」的落地路径。这两篇把「消费者到底能看到日志的哪一段、ack 之后数据会不会丢、旧偏移读取要花多少代价、远端存储故障时会看到什么指标」讲得清清楚楚，是比官方文档更顺手的「机制速通」读物。升级 4.4 前先读懂 KRaft 迁移与 metadata 版本约束，能少踩很多坑。

- **适合谁**：维护 Kafka 集群、规划从 ZooKeeper 迁 KRaft 或引入分层存储降本的团队。

- **链接**：[Kafka 4.4 升级指南提交记录](https://mail-archive.com/commits@kafka.apache.org/msg35676.html) · [How Kafka Tiered Storage Actually Works](https://debtman.dev/blog/how-kafka-tiered-storage-actually-works)

## 工具推荐

### 6. JNum：470KB 的纯 Java 张量引擎，无 JNI、无 C++ 依赖

- **是什么**：[CH-Abhinav/JNum](https://github.com/CH-Abhinav/JNum) 是一个面向 JDK 25+ / Kotlin 的纯 Java 数值计算与张量库，基于 Project Panama 的 FFM API（JEP 454）分配 64 字节对齐的堆外内存，配合 Vector API 调度原生 SIMD 指令。整个 JAR 仅约 **470KB**，对比 ND4J / Deeplearning4j 动辄 100MB+ 的本地库体积。它内置 4 层 GEMM 引擎（标量 → 寄存器分块 → 单线程 BLIS → ForkJoin 并行）、零拷贝切片、符号表达式求值、Safetensors 与 `.npy`/`.npz` 内存映射 I/O，还有一个 `jnum.nn` 推理模块。运行需加 JVM 参数：

```bash
java --add-modules jdk.incubator.vector --enable-native-access=ALL-UNNAMED YourApp
```

- **为什么值得看**：它代表了一种「把数值计算留在 JVM 进程内」的路线——不跨 JNI 边界（没有内存破坏 / SIGSEGV 风险）、不需要 C++ 工具链，直接在 Java 里做矩阵运算与本地模型推理。作者在 JMH 1.37 下自测小矩阵比 NumPy（OpenBLAS）快约 11 倍、比 ND4J 快约 100 倍——**该数据为作者自测，待第三方复现**，实际收益需按自己的负载验证。目前仍是早期项目，适合尝鲜与选型调研，不宜直接上生产。

- **适合谁**：在 JVM 上做本地模型推理、张量变换、轻量科学计算，又不想引 Python / C++ 依赖的后端团队。

- **链接**：[GitHub：CH-Abhinav/JNum](https://github.com/CH-Abhinav/JNum) · [Show HN 讨论](https://wpnews.pro/news/show-hn-jnum-pure-java-25-numpy-blas-via-project-panama-ffm-and-vector-api)

### 7. NVIDIA SkillEvaluator：给 Agent 技能做「质检 + 收益量化」

- **是什么**：[NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator)（Apache-2.0）是给 Agent Skills 做评估的三层框架：**Tier 1 确定性校验**（schema、PII、license、lint、安全扫描，内置 SkillSpector + Gitleaks，可无 API key 离线出 0–100 质量分）；**Tier 2 语义去重**（用 embedding 检测 skill 内部与 skill 之间的指导重叠）；**Tier 3 真实执行评测**——在 Harbor 沙箱里对同一批任务「装 skill」与「不装 skill」各跑一遍，报告差异为 **Skill Lift** 指标（配合 pass@k）。配套 `skillevaluator ci init` 一键接入 GitHub Actions / GitLab CI，仓库里改过的 skill 每次 PR 自动检查。0.9.0 于 11 月 13 日发布，本周在 GitHub Trending 上榜（star 各方口径不一，**以仓库为准**）。

- **为什么值得看**：过去一年「Agent Skills」呈爆发式增长，但几乎没有人回答「这个 skill 装上去到底有没有让 Agent 变强」。SkillEvaluator 把「验证器即产品」的思路带进了 Agent 技术栈里长得最快、却测得最少的那一层——从「写得好不好」升级到「装上之后分数高不高」，并用同一种方式反复度量。对已经开始囤技能包的团队，这是第一个能回答「技能是不是负担」的工具。

- **适合谁**：发布、维护或内部管理 Agent Skills 的团队，以及想给自建 skill 上质量门禁的工程效能 / 平台团队。

- **链接**：[GitHub：NVIDIA/SkillEvaluator](https://github.com/NVIDIA/SkillEvaluator) · [文档](https://docs.nvidia.com/skills/skillevaluator/)

## 来源

- [What's new in Elastic 9.6 — Elastic 官方博客](https://www.elastic.co/blog/whats-new-elastic-9-6-0)
- [Elasticsearch 9.6 — Search Labs](https://www.elastic.co/search-labs/blog/elasticsearch-9-6-whats-new)
- [Spring AI 2.1.0 GA and 2.0.3 GA Available Now](https://www.worldprogramming.org/posts/spring-ai-210-ga-and-203-ga-available-now-nyxqyo)
- [JavaRubberDuck：Spring AI 2.1 GA 等](https://javarubberduck.com/java/news-2026-11-22-spring)
- [Inside Java 11 月刊](https://inside.java/2026/11/21/inside-java-newsletter)
- [JDK 28 Early-Access Release Notes](https://jdk.java.net/28/release-notes)
- [Java Weekly #7](https://daily.steinslab.io/en/lang/2026-11-16-java-weekly-2026-w47)
- [Kafka 4.4 升级指南提交记录（mail-archive）](https://mail-archive.com/commits@kafka.apache.org/msg35676.html)
- [How Kafka Tiered Storage Actually Works — debtman.dev](https://debtman.dev/blog/how-kafka-tiered-storage-actually-works)
- [CH-Abhinav/JNum — GitHub](https://github.com/CH-Abhinav/JNum)
- [NVIDIA/SkillEvaluator — GitHub](https://github.com/NVIDIA/SkillEvaluator)
