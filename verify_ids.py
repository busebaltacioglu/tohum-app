import sys

with open('C:/Users/busenur.baltacioglu/.gemini/antigravity/scratch/tohum-app/public/komuta_merkezi.html', 'r', encoding='utf-8') as f:
    html = f.read()

required_ids = [
    'processListA', 'processListB', 'processListC',
    'quickActionList', 'globalProgressText',
    'timelineContainer', 'timelineStatsText',
    'currentSectionIcon', 'currentSectionTitle', 'currentSectionSubtitle',
    'procDetailBadge', 'procDetailTitle', 'procDetailDesc', 'procDetailLead',
    'procDetailStage', 'procDetailCode', 'procDetailInputs', 'procDetailOutputs',
    'procDetailProgress', 'procChecklist',
    'view-dashboard', 'view-timeline', 'view-gantt', 'view-finance', 'view-roles', 'view-process-detail'
]

missing = []
for rid in required_ids:
    if f'id="{rid}"' not in html and f"id='{rid}'" not in html:
        missing.append(rid)

if missing:
    print('MISSING IDS:', missing)
else:
    print('ALL IDs PRESENT AND MATCHED!')
