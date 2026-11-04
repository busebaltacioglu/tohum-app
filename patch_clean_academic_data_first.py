# -*- coding: utf-8 -*-
"""
Patch Clean Academic Data-First
Applies Buse Nur's pure data-science principles:
1. "birde tezde uygulanmış o zaman onu uygulayalım diye bir mantıkta olmamalı veriye en uygun metot neyse o olmalı"
2. "eksik değer kontrolü yaptık yoktu o zaman geçtik vardı x metotunu bu sebepten uyguladık vs diğer adımlar içinde öyle"
3. Cleans forced thesis labels from breadcrumbs and replaces with factual, data-driven decisions.
"""

import os
import re

base_dir = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app"
acad_file = os.path.join(base_dir, "generate_master_academic_reports.py")
celsius_file = os.path.join(base_dir, "build_perfect_master_with_celsius.py")

# 1. Update b_html in generate_master_academic_reports.py
with open(acad_file, "r", encoding="utf-8") as f:
    acad_text = f.read()

# Replace breadcrumb in acad_text
old_breadcrumb = """    <div class="space-y-2 mb-4 p-3 rounded-xl bg-[#faf9f6] border border-[#e5e2da]">
      <div class="flex flex-wrap items-center justify-between gap-1">
        <span class="text-[11px] font-bold uppercase tracking-wider text-[#1c1a18]">7 Adımlı Akademik Makine Öğrenimi Döngüsü</span>
        <div class="flex items-center gap-1.5">
          <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold">2021 Tezi: MWMOTE / Dengesizlik & MissForest</span>
          <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">2024 Tezi: SFS / Özellik Seçimi</span>
        </div>
      </div>"""

new_breadcrumb = """    <div class="space-y-2 mb-4 p-3 rounded-xl bg-[#faf9f6] border border-[#e5e2da]">
      <div class="flex flex-wrap items-center justify-between gap-1">
        <span class="text-[11px] font-bold uppercase tracking-wider text-[#1c1a18]">7 Adımlı Bilimsel Makine Öğrenimi Süreci (ML Lifecycle)</span>
        <div class="flex items-center gap-1.5">
          <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-[#f0ede6] text-[#544f47] font-semibold">Veriye Dayalı Metot Seçimi</span>
          <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">Akademik & Klinik Titizlik</span>
        </div>
      </div>"""

if old_breadcrumb in acad_text:
    acad_text = acad_text.replace(old_breadcrumb, new_breadcrumb)
    with open(acad_file, "w", encoding="utf-8") as f:
        f.write(acad_text)
    print("Updated breadcrumb in generate_master_academic_reports.py!")
else:
    print("Old breadcrumb not found verbatim in acad_file, checking regex...")
    acad_text = re.sub(
        r'<div class="flex items-center gap-1.5">\s*<span class="text-\[9px\] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold">2021 Tezi:.*?</span>\s*<span class="text-\[9px\] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">2024 Tezi:.*?</span>\s*</div>',
        '<div class="flex items-center gap-1.5"><span class="text-[9px] font-mono px-2 py-0.5 rounded bg-[#f0ede6] text-[#544f47] font-semibold">Veriye Dayalı Metot Seçimi</span><span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">Akademik & Klinik Titizlik</span></div>',
        acad_text
    )
    with open(acad_file, "w", encoding="utf-8") as f:
        f.write(acad_text)
    print("Replaced breadcrumb via regex in generate_master_academic_reports.py!")

print("Patch complete for generate_master_academic_reports.py!")
