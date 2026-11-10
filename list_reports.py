import re, sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', encoding='utf-8') as f:
    text = f.read()

keys = re.findall(r"['\"]([a-zA-Z0-9_]+)['\"]:\s*\{[\s\r\n]*title:", text)
print(f"Total reports defined in DATASET_REPORTS: {len(keys)}")
for i, k in enumerate(keys):
    print(f"{i+1}. {k}")
