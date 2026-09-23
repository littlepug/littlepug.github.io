---
title: 2026年9月23日技术精选：JDK 27 收尾与 Agent 身份边界
date: 2026-09-23
categories: curated
tags: [curated, ai, java, spring, bigdata, tools]
keywords: JDK 27, JVMCI, GraalVM, jcmd, RestTestClient, RestClient, Spring Boot 4.2, Elasticsearch, 数据平台整合, OpenHands, Microsoft Agent Framework, MCP, claude-code-templates, 后端开发
excerpt: 九月收官周，两条主线各自收口。Java 侧聚焦 JDK 27 的「收尾」——JVMCI 被移除的争议、以及发布说明里几个被忽视的小改动；Spring Boot 4.2 给出测试层的迁移信号。Agent 侧聚焦「补边界」——Microsoft Agent Framework 给多租户补身份边界，OpenHands 给 MCP 工具补作用域，加上 Claude Code 的配置层生态。大数据方向由 Elasticsearch 的「数据平台整合」承担。
cover: /images/covers/curated-september-23-2026.svg
---

九月收官周，两条主线各自收口。Java/Spring 侧进入 JDK 27 发布后的「收尾期」：大特性前几期已讲透，这期把目光转向两个被忽视的角落——JVMCI 被移除的来龙去脉，以及发布说明里几个真正能落进运维脚本的小改动；Spring Boot 4.2 则在测试层给出了第二个迁移信号。Agent 侧延续「给 agent 装边界」的主题，但焦点从上一期的「沙盒与审计流程」收窄到「身份与权限边界」——多租户框架在补身份、编辑工具在补 MCP 作用域，这一周的关键词是「最小权限」。

大数据组件这周依旧安静：Kafka 4.4.0 仍卡在 RC 投票（RC1 已切，KAFKA-21106 尚未解决，release manager 口径「至少还需两周」），Elasticsearch 9.6 还在 SNAPSHOT、9.5.4 补丁已发。本期大数据方向改由 Elastic 官方一篇「数据平台整合成本」的长文承担，它比版本号更值得后端架构师读。

## 代码小技巧

### 1. JDK 27 发布说明里几个被忽视的小改动

**是什么**：JDK 27 的 9 个 JEP 已经铺天盖地，但发布说明里还有几个「非 JEP」的小改动，对日常运维和排障更实在：

- **`jcmd VM.security_properties`**：JDK 27 给 `jcmd` 补上了打印 Java 安全属性的命令，输出格式脚本友好，不用再翻代码去核对当前 JVM 的安全配置；
- **`VM.info` 与致命错误日志报告文件描述符数量**：现在 `jcmd VM.info` 和 HotSpot 崩溃日志会直接给出当前进程打开的文件描述符数——高峰期因 fd 耗尽而崩溃时，这就是排障的第一手证据；
- **内置 `HttpServer` 路径匹配变更**：`com.sun.net.httpserver.HttpServer` 以前注册 `/foo` 会连 `/foobar` 一起匹配，JDK 27 改为完整路径段匹配，`/foo` 不再命中 `/foobar`。

```bash
# 查看当前 JVM 的安全属性（脚本友好输出）
jcmd <pid> VM.security_properties

# 顺带看一眼当前进程打开的文件描述符数量
jcmd <pid> VM.info
```

**为什么值得看**：这几项都不是「大特性」，却是安全巡检和线上排障时反复出现的手工活。`VM.security_properties` 把「安全配置到底是什么」变成一条命令，fd 数量直接把「资源泄漏」从猜变成可观测，`HttpServer` 的路径匹配变更则可能悄悄改变存量服务的路由行为——升级前值得扫一遍自己是否依赖了旧的前缀匹配。

**适合谁**：负责 JDK 27 升级、以及日常用 `jcmd` 做安全巡检和资源排障的后端 / 平台工程师。

原文：<https://www.jdon.com/94925-in-depth-interpretation-of-jdk-27-new-features.html>

## Spring Boot 实践

### 2. RestTestClient 登场：Spring Boot 4.2 测试层的第二个迁移信号

**是什么**：Spring Boot 4.2.0-M1 在弃用 `RestTemplate` 之外，还弃用了它的测试搭档 `TestRestTemplate`，官方推荐的替代品是 `RestTestClient`——一个基于 `RestClient` 的测试封装。它保留了 WebTestClient 那种流畅的链式断言风格，但不用引入 reactive 依赖：

```java
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureRestTestClient
class OrderControllerTest {
    @Autowired RestTestClient restTestClient;

    @Test void shouldReturnOrder() {
        restTestClient.get()
            .uri("/orders/42")
            .exchange()
            .expectStatus().isOk()
            .expectBody(OrderResponse.class)
            .value(order -> {
                assertThat(order.id()).isEqualTo(42);
                assertThat(order.status()).isEqualTo("PLACED");
            });
    }
}
```

**为什么值得看**：`MockMvc` 绑死 `DispatcherServlet` 内部细节、`WebTestClient` 又拉着 webflux 进来、`TestRestTemplate` 没有断言链——三种老方案各有痛点，`RestTestClient` 把「阻塞式 HTTP 测试」这件事实打实做顺了。更关键的是一个时间线提醒：Spring Boot 3.5 已于 2026-06-30 EOL，4.2 GA 预计 11 月，届时 4.1 里的弃用警告会变成「移除」。与其等到升级时 build 报错，不如现在就把新代码默认写成 `RestClient` + `RestTestClient`，存量代码用 `RestClient.create(restTemplate)` 渐进迁移。

**适合谁**：维护 Spring Boot 微服务、还在用 `RestTemplate`/`TestRestTemplate` 做 HTTP 调用和集成测试的团队；正在做 4.x 升级评估的架构师。

原文：<https://blogs.jsbisht.com/blog/spring-boot-4-resttestclient-for-http-tests>

## 技术科普

### 3. JVMCI 被移除：GraalVM 的 JIT 通路为什么被拆了

**是什么**：JDK 27 里最「安静」却最影响深远的一个改动，是移除了实验性的 JVM Compiler Interface（JVMCI，JDK-8382582）。JVMCI 允许用 Java 写的编译器（典型就是 Graal 的 JIT）替换 HotSpot 默认的 C2 编译器，Graal JIT、Truffle 系语言（GraalJS、JRuby）都依赖它。这次移除连带删掉了 `jdk.internal.vm.ci` 模块、`jdk.graal.compiler` 模块、所有带 JVMCI 的编译标志，以及 `-XX:+UseGraalJIT` 参数。

**为什么值得看**：这是一次「维护成本 vs 生态」的公开博弈，值得后端团队理解背后的取舍逻辑。Oracle 的理由是：GraalVM 从 OpenJDK 分离后，代码里残留 252 处 `#ifdef INCLUDE_JVMCI` 分支，约 1.5% 的 JDK 提交都要额外考虑 JVMCI 兼容。Amazon 的 Paul Hohensee 公开反对，列出真实依赖方：GraalJS、JRuby、TornadoVM，以及 Maven Central 上 433 个 GraalJS 依赖项。但最终 HotSpot 组判定「没有足够理由保留」，仍决定移除，同时撤回了对 Graal/Metropolis 项目的赞助。实际影响分化明显：标准 OpenJDK 27 跑不了 Graal JIT，GraalVM 自身也没有 JDK 27 版本（当前基于 JDK 25，下一站 JDK 29）；高性能计算框架 TornadoVM 则被迫砍掉 JVMCI 依赖、改用反射 + ASM + Unsafe 以兼容 JDK 21～27。对绝大多数开发者，这件事影响几乎为零，但它揭示了 JDK 演进的真实代价：每一个「实验性」接口，都会在未来变成主干的维护负债。

**适合谁**：关注 JDK 演进路线、在评估 GraalVM/Truffle 生态、或做高性能 Java 计算（TornadoVM 这类）的工程师。

原文：<https://mostlynerdless.de/blog/2026/09/14/java-27-is-only-boring-on-the-surface>

### 4. Elasticsearch 数据平台整合：第二套数据系统的真实成本

**是什么**：Elastic 官方 Search Labs 发了一篇立场鲜明的长文《Elasticsearch as one platform: What a second data system really costs》，核心观点是：专用系统在专用基准上永远赢，但「整合」的价值在于数据跨越多种形态的生产环境。文中给出一组真实数字——OTel 指标现在落到 3.75 bytes/datapoint（一年前是 25），比 Prometheus 省 2.5 倍存储、比 ClickHouse 省 2 倍；gauge 均值与 counter 速率查询比 Prometheus/Mimir 快 30 倍；高基数基准下扫 50 万时间序列四小时数据不到 2 秒（对手超 30 秒）。同时它也不回避边界：Columnar Mode 在 9.5 预览、9.6 GA，nested 字段不支持，`semantic_text`/`dense_vector` 在 9.5 暂不可用。

**为什么值得看**：这篇文章的价值不在数据本身，而在一个决策框架——它把「要不要再上一套专用存储」从技术偏好问题，变成一个成本问题（文中叫「five-tool tax」，五工具税）。它给出的自查起点很实用：数一数有多少 ingest pipeline 把同一批事件写进多个目的地、有多少 dashboard 在用两种查询语言回答同一个问题。对后端架构师来说，这是「数据平台要不要收敛」这条路上少见的、愿意同时列出自身边界的官方立场。

**适合谁**：正在做日志 / 指标 / 分析数据架构收敛评估的架构师、平台团队，以及被「专用数据库 vs 通用平台」选择困扰的后端负责人。

原文：<https://www.elastic.co/cn/search-labs/blog/data-platform-consolidation-elasticsearch>

## 工具推荐

### 5. claude-code-templates：Claude Code 的「配置 + 监控」层

**是什么**：`davila7/claude-code-templates`（MIT，Python CLI，约 3 万 star，以仓库为准）把自己定位成 Claude Code 的配置与监控层：100+ 社区贡献的组件，按 Agent（领域专家）、Command（自定义斜杠命令）、MCP、Hook、Setting、Skill 六类组织，一条命令装齐一套开发栈，还带一个 `aitmpl.com` 交互式仪表盘做发现与浏览。最新版 v1.29.5（9/9）新增了从目录安装 TypeScript hooks 的能力。

```bash
# 一条命令把整套组件搬进 Claude Code
npx claude-code-templates@latest \
  --agent development-team/backend-developer \
  --command testing/generate-tests \
  --mcp development/github-integration
```

**为什么值得看**：Claude Code 的能力强，但配置是门手艺——哪些命令允许、哪些目录禁入、加载多少上下文、怎么审计 agent 干了什么。这个项目把这件事从「每个团队各自摸索几小时」压成「几分钟」，而它的监控/用量追踪组件，恰好踩在「AgentOps」这个正在成形的新品类上——正如 DevOps 围绕 CI/CD 成形，Agent 的监控、模板、治理工具正在成为独立赛道。对想在公司里标准化 Claude Code 的团队，这是绕不开的一层。

**适合谁**：在团队里推广或标准化 Claude Code 的后端团队；对「Agent 可观测性与治理」感兴趣的工程负责人。

原文：<https://github.com/davila7/claude-code-templates>

### 6. OpenHands v1.19.0：MCP 作用域，让「只读 Agent」成为可能

**是什么**：开源编程智能体 OpenHands 于 9/16 发布 v1.19.0，头条功能是「把 agent profile 限定到指定 MCP 服务器」（PR #17289，`mcp_server_refs`），同时新增 GPT-6 Astra 模型支持，并修复了一个 XSS（对注入的 runtime config 做 HTML escape + `Cache-Control: no-store`）。

**为什么值得看**：这个功能背后是一个特别典型的安全缺口。`mcp_server_refs` 字段在 schema 和后端里早就存在、也早就生效，但 profile 编辑器从来没写过它——于是「每个 profile 都能触达你配置的全部 MCP 服务器，包括那些能写、能退款的」。作者的目标场景是「一个我信任它不会改任何东西的 Code Exploration Agent」。它印证了一个审计准则：别审 vendor 文档里写的配置，要审用户点下默认按钮时 agent 实际能触达什么。这周 OpenHands 和微软 Agent Framework 不约而同在补「最小权限」，是 Agent 工具链从「能用」走向「可控」的信号。

**适合谁**：用 OpenHands / Claude Code / Cursor 等多工具 agent 做开发的团队；关心「只读 vs 可写」权限隔离的平台与安全工程师。

原文：<https://github.com/OpenHands/OpenHands/releases/tag/v1.19.0>

## 本周精选

### 7. Microsoft Agent Framework 1.19.0：给多租户 Agent 补上身份边界

**是什么**：微软在 9/18 发布了 Python 版 Agent Framework 1.19.0，一批破坏性变更全指向「身份与完整性」：每次 MCP 请求和会话被绑定到发起它的调用身份（同时按来源与归属限定范围）；技能档案限定为 ZIP 且必须通过摘要校验才允许加载；废弃了 MCP 采样回调；并新增按工具的暴露控制（`AgentModeProvider`），让会话能限制单个 agent 看到哪些工具。另有一组修复针对压缩摘要与 checkpoint 往返导致的「长任务静默丢状态」。

**为什么值得看**：这一版补的是多租户智能体最危险的一类风险面——此前的版本里「会话不跟人走」，租户 A 的请求理论上可能落到租户 B 的会话上下文里，借到对方的工具权限、读到中间状态。这与 Web 安全的会话固定、API 网关的令牌边界是同一族问题，只是换到了 agent 运行时。它和 OpenHands 的 MCP 作用域放在一起看，能读出同一个趋势：框架开始把「能力越大、边界越要清楚」当成本职工作，而不是留给使用方的选修课。

**适合谁**：基于 Agent Framework 跑多租户智能体的团队、正在把 MCP 工具链引入生产的平台工程师。

原文：<https://github.com/microsoft/agent-framework/releases/tag/python-1.19.0>

## 来源

- 极道（jdon）— JDK 27 新特性深度解读：<https://www.jdon.com/94925-in-depth-interpretation-of-jdk-27-new-features.html>
- jsbisht — RestTestClient in Spring Boot 4.x：<https://blogs.jsbisht.com/blog/spring-boot-4-resttestclient-for-http-tests>
- Mostly Nerdless — Java 27 is only boring on the surface：<https://mostlynerdless.de/blog/2026/09/14/java-27-is-only-boring-on-the-surface>
- Elastic Search Labs — Elasticsearch as one platform：<https://www.elastic.co/cn/search-labs/blog/data-platform-consolidation-elasticsearch>
- davila7/claude-code-templates：<https://github.com/davila7/claude-code-templates>
- OpenHands v1.19.0 Release Notes：<https://github.com/OpenHands/OpenHands/releases/tag/v1.19.0>
- microsoft/agent-framework python-1.19.0：<https://github.com/microsoft/agent-framework/releases/tag/python-1.19.0>
