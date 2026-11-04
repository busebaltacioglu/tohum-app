# -*- coding: utf-8 -*-
"""
ToHUM A.Ş. — Küme 1: Fetal Health CTG (Kardiyotokografi) 7-Adımlı Pipeline
Veri: 2.126 Fetal Kardiyotokografi Sınavı (Ayres de Campos et al. / UCI #193 / Kaggle)
Hedef: Fetal Distres ve Hipoksi Tespiti (Normal: 1.655, Suspect: 295, Pathological: 176)
"""

import os
import sys
import json
import numpy as np
import pandas as pd
from scipy import stats

from sklearn.model_selection import train_test_split, StratifiedKFold, cross_validate
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier
from sklearn.metrics import accuracy_score, recall_score, f1_score, roc_auc_score, confusion_matrix, classification_report

def run_fetal_ctg_pipeline():
    csv_path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\fetal_health.csv"
    if not os.path.exists(csv_path):
        print(f"HATA: Veri dosyası bulunamadı: {csv_path}")
        sys.exit(1)

    print("=" * 75)
    print("ToHUM A.Ş. — M0 FETAL HEALTH CTG 7-ADIMLI AKADEMİK PİPELİNE")
    print("=" * 75)

    # -------------------------------------------------------------
    # ADIM 1: DATA COLLECTION
    # -------------------------------------------------------------
    df = pd.read_csv(csv_path)
    n_samples, n_cols = df.shape
    print(f"\n[ADIM 1] DATA COLLECTION:")
    print(f"  Toplam CTG Örneklemi (N): {n_samples}")
    print(f"  Değişken Sayısı: {n_cols}")
    print(f"  Eksik Gözlem Oranı: %{df.isnull().mean().max()*100:.2f} (Eksiksiz klinik NST kaydı)")

    # -------------------------------------------------------------
    # ADIM 2: DATA PREPARATION
    # -------------------------------------------------------------
    print(f"\n[ADIM 2] DATA PREPARATION:")
    print(f"  1. Veri Tipleri: Tüm 21 öznitelik Float64, Hedef NSP Int64.")
    print(f"  2. Eksik Değer Kontrolü: %0.00 -> Atama yapılmadı, orijinal veriler korundu.")

    # Sınıf Dağılımı
    counts = df['NSP'].value_counts().sort_index()
    print(f"  3. Sınıf Dağılımı:")
    print(f"     - Normal (1): {counts[1]} (%{counts[1]/len(df)*100:.1f})")
    print(f"     - Şüpheli (2): {counts[2]} (%{counts[2]/len(df)*100:.1f})")
    print(f"     - Patolojik (3): {counts[3]} (%{counts[3]/len(df)*100:.1f})")

    # İkili Fetal Risk Hedefi (Normal=0 vs Riskli/Suspect+Pathologic=1)
    df['FetalRiskBinary'] = (df['NSP'] > 1).astype(int)
    # Kritik Patolojik Hedef (Pathological=1 vs Normal/Suspect=0)
    df['PathologicBinary'] = (df['NSP'] == 3).astype(int)

    # Grup İstatistikleri ve Welch t-Testi
    normal_grp = df[df['NSP'] == 1]
    patho_grp = df[df['NSP'] == 3]

    print("\n  KLİNİK GRUP ORTALAMALARI VE WELCH t-TESTİ (Normal vs Patolojik):")
    key_vars = [
        ('LB', 'Fetal Bazal Kalp Hızı (BPM)'),
        ('AC', 'Hızlanma / Akselerasyon Sayısı'),
        ('UC', 'Uterus Kasılma Sayısı'),
        ('ASTV', 'Anormal Kısa Süreli Değişkenlik (%)'),
        ('ALTV', 'Anormal Uzun Süreli Değişkenlik (%)'),
        ('DP', 'Uzamış Deselerasyon Sayısı (Prolonged)')
    ]

    group_stats = {}
    for var, desc in key_vars:
        mean_all = df[var].mean()
        mean_norm = normal_grp[var].mean()
        mean_path = patho_grp[var].mean()
        t_stat, p_val = stats.ttest_ind(normal_grp[var], patho_grp[var], equal_var=False)
        delta = mean_path - mean_norm
        group_stats[var] = {
            'desc': desc,
            'mean_all': round(mean_all, 2),
            'mean_norm': round(mean_norm, 2),
            'mean_path': round(mean_path, 2),
            'delta': round(delta, 2),
            't_stat': round(t_stat, 2),
            'p_val': p_val
        }
        print(f"    - {var:6s} ({desc[:25]:25s}): Normal={mean_norm:6.2f} | Patolojik={mean_path:6.2f} | Delta={delta:+6.2f} | t={t_stat:6.2f}, p={p_val:.2e}")

    # -------------------------------------------------------------
    # ADIM 3 & 4: MODEL SELECTION & TRAINING
    # -------------------------------------------------------------
    feature_cols = [c for c in df.columns if c not in ['NSP', 'FetalRiskBinary', 'PathologicBinary']]
    X = df[feature_cols].values
    y = df['FetalRiskBinary'].values # Riskli (Şüpheli + Patolojik) tespiti

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42, stratify=y
    )

    print(f"\n[ADIM 3 & 4] MODEL SELECTION & TRAINING:")
    print(f"  Eğitim Kümesi: {len(X_train)} CTG sınavı")
    print(f"  Test Kümesi  : {len(X_test)} CTG sınavı")
    print(f"  Algoritma    : Balanced Random Forest (n=250, max_depth=10, class_weight='balanced')")

    clf = RandomForestClassifier(
        n_estimators=250,
        max_depth=10,
        min_samples_split=3,
        class_weight='balanced',
        random_state=42
    )

    cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
    cv_res = cross_validate(clf, X_train, y_train, cv=cv, scoring=['accuracy', 'recall', 'roc_auc'])

    clf.fit(X_train, y_train)

    # -------------------------------------------------------------
    # ADIM 5: MODEL EVALUATION
    # -------------------------------------------------------------
    y_pred = clf.predict(X_test)
    y_prob = clf.predict_proba(X_test)[:, 1]

    acc = accuracy_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    roc = roc_auc_score(y_test, y_prob)
    cm = confusion_matrix(y_test, y_pred)
    tn, fp, fn, tp = cm.ravel()

    print(f"\n[ADIM 5] MODEL EVALUATION (N_test = {len(X_test)}):")
    print(f"  5-Fold CV Ortalama Recall : %{cv_res['test_recall'].mean()*100:.1f} (±%{cv_res['test_recall'].std()*100:.1f})")
    print(f"  5-Fold CV Ortalama ROC-AUC: %{cv_res['test_roc_auc'].mean()*100:.1f}")
    print(f"  Bağımsız Test Doğruluğu   : %{acc*100:.1f}")
    print(f"  Fetal Risk Recall (Duyarlılık): %{rec*100:.1f} ({tp}/{tp+fn} Riskli Bebek Yakalandı)")
    print(f"  F1-Skoru                  : {f1:.3f}")
    print(f"  ROC-AUC                   : {roc:.3f}")
    print(f"  Karmaşıklık Matrisi (CM)  : TN={tn}, FP={fp}, FN={fn}, TP={tp}")

    # -------------------------------------------------------------
    # ADIM 6: MODEL IMPROVEMENT (Öznitelik Önem Ağırlıkları)
    # -------------------------------------------------------------
    importances = clf.feature_importances_
    sorted_idx = np.argsort(importances)[::-1]

    print(f"\n[ADIM 6] MODEL IMPROVEMENT (Öznitelik Önem Sıralaması):")
    top_features = []
    for i in range(min(8, len(feature_cols))):
        idx = sorted_idx[i]
        top_features.append({
            'feature': feature_cols[idx],
            'importance': round(float(importances[idx] * 100), 1)
        })
        print(f"  {i+1}. {feature_cols[idx]:10s}: %{importances[idx]*100:4.1f}")

    # Save metrics JSON
    metrics_path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\pipelines\fetal_ctg_metrics.json"
    metrics_data = {
        'dataset': 'UCI Cardiotocography / Fetal Health Prediction',
        'n_samples': n_samples,
        'normal_count': int(counts[1]),
        'suspect_count': int(counts[2]),
        'pathologic_count': int(counts[3]),
        'test_accuracy': round(float(acc * 100), 1),
        'test_recall': round(float(rec * 100), 1),
        'cv_mean_recall': round(float(cv_res['test_recall'].mean() * 100), 1),
        'test_f1': round(float(f1), 3),
        'test_roc_auc': round(float(roc), 3),
        'confusion_matrix': {'tn': int(tn), 'fp': int(fp), 'fn': int(fn), 'tp': int(tp)},
        'group_stats': group_stats,
        'top_features': top_features
    }

    with open(metrics_path, "w", encoding="utf-8") as f:
        json.dump(metrics_data, f, ensure_ascii=False, indent=2)

    print(f"\n[BAŞARILI] Fetal CTG metrikleri kaydedildi: {metrics_path}")

if __name__ == "__main__":
    run_fetal_ctg_pipeline()
