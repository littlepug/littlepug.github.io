---
title: Claude Code 内置浏览器、Muse Spark 与 Grok 4.5 同周竞逐
date: 2026-07-14
categories: briefing
tags: [ai, llm, coding, embodied-intelligence, robotics, agent]
excerpt: 7 月第二周 AI 编程与具身智能密集交锋：Anthropic 为 Claude Code 桌面版上线沙盒浏览器与交互式 /doctor，Agent 可自主浏览网页、修复配置；Meta 发布 Muse Spark 1.1 多 Agent 协作模型并首次开放付费 API（$1.25/$4.25）；SpaceXAI 联合 Cursor 发布 Grok 4.5，token 效率四倍于 Opus 4.8；宇树 G1 人形机器人完成全球首例活体胆囊切除手术登 Nature；国内具身智能半年融资 935 亿元，投资逻辑从"后空翻"转向"搬砖头"。
cover: /images/covers/briefing-default.svg
---

7 月第二周，三大前沿实验室同台竞逐 AI 编程 Agent 赛道：Anthropic 给 Claude Code 装上了浏览器——Agent 可以自主浏览网页、读文档、查 issue；Meta 把多 Agent 协作写进了 Muse Spark 1.1 的架构里，API 定价仅为对手的 25%；SpaceXAI 与 Cursor 联合训练的 Grok 4.5 把"性价比"做到了极致，单个编程任务只消耗 Opus 4.8 四分之一的输出 token。具身智能这边，宇树 G1 人形机器人完成全球首例活体外科手术、论文登上 Nature 正刊，国内上半年融资总额突破 935 亿元——两条赛道都在加速从"能看"到"能用"的跃迁。

## 发生了什么

- **Claude Code 桌面版内置浏览器 GA + /doctor 交互化 + Agent 成本预算**（7 月 11–13 日）：Anthropic 在 Claude Code v2.1.202–207 连续版本中正式上线沙盒浏览器面板。Claude 可在应用内打开、阅读、点击并与外部网页交互——读技术文档、查 issue tracker、看设计稿，全程不需离开开发流程。浏览器运行在完全隔离的沙盒环境中，不存储登录凭证，内置分类器审查所有外部站点写入操作。同一批次更新中，/doctor 从只读诊断报告升级为交互式修复工具：自动诊断安装健康、识别闲置 MCP server 和 CLAUDE.md 冗余内容，提出修复建议并确认后执行。此外还引入 per-agent cost budgets——为长时间运行的 Agent 任务设定费用上限，并在达到阈值时自动 checkpoint，避免单次任务烧穿预算。7 月 19 日前 rate limit 同步上调 50%。
- **Meta 发布 Muse Spark 1.1，首次开放付费 API**（7 月 9 日）：Meta 超级智能实验室发布旗舰模型 Muse Spark 1.1，核心升级是原生多 Agent 自动化工作流——主 Agent 收集信息、制定计划，子 Agent 并行执行具体任务。100 万 token 上下文窗口，支持跨应用 Computer Use、零样本适配 MCP 服务器和自定义技能。API 公开预览版同步上线，定价 $1.25/$4.25 per M tokens（输入/输出），远低于 Opus 4.8 的 $5/$30 和 GPT-5.6 Sol 的 $5/$30。Zuckerberg 时隔三年重返 X 发帖推荐，称其为"强大且极低价位的智能体与编码模型"。在 JobBench 工具使用评测中得分 54.7%（Opus 4.8 为 48.4%），MCP Atlas 以 88.1 分登顶。但 SWE-Bench Pro 等纯编码基准仍落后于 Opus 4.8 和 GPT-5.5。
- **SpaceXAI 联合 Cursor 发布 Grok 4.5**（7 月 8 日）：SpaceXAI 收购 Cursor（600 亿美元）后首个联合训练模型正式上线。Grok 4.5 定位为编程 Agent 与知识工作专用模型，1.5T 参数 V9 底座，500K 上下文窗口。核心卖点：在 SWE-Bench Pro 编程任务中，平均只需 15,954 输出 token 解决问题——仅为 Opus 4.8 (max) 的 67,020 的约四分之一，配合 $2/$6 的定价，单个编程任务成本可达对手的约十分之一。80 TPS 推理速度，在 GDPval-AA v2 真实职场知识场景评测中排名第 4（落后于 Fable 5、GPT-5.6 Sol、Opus 4.8）。已在 Grok Build、Cursor 编辑器和 SpaceXAI Console 同步上线，但暂未在欧盟开放。
- **宇树 G1 人形机器人完成全球首例活体外科手术，论文登上 Nature**（7 月 8–9 日）：加州大学圣迭戈分校（UCSD）研究团队使用两台宇树科技 G1 人形机器人，成功为两只大型非灵长类动物完成腹腔镜胆囊切除手术——全球首次人形机器人活体外科手术。两台机器人均使用医院常规腹腔镜器械，由外科医生通过控制台远程操控。第一例耗时 56 分钟、无重大并发症；第二例 32 分钟、轻微胆汁溢出经吸引处理后妥善解决。论文第一作者兼通讯作者 Zekai Liang 为中国 00 后博士生（华中科技大学本科毕业），成果发表于 Nature 正刊。研究指出当前需多次重新校准导致耗时远长于达芬奇系统，但团队乐观预期——早期机器人腹腔镜手术曾需 6 小时，如今同类仅需 30 分钟。
- **国内具身智能上半年融资 935 亿元，投资逻辑转向"搬砖头"**（截至 7 月）：IT 桔子数据显示，2026 年上半年国内具身智能赛道融资总金额达 935 亿元，同比增长 5 倍；融资事件 322 笔，同比增长 137%。资本从"后空翻"式的技术表演转向关注"搬砖头"式的真实场景落地——星动纪元两个月内完成 25 亿元融资，已在十余个物流中心实现千台级批量交付，部分场景效率达人工 85% 且可 24 小时不间断运行。18 家企业估值超百亿，7 家超 200 亿（宇树、智平方、自变量、银河通用等）。投资方结构呈"全链条"特征，国家队、地方国资、产业资本和美元基金同步涌入。

## 要点解读

### Claude Code 内置浏览器：AI Agent 终于有了"眼睛"

Claude Code 的浏览器升级可能是本月对 AI 编程日常工作流影响最大的变化。此前 Agent 只能操作代码和终端，需要人类手动搬运浏览器端的信息——查 API 文档、读 issue、看线上效果，全靠 paste 或截图。现在 Agent 可以自主完成"查文档 → 读 issue → 看线上效果 → 改代码"的全链路闭环。

```text
Claude Code 7 月更新要点
──────────────────────────────
浏览器  ：沙盒隔离，不存储凭证，分类器审查写入操作
/doctor ：交互式修复 → 提出建议 → 确认后执行
成本预算：per-agent cost budgets + checkpoint
速率    ：+50% rate limit（7 月 19 日前）
```

三个值得关注的细节：

1. **安全设计克制而精准**。浏览器不做"万能 Agent"——未经授权不能购买商品、创建账户或绕过 CAPTCHA。企业管理员可通过白名单限制可访问站点范围，甚至完全禁用浏览器工具。这不是"给 Agent 无限权力"，而是"在可控边界内扩大 Agent 自主执行的范围"。
2. **/doctor 的交互式设计暗含更大的野心**。从只读报告到交互修复，意味着 Anthropic 正在把 Claude Code 的配置管理也交给 Agent——识别冗余的 CLAUDE.md、清理闲置 MCP server、优化 context window 占用。当 Agent 可以自主维护自己的运行环境，"自愈式编码 Agent"就不再只是概念。
3. **per-agent cost budgets 是成本治理的关键基础设施**。长时间运行的 Agent 任务（大型代码库迁移、多步骤调试）容易失控——一个跑了几小时的 Agent 可能烧掉数十美元。cost budgets + checkpoint 的组合让团队可以为不同类型的任务设定不同预算，并在达到阈值时保留状态、暂停执行，而非直接终止丢失进度。

### Muse Spark 1.1 vs Grok 4.5：Agent 编程的"协作派"与"性价比派"

Muse Spark 1.1 和 Grok 4.5 同周发布，但选择了两条不同的路：

```text
Muse Spark 1.1 vs Grok 4.5 对比
──────────────────────────────
定位    ：多Agent协作编排   vs  单模型编程性价比
定价    ：$1.25/$4.25       vs  $2/$6
上下文  ：1M tokens         vs  500K tokens
参数    ：未公开             vs  ~1.5T (V9)
训练    ：Meta自研           vs  SpaceXAI+Cursor联合
强项    ：JobBench 54.7%     vs  SWE-Bench Pro 64.7%
        MCP Atlas 88.1      vs  Terminal-Bench 83.3%
弱项    ：纯编码基准落后     vs  无视频输入、欧盟未开放
```

Muse Spark 1.1 的核心选择是**不在单模型编码能力上硬碰硬**，而是押注"谁能让多个 Agent 更好协作"——主 Agent 制定作战计划、子 Agent 按指令执行，实时检测变化并动态调整。这个赛道目前没有明确的领头羊，Meta 希望用原生架构优势抢先占位。

Grok 4.5 的核心选择是**在"任务成本"这个维度上做极致优化**。马斯克不再和前沿模型比拼绝对能力，而是承认"Fable 确实比 Grok 4.5 好得多，但大多数任务并不需要 Fable 级别的能力"。$2/$6 的定价加上四倍的 token 效率，让它在高吞吐 Agent 场景（CI/CD 流水线、批量 code review）中有结构性成本优势。

两条路反映了对 Agent 编程市场的不同判断：Meta 认为未来是"一组 Agent 分工协作"，SpaceXAI 认为大多数场景只需要"一个够快够便宜的 Agent"。

### 宇树 G1 活体手术：从"春晚跳舞"到"手术室握刀"

宇树 G1 从春晚舞台到 Nature 正刊的跨越，是具身智能 2026 年最戏剧性的里程碑之一：

```text
宇树 G1 手术关键数据
──────────────────────────────
手术类型：腹腔镜胆囊切除术（活体，非灵长类）
手术台数：2 台宇树 G1 协同
器械    ：医院常规腹腔镜器械（非定制）
操控    ：外科医生远程操控控制台
第一例  ：56 分钟，无重大并发症
第二例  ：32 分钟，轻微胆汁溢出已处理
论文    ：Nature 正刊（7 月 8 日在线发表）
第一作者：Zekai Liang（00后，华科大本科，UCSD 博士）
```

三个值得关注的角度：

1. **"通用平台"思路的突破性验证**。G1 不是专用手术机器人，而是身高 1.52m、体重 27kg 的通用人形机器人。研究团队为它开发了定制末端执行器和遥操作算法，但机器人本身是直接采购的市售产品——这意味着通用硬件平台 + 专业软件适配的组合，可以进入高度专业化的场景。这和达芬奇系统"专用硬件 + 专用软件"的路线形成了对比。
2. **双机器人协同是未来方向**。第二例手术完全由两台 G1 协同完成——一台负责牵引暴露视野，另一台执行切除操作。这验证了人形机器人"团队手术"的可行性，也直接呼应了 AI Agent 领域正在流行的多 Agent 协作范式。
3. **距离人类手术室仍有长路**。研究团队坦承三大瓶颈——反复校准导致耗时远长于达芬奇、商用人形机器人缺乏可高温高压灭菌部件、机器人力量不足增加主刀医生认知负担。乐观的理由是：早期机器人腹腔镜手术需 6 小时，如今同类仅需 30 分钟——性能曲线的起点总是笨拙的，但改善速度可能超预期。

### 具身智能融资 935 亿元：资本从"看表演"到"看账本"

935 亿元融资总额背后，投资逻辑正在发生深层转向：

1. **"搬砖头"取代"后空翻"**。投资人不再被机器人翻跟头、跳舞的视频打动，而是追问"哪家企业能在真实产线上证明自己"。星动纪元千台级交付、越疆上半年具身智能出货超 4000 万元、至简动力创行业最快百台交付纪录——融资文件里开始出现客户名单和复购数据。
2. **头部效应极致化**。融资额 TOP20 企业合计 550 亿元，占总融资额的 59%。18 家独角兽中 7 家估值超 200 亿。钱在变多，但项目在变少——资本正在从"广撒网"转向"重仓头部"。
3. **投资方呈"全链条"特征**。国家队、部委背景基金、地方国资、产业资本和美元基金同步涌入，约 30% 新晋独角兽由科技大厂与一线投资机构共同推动。这种"全链条"投资结构意味着赛道已被定义为国家战略产业，政策支持力度将持续加码。

## 来源

- [Claude Code July 2026: In-App Browser, /doctor, Cost Budgets — Subagentic](https://subagentic.ai/posts/claude-code-july-2026-inapp-browser-doctor-cost-budgets)
- [Anthropic 升级 Claude Code：新增内置浏览器 — 搜狐](https://www.sohu.com/a/1049593751_122396381)
- [桌面版 Claude Code 新增应用内浏览器 — IT 之家](https://new.qq.com/rain/a/20260711A02H5E00)
- [Muse Spark 1.1 Evaluation Report — Meta](https://ai.meta.com/static-resource/muse-spark-1-1-evaluation-report)
- [Meta 的 Agent 司令部：Muse Spark 1.1 重新定义多代理协作范式 — 钛媒体](https://www.tmtpost.com/agent/ai-article/19030)
- [Meta 开放付费 API，搭载 Muse Spark 1.1 — aibars](https://www.aibars.net/zh/library/ai-news/details/863380086114619392)
- [Grok 4.5 发布：Opus 级能力定价远低于对手 — TechWeb](https://www.163.com/dy/article/L1D0E5J505119MAU.html)
- [Grok 4.5 Benchmarks, Pricing & Review — The AI Rankings](https://theairankings.com/xai/grok-4-5/)
- [SpaceXAI 联手 Cursor 发布 Grok 4.5 — 证券时报](https://www.toutiao.com/article/7660309377898922506)
- [全球首例！宇树人形机器人完成活体外科手术登 Nature — 凤凰网](https://new.qq.com/rain/a/20260710A05SHA00)
- [全球首次！用宇树机器人做手术，中国 00 后博士登 Nature — 腾讯新闻](https://new.qq.com/rain/a/20260709A09EXV00)
- [全球首例！00 后华人发 Nature，宇树机器人完成活体手术 — 凤凰科技](https://tech.ifeng.com/c/8uc57Rhz6ZR)
- [半年 935 亿元的资本狂欢，谁在豪赌具身智能？ — 虎嗅](https://www.huxiu.com/article/4872074.html)
- [投资逻辑从后空翻转向搬砖头 — 中国证券报](https://finance.ce.cn/stock/gsgdbd/202607/t20260710_3078732.shtml)
- [多路资本涌入具身智能，工业场景落地仍在爬坡 — 网易](https://c.m.163.com/news/a/L0UL1BEB05199NPP.html)
