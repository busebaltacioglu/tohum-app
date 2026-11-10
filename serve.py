import http.server
import json
import os
import sys
from datetime import datetime

sys.stdout.reconfigure(encoding='utf-8')

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DIRECTORY = os.path.join(BASE_DIR, 'public')
DATA_DIR = os.path.join(BASE_DIR, 'data')
DB_FILE = os.path.join(DATA_DIR, 'users_db.json')

os.makedirs(DATA_DIR, exist_ok=True)


def get_default_db():
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
                    "name": "Buse Baltacıoğlu",
                    "shortName": "Buse",
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
                    "name": "Oğuz Baltacıoğlu",
                    "shortName": "Oğuz",
                    "phone": "+90 532 000 00 00",
                    "email": "oguz@tohum.app",
                    "bloodGroup": "0 Rh+",
                    "inviteCode": "THM-31G-834",
                    "inviteStatus": "connected"
                }
            }
        }
    }


def load_db():
    if not os.path.exists(DB_FILE):
        db = get_default_db()
        save_db(db)
        return db
    try:
        with open(DB_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception:
        db = get_default_db()
        save_db(db)
        return db


def save_db(db):
    with open(DB_FILE, 'w', encoding='utf-8') as f:
        json.dump(db, f, ensure_ascii=False, indent=2)


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode('utf-8')
        self.send_response(status)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.startswith('/api/export'):
            db = load_db()
            uid = db.get("activeUserId", "buse_founder")
            profile = db.get("users", {}).get(uid) or db["users"]["buse_founder"]
            return self.send_json({
                "ok": True,
                "exportedAt": datetime.now().isoformat(),
                "system": "ToHUM Calm Tech M0 Health Engine",
                "version": "1.0-M0-Complete",
                "activeUserId": uid,
                "profile": profile
            })

        if self.path.startswith('/api/profile'):
            db = load_db()
            uid = db.get("activeUserId", "buse_founder")
            profile = db.get("users", {}).get(uid) or db["users"]["buse_founder"]
            return self.send_json({
                "ok": True,
                "activeUserId": uid,
                "profile": profile,
                "totalUsers": len(db.get("users", {}))
            })
        return super().do_GET()

    def do_POST(self):
        length = int(self.headers.get('Content-Length', 0))
        raw = self.rfile.read(length).decode('utf-8') if length > 0 else '{}'
        try:
            payload = json.loads(raw)
        except Exception:
            payload = {}

        db = load_db()

        if self.path.startswith('/api/partner/care-action'):
            uid = db.get("activeUserId", "buse_founder")
            action = payload.get("action", "water")
            user_entry = db.get("users", {}).get(uid, db["users"]["buse_founder"])
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
                }
            }
            details = action_map.get(action, {
                "title": "Şefkatli Baba Desteği",
                "text": "Oğuz Buse'nin maternal ihtiyaç analizine uygun proaktif desteği tamamladı."
            })
            
            feed.insert(0, {
                "id": int(datetime.now().timestamp() * 1000),
                "time": datetime.now().strftime("%H:%M"),
                "type": "care_completed",
                "title": details["title"],
                "text": details["text"]
            })
            if len(feed) > 10:
                feed.pop()
            save_db(db)
            return self.send_json({
                "ok": True,
                "actionCompleted": action,
                "title": details["title"],
                "text": details["text"],
                "feedLength": len(feed),
                "timestamp": datetime.now().isoformat()
            })

        if self.path.startswith('/api/partner/signal'):
            uid = db.get("activeUserId", "buse_founder")
            sig = payload.get("signal", {})
            user_entry = db.get("users", {}).get(uid, db["users"]["buse_founder"])
            partner = user_entry.setdefault("partner", {})
            feed = partner.setdefault("liveFeed", [])
            feed.insert(0, {
                "id": int(datetime.now().timestamp() * 1000),
                "time": datetime.now().strftime("%H:%M"),
                "type": sig.get("type", "live"),
                "title": sig.get("title", "Canlı M0 Durum Sinyali"),
                "text": sig.get("text", "Tansiyon ve gelişim verileri senkronize.")
            })
            if len(feed) > 10:
                feed.pop()
            save_db(db)
            return self.send_json({
                "ok": True,
                "signalDelivered": True,
                "feedLength": len(feed),
                "timestamp": datetime.now().isoformat()
            })

        if self.path.startswith('/api/auth/login'):
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
                existing = db["users"].get(uid)
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

        if self.path.startswith('/api/onboarding/complete') or self.path.startswith('/api/profile/update'):
            uid = payload.get("userId") or db.get("activeUserId", "buse_founder")
            user_obj = db["users"].get(uid, {})
            user_obj["id"] = uid
            user_obj["onboardingCompleted"] = True
            user_obj["updatedAt"] = datetime.now().isoformat()
            if "user" in payload:
                user_obj["user"] = payload["user"]
            if "baby" in payload:
                user_obj["baby"] = payload["baby"]
            if "partner" in payload:
                user_obj["partner"] = payload["partner"]
            db["users"][uid] = user_obj
            db["activeUserId"] = uid
            save_db(db)
            return self.send_json({
                "ok": True,
                "message": "Profil ve M0 klinik bazal veritabanına kaydedildi.",
                "profile": user_obj
            })

        return self.send_json({"ok": False, "error": "Unknown endpoint"}, status=404)


if __name__ == '__main__':
    print("ToHUM Full-Stack Web & API Sunucusu Başlatılıyor...")
    print(f"URL: http://localhost:{PORT}")
    try:
        httpd = http.server.ThreadingHTTPServer(("", PORT), Handler)
        print(f"Sunucu aktif! http://localhost:{PORT}")
        httpd.serve_forever()
    except Exception as e:
        print(f"Sunucu hatasi: {e}")
