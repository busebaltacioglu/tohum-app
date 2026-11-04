# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx_view = text.find('id="view-data"')
idx_klinik = text.find('Klinik Do', idx_view)
if idx_klinik == -1:
    idx_klinik = text.find('KL', idx_view)

print('view-data to klinik:')
print(text[idx_view:idx_klinik])
