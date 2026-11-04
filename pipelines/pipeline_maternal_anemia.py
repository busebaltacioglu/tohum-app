import json
import os
import sys
import numpy as np
import pandas as pd
from scipy import stats
from sklearn.ensemble import HistGradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    confusion_matrix,
    f1_score,
    precision_score,
    recall_score,
    roc_auc_score,
)
from sklearn.model_selection import StratifiedKFold, train_test_split
from sklearn.preprocessing import StandardScaler

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

# 1. Load Data
csv_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\maternal_anemia_11k.csv'
df = pd.read_csv(csv_path)

if 'id' in df.columns:
    df.drop(columns=['id'], inplace=True)

print(f"Loaded {len(df)} records from {csv_path}")

# Target engineering:
# v457: 4=Non-anemic (0), 1,2,3=Anemic (1)
df['anemia_target'] = (df['v457'] != 4).astype(int)

anemic_df = df[df['anemia_target'] == 1]
healthy_df = df[df['anemia_target'] == 0]

print(f"Anemic cases: {len(anemic_df)} ({len(anemic_df)/len(df)*100:.1f}%)")
print(f"Healthy cases: {len(healthy_df)} ({len(healthy_df)/len(df)*100:.1f}%)")

# 2. Statistical Hypothesis Testing
# Chi-Square: Iron intake (m45) vs Anemia
ct_iron = pd.crosstab(df['m45'], df['anemia_target'])
chi2_iron, p_iron, _, _ = stats.chi2_contingency(ct_iron)

# Chi-Square: Gestational duration (v214 - trimester) vs Anemia
ct_tri = pd.crosstab(df['v214'], df['anemia_target'])
chi2_tri, p_tri, _, _ = stats.chi2_contingency(ct_tri)

# Parity (v224) t-test: anemic vs healthy
t_par, p_par = stats.ttest_ind(anemic_df['v224'], healthy_df['v224'], equal_var=False)

# BMI (v445) Chi-Square
ct_bmi = pd.crosstab(df['v445'], df['anemia_target'])
chi2_bmi, p_bmi, _, _ = stats.chi2_contingency(ct_bmi)

# Vitamin A (h34) Chi-Square
ct_vita = pd.crosstab(df['h34'], df['anemia_target'])
chi2_vita, p_vita, _, _ = stats.chi2_contingency(ct_vita)

# Antenatal care visits (v027) t-test
t_anc, p_anc = stats.ttest_ind(anemic_df['v027'], healthy_df['v027'], equal_var=False)

print("\n--- HYPOTHESIS TEST RESULTS ---")
print(f"Gestational Age / Trimester (v214) Chi2={chi2_tri:.2f}, p={p_tri:.2e}")
print(f"Iron Intake (m45) Chi2={chi2_iron:.2f}, p={p_iron:.2e}")
print(f"Parity (v224) mean: Anemic={anemic_df['v224'].mean():.2f} vs Healthy={healthy_df['v224'].mean():.2f} | t={t_par:.2f}, p={p_par:.2e}")
print(f"Antenatal Visits (v027) mean: Anemic={anemic_df['v027'].mean():.2f} vs Healthy={healthy_df['v027'].mean():.2f} | t={t_anc:.2f}, p={p_anc:.2e}")
print(f"BMI (v445) Chi2={chi2_bmi:.2f}, p={p_bmi:.2e}")
print(f"Vitamin A (h34) Chi2={chi2_vita:.2f}, p={p_vita:.2e}")

# 3. Model Training (Predicting Anemia Risk WITHOUT using v457 itself!)
feature_cols = [c for c in df.columns if c not in ['v457', 'anemia_target']]
X = df[feature_cols].copy()
y = df['anemia_target'].values

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)

# Stratified 5-Fold CV
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

rf = RandomForestClassifier(n_estimators=200, max_depth=10, min_samples_split=8, random_state=42, class_weight='balanced')
scores_tr = []
scores_val = []

for tr_idx, val_idx in cv.split(X_train, y_train):
    X_f_tr, y_f_tr = X_train.iloc[tr_idx], y_train[tr_idx]
    X_f_val, y_f_val = X_train.iloc[val_idx], y_train[val_idx]
    rf.fit(X_f_tr, y_f_tr)
    probs_tr = rf.predict_proba(X_f_tr)[:, 1]
    probs_val = rf.predict_proba(X_f_val)[:, 1]
    scores_tr.append(roc_auc_score(y_f_tr, probs_tr))
    scores_val.append(roc_auc_score(y_f_val, probs_val))

rf.fit(X_train, y_train)
y_pred_rf = rf.predict(X_test)
y_prob_rf = rf.predict_proba(X_test)[:, 1]

acc_rf = accuracy_score(y_test, y_pred_rf)
rec_rf = recall_score(y_test, y_pred_rf)
prec_rf = precision_score(y_test, y_pred_rf)
f1_rf = f1_score(y_test, y_pred_rf)
auc_rf = roc_auc_score(y_test, y_prob_rf)
cm_rf = confusion_matrix(y_test, y_pred_rf).tolist()

print("\n--- RANDOM FOREST PERFORMANCE ---")
print(f"Accuracy:  {acc_rf:.4f} ({acc_rf*100:.1f}%)")
print(f"Recall:    {rec_rf:.4f} ({rec_rf*100:.1f}%)")
print(f"Precision: {prec_rf:.4f} ({prec_rf*100:.1f}%)")
print(f"F1-Score:  {f1_rf:.4f}")
print(f"ROC-AUC:   {auc_rf:.4f}")
print(f"Train CV ROC-AUC: {np.mean(scores_tr):.4f} +/- {np.std(scores_tr):.4f}")
print(f"Val CV ROC-AUC:   {np.mean(scores_val):.4f} +/- {np.std(scores_val):.4f}")
print(f"Generalization Gap: {abs(np.mean(scores_tr) - np.mean(scores_val)):.4f}")
print("Confusion Matrix [[TN, FP], [FN, TP]]:", cm_rf)

# Feature Importances
importances = dict(zip(feature_cols, [round(float(v), 4) for v in rf.feature_importances_]))
importances_sorted = dict(sorted(importances.items(), key=lambda item: item[1], reverse=True))
print("\nTop 8 Feature Importances:")
for k, v in list(importances_sorted.items())[:8]:
    print(f"  {k}: {v:.4f} ({v*100:.1f}%)")

# Model 2: HistGB
hgb = HistGradientBoostingClassifier(max_iter=150, max_depth=6, random_state=42)
hgb.fit(X_train, y_train)
auc_hgb = roc_auc_score(y_test, hgb.predict_proba(X_test)[:, 1])
print(f"HistGradientBoosting ROC-AUC: {auc_hgb:.4f}")

# Model 3: Logistic Regression (GLM baseline)
scaler = StandardScaler()
X_tr_sc = scaler.fit_transform(X_train)
X_te_sc = scaler.transform(X_test)
lr = LogisticRegression(max_iter=1000, random_state=42)
lr.fit(X_tr_sc, y_train)
auc_lr = roc_auc_score(y_test, lr.predict_proba(X_te_sc)[:, 1])
print(f"Logistic Regression ROC-AUC: {auc_lr:.4f}")

# Save metrics
metrics_payload = {
    "dataset": "maternal_anemia",
    "dataset_source": "WHO / Ethiopian Demographic Health Survey Maternal Anemia Cohort (DOI 10.1186/s40537-023-00720-9)",
    "n_total": len(df),
    "n_train": len(X_train),
    "n_test": len(X_test),
    "anemic_count": int(len(anemic_df)),
    "healthy_count": int(len(healthy_df)),
    "anemic_prevalence": float(round(len(anemic_df) / len(df) * 100, 2)),
    "features": feature_cols,
    "hypothesis_tests": {
        "gestational_age": {
            "chi2": float(round(chi2_tri, 2)),
            "p_val_str": "< 1e-300" if p_tri < 1e-300 else f"{p_tri:.2e}"
        },
        "iron_intake": {
            "chi2": float(round(chi2_iron, 2)),
            "p_val_str": "< 1e-300" if p_iron < 1e-300 else f"{p_iron:.2e}"
        },
        "parity": {
            "anemic_mean": float(round(anemic_df['v224'].mean(), 2)),
            "healthy_mean": float(round(healthy_df['v224'].mean(), 2)),
            "t_stat": float(round(t_par, 2)),
            "p_val_str": f"{p_par:.2e}"
        },
        "antenatal_visits": {
            "anemic_mean": float(round(anemic_df['v027'].mean(), 2)),
            "healthy_mean": float(round(healthy_df['v027'].mean(), 2)),
            "t_stat": float(round(t_anc, 2)),
            "p_val_str": f"{p_anc:.2e}"
        },
        "bmi": {
            "chi2": float(round(chi2_bmi, 2)),
            "p_val_str": f"{p_bmi:.2e}"
        },
        "vitamin_a": {
            "chi2": float(round(chi2_vita, 2)),
            "p_val_str": f"{p_vita:.2e}"
        }
    },
    "rf_performance": {
        "accuracy": float(round(acc_rf, 4)),
        "recall": float(round(rec_rf, 4)),
        "precision": float(round(prec_rf, 4)),
        "f1_score": float(round(f1_rf, 4)),
        "roc_auc": float(round(auc_rf, 4)),
        "train_cv_roc_auc": float(round(np.mean(scores_tr), 4)),
        "val_cv_roc_auc": float(round(np.mean(scores_val), 4)),
        "generalization_gap": float(round(abs(np.mean(scores_tr) - np.mean(scores_val)), 4)),
        "confusion_matrix": cm_rf
    },
    "comparison": {
        "rf_auc": float(round(auc_rf, 4)),
        "hgb_auc": float(round(auc_hgb, 4)),
        "lr_auc": float(round(auc_lr, 4))
    },
    "feature_importances": importances_sorted
}

out_metrics_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\pipelines\maternal_anemia_metrics.json'
with open(out_metrics_path, 'w', encoding='utf-8') as f:
    json.dump(metrics_payload, f, indent=2, ensure_ascii=False)

print(f"\nSaved metrics to {out_metrics_path}")
