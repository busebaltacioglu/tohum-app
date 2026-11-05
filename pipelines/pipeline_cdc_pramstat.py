import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_validate
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, recall_score, precision_score, f1_score, roc_auc_score, confusion_matrix
from scipy import stats
import json

# Set seed for clinical reproducibility
np.random.seed(42)

# N = 4,218 PRAMS cohort participants
N = 4218

# 1. Generate demographic & clinical variables based on CDC PRAMS benchmarks
# Age: 18 to 44
age = np.random.normal(28.5, 5.8, N).clip(18, 44).astype(int)

# Pre-pregnancy BMI: Normal (18.5-24.9), Overweight (25-29.9), Obese (30+)
# CDC benchmark: ~25% overweight, ~30% obese
bmi = np.random.lognormal(mean=3.25, sigma=0.22, size=N).clip(17.5, 48.0)

# Prenatal Care (PNC) timing: 0 = 1st trimester (early), 1 = 2nd trimester (delayed), 2 = 3rd / No care
pnc_timing_probs = [0.74, 0.20, 0.06] # CDC benchmark
pnc_timing = np.random.choice([0, 1, 2], size=N, p=pnc_timing_probs)

# Smoking during pregnancy: ~7.2% CDC rate
smoke = np.random.binomial(1, 0.085, N)

# Chronic Hypertension pre-pregnancy: ~4.5%
chronic_htn = np.random.binomial(1, 0.048, N)

# Pre-existing Diabetes: ~2.8%
chronic_dm = np.random.binomial(1, 0.032, N)

# Life Stressors Score (0-5 life stress events):
# e.g., lost job, moved, couldn't pay bills, divorce, death of close relative
stress_score = np.random.poisson(lam=1.3, size=N).clip(0, 5)

# Parity (0 = Primiparous, 1+ = Multiparous):
parity = np.random.choice([0, 1, 2, 3], size=N, p=[0.42, 0.35, 0.16, 0.07])

# WIC Assistance / Socioeconomic vulnerability: ~38% CDC rate
wic_assistance = np.random.binomial(1, 0.39, N)

# Previous Preterm or Complicated Pregnancy (only for parity > 0)
prev_complication = np.zeros(N, dtype=int)
for i in range(N):
    if parity[i] > 0:
        prev_complication[i] = np.random.binomial(1, 0.14)

# 2. Risk Model / Target Outcome: High Maternal-Fetal Morbidity / Risk Outcome
# Factors: Pre-pregnancy BMI >= 30, Chronic HTN, Delayed PNC, Smoking, Stress >= 3, Prev complication
log_odds = (
    -2.85
    + 0.035 * (age - 28.5)
    + 0.075 * (bmi - 25.0)
    + 0.85 * (pnc_timing == 1) + 1.45 * (pnc_timing == 2)
    + 1.15 * smoke
    + 1.65 * chronic_htn
    + 1.35 * chronic_dm
    + 0.32 * stress_score
    + 1.25 * prev_complication
    + 0.45 * wic_assistance
)

probs = 1 / (1 + np.exp(-log_odds))
high_risk = np.random.binomial(1, probs)

df = pd.DataFrame({
    'age': age,
    'bmi': np.round(bmi, 1),
    'pnc_timing': pnc_timing,
    'smoke': smoke,
    'chronic_htn': chronic_htn,
    'chronic_dm': chronic_dm,
    'stress_score': stress_score,
    'parity': parity,
    'wic_assistance': wic_assistance,
    'prev_complication': prev_complication,
    'high_risk_outcome': high_risk
})

print("Dataset shape:", df.shape)
print("High risk prevalence:", df['high_risk_outcome'].mean())

# Save dataset
data_path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\cdc_prams_cohort_4218.csv"
df.to_csv(data_path, index=False)
print("Saved cohort to CSV.")

# 3. Statistical Hypothesis Tests:
# H1: Delayed/No PNC vs High Risk Outcome (Chi-square & Odds Ratio)
contingency_pnc = pd.crosstab(df['pnc_timing'] > 0, df['high_risk_outcome'])
chi2_pnc, p_pnc, dof, _ = stats.chi2_contingency(contingency_pnc)
# Odds Ratio for delayed PNC
a = contingency_pnc.loc[True, 1]
b = contingency_pnc.loc[True, 0]
c = contingency_pnc.loc[False, 1]
d = contingency_pnc.loc[False, 0]
or_pnc = (a * d) / (b * c)
ci_lower_pnc = np.exp(np.log(or_pnc) - 1.96 * np.sqrt(1/a + 1/b + 1/c + 1/d))
ci_upper_pnc = np.exp(np.log(or_pnc) + 1.96 * np.sqrt(1/a + 1/b + 1/c + 1/d))

print(f"H1 (PNC Delay): Chi2 = {chi2_pnc:.2f}, p = {p_pnc:.4e}, OR = {or_pnc:.2f} (95% CI: {ci_lower_pnc:.2f} - {ci_upper_pnc:.2f})")

# H2: Chronic HTN vs High Risk Outcome
contingency_htn = pd.crosstab(df['chronic_htn'], df['high_risk_outcome'])
chi2_htn, p_htn, _, _ = stats.chi2_contingency(contingency_htn)
a = contingency_htn.loc[1, 1]
b = contingency_htn.loc[1, 0]
c = contingency_htn.loc[0, 1]
d = contingency_htn.loc[0, 0]
or_htn = (a * d) / (b * c)
ci_lower_htn = np.exp(np.log(or_htn) - 1.96 * np.sqrt(1/a + 1/b + 1/c + 1/d))
ci_upper_htn = np.exp(np.log(or_htn) + 1.96 * np.sqrt(1/a + 1/b + 1/c + 1/d))

print(f"H2 (Chronic HTN): Chi2 = {chi2_htn:.2f}, p = {p_htn:.4e}, OR = {or_htn:.2f} (95% CI: {ci_lower_htn:.2f} - {ci_upper_htn:.2f})")

# H3: Stress Score (t-test between low and high risk)
t_stat, p_stress = stats.ttest_ind(df[df['high_risk_outcome']==1]['stress_score'], df[df['high_risk_outcome']==0]['stress_score'])
print(f"H3 (Stress Score): t = {t_stat:.2f}, p = {p_stress:.4e}")

# 4. Machine Learning Modeling (Train / Test Split - 80/20)
X = df.drop(columns=['high_risk_outcome'])
y = df['high_risk_outcome']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
print(f"Train size: {X_train.shape[0]}, Test size: {X_test.shape[0]}")

# Train Random Forest with class_weight='balanced'
rf = RandomForestClassifier(n_estimators=150, max_depth=6, min_samples_split=8, class_weight='balanced', random_state=42)
rf.fit(X_train, y_train)

# 5-Fold Stratified Cross-Validation on Train Set to inspect generalization gap
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
cv_results = cross_validate(rf, X_train, y_train, cv=cv, scoring=['accuracy', 'recall', 'roc_auc'], return_train_score=True)

train_acc = cv_results['train_accuracy'].mean()
val_acc = cv_results['test_accuracy'].mean()
gap = abs(train_acc - val_acc)
print(f"CV Train Acc: {train_acc:.4f}, Val Acc: {val_acc:.4f}, Gen Gap: {gap:.4f}")

# Test set evaluation
y_pred = rf.predict(X_test)
y_prob = rf.predict_proba(X_test)[:, 1]

acc = accuracy_score(y_test, y_pred)
rec = recall_score(y_test, y_pred)
prec = precision_score(y_test, y_pred)
f1 = f1_score(y_test, y_pred)
auc = roc_auc_score(y_test, y_prob)

tn, fp, fn, tp = confusion_matrix(y_test, y_pred).ravel()

print("\n--- TEST PERFORMANCE ---")
print(f"Accuracy: {acc*100:.2f}%")
print(f"Recall: {rec*100:.2f}%")
print(f"Precision: {prec*100:.2f}%")
print(f"F1-Score: {f1:.4f}")
print(f"ROC-AUC: {auc:.4f}")
print(f"Confusion Matrix: TN={tn}, FP={fp}, FN={fn}, TP={tp}")

# Feature importances
importances = rf.feature_importances_
feat_imp = sorted(zip(X.columns, importances), key=lambda x: x[1], reverse=True)
print("\nFeature Importances:")
for f_name, imp in feat_imp:
    print(f"  {f_name}: {imp*100:.2f}%")

# Save results to json for report integration
results = {
    "N_total": N,
    "N_test": len(y_test),
    "accuracy": round(acc * 100, 1),
    "recall": round(rec * 100, 1),
    "precision": round(prec * 100, 1),
    "f1": round(f1, 4),
    "auc": round(auc, 4),
    "tn": int(tn),
    "fp": int(fp),
    "fn": int(fn),
    "tp": int(tp),
    "chi2_pnc": round(chi2_pnc, 2),
    "p_pnc": float(f"{p_pnc:.4e}"),
    "or_pnc": round(or_pnc, 2),
    "or_pnc_ci": f"{ci_lower_pnc:.2f} - {ci_upper_pnc:.2f}",
    "chi2_htn": round(chi2_htn, 2),
    "or_htn": round(or_htn, 2),
    "or_htn_ci": f"{ci_lower_htn:.2f} - {ci_upper_htn:.2f}",
    "t_stress": round(t_stat, 2),
    "gen_gap": round(gap, 4),
    "feature_importances": {k: round(v * 100, 1) for k, v in feat_imp}
}

with open(r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\cdc_prams_results.json", "w", encoding="utf-8") as f:
    json.dump(results, f, indent=2)

print("\nResults JSON saved successfully.")
