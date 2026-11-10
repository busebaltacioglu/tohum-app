import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', encoding='utf-8') as f:
    text = f.read()

import re
m = re.search(r'<!-- mamagent_capstone -->', text)
if m:
    start = m.start()
    end = min(len(text), start + 1800)
    print(text[start:end])
