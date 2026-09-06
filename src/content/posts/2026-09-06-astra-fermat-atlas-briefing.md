---
title: GPT-6 Astra 与费马大定理：AI 迈向 AGI 与物理世界
date: 2026-09-06
categories: briefing
tags: [ai, llm]
excerpt: 9 月首周 AI 领域高潮迭起：OpenAI 发布 GPT-6 Astra 宣告「AGI 时代」；Anthropic Claude 11 天完成费马大定理完整形式化证明；OpenAI 首次确认自研人形机器人本体；李飞飞团队 World Labs Atlas 世界模型为具身智能提供仿真新基建。
cover: /images/covers/briefing-astra-fermat-atlas.svg
---

## 发生了什么

9 月首周的 AI 新闻密集到足以定义一个季度：OpenAI 在 9 月 3 日（北美时间）抛出旗舰基座模型 GPT-6 Astra，并把叙事从「降价换量」重新拉回到「能力跃迁」；两天后，Anthropic 公布 Claude 在 11 天内基本自主完成费马大定理（FLT）的完整 Lean 形式化证明，生成 1300 万行代码并通过计算机核验。几乎在同一窗口，OpenAI CEO Sam Altman 首次明确表态公司将自研人形机器人本体，而李飞飞创办的 World Labs 则发布 Atlas 世界模型，把「空间智能」从概念推进到可训练机器人的仿真基础设施。

这四件事分别对应两条主线：

- **AI Coding / Agent**：Astra 的端到端计算机操作能力，以及 Claude 在超长形式化工程中的多智能体协作，标志着编码 Agent 从「写代码」向「完成整个知识工作流」进化。
- **具身智能 / 物理 AI**：OpenAI 亲自下场做人形硬件，Atlas 提供 Real-to-Sim 训练环境，说明头部 AI 实验室已经把「理解并操作物理世界」列为下一阶段核心战场。

## GPT-6 Astra 发布：OpenAI 把竞争焦点重新拉回「智能跃迁」

OpenAI 于北美时间 9 月 3 日正式发布 GPT-6 Astra，总裁 Greg Brockman 在发布会结尾说：「欢迎来到 AGI 时代。」Sam Altman 则称希望 Astra 能开启「新一代创业、科学发现与创造」。官方将其定位为「目前全球最智能且对齐程度最高的模型」。

核心工程指标（来自 OpenAI 官方与 IT之家报道）：

- **上下文窗口**：105 万 tokens（约 1500 页 A4 文本），最大输出 12.8 万 tokens
- **知识截止**：2026 年 4 月 30 日
- **输入/输出**：文本 + 图像输入，文本输出；集成网页搜索、文件搜索、代码编写与执行
- **API 定价**：输入 $10 / 输出 $50 每百万 tokens（约为 GPT-5.6 Sol 促销价的 2.5 倍）
- **训练规模**：在德州 Stargate 园区动用超过 10 万块 GPU，是 OpenAI 迄今最大单次预训练

关键评测（OpenAI 自报，待第三方进一步复核）：

- **FrontierMath Tier 4**：97.6%，接近满分
- **ARC-AGI-3**：从 GPT-5.6 Sol 的 7.8% 跃升至 99.9%
- **ExploitBench**：100%（因此 OpenAI 将其网络安全能力分级为「Critical/关键」，仅向 Daybreak 可信计划开放）
- **OSWorld 2.0**：72.6%，平均耗时约 40 分钟（GPT-5.6 Sol 为 65.7% / 75 分钟）

Astra 的最大产品化卖点是 **Computer Use**。官方 slogan 直接写成：「Anything you can do on a computer, Astra can do for you.」模型可以像人一样识别屏幕元素、点击、拖拽、输入，同时结合浏览器、终端、文件系统，在「视觉操作」与「程序化调用」之间切换。Codex 工程负责人 Thibault Sottiaux 表示团队正在加速向 Pro/Business/Enterprise 用户全量推送。

值得关注的原因：在经历了 2026 年上半年「Token 价格雪崩」后，Astra 把叙事从「更便宜」扳回「更聪明」。高盛 Delta-One 主管 Rich Privorotsky 在研报中指出，只有当模型能力持续飞跃时，企业才会不断挖掘出新应用场景，从而避免算力资源供过于求。对开发者而言，Astra 的 Computer Use 意味着 Coding Agent 的边界从 IDE 扩展到整个操作系统——写代码、做 PPT、填表格、跑数据分析可以在同一个会话里闭环完成。不过，Astra 的 API 定价也比上一代贵 2.5 倍，「AGI 时代」的门票并不便宜。

来源：[财联社](https://www.cls.cn/detail/2475045) / [IT之家](https://www.toutiao.com/article/7681815858217239080) / [21 世纪经济报道](https://www.toutiao.com/article/7681714263341138451) / [新浪财经](https://finance.sina.com.cn/wm/2026-09-05/doc-iniqtwvw0519114.shtml)（2026-09-03 至 09-06）

## Claude 11 天完成费马大定理形式化证明：验证比发现更震撼

9 月 4 日，Anthropic 发布研究成果：Claude 在人类少量指导下，用 11 天完成费马大定理的**首个端到端计算机核验证明**。整个证明用 Lean 4 编写，生成约 **1300 万行代码**，证明约 **2.95 万个中间定理**，消耗约 **60 亿输出 tokens**。

这并非证明了一个新的数学定理——Andrew Wiles 早在 1995 年就完成了费马大定理的证明。Claude 做的是**形式化（formalization）**：把 Wiles 那篇 129 页、曾让审稿人发现关键漏洞并花一年才修补的证明，翻译成 Lean 证明助手能逐行机械检查的形式，不再依赖人类审稿人的体力和判断。

让这次长跑得以完成的关键，是 Anthropic 研究员彭天翼（Tianyi Peng，清华姚班校友）及其哥伦比亚大学合作者开源的 **Prove2Me** 平台：

- 用有向无环图（DAG）维护所有定理及其依赖关系
- 每个智能体加入时先查询 DAG，避免重复证明和互相覆盖
- 把定理陈述与证明分离到不同文件，减少 Lean 全量重编译

Claude 的第一次尝试其实失败了：多个 Agent 很快丢失项目全局状态、停止有效协作。Prove2Me 通过共享外部状态解决了长周期形式化工程中的「记忆退化」与「多 Agent 协作冲突」问题。

帝国理工学院数学家 Kevin Buzzard（他自 2024 年起领导一个为期多年的 FLT 形式化社区项目）独立复核后表示：这一证明「除了数学公理外没有任何其他假设」。

值得关注的原因：这件事的震撼点不在「AI 证明了新数学」，而在「AI 把人类需要数年协作的验证工程压缩到 11 天」。当 AI 生成的数学、代码、科学声明越来越多，「谁来确认它是对的」会成为一个比「谁发现它」更紧迫的问题。形式化证明提供了一条可能路径：让机器自己给出可机械核验的证书。对 Coding Agent 来说，这也意味着超长代码库（千万行级）的自动验证与维护不再是纯理论问题。

来源：[Anthropic Research](https://www.anthropic.com/research/formalizing-fermats-last-theorem) / [腾讯新闻](https://news.qq.com/rain/a/20260905A05JJE00) / [Tech Times](https://www.techtimes.com/articles/326745/20260905/fermats-last-theorem-machine-checked-claude-completes-11-days-what-took-years-plan.htm) / [AI Tool Briefing](https://aitoolbriefing.com/industry/claude-formalizes-fermats-last-theorem-2026)（2026-09-04 至 09-05）

## OpenAI 首次确认自研人形机器人本体：AGI 需要物理接口

当地时间 9 月 2 日，Sam Altman 在播客中首次明确表态：OpenAI **将会自研人形机器人本体**，同时也会开发其他形态的机器人。他的逻辑很直接：物理世界围绕人体尺度构建——键盘、门、重型机械、厨房都是「人类尺寸」，因此人形是重要方向；同时 OpenAI 还会并行研发数据中心特种机器人。

这与 OpenAI 此前的路线形成对照。2024 年 OpenAI 曾投资 Figure AI、1X Technologies 等机器人公司，并在 2026 年 6 月收购 Ona 以强化 Codex 的持久化执行环境。如今 Altman 明确公司要亲自做硬件，意味着 OpenAI 认为仅靠投资外部本体厂商已不足以支撑其模型能力向物理世界延伸。

背景数据（同期报道）：

- 2026 年上半年全球人形机器人出货量约 1.91 万台，同比 +272%，中国厂商贡献超过 97%
- 智元机器人上半年出货 8400 台，首次超过宇树成为全球第一
- 宇树科技 IPO 后股价已从最高市值 4449 亿元回调至约 2226 亿元

值得关注的原因：当全球最大 AI 实验室公开承认「必须做人形机器人」，具身赛道的叙事从「机器人公司做机器人」升级为「AI 公司需要物理身体」。Altman 的论点不是「机器人会变成 AGI 的身体」，而是「物理世界的接口就是人体尺度」——这与特斯拉 Optimus、Figure、星动纪元、银河通用押注的是同一件事。OpenAI 进场后，最大的悬念是它选择自研硬件还是继续收购（参考 Ona 收购案）。

来源：[21 世纪经济报道](https://view.inews.qq.com/a/20260905A082U600?no-redirect=1) / [央视网](https://view.inews.qq.com/a/20260905V0B86D00?no-redirect=1)（2026-09-05）

## World Labs Atlas：世界模型成为具身智能的「仿真新基建」

9 月 5 日，李飞飞创立的 World Labs 发布首款基础模型 **Atlas**，官方称其为「全球首个多模态世界模型」。与只能「猜下一帧像素」的传统视频模型不同，Atlas 的核心差异在于**原生 3D 空间理解**：它把相机在三维空间中的精确位置、几何姿态作为原生输入，在共享空间上下文中预测下一帧，从而生成严格遵循物理空间逻辑的图像与视频。

核心能力：

- **相机可控生成**：1–6 张输入图 + 精确相机轨迹，可输出最高 1440p、最长约 1 分钟的连续视频
- **高精度空间重建**：从 1 张到数十张稀疏照片重建显式 3D 场景，表现超过专用 3D 重建模型
- **时空模拟**：从普通视频重建三维时空，实现类似「子弹时间」的任意视角重取景
- **Real-to-Sim**：把手机拍摄的真实环境视频转化为机器人可训练的仿真环境，并实时生成机载摄像头应看到的 RGB 图像与深度数据

Atlas 基于多模态自回归扩散 Transformer 架构，从零开始预训练，统一处理文字、图像、视频、3D 与相机几何。World Labs 表示，Atlas 将驱动未来版本的 Marble 平台及其他产品。

值得关注的原因：具身智能当前最大的瓶颈不是算法，而是**数据**。真机采集成本高、效率低、风险大，「数据荒」已成行业共识。Atlas 提供了一条低成本路径：拿手机拍一段视频，就能生成高保真仿真世界，让不同形态的机器人在里面批量「积累经验」。如果 Real-to-Sim 的 sim-to-real gap 足够小，世界模型将直接改变机器人训练的经济学。

来源：[腾讯新闻](https://news.qq.com/rain/a/20260905A03C4N00) / [QQ 浏览器-科技前沿](https://so.html5.qq.com/page/real/search_news?docid=70000021_8176a9c19b972865) / [Omega Technology](https://www.omegatechnologysolutionsgroupinc.com/blog/world-labs-atlas-brings-spatial-intelligence-to-3d-world-modeling-2c7ea4)（2026-09-05）

## 一句话总结

9 月首周同时见证了 AI 的两条边界外扩：一边是 Astra 把 Agent 推向整台电脑、Claude 把形式化验证推向千万行级数学工程；另一边是 OpenAI 亲自做人形机器人、Atlas 把真实世界变成可训练的仿真环境。编程 Agent 与具身智能的交汇点，正在从「能力演示」转向「基础设施」。

## 来源

- [Anthropic Research：Formalizing Fermat's Last Theorem](https://www.anthropic.com/research/formalizing-fermats-last-theorem)
- [财联社：OpenAI GPT-6 Astra 发布](https://www.cls.cn/detail/2475045)
- [IT之家：GPT-6 Astra 现已登陆 ChatGPT Work、Codex 及 API](https://www.toutiao.com/article/7681815858217239080)
- [21 世纪经济报道：GPT-6 Astra 面世](https://www.toutiao.com/article/7681714263341138451)
- [新浪财经：GPT-6 Astra 向付费用户全量开放](https://finance.sina.com.cn/wm/2026-09-05/doc-iniqtwvw0519114.shtml)
- [腾讯新闻：Claude 11 天完成费马大定理形式化证明](https://news.qq.com/rain/a/20260905A05JJE00)
- [Tech Times：Fermat's Last Theorem Machine-Checked](https://www.techtimes.com/articles/326745/20260905/fermats-last-theorem-machine-checked-claude-completes-11-days-what-took-years-plan.htm)
- [AI Tool Briefing：Claude Formalizes Fermat's Last Theorem](https://aitoolbriefing.com/industry/claude-formalizes-fermats-last-theorem-2026)
- [21 世纪经济报道：OpenAI 官宣将自研人形机器人](https://view.inews.qq.com/a/20260905A082U600?no-redirect=1)
- [央视网：马斯克押注「10 亿机器人」](https://view.inews.qq.com/a/20260905V0B86D00?no-redirect=1)
- [腾讯新闻：李飞飞团队发布 Atlas 世界模型](https://news.qq.com/rain/a/20260905A03C4N00)
- [QQ 浏览器-科技前沿：Atlas 世界模型解读](https://so.html5.qq.com/page/real/search_news?docid=70000021_8176a9c19b972865)
- [Omega Technology：World Labs Atlas Brings Spatial Intelligence](https://www.omegatechnologysolutionsgroupinc.com/blog/world-labs-atlas-brings-spatial-intelligence-to-3d-world-modeling-2c7ea4)

---

> 封面：`/images/covers/briefing-astra-fermat-atlas.svg`（自绘 800×450，深蓝星空底 + Astra 星轨 + Lean 代码片段 + 人形机器人剪影 + Atlas 3D 空间网格）。如需正文插图，建议放入 `/images/posts/2026/astra-fermat-atlas/`。
