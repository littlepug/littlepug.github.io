---
title: Copilot 进 Slack、Claude 修成本，人形机器人运动会收官
date: 2026-08-28
categories: briefing
tags: [ai, llm, coding, embodied]
excerpt: 8 月最后一周，AI Coding 的战场从编辑器蔓延到团队协作：GitHub Copilot 进入 Slack 与 Teams，Claude Code 补齐成本估算与 Python SDK 迁移，OpenAI Codex 上线 Agents 仪表盘；具身智能侧，2026 世界机器人大会与世界人形机器人运动会同期收官，人形机器人从表演走向产线与竞技。
cover: /images/covers/briefing-default.svg
---

## 发生了什么

8 月 24 日至 28 日，AI Coding 与具身智能两条主线同时进入「落地细节」阶段。GitHub Copilot 首次走出 IDE，以 @GitHub 的形式进入 Slack 与 Microsoft Teams，让团队聊天频道直接变成可协作的 Agent 工作区；Anthropic 连发三版 Claude Code，重点修复成本估算、上线 Python SDK 自动迁移，并把跨会话消息带到 Windows；OpenAI Codex CLI 在同一周推出交互式 Agents 仪表盘，同时 Linux 桌面版开启预览。具身侧，2026 世界机器人大会（WRC）和第二届世界人形机器人运动会先后在北京闭幕：Galaxy General 的 Galbot ET1 与人共打网球，UBTECH 展示近十台人形机器人协同完成物流全流程，宇树科技则在运动会期间完成科创板上市首日暴涨 460% 的亮相。

## GitHub Copilot 进 Slack / Teams：Agent 走出编辑器

8 月 21 日，GitHub 把 Copilot 的 Agent 能力从 VS Code、JetBrains 等编辑器里搬进了团队协作场景：

- **Copilot in Slack**：在任意频道 `@GitHub` 即可启动一个云端 Agent，回答代码问题、排查失败、在沙箱中复现 bug，并直接生成关联回对话的 Pull Request。
- **Copilot in Microsoft Teams**：同样的逻辑迁移到 Teams，会议中的 action items 可被直接转成可跟踪的 Agent 任务。
- **前提与管控**：需要 Copilot Business 或 Enterprise 计划；仓库管理员可为 Agent 自动生成的 PR 设置额外审批门禁，保留人类最终合并权。

同期，GitHub 的 **Agent Plugins 1.0** 从预览转正。这是首个跨客户端的 Agent 插件标准：一个 `plugin.json + skills/ + 可选 mcp.json` 的包，可在 VS Code、Copilot CLI、Copilot SDK、Copilot App 中运行。对企业而言，这意味着内部沉淀的代码审查、文档检索、部署技能只需要封装一次，就能在多个 Copilot 触点上复用。

**值得关注的原因**：AI Coding 的前两阶段是「编辑器里的自动补全」和「终端里的自主 Agent」；现在进入第三阶段——「团队工作流里的常驻协作者」。把 Agent 放到 Slack/Teams 的价值不是替代 IDE，而是让非编码角色（PM、运维、QA）也能在对话中驱动代码变更。但这也意味着权限模型更复杂：同一个 Agent 在 IDE 里只操作本地文件，在频道里却能代表团队提交 PR。如果企业没有提前设计好审批、预算和审计策略，扩大触点的过程很可能先扩大事故面。

## Claude Code v2.1.239：成本透明化与工程治理

Anthropic 在 8 月 21 日至 23 日密集推送 Claude Code v2.1.239 及两个小版本，重点解决企业规模化使用时的「看不见的成本」和「迁移债」：

- **`/cost`、状态栏与 `--max-budget-usd` 计入 1.1x 推理溢价**：针对美国本土数据驻留工作区的额外溢价，预算估算不再低于实际账单。对受监管团队而言，这是从「月底对账惊吓」到「会话级成本控制」的关键补丁。
- **`/claude-api upgrade` 自动迁移 Python SDK**：一键把项目从 `anthropic` 0.x SDK 迁移到 1.x，降低模型能力升级时的代码债。
- **Windows 跨会话消息**：通过 `ListAgents` 和 `SendMessage` 让 Windows 用户也能像 macOS/Linux 一样在不同 Claude Code 会话间传递任务。
- **云会话插件同步**：来自 claude.ai 的插件现在以 `name@synced` 标签同步，避免静默覆盖本地同名插件。
- **凭证泄露防护增强**：v2.1.234 同期上线更强的凭证泄漏保护。

**值得关注的原因**：Claude Code 的竞争重心正在从「模型有多强」转向「组织能不能放心大规模使用」。预算估算、SDK 迁移、凭证保护这些看似琐碎的功能，恰恰是把它从个人效率工具变成团队基础设施的门槛。对于已经在用 Claude Code 但还在用传统 PR 评审流程的团队，建议把这次更新当作契机：先标准化 `--max-budget-usd` 和审批策略，再把 `/claude-api upgrade` 接入 CI，把 SDK 升级从「人工考古」变成自动化门禁。

## OpenAI Codex：Agents 仪表盘与 Linux 桌面版

OpenAI 在 8 月 20 日将 Codex CLI 推进到 `rust-v0.149.0`，同周的桌面版更新也让 Codex 覆盖了更多平台：

- **Agents 仪表盘**：在终端里直接搜索、启动、打开、重命名、停止后台任务；配合 `codex queue` 可向正在运行的本地或远程会话发送消息。
- **工作目录命令**：`/cd`、`/pwd`、`/cwd` 支持会话中途切换工作目录。
- **Vim 模式增强**：新增 `cw`、`c$`、`cc` 及字符替换等真实编辑动词。
- **`codex doctor` 诊断工具**：可排查终端保护软件、网络/代理故障和更新连通性问题，对 corporate proxy 环境下的开发者尤其实用。
- **插件隔离与策略加固**：网络策略更新失败时直接拒绝网络访问，避免沙箱策略意外失效。
- **Linux 桌面版预览**：面向 Ubuntu、Debian、Fedora 的桌面应用开启预览，补齐了 Linux 开发者长期只能使用 CLI 或浏览器的缺口。
- **MCP SDK 升级至 3.0.0**，并移除了已弃用的 `codex exec --full-auto`，统一为 `--sandbox workspace-write`。

**值得关注的原因**：Codex 的差异化不是「单次代码生成质量」，而是把 Agent 当作一个可长期运行、可远程托管、可多端接入的工作负载。Agents 仪表盘和 `codex queue` 让它更像一个分布式任务系统，而不是一个命令行小工具。对于已经把 Codex 接入 CI 或远程开发环境的团队，这次更新意味着可以把后台任务纳入常规监控；对于 Linux 用户，桌面版的到来则降低了团队内部推广的门槛。但需要注意：GPT-5.4 / GPT-5.4 mini 将于 8 月 31 日从 ChatGPT 认证的 Codex 中移除（API 和 API-key 认证会话仍可用），有固定模型依赖的团队需要提前验证替代方案。

## 具身智能：运动会与 WRC 同期收官

### 第二届世界人形机器人运动会：从跑步到网球

8 月 19 日至 24 日，第二届世界人形机器人运动会在北京国家速滑馆等地举行。据 CGTN 报道，Galaxy General Robotics 的 Galbot ET1 在开幕式上与人共打网球，完成了动态追踪、轨迹预测、移动平衡和全身击球等连续动作。赛事共设 51 个赛项、吸引 16 国 666 支队伍、2056 台机器人参赛。

相比首届，本届运动会强调「全自主化」和「真实场景赛」：机器人不再依赖预设动作序列，而是在动态环境中实时感知、决策与执行。闭幕式还发布了全球首个世界级人形机器人运动会全量数据集，总时长超过 2500 小时。

**值得关注的原因**：网球、跑酷等竞技项目正在变成具身智能的「新图灵测试」——它们不像围棋有封闭规则和完美信息，而是要求机器人在开放物理环境中把感知、决策、运动控制串成实时闭环。运动会数据的公开，将为训练更鲁棒的 VLA / 世界模型提供难得的长时间、多模态、真实物理交互数据。

### 2026 世界机器人大会：从炫技到交付

8 月 19 日至 23 日，2026 世界机器人大会（WRC）在北京亦庄举行，主题「人机共生，产需共融」。官方数据显示，大会吸引 26 国 300 余家参展商、3000 余款展品、300 余款首发产品。

现场看点包括：

- **UBTECH**：近十台人形机器人协同完成物料搬运、分拣、补货的完整智慧物流流程。
- **北京人形机器人创新中心**：天工 Omni 展示梅花桩、上下楼梯、匍匐爬行等极限运动能力，并发布具身多模态大模型 Pelican-Unify 1.0。
- **银河通用 Galaxea**：观众扫码下单后，机器人自主完成仓库拣选、打包、交付，整套流程已在北京等城市落地运行，瞄准夜间仓配人力缺口。
- **星海图**：展示 G0.5 具身基础模型驱动的机器人前置仓在线接单实景，以及机器人组装机器人长程自主作业。
- **工信部数据**：2025 年中国机器人产业营收突破 3000 亿元，2026 上半年营收 1655 亿元，同比增长 24.5%。

**值得关注的原因**：本届 WRC 的最大变化是叙事口径——从「能跑会跳」转向「能干活、能交付、能成交」。物流、零售、康养、巡检等真实场景的 Demo 密度明显上升，车企（比亚迪、上汽、小鹏等）也密集进入产线测试阶段。这意味着具身智能正在越过「概念验证」阶段，进入「成本能不能比人低、可靠性能不能过产线」的硬碰硬阶段。宇树科技 8 月 19 日科创板上市首日涨 460.34%，市值约 3417 亿元（数据待核实），则是资本市场对「本体规模化」投出的信任票。

## 今日看点

- AI Coding 的竞争已从「模型能力」扩散到「工作流嵌入深度」：Copilot 进 Slack/Teams、Claude 修成本、Codex 做仪表盘，三者分别对应协作场景、企业治理和远程 Agent 调度。
- 具身智能的评估标准正在从「动作漂亮」转向「任务完成率 + 数据可复用」。运动会和 WRC 的数据集发布，是行业从 demo 竞赛走向规模化训练的重要基础设施。
- 一个值得观察的交叉点：AI Coding 工具生成的仿真环境、kernel 代码和评估脚本，正在反向成为训练具身模型的软件基础设施；两套系统的耦合度会越来越高。

## 来源

- AI Coding Agents & IDEs: The Complete 2026 Comparison — <https://lushbinary.com/blog/ai-coding-agents-comparison-cursor-windsurf-claude-copilot-kiro-2026/>
- AI Coding News: GitHub Copilot Lands in Slack & Teams, Claude Code Ships v2.1.239 — <https://oday-bakkour.com/blog/ai-coding-news-august-23-2026-copilot-slack-teams-claude-code>
- AI Coding Tools Roundup — August 2026: Claude Code, GitHub Copilot, OpenAI Codex & OpenCode — <https://oday-bakkour.com/blog/ai-coding-tools-roundup-august-20-2026>
- Coding Agentic AI News - Week Ending 2026-08-25 — <https://aiagentstore.ai/ai-agent-news/topic/coding/2026-03-24/detailed>
- Humanoid robot takes on tennis, testing AI's next frontier — <https://news.cgtn.com/news/2026-08-23/Humanoid-robot-takes-on-tennis-testing-AI-s-next-frontier-1PQ73bW4mSQ/p.html>
- Robot conference spotlights commercial push for China's robot sector — <http://www.chinanews.net/news/279254105/robot-conference-spotlights-commercial-push-for-robot-sector>
- 2026 世界机器人大会开幕——具身智能正迈入现实生活 — <https://www.toutiao.com/article/7675972366895284746/>
- 从花式炫技到“能干活、能交付”，人形机器人“加速进化” — <https://www.toutiao.com/article/7677401698079441434/>

---

*配图建议：封面 800×450，可使用默认 `/images/covers/briefing-default.svg`；正文如需插图，建议路径 `/images/posts/2026/copilot-slack/` 与 `/images/posts/2026/wrc-tennis/`。*
