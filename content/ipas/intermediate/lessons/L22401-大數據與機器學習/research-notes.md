# Research Notes: L22401 大數據與機器學習

## Official Sources
- [iPAS 115 年度 AI 應用規劃師能力鑑定簡章](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0410_20260410115646.pdf): 115 年中級仍採 `科目1 + 科目2或3擇一`；資料分析組對應 `科目2 大數據處理分析與應用`。簡章並明示原「巨量資料分析師」科目可抵免科目2，代表命題背景仍延續「資料處理 / 分析 / 可擴展性」脈絡，而非演算法內部原理。
- [iPAS AI 應用規劃師專區下載頁](https://www.ipas.org.tw/AIAP/AbilityDownloadList.aspx): 目前公開下載重點以簡章為主；未找到 L22401 專屬官方學習指引下載頁。對 study guide writer 而言，現階段最穩定的官方依據仍是簡章、職能基準、公告試題。
- [114 年第二次 AI 應用規劃師中級第二科公告試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000634.pdf): 已直接出現 L22401 高關聯考點。
- 同一份公告試題：Q24 明考 `Data Lake + Apache Spark / Ray + 分散式資料預處理 + pipeline`，命題重點是「多樣資料 + 大規模處理下，應選何種資料與訓練架構」，非常貼近本 lesson 的 bridge 定位。
- 同一份公告試題：Q27 考 `Approximate Quantile`，重點是 `在可容忍誤差下快速估算以支援即時分析`，可作為 `Volume/Velocity` 對 ML 前處理與摘要統計的影響案例。
- 同一份公告試題：Q28 考 `高維 (>500 維) + DBSCAN`，正解指向 `高維下距離變化趨同，導致 epsilon 閾值選擇失效`；這是官方已碰觸「curse of dimensionality 對演算法選用的影響」的直接證據。
- [iCAP AI 應用規劃師職能基準資料頁](https://icap.wda.gov.tw/ap/resources_datum_list_detail.php?I=SMS2512-002v1): 勞動部 iCAP 將 AI 應用規劃師列為有效至 `116.12.31` 的職能基準，發展單位為經濟部；可作為 exam-oriented 課程規劃的官方職能背景。
- [iCAP AI 應用規劃師職能基準 PDF](https://icap.wda.gov.tw/File/datum/113027001v1.pdf): 職能基準內含 `K04 資料庫原理`、`K05 機器學習概論`、`K06 商業智慧概論`、`K11 資料處理與分析概念`、`S08 資料整合與分析能力`、`S15 系統思維與設計能力`。這些描述支持 L22401 應從資料規模、資料流程、架構選擇切入，不宜展開演算法推導。
- [Apache Spark MLlib](https://spark.apache.org/mllib/): 官方明示 MLlib 是 Spark 的 `scalable machine learning library`，並可部署到 cluster 以 distributed mode 執行；適合作為 `集中式 vs 分散式訓練架構` 的 current-standard 來源。
- [Spark MLlib Optimization](https://spark.apache.org/docs/latest/mllib-optimization.html): 官方文件保留 `miniBatchFraction` 名詞，並說明每次迭代僅以資料子集估梯度；很適合支撐 `mini-batch sampling` 題型與 pseudocode loop 判讀。
- [scikit-learn: Strategies to scale computationally](https://scikit-learn.org/1.5/computing/scaling_strategies.html): 官方明講 out-of-core learning 由 `stream instances + feature extraction + incremental algorithm` 三部分組成，可直接對應 `batch vs online/incremental learning`。
- [scikit-learn: SGD](https://scikit-learn.org/stable/modules/sgd.html): 官方明講 SGD 與 batch gradient descent 的差異在於 `一次看單一訓練樣本`；適合用來界定 online / incremental 更新思路，而不必深入 loss / backprop。
- [TensorFlow: Parameter server training](https://www.tensorflow.org/tutorials/distribute/parameter_server_training): 官方明講 parameter server training 是常見 `data-parallel` 擴展方法，cluster 由 `chief / worker / ps` 組成；可作為 `distributed SGD / parameter server architecture` 的現行技術依據。
- [TensorFlow: Distributed training guide](https://www.tensorflow.org/guide/distributed_training): 官方清楚區分 `MultiWorkerMirroredStrategy` 的同步式多 worker 訓練與 `ParameterServerStrategy` 的 parameter-server 路線；可支撐考題比較 `同步集中複製` vs `參數伺服器` 的架構差異。
- [Google for Developers: k-means advantages/disadvantages](https://developers.google.com/machine-learning/clustering/kmeans/advantages-disadvantages): 官方指出 k-means 雖可擴展到 large datasets，但在高維資料會受 `curse of dimensionality` 影響；可用來說明「能 scale」不代表對所有大數據特性都穩健。
- [Google for Developers: class-imbalanced datasets](https://developers.google.com/machine-learning/crash-course/overfitting/imbalanced-datasets): 官方指出嚴重不平衡下，小 batch 常含不足的 minority class，並明講 `accuracy` 不適合作為主要評估；與 `資料不平衡在大數據尺度下的訓練風險` 高度相關。
- [Google for Developers: embeddings](https://developers.google.com/machine-learning/crash-course/embeddings): 官方指出 one-hot 造成 `large sparse vectors`，需要更多資料、計算與記憶體；很適合支撐 `稀疏性 / 高維類別特徵` 對演算法與表示法選擇的影響。

## Community Insights (exam patterns)
- [國立高雄大學考生心得 PDF](https://statsite.nuk.edu.tw/var/file/37/1037/img/501709176.pdf): 2025-08-25 考生明述中級題目「多數為情境題」，重點在 `資料該怎麼處理、模型該怎麼選`；這與 L22401 的資料側定位一致。
- [iPAS 練功房](https://ipas-ai.net/): 非官方，但明示題庫來自經濟部公開資料，且已收錄 `250` 題官方考古題；可推估目前備考社群高度依賴「公開題型辨識」而非冷門理論推導。
- [iPAS AI 應用規劃師備考平台](https://twipas.lovable.app/): 非官方，但首頁聲稱已對齊 `115.02 評鑑內容範圍參考`、`114 年正式考題`、`中級三科官方學習指引`。此平台可作為社群訊號來源，但其「已收錄官方資料」說法仍需回到官方文件二次核對。
- 綜合可讀社群訊號：考生與備考平台普遍把中級視為 `情境式判斷 + 官方公開題重練`，而不是純背定義。
- L22401 相關高機率題型：
- `給定資料情境，判斷 batch / online / distributed 哪種較合適`
- `看 pseudocode 分辨一次更新是用全資料、單筆資料、還是 mini-batch`
- `看大數據特性（高維、流式、不平衡、稀疏、多模態）判斷哪類方法或架構較可擴展`
- 常見陷阱：
- 把 `可分散式處理` 誤當成 `所有演算法都天然適合分散式`
- 把 `資料量大` 一律推到 `batch learning`；若有 `Velocity`，往往更該考慮 online / incremental
- 把 `高維` 與 `大樣本數` 混為一談；高維時距離型方法可能先失效，未必因資料多就沒問題
- 把 `accuracy` 當成不平衡資料主要指標；官方 Google 文件已明示這是差指標
- 找不到夠強的公開社群證據來證明 `L22401` 已正式出過「batch vs online loop」原題；目前較穩妥寫法應是「高機率延伸考點」，不要寫成「已多次必考」。

## Current State (technology topic)
- Apache Spark 官網目前顯示 `Spark 4.0.2` 已於 `2026-02-05` 發布，另有 `4.2.0 preview` 公告；對考試書寫而言，版本號不是重點，重點是 `Spark MLlib 仍是分散式大數據 ML 的主流官方名詞`，且 `Spark / Ray` 已直接進入 iPAS 114 正式題。
- scikit-learn 官方 release history 顯示目前已到 `1.8.0`（`2025-12`）；對 L22401 最重要的不是新模型，而是 `out-of-core / incremental / partial_fit` 這條線仍然存在，代表「資料裝不進 RAM 時，應切換學習模式」仍是 current standard。
- scikit-learn 1.8 release notes 顯示 Array API 支援持續擴充；可推論現代單機流程更容易串接 GPU / PyTorch / CuPy，但這仍主要屬工具層補充，不是本 lesson 主軸。
- Spark 官方 optimization 文件仍保留 `miniBatchFraction`；表示 `mini-batch` 作為「以子樣本近似全資料梯度」的觀念仍是現行文件中的活概念。
- TensorFlow 官方目前同時維護 `MultiWorkerMirroredStrategy`（同步式多 worker）與 `ParameterServerStrategy`（parameter server）；這表示考題若比較 `集中複製同步更新` 與 `參數伺服器非同步 / 弱同步更新`，仍屬 current-standard 範圍。
- Google 官方文件對 `class imbalance`、`sparse vectors`、`curse of dimensionality` 都還在直接教；這些不是過時考點，反而是大數據下最穩定的「演算法選擇限制條件」。
- 目前找不到 iPAS 官方文件公開指定 `Spark 4.x`、`scikit-learn 1.8`、`TensorFlow 2.x` 這種精確版本為考點；版本號可作作者背景備註，不宜寫成考生必背。

## Key Findings Summary
- L22401 最應該教的是 `5V 如何改變演算法與訓練架構選擇`：`Volume` 推動 mini-batch / distributed / out-of-core，`Velocity` 推動 online / streaming，`Variety` 推動 Data Lake + distributed preprocessing，`Veracity` 影響噪音 / 偏差與穩定性，`Value` 影響是否值得用更重的分散式成本。
- 官方 114 正式題已明顯考 `Spark / Ray 分散式前處理`、`Approximate Quantile`、`高維導致距離法失效`；L22401 不該只寫抽象 5V，必須連到「哪類方法在大數據下會卡住」。
- `batch vs online/incremental` 應從資料量與資料到達方式來教，不要從 loss function 推導來教；scikit-learn 官方把 out-of-core learning 定義得很清楚，足夠支撐考點。
- `集中式 vs 分散式訓練架構` 應至少教到 `單機記憶體 / I/O / 計算瓶頸`、`同步多 worker`、`parameter server` 三者差異，並強調這是資料與系統設計題，不是模型內部題。
- `高維 / 稀疏 / 不平衡` 都要回到「演算法 scalability 與資料表示」：高維會讓距離型方法退化，稀疏 one-hot 會拉高記憶體與資料需求，不平衡會讓 batch 內 minority examples 不足。

## Scope Notes
- 本 lesson 應停在 `演算法是否能 scale、為何能 scale、在何種資料條件下不再適合`；不要展開 `backpropagation`、`loss function`、`optimizer 推導`，那些屬 L23303 或 L23202。
- `batch / mini-batch / online` 可教 `資料如何餵入、參數多久更新一次、何時適合`；不要深入到梯度公式推導。
- `distributed SGD / parameter server` 屬本 lesson 可教；`federated learning` 若從隱私保護與跨端資料不出域角度展開，應移到 L22404。
- `embeddings` 在這裡只能拿來說明 `稀疏高維表示會造成記憶體與計算成本`；不要延伸到 embedding 訓練原理。
- 目前沒有找到 iPAS 官方公開文件明列 `L22401` 專屬的 pseudocode / mini-batch tracing 題；建議教材寫成「依官方大綱與 current-standard 文件推定的高機率 code item」，並標明尚待更多公開考題佐證。
