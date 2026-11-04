# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\uci_block_extracted.html', 'r', encoding='utf-8') as f:
    text = f.read()

print('UCI block length:', len(text))
# Let's check the main sections inside uci_block_extracted.html
import re
sections = re.findall(r'<!--\s*(.*?)\s*-->', text)
print('Comments / sections found in UCI block:')
for s in sections:
    print(' -', s)
