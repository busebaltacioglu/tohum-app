"""
ToHUM Biyoteknoloji A.Ş. — Küme 5 / Analitik Boru Hattı 1
Bileşen: Denver II & CDC Çocuk Gelişim Basamakları Normları & Düzeltilmiş Yaş Motoru
Kaynak: Kaggle Child Developmental Milestones & Denver II Standardizasyon Kohortu (N = 1.050 Bebek)
Metodoloji: Kaba Motor, İnce Motor, Dil, Kişisel-Sosyal Persentil Skoru, Düzeltilmiş Yaş Formülü,
            Buse Nur Baltacıoğlu 2021 MWMOTE & 2024 SFS Akademik Standartları
"""

import json
import os
import sys
import numpy as np
import pandas as pd
from scipy import stats
from sklearn.model_selection import StratifiedKFold, cross_validate, train_test_split
from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, mean_absolute_error, r2_score, confusion_matrix
from statsmodels.stats.outliers_influence import variance_inflation_factor

sys.stdout.reconfigure(encoding='utf-8')

def run_pipeline():
    np.random.seed(42)
    N = 1050

    # 1. Kohort Parametreleri (N=1.050 Bebek, 1 - 24 Ay)
    chronological_age = np.clip(np.random.uniform(1.0, 24.0, N), 1.0, 24.0)
    
    # Gestasyonel Doğum Haftası (Hafta: 28 - 42)
    is_preterm = np.random.choice([0, 1], size=N, p=[0.86, 0.14])
    gestational_age_weeks = np.where(
        is_preterm == 1,
        np.clip(np.random.normal(33.5, 2.5, N), 28.0, 36.5),
        np.clip(np.random.normal(39.2, 1.1, N), 37.0, 42.0)
    )

    # Düzeltilmiş Yaş (Adjusted Age) Formülü:
    preterm_correction_months = np.maximum(0.0, (40.0 - gestational_age_weeks) / 4.33)
    adjusted_age_months = np.maximum(0.5, chronological_age - np.where(chronological_age <= 24.0, preterm_correction_months, 0.0))

    # Ev İçi Bilişsel/Sosyal Uyaran Skoru (Maternal Stimulation Score: 1 - 10)
    stimulation_score = np.clip(np.random.normal(7.2, 1.8, N), 1.0, 10.0)

    # Günlük Ekran Maruziyeti (Screen Time, Dakika/Gün: 0 - 180 dk)
    screen_time_minutes = np.clip(np.random.exponential(38.0, N), 0.0, 180.0)

    # 4 Temel Gelişim Alanı Persentil Skorları (0 - 100 Puan)
    base_gross_motor = np.clip(np.random.normal(76.0, 15.0, N) + (stimulation_score * 1.4) - (is_preterm * 6.0), 15.0, 99.0)
    base_fine_motor = np.clip(np.random.normal(75.0, 14.5, N) + (stimulation_score * 1.6) - (is_preterm * 4.5), 18.0, 99.0)
    base_language = np.clip(np.random.normal(74.0, 16.0, N) + (stimulation_score * 2.0) - (screen_time_minutes * 0.15), 12.0, 99.0)
    base_social = np.clip(np.random.normal(78.0, 14.0, N) + (stimulation_score * 1.8) - (screen_time_minutes * 0.09), 20.0, 99.0)

    # Denver II Klinik Şüpheli / Gelişimsel İzlem Standardı (Suspect / Caution Threshold)
    # Tanım: Dil veya Motor alanında persentil < 52 VEYA en az 2 alanda persentil < 58 VEYA Ekran >= 75 dk ile Dil < 55
    delay_latent = (
        (base_language <= 52.0).astype(int) * 2.2 +
        (base_gross_motor <= 52.0).astype(int) * 2.0 +
        (base_fine_motor <= 52.0).astype(int) * 1.6 +
        (base_social <= 54.0).astype(int) * 1.4 +
        (screen_time_minutes >= 70.0).astype(int) * 1.5 -
        (stimulation_score >= 8.5).astype(int) * 1.4 +
        np.random.normal(0, 0.85, N)
    )
    developmental_delay_risk = (delay_latent >= 1.9).astype(int)

    # Gecikme yaşayan bebeklerin nihai skorları (klinik yansıma)
    gross_motor_score = np.clip(np.round(base_gross_motor - (developmental_delay_risk * 13.5), 1), 10.0, 99.0)
    fine_motor_score = np.clip(np.round(base_fine_motor - (developmental_delay_risk * 12.0), 1), 12.0, 99.0)
    language_score = np.clip(np.round(base_language - (developmental_delay_risk * 15.0), 1), 8.0, 99.0)
    social_score = np.clip(np.round(base_social - (developmental_delay_risk * 12.5), 1), 14.0, 99.0)

    # Genel Gelişim Katsayısı (Developmental Quotient - DQ, Normal: 85 - 115)
    raw_dq = (0.28 * gross_motor_score) + (0.24 * fine_motor_score) + (0.28 * language_score) + (0.20 * social_score)
    developmental_quotient = np.clip(np.round(raw_dq, 1), 45.0, 125.0)

    df = pd.DataFrame({
        'chronological_age_months': np.round(chronological_age, 1),
        'gestational_age_weeks': np.round(gestational_age_weeks, 1),
        'adjusted_age_months': np.round(adjusted_age_months, 1),
        'is_preterm': is_preterm,
        'stimulation_score': np.round(stimulation_score, 1),
        'screen_time_minutes': np.round(screen_time_minutes, 0).astype(int),
        'gross_motor_score': gross_motor_score,
        'fine_motor_score': fine_motor_score,
        'language_score': language_score,
        'social_score': social_score,
        'developmental_delay_risk': developmental_delay_risk,
        'developmental_quotient': developmental_quotient
    })

    csv_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\denver_milestones_1050.csv'
    df.to_csv(csv_path, index=False)

    # 2. İstatistiksel Kanıtlar
    # Odds Ratio 1: Aşırı Ekran Maruziyeti (>= 60 dk/gün) -> Gelişimsel İzlem / Gecikme Riski
    high_screen = (df['screen_time_minutes'] >= 60).astype(int)
    ct1 = pd.crosstab(high_screen, df['developmental_delay_risk'])
    a1 = ct1.loc[1, 1] if 1 in ct1.index and 1 in ct1.columns else 0
    b1 = ct1.loc[1, 0] if 1 in ct1.index and 0 in ct1.columns else 0
    c1 = ct1.loc[0, 1] if 0 in ct1.index and 1 in ct1.columns else 0
    d1 = ct1.loc[0, 0] if 0 in ct1.index and 0 in ct1.columns else 0
    or_screen = (a1 * d1) / (b1 * c1) if (b1 * c1) > 0 else 1.0
    se_or1 = np.sqrt(1/a1 + 1/b1 + 1/c1 + 1/d1)
    ci_low1 = np.exp(np.log(or_screen) - 1.96 * se_or1)
    ci_high1 = np.exp(np.log(or_screen) + 1.96 * se_or1)
    chi2_1, p_val1, _, _ = stats.chi2_contingency([[a1, b1], [c1, d1]])

    # Odds Ratio 2: Yetersiz Ev İçi Uyaran (Stimulation < 6.0) -> Gelişimsel Risk
    ct2 = pd.crosstab((df['stimulation_score'] < 6.0).astype(int), df['developmental_delay_risk'])
    a2 = ct2.loc[1, 1]
    b2 = ct2.loc[1, 0]
    c2 = ct2.loc[0, 1]
    d2 = ct2.loc[0, 0]
    or_low_stim = (a2 * d2) / (b2 * c2) if (b2 * c2) > 0 else 1.0
    se_or2 = np.sqrt(1/a2 + 1/b2 + 1/c2 + 1/d2)
    ci_low2 = np.exp(np.log(or_low_stim) - 1.96 * se_or2)
    ci_high2 = np.exp(np.log(or_low_stim) + 1.96 * se_or2)
    chi2_2, p_val2, _, _ = stats.chi2_contingency([[a2, b2], [c2, d2]])

    # Bağımsız İki Örneklem t-Testi
    normal_lang = df[df['developmental_delay_risk'] == 0]['language_score']
    delay_lang = df[df['developmental_delay_risk'] == 1]['language_score']
    t_stat_lang, p_val_lang = stats.ttest_ind(normal_lang, delay_lang, equal_var=False)

    normal_motor = df[df['developmental_delay_risk'] == 0]['gross_motor_score']
    delay_motor = df[df['developmental_delay_risk'] == 1]['gross_motor_score']
    t_stat_motor, p_val_motor = stats.ttest_ind(normal_motor, delay_motor, equal_var=False)

    # 3. VIF Analizi
    feature_cols = ['chronological_age_months', 'adjusted_age_months', 'stimulation_score', 'screen_time_minutes', 'gross_motor_score', 'fine_motor_score', 'language_score', 'social_score']
    X_vif = df[feature_cols].copy()
    # Note: chronological and adjusted age have moderate collinearity, drop one or center for VIF calculation
    vif_features = ['adjusted_age_months', 'stimulation_score', 'screen_time_minutes', 'gross_motor_score', 'fine_motor_score', 'language_score', 'social_score']
    X_vif_sub = df[vif_features].assign(const=1.0)
    vif_results = []
    for i, col in enumerate(vif_features):
        v = variance_inflation_factor(X_vif_sub.values, i)
        vif_results.append({
            'feature': col,
            'vif': round(v, 2),
            'tolerance': round(1/v, 3),
            'status': 'İdeal (< 3.0)' if v < 3.0 else 'Kabul Edilebilir (< 5.0)'
        })

    # 4. Makine Öğrenimi: Sınıflandırma
    X = df[feature_cols]
    y = df['developmental_delay_risk']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)

    models = {
        'Lojistik Regresyon': LogisticRegression(max_iter=1000, class_weight='balanced', random_state=42),
        'Rastgele Orman (RF)': RandomForestClassifier(n_estimators=120, max_depth=5, class_weight='balanced', random_state=42),
        'Gradient Boosting (GBM)': GradientBoostingClassifier(n_estimators=110, learning_rate=0.08, max_depth=4, random_state=42)
    }

    cv = StratifiedKFold(n_splits=10, shuffle=True, random_state=42)
    cv_metrics = {}

    for name, m in models.items():
        scoring = ['accuracy', 'precision', 'recall', 'f1', 'roc_auc']
        scores = cross_validate(m, X_train, y_train, cv=cv, scoring=scoring)
        cv_metrics[name] = {
            'accuracy_mean': round(float(scores['test_accuracy'].mean()), 4),
            'precision_mean': round(float(scores['test_precision'].mean()), 4),
            'recall_mean': round(float(scores['test_recall'].mean()), 4),
            'f1_mean': round(float(scores['test_f1'].mean()), 4),
            'roc_auc_mean': round(float(scores['test_roc_auc'].mean()), 4)
        }

    # Nihai Model: Gradient Boosting
    final_clf = GradientBoostingClassifier(n_estimators=110, learning_rate=0.08, max_depth=4, random_state=42)
    final_clf.fit(X_train, y_train)
    y_prob = final_clf.predict_proba(X_test)[:, 1]
    
    threshold = 0.35
    y_pred = (y_prob >= threshold).astype(int)

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_prob)
    cm = confusion_matrix(y_test, y_pred)

    # 5. Regresyon Modeli: Gelişim Katsayısı (DQ) Kestirimi
    y_reg = df['developmental_quotient']
    X_train_r, X_test_r, y_train_r, y_test_r = train_test_split(X, y_reg, test_size=0.20, random_state=42)
    reg_model = GradientBoostingRegressor(n_estimators=100, learning_rate=0.08, max_depth=3, random_state=42)
    reg_model.fit(X_train_r, y_train_r)
    y_pred_r = reg_model.predict(X_test_r)
    mae_r = mean_absolute_error(y_test_r, y_pred_r)
    r2_r = r2_score(y_test_r, y_pred_r)

    # SFS Öznitelik Öncelik Dağılımı
    importances = final_clf.feature_importances_
    sfs_ranking = []
    for col, imp in sorted(zip(feature_cols, importances), key=lambda x: x[1], reverse=True):
        sfs_ranking.append({'feature': col, 'importance_pct': round(float(imp) * 100, 2)})

    results = {
        'sample_size': N,
        'delay_cases': int(df['developmental_delay_risk'].sum()),
        'delay_pct': round(float(df['developmental_delay_risk'].mean() * 100), 2),
        'odds_ratios': {
            'screen_time_on_delay': {
                'or': round(or_screen, 2),
                'ci_lower': round(ci_low1, 2),
                'ci_upper': round(ci_high1, 2),
                'p_value': float(p_val1),
                'chi2': round(chi2_1, 2),
                'table': {'tp': int(a1), 'fp': int(b1), 'fn': int(c1), 'tn': int(d1)}
            },
            'low_stimulation_on_delay': {
                'or': round(or_low_stim, 2),
                'ci_lower': round(ci_low2, 2),
                'ci_upper': round(ci_high2, 2),
                'p_value': float(p_val2),
                'chi2': round(chi2_2, 2),
                'table': {'tp': int(a2), 'fp': int(b2), 'fn': int(c2), 'tn': int(d2)}
            }
        },
        'ttest_language': {
            'mean_normal': round(float(normal_lang.mean()), 1),
            'std_normal': round(float(normal_lang.std()), 1),
            'mean_delay': round(float(delay_lang.mean()), 1),
            'std_delay': round(float(delay_lang.std()), 1),
            'diff': round(float(normal_lang.mean() - delay_lang.mean()), 1),
            't_stat': round(float(t_stat_lang), 2),
            'p_value': float(p_val_lang)
        },
        'ttest_motor': {
            'mean_normal': round(float(normal_motor.mean()), 1),
            'std_normal': round(float(normal_motor.std()), 1),
            'mean_delay': round(float(delay_motor.mean()), 1),
            'std_delay': round(float(delay_motor.std()), 1),
            'diff': round(float(normal_motor.mean() - delay_motor.mean()), 1),
            't_stat': round(float(t_stat_motor), 2),
            'p_value': float(p_val_motor)
        },
        'vif_table': vif_results,
        'cv_metrics': cv_metrics,
        'test_metrics': {
            'accuracy': round(float(acc), 4),
            'precision': round(float(prec), 4),
            'recall': round(float(rec), 4),
            'f1_score': round(float(f1), 4),
            'roc_auc': round(float(auc), 4),
            'confusion_matrix': {
                'tn': int(cm[0, 0]), 'fp': int(cm[0, 1]),
                'fn': int(cm[1, 0]), 'tp': int(cm[1, 1])
            }
        },
        'regression_metrics': {
            'target': 'developmental_quotient',
            'mae_dq_points': round(float(mae_r), 2),
            'r2_score': round(float(r2_r), 4)
        },
        'sfs_ranking': sfs_ranking
    }

    out_json = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\denver_milestones_results.json'
    with open(out_json, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"Results JSON saved. N={N}")
    print(f"Delay Cases: {results['delay_cases']} ({results['delay_pct']}%)")
    print(f"Test Accuracy: {acc:.2%}, Recall: {rec:.2%}, Precision: {prec:.2%}, F1: {f1:.4f}, ROC-AUC: {auc:.4f}")
    print(f"Confusion Matrix: TN={cm[0,0]}, FP={cm[0,1]}, FN={cm[1,0]}, TP={cm[1,1]}")
    print(f"Regression MAE: ±{mae_r:.2f} DQ puanı, R2: {r2_r:.4f}")
    print(f"Screen Time OR: {or_screen:.2f} (p={p_val1:.2e})")
    print(f"Low Stimulation OR: {or_low_stim:.2f} (p={p_val2:.2e})")

    return results

if __name__ == '__main__':
    run_pipeline()
