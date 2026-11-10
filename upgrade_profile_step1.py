import sys, re

sys.stdout.reconfigure(encoding='utf-8')

app_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js'
with open(app_path, 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Upgrade state.user and state.partner
old_user_partner = '''  user: {
    name: "Buse Baltacıoğlu",
    shortName: "Buse",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80",
    role: "Tasarımcı & Anne",
    city: "Manisa",
    district: "Yunusemre",
    neighborhood: "Muradiye",
    baselineBP: "90/60",
    currentWeight: 65,
    startWeight: 58,
    startWaist: 68,
    waistCircumference: 98,
    fundalHeight: 31,
    dueDate: "24 Ekim 2026",
    bloodGroup: "A Rh+"
  },

  partner: {
    name: "Oğuz Baltacıoğlu",
    shortName: "Oğuz",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    role: "Baba & Destekçi",
    phone: "+90 532 000 00 00"
  },'''

new_user_partner = '''  profileSubtab: "identity",

  user: {
    name: "Buse Baltacıoğlu",
    shortName: "Buse",
    age: 30,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80",
    role: "Kurucu & Veri Bilimci · Anne",
    city: "Manisa",
    district: "Yunusemre",
    neighborhood: "Muradiye",
    baselineSys: 90,
    baselineDia: 60,
    baselineBP: "90/60",
    baselineHR: 72,
    heightCm: 168,
    currentWeight: 65.0,
    startWeight: 58.0,
    startWaist: 68,
    waistCircumference: 98,
    fundalHeight: 31,
    parity: "G1P0 (İlk Gebelik · Primigravida)",
    pregnancyType: "Tekil Gebelik",
    lmpDate: "2026-01-17",
    dueDate: "24 Ekim 2026",
    bloodGroup: "A Rh+",
    doctorName: "Dr. Ayşe Yılmaz",
    hospitalName: "Manisa Şehir Hastanesi"
  },

  partner: {
    name: "Oğuz Baltacıoğlu",
    shortName: "Oğuz",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    role: "Baba & Destekçi",
    phone: "+90 532 000 00 00",
    email: "oguz@tohum.app",
    bloodGroup: "0 Rh+",
    inviteCode: "THM-31G-834",
    inviteStatus: "connected", // 'uninvited' | 'pending' | 'connected'
    permissions: {
      shareVitals: true,
      shareSymptoms: true,
      shareSupplements: true,
      eveningMassage: true
    },
    liveFeed: [
      {
        id: 1,
        time: "09:15",
        type: "vital",
        title: "Sabah Bazal Uyum Onayı",
        text: "Buse'nin sabah dinlenik tansiyonu (92/62 mmHg) kendi 90/60 bazaliyle tam uyumlu. Güneş'in ritmi huzurlu."
      },
      {
        id: 2,
        time: "21:00",
        type: "care",
        title: "Akşam Şefkat Çağrısı (31. Hafta)",
        text: "31. haftada ağırlık merkezi değiştiği için Buse'nin bel ve sakrum bölgesine 10 dk ılık dokunuş ve masaj çok iyi gelecektir."
      }
    ]
  },'''

if old_user_partner in text:
    text = text.replace(old_user_partner, new_user_partner, 1)
    print("1. Updated state.user and state.partner!")
else:
    print("ERROR: old_user_partner not found!")

# 2. Update saveState and loadSavedState to persist user & partner fields
old_save = '''      selectedSymptoms: state.healthData.selectedSymptoms,
      selectedMood: state.healthData.selectedMood,
      savedDate: new Date().toDateString()
    };'''

new_save = '''      selectedSymptoms: state.healthData.selectedSymptoms,
      selectedMood: state.healthData.selectedMood,
      userProfile: state.user,
      partnerProfile: state.partner,
      profileSubtab: state.profileSubtab,
      savedDate: new Date().toDateString()
    };'''

if old_save in text:
    text = text.replace(old_save, new_save, 1)
    print("2. Updated saveState!")
else:
    print("ERROR: old_save not found!")

old_load_end = '''    if (saved.selectedMood) {
      state.healthData.selectedMood = saved.selectedMood;
    }
  } catch(e) {}
}'''

new_load_end = '''    if (saved.selectedMood) {
      state.healthData.selectedMood = saved.selectedMood;
    }
    if (saved.userProfile) {
      Object.assign(state.user, saved.userProfile);
    }
    if (saved.partnerProfile) {
      Object.assign(state.partner, saved.partnerProfile);
    }
    if (saved.profileSubtab) {
      state.profileSubtab = saved.profileSubtab;
    }
  } catch(e) {}
}'''

if old_load_end in text:
    text = text.replace(old_load_end, new_load_end, 1)
    print("3. Updated loadSavedState!")
else:
    print("ERROR: old_load_end not found!")

# 3. Update runAiSeedCoreAnalysis to use dynamic state.user.baselineSys and baselineDia
old_ai_seed = '''window.runAiSeedCoreAnalysis = function(systolic, diastolic, hrv, symptoms) {
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
    badgeText = `✓ Güvenli Koridor (90/60)`;
    message = `✓ Güvenli Koridor: Ölçümünüz (${systolic}/${diastolic} mmHg), 90/60 mmHg kişisel bazaliniz ve ${hrvVal} ms otonom HRV ile mükemmel uyumlu.`;
  }'''

new_ai_seed = '''window.runAiSeedCoreAnalysis = function(systolic, diastolic, hrv, symptoms) {
  const baseSys = Number(state.user.baselineSys) || 90;
  const baseDia = Number(state.user.baselineDia) || 60;
  state.user.baselineBP = `${baseSys}/${baseDia}`;
  const deltaSys = systolic - baseSys;
  const deltaDia = diastolic - baseDia;
  const hrvVal = (hrv !== undefined) ? hrv : (state.wearable ? state.wearable.hrv : 64);
  const syms = symptoms || (state.healthData ? state.healthData.selectedSymptoms : []);
  const hasEdema = syms.some(s => /ödem|şişlik/i.test(s));
  const hasHeadache = syms.some(s => /baş ağrısı|görme/i.test(s));

  let status = "optimal"; // optimal (yeşil), borderline (sarı), critical (kırmızı)
  let riskScore = 8;
  let message = "";
  let badgeText = `✓ Dengede (Bazal ${baseSys}/${baseDia})`;

  // Kurucunun Y.L. Tezi Kuralları (Dinamik Kişisel Bazal Referanslı):
  if (systolic >= 135 || diastolic >= 88 || (deltaSys >= 35 && deltaDia >= 25)) {
    status = "critical";
    riskScore = 94;
    badgeText = "🚨 Kardiyovasküler Stres";
    message = `🚨 AI Seed Core Kritik Alarm: Kişisel bazaliniz ${baseSys}/${baseDia} mmHg iken ${systolic}/${diastolic} mmHg (${deltaSys >= 0 ? '+' : ''}${deltaSys}/${deltaDia >= 0 ? '+' : ''}${deltaDia} mmHg) ölçüldü. Dengesiz veri sınıflandırıcısı preeklampsi riskini %94 olarak hesapladı. ${state.user.doctorName || 'Hekiminize'} derhal başvurunuz.`;
  } else if ((deltaSys >= 25 && deltaDia >= 18) || (systolic >= (baseSys + 28) && hrvVal < 55) || (deltaSys >= 20 && hasEdema)) {
    status = "borderline";
    riskScore = 72;
    badgeText = "⚠️ Atipik Sıçrama (Gizli Preeklampsi)";
    message = `⚠️ AI Seed Core Atipik Sıçrama Tespiti: ${systolic}/${diastolic} mmHg genel popülasyonda "normal" sanılabilir; ancak sizin ${baseSys}/${baseDia} mmHg kişisel bazaliniz için +${deltaSys}/+${deltaDia} mmHg'lik kritik bir sıçramadır. Düşen HRV (${hrvVal} ms) vasküler yükü doğrulamaktadır. Dinlenin ve 1 saat sonra tekrar ölçün.`;
  } else if (systolic >= (baseSys + 15) || deltaSys >= 15 || deltaDia >= 10) {
    status = "watch";
    riskScore = 35;
    badgeText = "⚑ İzlem Koridoru";
    message = `⚑ Kişisel İzlem: ${baseSys}/${baseDia} bazalden +${deltaSys}/+${deltaDia} mmHg hafif yükseliş. Sol yanınıza uzanıp ılık su için.`;
  } else {
    status = "optimal";
    riskScore = 8;
    badgeText = `✓ Güvenli Koridor (${baseSys}/${baseDia})`;
    message = `✓ Güvenli Koridor: Ölçümünüz (${systolic}/${diastolic} mmHg), ${baseSys}/${baseDia} mmHg kişisel bazaliniz ve ${hrvVal} ms otonom HRV ile mükemmel uyumlu.`;
  }'''

if old_ai_seed in text:
    text = text.replace(old_ai_seed, new_ai_seed, 1)
    print("4. Updated runAiSeedCoreAnalysis to use dynamic baseline!")
else:
    print("ERROR: old_ai_seed not found!")

# Also update ClinicalReportModal hardcoded 90/60 and (+7.0)
text = text.replace(
    '• Kişisel Bazal Tansiyon: 90/60 mmHg\\n',
    '• Kişisel Bazal Tansiyon: ${state.user.baselineBP} mmHg\\n'
)
text = text.replace(
    '<span class="font-bold text-emerald-300 text-xs">90/60 mmHg</span>',
    '<span class="font-bold text-emerald-300 text-xs">${state.user.baselineBP} mmHg</span>'
)
text = text.replace(
    '<span class="font-bold text-white text-xs">${state.user.currentWeight} kg (+7.0)</span>',
    '<span class="font-bold text-white text-xs">${state.user.currentWeight} kg (${(state.user.currentWeight - state.user.startWeight) >= 0 ? "+" : ""}${(state.user.currentWeight - state.user.startWeight).toFixed(1)})</span>'
)
text = text.replace(
    '<p class="text-[10px] text-white/50">Dr. Ayşe Yılmaz · Manisa Şehir Hastanesi Kadın Doğum</p>',
    '<p class="text-[10px] text-white/50">${state.user.doctorName || "Dr. Ayşe Yılmaz"} · ${state.user.hospitalName || "Manisa Şehir Hastanesi"} Kadın Doğum</p>'
)
text = text.replace(
    '<span class="text-[10px] text-amber-200 font-semibold">Güneş · ${state.baby.week}. Hafta</span>',
    '<span class="text-[10px] text-amber-200 font-semibold">${state.baby.name} · ${state.baby.week}. Hafta</span>'
)

with open(app_path, 'w', encoding='utf-8') as f:
    f.write(text)

print("Saved base updates to app.js!")
