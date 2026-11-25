---
title: Claude 接管 PR 签字权，具身资本绕开整机
date: 2026-11-25
categories: briefing
tags: [ai, llm, ai-coding, agent, robotics, embodied-ai]
excerpt: Anthropic 把 PR 审批权做成仓库里的策略文件，Claude Ship 让 agent 能直接批准常规改动；同一天 LeadDev 报告指出 45% 的团队卡在评审产能而非编码速度。编码侧另一边，GPT-6.2 Sol 把默认档位换成便宜模型，26B 循环 Transformer 已能在 32GB Mac 上跑 coding agent。具身侧，小鹏把 IRON 量产日写进公开日历，而 48 小时三笔亿元融资全部绕开了通用双足整机。
cover: /images/covers/briefing-ship-iron-embodied.svg
---

11 月 23 日至 25 日，AI 领域的两条主线各自往前挪了一格：**coding 一侧的竞争点从"模型写得对不对"变成"谁有权把代码合进去"**，**具身一侧的资本则集体避开了"造一台通用人形"这件事**。本文筛出 5 条值得细读的动态，另有几条短讯附在文末。

## Claude Ship：把"谁能合并"写成仓库里的策略文件

### 发生了什么

11 月 23 日，Anthropic 推出 **Claude Ship**（beta），把代码变更从"提出"到"放行"的整段流程挂上了 agent。三个组件分工明确：

| 组件 | 状态 | 职责 |
| --- | --- | --- |
| Code Review | 已 GA | 审查 PR 变更，找出问题 |
| PR Steward | beta | 接手 CI 失败、合并冲突与 Code Review 的反馈；每次 push 后在评论里说明改了什么、怎么回滚 |
| Claude Approvals | beta | 按团队写在仓库里的策略文件**直接批准**常规变更，不命中则升级人工 |

策略文件用**自然语言**编写，可以综合 Code Review 结果与企业自建的分类器信号。目前仅支持 GitHub 仓库，面向 Claude Team 与 Enterprise 计划，按 token 而非席位计费，管理员可设置月度上限。Anthropic 明确建议先以 **observe-only** 模式跑一个迭代，只出判断不执行批准。

官方给的理由很直接：Claude Code 团队自己的代码大部分由 Claude 写，所以"PR 之后的一切也要跟上这个速度"。

### 值得关注的点

**这是"审批权"第一次被做成可版本化的配置项。** 过去 code review 类工具都在做"发现问题"，Claude Ship 真正的新东西是"签字"——而签字一旦落成仓库里的一份文件，就意味着它跟着代码一起被 review、被 diff、被回滚。工程组织因此多了一件必须回答的事：**哪一类变更允许机器合并、哪一类必须点名到人**。

这件事的紧迫性有数据支撑。LeadDev《AI Code Review Report 2026》（由 CodeRabbit 赞助）显示：

- **45%** 的受访者把"代码评审产能"列为软件交付最大瓶颈
- **47%** 的组织让 AI coding agent 去评审 agent 自己写的代码
- 但只有 **26%** 的人自信"能像理解人类代码一样理解 AI 生成的变更"
- 只有 **14%** 有明确且被一致执行的 AI 代码评审标准，**24%** 根本不追踪任何评审指标

哈佛团队此前对 AI coding agent 的观察给出了同一个结论的另一面：写代码快 44%，评审时间涨 56%，两周内合并率 90%（高于无 agent 的 86%）——**产出没有被质量拖慢，而是被队列拖慢**。

**真正的门槛不在工程，在审计。** 一个能签字的机器落在变更控制流程里，SOC 2 / ISO 27001 的职责分离（separation of duties）控制会先拦住它。上线前该问的第一个问题是合规，不是性能。

另外要打折看的是 Anthropic 自己给出的内部指标（合并 PR 翻倍、回滚率降 40%+）：那是 Claude Code 团队 6–9 月的数据，而那时 Claude Ship 还不存在。

## 模型分层：GPT-6.2 Sol 下沉，编码默认档换人

### 发生了什么

11 月 23 日，OpenAI 开始向全球 ChatGPT Plus / Pro / Business / Enterprise 用户的聊天界面推送 **GPT-6.2**（底层为 **GPT-6.2 Sol**，面向日常对话优化）。厂商内测口径：图片理解从 47.4% 提升到 **71.7%**，复杂指令遵循从 62.5% 提升到 **78.1%**。Work 与 Codex 所用模型不因这次更新而改变。

更值得看的是编码侧的定价结构：据 OpenAI 公布的数据，在 Cognition 的 **FrontierCode 2.0**（检验变更是否达到真实仓库维护者合并标准）上，**Sol 落后旗舰 Astra 仅 0.5 分，成本约为其 1/5**；同时 Astra 的 API 单价比 GPT-6 Astra 低 20%。

### 值得关注的点

- **"默认用便宜档"正在变成正确做法**。分层路由过去是成本妥协，现在成了性能与成本同时占优的选择：日常任务交给 Sol，只有被证明需要更深的推理时才升级到 Astra。评审 agent 产出的团队尤其该这么配——**大量 PR 的判定属于"模式识别"，不需要旗舰模型**。
- **评测标尺换了**。FrontierCode 2.0 测的不是"能不能修掉一个 bug"，而是"这段改动维护者会不会合"。这个转向和 Claude Ship 是同一个方向：**coding 能力的最新度量衡是可合并性，不是通过率**。
- 注意口径：71.7% / 78.1% 都是厂商内测数据，FrontierCode 的 0.5 分差也是 OpenAI 自己引用的结果，第三方复现尚未出现。

## Inkling 2 Mini：26B 循环 Transformer，32GB Mac 上跑 coding agent

### 发生了什么

Thinking Machines 放出的 **Inkling 2 Mini** 在过去两天冲上 Hugging Face 趋势榜第一，GGUF 量化版本铺满了榜单。规格（据其模型卡与社区整理）：

- **26.4B 总参 / 5.4B 有效激活**，原生多模态，**1M 上下文**，Apache 2.0
- 架构是 **looped transformer**：24 层 decoder，中间 12 层共享权重跑 3 遍，每个 token 实际做 48 次层应用；每层 8/128 专家路由
- 单 checkpoint 约 **20GB**（NVFP4 + MXFP8），官方支持 1× DGX Spark 或 ≥32GB 统一内存的 Apple silicon，vLLM / SGLang / llama.cpp / Ollama 均可跑
- 成绩（32B 以下梯队）：SWE-bench Verified **79.2%**、SWE-bench Pro Hard 77.9%、BrowseComp 79.0%、Terminal-Bench 2.1 71.6%

### 值得关注的点

**"本地能跑"这件事第一次和"能干活"对齐了。** 20GB 权重 + 1M 上下文意味着 Mac mini 上的 coding agent 不再是演示品：把仓库塞进上下文、离线跑 agent、数据不出本机，这三件事同时成立。

更有价值的是官方专门测了一个别人不测的东西：**循环计算会让模型的思维链可监控性下降**——它在不产生可见 token 的情况下多算了几轮。Thinking Machines 给出的结论是这个模型几乎无法执行需要隐蔽副作用的任务。**把"架构创新 vs 可监督性"这一对矛盾摆上台面，比多刷几分更有信息量。**

> 上述跑分与量化细节目前主要来自模型卡与社区整理，建议以官方技术报告为准（部分指标**待核实**）。

## 小鹏科技日：把量产日期写进公开日历

### 发生了什么

11 月 25 日，第八届小鹏科技日在广州举行，主题 **"Origin 原点"**。这一届把机器人放到了比智驾更显眼的位置：

- **IRON** 现场亮相并与观众互动：身高约 170cm，**全身 76 个自由度、单手 21 个**，搭载 3 颗自研图灵 AI 芯片，端侧有效算力 **2250 TOPS**，物理 AI 基座模型在端侧运行，卖点是**无遥操作**下的自主任务执行
- 预热视频从"拟人行走"转向**物体操作**：自主拿书、向酒杯倒酒、识别充电位并对接
- 产线：9 月 8 日 IRON 从自动化产线完成总装并自主走下产线，核心制程自动化率超 80%
- **时间表**：何小鹏在三季度财报会明确 **2027 年 1 月 1 日启动量产**，1Q27 首批进入部分门店试用，2Q27 面向外部商业客户正式发布，优先导购、导览、巡检
- 资本与供应链：8 月机器人业务完成超 9 亿美元融资，投后估值超 63 亿美元（腾讯、阿里战投）；双林股份供手部关节模组与丝杠，五洲新春供专用轴承与丝杠

### 值得关注的点

**车企做具身的差异化论证是"模型—硬件闭环"，而不是模型本身。** 小鹏的说法是：真实世界的复杂与不可预测，要求智能与本体共同演化，只有自建产线、自有车队、自己写芯片的厂商才能把这条闭环跑起来。这是特斯拉垂直整合论证的复刻，也顺带承认了一件事——**买执行器拼装的纯算法团队，永远要交一笔集成税**。

但这条论证现在有个明显的不确定项：**组织稳定性**。原机器人中心强化学习负责人陈杰已于 10 月底离职（履职约 15 个月，此前为字节 Seed 强化学习核心专家）；更早运控负责人回归英伟达，6 月机器人业务由何小鹏兼任 CEO、原负责人离任。在量产节点前两个月失去强化学习这一环的负责人，会在步态、全身协调与复杂任务执行上留下一段路线衔接期。

所以这一条真正该盯的不是现场演示，而是**三个可以被逐项对照的数字**：量产下线台数、门店试用期间的人工接管率、以及多班次连续运行的在线率。日期已经公开，这在小鹏的历史上算是一个硬承诺——飞行汽车已经"距量产两届"了。

## 具身资本：钱绕开整机，进了"能算清账"的环节

### 发生了什么

**48 小时三笔亿元级融资，共同点是都不造通用双足整机：**

- **章鱼动力**：年内第四轮数亿元，芯动能投资、美的资本等产业资本入局，资金投向灵巧手高端产线，做"脑—手—数据"一体化。公司成立仅 10 个月
- **傲意科技**：完成 D 轮，主攻肌电与脑机接口
- **英汉思动力**：超亿元 B 轮，中科院背景的国科投资出资

**海外则是另一种量级的早期下注：**具身大脑公司 **Embo** 完成 **1.1 亿美元种子轮**，a16z 领投，英伟达 NVentures、Khosla Ventures、DST Global 参投。公司今年 4 月成立，旧金山，**没有产品、没有客户、没有公开估值**。创始人兼 CEO Danijar Hafner 是 Dreamer 系列世界模型的核心作者（DeepMind 十年、《Nature》一作），CTO Wilson Yan 是 VideoGPT 开发者。技术路线是先拿互联网视频预训练学物理规律，再用自研人形集群采真机数据微调，最后在强化学习里于"想象空间"反复试错；团队称已有支持 **7 万张 GPU** 并行训练的多模态底座。

投行侧同步升档：**摩根大通**判断实体 AI 已从概念验证进入加速执行期，宇树科技目标价 995 → **1060 元**，优必选评级中性 → **增持**、目标价 74 → **77 港元**，并把拐点归因于核心部件国产化、整机成本下降与订单落地三件事同时发生，而非模型能力突破。

### 值得关注的点

- **整机叙事的融资溢价正在消退。** 三家公司成立时间从 10 个月到 10 年，资本不再按技术阶段分层，而是按"能否落到具体工序、能否算清 ROI"筛选。灵巧手、关节、操作闭环这些**能被产线验收的环节**先拿到钱。
- **产业资本比财务投资人更早入场。** 美的、小米、芯动能出现在灵巧手轮次里，说明家电与消费电子厂商在提前锁定产能与供应——这是典型的"先占产线，再谈应用"。
- **Embo 这笔钱买的是一个判断，不是一家公司。** 世界模型路线的隐含假设是：机器人在动手之前先在脑子里把事情走一遍，比端到端视觉动作模型更省真机数据、更容易泛化。Yann LeCun 公开站台，英伟达则通过 NVentures 把手伸到所有可能消耗算力的地方——它自己也在推 Cosmos。**同时押注两条路线，本身就是对"哪条会赢"的回避。**
- 摩根大通"一年内出现实体 AI 的 ChatGPT 时刻"是明确的预期管理。**没兑现就会有回撤**，看产业链时更该盯减速器、灵巧手、伺服的成本曲线。

## 其他值得一看

- **自变量 WALL-OSS-1.0 / WALL-API-1.0**（11/23 发布）：把**动作数据前置进预训练**，用自研 X-Tokenizer 把连续轨迹压成离散"动作语言"，与图文一起进同一套权重。312 项开放式真机任务零样本成功率 **55.1%**；RoboDojo 仿真榜由 4B 的 Lite 版以 42.59 分列单模型第一，压过调用 Astra、Opus 5.5 的 Agent 策略；已进国内头部物流分拣产线，**10 小时产线数据达到可用水平，无预训练对照需 1000 小时以上**。口径提醒：312 项任务是评测者自由挑选的开放集，"比 π0.5 高 70.8%"来自自家 ManipArena 且一边微调一边不微调。
- **灵颜科技 灵汐 Lyra S1**（11/25 首亮）：不沿用连杆结构，改用**线驱仿生肌肉**，面部自由度做到 **32 个**（公司称为国内同类最高）；核心是名为"杏仁体"的多模态情绪基座模型，按语音韵律与情绪意图在端侧实时生成微表情，而非调取预设表情库。团队出自吉林大学工程仿生教育部重点实验室。
- **OpenAI × 思科开源 Shirudo**（11/23）：用 agent 生成并验证 eBPF 程序，在"零日已披露、补丁未到"的窗口期给运行中的 Linux 加临时防护，BSD-2-Clause。实测用 Codex 生成的 shield 挂到运行中的 Elasticsearch 进程上，挡住了 Java4Shell 利用，服务零中断。**这条比"AI 找漏洞"更值钱——它把漏洞响应做成了可分发、可签名、可验证的制品。**
- **预训练投毒后门**（UC Berkeley / UIUC / Anthropic）：预训练语料中混入的恶意内容，在下游用**干净数据微调后仍然保留**。对开源权重的使用者是硬提醒：供应链审计要往前挪到预训练语料层。
- **开源模型一天三发**：百度开源**文心 5.5 Flash**（Apache 2.0，MoE 大参数小激活）、商汤开源 **SenseNova U1.6**（8B，先出稿再自查自改）、腾讯混元 **Hy MT3** 翻译模型（1.8B / 7B / 30B-A3B，语种 38 → **102**，误译率降 43%，附 TransRubric 基准）。

## 小结

今天最值得记的两件事：**一是 coding 的稀缺资源正式从"写"转到"批"**——Claude Ship 把签字权做成策略文件、LeadDev 数据指出 45% 的人卡在评审、FrontierCode 用"能不能合"当标尺，三条独立证据指向同一个瓶颈；**二是具身智能的资本完成了一次分层**——整机与"故事"不再拿溢价，灵巧手、数据、世界模型这些能算账的环节拿到钱，而小鹏把量产日期写成 2027 年 1 月 1 日，等于给行业立了一根可以被逐项对照的标尺。

一个细节值得玩味：Anthropic 建议先跑 observe-only 再放权，OpenAI 建议日常任务先用便宜档、贵档留给"证明需要"的任务。**两家最激进的实验室，给出的落地建议都是"先别全信"。**

## 来源

- [Anthropic launches Claude Ship, letting AI agents review, fix, and approve code changes（TechCrunch）](https://techcrunch.com/2026/11/23/anthropic-launches-claude-ship-letting-ai-agents-review-fix-and-approve-code-changes/)
- [Claude Ship lets Anthropic's agents fix and approve code changes（AdTestBench，引 TechCrunch / The Verge）](https://adtestbench.com/news/claude-ship-lets-anthropics-agents-fix-and-approve-code-changes/)
- [Anthropic 推出 Claude Ship 测试版：代码审查、修复、批准（IT之家 / 凤凰网科技）](https://tech.ifeng.com/c/8yJ2TwIuMw7)
- [Executive Briefing, Wednesday 25 November 2026（含 LeadDev AI Code Review Report 2026 与 FrontierCode 2.0 数据）](https://mahfuzulhaque.com/executive-briefing)
- [哈佛研究：AI 编程代理使代码审查成为新瓶颈](http://wqu.guru/i/01M7RFYKKEQQK3Q9WBJ2PPT7E2)
- [AI 每日早报 2026 年 11 月 25 日（Inkling 2 Mini、Shirudo、LingSante-3.1）](http://mp.weixin.qq.com/s?__biz=MzcwMTQxMzUyMw==&mid=2247484463&idx=1&sn=29c10d37943722617601bdfa2c432064)
- [Inkling 2 Mini 模型卡（Hugging Face / Thinking Machines）](https://huggingface.co/thinkingmachines/Inkling-2-Mini)
- [新版小鹏 IRON 人形机器人将亮相科技日（腾讯新闻 / 时报财富资讯）](https://news.qq.com/rain/a/20261124A0FITA00)
- [小鹏敲定元旦启动人形机器人量产，先自家门店导购试用（立德机器人平台）](https://leaderobot.com/news/10950)
- [曝小鹏机器人又一技术负责人离职（电子工程专辑）](https://www.eet-china.com/mp/a541531.html)
- [XPeng's 'Origin' AI Day opens tomorrow — Iron, VLA and the physical-AI bet（Singularity.Kiwi）](https://singularity.kiwi/xpeng-origin-ai-day-2026)
- [英伟达投了，具身大脑公司 Embo 完成巨额早期融资（科创板日报）](http://mp.weixin.qq.com/s?__biz=Mzg4MTEyNzc4Mg==&mid=2247654821&idx=1&sn=c1bc504cd518d202cbac72371520bd8a)
- [机器人 AI 初创公司 Embo 完成 1.1 亿美元种子轮融资（腾讯新闻）](https://news.qq.com/rain/a/20261124A0FLWP00)
- [摩根大通：人形机器人及实体 AI 进入加速执行期（东方财富财经早餐 11 月 25 日）](https://finance.eastmoney.com/a/202611243938774940.html)
- [自变量发布新一代具身基础模型 WALL-OSS-1.0（中国经济新闻网）](https://www.cet.com.cn/cms/show-10676648.html)
- [自变量科技推出首个具身大模型接口（人民网深圳频道）](http://sz.people.com.cn/n2/2026/1123/c202846-41758790.html)
- [灵颜科技仿生机器人 25 日亮相（腾讯新闻）](https://news.qq.com/rain/a/20261125A03L6N00)
- [AI 日报 2026-11-25（具身三笔亿元融资、文心 5.5 Flash、SenseNova U1.6、Hy MT3）](http://mp.weixin.qq.com/s?__biz=MzkzODM3ODQzMQ==&mid=2247485506&idx=1&sn=4298340d93425c77b7b1c31b76db8b6e)
