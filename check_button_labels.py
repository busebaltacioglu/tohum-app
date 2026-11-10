import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's inspect each card's button text
matches = re.finditer(r'<button\s+onclick="openDatasetReport\(\'([^\']+)\'\)"[^>]*>([\s\S]*?)</button>', text)
for m in matches:
    d_id = m.group(1)
    btn_html = m.group(2).strip().replace('\n', ' ')
    btn_html = re.sub(r'\s+', ' ', btn_html)
    print(f"Dataset {d_id}: Button -> {btn_html}")
