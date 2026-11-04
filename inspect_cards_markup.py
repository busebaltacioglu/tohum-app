# -*- coding: utf-8 -*-
with open(r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\generate_master_with_reports.py", "r", encoding="utf-8") as f:
    text = f.read()

s = text.find("openDatasetReport('uci_maternal')")
div_start = text.rfind('<div class="p-3.5 rounded-xl', 0, s)
div_end = text.find('</div>\n\n            <!-- 2. FETAL HEALTH', s)
print(text[div_start:div_end])
