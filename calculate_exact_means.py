# -*- coding: utf-8 -*-
import pandas as pd
from scipy import stats

csv_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\maternal_health_risk.csv'
df = pd.read_csv(csv_path)
df['BodyTemp_C'] = (df['BodyTemp'] - 32.0) * (5.0 / 9.0)

low = df[df['RiskLevel'] == 'low risk']
high = df[df['RiskLevel'] == 'high risk']
mid = df[df['RiskLevel'] == 'mid risk']

print(f"Toplam N = {len(df)}")
print(f"Düşük Risk Grubu (N_low)  : {len(low)} (%{len(low)/len(df)*100:.1f})")
print(f"Orta Risk Grubu (N_mid)   : {len(mid)} (%{len(mid)/len(df)*100:.1f})")
print(f"Yüksek Risk Grubu (N_high): {len(high)} (%{len(high)/len(df)*100:.1f})\n")

cols = [
    ('SystolicBP', 'Büyük Tansiyon (mmHg)'),
    ('DiastolicBP', 'Küçük Tansiyon (mmHg)'),
    ('BS', 'Açlık Şekeri (mmol/L)'),
    ('BodyTemp_C', 'Vücut Sıcaklığı (°C)'),
    ('HeartRate', 'İstirahat Nabzı (BPM)'),
    ('Age', 'Anne Yaşı (Yıl)')
]

for col, name in cols:
    t_stat, p_val = stats.ttest_ind(high[col], low[col], equal_var=False)
    print(f"--- {col} ({name}) ---")
    print(f"  Genel Ortalama: {df[col].mean():.2f} (SD: {df[col].std():.2f})")
    print(f"  Min - Max     : {df[col].min():.2f} - {df[col].max():.2f}")
    print(f"  Düşük Risk Ort: {low[col].mean():.2f} (406 hastanın ortalaması)")
    print(f"  Yüksek Risk Ort: {high[col].mean():.2f} (272 hastanın ortalaması)")
    print(f"  Fark (Delta)  : {high[col].mean() - low[col].mean():+.2f}")
    print(f"  Welch t-testi : t = {t_stat:.2f}, p = {p_val:.2e}\n")
