import sys
sys.stdout.reconfigure(encoding='utf-8')

p = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js"
with open(p, "r", encoding="utf-8") as f:
    c = f.read()

old_init = """if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => { loadSavedState(); render(); });
} else {
  loadSavedState();
  render();
}"""

c = c.replace(old_init, "// Initialization moved to end of file after all window.* handlers are registered")

new_init_end = """
// =========================================================================
// UYGULAMA BAŞLATICI VE URL DERİN BAĞLANTI (DEEP-LINK) DESTEĞİ
// Örn: index.html?tab=profile&sub=baseline&preset=atypical_preeclampsia
// =========================================================================
function initTohumApp() {
  loadSavedState();
  try {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    const subParam = params.get("sub");
    const presetParam = params.get("preset");
    if (tabParam) state.currentTab = tabParam;
    if (subParam) state.profileSubtab = subParam;
    if (presetParam && window.applyProfilePreset) {
      window.applyProfilePreset(presetParam);
      return;
    }
  } catch (e) {}
  render();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTohumApp);
} else {
  initTohumApp();
}
"""

c = c + "\n" + new_init_end

with open(p, "w", encoding="utf-8") as f:
    f.write(c)

print("Moved initialization to end of app.js and added URL query routing!")
