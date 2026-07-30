---
title: 七月第五周技术精选：Kafka 4.4 路线图与 ES 列存引擎
date: 2026-07-30
categories: curated
tags: [curated, ai, java, spring, bigdata, tools]
keywords: 技术精选, Kafka 4.4, Elasticsearch 列存, Spring AI 2.0, Coding Agent, Kilo Code, GraalVM Native Image, AgentScope Java, 虚拟线程
excerpt: 七月第五周精选聚焦后端开发者不可错过的七个方向：Kafka 4.4.0 Feature Freeze 达成，KIP-1357/1358/1360 三大新特性预览；Elasticsearch 宣布列存引擎在 9.5 成为一等公民，存储降 6.6 倍、查询快 160 倍；Spring AI 2.0 Advisor 链架构深度解读；开源 Coding Agent 三强（Kilo Code/Cline/Continue）选型指南；GraalVM 25.1 月更发布 + Spring Boot Native Image 生产部署实战；AgentScope Java 版登上 GitHub Trending；Java 虚拟线程生产踩坑实录。每条附原文链接，可验证。
cover: /images/covers/curated-july-w5-2026.svg
---

七月第五周，后端技术圈的热度集中在三个方向：**Kafka 4.4 路线图敲定**、**Elasticsearch 存储引擎范式转变**、**AI Coding Agent 生态持续分化**。

昨天（7 月 29 日），Apache Kafka 4.4.0 达成 Feature Freeze——所有主要特性已完成合并，进入四周稳定期。Elasticsearch 这边，官方博客宣布列存引擎（Columnar Mode）将在 9.5 版本成为「一等公民」，存储和查询性能同时飞跃。Spring AI 2.0 的 Advisor 链架构为 Java AI 开发提供了全新的可组合范式。开源 Coding Agent 这边，Roo Code 归档后的生态正在快速重构：Kilo Code 接棒成为增长最快的开源 Agent，Cline 守住「透明可控」定位，Continue 深耕企业市场。

本期精选 **7 条** 内容，每条附带「是什么 / 为什么值得看 / 适合谁」。

## 本周精选

### 1. Kafka 4.4.0 Feature Freeze 达成：三大 KIP 预览

- **是什么**：Apache Kafka 4.4.0 于 7 月 29 日达成 Feature Freeze，所有主要特性已合并，接下来进入四周稳定期，预计最早 9 月 9 日正式发布。本次值得关注的三个 KIP：

  **KIP-1357：Broker 端自定义 Assignor**——Kafka 4.2.0 引入的服务端 Rebalance 协议（KIP-1071）虽然性能更好，但不再支持用户自定义的 Partition 分配策略。KIP-1357 补齐了这个缺口，让 Streams 用户可以把自己的 Assignor 逻辑注册到 Broker 端，在享受新协议性能的同时保留定制灵活性。

  **KIP-1358：渐进式 Preferred Leader 选举**——当前 Kafka 的 Preferred Leader 选举在每个 `leader.imbalance.check.interval.seconds`（默认 5 分钟）触发时可能一次性发起数千次选举，对延迟产生明显冲击。KIP-1358 引入了可配置的选举节流机制，让 Leader 切换以渐进方式完成，降低对在线流量的影响。

  **KIP-1360：集群同步镜像（Synchronous Mirroring）**——基于 KIP-1279 的跨集群复制能力，进一步支持同步镜像模式：一条消息只有在所有镜像集群的 ISR 都确认收到后才算写入成功。这意味着 Kafka 首次原生支持零 RPO 的灾备方案，以及跨集群的 Kafka Connect 和 Streams 平滑迁移。

- **为什么值得看**：三个 KIP 覆盖了 Streams 可定制性、运维稳定性、灾备能力三个维度，每一条都直指当前生产环境的真实痛点。4.4.0 还有一个 pragmatical 的变化：`broker.id` 配置正式标记为 Deprecated（KIP-1232），转向 `node.id`——这是 KRaft 彻底替换 ZooKeeper 之路上的又一块拼图。

- **适合谁**：维护 Kafka 集群的后端/SRE 团队，以及正在规划 Kafka 版本升级路线的架构师。

- **链接**：[Kafka 4.4.0 Release Plan — Apache Confluence](https://cwiki.apache.org/confluence/x/XoA_Gg) · [Kafka Monthly Digest: June 2026 — Red Hat Developer](https://developers.redhat.com/blog/2026/07/01/kafka-monthly-digest-june-2026)

### 2. Elasticsearch 列存引擎：9.5 将成「一等列存数据库」

- **是什么**：Elastic 官方博客 7 月 7 日发文宣布，Elasticsearch 的列存引擎（Columnar Mode）将在 9.5 版本正式成为「一等公民」。这意味着同一份数据可以同时支持全文检索（行存）、时序聚合（列存）和向量检索——三种存储模式共享一份写入路径，不再需要为不同查询模式维护多套数据管道。

  目前 9.4 版本的列存引擎已经在 metrics 场景下交出了惊艳的成绩单：**存储减少 6.6 倍、查询快 160 倍**、原生支持 PromQL 和 OpenTelemetry。配合 Prometheus Remote Write 协议的原生兼容（`POST /_prometheus/api/v1/write`），Elasticsearch 可以作为 Prometheus 的 drop-in 存储后端——不需要改任何 Exporter 或 Grafana 面板配置。

  同期，9.4 还带来了 FIPS 140-3 合规支持（对政企和金融行业是关键门槛），以及 simdvec 向量检索引擎的持续优化（利用 AVX-512 指令集实现 bfloat16 标量器，向量吞吐再翻倍）。

- **为什么值得看**：这不是一个「ES 又加了新功能」的常规更新，而是存储引擎的范式转变。过去你用 Elasticsearch 存日志、用 ClickHouse 做分析、用 Prometheus 存指标的「三件套」架构，正在被单一引擎 + 多模存储取代。对于已经跑着 ELK 栈的团队来说，这意味着可以用同一套集群吃掉原来需要多个专用数据库才能覆盖的场景，运维复杂度和资源成本都有望大幅下降。

- **适合谁**：维护 ELK 栈的后端/SRE 团队，以及正在评估时序数据库选型（InfluxDB/TimescaleDB/ClickHouse vs ES）的架构师。

- **链接**：[Why Elasticsearch is becoming a columnar database — Elastic Blog](https://www.elastic.co/search-labs/blog/elasticsearch-columnar-database) · [Elasticsearch 9.4 Release Notes — VersionLog](https://versionlog.com/elasticsearch/9.4/) · [Bringing it together: How we rebuilt Elasticsearch as a columnar metrics engine — Elastic Blog](https://www.elastic.co/search-labs/blog/elasticsearch-metrics-columnar-engine)

## 技术科普

### 3. Spring AI 2.0 Advisor 链：工具调用的可组合架构

- **是什么**：Spring AI 2.0.0 GA 于 6 月 12 日发布（基于 Spring Boot 4.1.0 + Spring Framework 7.0 + Jakarta EE 11），其最值得后端开发者关注的设计是 **Advisor 链 + ToolCallingAdvisor 自动注册**。

  核心机制：`ChatClient` 内置一条 Advisor 链，每次请求依次经过链上的 Advisor 处理。`ToolCallingAdvisor` 被自动注册到链中，接管完整的工具调用循环——模型返回工具调用请求 → 执行工具 → 结果返回模型 → 模型决定是否继续调用工具 → 循环，直到模型产出最终回复。

  这个设计有两个精妙之处：

  1. **循环可组合**——Advisor 链支持循环重入，同一套机制既可以做工具调用，也可以做结构化输出的重试循环、评估循环（让模型自我检查和修正输出），不需要为每种循环写独立的控制逻辑。

  2. **可插拔**——你可以继承 `ToolCallingAdvisor` 重写关键方法来定制工具调用行为（比如添加权限校验、调用审计日志），也可以临时关闭自动工具调用：`.advisors(AdvisorParams.toolCallingAdvisorAutoRegister(false))`。

  MCP 2.0 集成也同步升级：传输层从 MCP Java SDK 移入 Spring AI 框架本身（版本不再撕裂），Streamable HTTP 替代 SSE 成为默认传输（无状态、可水平扩展），本地集成继续用 STDIO。

- **为什么值得看**：Advisor 链的设计把「工具调用」从模型能力变成框架能力——这不是在 Spring AI 里调用 OpenAI Function Calling 的简单封装，而是一套与模型无关的、可在框架层编排的工具调用引擎。对于后端团队来说，这意味着你可以用写 Spring Interceptor 的思维来编排 AI Agent 的工具调用流程，不需要理解每个 LLM 提供商的 Function Call 协议差异。

- **适合谁**：正在或计划用 Java 构建 AI Agent 应用的后端团队，以及已经在用 Spring AI 1.x 考虑升级的开发者。

- **链接**：[Spring AI 2.0 正式发布：Java AI 开发的分水岭来了 — 腾讯云开发者社区](https://cloud.tencent.com/developer/article/2712874) · [Spring AI 2.0 深度解读：从架构重构到生产实践 — CSDN](https://blog.csdn.net/qq_38235138/article/details/162684520) · [Build an MCP Server in Java with Spring AI — patotski.com](https://patotski.com/blog/mcp-server-java-spring-ai)

## 工具推荐

### 4. 开源 Coding Agent 三强格局（2026 年 7 月）

- **是什么**：随着 Roo Code 于 5 月 15 日归档，开源 AI Coding Agent 生态在 2026 年 7 月形成了清晰的三强格局：

  | 工具 | Stars（≈） | 定位 | 最适合 |
  |------|-----------|------|--------|
  | **Kilo Code** | 25.6k | Roo Code 接班人，最自主 | 多文件重构、追求效率 |
  | **Cline** | 64.3k | 透明可控、每步可审 | 生产代码、合规场景 |
  | **Continue** | 34.7k | 聊天优先、Agent 可选 | 企业自托管、JetBrains |

  **Kilo Code** 是增长最快的选手（月度 +32.6%），v5.x 带来了重构的任务管理 UI（并行子任务 + 检查点恢复）、合并了 Cline 的最佳特性、新增了对 Kimi K2/Qwen 3/DeepSeek V4 的一等支持，以及按任务计费的「成本上限」模式。

  **Cline** 坚持「Plan 模式」和「Act 模式」分离——先审计划再执行代码，对生产环境编辑天然友好。MCP 原生工具集成成熟，在 Claude Sonnet 5 上的长任务稳定性经过大量验证。

  **Continue** 是唯一同时支持 VS Code 和 JetBrains IDE 的开源方案。它用配置文件（`.continue/config.yaml`）管理一切——模型、Prompt、上下文提供器全部版本化，企业自托管支持审计日志和模型路由策略。

- **为什么值得看**：三个工具代表了三种 Agent 哲学——Kilo Code 让你「信任 Agent」、Cline 让你「审查 Agent」、Continue 让你「管理 Agent」。选择哪个取决于你的团队对 AI 编码的风险容忍度，不存在「最好的」，只有「最适合的」。切换成本很低（一个下午就能试完三个），建议都装一遍跑自己的代码库看看效果。

- **适合谁**：所有在日常工作中使用 AI 编码工具的后端开发者，以及需要为团队制定 AI 工具选型标准的 Tech Lead。

- **链接**：[Kilo Code vs Cline vs Continue: Open Coding Agents (July 2026) — andrew.ooo](https://andrew.ooo/answers/kilo-code-vs-cline-vs-continue-open-source-coding-agents-july-2026) · [AI Coding Agent Landscape — irrlicht.io](https://irrlicht.io/landscape)（Stars 数据截至 2026-07-05）

### 5. AgentScope Java：阿里开源的 Java Agent 框架

- **是什么**：AgentScope Java（`agentscope-ai/agentscope-java`）是阿里开源的面向 Java 生态的 Agent 编程框架，本周登上 GitHub Trending（Java 分类），累计约 8,000+ Stars。它的核心理念是「Agent-Oriented Programming」——把 Agent 作为一等编程抽象，提供 Agent 的创建、编排、通信和状态管理能力。

  关键特性：
  - **分布式 Agent**——支持多 Agent 协作，Agent 之间可以跨进程通信
  - **生产级长运行**——Agent 可以持续运行数小时甚至数天，内置状态持久化和故障恢复
  - **LLM 无关**——可以接入 OpenAI、Anthropic、通义千问、DeepSeek 等多个模型提供商
  - **MCP 协议支持**——Agent 可以通过 MCP 协议调用外部工具和数据源

- **为什么值得看**：Java 生态的 AI Agent 框架选择一直不多——LangChain4j 偏「工具包」风格，Spring AI 更偏「Spring 集成」。AgentScope Java 填补了「开箱即用的分布式 Agent 运行时」这个空白。如果你在做企业级的 Agent 应用（比如客服 Agent 集群、自动化运维 Agent），它的分布式和长运行能力是差异化的核心卖点。Apache 2.0 协议，商用友好。

- **适合谁**：用 Java 构建 AI Agent 应用的后端团队，特别是需要多 Agent 协作和长运行场景的企业开发者。

- **链接**：[AgentScope Java — GitHub](https://github.com/agentscope-ai/agentscope-java) · [GitHub Trending Java (2026-07-27) — CSDN](https://adg.csdn.net/6a675154662f9a54cb94bf53.html)（Stars 数据待核实）

## 代码小技巧

### 6. GraalVM 25.1 + Spring Boot Native Image：生产部署实战

- **是什么**：GraalVM 从 25.1 版本（2026 年 6 月）开始改为**月度发布**节奏——每月一个 feature release，季度版本同时包含 JDK 安全补丁。配合 Spring Boot 4.1 的 AOT 处理成熟度，Native Image 已经从「尝鲜」进入「生产默认」阶段。

  一组经过验证的生产数据（Spring Boot 支付授权服务，4 核 8G 实例）：

  | 指标 | JVM 模式 | Native Image | 提升 |
  |------|---------|-------------|------|
  | 冷启动 | 4.2s | 87ms | 48x |
  | 稳态内存 | 348MB | 71MB | 4.9x |
  | 峰值吞吐 | 基准 | -12% | — |
  | P99 延迟 | 基准 | -9% | ✅ |
  | 容器镜像 | 312MB | 78MB | 4x |

  关键洞察：Native Image 的峰值吞吐比 JVM 低约 12%（JIT 编译器在长跑中有优势），但 P99 延迟反而更低——因为没有 JIT 预热曲线和 GC 暂停方差。对 I/O 密集型微服务和 Serverless 场景，Native Image 的冷启动和内存优势远超那 12% 的吞吐差距。

  Spring Boot 4.1 的 AOT 处理器已经能自动覆盖大部分 Spring 托管 Bean 的反射/代理需求。需要手动添加 Hints 的场景主要集中在：自定义 `FactoryBean`、字节码操作库（ByteBuddy）、以及使用 `Class.forName()` 动态加载的第三方库。

- **为什么值得看**：这篇文章不是「跑个 Hello World 测启动速度」的教程，而是生产环境的真实数据 + 踩坑清单。特别值得关注的是 `-H:+ReportExceptionStackTraces` 在排查 Native Image 构建失败时的价值，以及用 `RuntimeHintsRegistrar` 集中管理反射配置的最佳实践。

- **适合谁**：正在评估 Spring Boot Native Image 投入生产的后端团队，以及 K8s 集群内存成本敏感、需要快速扩缩容的 SRE。

- **链接**：[Spring Boot 4.1 GraalVM Native Image Production Deployment Guide — Pavan Rangani](https://blogs.pavanrangani.com?p=4137/) · [GraalVM Native Images in Production — BackendBytes](https://www.backendbytes.com/articles/graalvm-native-images-java-production/) · [GraalVM 25.1 Release — graalvm.org](https://www.graalvm.org/)

### 7. Java 虚拟线程生产踩坑实录：我们把它从生产环境移除了

- **是什么**：一篇在掘金引发广泛讨论的实战文章——作者团队在 JDK 21 上将核心服务全面切换到虚拟线程，半年后决定部分回退。文章的核心价值不在于「否定虚拟线程」，而在于把虚拟线程的三个关键限制讲透了：

  **坑一：synchronized 导致 pinning**——虚拟线程进入 `synchronized` 块或执行 native 方法时会被「钉住」到载体线程上，无法卸载。一个看似无害的 `synchronized` 就可能让整个载体线程池耗尽。排查方法：启动时加 `-Djdk.tracePinnedThreads=full` 记录所有 pinning 事件。修法：把 `synchronized` 换成 `ReentrantLock`。

  **坑二：ThreadLocal 膨胀**——虚拟线程可以轻松创建几十万个，每个都带 ThreadLocal 会导致内存暴涨。修法：用 JDK 21 的 `ScopedValue` API 替代 ThreadLocal 传递请求上下文。

  **坑三：连接池仍然是瓶颈**——虚拟线程只解决了线程数瓶颈，数据库连接池（HikariCP）和 Redis 连接池的 `max-size` 仍然需要根据实际资源限制来配置。虚拟线程不会魔法般地让你的数据库能承受更多并发连接。

- **为什么值得看**：在铺天盖地的「虚拟线程性能提升 300%」文章之后，这篇「反向经验」非常珍贵。它提醒我们：虚拟线程不是银弹——I/O 密集型场景是它的主场，但如果你代码里有大量 `synchronized` 或 CPU 密集型计算，迁移前需要先做代码审计。作者最终的选择也很务实：网关层保留虚拟线程、数据处理层回归平台线程——场景选择比技术正确性更重要。

- **适合谁**：正在或计划从 JDK 17 升级到 JDK 21 + 开启虚拟线程的后端团队。建议在完整阅读本文后再做迁移计划。

- **链接**：[Java 虚拟线程发布两年后，我们把它从生产环境移除了 — 掘金](https://juejin.cn/post/7662248944408002560) · [SpringBoot3 + Java21 虚拟线程实战：吞吐量提升 300% — 掘金](https://juejin.cn/post/7657737294859436032)

## 来源

1. [Kafka 4.4.0 Release Plan — Apache Confluence](https://cwiki.apache.org/confluence/x/XoA_Gg)
2. [Kafka Monthly Digest: June 2026 — Red Hat Developer](https://developers.redhat.com/blog/2026/07/01/kafka-monthly-digest-june-2026)
3. [Why Elasticsearch is becoming a columnar database — Elastic Blog](https://www.elastic.co/search-labs/blog/elasticsearch-columnar-database)
4. [Elasticsearch 9.4 Release Notes — VersionLog](https://versionlog.com/elasticsearch/9.4/)
5. [Bringing it together: How we rebuilt Elasticsearch as a columnar metrics engine — Elastic Blog](https://www.elastic.co/search-labs/blog/elasticsearch-metrics-columnar-engine)
6. [Spring AI 2.0 正式发布：Java AI 开发的分水岭来了 — 腾讯云开发者社区](https://cloud.tencent.com/developer/article/2712874)
7. [Spring AI 2.0 深度解读：从架构重构到生产实践 — CSDN](https://blog.csdn.net/qq_38235138/article/details/162684520)
8. [Build an MCP Server in Java with Spring AI — patotski.com](https://patotski.com/blog/mcp-server-java-spring-ai)
9. [Kilo Code vs Cline vs Continue: Open Coding Agents (July 2026) — andrew.ooo](https://andrew.ooo/answers/kilo-code-vs-cline-vs-continue-open-source-coding-agents-july-2026)
10. [AI Coding Agent Landscape — irrlicht.io](https://irrlicht.io/landscape)
11. [AgentScope Java — GitHub](https://github.com/agentscope-ai/agentscope-java)
12. [GitHub Trending Java (2026-07-27) — CSDN](https://adg.csdn.net/6a675154662f9a54cb94bf53.html)
13. [Spring Boot 4.1 GraalVM Native Image Production Deployment Guide — Pavan Rangani](https://blogs.pavanrangani.com?p=4137/)
14. [GraalVM Native Images in Production — BackendBytes](https://www.backendbytes.com/articles/graalvm-native-images-java-production/)
15. [GraalVM 25.1 Release — graalvm.org](https://www.graalvm.org/)
16. [Java 虚拟线程发布两年后，我们把它从生产环境移除了 — 掘金](https://juejin.cn/post/7662248944408002560)
17. [SpringBoot3 + Java21 虚拟线程实战：吞吐量提升 300% — 掘金](https://juejin.cn/post/7657737294859436032)
