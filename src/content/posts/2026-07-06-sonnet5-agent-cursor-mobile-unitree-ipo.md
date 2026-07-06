---
title: Sonnet 5 领跑 Agent，宇树 104 天闪电 IPO
date: 2026-07-06
categories: briefing
tags: [ai, llm, coding, embodied-intelligence, robotics, agent]
excerpt: 7 月第一周，AI 编程与具身智能双双加速：Anthropic 发布 Sonnet 5——最强 Agent 级 Sonnet 模型，性能逼近 Opus 4.8，同时上线 Claude Science 科研工作台；Cursor Mobile 公测版让开发者从手机操控编码 Agent；GitHub Copilot Browser Tools 正式 GA；宇树科技 104 天完成科创板 IPO 注册，成为 A 股"人形机器人第一股"；英伟达在华开启具身智能大规模招聘，六大岗位聚焦灵巧操作与通用机器人系统。
cover: /images/covers/briefing-default.svg
---

7 月第一周，AI 编程 Agent 与具身智能两条赛道同时踩下油门：Anthropic 的 Sonnet 5 让中端模型拥有了旗舰级自主规划能力，Cursor 把编码 Agent 从桌面搬到了 iPhone，GitHub Copilot 的浏览器工具进入 GA——编程 Agent 的"手"越伸越长。具身智能这边，宇树科技 104 天闪电 IPO 注册生效、A股迎来"人形机器人第一股"，英伟达在华大规模招聘具身智能人才——"大脑"与"本体"都在加速落地。

## 发生了什么

- **Anthropic 发布 Claude Sonnet 5**（7 月 1 日）：Anthropic 推出 Sonnet 系列迄今最具 Agent 属性的模型。Sonnet 5 可自主制定计划、使用浏览器和终端工具运行，推理与工具使用能力显著超越 Sonnet 4.6，部分性能逼近旗舰 Opus 4.8。已同步接入 Claude Code 和 Claude Platform，API 调用指定 `claude-sonnet-5` 即可使用。同日，Anthropic 还推出面向科研人员的 AI 工作台 **Claude Science**（beta），整合 60 余种科学工具与数据库，可自动化蛋白质结构预测等科研流程。
- **Cursor Mobile 公测版上线**（6 月 30 日 / 7 月 1 日）：AI 编程工具 Cursor 发布 iOS/iPad 公测版应用，付费订阅用户可在手机上启动新 Agent、与桌面端正在运行的编码 Agent 实时交互、审查执行结果。这是 Cursor 向"独立编码 Agent"方向转型后的关键一步——开发者不再需要全天守在笔记本电脑前监督 Agent 任务。
- **GitHub Copilot Browser Tools 正式 GA**（7 月 1 日）：GitHub Changelog 公告确认，Copilot Agent 在 VS Code 中的 Browser Tools 走出预览期进入正式发布。Agent 可直接打开网页、点击、输入文本、读取 console 输出与截图；权限由企业管理员统一管控，与既有网络域控制保持一致。同批 GA 的还有 Copilot Vision（图片/PDF 附件对话）。
- **宇树科技科创板 IPO 注册生效**（7 月 2 日）：中国证监会批复同意宇树科技首次公开发行股票注册，批复有效期 12 个月。从 3 月 20 日受理到 7 月 2 日注册生效仅用 **104 天**，刷新科创板预先审阅机制落地以来最快纪录。宇树科技是全球首家在 IPO 前实现人形机器人规模化盈利的企业——2023 至 2025 年营收从 1.59 亿元猛增至 16.99 亿元，扣非净利润从亏损 1801 万元逆转为盈利 5.91 亿元。A股"人形机器人第一股"即将诞生。
- **英伟达在华启动具身智能大规模招聘**（6 月 30 日）：英伟达机器人团队围绕具身智能、仿真、部署及解决方案架构四大方向开放多个岗位，覆盖北京、上海、深圳三地。其中具身智能团队岗位数最多（6 个职位），重点聚焦灵巧操作（Dexterous Manipulation）与下一代通用机器人系统。黄仁勋近期持续强调"物理 AI"是下一波增长浪潮，GR00T 人形基础模型已开放商用授权。

## 要点解读

### Sonnet 5：中端模型的 Agent 化，编程 Agent 进入"自主规划"时代

Sonnet 5 的核心信号不是"跑分更高"，而是 **Agent 能力下移到中端价位**。此前自主规划、浏览器/终端调用这类能力只有 Opus 级别模型能承担，现在 Sonnet 级别也可以。

```text
Sonnet 5 关键变化
──────────────────────────────
定位    ："工作执行力最强"而非推理最强
工具调用：浏览器 + 终端 + API，自主规划执行链
性能    ：推理/工具使用/编程 ≈ Opus 4.8 的 90%
成本    ：比 Opus 4.8 显著更低（首发优惠对冲 token 膨胀）
已接入  ：Claude Code / Claude Platform / API
```

这对 AI 编程生态意味着：

1. **成本门槛大幅下降**。用 Sonnet 5 跑一个完整的"读需求 → 规划步骤 → 写代码 → 测试 → 修复"闭环，单次任务成本可能比 Opus 4.8 低 50% 以上。中小团队和独立开发者不再需要为 Agent 能力支付旗舰级价格。
2. **Claude Code 的 Agent 模式进入实用区间**。Sonnet 5 上线当天就接入 Claude Code，意味着 `claude --agent` 的日常使用成本将显著降低，更多开发者会从"补全模式"转向"Agent 模式"。
3. **Claude Science 拓展了 Agent 的边界**。从编程到科研，Anthropic 正在把 Agent 模式从一个"开发者工具"升级为跨领域的通用工作范式——科研人员不需要学编程，也能用 Agent 自动化实验流程。

### Cursor Mobile + Copilot Browser Tools：编程 Agent "走出 IDE"

Cursor Mobile 和 Copilot Browser Tools 同期落地，共同指向一个趋势：**编码 Agent 正从 IDE 内嵌功能变为独立可调度的工作单元**。

- **Cursor Mobile** 的本质是"远程 Agent 监控面板"。开发者可以在通勤路上启动新任务、在午休时审查代码变更、在会议间隙批准 Agent 的操作请求。Agent 运行在云端，手机只做指挥与审核——这和 SSH 远程管理服务器的逻辑类似，但对象从"机器"变成了"AI 编码代理"。
- **Copilot Browser Tools GA** 让 Agent 的"手"伸到了浏览器。此前 Agent 只能操作代码和终端，现在可以直接打开网页、点击 UI、读取页面内容——这意味着 Agent 可以自主完成"查文档 → 读 issue → 看线上效果 → 改代码"的全链路操作，不再需要人类在中间做浏览器端的搬运。

两者叠加后，AI 编程 Agent 的工作模式正在从"人在 IDE 里按 Tab 接受补全"进化为"人从任何设备审批 Agent 的自主执行"。

### 宇树科技 104 天 IPO：人形机器人进入"赚钱时代"

宇树科技 IPO 注册生效的意义远超一家公司的资本里程碑：

```text
宇树科技关键数据
──────────────────────────────
IPO 速度：受理 → 注册生效，仅 104 天（科创板最快）
营收增长：1.59 亿（2023） → 16.99 亿（2025），3 年 10 倍+
利润拐点：扣非净利 -1801 万 → +5.91 亿（2025）
出货量  ：人形机器人 2025 年超 5500 台，全球市占率 32.4%
单品规模：G1 累计下线约 11000 台（截至 6 月 5 日）
```

值得关注的三点：

1. **规模化盈利已验证**。不是"烧融资做 demo"，而是"卖产品赚利润"。2025 年扣非净利润 5.91 亿元说明人形机器人在工业场景已经有了真实的采购需求和复购逻辑。
2. **全栈自研的成本优势**。宇树覆盖人形机器人、四足机器人、灵巧手、协作机械臂、激光雷达等关键部件，核心零部件自研叠加规模效应，使得产品定价有足够的利润空间。这也是 16.98 万工业焊接机器人能对标中小工厂采购预算的底层原因。
3. **监管通道信号明确**。104 天的审核速度折射出监管层对硬科技企业的通道支持力度——人形机器人被纳入"国家战略产业"的优先通道，后续同类企业的上市路径有望被进一步缩短。

### 英伟达在华招聘：物理 AI 的本土化加速

英伟达在中国启动具身智能方向的大规模招聘，配合黄仁勋近期反复强调的"物理 AI = 下一波增长浪潮"，释放了两个信号：

1. **GR00T 商用落地需要本土团队**。GR00T 人形基础模型已开放商用授权，被 Figure AI、Agility Robotics、宇树科技、LG 等厂商采用。但商用授权到实际部署之间有巨大鸿沟——仿真验证、场景适配、解决方案架构都需要贴近客户和供应链的本地团队。北京/上海/深圳三地同步招聘，说明英伟达要做的是"端到端落地服务"，而非只卖模型授权。
2. **灵巧操作是下一个技术瓶颈**。6 个岗位中多个聚焦灵巧操作（Dexterous Manipulation），说明当前人形机器人从"能走"到"能干活"的关键跃迁点在手上。 locomotion（行走移动）已经被大量团队解决，但精细操作——拧螺丝、拿工具、焊接——仍然是通用机器人的核心技术难点。

## 来源

- [Introducing Claude Sonnet 5 — Anthropic](https://www.anthropic.com/news/claude-sonnet-5)
- [Claude Sonnet 5 发布：智能体能力直逼旗舰 — 机器之心](https://news.qq.com/rain/a/20260701A02LBH00)
- [Anthropic 推出科学家 AI 工作平台 Claude Science — IT 之家](https://www.ithome.com/0/970/873.htm)
- [Cursor 推出移动端 AI 编程应用 — Chinaz](https://www.chinaz.com/ainews/29253.shtml)
- [Browser tools for GitHub Copilot in VS Code are generally available — GitHub Blog](https://github.blog/changelog/2026-07-01-browser-tools-for-github-copilot-in-vs-code-are-generally-available/)
- [104 天！宇树科技科创板 IPO 注册生效 — 科创板日报](https://baijiahao.baidu.com/s?id=1869601263415876123)
- [英伟达在华启动机器人人才招聘，聚焦具身智能四大方向 — IT 之家](https://finance.sina.com.cn/tech/digi/2026-06-30/doc-inifexfn4736552.shtml)
