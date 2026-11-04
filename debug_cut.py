# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\generate_master_with_reports.py', 'r', encoding='utf-8') as f:
    text = f.read()

start_html = text.find("<!DOCTYPE html>")
end_html = text.find("</html>", start_html) + 7
html = text[start_html:end_html]

s_uci = html.find("<!-- UCI MATERNAL HEALTH RISK DATASET ANALYSIS -->")
e_uci = html.find("<!-- 25+ KL", s_uci)
print("s_uci:", s_uci, "e_uci:", e_uci)
html_cut = html[:s_uci] + html[e_uci:]

start_marker = "const DATASET_REPORTS = {"
end_marker = "    // MODAL CONTROLLER FUNCTIONS"

print("start_marker in html_cut:", html_cut.find(start_marker))
print("end_marker in html_cut:", html_cut.find(end_marker))
