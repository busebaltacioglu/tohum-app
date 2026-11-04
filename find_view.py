# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'<div[^>]*id="([^"]+)"', text)
print('IDs found:', matches[:30])

for line in text.splitlines():
    if 'Veri K' in line or 'Büt' in line or 'switch' in line or 'KL' in line or 'Klinik' in line or '124' in line:
        print(line[:120])
