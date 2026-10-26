import re

with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js', 'r', encoding='utf-8') as f:
    text = f.read()

tabs = re.findall(r'activeTab\s*===\s*[\'\"]([^\'\"]+)[\'\"]', text)
print('activeTab:', set(tabs))

subtabs = re.findall(r'activeSubTab\s*===\s*[\'\"]([^\'\"]+)[\'\"]', text)
print('activeSubTab:', set(subtabs))

roles = re.findall(r'currentRole\s*===\s*[\'\"]([^\'\"]+)[\'\"]', text)
print('currentRole:', set(roles))

userRole = re.findall(r'userRole\s*===\s*[\'\"]([^\'\"]+)[\'\"]', text)
print('userRole:', set(userRole))
