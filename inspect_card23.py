with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', encoding='utf-8') as f:
    text = f.read()

import re
m = re.search(r'<!-- mamagent_capstone -->', text)
if m:
    start = max(0, m.start() - 50)
    end = min(len(text), m.start() + 1400)
    print(text[start:end])
