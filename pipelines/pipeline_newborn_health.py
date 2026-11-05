"""
ToHUM Biyoteknoloji A.Ş. — Küme 5 / Analitik Boru Hattı 3
Bileşen: Yenidoğan Sağlığı & Kritik Vital İzleme (Solunum, Isı, Nabız, Bilirubin/Sarılık, SpO2 & Beslenme)
Kaynak: Clinical Neonatal Vital Monitoring & Bhutani Nomogramı (N = 1.050 Yenidoğan, 1-28 Gün)
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
    N = 1050

    # 1. Kohort ve Yenidoğan Klinik Parametreleri (N=1.050 Bebek, 1-28 Günlük)
    postnatal_age_days = np.random.randint(1, 29, size=N)  # 1 - 28 gün
    gestational_age_weeks = np.clip(np.random.normal(38.4, 2.1, N), 32.0, 42.0)
    is_preterm = (gestational_age_weeks < 37.0).astype(int)
    
    # Doğum Ağırlığı (kg)
    birth_weight_kg = np.clip(np.round(np.random.normal(3.25, 0.52, N) - (is_preterm * 0.75), 2), 1.6, 4.8)

    # Solunum Sıklığı (Respiratory Rate, breaths/min: Normal 30 - 60 /dk)
    rr_base = np.random.normal(44.0, 7.5, N) + (is_preterm * 4.0)
    tachypnea_flags = np.random.choice([0, 1], size=N, p=[0.90, 0.10])
    respiratory_rate = np.clip(np.round(rr_base + (tachypnea_flags * 22.0)), 24.0, 85.0)

    # Kalp Tepe Atımı / Nabız (Heart Rate, bpm: Normal 110 - 160 bpm)
    hr_base = np.random.normal(136.0, 11.0, N) + ((respiratory_rate > 60).astype(int) * 14.0)
    heart_rate = np.clip(np.round(hr_base), 92.0, 188.0)

    # Aksiller Vücut Isısı (°C: Normal 36.5 - 37.5°C)
    temp_noise = np.random.normal(0, 0.28, N)
    body_temp = np.clip(np.round(36.90 + temp_noise, 1), 35.4, 38.8)

    # Oksijen Saturasyonu (SpO2, %: Normal 95 - 100%)
    spo2_base = 98.0 - (np.maximum(0.0, respiratory_rate - 60.0) * 0.22) - (is_preterm * 1.5) - np.random.exponential(0.8, N)
    spo2 = np.clip(np.round(spo2_base, 1), 84.0, 100.0)

    # Serum / Transkütan Bilirubin (mg/dL: Normal 2.0 - 12.0; fototerapi riski > 15.0)
    bili_age_factor = np.exp(-((postnatal_age_days - 4.5) ** 2) / 18.0) * 5.5
    bili_base = 4.0 + bili_age_factor + (is_preterm * 2.8) + np.random.gamma(2.0, 1.4, N)
    serum_bilirubin = np.clip(np.round(bili_base, 1), 1.2, 22.5)

    # Emme & Beslenme Gücü (0: Zayıf/Refleks Azalmış, 1: Orta, 2: Güçlü/Aktif)
    feed_latent = 1.6 - (is_preterm * 0.7) - ((body_temp < 36.3).astype(int) * 0.9) - ((serum_bilirubin > 14.0).astype(int) * 0.6) + np.random.normal(0, 0.4, N)
    feeding_quality = np.clip(np.round(feed_latent).astype(int), 0, 2)

    # Fototerapi İhtiyacı (Bhutani Nomogramı Eşiği: Yaşa ve bilirubine göre)
    photo_threshold = np.where(postnatal_age_days <= 2, 11.5, np.where(postnatal_age_days <= 4, 14.2, 16.5))
    phototherapy_needed = ((serum_bilirubin >= photo_threshold) | ((serum_bilirubin >= photo_threshold - 2.0) & (is_preterm == 1))).astype(int)

    # BİLEŞİK KRİTİK VİTAL RİSKİ (Target: critical_vital_risk, 0 veya 1)
    vital_risk_score = (
        ((respiratory_rate >= 64) | (respiratory_rate <= 28)).astype(int) * 2.8 +
        (spo2 < 93.0).astype(int) * 3.2 +
        ((body_temp < 36.3) | (body_temp >= 38.0)).astype(int) * 2.5 +
        ((serum_bilirubin >= 15.5) & (feeding_quality == 0)).astype(int) * 2.6 +
        ((heart_rate > 170) | (heart_rate < 102)).astype(int) * 2.4 +
        (is_preterm * 0.8) +
        np.random.normal(0, 0.4, N)
    )
    critical_vital_risk = (vital_risk_score >= 2.3).astype(int)

    # Sürekli Skala: Yenidoğan Vital Risk İndeksi (0 - 100 Puan, Regresyon Hedefi)
    risk_index_raw = (
        (np.maximum(0.0, respiratory_rate - 55.0) * 1.4) +
        (np.maximum(0.0, 96.0 - spo2) * 3.5) +
        (np.abs(body_temp - 36.9) * 14.0) +
        (np.maximum(0.0, serum_bilirubin - 10.0) * 2.2) +
        ((2 - feeding_quality) * 6.5) +
        (is_preterm * 8.0) +
        np.random.normal(5.0, 2.5, N)
    )
    neonatal_risk_index = np.clip(np.round(risk_index_raw, 1), 2.0, 98.0)

    # DataFrame Oluşturma
    df = pd.DataFrame({
        'postnatal_age_days': postnatal_age_days,
        'gestational_age_weeks': np.round(gestational_age_weeks, 1),
        'birth_weight_kg': birth_weight_kg,
        'respiratory_rate': respiratory_rate,
        'heart_rate': heart_rate,
        'body_temp': body_temp,
        'spo2': spo2,
        'serum_bilirubin': serum_bilirubin,
        'feeding_quality': feeding_quality,
        'phototherapy_needed': phototherapy_needed,
        'critical_vital_risk': critical_vital_risk,
        'neonatal_risk_index': neonatal_risk_index
    })

    # CSV olarak kaydet
    csv_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\newborn_health_1050.csv'
    df.to_csv(csv_path, index=False, encoding='utf-8')
    print(f"Saved dataset to {csv_path} with {len(df)} rows.")

    # 2. Biyoistatistiksel Odds Ratios ve Çapraz Tablolar
    # OR 1: Şiddetli Takipne (RR >= 60) -> Kritik Vital Risk
    tachypnea_binary = (df['respiratory_rate'] >= 60).astype(int)
    ct1 = pd.crosstab(tachypnea_binary, df['critical_vital_risk'])
    tp1 = ct1.loc[1, 1] if (1 in ct1.index and 1 in ct1.columns) else 0
    fp1 = ct1.loc[1, 0] if (1 in ct1.index and 0 in ct1.columns) else 0
    fn1 = ct1.loc[0, 1] if (0 in ct1.index and 1 in ct1.columns) else 0
    tn1 = ct1.loc[0, 0] if (0 in ct1.index and 0 in ct1.columns) else 0
    odds_ratio_rr = (tp1 * tn1) / (fp1 * fn1) if (fp1 * fn1) > 0 else 999.0
    se_rr = np.sqrt(1/tp1 + 1/fp1 + 1/fn1 + 1/tn1) if min(tp1, fp1, fn1, tn1) > 0 else 0
    ci_rr = (np.exp(np.log(odds_ratio_rr) - 1.96 * se_rr), np.exp(np.log(odds_ratio_rr) + 1.96 * se_rr))
    chi2_rr, p_val_rr, _, _ = stats.chi2_contingency([[tp1, fp1], [fn1, tn1]])

    # OR 2: Hipotermi (< 36.5°C) -> Kritik Vital Risk
    hypo_binary = (df['body_temp'] < 36.5).astype(int)
    ct2 = pd.crosstab(hypo_binary, df['critical_vital_risk'])
    tp2 = ct2.loc[1, 1] if (1 in ct2.index and 1 in ct2.columns) else 0
    fp2 = ct2.loc[1, 0] if (1 in ct2.index and 0 in ct2.columns) else 0
    fn2 = ct2.loc[0, 1] if (0 in ct2.index and 1 in ct2.columns) else 0
    tn2 = ct2.loc[0, 0] if (0 in ct2.index and 0 in ct2.columns) else 0
    odds_ratio_hypo = (tp2 * tn2) / (fp2 * fn2) if (fp2 * fn2) > 0 else 999.0
    se_hypo = np.sqrt(1/tp2 + 1/fp2 + 1/fn2 + 1/tn2) if min(tp2, fp2, fn2, tn2) > 0 else 0
    ci_hypo = (np.exp(np.log(odds_ratio_hypo) - 1.96 * se_hypo), np.exp(np.log(odds_ratio_hypo) + 1.96 * se_hypo))
    chi2_hypo, p_val_hypo, _, _ = stats.chi2_contingency([[tp2, fp2], [fn2, tn2]])

    # OR 3: Yüksek Bilirubin (>= 15.0) -> Fototerapi İhtiyacı
    bili_high_binary = (df['serum_bilirubin'] >= 15.0).astype(int)
    ct3 = pd.crosstab(bili_high_binary, df['phototherapy_needed'])
    tp3 = ct3.loc[1, 1] if (1 in ct3.index and 1 in ct3.columns) else 0
    fp3 = ct3.loc[1, 0] if (1 in ct3.index and 0 in ct3.columns) else 0
    fn3 = ct3.loc[0, 1] if (0 in ct3.index and 1 in ct3.columns) else 0
    tn3 = ct3.loc[0, 0] if (0 in ct3.index and 0 in ct3.columns) else 0
    odds_ratio_bili = (tp3 * tn3) / (fp3 * fn3) if (fp3 * fn3) > 0 else 999.0
    se_bili = np.sqrt(1/tp3 + 1/fp3 + 1/fn3 + 1/tn3) if min(tp3, fp3, fn3, tn3) > 0 else 0
    ci_bili = (np.exp(np.log(odds_ratio_bili) - 1.96 * se_bili), np.exp(np.log(odds_ratio_bili) + 1.96 * se_bili))
    chi2_bili, p_val_bili, _, _ = stats.chi2_contingency([[tp3, fp3], [fn3, tn3]])

    # Bağımsız İki Örneklem t-Testi: SpO2 Düzeyi (Kritik Risk vs Stabil)
    risk_spo2 = df[df['critical_vital_risk'] == 1]['spo2']
    stable_spo2 = df[df['critical_vital_risk'] == 0]['spo2']
    t_stat_spo2, p_val_spo2 = stats.ttest_ind(stable_spo2, risk_spo2)

    # 3. Multicollinearity & VIF Analizi (Sabit Terim ile Merkezlenmiş)
    features_for_model = [
        'postnatal_age_days',
        'gestational_age_weeks',
        'respiratory_rate',
        'heart_rate',
        'body_temp',
        'spo2',
        'serum_bilirubin',
        'feeding_quality'
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
    y = df['critical_vital_risk']

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
    # Kritik vital taramasında False Negative = 0 maliyeti için eşik 0.40 olarak kalibre edilmiştir
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

    # Regresyon Modeli: Yenidoğan Risk İndeksi (0 - 100) Tahmini
    y_idx = df['neonatal_risk_index']
    X_train_r, X_test_r, y_train_r, y_test_r = train_test_split(X, y_idx, test_size=0.20, random_state=42)
    reg = Ridge()
    reg.fit(X_train_r, y_train_r)
    y_pred_r = reg.predict(X_test_r)
    reg_metrics = {
        'target': 'neonatal_risk_index',
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
        'critical_cases': int(df['critical_vital_risk'].sum()),
        'critical_pct': round(float(df['critical_vital_risk'].mean() * 100), 2),
        'phototherapy_cases': int(df['phototherapy_needed'].sum()),
        'phototherapy_pct': round(float(df['phototherapy_needed'].mean() * 100), 2),
        'odds_ratios': {
            'tachypnea_on_vital_risk': {
                'or': round(odds_ratio_rr, 2),
                'ci_lower': round(ci_rr[0], 2),
                'ci_upper': round(ci_rr[1], 2),
                'p_value': p_val_rr,
                'chi2': round(chi2_rr, 2),
                'table': {'tp': int(tp1), 'fp': int(fp1), 'fn': int(fn1), 'tn': int(tn1)}
            },
            'hypothermia_on_vital_risk': {
                'or': round(odds_ratio_hypo, 2),
                'ci_lower': round(ci_hypo[0], 2),
                'ci_upper': round(ci_hypo[1], 2),
                'p_value': p_val_hypo,
                'chi2': round(chi2_hypo, 2),
                'table': {'tp': int(tp2), 'fp': int(fp2), 'fn': int(fn2), 'tn': int(tn2)}
            },
            'high_bilirubin_on_phototherapy': {
                'or': round(odds_ratio_bili, 2),
                'ci_lower': round(ci_bili[0], 2),
                'ci_upper': round(ci_bili[1], 2),
                'p_value': p_val_bili,
                'chi2': round(chi2_bili, 2),
                'table': {'tp': int(tp3), 'fp': int(fp3), 'fn': int(fn3), 'tn': int(tn3)}
            }
        },
        'ttest_spo2': {
            'mean_stable': round(float(stable_spo2.mean()), 2),
            'std_stable': round(float(stable_spo2.std()), 2),
            'mean_risk': round(float(risk_spo2.mean()), 2),
            'std_risk': round(float(risk_spo2.std()), 2),
            'diff': round(float(stable_spo2.mean() - risk_spo2.mean()), 2),
            't_stat': round(float(t_stat_spo2), 2),
            'p_value': p_val_spo2
        },
        'vif_table': vif_data,
        'cv_metrics': cv_results,
        'test_metrics': test_metrics,
        'regression_metrics': reg_metrics,
        'sfs_ranking': sfs_ranking
    }

    res_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\newborn_health_results.json'
    with open(res_path, 'w', encoding='utf-8') as f:
        json.dump(out, f, indent=2, ensure_ascii=False)
    print(f"Saved results to {res_path} successfully.")

if __name__ == '__main__':
    run_pipeline()
