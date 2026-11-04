# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\generate_master_with_reports.py', 'r', encoding='utf-8') as f:
    text = f.read()

start_html = text.find("<!DOCTYPE html>")
end_html = text.find("</html>", start_html) + 7
html = text[start_html:end_html]

start_marker = "const DATASET_REPORTS = {"
end_marker = "    // MODAL CONTROLLER FUNCTIONS"

print("start_marker in html:", html.find(start_marker))
print("end_marker in html:", html.find(end_marker))
print("DATASET_REPORTS in html:", [m.start() for m in [re for re in [html.find("DATASET_REPORTS")]]])
