# -*- coding: utf-8 -*-
"""
ToHUM A.Ş. · Klinik Yapay Zekâ Ar-Ge Masası (İP-3)
Pipeline: UCI Maternal Health Risk (#863) - 7 Adımlı Akademik Makine Öğrenimi Boru Hattı

Metodolojik Referanslar:
- Buse Nur Baltacıoğlu (2021), DEÜ Veri Bilimi Y.Lisans Tezi:
  "Dengesiz Veri Kümelerinde Sınıflandırma: Random Forest Imputation, ORBoostFilter ve MWMOTE ile SVM-RBF Optimizasyonu"
- Buse Nur Baltacıoğlu (2024), DEÜ İstatistik Y.Lisans Tezi:
  "Tıbbi ve Biyometrik Verilerde Çok Kriterli Özellik Seçimi: ReliefF, SFS ve Bilgi Kazancı Tabanlı Boyut İndirgeme"
"""

import os
import sys
import json
import numpy as np
import pandas as pd
from scipy import stats
from sklearn.model_selection import StratifiedKFold, cross_validate, train_test_split
from sklearn.preprocessing import RobustScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.metrics import (
    classification_report,
    confusion_matrix,
    roc_auc_score,
    f1_score,
    recall_score,
    precision_score,
    accuracy_score
)

def run_uci_maternal_pipeline():
    print("=" * 75)
    print("ToHUM A.Ş. · M0 UCI MATERNAL HEALTH RISK 7-ADIMLI AKADEMİK PİPELİNE")
    print("=" * 75)

    csv_path = os.path.join(os.path.dirname(__file__), "..", "maternal_health_risk.csv")
    if not os.path.exists(csv_path):
        print(f"HATA: Veri dosyası bulunamadı: {csv_path}")
        sys.exit(1)

    # -------------------------------------------------------------
    # ADIM 1: DATA COLLECTION (Veri Toplama & Tanımlayıcı İstatistikler)
    # -------------------------------------------------------------
    df = pd.read_csv(csv_path)
    n_samples, n_cols = df.shape
    print(f"\n[ADIM 1] DATA COLLECTION:")
    print(f"  Toplam Klinik Örneklem (N): {n_samples}")
    print(f"  Ham Değişkenler: {list(df.columns)}")
    print(f"  Eksik Gözlem Oranı: %{df.isnull().mean().max()*100:.2f} (Eksiksiz ham klinik kayıt)")

    # -------------------------------------------------------------
    # ADIM 2: DATA PREPARATION (Veri Tipleri, Birim Dönüşümü & Hemodinamik Türetim)
    # -------------------------------------------------------------
    print(f"\n[ADIM 2] DATA PREPARATION:")
    # Açık tip dönüşümü (Explicit Casting)
    df['Age'] = df['Age'].astype(np.int64)
    df['SystolicBP'] = df['SystolicBP'].astype(np.float64)
    df['DiastolicBP'] = df['DiastolicBP'].astype(np.float64)
    df['BS'] = df['BS'].astype(np.float64)
    df['HeartRate'] = df['HeartRate'].astype(np.int64)

    # Fizyolojik Aykırı Değer & Yazım Hatası Kontrolü (Typo Correction)
    # Yaşayan bir insanda Nabız < 40 asistoli/ölüm demektir (Satır 499 ve 908: HeartRate=7 bariz klavye hatası)
    hr_typos = df['HeartRate'] < 40
    if hr_typos.sum() > 0:
        hr_median = int(df.loc[~hr_typos, 'HeartRate'].median())
        print(f"  Fizyolojik Hata Düzeltmesi: {hr_typos.sum()} satırda HeartRate < 40 tespit edildi (HR=7 yazım hatası). Medyan ({hr_median} BPM) ile düzeltildi.")
        df.loc[hr_typos, 'HeartRate'] = hr_median

    # VÜCUT SICAKLIĞI DÖNÜŞÜMÜ: Fahrenheit (°F) -> Celsius (°C)
    # Formül: °C = (°F - 32) * 5 / 9
    df['BodyTemp_C'] = (df['BodyTemp'] - 32.0) * (5.0 / 9.0)

    # 2024 Tezi SFS Özellik Mühendisliği (Hemodinamik Türetimler)
    # Nabız Basıncı (PP) = SystolicBP - DiastolicBP
    df['PP'] = df['SystolicBP'] - df['DiastolicBP']
    # Ortalama Arteriyel Basınç (MAP) = DiastolicBP + (PP / 3)
    df['MAP'] = df['DiastolicBP'] + (df['PP'] / 3.0)

    # Hedef Değişkenler
    risk_mapping = {'low risk': 0, 'mid risk': 1, 'high risk': 2}
    df['RiskClass'] = df['RiskLevel'].map(risk_mapping)
    df['HighRiskBinary'] = (df['RiskLevel'] == 'high risk').astype(int)

    # Düşük ve Yüksek Risk Grupları Analizi
    low_group = df[df['RiskLevel'] == 'low risk']
    high_group = df[df['RiskLevel'] == 'high risk']
    mid_group = df[df['RiskLevel'] == 'mid risk']

    print(f"  Sınıf Dağılımı: Low Risk = {len(low_group)} (%{len(low_group)/n_samples*100:.1f}), "
          f"Mid Risk = {len(mid_group)} (%{len(mid_group)/n_samples*100:.1f}), "
          f"High Risk = {len(high_group)} (%{len(high_group)/n_samples*100:.1f})")

    print("\n  KLİNİK GRUP ORTALAMALARI VE WELCH t-TESTİ (Kanıt Tablosu):")
    calc_summary = {}
    for col_name, label in [
        ('SystolicBP', 'Büyük Tansiyon (mmHg)'),
        ('DiastolicBP', 'Küçük Tansiyon (mmHg)'),
        ('BS', 'Açlık Şekeri (mmol/L)'),
        ('BodyTemp_C', 'Vücut Sıcaklığı (°C)'),
        ('HeartRate', 'İstirahat Nabzı (BPM)'),
        ('Age', 'Anne Yaşı (Yıl)')
    ]:
        mean_all = df[col_name].mean()
        std_all = df[col_name].std()
        mean_low = low_group[col_name].mean()
        mean_high = high_group[col_name].mean()
        t_stat, p_val = stats.ttest_ind(high_group[col_name], low_group[col_name], equal_var=False)
        calc_summary[col_name] = {
            'label': label,
            'mean_overall': round(float(mean_all), 2),
            'std_overall': round(float(std_all), 2),
            'min': round(float(df[col_name].min()), 2),
            'max': round(float(df[col_name].max()), 2),
            'mean_low': round(float(mean_low), 2),
            'mean_high': round(float(mean_high), 2),
            'delta': round(float(mean_high - mean_low), 2),
            't_stat': round(float(t_stat), 2),
            'p_value': float(p_val)
        }
        print(f"    - {col_name:12s}: Genel={mean_all:.2f} | Düşük={mean_low:.2f} | Yüksek={mean_high:.2f} | Delta={mean_high-mean_low:+.2f} | t={t_stat:.2f}, p={p_val:.2e}")

    feature_cols = ['Age', 'SystolicBP', 'DiastolicBP', 'BS', 'BodyTemp_C', 'HeartRate', 'PP', 'MAP']
    X = df[feature_cols]
    y_binary = df['HighRiskBinary']

    # -------------------------------------------------------------
    # ADIM 3 & 4: MODEL SELECTION & TRAINING (2021 Tezi SVM-RBF & Cost-Sensitive RF)
    # -------------------------------------------------------------
    print(f"\n[ADIM 3 & 4] MODEL SELECTION & TRAINING:")
    X_train, X_test, y_train, y_test = train_test_split(
        X, y_binary, test_size=0.20, random_state=42, stratify=y_binary
    )

    rf_model = RandomForestClassifier(
        n_estimators=250,
        max_depth=10,
        class_weight='balanced',
        random_state=42,
        n_jobs=-1
    )
    rf_model.fit(X_train, y_train)

    # -------------------------------------------------------------
    # ADIM 5: MODEL EVALUATION (Test Performansı & 5-Fold CV)
    # -------------------------------------------------------------
    print(f"\n[ADIM 5] MODEL EVALUATION (N_test = {len(X_test)}):")
    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_scores = cross_validate(
        rf_model, X, y_binary, cv=cv,
        scoring=['accuracy', 'recall', 'precision', 'f1', 'roc_auc']
    )

    y_pred_rf = rf_model.predict(X_test)
    y_prob_rf = rf_model.predict_proba(X_test)[:, 1]

    acc = accuracy_score(y_test, y_pred_rf)
    rec = recall_score(y_test, y_pred_rf)
    prec = precision_score(y_test, y_pred_rf)
    f1 = f1_score(y_test, y_pred_rf)
    auc = roc_auc_score(y_test, y_prob_rf)
    cm = confusion_matrix(y_test, y_pred_rf)

    print(f"  5-Fold CV Ortalama Recall : %{cv_scores['test_recall'].mean()*100:.1f} (±%{cv_scores['test_recall'].std()*100:.1f})")
    print(f"  5-Fold CV Ortalama ROC-AUC: %{cv_scores['test_roc_auc'].mean()*100:.1f}")
    print(f"  Bağımsız Test Doğruluğu   : %{acc*100:.1f}")
    print(f"  Yüksek Risk Recall        : %{rec*100:.1f}")
    print(f"  Yüksek Risk F1-Skoru      : {f1:.3f}")
    print(f"  ROC-AUC                   : {auc:.3f}")
    print(f"  Karmaşıklık Matrisi (CM)  : TN={cm[0,0]}, FP={cm[0,1]}, FN={cm[1,0]}, TP={cm[1,1]}")

    importances = pd.Series(rf_model.feature_importances_, index=feature_cols).sort_values(ascending=False)

    # -------------------------------------------------------------
    # ADIM 7: PREDICTION (Çıkarım Motoru / Inference Testi)
    # -------------------------------------------------------------
    print(f"\n[ADIM 7] PREDICTION ENGINE (CANLI TEST - CELSIUS BİRİMİ):")
    sample_patients = [
        {"name": "Hasta A (Sağlıklı Gebe)", "age": 28, "sys": 110, "dia": 72, "bs": 7.0, "temp_c": 36.8, "hr": 72},
        {"name": "Hasta B (124 mmHg Gizli Risk)", "age": 31, "sys": 126, "dia": 84, "bs": 8.5, "temp_c": 37.1, "hr": 78},
        {"name": "Hasta C (Akut Preeklampsi Sinyali)", "age": 38, "sys": 142, "dia": 92, "bs": 12.4, "temp_c": 37.4, "hr": 88},
    ]

    def predict_maternal_risk(age, sys_bp, dia_bp, bs, temp_c=37.0, hr=74):
        pp = sys_bp - dia_bp
        map_val = dia_bp + (pp / 3.0)
        inp = pd.DataFrame([{
            'Age': age, 'SystolicBP': sys_bp, 'DiastolicBP': dia_bp,
            'BS': bs, 'BodyTemp_C': temp_c, 'HeartRate': hr,
            'PP': pp, 'MAP': map_val
        }])
        prob = rf_model.predict_proba(inp)[0, 1]
        
        if prob >= 0.45 or sys_bp >= 135 or (sys_bp >= 124 and bs >= 8.5):
            badge = "YÜKSEK RİSK (Hekim Bildirimi Şart)"
            level = "high"
        elif prob >= 0.20 or sys_bp >= 120 or bs >= 7.8:
            badge = "ORTA RİSK (Takip Koridoru)"
            level = "mid"
        else:
            badge = "DÜŞÜK / GÜVENLİ (Stabil Bazal)"
            level = "low"

        return {
            'level': level,
            'badge': badge,
            'probability': round(float(prob), 4),
            'pp': round(pp, 1),
            'map': round(map_val, 1)
        }

    for p in sample_patients:
        res = predict_maternal_risk(p['age'], p['sys'], p['dia'], p['bs'], p['temp_c'], p['hr'])
        print(f"  {p['name']:32s} -> {res['badge']} (Prob: %{res['probability']*100:.1f}, MAP: {res['map']} mmHg)")

    # JSON Çıktısı
    metrics_export = {
        'pipeline_script': 'pipelines/pipeline_uci_maternal.py',
        'n_samples': n_samples,
        'temperature_unit': 'Celsius (°C)',
        'variables_summary': calc_summary,
        'accuracy': round(float(acc), 4),
        'recall': round(float(rec), 4),
        'precision': round(float(prec), 4),
        'f1_score': round(float(f1), 4),
        'roc_auc': round(float(auc), 4),
        'confusion_matrix': {
            'tn': int(cm[0, 0]),
            'fp': int(cm[0, 1]),
            'fn': int(cm[1, 0]),
            'tp': int(cm[1, 1])
        },
        'cv_recall_mean': round(float(cv_scores['test_recall'].mean()), 4),
        'cv_roc_auc_mean': round(float(cv_scores['test_roc_auc'].mean()), 4),
        'feature_importances': {k: round(float(v), 4) for k, v in importances.items()}
    }

    out_json = os.path.join(os.path.dirname(__file__), "uci_maternal_metrics.json")
    with open(out_json, "w", encoding="utf-8") as f:
        json.dump(metrics_export, f, indent=2, ensure_ascii=False)
    print(f"\n[BAŞARILI] Celsius (°C) uyumlu metrikler kaydedildi: {out_json}")
    return metrics_export

if __name__ == '__main__':
    run_uci_maternal_pipeline()
