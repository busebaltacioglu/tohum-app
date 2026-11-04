# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

print("File size:", len(text))
idx = text.find("'uci_maternal': {")
print("uci_maternal in DATASET_REPORTS at:", idx)
if idx != -1:
    print(text[idx:idx+800])
else:
    print("Not found! Let's search for DATASET_REPORTS:")
    r_idx = text.find("DATASET_REPORTS")
    print("DATASET_REPORTS at:", r_idx)
    print(text[r_idx:r_idx+500])
