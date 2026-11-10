# -*- coding: utf-8 -*-
import re

p = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js"
with open(p, "r", encoding="utf-8") as f:
    text = f.read()

pat = re.compile(r"window\.sendPartnerPainAlert\s*=\s*function\(\)\s*\{[\s\S]*?setTimeout\(\(\)\s*=>\s*window\.open\(waUrl,\s*'_blank'\),\s*\d+\);\s*\};")

repl = """window.sendPartnerPainAlert = function() {
  const week = state.baby.week;
  const msg = `${state.partner.shortName || 'Oğuz'}, ${week}. haftada dalga/kasılma hissediyorum. Lütfen telefona bak veya eve gel 🌱 (ToHUM)`;
  openWhatsAppModal(
    "partner_pain",
    state.partner.name || "Oğuz Baltacıoğlu",
    state.partner.phone || "+90 532 000 00 00",
    msg
  );
};"""

text, n = pat.subn(repl, text)
with open(p, "w", encoding="utf-8") as f:
    f.write(text)

print(f"Substituted sendPartnerPainAlert: {n}")
