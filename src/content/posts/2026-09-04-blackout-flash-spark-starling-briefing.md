---
title: 黑色星期四 AI 集体宕机，编程赛三强同日发布
date: 2026-09-04
categories: briefing
tags: [ai, llm]
excerpt: 9 月 3 日 OpenAI、Anthropic、xAI 三大云端同时宕机 3 小时 40 分，Cursor 等下游 Coding 工具受波及；同日 Google Gemini 3.8 Flash、Meta Muse Spark 1.3、阿里 Qwen3.8-Max-0902 三款编程强模型接连放出，DeepSWE 与 Terminal-Bench 排行榜一夜洗牌；具身侧银河通用「银河星仔」开启预订，Sam Altman 首次公开确认 OpenAI 将做人形机器人。
cover: /images/covers/briefing-blackout-flash-starling.svg
---

## 发生了什么

9 月 3 日对全球 AI 产业来说是罕见的「黑色星期四」。北美时间上午 9:23 起，OpenAI 的 ChatGPT/Codex、Anthropic 的 Claude、xAI 的 Grok 三大头部云端服务在 3 小时 40 分钟内先后大规模宕机，谷歌 Gemini、微软 Copilot 与 AI 编程工具 Cursor 也因共享底层设施而部分中断，是有报告以来最大规模的 AI 集体宕机事件。

同一天，模型侧的「内卷」完全没有停：Google 发布 Gemini 3.8 Flash 与安全防御版 3.8 Flash Cyber（六周内第三次 Flash 更新），Meta 推出 Muse Spark 1.3 在 DeepSWE 上一举杀入前三，阿里通义千问发布 Qwen3.8-Max-0902 登顶 CodeArena WebDev 榜首。编码模型的竞争已经从「周更」变成「日内洗牌」。

具身智能也有两条新动向：银河通用的「银河星仔」以「全球首个原生智能体机器人」身份正式开启预订；Sam Altman 在播客中首次公开确认 OpenAI 将做人形机器人，并把数据中心自动化列为近期重点。

## 「黑色星期四」：三大云端 AI 同时宕机 3 小时 40 分钟

9 月 3 日美东时间上午 9:23 左右，Anthropic 的 Claude 系列模型（包括 Mythos 5.1、Fable 5.1、Opus 5/4.8/4.6）率先出现错误率飙升；仅两分钟后，xAI 的 Grok 全端下线；约一个半小时后，OpenAI 的 ChatGPT 与编程工具 Codex 也大规模报错。Downdetector 数据显示，OpenAI 相关故障报告峰值超过 3.7 万份，Claude 约 1200 份，Grok 约 1000 份。AI 编程工具 Cursor 直接公告其部分服务因上游大模型故障而被迫中断。

故障原因：

- Anthropic 技术员工 CJ Avilla 在社交媒体透露，事件由「基础设施问题」引发
- OpenAI 状态页确认 ChatGPT 共 15 个组件、Codex 共 4 个组件受到影响
- 业内分析指向 Azure 同期故障报告激增，Anthropic 在 SpaceX AI 孟菲斯 Colossus 集群租用算力的消息被重新审视
- Cloudflare 状态页显示当天出现 R2 自定义域名 HTTP/3 问题及 WARP 用户地理位置识别错误

恢复节奏：美东时间当日中午 11:16，Claude 主要服务率先恢复；随后 ChatGPT、Grok 逐步恢复正常。资本市场迅速反应——AI 本地化部署概念股 Palantir 美股盘中大涨 7.71% 至 7.81%。

值得关注的原因：这是**有报告以来最大规模的 AI 集体宕机事件**。三家头部厂商几乎同步掉线的事件直接暴露了 AI 产业对共享云基础设施的高度单点依赖——下游所有 Coding 工具、Agent 平台、企业应用在那一刻同时「停摆」。这次事件对依赖 AI 写代码的工程团队是当头棒喝：当 Anthropic 的 status page 出现红条时，你的 Claude Code 也会一起倒下。Palantir 股票的同步上涨也提示市场重新定价「本地化推理」和「企业自托管 Coding Agent」的价值。

来源：[21 世纪经济报道](https://www.toutiao.com/article/7681458149106188843/) / [腾讯新闻](https://new.qq.com/rain/a/20260904A03F8L00) / [新浪科技](https://k.sina.cn/article_7879848900_1d5acf3c406803aq4i.html)（2026-09-03 至 09-04）

## 编程模型三强同日更新：Flash、Spark、Max 把 DeepSWE 打成日内榜

9 月 3 日三家大厂接连放出编码侧主力模型，AI 编程工具的默认后端一夜洗牌。

**Google Gemini 3.8 Flash + 3.8 Flash Cyber**（六周内第三次 Flash 更新）：

- 延续 3.7 Flash 的速度与首发价格（输入 $0.75 / 输出 $3.75 每百万 tokens）
- DeepSWE v1.1 得分 73.7%（3.7 Flash 为 65.3%），Terminal-Bench 2.1 提升至 90.8%（3.7 Flash 为 81.6%）
- 同步推出 Gemini 3.8 Flash Cyber，仅通过 Fairwind Program 向政府、关键基础设施、可信防御机构开放，主攻漏洞发现与自动修复
- 已接入 Gemini API、AI Studio、Android Studio、Antigravity 与 Gemini Enterprise

**Meta Muse Spark 1.3**（Meta Superintelligence Labs 发布）：

- 已在 Muse Code 与 Meta Model API 上线
- DeepSWE v1.1 达 75.4%，Terminal-Bench 2.1 达 88.8%，MRCR 256K-512K 长上下文 98.5%
- 据 Meta 工程师内部对比，工具调用减少约 20%、token 消耗减少约 25%
- 同步预告「更大的模型」与 Muse Spark 开放权重版本

**阿里通义千问 Qwen3.8-Max-0902**（编程与专业办公定向后训练）：

- 总参数 2.4T，上下文窗口 1M tokens，定价 $2 / $6 每百万 tokens
- CodeArena WebDev 总榜以 1691 分登顶，超越 Claude Opus 5 Max 的 1687 分（±19 噪声范围内）
- DeepSWE 1.1 拿 69.3%，TerminalBench 3.0 拿 29.0%，SWE-Atlas QnA 拿 70.0%
- 已上线千问 AI 平台 API，并接入千问办公、Qoder 和千问 App

开发者社区的体感也极有戏谑意味：3.8 Flash 在 Pareto 前沿上只守了 3.5 小时，就被 Muse Spark 1.3 顶掉；Fable 5.1 在 FrontierSWE v2 上一骑绝尘 56.29%（领先 GPT-5.6 Sol 24 个百分点），而 Astra（OpenAI 即将发布）成为「今天最值得期待的对手」。

值得关注的原因：**编码模型的「周更节奏」已经压成「日内节奏」**。Muse Spark 1.3 紧贴 Gemini 3.8 Flash 在数小时内发布，说明 Meta 已把 Google 视为头号对手；Qwen3.8-Max-0902 则以 1/20 的 Opus 5 价格拿下 WebDev 榜首，让「中价位」成为新战场。对国内开发者而言，Qwen 与千问 App 同步上线意味着长上下文 Agent 不再需要依赖海外模型——这一点在 9 月 3 日「黑色星期四」的背景下尤其有价值。

来源：[Google Blog](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/) / [Meta Research](https://research.meta.ai/blog/introducing-muse-spark-1-3) / [Qwen 官方](https://www.qianwenai.com/models/qwen3.8-max-0902) / [FAV0 AI Daily](https://fav0.com/en/2026-09-03/)（2026-09-02 至 09-03）

## Claude Code 2.1.259 + Cursor 自托管：AI 编程工具的「企业治理」路线

9 月 3 日同步发布的两项更新，主题是同一件事——把 Coding Agent 从「开发者私人玩具」推向「企业可控平台」。

**Claude Code 2.1.259**（Anthropic）：

- 新增 `managedMcpServers` 管理设置：管理员可在企业层面统一推送 HTTP/SSE MCP 服务器，所有用户无需自行配置即可获得治理后的工具
- 同步上线 `--permission-prompts none` 模式：CI/CD 等无人值守场景不再因等待权限确认而挂起，而是直接拒绝执行
- 修复并发会话静默覆盖 `~/.claude.json` 的 Bug——多 Agent 并行 PR review、自动化测试生成等工作流不再因 workspace trust 状态被互相擦除
- 补齐 GitLab MR 识别（`!N` 语法 + `mr create/merge/close/reopen`），关闭对 GitLab 企业的「二等公民」体验
- 启动速度提升约 50ms

**Cursor Self-hosted Machines**：

- Cursor Cloud Agents 可以在客户自有网络内的机器上执行命令，而模型推理仍由 Cursor 云端完成
- 两种形态：`My Machines`（个人账户绑一台笔记本/VM）与 `Team Pools`（企业共享 worker 队列，自动扩缩容）
- Worker 仅通过出站 HTTPS 反向连接 Cursor，**不需要打开入站防火墙端口**；Linux 与 Mac worker 还支持 computer use
- 对接 Claude Sonnet 5、GPT-5.6 Sol、Gemini 3.8 Flash 等模型，对应 Coding Agent 仍由 Cursor 调度

值得关注的原因：**两家头部 Coding 工具几乎同一天给出「企业合规」的两种解法**——Anthropic 选择「管理员主导 + 拒绝式 fail-fast」，Cursor 选择「执行留在本地 + 推理留在云端」。这背后是同一个判断：监管/金融/医疗行业的「代码不出网」要求曾是云端 Coding Agent 的最大阻力，现在这两条路径都补齐了。再加上 9 月 3 日「黑色星期四」的宕机事件，企业自托管 Cursor worker 同时也成了「AI 基础设施单点失败」的兜底方案。`managedMcpServers` 也意味着 MCP 不再只是开发者私配——它开始变成企业级工具目录。

来源：[Claude Code 2.1.259 changelog](https://docs.claude.com/en/release-notes/claude-code) / [Cursor Self-hosted Machines](https://cursor.com/blog/self-hosted-machines) / [TheRouter.ai 分析](https://therouter.ai/news/claude-code-2259-managed-mcp-servers-concurrent-session-fix)（2026-09-02 至 09-03）

## Codex CLI 0.153.0 + 后台 computer use：Coding Agent 进入「常驻」阶段

OpenAI 阵营在 9 月 3 日前后放出多个小幅但关键的更新，把 Codex 与 Claude Code 桌面端的差距进一步缩小。

**Codex CLI 0.153.0**：

- 新增插件市场客户端（plugin marketplace client），开发者可直接从远程市场安装插件
- 编辑器支持 Vim undo/redo，会话重连时保留草稿
- 与前一日的 0.152.0（默认关闭 planning tool + 收紧 MCP 工具输出格式）形成「功能外扩 + 默认收紧」的双向节奏

**Claude Code / Claude Cowork 后台 computer use**（Anthropic，9 月 3 日上线）：

- 在 macOS 15+ 上，Claude 在后台窗口操作，不再接管用户的鼠标和键盘
- 用户可同时进行其他桌面工作——AI 自动点击、输入、打开应用
- Beta 阶段，仅限 Pro 与 Max 订阅，Team/Enterprise 暂不支持
- 官方明确无沙箱隔离，存在提示注入风险，建议不要向含敏感数据的应用授权

**Codex 桌面端 + 豆包工作**：Codex 桌面应用已可管理多个 AI 编码 Agent 并行运行（前 Linear PM Nan Yu 加入后持续推进），而字节豆包工作也新增「多 Agents 并行」和「Mac 系统操作电脑」两项功能。

值得关注的原因：**Coding Agent 正在从「按需唤起」走向「常驻后台」**。后台 computer use 与多 Agent 并行编排意味着开发者可以一边开会一边让 AI 写代码、改文档、跑测试。Codex 2.5 亿 DAU、Claude Code 桌面版的常驻策略，再加上豆包的多 Agent 编排，2026 年下半年的开发者桌面很可能被 AI 助手常驻占满。当然，后台权限的安全边界（Anthropic 自己也提示了提示注入风险）会很快成为下一轮攻防的焦点。

来源：[AI/TLDR CLI 0.153.0](https://ai-tldr.dev/) / [Anthropic Computer Use 后台说明](https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork)（2026-09-03）

## 银河星仔开启预订：「原生智能体机器人」首次商业化

具身智能侧 9 月 3 日最大的进展来自银河通用。证券日报报道，银河通用与清华大学团队联合研发的小型双足人形机器人「银河星仔 GALBOT ET1」于 9 月 3 日正式开启预订，被业内称为「全球首个原生智能体机器人」。

产品形态与核心能力：

- 身高 1230mm，整机重量 30kg，外观采用柔性材质包裹，电机方案来自宇树科技
- 搭载银河通用自研的 **AstraBrain-WBC 通用小脑基模**，基于十万小时人类动作数据训练
- 通过与人类实时交互进行自主识别，可现场观察人类动作并提取运动轨迹，与不同形态机器人实时配合、即兴互动
- 目标场景：家庭、零售、导览

「原生智能体」与「嫁接式」的本质区别：

- **嫁接式**：在成型硬件控制器上「外挂」大模型 API，决策与运动控制分属两套独立系统，响应延迟高，难处理突发物理交互
- **原生智能体**：在实时操作系统与运动控制层把神经网络推理与电机闭环控制放在同一时序框架下协同设计，使「思考」与「行动」的信号传导近乎同步

同一个通用大脑可以无缝注入双足、轮式、重载等形态迥异的机器人身体，实现「一脑多能」。该机器人已在 2026 世界机器人大会（WRC）首发。

值得关注的原因：**这是「原生智能体」路线从论文走向预订的关键一步**。当前主流 VLA 路线仍以「语言指令 → 动作输出」为主，原生智能体则直接把大脑与电机闭环放到同一时序框架下。银河星仔开启预订意味着市场开始为「非遥控、非预编程」的小型人形机器人买单——尽管单价、首批规模、交付时间都尚未披露，但这是国内具身头部企业首次把「原生智能体」概念带进消费端。

来源：[证券日报](https://www.toutiao.com/article/7681283221832843819/) / [新浪科技](https://finance.sina.com.cn/)（2026-09-03）

## Sam Altman 首次确认 OpenAI 做人形机器人，数据中心自动化先行

9 月 2 日播客中，Sam Altman 首次公开确认 OpenAI 将做人形机器人，并解释背后的判断：物理世界是围绕人体尺度构建的——键盘、门、重型机械、厨房都是「人类尺寸」。Altman 表示 OpenAI 也会同步开发面向数据中心的专用机器人，近期重点是工业基础设施与数据中心自动化，以及底层的认知模型。具体的模型、时间表与团队规模尚未披露。

行业背景数据（同期公布）：

- 全球 H1 2026 人形机器人出货量约 1.91 万台，同比 +272%；中国厂商贡献超过 97%
- 智元机器人上半年出货 8400 台（+562%），首次超过宇树升至全球第一；宇树同期 5900 台（+170%）
- 优必选全尺寸具身智能人形机器人收入 5.90 亿元（+1445%），首次成为第一大收入来源；上半年总营收 12.69 亿元（+104.2%），净亏损 3.39 亿元（同比收窄 23%）
- 宇树科技 IPO 后 11 个交易日股价从首日开盘 1110 元跌至 550.45 元，市值从最高 4449 亿元缩水至 2226 亿元

值得关注的原因：**当全球最大的 AI 实验室公开承认「必须做人形机器人」时，整个具身赛道的资金叙事进一步重写**。Altman 的逻辑不是「机器人会变成 AGI 的身体」，而是「物理世界的接口就是人体尺度」——和特斯拉 Optimus、Figure 03、星动纪元、银河通用押注同一件事。OpenAI 进场同时也意味着 AIGC 头部玩家的「AGI 物理化」布局已经形成：模型 + Agent 平台 + 具身硬件三件套。短期内最大的变量是它选择自研硬件还是收购路线（参考 6 月 Ona 收购）。

来源：[The Paper](https://www.thepaper.cn/) / [Pandaily](https://pandaily.com/) / [读创](https://www.toutiao.com/article/7681230293776237066/)（2026-09-02 至 09-03）

## 一句话总结

黑色星期四用一次集体宕机把 AI 基础设施的脆弱性摆在桌面上，但同日三款编程强模型与两家 Coding 工具的「企业治理」更新又把竞争推上新台阶；具身侧则同时迎来「原生智能体」商业化和 OpenAI 正式入局两条主线——编程与具身这两条赛道，正在用各自的节奏从「能力秀」走向「基础设施化」。

## 来源

- [21 世纪经济报道：黑色星期四](https://www.toutiao.com/article/7681458149106188843/)
- [腾讯新闻：黑色三小时](https://new.qq.com/rain/a/20260904A03F8L00)
- [新浪科技：ChatGPT 为什么会突然大规模宕机](https://k.sina.cn/article_7879848900_1d5acf3c406803aq4i.html)
- [Google Blog：Gemini 3.8 Flash](https://blog.google/innovation-and-ai/models-and-research/gemini-models/3-8-flash-and-3-8-flash-cyber/)
- [Meta Research：Muse Spark 1.3](https://research.meta.ai/blog/introducing-muse-spark-1-3)
- [Qwen：Qwen3.8-Max-0902](https://www.qianwenai.com/models/qwen3.8-max-0902)
- [FAV0 AI Daily 9-3](https://fav0.com/en/2026-09-03/)
- [AI/TLDR Daily Digest 9-3](https://buttondown.com/ai-tldr/archive/aitldr-daily-digest-september-03-2026)
- [TheRouter：Claude Code 2.1.259 分析](https://therouter.ai/news/claude-code-2259-managed-mcp-servers-concurrent-session-fix)
- [Cursor Self-hosted Machines](https://cursor.com/blog/self-hosted-machines)
- [Anthropic Computer Use 后台](https://support.claude.com/en/articles/14128542-let-claude-use-your-computer-in-cowork)
- [证券日报：银河星仔开启预订](https://www.toutiao.com/article/7681283221832843819/)
- [读创：宇树市值缩水近半](https://www.toutiao.com/article/7681230293776237066/)
- [FutureX Physical AI Daily 09-04](https://dev.to/future_x/futurex-physical-ai-daily-issue-109-0904-545k)

---

> 封面：`/images/covers/briefing-blackout-flash-starling.svg`（自绘 800×450 暗色底 + 三云宕机提示 + 模型 racing + 人形剪影）。如需正文插图，建议放入 `/images/posts/2026/blackout-flash-starling/`。
