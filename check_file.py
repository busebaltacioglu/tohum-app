# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

print("File size:", len(text))
idx = text.find("'uci_maternal'")
print("uci_maternal at:", idx)
print(text[idx:idx+400])
