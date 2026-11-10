import sys
sys.stdout.reconfigure(encoding='utf-8')
p = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js"
with open(p, "r", encoding="utf-8") as f:
    c = f.read()

c = c.replace("desc: 'Bazal 90/60 dışına çıkıldığında Oğuz'a sakinleştirici destek uyarısı gider'", 'desc: "Bazal 90/60 dışına çıkıldığında Oğuz\'a sakinleştirici destek uyarısı gider"')
c = c.replace("desc: 'Yorgunluk veya bel ağrısı girdiğinizde Oğuz'a dinlenme/destek önerisi düşer'", 'desc: "Yorgunluk veya bel ağrısı girdiğinizde Oğuz\'a dinlenme/destek önerisi düşer"')

with open(p, "w", encoding="utf-8") as f:
    f.write(c)

idx_p = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\index.html"
with open(idx_p, "r", encoding="utf-8") as f:
    ih = f.read()
ih = ih.replace("app.js?v=v21_m0_workplan", "app.js?v=v22_m0_profile")
with open(idx_p, "w", encoding="utf-8") as f:
    f.write(ih)

print("Fixed quotes in app.js and updated cache buster in index.html!")
