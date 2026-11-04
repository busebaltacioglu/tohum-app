# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('DATASET_REPORTS')
print('DATASET_REPORTS at:', idx)
print(text[idx:idx+500])
