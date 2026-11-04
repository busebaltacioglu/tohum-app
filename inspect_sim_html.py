# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\uci_block_extracted.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect the simulator part
idx_sim = text.find('CANLI')
if idx_sim == -1:
    idx_sim = text.find('simResultBox')
print('Simulator HTML length:', len(text[idx_sim-200:]))
print(text[idx_sim-200:idx_sim+500])
