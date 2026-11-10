import sys
sys.stdout.reconfigure(encoding='utf-8')

path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Ensure state.profileSubtab exists
if 'profileSubtab:' not in code:
    code = code.replace('currentTab: "home",', 'currentTab: "home",\n  profileSubtab: "identity",')
    print("1. Added state.profileSubtab")

# 2. Update loadSavedState
old_load = """    if (saved.selectedSymptoms) state.healthData.selectedSymptoms = saved.selectedSymptoms;
    if (saved.selectedMood) state.healthData.selectedMood = saved.selectedMood;
  } catch(e) {}"""

new_load = """    if (saved.selectedSymptoms) state.healthData.selectedSymptoms = saved.selectedSymptoms;
    if (saved.selectedMood) state.healthData.selectedMood = saved.selectedMood;
    if (saved.userProfile) {
      state.user = Object.assign({}, state.user, saved.userProfile);
      state.user.baselineBP = `${state.user.baselineSys}/${state.user.baselineDia}`;
    }
    if (saved.partnerProfile) {
      state.partner = Object.assign({}, state.partner, saved.partnerProfile);
      if (saved.partnerProfile.permissions) {
        state.partner.permissions = Object.assign({}, state.partner.permissions, saved.partnerProfile.permissions);
      }
    }
    if (saved.profileSubtab) state.profileSubtab = saved.profileSubtab;
  } catch(e) {}"""

if old_load in code:
    code = code.replace(old_load, new_load, 1)
    print("2. Updated loadSavedState!")
else:
    print("WARNING: old_load not found")

# 3. Update window.runAiSeedCoreAnalysis to use dynamic baselineSys / baselineDia
old_ai = """window.runAiSeedCoreAnalysis = function(systolic, diastolic, hrv, symptoms) {
  const baseSys = 90;
  const baseDia = 60;
  const deltaSys = systolic - baseSys;
  const deltaDia = diastolic - baseDia;
  const hrvVal = (hrv !== undefined) ? hrv : (state.wearable ? state.wearable.hrv : 64);
  const syms = symptoms || (state.healthData ? state.healthData.selectedSymptoms : []);
  const hasEdema = syms.some(s => /ödem|şişlik/i.test(s));
  const hasHeadache = syms.some(s => /baş ağrısı|görme/i.test(s));

  let status = "optimal"; // optimal (yeşil), borderline (sarı), critical (kırmızı)
  let riskScore = 8;
  let message = "";
  let badgeText = "✓ Dengede (Bazal 90/60)";

  // Kurucunun Y.L. Tezi Kuralları:
  if (systolic >= 135 || diastolic >= 88 || (deltaSys >= 35 && deltaDia >= 25)) {
    status = "critical";
    riskScore = 94;
    badgeText = "🚨 Kardiyovasküler Stres";
    message = `🚨 AI Seed Core Kritik Alarm: Kişisel bazaliniz 90/60 mmHg iken ${systolic}/${diastolic} mmHg (+${deltaSys}/+${deltaDia} mmHg) ölçüldü. Dengesiz veri sınıflandırıcısı preeklampsi riskini %94 olarak hesapladı. Dr. Ayşe Yılmaz'a derhal başvurunuz.`;
  } else if ((deltaSys >= 25 && deltaDia >= 18) || (systolic >= 120 && hrvVal < 55) || (deltaSys >= 20 && hasEdema)) {
    status = "borderline";
    riskScore = 72;
    badgeText = "⚠️ Atipik Sıçrama (Gizli Preeklampsi)";
    message = `⚠️ AI Seed Core Atipik Sıçrama Tespiti: 120/80 mmHg genel popülasyonda "normal" kabul edilir; ancak sizin 90/60 mmHg kişisel bazaliniz için +${deltaSys}/+${deltaDia} mmHg'lik kritik bir sıçramadır. Düşen HRV (${hrvVal} ms) vasküler yükü doğrulamaktadır. Dinlenin ve 1 saat sonra tekrar ölçün.`;
  } else if (systolic >= 115 || deltaSys >= 15) {
    status = "watch";
    riskScore = 35;
    badgeText = "⚑ İzlem Koridoru";
    message = `⚑ Kişisel İzlem: 90/60 bazalden +${deltaSys} mmHg hafif yükseliş. Sol yanınıza uzanıp ılık su için.`;
  } else {
    status = "optimal";
    riskScore = 8;
    badgeText = "✓ Güvenli Koridor (90/60)";
    message = `✓ Güvenli Koridor: Ölçümünüz (${systolic}/${diastolic} mmHg), 90/60 mmHg kişisel bazaliniz ve ${hrvVal} ms otonom HRV ile mükemmel uyumlu.`;
  }"""

new_ai = """window.runAiSeedCoreAnalysis = function(systolic, diastolic, hrv, symptoms) {
  const baseSys = Number(state.user.baselineSys) || 90;
  const baseDia = Number(state.user.baselineDia) || 60;
  const baseStr = `${baseSys}/${baseDia}`;
  const deltaSys = systolic - baseSys;
  const deltaDia = diastolic - baseDia;
  const hrvVal = (hrv !== undefined) ? hrv : (state.wearable ? state.wearable.hrv : 64);
  const syms = symptoms || (state.healthData ? state.healthData.selectedSymptoms : []);
  const hasEdema = syms.some(s => /ödem|şişlik/i.test(s));
  const hasHeadache = syms.some(s => /baş ağrısı|görme/i.test(s));
  const docName = state.user.doctorName || "Dr. Ayşe Yılmaz";

  let status = "optimal"; // optimal (yeşil), watch (mavi/kehribar), borderline (sarı), critical (kırmızı)
  let riskScore = 8;
  let message = "";
  let badgeText = `✓ Dengede (Bazal ${baseStr})`;

  // Kurucunun Y.L. Tezi Kuralları (Kişisel Bazal Referans Vektörü X_baseline):
  if (systolic >= 135 || diastolic >= 88 || (deltaSys >= 35 && deltaDia >= 25)) {
    status = "critical";
    riskScore = 94;
    badgeText = "🚨 Kardiyovasküler Stres";
    message = `🚨 AI Seed Core Kritik Alarm: Kişisel bazaliniz ${baseStr} mmHg iken ${systolic}/${diastolic} mmHg (${deltaSys >= 0 ? '+' : ''}${deltaSys}/${deltaDia >= 0 ? '+' : ''}${deltaDia} mmHg) ölçüldü. Dengesiz veri sınıflandırıcısı preeklampsi riskini %94 olarak hesapladı. ${docName}'a derhal başvurunuz.`;
  } else if ((deltaSys >= 25 && deltaDia >= 18) || (systolic >= 120 && hrvVal < 55) || (deltaSys >= 20 && hasEdema)) {
    status = "borderline";
    riskScore = 72;
    badgeText = "⚠️ Atipik Sıçrama (Gizli Preeklampsi)";
    message = `⚠️ AI Seed Core Atipik Sıçrama Tespiti: ${systolic}/${diastolic} mmHg genel popülasyonda "normal" sanılabilir; ancak sizin ${baseStr} mmHg kişisel bazaliniz için +${deltaSys}/+${deltaDia} mmHg'lik kritik bir sıçramadır. Otonom HRV (${hrvVal} ms) vasküler yükü doğrulamaktadır. Dinlenin ve 1 saat sonra tekrar ölçün.`;
  } else if (deltaSys >= 15 || deltaDia >= 10 || systolic >= 118) {
    status = "watch";
    riskScore = 35;
    badgeText = "⚑ İzlem Koridoru";
    message = `⚑ Kişisel İzlem: ${baseStr} mmHg kişisel bazalinizden +${deltaSys}/+${deltaDia} mmHg hafif yükseliş. Sol yanınıza uzanıp ılık su için.`;
  } else {
    status = "optimal";
    riskScore = 8;
    badgeText = `✓ Güvenli Koridor (${baseStr})`;
    message = `✓ Güvenli Koridor: Ölçümünüz (${systolic}/${diastolic} mmHg), ${baseStr} mmHg kişisel bazaliniz ve ${hrvVal} ms otonom HRV ile tam uyumlu.`;
  }"""

if old_ai in code:
    code = code.replace(old_ai, new_ai, 1)
    print("3. Updated window.runAiSeedCoreAnalysis!")
else:
    print("WARNING: old_ai not found")

# 4. Update HealthTab biometrics card to reflect dynamic baseline and dynamic weight corridor
old_health_bp = """          <div class="p-3.5 bg-white/5 rounded-2xl flex items-center justify-between border border-white/5">
            <div>
              <div class="text-lg font-bold text-white">${state.healthData.bloodPressureHistory[0].systolic}/${state.healthData.bloodPressureHistory[0].diastolic} <span class="text-xs font-normal text-white/60">mmHg</span></div>
              <div class="text-[10px] text-emerald-300 mt-0.5">✓ Son Ölçüm: ${state.healthData.bloodPressureHistory[0].date}</div>
            </div>
            <span class="text-[10px] px-2.5 py-1 rounded-full font-semibold border
              ${state.healthData.bloodPressureHistory[0].systolic >= 130
                ? 'bg-rose-500/25 border-rose-400/40 text-rose-300'
                : state.healthData.bloodPressureHistory[0].systolic >= 115
                ? 'bg-amber-500/25 border-amber-400/40 text-amber-300'
                : 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'}">
              ${state.healthData.bloodPressureHistory[0].systolic >= 130 ? '⚠ Yüksek' : state.healthData.bloodPressureHistory[0].systolic >= 115 ? '⚑ İzle' : '✓ Güvenli'}
            </span>
          </div>"""

new_health_bp = """          ${(() => {
            const latestBp = state.healthData.bloodPressureHistory[0];
            const aiRes = window.runAiSeedCoreAnalysis ? window.runAiSeedCoreAnalysis(latestBp.systolic, latestBp.diastolic) : { status: 'optimal', badgeText: '✓ Güvenli', message: '' };
            const badgeCls = aiRes.status === 'critical'
              ? 'bg-rose-500/25 border-rose-400/40 text-rose-300'
              : (aiRes.status === 'borderline' || aiRes.status === 'watch')
              ? 'bg-amber-500/25 border-amber-400/40 text-amber-200'
              : 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300';
            return `
              <div class="p-3.5 bg-white/5 rounded-2xl space-y-2 border border-white/5">
                <div class="flex items-center justify-between">
                  <div>
                    <div class="text-lg font-bold text-white">${latestBp.systolic}/${latestBp.diastolic} <span class="text-xs font-normal text-white/60">mmHg</span></div>
                    <div class="text-[10px] text-emerald-300 mt-0.5">✓ Son Ölçüm: ${latestBp.date}</div>
                  </div>
                  <span class="text-[10px] px-2.5 py-1 rounded-full font-semibold border ${badgeCls}">
                    ${aiRes.badgeText}
                  </span>
                </div>
                <div class="text-[10px] text-white/75 bg-black/30 p-2.5 rounded-xl border border-white/5 leading-relaxed">
                  ${aiRes.message}
                </div>
              </div>
            `;
          })()}"""

if old_health_bp in code:
    code = code.replace(old_health_bp, new_health_bp, 1)
    print("4a. Updated HealthTab BP card with dynamic AI Seed Core analysis!")
else:
    print("WARNING: old_health_bp not found")

old_health_weight = """          <div class="flex justify-between items-center">
            <div>
              <span class="text-xs font-semibold text-white/95">Haftalık İlerleme Eğrisi</span>
              <p class="text-[10px] text-white/50">0. Hafta (58 kg / 68 cm) ➔ 31. Hafta (65 kg / 98 cm)</p>
            </div>
            <button onclick="editCurrentWeight()" class="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/15 text-amber-200 text-xs font-medium rounded-xl">
              Düzenle
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs">
            <div class="p-3 bg-white/5 rounded-2xl border border-white/5">
              <span class="text-[10px] text-white/50">Toplam Kilo Artışı</span>
              <div class="text-base font-bold text-emerald-300 mt-0.5">+${weightGain} kg</div>
              <span class="text-[9px] text-white/40">Hedef: +7 ila +11 kg</span>
            </div>"""

new_health_weight = """          ${(() => {
            const m0w = window.computeM0BaselineProfile ? window.computeM0BaselineProfile() : { expectedMinGain: '7.0', expectedMaxGain: '10.2', bmi: '20.5', bmiCategory: 'Normal VKİ', weightStatusText: 'DSÖ Koridorunda' };
            return `
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-xs font-semibold text-white/95">Haftalık İlerleme Eğrisi (VKİ: ${m0w.bmi} kg/m²)</span>
                  <p class="text-[10px] text-white/50">0. Hafta (${state.user.startWeight} kg) ➔ ${state.baby.week}. Hafta (${state.user.currentWeight} kg)</p>
                </div>
                <button onclick="editCurrentWeight()" class="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/15 text-amber-200 text-xs font-medium rounded-xl">
                  Düzenle
                </button>
              </div>

              <div class="grid grid-cols-2 gap-2 text-xs">
                <div class="p-3 bg-white/5 rounded-2xl border border-white/5">
                  <span class="text-[10px] text-white/50">Toplam Kilo Artışı</span>
                  <div class="text-base font-bold text-emerald-300 mt-0.5">${weightGain >= 0 ? '+' : ''}${weightGain} kg</div>
                  <span class="text-[9px] text-white/50">${state.baby.week}.H Hedef: +${m0w.expectedMinGain} – +${m0w.expectedMaxGain} kg</span>
                </div>
            `;
          })()}"""

if old_health_weight in code:
    code = code.replace(old_health_weight, new_health_weight, 1)
    print("4b. Updated HealthTab weight corridor card!")
else:
    print("WARNING: old_health_weight not found")

# 5. Replace renderFatherTab and renderProfileTab with the complete M0 Baseline & Partner Bridge architecture
start_marker = "// 7. MODÜL: BABA DESTEK ALANI\nfunction renderFatherTab() {"
end_marker = "// GENEL ETKİLEŞİM İŞLEYİCİLERİ\nwindow.toggleDrawer = function()"

idx_start = code.find(start_marker)
idx_end = code.find(end_marker)

if idx_start == -1 or idx_end == -1:
    print(f"ERROR: markers not found! idx_start={idx_start}, idx_end={idx_end}")
    sys.exit(1)

new_father_and_profile = """// =========================================================================
// M0 KÖK HÜCRE MOTORU: BİYOMETRİK BAZAL, VKİ KORİDORU & RH UYUŞMAZLIK KALKANI
// Doğrulanmış Veri Setleri:
// - DS1: UCI Maternal Health Risk (Kardiyovasküler Bazal & Sıçrama)
// - DS5: Pregnant Weight & Neonates (VKİ & Gebelik Kilo Kazanım Koridoru)
// - DS7 & DS8: Preterm & Mode of Delivery (Parite, Yaş, Risk Vektörü)
// =========================================================================
window.computeM0BaselineProfile = function() {
  const u = state.user;
  const p = state.partner;
  const curW = state.baby.week || 31;

  // 1. Gebelik Öncesi VKİ (BMI) ve DSÖ / IOM Haftalık Kilo Koridoru
  const heightM = (Number(u.heightCm) || 168) / 100;
  const startW = Number(u.startWeight) || 58.0;
  const curWeight = Number(u.currentWeight) || 65.0;
  const bmi = startW / (heightM * heightM);
  const actualGain = curWeight - startW;

  let bmiCategory = "Normal VKİ (18.5–24.9)";
  let totalTargetRange = "11.5 – 16.0 kg";
  let weeklyRate = 0.42; // 2. ve 3. trimester haftalık ideal artış (kg/hafta)
  let weeklyMinRate = 0.35;
  let weeklyMaxRate = 0.50;

  if (bmi < 18.5) {
    bmiCategory = "Düşük VKİ (<18.5)";
    totalTargetRange = "12.5 – 18.0 kg";
    weeklyRate = 0.51;
    weeklyMinRate = 0.44;
    weeklyMaxRate = 0.58;
  } else if (bmi >= 25.0 && bmi < 30.0) {
    bmiCategory = "Yüksek VKİ (25.0–29.9)";
    totalTargetRange = "7.0 – 11.5 kg";
    weeklyRate = 0.28;
    weeklyMinRate = 0.23;
    weeklyMaxRate = 0.33;
  } else if (bmi >= 30.0) {
    bmiCategory = "Obezite Sınıfı VKİ (≥30.0)";
    totalTargetRange = "5.0 – 9.0 kg";
    weeklyRate = 0.22;
    weeklyMinRate = 0.17;
    weeklyMaxRate = 0.27;
  }

  // İlk 13 haftada ortalama 1.0 - 2.0 kg, sonrasında haftalık hız
  const weeksAfterT1 = Math.max(0, curW - 13);
  const expectedMinGain = curW <= 13 ? (curW * 0.08) : (1.0 + weeksAfterT1 * weeklyMinRate);
  const expectedMaxGain = curW <= 13 ? (curW * 0.16) : (2.0 + weeksAfterT1 * weeklyMaxRate);

  let weightStatus = "optimal";
  let weightStatusText = "✓ DSÖ/IOM Koridorunda Dengeli";
  let weightAdvice = `${curW}. haftada +${actualGain.toFixed(1)} kg kazanımınız, ${bmi.toFixed(1)} kg/m² başlangıç VKİ değerinize göre hesaplanan +${expectedMinGain.toFixed(1)} ile +${expectedMaxGain.toFixed(1)} kg koridorunun tam içindedir.`;

  if (actualGain > expectedMaxGain + 0.8) {
    weightStatus = "high";
    weightStatusText = "⚠️ Beklenen Koridorun Üzerinde (+GDM/Ödem İzlemi)";
    weightAdvice = `${curW}. haftada +${actualGain.toFixed(1)} kg artış, kişisel koridorunuzun (+${expectedMinGain.toFixed(1)}–${expectedMaxGain.toFixed(1)} kg) üzerindedir. Hızlı sıvı tutulumu (ödem) veya gestasyonel glukoz toleransı açısından ${u.doctorName} ile değerlendirilmesi önerilir.`;
  } else if (actualGain < expectedMinGain - 0.8) {
    weightStatus = "low";
    weightStatusText = "⚑ Beklenen Koridorun Altında (Beslenme Desteği)";
    weightAdvice = `${curW}. haftada +${actualGain.toFixed(1)} kg artış, kişisel koridorunuzun (+${expectedMinGain.toFixed(1)}–${expectedMaxGain.toFixed(1)} kg) altındadır. Fetal büyüme eğrisini desteklemek için protein ve sağlıklı yağ alımını artırabilirsiniz.`;
  }

  // 2. Kişisel Kardiyovasküler Tansiyon Koridoru (AI Seed Core Bazal Vektörü)
  const baseSys = Number(u.baselineSys) || 90;
  const baseDia = Number(u.baselineDia) || 60;
  const bpCorridors = {
    optimal: `${baseSys - 10}–${baseSys + 14} / ${baseDia - 8}–${baseDia + 9}`,
    watch: `${baseSys + 15}–${baseSys + 24} / ${baseDia + 10}–${baseDia + 17}`,
    borderline: `${baseSys + 25}–${baseSys + 34} / ${baseDia + 18}–${baseDia + 24}`,
    critical: `≥${Math.min(135, baseSys + 35)} / ≥${Math.min(88, baseDia + 25)}`
  };

  // 3. Rh İzoimmünizasyon (Kan Uyuşmazlığı) Kalkanı (Anne x Baba Çaprazlama)
  const momRhNeg = (u.bloodGroup || "").includes("Rh-");
  const dadRhPos = (p.bloodGroup || "").includes("Rh+");
  const rhIncompatibility = momRhNeg && dadRhPos;
  let rhStatusText = "✓ Rh Kan Uyumu Güvenli";
  let rhDetailText = `Anne (${u.bloodGroup}) ve Baba (${p.bloodGroup}) kan grupları arasında Rh izoimmünizasyon (kan uyuşmazlığı) riski bulunmamaktadır.`;
  if (rhIncompatibility) {
    rhStatusText = "🛡️ Rh Kan Uyuşmazlığı Kalkanı Aktif (Anne Rh- / Baba Rh+)";
    rhDetailText = `Anne ${u.bloodGroup} ve Baba ${p.bloodGroup} olduğu için 28. haftada İndirekt Coombs testi ve Anti-D İmmünglobulin (Kan Uyuşmazlığı İğnesi) protokolü takviminizde işaretlenmiştir.`;
  } else if (momRhNeg && !dadRhPos) {
    rhStatusText = "✓ Rh Negatif Uyumlu (Her İki Ebeveyn Rh-)";
    rhDetailText = `Anne (${u.bloodGroup}) ve Baba (${p.bloodGroup}) Rh negatif olduğu için antikor oluşumu beklenmez.`;
  }

  return {
    bmi: bmi.toFixed(1),
    bmiCategory,
    totalTargetRange,
    actualGain: actualGain.toFixed(1),
    expectedMinGain: expectedMinGain.toFixed(1),
    expectedMaxGain: expectedMaxGain.toFixed(1),
    weightStatus,
    weightStatusText,
    weightAdvice,
    baseSys,
    baseDia,
    bpCorridors,
    rhIncompatibility,
    rhStatusText,
    rhDetailText
  };
};

// 7. MODÜL: BABA DESTEK ALANI (PROFİLDEKİ EŞ KÖPRÜSÜ İLE CANLI SENKRONİZE)
function renderFatherTab() {
  const m0 = window.computeM0BaselineProfile();
  const curW = state.baby.week;
  const lc = getLifecycleDataForWeek(curW);
  const latestBp = state.healthData.bloodPressureHistory[0] || { systolic: 92, diastolic: 62 };
  const aiRes = window.runAiSeedCoreAnalysis(latestBp.systolic, latestBp.diastolic);
  const perms = state.partner.permissions || { shareVitals: true, shareSymptoms: true, shareSupplements: true, eveningMassage: true };
  const statusMap = {
    uninvited: { lbl: "Davet Bekliyor", cls: "bg-white/10 text-white/60 border-white/15" },
    pending: { lbl: "Davet Gönderildi ⏳", cls: "bg-amber-500/20 text-amber-200 border-amber-400/30" },
    connected: { lbl: "Canlı Senkronize ✓", cls: "bg-emerald-500/20 text-emerald-300 border-emerald-400/30" }
  };
  const stObj = statusMap[state.partner.inviteStatus || "connected"] || statusMap.connected;

  return `
    <div class="w-full h-full pt-16 pb-20 px-4 space-y-3.5 text-white overflow-y-auto">
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h2 class="text-base font-serif font-semibold text-white/95">${state.partner.shortName || 'Oğuz'} · Baba Komuta & Destek</h2>
          <p class="text-[10px] text-white/60">${state.user.shortName} & ${state.baby.name}'in Eşzamanlı Koruyucu Kalkanı</p>
        </div>
        <span class="text-[10px] px-2.5 py-1 rounded-full border font-semibold ${stObj.cls}">
          ${stObj.lbl}
        </span>
      </div>

      <!-- Baba Kimlik & Çapraz Kan Grubu Kartı -->
      <div class="p-4 bg-white/5 rounded-3xl border border-amber-400/30 flex items-center justify-between">
        <div class="flex items-center space-x-3">
          <img src="${state.partner.avatar}" class="w-13 h-13 rounded-full object-cover border-2 border-amber-300 shadow-md">
          <div>
            <h3 class="text-sm font-serif font-bold text-white">${state.partner.name}</h3>
            <p class="text-[10px] text-amber-200/90 mt-0.5">${state.partner.role} · Kan Grubu: <b>${state.partner.bloodGroup}</b></p>
            <p class="text-[10px] text-white/50">${state.user.neighborhood}, ${state.user.city} · Kod: <span class="font-mono text-amber-200">${state.partner.inviteCode}</span></p>
          </div>
        </div>
        <button onclick="navigateTab('profile'); setProfileSubtab('partner');" class="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] text-amber-200 border border-white/10 shrink-0">
          Düzenle ✎
        </button>
      </div>

      <!-- Anne-Baba Canlı Biyometrik & Duygusal Köprü Özeti (İzinlere Göre) -->
      <div class="p-4 bg-gradient-to-br from-emerald-950/35 via-white/5 to-white/5 rounded-3xl border border-emerald-400/25 space-y-2.5 text-xs">
        <div class="flex justify-between items-center">
          <span class="font-bold text-emerald-200 text-xs">📡 ${state.user.shortName}'den Canlı Durum Akışı</span>
          <span class="text-[9px] text-white/45">${curW}. Hafta · ${lc.trimester}</span>
        </div>

        <div class="grid grid-cols-2 gap-2 text-[11px]">
          <div class="p-2.5 bg-black/35 rounded-2xl border border-white/5">
            <span class="text-[9px] text-white/45 block">Kardiyovasküler Bazal</span>
            ${perms.shareVitals
              ? `<span class="font-bold text-white">${latestBp.systolic}/${latestBp.diastolic} mmHg</span>
                 <span class="text-[9px] text-emerald-300 block mt-0.5">Bazal ${state.user.baselineBP} ile uyumlu</span>`
              : `<span class="text-[10px] text-white/40 italic">Mahremiyet tercihiyle gizli</span>`}
          </div>
          <div class="p-2.5 bg-black/35 rounded-2xl border border-white/5">
            <span class="text-[9px] text-white/45 block">Duygu & Semptom Sinyali</span>
            ${perms.shareSymptoms
              ? `<span class="font-bold text-amber-200">${state.healthData.selectedMood}</span>
                 <span class="text-[9px] text-white/60 block mt-0.5 truncate">${(state.healthData.selectedSymptoms || []).join(', ') || 'Sakin'}</span>`
              : `<span class="text-[10px] text-white/40 italic">Mahremiyet tercihiyle gizli</span>`}
          </div>
        </div>

        ${m0.rhIncompatibility ? `
          <div class="p-2.5 bg-rose-950/40 border border-rose-400/40 rounded-2xl text-[10px] text-rose-200 leading-relaxed">
            <b>🛡️ Rh Uyuşmazlığı Hatırlatması:</b> ${state.user.shortName} (${state.user.bloodGroup}) & ${state.partner.shortName} (${state.partner.bloodGroup}) kan uyuşmazlığı nedeniyle 28. hafta Anti-D (İndirekt Coombs) takibini birlikte kontrol edin.
          </div>
        ` : ''}
      </div>

      <!-- Haftalık Proaktif Baba Görevi -->
      <div class="p-4 bg-gradient-to-br from-amber-950/40 via-white/5 to-white/5 rounded-3xl text-xs space-y-2.5 border border-amber-400/25 shadow-sm">
        <div class="flex items-center justify-between">
          <span class="font-bold text-amber-200">🎯 ${curW}. Haftada ${state.partner.shortName}'a Özel Görev</span>
          <span class="text-[9px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full border border-amber-400/20">${lc.trimester}</span>
        </div>
        <p class="text-[11px] text-white/85 leading-relaxed bg-black/30 p-3 rounded-2xl border border-white/5 italic">
          "${lc.partnerMission}"
        </p>
      </div>

      <!-- Buse'den Gelen Canlı Bildirim / Destek Sinyalleri -->
      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2.5 text-xs">
        <div class="flex justify-between items-center">
          <span class="font-semibold text-white/95">🔔 ${state.user.shortName}'den Gelen Son Sinyaller</span>
          <span class="text-[9px] text-amber-200/80">${(state.partner.liveFeed || []).length} Kayıt</span>
        </div>
        <div class="space-y-2">
          ${(state.partner.liveFeed || []).map(f => `
            <div class="p-3 bg-black/30 rounded-2xl border border-white/5 space-y-1">
              <div class="flex justify-between items-center">
                <span class="font-bold text-amber-200 text-[11px]">${f.title}</span>
                <span class="text-[9px] text-white/45 font-mono">${f.time}</span>
              </div>
              <p class="text-[10px] text-white/80 leading-relaxed">${f.text}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="grid grid-cols-2 gap-2">
        <button onclick="playFatherVoice()" class="py-3 px-3 bg-gradient-to-r from-amber-500/30 to-amber-600/20 border border-amber-400/40 text-amber-200 text-[11px] font-semibold rounded-2xl hover:from-amber-500/40 transition shadow-lg flex items-center justify-center space-x-1.5">
          <span>🎙️</span>
          <span>${state.baby.name}'e Sesini Dinlet</span>
        </button>

        <button onclick="sendPartnerPainAlert()" class="py-3 px-3 bg-gradient-to-r from-rose-600/25 to-rose-700/15 border border-rose-400/35 text-rose-200 text-[11px] font-bold rounded-2xl hover:from-rose-600/35 transition shadow-lg flex items-center justify-center space-x-1.5">
          <span>📲</span>
          <span>WhatsApp Destek</span>
        </button>
      </div>
    </div>
  `;
}

// =========================================================================
// 8. MODÜL: BUSE'NİN PROFİLİ VE M0 KİŞİSEL BAZAL KOMUTA MERKEZİ
// 4 Alt Sekmeli Uçtan Uca Canlı Kalibrasyon Mimarisidir:
// 1. 👤 Kimlik & Gebelik (Demografi, Gebelik Haftası, Parite, Hekim/Hastane)
// 2. 🧬 M0 Klinik Bazal (Bazal Tansiyon 90/60, VKİ Kilo Koridoru, Uçtan Uca Senaryolar)
// 3. 🤝 Eş & Davet Köprüsü (Oğuz'un Bilgileri, Rh Kalkanı, Davet Kodu, İzinler)
// 4. 🌱 Yaşam Ağacı & Mahremiyet (M0-M7 Pusula, Zaman Kapsülü, Kendime Alan)
// =========================================================================
function renderProfileTab() {
  const sub = state.profileSubtab || "identity";
  const m0 = window.computeM0BaselineProfile();
  const curW = state.baby.week;
  const lc = getLifecycleDataForWeek(curW);

  return `
    <div class="w-full h-full pt-16 pb-20 px-4 space-y-3.5 text-white overflow-y-auto">
      
      <!-- Üst Kompakt Kimlik & M0 Kök Hücre Başlığı -->
      <div class="p-4 bg-gradient-to-br from-amber-950/40 via-white/5 to-emerald-950/25 rounded-3xl border border-amber-400/30 flex items-center justify-between shadow-lg">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <img src="${state.user.avatar}" class="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-md">
            <span class="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-emerald-500 text-black font-bold text-[8px] rounded-full">M0</span>
          </div>
          <div>
            <h2 class="text-sm font-bold text-white leading-tight">${state.user.name}</h2>
            <p class="text-[10px] text-amber-200 font-medium mt-0.5">${state.user.age || 31} Yaş · ${state.user.occupation || 'Biyoistatistikçi'} · ${state.user.city}</p>
            <div class="flex items-center space-x-1.5 mt-1">
              <span class="px-2 py-0.5 bg-white/10 rounded-full text-[9px] text-white/85 border border-white/10">Bazal: <b>${state.user.baselineBP}</b></span>
              <span class="px-2 py-0.5 bg-emerald-500/20 rounded-full text-[9px] text-emerald-200 border border-emerald-400/30">VKİ: <b>${m0.bmi}</b></span>
              <span class="px-2 py-0.5 bg-amber-500/20 rounded-full text-[9px] text-amber-200 border border-amber-400/30"><b>${curW}. Hafta</b></span>
            </div>
          </div>
        </div>
        <button onclick="toggleClinicalReportModal()" class="px-2.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 rounded-2xl text-[10px] text-amber-200 font-bold shrink-0 text-center leading-tight transition">
          📄 Hekim<br>Özeti
        </button>
      </div>

      <!-- 4 Alt Sekme Çubuğu -->
      <div class="grid grid-cols-4 gap-1 bg-white/5 p-1 rounded-2xl border border-white/10 text-[10px]">
        ${[
          { id: 'identity', lbl: '👤 Kimlik' },
          { id: 'baseline', lbl: '🧬 M0 Bazal' },
          { id: 'partner', lbl: '🤝 Eş & Davet' },
          { id: 'ecosystem', lbl: '🌱 Ekosistem' }
        ].map(t => `
          <button onclick="setProfileSubtab('${t.id}')"
            class="py-2 px-1 rounded-xl font-semibold transition truncate ${sub === t.id ? 'bg-amber-400/25 text-amber-200 border border-amber-400/40 shadow-xs' : 'text-white/55 hover:text-white/85'}">
            ${t.lbl}
          </button>
        `).join('')}
      </div>

      <!-- ALT SEKME İÇERİKLERİ -->
      ${getProfileSubtabContent(sub, m0, curW, lc)}

    </div>
  `;
}

function getProfileSubtabContent(sub, m0, curW, lc) {
  // =========================================================================
  // SEKME 1: KİMLİK, DEMOGRAFİ & GEBELİK HAFTASI KALİBRASYONU
  // =========================================================================
  if (sub === "identity") {
    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        
        <!-- Neden Önemli? Bilimsel Açıklama Kutusu -->
        <div class="p-3.5 bg-emerald-950/30 border border-emerald-400/30 rounded-2xl space-y-1">
          <div class="font-bold text-emerald-300 text-[11px]">🔬 M0 Demografik Kalibrasyon (Neden İlk Buradan Başlıyoruz?)</div>
          <p class="text-[10px] text-white/80 leading-relaxed">
            Burada değiştirdiğiniz her parametre (Gebelik haftası, yaş, parite, kan grubu, takipçi hekim), <b>Ana Sayfa</b>, <b>Sağlık & Tahlil</b>, <b>Doğum Paketi</b> ve <b>Hekim Özeti PDF</b> ekranlarını gerçek zamanlı olarak yeniden hesaplar.
          </p>
        </div>

        <!-- Canlı Gebelik Haftası ve Bebek Kalibrasyonu -->
        <div class="p-4 bg-white/5 rounded-3xl border border-amber-400/30 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold text-amber-200 text-xs">👶 Gebelik Haftası & Bebek Kimliği</span>
              <p class="text-[10px] text-white/55">${state.baby.name} · ${lc.trimester} · Doğuma ${state.baby.daysLeft} Gün</p>
            </div>
            <span class="px-2.5 py-1 bg-amber-500/20 text-amber-200 border border-amber-400/30 rounded-full text-[10px] font-bold">
              ${curW}. Hafta
            </span>
          </div>

          <!-- Canlı Hafta Slider & Hızlı Trimester Butonları -->
          <div class="space-y-2 bg-black/30 p-3 rounded-2xl border border-white/5">
            <div class="flex justify-between text-[10px] text-white/70">
              <span>Gebelik Haftasını Canlı Test Et (6 – 40. Hafta):</span>
              <span class="font-bold text-amber-300">${curW}. Hafta (${lc.weight})</span>
            </div>
            <input type="range" min="6" max="40" value="${curW}"
              onchange="changePregnancyWeek(this.value)"
              class="w-full accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-lg">
            <div class="grid grid-cols-4 gap-1.5 pt-1">
              <button onclick="changePregnancyWeek(8)" class="py-1.5 rounded-xl text-[10px] border ${curW === 8 ? 'bg-amber-500/30 border-amber-400 text-white font-bold' : 'bg-white/5 border-white/10 text-white/65'}">8.H (1.Trim)</button>
              <button onclick="changePregnancyWeek(20)" class="py-1.5 rounded-xl text-[10px] border ${curW === 20 ? 'bg-amber-500/30 border-amber-400 text-white font-bold' : 'bg-white/5 border-white/10 text-white/65'}">20.H (2.Trim)</button>
              <button onclick="changePregnancyWeek(31)" class="py-1.5 rounded-xl text-[10px] border ${curW === 31 ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold' : 'bg-white/5 border-white/10 text-white/65'}">31.H (Buse)</button>
              <button onclick="changePregnancyWeek(38)" class="py-1.5 rounded-xl text-[10px] border ${curW === 38 ? 'bg-rose-500/30 border-rose-400 text-rose-200 font-bold' : 'bg-white/5 border-white/10 text-white/65'}">38.H (Term)</button>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Bebeğin Adı / Hitabı</label>
              <input type="text" value="${state.baby.name}" onchange="updateProfileField('babyName', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Tahmini Doğum Tarihi</label>
              <input type="text" value="${state.user.dueDate}" onchange="updateProfileField('dueDate', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Parite (Gebelik Öyküsü)</label>
              <select onchange="updateProfileField('parity', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
                <option value="G1P0 (İlk Gebelik · Primigravida)" ${state.user.parity.includes('G1P0') ? 'selected' : ''}>G1P0 (İlk Gebelik)</option>
                <option value="G2P1 (İkinci Gebelik · Multigravida)" ${state.user.parity.includes('G2P1') ? 'selected' : ''}>G2P1 (2. Gebelik)</option>
                <option value="G3P2 (Üçüncü Gebelik · Multigravida)" ${state.user.parity.includes('G3P2') ? 'selected' : ''}>G3P2 (3. Gebelik)</option>
              </select>
            </div>
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Son Adet Tarihi (SAT)</label>
              <input type="date" value="${state.user.lmpDate || '2026-01-17'}" onchange="updateProfileField('lmpDate', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
          </div>
        </div>

        <!-- Anne Demografik & Lokasyon Bilgileri (Kovan & CDC PRAMStat Bağlantılı) -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="font-bold text-white/95 text-xs">👩 Anne Demografik & Klinik Künyesi</div>
          
          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Ad Soyad</label>
              <input type="text" value="${state.user.name}" onchange="updateProfileField('name', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Hitap Adı</label>
              <input type="text" value="${state.user.shortName}" onchange="updateProfileField('shortName', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Anne Yaşı</label>
              <input type="number" min="18" max="50" value="${state.user.age || 31}" onchange="updateProfileField('age', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Anne Kan Grubu</label>
              <select onchange="updateProfileField('bloodGroup', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
                ${['A Rh+', 'A Rh-', '0 Rh+', '0 Rh-', 'B Rh+', 'B Rh-', 'AB Rh+', 'AB Rh-'].map(bg => `
                  <option value="${bg}" ${state.user.bloodGroup === bg ? 'selected' : ''}>${bg}</option>
                `).join('')}
              </select>
            </div>
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Şehir / İlçe</label>
              <input type="text" value="${state.user.city}" onchange="updateProfileField('city', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Mahalle (Kovan Ağı)</label>
              <input type="text" value="${state.user.neighborhood}" onchange="updateProfileField('neighborhood', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Takip Eden Hekim</label>
              <input type="text" value="${state.user.doctorName || 'Dr. Ayşe Yılmaz'}" onchange="updateProfileField('doctorName', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Hastane / Klinik</label>
              <input type="text" value="${state.user.hospitalName || 'Manisa Şehir Hastanesi'}" onchange="updateProfileField('hospitalName', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // SEKME 2: M0 KLİNİK BAZAL VEKTÖRÜ (TANSİYON 90/60, VKİ & KİLO KORİDORU)
  // =========================================================================
  if (sub === "baseline") {
    const latestBp = state.healthData.bloodPressureHistory[0] || { systolic: 92, diastolic: 62 };
    const aiRes = window.runAiSeedCoreAnalysis(latestBp.systolic, latestBp.diastolic);

    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        
        <!-- Uçtan Uca Canlı Kalibrasyon Senaryoları (Tek Tıkla Test) -->
        <div class="p-4 bg-gradient-to-br from-amber-950/45 via-white/5 to-white/5 rounded-3xl border border-amber-400/35 space-y-2.5 shadow-md">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold text-amber-200 text-xs">⚡ Uçtan Uca Canlı Kalibrasyon & Test Senaryoları</span>
              <p class="text-[10px] text-white/60">Kendi verilerinizle veya uç klinik senaryolarla tüm modüllerin tepkisini test edin</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2 pt-1">
            <button onclick="applyProfilePreset('buse_default')" class="p-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 rounded-2xl text-left transition">
              <div class="font-bold text-emerald-200 text-[11px]">🌿 Buse Doğal Bazal (90/60)</div>
              <div class="text-[9px] text-white/65">58➔65 kg · A Rh+ / Oğuz 0 Rh+ · Dengeli</div>
            </button>
            <button onclick="applyProfilePreset('atypical_preeclampsia')" class="p-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 rounded-2xl text-left transition">
              <div class="font-bold text-amber-200 text-[11px]">📈 Atipik Sıçrama (118/78)</div>
              <div class="text-[9px] text-white/65">Bazal 90/60 iken 118/78 mmHg gizli alarmı</div>
            </button>
            <button onclick="applyProfilePreset('rh_incompatibility')" class="p-2.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 rounded-2xl text-left transition">
              <div class="font-bold text-rose-200 text-[11px]">🛡️ Rh Uyuşmazlığı Kalkanı</div>
              <div class="text-[9px] text-white/65">Anne A Rh- & Baba 0 Rh+ (Anti-D Protokolü)</div>
            </button>
            <button onclick="applyProfilePreset('rapid_weight_gain')" class="p-2.5 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 rounded-2xl text-left transition">
              <div class="font-bold text-sky-200 text-[11px]">⚖️ Hızlı Kilo / Ödem Testi</div>
              <div class="text-[9px] text-white/65">58➔71.5 kg (+13.5 kg) DSÖ Koridor Аşımı</div>
            </button>
          </div>
        </div>

        <!-- 1. Kişisel Kardiyovasküler Bazal (DEÜ Tezi & UCI Maternal Health) -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold text-white/95 text-xs">❤️ Kişisel Kardiyovasküler Bazal (AI Seed Core)</span>
              <p class="text-[10px] text-white/55">Veri Seti 1 (UCI Maternal) & DEÜ Veri Bilimi Tezi Referans Vektörü</p>
            </div>
            <span class="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-[10px] font-bold">
              ${state.user.baselineBP} mmHg
            </span>
          </div>

          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Bazal Sistolik</label>
              <input type="number" min="75" max="130" value="${state.user.baselineSys}"
                onchange="updateProfileField('baselineSys', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-emerald-300 focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Bazal Diyastolik</label>
              <input type="number" min="45" max="90" value="${state.user.baselineDia}"
                onchange="updateProfileField('baselineDia', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-emerald-300 focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Dinlenik Nabız</label>
              <input type="number" min="50" max="110" value="${state.user.baselineHR || 72}"
                onchange="updateProfileField('baselineHR', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-amber-200 focus:outline-none focus:border-amber-400">
            </div>
          </div>

          <!-- Dinamik Hesaplanan Kişisel Tansiyon Koridorları -->
          <div class="p-3 bg-black/35 rounded-2xl border border-white/5 space-y-2">
            <div class="text-[10px] font-semibold text-amber-200">Sizin Bazalinize (${state.user.baselineBP}) Göre Dinamik Alarm Eşikleri:</div>
            <div class="grid grid-cols-3 gap-1.5 text-center text-[10px]">
              <div class="p-2 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-200">
                <div class="font-bold">${m0.bpCorridors.optimal}</div>
                <div class="text-[8px] opacity-80">Güvenli Koridor</div>
              </div>
              <div class="p-2 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-200">
                <div class="font-bold">${m0.bpCorridors.borderline}</div>
                <div class="text-[8px] opacity-80">Atipik Sıçrama (+25/18)</div>
              </div>
              <div class="p-2 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200">
                <div class="font-bold">${m0.bpCorridors.critical}</div>
                <div class="text-[8px] opacity-80">Kritik Alarm</div>
              </div>
            </div>
            <div class="text-[10px] text-white/75 pt-1 border-t border-white/5">
              <b>Canlı Son Ölçüm Yorumu (${latestBp.systolic}/${latestBp.diastolic} mmHg):</b> ${aiRes.message}
            </div>
          </div>
        </div>

        <!-- 2. Antropometrik Bazal & DSÖ/IOM Gebelik Kilo Koridoru (Veri Seti 5 & 9) -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold text-white/95 text-xs">⚖️ Gebelik Öncesi VKİ & DSÖ Kilo Koridoru</span>
              <p class="text-[10px] text-white/55">Veri Seti 5 (Pregnant Weight & Neonates) Kişiselleştirilmiş Eğri</p>
            </div>
            <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${m0.weightStatus === 'optimal' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' : 'bg-amber-500/20 text-amber-200 border-amber-400/40'}">
              VKİ: ${m0.bmi} kg/m²
            </span>
          </div>

          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Boy (cm)</label>
              <input type="number" min="140" max="195" value="${state.user.heightCm || 168}"
                onchange="updateProfileField('heightCm', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Başlangıç Kilo (kg)</label>
              <input type="number" step="0.5" min="40" max="140" value="${state.user.startWeight}"
                onchange="updateProfileField('startWeight', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Güncel Kilo (kg)</label>
              <input type="number" step="0.5" min="40" max="150" value="${state.user.currentWeight}"
                onchange="updateProfileField('currentWeight', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-amber-200 focus:outline-none focus:border-amber-400">
            </div>
          </div>

          <div class="p-3 bg-black/35 rounded-2xl border border-white/5 space-y-1.5">
            <div class="flex justify-between items-center text-[10px]">
              <span class="text-white/60">Kategori: <b class="text-white">${m0.bmiCategory}</b></span>
              <span class="text-amber-200">40.H Hedef: <b>+${m0.totalTargetRange}</b></span>
            </div>
            <div class="flex justify-between items-center text-[10px]">
              <span class="text-white/60">${curW}. Hafta İdeal Koridor: <b class="text-emerald-300">+${m0.expectedMinGain} – +${m0.expectedMaxGain} kg</b></span>
              <span class="font-bold ${m0.weightStatus === 'optimal' ? 'text-emerald-300' : 'text-amber-300'}">Mevcut: +${m0.actualGain} kg</span>
            </div>
            <p class="text-[10px] text-white/80 leading-relaxed pt-1 border-t border-white/5">
              ${m0.weightAdvice}
            </p>
          </div>
        </div>

        <!-- Uçtan Uca Bağlantı Köprü Butonları -->
        <div class="grid grid-cols-2 gap-2">
          <button onclick="navigateTab('health')" class="py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 rounded-2xl font-bold text-[11px] transition">
            🩺 Sağlık Sekmesinde Gör ➔
          </button>
          <button onclick="toggleClinicalReportModal()" class="py-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 text-amber-200 rounded-2xl font-bold text-[11px] transition">
            📄 Hekim Özeti PDF'inde Gör ➔
          </button>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // SEKME 3: EŞ & DAVET KÖPRÜSÜ (OĞUZ'UN BİLGİLERİ, RH KALKANI & CANLI SENKRON)
  // =========================================================================
  if (sub === "partner") {
    const perms = state.partner.permissions || { shareVitals: true, shareSymptoms: true, shareSupplements: true, eveningMassage: true };
    const st = state.partner.inviteStatus || "connected";

    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        
        <!-- 1. Eş Kimlik & Kan Grubu Çaprazlama Kartı -->
        <div class="p-4 bg-white/5 rounded-3xl border border-amber-400/30 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold text-amber-200 text-xs">🤝 Eş / Partner Kimlik Bilgileri</span>
              <p class="text-[10px] text-white/55">Baba arayüzü ve Rh kan uyuşmazlığı algoritması buradan beslenir</p>
            </div>
            <button onclick="navigateTab('father')" class="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 rounded-xl text-[10px] font-bold">
              Baba Ekranı ➔
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Eş Adı Soyadı</label>
              <input type="text" value="${state.partner.name}" onchange="updatePartnerField('name', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Eş Kan Grubu</label>
              <select onchange="updatePartnerField('bloodGroup', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
                ${['0 Rh+', '0 Rh-', 'A Rh+', 'A Rh-', 'B Rh+', 'B Rh-', 'AB Rh+', 'AB Rh-'].map(bg => `
                  <option value="${bg}" ${state.partner.bloodGroup === bg ? 'selected' : ''}>${bg}</option>
                `).join('')}
              </select>
            </div>
            <div>
              <label class="text-[10px] text-white/50 block mb-1">Telefon (WhatsApp Acil Hat)</label>
              <input type="text" value="${state.partner.phone}" onchange="updatePartnerField('phone', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/50 block mb-1">E-Posta (Davet & Takvim)</label>
              <input type="text" value="${state.partner.email || 'oguz@tohum.app'}" onchange="updatePartnerField('email', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
          </div>

          <!-- Canlı Rh Kan Uyuşmazlığı Kalkanı -->
          <div class="p-3 rounded-2xl border ${m0.rhIncompatibility ? 'bg-rose-950/40 border-rose-400/50 text-rose-200' : 'bg-emerald-950/30 border-emerald-400/30 text-emerald-200'} space-y-1">
            <div class="font-bold text-[11px]">${m0.rhStatusText}</div>
            <p class="text-[10px] text-white/80 leading-relaxed">${m0.rhDetailText}</p>
          </div>
        </div>

        <!-- 2. Eş Davet İsteği & Aile Çemberi Eşleştirme Alanı -->
        <div class="p-4 bg-gradient-to-br from-amber-950/35 via-white/5 to-white/5 rounded-3xl border border-amber-400/30 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold text-white text-xs">📲 Eş Davet İsteği & Eşleştirme Köprüsü</span>
              <p class="text-[10px] text-white/55">${state.partner.shortName}'un kendi telefonundan ToHUM Baba Arayüzüne bağlanması</p>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold border ${st === 'connected' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' : st === 'pending' ? 'bg-amber-500/20 text-amber-200 border-amber-400/30' : 'bg-white/10 text-white/60 border-white/15'}">
              ${st === 'connected' ? 'Senkronize ✓' : st === 'pending' ? 'Onay Bekliyor ⏳' : 'Davet Gönderilmedi'}
            </span>
          </div>

          <!-- Eşleştirme Kodu & Durum Seçici -->
          <div class="p-3 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span class="text-[9px] text-white/45 block">Kişisel Aile Eşleştirme Kodu</span>
              <span class="font-mono font-bold text-base text-amber-300 tracking-wider">${state.partner.inviteCode || 'THM-31G-834'}</span>
            </div>
            <div class="flex space-x-1.5">
              <button onclick="copyPartnerInviteCode()" class="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] text-white font-medium border border-white/10">
                Kopyala
              </button>
              <button onclick="regenerateInviteCode()" class="px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 rounded-xl text-[10px] text-amber-200 font-medium border border-amber-400/30">
                Yenile ↻
              </button>
            </div>
          </div>

          <!-- Bağlantı Durumu Simülasyonu (3 Adımlı Akış Testi) -->
          <div class="grid grid-cols-3 gap-1.5 text-[10px]">
            <button onclick="updatePartnerField('inviteStatus', 'uninvited')"
              class="py-2 rounded-xl border transition ${st === 'uninvited' ? 'bg-white/20 border-white/40 text-white font-bold' : 'bg-black/30 border-white/10 text-white/50'}">
              1. Bağlı Değil
            </button>
            <button onclick="updatePartnerField('inviteStatus', 'pending')"
              class="py-2 rounded-xl border transition ${st === 'pending' ? 'bg-amber-500/25 border-amber-400/50 text-amber-200 font-bold' : 'bg-black/30 border-white/10 text-white/50'}">
              2. Davet Bekliyor
            </button>
            <button onclick="updatePartnerField('inviteStatus', 'connected')"
              class="py-2 rounded-xl border transition ${st === 'connected' ? 'bg-emerald-500/25 border-emerald-400/50 text-emerald-200 font-bold' : 'bg-black/30 border-white/10 text-white/50'}">
              3. Senkronize ✓
            </button>
          </div>

          <button onclick="sendPartnerInviteWhatsApp()" class="w-full py-2.5 bg-gradient-to-r from-amber-500/30 to-emerald-500/25 hover:from-amber-500/40 border border-amber-400/40 rounded-2xl text-amber-100 font-bold text-[11px] transition flex items-center justify-center space-x-1.5 shadow-md">
            <span>💌</span>
            <span>${state.partner.shortName}'a WhatsApp / SMS Davet Bağlantısı Gönder</span>
          </button>
        </div>

        <!-- 3. Proaktif Baba Gizli Destek İzinleri ("Sen Söylemeden Oğuz Bilsin") -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2.5">
          <div>
            <span class="font-bold text-white/95 text-xs">🔐 Proaktif Eş Bildirim & Mahremiyet İzinleri</span>
            <p class="text-[10px] text-white/55">Hangi verilerinizin ${state.partner.shortName}'un ekranına şefkatli görev olarak düşeceğini seçin</p>
          </div>

          <div class="space-y-2">
            ${[
              { key: 'shareVitals', title: 'Kardiyovasküler & Tansiyon Sinyali', desc: 'Bazal 90/60 dışına çıkıldığında Oğuz\'a sakinleştirici destek uyarısı gider' },
              { key: 'shareSymptoms', title: 'Duygu Durumu & Fiziksel Semptomlar', desc: 'Yorgunluk veya bel ağrısı girdiğinizde Oğuz\'a dinlenme/destek önerisi düşer' },
              { key: 'shareSupplements', title: 'Takviye & Su Hatırlatma Köprüsü', desc: 'Su veya demir takviyesi aksadığında Oğuz bir bardak su ile hatırlatır' },
              { key: 'eveningMassage', title: 'Akşam 21:00 Sakrum & Bel Masajı Çağrısı', desc: '3. trimester relaksin yükünü hafifletmek için akşam rutin bildirimi' }
            ].map(item => `
              <div class="p-2.5 bg-black/30 rounded-2xl border border-white/5 flex items-center justify-between">
                <div class="pr-2">
                  <div class="font-semibold text-white/90 text-[11px]">${item.title}</div>
                  <div class="text-[9px] text-white/50 mt-0.5">${item.desc}</div>
                </div>
                <button onclick="togglePartnerPermission('${item.key}')"
                  class="px-2.5 py-1 rounded-xl text-[10px] font-bold border shrink-0 transition ${perms[item.key] ? 'bg-emerald-500/25 border-emerald-400/40 text-emerald-200' : 'bg-white/10 border-white/15 text-white/50'}">
                  ${perms[item.key] ? 'Açık ✓' : 'Kapalı'}
                </button>
              </div>
            `).join('')}
          </div>

          <button onclick="pushPartnerLiveSignal()" class="w-full py-3 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 font-bold text-[11px] rounded-2xl transition shadow-md">
            ⚡ Şimdi ${state.partner.shortName}'a Canlı Sinyal Gönder ve Baba Ekranında Gör ➔
          </button>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // SEKME 4: YAŞAM AĞACI (M0-M7), MEKTUPLAR, SESLİ ASİSTAN & MAHREMİYET
  // =========================================================================
  return `
    <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
      
      <!-- 1. M0 - M7 TOHUM 18 YILLIK YAŞAM AĞACI VE YETENEK PUSULASI -->
      <div class="p-4 bg-gradient-to-br from-amber-950/35 via-white/5 to-emerald-950/25 rounded-3xl border border-amber-400/25 space-y-3">
        <div class="flex justify-between items-center">
          <div>
            <div class="font-bold text-amber-200 text-sm">🌱 ToHUM Yaşam Ağacı (M0 – M7)</div>
            <div class="text-[10px] text-white/55">To Hum. To Seed. Bee to Hum. · 18 Yıllık Gelişim Pusulası</div>
          </div>
          <span class="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 rounded-full font-semibold">
            Aktif: M0 Çimlenme
          </span>
        </div>

        <div class="grid grid-cols-4 gap-1.5">
          ${(state.lifecycleModules || []).map(m => `
            <button onclick="selectLifecycleModule('${m.code}')"
              class="p-2 rounded-2xl border text-left transition ${state.selectedLifecycleModule === m.code ? 'bg-amber-500/25 border-amber-400/50 text-white shadow-md' : 'bg-black/30 border-white/10 text-white/60 hover:text-white'}">
              <div class="flex justify-between items-center">
                <span class="font-bold text-[11px] ${m.code === 'M0' ? 'text-emerald-300' : 'text-amber-200'}">${m.code}</span>
                <span class="text-[8px] opacity-60">${m.code === 'M0' ? '●' : '○'}</span>
              </div>
              <div class="text-[10px] font-semibold truncate mt-0.5">${m.poetic}</div>
              <div class="text-[8px] text-white/40 truncate">${m.age}</div>
            </button>
          `).join('')}
        </div>

        ${(() => {
          const curM = (state.lifecycleModules || []).find(x => x.code === (state.selectedLifecycleModule || 'M0')) || (state.lifecycleModules || [])[0];
          if (!curM) return '';
          return `
            <div class="p-3.5 bg-black/40 rounded-2xl border border-white/10 space-y-1.5">
              <div class="flex justify-between items-center">
                <span class="font-bold text-amber-200 text-xs">${curM.code} · ${curM.poetic} (${curM.age})</span>
                <span class="text-[9px] px-2 py-0.5 rounded-full border ${curM.code === 'M0' || curM.code === 'M1' ? 'bg-emerald-500/20 border-emerald-400/30 text-emerald-300' : 'bg-white/10 border-white/15 text-white/60'}">${curM.phase}</span>
              </div>
              <div class="text-[10px] text-amber-100/75 font-medium italic">Bilimsel Evre: ${curM.scientific}</div>
              <p class="text-[11px] text-white/85 leading-relaxed">${curM.desc}</p>
            </div>
          `;
        })()}
      </div>

      <!-- 2. Güneş'e Mektuplarım (Zaman Kapsülü) -->
      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2.5">
        <div class="flex justify-between items-center">
          <div class="font-semibold text-white/95">💌 ${state.baby.name}'e Mektuplarım (${state.timeCapsules.length})</div>
          <button onclick="openNewLetterModal()" class="text-amber-200 text-xs font-medium hover:underline">+ Mektup Yaz</button>
        </div>
        <div class="space-y-2">
          ${state.timeCapsules.map(c => `
            <div class="p-3 bg-white/5 rounded-2xl border border-white/5">
              <div class="flex justify-between text-white/90 font-medium">
                <span>${c.title}</span>
                <span class="text-[10px] text-white/50 bg-white/10 px-2 py-0.5 rounded-full">${c.unlockEvent}</span>
              </div>
              <p class="text-[10px] text-white/50 italic mt-1 line-clamp-1">"${c.preview}"</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 3. UYGULAMA İÇİ "TO HUM" SESLİ AI ASİSTAN AJANDASI (8.3 Hz) -->
      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
        <div class="flex justify-between items-center">
          <div>
            <div class="font-bold text-white/95">🎙️ "To Hum" Sesli AI Asistan Ajandası</div>
            <div class="text-[10px] text-white/55">8.3 Hz Biyo-Rezonans · Sabah, Öğle, Akşam & Gece Rehberi</div>
          </div>
          <span class="text-[9px] bg-amber-500/20 text-amber-200 border border-amber-400/30 px-2 py-0.5 rounded-full">
            Çimlenme v0.0.4
          </span>
        </div>
        <div class="space-y-2">
          ${(state.aiVoiceAgenda || []).map(item => `
            <div class="p-3 bg-black/30 rounded-2xl border border-white/5 flex items-start justify-between space-x-2">
              <div class="space-y-0.5">
                <div class="flex items-center space-x-2">
                  <span class="text-[10px] font-mono font-bold text-amber-300">${item.time}</span>
                  <span class="text-[11px] font-semibold text-white/95">${item.period} · ${item.title}</span>
                </div>
                <p class="text-[10px] text-white/65 leading-relaxed">"${item.text}"</p>
              </div>
              <button onclick="playAiVoicePrompt('${item.id}')" class="px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/30 text-amber-200 rounded-xl text-[10px] font-semibold shrink-0 transition">
                🔊 Dinle
              </button>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- 4. TÜRK AİLE KÜLTÜRÜ & ROL TABANLI MAHREMİYET ("KENDİME ALAN") PANELİ -->
      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
        <div class="flex justify-between items-center">
          <div>
            <div class="font-bold text-white/95">🔐 Aile Ekosistemi & Mahremiyet</div>
            <div class="text-[10px] text-white/55">Şefkatli Geniş Aile · Korunan Çekirdek Özel Alan</div>
          </div>
          <button onclick="addFamilyObserver()" class="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-[10px] text-amber-200 font-semibold">
            + Aile Üyesi Ekle
          </button>
        </div>

        <div class="p-3 rounded-2xl border flex items-center justify-between ${state.privacyMode ? 'bg-indigo-950/50 border-indigo-400/40' : 'bg-black/30 border-white/10'}">
          <div>
            <div class="font-semibold text-white text-xs">🌙 "Kendime Alan" (Gizlilik Günü Modu)</div>
            <div class="text-[10px] text-white/60 mt-0.5">
              ${state.privacyMode
                ? 'Aktif: Gözlemci aile üyelerinin erişimi durduruldu, asistan sessiz modda.'
                : 'Pasif: Gözlemci yakınlar haftalık genel bülteni görüntüleyebilir.'}
            </div>
          </div>
          <button onclick="togglePrivacyMode()" class="px-3 py-1.5 rounded-xl text-[10px] font-bold border transition ${state.privacyMode ? 'bg-indigo-500/30 border-indigo-300/50 text-indigo-200' : 'bg-white/10 border-white/15 text-white/70'}">
            ${state.privacyMode ? 'Açık ✓' : 'Aktif Et'}
          </button>
        </div>

        <div class="space-y-2">
          ${(state.familyMembers || []).map(fm => `
            <div class="p-2.5 bg-black/25 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <div class="font-semibold text-white/90 text-[11px]">${fm.name} <span class="text-[10px] text-white/45 font-normal">(${fm.relation})</span></div>
                <div class="text-[10px] text-white/55 mt-0.5">${fm.desc}</div>
              </div>
              <span class="text-[9px] px-2 py-0.5 rounded-full bg-white/10 border border-white/10 text-amber-200 shrink-0 ml-2 font-medium">
                ${fm.badge}
              </span>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  `;
}

// PROFİL VE M0 BAZAL ETKİLEŞİM FONKSİYONLARI
window.setProfileSubtab = function(sub) {
  state.profileSubtab = sub;
  triggerHaptic(10);
  render();
};

window.updateProfileField = function(field, val) {
  if (field === "babyName") {
    state.baby.name = val.trim() || "Güneş";
  } else if (field === "baselineSys" || field === "baselineDia") {
    const num = parseInt(val, 10);
    if (!isNaN(num)) {
      state.user[field] = num;
      state.user.baselineBP = `${state.user.baselineSys}/${state.user.baselineDia}`;
      const latestBp = state.healthData.bloodPressureHistory[0];
      if (latestBp && window.runAiSeedCoreAnalysis) {
        window.runAiSeedCoreAnalysis(latestBp.systolic, latestBp.diastolic);
      }
    }
  } else if (field === "baselineHR" || field === "heightCm" || field === "age") {
    const num = parseInt(val, 10);
    if (!isNaN(num)) state.user[field] = num;
  } else if (field === "startWeight" || field === "currentWeight") {
    const num = parseFloat(val);
    if (!isNaN(num)) state.user[field] = num;
  } else {
    state.user[field] = val;
  }
  triggerHaptic(15);
  render();
};

window.updatePartnerField = function(field, val) {
  state.partner[field] = val;
  if (field === "name" && val.trim()) {
    state.partner.shortName = val.trim().split(" ")[0];
  }
  triggerHaptic(15);
  render();
};

window.togglePartnerPermission = function(key) {
  if (!state.partner.permissions) {
    state.partner.permissions = { shareVitals: true, shareSymptoms: true, shareSupplements: true, eveningMassage: true };
  }
  state.partner.permissions[key] = !state.partner.permissions[key];
  triggerHaptic(15);
  render();
};

window.regenerateInviteCode = function() {
  const rnd = Math.floor(100 + Math.random() * 900);
  state.partner.inviteCode = `THM-${state.baby.week}G-${rnd}`;
  triggerHaptic([15, 25]);
  triggerReaction("folic", `Yeni aile eşleştirme kodu üretildi: ${state.partner.inviteCode}`);
  render();
};

window.copyPartnerInviteCode = function() {
  const code = state.partner.inviteCode || "THM-31G-834";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).catch(() => {});
  }
  triggerHaptic(15);
  triggerReaction("water", `Eşleştirme kodu (${code}) panoya kopyalandı.`);
};

window.sendPartnerInviteWhatsApp = function() {
  state.partner.inviteStatus = "pending";
  const code = state.partner.inviteCode || "THM-31G-834";
  const msg = encodeURIComponent(
    `Canım ${state.partner.shortName}, ToHUM'da ${state.baby.name}'in ${state.baby.week}. hafta gelişim ve sağlık çemberini kurdum. ` +
    `Baba Destek Arayüzüne bağlanmak için Eşleştirme Kodumuz: ${code} 🌱`
  );
  const waUrl = "https://wa.me/" + (state.partner.phone || "").replace(/[^0-9]/g, '') + "?text=" + msg;
  triggerHaptic([20, 40]);
  render();
  setTimeout(() => window.open(waUrl, '_blank'), 300);
};

window.pushPartnerLiveSignal = function() {
  if (!state.partner.liveFeed) state.partner.liveFeed = [];
  const latestBp = state.healthData.bloodPressureHistory[0] || { systolic: 92, diastolic: 62 };
  const m0 = window.computeM0BaselineProfile();
  const nowStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });

  state.partner.liveFeed.unshift({
    id: Date.now(),
    time: nowStr,
    type: "live",
    title: `${state.user.shortName}'den Canlı M0 Durum Sinyali (${state.baby.week}.H)`,
    text: `Tansiyon: ${latestBp.systolic}/${latestBp.diastolic} mmHg (Bazal ${state.user.baselineBP}) · Kilo Artışı: +${m0.actualGain} kg (${m0.weightStatusText}) · Duygu: ${state.healthData.selectedMood}.`
  });
  if (state.partner.liveFeed.length > 6) state.partner.liveFeed.pop();
  state.partner.inviteStatus = "connected";
  triggerHaptic([25, 40, 25]);
  navigateTab("father");
};

window.applyProfilePreset = function(presetName) {
  const nowStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  if (presetName === "buse_default") {
    state.user.baselineSys = 90;
    state.user.baselineDia = 60;
    state.user.baselineBP = "90/60";
    state.user.heightCm = 168;
    state.user.startWeight = 58.0;
    state.user.currentWeight = 65.0;
    state.user.bloodGroup = "A Rh+";
    state.partner.bloodGroup = "0 Rh+";
    state.healthData.bloodPressureHistory[0] = {
      id: 101,
      date: `Bugün (${nowStr})`,
      systolic: 92,
      diastolic: 62,
      note: "✓ Güvenli Koridor (90/60)",
      isNormal: true
    };
    window.runAiSeedCoreAnalysis(92, 62);
  } else if (presetName === "atypical_preeclampsia") {
    state.user.baselineSys = 90;
    state.user.baselineDia = 60;
    state.user.baselineBP = "90/60";
    state.healthData.bloodPressureHistory[0] = {
      id: 102,
      date: `Bugün (${nowStr})`,
      systolic: 118,
      diastolic: 78,
      note: "⚠️ Atipik Sıçrama (+28/+18 mmHg)",
      isNormal: false
    };
    window.runAiSeedCoreAnalysis(118, 78, 52);
  } else if (presetName === "rh_incompatibility") {
    state.user.bloodGroup = "A Rh-";
    state.partner.bloodGroup = "0 Rh+";
    state.profileSubtab = "partner";
  } else if (presetName === "rapid_weight_gain") {
    state.user.heightCm = 168;
    state.user.startWeight = 58.0;
    state.user.currentWeight = 71.5;
  }
  triggerHaptic([20, 40]);
  render();
};

"""

code = code[:idx_start] + new_father_and_profile + code[idx_end:]

with open(path, "w", encoding="utf-8") as f:
    f.write(code)

print("5. Successfully upgraded renderFatherTab, renderProfileTab and M0 Baseline Engine in app.js!")
