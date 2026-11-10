import sys
sys.stdout.reconfigure(encoding='utf-8')
p = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js"
with open(p, "r", encoding="utf-8") as f:
    c = f.read()

old_s = '  profileSubtab: "identity",'
new_s = """  auth: {
    isAuthenticated: true,
    screen: "app", // 'login' | 'onboarding' | 'app'
    onboardingStep: 1, // 1..5
    provider: "google",
    userId: "buse_founder",
    syncStatus: "Sunucu ile Senkronize ✓",
    partnerCodeInput: "",
    phoneInput: ""
  },
  profileSubtab: "identity","""

if "auth: {" not in c and old_s in c:
    c = c.replace(old_s, new_s, 1)
    with open(p, "w", encoding="utf-8") as f:
        f.write(c)
    print("Added state.auth to app.js!")
else:
    print("state.auth already present!")
