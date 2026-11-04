# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'DATASET_REPORTS', text)]
print('All DATASET_REPORTS matches:', matches)
for m in matches:
    print(text[m-20:m+60])

matches_uci = [m.start() for m in re.finditer(r'uci_maternal', text)]
print('All uci_maternal matches:', matches_uci)
