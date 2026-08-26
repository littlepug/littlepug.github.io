---
title: 八月末技术精选：Kafka 4.4 投票与 AI 安全
date: 2026-08-26
categories: curated
tags: [curated, ai, java, spring, bigdata, tools]
keywords: 技术精选, Kafka 4.4, Spring Boot 4.2, Spring AI, CVE, Elasticsearch 列式存储, Columnar Mode, Qwen Code, 阿里通义, planning-with-files, AI 编程, Agent 生态, 后端开发
excerpt: 八月末，Apache Kafka 4.4.0 首个候选版本 RC0 开启投票，26 个 KIP 即将定稿；Spring Boot 同日三连发（4.0.8/4.1.1/4.2.0-M1），Spring AI 2.0.1 一次修复 7 个 CVE 并补上 Agent 循环防护。Elasticsearch 用列式引擎继续向统一数据平台收敛，阿里通义开源的 Qwen Code 与 Manus 式 planning-with-files 持续升温。本期精选 6 条，附可验证链接。
cover: /images/covers/curated-august-end-2026.svg
---

八月末，后端技术圈有几条值得盯紧的线：一条是**发布节奏**——Kafka 4.4.0 进入 RC 投票、Spring Boot 一天三连发；一条是**安全**——Spring AI 2.0.1 一次修复 7 个 CVE，其中一条直接戳中「AI Agent 边界」这个软肋；还有一条是**收敛**——Elasticsearch 用列式引擎把「五件套」往统一平台上收，阿里通义的开源编程 Agent 与 Manus 式文件规划也在持续升温。

本期精选 **6 条**内容，方向覆盖大数据组件、Spring Boot 实践、Java 代码技巧与 AI Agent 生态。

## 本周精选

### 1. Apache Kafka 4.4.0 RC0 开启投票：26 个 KIP 即将定稿

- **是什么**：Apache Kafka 4.4.0 的**首个候选版本 RC0** 已打出 tag 并启动社区投票，投票截止 8 月 24 日（周一）。这是 8 月 12 日「代码冻结」之后的第一个里程碑，release manager 是 Omnia Ibrahim。4.4.0 是一个 minor release，共包含 **26 个 KIP**，覆盖全部组件。

  值得关注的几个 KIP：

  - **KIP-1191 Dead-letter queues for share groups**：为共享组（share groups）补上死信队列，消费失败的消息不再「悄悄消失」；
  - **KIP-1241 Reduce tiered storage redundancy with delayed upload**：用延迟上传降低分层存储的冗余；
  - **KIP-1306 ConsumerRebalanceListener 增加 Consumer-Aware 方法**：rebalance 回调里能拿到 consumer 自身；
  - **KIP-1319 Align TxnOffsetCommit API with OffsetCommit API**：对齐事务 offset 提交与普通 offset 提交的 API；
  - **KIP-1242 Detection and handling of misrouted connections**：检测并处理「连错路由」的连接。

- **为什么值得看**：按 Kafka 的「时间基发布计划」，代码冻结后至少 4 周稳定期，因此官方口径是**不早于 9 月 9 日发布**（目标日期，可能调整）。RC 投票是社区最后一次「拦下问题」的机会——如果 RC0 投票不过，会继续滚 RC1、RC2。对生产上跑 Kafka 的团队来说，现在正是下载 RC、跑一遍自家负载、把 blocker 报上去的窗口期。尤其 KIP-1191 死信队列，是共享组场景「消息不丢失」的关键补丁，值得先读 KIP 设计。

- **适合谁**：Kafka 平台团队、用 Kafka Streams / share groups 的后端，以及关注 Kafka 4.4 迁移窗口的人。

- **链接**：[[VOTE] 4.4.0 RC0 — Apache Kafka Mailing List](https://www.mail-archive.com/dev@kafka.apache.org/msg158214.html) · [Release Plan 4.4.0 — Apache Kafka Wiki](https://cwiki.apache.org/confluence/x/BoSnGQ)

### 2. Spring Boot 一天三连发：4.0.8 / 4.1.1 / 4.2.0-M1

- **是什么**：8 月 20 日同一天，Spring 团队发布三个版本：**Spring Boot 4.0.8**（4.0.x 补丁，77 个修复）、**4.1.1**（4.1.x 首个补丁，98 个修复）以及 **4.2.0-M1**（下一 minor 的首个里程碑，113 项增强）。

  其中 4.2.0-M1 的两个新特性是风向标：

  - **AMQP 1.0 支持**（含 RabbitMQ 专属特性）；
  - **Image-Based Build Cache Support for Buildpacks**——基于镜像的构建缓存，加速 Buildpacks 打包。

  按发布说明，4.2 在此节点已完成约 91%（181 个计划 issue 里已关 165 个）。

- **为什么值得看**：4.0 与 4.1 双线同步维护，意味着两代版本都不会「突然断供」，跑在任一条线上的团队都可以按例行窗口升级补丁。真正的信号在 4.2.0-M1：AMQP 1.0 支持把 RabbitMQ 之外的 AMQP broker 纳入一等公民，镜像构建缓存则直接利好 CI 里用 Buildpacks 打镜像的流水线。想提前试 4.2 特性、或评估迁移成本的团队，现在可以拉 M1 先跑一遍。

- **适合谁**：生产跑 4.0 / 4.1 的 Spring Boot 团队（例行补丁），以及关注 Spring Boot 下一版本路线的人。

- **链接**：[Spring Boot 4.0.8 available now — Spring Blog](https://spring.io/blog/2026/08/20/spring-boot-4-0-8-available-now) · [Spring Boot 4.1.1 available now — Spring Blog](https://spring.io/blog/2026/08/20/spring-boot-4-1-1-available-now) · [Spring Boot 4.2.0-M1 available now — Spring Blog](https://spring.io/blog/2026/08/20/spring-boot-4-2-0-m1-available-now)

## 技术科普

### 3. Elasticsearch 数据平台整合：列式引擎把「五件套」往一套上收

- **是什么**：Elastic Search Labs 发布《Elasticsearch data platform consolidation》，把 Elasticsearch 的定位从「搜索引擎」往「统一数据平台」收敛。核心路线是 **Columnar Mode**——技术预览在 9.5，**9.6 正式 GA**，后续版本再分阶段优化存储、摄取与查询。

  这篇博客最有信息量的是**指标引擎的实测数字**：TSDB 从 8.7 起步，经过 9.1–9.4 几个版本迭代成列式指标引擎后——

  - OpenTelemetry metrics 现在 **3.75 bytes/datapoint**（一年前是 25 bytes），比 Prometheus 省 2.5x 存储、比 ClickHouse 省 2x；
  - gauge average / counter rate 查询比 Prometheus 和 Mimir **快 30 倍**；
  - 高基数基准里，扫描 50 万条时间序列的 4 小时数据 **不到 2 秒**，其他系统要 30 秒以上。

- **为什么值得看**：官方给出了一套「量化五套工具税」的实用方法——先数两件事：**把同一事件发给多个目标的 ingest pipeline 数量**，以及**用两种不同查询语言回答同一问题的 dashboard 数量**（官方说第二个数字往往最让人意外）。Columnar Mode 按 index 逐个 opt-in，现有 API 不变、dashboard 不破。

  需要冷静看待的是边界：9.5 里 `semantic_text` / `dense_vector` 在 Columnar Mode 下**不可用**（向量检索的列式方案要到后续版本），`nested` 字段类型也不支持。所以它不是「万能模式」，而是为**追加写入、列式聚合**的日志/指标/安全类负载准备的。RAG 检索层、频繁单文档更新、强嵌套结构的场景，仍应留在文档模式。

- **适合谁**：同时运营多套数据系统（日志/指标/检索）的团队，考虑「用一套引擎吃掉几套」的架构负责人与 SRE。

- **链接**：[Elasticsearch data platform consolidation — Elastic Search Labs](https://www.elastic.co/search-labs/blog/data-platform-consolidation-elasticsearch) · [Elasticsearch columnar database: one platform for search and analytics — Elastic Search Labs](https://www.elastic.co/search-labs/blog/elasticsearch-columnar-storage) · [中文解读：Elasticsearch 作为统一平台 — 稀土掘金](https://juejin.cn/post/7672290941203480586)

## 代码小技巧

### 4. Spring AI 2.0.1：一次修复 7 个 CVE，顺手补上 Agent 循环防护

- **是什么**：8 月 21 日发布的 **Spring AI 2.0.1**（2.0.0 GA 之后的第一个维护版）修了 80+ issue，关掉 7 个 CVE。范围很广：PDF 读取（CVE-2026-47851 无限递归）、ONNX 模型缓存（CVE-2026-47852 可预测路径替换）、会话分配（CVE-2026-59279）、任意文件写（CVE-2026-59294 Path Traversal）、语义缓存跨租户隔离绕过（CVE-2026-59308 SHA-256 截断）、Redis 记忆标签注入（CVE-2026-59319），以及最值得注意的 **CVE-2026-59318**——`DefaultToolCallingManager` 的全局 resolver fallback 允许通过 prompt injection 调用**未被广告的工具**。

  功能侧，2.0.1 给 `ToolCallingAdvisor` 加了一个可配置的**每请求工具调用上限**，用来挡住「永不终止的 agentic loop」：

```java
var advisor = ToolCallingAdvisor.builder()
        .toolCallLimit(8)   // 每个请求最多 8 次工具调用
        .build();

var response = chatClient.prompt()
        .user(question)
        .advisors(advisor)
        .call();
// 超过上限时抛 ToolCallLimitExceededException，
// 但异常路径仍返回单个 Generation，错误处理形状不变
```

- **为什么值得看**：CVE-2026-59318 是这一批里最值得后端消化的一条——**「广告给模型的边界」不等于「运行时真正强制执行的边界」**。工具作用域、缓存上下文、聊天记忆命名空间这些 agent 边界，只有被 runtime 真正 enforce 才算数；这条 CVE 之所以存在，正是因为边界只在 prompt 里声明、却没在运行时拦下。给每个 `ToolCallingAdvisor` 加一个（哪怕宽松的）工具调用上限，几乎零成本，却能给下一次 prompt injection 兜个底。

  升级注意几个 breaking change：Mistral AI 模型支持已退役、Redis 聊天记忆自动配置模块改名、OpenAI 工具调用 strict mode 默认改为 `false`（之前会让带可选参数的工具直接 400）。

- **适合谁**：跑 Spring AI 2.0 生产的人（这应该是**优先级升级**而非例行维护），以及给 Agent 做工具调用 / 记忆隔离的团队。

- **链接**：[Spring AI 2.0.1 Available Now — Spring Blog](https://spring.io/blog/2026/08/21/spring-ai-2-0-1-available-now) · [Spring AI 2.0.1 Fixed 7 CVEs. One of Them Lets a Prompt Call Tools You Never Advertised — dev.to](https://dev.to/jamilxt/spring-ai-201-fixed-7-cves-one-of-them-lets-a-prompt-call-tools-you-never-advertised-2d4k)

## 工具推荐

### 5. QwenLM/qwen-code：阿里通义的开源终端编程 Agent

- **是什么**：阿里通义灵码团队开源的终端 AI 编程 Agent（`QwenLM/qwen-code`，TypeScript，Apache-2.0，约 27.2k stars）。最初基于 Google Gemini CLI，从 v0.1 起停止与上游同步、独立发展成一个**多协议、多平台**的 Agent 框架。定位一句话：**「会 Claude Code，就会 Qwen Code——而且更多」**。

  几个差异化能力：

  - **开箱 Agentic**：Auto-Memory、Auto-Skills、SubAgents、Agent Teams、MCP 全内置；
  - **多协议**：同时支持 OpenAI / Anthropic / Gemini / Qwen API，也能接 Ollama / vLLM 本地模型，运行时随时切换，无厂商锁定；
  - **多形态**：除了终端，还有 VS Code / JetBrains / Zed 插件、Desktop 桌面端、`qwen serve` daemon（多个 client 共享一个 agent）、IM bot（Telegram / 钉钉 / 微信 / 飞书），以及 TypeScript / Python / Java SDK。

```bash
npm install -g @qwen-code/qwen-code@latest
qwen   # 启动交互式终端 UI
```

- **为什么值得看**：它和 8 月中 DeepSeek 开源的 Harness 形成互补——一个来自阿里通义、一个来自 DeepSeek，都在做「Claude Code 的国产开源平替」。Qwen Code 的「框架和模型一起开源、一起演进」加上 daemon / IM / SDK 的多形态接入，让它对「想把编程 Agent 嵌进自己产品」的团队尤其友好。项目正在用自己（自己的 agent + 模型）给自己提 issue、交 PR、review、跑测试，这种「自我迭代」的活法本身就是个看点。

- **适合谁**：想用开源可自托管编程 Agent、或需要 daemon / IM / SDK 多形态接入的团队与独立开发者。

- **链接**：[QwenLM/qwen-code — GitHub](https://github.com/QwenLM/qwen-code)

### 6. planning-with-files：Manus 式「文件即记忆」，本周发布 v3.10.1

- **是什么**：`OthmanAdi/planning-with-files`，一个把 Manus「文件系统即记忆」方法论封装成可复用 Skill 的开源项目（MIT）。核心是三个 Markdown 文件：

  - **task_plan.md**：目标、阶段、状态机；
  - **findings.md**：查到的事实与决定；
  - **progress.md**：做过什么、踩过什么错。

  配合 5 个生命周期 Hook（`UserPromptSubmit` / `PreToolUse` / `PostToolUse` / `Stop` / `PreCompact`），让 Agent 在每轮开始、工具调用前后、上下文压缩、停止时重新读取或注入计划。本周刚发布 **v3.10.1**，截至 8 月 19 日有 **26.2k stars / 2.2k forks**，支持 60+ Agent（Claude Code / Codex / Cursor / OpenCode / Gemini / Hermes 等）。

```bash
npx skills add OthmanAdi/planning-with-files --skill planning-with-files -g
```

- **为什么值得看**：它直击长任务 Agent 最大的痛点——**对话上下文会变短，磁盘文件不会消失**。经历 `/clear`、上下文压缩、崩溃、跨会话之后，Agent 靠这三个文件就能恢复「我做到哪一步、下一步是什么」。对超过五次工具调用、需要多阶段推进的复杂任务（大型重构、资料研究、故障排查）价值最大。

  两个提醒：其一，计划写进文件**不代表内容正确**，错误目标也会被稳定地反复注入，关键变更仍需测试和人工确认；其二，多会话同时改同一套计划可能冲突，并行工作时建议独立计划目录或明确分工。

- **适合谁**：经常让 Agent 做大型改造、深度研究、长时间自动化任务的开发者，以及想「随时看到 Agent 做到哪」的团队。

- **链接**：[OthmanAdi/planning-with-files — GitHub](https://github.com/OthmanAdi/planning-with-files)

## 来源

1. [[VOTE] 4.4.0 RC0 — Apache Kafka Mailing List](https://www.mail-archive.com/dev@kafka.apache.org/msg158214.html)
2. [Release Plan 4.4.0 — Apache Kafka Wiki](https://cwiki.apache.org/confluence/x/BoSnGQ)
3. [Spring Boot 4.0.8 available now — Spring Blog](https://spring.io/blog/2026/08/20/spring-boot-4-0-8-available-now)
4. [Spring Boot 4.1.1 available now — Spring Blog](https://spring.io/blog/2026/08/20/spring-boot-4-1-1-available-now)
5. [Spring Boot 4.2.0-M1 available now — Spring Blog](https://spring.io/blog/2026/08/20/spring-boot-4-2-0-m1-available-now)
6. [Elasticsearch data platform consolidation — Elastic Search Labs](https://www.elastic.co/search-labs/blog/data-platform-consolidation-elasticsearch)
7. [Elasticsearch columnar database: one platform for search and analytics — Elastic Search Labs](https://www.elastic.co/search-labs/blog/elasticsearch-columnar-storage)
8. [Spring AI 2.0.1 Available Now — Spring Blog](https://spring.io/blog/2026/08/21/spring-ai-2-0-1-available-now)
9. [Spring AI 2.0.1 Fixed 7 CVEs. One of Them Lets a Prompt Call Tools You Never Advertised — dev.to](https://dev.to/jamilxt/spring-ai-201-fixed-7-cves-one-of-them-lets-a-prompt-call-tools-you-never-advertised-2d4k)
10. [QwenLM/qwen-code — GitHub](https://github.com/QwenLM/qwen-code)
11. [OthmanAdi/planning-with-files — GitHub](https://github.com/OthmanAdi/planning-with-files)
