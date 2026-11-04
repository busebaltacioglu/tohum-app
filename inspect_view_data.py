# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

idx_view_data = text.find('id="view-data"')
idx_library_header = text.find('ToHUM', idx_view_data)
# find the exact h3 or div of the library
idx_lib = text.find('ToHUM B', idx_view_data)
print('view-data at:', idx_view_data)
print('ToHUM B... at:', idx_lib)

# Let's see what is between idx_view_data and idx_lib
between = text[idx_view_data:idx_lib]
print('Length between view-data and library:', len(between))
print('Snippet at start of between:')
print(between[:500])
print('---')
print('Snippet at end of between:')
print(between[-500:])
