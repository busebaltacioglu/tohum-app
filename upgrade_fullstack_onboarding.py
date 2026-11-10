import sys
sys.stdout.reconfigure(encoding='utf-8')

path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Add state.auth and state.user.survey to state if not present
old_state_top = """  profileSubtab: "identity","""

new_state_top = """  auth: {
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

if old_state_top in code and "auth: {" not in code:
    code = code.replace(old_state_top, new_state_top, 1)
    print("1. Added state.auth to state!")

# 2. Add survey fields to state.user if not present
old_user_end = """    bloodGroup: "A Rh+",
    doctorName: "Dr. Ayşe Yılmaz",
    hospitalName: "Manisa Şehir Hastanesi"
  },"""

new_user_end = """    bloodGroup: "A Rh+",
    doctorName: "Dr. Ayşe Yılmaz",
    hospitalName: "Manisa Şehir Hastanesi",
    nextCheckupDate: "10 Eylül 2026 · 14:30",
    baselineCategory: "low", // 'low' (90/60) | 'normal' (110/70) | 'high' (125/80)
    isFirstBaby: true,
    survey: {
      waterHabit: "5-7",
      supplements: ["iron", "magnesium", "omega", "d3"],
      symptoms: ["Hafif Bel Ağrısı", "Akşam Yorgunluğu"],
      specialConditions: ["Düşük Tansiyon Hassasiyeti (90/60)"]
    }
  },"""

if old_user_end in code and "baselineCategory:" not in code:
    code = code.replace(old_user_end, new_user_end, 1)
    print("2. Added survey & hospital fields to state.user!")

# 3. Update renderAppShell so if state.auth.screen === 'login' or 'onboarding', it renders the full-screen Auth / Onboarding Wizard
old_shell_start = """// MAIN APP SHELL
function renderAppShell(root) {
  const missing = checkDeficiency();
  const hasDeficiency = missing.length > 0;"""

new_shell_start = """// MAIN APP SHELL
function renderAppShell(root) {
  if (state.auth && state.auth.screen === "login") {
    root.innerHTML = renderAuthLoginScreen();
    return;
  }
  if (state.auth && state.auth.screen === "onboarding") {
    root.innerHTML = renderOnboardingWizardScreen();
    return;
  }
  const missing = checkDeficiency();
  const hasDeficiency = missing.length > 0;"""

if old_shell_start in code and "renderAuthLoginScreen()" not in code:
    code = code.replace(old_shell_start, new_shell_start, 1)
    print("3. Updated renderAppShell to support login & onboarding screens!")

# 4. Add a quick button in renderDrawerMenu to open the Welcome / Login & Onboarding flow anytime
old_drawer_footer = """      <div class="pt-3 border-t border-white/10 text-xs text-white/50 flex justify-between items-center">
        <span>Muradiye, Manisa</span>
        <button onclick="navigateTab('profile')" class="text-amber-200 font-medium hover:underline">Profilim ➔</button>
      </div>"""

new_drawer_footer = """      <div class="pt-3 border-t border-white/10 space-y-2 text-xs">
        <button onclick="openAuthWelcomeFlow()" class="w-full py-2 px-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 rounded-xl text-amber-200 font-semibold text-[11px] flex items-center justify-between transition">
          <span>🚪 Giriş & İlk Kurulum Anketi</span>
          <span>Aç ➔</span>
        </button>
        <div class="text-white/50 flex justify-between items-center">
          <span>${state.user.neighborhood}, ${state.user.city}</span>
          <button onclick="navigateTab('profile')" class="text-amber-200 font-medium hover:underline">Bilgilerimi Güncelle ➔</button>
        </div>
      </div>"""

if old_drawer_footer in code:
    code = code.replace(old_drawer_footer, new_drawer_footer, 1)
    print("4. Added Welcome/Onboarding trigger to Drawer Menu!")

# 5. Replace renderProfileTab and add the Auth + 5-Step Onboarding Wizard + Backend API Sync + 5-Menu Profile Editor
start_marker = "// =========================================================================\n// 8. MODÜL: BUSE'NİN PROFİLİ VE M0 KİŞİSEL BAZAL KOMUTA MERKEZİ"
end_marker = "// GENEL ETKİLEŞİM İŞLEYİCİLERİ\nwindow.toggleDrawer = function()"

idx_s = code.find(start_marker)
idx_e = code.find(end_marker)

if idx_s == -1 or idx_e == -1:
    print(f"ERROR: markers not found! idx_s={idx_s}, idx_e={idx_e}")
    sys.exit(1)

new_profile_and_onboarding = """// =========================================================================
// GİRİŞ EKRANI (GOOGLE / APPLE / TELEFON / EŞ KODU) & 5 ADIMLI İLK TANIŞMA ANKETİ
// "Sadece okur-yazar bir annenin bile hiç zorlanmadan, sohbet eder gibi doldurabileceği
//  sıfır tıbbi jargonlu karşılama ve M0 arka plan kalibrasyon sihirbazı"
// =========================================================================
function renderAuthLoginScreen() {
  return `
    <div class="w-full h-full px-5 py-8 flex flex-col justify-between text-white overflow-y-auto bg-gradient-to-b from-[#1A0F0A] via-[#120A07] to-[#0A0605]">
      
      <!-- Üst Logo & Sıcak Karşılama -->
      <div class="text-center space-y-2.5 pt-2">
        <div class="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-amber-400/30 to-emerald-500/20 border-2 border-amber-400/50 flex items-center justify-center shadow-[0_0_35px_rgba(251,191,36,0.25)]">
          <span class="text-2xl">🌱</span>
        </div>
        <h1 class="text-xl font-serif tracking-[0.2em] text-white uppercase font-bold">ToHUM</h1>
        <p class="text-xs text-amber-200/90 font-medium">Anne ve Bebek Yaşam Yoldaşı</p>
        <p class="text-[11px] text-white/65 max-w-[290px] mx-auto leading-relaxed">
          Hoş geldiniz. Seni, bebeğini ve eşini bu güzel yolculukta adım adım, anlaşılır ve güvenli bir dille desteklemek için buradayız.
        </p>
      </div>

      <!-- Giriş Seçenekleri (Sade, Büyük, Okunaklı Butonlar) -->
      <div class="space-y-2.5 my-4">
        <div class="text-[11px] font-semibold text-amber-200/80 text-center uppercase tracking-wider mb-1">
          Nasıl Giriş Yapmak İstersin?
        </div>

        <!-- 1. Google ile Giriş (Yeni Anne & Tanışma Anketi) -->
        <button onclick="startLoginWithProvider('google', 'onboarding')"
          class="w-full py-3.5 px-4 bg-white text-gray-900 hover:bg-gray-100 rounded-2xl font-bold text-xs flex items-center justify-between shadow-lg active:scale-98 transition">
          <div class="flex items-center space-x-3">
            <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">G</span>
            <div class="text-left">
              <div class="text-xs font-bold text-gray-900">Google Hesabımla Giriş Yap</div>
              <div class="text-[10px] text-gray-500 font-normal">Tek dokunuşla bağlan ve tanışma anketine geç</div>
            </div>
          </div>
          <span class="text-gray-400 text-sm">➔</span>
        </button>

        <!-- 2. Apple ile Giriş -->
        <button onclick="startLoginWithProvider('apple', 'onboarding')"
          class="w-full py-3 px-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white rounded-2xl font-semibold text-xs flex items-center justify-between transition">
          <div class="flex items-center space-x-3">
            <span class="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center text-sm">🍎</span>
            <div class="text-left">
              <div class="text-xs font-bold">Apple Kimliğimle Devam Et</div>
              <div class="text-[10px] text-white/55 font-normal">iPhone hesabınla hızlı başlangıç</div>
            </div>
          </div>
          <span class="text-white/40 text-sm">➔</span>
        </button>

        <!-- 3. Telefon Numarası (SMS) ile Giriş -->
        <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
          <label class="text-[11px] font-semibold text-white/90 block">📱 Veya Telefon Numaranla Giriş Yap:</label>
          <div class="flex space-x-2">
            <input type="tel" placeholder="0532 000 00 00" value="${state.auth.phoneInput || ''}"
              oninput="state.auth.phoneInput = this.value"
              class="flex-1 bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400">
            <button onclick="startLoginWithProvider('phone', 'onboarding')"
              class="px-4 py-2 bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 rounded-xl text-xs font-bold shrink-0">
              Başla ➔
            </button>
          </div>
        </div>

        <!-- 4. Eş / Baba Davet Kodu ile Bağlanma -->
        <div class="p-3.5 bg-emerald-950/25 rounded-2xl border border-emerald-400/25 space-y-2">
          <label class="text-[11px] font-semibold text-emerald-200 block">🤝 Eş / Baba Davet Kodun Var mı?</label>
          <div class="flex space-x-2">
            <input type="text" placeholder="Örn: THM-31G-834" value="${state.auth.partnerCodeInput || state.partner.inviteCode || 'THM-31G-834'}"
              oninput="state.auth.partnerCodeInput = this.value"
              class="flex-1 bg-black/40 border border-emerald-400/30 rounded-xl px-3 py-2 text-xs font-mono text-emerald-200 focus:outline-none focus:border-emerald-400">
            <button onclick="connectAsPartnerWithCode()"
              class="px-3.5 py-2 bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-400/40 text-emerald-200 rounded-xl text-xs font-bold shrink-0">
              Eşleş ➔
            </button>
          </div>
        </div>
      </div>

      <!-- Kurucu Hızlı Geçiş (Buse Baltacıoğlu 31. Hafta Hazır Hesabı) -->
      <div class="pt-3 border-t border-white/10 space-y-2 text-center">
        <button onclick="startLoginWithProvider('google', 'founder')"
          class="w-full py-3 bg-gradient-to-r from-amber-500/20 to-emerald-500/20 hover:from-amber-500/30 border border-amber-400/40 rounded-2xl text-amber-200 font-bold text-xs transition shadow-md">
          ✨ Kayıtlı Hesabımla Aç: ${state.user.name} (${state.baby.week}. Hafta)
        </button>
        <p class="text-[10px] text-white/40">
          Bilgilerin cihazında ve güvenli ToHUM sunucusunda korunur.
        </p>
      </div>

    </div>
  `;
}

// 5 ADIMLI SOHBET TADINDA İLK TANIŞMA VE KURULUM ANKETİ (ONBOARDING WIZARD)
function renderOnboardingWizardScreen() {
  const step = state.auth.onboardingStep || 1;
  const u = state.user;
  const p = state.partner;
  const b = state.baby;
  const sv = u.survey || { waterHabit: "5-7", supplements: ["iron", "magnesium"], symptoms: [], specialConditions: [] };
  const m0 = window.computeM0BaselineProfile();

  const stepTitles = [
    { num: 1, title: "Seni Tanıyalım 🌸", sub: "Sana nasıl hitap edeceğimizi ve nerede yaşadığını öğrenelim" },
    { num: 2, title: "Bebeğin & Haftan 👶", sub: "Bebeğinin ismini ve kaçıncı haftada olduğunu belirleyelim" },
    { num: 3, title: "Sağlık & Yaşam Anketi 🩺", sub: "Tıbbi terim olmadan bedeninin doğal halini tanıyalım" },
    { num: 4, title: "Eşin & Destekçin 🤝", sub: "Bebeğin babasını tanımlayalım ve davet kodunu hazırlayalım" },
    { num: 5, title: "Hastane & Doktorun 🏥", sub: "Kontrole gittiğin hastane ve doktor bilgilerini kaydedelim" }
  ];
  const curStepInfo = stepTitles[step - 1] || stepTitles[0];

  return `
    <div class="w-full h-full px-4 py-5 flex flex-col justify-between text-white overflow-y-auto bg-[#0E0907]">
      
      <!-- Üst Adım Çubuğu -->
      <div class="space-y-2.5 pb-3 border-b border-white/10">
        <div class="flex justify-between items-center">
          <span class="text-[10px] bg-amber-500/20 text-amber-200 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-bold">
            Adım ${step} / 5 · İlk Tanışma Anketi
          </span>
          <button onclick="finishOnboardingAndStartApp()" class="text-[10px] text-white/50 hover:text-white underline">
            Anketi Atla & Uygulamaya Geç ✕
          </button>
        </div>

        <!-- 5 Adım İlerleme Çizgisi -->
        <div class="grid grid-cols-5 gap-1.5">
          ${[1, 2, 3, 4, 5].map(idx => `
            <button onclick="setOnboardingStep(${idx})"
              class="h-2 rounded-full transition-all ${idx === step ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : idx < step ? 'bg-emerald-400/70' : 'bg-white/15'}"></button>
          `).join('')}
        </div>

        <div>
          <h2 class="text-base font-serif font-bold text-white">${curStepInfo.title}</h2>
          <p class="text-[11px] text-white/60">${curStepInfo.sub}</p>
        </div>
      </div>

      <!-- Orta İçerik (Adım 1..5) -->
      <div class="flex-1 py-3 space-y-3.5 overflow-y-auto pr-0.5 text-xs">
        
        ${step === 1 ? `
          <!-- ADIM 1: ANNE KİMLİĞİ VE İLK GEBELİK SORUSU -->
          <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">1. Adın ve Soyadın nedir?</label>
              <input type="text" value="${u.name}" placeholder="Örn: Ayşe Yılmaz"
                oninput="updateProfileField('name', this.value); updateProfileField('shortName', this.value.split(' ')[0] || this.value);"
                class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400">
            </div>

            <div class="grid grid-cols-2 gap-2.5">
              <div>
                <label class="text-[11px] font-semibold text-amber-200 block mb-1">2. Kaç yaşındasın?</label>
                <input type="number" min="17" max="52" value="${u.age || 31}"
                  onchange="updateProfileField('age', this.value)"
                  class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400">
              </div>
              <div>
                <label class="text-[11px] font-semibold text-amber-200 block mb-1">3. Hangi şehirdesin?</label>
                <input type="text" value="${u.city}" placeholder="Örn: Manisa"
                  onchange="updateProfileField('city', this.value)"
                  class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400">
              </div>
            </div>

            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">4. Hangi ilçe ve mahallede oturuyorsun?</label>
              <p class="text-[10px] text-white/50 mb-1.5">Mahallendeki diğer annelerle yardımlaşabilmen (Kovan Ağı) için kullanılır.</p>
              <div class="grid grid-cols-2 gap-2">
                <input type="text" value="${u.district || 'Yunusemre'}" placeholder="İlçe (Örn: Yunusemre)"
                  onchange="updateProfileField('district', this.value)"
                  class="w-full bg-black/40 border border-white/20 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
                <input type="text" value="${u.neighborhood || 'Muradiye'}" placeholder="Mahalle (Örn: Muradiye)"
                  onchange="updateProfileField('neighborhood', this.value)"
                  class="w-full bg-black/40 border border-white/20 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
              </div>
            </div>

            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1.5">5. Bu senin ilk hamileliğin mi?</label>
              <div class="grid grid-cols-2 gap-2">
                <button onclick="selectFirstBabyOption(true)"
                  class="p-3 rounded-2xl border text-left transition ${u.isFirstBaby !== false ? 'bg-emerald-500/25 border-emerald-400 text-white font-bold shadow-md' : 'bg-black/30 border-white/10 text-white/65'}">
                  <div class="text-sm">🌱 Evet, İlk Bebeğim</div>
                  <div class="text-[10px] text-white/60 font-normal mt-0.5">İlk annelik heyecanım</div>
                </button>
                <button onclick="selectFirstBabyOption(false)"
                  class="p-3 rounded-2xl border text-left transition ${u.isFirstBaby === false ? 'bg-emerald-500/25 border-emerald-400 text-white font-bold shadow-md' : 'bg-black/30 border-white/10 text-white/65'}">
                  <div class="text-sm">🌿 Daha Önce Doğum Yaptım</div>
                  <div class="text-[10px] text-white/60 font-normal mt-0.5">Tecrübeli anneyim</div>
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        ${step === 2 ? `
          <!-- ADIM 2: BEBEK İSMİ BELİRLEME VE KAÇINCI HAFTADA OLDUĞU -->
          <div class="p-4 bg-white/5 rounded-3xl border border-amber-400/30 space-y-3.5">
            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">1. Bebeğine bir isim veya tatlı bir lakap koydunuz mu?</label>
              <p class="text-[10px] text-white/55 mb-2">Uygulama boyunca bebeğinden bu isimle bahsedeceğiz. İstediğin zaman değiştirebilirsin.</p>
              <div class="flex space-x-2">
                <input type="text" value="${b.name}" placeholder="Örn: Güneş, Can, Minik Tohum..."
                  oninput="updateProfileField('babyName', this.value)"
                  class="flex-1 bg-black/40 border border-amber-400/40 rounded-2xl px-3.5 py-2.5 text-sm font-bold text-amber-200 focus:outline-none focus:border-amber-400">
                <button onclick="updateProfileField('babyName', 'Minik Tohum')"
                  class="px-3 py-2 bg-white/10 hover:bg-white/15 rounded-2xl text-[10px] text-white/80 border border-white/10 shrink-0">
                  Henüz Yok ("Minik Tohum" Olsun)
                </button>
              </div>
            </div>

            <!-- Kaçıncı Haftada Olduğu Seçimi -->
            <div class="p-3.5 bg-black/40 rounded-2xl border border-white/10 space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-[11px] font-semibold text-emerald-300">2. Şu an kaçıncı haftadasın?</span>
                <span class="px-3 py-1 bg-amber-500/25 border border-amber-400/40 rounded-full text-xs font-bold text-amber-200">
                  ${b.week}. Hafta
                </span>
              </div>

              <div class="flex items-center space-x-3">
                <button onclick="changePregnancyWeek(Math.max(4, ${b.week} - 1))" class="w-9 h-9 rounded-xl bg-white/10 text-white font-bold text-base">-</button>
                <input type="range" min="4" max="40" value="${b.week}"
                  onchange="changePregnancyWeek(this.value)"
                  class="flex-1 accent-amber-400 cursor-pointer h-2 bg-white/15 rounded-lg">
                <button onclick="changePregnancyWeek(Math.min(40, ${b.week} + 1))" class="w-9 h-9 rounded-xl bg-white/10 text-white font-bold text-base">+</button>
              </div>

              <div class="p-2.5 bg-amber-500/10 border border-amber-400/25 rounded-xl text-[11px] text-amber-100 leading-relaxed">
                🌱 <b>${b.name} şu an ${b.week}. haftasında!</b> Yaklaşık <b>${getLifecycleDataForWeek(b.week).weight}</b> ağırlığında ve doğuma yaklaşık <b>${b.daysLeft} gün</b> kaldı.
              </div>

              <!-- Haftasını Bilmeyenler İçin Son Adet Tarihinden Otomatik Hesaplama -->
              <div class="pt-2 border-t border-white/10 space-y-1.5">
                <label class="text-[10px] text-white/65 block">💡 <b>Haftanı tam bilmiyor musun?</b> Son adet gördüğün ilk günü seç, biz otomatik hesaplayalım:</label>
                <input type="date" value="${u.lmpDate || '2026-01-17'}"
                  onchange="calculateWeekFromLmpDate(this.value)"
                  class="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
              </div>
            </div>
          </div>
        ` : ''}

        ${step === 3 ? `
          <!-- ADIM 3: SAĞLIK VE GÜNLÜK ALIŞKANLIK ANKETİ (TIBBİ TERİMSİZ!) -->
          <div class="space-y-3">
            
            <!-- Soru 1: Normal Tansiyon Yapısı -->
            <div class="p-3.5 bg-white/5 rounded-3xl border border-white/10 space-y-2">
              <label class="text-[11px] font-semibold text-amber-200 block">1. Normalde (hamilelikten önce) tansiyonun nasıldır?</label>
              <p class="text-[10px] text-white/55">Sana yanlış uyarı vermememiz için senin doğal yapını bilmemiz çok önemli:</p>
              <div class="space-y-1.5">
                ${[
                  { id: 'low', title: '📉 Genelde Düşüktür (9/6 gibi)', desc: 'Ayağa kalkınca bazen başım döner, tansiyonum hep düşük çıkar (90/60)', sys: 90, dia: 60 },
                  { id: 'normal', title: '⚖️ Normaldir (11/7 veya 12/8 gibi)', desc: 'Ne düşük ne yüksek, standart aralıktadır (110/70)', sys: 110, dia: 70 },
                  { id: 'high', title: '📈 Bazen Yüksek Çıkar (13/8 ve üzeri)', desc: 'Tansiyonum çabuk yükselir, doktorum dikkat etmemi söyledi (125/80)', sys: 125, dia: 80 }
                ].map(opt => `
                  <button onclick="selectBaselineBpCategory('${opt.id}', ${opt.sys}, ${opt.dia})"
                    class="w-full p-2.5 rounded-2xl border text-left transition ${u.baselineCategory === opt.id ? 'bg-emerald-500/25 border-emerald-400 text-white shadow-sm' : 'bg-black/30 border-white/10 text-white/70'}">
                    <div class="font-bold text-xs">${opt.title}</div>
                    <div class="text-[10px] text-white/60 mt-0.5">${opt.desc}</div>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Soru 2: Boy, Başlangıç Kilosu, Güncel Kilo ve Kan Grubu -->
            <div class="p-3.5 bg-white/5 rounded-3xl border border-white/10 space-y-2.5">
              <label class="text-[11px] font-semibold text-amber-200 block">2. Boyun, Kilon ve Kan Grubun</label>
              <div class="grid grid-cols-2 gap-2">
                <div>
                  <span class="text-[10px] text-white/55 block mb-1">Boyun (cm)</span>
                  <input type="number" value="${u.heightCm || 168}" onchange="updateProfileField('heightCm', this.value)"
                    class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs font-bold text-white">
                </div>
                <div>
                  <span class="text-[10px] text-white/55 block mb-1">Kan Grubun</span>
                  <select onchange="updateProfileField('bloodGroup', this.value)"
                    class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-white">
                    ${['A Rh+', 'A Rh-', '0 Rh+', '0 Rh-', 'B Rh+', 'B Rh-', 'AB Rh+', 'AB Rh-', 'Bilmiyorum'].map(bg => `
                      <option value="${bg}" ${u.bloodGroup === bg ? 'selected' : ''}>${bg}</option>
                    `).join('')}
                  </select>
                </div>
                <div>
                  <span class="text-[10px] text-white/55 block mb-1">Hamilelik Öncesi Kilon</span>
                  <input type="number" step="0.5" value="${u.startWeight || 58}" onchange="updateProfileField('startWeight', this.value)"
                    class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs font-bold text-white">
                </div>
                <div>
                  <span class="text-[10px] text-white/55 block mb-1">Şu Anki Kilon (kg)</span>
                  <input type="number" step="0.5" value="${u.currentWeight || 65}" onchange="updateProfileField('currentWeight', this.value)"
                    class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs font-bold text-amber-200">
                </div>
              </div>
            </div>

            <!-- Soru 3: Kullanılan Vitamin ve İlaçlar -->
            <div class="p-3.5 bg-white/5 rounded-3xl border border-white/10 space-y-2">
              <label class="text-[11px] font-semibold text-amber-200 block">3. Doktorunun verdiği hangi vitaminleri/ilaçları içiyorsun?</label>
              <p class="text-[10px] text-white/55">Seçtiklerini sana her gün doğru saatte (demir ve magnezyumu çakıştırmadan) hatırlatacağız:</p>
              <div class="flex flex-wrap gap-1.5 pt-1">
                ${[
                  { id: 'iron', lbl: '🩸 Kan / Demir İlacı' },
                  { id: 'magnesium', lbl: '✨ Magnezyum (Kramp için)' },
                  { id: 'folic', lbl: '🌱 Folik Asit' },
                  { id: 'omega', lbl: '🐟 Balık Yağı (Omega-3)' },
                  { id: 'd3', lbl: '☀️ D Vitamini Damla' }
                ].map(sup => {
                  const active = (sv.supplements || []).includes(sup.id);
                  return `
                    <button onclick="toggleSurveyArrayItem('supplements', '${sup.id}')"
                      class="px-3 py-2 rounded-xl text-[11px] font-semibold border transition ${active ? 'bg-amber-500/30 border-amber-400 text-amber-100' : 'bg-black/30 border-white/10 text-white/60'}">
                      ${active ? '✓ ' : ''}${sup.lbl}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Soru 4: Şu Anki Şikayetler & Su Alışkanlığı -->
            <div class="p-3.5 bg-white/5 rounded-3xl border border-white/10 space-y-2">
              <label class="text-[11px] font-semibold text-amber-200 block">4. Bugünlerde seni en çok ne yoruyor? (Birden fazla seçebilirsin)</label>
              <div class="flex flex-wrap gap-1.5">
                ${[
                  'Hafif Bel Ağrısı', 'Mide Bulantısı / Yanması', 'Bacak Krampı',
                  'Akşam Yorgunluğu', 'Baş Dönmesi', 'Uyku Zorluğu', 'El/Ayak Şişliği (Ödem)', 'Çok Şükür İyiyim'
                ].map(sym => {
                  const active = (state.healthData.selectedSymptoms || []).includes(sym);
                  return `
                    <button onclick="logSymptomAction('${sym}')"
                      class="px-2.5 py-1.5 rounded-xl text-[10px] font-medium border transition ${active ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200' : 'bg-black/30 border-white/10 text-white/60'}">
                      ${active ? '✓ ' : ''}${sym}
                    </button>
                  `;
                }).join('')}
              </div>
            </div>

          </div>
        ` : ''}

        ${step === 4 ? `
          <!-- ADIM 4: EŞ TANIMLAMA, KAN UYUŞMAZLIĞI KONTROLÜ VE DAVET KODU -->
          <div class="p-4 bg-white/5 rounded-3xl border border-amber-400/30 space-y-3">
            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">1. Eşinin / Bebeğin Babasının Adı Soyadı nedir?</label>
              <input type="text" value="${p.name}" placeholder="Örn: Oğuz Baltacıoğlu"
                oninput="updatePartnerField('name', this.value)"
                class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400">
            </div>

            <div class="grid grid-cols-2 gap-2.5">
              <div>
                <label class="text-[11px] font-semibold text-amber-200 block mb-1">2. Eşinin Telefonu</label>
                <input type="tel" value="${p.phone}" placeholder="0532 000 00 00"
                  onchange="updatePartnerField('phone', this.value)"
                  class="w-full bg-black/40 border border-white/20 rounded-2xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
              </div>
              <div>
                <label class="text-[11px] font-semibold text-amber-200 block mb-1">3. Eşinin Kan Grubu</label>
                <select onchange="updatePartnerField('bloodGroup', this.value)"
                  class="w-full bg-black/40 border border-white/20 rounded-2xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
                  ${['0 Rh+', '0 Rh-', 'A Rh+', 'A Rh-', 'B Rh+', 'B Rh-', 'AB Rh+', 'AB Rh-', 'Bilmiyorum'].map(bg => `
                    <option value="${bg}" ${p.bloodGroup === bg ? 'selected' : ''}>${bg}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <!-- Canlı Kan Uyuşmazlığı (Rh) Sade Açıklama Kutusu -->
            <div class="p-3 rounded-2xl border ${m0.rhIncompatibility ? 'bg-rose-950/40 border-rose-400/50 text-rose-200' : 'bg-emerald-950/30 border-emerald-400/30 text-emerald-200'} space-y-1">
              <div class="font-bold text-xs">${m0.rhStatusText}</div>
              <p class="text-[10px] text-white/80 leading-relaxed">${m0.rhDetailText}</p>
            </div>

            <!-- Eş Davet Kodu ve WhatsApp Gönderimi -->
            <div class="p-3.5 bg-black/40 rounded-2xl border border-white/10 space-y-2">
              <div class="flex justify-between items-center">
                <div>
                  <span class="text-[10px] text-white/50 block">Eşin İçin Hazırlanan Bağlantı Kodu:</span>
                  <span class="font-mono font-bold text-base text-amber-300">${p.inviteCode || 'THM-31G-834'}</span>
                </div>
                <button onclick="sendPartnerInviteWhatsApp()"
                  class="px-3 py-2 bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-400/40 rounded-xl text-emerald-200 font-bold text-[11px]">
                  📲 WhatsApp ile Davet Et
                </button>
              </div>
              <p class="text-[10px] text-white/55">
                Eşin kendi telefonundan bu kodu girdiğinde, her hafta bebeğiniz için neler yapabileceğini kendi ekranında görecek.
              </p>
            </div>
          </div>
        ` : ''}

        ${step === 5 ? `
          <!-- ADIM 5: HASTANE VE DOKTOR BİLGİLERİ & KAYDETME -->
          <div class="p-4 bg-white/5 rounded-3xl border border-emerald-400/30 space-y-3">
            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">1. Kontrollerin için hangi hastaneye veya kliniğe gidiyorsun?</label>
              <input type="text" value="${u.hospitalName || 'Manisa Şehir Hastanesi'}" placeholder="Örn: Manisa Şehir Hastanesi"
                oninput="updateProfileField('hospitalName', this.value)"
                class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400">
            </div>

            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">2. Seni takip eden doktorunun veya ebenin adı nedir?</label>
              <input type="text" value="${u.doctorName || 'Dr. Ayşe Yılmaz'}" placeholder="Örn: Dr. Ayşe Yılmaz"
                oninput="updateProfileField('doctorName', this.value)"
                class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400">
            </div>

            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">3. Bir sonraki doktor kontrolün ne zaman?</label>
              <input type="text" value="${u.nextCheckupDate || '10 Eylül 2026 · 14:30'}" placeholder="Örn: 10 Eylül Perşembe · 14:30"
                oninput="updateProfileField('nextCheckupDate', this.value)"
                class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>

            <!-- Kurulum Özeti Kartı -->
            <div class="p-3.5 bg-gradient-to-br from-emerald-950/40 to-black/40 rounded-2xl border border-emerald-400/30 space-y-1.5">
              <div class="font-bold text-emerald-300 text-xs">✨ Kişisel ToHUM Çemberin Hazır!</div>
              <div class="text-[11px] text-white/85 space-y-0.5">
                <div>• <b>Anne & Bebek:</b> ${u.name} & <b>${b.name} (${b.week}. Hafta)</b></div>
                <div>• <b>Kişisel Tansiyon & Kilo Bazali:</b> ${u.baselineBP} mmHg · VKİ ${m0.bmi} (${u.startWeight}➔${u.currentWeight} kg)</div>
                <div>• <b>Eş & Destekçi:</b> ${p.name} (${p.bloodGroup})</div>
                <div>• <b>Hastane & Doktor:</b> ${u.hospitalName} · ${u.doctorName}</div>
              </div>
            </div>
          </div>
        ` : ''}

      </div>

      <!-- Alt İleri / Geri / Kaydet Butonları -->
      <div class="pt-3 border-t border-white/10 flex items-center justify-between space-x-2.5">
        ${step > 1 ? `
          <button onclick="setOnboardingStep(${step - 1})"
            class="px-4 py-3 bg-white/10 hover:bg-white/15 rounded-2xl text-xs font-semibold text-white/80">
            ‹ Geri
          </button>
        ` : `
          <button onclick="openAuthWelcomeFlow()"
            class="px-4 py-3 bg-white/10 hover:bg-white/15 rounded-2xl text-xs font-semibold text-white/80">
            ‹ Giriş Ekranı
          </button>
        `}

        ${step < 5 ? `
          <button onclick="setOnboardingStep(${step + 1})"
            class="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-black font-bold text-xs rounded-2xl shadow-lg transition">
            Devam Et (Adım ${step + 1} / 5) ➔
          </button>
        ` : `
          <button onclick="finishOnboardingAndStartApp()"
            class="flex-1 py-3.5 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 text-black font-bold text-xs rounded-2xl shadow-lg transition">
            🌱 Bilgilerimi Kaydet ve ToHUM'u Başlat ➔
          </button>
        `}
      </div>

    </div>
  `;
}

// =========================================================================
// 8. MODÜL: PROFİLİM & FARKLI MENÜLER ALTINDA BİLGİLERİMİ GÜNCELLEME MERKEZİ
// 5 Ayrı, Sade ve Anlaşılır Menü:
// 1. 👩 Ben & Bebeğim (Anne Bilgileri, Çocuk İsmi, Kaçıncı Hafta)
// 2. 🏥 Hastane & Doktor (Hastane Bilgisi, Doktor Bilgisi, Randevu & Hekim Özeti)
// 3. 🤝 Eşim & Davet (Eş Bilgisi, Kan Uyumu, Davet Kodu, Baba Ekranı Sinyali)
// 4. 🩺 Sağlık Anketim (Tansiyon Yapım, Boy/Kilo, Vitaminler, M0 Bazal Koridoru)
// 5. 🌱 Aile & Hesap (Yaşam Ağacı M0-M7, Mektuplar, Giriş/Tanışma Anketini Aç)
// =========================================================================
function renderProfileTab() {
  const sub = state.profileSubtab || "identity";
  const m0 = window.computeM0BaselineProfile();
  const curW = state.baby.week;
  const lc = getLifecycleDataForWeek(curW);

  return `
    <div class="w-full h-full pt-16 pb-20 px-4 space-y-3 text-white overflow-y-auto">
      
      <!-- Üst Kompakt Kimlik & Sunucu Kayıt Durumu -->
      <div class="p-3.5 bg-gradient-to-br from-amber-950/40 via-white/5 to-emerald-950/25 rounded-3xl border border-amber-400/30 flex items-center justify-between shadow-lg">
        <div class="flex items-center space-x-3">
          <div class="relative">
            <img src="${state.user.avatar}" class="w-13 h-13 rounded-full object-cover border-2 border-amber-400 shadow-md">
            <span class="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-emerald-500 text-black font-bold text-[8px] rounded-full">M0</span>
          </div>
          <div>
            <h2 class="text-sm font-bold text-white leading-tight">${state.user.name}</h2>
            <p class="text-[10px] text-amber-200 font-medium mt-0.5">${state.baby.name} (${curW}. Hafta) · ${state.user.hospitalName}</p>
            <div class="flex items-center space-x-1.5 mt-1">
              <span class="px-2 py-0.5 bg-emerald-500/20 rounded-full text-[9px] text-emerald-200 border border-emerald-400/30">
                ${state.auth ? state.auth.syncStatus : 'Kaydedildi ✓'}
              </span>
              <button onclick="openOnboardingWizardAtStep(1)" class="px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500/30 rounded-full text-[9px] text-amber-200 border border-amber-400/30 font-semibold">
                📋 Tanışma Anketi
              </button>
            </div>
          </div>
        </div>
        <button onclick="openAuthWelcomeFlow()" class="px-2.5 py-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-[9px] text-white/85 font-semibold shrink-0 text-center leading-tight transition" title="Giriş Ekranını Aç">
          🚪 Giriş<br>Ekranı
        </button>
      </div>

      <!-- 5 Ayrı Bilgi Güncelleme Menüsü (Yatay Kaydırılabilir Net Sekmeler) -->
      <div class="flex items-center space-x-1.5 overflow-x-auto no-scrollbar bg-white/5 p-1.5 rounded-2xl border border-white/10 text-[10px]">
        ${[
          { id: 'identity', lbl: '👩 Ben & Bebeğim' },
          { id: 'hospital', lbl: '🏥 Hastane & Doktor' },
          { id: 'partner',  lbl: '🤝 Eşim & Davet' },
          { id: 'baseline', lbl: '🩺 Sağlık Anketim' },
          { id: 'ecosystem',lbl: '🌱 Aile & Hesap' }
        ].map(t => `
          <button onclick="setProfileSubtab('${t.id}')"
            class="py-2 px-2.5 rounded-xl font-semibold whitespace-nowrap transition ${sub === t.id ? 'bg-amber-400/25 text-amber-200 border border-amber-400/40 shadow-xs' : 'text-white/55 hover:text-white/85'}">
            ${t.lbl}
          </button>
        `).join('')}
      </div>

      <!-- SEÇİLEN MENÜ İÇERİĞİ -->
      ${getProfileSubtabContent(sub, m0, curW, lc)}

    </div>
  `;
}

function getProfileSubtabContent(sub, m0, curW, lc) {
  const u = state.user;
  const p = state.partner;
  const b = state.baby;
  const sv = u.survey || { waterHabit: "5-7", supplements: ["iron", "magnesium", "omega", "d3"], symptoms: [] };

  // =========================================================================
  // MENÜ 1: BEN & BEBEĞİM (ANNE BİLGİLERİ, ÇOCUK İSMİ, KAÇINCI HAFTA)
  // =========================================================================
  if (sub === "identity") {
    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        
        <!-- Çocuk İsmi & Kaçıncı Haftada Olduğu Kartı -->
        <div class="p-4 bg-white/5 rounded-3xl border border-amber-400/30 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold text-amber-200 text-xs">👶 Bebeğimin İsmi ve Haftası</span>
              <p class="text-[10px] text-white/55">Değiştirdiğiniz anda tüm uygulama yeni haftaya ve isme göre güncellenir</p>
            </div>
            <span class="px-2.5 py-1 bg-amber-500/20 text-amber-200 border border-amber-400/30 rounded-full text-[10px] font-bold">
              ${curW}. Hafta
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label class="text-[10px] text-white/60 block mb-1">Bebeğimin İsmi / Hitabı</label>
              <input type="text" value="${b.name}" onchange="updateProfileField('babyName', this.value)"
                class="w-full bg-black/40 border border-amber-400/40 rounded-xl px-3 py-2 text-xs font-bold text-amber-200 focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/60 block mb-1">Tahmini Doğum Tarihi</label>
              <input type="text" value="${u.dueDate}" onchange="updateProfileField('dueDate', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
          </div>

          <!-- Canlı Hafta Seçici -->
          <div class="space-y-2 bg-black/30 p-3 rounded-2xl border border-white/5">
            <div class="flex justify-between text-[10px] text-white/75">
              <span>Kaçıncı Haftadayım? (Kaydırarak Değiştir):</span>
              <span class="font-bold text-amber-300">${curW}. Hafta (${lc.weight})</span>
            </div>
            <input type="range" min="4" max="40" value="${curW}"
              onchange="changePregnancyWeek(this.value)"
              class="w-full accent-amber-400 cursor-pointer h-2 bg-white/10 rounded-lg">
            <div class="grid grid-cols-4 gap-1.5 pt-1">
              <button onclick="changePregnancyWeek(8)" class="py-1.5 rounded-xl text-[10px] border ${curW === 8 ? 'bg-amber-500/30 border-amber-400 text-white font-bold' : 'bg-white/5 border-white/10 text-white/65'}">8. Hafta</button>
              <button onclick="changePregnancyWeek(20)" class="py-1.5 rounded-xl text-[10px] border ${curW === 20 ? 'bg-amber-500/30 border-amber-400 text-white font-bold' : 'bg-white/5 border-white/10 text-white/65'}">20. Hafta</button>
              <button onclick="changePregnancyWeek(31)" class="py-1.5 rounded-xl text-[10px] border ${curW === 31 ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold' : 'bg-white/5 border-white/10 text-white/65'}">31. Hafta</button>
              <button onclick="changePregnancyWeek(38)" class="py-1.5 rounded-xl text-[10px] border ${curW === 38 ? 'bg-rose-500/30 border-rose-400 text-rose-200 font-bold' : 'bg-white/5 border-white/10 text-white/65'}">38. Hafta</button>
            </div>
          </div>
        </div>

        <!-- Kişisel Bilgilerim Kartı -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="font-bold text-white/95 text-xs">👩 Benim Bilgilerim</div>
          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Adım Soyadım</label>
              <input type="text" value="${u.name}" onchange="updateProfileField('name', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white">
            </div>
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Kısa Hitap Adım</label>
              <input type="text" value="${u.shortName}" onchange="updateProfileField('shortName', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white">
            </div>
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Yaşım</label>
              <input type="number" min="17" max="52" value="${u.age || 31}" onchange="updateProfileField('age', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white">
            </div>
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Kan Grubum</label>
              <select onchange="updateProfileField('bloodGroup', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white">
                ${['A Rh+', 'A Rh-', '0 Rh+', '0 Rh-', 'B Rh+', 'B Rh-', 'AB Rh+', 'AB Rh-'].map(bg => `
                  <option value="${bg}" ${u.bloodGroup === bg ? 'selected' : ''}>${bg}</option>
                `).join('')}
              </select>
            </div>
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Şehir</label>
              <input type="text" value="${u.city}" onchange="updateProfileField('city', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white">
            </div>
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Mahallem (Komşu Ağı)</label>
              <input type="text" value="${u.neighborhood}" onchange="updateProfileField('neighborhood', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white">
            </div>
          </div>

          <button onclick="saveProfileToBackend(true)"
            class="w-full py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 rounded-2xl text-emerald-200 font-bold text-xs transition">
            💾 Değişiklikleri Kaydet ve Güncelle ✓
          </button>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // MENÜ 2: HASTANE & DOKTOR BİLGİLERİ (AYRI MENÜ ALTINDA GÜNCELLEME)
  // =========================================================================
  if (sub === "hospital") {
    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        
        <div class="p-4 bg-white/5 rounded-3xl border border-emerald-400/30 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold text-emerald-200 text-xs">🏥 Hastane ve Doktor Bilgilerim</span>
              <p class="text-[10px] text-white/55">Randevu takvimi, acil yol tarifi ve doktor özet raporu bu bilgilere göre hazırlanır</p>
            </div>
          </div>

          <div class="space-y-2.5">
            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">Gittiğim Hastane / Sağlık Kurumu</label>
              <input type="text" value="${u.hospitalName || 'Manisa Şehir Hastanesi'}"
                onchange="updateProfileField('hospitalName', this.value)"
                class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-amber-400">
            </div>

            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">Beni Takip Eden Doktorum / Ebem</label>
              <input type="text" value="${u.doctorName || 'Dr. Ayşe Yılmaz'}"
                onchange="updateProfileField('doctorName', this.value)"
                class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-amber-400">
            </div>

            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">Sıradaki Kontrol Randevu Tarihim</label>
              <input type="text" value="${u.nextCheckupDate || '10 Eylül 2026 · 14:30'}"
                onchange="updateProfileField('nextCheckupDate', this.value)"
                class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>

            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">Evcil Hayvan / Doğum Günü Emanet Notu</label>
              <input type="text" value="${state.pet ? (state.pet.name + ' · ' + state.pet.caretaker) : 'Carlos · Komşu Merve'}"
                onchange="if(state.pet) state.pet.caretaker = this.value; saveState();"
                class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
          </div>

          <button onclick="saveProfileToBackend(true)"
            class="w-full py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 rounded-2xl text-emerald-200 font-bold text-xs transition">
            💾 Hastane ve Doktor Bilgilerimi Kaydet ✓
          </button>
        </div>

        <!-- Hızlı Doktor & Hastane Aksiyonları -->
        <div class="grid grid-cols-2 gap-2">
          <button onclick="toggleClinicalReportModal()"
            class="p-3 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 rounded-2xl text-left transition">
            <div class="font-bold text-amber-200 text-xs">📄 Doktor Özeti Raporu</div>
            <div class="text-[10px] text-white/65 mt-0.5">${u.doctorName} için tek sayfa özet</div>
          </button>
          <button onclick="openHospitalNavigation()"
            class="p-3 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 rounded-2xl text-left transition">
            <div class="font-bold text-sky-200 text-xs">📍 Hastane Yol Tarifi</div>
            <div class="text-[10px] text-white/65 mt-0.5">${u.hospitalName} harita rotası</div>
          </button>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // MENÜ 3: EŞİM & DAVET KÖPRÜSÜ (EŞ TANIMLAMA, KAN UYUMU, DAVET KODU)
  // =========================================================================
  if (sub === "partner") {
    const perms = p.permissions || { shareVitals: true, shareSymptoms: true, shareSupplements: true, eveningMassage: true };
    const st = p.inviteStatus || "connected";

    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        
        <div class="p-4 bg-white/5 rounded-3xl border border-amber-400/30 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold text-amber-200 text-xs">🤝 Eş / Baba Bilgileri ve Kan Uyumu</span>
              <p class="text-[10px] text-white/55">Eşinizin bilgilerini buradan güncelleyebilir ve davet gönderebilirsiniz</p>
            </div>
            <button onclick="navigateTab('father')" class="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 rounded-xl text-[10px] font-bold">
              Baba Ekranı ➔
            </button>
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Eşimin Adı Soyadı</label>
              <input type="text" value="${p.name}" onchange="updatePartnerField('name', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white">
            </div>
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Eşimin Kan Grubu</label>
              <select onchange="updatePartnerField('bloodGroup', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white">
                ${['0 Rh+', '0 Rh-', 'A Rh+', 'A Rh-', 'B Rh+', 'B Rh-', 'AB Rh+', 'AB Rh-'].map(bg => `
                  <option value="${bg}" ${p.bloodGroup === bg ? 'selected' : ''}>${bg}</option>
                `).join('')}
              </select>
            </div>
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Eşimin Telefonu</label>
              <input type="text" value="${p.phone}" onchange="updatePartnerField('phone', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white">
            </div>
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Eşimin E-Postası</label>
              <input type="text" value="${p.email || 'oguz@tohum.app'}" onchange="updatePartnerField('email', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white">
            </div>
          </div>

          <div class="p-3 rounded-2xl border ${m0.rhIncompatibility ? 'bg-rose-950/40 border-rose-400/50 text-rose-200' : 'bg-emerald-950/30 border-emerald-400/30 text-emerald-200'} space-y-1">
            <div class="font-bold text-[11px]">${m0.rhStatusText}</div>
            <p class="text-[10px] text-white/80 leading-relaxed">${m0.rhDetailText}</p>
          </div>
        </div>

        <!-- Eş Davet Kodu ve Eşleştirme -->
        <div class="p-4 bg-gradient-to-br from-amber-950/35 via-white/5 to-white/5 rounded-3xl border border-amber-400/30 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold text-white text-xs">📲 Eş Davet Kodu & Bağlantı Durumu</span>
              <p class="text-[10px] text-white/55">${p.shortName} kendi telefonundan bu kodla bağlanır</p>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[9px] font-bold border ${st === 'connected' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' : 'bg-amber-500/20 text-amber-200 border-amber-400/30'}">
              ${st === 'connected' ? 'Bağlı ✓' : 'Onay Bekliyor ⏳'}
            </span>
          </div>

          <div class="p-3 bg-black/40 rounded-2xl border border-white/10 flex items-center justify-between">
            <div>
              <span class="text-[9px] text-white/45 block">Eşleştirme Kodu</span>
              <span class="font-mono font-bold text-base text-amber-300 tracking-wider">${p.inviteCode || 'THM-31G-834'}</span>
            </div>
            <div class="flex space-x-1.5">
              <button onclick="copyPartnerInviteCode()" class="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] text-white font-medium border border-white/10">Kopyala</button>
              <button onclick="regenerateInviteCode()" class="px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 rounded-xl text-[10px] text-amber-200 font-medium border border-amber-400/30">Yenile ↻</button>
            </div>
          </div>

          <button onclick="sendPartnerInviteWhatsApp()" class="w-full py-2.5 bg-gradient-to-r from-amber-500/30 to-emerald-500/25 hover:from-amber-500/40 border border-amber-400/40 rounded-2xl text-amber-100 font-bold text-[11px] transition flex items-center justify-center space-x-1.5 shadow-md">
            <span>💌</span>
            <span>${p.shortName}'a WhatsApp ile Davet Gönder</span>
          </button>

          <button onclick="pushPartnerLiveSignal()" class="w-full py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 text-emerald-200 font-bold text-[11px] rounded-2xl transition">
            ⚡ Şimdi ${p.shortName}'a Canlı Durum Sinyali Gönder ve Baba Ekranını Aç ➔
          </button>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // MENÜ 4: SAĞLIK ANKETİM & M0 BAZAL KORİDORUM
  // =========================================================================
  if (sub === "baseline") {
    const latestBp = state.healthData.bloodPressureHistory[0] || { systolic: 92, diastolic: 62 };
    const aiRes = window.runAiSeedCoreAnalysis(latestBp.systolic, latestBp.diastolic);

    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        
        <!-- Tek Tıkla Klinik Test Senaryoları -->
        <div class="p-3.5 bg-gradient-to-br from-amber-950/45 via-white/5 to-white/5 rounded-3xl border border-amber-400/35 space-y-2">
          <div class="flex justify-between items-center">
            <span class="font-bold text-amber-200 text-xs">⚡ Hızlı Senaryo Testi (Uçtan Uca Kontrol)</span>
            <button onclick="openOnboardingWizardAtStep(3)" class="text-[10px] text-emerald-300 underline font-semibold">
              Anket Görünümüyle Düzenle ➔
            </button>
          </div>
          <div class="grid grid-cols-2 gap-1.5">
            <button onclick="applyProfilePreset('buse_default')" class="p-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 rounded-2xl text-left">
              <div class="font-bold text-emerald-200 text-[10px]">🌿 Buse Doğal Bazal (90/60)</div>
              <div class="text-[9px] text-white/65">58➔65 kg · Dengeli Koridor</div>
            </button>
            <button onclick="applyProfilePreset('atypical_preeclampsia')" class="p-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 rounded-2xl text-left">
              <div class="font-bold text-amber-200 text-[10px]">📈 Atipik Sıçrama (118/78)</div>
              <div class="text-[9px] text-white/65">Bazal 90/60 iken 118/78 uyarısı</div>
            </button>
            <button onclick="applyProfilePreset('rh_incompatibility')" class="p-2 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/40 rounded-2xl text-left">
              <div class="font-bold text-rose-200 text-[10px]">🛡️ Kan Uyuşmazlığı Testi</div>
              <div class="text-[9px] text-white/65">Anne A Rh- & Baba 0 Rh+</div>
            </button>
            <button onclick="applyProfilePreset('rapid_weight_gain')" class="p-2 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 rounded-2xl text-left">
              <div class="font-bold text-sky-200 text-[10px]">⚖️ Hızlı Kilo Artışı Testi</div>
              <div class="text-[9px] text-white/65">58➔71.5 kg (+13.5 kg)</div>
            </button>
          </div>
        </div>

        <!-- Tansiyon Yapım & M0 Bazal Koridorum -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold text-white/95 text-xs">❤️ Normal Tansiyon Yapım</span>
              <p class="text-[10px] text-white/55">Kişisel bazal değerim: <b>${u.baselineBP} mmHg</b></p>
            </div>
            <div class="flex space-x-1">
              <button onclick="selectBaselineBpCategory('low', 90, 60)" class="px-2 py-1 rounded-lg text-[9px] border ${u.baselineSys <= 95 ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold' : 'bg-white/5 border-white/10 text-white/60'}">Düşük (90/60)</button>
              <button onclick="selectBaselineBpCategory('normal', 110, 70)" class="px-2 py-1 rounded-lg text-[9px] border ${u.baselineSys > 95 && u.baselineSys < 120 ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold' : 'bg-white/5 border-white/10 text-white/60'}">Normal (110/70)</button>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Normal Büyük (Sistolik)</label>
              <input type="number" min="75" max="135" value="${u.baselineSys}" onchange="updateProfileField('baselineSys', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-emerald-300">
            </div>
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Normal Küçük (Diyastolik)</label>
              <input type="number" min="45" max="90" value="${u.baselineDia}" onchange="updateProfileField('baselineDia', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-emerald-300">
            </div>
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Normal Nabzım</label>
              <input type="number" min="50" max="110" value="${u.baselineHR || 72}" onchange="updateProfileField('baselineHR', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-amber-200">
            </div>
          </div>

          <div class="p-3 bg-black/35 rounded-2xl border border-white/5 space-y-1.5 text-[10px]">
            <div class="font-semibold text-amber-200">Sana Özel Güvenli Tansiyon Aralıkların:</div>
            <div class="grid grid-cols-3 gap-1.5 text-center">
              <div class="p-1.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-200">
                <div class="font-bold">${m0.bpCorridors.optimal}</div>
                <div class="text-[8px]">Senin Normalin</div>
              </div>
              <div class="p-1.5 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-200">
                <div class="font-bold">${m0.bpCorridors.borderline}</div>
                <div class="text-[8px]">Dikkat / Dinlen</div>
              </div>
              <div class="p-1.5 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200">
                <div class="font-bold">${m0.bpCorridors.critical}</div>
                <div class="text-[8px]">Doktoruna Haber Ver</div>
              </div>
            </div>
            <div class="text-white/75 pt-1 border-t border-white/5">${aiRes.message}</div>
          </div>
        </div>

        <!-- Boy ve Kilo Güncelleme Kartı -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <span class="font-bold text-white/95 text-xs">⚖️ Boyum ve Kilom</span>
            <span class="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full text-[10px] font-bold">VKİ: ${m0.bmi}</span>
          </div>
          <div class="grid grid-cols-3 gap-2">
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Boyum (cm)</label>
              <input type="number" value="${u.heightCm || 168}" onchange="updateProfileField('heightCm', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-white">
            </div>
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Başlangıç Kilom</label>
              <input type="number" step="0.5" value="${u.startWeight}" onchange="updateProfileField('startWeight', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-white">
            </div>
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Şu Anki Kilom</label>
              <input type="number" step="0.5" value="${u.currentWeight}" onchange="updateProfileField('currentWeight', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-amber-200">
            </div>
          </div>
          <div class="p-2.5 bg-black/35 rounded-2xl border border-white/5 text-[10px] text-white/80 leading-relaxed">
            ${m0.weightAdvice}
          </div>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // MENÜ 5: AİLE ÇEMBERİ, YAŞAM AĞACI & GİRİŞ / ANKET YÖNETİMİ
  // =========================================================================
  return `
    <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
      
      <!-- İlk Giriş ve Tanışma Anketini Yeniden Açma Kartı -->
      <div class="p-4 bg-gradient-to-r from-amber-950/45 to-emerald-950/35 rounded-3xl border border-amber-400/40 space-y-2.5">
        <div class="font-bold text-amber-200 text-xs">🚪 İlk Giriş ve Tanışma Anketi Sihirbazı</div>
        <p class="text-[10px] text-white/75 leading-relaxed">
          Uygulamayı yeni indiren bir annenin gördüğü <b>Google / Telefon Giriş Ekranını</b> ve <b>5 Adımlı Sohbet Tadında İlk Tanışma Anketini</b> istediğiniz an buradan açıp test edebilirsiniz:
        </p>
        <div class="grid grid-cols-2 gap-2">
          <button onclick="openAuthWelcomeFlow()"
            class="py-2.5 px-3 bg-white text-gray-900 font-bold text-[11px] rounded-2xl shadow-md">
            🔵 Giriş Ekranını Aç
          </button>
          <button onclick="openOnboardingWizardAtStep(1)"
            class="py-2.5 px-3 bg-amber-500/25 border border-amber-400/40 text-amber-200 font-bold text-[11px] rounded-2xl">
            📋 5 Adımlı Anketi Aç
          </button>
        </div>
      </div>

      <!-- M0 - M7 TOHUM 18 YILLIK YAŞAM AĞACI -->
      <div class="p-4 bg-gradient-to-br from-amber-950/35 via-white/5 to-emerald-950/25 rounded-3xl border border-amber-400/25 space-y-3">
        <div class="flex justify-between items-center">
          <div>
            <div class="font-bold text-amber-200 text-sm">🌱 ToHUM Yaşam Ağacı (M0 – M7)</div>
            <div class="text-[10px] text-white/55">18 Yıllık Gelişim Pusulası</div>
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
      </div>

      <!-- Güneş'e Mektuplarım -->
      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2.5">
        <div class="flex justify-between items-center">
          <div class="font-semibold text-white/95">💌 ${b.name}'e Mektuplarım (${state.timeCapsules.length})</div>
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

      <!-- Aile Ekosistemi & Mahremiyet -->
      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
        <div class="flex justify-between items-center">
          <div>
            <div class="font-bold text-white/95">🔐 Aile Ekosistemi & Mahremiyet</div>
            <div class="text-[10px] text-white/55">Yakın Aile Gözlemci İzinleri</div>
          </div>
          <button onclick="addFamilyObserver()" class="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-[10px] text-amber-200 font-semibold">
            + Yakın Ekle
          </button>
        </div>

        <div class="p-3 rounded-2xl border flex items-center justify-between ${state.privacyMode ? 'bg-indigo-950/50 border-indigo-400/40' : 'bg-black/30 border-white/10'}">
          <div>
            <div class="font-semibold text-white text-xs">🌙 "Kendime Alan" (Gizlilik Modu)</div>
            <div class="text-[10px] text-white/60 mt-0.5">
              ${state.privacyMode ? 'Aktif: Gözlemci yakınların erişimi durduruldu.' : 'Pasif: Yakınlar haftalık özeti görebilir.'}
            </div>
          </div>
          <button onclick="togglePrivacyMode()" class="px-3 py-1.5 rounded-xl text-[10px] font-bold border transition ${state.privacyMode ? 'bg-indigo-500/30 border-indigo-300/50 text-indigo-200' : 'bg-white/10 border-white/15 text-white/70'}">
            ${state.privacyMode ? 'Açık ✓' : 'Aktif Et'}
          </button>
        </div>
      </div>

    </div>
  `;
}

// =========================================================================
// FULL-STACK BACKEND SENKRONİZASYON VE ONBOARDING İŞLEYİCİLERİ
// =========================================================================
window.saveProfileToBackend = function(showFeedback) {
  saveState();
  if (typeof fetch !== "undefined") {
    fetch("/api/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: (state.auth && state.auth.userId) || "buse_founder",
        user: state.user,
        baby: { name: state.baby.name, week: state.baby.week, daysLeft: state.baby.daysLeft },
        partner: state.partner
      })
    })
      .then(r => r.json())
      .then(res => {
        if (state.auth) state.auth.syncStatus = "Sunucuya Kaydedildi ✓";
        if (showFeedback) {
          triggerHaptic([20, 30]);
          triggerReaction("folic", "Bilgileriniz güncellendi ve sunucuya kaydedildi.");
          render();
        }
      })
      .catch(() => {});
  }
};

window.openAuthWelcomeFlow = function() {
  if (!state.auth) state.auth = { isAuthenticated: false, screen: "login", onboardingStep: 1 };
  state.auth.screen = "login";
  state.isDrawerOpen = false;
  triggerHaptic(15);
  render();
};

window.openOnboardingWizardAtStep = function(stepNum) {
  if (!state.auth) state.auth = { isAuthenticated: true, screen: "onboarding", onboardingStep: 1 };
  state.auth.screen = "onboarding";
  state.auth.onboardingStep = stepNum || 1;
  state.isDrawerOpen = false;
  triggerHaptic(15);
  render();
};

window.setOnboardingStep = function(stepNum) {
  if (!state.auth) state.auth = { isAuthenticated: true, screen: "onboarding", onboardingStep: 1 };
  state.auth.onboardingStep = Math.max(1, Math.min(5, stepNum));
  triggerHaptic(15);
  render();
};

window.startLoginWithProvider = function(provider, targetMode) {
  if (!state.auth) state.auth = {};
  state.auth.provider = provider;
  state.auth.isAuthenticated = true;

  if (targetMode === "founder") {
    state.auth.screen = "app";
    state.currentTab = "home";
    triggerHaptic([20, 40]);
    saveProfileToBackend(false);
    render();
    return;
  }

  state.auth.screen = "onboarding";
  state.auth.onboardingStep = 1;
  triggerHaptic([20, 35]);
  render();
};

window.connectAsPartnerWithCode = function() {
  const code = (state.auth && state.auth.partnerCodeInput) || state.partner.inviteCode || "THM-31G-834";
  state.partner.inviteCode = code.trim().toUpperCase();
  state.partner.inviteStatus = "connected";
  state.auth.screen = "app";
  state.currentTab = "father";
  triggerHaptic([25, 45, 25]);
  saveProfileToBackend(false);
  render();
};

window.finishOnboardingAndStartApp = function() {
  if (!state.auth) state.auth = {};
  state.auth.screen = "app";
  state.auth.isAuthenticated = true;
  state.currentTab = "home";
  triggerHaptic([30, 50, 30]);
  saveProfileToBackend(false);
  render();
};

window.selectFirstBabyOption = function(isFirst) {
  state.user.isFirstBaby = isFirst;
  state.user.parity = isFirst
    ? "G1P0 (İlk Gebelik · Primigravida)"
    : "G2P1 (Çoklu Gebelik · Multigravida)";
  triggerHaptic(15);
  render();
};

window.selectBaselineBpCategory = function(catId, sysVal, diaVal) {
  state.user.baselineCategory = catId;
  state.user.baselineSys = sysVal;
  state.user.baselineDia = diaVal;
  state.user.baselineBP = `${sysVal}/${diaVal}`;
  const latestBp = state.healthData.bloodPressureHistory[0];
  if (latestBp && window.runAiSeedCoreAnalysis) {
    window.runAiSeedCoreAnalysis(latestBp.systolic, latestBp.diastolic);
  }
  triggerHaptic(15);
  saveProfileToBackend(false);
  render();
};

window.calculateWeekFromLmpDate = function(dateStr) {
  if (!dateStr) return;
  state.user.lmpDate = dateStr;
  const lmp = new Date(dateStr);
  if (!isNaN(lmp.getTime())) {
    const refNow = new Date("2026-08-23T12:00:00");
    const diffDays = Math.floor((refNow - lmp) / (1000 * 60 * 60 * 24));
    const calcWeek = Math.max(4, Math.min(40, Math.floor(diffDays / 7)));
    const due = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
    state.user.dueDate = due.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    if (window.changePregnancyWeek) {
      window.changePregnancyWeek(calcWeek);
    }
  }
  saveProfileToBackend(false);
  render();
};

window.toggleSurveyArrayItem = function(listKey, itemId) {
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
};

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
  saveProfileToBackend(false);
  render();
};

window.updatePartnerField = function(field, val) {
  state.partner[field] = val;
  if (field === "name" && val.trim()) {
    state.partner.shortName = val.trim().split(" ")[0];
  }
  triggerHaptic(15);
  saveProfileToBackend(false);
  render();
};

window.togglePartnerPermission = function(key) {
  if (!state.partner.permissions) {
    state.partner.permissions = { shareVitals: true, shareSymptoms: true, shareSupplements: true, eveningMassage: true };
  }
  state.partner.permissions[key] = !state.partner.permissions[key];
  triggerHaptic(15);
  saveProfileToBackend(false);
  render();
};

window.regenerateInviteCode = function() {
  const rnd = Math.floor(100 + Math.random() * 900);
  state.partner.inviteCode = `THM-${state.baby.week}G-${rnd}`;
  triggerHaptic([15, 25]);
  triggerReaction("folic", `Yeni aile eşleştirme kodu üretildi: ${state.partner.inviteCode}`);
  saveProfileToBackend(false);
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
  saveProfileToBackend(false);
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
  saveProfileToBackend(false);
  navigateTab("father");
};

window.applyProfilePreset = function(presetName) {
  const nowStr = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  if (presetName === "buse_default") {
    state.user.baselineSys = 90;
    state.user.baselineDia = 60;
    state.user.baselineBP = "90/60";
    state.user.baselineCategory = "low";
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
    state.user.baselineCategory = "low";
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
  saveProfileToBackend(false);
  render();
};

"""

code = code[:idx_s] + new_profile_and_onboarding + code[idx_e:]

# 6. Also update initTohumApp at the bottom of app.js to support ?flow=welcome and ?flow=onboarding&step=1
old_init_fn = """function initTohumApp() {
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
}"""

new_init_fn = """function initTohumApp() {
  loadSavedState();
  try {
    const params = new URLSearchParams(window.location.search);
    const flowParam = params.get("flow");
    const stepParam = params.get("step");
    const tabParam = params.get("tab");
    const subParam = params.get("sub");
    const presetParam = params.get("preset");
    if (flowParam === "welcome" || flowParam === "login") {
      state.auth.screen = "login";
    } else if (flowParam === "onboarding") {
      state.auth.screen = "onboarding";
      state.auth.onboardingStep = parseInt(stepParam || "1", 10) || 1;
    } else if (tabParam) {
      state.auth.screen = "app";
      state.currentTab = tabParam;
    }
    if (subParam) state.profileSubtab = subParam;
    if (presetParam && window.applyProfilePreset) {
      window.applyProfilePreset(presetParam);
      return;
    }
  } catch (e) {}
  render();
}"""

if old_init_fn in code:
    code = code.replace(old_init_fn, new_init_fn, 1)
    print("6. Updated initTohumApp with ?flow=welcome & ?flow=onboarding support!")

with open(path, "w", encoding="utf-8") as f:
    f.write(code)

idx_path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\index.html"
with open(idx_path, "r", encoding="utf-8") as f:
    ih = f.read()
ih = ih.replace("app.js?v=v22_m0_profile", "app.js?v=v23_fullstack_onboarding")
with open(idx_path, "w", encoding="utf-8") as f:
    f.write(ih)

print("Successfully upgraded Full-Stack Onboarding & 5-Menu Profile Editor!")
