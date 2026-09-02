---
title: Fable 5.1 登顶，Astra 触发关键安全阈值
date: 2026-09-02
categories: briefing
tags: [ai, llm]
excerpt: Anthropic 发布 Fable 5.1 与 Mythos 5.1，Terminal-Bench Science 翻倍且缓存读取降价 75%；OpenAI Astra 成为首例达到「关键」网络安全能力阈值的模型；Codex 生态全面升级；Galbot Store 香港开业，高盛上调人形机器人出货预期至 2035 年 650 万台。
cover: /images/covers/briefing-default.svg
---

## 发生了什么

9 月 1 日至 2 日，AI 编程与具身智能两条主线同时出现标志性转折。模型侧，Anthropic 一口气推出 Claude Fable 5.1 与 Mythos 5.1，在编程与科研基准上大幅超越前代及 GPT-5.6 Sol，同时把缓存读取费用砍掉 75%，向 Agent 长时任务的成本结构开刀。安全侧，OpenAI 披露 Astra 是其首个达到「关键」网络安全能力阈值的模型——测试中自主发现并串联了两个零日漏洞。工具侧，Codex CLI 迭代到 0.152.0，新增 `_context` 上下文管理工具，桌面端已化身多 Agent 「指挥中心」，DAU 突破 2500 万。具身侧，银河通用 Galbot Store 在香港连开三家全自主机器人零售店，高盛将 2035 年全球人形机器人出货预期上调至 650 万台。

## Claude Fable 5.1 & Mythos 5.1：Anthropic 新一代最强编程模型

Anthropic 于 9 月 1 日发布 Claude Fable 5.1 和 Claude Mythos 5.1，官方定义为「全球最先进的编程与知识工作模型」。两者基于同一基础模型，区别仅在安全防护等级：Fable 5.1 面向所有用户，Mythos 5.1 仅通过可信访问计划向审核通过的网络安全与生命科学机构开放。

核心数据：

- Terminal-Bench 4.0：Fable 5.1 得分 55.8%，Mythos 5.1 在更宽松防护下达 60.9%（Opus 5 为 52.3%，Fable 5 为 42.0%）
- Terminal-Bench-Science 0.1：Fable 5.1 达 52.6%，而 Fable 5 仅 24.7%——直接翻倍
- GDPval-AA v2 知识工作：1853 分，高于 Opus 5 的 1824 分
- AutomationBench：从 17.1% 跳到 31.4%

价格策略：基础定价不变（输入 $10/M tokens，输出 $50/M tokens），但**缓存读取费用下调 75%**，降至 $0.25/M tokens。典型工作负载成本比 Fable 5 低约 25%，高度 Agent 化负载最高降 45%。同时推出企业级前沿防护措施（EFS），将零数据保留隐私与安全防护结合，客户数据存于企业自控云设施而非 Anthropic 系统，今秋起分阶段开放。

Claude Code 2.1.257 同步更新：将默认 Fable 模型切换为 Fable 5.1，并停止 auto 模式自动放行容器逃逸操作。此外，Fable 5.1 为 Claude 生成的文本加入了不可见水印，检测 API 以私有预览形式推出。

值得关注的原因：**缓存读取降价 75% 是这一轮发布中最关键的信号**。Agent 长时任务的核心成本不在单次推理，而在反复加载上下文。Anthropic 直接砍掉这部分费用，等于在告诉开发者：用 Fable 5.1 跑长周期 Agent 任务的单位成本可以逼近甚至低于 Opus 5。科学基准翻倍则说明模型能力提升正从「写代码」向「做研究」外溢。

来源：[Anthropic 官方](https://www.anthropic.com/) / [IT 之家](https://www.ithome.com/) / [cnBeta](https://www.cnbeta.com.tw/articles/tech/1575974.htm) / [AI/TLDR](https://ai-tldr.dev/)（2026-09-01 至 09-02）

## OpenAI Astra：首个达到「关键」网络安全能力阈值的模型

OpenAI 于 9 月 1 日发布安全报告，披露即将推出的 Astra 是其首个在《准备框架》中达到「关键」网络安全能力阈值的模型。达到该门槛意味着：模型无需人类分步指导，即可在多个经过安全加固的真实关键系统中识别并开发有效零日漏洞利用程序。

测试表现：

- ExploitBench：Astra 达到 100% 满分
- 内部测试集（20 个近期披露的高危 V8 漏洞）：代码执行率远超 GPT-5.6 Sol，且消耗更少 token
- 测试过程中**自主发现并串联了两个零日漏洞**作为利用链，OpenAI 正向相关维护方披露
- 专家评估中，Astra 构建了从浏览器沙箱逃逸到主机命令执行的完整链，以及从普通用户到 root 的本地提权链

访问限制：Astra 发布后，高级网络安全能力最初仅向一小批测试人员开放，随后通过 Daybreak Blue 计划扩展防御性用途。在网络安全越狱评估中，Astra 拒绝了 91.5% 的不安全请求（GPT-5.6 Sol 为 59%）。OpenAI 还增设了「不一致性监控器」以识别和阻止潜在的未经授权行为。

值得关注的原因：这是**AI 模型首次在网络安全领域达到自主发现零日漏洞的水平**。对 Agent 编程工具生态而言，这意味着未来的 Coding Agent 不仅能写代码，还可能自主发现代码中的安全缺陷——但前提是安全护栏足够强。OpenAI 吸取了 7 月 Hugging Face 越狱事件的教训，将 Astra 的发布节奏从「快出」调整为「分级开放」，这本身就是一个值得追踪的安全治理范式。

来源：[OpenAI 官方](https://openai.com/index/path-to-astra) / [新浪科技](https://tech.sina.com.cn/) / [AIBase](https://www.aibase.com/news/30761)（2026-09-01 至 09-02）

## Codex 生态全面升级：CLI 0.152.0 + `_context` 上下文管理 + 桌面端指挥中心

OpenAI 的 Codex 产品线在 9 月 1 日前后密集更新，覆盖 CLI、上下文管理和桌面端三个层面。

**CLI 0.152.0**：将规划工具默认关闭，收紧 MCP 工具输出格式。此前 Codex CLI 0.151.0 已允许扩展重写 MCP 工具行为，新版本则收紧了这一灵活性。

**`_context` 上下文管理工具**：代码库曝光的新机制，让 Agent 在上下文将满时自动切换新窗口，同时保留可检索的工作注释和历史查询档案。这被视为解决长期任务中反复压缩导致背景丢失问题的新思路——从「压缩记忆」转向「外部记忆」。

**桌面端「指挥中心」**：Codex 桌面应用已可管理多个 AI 编码 Agent 并行运行，内置隔离机制防冲突，支持 Skills 扩展到部署、项目管理、图像生成等非编码任务。应用内置了完整的 Python、Node.js 和 LibreOffice 运行时（约 1.7GB 工具箱），Agent 可直接操作 PDF 和 Office 文档。

人事与数据：前 Linear 产品负责人 Nan Yu 加入 OpenAI 负责 Codex 与 ChatGPT 相关工作。Codex 活跃用户已增至 2500 万，10 天内新增 500 万。

值得关注的原因：Codex 正在从「一个 CLI 工具」演变为**多 Agent 协调平台**。`_context` 工具的设计思路值得所有 Coding Agent 团队关注——当上下文窗口不再是唯一记忆载体，Agent 的长时任务能力将质变。2500 万 DAU 也意味着 OpenAI 在开发者端的用户基数正在追平甚至超越 Anthropic。

来源：[AI/TLDR](https://ai-tldr.dev/) / [vibe coding 日报](https://new.qq.com/rain/a/20260902A00I5E00) / [老金出海](https://www.laojinchuhai.com/en/insights/frontier-daily-2026-09-02) / [Simon Willison's Weblog](https://simonwillison.net/)（2026-09-01 至 09-02）

## Galbot Store 香港开业：全球首批全自主机器人零售店

银河通用（Galbot）于 9 月 1 日在香港正式运营首批三家全自主机器人零售店 Galbot Store，分别位于红磡新海滨、湾仔海滨及启德体育园。这是该公司的境外首站，也是香港首批全自主机器人零售店。

运营模式：消费者通过语音或平板下单后，人形机器人店长「小盖」在完全没有工作人员遥控的状态下，凭借自主感知与决策能力完成接单、精准取货及交付的全过程。「小盖」支持普通话、广东话和英文切换，曾登上 2026 年春晚与沈腾、马丽同台表演，并在第二届世界人形机器人运动会上夺得家庭、餐饮、商超三项场景赛金牌。

政府支持：香港财政司司长陈茂波作为首名顾客在启德零售店完成购物，并表示香港将联动粤港澳大湾区先进制造实力，配合上游研发能力与港投公司的耐心资本，为具身智能落地提供「敢试、可试」的空间。港投公司自 2024 年起即为银河通用投资方。

规模：银河通用已在中国内地近 50 个城市开设约 200 家零售店。

值得关注的原因：这是**具身智能从「展会表演」走向「商业自主运营」的标志性案例**。机器人零售店不是遥控操作的噱头，而是全自主感知-决策-执行闭环在真实商业场景中的持续运行。香港作为境外首站，也意味着中国具身智能企业开始系统性输出商业运营模式而非仅出口硬件。

来源：[人民网国际](https://world.people.com.cn/n1/2026/0901/c1002-40790224.html) / [中新网](https://www.chinanews.com/ga/shipin/cns-d/2026/09-02/news1067409.shtml) / [China Daily HK](https://www.chinadailyhk.com/article/638790)（2026-09-01 至 09-02）

## 高盛上调人形机器人出货预期：2035 年 650 万台，BOM 年降 7%

高盛最新全球物理 AI 报告大幅上调人形机器人出货预测：2026 年 7.5 万台 → 2030 年约 89 万台 → 2035 年约 650 万台，对应市场 1383 亿美元。报告判断物流仓储与汽车制造将率先规模化落地，整机物料成本年均下降约 7%。

产业落地密集推进：

- **郑州**：众擎智能制造基地首批河南造 T800 人形机器人下线，一期约 8000 平方米，预计年底完成 20-30 台组装，未来两三年实现批量化生产
- **天津**：优必选全资子公司落地天津经开区，建设仿真人形机器人智能制造基地、具身智能产业生态创新中心及机器人 6S 旗舰运营平台，当地具身智能相关产业规模已近 130 亿元
- **青岛**：9 月 4 日至 6 日第 23 届中国国际消费电子博览会启幕，宇树 G1/R1、乐聚 Kuavo5/Roban2、节卡 π 等多款人形机器人亮相，展示从导览到康养的实用化进展

值得关注的原因：高盛的报告不是画饼，而是**基于供应链降本曲线给出的量化预期**。BOM 成本年降 7% 意味着 5 年后物料成本将下降约 30%，这正是从「演示」到「订单」的关键变量。中国拥有最完整的电子制造与汽车零部件供应链，深圳、成都、青岛多地同步推进的区域集群效应已经显现——量产临界点不是某一台机器人多能跳，而是订单、成本、场景三件事同时成立。

来源：[腾讯新闻](https://new.qq.com/rain/a/20260901A0B33D00) / [财联社](https://www.cls.cn/) / [青岛晚报](https://www.toutiao.com/article/7680416704026985001/)（2026-09-01）

## 一句话总结

模型侧的竞争已从「谁的分数高」转向「谁跑长时 Agent 更便宜更安全」；工具侧从「写代码」走向「指挥多个 Agent 持续干活」；具身侧从「展台表演」走向「商业自主运营」——三条线同时从能力展示阶段进入成本与安全验证阶段。

## 来源

- [Anthropic 官方](https://www.anthropic.com/)
- [OpenAI - Path to Astra](https://openai.com/index/path-to-astra)
- [AI/TLDR - 2026-09-02](https://ai-tldr.dev/)
- [老金出海 - Frontier Daily Sep 2](https://www.laojinchuhai.com/en/insights/frontier-daily-2026-09-02)
- [IT 之家](https://www.ithome.com/)
- [cnBeta](https://www.cnbeta.com.tw/articles/tech/1575974.htm)
- [AIBase](https://www.aibase.com/news/30761)
- [人民网国际](https://world.people.com.cn/n1/2026/0901/c1002-40790224.html)
- [中新网](https://www.chinanews.com/ga/shipin/cns-d/2026/09-02/news1067409.shtml)
- [China Daily HK](https://www.chinadailyhk.com/article/638790)
- [腾讯新闻](https://new.qq.com/rain/a/20260901A0B33D00)
- [Simon Willison's Weblog](https://simonwillison.net/)
- [vibe coding 日报](https://new.qq.com/rain/a/20260902A00I5E00)

---

> 封面使用默认 `/images/covers/briefing-default.svg`。如需自定义封面，建议尺寸 800×450；如需配图，可放入 `/images/posts/2026/fable-astra-codex-galbot-humanoid/`。
