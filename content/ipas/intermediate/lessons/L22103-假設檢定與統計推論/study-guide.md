# L22103 假設檢定與統計推論 — 學習指南
## Section 1: Exam Item Mapping
> 對應評鑑範圍：**L22103 假設檢定與統計推論**
這一課是 `L22 大數據處理分析與應用` 裡，最容易被考成「情境判斷題 + 名詞混淆題 + 結論用語題」的一段。你要能把資料問題翻成檢定語言，然後依序完成：
- 設定`虛無假說（Null Hypothesis, H0）`與`對立假說（Alternative Hypothesis, H1）`
- 選定`顯著水準（Significance Level, α）`
- 看懂`檢定統計量（Test Statistic）`、`p 值（p-value）`與`信賴區間（Confidence Interval, CI）`
- 用正確句型下結論：`拒絕 H0` 或 `無法拒絕 H0`
- 依情境選對檢定：
  - `t 檢定（t-test）`：平均數比較
  - `卡方檢定（Chi-square Test, χ² test）`：類別是否獨立
  - `F 檢定（F-test）/ 單因子變異數分析（One-way ANOVA）`：變異數比值或三組以上平均數整體差異
官方題型偏好不是手算長公式，而是：
- 給你 `α`、`p 值`、`95%信賴區間`
- 問你該不該拒絕 `H0`
- 問你情境應該用哪種檢定
- 問你哪個敘述才是嚴謹結論
本課邊界要守住：
- 只教假設檢定框架、`α / β / p-value / CI` 與 `t / χ² / F`
- 不延伸到非參數檢定、效果量、貝氏推論、回歸、ML 專屬統計
- `F-test` 只講 `variance / one-way ANOVA setup / F 值判讀`，不講多因子 ANOVA 與事後檢定
---
## Section 2: 關鍵概念總覽圖 (Knowledge Tree)
```text
📖 L22103 假設檢定與統計推論
│
├── 🎯 考試核心任務
│   ├── 把商業問題翻成 H0 / H1 🔥🔥
│   ├── 看懂 α、β、p-value、CI 彼此關係 🔥🔥
│   ├── 依資料型態選對檢定 🔥🔥
│   └── 用正確結論用語作答
│       └── ⚠️ p > α 是「無法拒絕 H0」不是「證明 H0 為真」
│
├── 📖 假設檢定框架（Hypothesis Testing Framework）
│   ├── 虛無假說（Null Hypothesis, H0）
│   │   └── 通常代表：無差異、無效果、無關聯
│   ├── 對立假說（Alternative Hypothesis, H1）
│   │   └── 代表：有差異、有效果、有關聯
│   ├── 雙尾檢定（Two-tailed Test）🔥
│   │   └── 關心「不一樣」不指定方向
│   ├── 單尾檢定（One-tailed Test）🔥
│   │   ├── 右尾：大於
│   │   └── 左尾：小於
│   └── 決策規則（Decision Rule）🔥🔥
│       ├── p ≤ α → Reject H0
│       └── p > α → Fail to Reject H0
│
├── ⚖️ 錯誤與風險
│   ├── 型一錯誤（Type I Error, α）🔥🔥
│   │   └── H0 其實真，卻誤拒 H0
│   ├── 型二錯誤（Type II Error, β）🔥🔥
│   │   └── H0 其實假，卻沒拒絕 H0
│   ├── 檢定力（Power, 1-β）
│   │   └── 抓到真差異的能力
│   └── ⚠️ 常見陷阱：把 α 跟 β 方向背反
│
├── 📊 關鍵判讀工具
│   ├── p 值（p-value）🔥🔥
│   │   ├── 在 H0 成立下，看到目前或更極端結果的機率
│   │   └── ⚠️ 不是 H0 為真的機率
│   ├── 信賴區間（Confidence Interval, CI）🔥🔥
│   │   ├── 區間是否含假設值
│   │   └── 可與檢定結論互相對照
│   └── 檢定統計量（t / χ² / F）
│       └── 由資料算出的偏離程度指標
│
├── 🔧 三大檢定工具
│   ├── t 檢定（t-test）🔥🔥
│   │   ├── 單樣本 t（One-sample t-test）
│   │   ├── 獨立樣本 t（Independent two-sample t-test）
│   │   ├── 配對樣本 t（Paired t-test）
│   │   └── ⚠️ paired data 不能亂用 `ttest_ind`
│   │
│   ├── 卡方檢定（Chi-square Test, χ² test）🔥🔥
│   │   ├── 類別資料（Categorical Data）
│   │   ├── 列聯表（Contingency Table）
│   │   ├── 獨立性檢定（Test of Independence）
│   │   └── ⚠️ 輸入要是計數，不是百分比
│   │
│   └── F 檢定（F-test）/ 單因子變異數分析（One-way ANOVA）🔥🔥
│       ├── 三組以上平均數整體差異
│       ├── 變異數比值概念：組間 / 組內
│       └── ⚠️ 只告訴你「至少有一組不同」，不告訴哪一組
│
└── 🧠 應試快判
    ├── 平均數比較 → 想 t-test
    ├── 類別是否相關 → 想 χ²
    ├── 三組以上平均數 → 想 F-test / ANOVA
    ├── p 小於 α → 拒絕 H0
    └── CI 不含假設值 → 通常對應拒絕 H0
```

> 📖 **延伸閱讀：檢定方法選擇流程圖（Mermaid）**
> → 詳見 [diagrams/test-selection-flowchart.mmd](diagrams/test-selection-flowchart.mmd)

---
## Section 3: Core Concepts
### 3.1 假設檢定框架（Hypothesis Testing Framework）🔥🔥
`假設檢定（Hypothesis Testing）` 是用樣本資料，去評估某個主張是否有足夠證據成立的方法。它不是在「證明真理」，而是在有限資料下做有風險的決策。
最常見的起手式是：
- `虛無假說（Null Hypothesis, H0）`：通常代表沒有差異、沒有影響、沒有關聯
- `對立假說（Alternative Hypothesis, H1）`：通常代表有差異、有影響、有關聯
例子 1：外送平台想知道新版派單流程是否改變平均送達時間
- `H0`：新版前後平均送達時間相同
- `H1`：新版前後平均送達時間不同
例子 2：電商想知道會員等級與是否回購有沒有關聯
- `H0`：會員等級與回購彼此獨立
- `H1`：會員等級與回購不獨立
🗣️ 白話說明：你可以把 `H0` 想成公司開會時最保守的說法，像是「先不要自己腦補有差，先假設沒差」。只有當資料真的夠明顯，我們才改口說「看起來有差」。
#### 3.1.1 單尾檢定（One-tailed Test）與雙尾檢定（Two-tailed Test）🔥
如果你只在意某個方向，就會用`單尾檢定（One-tailed Test）`；如果你只在意是否不同、不限定方向，就用`雙尾檢定（Two-tailed Test）`。
其中 `μ` 代表母體平均數，`μ0` 代表假設的基準值（null value）。
```text
雙尾檢定：H1: μ ≠ μ0
左尾檢定：H1: μ < μ0
右尾檢定：H1: μ > μ0
```
ASCII 圖：尾巴方向
```text
雙尾：      |<---- reject ----| Fail to Reject H0 |---- reject ---->|
左尾：      |<---- reject ----|---------- Fail to Reject H0 ----------|
右尾：      |---------- Fail to Reject H0 ----------|---- reject ---->|
```
🗣️ 白話說明：像你看 104 人力銀行薪資調查，如果主管只問「新制度有沒有讓薪資變高」，那是右尾；如果問「有沒有改變，不管變高變低」，那是雙尾。
🔥 高頻考點：
- 題目若只說「是否不同」通常是雙尾
- 題目若明確說「是否提升」「是否降低」才可能是單尾
- 不能看到結果後才反過來選尾巴，這會讓檢定失真
#### 3.1.2 假設檢定的標準流程
```text
Step 1. 寫出 H0 與 H1
Step 2. 設定 α
Step 3. 選擇合適檢定
Step 4. 計算檢定統計量
Step 5. 取得 p-value
Step 6. 比較 p-value 與 α
Step 7. 下結論：Reject H0 / Fail to Reject H0
```
ASCII 流程圖：
```text
問題情境
   |
   v
寫 H0 / H1
   |
   v
選 α 與檢定方法
   |
   v
算出 t / χ² / F
   |
   v
得到 p-value
   |
   v
比較 p-value 與 α
   |
   +--> p ≤ α  ----> 拒絕 H0
   |
   +--> p > α  ----> 無法拒絕 H0
```
### 3.2 型一錯誤（Type I Error）與型二錯誤（Type II Error）🔥🔥
`型一錯誤（Type I Error）` 是 `H0` 其實為真，但你錯誤地拒絕了它。它的機率記作 `α`。
`型二錯誤（Type II Error）` 是 `H0` 其實為假，但你沒有拒絕它。它的機率記作 `β`。
`顯著水準（Significance Level, α）` 是你願意承擔型一錯誤的上限，常見設定是 `0.05`。
`檢定力（Power, 1-β）` 是在真的有差異時，你成功抓到差異的能力。
補充對照：`Type I error` 也常稱為 `false positive`，`Type II error` 也常稱為 `false negative`。
ASCII 2×2 決策格：
```text
                    真實世界
                H0 真          H0 假
你的決策
拒絕 H0        型一錯誤 α      正確判斷
不拒絕 H0      正確判斷        型二錯誤 β
```
🗣️ 白話說明：像公司懷疑新客服機器人有提升滿意度。
- `α`：其實沒提升，你卻以為有提升，結果全公司導入錯方向
- `β`：其實有提升，你卻沒看出來，錯過有效方案
就像大學分組報告，你誤會一個沒偷懶的人在擺爛，這像 Type I；真正擺爛的人你卻沒抓到，這像 Type II。
🔥🔥 必背方向：
- `α = 誤拒真`
- `β = 誤留假`
ASCII 記憶圖：
```text
α：Reject a True H0
β：Keep a False H0
```
#### 3.2.1 α 越小越好嗎？
不一定。`α` 設太小，雖然比較不會亂拒絕 `H0`，但也可能讓你更難抓到真的差異，導致 `β` 上升、`power` 下降。
🗣️ 白話說明：像主管把 KPI 設得超嚴，當然比較不會誤判一個普通方案成神方案，但也可能連真的好方案都被擋掉。

> 📖 **延伸閱讀：型一 / 型二錯誤決策矩陣（完整版）**
> → 詳見 [diagrams/type-i-ii-error-grid.md](diagrams/type-i-ii-error-grid.md)

### 3.3 p 值（p-value）詮釋與決策鏈 🔥🔥
`p 值（p-value）` 是：**在 `H0` 成立的前提下，觀察到目前樣本結果或更極端結果的機率。**
這句話要逐字理解，重點有兩個：
- 前提是 `H0` 先成立
- 看的是「這組資料有多不尋常」
所以 `p-value` 越小，代表如果 `H0` 真的成立，眼前資料就越罕見，於是你越有理由拒絕 `H0`。
#### 3.3.1 決策規則（Decision Rule）🔥🔥
```text
若 p-value ≤ α  → 拒絕 H0
若 p-value > α  → 無法拒絕 H0
```
🗣️ 白話說明：像你在 Instagram 上看到某貼文突然爆量互動，如果平常根本不可能這麼高，那你會懷疑「這不是正常波動」，同理，`p` 很小時就代表「如果真的沒差，現在這結果太不正常了」。
ASCII 決策鏈：
```text
t / χ² / F 變大（或更極端）
        |
        v
p-value 變小
        |
        v
更可能拒絕 H0
```
#### 3.3.2 worked example：由 t-stat 追到 p-value 再做結論
以下範例先把 `t` 統計量當作通用的「檢定統計量」示意；`t-test` 的完整分類與選用規則詳見 3.5 節。
情境：公司想檢查新版 onboarding 是否改變新人一週上手測驗平均分數。
- `H0`：新版前後平均分數相同
- `H1`：新版前後平均分數不同
- `α = 0.05`
- 已算出 `t-stat = 2.31`
- 對應 `p-value = 0.028`
Pseudocode：
```text
input:
  alpha = 0.05
  t_stat = 2.31
  p_value = 0.028
if p_value <= alpha:
    decision = "拒絕 H0"
    interpretation = "資料提供足夠證據，支持平均分數存在顯著差異"
else:
    decision = "無法拒絕 H0"
    interpretation = "資料不足以支持平均分數存在顯著差異"
output:
  t_stat -> p_value -> decision -> interpretation
```
Trace：
```text
t_stat = 2.31
   ↓
p_value = 0.028
   ↓
0.028 ≤ 0.05
   ↓
拒絕 H0
   ↓
結論：新版前後平均分數有統計上顯著差異
```
🔥🔥 答題句型：
- 可以說：`在 α = 0.05 下，p-value = 0.028，小於 0.05，因此拒絕 H0。`
- 更完整：`資料顯示新版前後平均分數存在統計上顯著差異。`
- 不要說：`H0 被證明是假的`
#### 3.3.3 p-value 常見誤解
以下都是錯的：
- `p-value` 不是 `H0` 為真的機率
- `p-value` 不是差異大小
- `p-value` 小，不代表效果一定很大
🗣️ 白話說明：像 YouTube 影片觀看數突然上升，`p-value` 小只是在說「這不像平常自然波動」，不是在說「這支影片一定是神作」。

> 📖 **延伸閱讀：拒絕域、p-value 視覺化 + Pseudocode 追蹤範例**
> → 詳見 [diagrams/rejection-region-bell-curve.md](diagrams/rejection-region-bell-curve.md)

### 3.4 信賴區間（Confidence Interval, CI）與檢定關係 🔥🔥
`信賴區間（Confidence Interval, CI）` 是根據樣本資料估計母體參數可能落在哪個範圍；這裡講的是經典統計中的 `frequentist confidence interval`。例如 `95% CI` 常被寫成：
```text
[下限, 上限]
```
它的直觀用途是：
- 看估計值大概落在哪裡
- 看區間是否包含 `H0` 下的假設值
- 和 `p-value` 結論交叉驗證
#### 3.4.1 與假設檢定的對照
若你做的是雙尾檢定，且 `α = 0.05`，通常可以這樣快判：
- `95% CI` **不包含** 假設值 → 傾向拒絕 `H0`
- `95% CI` **包含** 假設值 → 傾向無法拒絕 `H0`
例子：
- 檢定 `H0: μ = 70`
- 算出 `95% CI = [72.1, 79.4]`
- 因為 `70` 不在區間內，所以對應 `p < 0.05`，通常拒絕 `H0`
反過來：
- `95% CI = [67.8, 73.5]`
- 因為 `70` 在區間內，所以通常對應 `p > 0.05`，無法拒絕 `H0`
ASCII 圖：
```text
Case A: CI 不含假設值 70
60    65    70    75    80
|-----|-----|-----|-----|
            ^ H0 value
                  [72.1--------79.4]
=> 拒絕 H0
Case B: CI 含假設值 70
60    65    70    75    80
|-----|-----|-----|-----|
            ^ H0 value
         [67.8-----------73.5]
=> 無法拒絕 H0
```
🗣️ 白話說明：像你估算某職缺市場薪資，區間如果整段都高於公司原本聲稱的薪資基準，你就比較有理由懷疑「原本那個數字不對」。
🔥 高頻考點：
- `CI` 跟 `p-value` 常被同一題一起考
- 要看的是「是否包含假設值」，不是只看區間寬窄
- `CI` 顯示的是合理範圍，不是保證範圍
### 3.5 t 檢定（t-test）：平均數比較 🔥🔥
`t 檢定（t-test）` 用於比較`平均數（Mean）`相關問題，尤其在樣本數不大、母體變異數未知時很常見。
核心問題通常長這樣：
- 某一組平均數是否等於某標準？
- 兩組平均數是否不同？
- 同一批人前後測平均數是否改變？
#### 3.5.1 單樣本 t 檢定（One-sample t-test）
用途：比較**單一樣本平均數**是否等於某個已知標準值。
典型假設：
```text
H0: μ = μ0
H1: μ ≠ μ0   或   μ > μ0   或   μ < μ0
```
例子：某補習班宣稱學員平均模考分數是 `70` 分，你抽樣後想檢查是否如此。
🗣️ 白話說明：像公司說「新人平均三天就能上手」，你抽一批新人看實際平均是不是這樣，這就是 one-sample t。
#### 3.5.2 獨立樣本 t 檢定（Independent Two-sample t-test）
用途：比較**兩個互不重疊群體**的平均數是否不同。
典型假設：
```text
H0: μ1 = μ2
H1: μ1 ≠ μ2
```
例子：
- A 廣告素材組 vs B 廣告素材組的平均點擊數
- 遠端員工 vs 實體員工的平均通勤時間
🗣️ 白話說明：像你比較全家跟 7-11 兩家門市各自抽樣的顧客停留時間，兩邊不是同一批人，這就是獨立樣本。
對應 SciPy 實作函式：
```python
from scipy.stats import ttest_ind
stat, p = ttest_ind(group_a, group_b, equal_var=True)
```
🔥 考試讀碼提醒：
- `ttest_ind` 的 `ind` 是 independent
- 若 `equal_var=False`，就是不假設變異數相等的版本，常稱為 `Welch's t-test`
- 題目若是兩組獨立樣本，才是這個方向
#### 3.5.3 配對樣本 t 檢定（Paired t-test）
用途：比較**同一批對象的前後差異**，或成對資料的平均差異。
典型情境：
- 同一批學員課前 vs 課後成績
- 同一批員工導入新工具前 vs 後的處理時間
- 同一批使用者改版前 vs 後的操作秒數
核心不是看兩組資料彼此獨立，而是看「一一對應的差值」。
ASCII 圖：
```text
員工 A：導入前 18 分 -> 導入後 14 分 -> 差值 -4
員工 B：導入前 22 分 -> 導入後 20 分 -> 差值 -2
員工 C：導入前 16 分 -> 導入後 12 分 -> 差值 -4
配對 t 檢定其實是在檢查：平均差值是否為 0
```
🗣️ 白話說明：像你追蹤同一批人使用新報表系統前後的完成時間，因為每個人本來能力不同，所以要比的是「同一人自己前後差」，不是把前後當成兩群陌生人。
對應 SciPy 實作函式：
```python
from scipy.stats import ttest_rel
stat, p = ttest_rel(before, after)
```
Python API：`scipy.stats.ttest_rel(before, after)`，回傳 `(statistic, pvalue)`。
🔥🔥 高頻陷阱：
- 配對資料不能亂當成獨立資料
- 題目出現「前後測」「同一批人」「改版前後同用戶」幾乎都要先想 paired t
#### 3.5.4 t-test 快速選法
```text
一組平均數 vs 某標準值       -> one-sample t-test
兩組不同人 / 不同群體平均數   -> independent two-sample t-test
同一批人前後 / 成對資料      -> paired t-test
```
### 3.6 卡方檢定（Chi-square Test, χ² test）：類別是否獨立 🔥🔥
`卡方檢定（Chi-square Test, χ² test）` 在本課重點是`獨立性檢定（Test of Independence）`，用來判斷兩個`類別變數（Categorical Variables）`之間是否有關聯。
典型問題：
- 會員等級與回購是否有關？
- 性別與產品偏好是否有關？
- 是否為 AI 工具使用者與是否離職是否有關？
這類題目通常先整理成`列聯表（Contingency Table）`。
例子：
```text
                有回購   無回購
白金會員          80       20
一般會員          45       55
```
`H0`：會員等級與是否回購獨立  
`H1`：會員等級與是否回購不獨立
🗣️ 白話說明：像蝦皮賣家想知道「有沒有參加免運活動」跟「顧客是否下單」是不是連動的，這類「類別 x 類別」就先想到 χ²。
#### 3.6.1 讀題關鍵
- 看資料是不是分類後的人數或件數
- 看問題是不是「有沒有關聯」「是否獨立」
- 若表格裡放的是百分比，不要立刻以為可直接檢定，原則上要先有計數資料
對應 SciPy 實作函式：
```python
from scipy.stats import chi2_contingency
stat, p, dof, expected = chi2_contingency(observed_table)
```
🔥🔥 讀碼高頻陷阱：
- `observed_table` 應是觀察到的**計數表**
- 不是把百分比直接丟進去
- 題目若問「是否獨立」，要想到 `chi2_contingency`
#### 3.6.2 期望次數（Expected Count）直觀理解
卡方檢定會比較：
- 實際觀察到的次數（Observed Count）
- 如果真的獨立時，理論上應該出現的次數（Expected Count）
如果兩者差很多，`χ²` 會變大，`p-value` 會變小，越可能拒絕 `H0`。
ASCII 直觀圖：
```text
若獨立：
實際表格應該跟「照邊際比例分配」差不多
Observed 很接近 Expected
    -> χ² 小
    -> p 大
    -> 無法拒絕 H0
Observed 明顯偏離 Expected
    -> χ² 大
    -> p 小
    -> 拒絕 H0
```
### 3.7 F 檢定（F-test）/ 單因子變異數分析（One-way ANOVA）🔥🔥
`F 檢定（F-test）` 在本課最重要的應用，是`單因子變異數分析（One-way Analysis of Variance, One-way ANOVA）`。它用來比較**三組以上平均數**是否整體相同。
典型假設：
```text
H0: μ1 = μ2 = μ3 = ...
H1: 至少有一組平均數不同
```
例子：
- 三種教學法的平均成績是否相同？
- 三個客服班次的平均處理時間是否相同？
- 三個廣告渠道的平均轉換率是否相同？
🗣️ 白話說明：像公司同時測三種新人培訓方案，你不能一直兩兩做很多次 t-test，這時先用 F-test 看「整體有沒有差」。
#### 3.7.1 F 值（F Statistic）的直觀
`F 值（F Statistic）` 可以先用直觀記：
```text
F ≈ 組間差異 / 組內波動
```
- 組間差異大：不同組平均數彼此差很多
- 組內波動小：每組內部自己很穩
這時 `F` 會大，代表「組別差異不像只是隨機波動」。
ASCII 圖：
```text
Case A: 組平均很接近
Group 1: 70 71 69
Group 2: 70 72 68
Group 3: 71 70 69
=> F 小，p 大
Case B: 組平均差很多
Group 1: 60 61 59
Group 2: 70 71 69
Group 3: 80 81 79
=> F 大，p 小
```
#### 3.7.2 重要限制：F-test 不告訴你哪組不同
若 `p-value ≤ α`，你只能先下這個結論：
`至少有一組平均數不同`
不能直接說：
`第一組一定比第三組高`
因為那需要後續比較，但那些不在本課範圍內。
🔥 邊界提醒：
- 只教 one-way ANOVA setup
- 不展開 post-hoc test
- 不展開 two-way / factorial ANOVA
對應 SciPy 實作函式：
```python
from scipy.stats import f_oneway
stat, p = f_oneway(group_a, group_b, group_c)
```
#### 3.7.3 F-test 與 t-test 的快判差異
```text
比 2 組平均數   -> t-test
比 3 組以上平均數 -> F-test / One-way ANOVA
```
🗣️ 白話說明：像你只有兩家超商門市要比平均客單價，用 t-test 就夠；若有北中南三區門市同時要比，就先想到 F-test。
### 3.8 三大檢定的選題地圖
ASCII decision tree：
```text
先問：你要比的是什麼？
1. 平均數（數值型資料）
   |
   +--> 一組 vs 標準值
   |     -> one-sample t-test
   |
   +--> 兩組平均數
   |     |
   |     +--> 不同人 / 不同群體
   |     |     -> independent two-sample t-test
   |     |
   |     +--> 同一批人前後 / 成對
   |           -> paired t-test
   |
   +--> 三組以上平均數
         -> F-test / one-way ANOVA
2. 類別資料之間是否相關
   -> χ² test of independence
```
🔥🔥 考場反應目標：
- 看見「平均」先想 t 或 F
- 看見「三組以上」優先想 F
- 看見「類別 x 類別 / 是否獨立」優先想 χ²
- 看見「同一批人前後」優先想 paired t

> 📖 **延伸閱讀：三大檢定 + t-test 三變體完整比較表**
> → 詳見 [diagrams/three-tests-comparison.md](diagrams/three-tests-comparison.md)

---
## Section 4: Comparison Tables (易混淆概念)
### 4.1 型一錯誤（Type I Error, α） vs 型二錯誤（Type II Error, β）
| 你的決策 \ 真實情況 | `H0` 為真 | `H0` 為假 |
|---|---|---|
| 拒絕 `H0` | 型一錯誤（Type I Error, `α`） | 正確判斷 |
| 不拒絕 `H0` | 正確判斷 | 型二錯誤（Type II Error, `β`） |
| 比較面向 | 型一錯誤 `α` | 型二錯誤 `β` |
|---|---|---|
| 定義 | `H0` 真卻誤拒 `H0` | `H0` 假卻未拒絕 `H0` |
| 常見中文口訣 | 誤拒真 | 誤留假 |
| 直觀風險 | 把沒有差異誤判成有差異 | 把真的差異漏掉 |
| 題目常考點 | 跟顯著水準連在一起 | 跟檢定力 `1-β` 連在一起 |
### 4.2 p 值（p-value） vs 顯著水準（Significance Level, α）
| 比較面向 | `p-value` | `α` |
|---|---|---|
| 是什麼 | 由樣本資料算出的結果 | 事前設定的門檻 |
| 誰先出現 | 分析後 | 分析前 |
| 代表意義 | 在 `H0` 為真下，觀察到目前或更極端結果的機率 | 願意承擔型一錯誤的上限 |
| 用途 | 衡量資料對 `H0` 有多不利 | 當作判斷是否拒絕 `H0` 的標準 |
| 決策規則 | 與 `α` 比較 | 與 `p-value` 比較 |
| 常見值 | 0 到 1 之間 | 常設 0.05、0.01 |
| 常見陷阱 | 被誤解成 `H0` 為真的機率 | 被誤解成資料算出來的值 |
### 4.3 t-test vs chi-square vs F-test
| 檢定方法 | 主要用途 | 資料型態 | 典型 `H0` | 關鍵字 |
|---|---|---|---|---|
| `t-test` | 比較平均數 | 數值型 | 平均數相等 | 平均、前後測、兩組 |
| `χ² test` | 檢查類別是否獨立 | 類別型計數 | 兩變數獨立 | 類別、比例表背後計數、列聯表 |
| `F-test / One-way ANOVA` | 比較三組以上平均數是否整體相同 | 數值型分組資料 | 各組平均數相等 | 三組以上、整體差異 |
### 4.4 單樣本 t vs 雙樣本 t vs 配對 t
| 類型 | 問題形式 | 樣本結構 | 例子 | 快速判斷詞 |
|---|---|---|---|---|
| 單樣本 t | 一組平均數 vs 一個標準值 | 一組 | 新人平均上手天數是否等於 3 天 | 是否等於某標準 |
| 獨立雙樣本 t | 兩組平均數是否不同 | 兩組獨立 | A/B 廣告平均點擊數是否不同 | 兩組不同人 |
| 配對 t | 同一批對象前後是否改變 | 成對資料 | 同一批員工導入前後處理時間是否不同 | 前後測、同一批、配對 |
---
## Section 5: 口訣 / Mnemonics
### 5.1 型一 / 型二錯誤口訣
`α = 誤拒真，β = 誤留假`
延伸記法：
- `α` 像你「太衝動」，把其實沒問題的 `H0` 砍掉
- `β` 像你「太保守」，把其實有問題的 `H0` 留下來
一句版：
`阿法愛砍真，貝塔留住假`
### 5.2 p-value 決策口訣
`p 小拒 H0，差異顯著；p 大不拒 H0，證據不足`
更短版：
`p 小就拒，p 大先忍住`
### 5.3 檢定選擇口訣
`t = 平均，χ² = 類別，F = 變異 / 三組以上平均`
考前 3 秒快背版：
`平均想 t，類別想 χ²，三組想 F`
---
## Section 6: 考試陷阱 (Exam Traps)
### 6.1 `p-value is the probability H0 is true`
❌ `p-value` 是 `H0` 為真的機率。  
✅ `p-value` 是在 `H0` 成立下，觀察到目前或更極端結果的機率。
提醒：題目若問 `p=0.03` 代表什麼，不要回答成「`H0` 只有 3% 可能是真的」。
### 6.2 `Reject H0 means H1 is proven`
❌ 拒絕 `H0` 代表 `H1` 被完全證明。  
✅ 拒絕 `H0` 代表樣本資料提供足夠證據，支持 `H1`；這是統計判斷，不是數學證明。
提醒：考題喜歡抓「證明」「一定」「完全確定」這些字眼。
### 6.3 Type I vs Type II error direction confusion
❌ `α` 是 `H0` 假卻沒拒絕；`β` 是 `H0` 真卻誤拒。  
✅ `α` 是 `H0` 真卻誤拒；`β` 是 `H0` 假卻沒拒絕。
快救援：
- `α`：誤拒真
- `β`：誤留假
### 6.4 scipy function choice errors
❌ 同一批使用者改版前後資料，直接用 `scipy.stats.ttest_ind`。  
✅ 若是前後測或同一批人配對資料，應先判斷為 `paired t-test` 的情境；`ttest_ind` 對應的是獨立樣本。
提醒：考題若出現 `same users before/after`、`pre-test/post-test`，優先排除 `ttest_ind`。
### 6.5 One-tail vs two-tail choice
❌ 看到結果比較大，就事後改成右尾檢定讓自己比較容易顯著。  
✅ 單尾或雙尾應依研究問題事前決定；若題目只問「是否不同」，通常用雙尾。
提醒：方向是根據假設，不是根據你看到的樣本結果。
---
## Section 7: 情境題快速判斷 (Scenario Quick-Judge)
### 7.1 關鍵字 → 檢定方法
| 題目關鍵字 | 快速答案 |
|---|---|
| 平均數、平均時間、平均分數 | 先想 `t-test` 或 `F-test` |
| 一組樣本 vs 標準值 | `one-sample t-test` |
| 兩組不同群體平均數 | `independent two-sample t-test` |
| 前後測、同一批人、配對 | `paired t-test` |
| 三組以上平均數 | `F-test / one-way ANOVA` |
| 類別、是否獨立、是否相關、列聯表 | `chi-square test of independence` |
### 7.2 關鍵字 → H0 / H1 句型
| 題目關鍵字 | `H0` 常見寫法 | `H1` 常見寫法 |
|---|---|---|
| 是否不同 | 相等 / 無差異 | 不相等 / 有差異 |
| 是否提升 | 不大於 / 無提升 | 大於 / 有提升 |
| 是否降低 | 不小於 / 無降低 | 小於 / 有降低 |
| 是否獨立 | 兩變數獨立 | 兩變數不獨立 |
### 7.3 關鍵字 → 結論句
| 已知條件 | 快速結論 |
|---|---|
| `p ≤ α` | 拒絕 `H0` |
| `p > α` | 無法拒絕 `H0` |
| `95% CI` 不含假設值 | 常對應拒絕 `H0` |
| `95% CI` 含假設值 | 常對應無法拒絕 `H0` |
### 7.4 題目描述 → 你該想到什麼
| 題目描述 | 你應該先想到 |
|---|---|
| 「某平台宣稱平均等待時間是 5 分鐘」 | 單樣本 `t-test` |
| 「比較 A/B 兩個廣告版本平均轉單金額」 | 獨立樣本 `t-test` |
| 「比較同一批員工導入系統前後平均處理時間」 | 配對樣本 `t-test` |
| 「比較北區、中區、南區三個據點平均客服分數」 | `F-test / one-way ANOVA` |
| 「會員等級與回購是否有關」 | `χ² test` |
### 7.5 scipy 函式名 → 對應檢定
| 函式名 | 對應內容 | 快速記法 |
|---|---|---|
| `scipy.stats.ttest_ind` | 兩組獨立樣本平均數比較 | `ind = independent` |
| `scipy.stats.ttest_rel` | 配對樣本平均數比較 | `rel = related` |
| `scipy.stats.chi2_contingency` | 列聯表獨立性卡方檢定 | `contingency = 列聯表` |
| `scipy.stats.f_oneway` | 單因子 ANOVA / F 檢定 | `oneway = 單因子` |
---
## Section 8: 結尾：快速自我檢查 ✅
- [ ] 我能寫出 `H0` 與 `H1`，並分辨何時是單尾、何時是雙尾。
- [ ] 我記得正式答題用語是「拒絕 `H0` / 無法拒絕 `H0`」，不是隨便寫「證明 `H0` 為真」。
- [ ] 我能正確分辨 `α` 與 `β`：`α = 誤拒真`，`β = 誤留假`。
- [ ] 我能解釋 `p-value`，且不會把它說成 `H0` 為真的機率。
- [ ] 我知道 `p-value ≤ α` 就拒絕 `H0`，`p-value > α` 就無法拒絕 `H0`。
- [ ] 我知道 `95% CI` 是否包含假設值，常可用來快速對照檢定結論。
- [ ] 我能區分 `one-sample t`、`independent two-sample t`、`paired t` 的使用情境。
- [ ] 我看到類別資料、列聯表、是否獨立，會先想到 `chi-square test`。
- [ ] 我看到三組以上平均數比較，會先想到 `F-test / one-way ANOVA`，也知道它只告訴我「至少一組不同」。
- [ ] 我能看懂基本 SciPy 對照：`ttest_ind`、`ttest_rel`、`chi2_contingency`、`f_oneway`。
📌 Out-of-scope reminder：本課不展開 `Wilcoxon`、`Mann-Whitney U`、`Cohen's d`、`Bayesian inference`、`regression`、`ML-specific statistics`、多因子 ANOVA 與事後檢定。
