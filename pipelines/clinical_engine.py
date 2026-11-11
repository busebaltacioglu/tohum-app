# -*- coding: utf-8 -*-
"""
pipelines/clinical_engine.py
ToHUM M0 Klinik Tıp, Perinatoloji ve Biyoistatistik Algoritma Motoru

Klinik Danışma Kurulu ve Tıbbi Konsey Standartları:
1. DSÖ (WHO) ve T.C. Sağlık Bakanlığı Doğum Öncesi Bakım Yönetim Rehberi (2024)
2. ACOG Practice Bulletin No. 202 (Gestational Hypertension & Preeclampsia)
3. ACOG Practice Bulletin No. 190 & TEMD Kılavuzu (Gestational Diabetes Mellitus)
4. IOM (Institute of Medicine) & NRC (2009) Maternal Weight Gain Corridors
5. ACOG Committee Opinion No. 700 (Methods for Estimating the Due Date)
6. SLC11A2 / DMT1 Divalan Metal Taşıyıcı ve Bağırsak Mikronütrient Kronofarmakolojisi

Geliştiren: Perinatolog & Klinik Tıp Masası (@perinatolog)
"""

from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional, Tuple, Union
import math


# =========================================================================
# 1. NAEGELE KURALI, GEBELİK HAFTASI VE ULTRASON (CRL) UZLAŞTIRMASI
# =========================================================================

def calculate_gestational_age(
    lmp_date_str: str,
    reference_date_str: Optional[str] = None,
    cycle_length_days: int = 28,
    first_trimester_crl_mm: Optional[float] = None,
    crl_scan_date_str: Optional[str] = None
) -> Dict[str, Any]:
    """
    SAT (Son Adet Tarihi), siklus süresi ve 1. Trimester Ultrasonu (CRL) ile
    ACOG Committee Opinion 700 ve DSÖ standartlarına uygun gebelik yaşı hesabı.
    
    Parametreler:
        lmp_date_str: 'YYYY-MM-DD' Son adet tarihi (SAT)
        reference_date_str: 'YYYY-MM-DD' Hesaplama referans tarihi (None ise bugün)
        cycle_length_days: Menstrüel döngü uzunluğu (Standart: 28 gün)
        first_trimester_crl_mm: 1. Trimester Baş-Popo Mesafesi (CRL) mm
        crl_scan_date_str: CRL ultrasonunun yapıldığı tarih 'YYYY-MM-DD'
    """
    lmp_date = datetime.strptime(lmp_date_str, "%Y-%m-%d")
    ref_date = datetime.strptime(reference_date_str, "%Y-%m-%d") if reference_date_str else datetime.now()

    # 1. Siklus Düzeltmeli Naegele Kuralı
    # Standart formül: SAT + 280 gün + (Siklus - 28 gün)
    cycle_offset = cycle_length_days - 28
    edd_lmp = lmp_date + timedelta(days=280 + cycle_offset)
    
    days_pregnant_lmp = (ref_date - lmp_date).days
    
    # 2. Ultrason CRL Düzeltmesi (ACOG Kriteri: Erken USG SAT'tan üstündür)
    # Robinson & Fleming Formülü: Gestasyonel Yaş (gün) = 8.052 * sqrt(CRL) + 23.73
    used_ultrasound = False
    crl_age_days = None
    edd_final = edd_lmp
    days_pregnant_final = days_pregnant_lmp

    if first_trimester_crl_mm and 10 <= first_trimester_crl_mm <= 84:
        # 10 mm - 84 mm CRL (yaklaşık 7w0d - 13w6d)
        crl_gest_days = round(8.052 * math.sqrt(first_trimester_crl_mm) + 23.73)
        crl_age_days = crl_gest_days
        
        scan_date = datetime.strptime(crl_scan_date_str, "%Y-%m-%d") if crl_scan_date_str else ref_date
        # Tarama günündeki SAT yaşı
        lmp_days_at_scan = (scan_date - lmp_date).days
        discrepancy = abs(lmp_days_at_scan - crl_gest_days)

        # ACOG Kuralı: <= 8 6/7 haftada > 5 gün fark, 9 0/7 - 13 6/7 haftada > 7 gün fark varsa USG esas alınır
        threshold = 5 if crl_gest_days <= 62 else 7
        if discrepancy > threshold:
            used_ultrasound = True
            # EDD USG = scan_date + (280 - crl_gest_days)
            edd_final = scan_date + timedelta(days=(280 - crl_gest_days))
            days_pregnant_final = (ref_date - (scan_date - timedelta(days=crl_gest_days))).days

    weeks = days_pregnant_final // 7
    days = days_pregnant_final % 7
    days_left = (edd_final - ref_date).days

    # Trimester Sınıflandırması (ACOG)
    if weeks <= 13:
        trimester = 1
        trimester_name = "1. Trimester (Organogenez & Hücresel Kökleşme)"
    elif 14 <= weeks <= 27:
        trimester = 2
        trimester_name = "2. Trimester (Somatik Büyüme & Hissedilen Hareket)"
    else:
        trimester = 3
        trimester_name = "3. Trimester (Fetal Olgunlaşma & Doğuma Hazırlık)"

    # Term Durumu
    term_status = "Preterm (< 37 Hafta)"
    if weeks >= 42:
        term_status = "Postterm (>= 42 Hafta)"
    elif weeks >= 41:
        term_status = "Geç Term (41w0d - 41w6d)"
    elif weeks >= 39:
        term_status = "Tam Term (39w0d - 40w6d)"
    elif weeks >= 37:
        term_status = "Erken Term (37w0d - 38w6d)"

    return {
        "ok": True,
        "lmpDate": lmp_date.strftime("%Y-%m-%d"),
        "referenceDate": ref_date.strftime("%Y-%m-%d"),
        "cycleLengthDays": cycle_length_days,
        "cycleOffsetDays": cycle_offset,
        "gestationalWeeks": weeks,
        "gestationalDays": days,
        "gestationalAgeFormatted": f"{weeks} hafta + {days} gün",
        "totalDaysPregnant": days_pregnant_final,
        "estimatedDueDate": edd_final.strftime("%Y-%m-%d"),
        "daysRemaining": max(0, days_left),
        "trimester": trimester,
        "trimesterName": trimester_name,
        "termStatus": term_status,
        "usedUltrasoundCorrection": used_ultrasound,
        "crlEstimatedAgeDays": crl_age_days
    }


# =========================================================================
# 2. DSÖ & IOM GESTASYONEL KİLO ARTIŞ KORİDORU & VKİ MOTORU
# =========================================================================

IOM_BMI_CATEGORIES = {
    "underweight": {
        "label": "Zayıf (Underweight)",
        "bmiMin": 0.0,
        "bmiMax": 18.49,
        "t1GainMin": 0.5,
        "t1GainMax": 2.0,
        "weeklyRateMin": 0.44,
        "weeklyRateMax": 0.58,
        "weeklyRateMean": 0.51,
        "totalGainMin": 12.5,
        "totalGainMax": 18.0
    },
    "normal": {
        "label": "Normal Ağırlık",
        "bmiMin": 18.5,
        "bmiMax": 24.99,
        "t1GainMin": 0.5,
        "t1GainMax": 2.0,
        "weeklyRateMin": 0.35,
        "weeklyRateMax": 0.50,
        "weeklyRateMean": 0.42,
        "totalGainMin": 11.5,
        "totalGainMax": 16.0
    },
    "overweight": {
        "label": "Hafif Şişman (Overweight)",
        "bmiMin": 25.0,
        "bmiMax": 29.99,
        "t1GainMin": 0.5,
        "t1GainMax": 2.0,
        "weeklyRateMin": 0.23,
        "weeklyRateMax": 0.33,
        "weeklyRateMean": 0.28,
        "totalGainMin": 7.0,
        "totalGainMax": 11.5
    },
    "obese": {
        "label": "Obez (Obese Sınıf I-III)",
        "bmiMin": 30.0,
        "bmiMax": 99.0,
        "t1GainMin": 0.5,
        "t1GainMax": 2.0,
        "weeklyRateMin": 0.17,
        "weeklyRateMax": 0.27,
        "weeklyRateMean": 0.22,
        "totalGainMin": 5.0,
        "totalGainMax": 9.0
    }
}


def calculate_iom_weight_corridor(
    height_cm: float,
    pre_pregnancy_weight_kg: float,
    current_weight_kg: float,
    gestational_week: int,
    recent_weight_history: Optional[List[Dict[str, Any]]] = None
) -> Dict[str, Any]:
    """
    Institute of Medicine (IOM / NAM 2009) ve DSÖ Gestasyonel Kilo Artış Koridoru.
    Aykırı hızlı artış (preeklampsi/ödem) ve yetersiz artış (FGR/SGA) hekim uyarılarını üretir.
    """
    height_m = height_cm / 100.0
    bmi = pre_pregnancy_weight_kg / (height_m * height_m)
    
    # BMI Sınıflandırması
    bmi_category_key = "normal"
    if bmi < 18.5:
        bmi_category_key = "underweight"
    elif 18.5 <= bmi < 25.0:
        bmi_category_key = "normal"
    elif 25.0 <= bmi < 30.0:
        bmi_category_key = "overweight"
    else:
        bmi_category_key = "obese"
        
    rules = IOM_BMI_CATEGORIES[bmi_category_key]
    actual_gain = current_weight_kg - pre_pregnancy_weight_kg

    # Koridor Hesabı
    cur_week = max(0, min(42, gestational_week))
    if cur_week <= 13:
        # 1. Trimester: 0.5 - 2.0 kg toplam
        fraction = cur_week / 13.0
        corridor_min = round(rules["t1GainMin"] * fraction, 2)
        corridor_max = round(rules["t1GainMax"] * fraction, 2)
    else:
        weeks_in_t2_t3 = cur_week - 13
        corridor_min = round(rules["t1GainMin"] + (weeks_in_t2_t3 * rules["weeklyRateMin"]), 2)
        corridor_max = round(rules["t1GainMax"] + (weeks_in_t2_t3 * rules["weeklyRateMax"]), 2)

    # Koridor İçi Uyum Durumu
    is_in_corridor = (corridor_min <= actual_gain <= corridor_max)
    
    # Klinik Güvenlik Bayrakları
    alerts = []
    status = "optimal"
    
    # 1. Hızlı Kilo Artışı / Gizli Ödem Riski
    # 2. ve 3. Trimesterde haftada > 1.0 kg veya koridor tavanının +1.0 kg üzerinde olma
    is_rapid_spike = False
    if actual_gain > corridor_max + 0.8:
        is_rapid_spike = True
        status = "rapid_gain_risk"
        alerts.append({
            "code": "RAPID_WEIGHT_GAIN_EDEMA_RISK",
            "level": "warning",
            "title": "Atipik Hızlı Kilo Artışı / Ödem Uyarısı",
            "detail": (
                f"Mevcut kilo artışı (+{actual_gain:.1f} kg), 31. hafta IOM üst sınırı olan "
                f"+{corridor_max:.1f} kg değerinin belirgin üzerindedir. "
                f"Ani sıvı tutulumu (ödem) ve preeklampsi taraması açısından tansiyon kontrolü önerilir."
            )
        })
    elif actual_gain < corridor_min - 0.5 and cur_week >= 20:
        status = "inadequate_gain_risk"
        alerts.append({
            "code": "INSUFFICIENT_WEIGHT_GAIN",
            "level": "info",
            "title": "Düşük Kilo Artışı / Fetal Büyüme Takibi",
            "detail": (
                f"Kilo kazanımı (+{actual_gain:.1f} kg) IOM koridorunun alt sınırının "
                f"(+{corridor_min:.1f} kg) altındadır. Dengeli protein-kalori alımı ve ultrason ile "
                f"fetal gelişim persentilinin doğrulanması tavsiye edilir."
            )
        })

    # Son haftalık geçmiş analizi (varsa)
    if recent_weight_history and len(recent_weight_history) >= 2:
        last = recent_weight_history[-1]
        prev = recent_weight_history[-2]
        w_diff = last.get("weight", 0) - prev.get("weight", 0)
        days_diff = (datetime.fromisoformat(last["date"]) - datetime.fromisoformat(prev["date"])).days
        if days_diff > 0:
            weekly_rate = (w_diff / days_diff) * 7.0
            if weekly_rate >= 1.0 and cur_week >= 20:
                alerts.append({
                    "code": "WEEKLY_SPIKE_RED_FLAG",
                    "level": "warning",
                    "title": "Haftalık Akut Sıçrama (> 1.0 kg/hafta)",
                    "detail": f"Son 7 günde {weekly_rate:.2f} kg akut artış kaydedildi. Proteinüri ve ödem yönünden hekiminize bilgi veriniz."
                })

    return {
        "ok": True,
        "bmi": round(bmi, 2),
        "bmiCategory": bmi_category_key,
        "bmiCategoryLabel": rules["label"],
        "prePregnancyWeight": pre_pregnancy_weight_kg,
        "currentWeight": current_weight_kg,
        "actualGainKg": round(actual_gain, 2),
        "expectedCorridorMinKg": corridor_min,
        "expectedCorridorMaxKg": corridor_max,
        "isInCorridor": is_in_corridor,
        "status": status,
        "isRapidSpike": is_rapid_spike,
        "clinicalAlerts": alerts,
        "recommendedTotalGainMinKg": rules["totalGainMin"],
        "recommendedTotalGainMaxKg": rules["totalGainMax"]
    }


# =========================================================================
# 3. PREEKLAMPSİ, HEMODİNAMİK BAZAL & ATİPİK SIÇRAMA MOTORU
# =========================================================================

def evaluate_cardiovascular_hemodynamics(
    systolic_bp: int,
    diastolic_bp: int,
    baseline_systolic: int = 90,
    baseline_diastolic: int = 60,
    symptoms: Optional[List[str]] = None,
    gestational_week: int = 31
) -> Dict[str, Any]:
    """
    ACOG & T.C. Sağlık Bakanlığı Doğum Öncesi Bakım Yönetim Rehberi Preeklampsi
    ve Kişisel Kardiyo Bazal Sapma Algoritması.
    
    Referans Kurallar:
    - Standart Hipertansiyon: Sistolik >= 140 veya Diyastolik >= 90 mmHg
    - Şiddetli Özellikli Preeklampsi: Sistolik >= 160 veya Diyastolik >= 110 mmHg
    - Habitüel Hipotansif Gebe (Örn: Buse 90/60): Sistolik >= +30 mmHg veya Diyastolik >= +15 mmHg sıçrama
    - MAP (Ortalama Arter Basıncı) = Diyastolik + ((Sistolik - Diyastolik) / 3)
      MAP >= 85 mmHg 2. trimesterde yüksek preeklampsi duyarlılığına sahiptir.
    """
    pulse_pressure = systolic_bp - diastolic_bp
    map_current = diastolic_bp + (pulse_pressure / 3.0)

    base_pp = baseline_systolic - baseline_diastolic
    map_baseline = baseline_diastolic + (base_pp / 3.0)

    delta_sys = systolic_bp - baseline_systolic
    delta_dia = diastolic_bp - baseline_diastolic
    delta_map = map_current - map_baseline

    # Klinik Risk Sınıflandırması
    classification = "optimal"
    clinical_urgency = "normal"
    flags = []
    
    # 1. Şiddetli Hipertansiyon (Kırmızı Kod / Acil Sevk)
    if systolic_bp >= 160 or diastolic_bp >= 110:
        classification = "severe_preeclampsia_crisis"
        clinical_urgency = "critical_emergency"
        flags.append({
            "code": "SEVERE_HYPERTENSION_CRISIS",
            "level": "critical",
            "title": "Acil Kırmızı Hat: Şiddetli Hipertansif Eşik (>= 160/110 mmHg)",
            "action": "Derhal en yakın doğum kliniği veya perinatoloji acil servisine başvurunuz."
        })

    # 2. Standart Gestasyonel Hipertansiyon / Preeklampsi Eşiği
    elif systolic_bp >= 140 or diastolic_bp >= 90:
        classification = "gestational_hypertension"
        clinical_urgency = "urgent_consultation"
        flags.append({
            "code": "ACOG_HYPERTENSION_THRESHOLD",
            "level": "warning",
            "title": "Klinik Hipertansiyon Alarmı (>= 140/90 mmHg)",
            "action": "4 saat arayla ikinci bir ölçüm alınmalı, idrarda protein testi için hekime başvurulmalıdır."
        })

    # 3. AI Seed Core Kişisel Bazal Sıçraması (90/60 Hipotansif Gebeler İçin)
    # T.C. Sağlık Bakanlığı: Sistolik +30 mmHg veya Diyastolik +15 mmHg artış
    elif delta_sys >= 30 or delta_dia >= 15 or (delta_sys >= 25 and delta_dia >= 12):
        classification = "atypical_baseline_spike"
        clinical_urgency = "caution_early_warning"
        flags.append({
            "code": "AI_SEED_ATYPICAL_SPIKE",
            "level": "warning",
            "title": "Kişisel Kardiyovasküler Bazal Sıçraması (+30 / +15 mmHg)",
            "action": (
                f"Tansiyonunuz toplum geneline göre 'normal' sayılsa da kendi 90/60 mmHg bazalinize göre "
                f"+{delta_sys} mmHg sistolik ve +{delta_dia} mmHg diyastolik atipik sıçrama göstermiştir. "
                f"Sessiz preeklampsi başlangıcı açısından istirahat edip 2 saat sonra tekrar ölçüm yapınız."
            )
        })

    # 4. Normal / Optimal Aralık
    elif systolic_bp <= baseline_systolic + 15 and diastolic_bp <= baseline_diastolic + 10:
        classification = "optimal_baseline_harmony"
        clinical_urgency = "normal"
    else:
        classification = "mild_elevation"
        clinical_urgency = "routine_followup"

    # Semptom Eşleşmesi (Preeklampsi Kırmızı Bayrak Semptomları)
    symptoms_lower = [s.lower() for s in (symptoms or [])]
    symptom_warnings = []
    if any(k in " ".join(symptoms_lower) for k in ["baş ağrısı", "headache"]):
        symptom_warnings.append("Şiddetli/Geçmeyen Baş Ağrısı (Serebral Vazospazm Riski)")
    if any(k in " ".join(symptoms_lower) for k in ["görme", "bulanık", "ışık", "scotoma", "şimşek"]):
        symptom_warnings.append("Görsel Semptomlar / Işık Çakması / Skotom (Oksipital Korteks Etkilenimi)")
    if any(k in " ".join(symptoms_lower) for k in ["mide", "kaburga", "sağ üst", "epigastrik"]):
        symptom_warnings.append("Sağ Üst Kadran / Epigastrik Ağrı (Karaciğer Kapsül Gerilimi)")
    if any(k in " ".join(symptoms_lower) for k in ["nefes", "soluk"]):
        symptom_warnings.append("Akut Nefes Darlığı (Pulmoner Ödem Şüphesi)")

    if symptom_warnings and classification != "optimal_baseline_harmony":
        flags.append({
            "code": "PREECLAMPSIA_SYMPTOM_COMPLEX",
            "level": "high_alert",
            "title": "Preeklampsi Tehlike Semptomları Eşlik Ediyor",
            "action": f"Tespit edilen semptomlar: {', '.join(symptom_warnings)}. Vakit kaybetmeden kadın doğum hekiminize bildiriniz."
        })

    return {
        "ok": True,
        "systolicBP": systolic_bp,
        "diastolicBP": diastolic_bp,
        "baselineSystolic": baseline_systolic,
        "baselineDiastolic": baseline_diastolic,
        "pulsePressure": pulse_pressure,
        "currentMAP": round(map_current, 2),
        "baselineMAP": round(map_baseline, 2),
        "deltaSystolic": delta_sys,
        "deltaDiastolic": delta_dia,
        "deltaMAP": round(delta_map, 2),
        "classification": classification,
        "clinicalUrgency": clinical_urgency,
        "flags": flags,
        "symptomWarnings": symptom_warnings
    }


# =========================================================================
# 4. GESTASYONEL DİYABET (GDM) PROTOKOLÜ & KAN ŞEKERİ MOTORU
# =========================================================================

def evaluate_gdm_screening(
    test_type: str,  # 'ogtt_75g_1step' veya 'ogtt_100g_2step' veya 'smbg_monitoring'
    values: Dict[str, float],
    gestational_week: int = 24
) -> Dict[str, Any]:
    """
    DSÖ (WHO 2013), IADPSG ve T.C. Sağlık Bakanlığı TEMD Gebelik Şekeri Protokolü.
    
    1-Aşamalı 75 gr OGTT Eşikleri:
        Açlık >= 92 mg/dL
        1. Saat >= 180 mg/dL
        2. Saat >= 153 mg/dL
        (Yalnızca 1 değerin aşılması GDM tanısı için yeterlidir).
        
    SMBG (Evde Takip) Hedefleri:
        Açlık <= 95 mg/dL
        1. Saat Tokluk <= 140 mg/dL
        2. Saat Tokluk <= 120 mg/dL
        Hipoglisemi < 60 mg/dL
    """
    gdm_positive = False
    abnormal_keys = []
    clinical_note = ""

    if test_type == "ogtt_75g_1step":
        # WHO / IADPSG / T.C. Sağlık Bakanlığı Standart Kılavuzu
        fasting = values.get("fasting")
        hour1 = values.get("hour1")
        hour2 = values.get("hour2")

        if fasting is not None and fasting >= 92.0:
            gdm_positive = True
            abnormal_keys.append(f"Açlık Glukozu: {fasting} mg/dL (Eşik: >= 92)")
        if hour1 is not None and hour1 >= 180.0:
            gdm_positive = True
            abnormal_keys.append(f"1. Saat Glukozu: {hour1} mg/dL (Eşik: >= 180)")
        if hour2 is not None and hour2 >= 153.0:
            gdm_positive = True
            abnormal_keys.append(f"2. Saat Glukozu: {hour2} mg/dL (Eşik: >= 153)")

        if gdm_positive:
            clinical_note = (
                f"T.C. Sağlık Bakanlığı ve DSÖ kriterlerine göre 75g OGTT testinde {len(abnormal_keys)} adet "
                f"eşik aşıldığı için Gestasyonel Diyabet (GDM) tanısı doğrulanmıştır. "
                f"Tıbbi beslenme tedavisi (diyetisyen konsültasyonu) ve kan şekeri profili izlemi başlatılmalıdır."
            )
        else:
            clinical_note = "75g OGTT değerleri DSÖ ve T.C. Sağlık Bakanlığı güvenli fizyolojik koridorundadır. GDM riski saptanmamıştır."

    elif test_type == "ogtt_100g_2step":
        # ACOG / Carpenter-Coustan (En az 2 değerin aşılması gerekir)
        fasting = values.get("fasting", 0)
        h1 = values.get("hour1", 0)
        h2 = values.get("hour2", 0)
        h3 = values.get("hour3", 0)

        count = 0
        if fasting >= 95.0: count += 1; abnormal_keys.append("Açlık >= 95")
        if h1 >= 180.0: count += 1; abnormal_keys.append("1. Saat >= 180")
        if h2 >= 155.0: count += 1; abnormal_keys.append("2. Saat >= 155")
        if h3 >= 140.0: count += 1; abnormal_keys.append("3. Saat >= 140")

        gdm_positive = (count >= 2)
        if gdm_positive:
            clinical_note = f"100g OGTT Carpenter-Coustan kriterlerine göre {count} değer eşiği aştı. GDM tanısı pozitif."
        else:
            clinical_note = "100g OGTT Carpenter-Coustan kriterlerine göre negatif."

    elif test_type == "smbg_monitoring":
        # Evde İzlem
        glucose = values.get("glucose", 0)
        timing = values.get("timing", "fasting")  # 'fasting', 'postprandial_1h', 'postprandial_2h'
        
        if glucose < 60:
            return {
                "ok": True,
                "status": "hypoglycemia_alert",
                "glucose": glucose,
                "message": "Hipoglisemi Sınırı (< 60 mg/dL): 15-20 gr hızlı karbonhidrat (meyve suyu / kesme şeker) tüketiniz ve 15 dk sonra tekrar ölçünüz."
            }
        
        if timing == "fasting":
            is_high = glucose > 95.0
            threshold = 95.0
        elif timing == "postprandial_1h":
            is_high = glucose > 140.0
            threshold = 140.0
        else:  # postprandial_2h
            is_high = glucose > 120.0
            threshold = 120.0

        return {
            "ok": True,
            "glucose": glucose,
            "timing": timing,
            "targetThreshold": threshold,
            "isTargetCompliant": not is_high,
            "status": "hyperglycemia_spike" if is_high else "optimal",
            "message": f"{timing} hedefi ({threshold} mg/dL) {'aşıldı, hekiminize danışınız' if is_high else 'korundu, mükemmel glisemik kontrol.'}"
        }

    return {
        "ok": True,
        "testType": test_type,
        "gdmPositive": gdm_positive,
        "abnormalValues": abnormal_keys,
        "clinicalEvaluation": clinical_note,
        "screeningWindowWeeks": "24 - 28. Gebelik Haftası"
    }


# =========================================================================
# 5. DMT1 DİVALAN METAL VE KRONOFARMAKOJİ ZAMANLAMA MOTORU
# =========================================================================

def validate_dmt1_schedule(schedule_items: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    SLC11A2 / DMT1 divalan metal taşıyıcı rekabet kurallarını doğrular:
    - Demir (Fe²⁺) ile Magnezyum (Mg²⁺) / Kalsiyum (Ca²⁺) arasında >= 2 saat tampon
    - C Vitamini sinerjisi ve sabah aç karnına (08:30) alım
    - Yağda çözünen vitaminler (Omega-3 DHA, Vitamin D3) öğle tok (13:00)
    - Kolajen peptit ikindi (16:30) ara öğünü
    - Magnezyum gece yatmadan önce (21:30)
    """
    from pipelines.prescription_engine import apply_dmt1_pharmacology, compute_circular_buffer_hours

    validated_items, dmt1_analysis = apply_dmt1_pharmacology(schedule_items)

    return {
        "ok": True,
        "items": validated_items,
        "isCompliant": dmt1_analysis.get("isCompliant", True),
        "ironMagnesiumBufferHours": dmt1_analysis.get("ironMagnesiumBufferHours", 13.0),
        "warnings": dmt1_analysis.get("warnings", []),
        "synergies": dmt1_analysis.get("synergies", []),
        "rulesApplied": dmt1_analysis.get("rulesApplied", [])
    }


def evaluate_full_clinical_profile(
    user_data: Dict[str, Any],
    partner_data: Optional[Dict[str, Any]] = None,
    custom_inputs: Optional[Dict[str, Any]] = None
) -> Dict[str, Any]:
    """
    ToHUM M0 Bütünleşik Klinik Değerlendirme Motoru.
    Anne ve bebeğin tüm gestasyonel, kardiyovasküler, kilo, DMT1 ve Rh verilerini
    kapsamlı bir tıp konseyi senteziyle tek raporda birleştirir.
    """
    u = user_data or {}
    p = partner_data or {}
    c = custom_inputs or {}

    # 1. Gestasyonel Yaş ve Doğum Tarihi (ACOG 700 / Naegele)
    lmp_str = c.get("lmpDate") or u.get("lmpDate", "2026-01-17")
    ref_str = c.get("referenceDate") or datetime.now().strftime("%Y-%m-%d")
    cycle_days = int(c.get("cycleLengthDays") or u.get("cycleLengthDays", 28))
    crl_val = c.get("firstTrimesterCrlMm")
    crl_date = c.get("crlScanDate")

    gest_res = calculate_gestational_age(
        lmp_date_str=lmp_str,
        reference_date_str=ref_str,
        cycle_length_days=cycle_days,
        first_trimester_crl_mm=crl_val,
        crl_scan_date_str=crl_date
    )
    current_week = gest_res.get("gestationalWeeks", 31)

    # 2. DSÖ / IOM Gestasyonel Kilo Koridoru
    h_cm = float(c.get("heightCm") or u.get("heightCm", 168.0))
    start_w = float(c.get("startWeight") or u.get("startWeight", 58.0))
    cur_w = float(c.get("currentWeight") or u.get("currentWeight", 65.0))

    weight_res = calculate_iom_weight_corridor(
        height_cm=h_cm,
        pre_pregnancy_weight_kg=start_w,
        current_weight_kg=cur_w,
        gestational_week=current_week
    )

    # 3. Kardiyovasküler Hemodinamik ve Preeklampsi Sıçrama Analizi
    b_sys = int(c.get("baselineSys") or u.get("baselineSys", 90))
    b_dia = int(c.get("baselineDia") or u.get("baselineDia", 60))
    meas_sys = int(c.get("sys") or u.get("currentSys", b_sys))
    meas_dia = int(c.get("dia") or u.get("currentDia", b_dia))
    syms = c.get("symptoms") or u.get("survey", {}).get("symptoms") or []

    cardio_res = evaluate_cardiovascular_hemodynamics(
        systolic_bp=meas_sys,
        diastolic_bp=meas_dia,
        baseline_systolic=b_sys,
        baseline_diastolic=b_dia,
        symptoms=syms,
        gestational_week=current_week
    )

    # 4. Rh İzoimmünizasyon Güvenlik Kontrolü
    m_blood = str(c.get("maternalBloodGroup") or u.get("bloodGroup", "A Rh+"))
    p_blood = str(c.get("partnerBloodGroup") or p.get("bloodGroup", "0 Rh+"))
    rh_risk = ("-" in m_blood and "+" in p_blood)
    rh_protocol = {
        "maternalBloodGroup": m_blood,
        "partnerBloodGroup": p_blood,
        "isRiskPresent": rh_risk,
        "indirectCoombsRequired": rh_risk,
        "rhogamCandidate": rh_risk,
        "clinicalGuidance": (
            "Rh Uyuşmazlığı Protokolü: 28. gebelik haftasında İndirekt Coombs testi ve "
            "uygunsa profilaktik Anti-D İmmünoglobülin (Rhogam) uygulaması önerilir."
            if rh_risk else
            "Kan Uyuşmazlığı Riski Yok: Maternal ve paternal Rh profili güvenli aralıktadır."
        )
    }

    # 5. DMT1 Farmakoloji ve Takviye Çizelgesi
    active_rx = u.get("activePrescription") or {}
    rx_items = active_rx.get("items") or []
    if not rx_items:
        from pipelines.prescription_engine import KNOWN_PRESCRIPTIONS
        rx_items = KNOWN_PRESCRIPTIONS.get("2026-REC-31W", {}).get("items", [])

    dmt1_res = validate_dmt1_schedule(rx_items)

    # 6. GDM Taraması Durumu
    gdm_res = None
    if "ogtt" in c or "fastingGlucose" in c or "glucose" in c:
        ogtt_vals = {}
        if "fastingGlucose" in c:
            ogtt_vals["fasting"] = float(c["fastingGlucose"])
        if "oneHourGlucose" in c:
            ogtt_vals["one_hour"] = float(c["oneHourGlucose"])
        if "twoHourGlucose" in c:
            ogtt_vals["two_hour"] = float(c["twoHourGlucose"])
        if ogtt_vals:
            gdm_res = evaluate_gdm_screening(
                test_type="ogtt_75g_1step",
                values=ogtt_vals,
                gestational_week=current_week
            )

    return {
        "ok": True,
        "evaluatedAt": datetime.now().isoformat(),
        "gestationalAge": gest_res,
        "weightCorridor": weight_res,
        "cardiovascular": cardio_res,
        "rhProtocol": rh_protocol,
        "dmt1Pharmacology": dmt1_res,
        "gdmScreening": gdm_res,
        "summary": {
            "trimester": gest_res.get("trimester"),
            "isWeightOptimal": weight_res.get("isInCorridor", True),
            "isCardioOptimal": cardio_res.get("classification") in ["optimal", "optimal_baseline_harmony"],
            "isDmt1Compliant": dmt1_res.get("isCompliant", True),
            "hasAnyRiskAlert": (
                not weight_res.get("isInCorridor", True)
                or cardio_res.get("classification") in ["critical_preeclampsia", "atypical_baseline_spike"]
                or rh_risk
                or not dmt1_res.get("isCompliant", True)
            )
        }
    }
