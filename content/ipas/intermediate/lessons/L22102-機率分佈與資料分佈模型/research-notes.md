# Research Notes: L22102 機率分佈與資料分佈模型

Research conducted 2026-04-20 for iPAS AI 應用規劃師中級（以 115 年度簡章、114.04 評鑑內容範圍、114 年 9 月樣題、114 年第二梯次公告試題、SciPy 官方文件為主）。

## Official Sources
- [iPAS 115 年度 AI 應用規劃師能力鑑定簡章（2026-04-10）](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0410_20260410115646.pdf): 中級考試日為 2026-05-23；科目二為「大數據處理分析與應用」，通過後對應資料分析組證書定位，可作為本 lesson 的正式考科邊界依據。
- [AI 應用規劃師培訓資源／學習指引頁](https://www.ipas.org.tw/AIAP/AbilityPageContent.aspx?pgeno=263534ef-6ab9-4ce9-a9be-4ad9a4ed7440): 官方已提供中級科目二學習指引，並明示學習指引用途是「掌握評鑑方向」與「考題解析」，但不是正式教材或題庫。
- [AI 應用規劃師中級學習指引上線公告](https://www.ipas.org.tw/AIAP/AbilityNewsData.aspx?nwsno=d09fc227-261a-40e9-b34a-8a1d093a4341): 再次確認學習指引是官方備考材料，查閱路徑為 iPAS 專區 > 培訓資源 > 學習指引。
- [AI 應用規劃師能力鑑定_評鑑內容範圍參考（114.04）](https://www.ipas.org.tw/DownloadFile.ashx?filename=14ae134c-fb2f-4741-9f6d-062c02bdbc94_AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%A9%95%E9%91%91%E5%85%A7%E5%AE%B9%E7%AF%84%E5%9C%8D%E5%8F%83%E8%80%83_11404.pdf&type=10): 官方評鑑範圍參考是目前最適合校正 L22102 與其他章節邊界的文件；寫作時應以 114.04 版用語為準。
- [iPAS AI 應用規劃師中級能力鑑定_考試樣題（114 年 9 月版）](https://www.ipas.org.tw/DownloadFile.ashx?filename=4002eaa2-bfea-400e-abd1-2f4c1a1f8de8_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E4%B8%AD%E7%B4%9A%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A-%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C%28114%E5%B9%B49%E6%9C%88%E7%89%88%29+_v2.pdf&type=10): 官方樣題目前沒有直接看到 PMF/PDF/CDF/Poisson 題，但可確認中級科目二仍以單選情境題為主，且資料分析題目會混合統計觀念與方法選擇。
- [AI 應用規劃師樣題更新與新增中級題型說明公告](https://www.ipas.org.tw/AIAP/AbilityNewsData.aspx?nwsno=a443b352-e677-4e4f-9b27-0fc0d7c23d02): 官方明示自 114 年第二次中級起，科目二與科目三新增程式邏輯判斷題型；L22102 應納入 `scipy.stats` 基本讀碼能力。
- [114 年第二梯次中級 AI 應用規劃師第二科公告試題（2025-11-20 公告）](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000634.pdf): 已直接考到 CDF 定義、二項分佈常態近似條件、Poisson 分佈適用條件，以及 `poisson.pmf` / `poisson.cdf` 語意判讀，這是本 topic 最有力的「實際考什麼」證據。
- [scipy.stats.norm](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.norm.html): 官方文件明示 `loc` 是平均數、`scale` 是標準差；可直接支撐 Normal(μ, σ²) 與 z-score 標準化教學。
- [scipy.stats.binom](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.binom.html): 官方文件列出 `pmf(k, n, p, loc=0)`、`cdf(k, n, p, loc=0)`，並明示二項分佈 shape parameters 是 `n` 與 `p`。
- [scipy.stats.poisson](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.poisson.html): 官方文件列出 `pmf(k, mu, loc=0)`、`cdf(k, mu, loc=0)`，並明示 Poisson 的 shape parameter 為 `mu`，且 PMF 公式使用固定平均發生率。
- [scipy.stats.uniform](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.uniform.html): 官方文件明示 `uniform` 是連續均勻分佈，標準型在 `[0,1]`，用 `loc` 與 `scale` 轉成 `[loc, loc + scale]`。
- [SciPy Release Notes](https://docs.scipy.org/doc/scipy/release.html): 2026-04-20 可見文件頁已列出 `SciPy 1.17.0 Release Notes`，可合理推定目前官方文件基準已到 1.17.0。
- [SciPy `Normal.pdf` 說明](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.Normal.pdf.html): 官方將 PDF 定義為連續型隨機變數在某點的「機率密度」，不是該點本身的機率。
- [SciPy `Binomial.pmf` 說明](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.Binomial.pmf.html): 官方將 PMF 定義為離散型隨機變數「取特定值的機率」。
- [SciPy `Normal.cdf` 說明](https://docs.scipy.org/doc/scipy-1.15.0/reference/generated/scipy.stats.Normal.cdf.html): 官方將 CDF 定義為 `P(X <= x)`；可直接支撐 CDF 閱讀與區間機率教學。
- [Penn State STAT 200: The Empirical Rule](https://online.stat.psu.edu/stat200/lesson/2/2.2/2.2.7): 常態分佈約 68%、95%、99.7% 落在 1、2、3 個標準差內，可支撐 68-95-99.7 rule。
- [Penn State STAT 414: The Central Limit Theorem](https://online.stat.psu.edu/stat414/Lesson27.html): CLT 的直觀版可抓「樣本平均的抽樣分佈在樣本數夠大時近似常態，平均為 μ、變異為 σ²/n」。

## Community Insights (exam patterns)
- [Dcard：#分享 ipas AI 應用規劃師中級｜準備路徑分享](https://www.dcard.tw/f/softwareengineer/p/260219445): 考生回報真正針對 iPAS 準備約 2 週、以官方教材和例題為主；並指出正式考題比官方例題難，很多題目是情境式 2 選 1。
- [Vocus：iPAS AI 應用規劃師(中級)-學習指引的核心知識點與新趨勢關鍵字分析整理](https://vocus.cc/article/68eceef5fd89780001fbb2bd): 民間整理把 L22 明確歸納為「機率統計基礎、大數據處理技術、分析方法」，其中點名常態分佈、Z-score、缺失值/異常值等，和官方 L22 定位一致。
- [Vocus：iPAS AI 應用規劃師中級考試~科目二 不同難度模擬題目](https://vocus.cc/article/68b948cbfd897800019ee2a3): 民間模擬題常出 Q-Q 圖、分布判讀、檢定選擇等；可作為「考生會怎麼練」的旁證，但不能當成官方考點證據。
- 可交叉驗證的 pattern：
- 科目二不是重數學證明，而是情境題、概念辨識、分布選型、API/程式片段判讀。
- 官方正式題已證明會直接問 `CDF` 定義、`poisson.pmf` 與 `poisson.cdf` 語意、二項轉常態近似條件。
- 社群證據有限，且部分整理會混入假設檢定或 Q-Q plot；這些可視為周邊高頻題型，但仍應以官方公告試題優先。

## Current State (scipy.stats versions and API)
- 依 [SciPy Release Notes](https://docs.scipy.org/doc/scipy/release.html) 的官方文件索引，2026-04-20 可見最新列出的主版號為 `1.17.0`。
- 本 topic 對考試最 relevant 的仍是傳統 `scipy.stats` 分佈物件 API，而不是新 class-based `Normal/Binomial` 介面。
- [norm](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.norm.html): `norm.pdf(x, loc=0, scale=1)`、`norm.cdf(x, loc=0, scale=1)`；`loc` 是平均數 μ，`scale` 是標準差 σ，不是變異數 σ²。
- [binom](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.binom.html): `binom.pmf(k, n, p, loc=0)`、`binom.cdf(k, n, p, loc=0)`；對應參數是試驗次數 `n` 與成功機率 `p`。
- [poisson](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.poisson.html): `poisson.pmf(k, mu, loc=0)`、`poisson.cdf(k, mu, loc=0)`；SciPy 用 `mu`，教材可對照考綱寫成 λ。
- [uniform](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.uniform.html): `uniform.pdf(x, loc=0, scale=1)`、`uniform.cdf(x, loc=0, scale=1)`；SciPy 的 `loc=a`、`scale=b-a`，不是直接傳 `(a, b)`。
- `norm.stats(...)`、`binom.stats(...)`、`poisson.stats(...)`、`uniform.stats(...)` 都可回傳 mean/variance 等摘要；很適合和「分佈特性」章節連動。
- 目前找到的 SciPy 官方文件沒有顯示 `norm.pdf/cdf`、`binom.pmf`、`poisson.pmf`、`uniform.pdf/cdf` 已被淘汰或不建議使用。

## External Documents Found
- None required for this topic.

## Key Findings Summary
- 官方實題已直接涵蓋本章核心：`CDF` 定義、Poisson 適用條件、`poisson.pmf`/`cdf` 判讀、以及二項分佈的常態近似條件。
- 最該防的考試陷阱是把 `PMF/PDF/CDF` 混為一談：PMF 用於離散型且可讀單點機率；PDF 用於連續型，單點值不是機率；CDF 才是累積到某值以下的機率。
- 分佈選型的高機率考法是情境辨識：
- `Binomial(n,p)`: 固定次數、每次成功機率固定、計算成功次數。
- `Poisson(λ)`: 固定時間/空間區間內的事件次數、事件獨立、平均發生率固定，且平均數與變異數同為 λ。
- `Normal(μ,σ²)`: 對稱鐘形、常配 z-score、68-95-99.7 rule、樣本平均近似常態。
- `Uniform(a,b)`: 區間內等可能；SciPy 寫法要特別記 `loc=a, scale=b-a`。
- 二項近似卜瓦松是 `n` 大、`p` 小、`λ=np`；二項近似常態則常見條件是 `np` 與 `n(1-p)` 夠大。正式題已出現後者。
- 若 lesson 要放程式，應優先示範 `norm.pdf/cdf`、`binom.pmf`、`poisson.pmf/cdf`、`uniform.pdf/cdf` 與參數意義，不必展開更進階的 `fit`、`sf`、`ppf`。

## Scope Notes
- 依 boundary rule，本章應聚焦「資料像哪種分佈、如何讀 PMF/PDF/CDF、如何從參數理解形狀與均值變異數」。
- 下列內容只宜點到為止或移至別章：
- 特定 ML 演算法的分佈假設，例如 Gaussian Naive Bayes、GMM 作為模型假設。
- 假設檢定、p-value、信賴區間、Q-Q plot 常態性判定等推論統計延伸。
- 若提到 CLT，應維持直觀層級，不要展開證明或進階抽樣分配推導。
- 若要寫 SciPy 程式範例，需提醒 `uniform(a,b)` 是數學記號；SciPy 實作使用 `uniform(loc=a, scale=b-a)`。
