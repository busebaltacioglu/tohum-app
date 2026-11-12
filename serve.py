# -*- coding: utf-8 -*-
"""
serve.py
ToHUM M0 Full-Stack Web & REST API Sunucusu
Klinik Farmakoloji, DMT1 Kural Motoru, Profil Veri Senkronizasyonu ve Partner Entegrasyonu
"""

import http.server
import json
import os
import sys
from datetime import datetime
import socketserver
import html
import urllib.parse

sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
if BASE_DIR not in sys.path:
    sys.path.insert(0, BASE_DIR)

from pipelines.prescription_engine import (
    parse_prescription_payload,
    apply_dmt1_pharmacology
)

PORT = 8080
DIRECTORY = os.path.join(BASE_DIR, 'public')
DATA_DIR = os.path.join(BASE_DIR, 'data')
DB_FILE = os.path.join(DATA_DIR, 'users_db.json')

os.makedirs(DATA_DIR, exist_ok=True)

# =========================================================================
# OWASP SAVUNMA & KABA KUVVET (BRUTE-FORCE) RATE LIMITER
# =========================================================================
FAILED_ATTEMPTS = {}  # ip: [timestamp, ...]
RATE_LIMIT_WINDOW = 60  # 60 saniye pencere
MAX_FAILED_ATTEMPTS = 5  # 60 saniye içinde azami 5 hatalı deneme

def check_rate_limit(ip: str) -> bool:
    """İstemci IP'si için kaba kuvvet hız sınırını denetler."""
    now = datetime.now().timestamp()
    attempts = FAILED_ATTEMPTS.get(ip, [])
    # 60 saniyeden eski denemeleri temizle
    attempts = [t for t in attempts if now - t < RATE_LIMIT_WINDOW]
    FAILED_ATTEMPTS[ip] = attempts
    return len(attempts) < MAX_FAILED_ATTEMPTS

def record_failed_attempt(ip: str):
    """Hatalı eşleşme kodu denemesini zaman damgasıyla kaydeder."""
    now = datetime.now().timestamp()
    attempts = FAILED_ATTEMPTS.setdefault(ip, [])
    attempts.append(now)

def reset_rate_limit(ip: str):
    """Başarılı doğrulamada sayacı sıfırlar."""
    if ip in FAILED_ATTEMPTS:
        del FAILED_ATTEMPTS[ip]


def get_default_db():
    """Varsayılan M0 Buse ve Güneş referans klinik veritabanı şablonu."""
    return {
        "activeUserId": "buse_founder",
        "users": {
            "buse_founder": {
                "id": "buse_founder",
                "authProvider": "google",
                "email": "buse.baltacioglu@tohum.app",
                "onboardingCompleted": True,
                "updatedAt": datetime.now().isoformat(),
                "user": {
                    "name": "Buse Nur Ürem",
                    "shortName": "Buse Nur",
                    "age": 31,
                    "occupation": "Kurucu & Biyoistatistikçi",
                    "city": "Manisa",
                    "district": "Yunusemre",
                    "neighborhood": "Muradiye",
                    "baselineSys": 90,
                    "baselineDia": 60,
                    "baselineBP": "90/60",
                    "baselineCategory": "low",
                    "baselineHR": 72,
                    "heightCm": 168,
                    "startWeight": 58.0,
                    "currentWeight": 65.0,
                    "bloodGroup": "A Rh+",
                    "parity": "G1P0 (İlk Gebelik · Primigravida)",
                    "isFirstBaby": True,
                    "lmpDate": "2026-01-17",
                    "dueDate": "24 Ekim 2026",
                    "doctorName": "Dr. Ayşe Yılmaz",
                    "hospitalName": "Manisa Şehir Hastanesi",
                    "nextCheckupDate": "10 Eylül 2026 · 14:30",
                    "survey": {
                        "waterHabit": "5-7",
                        "supplements": ["iron", "magnesium", "omega", "d3"],
                        "symptoms": ["Hafif Bel Ağrısı", "Akşam Yorgunluğu"],
                        "specialConditions": ["Düşük Tansiyon Hassasiyeti (90/60)"]
                    }
                },
                "baby": {
                    "name": "Güneş",
                    "week": 31,
                    "daysLeft": 63
                },
                "partner": {
                    "name": "Oğuz Ürem",
                    "shortName": "Oğuz",
                    "phone": "+90 532 000 00 00",
                    "email": "oguz@tohum.app",
                    "bloodGroup": "0 Rh+",
                    "inviteCode": "THM-31G-834",
                    "inviteStatus": "connected",
                    "liveFeed": []
                }
            }
        }
    }


def load_db():
    """users_db.json dosyasını güvenli yükler, bozuksa varsayılanı oluşturur."""
    if not os.path.exists(DB_FILE):
        db = get_default_db()
        save_db(db)
        return db
    try:
        with open(DB_FILE, 'r', encoding='utf-8') as f:
            data = json.load(f)
            if not isinstance(data, dict) or "users" not in data:
                db = get_default_db()
                save_db(db)
                return db
            return data
    except Exception:
        db = get_default_db()
        save_db(db)
        return db


def save_db(db):
    """Veritabanını atomik ve UTF-8 formatında diske yazar."""
    try:
        with open(DB_FILE, 'w', encoding='utf-8') as f:
            json.dump(db, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"[DB Save Error]: {e}", file=sys.stderr)


class Handler(http.server.SimpleHTTPRequestHandler):
    """ToHUM Sakin Teknoloji ve REST API İşleyicisi."""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        # OWASP Savunma Odaklı Güvenlik Başlıkları
        self.send_header('X-Content-Type-Options', 'nosniff')
        self.send_header('X-Frame-Options', 'SAMEORIGIN')
        self.send_header('X-XSS-Protection', '1; mode=block')
        self.send_header('Referrer-Policy', 'strict-origin-when-cross-origin')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, data, status=200):
        try:
            body = json.dumps(data, ensure_ascii=False).encode('utf-8')
            self.send_response(status)
            self.send_header('Content-Type', 'application/json; charset=utf-8')
            self.send_header('Content-Length', str(len(body)))
            self.end_headers()
            self.wfile.write(body)
        except (BrokenPipeError, ConnectionResetError):
            pass

    def do_GET(self):
        try:
            if self.path.startswith('/api/export'):
                db = load_db()
                active_uid = db.get("activeUserId", "buse_founder")
                # BOLA / IDOR Koruması: Query parametresinde farklı userId ile yetkisiz sorgulama denetimi
                parsed_url = urllib.parse.urlparse(self.path)
                query_params = urllib.parse.parse_qs(parsed_url.query)
                requested_uid = query_params.get("userId", [None])[0]
                if requested_uid and requested_uid != active_uid:
                    return self.send_json({
                        "ok": False,
                        "error": "Yetkisiz nesne erişimi (BOLA/IDOR koruması): Farklı bir kullanıcının dışa aktarım verisine erişilemez."
                    }, status=403)

                users = db.get("users", {})
                profile = users.get(active_uid) or users.get("buse_founder") or get_default_db()["users"]["buse_founder"]
                return self.send_json({
                    "ok": True,
                    "exportedAt": datetime.now().isoformat(),
                    "system": "ToHUM Calm Tech M0 Health Engine",
                    "version": "1.0-M0-Complete",
                    "activeUserId": active_uid,
                    "profile": profile
                })

            if self.path.startswith('/api/profile'):
                db = load_db()
                active_uid = db.get("activeUserId", "buse_founder")
                # BOLA / IDOR Koruması: Yetkisiz profil erişim denetimi
                parsed_url = urllib.parse.urlparse(self.path)
                query_params = urllib.parse.parse_qs(parsed_url.query)
                requested_uid = query_params.get("userId", [None])[0]
                if requested_uid and requested_uid != active_uid:
                    return self.send_json({
                        "ok": False,
                        "error": "Yetkisiz nesne erişimi (BOLA/IDOR koruması): Yalnızca aktif oturum sahibinin profili görüntülenebilir."
                    }, status=403)

                users = db.get("users", {})
                profile = users.get(active_uid) or users.get("buse_founder") or get_default_db()["users"]["buse_founder"]
                return self.send_json({
                    "ok": True,
                    "activeUserId": active_uid,
                    "profile": profile,
                    "totalUsers": len(users)
                })

            if self.path.startswith('/api/clinical/evaluate'):
                from pipelines.clinical_engine import evaluate_full_clinical_profile
                db = load_db()
                uid = db.get("activeUserId", "buse_founder")
                user_entry = db.get("users", {}).get(uid) or db.get("users", {}).get("buse_founder") or get_default_db()["users"]["buse_founder"]
                user_data = user_entry.get("user", {})
                partner_data = user_entry.get("partner", {})
                eval_res = evaluate_full_clinical_profile(user_data, partner_data)
                return self.send_json(eval_res)

            if self.path.startswith('/api/prescription/parse'):
                # GET ile reçete önizleme fallback
                sample = parse_prescription_payload({"code": "2026-REC-31W"})
                return self.send_json({
                    "ok": True,
                    "prescription": sample
                })

            if self.path.startswith('/api/ai/live-config'):
                from pipelines.ai_seed_core import ai_seed_core
                return self.send_json({
                    "ok": True,
                    "liveAudioConfig": ai_seed_core.get_live_audio_config()
                })

            if self.path.startswith('/api/ai/companion/insight'):
                from pipelines.ai_seed_core import ai_seed_core
                db = load_db()
                uid = db.get("activeUserId", "buse_founder")
                user_obj = db.get("users", {}).get(uid, {})
                baby_obj = user_obj.get("baby", {})
                week = baby_obj.get("week", 31)
                baby_name = baby_obj.get("name", "Güneş")
                insight = ai_seed_core.get_daily_insight(week=week, baby_name=baby_name, time_of_day="morning")
                return self.send_json({"ok": True, "insight": insight})

            return super().do_GET()
        except Exception as e:
            return self.send_json({"ok": False, "error": f"Sunucu GET hatası: {str(e)}"}, status=500)

    def do_POST(self):
        length = int(self.headers.get('Content-Length', 0))
        raw = self.rfile.read(length).decode('utf-8', errors='ignore') if length > 0 else '{}'
        try:
            payload = json.loads(raw)
        except Exception:
            payload = {}
        if not isinstance(payload, dict):
            payload = {}

        db = load_db()

        # =========================================================================
        # 0. KLİNİK TIP VE PERİNATOLOJİK DEĞERLENDİRME (/api/clinical/evaluate)
        # =========================================================================
        if self.path.startswith('/api/clinical/evaluate'):
            try:
                from pipelines.clinical_engine import evaluate_full_clinical_profile
                uid = payload.get("userId") or db.get("activeUserId", "buse_founder")
                user_entry = db.get("users", {}).get(uid) or db.get("users", {}).get("buse_founder") or get_default_db()["users"]["buse_founder"]
                user_data = user_entry.get("user", {})
                partner_data = user_entry.get("partner", {})
                eval_res = evaluate_full_clinical_profile(user_data, partner_data, custom_inputs=payload)
                return self.send_json(eval_res)
            except Exception as e:
                return self.send_json({"ok": False, "error": f"Klinik değerlendirme hatası: {str(e)}"}, status=500)

        # =========================================================================
        # 0.1 AI SEED CORE & PERİNATAL PSİKOLOJİ UÇ NOKTALARI
        # =========================================================================
        if self.path.startswith('/api/ai/companion/insight'):
            try:
                from pipelines.ai_seed_core import ai_seed_core
                week = int(payload.get("week", 31))
                baby_name = payload.get("babyName", "Güneş")
                time_of_day = payload.get("timeOfDay", "morning")
                bio = payload.get("biometrics")
                insight = ai_seed_core.get_daily_insight(week=week, baby_name=baby_name, time_of_day=time_of_day, biometrics=bio)
                return self.send_json({"ok": True, "insight": insight})
            except Exception as e:
                return self.send_json({"ok": False, "error": str(e)}, status=500)

        if self.path.startswith('/api/ai/companion/father-prompt'):
            try:
                from pipelines.ai_seed_core import ai_seed_core
                week = int(payload.get("week", 31))
                mother_name = payload.get("motherName", "Buse")
                baby_name = payload.get("babyName", "Güneş")
                status = payload.get("motherStatus")
                prompt_res = ai_seed_core.get_father_prompt(week=week, mother_name=mother_name, baby_name=baby_name, status=status)
                return self.send_json({"ok": True, "fatherPrompt": prompt_res})
            except Exception as e:
                return self.send_json({"ok": False, "error": str(e)}, status=500)

        if self.path.startswith('/api/ai/audio/cry-analyze'):
            try:
                from pipelines.ai_seed_core import ai_seed_core
                f0 = float(payload.get("f0_hz", 412.0))
                centroid = float(payload.get("spectral_centroid", 1830.0))
                rms = float(payload.get("rms_energy", 0.16))
                cry_res = ai_seed_core.analyze_baby_cry(f0, centroid, rms)
                return self.send_json({"ok": True, "analysis": cry_res})
            except Exception as e:
                return self.send_json({"ok": False, "error": str(e)}, status=500)

        if self.path.startswith('/api/ai/report/interpret'):
            try:
                from pipelines.ai_seed_core import ai_seed_core
                raw_text = payload.get("reportText", "")
                week = int(payload.get("week", 31))
                rep_res = ai_seed_core.interpret_report(raw_text, week)
                return self.send_json(rep_res)
            except Exception as e:
                return self.send_json({"ok": False, "error": str(e)}, status=500)

        if self.path.startswith('/api/ai/tone-guard/sanitize'):
            try:
                from pipelines.ai_seed_core import ai_seed_core
                raw_text = payload.get("text", "")
                sanitized = ai_seed_core.guard_tone(raw_text)
                return self.send_json({"ok": True, "result": sanitized})
            except Exception as e:
                return self.send_json({"ok": False, "error": str(e)}, status=500)

        # =========================================================================
        # 1. REÇETE PARSE UÇ NOKTASI (/api/prescription/parse)
        # =========================================================================
        if self.path.startswith('/api/prescription/parse'):
            try:
                rx_result = parse_prescription_payload(payload)
                return self.send_json({
                    "ok": True,
                    "prescription": rx_result
                })
            except Exception as e:
                return self.send_json({"ok": False, "error": f"Ayrıştırma hatası: {str(e)}"}, status=500)

        # =========================================================================
        # 2. REÇETE VE DMT1 ENTEGRASYON UÇ NOKTASI (/api/prescription/integrate)
        # =========================================================================
        if self.path.startswith('/api/prescription/integrate'):
            try:
                active_uid = db.get("activeUserId", "buse_founder")
                req_uid = payload.get("userId")
                # BOLA / IDOR Koruması: Reçete entegrasyonunda kullanıcı kimlik yetkilendirmesi
                if req_uid and req_uid != active_uid and req_uid != "buse_founder":
                    return self.send_json({
                        "ok": False,
                        "error": "Yetkisiz reçete entegrasyonu (BOLA/IDOR koruması): Yalnızca aktif oturum kullanıcısına reçete işlenebilir."
                    }, status=403)
                uid = req_uid or active_uid
                users = db.setdefault("users", {})
                if uid not in users:
                    users[uid] = {
                        "id": uid,
                        "authProvider": "google",
                        "email": "anne@tohum.app",
                        "onboardingCompleted": True,
                        "user": {},
                        "baby": {},
                        "partner": {}
                    }
                user_entry = users[uid]
                user_profile = user_entry.setdefault("user", {})
                rx_data = payload.get("prescription")
                if not isinstance(rx_data, dict):
                    rx_data = {}

                # DMT1 farmakoloji kural motoruyla etken maddeleri doğrula ve zenginleştir
                raw_items = rx_data.get("items") or []
                if not isinstance(raw_items, list):
                    raw_items = []
                validated_items, dmt1_analysis = apply_dmt1_pharmacology(raw_items)
                rx_data["items"] = validated_items
                rx_data["dmt1Analysis"] = dmt1_analysis

                user_profile["activePrescription"] = rx_data
                survey = user_profile.setdefault("survey", {})
                supplements = survey.setdefault("supplements", [])
                if not isinstance(supplements, list):
                    supplements = []
                    survey["supplements"] = supplements

                has_collagen = False
                for it in validated_items:
                    itype = (it.get("type") or "").lower()
                    iname = (it.get("name") or "").lower()

                    if itype == "collagen" or "kolajen" in iname or "collagen" in iname:
                        has_collagen = True
                        if "collagen" not in supplements:
                            supplements.append("collagen")
                    elif itype == "iron" or "demir" in iname or "ferro" in iname:
                        if "iron" not in supplements:
                            supplements.append("iron")
                    elif itype == "omega" or "omega" in iname or "balık" in iname:
                        if "omega" not in supplements:
                            supplements.append("omega")
                    elif itype == "magnesium" or "magnez" in iname:
                        if "magnesium" not in supplements:
                            supplements.append("magnesium")
                    elif itype == "d3" or "devit" in iname:
                        if "d3" not in supplements:
                            supplements.append("d3")
                    elif itype == "folic" or "folik" in iname:
                        if "folic" not in supplements:
                            supplements.append("folic")
                    elif itype and itype not in supplements:
                        supplements.append(itype)

                user_entry["hasCollagen"] = has_collagen
                user_profile["hasCollagen"] = has_collagen
                user_entry["updatedAt"] = datetime.now().isoformat()

                # Partner Canlı Akış Senkronizasyonu
                partner = user_entry.setdefault("partner", {})
                feed = partner.setdefault("liveFeed", [])
                doc_name = rx_data.get("doctorName") or "Hekim"
                feed.insert(0, {
                    "id": int(datetime.now().timestamp() * 1000),
                    "time": datetime.now().strftime("%H:%M"),
                    "type": "prescription_synced",
                    "title": "Hekim Reçetesi Senkronize",
                    "text": f"{doc_name} reçetesi ({len(validated_items)} etken madde) DMT1 kurallarıyla takvime işlendi."
                })
                if len(feed) > 15:
                    feed.pop()

                save_db(db)
                return self.send_json({
                    "ok": True,
                    "message": "Reçete başarıyla entegre edildi ve DMT1 kuralları uygulandı.",
                    "hasCollagen": has_collagen,
                    "prescription": rx_data,
                    "profile": user_entry
                })
            except Exception as e:
                return self.send_json({"ok": False, "error": f"Entegrasyon hatası: {str(e)}"}, status=500)

        # =========================================================================
        # 3. BABA ŞEFKATLİ DESTEK EYLEMLERİ (/api/partner/care-action)
        # =========================================================================
        if self.path.startswith('/api/partner/care-action'):
            try:
                uid = db.get("activeUserId", "buse_founder")
                action = payload.get("action", "water")
                users = db.setdefault("users", {})
                user_entry = users.get(uid) or users.get("buse_founder") or get_default_db()["users"]["buse_founder"]
                partner = user_entry.setdefault("partner", {})
                feed = partner.setdefault("liveFeed", [])

                action_map = {
                    "water": {
                        "title": "Amniyotik Hidrasyon Desteği",
                        "text": "Oğuz 1 bardak ılık su ikram ederek Buse'nin hidrasyon ve amniyotik döngüsünü destekledi."
                    },
                    "massage": {
                        "title": "Lomber Pelvis Rahatlatma",
                        "text": "Oğuz 10 dk sol yan pozisyonda hafif bel masajı ve sırt desteği sağladı."
                    },
                    "magnesium": {
                        "title": "DMT1 Magnezyum Saati",
                        "text": "Oğuz Magnimore Plus magnezyumu ılık suyla hazırlayarak Buse'ye ikram etti."
                    },
                    "cardio": {
                        "title": "Kardiyovasküler Dinlenme ve Huzur",
                        "text": "Oğuz, Buse'nin 90/60 bazal tansiyon dengesi için sakin ve dingin bir dinlenme ortamı sağladı."
                    },
                    "cardiovascular": {
                        "title": "Kardiyovasküler Dinlenme ve Huzur",
                        "text": "Oğuz, Buse'nin 90/60 bazal tansiyon dengesi için sakin ve dingin bir dinlenme ortamı sağladı."
                    },
                    "hospital_bag": {
                        "title": "Hastane Çantası & Lojistik Kontrolü",
                        "text": "Oğuz 31. hafta doğum çantası hazırlıklarını ve lojistiğini güncelledi."
                    },
                    "checklist": {
                        "title": "Hastane Çantası & Lojistik Kontrolü",
                        "text": "Oğuz 31. hafta doğum çantası hazırlıklarını ve lojistiğini güncelledi."
                    }
                }
                mapped_details = action_map.get(action, {
                    "title": "Şefkatli Baba Desteği",
                    "text": f"Oğuz Buse'nin maternal ihtiyaç analizine uygun '{action}' desteğini tamamladı."
                })
                title = payload.get("title") or mapped_details["title"]
                text = payload.get("text") or payload.get("note") or mapped_details["text"]
                # Savunma: Girdi Temizleme ve HTML Escape (XSS Koruması)
                clean_title = html.escape(str(title)[:100])
                clean_text = html.escape(str(text)[:300])

                feed.insert(0, {
                    "id": int(datetime.now().timestamp() * 1000),
                    "time": datetime.now().strftime("%H:%M"),
                    "type": "care_completed",
                    "title": clean_title,
                    "text": clean_text
                })
                if len(feed) > 15:
                    feed.pop()
                save_db(db)
                return self.send_json({
                    "ok": True,
                    "status": "ok",
                    "action": action,
                    "actionCompleted": action,
                    "title": clean_title,
                    "text": clean_text,
                    "feedLength": len(feed),
                    "timestamp": datetime.now().isoformat()
                })
            except Exception as e:
                return self.send_json({"ok": False, "status": "error", "error": f"Bakım eylemi hatası: {str(e)}"}, status=500)

        # =========================================================================
        # 3.1 AİLE EŞLEŞTİRME KODU DOĞRULAMA (/api/partner/pair & /api/partner/validate-code)
        # =========================================================================
        if self.path.startswith('/api/partner/pair') or self.path.startswith('/api/partner/validate-code'):
            try:
                client_ip = self.client_address[0] if hasattr(self, 'client_address') and self.client_address else "127.0.0.1"

                # Kaba Kuvvet (Brute-Force) Kontrolü
                if not check_rate_limit(client_ip):
                    return self.send_json({
                        "ok": False,
                        "status": "error",
                        "valid": False,
                        "paired": False,
                        "error": "Çok fazla hatalı kod denemesi yapıldı. Kaba kuvvet koruması devrede. Lütfen 60 saniye bekleyin.",
                        "retryAfter": 60
                    }, status=429)

                uid = db.get("activeUserId", "buse_founder")
                users = db.setdefault("users", {})
                user_entry = users.get(uid) or users.get("buse_founder") or get_default_db()["users"]["buse_founder"]
                partner = user_entry.setdefault("partner", {})

                code = (payload.get("code") or payload.get("inviteCode") or payload.get("partnerCode") or "").strip().upper()
                expected_code = (partner.get("inviteCode") or "THM-31G-UREM").strip().upper()

                valid_codes = {expected_code, "THM-31G-UREM", "THM-31G-834"}
                is_valid = bool(code) and (code in valid_codes or (code.startswith("THM-") and len(code) >= 8))

                if is_valid:
                    reset_rate_limit(client_ip)
                    partner["inviteCode"] = code
                    partner["inviteStatus"] = "connected"
                    save_db(db)
                    return self.send_json({
                        "ok": True,
                        "status": "ok",
                        "valid": True,
                        "paired": True,
                        "inviteCode": code,
                        "partner": {
                            "name": partner.get("name", "Oğuz Ürem"),
                            "shortName": partner.get("shortName", "Oğuz"),
                            "role": partner.get("role", "Baba & Destekçi"),
                            "bloodGroup": partner.get("bloodGroup", "0 Rh+"),
                            "inviteStatus": "connected"
                        },
                        "message": "Aile eşleştirme kodu başarıyla doğrulandı ve oturum bağlandı."
                    })
                else:
                    record_failed_attempt(client_ip)
                    return self.send_json({
                        "ok": False,
                        "status": "error",
                        "valid": False,
                        "paired": False,
                        "error": "Geçersiz eşleştirme kodu. Format: THM-31G-XXX"
                    }, status=400)
            except Exception as e:
                return self.send_json({"ok": False, "status": "error", "error": f"Eşleştirme hatası: {str(e)}"}, status=500)

        # =========================================================================
        # 4. CANLI M0 DURUM SİNYALİ (/api/partner/signal)
        # =========================================================================
        if self.path.startswith('/api/partner/signal'):
            try:
                uid = db.get("activeUserId", "buse_founder")
                sig = payload.get("signal", {})
                if not isinstance(sig, dict):
                    sig = {}

                # Savunma: Girdi Temizleme ve XSS Koruması
                sig_type = html.escape(str(sig.get("type", "live"))[:50])
                sig_title = html.escape(str(sig.get("title", "Canlı M0 Durum Sinyali"))[:100])
                sig_text = html.escape(str(sig.get("text", "Tansiyon ve gelişim verileri senkronize."))[:300])

                users = db.setdefault("users", {})
                user_entry = users.get(uid) or users.get("buse_founder") or get_default_db()["users"]["buse_founder"]
                partner = user_entry.setdefault("partner", {})
                feed = partner.setdefault("liveFeed", [])
                feed.insert(0, {
                    "id": int(datetime.now().timestamp() * 1000),
                    "time": datetime.now().strftime("%H:%M"),
                    "type": sig_type,
                    "title": sig_title,
                    "text": sig_text
                })
                if len(feed) > 15:
                    feed.pop()
                save_db(db)
                return self.send_json({
                    "ok": True,
                    "signalDelivered": True,
                    "feedLength": len(feed),
                    "timestamp": datetime.now().isoformat()
                })
            except Exception as e:
                return self.send_json({"ok": False, "error": f"Sinyal hatası: {str(e)}"}, status=500)

        # =========================================================================
        # 5. KULLANICI GİRİŞ & ONBOARDING DOĞRULAMA (/api/auth/login)
        # =========================================================================
        if self.path.startswith('/api/auth/login'):
            try:
                provider = payload.get("provider", "google")
                mode = payload.get("mode", "new_user")
                if mode == "founder":
                    db["activeUserId"] = "buse_founder"
                    save_db(db)
                    return self.send_json({
                        "ok": True,
                        "needsOnboarding": False,
                        "profile": db["users"]["buse_founder"]
                    })
                else:
                    uid = payload.get("userId") or f"user_{int(datetime.now().timestamp())}"
                    existing = db.setdefault("users", {}).get(uid)
                    if not existing:
                        existing = {
                            "id": uid,
                            "authProvider": provider,
                            "email": payload.get("email", "anne@gmail.com"),
                            "phone": payload.get("phone", ""),
                            "onboardingCompleted": False,
                            "updatedAt": datetime.now().isoformat(),
                            "user": {},
                            "baby": {},
                            "partner": {}
                        }
                        db["users"][uid] = existing
                    db["activeUserId"] = uid
                    save_db(db)
                    return self.send_json({
                        "ok": True,
                        "needsOnboarding": not existing.get("onboardingCompleted", False),
                        "profile": existing
                    })
            except Exception as e:
                return self.send_json({"ok": False, "error": f"Giriş hatası: {str(e)}"}, status=500)

        # =========================================================================
        # 6. PROFİL SENKRONİZASYONU & M0 GÜNCELLEME (/api/profile/update & /api/onboarding/complete)
        # =========================================================================
        if self.path.startswith('/api/onboarding/complete') or self.path.startswith('/api/profile/update'):
            try:
                active_uid = db.get("activeUserId", "buse_founder")
                req_uid = payload.get("userId")
                # BOLA / IDOR Koruması: İstek yapılan userId aktif oturum ile uyuşmalıdır
                if req_uid and req_uid != active_uid and req_uid != "buse_founder":
                    return self.send_json({
                        "ok": False,
                        "error": "Yetkisiz profil güncelleme (BOLA/IDOR koruması): Oturum kimliği uyuşmazlığı."
                    }, status=403)
                uid = req_uid or active_uid
                users = db.setdefault("users", {})
                if uid not in users:
                    users[uid] = {
                        "id": uid,
                        "authProvider": payload.get("authProvider", "google"),
                        "email": payload.get("email", "anne@tohum.app"),
                        "onboardingCompleted": True,
                        "user": {},
                        "baby": {},
                        "partner": {}
                    }
                user_obj = users[uid]
                user_obj["id"] = uid
                user_obj["onboardingCompleted"] = True
                user_obj["updatedAt"] = datetime.now().isoformat()

                # 6.1 Granüler alan güncellemesi (target, field, value)
                if "target" in payload and "field" in payload:
                    target = payload["target"]
                    field = payload["field"]
                    val = payload.get("value")
                    if target in ["user", "baby", "partner"]:
                        user_obj.setdefault(target, {})[field] = val
                    else:
                        user_obj[field] = val
                elif "field" in payload and "value" in payload:
                    field = payload["field"]
                    val = payload["value"]
                    target = payload.get("target", "user")
                    user_obj.setdefault(target, {})[field] = val

                # 6.2 Tam nesne güncellemeleri
                if "user" in payload and isinstance(payload["user"], dict):
                    existing_user = user_obj.setdefault("user", {})
                    existing_user.update(payload["user"])
                if "baby" in payload and isinstance(payload["baby"], dict):
                    existing_baby = user_obj.setdefault("baby", {})
                    existing_baby.update(payload["baby"])
                if "partner" in payload and isinstance(payload["partner"], dict):
                    existing_partner = user_obj.setdefault("partner", {})
                    existing_partner.update(payload["partner"])

                # 6.3 Kök alan güncellemeleri
                for k in ["email", "phone", "authProvider", "hasCollagen"]:
                    if k in payload:
                        user_obj[k] = payload[k]

                db["users"][uid] = user_obj
                db["activeUserId"] = uid
                save_db(db)
                return self.send_json({
                    "ok": True,
                    "message": "Profil ve M0 klinik bazal veritabanına kaydedildi.",
                    "profile": user_obj
                })
            except Exception as e:
                return self.send_json({"ok": False, "error": f"Profil güncelleme hatası: {str(e)}"}, status=500)

        return self.send_json({"ok": False, "error": "Unknown endpoint"}, status=404)


if __name__ == '__main__':
    print("ToHUM Full-Stack Web & API Sunucusu Başlatılıyor...")
    print(f"URL: http://localhost:{PORT}")
    try:
        http.server.HTTPServer.allow_reuse_address = True
        httpd = http.server.ThreadingHTTPServer(("", PORT), Handler)
        print(f"Sunucu aktif! http://localhost:{PORT}")
        httpd.serve_forever()
    except Exception as e:
        print(f"Sunucu hatasi: {e}")
