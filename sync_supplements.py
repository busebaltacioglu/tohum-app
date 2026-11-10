import sys
sys.stdout.reconfigure(encoding='utf-8')
p = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js"
with open(p, "r", encoding="utf-8") as f:
    c = f.read()

old_fn = """window.toggleSurveyArrayItem = function(listKey, itemId) {
  if (!state.user.survey) {
    state.user.survey = { waterHabit: "5-7", supplements: ["iron", "magnesium"], symptoms: [], specialConditions: [] };
  }
  const arr = state.user.survey[listKey] || [];
  if (arr.includes(itemId)) {
    state.user.survey[listKey] = arr.filter(x => x !== itemId);
  } else {
    state.user.survey[listKey] = [...arr, itemId];
  }
  triggerHaptic(12);
  saveProfileToBackend(false);
  render();
};"""

new_fn = """window.toggleSurveyArrayItem = function(listKey, itemId) {
  if (!state.user.survey) {
    state.user.survey = { waterHabit: "5-7", supplements: ["iron", "magnesium"], symptoms: [], specialConditions: [] };
  }
  const arr = state.user.survey[listKey] || [];
  if (arr.includes(itemId)) {
    state.user.survey[listKey] = arr.filter(x => x !== itemId);
  } else {
    state.user.survey[listKey] = [...arr, itemId];
  }

  if (listKey === "supplements") {
    const catalog = {
      iron: { id: "iron", name: "Ferro Sanol Duodenal (Demir)", shortName: "Demir Kapsülü", dose: "Günde 1 Kapsül · Sabah Aç", doctor: state.user.doctorName || "Dr. Ayşe Yılmaz", target: "Ferritin ve hemoglobin desteği", bioTip: "Portakal suyu (C vitamini) ile için, sütle almayın.", takenToday: false, takenTime: null, particleColor: "omega", badge: "Sabah Aç" },
      magnesium: { id: "magnesium", name: "Magnimore Plus (Magnezyum)", shortName: "Magnezyum Saşe", dose: "Günde 1 Saşe · Akşam Tok", doctor: state.user.doctorName || "Dr. Ayşe Yılmaz", target: "Kas kramplarını önleme & rahim gevşetme", bioTip: "Demir ilacından en az 2 saat sonra (akşam) alın.", takenToday: false, takenTime: null, particleColor: "magnesium", badge: "Akşam Tok" },
      folic: { id: "folic", name: "Folbiol / Aktif Folat (400 mcg)", shortName: "Folik Asit", dose: "Günde 1 Tablet · Sabah", doctor: state.user.doctorName || "Dr. Ayşe Yılmaz", target: "Nöral tüp ve hücre gelişimi", bioTip: "Her sabah aynı saatte suyla alın.", takenToday: false, takenTime: null, particleColor: "folic", badge: "Sabah" },
      omega: { id: "omega", name: "Ocean Mummy (Multivitamin & DHA)", shortName: "Omega 3 & DHA", dose: "Günde 1 Kapsül · Öğle Tok", doctor: state.user.doctorName || "Dr. Ayşe Yılmaz", target: "Bebeğin beyin ve göz gelişimi", bioTip: "Öğle yemeğiyle birlikte tok karnına alın.", takenToday: false, takenTime: null, particleColor: "folic", badge: "Öğle Tok" },
      d3: { id: "d3", name: "Coledan D3 Damla (1000 IU)", shortName: "D3 Vitamini Damlası", dose: "Günde 4 Damla · Sabah", doctor: state.user.doctorName || "Dr. Ayşe Yılmaz", target: "Kalsiyum emilimi ve kemik gelişimi", bioTip: "Kahvaltıda ekmek veya zeytinyağı ile alın.", takenToday: false, takenTime: null, particleColor: "water", badge: "Sabah" }
    };
    const selectedIds = state.user.survey.supplements || [];
    state.prescriptions = selectedIds.map(id => {
      const existing = (state.prescriptions || []).find(p => p.id === id);
      return existing || catalog[id];
    }).filter(Boolean);
  }

  triggerHaptic(12);
  saveProfileToBackend(false);
  render();
};"""

if old_fn in c:
    c = c.replace(old_fn, new_fn, 1)
    with open(p, "w", encoding="utf-8") as f:
        f.write(c)
    print("Synced onboarding supplements with state.prescriptions!")
else:
    print("WARNING: old_fn not found!")
