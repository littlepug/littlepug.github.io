---
title: 八月第四周技术精选：Java Agent 与虚拟线程
date: 2026-08-28
categories: curated
tags: [curated, ai, java, spring, bigdata, tools]
keywords: 技术精选, Embabel, Rod Johnson, Spring Boot 4, Spring AI, ReAct, 虚拟线程, Java 24, JEP 491, Spring FlashAPI, Spring Boot Starter, PII 隐私护栏, 后端开发, AI Agent
excerpt: 八月最后一周，Java 后端有两条线值得盯：Spring 之父 Rod Johnson 创办的 Embabel 1.5.0 正式 GA，让 Java/Kotlin 开发者用 Spring Boot 4 + Spring AI 2 搭生产级 Agent；虚拟线程在 Java 24 JEP 491 修复 pinning 之后，GC 层面的深坑值得重看。本期精选 6 条，覆盖手写 ReAct 循环、Spring Boot Starter 新书，以及 Spring FlashAPI 与 PII 隐私护栏两个实用开源项目。
cover: /images/covers/curated-august-w4-2026.svg
---

八月最后一周，后端技术圈的注意力从「发版」转向「怎么用好」：Kafka 4.4 仍卡在 RC 投票前的稳定期（RC1 尚未开启），Elasticsearch 9.5 也已在上几期覆盖，本周真正有增量的是 Java 侧的 Agent 与并发两条线——Spring 之父 Rod Johnson 的 Embabel 1.5.0 正式 GA，以及 Java 24 之后虚拟线程在生产上暴露出来的 GC 深坑。

本期精选 **6 条**，方向覆盖 AI Agent 生态、Java 代码技巧、Spring Boot 实践与两个实用开源项目，全部附可验证链接。

## 本周精选

### 1. Embabel 1.5.0 GA：Spring 之父下场做 Java Agent 编排框架

- **是什么**：**Embabel**（`embabel/embabel-agent`，Apache-2.0）是一个跑在 JVM 上的 Agent 框架，可以用 Java 或 Kotlin 编写「强类型」的 Agent 应用——把 LLM 调用、普通代码、工具与领域模型放在一起，通过注解（如 `@Agent`、`@Action`）和「目标-行动-条件」领域模型来描述 Agent 行为。它的幕后推手是 **Rod Johnson**（Spring Framework 创始人，2026 年 8 月 24 日前后在 LinkedIn 亲自官宣）。

  本周发布的 **1.5.0 正式 GA**，核心是**全面适配 Spring Boot 4.x + Spring AI 2.x**：把原生结构化输出移植到新框架，并修掉了 Spring AI 2.0「options 合并移除」带来的模型绑定问题；旧 1.0 线则继续对应 Spring Boot 3 / Spring AI 1，供还没迁移的团队使用。默认 planner 采用**目标导向行动规划（Goal-Oriented Action Planning）**，也支持 Utility AI 做开放式探索任务，并内置 MCP、RAG 与 A2A 通信等生产级能力。

- **为什么值得看**：这是「Java 是不是被 Python 的 Agent 生态抛下」这个问题的一个硬回答。过去一年 Agent 框架几乎被 Python 垄断（LangChain / LangGraph / CrewAI），而 Embabel 的定位很明确：**让 Spring 体系里的 Java/Kotlin 团队，不用跳出既有技术栈就能做生产级 Agent**——类型安全、可测试、可审计，靠 Spring 的依赖注入和模块边界把 Agent 的行为「锁进工程系统」。

  不过也要泼两盆冷水：其一，核心代码用 Kotlin 编写，Java 调用无感知、但读源码要适应 Kotlin 语法；其二，社区仍在早期，star 规模（各方口径约 4k，**待核实**）与文档成熟度都远不及 Python 系。如果你已经在 Spring 上跑了多年，这是「立即能上手」的首选；如果只想做简单的模型调用封装，LangChain4j 可能更省事。

- **适合谁**：在 Spring Boot 上做 Agent / agentic RAG 的 Java 后端团队，以及关注「JVM 生态能不能接住 Agent 浪潮」的架构负责人。

- **链接**：[embabel/embabel-agent — GitHub](https://github.com/embabel/embabel-agent) · [Rod Johnson：Embabel 1.5.0 Supports Spring Boot 4.x and Spring AI 2.x — LinkedIn](https://www.linkedin.com/posts/johnsonroda_release-embabel-agent-150-embabelembabel-agent-activity-7493126961373052928-Nj14) · [Embabel Agent 1.5.0 GA Released — AGI Hunt](https://agihunt.info/en/p/19ff3c12ba26c2a6ac5d8d00336)

## Spring Boot 实践

### 2. Wim Deblauwe 新书《Crafting Spring Boot Starters》上线，Phil Webb 亲自作序

- **是什么**：Spring Boot 生态知名作者 **Wim Deblauwe**（《Testing Spring Boot Applications Masterclass》作者）的新书 **《Crafting Spring Boot Starters》** 本周上线，被 8 月 25 日的「This Week in Spring」点名推荐，且由 **Spring Boot 创始人 Phil Webb 亲自作序**。

  这本书聚焦一个大多数 Spring 团队「天天用却很少自己写」的东西——**Spring Boot Starter**：如何把一个可复用的自动配置 + 依赖管理打包成符合惯例的 starter，包括 `@AutoConfiguration` 的边界、`spring.factories`/imports 的写法、条件装配（`@ConditionalOnClass` / `@ConditionalOnProperty`）、可观测性钩子与版本兼容策略。

- **为什么值得看**：对平台团队这是「刚需中的盲区」。企业内部做基础组件封装（统一日志、统一鉴权、统一缓存、统一消息）时，最常见的失败不是功能写不对，而是 **starter 做得不符合 Spring Boot 惯例**——配置项不收敛、自动装配一开一堆、和其他 starter 抢顺序。把这块学扎实，比堆业务代码的 ROI 高得多。Phil Webb 作序本身就是个信号：这本书讲的是「官方认为正确的 starter 应该长什么样」。

- **适合谁**：负责内部基础组件 / 平台封装的后端与架构师，以及想从「会用 Spring Boot」进阶到「能扩展 Spring Boot」的人。

- **链接**：[This Week in Spring — August 25th, 2026（含本书推荐）](https://spring.io/blog/2026/08/25/this-week-in-spring-august-25) · [Wim Deblauwe 官网（书籍详情，待核实）](https://www.wimdeblauwe.com/)

## 代码小技巧

### 3. Spring AI 手写 ReAct 循环：把「黑盒」变成可审计的每一步

- **是什么**：本周 Spring AI 的亮点是一组「手写 Agent 循环」的内容——Craig Walls 的 ReAct 系列被 8 月 25 日「This Week in Spring」点名，配套的 codefarm.in 指南《Agentic Patterns: ReAct, Plan-and-Execute & Reflection by Hand》则给了完整可跑的 Java 代码。

  核心观点很锋利：`ToolCallingAdvisor` 会在模型和工具之间**自动循环**直到产出答案，但这个循环是「黑盒」——你只拿到最终的 `ChatResponse`，看不到「考虑了 X、调用了 Y、观察到 Z、因此得出结论 W」的中间过程。一旦合规要求「超过 500 元的退款决策必须留审计轨迹」，黑盒就不够了。解法是把循环**自己写出来**，让每一步都显式化：

```java
public record AgentStep(
    String thought,      // 为什么这么做
    String action,       // 工具名，或 "FINAL_ANSWER"
    String actionInput,  // 参数，或最终答案文本
    boolean isFinal
) {}

public List<AgentStep> runReActLoop(String question, int maxSteps) {
    List<AgentStep> trace = new ArrayList<>();
    ChatMemory scratchpad = MessageWindowChatMemory.builder().build();
    String conversationId = UUID.randomUUID().toString();

    for (int step = 0; step < maxSteps; step++) {
        AgentStep next = chatClient.prompt()
                .user(question)
                .advisors(a -> a.param(ChatMemory.CONVERSATION_ID, conversationId))
                .call()
                .entity(AgentStep.class);          // 结构化输出，拿到 thought/action/observation
        trace.add(next);
        if (next.isFinal()) {
            return trace;                          // 审计轨迹：每一步推理、行动、观察都可查
        }
        String observation = executeToolByName(next.action(), next.actionInput());
        scratchpad.add(conversationId, new UserMessage("Observation: " + observation));
    }
    trace.add(new AgentStep("Exceeded max steps", "FINAL_ANSWER",
            "I wasn't able to resolve this — escalating to a human agent.", true));
    return trace;
}
```

  指南还给了 **Plan-and-Execute**（先把整份计划结构化输出、验证后再执行）和 **Reflection**（让模型对自己的结果做一次批判）两个变体，覆盖了「手写 Agent 三件套」。

- **为什么值得看**：这段代码最有价值的不是 ReAct 本身，而是**两行容易被抄走漏掉的关键**：`maxSteps` 硬上限 + 明确的「放弃并升级人工」分支。没有它，一个迟迟不产出最终答案的模型会一直烧预算烧到超时。这给所有在生产里用 Spring AI 做 Agent 的人一个可复用的骨架：**把循环从框架手里拿回来，你才能记日志、打断、审计**。而这也正是 Embabel 这类「把 Agent 当工程系统来做」的框架想解决的问题——两者一轻一重，适合不同阶段。

- **适合谁**：用 Spring AI 做 tool-calling / Agent 的 Java 后端，尤其是需要合规审计、成本控制或多步推理的团队。

- **链接**：[Agentic Patterns: ReAct, Plan-and-Execute & Reflection by Hand — Spring AI Guides](https://codefarm.in/guides/spring-ai/04-tool-calling-mcp-agent-evaluation/agentic-patterns) · [This Week in Spring — August 25th, 2026](https://spring.io/blog/2026/08/25/this-week-in-spring-august-25)

## 技术科普

### 4. 虚拟线程 Pocket Guide：Java 24 之后，pinning 修好了，GC 的坑还在

- **是什么**：一篇被多个渠道转推的深度文《Virtual Threads: A Pocket Guide》（omatheusmesmo.dev），把虚拟线程从「概念」讲到「生产上线前的五个动作」。它的价值在于跳出了「虚拟线程很便宜，所以闭眼用」的叙事，讲了两个容易被忽略的硬问题：

  - **pinning 已经在 Java 24 修好了**：早先 `synchronized` 块里做阻塞 I/O 会把虚拟线程钉在 carrier 线程上（JEP 444 时代的著名坑），**JEP 491 在 Java 24 里已实现「synchronized 无 pinning」**。所以如果你当初因为 pinning 放弃了虚拟线程，现在值得重新评估。
  - **但 GC 层面有新坑**：长寿命虚拟线程的 `StackChunk` 会被提升到老年代，JVM 每个周期都分配新 chunk 并丢弃旧的，导致「本该是 young-gen 的廉价垃圾，变成了 old-gen 的昂贵滞留」——实测在 1GB 堆上甚至出现 34% 的性能损失、461 次 Full GC（对比 4 次）。此外 G1 不支持超大 `StackChunk`，虚拟线程栈接近 region 一半时可能抛出一个**和你的代码递归深度无关的 StackOverflowError**。

- **为什么值得看**：它把「虚拟线程」从一条特性讲成了一门**决策纪律**：什么时候该用（几千并发、I/O 密集、下游资源充裕）、什么时候别用（纯 CPU 密集、低并发、已有可用的响应式栈）、以及上线前必须做的五件事——**每个稀缺资源前放 semaphore 或 sized pool、每个阻塞调用加超时、用 JFR 盯 `jdk.VirtualThreadPinned`、审计 ThreadLocal、故意降级资源做压测**。最值得记的是那句判断：虚拟线程不会制造新问题，它只是**拆掉了一层人工天花板，把资源瓶颈暴露出来**——你得在上线前自己决定那个真正的上限在哪。

- **适合谁**：在 Java 21+ 上做高并发 I/O 服务的后端，尤其是「曾经被虚拟线程坑过、想重新启用」的团队。

- **链接**：[Virtual Threads: A Pocket Guide — omatheusmesmo.dev](https://blog.omatheusmesmo.dev/en/posts/virtual-threads-pocket-guide)

## 工具推荐

### 5. Spring FlashAPI：从 JPA 实体直接生成 REST API，连 Repository 都省了

- **是什么**：8 月 18 日「This Week in Spring」介绍的一个社区工具 **Spring FlashAPI**——它能**直接从 JPA 实体生成 REST API**，据 Josh Long 的原话，你甚至不需要一个 Spring Data repository。对「先把领域实体定义出来、立刻要一套可用的 CRUD 接口」的场景，它把「实体 → 仓储 → 服务 → 控制器」这条链路压缩成了「实体 → API」。

- **为什么值得看**：这是「代码生成」里相对克制、可落地的一种：不做魔法，只做**明确规则下的样板代码消除**。对快速原型、内部工具、管理后台这类「实体即资源」的场景很实用；但要注意它本质是「约定优于配置」的捷径，一旦业务逻辑变复杂（复杂查询、鉴权、多实体关联），还是要回到手写控制器。

  需要提醒：该项目的 GitHub 仓库地址与维护状态，本周报道中未给出可直接核验的链接，**详情待核实**，建议以「This Week in Spring」原文为准。

- **适合谁**：做内部管理系统、快速原型、CRUD 密集应用的后端，以及想减少样板代码的 Spring 开发者。

- **链接**：[This Week in Spring — August 18th, 2026（含 Spring FlashAPI 介绍）](https://spring.io/blog/2026/08/18/this-week-in-spring-august-18-2026)

### 6. spring-ai-privacy-guardrails：给 Spring AI 加一层 PII 隐私护栏

- **是什么**：**spring-ai-privacy-guardrails**（`ultramancode/spring-ai-privacy-guardrails`，Apache-2.0，作者 Taewoong Kim）是一个面向 Spring AI 的隐私护栏库，以 **Advisor 和 ToolCallback 包装器**的形式，做**请求级（request-scoped）的 PII 脱敏**和**最小权限披露（least-privilege disclosure）**：在提示词和工具调用进出模型前，对邮箱、电话、证件号等敏感信息做 tokenization，模型只能看到「被替换后的占位符」，返回后再还原。底层支持 **Microsoft Presidio** 与 **JVM 本地 OpenNLP** 两种检测引擎。项目 8 月 10 日前后发布 0.1.0 到 Maven Central，8 月 26 日仍在更新。

- **为什么值得看**：随着企业把 Spring AI 接进真实业务，「把什么发给云端 LLM」成了一个实打实的数据治理问题——一句粘贴进来的工单可能就带着邮箱、电话、身份证号。这类护栏的价值在于**把隐私保护做成框架层默认，而不是每个调用点各写各的正则**：通过 Advisor 统一拦截，开发者几乎不用改业务代码。当然它还很年轻（star 数很小、API 尚在 0.1.x），作为「给 AI 网关加隐私层」的参考实现和起点，比直接在生产里当成熟依赖更合适。

- **适合谁**：在做 LLM 网关 / AI 应用、需要 GDPR 或内部合规要求 PII 脱敏的 Java 团队。

- **链接**：[ultramancode/spring-ai-privacy-guardrails — GitHub](https://github.com/ultramancode/spring-ai-privacy-guardrails) · [spring-ai-privacy-guardrails-core 0.1.0 — Maven Central](https://central.sonatype.com/artifact/io.github.ultramancode/spring-ai-privacy-guardrails-core/0.1.0)

## 来源

1. [embabel/embabel-agent — GitHub](https://github.com/embabel/embabel-agent)
2. [Rod Johnson：Embabel 1.5.0 Supports Spring Boot 4.x and Spring AI 2.x — LinkedIn](https://www.linkedin.com/posts/johnsonroda_release-embabel-agent-150-embabelembabel-agent-activity-7493126961373052928-Nj14)
3. [Embabel Agent 1.5.0 GA Released — AGI Hunt](https://agihunt.info/en/p/19ff3c12ba26c2a6ac5d8d00336)
4. [This Week in Spring — August 25th, 2026 — Spring Blog](https://spring.io/blog/2026/08/25/this-week-in-spring-august-25)
5. [This Week in Spring — August 18th, 2026 — Spring Blog](https://spring.io/blog/2026/08/18/this-week-in-spring-august-18-2026)
6. [Agentic Patterns: ReAct, Plan-and-Execute & Reflection by Hand — Spring AI Guides](https://codefarm.in/guides/spring-ai/04-tool-calling-mcp-agent-evaluation/agentic-patterns)
7. [Virtual Threads: A Pocket Guide — omatheusmesmo.dev](https://blog.omatheusmesmo.dev/en/posts/virtual-threads-pocket-guide)
8. [ultramancode/spring-ai-privacy-guardrails — GitHub](https://github.com/ultramancode/spring-ai-privacy-guardrails)
9. [spring-ai-privacy-guardrails-core 0.1.0 — Maven Central](https://central.sonatype.com/artifact/io.github.ultramancode/spring-ai-privacy-guardrails-core/0.1.0)
