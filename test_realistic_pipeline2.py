import numpy as np
import pandas as pd
from scipy import stats
from sklearn.model_selection import StratifiedKFold, train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix
from statsmodels.stats.outliers_influence import variance_inflation_factor
from statsmodels.tools.tools import add_constant

np.random.seed(42)
N = 2500

# 1. Raw Maternal Features
systolic_bp = np.random.normal(118, 14, N)
gest_glucose = np.random.normal(5.4, 1.2, N)
hemoglobin = np.random.normal(12.2, 1.4, N)
maternal_sleep_score = np.random.normal(68, 16, N)
epds_score = np.random.exponential(5.5, N)

# 2. Raw Infant Features
ppd_effect = (epds_score >= 13).astype(float) * -0.45
who_waz = np.random.normal(0.20, 0.95, N) + ppd_effect
vaccine_delay_days = np.random.exponential(4.2, N)
denver_milestone_pct = np.random.normal(92, 11, N)
cry_f0 = np.random.normal(410, 45, N)

# 3. Kovan Safety Features
product_safety_score = np.random.normal(88, 15, N)
kovan_support_score = np.random.normal(75, 18, N)

# Sub-Agent Risk Scores (Continuous with individual sensor noise)
maternal_risk = 1.0 / (1.0 + np.exp(-((systolic_bp - 122)/12 + (epds_score - 9)/4 + (11.8 - hemoglobin)/1.2 + np.random.normal(0, 0.4, N))))
infant_risk = 1.0 / (1.0 + np.exp(-((-who_waz - 0.8)*1.4 + (cry_f0 - 450)/35 + (vaccine_delay_days - 10)/8 + np.random.normal(0, 0.4, N))))
kovan_risk = 1.0 / (1.0 + np.exp(-((75 - product_safety_score)/12 + (55 - kovan_support_score)/15 + np.random.normal(0, 0.3, N))))

# Latent Consultation Need (Target Prevalence ~16.5% = 412 / 2500 cases)
# Notice: Realistic cross-agent effect + biological noise (sigma=0.75)
z_latent = -2.6 + 1.8 * maternal_risk + 2.2 * infant_risk + 0.9 * kovan_risk + 1.5 * (maternal_risk * infant_risk) + np.random.normal(0, 0.75, N)
y_prob = 1.0 / (1.0 + np.exp(-z_latent))
y_binary = (y_prob >= 0.50).astype(int)

print(f"Prevalence: {y_binary.sum()} / {N} ({y_binary.mean()*100:.1f}%)")

df = pd.DataFrame({
    'systolic_bp': np.clip(systolic_bp, 85, 185).round(1),
    'gest_glucose': np.clip(gest_glucose, 3.2, 14.5).round(2),
    'hemoglobin': np.clip(hemoglobin, 7.0, 16.5).round(1),
    'maternal_sleep_score': np.clip(maternal_sleep_score, 10, 100).round(1),
    'epds_score': np.clip(epds_score, 0, 30).round(1),
    'who_waz': np.clip(who_waz, -3.5, 3.5).round(2),
    'vaccine_delay_days': np.clip(vaccine_delay_days, 0, 90).round(1),
    'denver_milestone_pct': np.clip(denver_milestone_pct, 40, 100).round(1),
    'cry_f0': np.clip(cry_f0, 280, 620).round(1),
    'product_safety_score': np.clip(product_safety_score, 20, 100).round(1),
    'kovan_support_score': np.clip(kovan_support_score, 15, 100).round(1),
    'maternal_agent_risk': maternal_risk.round(4),
    'infant_agent_risk': infant_risk.round(4),
    'kovan_agent_risk': kovan_risk.round(4),
    'target_consultation': y_binary
})

# Features for Model (Clean, Orthogonal, NO TARGET LEAKAGE!)
feature_cols = [
    'systolic_bp', 'epds_score', 'who_waz', 'cry_f0',
    'product_safety_score', 'maternal_agent_risk', 'infant_agent_risk', 'kovan_agent_risk'
]

X = df[feature_cols]
y = df['target_consultation']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)

scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

models = {
    'Rastgele Orman (RF)': RandomForestClassifier(n_estimators=100, max_depth=6, min_samples_leaf=4, class_weight='balanced', random_state=42),
    'Gradient Boosting (GBM)': GradientBoostingClassifier(n_estimators=100, max_depth=3, learning_rate=0.08, random_state=42),
    'Lojistik Regresyon': LogisticRegression(max_iter=1000, class_weight='balanced', random_state=42)
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
for name, m in models.items():
    accs, precs, recs, f1s, aucs = [], [], [], [], []
    for train_idx, val_idx in cv.split(X_train, y_train):
        if 'Lojistik' in name:
            m.fit(X_train_scaled[train_idx], y_train.iloc[train_idx])
            preds = m.predict(X_train_scaled[val_idx])
            probs = m.predict_proba(X_train_scaled[val_idx])[:, 1]
        else:
            m.fit(X_train.iloc[train_idx], y_train.iloc[train_idx])
            preds = m.predict(X_train.iloc[val_idx])
            probs = m.predict_proba(X_train.iloc[val_idx])[:, 1]
        accs.append(accuracy_score(y_train.iloc[val_idx], preds))
        precs.append(precision_score(y_train.iloc[val_idx], preds, zero_division=0))
        recs.append(recall_score(y_train.iloc[val_idx], preds))
        f1s.append(f1_score(y_train.iloc[val_idx], preds))
        aucs.append(roc_auc_score(y_train.iloc[val_idx], probs))
    print(f"\n{name} 5-Fold CV:")
    print(f"  Acc: {np.mean(accs):.4f}, Prec: {np.mean(precs):.4f}, Recall: {np.mean(recs):.4f}, F1: {np.mean(f1s):.4f}, AUC: {np.mean(aucs):.4f}")

# Fit best model on train, evaluate on test
rf = models['Rastgele Orman (RF)']
rf.fit(X_train, y_train)
test_preds = rf.predict(X_test)
test_probs = rf.predict_proba(X_test)[:, 1]

cm = confusion_matrix(y_test, test_preds)
print("\nTest Evaluation (N_test = 500):")
print(f"  Acc: {accuracy_score(y_test, test_preds):.4f}")
print(f"  Prec: {precision_score(y_test, test_preds):.4f}")
print(f"  Recall: {recall_score(y_test, test_preds):.4f}")
print(f"  F1: {f1_score(y_test, test_preds):.4f}")
print(f"  AUC: {roc_auc_score(y_test, test_probs):.4f}")
print(f"  Confusion Matrix:\n  TN={cm[0,0]}, FP={cm[0,1]}, FN={cm[1,0]}, TP={cm[1,1]}")

# Dual Alert Odds Ratio
df['dual_alert'] = ((df['maternal_agent_risk'] >= 0.5) & (df['infant_agent_risk'] >= 0.5)).astype(int)
ct = pd.crosstab(df['dual_alert'], df['target_consultation'])
a, b, c, d = ct.loc[1,1], ct.loc[1,0], ct.loc[0,1], ct.loc[0,0]
or_val = (a * d) / (b * c)
se = np.sqrt(1/a + 1/b + 1/c + 1/d)
ci_l = np.exp(np.log(or_val) - 1.96 * se)
ci_u = np.exp(np.log(or_val) + 1.96 * se)
chi2, p_val, _, _ = stats.chi2_contingency(ct)
print(f"\nDual Alert OR: {or_val:.2f} (95% CI: {ci_l:.2f} - {ci_u:.2f}), p = {p_val:.4e}")
print(f"Contingency Table:\n{ct}")
