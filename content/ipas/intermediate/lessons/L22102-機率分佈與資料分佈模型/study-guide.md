# L22102 機率分佈與資料分佈模型 — 學習指南
## Section 1: Exam Item Mapping
> 對應評鑑範圍：**L22102 機率分佈與資料分佈模型**（L221 統計學基礎 → L22 大數據處理分析與應用）
（完整定義與推導見 Section 3；以下為考點總覽，建議先瀏覽再回本節複習。）
這一課考的是把資料看成某種`機率分佈（Probability Distribution）`後，你能不能：
- 分清楚`離散型隨機變數（Discrete Random Variable）`與`連續型隨機變數（Continuous Random Variable）`
- 正確讀`機率質量函數（Probability Mass Function, PMF）`
- 正確讀`機率密度函數（Probability Density Function, PDF）`
- 正確讀`累積分配函數（Cumulative Distribution Function, CDF）`
- 看到情境時，快速判斷比較像`常態分佈（Normal Distribution）`、`二項分佈（Binomial Distribution）`、`卜瓦松分佈（Poisson Distribution）`或`均勻分佈（Uniform Distribution）`
- 用參數理解分佈形狀，例如 `Normal(μ, σ²)`、`Binomial(n, p)`、`Poisson(λ)`、`Uniform(a, b)`
- 看懂 `scipy.stats` 基本函式呼叫，例如 `norm.pdf`、`norm.cdf`、`binom.pmf`、`poisson.pmf`、`uniform.pdf`
官方實題已直接碰到的方向包括：
- `CDF` 定義判讀
- `poisson.pmf` / `poisson.cdf` 語意
- 二項分佈近似其他分佈的條件
- 分佈適用情境辨識
本課邊界要守住：
- 本課是資料端：`我的資料長得像什麼分佈？`
- 不教模型端：例如`高斯朴素貝氏（Gaussian Naive Bayes）`為何假設特徵服從常態，這是 `L23101` 範圍
- 不展開最大概似估計、假設檢定、常態性檢定、Q-Q plot 推論細節
---
## Section 2: 關鍵概念總覽圖 (Knowledge Tree)
```text
📖 L22102 機率分佈與資料分佈模型
│
├── 🎯 考試定位
│   ├── 資料像哪種分佈？
│   ├── PMF / PDF / CDF 怎麼讀？🔥🔥
│   ├── 參數改變時形狀怎麼變？
│   ├── scipy.stats 程式碼怎麼判讀？🔥🔥
│   └── ⚠️ 不考 ML 演算法的分佈假設
│
├── 📖 隨機變數與機率基礎
│   ├── 樣本空間（Sample Space）
│   ├── 事件（Event）
│   ├── 機率（Probability）
│   ├── 離散型隨機變數（Discrete RV）
│   │   └── 例：一天收到幾封面試邀請
│   └── 連續型隨機變數（Continuous RV）
│       └── 例：外送送達時間、通勤分鐘數
│
├── 📊 機率理論模型
│   ├── PMF（Probability Mass Function）🔥🔥
│   │   ├── 對象：離散型
│   │   ├── 讀法：P(X = x)
│   │   └── ⚠️ 各點機率加總 = 1
│   ├── PDF（Probability Density Function）🔥🔥
│   │   ├── 對象：連續型
│   │   ├── 讀法：密度，不是單點機率
│   │   └── ⚠️ P(X = x) = 0 for continuous
│   └── CDF（Cumulative Distribution Function）🔥🔥
│       ├── 讀法：P(X ≤ x)
│       ├── 離散型：階梯狀
│       ├── 連續型：平滑上升
│       └── ⚠️ 區間機率 = CDF 相減
│
├── 📈 四大分佈
│   ├── 常態分佈（Normal Distribution）🔥🔥
│   │   ├── 參數：μ, σ²
│   │   ├── 形狀：對稱鐘形
│   │   ├── 重點：68-95-99.7 rule
│   │   ├── 重點：z-score 標準化
│   │   └── ⚠️ scipy `scale` 傳的是 σ，不是 σ²
│   ├── 二項分佈（Binomial Distribution）🔥🔥
│   │   ├── 參數：n, p
│   │   ├── 條件：固定 n 次、成功/失敗、p 固定
│   │   ├── 公式：C(n,k)p^k(1-p)^(n-k)
│   │   └── ⚠️ 忘記組合數會直接算錯
│   ├── 卜瓦松分佈（Poisson Distribution）🔥🔥
│   │   ├── 參數：λ
│   │   ├── 條件：固定區間內事件次數
│   │   ├── 特色：mean = variance = λ
│   │   └── ⚠️ 稀有事件 + rate-based 才像 Poisson
│   └── 均勻分佈（Uniform Distribution）🔥
│       ├── 參數：a, b
│       ├── 形狀：區間內一樣高
│       ├── PDF = 1 / (b-a)
│       └── ⚠️ scipy 傳法是 `loc=a, scale=b-a`
│
├── ⚖️ 分佈關係與近似
│   ├── 二項分佈近似卜瓦松分佈
│   │   ├── n 大、p 小、λ=np 固定
│   │   └── ⚠️ 不是所有 Binomial 都能硬換 Poisson
│   └── 中央極限定理（Central Limit Theorem, CLT）🔥🔥
│       ├── 對象：樣本平均數的分佈
│       ├── 結論：n 夠大時趨近常態
│       ├── 平均：μ
│       └── ⚠️ 不是每筆原始資料都會變常態
│
└── 🔧 scipy.stats 讀碼
    ├── `norm.pdf(x, loc=μ, scale=σ)`
    ├── `norm.cdf(x, loc=μ, scale=σ)`
    ├── `binom.pmf(k, n, p)`
    ├── `binom.cdf(k, n, p)`
    ├── `poisson.pmf(k, mu=λ)`
    ├── `poisson.cdf(k, mu=λ)`
    ├── `uniform.pdf(x, loc=a, scale=b-a)`
    ├── `uniform.cdf(x, loc=a, scale=b-a)`
    └── ⚠️ 題目常考：你到底是在算單點、區間，還是累積機率
```
---
## Section 3: Core Concepts
### 3.1 隨機變數與機率的基礎
`隨機變數（Random Variable, RV）` 是把隨機結果對應成數值的規則。
形式上，你可以把它理解成：
- 先有`樣本空間（Sample Space）`：所有可能結果的集合
- 再定義`事件（Event）`：你關心的結果子集合
- 最後用`隨機變數（Random Variable, RV）`把結果映射成數字
🗣️ 白話說明：像你在 LINE 社群辦抽獎，樣本空間是所有抽到的結果；事件是「抽到耳機」；如果你把「今天抽到幾個中獎者」記成一個數字，那就是隨機變數。
`離散型隨機變數（Discrete Random Variable）` 的可能取值是可數的。
例子：
- 一週面試邀約次數
- 今天 7-11 結帳排隊人數
- 一份問卷答對題數
🗣️ 白話說明：像 IG 限動投票，最後會得到「有 83 人按同意」這種整數次數，這就是離散型。
`連續型隨機變數（Continuous Random Variable）` 的可能取值落在一段連續區間中。
例子：
- Uber Eats 外送送達時間
- 通勤所花分鐘數
- 筆電充電到 80% 所需時間
🗣️ 白話說明：像你等外送，不會只可能 25 分鐘或 26 分鐘，25.3、25.31、25.314 分鐘理論上都可能，這就是連續型。
🔥 先做第一個判斷：
- 問的是「次數、件數、成功幾次」通常偏向離散型
- 問的是「時間、長度、重量、溫度」通常偏向連續型
### 3.2 機率質量函數 PMF / 機率密度函數 PDF / 累積分配函數 CDF
#### 3.2.1 機率質量函數（Probability Mass Function, PMF）🔥🔥
`機率質量函數（Probability Mass Function, PMF）` 用在`離散型隨機變數（Discrete Random Variable）`，表示某個值發生的機率。
定義：
```text
PMF: p(x) = P(X = x)
```
重點：
- 只適用於離散型
- 每個可能值都有一個機率
- 所有可能值的機率加總要等於 1
🗣️ 白話說明：像大學分組報告，你記錄每組成員「遲交作業的人數」。如果問「剛好有 2 人遲交」的機率，這種單點整數機率就是 PMF 在做的事。
例子：
```text
X = 今天收到的客服申訴件數
P(X=0)=0.2
P(X=1)=0.5
P(X=2)=0.2
P(X=3)=0.1
```
這裡 `P(X=1)=0.5` 就是 PMF 的一個值。
#### 3.2.2 機率密度函數（Probability Density Function, PDF）🔥🔥
`機率密度函數（Probability Density Function, PDF）` 用在`連續型隨機變數（Continuous Random Variable）`，描述某點附近的機率密度。
定義觀念：
```text
PDF: f(x)
區間機率要靠面積：
P(a ≤ X ≤ b) = ∫[a,b] f(x) dx
```
重點：
- 只適用於連續型
- `f(x)` 本身不是機率
- `P(X = x) = 0`
- 真正的機率來自區間下面的面積
🗣️ 白話說明：像你看 YouTube 影片長度分佈，某一個精準到小數點後很多位的秒數，幾乎不會剛好被抽到；你真正會問的是「介於 8 分到 10 分的影片比例是多少」，那就要看區間面積。
🔥🔥 高頻陷阱：
`PDF` 的值可以大於 1，但只要整體面積是 1 就沒問題。
#### 3.2.3 累積分配函數（Cumulative Distribution Function, CDF）🔥🔥
`累積分配函數（Cumulative Distribution Function, CDF）` 表示隨機變數小於或等於某個值的機率。
定義：
```text
CDF: F(x) = P(X ≤ x)
```
重點：
- 離散型與連續型都能定義 CDF
- CDF 一定是遞增
- 值域介於 `0` 到 `1`
- 區間機率可用 CDF 相減
```text
P(a < X ≤ b) = F(b) - F(a)
```
🗣️ 白話說明：像蝦皮賣家看物流到貨時間，若 `F(2)=0.8`，意思是「80% 的包裹會在 2 天內到」。這種「到某個門檻為止累積多少」就是 CDF。
#### 3.2.4 怎麼讀 CDF 表或題目
如果題目給你：
```text
F(3) = 0.7
```
你要直接翻譯成：
```text
P(X ≤ 3) = 0.7
```
如果是離散型，還可以進一步算：
```text
P(X = 3) = F(3) - F(2)
```
如果是連續型，則：
```text
P(2 < X ≤ 5) = F(5) - F(2)
```
🗣️ 白話說明：像你看公司新人報到時間，`F(9:10)=0.65` 代表 65% 的人 9:10 以前就到了。這題不是問「9:10 整那一秒到的人」，而是問「累積到 9:10 為止」。
ASCII 圖：離散型 CDF 階梯 vs 連續型 CDF 平滑曲線
```text
離散型 CDF（staircase）          連續型 CDF（smooth）
1.0 |            ________         1.0 |                 ______
    |           |                 |                 ___/
0.7 |      _____|                 0.7 |            _/
    |     |                       |          __/
0.4 |_____|                       0.4 |     _/
    |                             |   _/
0.0 +-------------------> x       0.0 +--------------------> x
```
🔥🔥 考題反應要很快：
- 問 `P(X ≤ x)` → 想 CDF
- 問 `P(X = x)` 且 X 是離散型 → 想 PMF
- 問區間機率且 X 是連續型 → 想 PDF 面積或 CDF 相減
### 3.3 常態分佈（Normal Distribution）🔥🔥
`常態分佈（Normal Distribution）` 是最常見的連續型分佈之一，形狀是左右對稱的鐘形曲線。
記號：
```text
X ~ Normal(μ, σ²)
```
其中：
- `μ` 是`平均數（Mean）`
- `σ²` 是`變異數（Variance）`
- `σ` 是`標準差（Standard Deviation, SD）`
性質：
- 對稱於 `μ`
- 平均數、中位數、眾數在同一中心
- `σ` 越大，曲線越扁越寬
- `σ` 越小，曲線越高越窄
🗣️ 白話說明：像大型企業新鮮人入職考成績，如果題目說多數人集中在中間，太高太低都少，而且左右大致對稱，通常就是在暗示常態分佈。
#### 3.3.1 68-95-99.7 法則（又稱經驗法則）（Empirical Rule）🔥🔥
對常態分佈來說，大約有：
```text
μ ± 1σ 內：約 68%
μ ± 2σ 內：約 95%
μ ± 3σ 內：約 99.7%
```
🗣️ 白話說明：像一間公司 100 人的每日通勤時間如果接近常態，大概 68 人會落在「平均值上下 1 個標準差」這個區間內。這個概念在題目裡超常被拿來做快速估算。
ASCII 圖：常態鐘形曲線與 68-95-99.7 區間
```text
                    .-'''''''-.
                 .-'     |     '-.
               .'        |        '.
              /          |          \
             /           |           \
------------/------------|------------\------------
         μ-3σ         μ-1σ  μ  μ+1σ      μ+3σ
區間比例：
μ ± 1σ  :  約 68%
μ ± 2σ  :  約 95%
μ ± 3σ  :  約 99.7%
```
#### 3.3.2 標準化（Standardization）與 Z 分數（Z-score）🔥
`標準化（Standardization）` 是把資料轉成以 0 為中心、以 1 為標準差的尺度。
公式：
```text
z = (x - μ) / σ
```
其中 `z` 就是`Z 分數（Z-score）`。
它表示：
- 這筆資料比平均高多少個標準差
- 或比平均低多少個標準差
🗣️ 白話說明：像你看 104 的兩份履歷測驗成績，一份是英文 82 分、一份是程式 71 分，分數尺度不同時，直接比沒意義；轉成 z-score 才能看誰相對更突出。
#### 3.3.3 何時優先想到 Normal
看到以下線索時，先懷疑常態分佈：
- 連續型資料
- 左右對稱
- 中間最多，兩端越來越少
- 題目給 `μ` 與 `σ²`
- 題目提 `z-score`
- 題目提 68-95-99.7 rule
🔥 高頻應用：
- 成績
- 身高
- 誤差
- 大量自然現象的測量值
### 3.4 二項分佈（Binomial Distribution）🔥🔥
`二項分佈（Binomial Distribution）` 用來描述在固定次數試驗中，成功出現幾次。
記號：
```text
X ~ Binomial(n, p)
```
其中：
- `n` 是試驗次數
- `p` 是每次成功機率
成立條件：
- 固定 `n` 次試驗
- 每次只有兩種結果：成功 / 失敗
- 每次成功機率相同
- 各次試驗彼此獨立
🗣️ 白話說明：像你連續投 10 封履歷到 104，每封最後結果先粗略記成「有收到面試 / 沒收到面試」。若假設每封成功機率都差不多，問 10 封裡剛好收到 3 次面試邀請的機率，就是二項分佈。
#### 3.4.1 PMF 公式
若 `X` 是成功次數，則：
```text
P(X = k) = C(n,k) p^k (1-p)^(n-k)
```
其中：
```text
C(n,k) = n! / [k!(n-k)!]
```
意思是：
- 先算哪 `k` 次成功的排列組合數
- 再乘上那種成功 / 失敗模式出現的機率
🗣️ 白話說明：像你班上 8 人專題簡報，問「剛好有 2 人忘記帶投影片遙控器」的機率，不只要算「2 人忘記」本身，還要算是哪 2 人忘記，所以組合數不能漏。
#### 3.4.2 平均數與變異數
```text
Mean = np
Variance = np(1-p)
```
這兩個公式很常和 Poisson 比較。
#### 3.4.3 何時優先想到 Binomial
看到以下線索時，先想二項分佈：
- 固定做 `n` 次
- 每次只有成功 / 失敗
- 問成功次數
- 題目明示每次成功機率 `p`
例子：
- 20 通冷開發電話中，成功約到會議幾次
- 15 位面試者中，通過初篩幾人
- 12 題是非題中，答對幾題
### 3.5 卜瓦松分佈（Poisson Distribution）🔥🔥
`卜瓦松分佈（Poisson Distribution）` 用來描述固定時間、區域、長度或空間內，事件發生的次數。
記號：
```text
X ~ Poisson(λ)
```
其中 `λ` 是平均發生率。
成立情境常見線索：
- 固定單位時間 / 單位空間
- 稀有事件
- 問事件次數
- 平均發生率固定
🗣️ 白話說明：像客服中心每 10 分鐘進線幾通、店面每小時客訴幾件、某倉庫每平方公尺瑕疵點幾個，這種「某區間內發生幾次」就很像 Poisson。
#### 3.5.1 PMF 公式
```text
P(X = k) = (e^-λ * λ^k) / k!
```
其中 `k = 0, 1, 2, ...`
#### 3.5.2 平均數與變異數 🔥🔥
```text
Mean = λ
Variance = λ
```
這是 Poisson 最經典、也最容易忘的特徵。
🗣️ 白話說明：如果題目直接說某事件「平均每小時 4 次，而且變異程度大致也落在 4 附近」，這就是在大聲提示你 Poisson。
#### 3.5.3 何時優先想到 Poisson
看到以下線索時，先想卜瓦松分佈：
- 稀有事件
- 固定單位時間、區域、長度、面積
- 問發生次數
- 給平均發生率 `λ`
例子：
- 一小時內網站當機次數
- 每公里道路坑洞數
- 一天收到的重大客訴件數
#### 3.5.4 Binomial 與 Poisson 的關聯
當：
```text
n 很大、p 很小、λ = np 固定
```
`Binomial(n,p)` 可以用 `Poisson(λ=np)` 近似。
🗣️ 白話說明：像平台一天推播給 100000 人，每人點擊某冷門按鈕的機率只有 0.0002，這時候精確用 Binomial 很重，常可近似成 Poisson。
另外，`Binomial(n,p)` 在 `np ≥ 5` 且 `n(1-p) ≥ 5` 時，也常可用常態分佈近似；這是 `Binomial → Normal` 的近似條件，與上面的 `Binomial → Poisson`（強調 `n` 大、`p` 小、`np` 固定）是不同概念，題目要分開判斷。
ASCII 圖：相同平均附近，Binomial vs Poisson 的形狀感
```text
Binomial（n固定、上限明確）      Poisson（稀有事件、右偏）
機率                                機率
 ^                                   ^
 |         /\                        |        /\
 |       /    \                      |      /   \
 |     /        \                    |    /      \
 |___/____________\___> k            |___/__________\____> k
     0   2   4   6                       0   2   4   6
直覺差異：
- Binomial 有固定總次數 n，所以右邊有天花板
- Poisson 沒有固定 n 的上限感，通常用在 rate-based 次數
```
### 3.6 均勻分佈（Uniform Distribution）🔥
本課重點是`連續型均勻分佈（Continuous Uniform Distribution）`。
記號：
```text
X ~ Uniform(a, b)
```
意思是 `X` 在區間 `[a, b]` 內機率密度均勻分佈，因此任一等長區間內的機率相同。
PDF：
```text
f(x) = 1 / (b-a),   a ≤ x ≤ b
f(x) = 0,           otherwise
```
平均數與變異數：
```text
Mean = (a+b) / 2
Variance = (b-a)^2 / 12
```
🗣️ 白話說明：像系統說「10:00 到 10:30 之間，任一等長時間區間收到驗證碼的機率都一樣」，那就很像 Uniform。它的圖形不是鐘形，而是平平的一條。
何時優先想到 Uniform：
- 連續型
- 區間已知
- 每個值等可能
例子：
- 0 到 1 之間亂數
- 某人抵達時間在 5 到 10 分鐘內完全等可能
### 3.7 中央極限定理（Central Limit Theorem, CLT）🔥🔥
`中央極限定理（Central Limit Theorem, CLT）` 的直覺版重點只有一句：
```text
不管原始母體分佈長怎樣，
只要樣本數夠大，
樣本平均數的抽樣分佈會趨近常態分佈。
```
更精確一點：
- 樣本平均數的平均約為 `μ`
- 樣本平均數的變異約為 `σ² / n`
🗣️ 白話說明：像你看不同天的 Uber Eats 外送時間，單筆資料可能右偏、不漂亮；但如果你每天都抽 50 筆、算「當天平均送達時間」，很多天的平均值排起來，就會越來越像常態。
🔥🔥 這裡最重要的是主詞：
CLT 講的是`樣本平均數（Sample Mean）`，不是單一觀測值。
考試常見問法：
- 為什麼很多平均值可以近似常態？
- 為什麼在大樣本下可以用常態近似樣本平均？
- 哪個敘述正確描述 CLT？
不要展開到證明，只要會直覺。
### 3.8 scipy.stats 程式碼模式 🔥🔥
中級題現在會出現程式片段判讀，所以你至少要能一眼看懂：
- 用的是哪個分佈
- 算的是 PMF / PDF / CDF 哪一種
- 傳入的參數到底是什麼
#### 3.8.1 常態分佈 `norm`
```python
from scipy.stats import norm
# X ~ Normal(mu=70, sigma=10)
p_density = norm.pdf(85, loc=70, scale=10)
p_cum = norm.cdf(85, loc=70, scale=10)
```
讀法：
- `norm.pdf(...)`：算 85 這個位置的密度
- `norm.cdf(...)`：算 `P(X ≤ 85)`
- `loc=70` 是 `μ`
- `scale=10` 是 `σ`，不是 `σ²`
🗣️ 白話說明：這很像公司測驗平均 70、標準差 10，題目問某分數以下累積比例是多少。只要看到 `norm.cdf`，就先翻成「小於等於」。
#### 3.8.2 二項分佈 `binom`
```python
from scipy.stats import binom
# X ~ Binomial(n=10, p=0.3)
p_exact = binom.pmf(4, n=10, p=0.3)
p_cum = binom.cdf(4, n=10, p=0.3)
```
讀法：
- `binom.pmf(4,...)`：`P(X = 4)`
- `binom.cdf(4,...)`：`P(X ≤ 4)`
- `n=10` 是試驗次數
- `p=0.3` 是每次成功機率
🗣️ 白話說明：像 10 通開發電話，每通約成案率 30%，問剛好成 4 通，直接是 `pmf`；問最多成 4 通，是 `cdf`。
#### 3.8.3 卜瓦松分佈 `poisson`
```python
from scipy.stats import poisson
# X ~ Poisson(lambda=3)
p_exact = poisson.pmf(2, mu=3)
p_cum = poisson.cdf(2, mu=3)
```
讀法：
- `poisson.pmf(2, mu=3)`：`P(X = 2)`
- `poisson.cdf(2, mu=3)`：`P(X ≤ 2)`
- SciPy 用 `mu` 這個參數名，但教材記成 `λ`
🗣️ 白話說明：像店家平均每小時 3 件客訴，問剛好 2 件的機率，就看 `pmf`；問最多 2 件，就看 `cdf`。
#### 3.8.4 均勻分佈 `uniform`
```python
from scipy.stats import uniform
# X ~ Uniform(a=2, b=6)
p_density = uniform.pdf(3, loc=2, scale=4)
p_cum = uniform.cdf(3, loc=2, scale=4)
```
讀法：
- 數學記號是 `Uniform(a,b)`
- SciPy 寫法是 `loc=a, scale=b-a`
- 這裡 `a=2, b=6`，所以 `scale=4`
🗣️ 白話說明：很多人會直覺寫成 `uniform.pdf(x, 2, 6)` 以為是 `(a,b)`，但 SciPy 第二個參數其實是寬度，不是右界，這題很容易被陰。
#### 3.8.5 一眼判讀模式表
```text
看到 `.pmf(...)`  → 離散型單點機率 P(X = x)
看到 `.pdf(...)`  → 連續型密度，不是單點機率
看到 `.cdf(...)`  → 累積機率 P(X ≤ x)
看到 `norm`       → 常態分佈
看到 `binom`      → 二項分佈
看到 `poisson`    → 卜瓦松分佈
看到 `uniform`    → 均勻分佈
```
---
## Section 4: Comparison Tables (易混淆概念)
### 4.1 PMF vs PDF vs CDF
| 項目 | 機率質量函數（PMF） | 機率密度函數（PDF） | 累積分配函數（CDF） |
|---|---|---|---|
| 全名 | Probability Mass Function | Probability Density Function | Cumulative Distribution Function |
| 適用對象 | 離散型隨機變數 | 連續型隨機變數 | 離散型與連續型都可 |
| 基本定義 | `P(X=x)` | `f(x)`，表示密度 | `P(X≤x)` |
| 機率怎麼來 | 直接看單點 | 看區間下面面積 | 累積到 x 為止 |
| `P(X=x)` 的意義 | 可大於 0 | 一定等於 0 | 不是拿來讀單點 |
| 圖形感 | 一根一根柱點 | 平滑曲線 | 階梯或平滑上升 |
| 常見函式 | `binom.pmf`、`poisson.pmf` | `norm.pdf`、`uniform.pdf` | `norm.cdf`、`binom.cdf`、`poisson.cdf` |
| 最常見陷阱 | 把離散型和連續型混掉 | 把密度當機率 | 忘記它是 `≤` 不是 `=` |
### 4.2 Normal vs Binomial vs Poisson vs Uniform
| 分佈 | 型態 | 參數 | 形狀 | 平均數 | 變異數 | 何時用 | 典型情境 |
|---|---|---|---|---|---|---|---|
| 常態分佈（Normal） | 連續型 | `μ, σ²` | 對稱鐘形 | `μ` | `σ²` | 連續、對稱、中間最多 | 考試分數、身高、量測誤差 |
| 二項分佈（Binomial） | 離散型 | `n, p` | 次數型，受 `n,p` 影響 | `np` | `np(1-p)` | 固定 `n` 次，成功/失敗 | 10 封履歷中收到幾次面試 |
| 卜瓦松分佈（Poisson） | 離散型 | `λ` | 通常右偏 | `λ` | `λ` | 固定區間內稀有事件次數 | 每小時客訴件數 |
| 均勻分佈（Uniform） | 連續型 | `a, b` | 區間內平坦 | `(a+b)/2` | `(b-a)^2/12` | 區間內等可能 | 2 到 6 分鐘間任一到達時刻 |
### 4.3 Binomial vs Poisson：何時可用 Poisson 近似
| 比較點 | 二項分佈（Binomial） | 卜瓦松近似（Poisson Approximation） |
|---|---|---|
| 核心問題 | 固定 `n` 次中成功幾次 | 以 rate-based 次數近似稀有成功數 |
| 必要條件 | 固定 `n`，每次成功率 `p` | `n` 大、`p` 小、`λ=np` 維持固定 |
| 參數 | `n, p` | `λ=np` |
| 何時切換 | 精確解可直接用 Binomial | 題目強調稀有事件、超大 n、小 p 時 |
| 直覺 | 先有試驗次數上限 | 更像固定區間內自然發生次數 |
| 考試記法 | 問「做了幾次」偏 Binomial | 問「某區間發生幾次」偏 Poisson |
---
## Section 5: 口訣 / Mnemonics
### 5.1 四大分佈口訣
`常二卜均，對次率平`
拆解：
- `常`：`常態分佈（Normal Distribution）`，對稱鐘形
- `二`：`二項分佈（Binomial Distribution）`，固定次數看成功幾次
- `卜`：`卜瓦松分佈（Poisson Distribution）`，看發生率與區間次數
- `均`：`均勻分佈（Uniform Distribution）`，區間內一樣平
再背一版：
```text
對稱鐘形想 Normal
固定次數想 Binomial
固定區間次數想 Poisson
區間等可能想 Uniform
```
### 5.2 常態分佈 68-95-99.7 口訣
`一圈六八，兩圈九五，三圈九九七`
拆解：
- 一個標準差圈住約 68%
- 兩個標準差圈住約 95%
- 三個標準差幾乎全包，約 99.7%
### 5.3 Poisson vs Binomial 口訣
`有次數上限看二項，只有發生率看卜瓦松`
補強版：
```text
固定做 n 次 → Binomial
固定時間內來幾次 → Poisson
n 大 p 小 np 固定 → Poisson 近似 Binomial
```
### 5.4 PMF vs PDF 口訣
`M 是點名，D 是密度`
拆解：
- `PMF` 的 `M` 可以記成 `Mass`，像把機率放在離散點上
- `PDF` 的 `D` 可以記成 `Density`，是濃度，不是單點機率
再背一句：
```text
離散看 PMF，連續看 PDF，累積到左邊看 CDF
```
### 5.5 CLT 口訣
`母體不一定常，平均常常會常`
意思是：
- 原始資料不一定常態
- 但樣本平均數在樣本數夠大時，會趨近常態
---
## Section 6: 考試陷阱 (Exam Traps)
❌ 陷阱：`連續型分佈也能直接算 P(X=x)`，而且不會是 0。  
✅ 正解：對`連續型隨機變數（Continuous Random Variable）`來說，`P(X=x)=0`。因為連續型機率來自區間面積，不是單一點。很多人會錯，是因為把 `PDF` 的函數值誤當成該點機率。
❌ 陷阱：`中央極限定理（Central Limit Theorem, CLT）`說的是資料本身最後都會變常態。  
✅ 正解：CLT 講的是`樣本平均數（Sample Mean）`的抽樣分佈會趨近常態，不是每筆原始資料自動變常態。會混淆，是因為很多教材把「樣本平均近似常態」簡化成「大樣本就常態」。
❌ 陷阱：`卜瓦松分佈（Poisson Distribution）`只要記得有個 `λ` 就好，不用記平均與變異數。  
✅ 正解：Poisson 最重要特徵之一就是`平均數 = 變異數 = λ`。這常被拿來和 Binomial 比，也常單獨出判斷題。學生會忘，是因為只背 PMF 公式，沒連結參數意義。
❌ 陷阱：`二項分佈（Binomial Distribution）`只要寫 `p^k(1-p)^(n-k)` 就行。  
✅ 正解：完整 PMF 一定要有`組合數（Combination）` `C(n,k)`。因為「哪幾次成功」有很多排列組合，不能漏。常錯是因為把「一種固定順序的成功失敗路徑」誤認成「所有方式」。
❌ 陷阱：`scipy.stats.norm` 的 `scale` 要傳 `σ²`。  
✅ 正解：`norm.pdf(x, loc=μ, scale=σ)` 裡的 `scale` 是`標準差（Standard Deviation, SD）` `σ`，不是`變異數（Variance）` `σ²`。會錯是因為數學記號寫 `Normal(μ,σ²)`，但 SciPy API 使用的是標準差。
❌ 陷阱：`PDF` 不可能大於 1，因為機率最大就是 1。  
✅ 正解：`PDF` 是密度，不是機率，所以函數值可以大於 1；只要整體面積等於 1 就合法。這在分佈很窄、`σ` 很小時尤其常見。會錯是因為把 y 軸數值直接當成機率。
---
## Section 7: 情境題快速判斷 (Scenario Quick-Judge)
🔑 看到關鍵字 → 選這個答案
- 固定 `n` 次試驗、每次成功/失敗 → `二項分佈（Binomial Distribution）`
- 問成功次數、每次成功機率固定 `p` → `二項分佈（Binomial Distribution）`
- 稀有事件、單位時間/面積/長度的發生次數 → `卜瓦松分佈（Poisson Distribution）`
- 題目給平均發生率 `λ`，又問某區間內事件數 → `卜瓦松分佈（Poisson Distribution）`
- 連續型、完全對稱、中間最高、兩端較少 → `常態分佈（Normal Distribution）`
- 題目提 `μ`、`σ²`、`z-score`、68-95-99.7 → `常態分佈（Normal Distribution）`
- 每個值等可能發生、而且是連續區間 → `均勻分佈（Uniform Distribution）`
- 問 `P(X ≤ x)` → 使用`累積分配函數（Cumulative Distribution Function, CDF）`
- 問 `P(X = x)`、且 X 為離散型 → 使用`機率質量函數（Probability Mass Function, PMF）`
- 問 `P(X = x)`、且 X 為連續型 → 答案是 `0`，改想區間機率
- 問 `P(a ≤ X ≤ b)`、X 為連續型 → 用`機率密度函數（Probability Density Function, PDF）`面積或 `CDF` 相減
- 題目出現 `binom.pmf(k, n, p)` → 讀成「剛好 k 次」
- 題目出現 `poisson.cdf(k, mu=λ)` → 讀成「最多 k 次」
- 題目出現 `norm.cdf(x, loc=μ, scale=σ)` → 讀成 `P(X ≤ x)`
- `n` 很大、`p` 很小、`np` 固定 → 用 `Poisson` 近似 `Binomial`
- 問很多樣本平均數的分佈 → 想`中央極限定理（Central Limit Theorem, CLT）`
快速二分法：
| 題目線索 | 第一反應 |
|---|---|
| 問「做了幾次裡成功幾次」 | Binomial |
| 問「某段時間內發生幾次」 | Poisson |
| 問「某個連續值以下累積多少」 | CDF |
| 問「某點剛好等於多少」且連續型 | 0 |
| 問「對稱鐘形」 | Normal |
| 問「區間等可能」 | Uniform |
---
## 📊 概念圖與視覺輔助

> 📖 分佈選擇決策樹 — 看到什麼資料特性 → 選哪種分佈 → 詳見 [diagrams/distribution-selector.mmd](diagrams/distribution-selector.mmd)

> 📖 常態分佈 68-95-99.7 規則圖解 → 詳見 [diagrams/normal-68-95-997.md](diagrams/normal-68-95-997.md)

> 📖 PMF vs PDF vs CDF 視覺比較 → 詳見 [diagrams/pmf-vs-pdf-vs-cdf.md](diagrams/pmf-vs-pdf-vs-cdf.md)

> 📖 中央極限定理圖解 → 詳見 [diagrams/clt-illustration.md](diagrams/clt-illustration.md)

> 📖 四大分佈比較表 → 詳見 [diagrams/four-distributions-comparison.md](diagrams/four-distributions-comparison.md)

---
## Section 8: 結尾：快速自我檢查 ✅
- [ ] 我可以在 30 秒內分出`離散型隨機變數（Discrete Random Variable）`和`連續型隨機變數（Continuous Random Variable）`
- [ ] 我可以在 30 秒內判斷題目該用`PMF`、`PDF`還是`CDF`
- [ ] 我可以在 30 秒內說出 `CDF = P(X ≤ x)`，並用 CDF 相減算區間機率
- [ ] 我可以在 30 秒內說出`常態分佈（Normal Distribution）`的參數 `μ, σ²` 與 68-95-99.7 rule
- [ ] 我可以在 30 秒內說出`二項分佈（Binomial Distribution）`的使用條件：固定 `n` 次、成功/失敗、`p` 固定、互相獨立
- [ ] 我可以在 30 秒內寫出`卜瓦松分佈（Poisson Distribution）`的關鍵特徵：`mean = variance = λ`
- [ ] 我可以在 30 秒內說出`均勻分佈（Uniform Distribution）`的 PDF 與平均數公式
- [ ] 我可以在 30 秒內說出`中央極限定理（Central Limit Theorem, CLT）`是在講樣本平均數，不是單筆資料
- [ ] 我可以在 30 秒內看懂 `norm.pdf`、`binom.pmf`、`poisson.cdf`、`uniform.pdf` 分別在算什麼
- [ ] 我可以在 30 秒內指出 `scipy.stats.norm(..., scale=σ)` 傳的是標準差，不是變異數
📌 超出本課範圍：
- 特定機器學習演算法的分佈假設，例如`朴素貝氏（Naive Bayes）`、`高斯混合模型（Gaussian Mixture Model, GMM）`
- `中央極限定理（Central Limit Theorem, CLT）`的數學證明
- 最大概似估計、參數估計推導
- 假設檢定、`p-value`、信賴區間
- 連續訊號、傅立葉轉換等進階數學主題
考前最後一句：
```text
先分離散/連續，
再分單點/累積/區間，
最後看情境是固定次數、固定發生率、對稱鐘形還是區間等可能。
```
