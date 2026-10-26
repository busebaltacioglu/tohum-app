# -*- coding: utf-8 -*-
"""
ToHUM - M0 Çekirdek Yapay Zekâ Modeli (AI Seed Core)
UCI Maternal Health Risk Veri Seti Üzerinde Dengesiz Veri & F1-Skor Validasyon Raporu
Kurucu: Buse Nur Ürem (İstatistik & Veri Bilimi Y.Lisans)
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.ensemble import RandomForestClassifier, ExtraTreesClassifier
from sklearn.metrics import classification_report, confusion_matrix, f1_score, recall_score, precision_score, roc_auc_score

# 1. Veri Seti Yükleme
csv_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\maternal_health_risk.csv'
df = pd.read_csv(csv_path)

print("="*60)
print("TOHUM M0 ÇEKİRDEK: MATERNAL SAĞLIK RİSKİ MODEL ANALİZİ")
print("="*60)
print(f"Toplam Klinik Örneklem Sayısı: {len(df)}")
print("\nSınıf Dağılımı (Dengesizlik Durumu):")
print(df['RiskLevel'].value_counts())

# 2. Özellik Mühendisliği (Feature Engineering)
# Nabız Basıncı (Pulse Pressure) ve Ortalama Arteriyel Basınç (MAP)
df['PulsePressure'] = df['SystolicBP'] - df['DiastolicBP']
df['MAP'] = df['DiastolicBP'] + (df['PulsePressure'] / 3.0)

# İkili (Binary) Klinik Alarm Hedefi: Yüksek Risk (Preeklampsi/Hipertansiyon) = 1, Diğerleri = 0
df['HighRiskAlert'] = (df['RiskLevel'] == 'high risk').astype(int)

features = ['Age', 'SystolicBP', 'DiastolicBP', 'BS', 'BodyTemp', 'HeartRate', 'PulsePressure', 'MAP']
X = df[features]
y = df['HighRiskAlert']

# 3. Train-Test Ayrımı (%80 Eğitim, %20 Bağımsız Test - Stratified)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.20, random_state=42, stratify=y)

# 4. Maliyet Duyarlı (Cost-Sensitive) & Dengesiz Veri Uyumlu Model
model = RandomForestClassifier(n_estimators=300, max_depth=12, class_weight='balanced', random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)
y_prob = model.predict_proba(X_test)[:, 1]

# 5. Metrikler
acc = model.score(X_test, y_test)
f1 = f1_score(y_test, y_pred)
rec = recall_score(y_test, y_pred)
prec = precision_score(y_test, y_pred)
auc = roc_auc_score(y_test, y_prob)
cm = confusion_matrix(y_test, y_pred)

print("\n" + "="*60)
print("BAĞIMSIZ TEST KÜMESİ DOĞRULAMA SONUÇLARI (N = 203)")
print("="*60)
print(f"Genel Doğruluk (Accuracy)       : %{acc*100:.1f}")
print(f"ROC-AUC Skoru                   : %{auc*100:.1f}")
print(f"Yüksek Risk F1-Skoru            : %{f1*100:.1f} (Hedef: >= %90)")
print(f"Yüksek Risk Duyarlılık (Recall) : %{rec*100:.1f} (Yalancı Negatif Kaçırmama Gücü)")
print(f"Yüksek Risk Kesinlik (Precision): %{prec*100:.1f}")

print("\nKarmaşıklık Matrisi (Confusion Matrix):")
print(f"Doğru Negatif (Sağlıklı Doğru): {cm[0,0]}  |  Yalancı Pozitif (Gereksiz Alarm): {cm[0,1]}")
print(f"Yalancı Negatif (Kaçırılan Risk): {cm[1,0]}  |  Doğru Pozitif (Yakalanan Risk): {cm[1,1]}")

# 6. Özellik Seçimi & Ağırlık Sıralaması
importances = pd.Series(model.feature_importances_, index=features).sort_values(ascending=False)
print("\n" + "="*60)
print("ÖZELLİK SEÇİMİ (FEATURE IMPORTANCE) AĞIRLIKLARI:")
print("="*60)
for feat, imp in importances.items():
    print(f"{feat:16s}: %{imp*100:.2f}")

# Raporu diske kaydet
report_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\m0_validation_report.txt'
with open(report_path, 'w', encoding='utf-8') as f:
    f.write(f"""TOHUM M0 MODEL VALIDASYON VE JÜRİ SAVUNMA RAPORU
Veri Seti: UCI Maternal Health Risk (1.014 Klinik Gebelik Verisi)
Model: Cost-Sensitive Balanced Random Forest Ensemble

PERFORMANS METRİKLERİ:
- Genel Doğruluk (Accuracy): %{acc*100:.1f}
- ROC-AUC: %{auc*100:.1f}
- Yüksek Risk F1-Skoru: %{f1*100:.1f}
- Yüksek Risk Duyarlılık (Recall): %{rec*100:.1f}
- Yalancı Negatif (Kaçırılan Risk): 54 vakada sadece {cm[1,0]} adet!

JÜRİ SAVUNMA CÜMLESİ:
"Sayın jüri üyeleri, THS-4 aşamasında algoritmamızı 1.014 kişilik bağımsız klinik gebelik veri setinde eğittik. Maliyet duyarlı ve dengesiz veri optimizasyonumuz sayesinde yüksek riskli preeklampsi/hipertansiyon vakalarında F1 skorumuz %{f1*100:.1f}, risk yakalama duyarlılığımız (recall) ise %{rec*100:.1f}'tir. Mevcut çalışan prototipimiz kullanıcı arayüzü ve lojistik akış doğrulamasıdır; BiGG desteğiyle İP-3 kapsamında bu eğitilmiş Python motoru FastAPI mikroservisiyle uygulamaya bağlanacaktır."
""")
print(f"\nRapor kaydedildi: {report_path}")
