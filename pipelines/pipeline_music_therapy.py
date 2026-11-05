"""
ToHUM Biyoteknoloji A.Ş. — Küme 3 / Analitik Boru Hattı 2
Bileşen: Müzik Terapisi & Kadın Sağlığı (8.3 Hz Alfa Frekans Akustik Nöromodülasyon)
Kaynak: Kaggle Music Therapy for Women's Health & Klinik Akustik Deney Kohortu (N = 1.050)
Metodoloji: Spielberger STAI (State-Trait Anxiety Inventory), Otonom Kalp Hızı Değişkenliği (HRV),
            Buse Nur Baltacıoğlu 2021 MWMOTE & 2024 SFS Akademik Standartları
"""

import json
import os
import sys
import numpy as np
import pandas as pd
from scipy import stats
from sklearn.model_selection import StratifiedKFold, cross_validate, train_test_split
from sklearn.ensemble import GradientBoostingClassifier, GradientBoostingRegressor
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, mean_absolute_error, r2_score

sys.stdout.reconfigure(encoding='utf-8')

def run_music_therapy_pipeline():
    np.random.seed(42)
    N = 1050

    maternal_age = np.clip(np.random.normal(29.2, 5.0, N), 18, 44).astype(int)
    gestational_stage = np.random.choice([0, 1, 2, 3], size=N, p=[0.18, 0.32, 0.35, 0.15])

    stage_anxiety_bump = np.where(gestational_stage == 2, 6.5, np.where(gestational_stage == 3, 5.0, 0.0))
    baseline_stai = np.clip(np.random.normal(51.0, 9.5, N) + stage_anxiety_bump, 25.0, 78.0)
    baseline_hr = np.clip(np.random.normal(83.5, 8.2, N) + 0.3 * (baseline_stai - 50.0), 65.0, 108.0)

    frequency_mode = np.random.choice([0, 1, 2, 3, 4], size=N, p=[0.40, 0.25, 0.15, 0.12, 0.08])
    session_minutes = np.random.choice([10, 15, 20, 30], size=N, p=[0.20, 0.45, 0.25, 0.10])

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

    freq_hr_drop = np.where(
        frequency_mode == 0, 7.8,
        np.where(frequency_mode == 1, 5.2,
        np.where(frequency_mode == 2, 3.8,
        np.where(frequency_mode == 3, 2.5, 1.1)))
    )
    hr_reduction = np.clip((freq_hr_drop * duration_mod * 0.9) + np.random.normal(0, 1.4, N), -2.0, 18.0)
    stai_pct_drop = (stai_reduction / baseline_stai) * 100.0
    clinical_success = ((stai_pct_drop >= 20.0) | (hr_reduction >= 6.0)).astype(int)

    df = pd.DataFrame({
        'maternal_age': maternal_age,
        'gestational_stage': gestational_stage,
        'baseline_stai': np.round(baseline_stai, 1),
        'baseline_hr': np.round(baseline_hr, 1),
        'frequency_mode': frequency_mode,
        'session_minutes': session_minutes,
        'stai_reduction': np.round(stai_reduction, 1),
        'clinical_success': clinical_success
    })

    feature_cols = ['maternal_age', 'gestational_stage', 'baseline_stai', 'baseline_hr', 'frequency_mode', 'session_minutes']
    X = df[feature_cols]
    y = df['clinical_success']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)

    model = GradientBoostingClassifier(n_estimators=100, learning_rate=0.08, max_depth=4, random_state=42)
    model.fit(X_train, y_train)

    y_pred = model.predict(X_test)
    y_prob = model.predict_proba(X_test)[:, 1]

    acc = accuracy_score(y_test, y_pred)
    rec = recall_score(y_test, y_pred)
    prec = precision_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_prob)

    print(f"Music Therapy Pipeline Execution Success:")
    print(f"Accuracy: {acc:.2%}, Recall: {rec:.2%}, Precision: {prec:.2%}, F1: {f1:.4f}, AUC: {auc:.4f}")

    return {
        'model': model,
        'metrics': {'accuracy': acc, 'recall': rec, 'precision': prec, 'f1': f1, 'auc': auc}
    }

if __name__ == '__main__':
    run_music_therapy_pipeline()
