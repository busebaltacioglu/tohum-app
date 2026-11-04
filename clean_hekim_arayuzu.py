# -*- coding: utf-8 -*-
"""
Remove Hekim Arayüzü / Hekim Takip Paneli / Hekim Telemetrisi references:
Focus entirely on the Mother & Baby mobile experience.
Take note of Hekim Paneli for future roadmap phases (Aşama 2+ / TRL-7).
"""

import os

celsius_script = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\build_perfect_master_with_celsius.py"
master_builder = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\build_complete_perfect_komuta.py"

# 1. Update build_perfect_master_with_celsius.py
with open(celsius_script, "r", encoding="utf-8") as f:
    text_c = f.read()

# Replace pos2:
text_c = text_c.replace(
    "takip eden kadın doğum hekimine de arka planda sessizce koruyucu bir izlem özeti iletir.",
    "anneye kendi doğal ritmini güvenle takip edebileceği koruyucu ve şefkatli bir farkındalık sunar."
)

# Replace pos1:
text_c = text_c.replace(
    "ve hekim bildirim uyarısı gerçek zamanlı güncellenir.",
    "ve kişiselleştirilmiş rehberlik önerisi anlık güncellenir."
)

# Replace pos3:
text_c = text_c.replace(
    "hekime ek başvuru aciliyeti öngörülmüyor. Rutin kontrollerle devam edilebilir.",
    "bebeğiniz ve sizin için her şey dengeli seyrediyor. Rutin günlük kontrollerle devam edebilirsiniz."
)
text_c = text_c.replace(
    "hekime ek başvuru aciliyeti öngörülmüyor.",
    "bebeğiniz ve sizin için her şey dengeli seyrediyor."
)

with open(celsius_script, "w", encoding="utf-8") as f:
    f.write(text_c)

print("SUCCESS: Updated build_perfect_master_with_celsius.py!")

# 2. Update build_complete_perfect_komuta.py
with open(master_builder, "r", encoding="utf-8") as f:
    text_m = f.read()

# Replace simulation copy that mentions doctor portal / telemetry
text_m = text_m.replace(
    "Sağlık verileriniz koruyucu telemetri protokolüyle hekim takip panelinize güvenle kaydedildi.",
    "Tüm ölçüm geçmişiniz telefonunuzda güvenle saklanmaktadır."
)
text_m = text_m.replace(
    "Takip eden hekiminiz için koruyucu izlem özeti arka planda güvenle güncellendi.",
    "Ölçüm geçmişiniz telefonunuzda güvenle saklanmaktadır."
)
text_m = text_m.replace(
    "ve hekim bildirim uyarısı gerçek zamanlı güncellenir.",
    "ve kişiselleştirilmiş rehberlik önerisi anlık güncellenir."
)
text_m = text_m.replace(
    "hekime ek başvuru aciliyeti öngörülmüyor. Rutin kontrollerle devam edilebilir.",
    "bebeğiniz ve sizin için her şey dengeli seyrediyor. Rutin günlük kontrollerle devam edebilirsiniz."
)
text_m = text_m.replace(
    "hekime ek başvuru aciliyeti öngörülmüyor.",
    "bebeğiniz ve sizin için her şey dengeli seyrediyor."
)

with open(master_builder, "w", encoding="utf-8") as f:
    f.write(text_m)

print("SUCCESS: Updated build_complete_perfect_komuta.py!")
