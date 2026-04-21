# Research Notes: L22402 大數據應用於鑑別式AI中的應用

Research conducted 2026-04-21. Priority given to iPAS official documents and current `scikit-learn` official documentation; community evidence was limited.

## Official Sources
- [115年度 AI 應用規劃師能力鑑定簡章（2026-04-10）](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0410_20260410115646.pdf): 確認 L22402 隸屬中級第二科「大數據處理分析與應用」；官方最新簡章日期是 2026-04-10。
- [iPAS AI 應用規劃師專區：最新消息 / 學習資源入口](https://www.ipas.org.tw/certification/AIAP/news): 官方入口明確提供 `學習資源`、`考試資訊`、`檔案下載`；但未在公開頁面上逐條展開 L22402 細項。
- [官方公告：114年度第四梯次初級與第二梯次中級當次試題已公告](https://www.ipas.org.tw/AIAP/AbilityNewsData.aspx?nwsno=719deab8-a361-40c6-8536-aa0290d78948): 官方確認可用「當次試題/考試樣題」回推實際命題風格。
- [114 年第二梯次中級第二科公告試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000634.pdf): 第二科正式題型明顯偏情境式單選，且會把英文術語直接放在選項內；可作為 L22 科目整體命題語感來源。
- [114 年第二梯次中級第三科公告試題](https://www.ipas.org.tw/DownloadFile.ashx?filename=cb3be209-2b21-4e48-8e2f-8644fce7ba2a_114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB_%E7%AC%AC%E4%B8%89%E7%A7%91_%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114.11.20%29.pdf&type=10): 已公開出現 `F1 Score` 計算題、少數類評估時不宜只看 `Accuracy`、以及流失預測/醫療情境；代表這些指標在中級確實會被考，但更偏 L23303 的訓練/評估視角。
- [scikit-learn tutorial: supervised learning](https://scikit-learn.org/1.1/tutorial/statistical_inference/supervised_learning.html): 官方明列所有 supervised estimators 共同 API 是 `.fit(X, y)` 與 `.predict(X)`；適合支撐 L22402 的 `sklearn` pseudocode。
- [scikit-learn Getting Started](https://scikit-learn.org/0.22/getting_started.html): 官方示例清楚展示 estimator `fit` 後用 `predict` 對新資料做預測；可直接轉寫成考試用 pseudocode 流程。
- [ClassifierMixin](https://scikit-learn.org/stable/modules/generated/sklearn.base.ClassifierMixin.html): 官方說明 classifier 預設 `score` 回傳 `accuracy`；可用來提醒教材避免把 `accuracy` 當成唯一指標。
- [scikit-learn metrics API](https://scikit-learn.org/stable/api/sklearn.metrics.html): 官方穩定版集中列出 `confusion_matrix`、`precision_score`、`recall_score`、`f1_score`、`roc_auc_score`、`roc_curve` 等；是本 topic 指標名詞最權威的 current-standard 來源。
- [precision_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.precision_score.html): 官方定義 precision 與 averaging 行為；適合補充 binary / multiclass 在 API 上的差異。
- [roc_auc_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.roc_auc_score.html): 官方明列 ROC AUC 由 prediction scores 計算，且支援 binary / multiclass / multilabel；範例直接使用 `clf.predict_proba(X)[:, 1]`。
- [Tuning the decision threshold for class prediction](https://scikit-learn.org/stable/modules/classification_threshold.html): 官方明講 `predict_proba` 相同時，改決策閾值仍會改變最終 class label；這正好支撐 `Precision vs Recall tradeoff` 的 exam framing。

## Community Insights (exam patterns)
- [阿摩中級題庫列表](https://yamol.tw/cat-iPAS%E2%97%86AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E2%97%86%E4%B8%AD%E7%B4%9A-6739.htm): 顯示社群整理時會把中級正式題視為每科 50 題、樣題多為 15 題；對出題格式判讀有幫助，但不是官方答案來源。
- [阿摩：114 年中級樣題第 14 題](https://yamol.tw/item-14.%E4%B8%8B%E5%88%97%E5%93%AA%E4%B8%80%E7%A8%AE%E6%8C%87%E6%A8%99%E9%80%9A%E5%B8%B8%E7%94%A8%E6%96%BC%E8%A9%95%E4%BC%B0%E8%BF%B4%E6%AD%B8%E6%A8%A1%E5%9E%8B%E7%9A%84%E6%80%A7%E8%83%BD%EF%BC%9F%28A%29R%26sup2%3B%28B%29F1%E5%88%86..-3416830.htm): 社群收錄的中級樣題已直接考「哪個指標通常用於評估迴歸模型」；顯示 regression 與 classification metrics 的區分是可被單題直接測的。
- [Dcard：iPAS AI 應用規劃師中級準備路徑分享](https://www.dcard.tw/f/softwareengineer/p/260219445): 可見考生確實以公開教材、樣題、考古題整理準備；但公開可抓取內容有限，對 L22402 細項幫助不大。
- 社群端可驗證資訊偏少，且多數討論集中在「如何準備中級三科」而非 L22402 單一主題；因此 exam pattern 仍應以官方樣題與公告試題為主。
- 常見陷阱可由官方題型反推：把 `Accuracy` 誤當不平衡分類主指標、把 ROC AUC 當成用 hard label 計算、把 regression 與 classification 指標混用。

## Current State (if technology topic)
- `scikit-learn` stable 文件目前顯示為 [1.8.0](https://scikit-learn.org/stable/api/sklearn.html)；若 study guide 要引用 API 名稱，應以 stable 文件為準。
- 官方目前仍以 `.fit()`、`.predict()`、`.predict_proba()` 為主線；L22402 可教成「訓練模型、輸出類別、輸出機率」三段式，不必深入 estimator internals。
- ROC AUC 的 current-standard 重點不是拿最終類別標籤算，而是拿 `prediction scores` 算；官方範例直接用 `predict_proba(... )[:, 1]`。
- 官方 threshold-tuning 文件明確指出：同一組 `predict_proba`，調整 decision threshold 後，`Precision` / `Recall` 與最終分類結果都會變；這很適合解釋 spam filtering、fraud detection、medical diagnosis 的取捨。
- `ClassifierMixin.score()` 預設回傳 `accuracy`；這是 API 現況，但考試教材應明講在類別不平衡下不能只看它。

## External Documents Found
- [Google Cloud: What is Supervised Learning?](https://cloud.google.com/discover/what-is-supervised-learning): 官方直接把 spam filtering 列為 classification 常見案例，可用於 `spam filtering` 應用場景。
- [AWS Guidance for Fraud Detection Using Machine Learning](https://aws.amazon.com/solutions/fraud-detection-using-machine-learning/): 官方方案頁明示 fraud detection 是動態、自我改善的 ML 分類工作負載，可用於 `fraud detection` 場景。
- [Google Cloud Blog: churn prediction with GA4 and BigQuery ML](https://cloud.google.com/blog/topics/developers-practitioners/churn-prediction-game-developers-using-google-analytics-4-ga4-and-bigquery-ml): 官方案例清楚展示大規模事件資料需先整理成適合 classification 的 training data；可用於 `churn prediction` 場景。
- [AWS HealthImaging](https://aws.amazon.com/blogs/industries/introducing-aws-healthimaging/): 官方明示 medical imaging 可在 `petabyte-scale` 儲存、分析並結合 ML；可支撐 `medical diagnosis` / `image recognition at scale` 的大數據場景。
- [Amazon SageMaker Canvas medical image classification](https://aws.amazon.com/blogs/machine-learning/simplify-medical-image-classification-using-amazon-sagemaker-canvas/): 官方案例顯示醫療影像分類直接連到疾病診斷效率提升。
- Syllabus 未明列任何必讀政府法規、標準或外部框架文件；本次未找到 L22402 必須綁定的外部公部門文件。

## Key Findings Summary
- L22402 最適合寫成「大數據分類/預測工作負載的應用與監控」：spam、fraud、medical diagnosis、churn、image recognition 都有官方雲端案例可對應。
- `Confusion Matrix`、`Precision`、`Recall`、`F1`、`Accuracy`、`AUC-ROC` 應教成部署後判讀語言，不只是公式；尤其要強調不平衡資料下 `Accuracy` 可能誤導。
- `Precision vs Recall` 取捨是高頻實務題框架：spam / fraud 偏重降低 false positives 或 false negatives，會影響 threshold 設定。
- `sklearn` pseudocode 應簡化成 `model.fit(X_train, y_train)`、`y_pred = model.predict(X_test)`、`y_prob = model.predict_proba(X_test)`；不需要再深入 model internals。
- 官方可直接驗證的中級考法偏「情境敘述 + 指標/方法判斷」，不是要求推導演算法。

## Scope Notes
- 不要回頭重講「鑑別式 AI vs 生成式 AI」概念比較；那是初級 L11401 邊界。
- 不要展開 logistic regression、decision tree、SVM 等演算法內部推導；那應落在 L23202。
- 指標雖與 L23303 高度重疊，但 L22402 應聚焦「如何評估已部署的大數據分類工作負載」，不是完整訓練實驗設計。
- `time-series forecasting` 與 regression 屬 syllabus 內，但本次找到的官方 iPAS 題證以 classification metrics 較多；若要補 time-series 題型，需再找更多官方樣題或學習指引內容。
- 未找到 iPAS 官方公開文件逐條點名 `TP/FP/TN/FN`、`AUC-ROC`、`.predict_proba()` 必考；這些屬於依 syllabus、公開題型與 current-standard API 推定的高機率重點，寫教材時宜標示為「高相關」而非「官方逐字必考」。
