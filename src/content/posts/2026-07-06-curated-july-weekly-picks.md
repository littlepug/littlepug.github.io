---
title: 七月第二周技术精选：MCP Server 实战、ES 9.4 新特性与 AI 网关
date: 2026-07-06
categories: curated
tags: [curated, ai, java, spring, bigdata, tools]
keywords: 技术精选, Spring AI 2.0, MCP Server, Spring Boot 4.1, Elasticsearch 9.4, ES|QL Views, PromQL, DiskBBQ, Kafka 4.3.1, RocksDB, OmniRoute, AI网关, herdr, Logto, OIDC, 认证基础设施
excerpt: 七月第二周精选聚焦后端开发者的六个方向：Spring Boot 4.1 + Spring AI 2.0 用 @McpTool 注解构建 MCP Server 的完整实战、Elasticsearch 9.4 重大版本（ES|QL Views / PromQL 原生支持 / 向量搜索 3 倍提速）、Kafka 4.3.1 紧急修复 RocksDB 内存泄漏、OmniRoute 开源 AI 网关聚合 237 个模型服务、herdr 终端 Agent 多路复用器、Logto 面向 AI Agent 的开源认证基础设施。每条附原文链接，可验证。
cover: /images/covers/curated-july-2026.svg
---

七月第二周，后端技术圈迎来几个重要的版本发布：Elasticsearch 9.4 带来 ES|QL 成为一等公民、Kafka 4.3.1 修复了一个足够严重的 Streams 内存泄漏、Spring AI 2.0 + Spring Boot 4.1 的 MCP Server 开发体验已经打磨到「加几个注解就完事」的程度。再加上本周 GitHub Trending 上的几个新面孔，本期精选 **6 条** 内容，每条附带「是什么 / 为什么值得看 / 适合谁」。

## 代码小技巧

### 1. Spring Boot 4.1 + Spring AI 2.0：用 @McpTool 注解三步构建 MCP Server

- **是什么**：javatechonline.com 2026 年 7 月 1 日发布的实战教程，从零演示如何用 Spring Boot 4.1 + Spring AI 2.0 将一个普通的 Spring Bean 暴露为 AI 可调用的 MCP 工具。全程注解驱动——`@McpTool` 标记方法为工具、`@McpToolParam` 描述参数、`@McpResource` 暴露只读资源，Spring AI 在启动时自动扫描并生成 JSON Schema 注册到 MCP Server，零 XML、零手动回调。
- **为什么值得看**：如果你在 6 月关注了 Spring AI 2.0 GA 发布，这篇文章就是「动手篇」——你不需要先学 MCP 协议规范，不需要手写 JSON-RPC 处理逻辑，只要你会写 Spring Boot，就能在三步内把一个现有的 Service 类变成 AI Agent 可调用的工具。关键代码模式：

```java
@Component
public class ProductCatalogTools {
    @McpTool(name = "search_products", description = "按名称或分类搜索产品目录")
    public List<Product> searchProducts(
            @McpToolParam(description = "搜索关键词", required = true) String keyword) {
        // 你的业务逻辑
    }
}
```

配置文件也只需一行：`spring.ai.mcp.server.protocol: STREAMABLE`（注意 SSE 在 2.0 中已弃用）。文章还给出了用 curl 直接发送 JSON-RPC 测试的完整命令，以及 MCP Inspector 可视化调试的接入方法。最实用的部分是两个「容易踩坑但报错信息不友好」的场景：SYNC Server 静默忽略 `Mono<>` 返回值、Web 客户端和 CLI 客户端需要不同的 starter 依赖。

- **适合谁**：手上有 Spring Boot 服务、想快速接入 AI Agent 生态的 Java 后端开发者。特别是那些存量系统很多、不想大动干戈重构的团队。
- **链接**：[Build Your First MCP Server with Spring Boot 4.1 and Spring AI 2.0](https://javatechonline.com/mcp-server-with-spring-boot-4-and-spring-ai-2/)

## 技术科普

### 2. Elasticsearch 9.4.3 发布：ES|QL Views 正式可用 + PromQL 原生支持 + 向量搜索提速 3 倍

- **是什么**：Elasticsearch 9.4 于 2026 年 5 月 5 日发布初始版本，最新补丁版本 9.4.3 于 6 月 30 日发布。这是围绕三大主题的重大升级：(1) ES|QL 成为一等查询引擎，支持 Views（虚拟索引封装管道逻辑）；(2) PromQL 作为技术预览源命令，可直接将 ES 作为 Prometheus 存储后端；(3) DiskBBQ 向量搜索算法重大升级，在受限预过滤场景下性能提升 3 倍以上。
- **为什么值得看**：这个版本的三个升级方向对后端数据工程师都很实用。

**ES|QL Views** 解决了多个团队共用同一套日志索引时的查询复用问题：把 `RENAME`、`EVAL`、`WHERE` 等管道步骤封装成一个命名视图，下游只需要 `FROM view_name`，不用关心底层索引字段名变化。对于有大量 Kibana 仪表板和告警规则的团队，这相当于给查询逻辑加了一层抽象。

**PromQL 支持**是技术预览，但意味着 Prometheus 用户可以用 ES 替代部分 TSDB 存储的需求——特别是当你已经有 ES 集群、不想再维护一套 Prometheus 存储的时候。通过 `POST /_prometheus/api/v1/write` 端点接收 Prometheus remote write 二进制协议即可。

**DiskBBQ 性能提升**最直接：基于 `bbq_disk` 的量化模式成为新索引默认值，受限预过滤场景下搜索速度提升 3 倍以上（实测）。配合 AVX-512 int8 内核和 bfloat16 评分器，对构建 RAG 或语义搜索系统的团队是免费的性能红利——升级后新建的 `semantic_text` 索引自动生效。此外，TSDB 索引的合成 ID 可降低 OTLP 指标存储最多 40%。

注意事项：现有 `dense_vector` 索引和 TSDB 索引需要重建才能获得性能/存储收益；ES|QL Views 与 DLS/FLS 互斥，需评估安全策略的兼容性。

- **适合谁**：使用 Elasticsearch 做日志分析、可观测性存储或向量搜索的后端团队，以及有 Prometheus + ES 双栈维护负担的 SRE。
- **链接**：[Elasticsearch 9.4 — What's New](https://versionlog.com/elasticsearch/9.4/) · [ES|QL Views 官方文档](https://www.elastic.co/guide/en/elasticsearch/reference/9.4/esql-views.html)（待核实）

### 3. Kafka 4.3.1：修复 Kafka Streams RocksDB 原生内存泄漏

- **是什么**：Apache Kafka 4.3.1 于 2026 年 6 月 25 日发布，这是一个 bugfix 版本，修复了 15 个 issue。其中最关键的修复是 [KAFKA-20616](https://issues.apache.org/jira/browse/KAFKA-20616)：Kafka Streams 中 RocksDB 状态存储的原生内存泄漏。
- **为什么值得看**：对于正在使用 Kafka Streams 的生产团队，这是一个需要认真评估升级的版本。RocksDB 是 Kafka Streams 默认的状态存储引擎，原生内存泄漏的后果不是 OOM Killer 能救的——JVM 堆是安全的，但进程的 RSS 会持续增长直到被操作系统杀进程。官方在 4.3.0（5 月 22 日发布）中做了大量新特性——KIP-1073 消费者无群组协调器、KIP-1105 JBOD 非 JBOD 磁盘迁移、KIP-1081 动态消费者配置——4.3.1 作为补丁版本，建议所有 4.3.0 用户升级。如果你还在 4.2.x 或更低版本，这个 bug 也可能影响你，因为 RocksDB 泄漏可能存在于多个版本中（具体影响范围待核实，建议查阅 JIRA issue 详情）。
- **适合谁**：使用 Kafka Streams 的后端团队，特别是状态存储较大的流处理应用。
- **链接**：[Apache Kafka 4.3.1 Release Announcement](https://kafka.apache.org/blog/2026/06/25/apache-kafka-4.3.1-release-announcement/) · [Kafka 4.3.0 新特性详解](https://kafka.apache.org/blog/2026/05/22/apache-kafka-4.3.0-release-announcement/)

## 工具推荐

### 4. OmniRoute v3.8.44：开源 AI 网关，237 个模型服务一键聚合

- **是什么**：GitHub 本周 Trending 项目（W27 #8，累计 11,460 Stars），一个 TypeScript 编写的开源 AI 网关。它把 237 个 AI 模型服务提供商（含 90+ 免费）统一到一个 `/v1` 端点后面，支持 OpenAI 兼容 API，内置智能自动回退、RTK + Caveman 堆叠压缩（Token 节省 15%-95%）、速率限制处理，以及 MCP 和 A2A 协议。v3.8.44 于 7 月 4 日发布，47 位贡献者，4,500+ 次提交。
- **为什么值得看**：如果你和团队在使用 Claude Code、Codex、Cursor 等多个 AI 编码工具，每个工具各自对接不同的模型 API，OmniRoute 把"多模型管理"这件事从运维负担变成了基础设施：一个自托管网关，统一处理认证、路由、容错和成本优化。最打动人的两个设计：(1) "智能自动回退"——当一个免费提供商限流或宕机，自动切到下一个，对上层透明；(2) 压缩不是在请求发出后才做，而是在网关层做上下文压缩，这意味着你可以在 Claude Code 里继续写长 prompt，网关帮你把 token 消耗降下来。对后端团队来说，部署只需要 Node.js + pnpm，支持 Docker 和反向代理 basePath。
- **适合谁**：在团队中需要管理多个 AI 模型服务、或想降低 API 成本的 Tech Lead 和 DevOps/平台工程师。
- **链接**：[GitHub - diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) · [深度解读：OmniRoute LLM 路由层剖析](https://wangruofeng007.com/blog/2026-07/omniroute-llm-router-deep-dive/)

### 5. herdr：像 tmux 管理会话一样管理 AI Agent

- **是什么**：GitHub 本周 Trending 项目（W27 #12，累计 11,686 Stars），一个 Rust 编写的终端 Agent 多路复用器。约 10MB 单二进制，无外部依赖。它借鉴 tmux 的会话持久化、远程重连、多窗格和工作空间组织能力，让开发者像管理终端会话一样管理多个 AI 编码 Agent（Claude Code、Codex、Cursor 等），在独立的 worktree 中并行运行、随时挂起恢复。
- **为什么值得看**：一个越来越常见的场景：你同时开三个 Claude Code 实例——一个跑测试、一个重构模块、一个研究新 API——在三个终端窗口之间切换的认知负荷会随 Agent 数量线性增长。herdr 解决的就是这个分层问题：Agent 变成类似 tmux window 的存在，`Ctrl+B` 级别的快捷键切换、session 级别的状态持久化。Rust 实现意味着启动快、内存占用可控，10MB 单二进制部署零摩擦。对于已经把 AI Agent 当日常工具的后端开发者，这是基础设施级别的体验优化。
- **适合谁**：重度使用 AI 编码 Agent 的后端开发者，以及需要同时管理多个 Agent 任务的 Tech Lead。
- **链接**：[GitHub - ogulcancelik/herdr](https://github.com/ogulcancelik/herdr)

### 6. Logto：面向 SaaS 和 AI Agent 的开源认证基础设施

- **是什么**：GitHub 本周 Trending 项目（W27 #18，累计 13,771 Stars），一个基于 OIDC 和 OAuth 2.1 的开源认证与授权平台，专为 SaaS 和 AI 应用设计。提供多租户、企业 SSO、RBAC、MCP 集成和预建登录 UI，支持 30+ 框架的 SDK。TypeScript 编写，MPL-2.0 协议。
- **为什么值得看**：三个场景让 Logto 对后端开发者特别实用：(1) **SaaS 多租户开箱即用**——组织级别的用户隔离、基于角色的访问控制，不需要从零搭一套 Keycloak；(2) **AI Agent 场景的原生适配**——MCP 集成意味着 AI Agent 可以通过协议直接与认证系统交互，这在 Agent-to-Agent 通信和 Agent 操作 SaaS 平台的场景中会越来越重要；(3) **开发体验友好**——预建的登录、注册、MFA 流程 UI，加上 30+ 框架的 SDK，接入时间以小时计而不是天计。相比 Auth0（商业闭源）和 Keycloak（Java 生态、部署重），Logto 在轻量和现代化体验之间找到了一个不错的平衡点。
- **适合谁**：正在构建 SaaS 产品、需要快速接入认证体系的后端团队，以及对 AI Agent 认证场景感兴趣的平台开发者。
- **链接**：[GitHub - logto-io/logto](https://github.com/logto-io/logto) · [Logto 深度解读：面向 SaaS 与 AI Agent 的认证基础设施](https://wangruofeng007.com/blog/2026-06/logto-auth-infra-mcp-agent-ready/)

## 来源

1. [Build Your First MCP Server with Spring Boot 4.1 and Spring AI 2.0 — JavaTechOnline](https://javatechonline.com/mcp-server-with-spring-boot-4-and-spring-ai-2/) (2026-07-01)
2. [Elasticsearch 9.4 — What's New, Support Lifecycle & EOL — VersionLog](https://versionlog.com/elasticsearch/9.4/) · [ES|QL Views 官方文档（待核实）](https://www.elastic.co/guide/en/elasticsearch/reference/9.4/esql-views.html)
3. [Apache Kafka 4.3.1 Release Announcement](https://kafka.apache.org/blog/2026/06/25/apache-kafka-4.3.1-release-announcement/) (2026-06-25) · [Kafka 4.3.0 新特性](https://kafka.apache.org/blog/2026/05/22/apache-kafka-4.3.0-release-announcement/) (2026-05-22)
4. [GitHub - diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) · [深度解读](https://wangruofeng007.com/blog/2026-07/omniroute-llm-router-deep-dive/) (2026-07)
5. [GitHub - ogulcancelik/herdr](https://github.com/ogulcancelik/herdr) (W27 Trending #12, 11.6K Stars)
6. [GitHub - logto-io/logto](https://github.com/logto-io/logto) · [深度解读](https://wangruofeng007.com/blog/2026-06/logto-auth-infra-mcp-agent-ready/) (2026-06-29)
