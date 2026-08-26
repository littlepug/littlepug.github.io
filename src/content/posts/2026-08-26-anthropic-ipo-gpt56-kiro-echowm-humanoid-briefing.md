---
title: GPT-5.6 进 Kiro、Anthropic 拟 2 万亿 IPO
date: 2026-08-26
categories: briefing
tags: [ai, llm]
excerpt: AI 编程侧本周重磅集中爆发：Anthropic 拟以 2 万亿美元估值、1000 亿美元募资冲击全球史上最大 IPO，30 万亿美元 TAM 改写商业叙事；GPT-5.6 三档模型（Sol/Terra/Luna）正式登陆 AWS Kiro，AI Coding 进入按"难度×成本"路由的工程化时代；OpenAI Codex Remote 全面可用、o3 推理模型今日正式退场。具身侧则呈现相反节奏：京东与港科大等机构联合发布 EchoWM 全模态可进入世界模型，第二届世界人形机器人运动会 8/22-26 在北京收官，2,056 台机器人完成 51 个赛项，演练从"炫技"转向"干活"。
cover: /images/covers/briefing-default.svg
---

## 发生了什么

8 月 25 日至 26 日，AI 编程与具身智能分别在金融面、工程面和场景面给出了三条分量十足的进展。AI Coding 侧，Anthropic 据《华尔街日报》披露将向投资者展示超过 **30 万亿美元** 的潜在市场（TAM）与约 **2 万亿美元** 的 IPO 目标估值、最快今年 9-10 月挂牌；同日，AWS 与 OpenAI 联合宣布 **GPT-5.6 系列**（Sol/Terra/Luna）正式接入 AWS 的 Kiro 工程师平台，三档信用倍率与 Terminal-Bench 2.1 上 82% 成本下降把"AI 编程经济学"重新定义为难度 × 成本的路由问题；OpenAI 还在今天把 **Codex Remote 全面开放** 到所有 ChatGPT 档位，**o3 推理模型** 同步正式从 ChatGPT 退场。具身侧，京东探索研究院联合香港科技大学、斯坦福等机构发布论文 **EchoWM**——首个开放、可进入、6-DoF 连续控制、同步合成 720p 视频与环境声/语音的全模态世界模型；与此同时，**第二届世界人形机器人运动会** 在北京国家速滑馆收官，2,056 台机器人完成 51 个赛项，"全自主×真实场景"成为今年最重要的关键词。

## Anthropic 30 万亿美元 TAM 与 2 万亿美元 IPO：AI Coding 走到商业史最大单点

8 月 25 日，《华尔街日报》援引知情人士披露，Anthropic 准备在即将提交的 S-1 招股书中，向投资者描绘一个 **30 万亿美元** 的潜在市场总规模（TAM），超过 SpaceX 上市文件中提出的 28.5 万亿美元纪录；目标 IPO 估值约 **2 万亿美元**，最高募资 **1,000 亿美元**，预计 2028 年收入 1,900-2,000 亿美元，最快今年 9 月或 10 月初完成挂牌。

几个值得关注的数字：

- **TAM 测算口径**：Anthropic 把"全球所有可被 AI 模型完成的工作"作为 TAM 估算边界，意即把全部可自动化的劳动力经济价值计入市场（纽约大学 Stern 的 Damodaran 已公开质疑 SpaceX 的 26.5 万亿 AI TAM 估算"突破合理边界"）
- **财务跃迁**：2026 年第二季度单季营收 116 亿美元，并首次实现调整后营业利润为正；7 月末年化收入运行率达约 650 亿美元；投资方情景测算显示，若维持 800% 增速、给予 30 倍市销率，对应市值可触 3 万亿美元
- **二级市场背书**：5 月私募估值 9,650 亿美元首次超过 OpenAI；近月二级市场隐含估值已升至 1.5 万亿美元，几乎"无人愿意卖出"
- **认购方**：摩根士丹利、高盛、摩根大通联合主承销；2026 年迄今风险投资、主权财富基金及机构累计注资近 1,000 亿美元
- **风险因素**：招股书将"反 AI 情绪"列入风险提示；美国得州、宾州、纽约近期对数据中心建设施加不同程度的暂停或审核

**值得关注的原因**：30 万亿美元 TAM 不只是一组数字，它是 Anthropic 给整个 AI Coding 市场写的长期叙事——如果 AI 自动化的目标边界是"全球劳动力的全部工作量"，那么编程、客服、研究、运营这些垂类的市场天花板都被拉到了我们惯常估值模型之外。2 万亿美元目标估值意味着 Anthropic 押注的不只是一款产品，而是"AI 全工作流基础设施"的位置。对国内同行来说，这意味着两个判断：第一，闭源前沿厂商定价权的下半场将由"模型的编程能力"切换到"对企业级工作流的占领度"，Single-API 收入将越来越分化；第二，IPO 节奏将反向压缩 OpenAI 之外其他顶级实验室的私募估值空间，2026Q4 起一级市场可能进入"二级化"阶段。

## GPT-5.6 入驻 AWS Kiro：三档模型路由重写 AI 编程经济学

8 月 24 日，AWS 与 OpenAI 联合宣布 **GPT-5.6 系列**（Sol/Terra/Luna）正式登陆 AWS 的规格驱动（spec-driven）编码代理 **Kiro**，覆盖 IDE、CLI、Web 和 Mobile。这是 OpenAI 旗舰模型家族首次以"三档梯度"形态进入一个第三方云厂商的工程平台。

关键设计：

- **三档信用倍率**：Sol 2.4×（最复杂任务）、Terra 1.2×（平衡型）、Luna 0.6×（高吞吐）；Kiro 通过信用消耗而非订阅档位来表达模型档次
- **统一 272K token 上下文窗口**：三档均提供长上下文，便于规格文档、代码库和团队规范一次喂入
- **官方基准**：Terminal-Bench 2.1 上 Sol 88.8%、Terra 用 18% 计算量即跑完 Sol 的 88.8%（成本节省 82%）；Coding Agent Index 三档分别得 80 / 77.4 / 74.6（厂商自报数据）
- **集成形态**：Kiro 自身负责把"自然语言需求"转换为 Requirements / Design / Tasks 三层结构，模型按复杂度自动路由；额外支持 AGENTS.md、MCP、Tangent 旁路对话、用量明细查看、PR 自动审查

AWS Agentic AI 副总裁 Swami Sivasubramanian 表示："让开发者能选用最新基础模型、用 spec-driven 工作流落地复杂长任务"。OpenAI 全球战略合作副总裁 Colleen Kapase 表示："团队可以在软件全生命周期每个阶段匹配智能、速度与成本"。

**值得关注的原因**：GPT-5.6 不是作为一个"更强的模型"被集成，而是作为"三档信用系统"被集成。Sol 跑最难的设计与重排，Terra 跑日常多文件实现，Luna 跑批量样板与小修——这意味着 AI Coding Agent 的竞争焦点从"模型排名"切到"路由器好坏"。对工程师而言，意味着一个工程任务里可能出现"两段不同模型提交"的 PR；对采购而言，信用乘率成了一线预算变量；对国产 Coding Agent 而言，模型即服务的同质化加速，反而让"规格-上下文-验证"那一层基础设施（Kiro、Cursor Origin、Codex Worktree）变成更稳的护城河。

## Codex Remote 全面可用、OpenAI o3 正式退场：Agent 系统走到跨端默认

8 月 26 日（今天），OpenAI 同步推出两条结构性变化：**Codex Remote** 即日起对所有 ChatGPT 档位（含 Free、Plus、Pro、Business、Enterprise、Education）开放，同日起 **OpenAI o3** 推理模型按 90 天日落期结束，正式从 ChatGPT 消费侧下线（API 仍保留）。

关键信息：

- **跨端工作流**：开发者从手机 ChatGPT App 发起或接管在 Mac/Windows 宿主上运行的代码任务，可审阅进度、批准动作，无需坐在本机前
- **新认证模型**：扫描客户端二维码 + 同账户 + MFA/SSO/Passkey 完成一次性 QR 配对；旧链路自 6/8 起未使用的连接需重新配对
- **新插件**：DigitalOcean Droplet Workspace 插件可让 Codex 申请 Droplet、配置 SSH 并直接接入 Codex App 作为远程工作区
- **Codex 体量**：每周活跃超过 **500 万开发者**；OpenAI Codex 业务负责人 Tibo Sottiaux 在 8/25 播客中进一步披露 Codex 用户数已约 2,000 万，Luna 模型运行成本较初期下降约 80%
- **o3 退场**：作为 2026 年 6 月以来"显式推理 trace 体验"的代表模型，o3 的 ChatGPT 端退出被视为"消费者侧不再需要可读 chain-of-thought"的信号

**值得关注的原因**：两个事件叠加意味着 OpenAI 在做一件不太被讨论的事——把"模型菜单"压缩为一个"行为基质"。o3 退场把"会显式思考的模型"和"消费者产品"剥离开，Codex Remote 的全民化把"能替我提交的代理"和"免费档位"绑在一起。开发者侧的实质影响是：你不再需要付费档位、也不需要一台常开机的工作站，就能远程指挥一个 Codex session。从行业上看，这是 AI Coding 进入"基础设施默认"阶段的明确信号——和当年 GitHub 把 push 与 CI 解耦一样，未来 12 个月，比拼的不再是"哪一款 IDE 装了 AI"，而是"在哪一层能默认接管提交"。

## EchoWM：可进入的全模态世界模型

8 月 25 日，京东探索研究院联合香港科技大学、北京大学、清华大学、斯坦福等机构在 arXiv 公开 **EchoWM: Open and Enterable Omnimodal World Models**（arXiv 2608.23189）。这是首个把"可进入的全模态世界模型"作为统一目标的设计——用户用连续 6-DoF 视角控制观察位置，模型同步合成 720p 视频、环境声、音乐与人声对白。

关键设计：

- **统一相机意图**：第一人称视角下相机意图就是观察者本身的运动；第三人称视角下相机与角色的相对运动从数据中学得，无需为跟拍、环绕、推拉写专门控制器
- **数据引擎**：四类来源互补——内部游戏脚本录制、互联网人类游玩、Unreal Engine 仿真（提供度量级相机位姿和受控旋转/平移覆盖）、通用互联网视频；通过"射击镜头检测"剔除跳切
- **训练递进**：先做音视频预训练建世界先验 → 再做动作精调单独学视觉导航 → 最后低学习率联合精调 + 自回归后训练，整合长程音视频生成与轨迹控制
- **评测**：在公开 world-model 基准上轨迹跟随能力强、视觉质量高，支持第一/第三人称交互，音视频长时间同步

**值得关注的原因**：EchoWM 不是又一款视频生成模型——它把"可交互"作为一等公民目标，并通过 6-DoF 轨迹统一了第一人称与第三人称的摄像机意图。具身智能的世界模型当前有两条路径："看的世界模型"（Genie 类，靠短视频预测）和"决策的世界模型"（V-JEPA 类，强调潜在状态推理）。EchoWM 把"沉浸感 + 同步声 + 连续控制"补上，意味着未来具身数据采集可以用"在 EchoWM 里走过千次"代替部分真实世界 rollout，这对人形机器人和自动驾驶训练场来说，是一个潜在的低成本可扩展引擎。

## 第二届世界人形机器人运动会收官：从"炫技"到"干活"

8 月 22 日至 26 日，第二届世界人形机器人运动会在北京国家速滑馆"冰丝带"举行。来自 **6 大洲 16 个国家** 的 **666 支赛队**、**2,056 台机器人** 同台竞技，队伍数同比增长 138%，机器人数量翻了两番。国内 157 家企业、200 所院校和科研机构的 641 支队伍、1,975 台机器人参赛，第一梯队企业悉数到场，27 所 985 高校踊跃参赛。赛项总数从首届 26 个拓展至 **51 个**，分为竞技赛与场景赛。

今年的关键规则变化是**全自主化**——除 100 米障碍、400 米障碍外，所有径赛及其他竞技赛项均须机器人全自主完成，依赖遥控的成绩权重直接腰斩。今年 4 月机器人半马冠军已把成绩压缩到 50 分 26 秒，不到上一届时长的 1/3，并已打破人类半马纪录。

场景赛则把比赛现场搬进了 **工厂、酒店、家庭、物流、消防救援、零售、医疗** 九大领域的真实场景，新增拔河、举重、跳高、跳远、乒乓球、太极拳、投壶等 14 个项目。其中两个"硬核挑战"尤其值得工程师关注：

- **灵巧手专项赛**：电动工具装配、镊子夹豆、开瓶撬盖等 8 个高精度科目，考"看得清/拿得稳/做得准"的指尖精度
- **综合五项**：百米赛道 + 灵巧操作 + 平稳传递 + 重物搬运复合赛，对全身协同与控制频率提出系统级要求

新华社在 8 月 25 日报道中指出，"人形机器人产业正进入大规模商业化部署的关键阶段，具身智能产品正在从批量试制走向更广泛的落地"。杭州电化集团已在高温腐蚀环境中部署巡检机器人，上海番茄农场试点双臂采摘机器人通过田间验收。

**值得关注的原因**：运动会的核心信号不是奖牌，而是"自主化 + 场景化"两条改革。100 米全自主意味着大脑-小脑实时闭环必须扛住全速冲刺；场景赛把工作流搬到赛场意味着行业愿意用奖金与曝光换真实订单。"得了奖牌就拿订单，出了赛场就进现场"这句出自组委会的表述，比任何一份白皮书都更直接地说明了人形机器人赛道的下一阶段竞争：当炫技红利消退，量产能力、力控精度、跨任务泛化将共同决定谁能拿到工厂预算。

## 来源

- [华尔街日报（IT之家编译）：Anthropic 30 万亿 TAM 与 2 万亿 IPO 估值冲刺](https://www.ithome.com/0/894/152.htm)
- [网易财经：Anthropic 拟向投资者披露超 30 万亿美元市场潜力](https://www.ithome.com/0/894/152.htm)
- [每日经济新闻：全球科技早参｜Anthropic 拟 2 万亿 IPO、SpaceX 拟千亿建第三处星舰发射基地](https://www.163.com/dy/article/L589I7U40512B07B.html)
- [界面新闻：营收飙升 14 倍，Anthropic 冲刺 2 万亿美元 IPO，但估值泡沫隐现](https://www.jiemian.com/article/14969643.html)
- [BeInCrypto：$30 Trillion Dream: Can Anthropic Sell the Biggest IPO Ever?](http://www.criptor.net/publisher/beincrypto/30-trillion-dream-can-anthropic-sell-the-biggest-ipo-ever)
- [TechsCurrent：GPT-5.6 in Kiro Makes AI Coding a Model-Routing Problem](https://techscurrent.com/2026/08/gpt-5-6-kiro-ai-coding-model-routing)
- [Releasebot.io：OpenAI 官方日志 — Advancing price-performance for developers with GPT‑5.6 in Kiro](https://releasebot.io/updates/categories/ai-language-models)
- [OpenAI Developers: ChatGPT & Codex changelog — Codex Remote GA](https://developers.openai.com/codex/changelog)
- [Releases.sh：Codex Remote GA; OpenAI o3 retired August 26](https://releases.sh/release/rel_V_9x3GMB6kdOF1AKVyX6o)
- [YOU ON AI：OpenAI Logs o3's Exit Date — Codex Remote Goes GA Across All Plans](https://www.youonai.ai/pulse/stories/hourly/openai-o3-retirement-codex-remote-ga)
- [Wall Street Journal via 华尔街见闻：Codex 业务负责人 Tibo 访谈 — Codex 用户数已达约 2,000 万](https://view.inews.qq.com/a/20260825A08MGM00)
- [arXivDaily：京东 & 港科大等提出 EchoWM，边走边生成 720p 画面、环境声和语音](https://www.arxivdaily.com/industry-trends/2026-08-25/2608.23189)
- [HuggingFace Papers：EchoWM: Open and Enterable Omnimodal World Models](https://huggingface.co/papers/2608.23189)
- [百度百科：2026 世界人形机器人运动会](https://baike.baidu.com/item/2026%E4%B8%96%E7%95%8C%E4%BA%BA%E5%BD%A2%E6%9C%BA%E5%99%A8%E4%BA%BA%E8%BF%90%E5%8A%A8%E4%BC%9A/67773123)
- [WHRG 官网：赛事亮点抢先看](https://www.whrgoc.com/news/2087791510969589760)
- [WHRG 官网新闻发布会：北京人形机器人运动会新闻发布会（第三场）](https://www.whrgoc.com/news/2087847118582259712)
- [新华网英文版：Robot events in China highlight accelerating embodied intelligence innovation through industrial application](https://english.news.cn/20260825/6cbdd8e20a9d4e3a9eff6cc0d1da89f8/c.html)
- [Reuters：Beyond Marathons and Backflips, China's Robots Face a Commercial Test](https://goldsea.com/article_details/beyond-marathons-and-backflips-chinas-robots-face-a-commercial-test)
- [AI2Work：World Humanoid Robot Games: Beijing's Olympic Test for Physical AI](https://ai2.work/blog/world-humanoid-robot-games-beijing-s-olympic-test-for-physical-ai)
- [future_x / DEV.to：FutureX · Physical AI Daily — Issue 100 (08/26)](https://dev.to/future_x/futurex-physical-ai-daily-issue-100-0826-46aj)

<!-- 封面建议：800×450，可自定义 /images/covers/briefing-anthropic-ipo-gpt56-kiro-2026-08-26.svg，主题色推荐深蓝/紫黑渐变 + Kiro 终端面板 + 2 万亿估值数字牌 + EchoWM 摄像机轨迹 + 人形机器人冲线剪影 -->
