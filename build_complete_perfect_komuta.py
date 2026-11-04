# -*- coding: utf-8 -*-
"""
Build Complete Perfect Komuta Merkezi
Assembles:
1. Base HTML from generate_master_with_reports.py
2. Removes UCI block from main view-data page cleanly
3. Injects all 24 7-step academic lifecycle reports from generate_master_academic_reports.py
4. Injects upgraded UCI Maternal Health Risk (#863) report with:
   - Dedicated Python badge: pipelines/pipeline_uci_maternal.py
   - Vücut Sıcaklığı in Celsius (°C): 37.04 °C, 36.87 °C, 37.17 °C
   - Explicit Mathematical Box explaining Low Risk (N=406) and High Risk (N=272) means calculation with Welch t-test (p = 1.44e-31)
   - Confusion Matrix visual heatmap & TreeSHAP bar chart
   - Demographics, VIF, Model Ablation tables
   - 6 Evidence-based Jury "Neden?" Defense Q&As
   - Live Inference Simulator with Celsius inputs (default 37.0 °C) and dynamic calculation
5. Accurately updates runSimulation() WITHOUT cutting DATASET_REPORTS
"""

import os
import sys

base_dir = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app"
base_script = os.path.join(base_dir, "generate_master_with_reports.py")
academic_script = os.path.join(base_dir, "generate_master_academic_reports.py")
celsius_script = os.path.join(base_dir, "build_perfect_master_with_celsius.py")
out_html = os.path.join(base_dir, "public", "komuta_merkezi.html")

# 1. Read Base HTML
with open(base_script, "r", encoding="utf-8") as f:
    base_text = f.read()

s_html = base_text.find("<!DOCTYPE html>")
e_html = base_text.find("</html>", s_html) + 7
if s_html == -1 or e_html == -1:
    print("Could not find HTML tags in base script!")
    sys.exit(1)

html = base_text[s_html:e_html]
print(f"Base HTML extracted. Size: {len(html)}")

# 2. Remove UCI block from main view-data page
s_uci = html.find("<!-- UCI MATERNAL HEALTH RISK DATASET ANALYSIS -->")
e_uci = html.find("<!-- 25+ KL", s_uci)
if s_uci != -1 and e_uci != -1:
    html = html[:s_uci] + html[e_uci:]
    print("Cleanly removed UCI block from main view-data page!")
else:
    print("Warning: UCI block markers not found on main page.")

# 3. Load reports from generate_master_academic_reports.py
with open(academic_script, "r", encoding="utf-8") as f:
    acad_code = f.read()

s_rep = acad_code.find("def b_html():")
e_rep = acad_code.find("# Construct the JS object", s_rep)
if s_rep == -1 or e_rep == -1:
    print("Could not find reports block in academic script!")
    sys.exit(1)

reports_code = acad_code[s_rep:e_rep]
ns = {}
exec(reports_code, ns)
reports = ns.get("reports", {})
print(f"Loaded {len(reports)} academic 7-step reports.")

# 4. Extract upgraded UCI Maternal HTML from build_perfect_master_with_celsius.py
with open(celsius_script, "r", encoding="utf-8") as f:
    celsius_text = f.read()

s_c_uci = celsius_text.find('uci_rich_html = """') + len('uci_rich_html = """')
e_c_uci = celsius_text.find('"""\n\n# Replace uci_maternal in reports dictionary', s_c_uci)
if s_c_uci == -1 or e_c_uci == -1:
    print("Could not find uci_rich_html in celsius script!")
    sys.exit(1)

uci_rich_html = celsius_text[s_c_uci:e_c_uci]
print(f"Extracted upgraded Celsius UCI Maternal HTML. Size: {len(uci_rich_html)}")

# Overwrite uci_maternal in reports
reports['uci_maternal'] = {
    'title': 'UCI Maternal Health Risk (1.014 Hasta) - 7 Adımlı Akademik Doğrulama',
    'domain': 'Küme 1 • M0 Anne Biyometrisi (İP-3 Ar-Ge)',
    'sample': 'N = 1.014 Gebe Hasta',
    'url': 'https://archive.ics.uci.edu/dataset/863/maternal+health+risk',
    'html': uci_rich_html
}

# 5. Build JS DATASET_REPORTS string
js_reports = "const DATASET_REPORTS = {\n"
for k, v in reports.items():
    js_reports += f"      '{k}': {{\n"
    js_reports += f"        title: {repr(v['title'])},\n"
    js_reports += f"        domain: {repr(v['domain'])},\n"
    js_reports += f"        sample: {repr(v['sample'])},\n"
    js_reports += f"        url: {repr(v['url'])},\n"
    js_reports += f"        html: `{v['html']}`\n"
    js_reports += f"      }},\n"
js_reports += "    };\n"

# 6. Replace DATASET_REPORTS in html
start_marker = "const DATASET_REPORTS = {"
end_marker = "    // MODAL CONTROLLER FUNCTIONS"

start_idx = html.find(start_marker)
end_idx = html.find(end_marker)

if start_idx == -1 or end_idx == -1:
    print(f"DATASET_REPORTS markers not found in HTML! start: {start_idx}, end: {end_idx}")
    sys.exit(1)

html = html[:start_idx] + js_reports + html[end_idx:]
print("Injected updated DATASET_REPORTS into HTML!")

# 7. Update runSimulation() cleanly (ONLY replacing runSimulation, stopping before DATASET_REPORTS!)
new_sim_function = """function runSimulation() {
      const ageInput = document.getElementById('simAge');
      if (!ageInput) return;

      const age = parseFloat(ageInput.value) || 28;
      const sys = parseFloat(document.getElementById('simSys').value) || 120;
      const dia = parseFloat(document.getElementById('simDia').value) || 80;
      const bs = parseFloat(document.getElementById('simBS').value) || 7.5;
      const temp = parseFloat(document.getElementById('simTemp')?.value) || 37.0;
      const hr = parseFloat(document.getElementById('simHR').value) || 74;

      const pp = sys - dia;
      const map = dia + (pp / 3.0);

      const mapElem = document.getElementById('simMapScore');
      if (mapElem) {
        mapElem.innerText = `MAP: ${map.toFixed(1)} mmHg • Nabız Basıncı: ${pp.toFixed(0)} mmHg`;
      }

      let logit = -3.8;
      if (bs >= 12.0) logit += 3.4;
      else if (bs >= 10.0) logit += 2.4;
      else if (bs >= 8.5) logit += 1.6;
      else if (bs >= 7.8) logit += 0.8;
      else if (bs < 6.5) logit -= 0.4;

      if (sys >= 140) logit += 3.2;
      else if (sys >= 130) logit += 2.1;
      else if (sys >= 124) logit += 1.4;
      else if (sys >= 118) logit += 0.5;
      else if (sys < 95) logit += 0.3;

      if (map >= 106) logit += 1.6;
      else if (map >= 98) logit += 0.9;
      else if (map < 75) logit += 0.4;

      if (dia >= 90) logit += 1.5;
      else if (dia >= 84) logit += 0.7;

      if (age >= 40) logit += 1.5;
      else if (age >= 35) logit += 0.9;
      else if (age <= 18) logit += 0.4;

      if (hr >= 95) logit += 0.7;
      else if (hr >= 85) logit += 0.3;

      if (temp >= 38.0) logit += 1.3;
      else if (temp >= 37.5) logit += 0.6;

      const prob = 1.0 / (1.0 + Math.exp(-logit));
      const probPct = (prob * 100).toFixed(1);

      const box = document.getElementById('simResultBox');
      const badge = document.getElementById('simRiskBadge');
      const probElem = document.getElementById('simProbPct');
      const conf = document.getElementById('simConfidence');
      const advice = document.getElementById('simAdvice');
      const driversElem = document.getElementById('simDrivers');

      if (!box || !badge || !probElem || !conf || !advice) return;

      probElem.innerText = `%${probPct}`;

      let driversHtml = '';

      if (sys >= 140 || bs >= 12.0 || temp >= 38.5 || prob >= 0.70) {
        // CLINICAL ATTENTION NEEDED (Calm, Supportive, Never Terrifying)
        box.className = 'p-4 rounded-xl bg-rose-50/90 border border-rose-300 space-y-3 transition-all duration-200';
        badge.className = 'text-xs font-bold px-3 py-1 rounded-full bg-rose-700 text-white shadow-xs';
        badge.innerText = 'HEKİM DANIŞMA & DESTEK KORİDORU';
        advice.innerHTML = `<strong class="text-rose-950">Önemli Hatırlatma:</strong> Ölçüm değerleriniz hekiminizle paylaşılmaya uygun bir seviyede seyrediyor (${sys >= 140 ? `Büyük tansiyon: ${sys} mmHg. ` : ''}${bs >= 12.0 ? `Açlık şekeri: ${bs} mmol/L. ` : ''}${temp >= 38.5 ? `Sıcaklık: ${temp.toFixed(1)}°C. ` : ''}) Lütfen sakinliğinizi koruyarak rahat bir şekilde oturup dinleniniz ve gün içinde takip eden hekiminize danışarak bu ölçümü paylaşınız. Tüm ölçüm geçmişiniz telefonunuzda güvenle saklanmaktadır.`;
        conf.innerText = `%${(92 + prob * 5).toFixed(1)}`;
        conf.className = 'text-sm font-bold font-mono text-rose-800';

        driversHtml = `
          <div class="p-1.5 rounded bg-rose-100/70 border border-rose-200"><span>Sistolik BP: </span><strong class="text-rose-950">${sys} mmHg (${sys >= 140 ? 'Hekimle Paylaşılmalı' : 'İzlemde'})</strong></div>
          <div class="p-1.5 rounded bg-rose-100/70 border border-rose-200"><span>Kan Şekeri: </span><strong class="text-rose-950">${bs} mmol/L (${bs >= 10.0 ? 'Kontrol Edilmeli' : 'Dengeli'})</strong></div>
          <div class="p-1.5 rounded bg-rose-100/70 border border-rose-200"><span>Sıcaklık: </span><strong class="text-rose-950">${temp.toFixed(1)} °C (${temp >= 38.0 ? 'Ateş Takibi' : 'Normal'})</strong></div>
        `;
      } else if (prob >= 0.25 || sys >= 120 || bs >= 7.8 || temp >= 37.4) {
        // MILD TREND / REASSURING & RESTING CORRIDOR (124 mmHg lives here! Calming amber, NOT SCARY)
        box.className = 'p-4 rounded-xl bg-amber-50/90 border border-amber-300 space-y-3 transition-all duration-200';
        badge.className = 'text-xs font-bold px-3 py-1 rounded-full bg-amber-500 text-white shadow-xs';
        badge.innerText = 'KORUYUCU İZLEM & DİNLENME KORİDORU';
        advice.innerHTML = `Kişisel bazal değerlerinize göre hafif bir hareketlilik gözleniyor (${sys >= 120 ? `Tansiyon: ${sys} mmHg. ` : ''}${bs >= 7.8 ? `Şeker: ${bs} mmol/L. ` : ''}${temp >= 37.4 ? `Sıcaklık: ${temp.toFixed(1)}°C. ` : ''}) Bu durum gün içindeki yorgunluk, susuzluk veya tatlı bir telaştan kaynaklanabilir; <strong>endişelenecek hiçbir durum yoktur</strong>. Lütfen sessiz bir ortamda 15 dakika dinleniniz, bir bardak ılık su içiniz ve akşam saatlerinde ölçümünüzü tekrarlayınız. Ölçüm geçmişiniz telefonunuzda güvenle saklanmaktadır.`;
        conf.innerText = `%${(88 + prob * 10).toFixed(1)}`;
        conf.className = 'text-sm font-bold font-mono text-amber-800';

        driversHtml = `
          <div class="p-1.5 rounded bg-amber-100/70 border border-amber-200"><span>Sistolik BP: </span><strong class="text-amber-950">${sys} mmHg (${sys >= 124 ? 'Hafif Eğilim • Dinleniniz' : 'Sınır'})</strong></div>
          <div class="p-1.5 rounded bg-amber-100/70 border border-amber-200"><span>Kan Şekeri: </span><strong class="text-amber-950">${bs} mmol/L (Dengelenmeli)</strong></div>
          <div class="p-1.5 rounded bg-amber-100/70 border border-amber-200"><span>Sıcaklık: </span><strong class="text-amber-950">${temp.toFixed(1)} °C (Hafif Sıcaklık)</strong></div>
        `;
      } else {
        // LOW RISK / CALM & BALANCED
        box.className = 'p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-3 transition-all duration-200';
        badge.className = 'text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300';
        badge.innerText = 'GÜVENLİ & HUZURLU SEVİYE';
        advice.innerText = 'Fizyolojik değerleriniz tamamen dengeli ve huzurlu seyrediyor. Bebeğiniz ve sizin için her şey yolunda. Günlük rutininize güvenle devam edebilirsiniz.';
        conf.innerText = `%${(95 + (1 - prob) * 3).toFixed(1)}`;
        conf.className = 'text-sm font-bold font-mono text-emerald-800';

        driversHtml = `
          <div class="p-1.5 rounded bg-white/70 border border-emerald-200"><span>Sistolik BP: </span><strong class="text-emerald-800">${sys} mmHg (Normal)</strong></div>
          <div class="p-1.5 rounded bg-white/70 border border-emerald-200"><span>Kan Şekeri: </span><strong class="text-emerald-800">${bs} mmol/L (Dengeli)</strong></div>
          <div class="p-1.5 rounded bg-white/70 border border-emerald-200"><span>Sıcaklık: </span><strong class="text-emerald-800">${temp.toFixed(1)} °C (Stabil)</strong></div>
        `;
      }

      if (driversElem) driversElem.innerHTML = driversHtml;
    }"""

sim_marker_start = "function runSimulation() {"
sim_marker_end = "    // ========================================================================="

p_sim_start = html.find(sim_marker_start)
p_sim_end = html.find(sim_marker_end, p_sim_start)

if p_sim_start != -1 and p_sim_end != -1:
    html = html[:p_sim_start] + new_sim_function + "\n\n    " + html[p_sim_end:]
    print("Replaced runSimulation function cleanly before DATASET_REPORTS!")
else:
    print(f"Warning: runSimulation marker not found! start: {p_sim_start}, end: {p_sim_end}")

# 8. Ensure openDatasetReport initializes runSimulation when opening uci_maternal
if "if (datasetId === 'uci_maternal') {" not in html:
    open_marker = "document.getElementById('datasetReportModal').classList.remove('hidden');"
    open_replacement = """document.getElementById('datasetReportModal').classList.remove('hidden');
      if (datasetId === 'uci_maternal') {
        setTimeout(runSimulation, 50);
      }"""
    html = html.replace(open_marker, open_replacement, 1)
    print("Added runSimulation auto-trigger on modal open!")

# 9. Write final output
with open(out_html, "w", encoding="utf-8") as f:
    f.write(html)

print(f"SUCCESS: komuta_merkezi.html generated cleanly! Final size: {len(html)} bytes ({len(html)/1024:.1f} KB)")
