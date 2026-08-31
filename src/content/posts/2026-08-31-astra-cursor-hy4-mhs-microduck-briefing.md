---
title: OpenAI Astra 曝光、Cursor 断供、Hy4 开源与 MHS 标准
date: 2026-08-31
categories: briefing
tags: [ai, llm, coding, embodied]
excerpt: OpenAI Astra 前端与持久智能体能力曝光，同时宣布 11 月终止向 Cursor 供模；腾讯开源 770B 参数 Hy4 preview；Anthropic 发布模型硬件标准 MHS；Hugging Face × Pollen 推出 399 美元开源双足机器人 Microduck。AI Coding 与具身智能同时进入「协议与供应链」博弈阶段。
cover: /images/covers/briefing-default.svg
---

## 发生了什么

8 月最后一周，AI Coding 与具身智能两条主线同时出现「格局级」变化。OpenAI 下一代模型 Astra 的内部测试输出开始流出，展现出在复杂前端、3D 交互和多智能体编排上的显著进步；几乎同时，OpenAI 以「控制权变更」条款宣布 11 月 12 日起停止直接向 Cursor 供应模型，把模型 API 从「中立基础设施」变成战略筹码。Anthropic 和腾讯则分别从「物理设备协议」与「开源模型能力」两个方向加码：Anthropic 推出模型硬件标准 MHS，想让 Agent 安全地操作显微镜、机械臂和量子计算机；腾讯开源 770B 参数的 Hy4 preview，直接把上下文拉到 1M tokens。具身智能侧，Hugging Face 与 Pollen Robotics 把开源双足机器人 Microduck 压到 399 美元，让物理 AI 实验不再依赖六位数预算。

## OpenAI Astra 内测曝光：前端、持久智能体与多 Agent 编排

据 The Verge 记者 Alex Heath 在 TIME 封面报道中的披露，OpenAI 在 8 月初向部分 VIP 客户私下演示了代号为 Astra 的下一代模型。同期，内部测试代号 `mozaik-alpha-fdm` 的灰度输出开始在开发者社区流传：在 Max effort 模式下，Astra 零样本一次生成 3D 等距地图、可交互网页与复杂 UI，细节一致性和空间关系控制明显优于当前主流模型。

Astra 的核心定位不是「更快的聊天模型」，而是「持久智能体」：

- **超长程任务保持**：设计目标是在数天到数周内持续工作，记住用户的修正反馈。
- **端到端多智能体编排**：可同时协调多个子 Agent 拆分研究级数学证明、跨软件工具执行复杂工作流。
- **持久化推理与即时自我纠错**：生成过程中反复验证输出，保持设计语言与代码规范一致。

泄露信息显示 Astra 可能在 9 月 3 日前后正式发布，与 Anthropic 同期升级的 Fable 5.1 正面竞争。OpenAI 首席科学家 Jakub Pachocki 称，Astra 已能在内部代码库中实现「此前需要人类研究员一周完成」的实验工作。但需注意：Astra 的具体发布日期、价格和实际泛化能力尚未得到官方完全确认，目前信息多来自 leak 和媒体报道。

**值得关注的原因**：如果 Astra 的能力边界真如泄露所述，AI Coding 的竞争焦点将从「单次代码生成质量」转向「长程任务自治 + 多 Agent 协作」。这对 Cursor、Claude Code、Codex 等工具既是能力对标压力，也是产品形态重新定位的信号。

## OpenAI 终止向 Cursor 供应模型：API 中立性瓦解

8 月 28 日，OpenAI 宣布将于 **2026 年 11 月 12 日**起停止向 Cursor 直接供应模型。触发点是 SpaceX 在 8 月 14 日以约 **600 亿美元**全股票收购 Cursor 母公司 Anysphere 后，OpenAI 启动了合同中的「控制权变更」取消条款。

OpenAI 在声明中表示，这一决定「极其艰难」，但无法确认 SpaceX 会遵守服务条款，并援引了此前与马斯克控制公司（X / Twitter 合同违约、xAI 承认违反 OpenAI ToS）的纠纷作为依据。未来模型（包括 Astra）也不会再提供给 Cursor；缓冲期内开发者仍可继续使用现有 OpenAI 模型，之后只能通过自带 API Key 接入（如果 Cursor 仍支持）。

Cursor 联合创始人 Michael Truell 回应称，OpenAI 模型仅占 Cursor 流量的约 **5%**，Cursor 已接入 Anthropic、Google 和 SpaceXAI 模型，Anthropic 也表示将增加对 Cursor 中 Claude 模型的算力支持。但 OpenAI 这一举动本身的影响远超 5% 流量：它标志着头部模型 API 正在从「公用事业」变成受竞争关系约束的战略资源。

**值得关注的原因**：对企业而言，「在 Cursor 里用 GPT」曾是一个低摩擦的合规通道；11 月之后，这条通道将关闭。依赖 OpenAI 模型 + Cursor 工作流的团队需要在 10 周内完成迁移评估：是换模型、换 IDE，还是直接通过 API Key 接入？这也给所有基于第三方 API 的产品敲响警钟——模型供应链的稳定性越来越取决于上游的竞合关系。

## 腾讯混元开源 Hy4 preview：770B / 1M 上下文的生产力模型

8 月 28 日，腾讯混元发布并开源新一代大模型 **Hy4 preview**，采用 MoE 架构：

- **总参数 770B**，激活参数 49B；
- **上下文长度 1M tokens**；
- **Apache 2.0 开源**，权重已上架 Hugging Face；
- 同步上线 WorkBuddy、CodeBuddy、元宝、ima 及腾讯云 TokenHub、OpenRouter。

Hy4 preview 明确面向「生产力场景」：软件工程、办公分析、游戏开发、科学研究。官方给出的部分基准提升包括：Terminal-Bench 2.1 从 Hy3 的 70.8 提升到 85.4，DeepSWE 从 28.0 提升到 64.3，Toolathlon-Verified 从 56.2 提升到 74.1。在腾讯内部 163 名专家、203 个工程任务的盲测中，Hy4 preview 均分 2.99，略优于 GLM 5.3（2.92）和 Kimi K3（2.94）。

定价上，输入约 6 元 / 百万 tokens、输出 18 元 / 百万 tokens，显著低于多数闭源旗舰模型。官方也坦承这是早期版本，预训练和后训练仍有提升空间，且目前无多模态能力。

**值得关注的原因**：Hy4 preview 的开源许可证、1M 上下文和低价 API 组合，对需要长代码库理解、复杂 Agent 工作流的企业是一个「可自托管 + 可高并发」的新选项。对于国内开发者，它还解决了跨境模型调用的合规与延迟问题。

## Anthropic 发布模型硬件标准 MHS：让 Agent 操作物理设备

8 月 27 日，Anthropic 发布 **Model Hardware Standard（MHS）** 研究预览版。这是继 MCP 之后，Anthropic 在「模型与外部系统交互」上的又一协议层尝试，但目标从软件工具扩展到了物理设备。

MHS 的核心思路是用标准化驱动把显微镜、液体处理仪、机械臂、量子计算机激光器等可编程设备统一接入 AI Agent：

- **设备发现**：每台设备以标准格式暴露自己的能力、可读取/写入参数和安全限制；
- **自然语言标签**：用户可用自然语言描述设备特性（如机械臂重量、激光功率上限），驱动自动生成 Agent 可理解的参考文件；
- **三种控制方式**：MCP、命令行、代码文件，支持 Agent 在线指挥或离线连发命令；
- **多设备并行**：Agent 可同时编排多个仪器完成药物发现实验、激光校准等长程任务。

首批合作方包括 HHMI Janelia、AWS（Strands Robots）、Doosan Robotics、Universal Robots、QIAGEN、Tecan、Automata、Danaher、Hugging Face（LeRobot）和 Raspberry Pi。Anthropic 计划在完成安全评估后开源 MHS。

**值得关注的原因**：MHS 试图解决科研和制造业长期存在的「设备接口碎片化」问题。如果它成为事实标准，Agent 将不仅能写代码，还能直接操作实验设备、调整产线参数。这对具身智能、自动化实验室和智能制造都是关键基础设施。但物理世界的安全边界比软件更难撤销，MHS 的成败将取决于安全评估和实际部署中的可靠性。

## Hugging Face × Pollen 推出 Microduck：399 美元的开源双足机器人

同样在 8 月 27 日，Hugging Face 旗下 Pollen Robotics 开放 **Microduck** 预购：一台 25 厘米高、重不到 800 克的双足机器人，售价 **399 美元**（税前及运费前）。

Microduck 的硬件规格瞄准「可负担的研究平台」：

- 15 个电机、前置摄像头、微型 LiDAR、双 IMU、可夹取喙部；
- 板载 50Hz 控制策略，本地推理，不依赖云端；
- 出厂预置 7 种行为：行走、坐下/站起、踢腿、夹取、轮滑、摔倒自恢复。

但真正让它与众不同的是软件栈：SDK、基于 MuJoCo 的仿真环境、完整强化学习训练管线均已以 **Apache 2.0** 开源在 GitHub（`pollen-robotics/microduck` 和 `pollen-robotics/microduck_rl`）。用户可以在仿真中训练新策略，通过 domain randomization 和 BAM 执行器模型完成 sim-to-real 迁移，再导出 ONNX 部署到机器人上。首批交付目标为 2026 年圣诞节前。

**值得关注的原因**：在 2026 年人形机器人动辄数万至数十万美元、本体与软件绑定的背景下，Microduck 把「物理 AI 实验」的门槛压到一部手机的价格。对学生、独立研究者和教育场景来说，这可能是 RL + 具身智能普及的 iPhone moment。但它不是工业级方案，载荷、续航和传感器能力有限，更适合作为算法和 sim-to-real 研究的起点。

## 今日看点

- **AI Coding 进入「模型供应链 + 长程自治」双维度竞争**：Astra 的传闻、Cursor 断供、Hy4 开源三件事共同说明，Coding Agent 的护城河不再只是模型能力，还包括模型获取的稳定性、价格和多 Agent 编排协议。
- **具身智能的「软件层」开始标准化**：MHS 试图统一设备接口，Microduck 试图普及硬件入口。两者一高一低，分别对应科研/工业设备和教育/研究市场。
- **开源与闭源的边界继续模糊**：Hy4 和 Microduck 都是大公司背景下的开源产品，它们的生态控制力不一定弱于闭源方案。评估「开源价值」时，需要同时看许可证、配套基础设施和社区可持续性。

## 来源

- 腾讯研究院 AI 速递 20260831 — <https://www.sohu.com/a/1069745836_455313>
- GPT-Astra: September Launch Rumors and First Leaks — <https://agihunt.info/en/story/1a047f83d4f1813f500d2a0ee88>
- OpenAI next-generation model 'Astra' details emerge (DigitalToday) — <https://www.digitaltoday.co.kr/en/view/97923/openai-next-generation-model-astra-details-emerge>
- OpenAI Is Pulling Its AI Models From Cursor Following SpaceX Acquisition — <https://cybersecuritynews.com/openai-models-ends-with-cursor/>
- OpenAI plans to end Cursor model deal after SpaceX takeover, setting Nov. 12 cutoff — <http://www.mlq.ai/news/openai-plans-to-end-cursor-model-deal-after-spacex-takeover-setting-nov-12-cutoff>
- 腾讯发布并开源 Hy4 preview — <https://www.tencent.com/zh-cn/tencent-releases-and-open-sources-tencent-hy4-preview/>
- Tencent Open-Sources Hy4 Preview: A 770B Mixture-of-Experts Model Built for Productivity Work — <https://caimpare.ai/articles/tencent-open-sources-hy4-preview-a-770b-mixture-of-experts-model-built-for-productivity-work>
- Previewing the Model Hardware Standard — <https://www.anthropic.com/news/model-hardware-standard-research-preview>
- Anthropic Unveils Model Hardware Standard for AI Agents to Operate Physical Devices — <https://insideai.news/news/agentic-ai/anthropic-unveils-model-hardware-standard-for-ai-agents-to-operate-physical-devices/9227>
- Microduck — A tiny biped robot you can teach new tricks — <https://pollen-robotics.com/microduck/>
- Microduck press kit — <https://pollen-robotics.com/microduck/press-kit/>

---

*配图建议：封面 800×450，当前使用默认 `/images/covers/briefing-default.svg`；如需自定义，建议路径 `/images/covers/astra-cursor-hy4-mhs-microduck-2026-08-31.svg`。正文如需插图，建议路径 `/images/posts/2026/astra-cursor-briefing/`。*
