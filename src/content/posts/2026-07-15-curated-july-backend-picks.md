---
title: 七月中旬技术精选：pgrust 引爆 HN、Deep Code CLI 开源与虚拟线程踩坑实录
date: 2026-07-15
categories: curated
tags: [curated, ai, java, spring, bigdata, tools]
keywords: 技术精选, pgrust, Rust重写PostgreSQL, Deep Code CLI, DeepSeek-V4, Spring AI Alibaba, 虚拟线程, HikariCP, Kafka 4.4, AI编程Agent, Qwen3-Coder
excerpt: 七月中旬技术精选聚焦六大方向：pgrust 用 AI+Rust 重写 PostgreSQL 通过全部 46066 个回归测试、Deep Code CLI 专为 DeepSeek-V4 打造的开源终端编程 Agent、Spring AI Alibaba 1.0 GA 正式发布、虚拟线程上线后 HikariCP 被击穿的根因与调优策略、Kafka 4.4.0 突破 2GB 日志段限制等重磅 KIP、以及开源本地编码模型最新排名。每条附原文链接，内容可验证。
cover: /images/covers/curated-july-2026.svg
---

七月中旬的技术圈被两个「重新发明」刷屏：pgrust 用 AI + Rust 从零重写了 PostgreSQL 18.3，通过全部回归测试；Deep Code CLI 以 MIT 协议开源，给 DeepSeek-V4 补上了原生终端编程 Agent 的拼图。本周精选 **6 条** 内容，覆盖 AI 编程工具、开源项目、Java 框架、虚拟线程实战和大数据组件前瞻。

## 本周精选

### 1. pgrust：AI + Rust 重写 PostgreSQL，全部 46066 个回归测试通过

- **是什么**：7 月 9 日，前 Heap CEO Michael Malis 在 Hacker News 上发布了 [pgrust](https://github.com/malisper/pgrust)——一个用 Rust 从零重写的 PostgreSQL 18.3。项目由 17 个 Codex AI Agent 并行生成，代码量超过 45 万行 Rust，**全部 46066 个回归测试 + 隔离测试 100% 通过**，并且可以直接从 PG 18.3 数据目录启动，无需数据迁移。开发成本约 $3,200（8 个 Codex 付费账号 + 两个月时间）。

- **为什么值得看**：pgrust 不是又一个"兼容 PG 协议"的玩具——它做到了与 PG 18.3 的磁盘兼容，这是硬活。更值得关注的是它试图解决 PG 三十年来没人敢碰的架构问题：**线程-per-连接替代进程模型**、**内置连接池**、**64 位事务 ID 替代 32 位防 wraparound 宕机**、**无 VACUUM 存储设计**。项目明确标注"非生产就绪""未做性能优化""不兼容 C 扩展"，但 Malis 透露未发布分支在 TPC-C 上比 PG 快 50%、分析负载快约 300 倍（目前仍比 ClickHouse 慢 2 倍）。

AI 驱动的开发方法论同样值得学习：先让 AI 解释 PG 子系统的 C 源码 → 再协作写出最小 Rust 实现 → 每次变更后立即跑回归测试 → 渐进式委托，早期人工密集、后期 AI 自主度逐步提高 → 17 个并行 Agent 靠小粒度提交解决合并冲突。

- **适合谁**：对数据库内核感兴趣的后端开发者、关注 AI 辅助大型软件工程实践的工程师。即使你不写 Rust，这个项目的工程方法论和架构决策也值得一读。

- **链接**：[pgrust GitHub](https://github.com/malisper/pgrust) · [Michael Malis 开发博客](https://malisper.me/) · [PostgreSQL 每周生态报告 #28](https://www.modb.pro/db/2076482986854916096)

### 2. Deep Code CLI 开源：专为 DeepSeek-V4 打造的终端 AI 编程 Agent

- **是什么**：7 月 7 日开源的终端 AI 编程助手，被 DeepSeek 官方 API 文档收录，采用 **MIT 协议**，无商用限制。支持 CLI 终端 + VS Code 插件双端使用，核心能力包括：全项目文件遍历和修改、终端 Shell 命令执行、按项目持久化会话上下文、可调的推理强度控制（简单补全用 Flash、架构设计拉满 Pro）、Agent Skills 技能包扩展、MCP 协议集成外部服务。

- **为什么值得看**：在当前 Claude Code 封号风险高、Cursor 企业版成本大的背景下，Deep Code CLI 补上了国产终端 AI 编程 Agent 的关键拼图。它的差异化在于三点：一是**上下文 KV 缓存复用**——多轮重构场景 Token 成本降低 50% 以上；二是**预制 Skills**——内置 Spring Boot、Vue、Docker、Git 等开发场景技能包，团队也可以自定义封装内部规范；三是**细粒度权限管控**——可针对 Shell 命令、文件读写设置「始终允许/每次询问/直接拒绝」三级策略。截至发稿 GitHub 已收获 1500+ Star。

快速上手只需三步：`npm install -g @vegamo/deepcode-cli` → 配置 DeepSeek API Key → 项目目录下执行 `deepcode`。

- **适合谁**：想低成本体验终端 AI 编程的 Java/全栈开发者，特别是已有 DeepSeek API 额度、不方便用 Claude Code 的国内团队。

- **链接**：[Deep Code CLI GitHub](https://github.com/lessweb/deepcode-cli) · [DeepSeek 官方 Agent 工具生态](https://deepseek.club/topic/3018)（待核实）

## 代码小技巧

### 3. 虚拟线程上线后 HikariCP 被打爆：根因分析与调优公式

- **是什么**：多个生产案例和压测报告揭示了同一个问题——Spring Boot 开启虚拟线程后，HikariCP 默认配置（`maximum-pool-size=10`）瞬间被击穿。压测数据显示：并发 QPS 从 2,450 飙到 7,800（提升 3.1x），但 P99 延迟反而从 52ms 飙升到 1,240ms（恶化 23x），原因就是 2000+ 虚拟线程同时排队等数据库连接。

- **为什么值得看**：虚拟线程不是"性能加速器"，而是**瓶颈放大器**——它消除了 Tomcat 线程池的限流闸门，把压力直接传导到数据库连接池。以下是经过多个生产案例验证的调优策略：

```yaml
spring:
  threads:
    virtual:
      enabled: true
  datasource:
    hikari:
      # 经典公式已失效。新公式：
      # maxPoolSize ≈ (预期并发VT数 × 单次SQL耗时ms) / 可接受等待阈值ms
      # 示例：10000 VT × 15ms ÷ 5ms = 30，而非默认的 10
      maximum-pool-size: 50
      # 固定池大小，避免洪峰时动态创建连接的额外延迟
      minimum-idle: 50
      # 从默认 30s 缩短到 3~5s，快速失败优于长时间排队
      connection-timeout: 5000
      max-lifetime: 1800000
      keepalive-time: 30000
```

三个关键红线：禁止在虚拟线程中使用未声明 VT 兼容的老旧 JDBC 驱动（会导致 carrier thread pinning）；`maximum-pool-size` 不超过数据库 `max_connections` 的 70%；必须配合信号量（Semaphore）做应用层限流，因为 JVM 挂起虚拟线程的开销远小于 HikariCP 内部超时抛异常的重试开销。

此外，如果 `synchronized` 块内包含数据库调用，虚拟线程会被 pin 到载体线程上——用 `ReentrantLock` 替代，并通过 JFR 持续录制 `jdk.VirtualThreadPinned` 事件监控。

- **适合谁**：正在或计划在 Spring Boot 3.x/4.x 中开启虚拟线程的后端团队，特别是高并发 I/O 密集型服务。

- **链接**：[虚拟线程放开并发闸门后，你的数据库连接池为什么先崩？](https://blog.csdn.net/weixin_62242812/article/details/160392981) · [Virtual Threads + HikariCP 调优指南](https://www.webkt.com/article/14110)

## 技术科普

### 4. Spring AI Alibaba 1.0 GA：Java Agentic AI 框架正式发布

- **是什么**：阿里巴巴开源的 Java Agentic AI 框架 [Spring AI Alibaba](https://github.com/alibaba/spring-ai-alibaba) 发布了 **1.0 GA 正式版本**，GitHub 已收获 10K+ Stars。它基于 Spring AI 核心抽象，深度集成阿里云百炼平台，提供三大核心能力：**Graph 多智能体框架**（支持低代码可视化编排 + 高代码 SDK 扩展 + 零代码 MCP 服务代理）、**企业级 AI 生态集成**（ARMS 可观测、Nacos MCP Registry 分布式注册发现、Langfuse 追踪）、以及内置的生产级智能体应用（JManus——Manus 的 Java 实现、DeepResearch 深度研究、DataAgent 自然语言转 SQL）。

- **为什么值得看**：Python 和 TypeScript 在 AI Agent 领域一直走在前面，Java 生态长期缺乏一个生产级的 Agent 框架。Spring AI Alibaba 1.0 试图解决的就是这个 gap——它不是"调个 API 做聊天"的 Demo 工具，而是一整套**工程底座**：Agent Framework + Graph Runtime + MCP 集成 + Admin 管理台 + 可观测。如果你手上有大量 Spring Boot 存量服务，`@McpService` 注解可以把现有 API 一键暴露为 MCP 工具，让 AI Agent 直接调用——这是 Python Agent 框架做不到的 Java 生态优势。

1.1.0 里程碑版本（M5）已进入预览，增强了 A2A 通信、MCP 集成和 Graph 运行时。

- **适合谁**：在 Java 技术栈上构建 AI Agent 应用的后端团队，以及想把现有 Spring Boot 服务接入 AI Agent 生态的架构师。

- **链接**：[Spring AI Alibaba GitHub](https://github.com/alibaba/spring-ai-alibaba) · [1.0 GA 发布公告](https://www.oschina.net/comment/news/355617) · [官方文档 java2ai.com](https://java2ai.com/)

### 5. Kafka 4.4.0 前瞻：突破 2GB 日志段限制、动态内存分配等重磅 KIP

- **是什么**：Apache Kafka 4.4.0 的 KIP 冻结已于 7 月 8 日截止，代码冻结定于 7 月 27 日，预计 **2026 年 9 月中旬发布**。Red Hat 发布的 [6 月 Kafka Monthly Digest](https://developers.redhat.com/blog/2026/07/01/kafka-monthly-digest-june-2026) 和 [4.4.0 发布计划](https://cwiki.apache.org/confluence/display/KAFKA/Release+Plan+4.4.0) 揭示了几个值得关注的 KIP：

| KIP | 内容 | 影响 |
|-----|------|------|
| [KIP-1333](https://cwiki.apache.org/confluence/display/KAFKA/KIP-1333) | 支持超过 2GB 的日志段 | 高吞吐场景减少文件切换开销 |
| [KIP-1332](https://cwiki.apache.org/confluence/display/KAFKA/KIP-1332) | Producer 动态内存分配 | 减少 OOM 风险，按需使用堆外内存 |
| [KIP-1360](https://cwiki.apache.org/confluence/display/KAFKA/KIP-1360) | 集群同步镜像 | 零 RPO 灾备，Kafka Connect/Streams 跨集群迁移 |
| [KIP-1358](https://cwiki.apache.org/confluence/display/KAFKA/KIP-1358) | 渐进式 preferred leader 选举 | 避免 broker 重加入时数千次选举同时触发 |
| [KIP-1357](https://cwiki.apache.org/confluence/display/KAFKA/KIP-1357) | Broker 端自定义 Streams 分配器 | 让 KIP-1071 新协议支持自定义分配策略 |

- **为什么值得看**：KIP-1333 是 Kafka 历史上第一次突破单日志段 2GB 上限——经过 `MetadataVersion` 升级后索引从 8 字节扩展到 12 字节格式，且保持向前兼容（旧索引文件自动检测格式）。KIP-1332 动态内存分配对高吞吐 Producer 场景是显著优化——不再需要预分配固定大小的 buffer pool。KIP-1360 同步镜像则是 Kafka 向零 RPO 灾备迈出的关键一步。

另外，4.3.1（6 月 25 日发布）修复了 Kafka Streams RocksDB 原生内存泄漏（[KAFKA-20616](https://issues.apache.org/jira/browse/KAFKA-20616)），如果你在生产环境用 Kafka Streams 且 4.3.0 遇到过进程 RSS 持续增长的问题，建议优先升级。

- **适合谁**：使用 Kafka 的数据平台团队、关注流处理和大数据基础设施的后端架构师。

- **链接**：[Kafka 4.4.0 Release Plan](https://cwiki.apache.org/confluence/display/KAFKA/Release+Plan+4.4.0) · [Kafka Monthly Digest June 2026](https://developers.redhat.com/blog/2026/07/01/kafka-monthly-digest-june-2026/)

## 工具推荐

### 6. 开源 AI 编码 Agent 格局变化：Kilo Code 接棒 Roo Code，本地模型赶超闭源

- **是什么**：2026 年 7 月，开源 AI 编码 Agent 领域悄然完成了一次格局洗牌。Roo Code 于 5 月 15 日归档后，**Kilo Code** 作为活跃 fork 接棒，一周内融合了 Cline 的优质特性，新增并行子任务、检查点恢复和按任务预算的成本上限模式。与此同时，[开源编码模型排行榜](https://dev.to/doremonai/the-5-open-source-coding-llms-you-should-be-running-locally-in-july-2026-3926)也发生了变化：

| 模型 | 参数量 | 亮点 |
|------|--------|------|
| Qwen3-Coder | 72B | SWE-bench Verified 78.6%，支持 120+ 语言，128K 上下文 |
| Devastral | 40B | 仓库级代码理解，单次 prompt 生成 README + 架构分析 |
| Codestral | 22B | M4 Ultra 上 80+ token/s，FIM 能力 IDE 补全最佳 |
| DeepSeek-Coder-V3 | 67B | HumanEval 96.2%，RLHF 变体擅长解释代码推理过程 |

- **为什么值得看**：两个趋势值得关注。一是**工具层面**：开源 Agent 不再只是 Claude Code 的"低配替代品"——Kilo Code 的并行子任务和成本上限是闭源工具没有的功能，Cline 的 "Plan Mode + Act Mode" 分离适合对代码变更质量要求高的场景，Continue 则在企业自托管和团队标准化上有独特优势。二是**模型层面**：Ollama、LM Studio、llama.cpp 都已加入原生 Agent 循环，本地跑 Qwen3-Coder 72B 量化版已经可以用单张 RTX 5090 完成自主调试、重构、写测试的多文件任务——不再依赖 API 订阅。

- **适合谁**：关注 AI 编程工具选型的开发者，特别是想在本地/内网运行编码 Agent 的团队。

- **链接**：[Kilo Code vs Cline vs Continue 对比](https://andrew.ooo/answers/kilo-code-vs-cline-vs-continue-open-source-coding-agents-july-2026) · [5 个本地开源编码 LLM](https://dev.to/doremonai/the-5-open-source-coding-llms-you-should-be-running-locally-in-july-2026-3926) · [Open-Source Coding Agents 全景图](https://ai-solutions.wiki/comparisons/open-source-coding-agents)

## 来源

1. [pgrust GitHub — malisper/pgrust](https://github.com/malisper/pgrust)
2. [pgrust Passes 100% of Postgres's Regression Tests — BytePith](https://bytepith.com/article/pgrust-passes-100percent-postgress-regression-tests)
3. [Deep Code CLI GitHub — lessweb/deepcode-cli](https://github.com/lessweb/deepcode-cli)
4. [虚拟线程放开并发闸门后，你的数据库连接池为什么先崩？— CSDN](https://blog.csdn.net/weixin_62242812/article/details/160392981)
5. [Spring Boot 3 开启虚拟线程后 HikariCP 调优 — WebKT](https://www.webkt.com/article/14110)
6. [Spring AI Alibaba GitHub — alibaba/spring-ai-alibaba](https://github.com/alibaba/spring-ai-alibaba)
7. [Spring AI Alibaba 1.0 GA 发布公告 — OSCHINA](https://www.oschina.net/comment/news/355617)
8. [Kafka 4.4.0 Release Plan — Apache Wiki](https://cwiki.apache.org/confluence/display/KAFKA/Release+Plan+4.4.0)
9. [Kafka Monthly Digest: June 2026 — Red Hat Developer](https://developers.redhat.com/blog/2026/07/01/kafka-monthly-digest-june-2026/)
10. [Kilo Code vs Cline vs Continue (July 2026) — andrew.ooo](https://andrew.ooo/answers/kilo-code-vs-cline-vs-continue-open-source-coding-agents-july-2026)
11. [The 5 Open-Source Coding LLMs — dev.to](https://dev.to/doremonai/the-5-open-source-coding-llms-you-should-be-running-locally-in-july-2026-3926)
