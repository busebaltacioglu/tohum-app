# -*- coding: utf-8 -*-
with open(r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\generate_master_academic_reports.py", "r", encoding="utf-8") as f:
    text = f.read()

# Replace {trees} with {{trees}}
text = text.replace("{trees}", "{{trees}}")

with open(r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\generate_master_academic_reports.py", "w", encoding="utf-8") as f:
    f.write(text)

print("Fixed {trees} escape in generate_master_academic_reports.py!")
