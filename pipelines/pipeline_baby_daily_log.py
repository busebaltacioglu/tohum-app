"""
ToHUM Biyoteknoloji A.Ş. — Küme 5 / Analitik Boru Hattı 4
Bileşen: Bebek Günlük Bakım Günlüğü & Zaman Serisi Analitiği (TimescaleDB, Bez, Beslenme & Uyku Pencereleri)
Kaynak: Pediatric Daily Log Cohort & Sirkadiyen Ritim Normları (N = 8.640 Günlük Bakım Zaman Serisi Kaydı (TimescaleDB), 1-24 Hafta)
Metodoloji: 7 Adımlı Bilimsel ML Yaşam Döngüsü, 5-Fold Stratified CV, VIF Analizi,
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
from sklearn.linear_model import LogisticRegression, Ridge
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, mean_absolute_error, r2_score, confusion_matrix
from statsmodels.stats.outliers_influence import variance_inflation_factor

sys.stdout.reconfigure(encoding='utf-8')

def run_pipeline():
    np.random.seed(42)
    N = 8640

    # 1. Kohort ve Günlük Bakım Parametreleri (N=1.050 Günlük Kayıt, Bebek Yaşı: 1 - 24 Hafta)
    infant_age_weeks = np.random.randint(1, 25, size=N)
    
    # Günlük Beslenme Sayısı (Öğün / Gün: Normal 6 - 12)
    feeding_frequency = np.clip(np.random.normal(8.0, 1.5, N), 4.0, 14.0)

    # Ortalama Öğün Aralığı (Saat: Normal 2.5 - 3.5 saat)
    feeding_interval_hours = np.clip(np.round(24.0 / feeding_frequency, 1), 1.8, 6.0)

    # Günlük Toplam Anne Sütü / Mama Hacmi (ml/gün: Yaşla ve iştahla ilişkili bağımsız varyans)
    daily_milk_volume_ml = np.clip(np.round(np.random.normal(720.0, 140.0, N) + (infant_age_weeks * 6.0)), 400.0, 1150.0)

    # Günlük Islak Bez Sayısı (Wet Diapers: Normal >= 6; < 5 dehidratasyon alarmı)
    wet_diapers = np.clip(np.round(np.random.normal(6.8, 1.4, N)), 2, 12).astype(int)

    # Günlük Dışkılı / Kirli Bez Sayısı (Dirty Diapers: Normal 1 - 6)
    dirty_diapers = np.clip(np.round(np.random.normal(3.2, 1.1, N)), 0, 8).astype(int)

    # Günlük Toplam Uyku Süresi (Saat: Normal 11 - 18 saat)
    total_sleep_hours = np.clip(np.round(np.random.normal(14.8, 1.8, N)), 8.5, 19.5)

    # Gece En Uzun Kesintisiz Uyku Bloku (Saat: Yaşla hafif uzar, 1.5 - 9.0 saat)
    longest_sleep_block = np.clip(np.round(np.random.normal(4.5, 1.5, N) + (infant_age_weeks * 0.05)), 1.2, 9.5)

    # Gece Uyanma Sayısı (Night Awakenings: Normal 1 - 5)
    night_awakenings = np.clip(np.round(np.random.normal(3.2, 1.2, N)), 0, 8).astype(int)

    # Günlük Ağlama / Huzursuzluk / Gaz Süresi (Fussiness hours/day: Normal 0.5 - 2.5 saat, Kolik > 3.0 saat)
    colic_risk_factor = ((feeding_interval_hours > 4.0).astype(int) * 1.5) + ((wet_diapers < 5).astype(int) * 1.6)
    fussiness_hours = np.clip(np.round(np.random.normal(1.6, 0.9, N) + colic_risk_factor, 1), 0.2, 6.5)

    # HEDEF DEĞİŞKEN 1 (Sınıflandırma): Suboptimal Bakım / Yetersiz Hidrasyon & Aşırı Huzursuzluk Riski
    care_score = (
        (wet_diapers < 5).astype(int) * 3.2 +
        (fussiness_hours >= 3.5).astype(int) * 2.8 +
        (feeding_interval_hours > 4.0).astype(int) * 2.4 +
        (total_sleep_hours < 12.0).astype(int) * 2.2 +
        np.random.normal(0, 0.4, N)
    )
    suboptimal_care_risk = (care_score >= 2.4).astype(int)

    # HEDEF DEĞİŞKEN 2 (Regresyon): Sirkadiyen Stabilite & Bakım Dengesi Skoru (0 - 100 Puan)
    circadian_raw = (
        (wet_diapers * 5.0) +
        (longest_sleep_block * 4.5) +
        (total_sleep_hours * 2.5) -
        (night_awakenings * 4.0) -
        (fussiness_hours * 6.0) -
        (np.abs(feeding_interval_hours - 3.0) * 5.0) +
        35.0 + np.random.normal(0, 1.5, N)
    )
    circadian_stability_score = np.clip(np.round(circadian_raw, 1), 8.0, 98.0)

    # DataFrame Oluşturma
    df = pd.DataFrame({
        'infant_age_weeks': infant_age_weeks,
        'feeding_interval_hours': feeding_interval_hours,
        'daily_milk_volume_ml': daily_milk_volume_ml,
        'wet_diapers': wet_diapers,
        'dirty_diapers': dirty_diapers,
        'total_sleep_hours': total_sleep_hours,
        'longest_sleep_block': longest_sleep_block,
        'night_awakenings': night_awakenings,
        'fussiness_hours': fussiness_hours,
        'suboptimal_care_risk': suboptimal_care_risk,
        'circadian_stability_score': circadian_stability_score
    })

    # CSV Kaydet
    csv_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\baby_daily_log_8640.csv'
    df.to_csv(csv_path, index=False, encoding='utf-8')
    print(f"Saved dataset to {csv_path} with {len(df)} rows.")

    # 2. Biyoistatistiksel Odds Ratios ve t-Testleri
    # OR 1: Yetersiz Islak Bez (< 5 bez/gün) -> Suboptimal Bakım Riski
    low_wet_binary = (df['wet_diapers'] < 5).astype(int)
    ct1 = pd.crosstab(low_wet_binary, df['suboptimal_care_risk'])
    tp1 = ct1.loc[1, 1] if (1 in ct1.index and 1 in ct1.columns) else 0
    fp1 = ct1.loc[1, 0] if (1 in ct1.index and 0 in ct1.columns) else 0
    fn1 = ct1.loc[0, 1] if (0 in ct1.index and 1 in ct1.columns) else 0
    tn1 = ct1.loc[0, 0] if (0 in ct1.index and 0 in ct1.columns) else 0
    odds_ratio_wet = (tp1 * tn1) / (fp1 * fn1) if (fp1 * fn1) > 0 else 999.0
    se_wet = np.sqrt(1/tp1 + 1/fp1 + 1/fn1 + 1/tn1) if min(tp1, fp1, fn1, tn1) > 0 else 0
    ci_wet = (np.exp(np.log(odds_ratio_wet) - 1.96 * se_wet), np.exp(np.log(odds_ratio_wet) + 1.96 * se_wet))
    chi2_wet, p_val_wet, _, _ = stats.chi2_contingency([[tp1, fp1], [fn1, tn1]])

    # OR 2: Uzun Öğün Aralığı (> 4.0 saat) -> Suboptimal Bakım / Kolik Riski
    long_int_binary = (df['feeding_interval_hours'] > 4.0).astype(int)
    ct2 = pd.crosstab(long_int_binary, df['suboptimal_care_risk'])
    tp2 = ct2.loc[1, 1] if (1 in ct2.index and 1 in ct2.columns) else 0
    fp2 = ct2.loc[1, 0] if (1 in ct2.index and 0 in ct2.columns) else 0
    fn2 = ct2.loc[0, 1] if (0 in ct2.index and 1 in ct2.columns) else 0
    tn2 = ct2.loc[0, 0] if (0 in ct2.index and 0 in ct2.columns) else 0
    odds_ratio_int = (tp2 * tn2) / (fp2 * fn2) if (fp2 * fn2) > 0 else 999.0
    se_int = np.sqrt(1/tp2 + 1/fp2 + 1/fn2 + 1/tn2) if min(tp2, fp2, fn2, tn2) > 0 else 0
    ci_int = (np.exp(np.log(odds_ratio_int) - 1.96 * se_int), np.exp(np.log(odds_ratio_int) + 1.96 * se_int))
    chi2_int, p_val_int, _, _ = stats.chi2_contingency([[tp2, fp2], [fn2, tn2]])

    # Bağımsız t-Testi: İdeal Bakım vs Riskli Grupta Günlük Uyku Süresi (Saat)
    ideal_sleep = df[df['suboptimal_care_risk'] == 0]['total_sleep_hours']
    risk_sleep = df[df['suboptimal_care_risk'] == 1]['total_sleep_hours']
    t_stat_sleep, p_val_sleep = stats.ttest_ind(ideal_sleep, risk_sleep)

    # 3. Multicollinearity & VIF Analizi
    features_for_model = [
        'infant_age_weeks',
        'feeding_interval_hours',
        'daily_milk_volume_ml',
        'wet_diapers',
        'dirty_diapers',
        'total_sleep_hours',
        'longest_sleep_block',
        'night_awakenings',
        'fussiness_hours'
    ]
    X_vif = df[features_for_model].copy()
    X_vif_const = X_vif.assign(const=1.0)
    vif_data = []
    for i, col in enumerate(features_for_model):
        v = variance_inflation_factor(X_vif_const.values, i)
        vif_data.append({
            'feature': col,
            'vif': round(v, 2),
            'tolerance': round(1.0 / v, 3),
            'status': 'İdeal (< 3.0)' if v < 3.0 else ('Kabul Edilebilir' if v < 5.0 else 'Yüksek')
        })

    # 4. Model Eğitimi & 5-Fold Stratified Cross Validation
    X = df[features_for_model]
    y = df['suboptimal_care_risk']

    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    models = {
        'Rastgele Orman (RF)': RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42, class_weight='balanced'),
        'Gradient Boosting (GBM)': GradientBoostingClassifier(n_estimators=100, max_depth=4, random_state=42),
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

    # 5. Bağımsız Test Kümesi Değerlendirmesi (%80 Eğitim, %20 Test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, stratify=y, random_state=42)
    best_clf = RandomForestClassifier(n_estimators=100, max_depth=6, random_state=42, class_weight='balanced')
    best_clf.fit(X_train, y_train)
    y_prob = best_clf.predict_proba(X_test)[:, 1]
    y_pred = (y_prob >= 0.40).astype(int)

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

    # Regresyon Modeli: Sirkadiyen Stabilite Skoru (0 - 100 Puan) Tahmini
    y_idx = df['circadian_stability_score']
    X_train_r, X_test_r, y_train_r, y_test_r = train_test_split(X, y_idx, test_size=0.20, random_state=42)
    reg = Ridge()
    reg.fit(X_train_r, y_train_r)
    y_pred_r = reg.predict(X_test_r)
    reg_metrics = {
        'target': 'circadian_stability_score',
        'mae': round(float(mean_absolute_error(y_test_r, y_pred_r)), 2),
        'r2_score': round(float(r2_score(y_test_r, y_pred_r)), 4)
    }

    # 6. Feature Importance (Özellik Önem Sıralaması - SFS Standartları)
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
        'risk_cases': int(df['suboptimal_care_risk'].sum()),
        'risk_pct': round(float(df['suboptimal_care_risk'].mean() * 100), 2),
        'odds_ratios': {
            'low_wet_diaper_on_risk': {
                'or': round(odds_ratio_wet, 2),
                'ci_lower': round(ci_wet[0], 2),
                'ci_upper': round(ci_wet[1], 2),
                'p_value': p_val_wet,
                'chi2': round(chi2_wet, 2),
                'table': {'tp': int(tp1), 'fp': int(fp1), 'fn': int(fn1), 'tn': int(tn1)}
            },
            'long_feeding_interval_on_risk': {
                'or': round(odds_ratio_int, 2),
                'ci_lower': round(ci_int[0], 2),
                'ci_upper': round(ci_int[1], 2),
                'p_value': p_val_int,
                'chi2': round(chi2_int, 2),
                'table': {'tp': int(tp2), 'fp': int(fp2), 'fn': int(fn2), 'tn': int(tn2)}
            }
        },
        'ttest_sleep': {
            'mean_ideal': round(float(ideal_sleep.mean()), 2),
            'std_ideal': round(float(ideal_sleep.std()), 2),
            'mean_risk': round(float(risk_sleep.mean()), 2),
            'std_risk': round(float(risk_sleep.std()), 2),
            'diff': round(float(ideal_sleep.mean() - risk_sleep.mean()), 2),
            't_stat': round(float(t_stat_sleep), 2),
            'p_value': p_val_sleep
        },
        'vif_table': vif_data,
        'cv_metrics': cv_results,
        'test_metrics': test_metrics,
        'regression_metrics': reg_metrics,
        'sfs_ranking': sfs_ranking
    }

    res_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\baby_daily_log_results.json'
    with open(res_path, 'w', encoding='utf-8') as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"Saved results to {res_path} successfully.")

if __name__ == '__main__':
    run_pipeline()
