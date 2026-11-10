import sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', encoding='utf-8') as f:
    text = f.read()

idx = text.rfind("'weight_height_breastfeeding':")
if idx == -1:
    idx = text.rfind('"weight_height_breastfeeding":')

print("Found at:", idx)
# Find the next closing of the object
closing = text.find("\n    };", idx)
if closing != -1:
    print("DATASET_REPORTS closing at:", closing)
    print("Surrounding text:")
    print(text[closing-200:closing+200])
else:
    print("Could not find closing }; after weight_height_breastfeeding")
