# Research Notes: L22301 統計學在大數據中的應用

Research conducted 2026-04-21 for iPAS AI應用規劃師中級（以 iPAS 115 年度簡章、114.04 評鑑內容範圍、114 年第二梯次正式公告試題、scikit-learn / NumPy / SciPy / pandas / statsmodels 官方文件為主）。

## Official Sources
- [115年度 AI應用規劃師能力鑑定簡章（2026-04-10）](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0410_20260410115646.pdf): 中級科目二是「大數據處理分析與應用」；簡章也明示科目二含程式相關題型，代表本 lesson 可包含公式到 API 的讀碼層次。
- [AI 應用規劃師能力鑑定評鑑內容範圍參考（114.04）](https://www.ipas.org.tw/DownloadFile.ashx?filename=14ae134c-fb2f-4741-9f6d-062c02bdbc94_AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%A9%95%E9%91%91%E5%85%A7%E5%AE%B9%E7%AF%84%E5%9C%8D%E5%8F%83%E8%80%83_11404.pdf&type=10): 官方只明列 `L22301 統計學在大數據中的應用` 隸屬 `L223 大數據分析方法與工具`，未逐條列出 log / Box-Cox / quantile transform；因此這些細項主要要靠正式題與官方技術文件校正，而不能說成 iPAS 明文逐字列點。
- [AI應用規劃師中級學習指引頁](https://www.ipas.org.tw/AIAP/AbilityPageContent.aspx?pgeno=263534ef-6ab9-4ce9-a9be-4ad9a4ed7440): 官方明示中級科目二學習指引已上線，且用途是「掌握評鑑方向」與「考題解析」，但不是正式教材或題庫。
- [AI應用規劃師中級學習指引上線公告](https://www.ipas.org.tw/AIAP/AbilityNewsData.aspx?nwsno=d09fc227-261a-40e9-b34a-8a1d093a4341): 再次確認官方學習指引定位為備考參考資料，不可把其內容視為完整題庫。
- [AI應用規劃師（中級）學習指引勘誤表（2026-04-10）](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29_%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95%E5%8B%98%E8%AA%A4%E8%A1%A8_1150410_20260410150331.pdf): 可證明中級學習指引目前仍在校正中；若 study guide writer 之後補讀學習指引，應同步檢查勘誤。
- [114 年第二梯次中級第二科公告試題（2025-11-20 公告）](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000634.pdf): 直接出現 `Robust Scaling` 對抗 outliers、`PCA 前先標準化`、`poisson.pmf/cdf` 判讀、常態近似條件等；這是本 topic 最重要的「實際考什麼」證據。
- [iPAS AI應用規劃師中級能力鑑定考試樣題（114.01 版）](https://www.ipas.org.tw/DownloadFile.ashx?filename=6f132d4a-5a6a-4c50-a4ed-40083249d326_iPAS+AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E4%B8%AD%E7%B4%9A%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A-%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C%28114%E5%B9%B41%E6%9C%88%E7%89%88%29.pdf&type=10): 樣題對 L22 的直接覆蓋不多，但已出現「特徵工程包含 transformation」這種分類題型；可作為命題語氣旁證。
- iPAS-specific 缺口：目前沒找到官方可直接引用且穩定開啟的中級科目二學習指引 PDF 內文，也沒找到官方文件逐字列出 `log transform / Box-Cox / quantile transform` 為 iPAS L22301 必考詞；這部分只能以正式題與現行業界標準補強。

## Community Insights (exam patterns)
- [Dcard：#分享 ipas AI應用規劃師中級｜準備路徑分享](https://www.dcard.tw/f/softwareengineer/p/260219445): 考生回報正式考題比官方例題難，偏情境式二選一或四選一判斷，不是只背名詞。
- [Vocus：iPAS AI應用規劃師中級考試~科目二 不同難度模擬題目](https://vocus.cc/article/68b948cbfd897800019ee2a3): 民間練習題常把統計觀念放在資料情境裡考，不是單問公式名稱；可作為備考社群觀察，但不能當官方證據。
- [CPC 衝刺班簡介](https://store.cpc.org.tw/Train/Contents/TD3787): 培訓單位也直接把科目二定位成「統計、資料處理與大數據架構」並強調情境式考題，與 Dcard 回報一致。
- 社群證據整體偏少，沒有找到大量公開的 PTT / Dcard 逐題討論專講 L22301 的轉換與縮放；因此「常考什麼」應以 114 年正式公告試題優先。
- 可交叉驗證的 exam pattern：
- 常考的是「哪種前處理適合這個資料狀況」，不是推導證明。
- 容易把 `normalization / standardization / robust scaling` 混成同義詞，這很像命題陷阱。
- 會把公式概念包進 downstream 分析情境，例如 PCA、離群值、分布偏態、近似分布。

## Current State (sklearn preprocessing API)
- [StandardScaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html): 官方 stable 文件目前標示為 `scikit-learn 1.8.0`；`fit()` 會學到 `mean_`、`var_`、`scale_`，`fit_transform()` 是先 fit 再 transform。
- [MinMaxScaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.MinMaxScaler.html): 以 `feature_range=(0, 1)` 為預設；會保存 `data_min_`、`data_max_`、`data_range_`、`scale_`、`min_`；`clip=True` 可把 hold-out data 裁到範圍內，但官方明示這不等於解決 feature drift。
- [RobustScaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.RobustScaler.html): 以 median 與 IQR 為核心；預設 `quantile_range=(25, 75)`，會保存 `center_` 與 `scale_`；官方明示它比 StandardScaler 更抗 outliers。
- [QuantileTransformer](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.QuantileTransformer.html): `output_distribution` 可選 `'uniform'` 或 `'normal'`；會保存 `quantiles_`、`references_`；對新資料超出 fitted range 的值會映到輸出分布邊界；此法是 non-linear，官方明示可能扭曲線性相關。
- [PowerTransformer](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.PowerTransformer.html): 支援 `method='yeo-johnson'` 與 `method='box-cox'`；會保存 `lambdas_`；預設 `standardize=True`，也就是轉換後再做 zero-mean, unit-variance。
- [sklearn preprocessing user guide](https://scikit-learn.org/stable/modules/preprocessing.html): 官方把 preprocessing 分成 scaling 與 non-linear transformation；並指出 quantile transform 的核心是以經驗 CDF 映到目標分布。
- [TransformerMixin](https://scikit-learn.org/stable/modules/generated/sklearn.base.TransformerMixin.html): `fit_transform` 由 mixin 定義為委派給 `fit` 與 `transform`；可直接支撐「fit vs fit_transform」的準確說法。
- [pandas.DataFrame.transform](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.transform.html): pandas 的 `transform` 會回傳與輸入相同長度/索引形狀的結果，適合做欄位級轉換；這比 `agg` 更符合資料前處理管線。
- 版本變動中值得註記者：
- [power_transform](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.power_transform.html): `method` 預設值已在 `0.23` 從 `'box-cox'` 改成 `'yeo-johnson'`；新教材不要再把 Box-Cox 當成預設。
- [quantile_transform](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.quantile_transform.html): `subsample=None` 是 `1.5` 新增，舊版 code 不能假設可關閉 subsampling。
- [scikit-learn 1.9.dev notes](https://scikit-learn.org/dev/whats_new/v1.9.html): `PowerTransformer(method="yeo-johnson")` 在 1.9.dev 有數值穩定性改進；這是前瞻變化，不該寫成目前 stable 行為差異很大。

## Formula Reference (verified)
- [StandardScaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.StandardScaler.html): z-score / standardization 公式為 `z = (x - u) / s`；在一般統計教材可寫成 `(x - μ) / σ`。常見誤寫是把分母寫成變異數 `σ²`。
- [MinMaxScaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.MinMaxScaler.html): min-max 公式為 `X_std = (X - X.min) / (X.max - X.min)`，再映到 `feature_range`；若教材只教 `[0,1]`，可簡寫成 `(x - min) / (max - min)`。
- [RobustScaler](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.RobustScaler.html): 官方文字是「remove median and scale according to IQR」；依預設 `with_centering=True, with_scaling=True, quantile_range=(25,75), unit_variance=False`，可推得常見教學式為 `(x - median) / IQR`。這裡是依官方定義推得，不是頁面直接列公式。
- [numpy.log1p](https://numpy.org/doc/stable/reference/generated/numpy.log1p.html): `log1p(x) = log(1 + x)`；對含 0 的非負資料，比直接寫 `log(x)` 更安全。常見陷阱是把 `log1p(x)` 誤寫成 `log(x) + 1`。
- [SciPy boxcox](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.boxcox.html): Box-Cox 公式為 `[(x^λ - 1) / λ]`（`λ ≠ 0`），`λ = 0` 時為 `log(x)`；SciPy 明示輸入需為正值。
- [PowerTransformer](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.PowerTransformer.html): `PowerTransformer(method='box-cox')` 會估計 `lambdas_`，而且預設再標準化；若教材只想講純 Box-Cox 公式，需額外提醒 `sklearn` 的 class 預設還會做 `standardize=True`。
- [QuantileTransformer](https://scikit-learn.org/stable/modules/generated/sklearn.preprocessing.QuantileTransformer.html): 官方概念可寫成「先用經驗 CDF 把資料映到 uniform，再依目標 quantile function 映到 `uniform` 或 `normal`」；這不是單一初等代數式，適合用流程式描述。
- [SciPy skew](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.skew.html): skewness 診斷上，常態資料的 skewness 應約為 0；正偏代表右尾較重。
- [statsmodels qqplot](https://www.statsmodels.org/stable/generated/statsmodels.graphics.gofplots.qqplot.html): Q-Q plot 是把樣本分位數與理論分位數相比；用途是看資料是否貼近指定分布。
- [SciPy shapiro](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.shapiro.html): Shapiro-Wilk 是常態性檢定，虛無假設是資料來自常態分布。

## Key Findings Summary
- iPAS 官方範圍只給到 `L22301 統計學在大數據中的應用` 這個粒度，沒有官方逐字列出 `log / Box-Cox / quantile transform`；若要教這些，最穩的支撐是「它們屬於資料可分析化前處理」加上 `sklearn` 官方文件與正式題命題風格。
- 114 年第二梯次正式題已證明：前處理題不是抽象理論，而是直接問「有 outliers 時該選哪種 scaling」、「PCA 前為何要標準化」、「如何判讀 `poisson.pmf/cdf`」。L22301 應優先寫成「公式 -> API -> 何時用」。
- `RobustScaler vs StandardScaler vs MinMaxScaler` 是高價值考點：有極端值時，正式題已偏向 `Robust Scaling`；而 `PCA` 這類量級敏感分析，正式題已明示先做 `Standardization`。
- `QuantileTransformer` 與 `PowerTransformer(Box-Cox/Yeo-Johnson)` 都是 current industry-standard API，但 `QuantileTransformer` 是 non-linear，可能扭曲線性關係；`PowerTransformer` 預設還會標準化，教材要講清楚這一層。
- 若要考公式陷阱，最可能出在：
- 把 `normalization` 與 `standardization` 當同義詞。
- 把 `log1p(x)` 誤解成 `log(x)+1`。
- 忘記 Box-Cox 要求正值，且 `λ=0` 退化成 log。
- 忘記 scaler 的參數必須先由 training data `fit`，再拿去 `transform` 新資料。

## Scope Notes
- 依 boundary rule，本章應停在「讓資料更容易分析/比較/建模前處理」：分布偏態、縮放、抗離群、量級一致化、分布診斷、欄位級 transformation pipeline。
- 不要展開到 L23101：
- 某特定 ML 演算法的分布假設與數學推導。
- 不要展開到 L23102：
- PCA / SVD / eigendecomposition 的推導；本章只需保留「PCA 前常需標準化」這種前處理觀點。
- 不要展開到 L23301：
- 特徵選擇、SMOTE、train/val/test split discipline、完整模型評估設計。
- 額外提醒：114 年正式題中有一題把 `Box-Cox` 放在選項裡，但不是這份研究筆記可安全概括為「一律最佳解」的證據；若寫 study guide，應把它教成「右偏且正值資料常見選項」，不要教成萬用答案。
