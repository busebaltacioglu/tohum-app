# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\uci_block_extracted.html', 'r', encoding='utf-8') as f:
    text = f.read()

for i, line in enumerate(text.splitlines()[50:162], start=50):
    print(f"{i:2d}: {line[:100]}")
