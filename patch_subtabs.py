# -*- coding: utf-8 -*-
p = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js"
with open(p, "r", encoding="utf-8") as f:
    text = f.read()

old_list = '''        ${[
          { id: 'identity', lbl: '👩 Ben & Bebeğim' },
          { id: 'hospital', lbl: '🏥 Hastane & Doktor' },
          { id: 'partner',  lbl: '🤝 Eşim & Davet' },
          { id: 'baseline', lbl: '🩺 Sağlık Anketim' },
          { id: 'ecosystem',lbl: '🌱 Aile & Hesap' }
        ].map(t => `'''

new_list = '''        ${[
          { id: 'identity', lbl: '👩 Ben & Bebeğim' },
          { id: 'baseline', lbl: '❤️ M0 Bazal & Kilo' },
          { id: 'supplements', lbl: '💊 DMT1 Takvim' },
          { id: 'hospital', lbl: '🏥 Hastane & Doktor' },
          { id: 'partner',  lbl: '🤝 Eşim & Davet' },
          { id: 'security', lbl: '🔒 Veri & KVKK' },
          { id: 'ecosystem',lbl: '🌱 Giriş & Anket' }
        ].map(t => `'''

if old_list in text:
    text = text.replace(old_list, new_list)
    with open(p, "w", encoding="utf-8") as f:
        f.write(text)
    print("Updated subtabs array successfully!")
else:
    print("Old list pattern not found!")
