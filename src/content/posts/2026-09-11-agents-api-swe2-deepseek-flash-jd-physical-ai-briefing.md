---
title: Agents API 开放、SWE-2 逼近前沿，京东冲刺物理 AI
date: 2026-09-11
categories: briefing
tags: [ai, llm]
excerpt: OpenAI 将 Codex 底层执行框架以 Agents API 公测开放，开发者零额外费用即可获得托管会话与多子代理编排；Cognition 发布 SWE-2 编程模型，基于开源 Kimi K3 后训练逼近 Fable 5.1 但成本降 64%；DeepSeek V4.1 Flash 采用 Causal-Encoder-Decoder 新架构，KV Cache 压缩至 1/4；京东启动物理 AI 加速计划冲刺六项全球第一，5 年采购 300 万台机器人；服贸会机器人全链路进化，人社部新增具身智能机器人应用技术员职业。
cover: /images/covers/briefing-default.svg
---

今天 AI 领域的两条主线同步刷新：**AI coding** 侧，OpenAI 将 Codex 执行框架以 Agents API 形式公测开放，Cognition 和 DeepSeek 分别发布编程新模型，将"逼近前沿 + 成本骤降"的帕累托前沿继续外推；**具身智能**侧，京东以真实供应链为训练场启动物理 AI 加速计划，服贸会上机器人从前端自主作业到后端数据采集全面进化，人社部正式将具身智能纳入新职业目录。

## OpenAI Agents API 公测：Codex 执行框架即服务

9 月 10 日，OpenAI 宣布 **Agents API** 进入公开测试，向所有开发者开放此前仅驱动 Codex 内部运行的托管执行框架。开发者通过一次 API 调用即可创建生产级智能体，OpenAI 负责会话编排、上下文压缩、故障恢复等基础设施，开发者只需提供工具和选择运行环境。

### 核心能力

- **持久会话（Durable Sessions）**：会话状态由 OpenAI 侧保留，跨轮次工作无需应用重建对话上下文，支持持续数小时甚至数天的长任务
- **多子代理编排**：内置子代理委托能力，支持可配置的并发上限，可拆分复杂任务并行执行
- **沙盒执行**：提供 OpenAI 托管沙盒（与 Codex / ChatGPT 同一基础设施），也支持 Cloudflare、Daytona、DigitalOcean、E2B、Modal、Oracle、Vercel 等合作伙伴的自托管环境
- **MCP 集成**：Agent 可通过 HTTP 连接 MCP 服务器，连接文档管理、CRM、日历等企业系统
- **技能与插件**：支持向沙盒动态添加技能和插件，运行代码、编辑文件、生成产物

### 定价模型

Agents API **不收取额外平台费**，开发者仅按模型 token 用量和工具调用费用计费。OpenAI 托管沙盒按标准容器费率收费。早期客户案例显示，单案处理成本降低约 60%，失败率降低约 86%。

```bash
pip install --upgrade openai
```

请求需携带 `OpenAI-Beta: agents=v1` 头，端点为 `POST /v1/agents/sessions`。

**值得关注的原因**：这是首个由前沿实验室将"Agent 操作系统"层以 API 形式产品化。此前构建生产级 Agent 需要专门的工程团队处理会话管理、上下文溢出、重试逻辑和编排层——现在这些由 OpenAI 基础设施承担。限制方面，目前数据驻留仅限美国，不支持零数据保留（ZDR）。

## Cognition SWE-2：开源权重 + 后训练，逼近前沿但成本降 64%

9 月 10 日，Cognition（Devin 母公司）发布旗舰编程模型 **SWE-2**，在 FrontierCode 1.1 Main 上取得 50.0%，仅落后 Anthropic Fable 5.1（50.9%）不到 1 个百分点，但运行成本降低 64%。

### 基准表现

| 基准 | SWE-2 | Fable 5.1 | GPT-6 Astra | GPT-5.6 Sol | Grok 4.6 |
|------|-------|-----------|-------------|-------------|----------|
| FrontierCode 1.1 Main | 50.0% | 50.9% | 53.3% | 47.5% | 48.0% |
| DeepSWE 1.1 | 73.0% | 67.4% | 74.1% | 72.7% | 67.5% |
| Terminal-Bench 2.1 | 92.8% | 91.4% | 89.9% | 88.8% | 88.4% |
| Terminal-Bench 4 | 27.3% | 55.8% | 57.9% | 37.3% | 20.3% |

### 技术亮点

SWE-2 基于 **Kimi K3**（月之暗面发布的 2.8 万亿参数开源权重模型）进行后训练。关键技术贡献包括：

- **单次 RL 训练多努力等级**：引入线性成本惩罚函数 `R = S - λₑC`，其中 S 为任务成功率、C 为运行时和 API 成本组合、λₑ 按 Pareto 前沿局部斜率调整，使所有努力等级同步提升而非相互牺牲
- **聚焦探索**：SWE-2 中等配置平均每轮 53 步（SWE-1.7 为 127 步，减少 58%），首次代码修改中位数 18 步（SWE-1.7 为 48 步），平均成本降低 81%
- **NVFP4/FP8 量化感知训练**：降低内存使用，在 2.8T 参数基座上实现低于 SWE-1.7 的训练-推理失配
- **数据飞轮**：训练环境数量增至三倍，前序 SWE-2 检查点迭代硬化验证器

SWE-2 已在 Devin Desktop 和 CLI 上线，Pro / Max / Teams 订阅者享一个月免费期。

**值得关注的原因**：一家美国实验室以中国开源模型为基座，叠加自研大规模 RL 后训练，直接作为旗舰产品发布——这验证了"开源权重 + 后训练"路线在编程领域已具备与前沿闭源模型正面竞争的能力。核心竞争壁垒从预训练转向后训练与 Harness 工程。

## DeepSeek V4.1 Flash：Causal-Encoder-Decoder 新架构

9 月 10 日，DeepSeek 发布 **V4.1 Flash**，作为全新模型结构系列中的最小尺寸型号，在性能、费用、速度和总用时上全面超越此前的 V4 Pro。

### 架构创新

- **552B 参数 MoE**，采用 **Causal-Encoder-Decoder** 新结构，输入输出不对称：输入激活仅 8B，输出激活 16B，成本显著低于同尺寸模型
- **KV Cache 大幅压缩**：HBM 需求降至上一代的 **1/4**，SSD 需求降至 **1/8**——在 Agent 场景中缓存命中费用占比高，压缩直接降低长任务成本
- **上下文从 4K 拉长至 1M**，原生多模态视觉理解能力内置
- 已在 Hugging Face 开源权重并发布技术报告

### 基准表现

在 Agentic Benchmark 等评测中超越 GLM-5.3、Kimi K3 等前沿模型；GPQA Diamond、Codeforces 编程、MathArena Apex、Terminal-Bench 2.1 和 CyberGym 均有强劲表现。

### 定价调整

采用峰谷定价，新价格 9 月 10 日 12:00 生效：

| 时段 | 缓存命中输入 | 未命中输入 | 输出 |
|------|-------------|-----------|------|
| 闲时 | ¥0.02/百万token | ¥1.0 | ¥4.0 |
| 高峰 | ¥0.04/百万token | ¥2.0 | ¥8.0 |

9 月 14 日 12:00 后，`deepseek-v4-pro` 请求全部路由至 V4.1 Flash 并按 Flash 单价计费，直至 V4.1 Pro 上线。消费端 App 将快速、专家、视觉三模式合并为单一智能模式。

**值得关注的原因**：Causal-Encoder-Decoder 是 MoE 架构的新变体，输入输出不对称激活设计直接切中 Agent 工作负载"大量输入阅读 + 短输出决策"的模式。KV Cache 压缩到 1/4 HBM 需求，对长会话 Agent 是实打实的成本优势。

## 京东物理 AI 加速计划：冲刺六项"全球第一"

9 月 9 日，在 2026 京东全球科技探索者大会（JDD）上，京东发布"超级 AI 供应链"并启动"物理 AI 加速计划"，提出建设全球最大物理世界运营中心，在具身智能领域冲刺六项"全球第一"。

### 六大方向与量化目标

| 方向 | 目标 |
|------|------|
| 数据 | 两年内建成全球最大具身智能数据采集中心（1000 万小时级人类真实场景数据采集） |
| 基地 | 5 年内全国布局 80+ 个 RoboBase 机器人产业基地 |
| 制造 | 3 年内助力 100 家机器人本体厂商降本、100 家零部件企业业绩倍增 |
| 销售 | 至 2028 年投入百亿资源扶持机器人品牌，产品走进百万终端场景 |
| 物流 | 5 年采购 **300 万台机器人**、100 万台无人车、10 万架无人机 |
| 服务 | 覆盖超 100 个国家售后网络，创造 10 万个机器人服务工程师岗位 |

### 技术底座

京东云已落地国产万卡算力集群，规划十万卡级国产物理 AI 算力中心；模型侧发布 JoyAI-Video 和 **JoyAI-EchoWM** 实时可交互世界模型，补齐多模态、世界模型、具身模型完整矩阵。终端侧通过 JoyInside 与 AIHome 生态，计划年内接入超千万台智能设备。

物流方面，京东物流发布"超脑"大模型指挥的"狼族"九款机器人全阵容，覆盖仓储、分拣、运输、配送全链。

**值得关注的原因**：京东以自有供应链上千个仓库和数万个配送站为训练场，走"先场景后技术"路径，与实验室先研发再找场景的模式形成互补。"智能飞轮"（场景→数据→模型→终端→任务→新数据）的闭环设计值得关注，其实质是用真实产业数据驱动模型迭代。

## 服贸会机器人全链路进化 + 具身智能新职业

### 服贸会：从前端自主到后端基建

9 月 11 日，2026 年服贸会电信、计算机和信息服务专题展上，机器人产业呈现从前端到后端的全链路进化趋势：

- **前端自主作业**：具备具身 Agent 能力的机器狗无需预设路线和人工遥控，可在复杂开放环境中自主执行通用任务（导盲、园区巡检、快递配送）；春晚同款人形机器人已在超 50 个城市落地零售店，24 小时不间断营业
- **外骨骼机器人**：动力前驱设计，最轻款仅 1.8 千克，AI 学习算法自动匹配用户行走习惯
- **后端管理平台**：服务于世界人形机器人运动会的具身智能管理平台亮相，为机器人建立"电子档案"、配备"数字行车记录仪"，防止冒名顶替和设备干扰
- **数据采集**：头戴式数据采集产品无需复杂场地部署和机器人本体，真人佩戴即可完成场景数据采集，"人去哪、数据采到哪"，大幅降低数据获取门槛

### 人社部新增"具身智能机器人应用技术员"

9 月 9 日，人社部等部门发布第八批新职业，"具身智能机器人应用技术员"被列入，数字职业占新增总数 45.5%。同日数据显示，2026 年上半年股权投资同比上升 31.9%，耐心资本从"财务回报"转向"产业主导"，机器人产业迎爆发式增长。

**值得关注的原因**：服贸会释放的信号清晰——机器人产业竞争焦点正从"机器人能做什么"转向"数据、场景和基础设施能否跟上"。新职业的设立标志着具身智能从研发走向应用部署阶段的人才需求已被制度层面认可。行业从"唯出货量论"转向关注真实应用与稳定泛化能力。

## 来源

- [OpenAI Agents API 官方文档](https://developers.openai.com/api/docs/guides/agents-api/overview)
- [OpenAI 社区公告：Introducing the Agents API and hosted sandboxes](https://community.openai.com/t/introducing-the-agents-api-and-hosted-sandboxes/1396481)
- [IT之家：OpenAI Agents API 开放公测](https://so.html5.qq.com/page/real/search_news?docid=70000021_6236aa33f5302252)
- [Cognition 官方博客：Introducing SWE-2](https://www.worldprogramming.org/posts/cognition-launches-new-swe-2-model-rivaling-fable-51-and-gpt-astra-lme0vx)
- [dev.to：Cognition's SWE-2 is built on top of an open Chinese model](https://dev.to/breachprotocol/cognitions-swe-2-coding-model-is-built-on-top-of-an-open-chinese-model-59k3)
- [中国证券报：DeepSeek 大模型上新](https://jnzstatic.cs.com.cn/zzb/htmlInfo/132940.html)
- [Pandaily：DeepSeek V4.1 Flash GA](https://pandaily.com/deepseek-v41-flash-official-ga-replaces-v4-pro)
- [今日头条：京东发布物理 AI 建设最新成果](https://www.toutiao.com/article/7683829513305719350)
- [CCTV 央视新闻：服贸会机器人前端+后台全链路进化](https://ysxw.cctv.cn/article.html?toc_style_id=feeds_default&item_id=17808837193913744537&channelId=1119)
- [腾讯新闻：机器人行业资讯（优地机器人上市 / 外滩大会 / 新职业）](https://new.qq.com/rain/a/20260910A03K7200)
