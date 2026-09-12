---
title: 自我迭代 Agent、扩散模型测提速、具身落地与 AI 编排攻击
date: 2026-09-12
categories: briefing
tags: [ai, llm]
excerpt: 华为 openJiuwen 把 RSI 递归自改进框架落地 WorkSwarm，Harness 优化使 SWE-bench Lite Dev 通过率从 61% 提升至 87%；清华 DiffuTester 利用结构模式挖掘让扩散语言模型生成单元测试提速 2-3x，被 EMNLP 2026 接收；2026 外滩大会与杭州国际具身智能展同日收官，40 余家具身厂商落地药房、洗衣房、咖啡店等真实场景；PaperCut 攻击者用数百个 AI 智能体 26 秒攻陷 11 家组织，Anthropic 9 月威胁报告同步指出 AI 已从"工具"演化为"行动基础设施"。
cover: /images/covers/briefing-default.svg
---

今天 AI 领域出现了四股并行的力量：**AI coding** 侧，华为 openJiuwen 把"Agent 自我迭代"做成可观测的工程闭环，清华大学 DiffuTester 用结构模式挖掘把扩散语言模型测生成提速 2-3x；**具身智能**侧，外滩大会与杭州国际具身智能展同日收官，多家厂商在药房、洗衣房、咖啡店、工厂车间"真干活"；**安全侧**，PaperCut 攻击者用数百个 AI 智能体在 26 秒内攻陷 11 家组织，Anthropic 发布 9 月威胁报告，AI 已从"工具"演化为"行动基础设施"。

## 华为 openJiuwen RSI 框架落地 WorkSwarm，Harness 优化提点 26 个百分点

9 月 11 日，华为开源 Agent 平台 openJiuwen 宣布把完整的 **RSI（Recursive Self-Improvement，递归自我改进）框架**落地到蜂群办公智能体 WorkSwarm，支持 Harness 与 Artifacts 双维度优化，并在科研论文、算法程序两类交付物上验证可用性。

### 核心能力

- **双维度优化**：Harness 优化面向 Prompt、Skill、Tool、Rail 等"工作装备"，Artifacts 优化面向科研论文和算法程序等交付产物
- **算力亲和**：依托昇腾 NPU，把 Agent Hint 传给推理引擎，主动调度 KV Cache（等待时卸载低成本存储、恢复前预取），优化多轮迭代的时延与资源占用
- **可观测实验**：WorkSwarm 内新增"实验"模式，用户可像创建普通任务一样发起 Harness 或产物优化，全程展示 RSI 树搜索、得分曲线、用量与版本差异

### 实战效果

| 实验 | 基准 | 优化前 | 优化后 | 提升 |
|------|------|-------|-------|------|
| Harness 优化（DeepSeek-V4-Flash，5 Epoch） | SWE-bench Lite Dev（23 题） | 61.0% | 87.0% | +26.0pp |
| Harness 优化（冻结后） | Evo-Bench General 64（独立题） | 60.9% | 71.9% | +11.0pp |
| 算力亲和（科研程序优化场景） | TTFT P90 | 基准 | -19.16% | ↓ |
| 算力亲和 | KV Cache 命中率 | 7.53% | 14.36% | +6.83pp |

需要说明的是，RSI 的本质是"拿算力换智力"——一次完整实验动辄成千上万次模型调用。openJiuwen 通过算力亲和把 HBM 与 DDR 峰值使用率分别降低 22.82% 与 30.74%，让持续迭代的成本可控。

**值得关注的原因**：今年 6 月 openJiuwen 已发布 Auto Harness，让 Agent 自动优化自己的工作装备；本次 RSI 框架补齐了"Artifacts 优化"维度，让科研论文、算法程序这些交付物也能持续打磨。这是首个将 Harness 与 Artifacts 双维度同时优化并向普通用户产品化的开源框架。开发者可在鸿蒙/Windows/Mac 一键下载 WorkSwarm 体验。

## 清华 DiffuTester：扩散语言模型单元测试提速 2-3x（EMNLP 2026）

清华大学人工智能学院 AIAgent 课题组提出的 **DiffuTester** 被 EMNLP 2026 接收。该框架针对扩散语言模型（dLLM）在单元测试生成场景中的速度-质量权衡问题，通过挖掘同一被测方法多个测试用例之间的共享结构模式，让模型在每一步去噪过程中解码更多 token，在不损失测试覆盖率的前提下实现 2-3x 加速。

### 核心思路

单元测试存在天然的结构重复性：同一个被测方法通常需要多个用例覆盖不同分支，代码骨架高度相似。DiffuTester 的关键观察是：**这些结构模式可以通过 AST 抽象语法树动态识别，并作为额外解码信号使用**。

### 技术流程

1. 在每个去噪步骤中，先执行模型原本基于置信度的解码，保留最有把握的一部分 token
2. 对当前 batch 中尚未完全生成的测试用例构建 AST，合并不同 AST 识别共享结构
3. 与公共结构对应的 token 被额外保留，模型在一次推理中解码更多内容
4. 逐行解析 AST（避免早期语法错误干扰结构挖掘），且只保留置信度高于阈值的 token

### 兼容性与扩展

DiffuTester 与基于 KV Cache 的加速方法天然兼容，可叠加。在 DiffuCoder 和 Dream 两个代表性 dLLM、Python/C/Java 三种语言、TestEval 基准上验证均有效——在保持峰值覆盖率的同时，可实现最高约 2-3x 生成加速。

```python
# 安装与运行（论文已开源）
pip install -r requirements.txt
./run_all.sh  # 复现主实验结果
```

论文：[arXiv:2509.24975](https://arxiv.org/abs/2509.24975) ｜ 代码：[github.com/TsinghuaISE/DiffuTester](https://github.com/TsinghuaISE/DiffuTester)

**值得关注的原因**：扩散语言模型是当前代码生成模型的并行加速方向之一，但 dLLM 的并行优势在单元测试生成场景中天然契合（同一被测方法需要多个用例）。DiffuTester 用"结构模式"而非"增加每步 token 数"的激进策略，避免了 quality collapse，体现了对 dLLM 解码机制的精细理解。

## 外滩大会与杭州具身智能展同日收官：机器人从"炫技"走向"真干活"

9 月 9-12 日，2026 Inclusion·外滩大会与 2026 杭州国际具身智能与人形机器人展览会同期收官。两条主线同时指向一个判断：具身智能正处于"黎明前期"，关键能力开始出现，但从"能做"到"能用"还需要跨越系统工程、数据、算力和场景泛化等多重门槛。

### 外滩大会：40 余家具身厂商落地真实场景

超过 40 家具身智能厂商在外滩大会集中亮相，机器人不再只展示"跳舞、弹琴"，而是进入药房、洗衣房、咖啡店、工厂车间等真实场景作业：

- **零售药房**：搭载蚂蚁灵波通用大脑的机器人，在 80 厘米窄通道中自主完成订单接收、药品识别、分拣与交付，已在上海国大药房真实门店承担夜班分拣
- **制造业**：复旦大学眸深具身大模型驱动的轮式双臂机器人，可识别洗衣机螺栓结构与装配孔位，自主完成抓取、定位、插入、拧紧
- **生活服务**：擎朗人形机器人在洗衣房协同完成取衣、开关机、折叠等长程任务；开普勒机器人进入狭小咖啡店独立完成取杯、制饮与清洁
- **高危作业**：辰行远略飞行智能体与机器狗进入核电、地铁、水厂等无 GPS、无光或强干扰受限空间，自主巡航、避障、识别缺陷

蚂蚁阿宝同期展示"8 小时外生活圈"：将餐饮、出行、购物、家政等零散需求交给同一个智能体串接，覆盖万余项服务 AI 化适配，并已打通手机、车机、智能眼镜等终端。

### 杭州具身展：全产业链 350+ 品牌亮相

2026 杭州国际具身智能与人形机器人展览会落地杭州国际博览中心，规划展览面积 20000㎡，汇聚 350+ 参展品牌、5 万专业观众。作为全国首个为具身智能机器人产业立法的城市，杭州已出台《杭州市促进具身智能机器人产业发展条例》及"强链补链"三年行动方案，目标到 2027 年实现产业链工业总产值超 500 亿元。

### 业内研判

在 9 月 11 日的"具身智能是否有泡沫"论坛上，多位嘉宾给出了各自的判断：

- 至简动力贾鹏：当前"泡沫"更多是阶段与估值的错配；按模型能力看，已表现出部分 ICL（上下文学习）能力，但以"真正形成生产力"为标准可能还需要 **3-4 年甚至 4-5 年**
- 大晓机器人王晓刚："我们处在黎明的前期"，最大卡点是数据能否推动机器人形成更强的泛化能力
- 苏度科技韩铮：相比 LLM 2018-2019 阶段，关键技术框架已出现，更大的挑战是把不同技术整合成商业可用、高可靠、具有泛化能力的大系统
- 22 岁创业者陈博远（逆矩阵科技）：物理 AI 基模最终必须进入真实世界，形成"端-边-云"一体化平台，"边缘情况不是长尾，而是常态"

**值得关注的原因**：当模型能力逐渐趋同，具身智能的下一个竞争维度已从"机器人能做什么"转向"场景、数据、基础设施能否跟上"。"一脑多机"、泛化能力、零样本部署成为高频词；行业不再比拼出货量，转向关注真实应用与稳定泛化能力。

## PaperCut 全球 AI 编排攻击 + Anthropic 9 月威胁报告：AI 从"工具"到"行动基础设施"

9 月 9 日，GreyNoise 与 Blackpoint 同步披露 **PaperCut NG/MF 全球攻击行动**：一个疑似俄语背景的攻击者借助数百个 AI 智能体，针对 CVE-2026-81578（认证绕过）与 CVE-2026-82078（不安全动态类加载）链式利用，至少攻陷 440 台 PaperCut 实例，涉及 48 个国家的 395 家组织。

### 攻击流水线

支撑这套编排体系的并非单一模型，而是 **OpenAI Codex 作为执行 harness + DeepSeek 模型作为执行模型**，再配合 Mimikatz、Rubeus、Certipy、Impacket、Metasploit 等成熟攻击工具，以及 AionUI、Hindsight（智能体持久记忆）等编排工具。

### 关键时间线（按 GreyNoise 还原）

- 8 月 31 日 14:44 UTC：创建工作区，开始用 AI 分析补丁差分
- 16:35：搭建本地实验室（含 AD 域控 + PaperCut 服务器）
- 16:09：构建多线程扫描工具，识别 462 个潜在漏洞目标
- 9 月 1 日 08:30：战役正式启动，数百个 AI 智能体发起打击
- 首小时：78 家组织沦陷，其中 8 家被拿下域控
- 战役峰值：**26 秒连续攻陷 11 家组织**
- 最快单点突破（美国某高中）：初始访问 → 完全控制域控 **7 分钟**

12 起域控沦陷案例中，最快 5 分钟、最长 144 分钟；部分受害环境中初始访问与提权之间存在数天间隔——并非防御起了作用，而是 AI 流水线带来的"产能过剩"已经超出了攻击者自身"消化"战果的能力。

### Anthropic 9 月威胁情报报告

同一天（9 月 10 日），Anthropic 发布《Detecting and countering misuse of AI: September 2026》，梳理 2025 年 12 月至 2026 年 8 月期间中断的七类滥用行为（网络作战、影响力行动、监控、诈骗与欺诈、生物滥用、常规武器开发、非法蒸馏）。报告核心结论：

- **"复杂攻击不再需要复杂攻击者"**：AI 已显著缩小了高资源国家行为者与个体操作者之间的劳动力与工具鸿沟
- **从助手到编排者**：多数网络作战案例中，AI 已贯穿侦察、工具开发、权限获取、维持访问、情报分析与外泄多个阶段
- **vibe hacking 模式兴起**：ShinyHunters 相关攻击者只需给出宽泛目标，模型自主评估环境、写脚本、迭代执行，操作员甚至不必完全理解目标环境
- **机器速度的网络杀伤链**：从拿到初始访问到云管理员控制的案例中，平均耗时已压缩到 **3 小时左右**
- **AI 供应链成为战场**：Anthropic 同步披露了 7 个中国实验室涉嫌对 Claude 进行"非法蒸馏"以提升自研模型的行动

**值得关注的原因**：两起事件从攻防两端印证同一趋势——AI 不再是攻击者的辅助工具，而是行动基础设施本身。值得注意的还有：在至少一次针对疑似漏洞实例的攻击中，**Cloudflare WAF 成功挫败了攻击者**；440 个受害实例中最终拿下域控的只有 12 个——基础性的环境加固、补丁管理、AD 纵深防御在 AI 时代依然有效。同时 Anthropic 报告引用的"封闭循环"风险（攻击者使用 AI 实时修改规避检测）将再次推高防御侧的响应要求。

## 来源

- [openJiuwen RSI 框架发布（机器之心）](https://www.jiqizhixin.com/articles/openjiuwen-rsi)
- [WorkSwarm 产品官网](https://openjiuwen.com/workswarm)
- [DiffuTester 论文 arXiv:2509.24975](https://arxiv.org/abs/2509.24975)
- [DiffuTester 代码 GitHub: TsinghuaISE/DiffuTester](https://github.com/TsinghuaISE/DiffuTester)
- [澎湃新闻：具身智能是否有泡沫？CEO们等待从能做到能用](https://www.163.com/dy/article/L6K16KVN0514R9P4_pdya11y.html)
- [中新网：2026 外滩大会在上海举行，40 余家具身厂商集中亮相](https://www.chinanews.com/cj/2026/09-11/10694623.shtml)
- [杭州国际具身智能与人形机器人展览会官方介绍](https://www.globalomp.com/expo/23863)
- [中国青年网：2026 外滩大会主论坛阵容发布](https://d.youth.cn/newtech/202609/t20260911_16864228.htm)
- [GreyNoise PaperCut 攻击报告 "Agents Gone Wild"](https://cypro.co.uk/insights/cyber-bulletins/papercut-flaws-exploited-by-hundreds-of-ai-agents)
- [TechRepublic: AI Agents Help Hackers Compromise 440 PaperCut Servers](https://www.techrepublic.com/article/news-papercut-ai-agents-compromise-440-servers/)
- [Anthropic 9 月威胁情报报告](https://www.anthropic.com/threat-intelligence-report-september-2026)
- [CIOL: Anthropic Report Warns AI Is Enabling More Autonomous Cyberattacks](https://www.ciol.com/tech/anthropic-ai-autonomous-cyberattacks-threat-intelligence-report-12520699)