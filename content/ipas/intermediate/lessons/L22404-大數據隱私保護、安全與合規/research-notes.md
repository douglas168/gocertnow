# Research Notes: L22404 大數據隱私保護、安全與合規

## Official Sources
- [iPAS 115 年 AI 應用規劃師簡章](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0410_20260410115646.pdf): 官方最新簡章已於 2026-04-10 公告；中級為「科目1 必考 + 科目2/3 擇一」，L22404 屬科目 2「大數據處理分析與應用」能力範圍。官方定位中級對象為具資通訊技術能力、曾參與 AI 導入或開發者。
- [iPAS 評鑑內容範圍參考（114.02）](https://www.ipas.org.tw/DownloadFile.ashx?filename=61f86d56-007d-42c2-ad1e-32dab170f977_AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%A9%95%E9%91%91%E5%85%A7%E5%AE%B9%E7%AF%84%E5%9C%8D%E5%8F%83%E8%80%83_11402.pdf&type=10): 明列 `L22404 大數據隱私保護、安全與合規`；可作為命題邊界的最核心官方依據。
- [iPAS AI 應用規劃師學習資源頁](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources): 官方已提供中級科目 2 學習指引、114 年 9 月版考試樣題、114 年第二梯次公告試題。對出題者最有價值的是「學習指引 + 歷屆公告試題」的組合。
- [iPAS 中級科目 2 學習指引](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE2%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8_20251222101850.pdf): 官方明寫本手冊為「依據各科目評鑑內容進行重點說明與考題解析」；6.4 節即為本主題。對 L22404，學習指引已明確放入非個資／匿名化、重識別風險測試、資料治理等內容。
- [114 年第二梯次中級公告試題：科目 2](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000634.pdf): 已出現「不解密原始資料仍可運算」情境，答案為 `同態加密 (Homomorphic Encryption)`。這表示命題不是只考名詞，會考資料保護技術與應用情境配對。

## Community Insights (exam patterns)
- [Dcard 準備路徑分享](https://www.dcard.tw/f/softwareengineer/p/260219445): 考生回報「官方例題只是熱身」「很多是情境題」，偏向企業導入與方案選型，而非單純背定義。
- 社群可驗證的一手討論不多；目前較可引用的是 Dcard 與民間題庫站，但後者多屬二手整理，可信度低於官方。對本主題，應以官方學習指引與公告試題反推考點，不宜把論壇心得當主證據。
- 從官方公告試題可推論常見題型：
  - 給定企業場景，問最適合的隱私／安全技術。
  - 比較相近概念的適用情境，例如匿名化 vs 雜湊 vs 本地化 vs 同態加密。
  - 將法規要求轉成技術控制，例如適當安全措施、預設隱私保護、處理安全性。
- 目前沒有找到足夠可靠的 Reddit/PTT 討論可支持「L22404 明確常考哪幾題」；這一項需明說資料不足。

## Current State (if technology topic)
- [ISO/IEC 27701 官方頁](https://www.iso.org/standard/27701): `ISO/IEC 27701:2025` 已是最新版本；官方 FAQ 明示可作為獨立的 Privacy Information Management System 標準使用。若教材仍以 2019 版描述為「ISO/IEC 27001/27002 擴充」，需加註版本差異。
- [GDPR 官方法規全文](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng): Art. 25 與 Art. 32 內容本身未變，但近年 CJEU 判決持續補充「appropriate technical and organisational measures」的解釋；考試較可能考法條核心義務，而非判例細節。
- [Apple: Learning with Privacy at Scale](https://machinelearning.apple.com/research/learning-with-privacy-at-scale): Apple 仍以 local differential privacy 架構說明大規模產品隱私蒐集；可用來佐證 DP 已有實務落地，不只是理論。
- [Google Research: Parfait](https://research.google/blog/parfait-enabling-private-ai-with-research-tools/): Google 近年將 private AI 分成 transparency、data minimization、data anonymization、external verifiability 四柱，其中 data minimization 明列 federated learning / secure aggregation，data anonymization 明列 differential privacy。這可作為「現行業界實務怎麼分類」的近況補充。
- [Google federated.withgoogle.com/secure-aggregation](https://federated.withgoogle.com/secure-aggregation/): Google 官方 federated learning 資源仍把 secure aggregation 視為聯邦學習重要隱私強化機制。

## External Documents Found
- [個人資料保護法（全國法規資料庫）](https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=I0050021): 第 3 條列當事人權利；第 5 條要求蒐集、處理、利用不得逾越特定目的必要範圍；第 6 條對病歷、醫療、基因、健康檢查、犯罪前科等特種個資採更高限制，並要求在法定情形下有「適當安全維護措施」。
- [個人資料保護法施行細則（全國法規資料庫）](https://law.moj.gov.tw/LawClass/LawAll.aspx?PCode=I0050022): 第 12 條把「適當安全措施」具體化為人員配置、風險評估、事故預防/通報/應變、內部程序、資料安全管理、教育訓練、設備安全、稽核、軌跡保存、持續改善等。這非常適合轉成 RBAC/ABAC、加密、稽核與存取控管考點。
- [GDPR Art. 25 / Art. 32（EUR-Lex Regulation (EU) 2016/679）](https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng): Art. 25 核心是 `data protection by design and by default`；Art. 32 核心是依風險採取適當技術與組織措施，條文點名 pseudonymisation、encryption、CIA/韌性、災難復原、定期測試。
- [ISO/IEC 27701 官方頁](https://www.iso.org/standard/27701): 可確認標準名稱、用途、適用對象與最新版本；但標準全文需付費，公開頁只能取得高階摘要，無法直接引用控制項細目。
- [Dwork & Roth, The Algorithmic Foundations of Differential Privacy](https://www.cis.upenn.edu/~aaroth/privacybook.html): 差分隱私基礎經典來源，可作為 ε、δ 與 DP 定義的學術基準。
- [Apple Differential Privacy Overview PDF](https://images.apple.com/privacy/docs/Differential_Privacy_Overview.pdf): 官方 DP 白皮書；可補充 Apple 在產品中使用 DP 的實務說明。
- [Apple Learning with Privacy at Scale](https://machinelearning.apple.com/research/learning-with-privacy-at-scale): 更完整說明 local DP、傳輸使用 TLS、裝置端先私有化、伺服器端做 ingestion/aggregation。
- [McMahan et al. 2017, Communication-Efficient Learning of Deep Networks from Decentralized Data](https://proceedings.mlr.press/v54/mcmahan17a.html): 聯邦學習/FedAvg 基礎論文；明確主張訓練資料留在裝置端、只聚合更新。
- [Bonawitz et al. 2017, Practical Secure Aggregation for Privacy Preserving Machine Learning](https://eprint.iacr.org/2017/281): secure aggregation 經典來源；用來說明伺服器只學到聚合總和、不看見個別更新。
- [Google Research: Federated Learning with Autotuned Communication-Efficient Secure Aggregation](https://research.google/pubs/federated-learning-with-autotuned-communication-efficient-secure-aggregation/): Google 官方研究頁，可補充 secure aggregation 仍是現行 FL 實務主線。
- `k-anonymity / l-diversity / t-closeness`: 找到大量二手教材，但未找到官方法規或 cert vendor 一手文件直接點名這三者；可教，但應標註為「匿名化常見技術框架，非本考科官方文件明文列名」。
- `RBAC / ABAC / column-level security`: 找到大量業界文件，但未找到 iPAS 官方文件直接點名；建議作為「施行細則第 12 條安全措施的技術落地例子」處理，不要包裝成官方明列術語。

## Key Findings Summary
- 官方命題依據最重要的不是簡章，而是 `評鑑內容範圍 + 中級科目 2 學習指引 + 公告試題`；L22404 在官方最新學習指引中已有獨立小節，可直接作為出題藍本。
- 此主題明顯偏「資料層保護技術與合規」：匿名化/去識別化、差分隱私、聯邦學習、secure aggregation、加密、存取控制、適當安全措施，符合題目設定的 boundary rule。
- 官方已用情境題考過 `同態加密`；推測 L22404 常見命題方式會是「需求或法規義務 → 對應最適合技術控制」。
- 法規面最有考試價值的是：台灣個資法第 3/5/6 條、施行細則第 12 條、GDPR Art. 25/32；比背完整法條更重要的是知道它們對應哪些技術控制。
- `ISO/IEC 27701` 已有 2025 新版，若教材仍沿用 2019 版敘述，需明確標記版本；否則容易出現「27701 是否必須依附 27001」的錯誤簡化。

## Scope Notes
- 依 boundary rule，本筆記只保留「保護資料集本身」的內容；模型卡、推論後審計、ML lifecycle 文件化不納入主結論，應歸 L23401。
- 官方學習指引在 6.4 節後段會延伸到企業 AI 治理與跨部門制度；若涉及模型輸出透明性、偏誤治理、責任分工，容易跨到較高層治理主題，出題時需收斂回資料層控制。
- `k-anonymity / l-diversity / t-closeness`、`RBAC / ABAC / column-level security` 對本課很有用，但目前缺少 iPAS 官方明文列點；適合放在教學延伸，不宜假定為官方固定術語題。
