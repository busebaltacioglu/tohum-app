# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

import re

# 1. Check main page view-data content
idx_view_data = text.find('id="view-data"')
idx_reports_start = text.find('const DATASET_REPORTS = {')
main_view_chunk = text[idx_view_data:idx_reports_start]

print("1. UCI table on main view-data page:", "124.19 (Kritik Bulgumuz!)" in main_view_chunk)
print("   simResultBox on main view-data page:", "id=\"simResultBox\"" in main_view_chunk)
print("   'ToHUM Bütüncül Veri Kütüphanesi' on main view-data page:", "ToHUM Bütüncül Veri Kütüphanesi" in main_view_chunk)

# 2. Check uci_maternal report content
idx_uci = text.find("'uci_maternal': {")
idx_fetal = text.find("'fetal_ctg': {")
uci_report_chunk = text[idx_uci:idx_fetal]

print("2. uci_maternal has Table:", "124.19 (Kritik Bulgumuz!)" in uci_report_chunk)
print("   uci_maternal has 3 KPI cards:", "%94.6" in uci_report_chunk and "%96.8" in uci_report_chunk and "%96.4" in uci_report_chunk)
print("   uci_maternal has 124 mmHg banner:", "Neden Klasik Eşik Değerler (140/90) Yetersiz?" in uci_report_chunk)
print("   uci_maternal has Simulator:", "id=\"simResultBox\"" in uci_report_chunk and "id=\"simSys\"" in uci_report_chunk)
print("   uci_maternal has 7 steps:", "1. Data Collection" in uci_report_chunk and "7. Prediction" in uci_report_chunk)

# 3. Check openDatasetReport simulation auto-start
print("3. openDatasetReport triggers simulation:", "if (datasetId === 'uci_maternal')" in text)

# 4. Check total buttons and reports
buttons = set(re.findall(r"openDatasetReport\('([^']+)'\)", text))
reports = set(re.findall(r"'([a-z0-9_]+)':\s*\{\s*title:", text))
print(f"4. Total buttons: {len(buttons)}, Total reports: {len(reports)}, Difference: {buttons - reports}")

# 5. Check persistent storage keys
storage_keys = set(re.findall(r'tohum_stable_[a-z0-9_]+', text))
print("5. Storage keys:", storage_keys)

# 6. Check mojibake
mojibake = ['Ã§', 'Ä°', 'Ã¼', 'ÄŸ', 'Ã¶', 'ÅŸ', 'â†—', 'ğŸ']
found_mojibake = [m for m in mojibake if m in text]
print("6. Mojibake found:", found_mojibake)
