# 數據清理決策流程 (Data Cleaning Decision Flowchart)

## Mermaid 流程圖

```mermaid
flowchart TD
    A["發現缺失值<br/>Missing Values"] --> B{缺失比例？}
    B -->|"> 30%"| C["考慮刪除整欄<br/>或標記為 '未知'"]
    B -->|"≤ 30%"| D{資料分佈？}
    D -->|"有明顯離群值<br/>或偏態分佈"| E["用中位數補值<br/>fillna(median)<br/>🔥 穩健性高"]
    D -->|"接近常態分佈"| F["用平均數補值<br/>fillna(mean)"]
    D -->|"類別型資料"| G["用眾數補值<br/>fillna(mode()[0])"]
    
    H["發現離群值<br/>Outliers"] --> I{分佈是否偏態？}
    I -->|"偏態或未知"| J["IQR Fence 法<br/>Q1−1.5×IQR ~ Q3+1.5×IQR"]
    I -->|"接近常態"| K["Z-score 法<br/>|z| > 3 則為離群值"]
    J --> L{處理方式？}
    K --> L
    L -->|"保留但標記"| M["新增 is_outlier 欄位"]
    L -->|"刪除"| N["df.drop(outlier_indices)"]
    L -->|"替換"| O["以 Q1 或 Q3 或 fence 值取代"]
    
    P["發現重複值<br/>Duplicates"] --> Q["df.drop_duplicates()"]
```

## 快速判斷表

| 問題類型 | 偵測方法 | Python 函式 |
|----------|----------|------------|
| 缺失值 | `df.isnull().sum()` | `fillna()` / `dropna()` |
| 離群值（偏態）| IQR fence | 手動計算 Q1/Q3/IQR |
| 離群值（常態）| Z-score ±3σ | `scipy.stats.zscore()` |
| 重複列 | `df.duplicated()` | `df.drop_duplicates()` |
| 資料型別錯誤 | `df.dtypes` | `df.astype()` |

## 考試常見情境

```
情境：「欄位薪資有多個 outlier，分佈明顯右偏，有 5% 缺失值，
       想補缺失值但不受 outlier 影響」
→ 選 fillna(median)
   理由：分佈偏態 + 有 outlier → median 穩健，mean 會被 outlier 拉高
```

> 🔥 記憶：「有離群值/偏態 → 選 median 補值；常態無 outlier → 選 mean 補值」
