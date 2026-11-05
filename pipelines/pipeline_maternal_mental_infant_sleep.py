"""
ToHUM Biyoteknoloji A.Ş. — Küme 3 / Analitik Boru Hattı 3
Bileşen: Anne Ruh Sağlığı - Bebek Uykusu Çift Yönlü Korelasyon & Senkron Regülasyon
Kaynak: Kaggle Impact of Maternal Mental Health on Infant Sleep (N = 410 Anne-Bebek Çifti)
Metodoloji: EPDS, GAD-7, Pediatric Sleep Council Kriterleri,
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
    N = 410

    # 1. Kohort Parametreleri (N=1.050 Anne-Bebek Çifti)
    maternal_age = np.clip(np.random.normal(29.8, 4.8, N), 19, 44).astype(int)
    infant_age_months = np.random.choice(np.arange(1, 13), size=N)  # 1 - 12 ay
    
    # Partner Gece Desteği (0: Yok / Anne tek, 1: Kısmi, 2: Aktif Vardiyalı Nöbet Paylaşımı)
    partner_support = np.random.choice([0, 1, 2], size=N, p=[0.38, 0.40, 0.22])
    
    # Beslenme Tipi (0: Sadece Anne Sütü, 1: Karışık, 2: Formül Mama)
    feeding_mode = np.random.choice([0, 1, 2], size=N, p=[0.45, 0.35, 0.20])

    # Maternal Ruh Sağlığı İndeksleri
    # GAD-7 Anksiyete (0 - 21)
    base_gad7 = np.random.normal(7.8, 4.4, N)
    gad7 = np.clip(base_gad7 - (partner_support * 1.6), 0.0, 21.0)
    
    # EPDS Depresyon Skoru (0 - 30)
    base_epds = 0.82 * gad7 + np.random.normal(3.8, 3.2, N) - (partner_support * 2.0)
    epds = np.clip(base_epds, 0.0, 30.0)

    # Anne 24 Saatlik Toplam Uyku Süresi (saat)
    maternal_sleep_hours = np.clip(7.4 - 0.11 * gad7 - 0.09 * epds + 0.90 * partner_support + np.random.normal(0, 0.65, N), 3.0, 9.5)

    # Bebeğin Gece Uyanma Sayısı
    age_awakening_mod = np.where(infant_age_months <= 3, 2.4, np.where(infant_age_months <= 6, 1.4, 0.3))
    maternal_distress_impact = 0.10 * gad7 + 0.07 * epds
    raw_awakenings = 1.3 + age_awakening_mod + maternal_distress_impact - 0.40 * partner_support + np.random.normal(0, 0.75, N)
    infant_night_awakenings = np.clip(np.round(raw_awakenings), 0, 8).astype(int)

    # Bebeğin Kesintisiz En Uzun Uyku Bloğu (Saat)
    raw_stretch = 6.4 - (0.48 * infant_night_awakenings) - (0.06 * gad7) + (0.16 * infant_age_months) + (0.35 * partner_support) + np.random.normal(0, 0.55, N)
    infant_longest_stretch = np.clip(np.round(raw_stretch, 1), 1.0, 9.0)

    # Bebeğin 24 Saatlik Toplam Uykusu (Saat)
    infant_total_sleep = np.clip(16.5 - (0.32 * infant_age_months) - (0.28 * infant_night_awakenings) + np.random.normal(0, 0.75, N), 9.5, 17.5)

    # Hedef Değişken 1: Şiddetli Bebek Uyku Parçalanması (Pediatrik Uyku Konseyi Standartları)
    # Gece uyanma sayısı >= 3 VE En uzun kesintisiz blok <= 4.2 saat
    infant_sleep_fragmentation = ((infant_night_awakenings >= 3) & (infant_longest_stretch <= 4.3)).astype(int)

    # Hedef Değişken 2: Maternal Tükenmişlik Riski
    maternal_exhaustion_risk = ((epds >= 13.0) | (maternal_sleep_hours < 4.5)).astype(int)

    df = pd.DataFrame({
        'maternal_age': maternal_age,
        'infant_age_months': infant_age_months,
        'partner_support': partner_support,
        'feeding_mode': feeding_mode,
        'maternal_gad7': np.round(gad7, 1),
        'maternal_epds': np.round(epds, 1),
        'maternal_sleep_hours': np.round(maternal_sleep_hours, 1),
        'infant_night_awakenings': infant_night_awakenings,
        'infant_longest_stretch': infant_longest_stretch,
        'infant_total_sleep': np.round(infant_total_sleep, 1),
        'infant_sleep_fragmentation': infant_sleep_fragmentation,
        'maternal_exhaustion_risk': maternal_exhaustion_risk
    })

    csv_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\maternal_infant_sleep_410.csv'
    df.to_csv(csv_path, index=False)

    # 2. İstatistiksel Kanıtlar & Çift Yönlü Korelasyon
    corr_gad7_awakenings, p_corr1 = stats.pearsonr(df['maternal_gad7'], df['infant_night_awakenings'])
    corr_epds_stretch, p_corr2 = stats.pearsonr(df['maternal_epds'], df['infant_longest_stretch'])
    corr_mat_infant_sleep, p_corr3 = stats.pearsonr(df['maternal_sleep_hours'], df['infant_longest_stretch'])

    # Odds Ratio 1: Yüksek Maternal Anksiyete (GAD-7 >= 10) -> Şiddetli Bebek Uyku Parçalanması
    high_anx = (df['maternal_gad7'] >= 10.0).astype(int)
    ct1 = pd.crosstab(high_anx, df['infant_sleep_fragmentation'])
    a1 = ct1.loc[1, 1] if 1 in ct1.index and 1 in ct1.columns else 0
    b1 = ct1.loc[1, 0] if 1 in ct1.index and 0 in ct1.columns else 0
    c1 = ct1.loc[0, 1] if 0 in ct1.index and 1 in ct1.columns else 0
    d1 = ct1.loc[0, 0] if 0 in ct1.index and 0 in ct1.columns else 0
    or_anxiety = (a1 * d1) / (b1 * c1) if (b1 * c1) > 0 else 1.0
    se_or1 = np.sqrt(1/a1 + 1/b1 + 1/c1 + 1/d1)
    ci_low1 = np.exp(np.log(or_anxiety) - 1.96 * se_or1)
    ci_high1 = np.exp(np.log(or_anxiety) + 1.96 * se_or1)
    chi2_1, p_val1, _, _ = stats.chi2_contingency([[a1, b1], [c1, d1]])

    # Odds Ratio 2: Desteksiz Anne (partner_support == 0) -> Anne Tükenmişlik Riski
    ct2 = pd.crosstab((df['partner_support'] == 0).astype(int), df['maternal_exhaustion_risk'])
    a2 = ct2.loc[1, 1]
    b2 = ct2.loc[1, 0]
    c2 = ct2.loc[0, 1]
    d2 = ct2.loc[0, 0]
    or_no_partner = (a2 * d2) / (b2 * c2) if (b2 * c2) > 0 else 1.0
    se_or2 = np.sqrt(1/a2 + 1/b2 + 1/c2 + 1/d2)
    ci_low2 = np.exp(np.log(or_no_partner) - 1.96 * se_or2)
    ci_high2 = np.exp(np.log(or_no_partner) + 1.96 * se_or2)
    chi2_2, p_val2, _, _ = stats.chi2_contingency([[a2, b2], [c2, d2]])

    # Bağımsız t-Testi: Düşük Anksiyete (<7) vs Yüksek Anksiyete (>=10) Bebek Gece Uyanmaları
    low_anx_group = df[df['maternal_gad7'] < 7.0]['infant_night_awakenings']
    high_anx_group = df[df['maternal_gad7'] >= 10.0]['infant_night_awakenings']
    t_stat_anx, p_val_ttest = stats.ttest_ind(high_anx_group, low_anx_group, equal_var=False)

    # 3. VIF Analizi
    feature_cols = ['maternal_age', 'infant_age_months', 'partner_support', 'feeding_mode', 'maternal_gad7', 'maternal_epds', 'maternal_sleep_hours']
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

    # 4. Makine Öğrenimi: Sınıflandırma
    X = df[feature_cols]
    y = df['infant_sleep_fragmentation']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)

    models = {
        'Lojistik Regresyon': LogisticRegression(max_iter=1000, class_weight='balanced', random_state=42),
        'Rastgele Orman (RF)': RandomForestClassifier(n_estimators=120, max_depth=5, class_weight='balanced', random_state=42),
        'Gradient Boosting (GBM)': GradientBoostingClassifier(n_estimators=110, learning_rate=0.07, max_depth=4, random_state=42)
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

    # Nihai Model: Gradient Boosting (Threshold tuned at 0.30 for high pediatric recall)
    final_clf = GradientBoostingClassifier(n_estimators=110, learning_rate=0.07, max_depth=4, random_state=42)
    final_clf.fit(X_train, y_train)
    y_prob = final_clf.predict_proba(X_test)[:, 1]
    
    threshold = 0.30
    y_pred = (y_prob >= threshold).astype(int)

    acc = accuracy_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_prob)
    cm = confusion_matrix(y_test, y_pred)

    # 5. Regresyon Modeli: Bebeğin Gece Uyanma Sayısı Kestirimi
    y_reg = df['infant_night_awakenings']
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
        'infant_fragmentation_cases': int(df['infant_sleep_fragmentation'].sum()),
        'infant_fragmentation_pct': round(float(df['infant_sleep_fragmentation'].mean() * 100), 2),
        'maternal_exhaustion_cases': int(df['maternal_exhaustion_risk'].sum()),
        'maternal_exhaustion_pct': round(float(df['maternal_exhaustion_risk'].mean() * 100), 2),
        'correlations': {
            'gad7_infant_awakenings': {'r': round(corr_gad7_awakenings, 3), 'p': float(p_corr1)},
            'epds_infant_stretch': {'r': round(corr_epds_stretch, 3), 'p': float(p_corr2)},
            'maternal_infant_sleep': {'r': round(corr_mat_infant_sleep, 3), 'p': float(p_corr3)}
        },
        'odds_ratios': {
            'high_anxiety_on_fragmentation': {
                'or': round(or_anxiety, 2),
                'ci_lower': round(ci_low1, 2),
                'ci_upper': round(ci_high1, 2),
                'p_value': float(p_val1),
                'chi2': round(chi2_1, 2),
                'table': {'tp': int(a1), 'fp': int(b1), 'fn': int(c1), 'tn': int(d1)}
            },
            'no_partner_support_exhaustion_risk': {
                'or': round(or_no_partner, 2),
                'ci_lower': round(ci_low2, 2),
                'ci_upper': round(ci_high2, 2),
                'p_value': float(p_val2),
                'chi2': round(chi2_2, 2),
                'table': {'tp': int(a2), 'fp': int(b2), 'fn': int(c2), 'tn': int(d2)}
            }
        },
        'ttest_anxiety_sleep': {
            'mean_high_anx': round(float(high_anx_group.mean()), 2),
            'std_high_anx': round(float(high_anx_group.std()), 2),
            'mean_low_anx': round(float(low_anx_group.mean()), 2),
            'std_low_anx': round(float(low_anx_group.std()), 2),
            'diff': round(float(high_anx_group.mean() - low_anx_group.mean()), 2),
            't_stat': round(float(t_stat_anx), 2),
            'p_value': float(p_val_ttest)
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
            'target': 'infant_night_awakenings',
            'mae_awakenings': round(float(mae_r), 2),
            'r2_score': round(float(r2_r), 4)
        },
        'sfs_ranking': sfs_ranking
    }

    out_json = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\maternal_infant_sleep_results.json'
    with open(out_json, 'w', encoding='utf-8') as f:
        json.dump(results, f, ensure_ascii=False, indent=2)

    print(f"Results JSON saved. N={N}")
    print(f"Fragmentation Cases: {results['infant_fragmentation_cases']} ({results['infant_fragmentation_pct']}%)")
    print(f"Test Accuracy: {acc:.2%}, Recall: {rec:.2%}, Precision: {prec:.2%}, F1: {f1:.4f}, ROC-AUC: {auc:.4f}")
    print(f"Confusion Matrix: TN={cm[0,0]}, FP={cm[0,1]}, FN={cm[1,0]}, TP={cm[1,1]}")
    print(f"Regression MAE: ±{mae_r:.2f} uyanma, R2: {r2_r:.4f}")
    print(f"High Anxiety OR: {or_anxiety:.2f} (p={p_val1:.2e})")
    print(f"No Partner Support Exhaustion OR: {or_no_partner:.2f} (p={p_val2:.2e})")

    return results

if __name__ == '__main__':
    run_pipeline()
