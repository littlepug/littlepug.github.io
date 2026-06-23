---
title: Codex 演示即复用，具身大脑半年吸金 438 亿
date: 2026-06-23
categories: briefing
tags: [ai, coding, llm, embodied-intelligence, agent]
excerpt: AI 编程侧从「写代码」走向「录流程」：OpenAI Codex macOS 端上线 Record & Replay，演示一次即可生成可无限调用的桌面自动化技能；微软 Copilot Cowork 计划引入 DeepSeek V4 做分层路由，用国产模型对冲算力成本。具身智能侧，2026 上半年国内融资约 438 亿元逼近去年全年，「大脑派」吃掉七成份额，SpaceX 600 亿美元收购 Cursor 让 AI 编程工具首次跨入航天级资本叙事。
cover: /images/covers/briefing-codex-record-embodied-brain.svg
---

AI 编程正在悄悄换跑道：从"提示词驱动的代码补全"，切换到"录一次就能无限复用的桌面技能"。与此同时，具身智能的资本流向出现明显倾斜——能写"大脑"的比能造"身体"的更值钱。

## 发生了什么

- **OpenAI Codex macOS 26.616 上线 Record & Replay**（6 月 22 日）：用户演示一次完整工作流，AI 自动转化为可复用的"技能"，后续一句话即可调用。Computer Use 权限依赖同步打开。
- **微软 Copilot Cowork 计划引入 DeepSeek V4 分层路由**（6 月 16-22 日）：为应对企业 Agent 算力成本，微软首次在核心 B 端 AI 产品中纳入国产模型，简单任务走 DeepSeek，复杂任务保留自家高端闭源模型。
- **SpaceX 600 亿美元收购 Anysphere（Cursor）**（6 月 16 日）：全股票交易，SEC 8-K 披露完成，预计 Q3 2026 交割。AI 编程工具首次进入"火箭公司"资本叙事。
- **2026 H1 国内具身智能融资约 438 亿元**（截至 6 月 12 日，量子位统计）：逼近 2025 年全年 554 亿；「大脑派」吃掉七成份额，本体派融资占比仅 12.8%，甚至低于核心零部件企业。

## 要点解读

### Codex Record & Replay：把"工作流"做成可复用资产

OpenAI 6 月 22 日为 macOS 端 Codex 推送 26.616 版本，核心是 Record & Replay（录制与回放）。它的工作方式与传统"宏录制"有本质区别：

1. **抓取的是意图，不是轨迹**：自动识别文件路径、操作逻辑、校验标准，而非简单记录鼠标坐标。
2. **跨文件、跨网页、跨主机**：录制好的技能可以在远程设备上持续运行，不依赖本机状态。
3. **一句话调用**：录制完成后，用户后续只需一句"执行 XX 技能"即可重放。

这背后是 6 月 16 日在欧盟正式开放的 Computer Use 权限。Codex 不再只是"对话式编程助手"，而是在成为"白领数字员工的技能工厂"——每个员工都可以把自己的高频工作流（报表整理、素材抓取、批量改名、跨表合并）录制成"个人技能库"，供自己和团队反复调用。

值得注意的限制：功能仅适配 Mac，欧盟、英国、瑞士因数据合规法规暂不开放。Office 等企业级协同软件需要付费 ChatGPT 账号。

### 微软 Copilot Cowork 引入 DeepSeek：成本压力倒逼多模型策略

彭博社和 Axios 报道显示，Copilot Cowork 上线后被超半数《财富》500 强企业部署，但高频 Agent 调用让 token 成本失控。微软的应对策略有两条：

```text
策略 1: 调整计费模型
  - 保留 Microsoft 365 Copilot 基础订阅
  - Agent 额外消耗按资源使用单独计费

策略 2: 智能分层路由
  - 简单任务 → DeepSeek V4（开源、MoE、低成本）
  - 复杂任务 → GPT-5.x / 自家闭源高端模型
  - 完整质量校验机制兜底
```

这是美国头部科技大厂首次在核心 B 端 AI 产品中纳入国产大模型。对国内 AI 行业的意义是：海外厂商从"单一依赖自有高端模型"转向"多模型混合架构"，给国产模型打开了企业级落地通道。AI 烧钱难题下，分层路由很可能成为全球厂商的通用解法。

### SpaceX 600 亿收 Cursor：AI 编程工具进入"航天级"资本叙事

6 月 16 日，SpaceX 通过 SEC 8-K 文件披露：以 600 亿美元全股票方式收购 Anysphere（Cursor 母公司），预计 Q3 2026 交割。这是 AI 软件公司迄今最大单笔交易——超过微软 130 亿美元投资 OpenAI 的体量。

马斯克的逻辑并不难猜：

- **垂直整合**：SpaceX 自身在用 Colossus 训练 Anthropic 模型，Cursor 又是 Claude API 的顶级消费者
- **开发者心智**：在 GitHub Copilot、Claude Code、Windsurf、Devin 混战中抢占地盘
- **战略押注**：Musk 长期判断 AI 将大幅压缩软件开发周期，持有"开发加速器"是核心资产

对 Cursor 用户的实际影响：交割前独立运营，产品整合细节未披露；但 Claude Code（Anthropic 原生 CLI）与 Cursor（IDE 形态）这对老对手，将出现"产品层竞争 + 基础设施层合作"的奇特关系。

### 具身智能半年 438 亿：「大脑派」吃掉七成，本体派让位

量子位对 2026 年上半年（截至 6 月 12 日）国内具身智能融资的统计，呈现了清晰的资本迁移信号：

| 路线 | 融资占比 | 典型特征 |
|------|---------|----------|
| 大脑派 | ~70% | 软件定义硬件、模型定义本体 |
| 核心零部件 | 14.4% | 灵巧手、传感器、关节模组 |
| 本体派 | 12.8% | 机器人整机、四足、人形 |
| 其他 | ~3% | 全栈平台、行业方案 |

几个细节值得注意：

- **Pre-A 平均 7 亿元，B 轮平均 22.5 亿元**——这种量级在大多数赛道已是 C/D 轮标准
- **千寻智能** 2-6 月连融 4 轮共约 50 亿元，估值冲至 200 亿元
- **它石智航** Pre-A 单轮 4.55 亿美元（约 33 亿元），创国内具身单轮纪录
- **35 家"大脑派"中近八成在研发世界模型**，技术路线从 2024 年的 VLA 全面转向

投资圈的原话是"本体兜住下限，大脑决定上限"。千寻智能韩峰涛在智源大会上打了个比方：把钢铁侠的贾维斯当 100 分，当前机械臂 50 分、四足 30 分、轮式底盘 40 分，而 AI 智能化只有 3 分——"但从 3 分进步到 50 分的速度会很快"。

资本端的真实情绪是「质疑泡沫 → 理解泡沫 → 拥抱泡沫 → 享受泡沫」。即便所有人都知道 90% 以上的具身公司会消失，在技术路线收敛之前，没有人愿意缺席，于是最稳妥的策略变成多押几家。

## 趋势信号

把今天 4 条新闻拼在一起，能看到一个清晰的双线跃迁：

- **AI 编程的"录制即技能"**：Codex Record & Replay + SpaceX 收购 Cursor 共同指向一个判断——下一代开发者工具的护城河不再是大模型 API 本身，而是"工作流封装 + 团队协作 + 资本规模"
- **具身智能的"大脑优先"**：融资结构变化 + 高校创业潮 + 世界模型路线胜出，标志具身赛道进入"模型定义本体"的阶段；硬件供应链在用中国制造优势快速收敛，软件层才是真正卡位点

两条线在更长尺度上会汇合：能调用物理工具的语言模型（Anthropic Project Fetch 第二阶段：Claude Opus 4.7 自主操控机器狗、比人类快 20 倍）正在把"数字员工"和"机器人"统一到同一套智能体范式里。

## 来源

- Codex Record & Replay：[站长之家](https://www.chinaz.com/ainews/29032.shtml)、[AIBase](https://news.aibase.com/zh/news/29032)
- 微软 Copilot + DeepSeek：[新浪科技](https://finance.sina.com.cn/tech/roll/2026-06-22/doc-iniefzfx7127495.shtml)、[SegmentFault](https://segmentfault.com/a/1190000047876076)、[腾讯新闻](https://news.qq.com/rain/a/20260617A0635100)
- SpaceX 收购 Cursor：[SEC 8-K 解读](https://www.explainx.ai/blog/spacex-acquires-cursor-anysphere-60-billion-2026)、[CNBC](https://www.cnbc.com/2026/06/16/spacex-spcx-cursor-acquisition-ipo.html)、[DataNorth](https://datanorth.ai/news/spacex-acquires-cursor-maker-anysphere)
- 具身智能融资统计：[36 氪 / 量子位](https://www.36kr.com/p/3862527005693186)
- Claude Opus 4.7 操控机器狗：[Anthropic Research](https://www.anthropic.com/research/project-fetch-phase-two)
