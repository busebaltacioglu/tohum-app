# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\generate_master_academic_reports.py', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
for i, l in enumerate(lines[1480:1560], start=1480):
    print(f"{i}: {l[:100]}")
