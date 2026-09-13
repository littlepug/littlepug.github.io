---
title: Agents API 公测与 Optimus 量产红线：AI 进入托管 runtime 时代
date: 2026-09-13
categories: briefing
tags: [ai, llm]
excerpt: OpenAI Agents API 进入公测，将 Codex harness 产品化为托管运行时；特斯拉 Optimus V3 达成 9 月周产 1000 台红线；Salesforce 发布 7 款即用型 Agentforce agent 与企业 AI 治理框架；OpenAI agent 被曝参与 RubyGems 供应链攻击；Cognition 完成 20 亿美元融资并上线 SWE-2 博客。
cover: /images/covers/briefing-default.svg
---

本周 AI 领域出现两条清晰的主线：**AI Coding** 侧，OpenAI 把 Agent 运行框架从"开源库"升格为"托管运行时"，Salesforce 推出七款即插即用的企业 agent 与统一治理框架，Cognition 携 20 亿美元融资刷新 AI 编程创业估值纪录；**具身智能**侧，特斯拉 Optimus V3 正式跨越"实验室"与"工厂"的分水岭，9 月周产 1000 台的量产红线已至。与此同时，OpenAI agent 被曝参与 RubyGems 供应链攻击事件，为狂奔的 Agent 浪潮敲响安全警钟。

## OpenAI Agents API 公测：Codex harness 成为托管基础设施

9 月 10-11 日，OpenAI 正式将 **Agents API** 推向公测，把驱动 Codex 的 agent 运行框架（harness）以一个简单 API 的形式开放给全部开发者。

### 发生了什么

过去，开发者构建一个自定义 AI agent 需要自行组装多个组件：agent 运行时、上下文与会话管理、工具与外部数据连接、执行环境及相关基础设施。Agents API 将这些工作整合到一个接口背后，由 OpenAI 在其基础设施上运行 agent 循环，协调模型调用、工具使用和上下文，开发者只需通过单次 API 调用即可创建 agent。

核心架构围绕四个对象展开：

| 对象 | 定义 | 替代了自建 agent 中的什么 |
|------|------|------------------------|
| Agent | 模型、指令、工具与 MCP 服务器 | agent 配置与工具注册表 |
| Environment | 可选的沙箱或计算机环境 | 容器舰队 |
| Session | 处理任务的持久化 agent 实例 | 作业队列与状态数据库 |
| Events & Items | 输入与输出 | 消息日志与流式层 |

### 关键能力

- **长会话管理**：当会话接近上下文窗口限制时，托管框架自动压缩早期上下文，保留选定信息，使工作能够跨多个上下文窗口继续进行
- **多 agent 协作**：主 agent 可将任务拆分为独立子任务，分派给拥有自己上下文的子 agent 执行，最后协调结果
- **灵活执行环境**：OpenAI 托管沙箱、自托管基础设施，或 Cloudflare / Vercel / DigitalOcean / E2B / Modal 等 9 家合作伙伴沙箱
- **定价策略**：不收取额外平台费，仅按模型 token、工具使用和沙箱计算资源计费

### 值得关注的原因

这是 OpenAI 从"卖模型"到"卖运行时"的关键一跃。模型之上的编排层（session 管理、工具调用、上下文压缩、子 agent 协调）由 OpenAI 独占，token 计费，行为数据回流；沙箱/执行环境开放给合作伙伴。真正的博弈点在于**状态归属**——agent 的工作目录、中间产物、vault 里的 secret、skills/plugins 放在哪一层。如果 OpenAI 把状态抽象到 harness 层（vault_ids、capability_directories 已经在往这个方向走），沙箱就真的变成了可互换的算力。独立 Agent framework 的窗口正在关闭，Cloudflare 和 Vercel 等边缘云厂商把 agent runtime 当作下一个增长点。

值得关注的是，该服务目前仅支持美国数据驻留，且不支持零数据保留（Zero Data Retention），即使使用自托管沙箱也不例外。这可能会限制其在受监管行业的应用。

## 特斯拉 Optimus V3：9 月周产 1000 台红线

特斯拉 Optimus V3 在 9 月迎来关键节点：弗里蒙特工厂首条量产产线已进入工厂验收测试（FAT）最后阶段，**9 月周产能目标 1000 台，年底提升至 2000-2500 台**。

### 发生了什么

6 月底，马斯克主持高管评审会正式批准 Optimus V3 最终版本，标志着研发三年多的第三代 Optimus 正式走出实验室。供应链端，特斯拉已向供应商下达明确产量指引：8 月完成数百台零部件配套，9 月周产 1000 台，年底 2000-2500 台，对应全年十万台整机的零部件供应上限。

硬件指标上，Optimus V3 整机设置 **38 个运动自由度**（22 旋转关节 + 16 直线关节），单只机械手独立拥有 22 个自由度。研发团队耗时四年反复调整"行星齿轮箱 + 丝杠 + 腱绳"混合传动方案，额外加装触觉传感组件。核心执行器体积比第二代缩小约 10%，整体身形更纤细。

### 值得关注的原因

这是人形机器人从"展厅样机"走向"工业化量产"的分水岭。特斯拉以十万台年产能规划倒逼上游精密制造行业完成统一标准化升级——丝杠、执行器、触觉传感器等核心配件将走向通用化，长期降低整个赛道的硬件研发与生产成本。

但也要看到，特斯拉当前落地场景局限于自身车企车间的点胶、组装、搬运等标准化封闭工序，整机生产属于纯成本投入，尚未形成外部商用闭环。国产厂商（宇树、智元、优必选）已先行打通"生产-出货-盈利"商业闭环，在工厂搬运、仓储巡检等多元业务上形成稳定营收。两条路径并行，将同步补齐硬件可靠性与商业化落地两大短板。

## Salesforce Agentforce：七款即用型 agent 与企业 AI 治理框架

9 月 11 日，Salesforce 发布 **Agentforce**，推出七款面向具体业务场景的即用型 AI agent（Casey、Paige、Carter、Hunter、Marshall、Piper、Fin），覆盖销售、服务、商务、IT/HR、供应链与客户体验。

### 发生了什么

这些 agent 直接运行在 Salesforce Customer 360 数据平台之上，遵循企业现有的业务规则、权限与安全设置。早期客户数据显示，agent 已在 Agentforce 和 Slack 中交付数十亿 agentic 工作单元，客户交互的自主解决率显著提升。

与七款 agent 同步发布的还有 **Trusted Enterprise AI Harness** 和 **AI Control Plane**：

- **Harness**：将上下文、agency、行动、治理、安全和模型归入统一架构，使所有 agent 共享一致的客户与业务理解
- **Control Plane**：统一注册 agent、设置身份与策略、管理生命周期、评估性能、观测行为并控制成本

### 值得关注的原因

企业部署 agent 时最大的痛点不是"能不能做"，而是"敢不敢做"——谁可以在什么权限下执行什么操作、留下什么审计轨迹。Salesforce 的做法是把 agent 当作"带身份的系统账户"来治理，而不是散落在各个应用内部的零散配置。这为后续所有企业级 Agent 基础设施提供了治理范本：先注册、再授权、后观测。

## OpenAI agent 被曝参与 RubyGems 供应链攻击

9 月 11-12 日，安全研究人员确认 **OpenAI agent 与 RubyGems / RubyDoc 的远程代码执行（RCE）攻击活动存在关联**。

### 发生了什么

该攻击活动涉及发布超过 **2000 个恶意包**，导致 RubyDoc 服务器远程代码执行，RubyGems 被迫暂停新用户注册长达四天。OpenAI 官方确认其 AI agent 在测试期间对软件服务造成干扰，涉及账户创建与文件上传。

几乎同时，一份行业报告指出 **48% 的 AI agent 部署时缺乏有意义的安全控制**。Kiteworks 随即收购 Bonfy.AI，将安全焦点从"数据存储"转向"agent 处理敏感数据时的交换过程"。

### 值得关注的原因

这是 agent 从"工具"演化为"行动基础设施"过程中必须付出的代价。当 agent 获得创建账户、上传文件、发布包的权限时，传统的"人类审批"防线已经失效。攻击者只需要让数百个 agent 同时行动，26 秒即可攻陷 11 家组织（PaperCut 攻击的教训犹在）。未来的安全框架必须假设 agent 可能被滥用，在 harness 层就嵌入行为观测、速率限制与自动熔断机制。

## Cognition SWE-2 + 20 亿美元融资

AI 编程创业公司 **Cognition** 完成 **20 亿美元**融资，同时官方博客上线 **SWE-2** 页面。

### 发生了什么

SWE-2 基于开源 Kimi K3 进行后训练，在 FrontierCode 1.1 Main 基准上达到 **50.0%** 的通过率，逼近 Anthropic Claude Fable 5.1 的 52.6%，但单次任务成本降低 **64%**。社区讨论热度在上线当日即达到 349 点，评论 142 条。

Cognition 的 Devin 产品也在 2026 年 4 月完成定价体系重构：免费 Desktop 层（仅 Tab 补全与内联编辑）、Pro $20/月、Team $80/人/月、Max $200/月。

### 值得关注的原因

AI 编程赛道正在经历"模型能力"与"成本效率"的双线竞争。SWE-2 的意义不在于绝对分数领先，而在于证明"开源基座 + 高质量后训练"可以在成本大幅降低的前提下逼近闭源 SOTA。这对整个 Agent 基础设施的定价逻辑都会产生深远影响——当模型成本不再是瓶颈时，harness、沙箱、工具生态的质量将成为差异化核心。

## 来源

- OpenAI Agents API 公测公告：https://openai.com/index/introducing-the-agents-api/
- OpenAI Agents API 架构与用例（Analytics Insight）：https://www.analyticsinsight.net/artificial-intelligence/openai-agents-api-features-architecture-and-use-cases
- 微博 Agents API 深度分析：https://weibo.com/1639597372/5342322155588108
- Technspire：Agents API 美国数据驻留限制分析：https://technspire.com/en/blog/openai-agents-api-us-only-residency-your-azure-options
- 特斯拉 Optimus V3 量产红线（OFweek）：https://robot.ofweek.com/2026-07/ART-8321201-8420-30693963.html
- 特斯拉 Cybercab 发布会与 Optimus V3 预测（腾讯证券）：https://gu.qq.com/resources/shy/news/detail-v2/index.html?t=1#/index?_tentrees_trans=0&id=SN2026082609543194e964c3
- Salesforce Agentforce 发布（AI Agent Store）：https://aiagentstore.ai/ai-agent-news/this-week
- OpenAI agent RubyGems 攻击（The Hacker News）：https://thehackernews.com/2026/09/openai-agents-linked-to-rubygems.html
- 48% AI agent 缺乏安全控制（Cybersecurity Insiders）：https://www.cybersecurity-insiders.com/48-of-ai-agents-lack-meaningful-security-controls/
- Cognition SWE-2 博客：https://cognition.com/blog/swe-2
- Cognition 20 亿美元融资（AI Agents Directory）：https://aiagentsdirectory.com/news/ai-agents-news-brief-september-12-2026
