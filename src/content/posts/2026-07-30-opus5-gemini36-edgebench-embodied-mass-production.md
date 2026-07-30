---
title: Opus 5 登场，Gemini 3.6 Flash 上位，具身量产破十万
date: 2026-07-30
categories: briefing
tags: [ai, ai-coding, embodied-intelligence, llm]
excerpt: 本周 AI 双线加速。Claude Code v2.1.220 将 Opus 5 设为默认 Opus 模型，1M 上下文 + 沙箱网络白名单；Google Gemini 3.6 Flash 接棒 Managed Agents 默认模型，token 消耗降 17% 并内置 Computer Use；字节 Seed 团队 EdgeBench 发现 Agent 环境学习速度每三个月翻倍的新 Scaling Law；工信部确认 2026 上半年国内人形机器人产量超 4 万台，车企密集入局开启量产元年；Poolside 开源 118B 编程模型 Laguna S 2.1，单台 DGX Spark 即可运行。
cover: /images/covers/briefing-default.svg
---

7 月最后一周，AI Coding 与具身智能两条主线同时出现标志性节点。模型层，Anthropic 和 Google 同周更新旗舰编程模型；研究层，字节 Seed 团队首次量化了 Agent 从环境中学习的速度规律；产业层，工信部确认国内人形机器人产量半年破 4 万台，量产元年正式开启。以下是 5 条最值得关注的动态。

## Claude Opus 5 登场 Claude Code，1M 上下文 + 沙箱安全升级

7 月 25 日，Anthropic 发布 Claude Code v2.1.220，正式引入 **Claude Opus 5**（`claude-opus-5`）作为默认 Opus 模型。这是继 6 月 30 日 Sonnet 5 发布后，Anthropic 在一个月内完成的第二次旗舰模型迭代。

**关键更新**：

- **Opus 5 定位**：支持 1M token 上下文窗口，快速模式定价 $10/$50 per Mtok（输入/输出），取代 Opus 4.8 成为 Claude Code 中的默认 Opus 模型；
- **Opus 4.7 退役**：从快速模式中移除，Opus 4.8 仍可选；
- **沙箱网络白名单**：新增 `sandbox.network.allowed_domains` 设置，开发者可精确控制 Agent 在沙箱环境中能访问的网络域名，防止数据外泄；
- **子代理嵌套深度提升至 3 层**：支持更复杂的多 Agent 协作编排；
- **Fable 模型临时受限**：作为 advisor 可用但存在已知问题，Anthropic 正在修复。

**为什么值得关注**：Opus 5 的发布节奏意味着 Anthropic 已进入"月度旗舰迭代"模式。更重要的是，沙箱网络白名单和子代理嵌套深度的提升，指向了 Claude Code 从"编码助手"向"安全 Agent 平台"的定位迁移——开发者现在可以构建更深层的多 Agent 工作流，同时精确控制每个 Agent 的网络访问边界。

## Gemini 3.6 Flash 接棒 Managed Agents，token 效率提升 17%

7 月 28 日，Google 宣布 **Gemini 3.6 Flash** 正式成为 Gemini API Managed Agents 的默认模型，同步推出环境钩子（Environment Hooks）、预算控制和定时触发等 Agent 基础设施能力。

**3.6 Flash 核心数据**：

- **token 效率**：根据 Artificial Analysis 指数，输出 token 消耗比 3.5 Flash 减少 17%；在 Datacurve DeepSWE 等部分基准中降幅高达 65%；
- **编程能力**：SWE-Bench Pro 从 55.1% 提升至 58.7%，DeepSWE v1.1 从 37% 跃升至 49%，MLE-Bench 从 49.7% 拉到 63.9%；
- **Computer Use**：OSWorld-Verified 从 78.4% 升至 83%，并作为 Gemini API 和企业版的内置工具开箱即用；
- **定价**：输入 $1.50 / 输出 $7.50 per Mtok，低于 3.5 Flash 的 $1.50 / $9.00；
- **知识截止日期**：从 2025 年 1 月推进至 2026 年 3 月。

**Managed Agents 基础设施升级**：

- **Environment Hooks**：支持在沙箱内对每次工具调用执行前置/后置脚本，可实现安全拦截、代码格式化、自动验证等流水线；
- **预算控制**：通过 `max_total_tokens` 限制 Agent 总消耗，到达上限后安全暂停并保留环境状态，支持续跑；
- **定时触发**：将 Agent、环境、prompt 和 cron 计划绑定为持久化资源，无需人工干预即可定期执行；
- **免费层开放**：Managed Agents 现已向未启用计费的项目开放。

**为什么值得关注**：Google 此次的发布重点不在模型参数，而在 Agent 工程化基础设施。Environment Hooks 让远程沙箱中的 Agent 行为变得可审计、可拦截，预算控制让长任务 Agent 的成本变得可预测——这些能力直接回应了生产环境中"Agent 跑飞了怎么办"的核心焦虑。

## 字节 EdgeBench：Agent 环境学习速度每三个月翻倍

字节跳动 Seed 团队 7 月初发布 EdgeBench（arXiv:2607.05155），首次系统量化了 AI Agent 从真实环境中的学习规律，发现了一条与预训练 Scaling Law 平行的新增长曲线。

**研究方法**：

- **134 个真实任务**：覆盖科学发现、软件工程、组合优化、知识工作、形式化数学和交互游戏六大领域，每个任务支持 12 小时以上连续运行，部分延长实验超过 72 小时；
- **约 38,000 小时**环境交互数据，追踪 5 个前沿模型在超长时程任务中的表现变化；
- 51 个任务和完整评测框架已开源（edge-bench.org）。

**核心发现**：

- **Log-sigmoid 学习曲线**：Agent 的环境学习轨迹精确遵循对数 S 形曲线（R² = 0.998），即"前慢—中快—后平台"的三段式增长；
- **学习速度每三个月翻倍**：对比 2025 年 9 月至 2026 年 4 月发布的 6 代前沿模型，Agent 从环境中学习的速度大约每三个月翻一倍。这意味着 2025 年 9 月最强模型 2 小时能学到的能力，2026 年 3 月的最强模型只需 1 小时；
- **案例**：GPT-5.5 在引力波任务的 12 小时运行中，通过 247 次评分尝试将分数从 42.8 提升至 67.0，关键跃升来自 Agent 根据反馈重新拆解问题。

**为什么值得关注**：这条"环境学习 Scaling Law"与预训练 Scaling Law 形成了双轴增长结构。如果翻倍趋势持续，2027 年初最强 Agent 在 2 小时内的学习能力将是现在的约 16 倍。对 AI Coding 而言，这意味着"给 Agent 足够时间，它就能学会"不再是一句口号，而是一条可预测的工程曲线——产品设计的核心变量将从"模型初始能力"转向"环境反馈质量"。

## 人形机器人量产元年：上半年超 4 万台，车企密集入局

7 月 29 日，多条消息交叉印证：中国人形机器人产业正式进入规模化量产阶段。

**工信部数据**：

- 2025 年国内人形机器人产量约 2 万台；
- **2026 年上半年已超 4 万台**，预计全年超过 10 万台；
- 工信部副部长柯吉欣判断：未来两三年是产业从"单机样机、舞台展示"走向"批量交付"的关键窗口。

**车企密集入局**：

- **比亚迪**：自研人形机器人将于 8 月通过"迪空间"正式亮相；
- **小鹏**：IRON 人形机器人 7 月 24 日在广州工厂开启小批量试生产，2026 年底月产能目标突破 1000 台；
- **理想**：项目代号"Nexus"，规划"双轮"与"双足"两款产品，双轮版面向工厂场景计划年内发布；2026 年研发投入预计 120 亿元，AI 相关占比约 50%；
- **特斯拉**：Optimus Gen-3 首批量产机型已在弗里蒙特工厂下线，原 Model S/X 产线将升级为机器人专属产线，设计年产能 100 万台。

**供应链国产化**：

- 深圳某无框电机企业 2026 年上半年在手订单突破 100 万台，较 2025 全年增长 9 倍；
- 人形机器人核心零部件国产化率超 90%，核心算力板卡实现 100% 国产化；
- 首钢智新完成 0.2mm 超薄人形机器人专用电工钢量产验证，铁损较常规产品降低 20%-30%；
- 近 20 家海内外车企已入局，智能汽车与人形机器人技术重合度超 70%。

**为什么值得关注**："年产 10 万台"是一个产业从实验室走向工厂的分水岭数字。车企的密集入局不是跟风——汽车制造工厂本身就是人形机器人最理想的商业化首站，而自动驾驶积累的 VLA 模型、感知算法和供应链能力可以直接迁移。当量产规模越过临界点，单位成本快速下降将打开更多场景，形成正循环。

## Poolside Laguna S 2.1：118B 开源编程模型，单机可运行

7 月 21 日，Poolside 发布 **Laguna S 2.1**，定位为"西方最强开源编程模型"，直接对标中国实验室的开源编程模型生态。

**模型规格**：

- **118B 总参数**，MoE 架构，每 token 激活 8B 参数；
- **1M token 上下文窗口**，支持思考/非思考两种推理模式；
- **开源协议**：OpenMDW-1.1（允许商用），提供 BF16、FP8、INT4、NVFP4、GGUF、MLX 多种量化格式；
- **硬件需求**：单台 NVIDIA DGX Spark 即可运行（约 75GB 显存），Apple M5 Max 128GB 上 Q4_K_M 量化可达 49 tok/s。

**基准表现**：

| 基准 | Laguna S 2.1 (118B-A8B) | 对比 |
|------|--------------------------|------|
| Terminal-Bench 2.1 | 70.2% | 超过 DeepSeek V4-Pro-Max (64.0%)、Nemotron 3 Ultra (56.4%) |
| SWE-Bench Multilingual | 78.5% | 接近 Qwen-3.7 Max (78.3%)、Claude Sonnet 5 (80.4%) |
| SWE-Bench Pro | 59.4% | 超过 DeepSeek V4-Flash (52.6%) |
| DeepSWE v1.1 | 40.4% | 接近 Claude Sonnet 5 (54.0%) |

**战略定位**：Poolside 联合 CEO Jason Warner 直言："西方需要可以信任、可以运行、可以构建的开源模型。Laguna S 2.1 就是我们的答案。"该模型面向政府、国防和高度监管企业，核心卖点是将高_volume 编程 Agent 工作从计量 API 迁移到自有硬件上，实现数据不出域。

**为什么值得关注**：过去一年，最强开源编程模型几乎全部来自中国实验室（DeepSeek、Qwen、Kimi）。Poolside 是第一家以 118B 参数量在 Terminal-Bench 上打到 70 分以上的西方公司，虽然距离 Kimi K3（88.3%）和 GPT-5.6 Sol（88.8%）仍有差距，但它的意义在于：验证了"小而精"的 MoE 架构路线在编程任务上的可行性，同时为数据主权敏感的场景提供了一个非中国系的开源选项。

## 来源

1. [Claude Code v2.1.220 Release Notes — GitHub](https://github.com/anthropics/claude-code/releases/tag/v2.1.220)
2. [Gemini API Managed Agents: 3.6 Flash, hooks, and more — Google Blog](https://blog.google/innovation-and-ai/technology/developers-tools/expanding-managed-agents-gemini-api-3-6-flash-hooks/)
3. [Gemini 3.6 Flash 与 3.5 Flash-Lite 发布 — 腾讯新闻](https://new.qq.com/rain/a/20260728A0043V00)
4. [Gemini 3.6 Flash Model Evaluation — Google DeepMind](https://storage.googleapis.com/deepmind-media/gemini/gemini_3_6_flash_model_evaluation.pdf)
5. [EdgeBench: Unveiling Scaling Laws of Learning from Real-World Environments — arXiv:2607.05155](https://edge-bench.org/paper.pdf)
6. [字节 Seed 发布 EdgeBench — ByteDance Seed Blog](https://seed.bytedance.com/zh/blog/edgebench-measuring-real-world-environment-learning-and-discovering-a-new-scaling-law)
7. [车企密集入局造人，人形机器人量产元年开启 — 网易](https://www.163.com/dy/article/L30TUULG0534A4SC.html)
8. [从核心零部件到整机自主可控、批量出货 — 央视网](https://news.cctv.cn/2026/07/29/ARTI5cUxQubJbewO3Nj7lL46260729.shtml)
9. [港股汽车股全线走强，车企密集布局人形机器人赛道 — 新浪港股](https://cj.sina.com.cn/article/norm_detail?url=https%3A%2F%2Ffinance.sina.com.cn%2Fstock%2Fhkstock%2F2026-07-29%2Fdoc-inikmytp5906409.shtml)
10. [Poolside releases Laguna S 2.1 — Poolside Blog](https://poolside.ai/blog/introducing-laguna-s-2-1)
11. [Poolside releases Laguna S 2.1, the West's most capable open-weight model — GlobeNewswire](https://www.globenewswire.com/news-release/2026/07/21/3330818/0/en/Poolside-releases-Laguna-S-2-1-the-West-s-most-capable-open-weight-model.html)
