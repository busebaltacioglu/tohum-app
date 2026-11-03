# -*- coding: utf-8 -*-
import re

with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\generate_master_with_reports.py', 'r', encoding='utf-8') as f:
    text = f.read()

keys = re.findall(r'localStorage\.(?:getItem|setItem)\(["\']([^"\']+)["\']', text)
print('Storage keys:', set(keys))

# Check reports
start_rep = text.find('const DATASET_REPORTS = {')
end_rep = text.find('// MODAL CONTROLLER FUNCTIONS', start_rep)
print('Reports block start:', start_rep, 'end:', end_rep)
