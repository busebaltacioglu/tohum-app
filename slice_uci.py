# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\uci_block_extracted.html', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's break it into:
# 1. Table
# 2. Jury banner
# 3. KPI cards
# 4. Simulator

idx_table_start = text.find('<table')
idx_table_end = text.find('</table>') + 8

idx_jury_start = text.find('<!-- 2. J')
idx_jury_end = text.find('<!-- 3. E')

idx_kpi_start = text.find('<!-- 3. E')
idx_kpi_end = text.find('<!-- CANLI')

idx_sim_start = text.find('<!-- CANLI')

print('Table bounds:', idx_table_start, idx_table_end)
print('Jury bounds:', idx_jury_start, idx_jury_end)
print('KPI bounds:', idx_kpi_start, idx_kpi_end)
print('Sim bounds:', idx_sim_start, len(text))
