import json
import os
import sys
import numpy as np
import pandas as pd
from scipy import stats
from sklearn.ensemble import HistGradientBoostingClassifier, RandomForestClassifier
from sklearn.experimental import enable_iterative_imputer  # noqa
from sklearn.impute import IterativeImputer
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
csv_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\gestational_diabetes.csv'
df = pd.read_csv(csv_path)

print(f"Loaded {len(df)} records from {csv_path}")

# Clean column names
df.columns = [c.strip().replace(' ', '_').replace('(', '_').replace(')', '_').replace('/', '_') for c in df.columns]
print("Clean columns:", df.columns.tolist())

# Rename target column cleanly
target_col = [c for c in df.columns if 'Class_Label' in c or 'GDM' in c][0]
df.rename(columns={target_col: 'gdm_target'}, inplace=True)
if 'Case_Number' in df.columns:
    df.drop(columns=['Case_Number'], inplace=True)

# 2. Hypothesis Testing (Prior to Imputation / on available cases & across groups)
gdm_pos = df[df['gdm_target'] == 1]
gdm_neg = df[df['gdm_target'] == 0]

# OGTT Glucose Welch t-test
ogtt_pos = gdm_pos['OGTT'].dropna()
ogtt_neg = gdm_neg['OGTT'].dropna()
t_ogtt, p_ogtt = stats.ttest_ind(ogtt_pos, ogtt_neg, equal_var=False)

# BMI Welch t-test
bmi_pos = gdm_pos['BMI'].dropna()
bmi_neg = gdm_neg['BMI'].dropna()
t_bmi, p_bmi = stats.ttest_ind(bmi_pos, bmi_neg, equal_var=False)

# Age Welch t-test
age_pos = gdm_pos['Age'].dropna()
age_neg = gdm_neg['Age'].dropna()
t_age, p_age = stats.ttest_ind(age_pos, age_neg, equal_var=False)

# Chi-Square: Family History vs GDM
ct_fam = pd.crosstab(df['Family_History'], df['gdm_target'])
chi2_fam, p_fam, _, _ = stats.chi2_contingency(ct_fam)

# Chi-Square: Large Child history vs GDM
lc_col = [c for c in df.columns if 'Large_Child' in c][0]
ct_lc = pd.crosstab(df[lc_col], df['gdm_target'])
chi2_lc, p_lc, _, _ = stats.chi2_contingency(ct_lc)

# Chi-Square: PCOS vs GDM
ct_pcos = pd.crosstab(df['PCOS'], df['gdm_target'])
chi2_pcos, p_pcos, _, _ = stats.chi2_contingency(ct_pcos)

# Chi-Square: Prediabetes vs GDM
ct_predia = pd.crosstab(df['Prediabetes'], df['gdm_target'])
chi2_predia, p_predia, _, _ = stats.chi2_contingency(ct_predia)

print("\n--- HYPOTHESIS TEST RESULTS ---")
print(f"OGTT: GDM+ mean={ogtt_pos.mean():.2f} mg/dL vs GDM- mean={ogtt_neg.mean():.2f} mg/dL | t={t_ogtt:.2f}, p={p_ogtt:.2e}")
print(f"BMI: GDM+ mean={bmi_pos.mean():.2f} kg/m2 vs GDM- mean={bmi_neg.mean():.2f} kg/m2 | t={t_bmi:.2f}, p={p_bmi:.2e}")
print(f"Age: GDM+ mean={age_pos.mean():.2f} vs GDM- mean={age_neg.mean():.2f} | t={t_age:.2f}, p={p_age:.2e}")
print(f"Family History Chi2={chi2_fam:.2f}, p={p_fam:.2e}")
print(f"Large Child History Chi2={chi2_lc:.2f}, p={p_lc:.2e}")
print(f"PCOS Chi2={chi2_pcos:.2f}, p={p_pcos:.2e}")
print(f"Prediabetes Chi2={chi2_predia:.2f}, p={p_predia:.2e}")

# 3. Preparation: MICE / Iterative Imputation for Clinical Integrity
feature_cols = [c for c in df.columns if c != 'gdm_target']
X_raw = df[feature_cols].copy()
y = df['gdm_target'].values

imputer = IterativeImputer(max_iter=15, random_state=42)
X_imputed = pd.DataFrame(imputer.fit_transform(X_raw), columns=feature_cols)

# Train/Test Split
X_train, X_test, y_train, y_test = train_test_split(
    X_imputed, y, test_size=0.20, random_state=42, stratify=y
)

# 4. Stratified 5-Fold Cross Validation & Model Training
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)

# Model 1: Random Forest
rf = RandomForestClassifier(n_estimators=200, max_depth=10, min_samples_split=5, random_state=42, class_weight='balanced')
rf_cv_scores = []
for train_idx, val_idx in cv.split(X_train, y_train):
    X_f_tr, y_f_tr = X_train.iloc[train_idx], y_train[train_idx]
    X_f_val, y_f_val = X_train.iloc[val_idx], y_train[val_idx]
    rf.fit(X_f_tr, y_f_tr)
    probs = rf.predict_proba(X_f_val)[:, 1]
    rf_cv_scores.append(roc_auc_score(y_f_val, probs))

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
print(f"5-Fold CV ROC-AUC: {np.mean(rf_cv_scores):.4f} +/- {np.std(rf_cv_scores):.4f}")
print("Confusion Matrix [[TN, FP], [FN, TP]]:", cm_rf)

# Feature Importances
importances = dict(zip(feature_cols, [round(float(v), 4) for v in rf.feature_importances_]))
importances_sorted = dict(sorted(importances.items(), key=lambda item: item[1], reverse=True))
print("\nFeature Importances (Top 7):")
for k, v in list(importances_sorted.items())[:7]:
    print(f"  {k}: {v:.4f} ({v*100:.1f}%)")

# Model 2: HistGradientBoosting (handles nonlinear interactions)
hgb = HistGradientBoostingClassifier(max_iter=150, max_depth=6, random_state=42)
hgb.fit(X_train, y_train)
y_prob_hgb = hgb.predict_proba(X_test)[:, 1]
auc_hgb = roc_auc_score(y_test, y_prob_hgb)
print(f"HistGradientBoosting ROC-AUC: {auc_hgb:.4f}")

# Model 3: Logistic Regression (as GLM baseline)
scaler = StandardScaler()
X_tr_sc = scaler.fit_transform(X_train)
X_te_sc = scaler.transform(X_test)
lr = LogisticRegression(max_iter=1000, random_state=42)
lr.fit(X_tr_sc, y_train)
y_prob_lr = lr.predict_proba(X_te_sc)[:, 1]
auc_lr = roc_auc_score(y_test, y_prob_lr)
print(f"Logistic Regression (GLM baseline) ROC-AUC: {auc_lr:.4f}")

# 5. Save all metrics to json
metrics_payload = {
    "dataset": "gestational_diabetes",
    "dataset_source": "Kaggle Gestational Diabetes Mellitus / Kurdistan Clinical Cohort (DOI 10.21227/85TY-JF65)",
    "n_total": len(df),
    "n_train": len(X_train),
    "n_test": len(X_test),
    "gdm_pos_count": int(df['gdm_target'].sum()),
    "gdm_neg_count": int((df['gdm_target'] == 0).sum()),
    "gdm_pos_prevalence": float(round(df['gdm_target'].mean() * 100, 2)),
    "features": feature_cols,
    "hypothesis_tests": {
        "ogtt": {
            "gdm_pos_mean": float(round(ogtt_pos.mean(), 2)),
            "gdm_neg_mean": float(round(ogtt_neg.mean(), 2)),
            "diff_mg_dl": float(round(ogtt_pos.mean() - ogtt_neg.mean(), 2)),
            "t_stat": float(round(t_ogtt, 2)),
            "p_val_str": "< 1e-300" if p_ogtt < 1e-300 else f"{p_ogtt:.2e}"
        },
        "bmi": {
            "gdm_pos_mean": float(round(bmi_pos.mean(), 2)),
            "gdm_neg_mean": float(round(bmi_neg.mean(), 2)),
            "diff_kg_m2": float(round(bmi_pos.mean() - bmi_neg.mean(), 2)),
            "t_stat": float(round(t_bmi, 2)),
            "p_val_str": "< 1e-300" if p_bmi < 1e-300 else f"{p_bmi:.2e}"
        },
        "age": {
            "gdm_pos_mean": float(round(age_pos.mean(), 2)),
            "gdm_neg_mean": float(round(age_neg.mean(), 2)),
            "t_stat": float(round(t_age, 2)),
            "p_val_str": f"{p_age:.2e}"
        },
        "family_history": {
            "chi2": float(round(chi2_fam, 2)),
            "p_val_str": "< 1e-300" if p_fam < 1e-300 else f"{p_fam:.2e}"
        },
        "large_child": {
            "chi2": float(round(chi2_lc, 2)),
            "p_val_str": "< 1e-300" if p_lc < 1e-300 else f"{p_lc:.2e}"
        },
        "pcos": {
            "chi2": float(round(chi2_pcos, 2)),
            "p_val_str": "< 1e-300" if p_pcos < 1e-300 else f"{p_pcos:.2e}"
        },
        "prediabetes": {
            "chi2": float(round(chi2_predia, 2)),
            "p_val_str": "< 1e-300" if p_predia < 1e-300 else f"{p_predia:.2e}"
        }
    },
    "rf_performance": {
        "accuracy": float(round(acc_rf, 4)),
        "recall": float(round(rec_rf, 4)),
        "precision": float(round(prec_rf, 4)),
        "f1_score": float(round(f1_rf, 4)),
        "roc_auc": float(round(auc_rf, 4)),
        "cv_roc_auc_mean": float(round(np.mean(rf_cv_scores), 4)),
        "cv_roc_auc_std": float(round(np.std(rf_cv_scores), 4)),
        "confusion_matrix": cm_rf
    },
    "comparison": {
        "rf_auc": float(round(auc_rf, 4)),
        "hgb_auc": float(round(auc_hgb, 4)),
        "lr_auc": float(round(auc_lr, 4))
    },
    "feature_importances": importances_sorted
}

out_metrics_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\pipelines\gdm_diabetes_metrics.json'
with open(out_metrics_path, 'w', encoding='utf-8') as f:
    json.dump(metrics_payload, f, indent=2, ensure_ascii=False)

print(f"\nSaved metrics to {out_metrics_path}")
