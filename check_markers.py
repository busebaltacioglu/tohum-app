# -*- coding: utf-8 -*-
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

s1 = text.find("'uci_maternal': {")
s2 = text.find("'fetal_ctg': {")
print("s1:", s1, "s2:", s2)
print(text[s1:s1+300])
