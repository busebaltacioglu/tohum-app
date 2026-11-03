# -*- coding: utf-8 -*-
"""
Generator for ToHUM Master Command Center with:
1. Academic 7-Step Machine Learning Lifecycle in all Dataset Reports:
   - 1. Data Collection (Sources & Quality)
   - 2. Data Preparation (Clean, Transform, Imbalance & Feature Selection from Buse's theses)
   - 3. Model Selection (Algorithm Choice & Academic Justification)
   - 4. Model Training (Learning Process, Stratified K-Fold CV, Pipeline)
   - 5. Model Evaluation (Test Performance, Confusion Matrix, Recall, F1, ROC-AUC)
   - 6. Model Improvement (Fine-tune, Bayesian Optimization, Threshold Calibration)
   - 7. Prediction (Deployment, Inference & ToHUM Rule Engine)
2. Interactive breadcrumb and visual badge in modal header.
3. Stable persistence (no ticks lost), official TÜBİTAK/DEPARK calendar.
4. Clean UTF-8 console output.
"""
import sys

out_path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html"

# Read the base template from generate_master_with_reports.py and upgrade DATASET_REPORTS with the rigorous 7-step ML architecture
with open(r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\generate_master_with_reports.py", "r", encoding="utf-8") as f:
    base_code = f.read()

# Let's inspect what parts we need to replace or rewrite
print("Base generator read successfully, size:", len(base_code))
