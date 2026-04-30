# L22102 機率分佈與資料分佈模型 — Study Guide v2

## 0. How to Use This Guide

建議先讀第 1 節的大地圖，再讀第 2 到第 7 節的核心概念。第 8 節用來練「看到題目怎麼選」，第 9 節專門修正常見錯誤，第 10 節做考前練習。

讀每個概念時，請照這個順序記：

```text
先分離散 / 連續
→ 再判斷單點 / 區間 / 累積
→ 最後選分佈：Normal / Binomial / Poisson / Uniform
```

| 標記 | 意思 |
|---|---|
| 🔥 | 需要知道 |
| 🔥🔥 | 常考，要能解釋差異 |
| 🔥🔥🔥 | 高頻必背，要能做情境判斷 |

本課邊界也要記住：這一課問的是「資料像哪種機率分佈」與「機率函數怎麼讀」，不是機器學習模型假設、最大概似估計、假設檢定、p-value 或信賴區間推導。

## 1. Big Picture / Core Pipeline 🔥🔥🔥

### 先懂一句話

機率分佈是在描述「一個隨機變數可能出現哪些值，以及每個值或區間有多可能」。考試通常不是要你硬背公式，而是要你從題目描述判斷：變數是離散還是連續、要算單點還是累積、適合哪一種分佈。

### Everyday Analogy

把本課想成整理便利商店客流紀錄：你先看資料是「人數」還是「等待時間」，再決定要用哪種統計工具讀它。

### 在整體流程中的位置

```text
題目情境
→ 判斷隨機變數型態
→ 選 PMF / PDF / CDF
→ 選 Normal / Binomial / Poisson / Uniform
→ 讀參數或 scipy.stats 程式碼
```

### Key Concepts

| 題目問的是 | 想到 |
|---|---|
| 次數、件數、成功幾次 | 離散型隨機變數 |
| 時間、長度、重量、溫度 | 連續型隨機變數 |
| `P(X = x)` 且 X 是離散型 | PMF |
| 連續型某區間的機率 | PDF 面積或 CDF 相減 |
| `P(X ≤ x)` | CDF |
| 對稱鐘形、`μ`、`σ²`、z-score | Normal |
| 固定 `n` 次、成功 / 失敗、成功機率 `p` | Binomial |
| 固定時間或空間內的事件次數、平均率 `λ` | Poisson |
| 區間 `[a,b]` 內等可能 | Uniform |

### Exam Rule

```text
題目先問「資料型態」→ 先分離散 / 連續
題目問「剛好等於」→ 離散用 PMF，連續單點機率為 0
題目問「小於等於」→ CDF
題目問「區間內」→ CDF 相減或 PDF 面積
```

### Quick Check

**Q.** 題目說「某客服中心每小時收到幾通客訴」，第一步要把它看成離散型還是連續型？

答案：離散型。因為客訴通數是可以數的件數。

## 2. 隨機變數與離散 / 連續判斷 🔥🔥

### 先懂一句話

`隨機變數（Random Variable, RV）` 是把隨機結果轉成數字的規則。考試第一刀通常是判斷這個數字是「可數的」還是「連續量測的」。

### Everyday Analogy

像抽獎活動：抽到哪個獎品是隨機結果；如果你記錄「今天抽出幾個中獎者」，這個數字就是隨機變數。

### 在整體流程中的位置

```text
樣本空間 / 事件
→ 隨機變數
→ 離散型 or 連續型
→ 選 PMF / PDF / CDF
```

### Key Concepts

| 概念 | 白話 | 例子 | 常接的工具 |
|---|---|---|---|
| 樣本空間（Sample Space） | 所有可能結果 | 抽獎可能抽到的所有獎品 | 定義問題範圍 |
| 事件（Event） | 你關心的結果集合 | 抽到耳機 | 算機率 |
| 隨機變數（Random Variable） | 把結果映射成數字 | 今天中獎人數 | 接分佈 |
| 離散型（Discrete） | 取值可數 | 人數、件數、答對題數 | PMF、CDF |
| 連續型（Continuous） | 取值落在連續區間 | 時間、身高、重量 | PDF、CDF |

簡單例子：

```text
X = 一份問卷答對題數 → 離散型
Y = 外送送達時間 → 連續型
```

### Exam Rule

```text
次數 / 件數 / 人數 / 成功幾次 → 離散型
時間 / 長度 / 重量 / 溫度 / 分數量測值 → 通常連續型
離散型單點 P(X=x) → 可能大於 0
連續型單點 P(X=x) → 等於 0
```

### Quick Check

**Q.** 「通勤所花分鐘數」在本課通常看成哪一型隨機變數？

答案：連續型。因為時間理論上可以有小數，例如 25.3 分鐘。

## 3. PMF / PDF / CDF 🔥🔥🔥

### 先懂一句話

PMF、PDF、CDF 是讀機率分佈的三種語言。PMF 讀離散單點，PDF 讀連續密度，CDF 讀「累積到某個值為止」。

### Everyday Analogy

像看店裡排隊狀況：PMF 問「剛好 3 個人排隊」；PDF 像看等待時間曲線的高低；CDF 問「等 5 分鐘以內的人累積有多少」。

### 在整體流程中的位置

```text
判斷離散 / 連續
→ 判斷題目問單點 / 區間 / 累積
→ PMF / PDF / CDF
```

### Key Concepts

| 項目 | PMF | PDF | CDF |
|---|---|---|---|
| 中文 | 機率質量函數 | 機率密度函數 | 累積分配函數 |
| 英文 | Probability Mass Function | Probability Density Function | Cumulative Distribution Function |
| 適用 | 離散型 | 連續型 | 離散型與連續型都可 |
| 讀法 | `P(X=x)` | `f(x)`，密度不是單點機率 | `F(x)=P(X≤x)` |
| 機率來源 | 單點機率 | 區間下面面積 | 累積機率 |
| 常見函式 | `binom.pmf`, `poisson.pmf` | `norm.pdf`, `uniform.pdf` | `norm.cdf`, `binom.cdf`, `poisson.cdf` |

重要公式：

```text
PMF: p(x) = P(X = x)
CDF: F(x) = P(X ≤ x)
區間機率: P(a < X ≤ b) = F(b) - F(a)
連續型: P(X = x) = 0
```

如果題目給：

```text
F(3) = 0.7
```

你要翻成：

```text
P(X ≤ 3) = 0.7
```

### Exam Rule

```text
看到 P(X = x) + 離散型 → PMF
看到連續型某點 f(x) → PDF 密度，不是機率
看到 P(X ≤ x) / 最多 / 不超過 / 以下 → CDF
看到 P(a < X ≤ b) → F(b) - F(a)
PDF 數值可以大於 1 → 因為它是密度，不是機率
```

### Quick Check

**Q.** 對連續型隨機變數，`P(X = 10)` 等於多少？

答案：0。連續型的機率來自區間面積，不是單一精準點。

## 4. 常態分佈 Normal Distribution 🔥🔥

### 先懂一句話

`常態分佈（Normal Distribution）` 是連續型分佈，圖形是左右對稱的鐘形。題目看到對稱、中間最多、兩端較少、`μ`、`σ²`、z-score，就要想到 Normal。

### Everyday Analogy

像大型考試成績：多數人集中在平均附近，特別高分和特別低分的人都比較少，左右大致對稱。

### 在整體流程中的位置

```text
連續型資料
→ 對稱鐘形 / 平均與標準差
→ Normal(μ, σ²)
→ PDF / CDF / z-score
```

### Key Concepts

記號：

```text
X ~ Normal(μ, σ²)
```

| 符號 | 意思 |
|---|---|
| `μ` | 平均數（Mean） |
| `σ²` | 變異數（Variance） |
| `σ` | 標準差（Standard Deviation） |

常態分佈性質：

| 性質 | 考試記法 |
|---|---|
| 對稱於 `μ` | 平均數、中位數、眾數在中心 |
| `σ` 越大 | 曲線越扁越寬 |
| `σ` 越小 | 曲線越高越窄 |
| 可標準化 | `z = (x - μ) / σ` |

68-95-99.7 法則：

```text
μ ± 1σ 內：約 68%
μ ± 2σ 內：約 95%
μ ± 3σ 內：約 99.7%
```

z-score 表示一筆資料離平均數幾個標準差：

```text
z = (x - μ) / σ
```

`scipy.stats` 讀法：

```python
norm.pdf(x, loc=μ, scale=σ)
norm.cdf(x, loc=μ, scale=σ)
```

注意：`scale` 傳的是 `σ`，不是 `σ²`。

### Exam Rule

```text
對稱鐘形 / 中間最多兩端少 → Normal
題目給 μ 和 σ² → Normal
題目提 z-score / 標準化 → Normal
題目提 68-95-99.7 → Normal
scipy norm 的 scale → 標準差 σ，不是變異數 σ²
```

### Quick Check

**Q.** `X ~ Normal(70, 100)`，在 `norm.cdf(x, loc=70, scale=?)` 中 `scale` 應填多少？

答案：10。因為數學記號中的 100 是變異數 `σ²`，SciPy 的 `scale` 要填標準差 `σ`。

## 5. 二項分佈 Binomial Distribution 🔥🔥

### 先懂一句話

`二項分佈（Binomial Distribution）` 描述固定做 `n` 次試驗時，成功出現幾次。它的核心線索是：固定次數、成功 / 失敗、成功機率固定、各次獨立。

### Everyday Analogy

像投 10 封履歷，每封先粗略記成「有面試」或「沒有面試」。如果每封成功率都可視為一樣，問 10 封裡剛好成功 3 封，就是二項分佈。

### 在整體流程中的位置

```text
離散型次數
→ 固定 n 次試驗
→ 每次成功 / 失敗
→ Binomial(n, p)
```

### Key Concepts

記號：

```text
X ~ Binomial(n, p)
```

| 符號 | 意思 |
|---|---|
| `n` | 固定試驗次數 |
| `p` | 每次成功機率 |
| `k` | 成功次數 |

成立條件：

| 條件 | 說明 |
|---|---|
| 固定 `n` 次 | 例如打 20 通電話 |
| 每次兩種結果 | 成功 / 失敗 |
| 成功機率固定 | 每次都是 `p` |
| 各次獨立 | 一次結果不影響另一次 |

PMF 公式：

```text
P(X = k) = C(n,k) p^k (1-p)^(n-k)
C(n,k) = n! / [k!(n-k)!]
```

平均與變異：

```text
Mean = np
Variance = np(1-p)
```

`scipy.stats` 讀法：

```python
binom.pmf(k, n, p)  # P(X = k)
binom.cdf(k, n, p)  # P(X ≤ k)
```

### Exam Rule

```text
固定做 n 次 → Binomial
每次只有成功 / 失敗 → Binomial
問成功幾次 → Binomial
完整 PMF 不能漏 C(n,k)
binom.pmf(k,n,p) → 剛好 k 次
binom.cdf(k,n,p) → 最多 k 次
```

### Quick Check

**Q.** 12 題是非題中，問剛好答對 8 題的機率，最像哪個分佈？

答案：二項分佈。因為有固定 12 次試驗，每題可視為答對 / 答錯。

## 6. 卜瓦松分佈與均勻分佈 🔥🔥

### 先懂一句話

`卜瓦松分佈（Poisson Distribution）` 看固定區間內事件發生幾次；`均勻分佈（Uniform Distribution）` 看已知區間內每個位置等可能。前者是離散次數，後者通常是連續區間。

### Everyday Analogy

Poisson 像記錄「每小時客訴幾件」；Uniform 像系統說「驗證碼會在 2 到 6 分鐘內任一時間等可能送達」。

### 在整體流程中的位置

```text
事件次數 + 固定時間 / 空間 + 平均率 λ → Poisson
連續區間 + 每個位置等可能 → Uniform
```

### Key Concepts

#### Poisson

記號：

```text
X ~ Poisson(λ)
```

| 重點 | 說明 |
|---|---|
| `λ` | 平均發生率 |
| 使用情境 | 固定時間、區域、長度或空間內的事件次數 |
| 常見線索 | 稀有事件、平均每小時幾次、每公里幾個 |
| 平均數 | `λ` |
| 變異數 | `λ` |

PMF：

```text
P(X = k) = (e^-λ * λ^k) / k!
```

`scipy.stats` 讀法：

```python
poisson.pmf(k, mu=λ)  # P(X = k)
poisson.cdf(k, mu=λ)  # P(X ≤ k)
```

#### 指數分佈 (Exponential Distribution) 🔥🔥

**一句話**：描述「Poisson 事件發生的等待時間」——如果事件以速率 λ 發生，則兩次事件之間的等待時間服從指數分佈。

**與 Poisson 的關係**：Poisson 計算「單位時間內幾次」；指數分佈計算「下一次要等多久」。

**PDF**：f(x) = λe^(−λx)，x ≥ 0

**期望值**：E(X) = 1/λ；**變異數**：Var(X) = 1/λ²

**無記憶性 (Memoryless)**：P(X > s + t | X > s) = P(X > t)。已等了 s 分鐘，再等 t 分鐘的機率，與一開始等 t 分鐘相同。

**考試判斷規則**：

| 題目問的是 | 選 |
|---|---|
| 某段時間內發生幾次事件 | Poisson |
| 下一次事件發生要等多久 | Exponential |
| 等待時間無記憶性 | Exponential |

#### Uniform

記號：

```text
X ~ Uniform(a, b)
```

| 重點 | 說明 |
|---|---|
| 使用情境 | 區間 `[a,b]` 內等可能 |
| PDF | `1 / (b-a)` |
| 平均數 | `(a+b) / 2` |
| 變異數 | `(b-a)^2 / 12` |

`scipy.stats` 讀法：

```python
uniform.pdf(x, loc=a, scale=b-a)
uniform.cdf(x, loc=a, scale=b-a)
```

注意：SciPy 的 `scale` 是區間寬度 `b-a`，不是右界 `b`。

### Exam Rule

```text
固定區間內發生幾次 / 平均率 λ → Poisson
Poisson 的 mean = variance = λ
稀有事件 + n ≥ 100 且 np ≤ 10 + λ=np → Poisson 近似 Binomial
區間內每個值等可能 → Uniform
Uniform(a,b) 在 scipy 是 loc=a, scale=b-a
```

### Quick Check

**Q.** 平均每 10 分鐘有 3 通客服電話，問 10 分鐘內剛好 2 通的機率，最像哪個分佈？

答案：卜瓦松分佈。因為題目是在固定時間內問事件發生次數，且給了平均率。

## 7. 分佈關係、CLT 與 scipy.stats 讀碼 🔥🔥

### 先懂一句話

考試常把分佈關係和程式碼混在一起考：你要分得出 Binomial 何時近似 Poisson、CLT 到底在講誰，以及 `.pmf`、`.pdf`、`.cdf` 分別在算什麼。

### Everyday Analogy

像看外送平台報表：單筆送達時間可能很偏，但如果每天抽很多筆算平均，很多天的平均值就可能變得像鐘形；程式函式則像報表按鈕，按錯按鈕就會讀錯機率。

### 在整體流程中的位置

```text
已選分佈
→ 判斷是否有近似條件
→ 判斷是原始資料還是樣本平均
→ 讀 scipy.stats 的分佈與函式
```

### Key Concepts

#### Binomial 近似 Poisson

```text
條件：n ≥ 100 且 np ≤ 10（λ = np）
→ Binomial(n,p) 可用 Poisson(λ=np) 近似
```

不要把它和 Binomial 近似 Normal 混在一起：

```text
np ≥ 5 且 n(1-p) ≥ 5
→ Binomial 可用 Normal 近似
```

> **連續性修正 (Continuity Correction) 🔥🔥 考試陷阱**：二項分佈是離散的，用常態近似時需加 ±0.5 修正。例如 P(X ≤ k) ≈ P(Z ≤ (k + 0.5 − μ) / σ)。忽略此修正會讓計算結果出現誤差，是常見考試陷阱。

#### 中央極限定理（Central Limit Theorem, CLT）

CLT 的重點：

```text
不管原始母體分佈長怎樣，
只要樣本數夠大（一般教科書以 n ≥ 30 作為「樣本夠大」的標準），
樣本平均數的抽樣分佈會趨近常態分佈。
```

更精確地說：

```text
樣本平均數的平均約為 μ
樣本平均數的變異約為 σ² / n
```

最重要的主詞是「樣本平均數」，不是「每筆原始資料」。

#### scipy.stats 一眼判讀

| 看到 | 讀成 |
|---|---|
| `.pmf(...)` | 離散型單點機率 `P(X=x)` |
| `.pdf(...)` | 連續型密度，不是單點機率 |
| `.cdf(...)` | 累積機率 `P(X≤x)` |
| `norm` | 常態分佈 |
| `binom` | 二項分佈 |
| `poisson` | 卜瓦松分佈 |
| `uniform` | 均勻分佈 |

### Exam Rule

```text
n ≥ 100 且 np ≤ 10（λ=np）→ Binomial 用 Poisson 近似
np ≥ 5 且 n(1-p) ≥ 5 → Binomial 用 Normal 近似
CLT → 樣本平均數趨近常態，不是原始資料變常態
.pmf → P(X=x)
.cdf → P(X≤x)
.pdf → 密度，不是機率
```

### Quick Check

**Q.** CLT 說的是「原始資料都會變成常態」嗎？

答案：不是。CLT 說的是樣本數夠大時，樣本平均數的抽樣分佈會趨近常態。

## 8. Exam Decision Trees

### 8.1 先選 PMF / PDF / CDF

```text
題目問哪種機率？
│
├─ 問 P(X = x)？
│  ├─ X 是離散型 → PMF
│  └─ X 是連續型 → P(X=x)=0
│
├─ 問 P(X ≤ x)、最多、不超過、以下？
│  └─ CDF
│
└─ 問 P(a < X ≤ b)、介於兩值之間？
   ├─ 可用 CDF 相減 → F(b)-F(a)
   └─ 連續型也可想 PDF 面積
```

### 8.2 先選分佈

```text
題目描述資料型態？
│
├─ 連續型？
│  ├─ 對稱鐘形 / μ / σ² / z-score → Normal
│  └─ 區間 [a,b] 內等可能 → Uniform
│
└─ 離散型？
   ├─ 固定 n 次，每次成功 / 失敗 → Binomial
   └─ 固定時間 / 空間內發生幾次，給 λ → Poisson
```

### 8.3 近似判斷

```text
題目問 Binomial 可否近似？
│
├─ n ≥ 100 且 np ≤ 10、λ=np？
│  └─ 用 Poisson 近似
│
└─ np ≥ 5 且 n(1-p) ≥ 5？
   └─ 用 Normal 近似
```

## 9. Trap Clinic

### Trap 1：PDF 的值就是某點機率

錯。PDF 是密度，不是機率；連續型的單點機率 `P(X=x)` 等於 0。

Exam fix：

```text
連續型 + 單點 → P(X=x)=0
連續型 + 區間 → PDF 面積或 CDF 相減
```

### Trap 2：CDF 是 `P(X=x)`

錯。CDF 是 `F(x)=P(X≤x)`，表示累積到 x 為止。

Exam fix：

```text
最多 / 不超過 / 以下 / ≤ → CDF
剛好等於 + 離散型 → PMF
```

### Trap 3：Normal(μ, σ²) 的 SciPy `scale` 要填 σ²

錯。`norm.pdf` 和 `norm.cdf` 的 `scale` 要填標準差 `σ`，不是變異數 `σ²`。

Exam fix：

```text
數學 Normal(μ, σ²) → scipy norm(..., loc=μ, scale=σ)
```

### Trap 4：二項分佈 PMF 可以省略 `C(n,k)`

錯。`C(n,k)` 表示哪 k 次成功的組合數，漏掉就只算到一種固定順序。

Exam fix：

```text
Binomial PMF → C(n,k)p^k(1-p)^(n-k)
```

### Trap 5：Poisson 只要記得 λ，不用記 mean 和 variance

錯。Poisson 的高頻特徵是 `mean = variance = λ`。

Exam fix：

```text
Poisson(λ) → 平均數 λ，變異數 λ
```

### Trap 6：CLT 說原始資料會變常態

錯。CLT 說的是「樣本平均數的抽樣分佈」趨近常態，不是原始資料本身變常態。

Exam fix：

```text
CLT 主詞 → 樣本平均數
不是 → 單一觀測值 / 原始資料
```

### Trap 7：Uniform 的 scipy `scale` 是右界 b

錯。`uniform(..., loc=a, scale=b-a)`，`scale` 是區間寬度。

Exam fix：

```text
Uniform(a,b) → loc=a, scale=b-a
```

## 10. Practice Questions

### 10.1 隨機變數、PMF / PDF / CDF

**Q1.** 一天收到的客服申訴件數是離散型還是連續型？

答案：離散型。  
理由：件數是可數的整數。

**Q2.** 外送送達時間是離散型還是連續型？

答案：連續型。  
理由：時間可落在連續區間，例如 25.3 分鐘。

**Q3.** `P(X = 4)` 且 X 是離散型，應想到 PMF、PDF 還是 CDF？

答案：PMF。  
理由：PMF 用來讀離散型單點機率。

**Q4.** `F(8)=0.9` 代表什麼？

答案：`P(X≤8)=0.9`。  
理由：CDF 表示累積到某個值為止的機率。

**Q5.** 連續型變數的 `P(X=5)` 通常是多少？

答案：0。  
理由：連續型單點沒有面積，所以單點機率為 0。

### 10.2 四大分佈

**Q6.** 題目描述成績呈左右對稱鐘形，且給平均數與標準差，最像哪個分佈？

答案：常態分佈。  
理由：對稱鐘形、`μ`、`σ` 是 Normal 的典型線索。

**Q7.** 20 通電話中每通成交機率固定，問剛好成交 5 通，最像哪個分佈？

答案：二項分佈。  
理由：固定 `n` 次，每次成功 / 失敗，問成功次數。

**Q8.** 某網站平均每小時當機 0.2 次，問一小時內當機次數，最像哪個分佈？

答案：卜瓦松分佈。  
理由：固定時間內的事件發生次數，且有平均率。

**Q9.** 亂數在 0 到 1 之間每個位置等可能，最像哪個分佈？

答案：均勻分佈。  
理由：連續區間內等可能是 Uniform 的核心線索。

**Q10.** `X ~ Poisson(λ)` 的平均數與變異數是多少？

答案：平均數是 `λ`，變異數也是 `λ`。  
理由：`mean = variance = λ` 是 Poisson 的高頻特徵。

### 10.3 近似、CLT 與 scipy.stats

**Q11.** `n` 很大、`p` 很小、`λ=np` 固定時，Binomial 可用哪個分佈近似？

答案：Poisson。  
理由：這是 Binomial → Poisson 近似的典型條件。

**Q12.** `np ≥ 5` 且 `n(1-p) ≥ 5` 時，Binomial 常可用哪個分佈近似？

答案：Normal。  
理由：這是 Binomial → Normal 近似的常見判斷條件。

**Q13.** CLT 的主詞是原始資料還是樣本平均數？

答案：樣本平均數。  
理由：CLT 說樣本平均數的抽樣分佈會趨近常態。

**Q14.** `binom.pmf(3, n=10, p=0.2)` 讀成什麼？

答案：`P(X=3)`。  
理由：`.pmf` 是離散型單點機率，這裡是剛好成功 3 次。

**Q15.** `poisson.cdf(2, mu=3)` 讀成什麼？

答案：`P(X≤2)`。  
理由：`.cdf` 是小於等於某值的累積機率。

**Q16.** `norm.cdf(85, loc=70, scale=10)` 讀成什麼？

答案：常態分佈下 `P(X≤85)`。  
理由：`norm.cdf` 表示累積到 85 為止的機率。

**Q17.** `uniform.pdf(x, loc=2, scale=4)` 對應的 Uniform 區間是什麼？

答案：`Uniform(2,6)`。  
理由：`loc=a=2`，`scale=b-a=4`，所以 `b=6`。

### 10.4 Mixed Traps

**Q18.** PDF 的數值可以大於 1 嗎？

答案：可以。  
理由：PDF 是密度，不是機率；只要整體面積為 1 即可。

**Q19.** 題目問「最多 4 次成功」，應用 `.pmf(4)` 還是 `.cdf(4)`？

答案：`.cdf(4)`。  
理由：「最多 4 次」是 `P(X≤4)`。

**Q20.** `Normal(50, 25)` 在 SciPy 中 `scale` 是 25 還是 5？

答案：5。  
理由：25 是變異數 `σ²`，`scale` 要填標準差 `σ`。

## Final Oral Recall

考前最後 3 分鐘，把這幾句唸一次：

1. 本課先分離散與連續：次數件數多半離散，時間長度重量多半連續。
2. PMF 是離散單點 `P(X=x)`，PDF 是連續密度，CDF 是累積 `P(X≤x)`。
3. Normal 是連續、對稱鐘形，參數是 `μ, σ²`，z-score 是 `(x-μ)/σ`。
4. Binomial 是固定 `n` 次成功 / 失敗，PMF 不能漏 `C(n,k)`。
5. Poisson 是固定區間內事件次數，參數 `λ` 同時是平均數與變異數。
6. Uniform 是 `[a,b]` 內等可能，SciPy 寫 `loc=a, scale=b-a`。
7. CLT 講樣本平均數趨近常態，不是原始資料自己變常態。

## Final Study Advice

不要只背分佈名字。考試真正想測的是你能不能從題目文字判斷：資料是離散還是連續、題目問單點還是累積、情境是固定次數、固定發生率、對稱鐘形，還是區間等可能。
