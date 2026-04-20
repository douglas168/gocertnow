# Research Notes: L22103 假設檢定與統計推論

Research conducted 2026-04-20 for iPAS AI應用規劃師中級。以官方 `115.02` 評鑑內容範圍、官方學習資源頁、官方中級科目二學習指引、`114` 樣題/公告試題、SciPy 官方文件為主；社群與商業備考站僅作 exam pattern 輔助。

## Official Sources
- [AI 應用規劃師能力鑑定評鑑內容範圍參考（115.02）](https://www.ipas.org.tw/api/proxy/uploads/certification_news/05a129ac3ddb4b3da23fef4abecfa0e3/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A_%E8%A9%95%E9%91%91%E5%85%A7%E5%AE%B9%E7%AF%84%E5%9C%8D%E5%8F%83%E8%80%83_11502_20260226174411.pdf): 最新官方邊界只明列 `L22103 假設檢定與統計推論`，未細列 Wilcoxon、Mann-Whitney、Cohen’s d、多因子 ANOVA；可用來限制本 lesson 不外擴到非參數檢定與效果量。
- [AI應用規劃師 - 學習資源](https://ipd.nat.gov.tw/ipas/certification/AIAP/learning-resources): 官方已上線中級科目二學習指引、`114年9月版` 中級樣題、`114年第二梯次` 中級公告試題；這是目前最直接的官方備考入口。
- [AI應用規劃師（中級）學習指引－科目2 大數據處理分析與應用](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE2%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8_20251222101850.pdf): 明確寫出 L22103 核心流程：設定 `H0/H1`、決定 `α`、計算統計量與 `p 值`、比較 `p 值` 與 `α`、作結論；也定義 `信賴區間`、`型一錯誤 α`、`型二錯誤 β`、`檢定力 1-β`。
- 同一份 [中級學習指引](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%28%E4%B8%AD%E7%B4%9A%29-%E5%AD%B8%E7%BF%92%E6%8C%87%E5%BC%95-%E7%A7%91%E7%9B%AE2%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8_20251222101850.pdf): 官方學習材料確認本章主線檢定是 `單樣本 t`、`獨立樣本 t`、`配對樣本 t`、`卡方獨立性檢定`、`單因子變異數分析（One-way ANOVA）`；並明示統計量對應 `t 值 / 卡方值 / F 值`。
- [iPAS AI應用規劃師中級能力鑑定-考試樣題（114年9月版）](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/iPAS%20AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E4%B8%AD%E7%B4%9A%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A-%E8%80%83%E8%A9%A6%E6%A8%A3%E9%A1%8C(114%E5%B9%B49%E6%9C%88%E7%89%88)%20_v2_20251222174110.pdf): 樣題已直接考「兩組平均數差異用 `t 檢定`、三組以上平均數差異用 `F 檢定`」，顯示命題是「依情境選檢定」而非推導公式。
- [114年第二梯次中級 AI應用規劃師第二科公告試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000634.pdf): 正式題已出現 `單樣本 t 檢定 + p 值 + 95%信賴區間` 的整合判讀題，題幹明確用「`p 值=0.08`、`α=0.05`、`95%信賴區間` 是否含假設值」來考決策。
- [115年度 AI應用規劃師能力鑑定簡章（初、中級）](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0410_20260410115646.pdf): 2026-04-10 最新版簡章確認中級仍是科目二「大數據處理分析與應用」，沒有另外拆出統計推論獨立考科；本 topic 應維持資料分析組脈絡下的基礎推論統計。
- [scipy.stats.ttest_ind](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.ttest_ind.html): 官方文件定義為「兩組獨立樣本平均數的 t 檢定」；`equal_var=True` 為預設，`alternative` 支援 `two-sided/less/greater`。
- [scipy.stats.chi2_contingency](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.chi2_contingency.html): 官方文件定義為列聯表的獨立性卡方檢定；輸入是 `observed` 計數表，不是比例表；文件並提醒常見有效性經驗法則是每格 observed/expected 頻數至少約 `5`。
- [scipy.stats.f_oneway](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.f_oneway.html): 官方文件定義為 `one-way ANOVA`；函式簽名為 `f_oneway(*args, axis=0)`，無 `equal_var` 參數。
- [國立高雄科技大學教材：假設檢定](https://www2.nkust.edu.tw/~tsungo/Publish/09%20Hypothesis%20testing.pdf): 可作中文命題常用語對照；教材使用「設定顯著水準 α → 設 H0/H1 → 算 p 值 → 與 α 比較」的傳統表述，且常出現「接受虛無假設」用語，與官方學習指引的「無法拒絕虛無假設」形成可比較的中文教育慣例。
- [臺大 CASE 科學Online：比例檢定](https://case.ntu.edu.tw/highscope/%E6%AF%94%E4%BE%8B%E6%AA%A2%E5%AE%9A/index.html): 台灣科普教育來源，明確把假設檢定決策寫成「利用統計量、`p-value` 與信賴區間來評估」，可支撐華語教學中 `p 值 / 信賴區間 / 決策方式` 常一起出題。

## Community Insights (exam patterns)
- [iPAS 練功房](https://ipas-ai.net/): 非官方備考站強調收錄 `250` 道官方考古題、五科完整題庫、並以「模擬真實考試環境」練習；可推知考生社群確實把「刷官方題」視為核心備考方式。
- [104學習：iPAS AI應用規劃師能力鑑定(中級)](https://nabi.104.com.tw/assess/0b1426fe-7c6c-4138-a059-f59400d7eebe): 104 的中級前測頁明寫「本測驗為參考 `114年` 中級考試樣題」，代表商業備考社群也以官方樣題為題型模板，而非自創題庫邏輯。
- [104學習精靈：iPAS+AI應用規劃師能力鑑定(中級)_樣題](https://nabi.104.com.tw/ability/10049057/iPAS%2BAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%28%E4%B8%AD%E7%B4%9A%29_%E6%A8%A3%E9%A1%8C): 搜尋摘要指出中級樣題定位給較高難度的資通訊背景考生；可作為「中級會偏情境判讀，不只背名詞」的旁證。
- 目前能找到的社群來源，多半是練題平台、前測頁、商業課程頁；真正公開討論「L22103 細目考什麼」的高品質考生討論很少。對 Wilcoxon、Mann-Whitney、Cohen’s d 是否常考，社群沒有可信一致證據。
- 從官方樣題與社群練題站交叉看，常見題型更像：
- 依情境判斷該用哪種檢定，而不是手算完整推導。
- 給 `α`、`p 值`、信賴區間或檢定統計量，要求作結論。
- 用中文敘述混搭英文術語，例如 `null hypothesis / alternative hypothesis / p-value / confidence interval / one-sample t-test`。
- 可能出現 `pseudocode` 或 API/函式片段的讀碼型題目，但目前官方正式證據主要在科目二程式判讀趨勢，未直接看到本 topic 的 `scipy.stats` 函式題。

## Current State (if technology topic)
- `SciPy` 官方參考文件目前可見頁面版本為 `v1.17.0`；本研究以 2026-04-20 當下官方 reference page 為準。
- `ttest_ind` 適用「兩組獨立樣本平均數比較」；若不假設變異數相等，可用 `equal_var=False`。這對教材寫法很重要，因為考綱只說 `t-test`，但實作時常見「一般雙樣本 t 檢定 vs Welch t 檢定」差異。
- `chi2_contingency` 的正確輸入是列聯表 `observed` 原始次數；SciPy 文件直接寫 expected frequencies 由邊際和計算而來，與官方學習指引「不能拿百分比直接做卡方」一致。
- `f_oneway` 是 `one-way ANOVA`，不是多因子 ANOVA；這和本 lesson 邊界相符，應只教「三組以上平均數整體差異的 F 檢定框架」。
- 沒找到官方 `SciPy` 文件或 iPAS 官方資料顯示 `ttest_ind / chi2_contingency / f_oneway` 已被淘汰；可安全作為 Python 實作對照函式。
- 沒找到 iPAS 官方文件直接把 `scipy.stats.ttest_ind`、`chi2_contingency`、`f_oneway` 列入評鑑內容。較保守的寫法應是：這三個函式「與官方列出的 t-test / 卡方 / ANOVA 對應良好，適合作為程式實作示例」，而不是「官方明文規定必考 API」。

## External Documents Found
- Wilcoxon: 官方 `115.02` 範圍未列；官方學習指引本章主要線是 t / 卡方 / ANOVA，未找到近期待考題或樣題直接考 Wilcoxon。結論：`不建議納入本 lesson 主線`。
- Mann-Whitney U: 官方中級學習指引有列入「非參數檢定」延伸內容，但 `115.02` 評鑑內容範圍未明列，且未找到 `114` 樣題/公告試題直接出題。結論：`可在 scope note 提醒曾出現在學習指引延伸段，但不列為本 lesson 必教`。
- ANOVA multi-factor: 官方學習指引主線是 `單因子變異數分析（One-way ANOVA）`；未找到官方材料支持多因子 ANOVA 為本 topic 必備。結論：`排除`。
- Cohen’s d / effect size: 官方學習指引提到「顯著性不等於實質重要性」，但未找到官方中級範圍或正式題把 Cohen’s d 列為檢定主題。結論：`排除`。

## Key Findings Summary
- 最新官方範圍文件只把本章定名為 `L22103 假設檢定與統計推論`，沒有把非參數檢定、效果量、多因子 ANOVA 明列進 scope；lesson 應守在 `H0/H1、α/β/p-value/CI、t/chi-square/F`。
- 官方學習指引已把本章核心決策語言寫得很明確：`設定 H0/H1 → 設 α → 算統計量與 p 值 → 比較 p 值與 α → 作結論`；且官方偏好表述是 `p 值 ≤ α 拒絕 H0`、`p 值 > α 無法拒絕 H0`。
- `114` 正式公告試題已把 `p 值` 與 `95%信賴區間` 放在同一題考；寫 study guide 時應把兩者的判讀關係放在一起，而不是拆成兩個孤立概念。
- 官方學習材料確認三個主要檢定用例：`t-test` 比較平均數、`卡方獨立性檢定` 比較類別關聯、`單因子 ANOVA / F 值` 比較三組以上平均數。
- `scipy.stats.ttest_ind / chi2_contingency / f_oneway` 與本章三個檢定一一對應，但目前沒有找到 iPAS 官方明文說「這三個 API 必考」；較安全的定位是「實作對照函式」。

## Scope Notes
- 官方學習指引確實出現 `Mann-Whitney U`、`Kruskal-Wallis` 等非參數檢定，但這些超出本題 boundary rule；若要提，只能在備註說「官方延伸閱讀有出現，但本 lesson 不展開」。
- 沒找到官方或高可信社群證據支持本章要教 `Wilcoxon`、`Cohen’s d`、Bayesian inference、regression、ML-specific statistics；應排除。
- `F-test` 在本章最穩妥的教法是「變異數比較 / one-way ANOVA setup / F 值判讀」；不要延伸到多因子 ANOVA、事後檢定、實驗設計細節。
- 中文命題用語需特別處理：
- 官方學習指引偏好 `無法拒絕虛無假設`，這比 `接受虛無假設` 更嚴謹。
- 但台灣教材常仍寫 `接受 H0`；若 study guide 要防陷阱，應明講這是常見但較鬆的說法。
- 若要放 worked example，最符合官方題型的是：
- 給定 `t-stat / p 值 / α / 95%CI`。
- 判斷 `p 值 ≤ α` 是否成立。
- 說明是 `拒絕 H0` 還是 `無法拒絕 H0`。
- 補一句「這不等於證明 H0 為真」。
