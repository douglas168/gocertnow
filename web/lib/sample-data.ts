// ── Type Definitions ──

export interface Lesson {
  slug: string;
  title: string;
  sectionIndex: number;
}

export interface Section {
  title: string;
  lessons: Lesson[];
  hasQuiz: boolean;
}

export interface Course {
  slug: string;
  title: string;
  certName: string;
  level: "beginner" | "intermediate";
  description: string;
  price: number;
  sections: Section[];
  totalLessons: number;
  estimatedHours: number;
}

export interface LessonContent {
  slug: string;
  title: string;
  sectionTitle: string;
  body: string[];
  callouts: { type: "info" | "warning" | "tip"; text: string }[];
}

export interface QuizQuestion {
  question: string;
  options: [string, string, string, string];
  correctIndex: number;
  explanation: string;
  category?: string;
}

export interface ExamData {
  questions: QuizQuestion[];
  timeLimit: number;
  passingScore: number;
}

export interface RadarScore {
  category: string;
  score: number;
}

export interface BadgeData {
  id: string;
  name: string;
  icon: "award" | "shield" | "trophy";
  unlocked: boolean;
}

export interface DashboardData {
  xp: number;
  streak: number;
  streakCalendar: boolean[];
  radarScores: RadarScore[];
  badges: BadgeData[];
}

export interface Testimonial {
  name: string;
  role: string;
  cert: string;
  quote: string;
  avatar: string;
}

// ── Sample Courses ──

export const sampleCourses: Course[] = [
  {
    slug: "ipas-ai-beginner",
    title: "IPAS AI 應用規劃師 — 初級",
    certName: "IPAS AI 應用規劃師",
    level: "beginner",
    description:
      "從零開始學習 AI 應用規劃的核心知識，涵蓋機器學習基礎、資料處理、AI 倫理與應用場景分析。透過結構化的微課程與模擬考試，幫助你一次通過 IPAS 初級認證。",
    price: 1990,
    sections: [
      {
        title: "第一章：AI 基礎概論",
        lessons: [
          { slug: "1-1-intro", title: "什麼是人工智慧？", sectionIndex: 0 },
          { slug: "1-2-history", title: "AI 發展歷史與里程碑", sectionIndex: 0 },
          { slug: "1-3-types", title: "AI 的分類與應用領域", sectionIndex: 0 },
        ],
        hasQuiz: true,
      },
      {
        title: "第二章：機器學習入門",
        lessons: [
          { slug: "2-1-ml-basics", title: "機器學習的基本概念", sectionIndex: 1 },
          { slug: "2-2-supervised", title: "監督式學習與非監督式學習", sectionIndex: 1 },
          { slug: "2-3-evaluation", title: "模型評估與選擇", sectionIndex: 1 },
        ],
        hasQuiz: true,
      },
      {
        title: "第三章：資料處理與分析",
        lessons: [
          { slug: "3-1-data-types", title: "資料類型與資料集", sectionIndex: 2 },
          { slug: "3-2-preprocessing", title: "資料前處理技術", sectionIndex: 2 },
          { slug: "3-3-visualization", title: "資料視覺化基礎", sectionIndex: 2 },
        ],
        hasQuiz: true,
      },
      {
        title: "第四章：AI 倫理與法規",
        lessons: [
          { slug: "4-1-ethics", title: "AI 倫理原則", sectionIndex: 3 },
          { slug: "4-2-bias", title: "演算法偏差與公平性", sectionIndex: 3 },
          { slug: "4-3-regulations", title: "台灣 AI 相關法規", sectionIndex: 3 },
        ],
        hasQuiz: true,
      },
    ],
    totalLessons: 12,
    estimatedHours: 8,
  },
  {
    slug: "ipas-ai-intermediate",
    title: "IPAS AI 應用規劃師 — 中級",
    certName: "IPAS AI 應用規劃師",
    level: "intermediate",
    description:
      "深入學習 AI 應用規劃的進階知識，包含深度學習架構、自然語言處理、電腦視覺、以及 AI 專案管理。為通過 IPAS 中級認證做好全面準備。",
    price: 2990,
    sections: [
      {
        title: "第一章：深度學習架構",
        lessons: [
          { slug: "1-1-neural-networks", title: "神經網路基礎架構", sectionIndex: 0 },
          { slug: "1-2-cnn", title: "卷積神經網路 (CNN)", sectionIndex: 0 },
          { slug: "1-3-rnn", title: "遞迴神經網路 (RNN)", sectionIndex: 0 },
          { slug: "1-4-transformers", title: "Transformer 架構與注意力機制", sectionIndex: 0 },
        ],
        hasQuiz: true,
      },
      {
        title: "第二章：自然語言處理",
        lessons: [
          { slug: "2-1-nlp-basics", title: "NLP 基礎概念", sectionIndex: 1 },
          { slug: "2-2-text-processing", title: "文本處理與特徵擷取", sectionIndex: 1 },
          { slug: "2-3-llm", title: "大型語言模型應用", sectionIndex: 1 },
        ],
        hasQuiz: true,
      },
      {
        title: "第三章：電腦視覺",
        lessons: [
          { slug: "3-1-cv-basics", title: "電腦視覺基礎", sectionIndex: 2 },
          { slug: "3-2-image-recognition", title: "影像辨識技術", sectionIndex: 2 },
          { slug: "3-3-object-detection", title: "物件偵測與語意分割", sectionIndex: 2 },
        ],
        hasQuiz: true,
      },
      {
        title: "第四章：AI 專案管理",
        lessons: [
          { slug: "4-1-project-lifecycle", title: "AI 專案生命週期", sectionIndex: 3 },
          { slug: "4-2-mlops", title: "MLOps 與模型部署", sectionIndex: 3 },
          { slug: "4-3-roi", title: "AI 投資報酬率評估", sectionIndex: 3 },
        ],
        hasQuiz: true,
      },
    ],
    totalLessons: 13,
    estimatedHours: 12,
  },
];

// ── Sample Lessons ──

export const sampleLessons: LessonContent[] = [
  {
    slug: "1-1-intro",
    title: "什麼是人工智慧？",
    sectionTitle: "第一章：AI 基礎概論",
    body: [
      "人工智慧（Artificial Intelligence, AI）是電腦科學的一個分支，旨在建立能夠執行通常需要人類智慧才能完成的任務的系統。這些任務包括學習、推理、問題解決、語言理解和視覺感知。",
      "AI 的核心目標是讓機器能夠模擬人類的認知功能。現代 AI 系統通常透過分析大量資料來學習模式，並利用這些模式做出決策或預測。這與傳統的程式設計方法不同——傳統方法需要明確地編寫每一條規則。",
      "在 IPAS 認證考試中，你需要了解 AI 的基本定義、主要分類、以及其在不同產業中的應用場景。本課程將幫助你建立堅實的基礎知識，為後續更深入的學習做好準備。",
      "隨著 AI 技術的快速發展，了解這些基礎概念對於任何希望在科技產業中發展的專業人士來說都是必不可少的。無論你是工程師、產品經理、還是業務分析師，AI 素養都將成為你的核心競爭力。",
    ],
    callouts: [
      {
        type: "info",
        text: "IPAS 考試重點：AI 的定義通常以「讓機器展現類似人類智慧行為」為核心概念出題，務必記住 Alan Turing 和 John McCarthy 的貢獻。",
      },
      {
        type: "tip",
        text: "學習建議：嘗試用自己的話解釋 AI 是什麼。如果能向非技術背景的朋友清楚說明，表示你已經掌握了核心概念。",
      },
    ],
  },
  {
    slug: "1-2-history",
    title: "AI 發展歷史與里程碑",
    sectionTitle: "第一章：AI 基礎概論",
    body: [
      "人工智慧的歷史可以追溯到 1950 年代。1956 年，在達特茅斯會議上，「人工智慧」一詞首次被正式提出。這場會議被視為 AI 研究的誕生地，由 John McCarthy、Marvin Minsky 等學者發起。",
      "AI 的發展並非一帆風順，經歷了多次「AI 寒冬」——即研究資金和熱情大幅下降的時期。第一次 AI 寒冬發生在 1970 年代，當時人們發現早期的樂觀預期過於天真。",
      "2012 年是現代 AI 的轉折點。AlexNet 在 ImageNet 圖像辨識競賽中取得突破性表現，深度學習開始受到廣泛關注。此後，GPU 計算能力的提升和大量資料的可用性，推動了 AI 技術的快速發展。",
    ],
    callouts: [
      {
        type: "info",
        text: "考試提示：常見考題會詢問 AI 發展的關鍵里程碑，特別是 1956 年達特茅斯會議、1997 年深藍擊敗西洋棋世界冠軍、以及 2016 年 AlphaGo 擊敗圍棋冠軍。",
      },
      {
        type: "warning",
        text: "注意：不要混淆「強 AI」（通用人工智慧）和「弱 AI」（專用人工智慧）的概念。目前所有商業應用都屬於弱 AI。",
      },
    ],
  },
  {
    slug: "1-3-types",
    title: "AI 的分類與應用領域",
    sectionTitle: "第一章：AI 基礎概論",
    body: [
      "人工智慧可以從多個維度進行分類。按能力範圍，AI 分為窄域 AI（Narrow AI）和通用 AI（General AI）。窄域 AI 專注於特定任務，如語音辨識或圖像分類；通用 AI 則具有類似人類的全方位智慧能力，目前仍處於理論階段。",
      "按技術方法分類，AI 主要包括：機器學習（ML）、深度學習（DL）、自然語言處理（NLP）、電腦視覺（CV）、以及專家系統。這些技術方法各有特色，適用於不同的應用場景。",
      "AI 在各行各業的應用日益廣泛：醫療健康領域的疾病診斷與藥物研發、金融領域的風險評估與詐騙偵測、製造業的品質檢測與預測性維護、零售業的個性化推薦與需求預測，以及教育領域的適性化學習。",
    ],
    callouts: [
      {
        type: "tip",
        text: "記憶技巧：可以用「看聽說想」來記住 AI 四大應用方向——電腦視覺（看）、語音辨識（聽）、自然語言處理（說）、決策系統（想）。",
      },
    ],
  },
  {
    slug: "2-1-ml-basics",
    title: "機器學習的基本概念",
    sectionTitle: "第二章：機器學習入門",
    body: [
      "機器學習是人工智慧的一個子領域，它讓電腦系統能夠從資料中學習並改善其表現，而無需被明確地程式化。簡單來說，機器學習是讓機器透過經驗來自動優化的科學。",
      "機器學習的核心概念包括：訓練資料（Training Data）、特徵（Features）、標籤（Labels）、模型（Model）、以及損失函數（Loss Function）。理解這些概念是學習機器學習的第一步。",
      "機器學習的工作流程通常包括：資料蒐集、資料前處理、特徵工程、模型選擇、模型訓練、模型評估、以及模型部署。每個步驟都至關重要，任何環節的失誤都可能導致模型表現不佳。",
    ],
    callouts: [
      {
        type: "info",
        text: "IPAS 考試重點：機器學習的三大類型（監督式、非監督式、強化學習）是必考題目。確保你能清楚區分它們的定義和適用場景。",
      },
      {
        type: "warning",
        text: "常見錯誤：很多考生會混淆「特徵」和「標籤」。特徵是模型的輸入變數，標籤是模型要預測的目標值。",
      },
      {
        type: "tip",
        text: "實務理解：想像你在教一個小孩認識水果。你給他看很多照片（訓練資料），告訴他哪些是蘋果、哪些是橘子（標籤），他逐漸學會根據顏色和形狀（特徵）來判斷。這就是監督式學習的基本原理。",
      },
    ],
  },
];

// ── Sample Quiz (Section Quiz — Mob Battle) ──

export const sampleQuiz: QuizQuestion[] = [
  {
    question: "下列何者最正確地描述了人工智慧（AI）的定義？",
    options: [
      "AI 是一種可以完全取代人類思維的技術",
      "AI 是電腦科學的分支，旨在建立能執行需要人類智慧任務的系統",
      "AI 是指所有能夠自動化的電腦程式",
      "AI 是一種只能用於圖像辨識的技術",
    ],
    correctIndex: 1,
    explanation:
      "人工智慧的核心定義是建立能夠執行通常需要人類智慧的任務的系統，包括學習、推理、問題解決等能力。這是 IPAS 考試中最基礎的概念題。選項 A 錯誤是因為目前的 AI 屬於「窄域 AI」，無法完全取代人類思維。",
    category: "AI 基礎",
  },
  {
    question: "「人工智慧」一詞首次在哪一年被正式提出？",
    options: ["1943 年", "1950 年", "1956 年", "1969 年"],
    correctIndex: 2,
    explanation:
      "1956 年的達特茅斯會議（Dartmouth Conference）是人工智慧作為一個學科正式誕生的標誌。由 John McCarthy 等學者發起，他們首次使用了「Artificial Intelligence」這個術語。",
    category: "AI 基礎",
  },
  {
    question: "下列哪一項不屬於機器學習的三大分類？",
    options: ["監督式學習", "非監督式學習", "遷移學習", "強化學習"],
    correctIndex: 2,
    explanation:
      "機器學習的三大分類是：監督式學習（Supervised Learning）、非監督式學習（Unsupervised Learning）和強化學習（Reinforcement Learning）。遷移學習（Transfer Learning）是一種學習策略，不屬於三大基本分類。",
    category: "機器學習",
  },
  {
    question: "在機器學習中，「特徵」（Feature）指的是什麼？",
    options: [
      "模型的輸出結果",
      "模型要預測的目標值",
      "模型的輸入變數，用於描述資料的屬性",
      "訓練過程中的損失值",
    ],
    correctIndex: 2,
    explanation:
      "特徵（Feature）是模型的輸入變數，用來描述資料的各個屬性。例如在房價預測中，坪數、樓層、屋齡等都是特徵。標籤（Label）才是模型要預測的目標值（如房價）。",
    category: "機器學習",
  },
  {
    question: "下列哪一項是 AI 在醫療健康領域的典型應用？",
    options: [
      "自動駕駛汽車",
      "股票價格預測",
      "醫學影像判讀與疾病診斷",
      "電商商品推薦",
    ],
    correctIndex: 2,
    explanation:
      "醫學影像判讀與疾病診斷是 AI 在醫療健康領域最具代表性的應用之一。AI 可以分析 X 光、CT 掃描等醫學影像，輔助醫生進行診斷。自動駕駛屬於交通運輸領域，股票預測屬於金融領域，商品推薦屬於零售領域。",
    category: "AI 應用",
  },
];

// ── Sample Exam (Mock Exam — Boss Battle) ──

export const sampleExam: ExamData = {
  timeLimit: 3600,
  passingScore: 70,
  questions: [
    {
      question: "下列何者最正確地描述了人工智慧（AI）的定義？",
      options: [
        "AI 是一種可以完全取代人類思維的技術",
        "AI 是電腦科學的分支，旨在建立能執行需要人類智慧任務的系統",
        "AI 是指所有能夠自動化的電腦程式",
        "AI 是一種只能用於圖像辨識的技術",
      ],
      correctIndex: 1,
      explanation:
        "人工智慧的核心定義是建立能夠執行通常需要人類智慧的任務的系統。",
      category: "AI 基礎",
    },
    {
      question: "「人工智慧」一詞首次在哪一年被正式提出？",
      options: ["1943 年", "1950 年", "1956 年", "1969 年"],
      correctIndex: 2,
      explanation: "1956 年的達特茅斯會議是 AI 作為學科正式誕生的標誌。",
      category: "AI 基礎",
    },
    {
      question: "下列哪一項不屬於機器學習的三大分類？",
      options: ["監督式學習", "非監督式學習", "遷移學習", "強化學習"],
      correctIndex: 2,
      explanation:
        "機器學習三大分類是監督式、非監督式和強化學習。遷移學習是一種策略，不屬於基本分類。",
      category: "機器學習",
    },
    {
      question: "監督式學習的主要特點是什麼？",
      options: [
        "不需要任何標記資料",
        "使用帶有標籤的訓練資料進行學習",
        "透過環境獎勵來學習",
        "自動發現資料中的隱藏模式",
      ],
      correctIndex: 1,
      explanation:
        "監督式學習的核心特點是使用帶有標籤（Label）的訓練資料。模型從輸入特徵和對應標籤中學習映射關係。",
      category: "機器學習",
    },
    {
      question: "下列哪一項是資料前處理的常見步驟？",
      options: [
        "模型部署",
        "處理缺失值和異常值",
        "計算投資報酬率",
        "設計使用者介面",
      ],
      correctIndex: 1,
      explanation:
        "資料前處理包括處理缺失值、異常值檢測、資料正規化、特徵編碼等步驟，是機器學習工作流程中的關鍵環節。",
      category: "資料處理",
    },
    {
      question: "卷積神經網路（CNN）最常應用於哪個領域？",
      options: [
        "自然語言處理",
        "時間序列預測",
        "電腦視覺與影像辨識",
        "語音合成",
      ],
      correctIndex: 2,
      explanation:
        "CNN 的卷積運算特別適合處理具有空間結構的資料，如圖像。它能自動學習影像中的局部特徵，是電腦視覺領域的基礎架構。",
      category: "深度學習",
    },
    {
      question: "下列哪一項是 AI 倫理的核心原則之一？",
      options: [
        "追求最高準確率",
        "公平性與避免演算法偏差",
        "盡可能蒐集更多資料",
        "減少訓練時間",
      ],
      correctIndex: 1,
      explanation:
        "AI 倫理的核心原則包括公平性、透明性、可解釋性和隱私保護。避免演算法偏差是確保 AI 系統不會對特定群體產生不公平結果的重要原則。",
      category: "AI 倫理",
    },
    {
      question: "Transformer 架構的核心機制是什麼？",
      options: [
        "卷積運算",
        "遞迴連接",
        "自注意力機制（Self-Attention）",
        "池化層",
      ],
      correctIndex: 2,
      explanation:
        "Transformer 架構的核心創新是自注意力機制（Self-Attention），它能讓模型在處理序列資料時，同時關注序列中所有位置的資訊。",
      category: "深度學習",
    },
    {
      question: "在模型評估中，「過擬合」（Overfitting）是指什麼現象？",
      options: [
        "模型在訓練資料和測試資料上都表現很差",
        "模型在訓練資料上表現很好但在測試資料上表現很差",
        "模型的訓練時間太長",
        "模型使用了太少的特徵",
      ],
      correctIndex: 1,
      explanation:
        "過擬合是指模型過度學習了訓練資料中的細節和噪音，導致在新的測試資料上泛化能力差。常見的解決方法包括增加資料量、正則化和交叉驗證。",
      category: "機器學習",
    },
    {
      question: "MLOps 的主要目標是什麼？",
      options: [
        "開發更複雜的模型架構",
        "自動化和標準化機器學習的部署與維運流程",
        "蒐集更多的訓練資料",
        "降低硬體成本",
      ],
      correctIndex: 1,
      explanation:
        "MLOps（Machine Learning Operations）結合了機器學習和 DevOps 的最佳實踐，旨在自動化和標準化 ML 模型的部署、監控和維運流程。",
      category: "AI 專案管理",
    },
  ],
};

// ── Sample Dashboard ──

export const sampleDashboard: DashboardData = {
  xp: 1240,
  streak: 7,
  streakCalendar: [
    false, false, true, true, false, false, true,
    true, true, false, true, true, true, false,
    true, true, true, true, false, true, true,
    true, true, true, true, true, true, true,
    true, true,
  ],
  radarScores: [
    { category: "AI 基礎", score: 85 },
    { category: "機器學習", score: 72 },
    { category: "資料處理", score: 68 },
    { category: "深度學習", score: 55 },
    { category: "AI 倫理", score: 90 },
    { category: "AI 專案管理", score: 60 },
  ],
  badges: [
    { id: "first-steps", name: "初心者", icon: "award", unlocked: true },
    { id: "knowledge-seeker", name: "求知者", icon: "award", unlocked: true },
    { id: "fully-prepared", name: "全面備戰", icon: "shield", unlocked: false },
    { id: "mob-slayer", name: "小怪殺手", icon: "trophy", unlocked: true },
    { id: "area-cleared", name: "區域清除", icon: "shield", unlocked: false },
    { id: "streak-warrior", name: "連續戰士", icon: "trophy", unlocked: true },
    { id: "streak-master", name: "連續大師", icon: "trophy", unlocked: false },
    { id: "mock-challenger", name: "挑戰者", icon: "shield", unlocked: true },
    { id: "passing-score", name: "合格勇者", icon: "trophy", unlocked: true },
    { id: "exam-slayer", name: "考試殺手", icon: "trophy", unlocked: false },
  ],
};

// ── Sample Testimonials ──

export const sampleTestimonials: Testimonial[] = [
  {
    name: "陳小明",
    role: "軟體工程師",
    cert: "IPAS AI 應用規劃師 初級",
    quote:
      "LevelCert 的學習方式讓我每天通勤時都能利用零碎時間學習。模擬考試的 AI 解析讓我真正理解自己的弱點在哪裡，最終一次通過考試！",
    avatar: "陳",
  },
  {
    name: "林美玲",
    role: "產品經理",
    cert: "IPAS AI 應用規劃師 初級",
    quote:
      "身為非技術背景的轉職者，我原本很擔心 AI 認證會太難。但 LevelCert 的微課程設計讓複雜概念變得容易理解，遊戲化的學習體驗讓我保持動力。",
    avatar: "林",
  },
  {
    name: "張大偉",
    role: "資料分析師",
    cert: "IPAS AI 應用規劃師 中級",
    quote:
      "能力雷達圖讓我清楚看到自己在各個領域的掌握程度。針對弱項加強複習後，中級考試拿到了 92 分的好成績！",
    avatar: "張",
  },
  {
    name: "王雅婷",
    role: "行銷企劃",
    cert: "IPAS AI 應用規劃師 初級",
    quote:
      "每天的練習任務像遊戲日常任務一樣，不知不覺就養成了學習習慣。連續學習 30 天的成就徽章讓我很有成就感！",
    avatar: "王",
  },
  {
    name: "李建宏",
    role: "專案經理",
    cert: "IPAS AI 應用規劃師 中級",
    quote:
      "通過保證讓我很安心。第一次沒過之後免費延長了三個月，重新複習弱點後順利通過。這個投資報酬率真的很高。",
    avatar: "李",
  },
];
