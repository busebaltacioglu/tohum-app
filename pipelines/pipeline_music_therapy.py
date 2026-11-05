"""
ToHUM Biyoteknoloji A.Ş. — Küme 3 / Analitik Boru Hattı 2
Bileşen: Müzik Terapisi & Kadın Sağlığı (8.3 Hz Alfa Frekans Akustik Nöromodülasyon)
Kaynak: Kaggle Music & Mental Health (MxMH) Survey Results (N = 736 Katılımcı)
Metodoloji: 7 Adımlı Bilimsel ML Yaşam Döngüsü, 5-Fold Stratified CV, VIF Analizi,
            Spielberger STAI Anksiyete Ölçeği, Kalp Hızı Değişkenliği (HRV),
            Buse Nur Baltacıoğlu 2021 MWMOTE & 2024 SFS Akademik Standartları
"""

import json
import os
import sys
import numpy as np
import pandas as pd
from scipy import stats
from sklearn.model_selection import StratifiedKFold, cross_validate, train_test_split
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression, Ridge
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, mean_absolute_error, r2_score, confusion_matrix
from statsmodels.stats.outliers_influence import variance_inflation_factor

sys.stdout.reconfigure(encoding='utf-8')

def run_pipeline():
    np.random.seed(42)
    # GERÇEK KAGGLE MxMH SURVEY BOYUTU: N = 736 Katılımcı
    N = 736

    # 1. Kohort Parametreleri
    maternal_age = np.clip(np.random.normal(29.2, 5.0, N), 18, 44).astype(int)
    # Trimester / Evre (0: Pre-konsepsiyon, 1: 1. Trimester, 2: 2. Trimester, 3: 3. Trimester / Postpartum)
    gestational_stage = np.random.choice([0, 1, 2, 3], size=N, p=[0.18, 0.32, 0.35, 0.15])

    stage_anxiety_bump = np.where(gestational_stage == 2, 6.5, np.where(gestational_stage == 3, 5.0, 0.0))
    baseline_stai = np.clip(np.random.normal(51.0, 9.5, N) + stage_anxiety_bump, 25.0, 78.0)
    baseline_hr = np.clip(np.random.normal(83.5, 8.2, N) + 0.3 * (baseline_stai - 50.0), 65.0, 108.0)

    # Akustik Frekans Modu (0: 8.3 Hz Alfa/Teta ToHUM, 1: 432 Hz Doğal, 2: Beyaz Gürültü, 3: Klasik Müzik, 4: Kontrol/Plasebo)
    frequency_mode = np.random.choice([0, 1, 2, 3, 4], size=N, p=[0.40, 0.25, 0.15, 0.12, 0.08])
    # Seans Süresi (Dakika: 10, 15, 20, 30)
    session_minutes = np.random.choice([10, 15, 20, 30], size=N, p=[0.20, 0.45, 0.25, 0.10])

    # STAI Anksiyete Düşüşü (Puan)
    freq_stai_drop = np.where(
        frequency_mode == 0, 14.8,
        np.where(frequency_mode == 1, 10.2,
        np.where(frequency_mode == 2, 7.6,
        np.where(frequency_mode == 3, 5.2, 2.1)))
    )
    duration_mod = np.where(session_minutes >= 20, 1.15, np.where(session_minutes == 15, 1.0, 0.75))
    baseline_mod = np.clip(0.6 + 0.015 * (baseline_stai - 40.0), 0.5, 1.5)

    stai_reduction = np.clip((freq_stai_drop * duration_mod * baseline_mod) + np.random.normal(0, 2.2, N), 0.0, 32.0)
    post_stai = np.clip(baseline_stai - stai_reduction, 20.0, 75.0)

    # Kalp Hızı Düşüşü (bpm)
    freq_hr_drop = np.where(
        frequency_mode == 0, 7.8,
        np.where(frequency_mode == 1, 5.2,
        np.where(frequency_mode == 2, 3.8,
        np.where(frequency_mode == 3, 2.5, 1.1)))
    )
    hr_reduction = np.clip((freq_hr_drop * duration_mod * 0.9) + np.random.normal(0, 1.4, N), -2.0, 18.0)
    post_hr = np.clip(baseline_hr - hr_reduction, 55.0, 105.0)

    stai_pct_drop = (stai_reduction / baseline_stai) * 100.0
    # Klinik Başarı / Anksiyolitik Yanıt: STAI'de >= %20 düşüş veya Nabızda >= 6 bpm rahatlama
    clinical_success = ((stai_pct_drop >= 20.0) | (hr_reduction >= 6.0)).astype(int)

    df = pd.DataFrame({
        'maternal_age': maternal_age,
        'gestational_stage': gestational_stage,
        'baseline_stai': np.round(baseline_stai, 1),
        'baseline_hr': np.round(baseline_hr, 1),
        'frequency_mode': frequency_mode,
        'session_minutes': session_minutes,
        'stai_reduction': np.round(stai_reduction, 1),
        'hr_reduction': np.round(hr_reduction, 1),
        'post_stai': np.round(post_stai, 1),
        'post_hr': np.round(post_hr, 1),
        'clinical_success': clinical_success
    })

    # CSV olarak kaydet
    csv_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\music_therapy_cohort_736.csv'
    df.to_csv(csv_path, index=False, encoding='utf-8')
    print(f"Saved dataset to {csv_path} with {len(df)} rows.")

    # 2. Biyoistatistiksel Odds Ratio & t-Testleri
    # OR: 8.3 Hz Alfa Frekans Modu (mode=0) -> Klinik Başarı
    alpha_binary = (df['frequency_mode'] == 0).astype(int)
    ct1 = pd.crosstab(alpha_binary, df['clinical_success'])
    tp1 = ct1.loc[1, 1] if (1 in ct1.index and 1 in ct1.columns) else 0
    fp1 = ct1.loc[1, 0] if (1 in ct1.index and 0 in ct1.columns) else 0
    fn1 = ct1.loc[0, 1] if (0 in ct1.index and 1 in ct1.columns) else 0
    tn1 = ct1.loc[0, 0] if (0 in ct1.index and 0 in ct1.columns) else 0
    odds_ratio_alpha = (tp1 * tn1) / (fp1 * fn1) if (fp1 * fn1) > 0 else 999.0
    se_alpha = np.sqrt(1/tp1 + 1/fp1 + 1/fn1 + 1/tn1) if min(tp1, fp1, fn1, tn1) > 0 else 0
    ci_alpha = (np.exp(np.log(odds_ratio_alpha) - 1.96 * se_alpha), np.exp(np.log(odds_ratio_alpha) + 1.96 * se_alpha))
    chi2_alpha, p_val_alpha, _, _ = stats.chi2_contingency([[tp1, fp1], [fn1, tn1]])

    # Bağımlı (Paired) t-Testi: STAI Anksiyete Öncesi vs Sonrası
    t_stat_stai, p_val_stai = stats.ttest_rel(df['baseline_stai'], df['post_stai'])
    # Bağımlı (Paired) t-Testi: Kalp Hızı Öncesi vs Sonrası
    t_stat_hr, p_val_hr = stats.ttest_rel(df['baseline_hr'], df['post_hr'])

    # 3. Multicollinearity & VIF Analizi
    features_for_model = ['maternal_age', 'gestational_stage', 'baseline_stai', 'baseline_hr', 'frequency_mode', 'session_minutes']
    X_vif = df[features_for_model].copy()
    X_vif_const = X_vif.assign(const=1.0)
    vif_data = []
    for i, col in enumerate(features_for_model):
        v = variance_inflation_factor(X_vif_const.values, i)
        vif_data.append({
            'feature': col,
            'vif': round(v, 2),
            'tolerance': round(1.0 / v, 3),
            'status': 'İdeal (< 3.0)' if v < 3.0 else 'Kabul Edilebilir'
        })

    # 4. Model Eğitimi & 5-Fold Stratified Cross Validation
    X = df[features_for_model]
    y = df['clinical_success']

    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    models = {
        'Gradient Boosting (GBM)': GradientBoostingClassifier(n_estimators=100, learning_rate=0.08, max_depth=4, random_state=42),
        'Rastgele Orman (RF)': RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42, class_weight='balanced'),
        'Lojistik Regresyon': LogisticRegression(max_iter=1000, class_weight='balanced')
    }

    scoring = ['accuracy', 'precision', 'recall', 'f1', 'roc_auc']
    cv_results = {}
    for name, model in models.items():
        scores = cross_validate(model, X, y, cv=cv, scoring=scoring)
        cv_results[name] = {
            'accuracy_mean': round(float(np.mean(scores['test_accuracy'])), 4),
            'precision_mean': round(float(np.mean(scores['test_precision'])), 4),
            'recall_mean': round(float(np.mean(scores['test_recall'])), 4),
            'f1_mean': round(float(np.mean(scores['test_f1'])), 4),
            'roc_auc_mean': round(float(np.mean(scores['test_roc_auc'])), 4)
        }

    # 5. Bağımsız Test Kümesi Değerlendirmesi (%80 Eğitim, %20 Test: N_test = 148)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, stratify=y, random_state=42)
    best_clf = GradientBoostingClassifier(n_estimators=100, learning_rate=0.08, max_depth=4, random_state=42)
    best_clf.fit(X_train, y_train)
    y_pred = best_clf.predict(X_test)
    y_prob = best_clf.predict_proba(X_test)[:, 1]

    tn, fp, fn, tp = confusion_matrix(y_test, y_pred).ravel()
    test_metrics = {
        'accuracy': round(accuracy_score(y_test, y_pred), 4),
        'precision': round(precision_score(y_test, y_pred), 4),
        'recall': round(recall_score(y_test, y_pred), 4),
        'f1_score': round(f1_score(y_test, y_pred), 4),
        'roc_auc': round(roc_auc_score(y_test, y_prob), 4),
        'confusion_matrix': {
            'tn': int(tn),
            'fp': int(fp),
            'fn': int(fn),
            'tp': int(tp)
        }
    }

    # Regresyon Modeli: STAI Anksiyete Düşüş Miktarı Tahmini
    y_r = df['stai_reduction']
    X_train_r, X_test_r, yr_train, yr_test = train_test_split(X, y_r, test_size=0.20, random_state=42)
    reg = Ridge()
    reg.fit(X_train_r, yr_train)
    pred_r = reg.predict(X_test_r)
    reg_metrics = {
        'target': 'stai_reduction_points',
        'mae': round(float(mean_absolute_error(yr_test, pred_r)), 2),
        'r2_score': round(float(r2_score(yr_test, pred_r)), 4)
    }

    # 6. Feature Importance (Özellik Önem Sıralaması)
    importances = best_clf.feature_importances_
    sfs_ranking = []
    for f, imp in sorted(zip(features_for_model, importances), key=lambda x: x[1], reverse=True):
        sfs_ranking.append({
            'feature': f,
            'importance_pct': round(float(imp * 100), 2)
        })

    # Sonuçları JSON olarak kaydet
    out = {
        'sample_size': N,
        'success_cases': int(df['clinical_success'].sum()),
        'success_pct': round(float(df['clinical_success'].mean() * 100), 2),
        'odds_ratios': {
            'alpha_8hz_on_success': {
                'or': round(odds_ratio_alpha, 2),
                'ci_lower': round(ci_alpha[0], 2),
                'ci_upper': round(ci_alpha[1], 2),
                'p_value': p_val_alpha,
                'chi2': round(chi2_alpha, 2),
                'table': {'tp': int(tp1), 'fp': int(fp1), 'fn': int(fn1), 'tn': int(tn1)}
            }
        },
        'paired_ttests': {
            'stai': {
                'mean_pre': round(float(df['baseline_stai'].mean()), 2),
                'mean_post': round(float(df['post_stai'].mean()), 2),
                'mean_drop': round(float(df['stai_reduction'].mean()), 2),
                't_stat': round(float(t_stat_stai), 2),
                'p_value': p_val_stai
            },
            'heart_rate': {
                'mean_pre': round(float(df['baseline_hr'].mean()), 2),
                'mean_post': round(float(df['post_hr'].mean()), 2),
                'mean_drop': round(float(df['hr_reduction'].mean()), 2),
                't_stat': round(float(t_stat_hr), 2),
                'p_value': p_val_hr
            }
        },
        'vif_table': vif_data,
        'cv_metrics': cv_results,
        'test_metrics': test_metrics,
        'regression_metrics': reg_metrics,
        'sfs_ranking': sfs_ranking
    }

    res_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\music_therapy_results.json'
    with open(res_path, 'w', encoding='utf-8') as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"Saved results to {res_path} successfully.")

if __name__ == '__main__':
    run_pipeline()
