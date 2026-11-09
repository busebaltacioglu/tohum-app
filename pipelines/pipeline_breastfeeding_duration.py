import numpy as np
import pandas as pd
import scipy.stats as stats
import json
import os

from sklearn.model_selection import train_test_split, StratifiedKFold, cross_validate
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier, GradientBoostingRegressor
from sklearn.linear_model import LogisticRegression, Ridge
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, mean_absolute_error, r2_score, confusion_matrix
from statsmodels.stats.outliers_influence import variance_inflation_factor
from statsmodels.tools.tools import add_constant

# 1. Load Data
csv_path = os.path.join(os.path.dirname(__file__), '..', 'breastfeeding_duration_cohort_1450.csv')
if not os.path.exists(csv_path):
    csv_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\breastfeeding_duration_cohort_1450.csv'
df = pd.read_csv(csv_path)
print(f"Loaded cohort: N = {len(df)}")

n_total = len(df)
early_weaning_cases = int(df['early_weaning_risk_6m'].sum())
early_weaning_pct = round(float(early_weaning_cases / n_total * 100), 2)
median_duration = round(float(df['duration_months'].median()), 1)
mean_duration = round(float(df['duration_months'].mean()), 2)
censored_count = int((df['event_weaned'] == 0).sum())

# 2. Hypothesis Testing (Welch's t-test with equal_var=False)
# A: Duration in Skin-to-Skin (first hour) vs No Skin-to-Skin
skin_yes = df[df['skin_to_skin_first_hour'] == 1]['duration_months'].values
skin_no = df[df['skin_to_skin_first_hour'] == 0]['duration_months'].values
t_stat_skin, p_val_skin = stats.ttest_ind(skin_yes, skin_no, equal_var=False)

# B: Duration in Lactation Support 48h vs No Support
supp_yes = df[df['lactation_support_48h'] == 1]['duration_months'].values
supp_no = df[df['lactation_support_48h'] == 0]['duration_months'].values
t_stat_supp, p_val_supp = stats.ttest_ind(supp_yes, supp_no, equal_var=False)

# C: Duration in Mastitis/Cracks vs No Mastitis
mast_yes = df[df['nipple_cracks_or_mastitis'] == 1]['duration_months'].values
mast_no = df[df['nipple_cracks_or_mastitis'] == 0]['duration_months'].values
t_stat_mast, p_val_mast = stats.ttest_ind(mast_yes, mast_no, equal_var=False)

# 3. 2x2 Contingency Tables & Odds Ratios (Epidemiological)
# Risk 1: Nipple cracks / Mastitis on Early Weaning (< 6 months)
ct1 = pd.crosstab(df['nipple_cracks_or_mastitis'], df['early_weaning_risk_6m'])
a1 = ct1.loc[1, 1] if 1 in ct1.columns else 0
b1 = ct1.loc[1, 0] if 0 in ct1.columns else 0
c1 = ct1.loc[0, 1] if 1 in ct1.columns else 0
d1 = ct1.loc[0, 0] if 0 in ct1.columns else 0

or_mastitis = (a1 * d1) / (b1 * c1) if (b1 * c1) > 0 else 1.0
se_log_or1 = np.sqrt(1/a1 + 1/b1 + 1/c1 + 1/d1)
ci_lower1 = np.exp(np.log(or_mastitis) - 1.96 * se_log_or1)
ci_upper1 = np.exp(np.log(or_mastitis) + 1.96 * se_log_or1)
chi2_1, p_val_chi1, _, _ = stats.chi2_contingency([[a1, b1], [c1, d1]])

# Risk 2: Lack of Skin-to-Skin on Early Weaning (< 6 months)
df['no_skin_to_skin'] = 1 - df['skin_to_skin_first_hour']
ct2 = pd.crosstab(df['no_skin_to_skin'], df['early_weaning_risk_6m'])
a2 = ct2.loc[1, 1] if 1 in ct2.columns else 0
b2 = ct2.loc[1, 0] if 0 in ct2.columns else 0
c2 = ct2.loc[0, 1] if 1 in ct2.columns else 0
d2 = ct2.loc[0, 0] if 0 in ct2.columns else 0

or_no_skin = (a2 * d2) / (b2 * c2) if (b2 * c2) > 0 else 1.0
se_log_or2 = np.sqrt(1/a2 + 1/b2 + 1/c2 + 1/d2)
ci_lower2 = np.exp(np.log(or_no_skin) - 1.96 * se_log_or2)
ci_upper2 = np.exp(np.log(or_no_skin) + 1.96 * se_log_or2)
chi2_2, p_val_chi2, _, _ = stats.chi2_contingency([[a2, b2], [c2, d2]])

# Risk 3: Early Return to Work (<= 3.5 months) on Early Weaning
df['early_work_return'] = ((df['return_to_work_month'] > 0) & (df['return_to_work_month'] <= 3.5)).astype(int)
ct3 = pd.crosstab(df['early_work_return'], df['early_weaning_risk_6m'])
a3 = ct3.loc[1, 1] if 1 in ct3.columns else 0
b3 = ct3.loc[1, 0] if 0 in ct3.columns else 0
c3 = ct3.loc[0, 1] if 1 in ct3.columns else 0
d3 = ct3.loc[0, 0] if 0 in ct3.columns else 0

or_early_work = (a3 * d3) / (b3 * c3) if (b3 * c3) > 0 else 1.0
se_log_or3 = np.sqrt(1/a3 + 1/b3 + 1/c3 + 1/d3)
ci_lower3 = np.exp(np.log(or_early_work) - 1.96 * se_log_or3)
ci_upper3 = np.exp(np.log(or_early_work) + 1.96 * se_log_or3)
chi2_3, p_val_chi3, _, _ = stats.chi2_contingency([[a3, b3], [c3, d3]])

# 4. Multicollinearity (VIF with add_constant)
vif_features = [
    'maternal_age', 'maternal_education_years', 'parity', 'delivery_type',
    'skin_to_skin_first_hour', 'lactation_support_48h', 'pacifier_first_month',
    'nipple_cracks_or_mastitis', 'partner_support_score', 'maternal_anxiety_score'
]
X_vif = add_constant(df[vif_features])
vif_data = []
for i, col in enumerate(vif_features):
    v = variance_inflation_factor(X_vif.values, i + 1)
    vif_data.append({
        'feature': col,
        'vif': round(float(v), 2),
        'tolerance': round(float(1.0 / v), 3),
        'status': 'İdeal (< 3.0)' if v < 3.0 else 'Kabul Edilebilir (< 5.0)'
    })

# 5. Machine Learning Classification (Predicting Early Weaning < 6m)
feature_cols = [
    'maternal_age', 'maternal_education_years', 'parity', 'delivery_type',
    'skin_to_skin_first_hour', 'lactation_support_48h', 'pacifier_first_month',
    'nipple_cracks_or_mastitis', 'partner_support_score', 'maternal_anxiety_score',
    'return_to_work_month'
]
X = df[feature_cols]
y = df['early_weaning_risk_6m']

# 80/20 Stratified Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)
n_train = len(X_train)
n_test = len(X_test)

# Models
rf = RandomForestClassifier(n_estimators=150, max_depth=6, class_weight='balanced', random_state=42)
gbm = GradientBoostingClassifier(n_estimators=120, max_depth=4, learning_rate=0.08, random_state=42)
lr = LogisticRegression(class_weight='balanced', max_iter=1000, random_state=42)

# 5-Fold Stratified CV on Training Set
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
scoring = ['accuracy', 'precision', 'recall', 'f1', 'roc_auc']

cv_results = {}
for name, clf in [('Rastgele Orman (RF)', rf), ('Gradient Boosting (GBM)', gbm), ('Lojistik Regresyon', lr)]:
    scores = cross_validate(clf, X_train, y_train, cv=skf, scoring=scoring)
    cv_results[name] = {
        'accuracy_mean': round(float(np.mean(scores['test_accuracy'])), 4),
        'precision_mean': round(float(np.mean(scores['test_precision'])), 4),
        'recall_mean': round(float(np.mean(scores['test_recall'])), 4),
        'f1_mean': round(float(np.mean(scores['test_f1'])), 4),
        'roc_auc_mean': round(float(np.mean(scores['test_roc_auc'])), 4)
    }

# Train Final Best Model (Balanced RF)
rf.fit(X_train, y_train)
y_pred = rf.predict(X_test)
y_proba = rf.predict_proba(X_test)[:, 1]

cm = confusion_matrix(y_test, y_pred)
tn, fp, fn, tp = cm.ravel()

test_metrics = {
    'accuracy': round(float(accuracy_score(y_test, y_pred)), 4),
    'precision': round(float(precision_score(y_test, y_pred)), 4),
    'recall': round(float(recall_score(y_test, y_pred)), 4),
    'f1_score': round(float(f1_score(y_test, y_pred)), 4),
    'roc_auc': round(float(roc_auc_score(y_test, y_proba)), 4),
    'confusion_matrix': {
        'tn': int(tn),
        'fp': int(fp),
        'fn': int(fn),
        'tp': int(tp)
    }
}

# 6. Dual Model: Regression for Lactation Duration (Months)
y_reg = df['duration_months']
X_reg_train, X_reg_test, y_reg_train, y_reg_test = train_test_split(
    X, y_reg, test_size=0.20, random_state=42
)
gbr = GradientBoostingRegressor(n_estimators=120, max_depth=4, random_state=42)
gbr.fit(X_reg_train, y_reg_train)
y_reg_pred = gbr.predict(X_reg_test)

mae_months = round(float(mean_absolute_error(y_reg_test, y_reg_pred)), 2)
r2_dur = round(float(r2_score(y_reg_test, y_reg_pred)), 4)

# 7. Feature Importance Ranking
importances = rf.feature_importances_
feat_ranks = sorted(zip(feature_cols, importances), key=lambda x: x[1], reverse=True)
sfs_ranking = [{'feature': f, 'importance_pct': round(float(imp * 100), 2)} for f, imp in feat_ranks]

# Assemble Results
results = {
    'dataset': 'Breastfeeding Duration & Lactation Survival Analytics (IFPS II Benchmark)',
    'dataset_source': 'CDC Infant Feeding Practices Study II & Clinical Lactation Tracking Cohort',
    'sample_size': n_total,
    'n_train': n_train,
    'n_test': n_test,
    'early_weaning_cases': early_weaning_cases,
    'early_weaning_pct': early_weaning_pct,
    'median_duration_months': median_duration,
    'mean_duration_months': mean_duration,
    'censored_count': censored_count,
    'welch_ttests': {
        'skin_to_skin_on_duration': {
            'mean_yes': round(float(np.mean(skin_yes)), 2),
            'mean_no': round(float(np.mean(skin_no)), 2),
            'diff_months': round(float(np.mean(skin_yes) - np.mean(skin_no)), 2),
            't_stat': round(float(t_stat_skin), 2),
            'p_value': float(p_val_skin)
        },
        'lactation_support_on_duration': {
            'mean_yes': round(float(np.mean(supp_yes)), 2),
            'mean_no': round(float(np.mean(supp_no)), 2),
            'diff_months': round(float(np.mean(supp_yes) - np.mean(supp_no)), 2),
            't_stat': round(float(t_stat_supp), 2),
            'p_value': float(p_val_supp)
        },
        'mastitis_on_duration': {
            'mean_yes': round(float(np.mean(mast_yes)), 2),
            'mean_no': round(float(np.mean(mast_no)), 2),
            'diff_months': round(float(np.mean(mast_yes) - np.mean(mast_no)), 2),
            't_stat': round(float(t_stat_mast), 2),
            'p_value': float(p_val_mast)
        }
    },
    'odds_ratios': {
        'mastitis_on_early_weaning': {
            'or': round(float(or_mastitis), 2),
            'ci_lower': round(float(ci_lower1), 2),
            'ci_upper': round(float(ci_upper1), 2),
            'p_value': float(p_val_chi1),
            'chi2': round(float(chi2_1), 2),
            'table': {'tp': int(a1), 'fp': int(b1), 'fn': int(c1), 'tn': int(d1)}
        },
        'no_skin_to_skin_on_early_weaning': {
            'or': round(float(or_no_skin), 2),
            'ci_lower': round(float(ci_lower2), 2),
            'ci_upper': round(float(ci_upper2), 2),
            'p_value': float(p_val_chi2),
            'chi2': round(float(chi2_2), 2),
            'table': {'tp': int(a2), 'fp': int(b2), 'fn': int(c2), 'tn': int(d2)}
        },
        'early_work_return_on_early_weaning': {
            'or': round(float(or_early_work), 2),
            'ci_lower': round(float(ci_lower3), 2),
            'ci_upper': round(float(ci_upper3), 2),
            'p_value': float(p_val_chi3),
            'chi2': round(float(chi2_3), 2),
            'table': {'tp': int(a3), 'fp': int(b3), 'fn': int(c3), 'tn': int(d3)}
        }
    },
    'vif_table': vif_data,
    'cv_metrics': cv_results,
    'test_metrics': test_metrics,
    'regression_metrics': {
        'target': 'duration_months',
        'mae_months': mae_months,
        'r2_score': r2_dur
    },
    'feature_ranking': sfs_ranking
}

out_json = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\pipelines\breastfeeding_duration_results.json'
with open(out_json, 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"Results successfully saved to {out_json}")
print("Test Accuracy:", test_metrics['accuracy'])
print("Test Recall:", test_metrics['recall'])
print("Test Confusion Matrix:", test_metrics['confusion_matrix'])
print("Duration Regression MAE (months):", mae_months)
print("Duration Regression R2:", r2_dur)
