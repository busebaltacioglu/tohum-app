# -*- coding: utf-8 -*-
"""
Generator that incorporates Buse Nur Baltacıoğlu's 2021 & 2024 Theses
directly into the 7-Step Machine Learning Lifecycle for all datasets in komuta_merkezi.html.
"""
import sys

out_path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html"

# We will read the base komuta_merkezi.html and embed the complete, enriched 7-step academic reports with exact thesis references
with open(out_path, "r", encoding="utf-8") as f:
    content = f.read()

print("Read komuta_merkezi.html successfully, length:", len(content))
