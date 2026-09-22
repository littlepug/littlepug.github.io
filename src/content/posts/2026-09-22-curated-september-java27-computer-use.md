---
title: 2026年9月22日技术精选：Java 27 小技巧与计算机使用 Agent
date: 2026-09-22
categories: curated
tags: [curated, ai, java, spring, bigdata, tools]
keywords: Java 27, String.encodedLength, JFR 脱敏, Spring Boot 4.2, RestClient, RestTemplate, trycua/cua, computer use, security-audit-skill, Cloudflare, OpenTelemetry eBPF, coder, 后端开发
excerpt: 九月最后一周，Java 侧迎来 JDK 27 之后的实用沉淀：四个小 API 让日常代码更清爽，一篇实战复盘把升级前的运行时变化讲透。Spring Boot 4.2 正式弃用 RestTemplate，迁移信号明确。Agent 侧，trycua/cua 把「让 Agent 用电脑」做成基础设施，Cloudflare 开源六阶段安全审计 Skill；可观测性上，OpenTelemetry eBPF 零代码注入值得关注。
cover: /images/covers/curated-september-22-2026.svg
---

九月最后一周，两条主线各自推进。Java/Spring 侧进入 JDK 27 发布后的「实用消化期」：大特性上一期已经讲透，这期聚焦能直接落进代码的四个小 API，和一篇把升级坑位讲明白的实战复盘；Spring Boot 4.2 则给出一个明确的迁移信号。Agent 侧延续「给 agent 装基建」的主题——从「让 Agent 用电脑」的沙盒，到「让 Agent 做安全审计」的流程，再到「给 Agent 配开发环境」的平台，基础设施化正在加速。

大数据组件这周相对安静：Kafka 4.4.0 仍卡在 RC 投票阶段（上一期已深报 RC1 与 KAFKA-21106），Elasticsearch 9.6 还在 SNAPSHOT 阶段，没有新的可验证发布，本期不硬凑，可观测性方向改由 OpenTelemetry eBPF 承担。

## 代码小技巧

### 1. Java 27 的四个小 API，日常代码更清爽

**是什么**：JDK 27（9 月 15 日 GA）除了 G1 全环境默认、紧凑对象头这些大改动，还带来一批「小而美」的 API 补充。Ralph Schäfer 的博客《Small changes in Java 27》把它们整理得很干净：

- `String.encodedLength(Charset)`：直接问「这个字符串按某字符集编码占多少字节」，不用再 `getBytes().length` 白建一个字节数组；
- `BigDecimal.rootn(int, MathContext)`：十进制开 n 次方，带精度与舍入，不再需要转 double 丢精度；
- `Math.asinh / acosh / atanh`：反双曲函数，直接套数学公式会在大数下溢出，库方法更稳；
- `KeyStore.getCreationInstant(String)`：返回 `Instant`，告别老旧的 `java.util.Date`。

```java
String text = "café";
System.out.println(text.length());                       // 4（UTF-16 码元）
System.out.println(text.encodedLength(StandardCharsets.UTF_8)); // 5 字节

MathContext mc = MathContext.DECIMAL64;
System.out.println(new BigDecimal("125").rootn(3, mc));  // 5
```

**为什么值得看**：这些都不是「大特性」，却是每天都在写的代码里反复出现的样板。尤其是 `encodedLength` 和 `rootn`，前者在「校验消息字节上限 / 预估缓冲区大小」时能省一次数组分配，后者在金融、科学计算里省掉一次危险的浮点转换。

**适合谁**：日常写 Java 业务代码、做消息/存储字节预算、以及任何想用 JDK 27 顺手把代码写得更简洁的后端工程师。

原文：<https://blog.rasc.ch/2026/09/java-small-changes-27.html>

### 2. Java 27 升级前，先看这三处运行时变化

**是什么**：TechDeveloper.in 的一篇实战复盘《Java 27 for Backend Engineers》，作者用真实服务踩了一遍 JDK 27 的三个运行时变化，写得比官方 release notes 更接地气：

- **G1 全环境默认**：小规格 / 批处理 worker 如果 CPU 极度紧张，G1 的后台 bookkeeping 可能比 Serial 略高，必要时用 `-XX:+UseSerialGC` 改回去；
- **紧凑对象头默认开启**：实测典型 Spring 服务堆从 412MB 降到 334MB，对象头从 16 字节降到 8 字节，p99 young 停顿 18ms → 13ms（单服务单负载，仅作方向参考）；
- **JFR 进程内脱敏（JEP 536）**：默认会遮蔽 `password / secret / token / apikey*` 等命名的参数，但自定义 key（如 `dburl`）不会被命中——作者差点把数据库连接串明文录进 JFR 分享出去。

**为什么值得看**：这是「升级 JDK 27」这件事最实用的 checklist。前半段是性能收益（紧凑对象头对 JSON 序列化密集的 Spring 服务尤其明显），后半段是一个容易被忽视的安全坑——JFR 录音文件一旦离开机器，脱敏就是必须自查的事。作者给的修复是给自定义 key 追加脱敏规则：

```bash
java -XX:FlightRecorderOptions:redact-key=+dburl,redact-argument=+dburl \
     -XX:StartFlightRecording=filename=order-status.jfr \
     -jar order-status-service.jar
```

**适合谁**：正在规划 JDK 27 升级、或依赖 JFR 做诊断的后端团队；尤其是要把 JFR 文件分享给跨时区同事或存到共享桶的场景。

原文：<https://www.techdeveloper.in/blog/java-27-for-backend-engineers-g1-everywhere-smaller-headers-and-a-jfr-secret-leak-i-almost-shipped>

## Spring Boot 实践

### 3. Spring Boot 4.2 正式弃用 RestTemplate，迁移要趁早

**是什么**：Spring Boot 4.2.0-M1 的 release notes 里有一条明确的信号——`RestTemplate` 被正式标记为弃用（deprecated），官方指向的替代品是 `RestClient`（Spring Framework 6.1 起引入的同步 HTTP 客户端）。同一版 M1 还带来了 AMQP 1.0 规范支持，以及用 Jetty 的 `GracefulHandler` 协调优雅停机（替代 Spring 自己的实现，职责更清晰）。

**为什么值得看**：`RestTemplate` 是大量存量 Java 服务的默认 HTTP 客户端，这次弃用不是「马上移除」，而是给迁移一个明确方向。`RestClient` 用 builder 式 API + 更现代的拦截器与类型化响应，写起来更顺，性能与 `RestTemplate` 相当。与其等 4.2 GA 之后被推动，不如现在就把新代码默认写成 `RestClient`。

```java
// RestTemplate（将被弃用）
RestTemplate restTemplate = new RestTemplate();
User user = restTemplate.getForObject("/users/{id}", User.class, 1L);

// RestClient（官方推荐）
RestClient restClient = RestClient.create();
User user = restClient.get()
    .uri("/users/{id}", 1L)
    .retrieve()
    .body(User.class);
```

**适合谁**：维护基于 Spring Boot 的微服务、并且还在用 `RestTemplate` 调下游 HTTP 接口的团队；以及正在做 4.x 升级评估的架构师。

原文：<https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.2.0-M1-Release-Notes>

## 工具推荐

### 4. trycua/cua：把「让 Agent 用电脑」做成基础设施

**是什么**：`trycua/cua` 是面向 Computer-Use Agent 的开源基础设施，9 月 20 日一度登上 GitHub Trending 第 2 名（trends 口径约 2.2 万 star，其它榜单口径 1.3 万~1.8 万不等，star 数以仓库为准）。它把「让模型操作真实桌面」这件事拆成了四个可独立演进的模块：

- **Lume**：基于 Apple Virtualization.Framework 的 macOS 虚拟机，接近原生的硬件虚拟化（不是模拟器）；
- **Sandbox SDK**：跨平台统一 API，Linux 容器 / macOS VM / Windows / Android 切换只需改一行；
- **CuaBot**：`cuabot claude` 一条命令，让 Claude Code 直接获得完整桌面沙盒；
- **Cua-Bench**：评测与训练共用一个框架，轨迹可直接导出用于 RL。

**为什么值得看**：Computer-Use 去年还停留在「截图 → 模型 → 点坐标」的 demo 阶段，误差大、延迟高、环境不可复现。cua 的价值在于把「可复现的沙盒 + 统一 API + 评测基准」这套工程问题系统性地解决掉——这是让「Agent 用电脑」从演示走向落地的关键一步。

**适合谁**：做 Agent、RPA 替代方案、自动化测试、或需要安全桌面沙盒来验证 Agent 行为的团队；想研究「Computer Use」基础设施化方向的人。

原文：<https://github.com/trycua/cua>

### 5. coder/coder：自托管云开发环境，也开始面向 Agent

**是什么**：`coder/coder` 是一个自托管的云开发环境（CDE）平台，9 月 20 日冲上 GitHub Trending 第 4 名。它的定位正在从「给人用的远程开发机」扩展到「给 Agent 用的隔离执行环境」——同一个平台既能给你和团队提供按需的云端 workspace，也能给 coding agent 提供可复现、可审计、带资源配额的运行沙箱。

**为什么值得看**：当 Agent 开始需要「一台自己的电脑」去跑命令、装依赖、读写文件时，谁来管这台电脑的隔离、配额、审计和回收就成了真问题。coder 把这一套已经验证过的 workspace 管理能力复用到 Agent 场景，是「Agent 基础设施」从玩具走向生产的一个务实选项。

**适合谁**：需要自托管开发环境、同时又在探索如何安全地给 Agent 分配执行环境的团队；对「云开发环境 + Agent」结合点感兴趣的后端 / 平台工程师。

原文：<https://github.com/coder/coder>

## 技术科普

### 6. OpenTelemetry eBPF 零代码注入：K8s 可观测性的新入口

**是什么**：OpenTelemetry 的 eBPF Instrumentation（OBI）发布了 v0.12.1，通过 eBPF 为 Kubernetes / Linux 工作负载提供零代码自动注入——不需要字节码改写、不需要 agent 参数、不需要手工配置，就能捕获 trace、运行时指标和网络关系，并新增了增强的 Node.js 运行时指标。它用最小的开销把「可观测性」这一层从应用代码里剥离出来。

**为什么值得看**：传统上，Java 服务接 trace / metrics 要么靠 Java agent（字节码注入），要么靠手动埋点。eBPF 路线把这件事下移到了内核层，对多语言（Java + Node + Go 混部）的环境尤其友好——不必为每种语言各维护一套 instrumentation 方案。这背后是「零代码可观测性」成为默认选项的趋势。

**适合谁**：在 Kubernetes 上跑多语言后端的团队、负责可观测性 / DevOps 的平台工程师，以及不想为每个服务手工埋点的后端开发者。

原文：<https://opentelemetry.io/docs/zero-code/obi/>

## 本周精选

### 7. Cloudflare 开源六阶段安全审计 Skill

**是什么**：Cloudflare 开源了 `cloudflare/security-audit-skill`（MIT），把它自家工程师用来审查生产代码的六阶段审计流程，做成了一个可直接装进 coding agent 的 skill：侦察（recon）→ 覆盖导向狩猎（hunting）→ 候选验证（validation）→ 报告（report）→ 结构化输出（structured output）→ 独立复核（independent verification）。安装一行搞定：

```bash
npx skills add https://github.com/cloudflare/security-audit-skill --skill security-audit
```

然后对 agent 说 `security audit this codebase` 即可。star 数各榜单口径不一（约 5k~1.4 万），以仓库为准。

**为什么值得看**：它和普通静态分析的关键区别在于「对抗式验证」——发现漏洞的 agent 和验证漏洞的 agent 永远不是同一个，每个 finding 都必须给出可复现的攻击场景、并通过独立 agent 复核才能落地为「已确认」。这解决了 agentic 安全审计最大的失败模式：不是漏报，而是吐出一堆「看起来合理」的误报，让人类花一整周去 triage。Cloudflare 把这个内部方法论做成 MIT skill，也是「skill 格式成为安全实践分发载体」的一个强信号。

**适合谁**：有代码审查 / 安全需求、并且已经在用 Claude Code、Cursor、Codex 等 coding agent 的团队；对「AI 驱动的安全审计如何落地」感兴趣的安全工程师。

原文：<https://github.com/cloudflare/security-audit-skill>

## 来源

- Ralph's Blog — Small changes in Java 27：<https://blog.rasc.ch/2026/09/java-small-changes-27.html>
- TechDeveloper.in — Java 27 for Backend Engineers：<https://www.techdeveloper.in/blog/java-27-for-backend-engineers-g1-everywhere-smaller-headers-and-a-jfr-secret-leak-i-almost-shipped>
- Spring Boot 4.2.0-M1 Release Notes：<https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-4.2.0-M1-Release-Notes>
- trycua/cua：<https://github.com/trycua/cua>
- coder/coder：<https://github.com/coder/coder>
- OpenTelemetry eBPF Instrumentation（OBI）：<https://opentelemetry.io/docs/zero-code/obi/>
- cloudflare/security-audit-skill：<https://github.com/cloudflare/security-audit-skill>
