import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx = text.find('<!-- Lejant Rozetleri -->')
if idx != -1:
    print(text[idx:idx+1500])
