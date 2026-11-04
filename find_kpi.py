# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\uci_block_extracted.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('GENEL MODEL')
if idx == -1:
    idx = text.find('Genel Model')
if idx == -1:
    idx = text.find('94.6')
print('Found 94.6 at:', idx)
print(text[idx-200:idx+300])
