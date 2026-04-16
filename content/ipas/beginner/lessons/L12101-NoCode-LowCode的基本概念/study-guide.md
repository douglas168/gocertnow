# L12101 No Code / Low Code的基本概念 — 讀書指南

---

## 1. 考試對應範圍

> 對應評鑑範圍：**L121 No Code / Low Code** ＋ **L12101 No Code / Low Code的基本概念**
>
> 所屬主題：L121 No Code / Low Code → L12101 基本概念
>
> 關鍵字：No Code工具（No-Code Tools）、Low Code工具（Low-Code Tools）、基本認知與基礎概念（Fundamental Concepts & Awareness）
>
> 高頻出題方向：No Code vs Low Code 定義區分；辨認代表性平台屬於哪一類；公民開發者的定義與角色；情境題判斷「該選 No Code 還是 Low Code」

這一課是整個 L121 單元的起點，先搞清楚「是什麼」，下一課 L12102 再聊「好不好」。考試約出 5 題（含情境題），佔第二科約 10%。題目從早期的純定義題逐漸轉向情境題，光背定義不夠，要能「看場景選工具」。

---

## 2. 知識樹（Knowledge Tree）

```
🔧 L12101 No Code / Low Code的基本概念
│
├── 📖 核心定義
│   ├── No Code（無程式碼）
│   │   ├── 零程式碼，拖放操作
│   │   ├── 目標：非技術業務人員
│   │   └── 代表平台：Bubble, Airtable, Zapier, AppSheet
│   ├── Low Code（低程式碼）
│   │   ├── 視覺化為主 + 少量手寫程式碼
│   │   ├── 目標：開發者 / 公民開發者
│   │   └── 代表平台：Power Apps, OutSystems, Mendix
│   └── 陷阱：AutoML ≠ No Code/Low Code！
│
├── 👤 公民開發者（Citizen Developer）
│   ├── Gartner 定義：IT 部門外、使用核可工具建構應用
│   ├── 數據：公民開發者 = 專業工程師的 4 倍 🔥
│   └── 陷阱：公民開發者 ≠ 完全不受管理
│
├── 🖥️ 視覺化開發（Visual Development）
│   ├── 拖放元件、流程圖、表單設計器
│   ├── 背後仍有隱藏程式碼自動產生
│   └── 陷阱：No Code「無程式碼」≠ 背後沒程式碼
│
├── 📊 市場趨勢（考試愛考數據）
│   ├── Gartner：2026 年 75% 新應用使用低程式碼（Low Code） 🔥🔥
│   ├── Gartner：2026年市場規模 $44.5B USD
│   ├── 效率：開發時間可縮短 90%
│   └── 人才缺口：NC/LC 是解方之一
│
└── 🔧 代表平台速查（辨認題必背）
    ├── No Code：Bubble, Airtable, Zapier, AppSheet
    ├── Low Code：Power Apps, OutSystems, Mendix
    └── 陷阱：AutoML 工具（如 Google AutoML）不屬於此分類
```

---

## 3. 核心概念

### 3.1 No Code（無程式碼）的定義 🔥🔥

No Code（無程式碼，No-Code）是一種**完全不需要撰寫程式碼**的軟體開發方式。使用者透過拖放（Drag-and-Drop）介面與視覺化配置（Visual Configuration），就能建構出可運作的應用程式。

No Code 的核心價值在於**降低技術門檻**——讓沒有程式設計背景的業務人員也能自己動手做工具。適合的場景是相對簡單的戰術型應用，例如表單系統、報表、日曆、流程自動化。

🗣️ 白話說明：想像你在 LINE 群組裡用投票功能——你不用寫任何程式，只要點點按鈕就能建立一個投票。No Code 就是這個概念的放大版：不用寫 code，點一點拖一拖就能做出一個 App 或自動化流程。

```
No Code 開發流程（概念圖）

  業務人員                 No Code 平台                  成品
  ┌──────┐    拖放元件     ┌──────────┐   自動產生程式碼   ┌──────┐
  │ 想法  │ ──────────→  │ 視覺化編輯 │ ──────────────→ │ App  │
  └──────┘    零程式碼     └──────────┘    (使用者看不到)  └──────┘
```

**代表平台：**
- **Bubble**：全功能 Web App 開發（做 MVP、SaaS）
- **Airtable**：試算表式關聯資料庫（Relational Database）+ 內部工具
- **Zapier**：跨應用流程自動化（Workflow Automation）——串接不同服務
- **Make**（前身為 Integromat）：同為 No Code 流程自動化平台，支援更複雜的多步驟流程設計
- **AppSheet（Google）**：從試算表直接轉換為行動/網頁 App

---

### 3.2 Low Code（低程式碼）的定義 🔥🔥

Low Code（低程式碼，Low-Code）同樣以視覺化開發（Visual Development）為主，但允許開發者在需要時**加入少量手寫程式碼**來處理複雜邏輯、客製化功能或系統整合。

Low Code 的目標用戶不只是純業務人員，更包含具備一定技術知識的**開發者或公民開發者（Citizen Developer）**。適合的場景是企業級應用（Enterprise Applications）和需要複雜整合的需求。

🗣️ 白話說明：如果 No Code 像是用 Canva 套模板做海報（完全不用會設計），Low Code 就像用 WordPress 架部落格——大部分靠拖拉外掛搞定，但遇到特殊需求你也可以自己改 CSS 或寫一點 PHP。多了一點技術操作，但換來更大的彈性。

**代表平台：**
- **Power Apps（Microsoft）**：企業應用開發，深度整合 Microsoft 365 / Azure / Dynamics
- **OutSystems**：企業級應用，強調安全性（Security）、擴展性（Scalability）、治理（Governance）
- **Mendix（Siemens）**：企業級應用開發與部署

> 💡 提醒：OutSystems、Mendix 的企業級架構與部署策略屬於更深入的內容，初級只需知道「它是 Low Code 平台、面向企業級應用」即可。（此為中級內容，初級只需了解概念）

---

### 3.3 No Code vs Low Code 的關鍵差異 🔥🔥

這是整課最常考的重點。考題經常要你從描述中判斷該分類為 No Code 還是 Low Code。

```
        No Code                        Low Code
  ┌──────────────────┐          ┌──────────────────┐
  │                  │          │                  │
  │   100% 視覺化     │          │  視覺化 + 少量程式  │
  │   零程式碼        │          │  可選寫 code      │
  │                  │          │                  │
  │  👤 業務人員      │          │  👤 開發者/公民開發者│
  │  📱 簡單應用      │          │  🏢 企業級應用     │
  │  🔒 客製化低      │          │  🔓 客製化高      │
  │                  │          │                  │
  └──────────────────┘          └──────────────────┘
         Bubble                      Power Apps
         Airtable                    OutSystems
         Zapier                      Mendix
         AppSheet
```

記住核心差異的口訣：**No Code 零碼大眾用，Low Code 少碼進階用**。

> 📊 **圖表：** No Code vs Low Code 關鍵差異對照圖
> → 詳見 [diagrams/nc-vs-lc-comparison.mmd](diagrams/nc-vs-lc-comparison.mmd)

---

### 3.4 視覺化開發（Visual Development）

視覺化開發（Visual Development）是 No Code 和 Low Code 共同的核心範式（Paradigm）。它以圖形介面（Graphical User Interface, GUI）取代傳統的文字程式碼撰寫，包含拖放元件（Drag-and-Drop Components）、流程圖設計器（Flow Designer）、表單建構器（Form Builder）等。

關鍵認知：**即使是 No Code 平台，背後仍有隱藏的程式碼在運行**。使用者看不到程式碼，不代表程式碼不存在——平台自動產生了底層程式碼。

🗣️ 白話說明：就像你用 Canva 做海報——你不用學 Photoshop 的圖層和遮罩，只要拖拖拉拉就能出一張好看的圖。但 Canva 背後其實跑了大量的程式碼幫你渲染。No Code/Low Code 的「視覺化開發」就是同一個道理。

---

### 3.5 公民開發者（Citizen Developer）🔥

公民開發者（Citizen Developer）是 Gartner 提出的概念：**在正式 IT 部門以外，使用組織核可的 No Code/Low Code 工具來建構應用程式的非專業開發人員**。

這個概念很重要，因為它解釋了 NC/LC 工具的市場趨勢——不再只有工程師能寫程式了。

幾個常考數據 🔥：
- Gartner 預測：公民開發者的數量將是專業軟體工程師的 **4 倍**
- 2026 年預測：**80%** 的低程式碼工具用戶來自正式 IT 部門以外
- 全球軟體開發者缺口持續擴大（據業界統計，美國缺少約 140 萬名），NC/LC 是解方之一

🗣️ 白話說明：你大學做社團活動，社團裡的行銷組長用 AppSheet 做了一個報名系統、用 Zapier 串了一個自動寄信流程——他不是資工系的，但他就是一個「公民開發者」。公司裡也一樣，業務部的同事不靠 IT 部門，自己用核可的工具做了一個客戶追蹤 App。

---

### 3.6 市場趨勢與數據（常考考點）🔥

考試喜歡在選擇題中放入市場數據來考你的判斷力。以下是最可能出現的數據：

| 來源 | 數據 | 考試怎麼考 |
|------|------|-----------|
| Gartner | 2026 年 **75%** 新應用開發將使用低程式碼 🔥🔥 | 「以下何者最接近分析機構的預測？」 |
| Gartner | 2026 年低程式碼市場規模預計達 **$44.5B** USD | 市場規模量級判斷 |
| Gartner | 年複合成長率 **19%** CAGR | 成長速度比較題 |
| 業界統計 | 開發時間可縮短至傳統方式的 **10%**（縮短90%） | 效率提升數據 |
| Forrester | **87%** 企業開發者已在部分工作中使用低程式碼 | 採用率判斷 |

---

### 3.7 代表平台辨認（必背）🔥🔥

考題會出現「以下哪個**不是** No Code/Low Code 平台？」或「以下哪個屬於 Low Code？」這類辨認題。

| 平台 | 類型 | 核心用途 | 記憶關鍵字 |
|------|------|---------|-----------|
| **Bubble** | No Code | 全功能 Web App 開發 | 「泡泡做App」 |
| **Airtable** | No Code | 試算表式關聯資料庫 | 「空氣桌＝進階 Excel」 |
| **Zapier** | No Code | 跨應用流程自動化 | 「Zap＝串接」 |
| **AppSheet** | No Code | 試算表→App | 「Google 家的」 |
| **Make** | No Code | 多步驟流程自動化 | 「前身 Integromat」 |
| **Power Apps** | Low Code | 企業應用（M365整合） | 「微軟 Power」 |
| **OutSystems** | Low Code | 企業級安全應用 | 「外系統＝企業」 |
| **Mendix** | Low Code | 企業級開發部署 | 「西門子 Mendix」 |

**高頻陷阱 — AutoML（自動化機器學習）：**

> AutoML（如 Google AutoML、H2O.ai）是機器學習管線（ML Pipeline）的自動化工具，**不屬於** No Code/Low Code 的範疇。考試常把 AutoML 混入選項來混淆考生。
>
> 區分方法：AutoML 的目標是「自動化建構 ML 模型」，而 NC/LC 的目標是「自動化建構應用程式」。目標物不同！

> 📊 **圖表：** NC/LC 平台生態系分類圖（含 AutoML 陷阱區）
> → 詳見 [diagrams/platform-landscape.mmd](diagrams/platform-landscape.mmd)

---

## 4. 比較表（易混淆概念）

### 4.1 No Code vs Low Code（核心對比）🔥🔥

| 面向 | No Code（無程式碼） | Low Code（低程式碼） |
|------|---------------------|---------------------|
| **編碼需求** | 零——完全不需要寫程式 | 少量——視覺化為主，可選加程式碼 |
| **目標用戶** | 非技術背景的業務人員 | 開發者 / 公民開發者（有一定技術基礎） |
| **應用複雜度** | 簡單（表單、報表、自動化流程） | 中～高（企業級應用、複雜整合） |
| **客製化程度** | 低（受限於平台提供的模板與元件） | 高（可寫程式碼擴展功能） |
| **代表平台** | Bubble, Airtable, Zapier, AppSheet | Power Apps, OutSystems, Mendix |
| **治理風險** | 較高（影子 IT 風險） | 較低（通常在 IT 監督下使用） |

### 4.2 No Code/Low Code vs AutoML（高頻陷阱）🔥

| 面向 | No Code / Low Code | AutoML（自動化機器學習） |
|------|-------------------|------------------------|
| **定義** | 視覺化開發應用程式 | 自動化 ML 模型的建構與調參 |
| **目標產物** | 應用程式（App） | 機器學習模型（Model） |
| **目標用戶** | 業務人員 / 公民開發者 | 資料科學家 / ML 工程師 |
| **適用場景** | 建構表單、流程、企業系統 | 影像辨識、預測分析等 ML 任務 |
| **是否屬於 NC/LC** | 是 | **否** ❌ |

### 4.3 No Code/Low Code vs 傳統開發

| 面向 | No Code / Low Code | 傳統開發（Traditional Development） |
|------|-------------------|-------------------------------------|
| **開發速度** | 快（縮短 90% 開發時間） | 慢（需完整開發週期） |
| **技術門檻** | 低～中 | 高（需專業程式設計能力） |
| **彈性** | 受限於平台功能 | 完全自由 |
| **維護成本** | 低（平台負責底層） | 高（團隊需自行維護） |
| **適合場景** | MVP、內部工具、流程自動化 | 高度客製化產品、核心系統 |

---

## 5. 口訣 / Mnemonics

### 口訣一：No Code vs Low Code 分辨法

> **「零碼大眾簡，少碼進階全」**
>
> - 零碼 → No Code → 零程式碼
> - 大眾 → 目標用戶包含一般業務人員
> - 簡 → 簡單應用
> - 少碼 → Low Code → 少量程式碼
> - 進階 → 目標用戶需要一定技術基礎（含公民開發者）
> - 全 → 全功能企業級應用

### 口訣二：No Code 四大平台（B-A-Z-A）

> **「BAZA（爸爸）不寫 Code」**
>
> - **B**ubble
> - **A**irtable
> - **Z**apier
> - **A**ppSheet
>
> → 全部都是 No Code！

### 口訣三：Low Code 三大平台（P-O-M）

> **「POM（龐）大企業用 Low Code」**
>
> - **P**ower Apps
> - **O**utSystems
> - **M**endix
>
> → 全部都是 Low Code，面向企業！

### 口訣四：公民開發者記憶

> **「4 倍公民、8 成門外」**
>
> - 公民開發者數量 = 專業工程師的 **4** 倍
> - **80%** 低代碼用戶來自 IT 部門以**外**

---

## 6. 考試陷阱

### 陷阱一：AutoML 混入 NC/LC 選項 🔥🔥

❌ 陷阱：看到「自動化」就選 No Code/Low Code——以為 Google AutoML 也是 No Code 工具

✅ 正解：AutoML 是**機器學習管線（ML Pipeline）的自動化**，目標產物是 ML 模型，不是應用程式。AutoML 不屬於 No Code/Low Code。記住：NC/LC 做的是 App，AutoML 做的是 Model。

---

### 陷阱二：No Code = 背後沒有程式碼

❌ 陷阱：以為「No Code」代表這個平台完全沒有程式碼在運作

✅ 正解：「No Code」指的是**使用者不需要寫程式碼**，但平台背後仍然自動產生並執行大量程式碼。就像你用 Instagram 發限動不用寫 code，但 IG 背後有數百萬行程式碼在跑。

---

### 陷阱三：Low Code = 比 No Code 差

❌ 陷阱：以為 Low Code「還是要寫一點 code」所以不如 No Code 方便

✅ 正解：Low Code 的「可寫程式碼」是**優勢不是劣勢**——它提供更高的客製化能力（Customizability）和更複雜的應用場景支援。No Code 和 Low Code 沒有誰好誰壞，是**目標用戶和應用複雜度不同**。

---

### 陷阱四：公民開發者 = 不受管理的亂搞

❌ 陷阱：以為公民開發者就是員工自己亂裝軟體、不受管控

✅ 正解：Gartner 定義中明確包含「使用**組織核可**（sanctioned）的工具」。公民開發者是在組織的規範內使用核可的 NC/LC 平台來建構應用，不是影子 IT（Shadow IT）。但 No Code 的確存在影子 IT 風險——這是 L12102 的重點。

---

### 陷阱五：所有視覺化工具都是 NC/LC

❌ 陷阱：看到「拖放介面」「視覺化操作」就判定為 No Code/Low Code

✅ 正解：Excel 有拖放功能、Photoshop 有視覺化操作，但它們不是 NC/LC 開發平台。NC/LC 的定義是「用視覺化方式**開發應用程式或自動化流程**」，而不是單純的視覺化操作工具。

---

## 7. 情境題快速判斷

### 🔑 看到關鍵字 → 選這個答案

**場景判斷類：**
- 「非技術人員」「業務人員」「不會寫程式」 → **No Code**
- 「開發者」「公民開發者」「企業級」「複雜整合」 → **Low Code**
- 「拖放」「零程式碼」「完全不需要寫 code」 → **No Code**
- 「視覺化 + 可加入程式碼」「少量程式碼」 → **Low Code**
- 「自動化建構 ML 模型」「模型調參」 → **AutoML**（不是 NC/LC！）

**平台辨認類：**
- Bubble / Airtable / Zapier / AppSheet → **No Code**
- Power Apps / OutSystems / Mendix → **Low Code**
- Google AutoML / H2O.ai → **AutoML**（❌ 不是 NC/LC）

**數據判斷類：**
- 「75% 新應用」 → Gartner 低程式碼預測
- 「公民開發者 4 倍」 → Gartner 公民開發者趨勢
- 「縮短 90%」 → NC/LC 的開發效率提升
- 「$44.5B 市場」 → Gartner 低程式碼市場規模

**概念判斷類：**
- 「IT 部門以外、用組織核可工具開發」 → **公民開發者（Citizen Developer）**
- 「圖形介面取代程式碼撰寫」 → **視覺化開發（Visual Development）**
- 「背後自動產生程式碼」 → **No Code 的運作原理**（不是「沒有程式碼」）
- 「員工自建未經核可的應用」 → **影子 IT（Shadow IT）**——是風險，不是公民開發者

### 🔑 三步驟判斷法

> 📊 **圖表：** NC/LC 選擇決策樹（三步驟判斷法）
> → 詳見 [diagrams/decision-tree.mmd](diagrams/decision-tree.mmd)

1. **看人**：使用者有沒有技術背景？
   - 完全沒有 → 偏 No Code
   - 有一些或是公民開發者 → 偏 Low Code
2. **看需求**：應用複雜度？
   - 簡單（表單、自動化、報表） → No Code
   - 複雜（企業整合、客製邏輯） → Low Code
3. **看整合**：需不需要串接其他系統的 API？
   - 不需要 → No Code
   - 需要 → Low Code

### 🔑 情境題速查表

| 情境描述 | 正確答案 | 為什麼 |
|---------|---------|--------|
| 補習班老師想做一個學生報名表單 | No Code | 非技術人員 + 簡單應用 |
| 企業要整合 ERP 與 CRM 的客製化系統 | Low Code | 企業級 + 複雜整合 |
| 行銷部門要串接 LINE 與 Google Sheets 自動化 | No Code（Zapier 或 Make） | 非技術 + 流程自動化；LINE Bot 串接是台灣常見的 No Code 應用場景 |
| 資料科學團隊要自動化模型訓練流程 | AutoML | ML Pipeline，不是 NC/LC |
| 大學社團要用試算表做一個活動報名 App | No Code（AppSheet） | 非技術 + 試算表轉 App |
| 軟體公司要快速開發企業客戶管理系統 | Low Code（Power Apps） | 開發者 + 企業應用 |

---

> ✅ 本課重點回顧：No Code = 零碼給大眾做簡單 App；Low Code = 少碼給進階用戶做企業系統；背 BAZA（No Code）和 POM（Low Code）七個平台；AutoML 不是 NC/LC；公民開發者 = IT 外 + 組織核可。搞定這些，L12101 的分數就穩了。
