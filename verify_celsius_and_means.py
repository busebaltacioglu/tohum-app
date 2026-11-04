# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

print("1. Has 37.04 °C in Table 1:", "37.04 °C" in text)
print("2. Has Low Risk 36.87 °C:", "36.87 °C" in text)
print("3. Has High Risk 37.17 °C:", "37.17 °C" in text)
print("4. Has 'Ortalamalar Nasıl Hesaplandı' box:", "Ortalamaları Nasıl Hesaplandı" in text)
print("5. Has Welch t-test mention:", "Welch Bağımsız İki Örneklem t-Testi" in text)
print("6. Has simTemp with 37.0 default:", 'id="simTemp" value="37.0"' in text)
print("7. Has dedicated python pipeline badge:", 'pipelines/pipeline_uci_maternal.py' in text)
print("8. Has 6 Jury Defense Questions:", 'Soru 1:' in text and 'Soru 6:' in text)
