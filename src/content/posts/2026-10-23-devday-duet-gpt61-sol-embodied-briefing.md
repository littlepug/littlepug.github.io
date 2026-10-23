---
title: DevDay 推出常驻智能体 Dots，物理 AI 现被击穿苗头
date: 2026-10-23
categories: briefing
tags: [ai, llm, agent, coding, embodied]
excerpt: OpenAI DevDay 2026 发布常驻智能体 Dots 与 GPT-6.1 Sol，Codex 迈入云端常驻时代；Anthropic 同步开放主动式智能体 Claude Duet；OpenAI 模型首次登陆 Google Cloud；GPT-5.6 Sol 挖出 PHP 十余年超危漏洞；具身智能侧，王兴兴称物理 AI 已现被击穿苗头，马斯克给出 Optimus 交付时间表。
cover: /images/covers/briefing-devday-duet-gpt61-embodied.svg
---

10 月 21 日至 22 日，AI 行业在 48 小时内密集放弹：OpenAI 举办 DevDay 2026，把智能体从「会话」推向「常驻同事」；Anthropic 几小时后跟进开放主动式智能体 Claude Duet 的研究预览；同时 OpenAI 模型首次进入 Google Cloud 分发体系。安全侧，AI 模型挖出潜伏十余年的 PHP 超危漏洞引发全球应急响应。具身智能侧，王兴兴与马斯克在同一天给出两个方向相反但同样关键的信号。以下 5 条值得展开。

## OpenAI DevDay 2026：Dots 常驻智能体 + GPT-6.1 Sol + Codex 上云

**发生了什么**：OpenAI 在 DevDay 2026 上发布三组核心更新。

- **Dots**：一组「常驻智能体」，每个 Dot 运行在 GPT-6 Astra 上，配备独立云电脑和浏览器，可接入 4000+ 应用。你给它一个目标、划定自主边界，它在你离线时持续工作，需要判断时才回报。Dot 对话不消耗 token 额度，现已面向 Pro 和 Business Premium 开放。
- **GPT-6.1 Sol**：面向 agentic coding、computer use 与专业工作的主力升级，智能水平接近 GPT-6 Astra，但价格只有 Astra 的五分之一。新 Ultrafast 档位在 Codex 中生成速度达 300 tokens/s（8 倍提升）。
- **Codex in the cloud**：任务可从笔记本无缝跟随到手机，可复用开发环境携带已批准的配置与权限。Codex CLI 新增语音输入和 `/agents` 并行任务视图，Codex Security Cloud 可按需扫描整个 GitHub 仓库。

**为什么值得关注**：这一届 DevDay 的主线非常清晰——智能体正在从「你打开的工具」变成「不下班的同事」。GPT-6.1 Sol 的定价策略尤其务实：智能体是按步数烧钱的，价格降 80% 意味着同样预算下能跑 5 倍的 agent 步数，这会直接改变团队在固定预算下的自动化上限。

## Anthropic 同日开放 Claude Duet 研究预览

**发生了什么**：Anthropic 在 DevDay 当天开放了 Claude Duet 的研究预览（美国 Pro/Max 用户候补制）。Duet 是独立应用（iOS / Android / claude.ai），由 Opus 5.5 驱动，每天早晨汇总各连接应用的简报，全天持续监听，只在真正需要你判断时才发消息。每个实例运行在独立云端虚拟机中，合上笔记本也在工作，可调用 6000+ 连接器，并继承原账户的记忆、Skills 和应用连接。

**为什么值得关注**：与 OpenAI 的正面撞车说明「主动式智能体」已是两家公认的下一个形态。更值得琢磨的是 Anthropic 的安全设计：凭据走 Managed Agents 通道（智能体永远看不到密码）、沿用 Claude Code 的 auto mode 分类器防注入、新增出站消息分级分类器（任何指令下都拒绝发送信用卡号和身份证件）。这基本是在为「长期自主运行」这个新风险面提前立法，做 coding agent 安全的可以对照抄作业。

## OpenAI 模型与 Codex 首次登陆 Google Cloud Model Garden

**发生了什么**：OpenAI 与 Google Cloud 宣布，GPT-6 Astra、GPT-6.1 Sol、GPT-6 Luna 及 Codex agentic 工作流进入 Google Cloud Model Garden 私有预览，通过 Google Cloud Marketplace 采购，企业可直接抵扣已有的 GCP 承诺消费额度。本地 Codex CLI / Desktop 可从 10 月 21 日起连接 Google 平台推理，OpenAI 模型也将进入 Google Antigravity 和 Gemini Agent 的任务路由。GA 预计数周内，微软仍是 OpenAI 首要云伙伴，Azure 不受影响。

**为什么值得关注**：多云分发是本轮真正的结构性变化——此前「绑定某朵云换模型」的采购惯性被打破。GCP 标准化团队现在可以把 OpenAI 推理和 Gemini 走同一条采购、身份、计费通道做并排评测。结合 OpenAI 正在推进的 300 亿美元、1.25 万亿美元估值新融资（据报道为 2027 年 IPO 桥接轮），分发网络扩张的意图非常明显。

## GPT-5.6 Sol 挖出 PHP 两大超危漏洞，全球掀起应急响应

**发生了什么**：OpenAI 在「Patch the Planet」计划中披露，GPT-5.6 Sol 发现了 PHP 两个无需认证的远程代码执行漏洞（代号 PHP2Shell，CVSS v4.0 评分 9.2），涉及内存管理与错误处理，影响 PHP 5.4 至 8.5——潜伏十余年。Wiz 独立发现了同一问题。PHP 官方已于 10 月 21 日发布 8.5.12 等四个安全更新；披露前一天消息泄露后，CISA、NSA、工信部 NVDB 等多国机构紧急示警，部分政府门户网站主动下线，维基百科及多款日本游戏一度停服。

**为什么值得关注**：两个信号。其一，AI 挖洞已经进入「发现真·核心基础设施 0-day」的量级，全球约 70% 网站依赖 PHP，这不是演示项目。其二，今天做 AI coding 的人应当意识到：模型既能在 2.5 分钟内扫完 639 个客户网站的漏洞（社区当天已有 Claude Code 实战案例），也可能在失控时变成攻击面。攻击与防御的天平同时在被 AI 重写。国内运维侧建议尽快排查并升级至 PHP 最新安全版本。

## 具身智能：王兴兴称物理 AI「被击穿」，马斯克锁定 Optimus 交付时间表

**发生了什么**：两条同日的重磅表态。

- 在「2026 世界物理 AI 大会暨宇树合作伙伴生态大会」上，宇树创始人王兴兴表示：随着 GPT-6 的发布，**物理 AI 已经看到被击穿的苗头**；具身智能迈过「ChatGPT 时刻」的最核心挑战，是 AI 模型输入输出与真实机器人的对齐；商业服务落地会快于家庭和工业场景。
- 马斯克在特斯拉财报电话会上表示，预计到明年末（2027 年底），机器人 AI、机电设计、可靠性和使用寿命等问题有望解决，届时才可以向特斯拉以外的企业交付 Optimus。他还计划为 Optimus 建一座「机器人学校」保障训练，并透露达成年产 100 万台目标所需时间可能超过一年。

**为什么值得关注**：王兴兴的「击穿论」是首次有头部本体厂商把 GPT-6 与具身智能的临界点直接挂钩——如果模型侧输入输出与真机的对齐问题真被「击穿」，行业叙事会从「数据瓶颈」切换到「场景抢滩」。而马斯克的时间表传递的则是另一面：量产爬坡比预期的更慢，年产百万台超一年，交付外部客户要等到明年末。一急一缓两个信号叠在一起，恰好勾勒出 2027 年具身智能的真实节奏。此外，2026 全球开发者先锋大会暨国际具身智能技能大赛 10 月 23 日至 25 日在上海浦东开幕，超万台机器人入驻张江，9 大赛道、23 个赛项全部用真实产线需求检验机器人「能不能真干活」，值得从业者现场观察。

## 一句话总结

这一周的信号指向同一个方向：**智能体的「驻留权」问题（常驻运行、多云分发、长期自主的安全边界）正在取代「单次能力」问题成为新的竞争主场**——编程侧如此，具身侧的「击穿时刻」赌注也一样。

## 来源

- [AI Daily Digest · October 23, 2026: DevDay Ships Always-On Agents](https://dev.to/hiroki-ii-ai/ai-daily-digest-october-23-2026-devday-ships-always-on-agents-meta-builds-a-non-voting-ai-4ham)
- [GenAI Daily - October 23, 2026: OpenAI Models Land on Google Cloud](https://rainvent.ai/genai-daily-october-23-2026-openai-models-land-on-google-cloud-nvidia-and-servicenow-push-hardware-enforced-agent-controls-openai-nears-1-25t-round)
- [The Daily AI Briefing: 23 October 2026](https://www.aiimpacthub.com/ai-news/2026-10-23)
- [腾讯研究院 AI 速递 20261023](https://www.sohu.com/a/1091363921_455313)
- [马斯克：明年末有望实现 Optimus 对外交付；王兴兴：物理 AI 已见被击穿苗头（数智早参）](https://new.qq.com/rain/a/20261023A02JRB00)
- [华尔街见闻早餐 FM-Radio 2026 年 10 月 23 日](https://news.qq.com/rain/a/20261023A02KPS00)
- [2026 全球开发者先锋大会暨国际具身智能技能大会 10 月 23 日启幕](https://www.aiddithome.com/p/13f21c75b0bcb3.html)
