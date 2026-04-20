# Research Notes: L21301 數據準備與模型選擇

Research conducted 2026-04-20 for iPAS AI 應用規劃師中級（115 年度簡章 / 114 年 9 月樣題 / 114 年第二梯次公告試題）。

## Official Sources
- [iPAS 115 年度 AI 應用規劃師能力鑑定簡章（115.04 版）](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0410_20260410115646.pdf): 中級每科 50 題單選；科目一含 L21301。2026-05-23、2026-11-14 為中級考試日。簡章確認科目一主軸是「人工智慧技術應用與規劃」，L21301 屬其下的 AI 技術應用與系統部署範圍。
- [iPAS AI 應用規劃師中級學習指引：科目一 人工智慧技術應用與規劃](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE1%E4%BA%BA%E5%B7%A5%E6%99%BA%E6%85%A7%E6%8A%80%E8%A1%93%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83_20251222101833.pdf): 明列 L21301「數據準備與模型選擇」為科目一評鑑內容，定位在實務應用與部署前的選擇判斷，不是模型數學推導。
- [iPAS AI 應用規劃師中級學習指引：科目三 機器學習技術與應用](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE3%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8_20251222101907.pdf): 雖屬科目三，但官方用來定義「數據準備／特徵工程／模型訓練評估」的標準語彙最完整；可用來校正 L21301 的名詞邊界。重點包括缺失值處理、異常值、編碼、縮放、資料增強、依模型特性調整特徵。
- [iPAS 中級考試樣題（114 年 9 月版）](https://ipd.nat.gov.tw/ipas/DownloadFile.ashx?filename=4002eaa2-bfea-400e-abd1-2f4c1a1f8de8_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E4%B8%AD%E7%B4%9A%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A-%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C%28114%E5%B9%B49%E6%9C%88%E7%89%88%29+_v2.pdf&type=10): 已直接出現「特徵尺度差異極大時如何處理」情境題，正解是標準化；顯示考法偏向情境判斷，不是要求背公式。
- [iPAS 114 年第二梯次中級第三科公告試題（114.11.20）](https://ipd.nat.gov.tw/ipas/DownloadFile.ashx?filename=cb3be209-2b21-4e48-8e2f-8644fce7ba2a_114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB_%E7%AC%AC%E4%B8%89%E7%A7%91_%E6%A9%9F%E5%99%A8%E5%AD%B8%E7%BF%92%E6%8A%80%E8%A1%93%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114.11.20%29.pdf&type=10): 官方實題可用來觀察模型選擇題型，例如交叉驗證、泛化能力、公平比較模型等觀念。
- [iPAS 公告：初級與中級考試樣題更新及新增中級考試題型說明](https://www.ipas.org.tw/AIAP/AbilityNewsData.aspx?nwsno=a443b352-e677-4e4f-9b27-0fc0d7c23d02): 114 年第二次中級起新增程式邏輯判斷題型，但這是整體中級科目的題型變化，非 L21301 主軸；本 lesson 仍應聚焦資料處理與模型取捨。

## Community Insights (exam patterns)
- [Dcard：iPAS AI 應用規劃師中級｜準備路徑分享](https://www.dcard.tw/f/softwareengineer/p/260219445): 可作為有限社群樣本；考生回報主要以官方教材、樣題與觀念整理為主，沒有提到深度數學推導或手寫程式是 L21301 準備核心。
- 社群可驗證訊號偏少；目前最可靠的「實際考什麼」仍是官方樣題、公告試題與學習指引，論壇不足以支撐更細的命題統計。
- 官方樣題與公告題的共通 pattern：用業務情境包裝基礎概念，例如「特徵尺度不一致要怎麼處理」「哪種資料切分設計較能公平比較泛化能力」「何種模型較適合某類任務」。
- 常見陷阱是把模型選擇題做成「背名詞」而忽略條件：
  - 尺度敏感模型（如 k-NN、SVM）通常更在意標準化／正規化。
  - 樹模型較不依賴縮放，但仍需要處理缺失值、類別欄位與資料品質。
  - 訓練/驗證/測試集用途不能混淆；不能用測試集反覆調參。
- 另一個常見陷阱是把類別編碼當成固定答案：高基數類別不一定適合 one-hot；target encoding 雖可降維，但若在切分前使用，容易造成 target leakage。

## Current State (if technology topic)
- [Google Developers: Dividing the original dataset](https://developers.google.com/machine-learning/crash-course/overfitting/dividing-datasets): 目前主流仍建議切成 training / validation / test 三部分；validation 用於調整模型，test 用於最後確認，且資料轉換要一致套用到各集合。
- [Google Developers: Class-imbalanced datasets](https://developers.google.com/machine-learning/crash-course/overfitting/imbalanced-datasets): 當前權威教學仍強調類別不平衡不能只看 accuracy；重點是重抽樣、權重調整與評估指標選擇。
- [Google Developers: Vocabulary and one-hot encoding](https://developers.google.com/machine-learning/crash-course/categorical-data/one-hot-encoding): one-hot 仍是標準入門作法，但官方已明確提醒高維稀疏、高基數欄位會造成效率問題。
- [Google Developers: Numerical data: Normalization](https://developers.google.com/machine-learning/data-prep/transform/normalization): min-max 與 Z-score/standardization 仍是現行基礎作法；沒有「新版已淘汰」問題，考試可視為穩定知識。
- [H2O Target Encoding docs](https://docs.h2o.ai/h2o/latest-stable/h2o-docs/data-science/target-encoding.html): target encoding 仍是業界處理高基數類別欄位的常見方法，但官方文件也強調需避免洩漏標籤資訊；這點很可能是命題點。
- 對本題而言，2025-2026 沒有看到會改變 syllabus 的重大版本斷點；考點屬於穩定的機器學習基礎實務。

## External Documents Found
- 官方 syllabus 未指定必讀的外部法規、政府準則或白皮書。
- 可作為「當前標準作法」補充來源的外部權威文件已找到：
  - Google Developers ML Crash Course：資料切分、類別不平衡、one-hot、normalization。
  - H2O Target Encoding 文件：target encoding 的用途與風險。
- 若 study guide writer 需要「台灣政府版資料前處理或模型選擇指引」，本題未找到直接對應且被 syllabus 指名的文件。

## Key Findings Summary
- 官方最明確的可考範圍是：數據收集與清理、特徵工程、資料切分、模型選擇依據；考法偏情境判斷，不偏演算法推導。
- 標準化／正規化、類別編碼與類別不平衡處理是高機率考點，且常與「哪種模型較受影響」一起出題。
- 訓練/驗證/測試集切分與避免 data leakage 是必考核心；特別要分清 validation 與 test 的角色。
- 模型優缺點應以選擇 tradeoff 教學為主：可解釋性、資料量需求、對尺度敏感度、對非線性與雜訊的耐受度，而不是數學公式。
- 目前沒有找到官方或社群證據顯示 L21301 會深入考 neural network 層級細節；若題目提到神經網路，多半只會考「資料量大、表現強、可解釋性較弱、成本較高」這類高層判斷。

## Scope Notes
- 超出本 lesson 邊界的內容：
  - Spark/Hadoop、分散式資料工程。
  - `scikit-learn` 或其他套件程式碼。
  - 神經網路層數、反向傳播、梯度等數學細節。
- target encoding 可以提，但只應教「何時用、優點、主要風險是 leakage」；不應展開 K-fold target encoding 實作細節。
- 若要談模型比較，建議維持中級深度：
  - 決策樹：易解釋、易過擬合。
  - 隨機森林：較穩健、較難解釋。
  - SVM：小中型資料常有效、對尺度敏感。
  - k-NN：直觀、推論成本高且受尺度影響。
  - 線性回歸：簡單可解釋、難處理複雜非線性。
  - 神經網路：表現潛力高、資料與算力需求高、可解釋性低。
