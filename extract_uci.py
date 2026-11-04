# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

start_marker = '<!-- UCI MATERNAL HEALTH RISK DATASET ANALYSIS -->'
end_marker = '<!-- 25+ KL'

s = text.find(start_marker)
e = text.find(end_marker)

print('Start:', s, 'End:', e)
chunk = text[s:e]
print('Length of UCI block:', len(chunk))
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\uci_block_extracted.html', 'w', encoding='utf-8') as f:
    f.write(chunk)
print('Saved uci_block_extracted.html')
