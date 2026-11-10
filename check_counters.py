import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Search for 22/23 or 22 Veri or 21/23
matches = re.finditer(r'(22\s*/\s*23|21\s*/\s*23|22\s*Veri|21\s*Veri)', text, re.IGNORECASE)
found = False
for m in matches:
    found = True
    start = max(0, m.start() - 50)
    end = min(len(text), m.end() + 50)
    print(f"Match: {m.group(0)} at {m.start()}: {repr(text[start:end])}")

if not found:
    print("No outdated 22/23 counters found!")
