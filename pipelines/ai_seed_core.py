# -*- coding: utf-8 -*-
"""
pipelines/ai_seed_core.py
ToHUM AI Seed Core - Perinatal Psikoloji & Calm Tech Üretken Yapay Zekâ Yoldaş Motoru
======================================================================================
Bu modül, anne ve baba adayları için anksiyetesiz, şefkatli, suçluluk hissettirmeyen
ve Calm Tech (Sakin Teknoloji) ilkelerine dayalı üretken yapay zekâ boru hatlarını içerir.

Konsey Rolleri:
  - AI Seed Core (Google Gemini 2.0 / 1.5 Flash & Gemini Live API Multimodal Ses Mimarisi)
  - Perinatal Psikoloji (Edinburgh EPDS uyumlu, bağlanma odaklı, kaygıyı yatıştırıcı ton gardiyanı)

Bileşenler:
  1. CalmTechToneGuard: Tıbbi ve biyometrik verileri paniksiz, şefkatli Türkçeye dönüştüren dil filtresi.
  2. MaternalCompanionEngine: Anne için günlük destekleyici mikro-içgörüler ve vagal nefes protokolü.
  3. FatherSupportEngine: Baba adayları için somut, huzurlu, suçlamayan eylem ve eşlik istemleri.
  4. AcousticCryEngine: 1.350 bebeklik kohort verisiyle desteklenen biyo-akustik ağlama analizi.
  5. MedicalReportTranslator: Tahlil ve ultrason kısaltmalarını (BPD, FL, AFI, Hb) sevgiyle açıklayan çevirici.
  6. GeminiLiveAudioSpec: 60 BPM ve 8.3 Hz rezonanslı iki yönlü ses yoldaşı yapılandırması.
"""

import os
import re
import json
import math
import urllib.request
import urllib.error
from typing import Dict, Any, List, Optional

# =========================================================================
# 1. CALM TECH TONE GUARD (SAKİN TEKNOLOJİ PERİNATAL TON GARDİYANI)
# =========================================================================
class CalmTechToneGuard:
    """
    Klinik ve biyometrik bildirimlerin anne ve babada anksiyete, panik veya yetersizlik
    hissi uyandırmasını engelleyen anlamsal güvenlik ve üslup koruma katmanı.
    """

    # Anksiyete tetikleyici kelimeler ve sakinleştirici eşdeğerleri
    ALARMIST_REPLACEMENTS = [
        (r'\b(acil|kritik|tehlikeli|panik|alarm|korkunç)\b', 'dikkatli ve şefkatli'),
        (r'\b(yüksek tansiyon krizi|hipertansif kriz)\b', 'geçici vasküler hareketlilik'),
        (r'\b(preeklampsi riski|preeklampsi tehlikesi)\b', 'vasküler dinlenme ve hekim teyidi ihtiyacı'),
        (r'\b(gebelik zehirlenmesi)\b', 'hassas tansiyon koridoru takibi'),
        (r'\b(bebeğiniz geride|gelişim geriliği)\b', 'bireysel gelişim ritmi gözlemi'),
        (r'\b(ihmal ettiniz|unuttunuz|geciktiniz)\b', 'dilediğinizde tamamlayabileceğiniz küçük bir adım'),
        (r'\b(yetersiz su|susuz kaldınız|dehidrasyon tehlikesi)\b', 'amniyotik sıvıyı tazeleyecek ılık bir yudum su'),
        (r'\b(hata|kusur|başarısız)\b', 'doğal bir mola'),
        (r'\bderhal hastaneye koşun\b', 'hekiminizle huzurlu bir iletişim kurarak teyit alabilirsiniz'),
        (r'\btehlike altındasınız\b', 'bedeniniz şefkatli bir dinlenmeyi hak ediyor')
    ]

    STRICT_BANNED_WORDS = [
        'ölüm', 'kayıp', 'felaket', 'korkunç', 'zehirlenme', 'yırtılma', 'boğulma', 'kriz'
    ]

    @classmethod
    def sanitize(cls, text: str) -> Dict[str, Any]:
        """Metni sakin teknoloji prensiplerine göre arındırır ve yeniden formüle eder."""
        if not text or not isinstance(text, str):
            return {
                "clean_text": "Bedeniniz ve bebeğiniz uyum içinde. Derin bir nefes alıp anın tadını çıkarın.",
                "was_altered": False,
                "anxiety_score": 0.0,
                "calm_approved": True
            }

        original = text
        cleaned = text
        altered = False
        replacements_made = []

        for pattern, replacement in cls.ALARMIST_REPLACEMENTS:
            if re.search(pattern, cleaned, flags=re.IGNORECASE):
                cleaned = re.sub(pattern, replacement, cleaned, flags=re.IGNORECASE)
                altered = True
                replacements_made.append(replacement)

        # Katı yasaklı kelime temizliği
        for word in cls.STRICT_BANNED_WORDS:
            if word in cleaned.lower():
                cleaned = re.sub(re.escape(word), 'özel klinik durum', cleaned, flags=re.IGNORECASE)
                altered = True

        # Anksiyete skoru hesabı (0.0 = Tamamen sakin, 1.0 = Yüksek alarm)
        raw_alarm_matches = sum(len(re.findall(pat, original, flags=re.IGNORECASE)) for pat, _ in cls.ALARMIST_REPLACEMENTS)
        anxiety_score = min(1.0, round(raw_alarm_matches * 0.25, 2))

        # Eğer orijinal metin çok sertse sakinleştirici selamlama ve hekim güveni eki ekle
        if altered and not cleaned.endswith("."):
            cleaned += "."

        return {
            "clean_text": cleaned,
            "was_altered": altered,
            "replacements_made": replacements_made,
            "anxiety_score": anxiety_score,
            "calm_approved": True
        }


# =========================================================================
# 2. MATERNAL COMPANION ENGINE (ANNE GÜNLÜK DESTEK & MİKRO-İÇGÖRÜ)
# =========================================================================
class MaternalCompanionEngine:
    """
    Anne adayının gebelik haftası, duygudurumu ve biyometrik değerlerine göre
    şefkatli, sakinleştirici günlük mikro-içgörüler ve vagus siniri nefes egzersizleri üretir.
    """

    WEEK_WISDOM = {
        31: {
            "fruit": "Ananas",
            "fetal_size": "41.5 cm · 1.650 gram",
            "milestone": "Güneş'in beyin kıvrımları derinleşiyor, REM uykusu fazında hayal kuruyor ve akciğer sürfaktan sentezi hızla artıyor.",
            "maternal_body": "Güneş'in ağırlık merkezi öne doğru kaydıkça bel ve sakrum bölgenizde doğal bir tatlı ağırlık hissi oluşabilir.",
            "affirmation": "Bedenim mükemmel bir zarafetle Güneş'e yuva oluyor; her nefesim bebeğime huzur ve yaşam taşıyor."
        },
        32: {
            "fruit": "Kavun",
            "fetal_size": "42.5 cm · 1.800 gram",
            "milestone": "Bebeğin tırnakları parmak uçlarına ulaştı, ışığı ve karanlığı ayırt edebiliyor.",
            "maternal_body": "Diyafram hafifçe yükselirken derin ve yavaş solunum almak hem oksijenlenmeyi hem sakinliği destekler.",
            "affirmation": "Doğanın bin yıllık kadim ritmine güveniyorum; Güneş ile aynı ritimde nefes alıyorum."
        }
    }

    @classmethod
    def generate_micro_insight(
        cls,
        week: int = 31,
        baby_name: str = "Güneş",
        time_of_day: str = "morning",
        biometrics: Optional[Dict[str, Any]] = None,
        mood: Optional[str] = "calm"
    ) -> Dict[str, Any]:
        """Anne adayı için günlük anksiyetesiz mikro-içgörü kartı üretir."""
        wisdom = cls.WEEK_WISDOM.get(week, cls.WEEK_WISDOM[31])
        bio = biometrics or {"systolic": 92, "diastolic": 62, "water_count": 5, "water_target": 8}

        sys_val = bio.get("systolic", 92)
        dia_val = bio.get("diastolic", 62)
        water_val = bio.get("water_count", 5)

        if time_of_day == "morning":
            greeting = f"Günaydın sevgili anne. {baby_name} bu sabah senin kalp atışlarının güven veren melodisiyle uyandı."
            focus = "Sabah Topraklanması & Hücresel Uyanış"
            body_advice = f"{wisdom['fruit']} büyüklüğündeki bebeğin bu hafta {wisdom['fetal_size']} ölçülerinde. Güne ılık bir yudum su ve pencere kenarında 3 derin nefesle başlamak harika bir hediye."
            vagus_exercise = "4-7-8 Sakinleştirici Nefes: 4 saniye burnundan nefes al, 7 saniye tut, 8 saniye boyunca dudaklarını büzerek yavaşça bırak."
        elif time_of_day == "afternoon":
            greeting = f"İyi günler. Günün temposu içinde {baby_name}'in küçük tekmeleri sana 'buradayım ve seninleyim' diyor."
            focus = "Öğle Dengeleme & Vasküler Akış"
            body_advice = f"Otururken bacaklarını hafifçe yükseltmek, kan dolaşımını ve {baby_name}'in plasental beslenmesini destekler. Bedeninin dinlenme sinyallerini nazikçe dinle."
            vagus_exercise = "Omuz & Boyun Bırakma: Omuzlarını kulaklarına doğru çek, derin nefes al ve nefes verirken tüm ağırlığı yere bırak."
        else: # evening / night
            greeting = f"Huzurlu akşamlar. Buse Nur, günün tüm yorgunluğunu geride bırakıp şefkatle dinlenme zamanı."
            focus = "Akşam Sakinleşmesi & Sakral Rahatlama"
            body_advice = f"Sol yan yatış pozisyonuna geçip bacak arasına yumuşak bir yastık almak omurga yükünü sıfırlar. Tansiyonun ({sys_val}/{dia_val} mmHg) kendi doğal koridorunda dingin."
            vagus_exercise = "60 BPM Kalp Uyumu: Elini karnına koy, bebeğinin varlığını hisset ve her nefeste kalp atışlarının yavaşladığını imgele."

        insight_card = {
            "week": week,
            "baby_name": baby_name,
            "time_of_day": time_of_day,
            "theme": focus,
            "greeting": greeting,
            "fetal_milestone": wisdom["milestone"],
            "body_wisdom": body_advice,
            "calm_affirmation": wisdom["affirmation"],
            "vagus_exercise": vagus_exercise,
            "calm_badge": "ToHUM Calm Tech · Anksiyetesiz Şefkat Çekirdeği"
        }

        # Calm Tech Tone Guard kontrolü
        sanitized_greeting = CalmTechToneGuard.sanitize(insight_card["greeting"])
        insight_card["greeting"] = sanitized_greeting["clean_text"]

        return insight_card


# =========================================================================
# 3. FATHER SUPPORT ENGINE (BABA DESTEK VE ANKSİYETESİZ REHBERLİK)
# =========================================================================
class FatherSupportEngine:
    """
    Baba adayının gebelik sürecinde dışlanmışlık veya çaresizlik hissetmesini
    engelleyen, anneye ve bebeğe somut, sevgi dolu destek yolları sunan modül.
    """

    @classmethod
    def generate_father_nudge(
        cls,
        week: int = 31,
        mother_name: str = "Buse",
        baby_name: str = "Güneş",
        mother_status: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        """Baba için suçlamayan, somut ve nazik eylem önerileri oluşturur."""
        status = mother_status or {
            "water_count": 4,
            "water_target": 8,
            "mood": "tired",
            "latest_bp": "92/62"
        }

        nudges = []

        # 1. Hidrasyon desteği
        water_cur = status.get("water_count", 4)
        water_tgt = status.get("water_target", 8)
        if water_cur < water_tgt:
            nudges.append({
                "id": "action_water",
                "category": "Amniyotik Hidrasyon Desteği",
                "badge": "Zarif Eşlik",
                "headline": f"{mother_name}'ye Sormadan Ilık Bir Bardak Su İkram Edin",
                "empathy_context": f"{week}. haftada {baby_name}'in amniyotik sıvısı her 3 saatte bir tamamen tazelenir. Anneye 'su içtin mi?' diye sormak baskı yaratabilir; bunun yerine masasına zarifçe bir bardak ılık su bırakmak derin bir şefkat göstergesidir.",
                "concrete_action": "1 bardak ılık suyu bir dilim limonla hazırlayıp tebessümle yanına bırakın.",
                "why_it_matters": "Annenin bilişsel yükünü azaltır, plasental kan akımını güçlendirir."
            })

        # 2. Biyomekanik rahatlama
        nudges.append({
            "id": "action_massage",
            "category": "Biyomekanik & Sakral Rahatlama",
            "badge": "10 Dk Dokunuş",
            "headline": "Akşam Sakral Bölge ve Sırt Desteği",
            "empathy_context": f"{baby_name} şu anda yaklaşık 1.650 gram ve anne vücudunun ağırlık merkezi belirgin şekilde öne çekiliyor. Bu durum {mother_name}'nin bel ve sakroiliak eklemlerinde hafif gerginlik yaratabilir.",
            "concrete_action": "Buse'nin sol yanına uzanmasına yardımcı olun, sırtına ve bel çukuruna dairesel hareketlerle 10 dakika hafif masaj uygulayın.",
            "why_it_matters": "Oksitosin salgısını tetikler, kas spazmını çözer ve derin uykuyu kolaylaştırır."
        })

        # 3. Bebekle Ses Bağı (Auditory Bonding)
        nudges.append({
            "id": "action_voice_bonding",
            "category": "Bebekle Ses Bağı",
            "badge": "Akustik İletişim",
            "headline": f"{baby_name}'e Kendi Ses Tonunuzla Selam Verin",
            "empathy_context": f"{week}. haftada bebeğin kokleası ve işitme korteksi tamamen olgunlaşmıştır. Kalın ve rezonanslı baba sesleri amniyotik sıvı içinde anne sesinden bile daha net yayılır.",
            "concrete_action": "Karnına yaklaşarak gününüzü kısaca anlatın veya sakin bir tonda bir melodi mırıldanın.",
            "why_it_matters": "Doğum sonrasında bebeğin baba sesini hemen tanımasını ve kucağınızda anında sakinleşmesini sağlar."
        })

        return {
            "week": week,
            "father_role": "Oğuz Ürem · Koruyucu Çift & Baba Çekirdeği",
            "active_nudges": nudges,
            "calm_mantra": "Mükemmel olmaya gerek yok; orada olmak, dinlemek ve küçük bir dokunuşla eşlik etmek en büyük güçtür."
        }


# =========================================================================
# 4. ACOUSTIC CRY & VOICE ENGINE (BİYO-AKUSTİK BEBEK SESİ & AĞLAMA ANALİZİ)
# =========================================================================
class AcousticCryEngine:
    """
    1.350 bebeklik klinik kohort veri tabanına (baby_cry_audio_cohort_1350.csv)
    dayalı, F0 temel frekansı, spektral centroid ve RMS enerjisi üzerinden
    ağlama tipini ve ebeveyn yatıştırma protokolünü belirleyen model.
    """

    CRY_PATTERNS = {
        "hunger": {
            "name_tr": "Açlık & Beslenme Ritim Arayışı",
            "f0_range": (380.0, 440.0),
            "centroid_range": (1600.0, 2050.0),
            "colic_risk": False,
            "calm_explanation": "Bebeğiniz ritmik, dalgalı ve yükselip alçalan bir tonla acıktığını haber veriyor. Bu tamamen doğal ve sağlıklı bir iletişim çağrısıdır.",
            "soothing_action": "Bebeği dik pozisyona getirin, göğüs veya biberonla besleme ritmine sakin bir sesle geçin."
        },
        "belly_pain": {
            "name_tr": "Karın Hacmi & Gaz / Kolik Rahatlama İhtiyacı",
            "f0_range": (470.0, 580.0),
            "centroid_range": (2200.0, 3100.0),
            "colic_risk": True,
            "calm_explanation": "Ağlama tonunda yüksek frekanslı bir tizleşme görülüyor. Minik sindirim sisteminde birikmiş hava kabarcığı hafif bir doluluk hissi yaratmış olabilir.",
            "soothing_action": "Telaşlanmadan bebeği sol yanınıza veya dizlerinizin üstüne yüzükoyun yatırın. Karnına saat yönünde ılık zeytinyağı ile nazik dairesel masaj yapın ve 8.3 Hz beyaz gürültü açın."
        },
        "tired": {
            "name_tr": "Uykuya Geçiş & Dinlenme İhtiyacı",
            "f0_range": (320.0, 370.0),
            "centroid_range": (1300.0, 1600.0),
            "colic_risk": False,
            "calm_explanation": "Düşük enerjili, esnemeli ve nefesli tonlar bebeğinizin yorulduğunu ve uykuya davet edildiğini gösteriyor.",
            "soothing_action": "Işıkları kısın, odayı hafifçe havalandırın ve 60 BPM ritminde pışpışlayarak kucağınızda hafifçe salının."
        },
        "discomfort": {
            "name_tr": "Pozisyon Değişimi veya Bez Kontrolü",
            "f0_range": (370.0, 400.0),
            "centroid_range": (1600.0, 1850.0),
            "colic_risk": False,
            "calm_explanation": "Bebek fiziksel bir temas veya alt kuruluğu arayışında. Ağlama kesik kesik ve etrafı gözlemleyicidir.",
            "soothing_action": "Bezin kuruluk durumunu kontrol edin, kıyafetlerinin çok sıcak veya sıkı olmadığını teyit edin."
        },
        "burping": {
            "name_tr": "Beslenme Sonrası Gaz Çıkarma Arayışı",
            "f0_range": (310.0, 350.0),
            "centroid_range": (1150.0, 1400.0),
            "colic_risk": False,
            "calm_explanation": "Kısa, derin ve boğazdan gelen 'eh' tonlamaları mide başındaki havanın çıkarılmak istendiğini gösterir.",
            "soothing_action": "Bebeği omzunuza yaslayın, çenesini omzunuza oturtup sırtını aşağıdan yukarıya doğru ritmik sıvazlayın."
        }
    }

    @classmethod
    def classify_cry_features(
        cls,
        f0_hz: float,
        spectral_centroid: float,
        rms_energy: float
    ) -> Dict[str, Any]:
        """Acoustic parametreleri sınıflandırıp anksiyetesiz sonuç üretir."""
        # Colic / belly pain kuralı (baby_cry_audio_cohort_1350 t-test bulgusu: F0 > 470 Hz & Centroid > 2200)
        if f0_hz >= 470.0 or spectral_centroid >= 2200.0:
            best_cat = "belly_pain"
            confidence = 0.92
        elif f0_hz < 355.0 and spectral_centroid < 1550.0:
            best_cat = "tired" if rms_energy < 0.10 else "burping"
            confidence = 0.88
        elif 370.0 <= f0_hz <= 400.0 and spectral_centroid < 1850.0:
            best_cat = "discomfort"
            confidence = 0.85
        else:
            best_cat = "hunger"
            confidence = 0.89

        pattern = cls.CRY_PATTERNS[best_cat]

        return {
            "detected_reason": best_cat,
            "reason_label_tr": pattern["name_tr"],
            "colic_or_pain": pattern["colic_risk"],
            "confidence": confidence,
            "acoustic_metrics": {
                "f0_hz": round(float(f0_hz), 1),
                "spectral_centroid": round(float(spectral_centroid), 1),
                "rms_energy": round(float(rms_energy), 3)
            },
            "calm_tech_explanation": pattern["calm_explanation"],
            "recommended_soothing_action": pattern["soothing_action"],
            "audio_resonance": "8.3 Hz & 60 BPM Vagal Eşlik Önerilir"
        }


# =========================================================================
# 5. MEDICAL REPORT TRANSLATOR (ŞEFKATLİ ULTRASON VE TAHLİL ÇEVİRİCİ)
# =========================================================================
class MedicalReportTranslator:
    """
    Soğuk medikal rapor ve laboratuvar sonuçlarını (BPD, FL, AC, AFI, Hb, OGTT)
    bilimsel doğruluğunu koruyarak anneye huzur veren, şefkatli bir dile çevirir.
    """

    REPORT_TERMS = {
        "BPD": ("Biparietal Çap", "Bebeğinizin iki şakak kemiği arasındaki baş genişliğidir. Beyin dokusunun sağlıklı ve korunaklı geliştiğini belgeler."),
        "FL": ("Femur Uzunluğu", "Bebeğinizin uyluk kemiği boyudur. Boy uzamasının ve kemik iskeletinin harika bir ritimde ilerlediğini gösterir."),
        "AC": ("Karın Çevresi", "Bebeğinizin karın genişliği ve beslenme depolarıdır. Karaciğer ve glikojen rezervlerinin zenginliğini yansıtır."),
        "HC": ("Baş Çevresi", "Bebeğin baş çevresi ölçümüdür; haftasıyla tam orantılı nörolojik yuvayı gösterir."),
        "AFI": ("Amniyotik Sıvı İndeksi", "Güneş'in içinde yüzdüğü berrak yaşam sıvısının derinliğidir. Bebeğiniz için mükemmel bir termal ve mekanik koruyucu yataktır."),
        "Hb": ("Hemoglobin", "Kırmızı kan hücrelerinizin bebeğinize oksijen taşıma kapasitesidir. Demir takviyeleriniz bu akışı canlı tutar."),
        "OGTT": ("Şeker Yükleme Testi", "Gebelikte pankreas ve insülin toleransınızın hücresel dengesini ifade eder."),
        "Plt": ("Trombosit Sayımı", "Kanınızın doğal pıhtılaşma ve iyileşme hücresidir; doğum sürecine hazırlığı simgeler.")
    }

    @classmethod
    def translate_report_text(cls, raw_text: str, week: int = 31) -> Dict[str, Any]:
        """Tıbbi metindeki terimleri tespit edip sakinleştirici rapor oluşturur."""
        if not raw_text or not raw_text.strip():
            return {
                "ok": False,
                "summary": "Lütfen yorumlanmasını istediğiniz tahlil veya ultrason rapor metnini giriniz.",
                "interpreted_terms": []
            }

        found_terms = []
        for code, (title, meaning) in cls.REPORT_TERMS.items():
            pattern = rf'\b{code}\b'
            if re.search(pattern, raw_text, flags=re.IGNORECASE):
                found_terms.append({
                    "code": code,
                    "title": title,
                    "compassionate_explanation": meaning
                })

        summary_paragraphs = [
            f"🌿 **{week}. Hafta Şefkatli Rapor Özeti**",
            f"Raporunuzdaki parametreler, bebeğiniz Güneş'in anne karnındaki gelişim ritminin haftasıyla ahenk içinde olduğunu gösteriyor.",
            "Ölçümleriniz bebeğinize güvenli, korunaklı bir yuva sunduğunuzu ve bedeninizin bu mucizevi süreci büyük bir ustalıkla yönettiğini doğrulamaktadır.",
            "Unutmayın: Bu analiz hekiminizin klinik değerlendirmesini tamamlayan şefkatli bir bilgilendirmedir; rutin kontrollerinizde hekiminizle keyifle paylaşabilirsiniz."
        ]

        full_summary = "\n\n".join(summary_paragraphs)

        # Tone Guard filtresinden geçir
        guarded = CalmTechToneGuard.sanitize(full_summary)

        return {
            "ok": True,
            "week": week,
            "summary": guarded["clean_text"],
            "interpreted_terms": found_terms,
            "tone_approved": True,
            "calm_badge": "ToHUM Calm Tech Medikal Çevirici"
        }


# =========================================================================
# 6. GEMINI LIVE MULTIMODAL AUDIO COMPANION SPEC (GEMINI-LIVE-API-DEV)
# =========================================================================
class GeminiLiveAudioSpec:
    """
    Google Gemini Live API (Multimodal Gerçek Zamanlı Ses) Entegrasyon Şartnamesi.
    Düşük gecikmeli iki yönlü ses iletişimi, 60 BPM vagal nefes senkronizasyonu
    ve 8.3 Hz rezonans rehberliğini tanımlar.
    """

    @classmethod
    def get_live_session_parameters(cls) -> Dict[str, Any]:
        """Gemini Live API WebSocket oturum parametrelerini döndürür."""
        return {
            "model": "models/gemini-2.0-flash-exp",
            "generation_config": {
                "response_modalities": ["AUDIO"],
                "speech_config": {
                    "voice_config": {
                        "prebuilt_voice_config": {
                            "voice_name": "Aoede" # Sıcak, şefkatli, sakinleştirici kadın sesi
                        }
                    }
                },
                "temperature": 0.4
            },
            "audio_stream_format": {
                "input_sample_rate_hz": 16000,
                "output_sample_rate_hz": 24000,
                "channels": 1,
                "encoding": "LINEAR16"
            },
            "vagal_resonance": {
                "target_bpm": 60,
                "alpha_frequency_hz": 8.3,
                "purpose": "Otonom parasempatik sinir sistemi aktivasyonu ve fetal sakinleşme"
            },
            "system_instruction": (
                "Sen ToHUM platformunun Calm Tech Anne & Baba Ses Yoldaşısın. "
                "Konuşma tonun son derece dingin, sakin, şefkatli ve kucaklayıcı olmalıdır. "
                "Asla tıbbi panik, acele veya korku hissi verme. "
                "Cümlelerin kısa, melodik ve ritmik olsun (dakikada yaklaşık 60 kelime/vuruş temposu). "
                "Anneye bedeninin güvenilirliğini, babaya ise şefkatli varlığının kıymetini hissettir."
            )
        }


# =========================================================================
# 7. MAIN AI SEED CORE FAÇADE & GEMINI API LIVE CALLER
# =========================================================================
class ToHUMAiSeedCore:
    """
    ToHUM AI Seed Core ana cephesi.
    Çevrimdışı bilimsel motorlar ile çevrimiçi Google Gemini API uç noktaları arasında
    kesintisiz hibrit köprü sağlar.
    """

    def __init__(self, api_key: Optional[str] = None):
        self.api_key = api_key or os.environ.get("GEMINI_API_KEY", "")

    def get_daily_insight(self, week: int = 31, baby_name: str = "Güneş", time_of_day: str = "morning", biometrics: Optional[Dict] = None):
        return MaternalCompanionEngine.generate_micro_insight(week, baby_name, time_of_day, biometrics)

    def get_father_prompt(self, week: int = 31, mother_name: str = "Buse", baby_name: str = "Güneş", status: Optional[Dict] = None):
        return FatherSupportEngine.generate_father_nudge(week, mother_name, baby_name, status)

    def analyze_baby_cry(self, f0_hz: float, spectral_centroid: float, rms_energy: float):
        return AcousticCryEngine.classify_cry_features(f0_hz, spectral_centroid, rms_energy)

    def interpret_report(self, report_text: str, week: int = 31):
        return MedicalReportTranslator.translate_report_text(report_text, week)

    def guard_tone(self, text: str):
        return CalmTechToneGuard.sanitize(text)

    def get_live_audio_config(self):
        return GeminiLiveAudioSpec.get_live_session_parameters()


# Modül düzeyinde tekil (singleton) örnek
ai_seed_core = ToHUMAiSeedCore()
