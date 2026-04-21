# Research Notes: L22303 數據可視化工具

## Official Sources
- [iPAS 115 年度 AI 應用規劃師能力鑑定簡章](https://www.ipas.org.tw/api/proxy/uploads/certification/AIAP/115%E5%B9%B4%E5%BA%A6AI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E8%83%BD%E5%8A%9B%E9%91%91%E5%AE%9A%E7%B0%A1%E7%AB%A0%28%E5%88%9D%E3%80%81%E4%B8%AD%E7%B4%9A%29_0410_20260410115646.pdf): 中級 115 年考試日期為 2026-05-23、2026-11-14；可作為目前有效考試制度依據。未見公開中級「學習指引」頁面，現階段仍應以簡章、職能基準、公告試題為主。
- [iPAS AI 應用規劃師專區：職能基準檢索下載](https://www.ipas.org.tw/AIAP/AbilityStandardList.aspx): 官方明示 AI 應用規劃師能力鑑定係依職能基準發展；可作為課程切題依據，但頁面本身未直接列出 L22303 細項。
- [114 年第二次 AI 應用規劃師中級 第二科公告試題](https://www.ipas.org.tw/api/proxy/uploads/certification_resource/bf93f438f7be48d295c1b40a34d79f3d/114%E5%B9%B4%E7%AC%AC%E4%BA%8C%E6%A2%AF%E6%AC%A1%E4%B8%AD%E7%B4%9AAI%E6%87%89%E7%94%A8%E8%A6%8F%E5%8A%83%E5%B8%AB%E7%AC%AC%E4%BA%8C%E7%A7%91%E5%A4%A7%E6%95%B8%E6%93%9A%E8%99%95%E7%90%86%E5%88%86%E6%9E%90%E8%88%87%E6%87%89%E7%94%A8%28%E7%95%B6%E6%AC%A1%E8%A9%A6%E9%A1%8C%E5%85%AC%E5%91%8A114_20251226000634.pdf): 已直接出現與 L22303 高度相關題型。
  - Q45: `data.groupby("Platform")["Global_Sales"].sum().plot(kind="bar")`，考「從程式碼判讀圖表與聚合邏輯」。
  - Q46: `sns.barplot(... data=pd.melt(...), estimator=sum)`，考「seaborn 圖表選擇與資料轉 tidy/melt 後再畫圖」。
  - Q47: `sns.barplot(x="Name", y="NA_Sales", data=data.nlargest(5, "NA_Sales"))`，考「條狀圖適用情境與排序/前 N」。
  - Q30: 已出現先看散佈圖再判斷後續分析方法，顯示「先辨識圖表呈現的關係」是官方命題路線。
- [Tableau: Choose the Right Chart Type for Your Data](https://help.tableau.com/current/pro/desktop/en-us/what_chart_example.htm): 官方 chart chooser。依「要回答的問題」與「資料性質」選圖，例示 correlation 適合 scatter plot 或 highlight table。
- [Tableau Blueprint: Visual Best Practices](https://help.tableau.com/current/blueprint/en-us/bp_visual_best_practices.htm): 官方強調 chart choice 要看訊息傳達目的與受眾易讀性；可支撐「圖表類型選擇」與「視覺化效能/易讀性」。
- [Tableau: Best Practices for Effective Dashboards](https://help.tableau.com/current/pro/desktop/en-us/dashboards_best_practices.htm): 官方強調以最終顯示尺寸設計、避免縮到難讀、桌機/平板/手機裝置版型差異。
- [Power BI: Overview of visualizations](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualizations-overview): 官方依資料型態、分析目標、受眾、可用空間選 visual；適合做 Power BI 圖表對照表。
- [Power BI: Tips and tricks for creating reports](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-tips-and-tricks-for-creating-reports): 官方明講 pie chart 最好少於 8 類、混合尺度可用 combo chart、避免不必要 data labels、排序要服務閱讀目的。
- [Power BI: Data sources in Desktop](https://learn.microsoft.com/en-us/power-bi/connect-data/desktop-data-sources): 官方資料來源/連線入口；可支撐 Tableau vs Power BI 的 data-connection 比較。
- [Power BI: Share reports and dashboards](https://learn.microsoft.com/en-us/power-bi/collaborate-share/service-share-dashboards): 官方明示可在組織內外分享報表/儀表板。
- [Tableau: Connect to Data on the Web](https://help.tableau.com/current/online/en-us/creator_connect.htm): 官方列出 Tableau Cloud/Server 可連的 connector 類型、檔案上傳、Bridge/公開網路限制；可支撐 data-connection 比較。
- [Tableau: Share Web Content](https://help.tableau.com/current/pro/desktop/en-us/shareworkbooks.htm): 官方明示可分享 workbook/view/data source/flow，也可複製連結與嵌入。
- [Matplotlib Examples](https://matplotlib.org/stable/gallery/index.html): 2026-04 查得 stable docs 為 3.10.8；例庫涵蓋 bar、scatter、histogram、heatmap、box/violin、subplot、color 等，適合當「低階且彈性高」的官方依據。
- [Seaborn Example Gallery](https://seaborn.pydata.org/examples/index.html): 2026-04 查得 docs 為 0.13.2；例庫直接列出 `scatterplot`、`lineplot`、`histplot`、`boxplot`、`violinplot`、`heatmap`、`barplot` 等，適合當「高階統計視覺化」依據。
- [Seaborn objects interface](https://seaborn.pydata.org/tutorial/objects_interface.html): 官方說明 `objects` 介面於 0.12 引入，0.13.2 仍標示 experimental/incomplete；命題若考 library choice，較可能考 function API 與 matplotlib/seaborn 分工，而非進階 `objects` 細節。
- [Plotly Python docs](https://plotly.com/python/): 2026-04 查得 Python docs 為 v6.6.0；官方直接定位為 interactive、publication-quality graphs，適合與 matplotlib/seaborn 做「互動式 vs 靜態分析圖」比較。

## Community Insights (exam patterns)
- [Dcard 準備路徑分享](https://www.dcard.tw/f/softwareengineer/p/260219445): 考生回報「實際難度比想像中難很多，官方例題只是熱身」；可推測命題不只背名詞，會用情境與程式碼包裝。
- [SeniorDev 初級心得](https://www.seniordev.tw/aiying-yong-gui-hua-shi-chu-ji-neng-li-jian-ding-xin-de/): 非中級，但對題型觀察有參考性。
  - 題目常是「哪一項最接近/最適合」。
  - 四個選項都具迷惑性，死背效果有限。
  - 強調理解資料分析流程與實務判斷，而非單純術語記憶。
- 社群可驗證到的「L22303 明確回報」不多；目前最可靠的 exam-pattern 仍是官方 114 中級公告試題，而不是論壇傳聞。
- 可視化章節可能的常見陷阱題：
  - `bar chart` vs `histogram`: 類別比較 vs 連續分布。
  - `count` vs `sum` vs `mean`: 同樣都是 bar chart，但聚合目的不同。
  - `scatter plot` 用來看關係，不是拿來做類別總量比較。
  - `seaborn.countplot()` 是計數，不會自動幫你加總銷售額。

## Current State (if technology topic)
- Matplotlib 官方 stable docs 目前為 3.10.8，仍是最完整、最底層、可細緻控制出版級靜態圖的主力庫。來源：<https://matplotlib.org/stable/gallery/index.html>
- Seaborn 官方 docs 目前為 0.13.2，仍以「在 matplotlib 上提供較高階、較偏統計語意的 API」為定位；`objects` 介面已存在，但官方仍標註 experimental/incomplete。來源：<https://seaborn.pydata.org/examples/index.html>, <https://seaborn.pydata.org/tutorial/objects_interface.html>
- Plotly Python docs 目前為 6.6.0，主打互動式圖表、瀏覽器分享、dashboard/app 延伸。若考 library-choice，適合的情境是需要 hover、zoom、互動探索或網頁嵌入。來源：<https://plotly.com/python/>
- Power BI 價格已於 2025-04-01 起調整為 Pro US$14/user/month、PPU US$24/user/month。來源：<https://www.microsoft.com/en-us/power-platform/products/power-bi/pricing>
- Tableau 現行角色授權仍以 Creator / Explorer / Viewer 為主；2026-04 官網價格頁可查。來源：<https://www.tableau.com/zh-tw/pricing/>
- Power BI 官方 visual docs 已明示 Q&A visual 預計於 2026-12 deprecate；此點對 L22303 不是核心考點，但代表工具介面細節有時效性。來源：<https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualizations-overview>

## External Documents Found
- [Tableau chart chooser guide](https://help.tableau.com/current/pro/desktop/en-us/what_chart_example.htm): 已找到官方 help 版；另有官方 whitepaper 連結，但需 Tableau 帳號登入。
- [Power BI official chart reference](https://learn.microsoft.com/en-us/power-bi/visuals/power-bi-visualizations-overview): 已找到，且內容已按分析目標分類圖表。
- [Claus Wilke, Fundamentals of Data Visualization](https://clauswilke.com/dataviz/index.html): 已找到完整免費 web edition。
  - [Mapping data onto aesthetics](https://clauswilke.com/dataviz/aesthetic-mapping): 可直接支撐 pre-attentive/visual encoding 基礎，明列 position、shape、size、color、line width、line type。
  - [Common pitfalls of color use](https://clauswilke.com/dataviz/color-pitfalls): 可支撐 colorblind-safe、避免 rainbow scale、顏色不能承載過多資訊。
- [Edward Tufte: The Visual Display of Quantitative Information](https://www.edwardtufte.com/book/the-visual-display-of-quantitative-information/): 已找到官方書頁，可確認 data-ink ratio 與 graphical deception/ chartjunk 為核心概念。
- [Edward Tufte: Chartjunk](https://www.edwardtufte.com/notebook/chartjunk/): 已找到官方文章頁。
- [Matplotlib gallery](https://matplotlib.org/stable/gallery/index.html): 已找到。
- [Seaborn gallery](https://seaborn.pydata.org/examples/index.html): 已找到。
- [Plotly Python docs](https://plotly.com/python/): 已找到。
- [ColorBrewer 2.0](https://colorbrewer2.org/): 已找到；可直接篩選 `colorblind safe` 配色。
- [Matplotlib Choosing Colormaps](https://matplotlib.org/stable/users/explain/colors/colormaps.html): 已找到；官方說明 colormap 選擇原則。
- Edward Tufte 對 data-ink ratio 的「精確開放網頁定義」未找到可直接引用的免費官方全文；目前只能以官方書頁確認概念存在。若教材需要逐字定義，需由編寫者自行查書。
- AI 應用規劃師「中級學習指引」公開頁面未找到；這一點需明講，避免誤以為已有官方中級講義。

## Key Findings Summary
- 官方已經實際考過「從 `pandas`/`seaborn` 程式碼判讀應畫哪種圖、以及聚合是否正確」；L22303 不能只寫概念，必須納入 code-to-chart 題型。
- 圖表選擇的命題核心，很可能是「資料型態 + 分析目的 + 聚合方式」三者配對，而不是單純背圖名。
- `matplotlib vs seaborn vs plotly` 的高機率考法是情境選庫：`matplotlib` 偏細節控制與靜態圖、`seaborn` 偏統計探索與高階 API、`plotly` 偏互動式與分享。
- Tableau/Power BI 比較可考點集中在：角色/受眾、授權價格、可連接資料來源、分享方式，而不是深 BI 後台治理。
- 色彩與可讀性應聚焦在可視化實務原則：避免 chartjunk、避免不必要 3D、使用 colorblind-safe palette、不要只靠顏色傳遞資訊。

## Scope Notes
- 不要擴寫統計公式、相關係數計算、檢定細節；那屬 L22101-L22103。
- 不要把 PCA、ROC、特徵重要性圖、模型解釋圖等 ML-specific 視覺化當主體；那偏 L23301。
- Power BI / Tableau 的 tenant admin、權限治理、ETL/refresh 架構、Bridge/Data Connect 深度設定都超出本節核心；本節只需到「連線/分享/圖表選擇」層級。
- Tufte 的 data-ink ratio、chartjunk 適合教成設計原則與判斷題，不宜延伸成過多美學史或資訊設計史內容。
