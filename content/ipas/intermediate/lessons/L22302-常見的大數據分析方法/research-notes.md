# Research Notes: L22302 常見的大數據分析方法

Research conducted 2026-04-21 for iPAS AI應用規劃師中級（以 iPAS 官方簡章 / 評鑑範圍 / 學習資源 / 樣題 / 公告試題，及 `scikit-learn`、`imbalanced-learn`、Google for Developers 官方文件為主）。

## Official Sources
- [115年度 AI應用規劃師能力鑑定簡章（2026-04-10）](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0410_20260410115646.pdf): 確認中級科目二為「大數據處理分析與應用」，L22302 隸屬 `L223 大數據分析方法與工具`，適合寫成分析師視角的演算法選用與判讀。
- [AI 應用規劃師能力鑑定評鑑內容範圍參考（115.02）](https://www.ipas.org.tw/api/proxy/uploads/certification_news/05a129ac3ddb4b3da23fef4abecfa0e3/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%A9%95%E9%91%91%E5%85%A7%E5%AE%B9%E7%AF%84%E5%9C%8D%E5%8F%83%E8%80%83_11502_20260226174411.pdf): 官方對 L22302 的唯一明文描述是「數據分析演算法、模式識別以及資料不平衡處理策略等」；這正支持 `k-means`、決策樹、`SMOTE` / 欠採樣 / `class_weight` 放在本 lesson。
- [AI應用規劃師學習資源頁](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources): 官方集中提供中級學習指引、樣題、歷屆公告試題；是 study guide writer 應優先回查的入口。
- [AI應用規劃師（中級）學習指引：科目2 大數據處理分析與應用](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE2%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8_20251222101850.pdf): 官方說明此文件用途是「掌握評鑑方向」與「考題解析」，不是正式題庫；學習指引第 5.2 節就是 `L22302 常見的大數據分析方法`。
- [AI應用規劃師（中級）學習指引勘誤表（2026-04-10）](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29_%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95%E5%8B%98%E8%AA%A4%E8%A1%A8_1150410_20260410150331.pdf): 顯示官方學習指引仍在持續修正，寫教材時要同步檢查勘誤。
- [iPAS AI應用規劃師中級能力鑑定考試樣題（114年9月版）](https://www.ipas.org.tw/DownloadFile.ashx?filename=4002eaa2-bfea-400e-abd1-2f4c1a1f8de8_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E4%B8%AD%E7%B4%9A%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A-%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C%28114%E5%B9%B49%E6%9C%88%E7%89%88%29+_v2.pdf&type=10): 科目二樣題直接考 `ROC`、監督/非監督方法辨識、`K-means` 不是拿來做數值預測、PCA 屬降維；這類「方法用途辨識」很像正式考法。
- [114 年第二梯次中級第二科公告試題（2025-11-20 公告）](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000634.pdf): 已出現 `SMOTE` 情境題、`K-means` 偽碼辨識、`ROC/AUC`、高維分群方法辨識；這是本 topic 最重要的「實際命題」來源。
- [AI應用規劃師 FAQ](https://ipd.nat.gov.tw/ipas/certification/AIAP/faq): 只提供報名 / 應試 / 成績流程，對 L22302 細目沒有補充；可列為「官方 FAQ 對考點幫助有限」。
- [scikit-learn Clustering User Guide](https://scikit-learn.org/stable/modules/clustering.html): 官方定義 `KMeans` 目標為最小化 `inertia` / within-cluster sum of squares，且說明會收斂但可能停在 local minimum；可直接支撐 `SSE objective`、收斂與初始化考點。
- [DecisionTreeClassifier API](https://scikit-learn.org/1.5/modules/generated/sklearn.tree.DecisionTreeClassifier.html): 官方明列 `criterion='gini'|'entropy'|'log_loss'`、`class_weight='balanced'`、`ccp_alpha` minimal cost-complexity pruning；足夠支撐分裂準則與剪枝。
- [imbalanced-learn documentation（stable 0.14.1）](https://imbalanced-learn.org/stable/): 官方首頁明示 `imblearn` 是處理分類不平衡的工具箱，適合 current-state 區塊引用版本狀態。
- [SMOTE API](https://imbalanced-learn.org/stable/references/generated/imblearn.over_sampling.SMOTE.html): 官方 API 以 `fit_resample(X, y)` 為標準介面。
- [Over-sampling User Guide](https://imbalanced-learn.org/stable/over_sampling.html): 官方明寫 `SMOTE` 以鄰近點插值產生樣本，公式為 `x_new = x_i + λ (x_zi - x_i)`；是教「合成少數類樣本」最直接的來源。
- [RandomUnderSampler API](https://imbalanced-learn.org/dev/references/generated/imblearn.under_sampling.RandomUnderSampler.html): 官方文件確認 `RandomUnderSampler().fit_resample(X, y)` 為標準欠採樣 API。
- [Common pitfalls and recommended practices](https://imbalanced-learn.org/dev/common_pitfalls.html): 官方明示 resampling 若在 train/test split 之前做，會造成 data leakage；這正是 `training-split-only rule` 的權威來源。
- [Google for Developers: Evaluating results in k-means](https://developers.google.com/machine-learning/clustering/kmeans/evaluate-results): 官方教學直接說明可用 total distance / loss 對 `k` 作圖，斜率明顯轉折處即 `elbow method`。
- [precision_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_score.html), [recall_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.recall_score.html), [f1_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.f1_score.html), [roc_auc_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.roc_auc_score.html): 官方定義 `precision`、`recall`、`F1`、`ROC AUC`，且 `roc_auc_score` 明示 multiclass averaging 與 class imbalance 的注意點。

## Community Insights (exam patterns)
- [Dcard：#分享 ipas AI應用規劃師中級｜準備路徑分享](https://www.dcard.tw/f/softwareengineer/p/260219445): 可作為備考社群入口，但公開內容對 L22302 細節很少；社群逐題討論仍偏稀少。
- [高雄大學考試心得（2025-08-25）](https://statsite.nuk.edu.tw/var/file/37/1037/img/501709176.pdf): 考生明確回報「多數題目為情境題」，會給場景再判斷資料怎麼處理、模型怎麼選；這與官方樣題、正式題風格一致。
- [Vocus：中級學習指引重點彙整分析](https://vocus.cc/article/68ecd196fd89780001f5c8f1): 民間整理認為樣題與正式範圍大致仍落在學習指引內；可作為社群旁證，但不能取代官方。
- [Vocus：iPAS官網公告的AI中級題目-Python題目分析](https://vocus.cc/article/691fd633fd897800019e7bf4): 社群觀察指出中級不考語法、而是考 `sklearn` / Python pipeline 背後的分析邏輯；這與正式題出現偽碼 / API 思維相符。
- 社群共通訊號：常見陷阱不是背名詞，而是「哪個方法適合這個資料情境」、「哪個評估指標適合不平衡資料」、「哪個步驟會造成 data leakage」。
- 社群缺口：沒有找到大量公開貼文專門討論 `Gini vs entropy`、`SMOTE vs undersampling vs class_weight` 的實際考題比例；這部分仍應以官方正式題與官方技術文件為主。

## Current State (if technology topic)
- `scikit-learn` 目前 stable 文件中的 `KMeans` 已將 `n_init` 預設改為 `'auto'`；文件也明示 `init='k-means++'` 會加速收斂，`n_init='auto'` 在 `k-means++` 下通常跑 1 次、`random` 下跑 10 次。舊教材若還把 `n_init=10` 當固定預設，已過時。
- `KMeans` 官方文件明示目標是最小化 `inertia`（即 `SSE` / within-cluster sum of squares），停止條件是「兩次迭代中心點移動小於 `tol`」；教學可寫成「一定收斂，但不保證 global optimum」。
- `elbow method` 目前仍是官方教學中的可接受 heuristic，但它是 heuristic，不是保證唯一正解；若題目問「常用方法」可選，若問「一定最佳」則要小心。
- `DecisionTreeClassifier` 目前官方 API 明列 `criterion='gini'|'entropy'|'log_loss'`；若教材只教 `gini` 與 `entropy` 仍可應付考試主軸，但要知道官方實作已把 `log_loss` 納入。
- `DecisionTreeClassifier` 官方 API 目前仍使用 `ccp_alpha` 進行 minimal cost-complexity pruning；因此 `pruning` 應教成「避免過擬合的後剪枝概念」，不是只講 `max_depth` 這類 pre-pruning。
- `class_weight='balanced'` 仍是 `scikit-learn` 官方支援做法，適合與 `SMOTE` / 欠採樣並列比較；其核心是依類別頻率反比調整權重，不需合成新資料。
- `imbalanced-learn` stable 文件目前版本為 `0.14.1`；官方 API 用語是 `fit_resample`，不是舊版常見的 `fit_sample`。
- `SMOTE` 目前官方文件仍以鄰近樣本插值為核心：`x_new = x_i + λ (x_zi - x_i)`；不是簡單複製少數類。
- `imbalanced-learn` 官方目前明確警告：先對整份資料 resample 再切 train/test 會造成 data leakage；正確作法是只在 training fold / training split 內 resample，最好放進 `imblearn.pipeline.Pipeline`。
- 不平衡資料評估方面，`precision/recall/F1/ROC AUC` 仍是 current standard；`Precision-Recall` 官方範例也明言在 very imbalanced classes 下特別有用。若教材只強調 `accuracy`，風險很高。

## External Documents Found
- 無 syllabus 明確引用之外部政府規範或法規文件。
- [Google for Developers: Evaluating results in k-means](https://developers.google.com/machine-learning/clustering/kmeans/evaluate-results): 可作為 `elbow method` 的官方補充。
- [scikit-learn 官方文件](https://scikit-learn.org/stable/modules/clustering.html): 可作為 `k-means`、決策樹、評估指標的 current-standard 來源。
- [imbalanced-learn 官方文件](https://imbalanced-learn.org/stable/): 可作為 `SMOTE`、`RandomUnderSampler`、`Pipeline`、資料洩漏規則的 current-standard 來源。
- 其他與本 lesson 高度相關的外部公部門文件：未找到必要且高價值者；若 study guide writer 想補更多「模式識別」理論，需另外指定來源。

## Key Findings Summary
- 官方範圍已明文把 `資料不平衡處理策略` 放進 L22302，因此 `SMOTE`、`RandomUnderSampler`、`class_weight`、不平衡評估指標應列為主內容，不是附註。
- 實際命題明顯偏情境式與方法辨識：114 年正式題已考 `SMOTE`、`K-means` 偽碼辨識、`ROC`；樣題也考 `K-means` 不是預測模型、`ROC` 看 `TPR/FPR`。
- `k-means` 最應教的考點是：`SSE/inertia` 目標、反覆指派與更新中心、收斂到 local minimum、`k-means++` 初始化、`elbow method` 是選 `k` 的 heuristic。
- 決策樹最應教的考點是：`Gini impurity`、`entropy/information gain`、分裂是 greedy 選擇、`pruning` 用來抑制 overfitting；若補 API，帶到 `criterion` 與 `ccp_alpha` 即可。
- 不平衡資料最常見陷阱應明講：`SMOTE` 是插值不是複製、resampling 只能在 training split 做、`accuracy` 可能誤導，應看 `precision` / `recall` / `F1` / `AUC-ROC`，必要時補 `PR curve`。

## Scope Notes
- 本 lesson 應停在「資料分析方法與選用」：`k-means`、決策樹、模式識別、類別不平衡處理、評估指標。
- 不要擴寫到 `Spark` / `ETL` / streaming pipeline；那屬 `L22201` / `L22203`。
- 不要展開到 `PCA` / eigendecomposition / 特徵值推導；那屬 `L23102` 或其他更高數學層次。
- `pattern recognition` 的「cluster-based vs rule-based」若要寫：
- `cluster-based` 可安全對應分群式模式辨識。
- `rule-based` 可安全對應決策樹 / if-then 規則式判斷。
- 以上分類主要是依官方 L22302 範圍、分群文件、決策樹可轉成 if-then rules 的技術文件所作教學推論；官方 iPAS 並未逐字下定義。
- 沒找到 iPAS 官方文件逐字列出 `Gini impurity`、`entropy`、`SMOTE`、`RandomUnderSampler`、`class_weight`；這些屬於依官方大綱與 current-standard 技術文件補出的高機率考點，寫作時宜標示為「建議補強」而非「官方逐字必考字串」。
