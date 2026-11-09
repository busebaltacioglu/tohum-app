import numpy as np
import pandas as pd
import scipy.stats as stats
import json
import os

from sklearn.model_selection import train_test_split, StratifiedKFold, cross_validate
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, confusion_matrix, classification_report
from statsmodels.stats.outliers_influence import variance_inflation_factor
from statsmodels.tools.tools import add_constant

# 1. Load Data
csv_path = os.path.join(os.path.dirname(__file__), '..', 'baby_cry_audio_cohort_1350.csv')
if not os.path.exists(csv_path):
    csv_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\baby_cry_audio_cohort_1350.csv'
df = pd.read_csv(csv_path)
print(f"Loaded audio cohort: N = {len(df)}")

n_total = len(df)
pain_cases = int(df['colic_or_pain'].sum())
pain_pct = round(float(pain_cases / n_total * 100), 2)

class_counts = df['cry_reason'].value_counts().to_dict()

# 2. Hypothesis Testing (Welch's t-test with equal_var=False)
# A: Pitch (F0) in Pain/Colic vs Other
f0_pain = df[df['colic_or_pain'] == 1]['f0_hz'].values
f0_other = df[df['colic_or_pain'] == 0]['f0_hz'].values
t_stat_f0, p_val_f0 = stats.ttest_ind(f0_pain, f0_other, equal_var=False)

# B: Spectral Centroid in Pain/Colic vs Other
sc_pain = df[df['colic_or_pain'] == 1]['spectral_centroid'].values
sc_other = df[df['colic_or_pain'] == 0]['spectral_centroid'].values
t_stat_sc, p_val_sc = stats.ttest_ind(sc_pain, sc_other, equal_var=False)

# C: RMS Energy in Pain/Colic vs Other
rms_pain = df[df['colic_or_pain'] == 1]['rms_energy'].values
rms_other = df[df['colic_or_pain'] == 0]['rms_energy'].values
t_stat_rms, p_val_rms = stats.ttest_ind(rms_pain, rms_other, equal_var=False)

# 3. 2x2 Contingency Tables & Odds Ratios
# Risk 1: High Pitch (F0 > 470 Hz) on Colic/Pain
df['high_pitch'] = (df['f0_hz'] > 470.0).astype(int)
ct1 = pd.crosstab(df['high_pitch'], df['colic_or_pain'])
a1 = ct1.loc[1, 1] if 1 in ct1.columns else 0
b1 = ct1.loc[1, 0] if 0 in ct1.columns else 0
c1 = ct1.loc[0, 1] if 1 in ct1.columns else 0
d1 = ct1.loc[0, 0] if 0 in ct1.columns else 0

or_pitch = (a1 * d1) / (b1 * c1) if (b1 * c1) > 0 else 1.0
se_log_or1 = np.sqrt(1/a1 + 1/b1 + 1/c1 + 1/d1)
ci_lower1 = np.exp(np.log(or_pitch) - 1.96 * se_log_or1)
ci_upper1 = np.exp(np.log(or_pitch) + 1.96 * se_log_or1)
chi2_1, p_val_chi1, _, _ = stats.chi2_contingency([[a1, b1], [c1, d1]])

# Risk 2: High Spectral Centroid (> 2200 Hz) on Colic/Pain
df['high_centroid'] = (df['spectral_centroid'] > 2200.0).astype(int)
ct2 = pd.crosstab(df['high_centroid'], df['colic_or_pain'])
a2 = ct2.loc[1, 1] if 1 in ct2.columns else 0
b2 = ct2.loc[1, 0] if 0 in ct2.columns else 0
c2 = ct2.loc[0, 1] if 1 in ct2.columns else 0
d2 = ct2.loc[0, 0] if 0 in ct2.columns else 0

or_centroid = (a2 * d2) / (b2 * c2) if (b2 * c2) > 0 else 1.0
se_log_or2 = np.sqrt(1/a2 + 1/b2 + 1/c2 + 1/d2)
ci_lower2 = np.exp(np.log(or_centroid) - 1.96 * se_log_or2)
ci_upper2 = np.exp(np.log(or_centroid) + 1.96 * se_log_or2)
chi2_2, p_val_chi2, _, _ = stats.chi2_contingency([[a2, b2], [c2, d2]])

# 4. Multicollinearity (VIF with add_constant)
vif_features = [
    'f0_hz', 'spectral_centroid', 'zero_crossing_rate', 'rms_energy',
    'burst_duration_sec', 'mfcc_1', 'mfcc_2', 'mfcc_3', 'mfcc_4'
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

# 5. Machine Learning Modeling (Multi-Class 5-Way Classification)
acoustic_features = [
    'f0_hz', 'spectral_centroid', 'zero_crossing_rate', 'rms_energy',
    'burst_duration_sec', 'mfcc_1', 'mfcc_2', 'mfcc_3', 'mfcc_4',
    'mfcc_5', 'mfcc_6', 'mfcc_7', 'mfcc_8'
]
X = df[acoustic_features]
y_multi = df['cry_class_id'] # 0: hunger, 1: belly_pain, 2: tired, 3: discomfort, 4: burping
y_binary = df['colic_or_pain']

# 80/20 Stratified Split
X_train, X_test, y_train, y_test = train_test_split(
    X, y_multi, test_size=0.20, random_state=42, stratify=y_multi
)
n_train = len(X_train)
n_test = len(X_test)

# Multi-class Models
rf_multi = RandomForestClassifier(n_estimators=150, max_depth=8, class_weight='balanced', random_state=42)
gbm_multi = GradientBoostingClassifier(n_estimators=120, max_depth=4, learning_rate=0.08, random_state=42)
lr_multi = LogisticRegression(class_weight='balanced', max_iter=1000, random_state=42)

# 5-Fold Stratified CV on Training Set
skf = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
cv_results = {}
for name, clf in [('Rastgele Orman (RF)', rf_multi), ('Gradient Boosting (GBM)', gbm_multi), ('Lojistik Regresyon', lr_multi)]:
    scores = cross_validate(clf, X_train, y_train, cv=skf, scoring=['accuracy', 'f1_macro'])
    cv_results[name] = {
        'accuracy_mean': round(float(np.mean(scores['test_accuracy'])), 4),
        'f1_macro_mean': round(float(np.mean(scores['test_f1_macro'])), 4)
    }

# Train Final Best Multi-class Model (RF)
rf_multi.fit(X_train, y_train)
y_pred_multi = rf_multi.predict(X_test)
y_proba_multi = rf_multi.predict_proba(X_test)

cm_multi = confusion_matrix(y_test, y_pred_multi).tolist()

multi_metrics = {
    'accuracy': round(float(accuracy_score(y_test, y_pred_multi)), 4),
    'f1_macro': round(float(f1_score(y_test, y_pred_multi, average='macro')), 4),
    'f1_weighted': round(float(f1_score(y_test, y_pred_multi, average='weighted')), 4),
    'roc_auc_ovr': round(float(roc_auc_score(y_test, y_proba_multi, multi_class='ovr')), 4),
    'confusion_matrix': cm_multi
}

# 6. Binary Colic/Pain Screening Model (Detection of Severe Distress)
y_train_bin = (y_train == 1).astype(int)
y_test_bin = (y_test == 1).astype(int)

rf_bin = RandomForestClassifier(n_estimators=120, max_depth=6, class_weight='balanced', random_state=42)
rf_bin.fit(X_train, y_train_bin)
y_pred_bin = rf_bin.predict(X_test)
y_proba_bin = rf_bin.predict_proba(X_test)[:, 1]

cm_bin = confusion_matrix(y_test_bin, y_pred_bin)
tn_b, fp_b, fn_b, tp_b = cm_bin.ravel()

binary_pain_metrics = {
    'accuracy': round(float(accuracy_score(y_test_bin, y_pred_bin)), 4),
    'recall': round(float(recall_score(y_test_bin, y_pred_bin)), 4),
    'precision': round(float(precision_score(y_test_bin, y_pred_bin)), 4),
    'f1_score': round(float(f1_score(y_test_bin, y_pred_bin)), 4),
    'roc_auc': round(float(roc_auc_score(y_test_bin, y_proba_bin)), 4),
    'confusion_matrix': {
        'tn': int(tn_b),
        'fp': int(fp_b),
        'fn': int(fn_b),
        'tp': int(tp_b)
    }
}

# 7. Feature Importance Ranking
importances = rf_multi.feature_importances_
feat_ranks = sorted(zip(acoustic_features, importances), key=lambda x: x[1], reverse=True)
sfs_ranking = [{'feature': f, 'importance_pct': round(float(imp * 100), 2)} for f, imp in feat_ranks]

# Assemble Results
results = {
    'dataset': 'Baby Cry Audio Spectrogram & Acoustic Biomarker Corpus',
    'dataset_source': 'DonateACry Corpus & Menna Ahmed Baby Cry Benchmark',
    'sample_size': n_total,
    'n_train': n_train,
    'n_test': n_test,
    'class_distribution': class_counts,
    'colic_or_pain_cases': pain_cases,
    'colic_or_pain_pct': pain_pct,
    'welch_ttests': {
        'f0_pain_vs_other': {
            'mean_pain_hz': round(float(np.mean(f0_pain)), 1),
            'mean_other_hz': round(float(np.mean(f0_other)), 1),
            'diff_hz': round(float(np.mean(f0_pain) - np.mean(f0_other)), 1),
            't_stat': round(float(t_stat_f0), 2),
            'p_value': float(p_val_f0)
        },
        'spectral_centroid_pain_vs_other': {
            'mean_pain_hz': round(float(np.mean(sc_pain)), 1),
            'mean_other_hz': round(float(np.mean(sc_other)), 1),
            'diff_hz': round(float(np.mean(sc_pain) - np.mean(sc_other)), 1),
            't_stat': round(float(t_stat_sc), 2),
            'p_value': float(p_val_sc)
        },
        'rms_pain_vs_other': {
            'mean_pain': round(float(np.mean(rms_pain)), 3),
            'mean_other': round(float(np.mean(rms_other)), 3),
            't_stat': round(float(t_stat_rms), 2),
            'p_value': float(p_val_rms)
        }
    },
    'odds_ratios': {
        'high_pitch_on_pain': {
            'or': round(float(or_pitch), 2),
            'ci_lower': round(float(ci_lower1), 2),
            'ci_upper': round(float(ci_upper1), 2),
            'p_value': float(p_val_chi1),
            'chi2': round(float(chi2_1), 2),
            'table': {'tp': int(a1), 'fp': int(b1), 'fn': int(c1), 'tn': int(d1)}
        },
        'high_centroid_on_pain': {
            'or': round(float(or_centroid), 2),
            'ci_lower': round(float(ci_lower2), 2),
            'ci_upper': round(float(ci_upper2), 2),
            'p_value': float(p_val_chi2),
            'chi2': round(float(chi2_2), 2),
            'table': {'tp': int(a2), 'fp': int(b2), 'fn': int(c2), 'tn': int(d2)}
        }
    },
    'vif_table': vif_data,
    'cv_metrics': cv_results,
    'multi_class_metrics': multi_metrics,
    'binary_pain_screening': binary_pain_metrics,
    'feature_ranking': sfs_ranking
}

out_json = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\pipelines\baby_cry_audio_results.json'
with open(out_json, 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"Results successfully saved to {out_json}")
print("Multi-Class Accuracy:", multi_metrics['accuracy'])
print("Multi-Class F1 Macro:", multi_metrics['f1_macro'])
print("Multi-Class ROC-AUC (OvR):", multi_metrics['roc_auc_ovr'])
print("Binary Pain Screening Recall:", binary_pain_metrics['recall'])
print("Binary Pain Confusion Matrix:", binary_pain_metrics['confusion_matrix'])
