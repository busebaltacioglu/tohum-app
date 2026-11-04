# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\generate_master_with_reports.py', 'r', encoding='utf-8') as f:
    text = f.read()

s = text.find("const DATASET_REPORTS = {")
e = text.find("    // MODAL CONTROLLER FUNCTIONS")
print("generate_master_with_reports.py s:", s, "e:", e)
