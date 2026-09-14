---
title: 编码 Agent 沙箱集体失守，OpenAI Agents API 与书生 W0 同日推进
date: 2026-09-14
categories: briefing
tags: [ai, llm, coding-agent, embodied-intelligence]
excerpt: 本周 AI 编码工具因 Cymulate 披露的 Configuration-Based Sandbox Escape 集体陷入安全争议；OpenAI Agents API 公测与 Claude Code 的 plugin eval/256 并发把工作流推向托管 runtime；具身智能侧，上海 AI Lab 发布书生物理世界模型 W0，国家数据局主持召开具身智能座谈会，全球人形机器人出货量上半年同比近 3 倍。
cover: /images/covers/briefing-sandbox-agents-api-w0-humanoid.svg
---

2026-09-14 这周，AI 编程 Agent 与具身智能同时走到了“能力”与“治理”的十字路口：一边是编码 Agent 被安全研究员证明能绕过沙箱，一边是 OpenAI 和 Anthropic 把 Agent 执行框架推进到托管 runtime 与可评测并发的工程化阶段；物理 AI 侧则迎来上海 AI Lab 的多模态物理世界模型与国家数据局的数据标准吹风。

## 编码 Agent 沙箱被集体绕过，Cymulate 披露 CBSE 漏洞类

Cymulate Research Labs 在 9 月 11 日前后发布系列研究，指出当前主流 AI 编码 Agent——Claude Code、Gemini CLI、Codex CLI、Cursor、GitHub Copilot——普遍存在一类名为 **Configuration-Based Sandbox Escape（CBSE）** 的绕过方式。

沙箱承诺“Agent 只在隔离环境里跑命令”，但 CBSE 的攻击路径并不打破容器本身，而是让 Agent 在沙箱内写入被宿主编码工具信任的启动文件、hook 或配置。下一次用户或 IDE 启动该工具时，这些被污染的配置就在沙箱外、以用户权限执行。Cymulate 将其概括为：**沙箱被当作边界，真正的边界却是宿主编写侧的信任面**。

具体案例包括：Cursor 的 `.claude` hook 配置导致未沙箱命令执行（CVE-2026-48124，已在 Cursor 3.0.0 修复）；Claude Code v2.0.24–v2.1.89 存在网络旁路；Codex CLI 的 Windows named pipe 因权限设置过宽被任意用户接管，可注入提示并窃取 refresh token（CVSS 8.5，OpenAI 已修复）。据 BleepingComputer 汇总，部分厂商修复耗时超过 50 天。

> **为什么值得关注**：编码 Agent 正在被企业用于审计代码、修复漏洞甚至接触生产仓库。当它们自身无法守住执行边界时，“用 AI 做安全”的前提就动摇了。CBSE 给安全团队的直接启示是：把 Agent 当作高权限软件审计，而不是“有沙箱就安全”。

## OpenAI Agents API 公测，Claude Code 把 harness 做成可评测并发的 runtime

在沙箱争议爆发的同一周，Agent 基础设施仍在加速标准化。OpenAI 宣布 **Agents API 进入公测**，把原本属于 Codex CLI 的 harness（任务编排、沙箱、工具调用、子 Agent）产品化为托管 API。开发者无需额外平台费即可调用，首批合作伙伴包括 Cloudflare、Vercel、Modal、E2B、Oracle 等沙箱/执行环境提供商。

这意味着 OpenAI 把“模型 + harness”两层都收进自己的计费与版本体系，只把工具、知识和垂直工作流留给开发者。争议在于：如果中间状态（工作目录、artifact、secret vault、skill 目录）被 OpenAI 抽象到 harness 层，沙箱厂商就可能沦为可替换算力。

Anthropic 也在同一方向推进。Claude Code v2.1.269 引入：

- `claude plugin eval`：插件/Skill 作者可写测试用例、打分、关闭插件重跑看 delta；
- 可复现的 JSON/HTML 评分报告、`/output-style` 切换、Bash 改文件直接出 diff；
- `CLAUDE_CODE_WORKFLOW_MAX_CONCURRENT_AGENTS` 支持 1–256 并发，把 workflow 从“能跑”推向“可规模化运行”。

> **为什么值得关注**：2026 年 Coding Agent 的竞争已从模型榜单转向 **harness/runtime**。OpenAI 和 Anthropic 都在做同一件事：把执行框架从开源库变成绑定模型的托管服务。对开发者是便利，对创业公司则是被锁定的风险。

## 上海 AI Lab 发布书生物理世界模型 W0，机器人长“手感”

9 月 13 日浦江创新论坛上，上海人工智能实验室发布 **书生·物理世界模型 W0**，并升级书生·端砚科学发现平台。

W0 首次把视觉、力觉、触觉三种模态放进同一个模型，采用“异步异频”架构：后台规划与实时动作在不同时间尺度上并行推进。这样机器人在输出动作过程中仍能接收新观测并调整后续动作，不必等下一轮规划完成。对精密装配、抓取等“视觉受限”操作来说，模型能根据“是否握紧、是否接触到位、力度是否合适”即时修正。

W0 已接入书生·端砚平台，与书生科学多模态大模型 S2 一起支撑了脂质纳米颗粒合成、美哌卡因有机合成、基因编辑蛋白定向进化等干湿实验闭环。上海 AI Lab 还联合上海同步辐射光源、中国散裂中子源等大科学装置，把自主科研闭环延伸到中试平台。

> **为什么值得关注**：物理 AI 的瓶颈不是“看懂世界”，而是“与世界交互时的实时闭环”。W0 把力/触模态与异步决策做进同一个模型，意味着机器人开始具备类似人类“手感”的反馈能力，对制造业装配和实验自动化有直接价值。

## 国家数据局座谈具身智能数据标准，全球人形机器人出货上半年翻近 3 倍

9 月 10 日，国家数据局局长刘烈宏主持召开具身智能座谈会，提出将适时推动**具身智能数据标准建设**，指导地方数据系统有序开展相关工作，积极支持企业加大数据投入。

同一周的产业数据显示，具身智能正在从“秀场”走向“产线”：

- 据 STCN 援引宇树科技招股书和 Smart Analytics Global 数据，2026 上半年全球人形机器人出货量约 **1.91 万台**，同比增长近 3 倍，中国厂商市场份额超过 **97%**；
- 宇树人形机器人单价从 2023 年的 59.34 万元降至 2025 年的 16.64 万元，两年降幅约 **72%**；
- 高盛 8 月底报告预测，人形机器人平均单价将从 2025 年的 4.18 万美元降至 2035 年的 2.13 万美元；
- 谐波减速器、六维力/力矩传感器、视觉-触觉传感器等核心零部件价格持续下探，中国信通院数据显示人形机器人核心零部件国产化率已超过 **75%**。

> **为什么值得关注**：价格战本质是供应链和量产能力的竞争，而量产能力的背后是数据飞轮。国家数据局此时推动数据标准，恰逢产业从“小批量试用”转向“规模化落地”的节点，数据确权、采集规范、共享机制将成为下一阶段竞争规则。

## 来源

- Cymulate Research Labs: [The Race to Ship AI Tools Left Security Behind. Part 1: Sandbox Escape](https://cymulate.com/?p=32713)
- Cymulate Research Labs: [The Pipe That Trusted Everyone — OpenAI Codex CLI named pipe vulnerability](https://cymulate.com/blog/openai-codex-cli-named-pipe-vulnerability/)
- BleepingComputer / BYOBot: [Coding Agent Sandbox Escapes](https://byobot.ai/ai-news/ai-daily-newsstand-september-13-2026)
- AGI HUNT: [2026-09-14 AI Highlights — OpenAI Agents API & Claude Code updates](https://agihunt.info/en/daily/2026-09-14?f=dr)
- Clauday / indigox: [OpenAI Codex harness as managed runtime](https://clauday.com/article/fa7da135-d0e8-4f80-8e17-be8a2bd87133)
- 上观新闻 / 新民晚报: [“书生”物理世界模型 W0 发布](https://www.shobserver.com/staticsg/res/html/web/newsDetail.html?id=1175841&sid=300)
- 科技日报: [书生·端砚全面开放全栈服务](https://www.stdaily.com/web/gdxw/2026-09/13/content_580275.html)
- FutureX Physical AI Daily Issue 119: [全球人形机器人出货量与价格数据](https://dev.to/future_x/futurex-physical-ai-daily-issue-119-0914-3ai4)
- 今日头条 / 证券时报：国家数据局刘烈宏 9 月 10 日主持召开具身智能座谈会

<!-- 封面建议：800×450px；若需自定义插图，路径可置于 /images/posts/2026/09-14-sandbox-agents-api-w0-humanoid/ -->
