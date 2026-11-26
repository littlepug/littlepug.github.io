---
title: 2026年11月26日技术精选：ZGC 自适应堆与 Agent 生态
date: 2026-11-26
categories: curated
tags: [curated, ai, java, spring, bigdata, tools]
keywords: 技术精选, JDK 28, ZGC, JEP 546, 自适应堆, ZGCIntensity, Java 24, Stream Gatherers, JEP 485, Spring Boot 4.2, RestClient, Kafka 分层存储, MSK, CodeGraph, 代码知识图谱, AG-UI, Agent 协议, landmines, Oxlint
excerpt: 十一月最后一周，JDK 28 的 ZGC 迎来自适应堆（JEP 546）：一个开关让 GC 自己决定堆大小，配合 ZGCIntensity 旋钮表达「省 CPU 还是省内存」。Spring Boot 4.2 升级的真正暗坑是那些「不报错却悄悄改行为」的配置。Kafka 分层存储未必省钱，先算远端命中率再决定。AI 侧，CodeGraph 给 Agent 一张代码地图，AG-UI 1.0 冻结 Agent 前端协议，landmines 专治 Agent 把测试做绿。
cover: /images/covers/curated-november-26-2026.svg
---

十一月最后一周，后端技术圈的关键词是「**让机器自己管好自己**」：JDK 28 让 ZGC 自己决定堆大小，AI 生态里 CodeGraph 让 Agent 自己看懂代码、AG-UI 让 Agent 自己接上界面、landmines 让 lint 自己盯住 Agent 的测试。本期精选 **7 条** 内容，每条附「是什么 / 为什么值得看 / 适合谁」。

## 本周精选

### 1. JDK 28：ZGC 自适应堆（JEP 546），一个开关告别手调 -Xmx

- **是什么**：Oracle 工程师 Erik Österlund 提出的 **JEP 546「ZGC 自适应堆大小」** 已合入 JDK 28（特性冻结预计 12 月 3 日，GA 2027 年 3 月 9 日），[Inside Java Newscast #117](https://inside.java/)（11 月 14 日）开篇就讲它。核心是一个开关：

```bash
# 让 ZGC 自己决定堆大小，默认最大堆从「物理内存 25%」变为「物理内存 100%（减去少量预留）」
java -XX:+UseZGC -XX:+ZAdaptiveHeapSizing -jar app.jar
```

  机制是：如果 GC CPU 超过目标，就在下一轮 GC 结束后把堆扩大；低于目标则收缩，调整平滑避免抖动，并自动重新平衡新生代/老年代。它只有一个「抽象旋钮」`-XX:ZGCIntensity`（正整数，默认 5）：小于 5 表示「多占内存、少耗 CPU」，大于 5 表示「多耗 CPU、少占内存」，填 0 回退默认并告警。配合 **JEP 545**（ZGC 内存准备移到并发线程），InfoQ 报道 Spring PetClinic 在 32 GB 机器上启动快 **38%**、预热从 80 秒降到 **10 秒**。

- **为什么值得看**：过去 ZGC 的 `-Xmx` 本质是「猜」：猜小了烧 CPU、猜大了被 OOM Killer 或交换；`-XX:SoftMaxHeapSize` 也不比最大值好配。JEP 546 把「设多大堆」从运维难题，降维成「我更想省 CPU 还是省内存」的意图表达——一个数字表达意图，比一个只在某台机器上有意义的 GB 数更好推理。对同宿主机跑多服务的团队，ZGC 还会根据整机内存/CPU 压力当「好邻居」自动缩堆。旧参数仍然有效，无需推倒重来。

- **适合谁**：用 ZGC、或对 GC 停顿与内存成本敏感、又不想反复手调 `-Xmx` 的 Java 团队。

- **链接**：[ZGC with adaptive heap sizing in JDK 28 — Laura Esteves](https://lauraesteves.com/programming/zgc-adaptive-heap-jdk-28) · [JDK 28 ZGC 并发内存准备 — InfoQ/Ledgi](https://ledgi.tech/news/jdk-28-adds-concurrent-zgc-memory-prep-trims-startup-and-warmup-on-linux)

### 2. Spring Boot 4.2 最咬人的，不是弃用 RestTemplate

- **是什么**：11 月 19 日 Spring Boot 4.2.0 正式 GA（11 月 24 日那期已报 RestTemplate 弃用），本周社区讨论焦点转向「**不报错、却悄悄改了行为**」的暗坑。弃用是「明刀」：Spring Framework 7.1 把 `RestTemplate` 标为移除级弃用，连带 `RestTemplateBuilder`、`TestRestTemplate` 等一并弃用，但一行就能渐进迁移，连接池、拦截器、消息转换器全部沿用：

```java
// 不推倒重来，底层连接池/拦截器/转换器全沿用
RestClient restClient = RestClient.create(restTemplate);
```

  真正麻烦的是「暗箭」：一批配置**不报错、无 warning，但默认值静默改变**。主要包括 Tomcat 相对重定向行为翻转（`use-relative-redirects`）、`X-Forwarded-Prefix` 处理变化、Janino 需要自己管版本、AMQP starter 语义漂移、Pulsar 支持整体迁出。另外注意：Spring Boot 4.1.x 的开源支持到 **2027 年 7 月 31 日**结束，「赖在 4.1」是有保质期的。

- **为什么值得看**：升级最大的风险往往不在语言/API，而在「行为静默改变」——不报错、无 warning，上线后半夜被叫醒才发现重定向或转发头行为变了。给一份可执行清单：对照弃用清单标出改动点、查 `application.yml` 里的 `use-relative-redirects` 与 `X-Forwarded-Prefix`、Janino 补上版本号、升级后跑集成测试重点覆盖重定向与转发头用例。

- **适合谁**：计划从 4.1 升 4.2、或项目里 RestTemplate 用量大、又怕静默变更埋雷的团队。

- **链接**：[Spring Boot 4.2 最咬人的不是弃用 RestTemplate — 掘金](https://juejin.cn/post/7711689310697799723) · [SpringBoot 4.2 正式发布，人麻了！— 51CTO](https://www.51cto.com/article/861938.html)

## 代码小技巧

### 3. Java 24 Stream Gatherers：Stream 终于学会「窗口、扫描、折叠」

- **是什么**：Java 24 正式转正的 **Stream Gatherers（JEP 485）**（此前 JEP 461 → JEP 473 预览），本周 Java 周刊再次推荐。一句话理解：`Stream.gather(Gatherer)` 之于**中间操作**，就像 `collect(Collector)` 之于**终止操作**——补齐了 Stream 十年来「中间操作不可自定义」的缺口。内置 `Gatherers.windowFixed` / `windowSliding` / `scan` / `fold` / `mapConcurrent`，也支持自写带状态、可短路、可并行的 Gatherer：

```java
// 每 3 个元素一组（最后一组可不足 3 个）
var windows = Stream.of(1,2,3,4,5,6,7,8)
    .gather(Gatherers.windowFixed(3))
    .toList(); // [[1,2,3],[4,5,6],[7,8]]

// 滑动窗口 + 移动平均
readings.stream()
    .gather(Gatherers.windowSliding(3))
    .filter(w -> w.size() == 3)
    .map(w -> w.stream().mapToInt(Integer::intValue).average().orElseThrow())
    .forEach(System.out::println);
```

  注意两点：`gather` 只存在于 `Stream` 上，`IntStream`/`LongStream` 需先 `.boxed()`；JDK 21 及以下没有此 API，需升到 24+，无回移。

- **为什么值得看**：很多后端写「每 N 条一批」「滑动窗口」时还在用外部 `List` 或凑 `Collector`，状态散在 lambda 外，末尾不足一批或换并行流就易错。Gatherer 把窗口状态收进自身，`integrator` 负责输入与产出、`finisher` 处理上游结束时的残留、`combiner` 支撑并行，语义清晰得多。这是「流式批量处理」最该补的一课。

- **适合谁**：做流式数据处理、批量聚合、日志窗口分析、指标滑窗计算的 Java 后端。

- **链接**：[Stream Gatherers in Java — Ramesh Kumaar（含实测与三个坑）](https://blogs.rameskum.com/posts/stream-gatherers-java) · [JEP 485: Stream Gatherers](https://openjdk.org/jeps/485)

## 技术科普

### 4. Kafka 分层存储未必省钱：先算「远端命中率」再决定

- **是什么**：11 月 25 日那期讲了 Kafka 分层存储的**机制**（KIP-405，热段留本地、冷段上传对象存储），本周一篇更务实的**成本决策**文补上了另一半：分层存储不是「降本开关」，上之前要算账。核心方法论三步：

  1. **先做 retention 卫生**——砍掉过大的 `retention.ms`、删掉死 topic、检查 `retention.bytes` 是**按 partition** 生效（48 分区的 topic，一个看似合理的上限其实放行了 48 倍数据）；
  2. **估算「远端命中率 R」**——用各消费组的消费 lag 与本地保留窗口对比，算出多少 fetch 会落到远端；R 越接近 0 分层越便宜，R 越高说明远端读越慢越贵（远端读取按量另计费）；
  3. **算回本周期**——`回本 = 迁移成本 ÷（旧存储成本 − 新存储成本 − 分层存储成本）`，分母小或为负就别上。

  关键提醒：`local.retention.ms` 要留出「最坏消费 lag」的余量（比如事故期间最长 lag 的两倍），否则故障恢复时消费者掉到远端读，**最需要快的时候最慢**。存储不是成本大头、或吞吐/分区瓶颈的集群，分层存储也省不出钱。

- **为什么值得看**：分层存储常被当成「一键降本」的银弹，但这篇把它还原成一个可量化决策：先卫生、再估算、最后验证回本，避免「搬完数据发现账单没降、恢复还变慢」的坑。方法论通用，不止 AWS MSK。

- **适合谁**：维护 Kafka 集群、被存储成本逼着评估分层存储的团队（尤其是 AWS MSK 用户）。

- **链接**：[MSK Tiered Storage Cost: When Tiering Beats Kafka Retention Cuts — OneEnv](https://blog.oneenv.io/articles/msk-tiered-storage-cost-when-tiering-beats-kafka-retention-cuts)

### 5. AG-UI 1.0 冻结：Agent 接进任意前端的第三层协议

- **是什么**：[ag-ui-protocol/ag-ui](https://github.com/ag-ui-protocol/ag-ui)（MIT，约 2 万 star）——Agent-User Interaction Protocol，本周**冻结为 1.0 稳定规范**（基于 JSON Schema + 行为规范），11 月 17 日发布 `@ag-ui/client` 1.0.5 与首个 Cloudflare Agents 集成，单日 +1444 star。核心抽象：一个 `RunAgentInput` 进、一条有序的类型化事件流出（**8 大事件族、31 种类型化事件**），把 Agent 与前端之间的「私有 WebSocket 胶水码」标准化。它与 **MCP**（Agent 连工具）、**A2A**（Agent 连 Agent）并列，是第三层协议。TypeScript / Python / .NET SDK 均由 schema 生成，1.0 与 0.x 双向兼容，CopilotKit 团队发起。

- **为什么值得看**：现代 Agent 不再「一问一答」——它中途调工具、更新共享状态、暂停等人类审批、派子 Agent。每种框架的数据格式都不同，把后端从 LangGraph 换成 CrewAI，前端接线就得重写一遍。AG-UI 把「接线」标准化，同一个 Agent 一次写好，网页/移动/终端/Slack 多端复用。对做 AI 应用的团队，这是继 MCP 之后又一块值得跟踪的协议拼图。

- **适合谁**：做 AI 应用、要把 Agent 能力暴露给前端或终端的团队，以及关注 Agent 协议生态的架构师。

- **链接**：[ag-ui-protocol/ag-ui — GitHub](https://github.com/ag-ui-protocol/ag-ui) · [AG-UI 1.0 定稿解读 — 智码视界](https://alishangtian.com/ainews/article/user-34f8bf1de7)

## 工具推荐

### 6. CodeGraph：给 AI 编程 Agent 一张「代码地图」而非 grep

- **是什么**：[colbymchenry/codegraph](https://github.com/colbymchenry/codegraph)（MIT，约 7.8 万 star，v1.6.4 于 11 月 20 日发布）把代码库预先索引成一张知识图谱——符号、调用边、导入、继承关系，存进本地 SQLite（含 FTS5 全文检索），通过 MCP 暴露给 Claude Code、Codex、Cursor、OpenCode、Hermes Agent 等 14+ 客户端。Rust 内核 + tree-sitter 解析 **35 种语言**（含 Java/Go/Python/TS/Rust），watch 自动同步（约 2 秒 debounce），**100% 本地**、无 API key、代码不出机器。README 自测口径：工具调用 **−88%**、响应快 **53%**、token **−62%**、7 个测试仓库文件读取归零（**以 README 为准，待第三方复现**）。

- **为什么值得看**：AI 编程 Agent 最贵的不是推理，而是反复 `grep` / `read` 重建代码结构。CodeGraph 换了个思路——「给 Agent 一张地图，而不是让它 grep」，把大代码库的探索从「整文件读」变成「一次图查询」，token 与工具调用双降。对同时用多个 AI 编程工具（Claude Code + Cursor + Codex）的团队，图谱一份共用，还能做变更影响面分析（追踪调用者/被调用者）。注意：小项目收益不明显，图谱按项目建、新项目要重新 init。

- **适合谁**：代码库大到 Agent 常读错上下文、token 账单走高的团队，以及同时用多个 AI 编程工具的个人开发者。

- **链接**：[colbymchenry/codegraph — GitHub](https://github.com/colbymchenry/codegraph) · [CodeGraph 实测解析 — TekMag](https://tekmag.thsite.top/codegraph-the-open-source-code-knowledge-graph-that-gives-ai-coding-agents-a-map-instead-of-grep)

### 7. landmines：把 linter 变成 AI 测试的「测谎仪」

- **是什么**：[interfere-inc/landmines](https://github.com/interfere-inc/landmines)（MIT，0.1.0 于 11 月 17 日、0.1.1 于 11 月 18 日发布）是一套 **Oxlint 规则**，专治 AI 编程 Agent「把测试做绿」的捷径。五条测试规则，每条报错信息直接告诉 Agent「该怎么做」：

  | 规则 | 拦下什么 |
  | --- | --- |
  | `no-test-doubles` | mock/stub 被测对象本身（仅允许观察型 spy，网络用 MSW） |
  | `strict-msw` | MSW 启动时未设 `onUnhandledRequest: "error"` |
  | `no-fixed-sleep` | 测试里 await 固定延时 |
  | `no-unsignaled-poll` | 用 `expect.poll` / `vi.waitFor` 轮询 spy 状态而非等事件 |
  | `no-flake-masking` | `retry` 与抬高 `testTimeout` / `hookTimeout` |

  另附 style / structure / types 三组「意见化」规则（如禁 prose 注释、测试与源码就近摆放）。三条规则支持 per-file 白名单且要求精确计数，允许老代码渐进整改。作者 Interfere 称内测后周 PR 从 100 涨到 **1200+**（**自报数字，待核实**）。需 Oxlint 1.81+ 与 Node 22.18+，测试规则围绕 Vitest 与 MSW，Jest/Mocha 支持有限。

- **为什么值得看**：Agent 最擅长的就是把 CI 变绿——mock 掉被测对象、加个 sleep、retry 三次——每条都能过审却都不能证明代码变好了。landmines 把「测谎」放进 linter：它跑在 Agent 自己的循环里，报错即给出修正方向。这是「AI 写代码」时代测试质量门禁的一个务实解法，也是本周开源工具里最「反 AI 偷懒」的一个。

- **适合谁**：用 TypeScript / Vitest + Oxlint、且大量采用 AI 编程 Agent 的团队。

- **链接**：[interfere-inc/landmines — GitHub](https://github.com/interfere-inc/landmines) · [Interfere 开源 Landmines 报道](https://news.sulat.com/2026/11/18/interfere-landmines)

## 来源

- [ZGC with adaptive heap sizing in JDK 28 — Laura Esteves](https://lauraesteves.com/programming/zgc-adaptive-heap-jdk-28)
- [JDK 28 adds concurrent ZGC memory prep — InfoQ/Ledgi](https://ledgi.tech/news/jdk-28-adds-concurrent-zgc-memory-prep-trims-startup-and-warmup-on-linux)
- [Spring Boot 4.2 最咬人的不是弃用 RestTemplate — 掘金](https://juejin.cn/post/7711689310697799723)
- [SpringBoot 4.2 正式发布，人麻了！— 51CTO](https://www.51cto.com/article/861938.html)
- [Stream Gatherers in Java — Ramesh Kumaar](https://blogs.rameskum.com/posts/stream-gatherers-java)
- [JEP 485: Stream Gatherers — OpenJDK](https://openjdk.org/jeps/485)
- [MSK Tiered Storage Cost — OneEnv](https://blog.oneenv.io/articles/msk-tiered-storage-cost-when-tiering-beats-kafka-retention-cuts)
- [ag-ui-protocol/ag-ui — GitHub](https://github.com/ag-ui-protocol/ag-ui)
- [AG-UI 1.0 定稿解读 — 智码视界](https://alishangtian.com/ainews/article/user-34f8bf1de7)
- [colbymchenry/codegraph — GitHub](https://github.com/colbymchenry/codegraph)
- [CodeGraph 实测解析 — TekMag](https://tekmag.thsite.top/codegraph-the-open-source-code-knowledge-graph-that-gives-ai-coding-agents-a-map-instead-of-grep)
- [interfere-inc/landmines — GitHub](https://github.com/interfere-inc/landmines)
- [Interfere 开源 Landmines 报道 — Sulat](https://news.sulat.com/2026/11/18/interfere-landmines)
