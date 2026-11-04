# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\generate_master_academic_reports.py', 'r', encoding='utf-8') as f:
    text = f.read()

idx1 = text.find("reports['uci_maternal'] = {")
idx2 = text.find("reports['fetal_ctg'] = {")
print("uci_maternal bounds in generate_master_academic_reports.py:", idx1, idx2)
