# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\generate_master_academic_reports.py', 'r', encoding='utf-8') as f:
    text = f.read()

lines = text.splitlines()
print(f"Total lines: {len(lines)}")
for i, l in enumerate(lines[-50:], start=len(lines)-50):
    print(f"{i}: {l[:100]}")
