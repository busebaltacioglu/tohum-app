# -*- coding: utf-8 -*-
import re

with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', 'r', encoding='utf-8') as f:
    text = f.read()

print("File size:", len(text))
print("Starts with <!DOCTYPE html>:", text.strip().startswith("<!DOCTYPE html>"))
print("Ends with </html>:", text.strip().endswith("</html>"))

# Check button calls vs report keys
button_keys = set(re.findall(r"openDatasetReport\('([^']+)'\)", text))
report_keys = set(re.findall(r"'([a-z0-9_]+)':\s*\{\s*title:", text))

print(f"Total buttons: {len(button_keys)}")
print(f"Total report objects: {len(report_keys)}")
diff = button_keys - report_keys
print(f"Missing reports: {diff}")

# Check step 2 keywords in reports
missing_prep_checks = []
for k in button_keys:
    if k in text:
        # find the report snippet
        idx = text.find(f"'{k}':")
        chunk = text[idx:idx+4000]
        has_dtype = "Veri Tipleri" in chunk or "Dtype" in chunk
        has_missing = "Eksik Değer" in chunk or "MissForest" in chunk
        if not (has_dtype and has_missing):
            missing_prep_checks.append(k)

print(f"Datasets missing Step 2 Data Prep audit: {missing_prep_checks}")

# Check storage keys
storage_keys = set(re.findall(r'tohum_stable_[a-z0-9_]+', text))
print("Stable storage keys:", storage_keys)

# Check mojibake
mojibake = ['Ã§', 'Ä°', 'Ã¼', 'ÄŸ', 'Ã¶', 'ÅŸ', 'â†—', 'ğŸ']
found_mojibake = [m for m in mojibake if m in text]
print("Found mojibake:", found_mojibake)
