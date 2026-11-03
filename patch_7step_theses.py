# -*- coding: utf-8 -*-
"""
Full generator for ToHUM Master Command Center with:
- Academic 7-Step ML Lifecycle directly referencing Buse Nur Baltacıoğlu's 2021 & 2024 MSc Theses.
- Interactive modal with 7-step progress ribbon, thesis badges, and exhaustive clinical/statistical proofs.
- 25+ datasets with dual action buttons: [Raporu Aç 📊] and [Kaynağı Aç ↗].
- Fully preserved localStorage state (ticks, custom tasks, notes).
"""
import sys

out_path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html"

# Helper for 7-step breadcrumb with thesis badges
def render_7step_header():
    return """
    <div class="space-y-2 mb-4 p-3 rounded-xl bg-[#faf9f6] border border-[#e5e2da]">
      <div class="flex flex-wrap items-center justify-between gap-1">
        <span class="text-[11px] font-bold uppercase tracking-wider text-[#1c1a18]">7 Adımlı Akademik Makine Öğrenimi Döngüsü (Tez Metodolojisi)</span>
        <div class="flex items-center gap-1.5">
          <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-bold">2021 Tezi: MWMOTE / Dengesizlik</span>
          <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold">2024 Tezi: SFS / Özellik Seçimi</span>
        </div>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-1.5 text-[10px] font-mono text-center pt-1">
        <div class="p-1 rounded bg-amber-50 text-amber-900 border border-amber-200 font-semibold">1. Collection</div>
        <div class="p-1 rounded bg-emerald-50 text-emerald-900 border border-emerald-200 font-semibold">2. Preparation</div>
        <div class="p-1 rounded bg-blue-50 text-blue-900 border border-blue-200 font-semibold">3. Selection</div>
        <div class="p-1 rounded bg-indigo-50 text-indigo-900 border border-indigo-200 font-semibold">4. Training</div>
        <div class="p-1 rounded bg-purple-50 text-purple-900 border border-purple-200 font-semibold">5. Evaluation</div>
        <div class="p-1 rounded bg-pink-50 text-pink-900 border border-pink-200 font-semibold">6. Improvement</div>
        <div class="p-1 rounded bg-slate-100 text-slate-900 border border-slate-300 font-semibold">7. Prediction</div>
      </div>
    </div>
    """

# Read existing generate_master_with_reports.py to retain all cards, tasks, header, widgets
with open(r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\generate_master_with_reports.py", "r", encoding="utf-8") as f:
    script_source = f.read()

# We will upgrade the reports in DATASET_REPORTS with the explicit 7-step structure and thesis citations!
print("Loaded script source. Updating reports dictionary...")
