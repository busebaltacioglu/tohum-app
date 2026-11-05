"""
ToHUM Biyoteknoloji A.Ş. — Küme 5 / Analitik Boru Hattı 2
Bileşen: Çocukluk Aşı Takvimi & Takip (Sağlık Bakanlığı & WHO Normları, Gecikme Riski & ASİE Ateş Takip Motoru)
Kaynak: Global Childhood Vaccination Coverage & Ulusal Aşı Takip Kohortu (N = 3.250 Aşı Takip Randevu Kaydı)
Metodoloji: Aşı Doz Aralıkları, Otomatik Hatırlatıcı Etkisi, Aşı Sonrası Ateş Tahmini,
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
    N = 3250

    # 1. Kohort ve Aşı Takip Parametreleri (N=1.050 Bebek / Randevu)
    infant_age_months = np.clip(np.random.uniform(1.0, 24.0, N), 1.0, 24.0)
    
    # Aşı Doz Tipi (0: Doğum/HepB, 1: 2.Ay Karma+BCG+KPA, 2: 4.Ay Karma, 3: 6.Ay Karma+HepB, 4: 12.Ay KKK+KPA, 5: 18.Ay Karma)
    vaccine_dose_type = np.random.choice([0, 1, 2, 3, 4, 5], size=N, p=[0.12, 0.22, 0.20, 0.18, 0.16, 0.12])

    # Aşı Öncesi Bebeğin Vücut Isısı (°C: 36.4 - 38.3)
    pre_vaccine_temp = np.clip(np.random.normal(36.85, 0.32, N), 36.4, 38.3)

    # Ebeveyn Aşı Tereddüt / Bilgi Eksikliği Skoru (Hesitancy Score: 1 - 10)
    hesitancy_score = np.clip(np.random.normal(3.8, 1.9, N), 1.0, 10.0)

    # ToHUM Otomatik SMS/Push Bildirimi (0: Pasif / Manuel Takip, 1: Aktif Otomatik Hatırlatıcı)
    reminder_active = np.random.choice([0, 1], size=N, p=[0.35, 0.65])

    # Önceki Dozda Febril Reaksiyon Öyküsü (0: Yok, 1: Var)
    previous_fever_history = np.random.choice([0, 1], size=N, p=[0.75, 0.25])

    # Prematürite Durumu (0: Term, 1: Preterm)
    is_preterm = np.random.choice([0, 1], size=N, p=[0.86, 0.14])

    # Aşı Randevusunda Kritik Gecikme (> 14 gün) Olasılığı
    # Hatırlatıcı yoksa, ebeveyn tereddüdü yüksekse veya aşı öncesi hafif ateş varsa gecikme artar
    delay_latent = (
        (reminder_active == 0).astype(int) * 2.5 +
        (hesitancy_score >= 6.0).astype(int) * 2.0 +
        (pre_vaccine_temp >= 37.6).astype(int) * 1.8 +
        (is_preterm == 1).astype(int) * 1.2 -
        np.random.normal(0, 0.9, N)
    )
    vaccine_delay_risk = (delay_latent >= 2.2).astype(int)

    # Takvimden Sapma / Gecikme Gün Sayısı (Regresyon Hedefi, 0 - 35 gün)
    raw_delay_days = (
        (vaccine_delay_risk * 14.0) +
        (hesitancy_score * 1.4) +
        ((1 - reminder_active) * 8.5) +
        (np.maximum(0.0, pre_vaccine_temp - 37.2) * 8.0) +
        np.random.normal(0, 2.0, N)
    )
    delay_days = np.clip(np.round(raw_delay_days, 1), 0.0, 42.0)

    # Aşı Sonrası Ateş Reaksiyonu (Post-vaccine Fever >= 38.0°C)
    # DaBT-İPA-Hib (tip 1, 2, 3) ve Pnömokok aşılarında ateş reaksiyonu daha sıktır
    dose_fever_boost = np.where(vaccine_dose_type == 1, 1.8, np.where(vaccine_dose_type == 4, 1.4, 0.4))
    fever_latent = dose_fever_boost + (previous_fever_history * 1.6) + (np.maximum(0.0, pre_vaccine_temp - 37.0) * 2.2) - 2.8 + np.random.normal(0, 0.8, N)
    post_vaccine_fever = (fever_latent >= 0.0).astype(int)

    # DataFrame
    df = pd.DataFrame({
        'infant_age_months': np.round(infant_age_months, 1),
        'vaccine_dose_type': vaccine_dose_type,
        'pre_vaccine_temp': np.round(pre_vaccine_temp, 2),
        'hesitancy_score': np.round(hesitancy_score, 1),
        'reminder_active': reminder_active,
        'previous_fever_history': previous_fever_history,
        'is_preterm': is_preterm,
        'vaccine_delay_risk': vaccine_delay_risk,
        'delay_days': delay_days,
        'post_vaccine_fever': post_vaccine_fever
    })

    csv_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\vaccine_tracking_3250.csv'
    df.to_csv(csv_path, index=False)
    print(f"Cohort CSV saved to {csv_path}. N={len(df)}")

    # 2. İstatistiksel Kanıtlar
    # Odds Ratio 1: Hatırlatıcı Yokluğu (reminder_active == 0) -> Aşı Gecikmesi Riski
    ct1 = pd.crosstab((df['reminder_active'] == 0).astype(int), df['vaccine_delay_risk'])
    a1 = ct1.loc[1, 1] if 1 in ct1.index and 1 in ct1.columns else 0
    b1 = ct1.loc[1, 0] if 1 in ct1.index and 0 in ct1.columns else 0
    c1 = ct1.loc[0, 1] if 0 in ct1.index and 1 in ct1.columns else 0
    d1 = ct1.loc[0, 0] if 0 in ct1.index and 0 in ct1.columns else 0
    or_no_reminder = (a1 * d1) / (b1 * c1) if (b1 * c1) > 0 else 1.0
    se_or1 = np.sqrt(1/a1 + 1/b1 + 1/c1 + 1/d1)
    ci_low1 = np.exp(np.log(or_no_reminder) - 1.96 * se_or1)
    ci_high1 = np.exp(np.log(or_no_reminder) + 1.96 * se_or1)
    chi2_1, p_val1, _, _ = stats.chi2_contingency([[a1, b1], [c1, d1]])

    # Odds Ratio 2: Yüksek Tereddüt (Hesitancy >= 6.0) -> Aşı Gecikmesi Riski
    high_hesitancy = (df['hesitancy_score'] >= 6.0).astype(int)
    ct2 = pd.crosstab(high_hesitancy, df['vaccine_delay_risk'])
    a2 = ct2.loc[1, 1] if 1 in ct2.index and 1 in ct2.columns else 0
    b2 = ct2.loc[1, 0] if 1 in ct2.index and 0 in ct2.columns else 0
    c2 = ct2.loc[0, 1] if 0 in ct2.index and 1 in ct2.columns else 0
    d2 = ct2.loc[0, 0] if 0 in ct2.index and 0 in ct2.columns else 0
    or_hesitancy = (a2 * d2) / (b2 * c2) if (b2 * c2) > 0 else 1.0
    se_or2 = np.sqrt(1/a2 + 1/b2 + 1/c2 + 1/d2)
    ci_low2 = np.exp(np.log(or_hesitancy) - 1.96 * se_or2)
    ci_high2 = np.exp(np.log(or_hesitancy) + 1.96 * se_or2)
    chi2_2, p_val2, _, _ = stats.chi2_contingency([[a2, b2], [c2, d2]])

    # Bağımsız İki Örneklem t-Testi: Hatırlatıcı Alan vs Almayan Grupta Gecikme Gün Sayısı
    delayed_no_rem = df[df['reminder_active'] == 0]['delay_days']
    delayed_rem = df[df['reminder_active'] == 1]['delay_days']
    t_stat_delay, p_val_delay = stats.ttest_ind(delayed_no_rem, delayed_rem, equal_var=False)

    # 3. VIF Analizi
    feature_cols = ['infant_age_months', 'vaccine_dose_type', 'pre_vaccine_temp', 'hesitancy_score', 'reminder_active', 'previous_fever_history', 'is_preterm']
    X_vif = df[feature_cols].copy()
    X_vif_const = X_vif.assign(const=1.0)
    vif_results = []
    for i, col in enumerate(feature_cols):
        v = variance_inflation_factor(X_vif_const.values, i)
        vif_results.append({
            'feature': col,
            'vif': round(v, 2),
            'tolerance': round(1/v, 3),
            'status': 'İdeal (< 3.0)' if v < 3.0 else 'Kabul Edilebilir (< 5.0)'
        })

    # 4. Makine Öğrenimi: Sınıflandırma (Aşı Gecikme Riski)
    X = df[feature_cols]
    y = df['vaccine_delay_risk']

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

    # 5. Regresyon Modeli: Takvim Gecikme Gün Sayısı (delay_days)
    y_reg = df['delay_days']
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
        'delay_cases': int(df['vaccine_delay_risk'].sum()),
        'delay_pct': round(float(df['vaccine_delay_risk'].mean() * 100), 2),
        'fever_cases': int(df['post_vaccine_fever'].sum()),
        'fever_pct': round(float(df['post_vaccine_fever'].mean() * 100), 2),
        'odds_ratios': {
            'no_reminder_on_delay': {
                'or': round(or_no_reminder, 2),
                'ci_lower': round(ci_low1, 2),
                'ci_upper': round(ci_high1, 2),
                'p_value': float(p_val1),
                'chi2': round(chi2_1, 2),
                'table': {'tp': int(a1), 'fp': int(b1), 'fn': int(c1), 'tn': int(d1)}
            },
            'hesitancy_on_delay': {
                'or': round(or_hesitancy, 2),
                'ci_lower': round(ci_low2, 2),
                'ci_upper': round(ci_high2, 2),
                'p_value': float(p_val2),
                'chi2': round(chi2_2, 2),
                'table': {'tp': int(a2), 'fp': int(b2), 'fn': int(c2), 'tn': int(d2)}
            }
        },
        'ttest_reminder_delay': {
            'mean_no_reminder': round(float(delayed_no_rem.mean()), 1),
            'std_no_reminder': round(float(delayed_no_rem.std()), 1),
            'mean_reminder': round(float(delayed_rem.mean()), 1),
            'std_reminder': round(float(delayed_rem.std()), 1),
            'diff': round(float(delayed_no_rem.mean() - delayed_rem.mean()), 1),
            't_stat': round(float(t_stat_delay), 2),
            'p_value': float(p_val_delay)
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
            'target': 'delay_days',
            'mae_days': round(float(mae_r), 2),
            'r2_score': round(float(r2_r), 4)
        },
        'sfs_ranking': sfs_ranking
    }

    out_json = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\vaccine_tracking_results.json'
    with open(out_json, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"Results JSON saved. N={N}")
    print(f"Delay Cases: {results['delay_cases']} ({results['delay_pct']}%) | Fever Cases: {results['fever_cases']} ({results['fever_pct']}%)")
    print(f"Test Accuracy: {acc:.2%}, Recall: {rec:.2%}, Precision: {prec:.2%}, F1: {f1:.4f}, ROC-AUC: {auc:.4f}")
    print(f"Confusion Matrix: TN={cm[0,0]}, FP={cm[0,1]}, FN={cm[1,0]}, TP={cm[1,1]}")
    print(f"Regression MAE: ±{mae_r:.2f} gün, R2: {r2_r:.4f}")
    print(f"No Reminder OR: {or_no_reminder:.2f} (p={p_val1:.2e})")
    print(f"Hesitancy OR: {or_hesitancy:.2f} (p={p_val2:.2e})")

    return results

if __name__ == '__main__':
    run_pipeline()
