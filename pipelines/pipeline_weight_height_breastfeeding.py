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
csv_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\weight_height_breastfeeding_cohort_1280.csv'
df = pd.read_csv(csv_path)
print(f"Loaded cohort: N = {len(df)}")

# Summary statistics
n_total = len(df)
risk_cases = int(df['growth_faltering_risk'].sum())
risk_pct = round(float(risk_cases / n_total * 100), 2)

# Feeding distribution
ebf_count = int((df['feeding_pattern'] == 1).sum())
water_count = int((df['feeding_pattern'] == 2).sum())
mixed_count = int((df['feeding_pattern'] == 3).sum())
formula_count = int((df['feeding_pattern'] == 4).sum())

# 2. Hypothesis Testing (Welch's t-tests)
# A: Weight velocity / WAZ in EBF vs Formula
ebf_waz = df[df['feeding_pattern'] == 1]['waz_score'].values
formula_waz = df[df['feeding_pattern'] == 4]['waz_score'].values
t_stat_waz, p_val_waz = stats.ttest_ind(ebf_waz, formula_waz, equal_var=False)

# B: HAZ (Height/Length) in EBF vs Formula
ebf_haz = df[df['feeding_pattern'] == 1]['haz_score'].values
formula_haz = df[df['feeding_pattern'] == 4]['haz_score'].values
t_stat_haz, p_val_haz = stats.ttest_ind(ebf_haz, formula_haz, equal_var=False)

# 3. 2x2 Contingency Tables & Odds Ratios (Epidemiological)
# Risk 1: Water dilution (Pattern 2) vs Exclusive Breastfeeding (Pattern 1) on Growth Faltering
ebf_or_water_df = df[df['feeding_pattern'].isin([1, 2])]
ct1 = pd.crosstab(ebf_or_water_df['feeding_pattern'] == 2, ebf_or_water_df['growth_faltering_risk'])
# ct1 rows: True (Water), False (EBF); cols: 0 (Normal), 1 (Risk)
a1 = ct1.loc[True, 1] if 1 in ct1.columns else 0
b1 = ct1.loc[True, 0] if 0 in ct1.columns else 0
c1 = ct1.loc[False, 1] if 1 in ct1.columns else 0
d1 = ct1.loc[False, 0] if 0 in ct1.columns else 0

or_water = (a1 * d1) / (b1 * c1) if (b1 * c1) > 0 else 1.0
se_log_or1 = np.sqrt(1/a1 + 1/b1 + 1/c1 + 1/d1)
ci_lower1 = np.exp(np.log(or_water) - 1.96 * se_log_or1)
ci_upper1 = np.exp(np.log(or_water) + 1.96 * se_log_or1)
chi2_1, p_val_chi1, _, _ = stats.chi2_contingency([[a1, b1], [c1, d1]])

# Risk 2: Low feeding frequency (< 7 / day) on Growth Faltering
df['low_frequency'] = (df['daily_feedings_count'] < 7).astype(int)
ct2 = pd.crosstab(df['low_frequency'], df['growth_faltering_risk'])
a2 = ct2.loc[1, 1] if 1 in ct2.columns else 0
b2 = ct2.loc[1, 0] if 0 in ct2.columns else 0
c2 = ct2.loc[0, 1] if 1 in ct2.columns else 0
d2 = ct2.loc[0, 0] if 0 in ct2.columns else 0

or_low_freq = (a2 * d2) / (b2 * c2) if (b2 * c2) > 0 else 1.0
se_log_or2 = np.sqrt(1/a2 + 1/b2 + 1/c2 + 1/d2)
ci_lower2 = np.exp(np.log(or_low_freq) - 1.96 * se_log_or2)
ci_upper2 = np.exp(np.log(or_low_freq) + 1.96 * se_log_or2)
chi2_2, p_val_chi2, _, _ = stats.chi2_contingency([[a2, b2], [c2, d2]])

# 4. Multicollinearity (VIF with add_constant)
vif_features = [
    'age_months', 'birth_weight_kg', 'birth_length_cm',
    'daily_feedings_count', 'maternal_bmi', 'maternal_education_years',
    'current_weight_kg', 'current_length_cm'
]
X_vif = add_constant(df[vif_features])
vif_data = []
for i, col in enumerate(vif_features):
    # col index in X_vif is i + 1 (since const is index 0)
    v = variance_inflation_factor(X_vif.values, i + 1)
    vif_data.append({
        'feature': col,
        'vif': round(float(v), 2),
        'tolerance': round(float(1.0 / v), 3),
        'status': 'İdeal (< 3.0)' if v < 3.0 else 'Kabul Edilebilir (< 5.0)'
    })

# 5. Machine Learning Modeling (Train-Test Split & 5-Fold Stratified CV)
feature_cols = [
    'gender', 'gestational_age_weeks', 'birth_weight_kg', 'birth_length_cm',
    'age_months', 'feeding_pattern', 'daily_feedings_count',
    'maternal_bmi', 'maternal_education_years', 'pacifier_use',
    'current_weight_kg', 'current_length_cm', 'head_circumference_cm',
    'waz_score', 'haz_score', 'whz_score'
]

X = df[feature_cols]
y = df['growth_faltering_risk']

# 80/20 Stratified Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.20, random_state=42, stratify=y
)
n_train = len(X_train)
n_test = len(X_test)

# Model definitions
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

# Train Final Best Model (Gradient Boosting / RF Ensemble)
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

# 6. Dual Model: Regression for 6-Month Weight Prediction
# Predict current_weight_kg using baseline variables (age, birth metrics, feeding, maternal)
reg_features = [
    'gender', 'gestational_age_weeks', 'birth_weight_kg', 'birth_length_cm',
    'age_months', 'feeding_pattern', 'daily_feedings_count', 'maternal_bmi'
]
X_reg = df[reg_features]
y_reg = df['current_weight_kg']

X_reg_train, X_reg_test, y_reg_train, y_reg_test = train_test_split(
    X_reg, y_reg, test_size=0.20, random_state=42
)
gbr = GradientBoostingRegressor(n_estimators=120, max_depth=4, random_state=42)
gbr.fit(X_reg_train, y_reg_train)
y_reg_pred = gbr.predict(X_reg_test)

mae_kg = round(float(mean_absolute_error(y_reg_test, y_reg_pred)), 3)
r2_wt = round(float(r2_score(y_reg_test, y_reg_pred)), 4)

# 7. Feature Importance Ranking
importances = rf.feature_importances_
feat_ranks = sorted(zip(feature_cols, importances), key=lambda x: x[1], reverse=True)
sfs_ranking = [{'feature': f, 'importance_pct': round(float(imp * 100), 2)} for f, imp in feat_ranks]

# Assemble Results Dictionary
results = {
    'dataset': 'Weight, Height & Breastfeeding Pattern of Infants (WHO Standards)',
    'dataset_source': 'Kaggle (Chidiebere Chukwuemeka) & WHO MGRS Clinical Benchmark',
    'sample_size': n_total,
    'n_train': n_train,
    'n_test': n_test,
    'risk_cases': risk_cases,
    'risk_pct': risk_pct,
    'feeding_distribution': {
        'exclusive_breastfeeding': ebf_count,
        'breastfeeding_with_water': water_count,
        'partial_breastfeeding': mixed_count,
        'formula_only': formula_count
    },
    'welch_ttests': {
        'waz_ebf_vs_formula': {
            'mean_ebf': round(float(np.mean(ebf_waz)), 2),
            'mean_formula': round(float(np.mean(formula_waz)), 2),
            't_stat': round(float(t_stat_waz), 2),
            'p_value': float(p_val_waz)
        },
        'haz_ebf_vs_formula': {
            'mean_ebf': round(float(np.mean(ebf_haz)), 2),
            'mean_formula': round(float(np.mean(formula_haz)), 2),
            't_stat': round(float(t_stat_haz), 2),
            'p_value': float(p_val_haz)
        }
    },
    'odds_ratios': {
        'water_dilution_on_faltering': {
            'or': round(float(or_water), 2),
            'ci_lower': round(float(ci_lower1), 2),
            'ci_upper': round(float(ci_upper1), 2),
            'p_value': float(p_val_chi1),
            'chi2': round(float(chi2_1), 2),
            'table': {'tp': int(a1), 'fp': int(b1), 'fn': int(c1), 'tn': int(d1)}
        },
        'low_frequency_on_faltering': {
            'or': round(float(or_low_freq), 2),
            'ci_lower': round(float(ci_lower2), 2),
            'ci_upper': round(float(ci_upper2), 2),
            'p_value': float(p_val_chi2),
            'chi2': round(float(chi2_2), 2),
            'table': {'tp': int(a2), 'fp': int(b2), 'fn': int(c2), 'tn': int(d2)}
        }
    },
    'vif_table': vif_data,
    'cv_metrics': cv_results,
    'test_metrics': test_metrics,
    'regression_metrics': {
        'target': 'current_weight_kg',
        'mae_kg': mae_kg,
        'mae_grams': round(mae_kg * 1000, 1),
        'r2_score': r2_wt
    },
    'feature_ranking': sfs_ranking
}

out_json = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\pipelines\weight_height_breastfeeding_results.json'
with open(out_json, 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"Results successfully saved to {out_json}")
print("Test Accuracy:", test_metrics['accuracy'])
print("Test Recall:", test_metrics['recall'])
print("Test Confusion Matrix:", test_metrics['confusion_matrix'])
print("Regression MAE (g):", results['regression_metrics']['mae_grams'])
print("Regression R2:", results['regression_metrics']['r2_score'])
