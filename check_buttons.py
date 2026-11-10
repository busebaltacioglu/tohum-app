import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Find all openDatasetReport calls
calls = re.findall(r"openDatasetReport\(['\"]([a-zA-Z0-9_]+)['\"]\)", text)
print(f"Total openDatasetReport buttons found in HTML: {len(calls)}")
unique_calls = list(dict.fromkeys(calls))
print(f"Unique datasets linked to buttons: {len(unique_calls)}")
for i, u in enumerate(unique_calls):
    print(f"{i+1}. {u}")
