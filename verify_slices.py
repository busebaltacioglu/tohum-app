# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\uci_block_extracted.html', 'r', encoding='utf-8') as f:
    text = f.read()

table_html = text[text.find('<div class="bg-white rounded-xl border border-[#e5e2da] overflow-x-auto'):text.find('</table>') + 8] + '</div>'
jury_html = text[text.find('<div class="bg-amber-50/60'):text.find('<!-- 3. E')]
kpi_html = text[text.find('<div class="grid grid-cols-1 sm:grid-cols-3'):text.find('<!-- CANLI')]
sim_html = text[text.find('<div class="bg-white rounded-2xl border border-[#e5e2da] p-6 space-y-5'):]

print('table_html len:', len(table_html))
print('jury_html len:', len(jury_html))
print('kpi_html len:', len(kpi_html))
print('sim_html len:', len(sim_html))
