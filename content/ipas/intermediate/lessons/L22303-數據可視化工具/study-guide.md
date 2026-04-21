# L22303 數據可視化工具 Study Guide

## 1. Exam Item Mapping

> 對應評鑑範圍：**L22303 數據可視化工具** ＋ **L22 大數據處理分析與應用**

- 本主題定位在資料分析流程的「輸出層」，重點不是再算一次統計，而是把資料用對的圖、對的工具、對的設計原則表達清楚。
- 對應考法通常有 4 類：
  - 圖表類型判斷：看到情境，判斷該用哪一種圖。
  - 程式碼判讀：看到 `matplotlib`、`seaborn`、`plotly` 程式碼，判斷畫出什麼圖。
  - 工具選擇：比較 `matplotlib`、`seaborn`、`plotly`、`Tableau`、`Power BI` 的適用情境。
  - 視覺化設計原則：判斷圖表是否有 `chart junk`、色彩是否合理、`data-ink ratio` 是否高。
- 本章和前面課程的關係：
  - 你已在 L22203 學過基本 Python 資料處理，本章假設你知道 `DataFrame`、欄位、聚合、排序、`groupby` 等概念。
  - 你已在 L22101-L22103 學過統計基礎，本章不重講公式，而是重點放在「如何把結果畫對」。
- 本章不處理的內容：
  - 不展開統計檢定與公式。
  - 不展開機器學習專用視覺化，例如 PCA、ROC、特徵重要性圖。
  - 不深入 BI 平台管理、權限治理、ETL/refresh 架構。

---

## 2. 關鍵概念總覽圖 (Knowledge Tree)

```text
📖 L22303 數據可視化工具
  ├─ 📌 核心定位：資料分析結果的呈現層
  │  ├─ 目標：讓人「看懂」而不是只把圖畫出來
  │  ├─ 命題方向：圖表選擇、工具比較、程式碼判讀、設計原則
  │  └─ ⚠️ 常見誤區：把視覺化當裝飾，不是當資訊編碼
  │
  ├─ 📖 資訊呈現原則 (Information Presentation Principles)
  │  ├─ Edward Tufte
  │  │  ├─ data-ink ratio：資料墨水 / 總墨水
  │  │  ├─ 🔥 越高越好，不是越低越好
  │  │  └─ ⚠️ 題目愛考：刪格線、背景、裝飾後是否更有效
  │  ├─ chart junk 圖表垃圾 (Chart Junk)
  │  │  ├─ 3D 效果
  │  │  ├─ 過度陰影、漸層、貼圖
  │  │  ├─ 無意義背景圖
  │  │  └─ ⚠️ 美化不一定是垃圾；干擾讀值才是重點
  │  ├─ 前注意屬性 (Pre-attentive Attributes)
  │  │  ├─ position 位置：最強
  │  │  ├─ color 顏色：適合分類或強調
  │  │  ├─ size 大小：能表強弱，但精確度較差
  │  │  ├─ shape 形狀：可分組，但種類太多會亂
  │  │  └─ ⚠️ 只靠顏色傳遞資訊，色弱使用者易失敗
  │  ├─ 色彩設計 (Color Design)
  │  │  ├─ colorblind-safe palette 色盲友善配色
  │  │  ├─ viridis：常見安全連續色盤
  │  │  ├─ ColorBrewer：常用配色參考
  │  │  ├─ sequential 連續色階：由低到高
  │  │  ├─ diverging 發散色階：有中心點上下偏離
  │  │  ├─ categorical 類別色階：不同類別分色
  │  │  └─ ⚠️ 非中心型資料別亂用 diverging
  │  └─ 版面配置 (Layout)
  │     ├─ figure-ground contrast 圖地對比
  │     ├─ alignment 對齊
  │     ├─ whitespace 留白
  │     └─ ⚠️ 儀表板不是塞滿就叫資訊完整
  │
  ├─ 📊 圖表類型選擇 (Chart Type Selection)
  │  ├─ comparison 比較
  │  │  ├─ bar chart 長條圖
  │  │  └─ grouped bar 分組長條圖
  │  ├─ distribution 分佈
  │  │  ├─ histogram 直方圖
  │  │  ├─ box plot 箱線圖
  │  │  └─ violin plot 提琴圖
  │  ├─ composition 組成
  │  │  ├─ pie chart 圓餅圖
  │  │  ├─ donut chart 環圈圖
  │  │  └─ stacked bar 堆疊長條圖
  │  ├─ relationship 關係
  │  │  ├─ scatter plot 散布圖
  │  │  └─ heatmap 熱圖
  │  ├─ trend 趨勢
  │  │  └─ line chart 折線圖
  │  └─ 🔥 最常混淆
  │     ├─ bar chart vs histogram
  │     ├─ stacked bar vs grouped bar
  │     ├─ box plot vs violin plot
  │     └─ pie chart 不是禁用，是限用
  │
  ├─ 🔧 Python 與 BI 工具
  │  ├─ matplotlib
  │  │  ├─ 低階 (low-level)
  │  │  ├─ 完整控制
  │  │  ├─ 靜態輸出強
  │  │  └─ 🔥 出版品質圖表常考
  │  ├─ seaborn
  │  │  ├─ 建立在 matplotlib 上
  │  │  ├─ 高階 (high-level)
  │  │  ├─ 統計視覺化友善
  │  │  └─ ⚠️ 不是獨立繪圖引擎
  │  ├─ Plotly
  │  │  ├─ 互動式 (interactive)
  │  │  ├─ hover / zoom / pan
  │  │  ├─ dashboard / web 嵌入
  │  │  └─ ⚠️ 題目問互動，優先想到 Plotly
  │  ├─ Tableau
  │  │  ├─ 拖拉式 BI
  │  │  ├─ 商業溝通強
  │  │  ├─ 對非技術主管友善
  │  │  └─ ⚠️ 授權費與角色分級常被混考
  │  └─ Power BI
  │     ├─ Microsoft 生態整合
  │     ├─ Office 365 / Azure 友善
  │     ├─ Desktop 可免費起步
  │     └─ DAX 常作為加分辨識點
  │
  ├─ ⚖️ 視覺化效能 (Visualization Effectiveness)
  │  ├─ data density 資料密度
  │  ├─ clarity 清晰度
  │  ├─ decode time 解碼時間
  │  ├─ dashboard clarity 儀表板清楚度
  │  └─ accessibility 無障礙/可及性
  │     ├─ 色盲友善
  │     ├─ 文字可讀
  │     ├─ 顏色不是唯一編碼
  │     └─ ⚠️ 好看但看不懂，一樣低分
  │
  ├─ 🧩 程式碼判讀
  │  ├─ plt.bar()：長條圖
  │  ├─ plt.hist()：直方圖
  │  ├─ plt.scatter()：散布圖
  │  ├─ plt.plot()：折線圖
  │  ├─ sns.heatmap(..., annot=True)：熱圖 + 註記
  │  ├─ sns.boxplot()：箱線圖
  │  ├─ px.scatter()：互動散布圖
  │  └─ ⚠️ 程式名 + 欄位型態 + 分析目的要一起看
  │
  └─ 📝 應試重點
     ├─ 問題先分類：比較 / 分佈 / 組成 / 關係 / 趨勢
     ├─ 再看資料型態：類別 / 連續 / 時間
     ├─ 再選工具：靜態 / 快速 EDA / 互動 / 商業分享
     └─ ⚠️ 不要只背圖名，要背「為什麼這題是它」
```

---

## 3. Core Concepts

> 📊 **視覺輔助圖表：**
> - [v1 圖表類型選擇決策樹](diagrams/v1-chart-chooser-flowchart.mmd) — 依資料關係快速選圖
> - [v2 視覺化工具定位圖](diagrams/v2-tool-comparison-matrix.mmd) — 互動度 vs 技術門檻象限
> - [v3 前注意屬性分類](diagrams/v3-pre-attentive-attributes.mmd) — 色彩/形狀/大小/位置分類
> - [v4 Data-Ink Ratio 概念圖](diagrams/v4-data-ink-ratio-concept.mmd) — Chart Junk vs 必要墨水
> - [v5 Python 函式庫選擇流程](diagrams/v5-python-library-selection.mmd) — matplotlib/seaborn/plotly 決策樹

### 3.1 資訊呈現原則 (Information Presentation Principles)

#### 3.1.1 `data-ink ratio` 資料墨水比

- `data-ink ratio`（資料墨水比）是 Edward Tufte 提出的核心概念，意思是：

```text
data-ink ratio = data ink / total ink used
資料墨水比 = 用來表達資料的墨水 / 圖上所有墨水
```

- 直覺上就是：圖上有多少視覺元素真的在傳達資料，而不是只在佔版面。
- 🔥 考點結論：`data-ink ratio` 的方向是**提高（maximize）**，不是降低。
- 如果一張圖有很厚的外框、很重的格線、背景花紋、立體陰影、裝飾圖片，但真正資料只有幾根柱子，這張圖的 `data-ink ratio` 就偏低。
- 反過來說，把多餘裝飾去掉、保留必要刻度與標籤，通常能提高 `data-ink ratio`。

🗣️ 白話說明：
就像你在 LINE 群組整理會議重點，如果真正重點只有 3 行，結果前面先放 8 張貼圖、5 個分隔線、彩色字、超長簽名檔，大家會花很多時間找重點。`data-ink ratio` 就是在問：到底多少畫面是「重點」。

#### 3.1.2 `chart junk` 圖表垃圾

- `chart junk`（圖表垃圾）指的是不必要、會干擾理解、卻沒有增加資訊價值的視覺元素。
- 常見例子：
  - 3D 長條圖或 3D 圓餅圖。
  - 過度漸層、反光、陰影。
  - 與資料無關的背景照片。
  - 每個資料點都加大量動畫或圖示。
  - 刻度密到像牆紙、標籤重疊到看不清。
- 題目不一定用英文問你，有時會改成「降低可讀性」、「增加認知負擔」、「干擾判讀」。

🔥 高頻判斷：
- 不是所有裝飾都等於 `chart junk`。
- 如果裝飾有助於理解，例如用柔和底色區分區塊、用一致配色提示分類，未必算垃圾。
- 真正的判斷標準是：它有沒有幫助讀者更快、更準確解讀資料。

🗣️ 白話說明：
像 Instagram 限動封面可以很好看，但如果你把「今晚 7 點開會」做成霓虹字、火焰動畫、滿版星星，結果大家看半天才知道時間地點，這些特效就變成 `chart junk`。

#### 3.1.3 `pre-attentive attributes` 前注意屬性

- `pre-attentive attributes`（前注意屬性）是指人眼在還沒進入深度思考前，就能快速察覺的視覺特徵。
- 本章必記四個：
  - `position`（位置）
  - `color`（顏色）
  - `size`（大小）
  - `shape`（形狀）
- 強度通常可這樣理解：
  - `position`（位置）最強，因為人很擅長比較位置高低、左右、對齊。
  - `color`（顏色）適合分類、強調、區別群組。
  - `size`（大小）可表現量感，但人對面積/大小的精確判斷不如位置。
  - `shape`（形狀）可用於分類，但類別一多就容易亂。

```text
前注意屬性強度記憶：
位置 > 顏色 > 大小 > 形狀
```

- 在圖表設計中，越重要的資訊，越應該用更強的視覺編碼。
- 例如比較數值高低時，用長條圖的柱高或散布圖的位置，通常比用一堆不同大小圖示更好讀。

🗣️ 白話說明：
像你在 7-11 貨架上找「第二件 6 折」的標籤，最先跳進眼睛的是紅色標籤、位置突出、尺寸較大，不是你先逐字閱讀。這就是前注意屬性在工作。

#### 3.1.4 色彩設計 (Color Design)

- 色彩不是拿來「讓圖變漂亮」而已，而是視覺編碼的一部分。
- 先記三種色階（color scales）：
  - `sequential color scale`（連續色階）：表示由少到多、由低到高，例如銷售額、溫度、次數。
  - `diverging color scale`（發散色階）：表示相對於某個中心值往兩側偏離，例如高於/低於平均、正/負變化。
  - `categorical color scale`（類別色階）：表示互不連續的類別，例如平台別、部門別、產品類型。

```text
數值大小一路增加        -> sequential
有「中心點」左右偏離    -> diverging
彼此不同類別            -> categorical
```

- `viridis` 是常見的色盲友善（colorblind-safe）連續色盤，亮度變化自然，適合表現連續數值。
- `ColorBrewer` 是常見的配色參考來源，能依用途選擇連續、發散、類別型色盤，也能篩選色盲友善。
- 設計原則：
  - 避免彩虹色（rainbow scale）濫用，因為感知順序不穩定，容易誤導。
  - 不要只靠顏色傳遞資訊，最好搭配標籤、位置、形狀。
  - 類別數太多時，不要硬上 12 種顏色；考慮合併、篩選或改圖表。
  - 強調色要節制，主角 1 個就夠，否則每個都亮就等於沒有主角。

ASCII 色階對照：

```text
Sequential 連續色階
淺 -> 中 -> 深
[  ]-[..]-[##]
用途：大小遞增、強度遞增

Diverging 發散色階
藍 -> 白 -> 紅
[--]-[  ]-[++]
用途：低於中心 / 高於中心

Categorical 類別色階
紅 綠 藍 橘 紫
[R] [G] [B] [O] [P]
用途：不同類別
```

🗣️ 白話說明：
像 YouTube 留言按讚數，用顏色深淺表示多寡很合理，因為那是一路增加的量；但如果是「支持 / 中立 / 反對」，就比較像有中心點兩邊分開，適合發散色階。

#### 3.1.5 版面配置 (Layout Principles)

- `figure-ground contrast`（圖地對比）：資料要能從背景中清楚跳出來。
- `alignment`（對齊）：標題、圖例、軸標籤、圖表本體要整齊，對齊能降低讀者搜尋成本。
- `whitespace`（留白）：留白不是浪費，而是幫助分群與呼吸。
- 儀表板或單張圖都應遵守：
  - 標題先說結論或至少說清楚內容。
  - 圖例放在容易對照的位置。
  - 重要圖放上方或左上，符合閱讀動線。
  - 不要塞太多小圖讓字變小。

🗣️ 白話說明：
像大學分組簡報，如果每一頁都塞滿表格、截圖、圖表、心得，老師會不知道先看哪裡。留白與對齊，就是把大家的注意力排隊。

---

### 3.2 圖表類型的選擇 (Chart Type Selection)

#### 3.2.1 先判斷「你要回答什麼問題」

- 以下圖表類型將在 §3.2.2-§3.2.9 逐一介紹，先瀏覽全圖再深入各節。
- 選圖前先分分析目的：
  - `comparison`（比較）
  - `distribution`（分佈）
  - `composition`（組成）
  - `relationship`（關係）
  - `trend`（趨勢）

ASCII 決策流程：

```text
你想回答什麼問題？
|
|-- 比較 comparison
|   |-- 類別之間誰多誰少？ -> bar chart 長條圖
|   |-- 每個類別內再分組？ -> grouped bar 分組長條圖
|   `-- 看部分占整體？ -> stacked bar 堆疊長條圖
|
|-- 分佈 distribution
|   |-- 單一連續變數分布？ -> histogram 直方圖
|   |-- 想看中位數/四分位/離群值？ -> box plot 箱線圖
|   `-- 想看分布形狀更細？ -> violin plot 提琴圖
|
|-- 組成 composition
|   |-- 類別很少（最好 <= 5）？ -> pie/donut 圓餅/環圈圖
|   `-- 類別較多或要跨組比較？ -> stacked bar 堆疊長條圖
|
|-- 關係 relationship
|   |-- 兩個連續變數關聯？ -> scatter plot 散布圖
|   `-- 兩維類別 x 數值強度？ -> heatmap 熱圖
|
`-- 趨勢 trend
    `-- 隨時間變化？ -> line chart 折線圖
```

🗣️ 白話說明：
就像蝦皮賣家看後台，不同問題要用不同圖。要比哪個商品賣最多，是比較；要看客單價散在哪，是分佈；要看每月銷量變化，是趨勢。問題不同，圖就不能亂換。

#### 3.2.2 `bar chart` 長條圖 vs `histogram` 直方圖

- 🔥 這是本章最常考、最容易混淆的一組。

`bar chart`（長條圖）：
- 用於**類別型資料（categorical data）**的比較。
- X 軸通常是類別，例如平台、部門、產品別。
- Y 軸是數值，例如數量、總銷售額、平均分數。
- 長條之間通常有空隙，表示類別彼此獨立。

`histogram`（直方圖）：
- 用於**連續型資料（continuous data）**的分佈。
- X 軸是數值區間（bins），例如 0-10、10-20、20-30。
- Y 軸通常是頻數（frequency）或密度。
- 柱子通常連在一起，表示數值區間連續。

```text
長條圖 bar chart
平台A  █████
平台B  ███
平台C  ███████
類別互相獨立

直方圖 histogram
0-10   ██
10-20  █████
20-30  ███████
30-40  ████
數值區間連續
```

🗣️ 白話說明：
比較 7-11 各門市咖啡杯數，是 `bar chart`，因為門市是類別。看「每位客人單次消費金額」大多落在哪個區間，是 `histogram`，因為金額是連續數值。

#### 3.2.3 `line chart` 折線圖

- `line chart`（折線圖）最適合表現時間序列（time series）或順序上的變化趨勢。
- 典型情境：
  - 月營收變化。
  - 每日活躍用戶數。
  - 每週客服案件量。
- 適用原因：
  - 人眼容易沿線追蹤上升、下降、波動。
  - 若 X 軸是時間，連線有自然意義。
- 注意：
  - 如果 X 軸不是有順序的資料，隨便連線會製造假趨勢。
  - 太多折線會互相干擾，可考慮篩選、分面或改用其他圖。

🗣️ 白話說明：
像你看 YouTube 頻道一週觀看數，是想知道有沒有衝高、回落、爆發。這種「看走勢」就很適合折線圖。

#### 3.2.4 `scatter plot` 散布圖

- `scatter plot`（散布圖）用來看**兩個連續變數（two continuous variables）**之間的關係。
- 可以觀察：
  - 是否有正相關或負相關。
  - 是否有群聚。
  - 是否有離群點。
- 典型例子：
  - 廣告費 vs 銷售額。
  - 學習時數 vs 成績。
  - 商品價格 vs 評分。
- 如果再加入顏色、大小，可進一步表現第三、第四維資訊，但要節制。

🗣️ 白話說明：
像你看 Instagram 貼文數和追蹤成長量之間有沒有關聯，就很像散布圖的場景。每一篇帳號或每一天都可以是一個點。

#### 3.2.5 `pie chart` 圓餅圖 / `donut chart` 環圈圖

- `pie chart`（圓餅圖）與 `donut chart`（環圈圖）用於表現整體中的各部分占比（part-to-whole）。
- 但它們有明顯限制：
  - 類別最好少，常見建議不超過 5 類，很多工具文件會提醒不要太多。
  - 差異小時，人很難精確比較角度與面積。
  - 不適合跨多個群組比較。
- 所以考試上較安全的說法是：
  - 可以用，但要**節制（use sparingly）**。
  - 適合少類別、比例差異明顯、重點是占比概念的情況。

🗣️ 白話說明：
像班上期末報告分工，如果只有「資料整理、報告製作、上台簡報」三類，用圓餅圖還行；但如果分成 12 種工作，大家根本看不出哪塊差多少。

#### 3.2.6 `heatmap` 熱圖

- `heatmap`（熱圖）適合用顏色強度表現數值大小，常見情境是：
  - 兩個類別維度交叉，例如星期 × 時段、產品 × 地區。
  - 相關矩陣（correlation matrix）。
- 好處：
  - 在有限空間裡顯示大量格子資料。
  - 很快看出高低區塊與模式。
- 注意：
  - 配色要合理，連續型或發散型要看資料是否有中心點。
  - 格子太多時，標籤會擁擠，要搭配 `annot=True` 或互動工具慎選。

🗣️ 白話說明：
像大學圖書館座位使用率，如果你把「星期幾 × 時段」畫成熱圖，很快就看出哪幾個時段最滿，不用逐格看數字。

#### 3.2.7 `box plot` 箱線圖

- `box plot`（箱線圖）用來摘要分佈，特別適合比較多組資料的分佈差異。
- 你通常能從箱線圖看出：
  - 中位數（median）
  - 四分位距（interquartile range）
  - 離群值（outliers）
- 優點：
  - 簡潔。
  - 適合多組比較。
  - 對找出離群值很有幫助。
- 限制：
  - 不會完整展示分布形狀。

🗣️ 白話說明：
像比較不同班級考試成績，箱線圖像是快速看每班「中間在哪、散多開、有沒有特別離譜的人」。

#### 3.2.8 `violin plot` 提琴圖

- `violin plot`（提琴圖）也是看分佈，但比箱線圖更能呈現分布形狀與密度輪廓。
- 如果你想知道資料是不是雙峰、多峰、偏態明顯，提琴圖通常比箱線圖資訊更多。
- 缺點：
  - 對初學者或商務受眾，可讀性不一定像箱線圖那麼直覺。
- 考試上常見判斷：
  - 想快速摘要 + 離群值：`box plot`
  - 想看形狀更細：`violin plot`

🗣️ 白話說明：
箱線圖像看成績摘要表，提琴圖像再多看到「人都擠在哪一段分數帶」。

#### 3.2.9 `stacked bar` 堆疊長條圖 vs `grouped bar` 分組長條圖

- `stacked bar`（堆疊長條圖）適合看部分對整體的構成。
- `grouped bar`（分組長條圖）適合直接比較各群組中各類別的數值。
- 選擇原則：
  - 重點在 part-to-whole（部分占整體）時，用 `stacked bar`。
  - 重點在 side-by-side comparison（並排比較）時，用 `grouped bar`。
- 注意：
  - 堆疊圖除了第一段外，其餘區段不共享同一起點，精準比較比較困難。
  - 若主要任務是比較各子類別大小，分組長條圖通常更好。

🗣️ 白話說明：
像比較各分店飲料銷售結構，如果你想看每家店「奶茶、咖啡、茶飲」占比，可用堆疊；但如果你要直接比「每家店咖啡誰最多」，分組長條圖比較好。

---

### 3.3 視覺化工具比較 (Visualization Tools)

#### 3.3.1 `matplotlib`

- `matplotlib` 是 Python 視覺化的基礎庫（base library）。
- 特性：
  - 低階（low-level），控制細節多。
  - 自訂能力高。
  - 適合出版品質（publication-quality）的靜態圖。
- 常見 API：
  - `plt.plot()`：折線圖
  - `plt.bar()`：長條圖
  - `plt.scatter()`：散布圖
  - `plt.hist()`：直方圖
- 典型情境：
  - 你要精準控制字型、刻度、標註、子圖排列。
  - 你要輸出靜態圖片到報告、論文、簡報。

🔥 高頻判斷：
- 問「細節控制」、「靜態高品質輸出」、「基礎底層」時，優先想到 `matplotlib`。

🗣️ 白話說明：
`matplotlib` 很像自己在 PowerPoint 一個一個調位置與字型，彈性最大，但要花比較多手。

#### 3.3.2 `seaborn`

- `seaborn` 是建立在 `matplotlib` 上的高階（high-level）視覺化套件。
- 它不是獨立繪圖引擎，而是包裝出更偏統計語意的 API。
- 特性：
  - 快速。
  - 預設風格較一致。
  - 適合探索式資料分析（Exploratory Data Analysis, EDA）。
  - 很適合統計圖，例如箱線圖、熱圖、散布圖、分類比較圖。
- 常見 API：
  - `sns.boxplot()`
  - `sns.heatmap()`
  - `sns.scatterplot()`
  - `sns.barplot()`
  - `sns.violinplot()`
- 典型情境：
  - 你想快速把 tidy data 畫成統計圖。
  - 你做資料探索，不想手動調很多圖形元素。

🔥 高頻判斷：
- 問「快速 EDA」、「統計視覺化」、「建立在 matplotlib 上」時，優先想到 `seaborn`。

🗣️ 白話說明：
`seaborn` 像 Instagram 內建濾鏡，你還是用同一支手機拍，但套用後比較快做出看起來整齊的圖。

#### 3.3.3 `Plotly`

- `Plotly` 主打互動式（interactive）圖表。
- 特性：
  - 支援 hover、zoom、pan、選取。
  - 適合網頁嵌入與 dashboard。
  - 方便互動探索資料。
- 常見 API：
  - `px.bar()`
  - `px.scatter()`
  - `go.Figure()`
- 典型情境：
  - 給使用者自己滑鼠移過去看數值。
  - 要做網頁版儀表板。
  - 想讓人縮放、篩選、互動瀏覽。

🔥 高頻判斷：
- 問「互動式網頁圖表」、「hover/zoom」、「dashboard/web embed」時，優先想到 `Plotly`。

🗣️ 白話說明：
`Plotly` 像 YouTube 影片時間軸，使用者不是只能看一張圖，而是可以自己滑過去、放大、找細節。

#### 3.3.4 `Tableau`

- `Tableau` 是拖拉式（drag-and-drop）的商業智慧（Business Intelligence, BI）工具。
- 特性：
  - 對非工程背景使用者友善。
  - 能連接多種資料來源。
  - 強調商業呈現與分享。
  - 常見於商業部門、分析師、主管簡報。
- 常見定位：
  - 給商業利害關係人（business stakeholders）看。
  - 需要快速做 dashboard 與故事化呈現。
  - 不想寫太多程式。
- 授權：
  - 以商業授權為主。
  - `Tableau Public` 可免費使用，但有公開分享限制。

🗣️ 白話說明：
`Tableau` 像把資料分析變成拖拉式簡報工作台，適合你要跟主管或客戶快速對話。

#### 3.3.5 `Power BI`

- `Power BI` 是 Microsoft 的 BI 平台。
- 特性：
  - 與 Office 365、Excel、Azure、生態整合強。
  - Windows 企業環境常見。
  - `Power BI Desktop` 可免費起步。
  - 有 `DAX`（Data Analysis Expressions）作為公式能力。
- 常見定位：
  - 已在 Microsoft 生態工作。
  - 需要和 Teams、Excel、Azure 資料流程整合。
  - 企業內部報表分享。

🗣️ 白話說明：
如果你的公司平常就用 Excel、Teams、Office 365，`Power BI` 很像原本工具箱裡自然接上的延伸。

#### 3.3.6 工具選擇的實戰思路

不要背成「哪個工具比較高級」，而要背成「哪種需求對應哪個工具」。

```text
需求 -> 優先工具

精細控制靜態圖        -> matplotlib
快速 EDA / 統計圖     -> seaborn
互動式圖表 / 網頁展示  -> Plotly
商業拖拉式 dashboard  -> Tableau
Microsoft 生態整合    -> Power BI
```

🗣️ 白話說明：
像你要傳訊息給不同人，不會所有情況都用同一個 app。跟朋友討論用 LINE，正式會議用 Email，發公開影片上 YouTube。視覺化工具也一樣，沒有一套通吃。

- 程式碼判讀練習請見 §3.4.4。

---

### 3.4 視覺化效能 (Visualization Effectiveness)

#### 3.4.1 如何判斷一張圖「有效」

- `data density`（資料密度）：在有限空間中是否有效呈現足夠資料，而不是空蕩或堆滿無意義裝飾。
- `clarity`（清晰度）：讀者是否能快速理解圖表要表達的重點。
- `decode time`（解碼時間）：讀者從看到圖到理解意思，要花多久。
- 一張有效圖表通常有這些特徵：
  - 看一眼就知道主題。
  - 不需要花時間猜顏色、猜標籤、猜比例。
  - 沒有妨礙比較的 3D 或視覺噪音。

🗣️ 白話說明：
像看蝦皮商品頁，真正有效的是你一眼知道價格、評價、規格，不是先被背景特效拖住 10 秒。

#### 3.4.2 儀表板設計原則 (Dashboard Design Principles)

- 一張圖一個訊息（one message per chart）：
  - 每張圖最好回答一個主要問題。
  - 若一張圖要同時說 5 件事，通常代表設計過載。
- 一致色彩編碼（consistent color encoding）：
  - 相同類別在不同圖中盡量用同一顏色。
  - 例如 A 部門永遠藍色，B 部門永遠橘色。
- 清楚標題（clear titles）：
  - 標題不要只寫「銷售分析」。
  - 更好的是「2026 Q1 北區門市咖啡銷售額最高」這種能直接說重點的標題。
- 版面一致：
  - 圖例位置、字級、顏色風格、排序邏輯一致。
- 根據顯示尺寸設計：
  - 手機、投影幕、桌機可讀性不同。
  - 字太小、圖太密都會降低效能。

🗣️ 白話說明：
像 YouTube 頻道首頁，如果每個區塊顏色規則都不一樣、標題都很模糊，使用者會迷路。儀表板也一樣，要讓人不用重新學一次介面。

#### 3.4.3 可及性與易讀性 (Accessibility)

- `accessibility`（可及性/無障礙）不只是加分，而是基本品質。
- 核心原則：
  - 使用色盲友善配色。
  - 不只靠顏色傳達資訊。
  - 文字大小足夠。
  - 背景與前景要有足夠對比。
  - 圖例與標籤要清楚。
- 如果圖表只靠紅綠區分，對部分使用者會失效。
- 如果背景太深、字太淺或字太小，也會降低可讀性。

🗣️ 白話說明：
像班上共筆文件，如果你只用紅色代表重點、綠色代表次重點，有些同學可能根本分不出來。圖表設計不能把理解建立在單一感官差異上。

#### 3.4.4 程式碼判讀重點 (Pseudocode Interpretation)

- 延伸 §3.3 工具介紹，以下練習程式碼識別。
- 考題不一定要求你手寫程式，但常會要求你看懂圖表 API 對應的圖形。
- 關鍵做法：
  - 先看函式名。
  - 再看 `x`、`y`、`color` 或資料型態。
  - 再看題目是在問比較、分佈、關係還是趨勢。

ASCII 範例：`matplotlib` 長條圖 vs 直方圖

```python
# matplotlib bar chart 長條圖：比較類別
plt.bar(df["platform"], df["sales"])

# matplotlib histogram 直方圖：看連續變數分佈
plt.hist(df["sales"], bins=10)
```

判讀要點：
- `plt.bar()`：通常是類別與對應數值。
- `plt.hist()`：通常只有一個連續變數，外加 `bins`。

ASCII 範例：`seaborn` 熱圖

```python
sns.heatmap(data, annot=True)
```

判讀要點：
- `sns.heatmap()` 幾乎可直接判斷是熱圖。
- `annot=True` 表示在格子上顯示數值註記。
- 若 `data` 是相關矩陣，這題通常是在呈現變數間關聯強度。

ASCII 範例：`Plotly` 互動散布圖

```python
px.scatter(df, x="col1", y="col2", color="category")
```

判讀要點：
- `px.scatter()` 是散布圖。
- `x`、`y` 都像連續變數時，常在看關係。
- `color="category"` 代表用顏色區分類別。
- 若題目提到 hover、zoom、web 展示，通常是在暗示 `Plotly`。

ASCII 範例：`matplotlib` vs `seaborn` 程式感比較

```text
matplotlib：自己一步一步組裝
plt.figure(...)
plt.scatter(...)
plt.title(...)
plt.xlabel(...)
plt.ylabel(...)

seaborn：用較高階語意快速畫
sns.scatterplot(data=df, x="study_hours", y="score", hue="class")
```

重點不是誰比較厲害，而是：
- `matplotlib`：細節控制高。
- `seaborn`：統計圖與快速探索效率高。

🗣️ 白話說明：
像你看朋友傳來的料理照，題目不是要你重煮一遍，而是要你一眼辨認那是炒飯、燉飯還是義大利麵。程式碼判讀也是這種辨識能力。

---

## 4. Comparison Tables (易混淆概念)

### 4.1 `bar chart` 長條圖 vs `histogram` 直方圖

| 比較面向 | `bar chart` 長條圖 | `histogram` 直方圖 |
|---|---|---|
| 主要用途 | 比較類別 | 看連續資料分佈 |
| X 軸 | 類別（categorical） | 數值區間（bins） |
| Y 軸 | 數值、總量、平均等 | 頻數、密度 |
| 柱子關係 | 通常有間隔 | 通常連續相接 |
| 常見題型 | 各平台銷售額比較 | 成績、年齡、消費金額分佈 |
| 典型函式 | `plt.bar()`、`sns.barplot()` | `plt.hist()`、`sns.histplot()` |
| 最常見錯誤 | 用來畫連續分佈 | 拿來比較類別總量 |
| 🔥 一句話 | 類別比較看 bar | 連續分佈看 histogram |

### 4.2 `matplotlib` vs `seaborn` vs `Plotly`

| 工具 | 定位 | 優勢 | 限制 | 典型情境 |
|---|---|---|---|---|
| `matplotlib` | Python 基礎繪圖庫 | 細節控制高、靜態輸出強、出版品質佳 | 程式較繁瑣 | 報告圖、論文圖、要精細調整 |
| `seaborn` | 建立在 `matplotlib` 上的高階統計視覺化 | 快速 EDA、預設美觀、統計圖友善 | 最終底層仍受 `matplotlib` 邏輯影響 | 箱線圖、熱圖、分類比較、資料探索 |
| `Plotly` | 互動式圖表與 web 展示 | hover、zoom、互動強、適合 dashboard | 靜態出版流程不是第一直覺 | 網頁嵌入、互動探索、展示型 dashboard |

### 4.3 `Tableau` vs `Power BI`

| 比較面向 | `Tableau` | `Power BI` |
|---|---|---|
| 主要受眾 | 商業分析師、主管、跨部門利害關係人 | 企業內部報表使用者、Microsoft 生態使用者 |
| 使用方式 | 拖拉式 BI，強調探索與呈現 | BI 平台，整合 Microsoft 生態 |
| 價格印象 | 商業授權為主，`Tableau Public` 可免費但公開分享 | `Power BI Desktop` 可免費起步，進階分享/協作看授權 |
| 生態整合 | 多資料來源、多商業視覺化應用 | Office 365、Excel、Azure、Teams 整合強 |
| 強項 | 視覺探索、故事化呈現、商務溝通 | 微軟企業環境、內部報表、DAX 能力 |
| 適合誰看 | 非技術主管、商業端簡報對象 | 公司內部既有 Microsoft 流程使用者 |
| 常見考點 | 拖拉式、商業呈現、Public 限制 | Microsoft 整合、Desktop 免費、DAX |

### 4.4 `sequential` vs `diverging` vs `categorical` color scales

| 色階類型 | 中文 | 適用資料 | 視覺結構 | 典型情境 | 常見錯誤 |
|---|---|---|---|---|---|
| `sequential` | 連續色階 | 由低到高的數值 | 單方向漸變 | 銷售額、次數、溫度 | 用太多彩虹色造成誤讀 |
| `diverging` | 發散色階 | 有中心點的數值 | 中心向兩側分開 | 高於/低於平均、正負差異 | 沒有中心值卻硬用 |
| `categorical` | 類別色階 | 離散類別 | 類別彼此不同色 | 平台別、地區別、部門別 | 類別太多還硬分色 |

---

## 5. 口訣 / Mnemonics

### 5.1 資訊呈現原則口訣

**「墨高、垃圾少、位置先、配色對、版面鬆」**

- 墨高：`data-ink ratio` 要高。
- 垃圾少：避免 `chart junk`。
- 位置先：前注意屬性以 `position` 最強。
- 配色對：色階要對資料型態。
- 版面鬆：對齊與留白幫助閱讀。

### 5.2 圖表類型選擇口訣

**「比長條、分直方，組成圓餅要節制，關係散布、時間線，細看分佈箱提琴」**

- 比較類別數量或數值：長條圖。
- 看連續資料分佈：直方圖。
- 看兩連續變數關係：散布圖。
- 看時間趨勢：折線圖。
- 看整體占比：圓餅/環圈圖，但少類別才用。
- 看分佈摘要與離群值：箱線圖。
- 看分佈形狀更細：提琴圖。

### 5.3 工具選擇口訣

**「靜態精修 Matplotlib，統計快探 Seaborn，互動上網找 Plotly」**

- `matplotlib`：靜態、精修、細控。
- `seaborn`：統計、快速、EDA。
- `Plotly`：互動、網頁、dashboard。

### 5.4 BI 工具判斷口訣

**「商務拖拉 Tableau，微軟整合 Power BI」**

- 對外或跨部門商務展示常想到 `Tableau`。
- 公司已在 Microsoft 生態，多半想到 `Power BI`。

### 5.5 色階選擇口訣

**「一路升用連續，中間分用發散，各類別用分類」**

- 由低到高：`sequential`
- 有中心點：`diverging`
- 類別不同：`categorical`

---

## 6. 考試陷阱 (Exam Traps)

❌ 陷阱：`bar chart` 長條圖和 `histogram` 直方圖都長得像柱子，所以可以互換。  
✅ 正解：不能互換。`bar chart` 用來比較類別，`histogram` 用來看連續資料分佈；關鍵差別在 X 軸是類別還是數值區間。

❌ 陷阱：圓餅圖一定都是錯的。  
✅ 正解：不是。`pie chart` / `donut chart` 可用於少量類別的組成比例，但要節制，通常類別不宜太多，最好在 5 類左右以內。

❌ 陷阱：`seaborn` 是和 `matplotlib` 完全無關的另一套繪圖系統。  
✅ 正解：`seaborn` 是建立在 `matplotlib` 上的高階封裝，常用來快速畫統計視覺化。

❌ 陷阱：`data-ink ratio` 越低越乾淨，所以應該盡量降低。  
✅ 正解：方向相反。`data-ink ratio` 是要提高，表示更多墨水真正用來傳達資料。

❌ 陷阱：只要有美化效果就是 `chart junk`。  
✅ 正解：不一定。若視覺元素有助於理解、分群或導引，不一定算垃圾；重點是它是否妨礙讀值或增加認知負擔。

❌ 陷阱：`Plotly` 跟 `matplotlib` 一樣主要就是產生靜態 PDF 圖。  
✅ 正解：`Plotly` 的核心特色是互動式圖表，適合 hover、zoom、web 展示；它不是以靜態 PDF 輸出作為第一直覺優勢。

❌ 陷阱：`Power BI` 免費版和 `Tableau Public` 都叫免費，所以限制差不多。  
✅ 正解：兩者都可作為免費入口，但限制不同。`Power BI Desktop` 偏本機製作與 Microsoft 生態起步；`Tableau Public` 的核心限制是內容公開分享。

❌ 陷阱：任何熱圖只要看起來好看，用 `diverging color scale` 都沒問題。  
✅ 正解：只有資料存在明確中心值時才適合 `diverging`；若只是單純由低到高，應優先用 `sequential color scale`。

---

## 7. 情境題快速判斷 (Scenario Quick-Judge)

- 「連續型資料分佈」 → `histogram` 直方圖
- 「比較各類別數量」 → `bar chart` 長條圖
- 「兩個連續變數的相關性」 → `scatter plot` 散布圖
- 「隨時間變化的趨勢」 → `line chart` 折線圖
- 「整體中各部分佔比（≤5類）」 → `pie chart` / `donut chart` 圓餅圖 / 環圈圖
- 「細緻分佈 + 離群值」 → `box plot` 箱線圖 / `violin plot` 提琴圖
- 「快速 EDA 統計圖」 → `seaborn`
- 「互動式網頁圖表」 → `Plotly`
- 「出版品質靜態圖」 → `matplotlib`
- 「給商業部門非技術主管看」 → `Tableau` / `Power BI`
- 「整合 Microsoft Office 365」 → `Power BI`
- 「`data-ink ratio` 提升」 → 移除格線、背景色、多餘標籤

補充快判規則：

- 題目先問「哪個圖」，先看分析目的。
- 題目先問「哪個工具」，先看輸出形式：
  - 靜態精修？
  - 快速 EDA？
  - 互動網頁？
  - 商業 dashboard？
- 題目如果放程式碼：
  - `plt.bar()` 幾乎就是長條圖。
  - `plt.hist(..., bins=...)` 幾乎就是直方圖。
  - `sns.heatmap()` 幾乎就是熱圖。
  - `px.scatter()` 幾乎就是互動散布圖。

30 秒情境解題流程：

```text
1. 先看資料型態：類別 / 連續 / 時間
2. 再看分析目的：比較 / 分佈 / 組成 / 關係 / 趨勢
3. 再看是否需要互動：要 -> Plotly；不要 -> Python 靜態或 BI
4. 若是商業分享：想拖拉式 -> Tableau / Power BI
5. 若問視覺原則：先找 chart junk、色階錯配、標題不清、顏色不一致
```

---

## 8. 結尾：快速自我檢查 ✅

- [ ] 我能在 30 秒內說出 `data-ink ratio`（資料墨水比）是什麼，並判斷為什麼目標是提高而不是降低。
- [ ] 我能在 30 秒內分辨 `chart junk`（圖表垃圾）與有幫助的設計裝飾，不會把所有美化都判成錯。
- [ ] 我能在 30 秒內說出 `pre-attentive attributes`（前注意屬性）中的 `position`、`color`、`size`、`shape`，並知道位置通常最強。
- [ ] 我能在 30 秒內判斷 `sequential`、`diverging`、`categorical` 三種色階該用在哪種資料。
- [ ] 我能在 30 秒內清楚區分 `bar chart` 長條圖與 `histogram` 直方圖，不會把類別比較和連續分佈混在一起。
- [ ] 我能在 30 秒內根據題目需求，從 `line chart`、`scatter plot`、`heatmap`、`box plot`、`violin plot`、`pie chart` 中選出合理圖表。
- [ ] 我能在 30 秒內說出 `matplotlib`、`seaborn`、`Plotly` 各自最適合的情境。
- [ ] 我能在 30 秒內比較 `Tableau` 與 `Power BI` 的受眾、生態整合與免費使用限制差異。

📌 Out of scope：
- 本節不處理統計公式推導、機器學習專用視覺化（如 PCA、ROC）、以及 Tableau / Power BI 的深度管理與 ETL 設定。
