# -*- coding: utf-8 -*-
"""
upgrade_serve_export.py
Adds /api/export and /api/partner/signal endpoints to serve.py
"""

def main():
    p = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\serve.py"
    with open(p, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Add /api/export in do_GET
    if "self.path.startswith('/api/export')" not in content:
        target_get = "if self.path.startswith('/api/profile'):"
        export_get_code = '''if self.path.startswith('/api/export'):
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

        if self.path.startswith('/api/profile'):'''
        content = content.replace(target_get, export_get_code)
        print("Added /api/export to serve.py")

    # 2. Add /api/partner/signal in do_POST
    if "self.path.startswith('/api/partner/signal')" not in content:
        target_post = "if self.path.startswith('/api/auth/login'):"
        signal_post_code = '''if self.path.startswith('/api/partner/signal'):
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

        if self.path.startswith('/api/auth/login'):'''
        content = content.replace(target_post, signal_post_code)
        print("Added /api/partner/signal to serve.py")

    with open(p, "w", encoding="utf-8") as f:
        f.write(content)

    print("Successfully updated serve.py!")

if __name__ == "__main__":
    main()
