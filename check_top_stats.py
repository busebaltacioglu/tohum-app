import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's search for "23" in the top dashboard cards (first 25000 characters)
m = re.findall(r'<div[^>]*class="[^"]*stat[^"]*"[\s\S]*?</div>', text[:25000])
print("Found stats blocks:", len(m))

# Let's search for 23 Veri Seti or similar
for line in text[:30000].splitlines():
    if any(k in line for k in ['Veri Seti', 'Aktif Veri', 'Tamamlan', '23 / 23', '22 / 23']):
        print(line.strip())
