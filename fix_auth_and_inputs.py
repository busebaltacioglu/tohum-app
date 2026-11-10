import sys
sys.stdout.reconfigure(encoding='utf-8')

path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js"
with open(path, "r", encoding="utf-8") as f:
    code = f.read()

# 1. Update state.auth to include authTab ('register' | 'login'), firstName, lastName, email, password, googleModalOpen
old_auth = """  auth: {
    isAuthenticated: true,
    screen: "app", // 'login' | 'onboarding' | 'app'
    onboardingStep: 1, // 1..5
    provider: "google",
    userId: "buse_founder",
    syncStatus: "Sunucu ile Senkronize ✓",
    partnerCodeInput: "",
    phoneInput: ""
  },"""

new_auth = """  auth: {
    isAuthenticated: true,
    screen: "app", // 'login' | 'onboarding' | 'app'
    authTab: "register", // 'register' (Üye Ol) | 'login' (Giriş Yap)
    onboardingStep: 1, // 1..3 (Mahremiyet dostu 3 sade adım)
    provider: "google",
    userId: "buse_founder",
    email: "busenur.baltacioglu@gmail.com",
    firstName: "Buse Nur",
    lastName: "Baltacıoğlu",
    password: "",
    googleModalOpen: false,
    authError: "",
    syncStatus: "Sunucu ile Senkronize ✓",
    partnerCodeInput: "",
    phoneInput: ""
  },"""

if old_auth in code:
    code = code.replace(old_auth, new_auth, 1)
    print("1. Updated state.auth with register/login fields and firstName/lastName!")

# 2. Replace renderAuthLoginScreen, renderOnboardingWizardScreen, renderProfileTab and handlers
start_marker = "// =========================================================================\n// GİRİŞ EKRANI (GOOGLE / APPLE / TELEFON / EŞ KODU) & 5 ADIMLI İLK TANIŞMA ANKETİ"
end_marker = "// GENEL ETKİLEŞİM İŞLEYİCİLERİ\nwindow.toggleDrawer = function()"

idx_s = code.find(start_marker)
idx_e = code.find(end_marker)

if idx_s == -1 or idx_e == -1:
    print(f"ERROR: markers not found! idx_s={idx_s}, idx_e={idx_e}")
    sys.exit(1)

new_block = """// =========================================================================
// GERÇEK ÜYELİK (ÜYE OL / GİRİŞ YAP / GOOGLE HESABI) VE
// MAHREMİYET DOSTU (KONUMSUZ, ZORLAMASIZ) 3 ADIMLI İLK TANIŞMA ANKETİ
// ÖNEMLİ: Yazı yazılan hiçbir <input> alanında render() tetiklenmez;
// silentUpdateField() ile imleç ve klavye odağı %100 korunur!
// =========================================================================
function renderAuthLoginScreen() {
  const a = state.auth || {};
  const isReg = (a.authTab || "register") === "register";
  const fName = a.firstName !== undefined ? a.firstName : (state.user.shortName || "Buse Nur");
  const lName = a.lastName !== undefined ? a.lastName : "Baltacıoğlu";
  const emailVal = a.email || "busenur.baltacioglu@gmail.com";

  return `
    <div class="w-full h-full px-5 py-6 flex flex-col justify-between text-white overflow-y-auto bg-gradient-to-b from-[#1A0F0A] via-[#120A07] to-[#0A0605] relative">
      
      <!-- Üst Logo & Başlık -->
      <div class="text-center space-y-1.5">
        <div class="w-13 h-13 mx-auto rounded-full bg-gradient-to-br from-amber-400/30 to-emerald-500/20 border-2 border-amber-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(251,191,36,0.25)]">
          <span class="text-xl">🌱</span>
        </div>
        <h1 class="text-lg font-serif tracking-[0.2em] text-white uppercase font-bold">ToHUM</h1>
        <p class="text-[11px] text-amber-200/90 font-medium">Anne ve Bebek Yaşam Yoldaşı</p>
      </div>

      <!-- ÜYE OL / GİRİŞ YAP Sekme Seçici -->
      <div class="my-3 space-y-3">
        <div class="grid grid-cols-2 gap-1.5 bg-white/5 p-1 rounded-2xl border border-white/10 text-xs">
          <button onclick="switchAuthModeTab('register')"
            class="py-2.5 rounded-xl font-bold transition ${isReg ? 'bg-amber-500 text-black shadow-md' : 'text-white/60 hover:text-white'}">
            ✨ Yeni Üye Ol
          </button>
          <button onclick="switchAuthModeTab('login')"
            class="py-2.5 rounded-xl font-bold transition ${!isReg ? 'bg-amber-500 text-black shadow-md' : 'text-white/60 hover:text-white'}">
            🔑 Giriş Yap
          </button>
        </div>

        ${a.authError ? `
          <div class="p-2.5 bg-rose-500/20 border border-rose-400/40 rounded-xl text-[11px] text-rose-200 text-center">
            ${a.authError}
          </div>
        ` : ''}

        <!-- 1. Gerçek Google Hesabı ile Tek Dokunuşla Üye Ol / Giriş Yap -->
        <button onclick="openGoogleAccountModal()"
          class="w-full py-3 px-4 bg-white text-gray-900 hover:bg-gray-100 rounded-2xl font-bold text-xs flex items-center justify-between shadow-lg active:scale-98 transition">
          <div class="flex items-center space-x-3">
            <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">G</span>
            <div class="text-left">
              <div class="text-xs font-bold text-gray-900">${isReg ? 'Google Hesabımla Üye Ol' : 'Google Hesabımla Giriş Yap'}</div>
              <div class="text-[10px] text-gray-500 font-normal">Gerçek Google e-posta hesabınla devam et</div>
            </div>
          </div>
          <span class="text-gray-400 text-sm">➔</span>
        </button>

        <div class="flex items-center space-x-2 text-[10px] text-white/35">
          <div class="flex-1 h-px bg-white/10"></div>
          <span>veya e-posta ile ${isReg ? 'üye ol' : 'giriş yap'}</span>
          <div class="flex-1 h-px bg-white/10"></div>
        </div>

        ${isReg ? `
          <!-- YENİ ÜYE OL FORMU (Ad, Soyad, E-posta, Şifre — Kesintisiz Yazılabilir!) -->
          <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2.5 text-xs">
            <div class="grid grid-cols-2 gap-2">
              <div>
                <label class="text-[10px] text-amber-200 font-semibold block mb-1">Adın *</label>
                <input id="regFirstNameInput" type="text" value="${fName}" placeholder="Örn: Buse Nur"
                  oninput="silentUpdateAuthName()"
                  class="w-full bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
              </div>
              <div>
                <label class="text-[10px] text-amber-200 font-semibold block mb-1">Soyadın</label>
                <input id="regLastNameInput" type="text" value="${lName}" placeholder="Örn: Baltacıoğlu"
                  oninput="silentUpdateAuthName()"
                  class="w-full bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
              </div>
            </div>

            <div>
              <label class="text-[10px] text-amber-200 font-semibold block mb-1">E-Posta Adresin veya Telefonun *</label>
              <input id="regEmailInput" type="email" value="${emailVal}" placeholder="ornek@gmail.com"
                oninput="state.auth.email = this.value"
                class="w-full bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>

            <div>
              <label class="text-[10px] text-amber-200 font-semibold block mb-1">Şifre Belirle *</label>
              <input id="regPasswordInput" type="password" value="${a.password || ''}" placeholder="En az 6 karakter"
                oninput="state.auth.password = this.value"
                class="w-full bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>

            <div class="text-[10px] text-white/55 leading-relaxed pt-0.5">
              🔒 Ev adresin veya konumun <b>kesinlikle</b> istenmez. Bilgilerin KVKK kapsamında yalnızca senin ve bebeğinin takibi için korunur.
            </div>

            <button onclick="submitEmailRegistration()"
              class="w-full py-3 bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-600 text-black font-bold text-xs rounded-2xl shadow-lg transition">
              🌱 Üye Ol ve Kısa Tanışma Anketine Geç ➔
            </button>
          </div>
        ` : `
          <!-- MEVCUT HESAP İLE GİRİŞ YAP FORMU -->
          <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2.5 text-xs">
            <div>
              <label class="text-[10px] text-amber-200 font-semibold block mb-1">Kayıtlı E-Posta Adresin</label>
              <input id="loginEmailInput" type="email" value="${emailVal}" placeholder="ornek@gmail.com"
                oninput="state.auth.email = this.value"
                class="w-full bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>

            <div>
              <label class="text-[10px] text-amber-200 font-semibold block mb-1">Şifren</label>
              <input id="loginPasswordInput" type="password" value="${a.password || ''}" placeholder="••••••••"
                oninput="state.auth.password = this.value"
                class="w-full bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>

            <button onclick="submitEmailLogin()"
              class="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-bold text-xs rounded-2xl shadow-lg transition">
              🔑 Hesabıma Giriş Yap ➔
            </button>
          </div>

          <!-- Eş / Baba Davet Kodu ile Bağlanma -->
          <div class="p-3 bg-emerald-950/25 rounded-2xl border border-emerald-400/25 space-y-1.5">
            <label class="text-[10px] font-semibold text-emerald-200 block">🤝 Eş / Baba Davet Kodun Var mı?</label>
            <div class="flex space-x-2">
              <input type="text" placeholder="Örn: THM-31G-834" value="${a.partnerCodeInput || state.partner.inviteCode || 'THM-31G-834'}"
                oninput="state.auth.partnerCodeInput = this.value"
                class="flex-1 bg-black/40 border border-emerald-400/30 rounded-xl px-3 py-1.5 text-xs font-mono text-emerald-200 focus:outline-none">
              <button onclick="connectAsPartnerWithCode()"
                class="px-3 py-1.5 bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-400/40 text-emerald-200 rounded-xl text-xs font-bold shrink-0">
                Baba Girişi ➔
              </button>
            </div>
          </div>
        `}
      </div>

      <!-- Alt Bilgi -->
      <div class="pt-2 border-t border-white/10 text-center">
        <button onclick="startLoginWithProvider('google', 'founder')"
          class="text-[11px] text-amber-200/80 hover:text-amber-200 underline font-medium">
          Uygulamaya Doğrudan Geç (${state.user.name} · ${state.baby.week}. Hafta) ➔
        </button>
      </div>

      <!-- GERÇEK GOOGLE HESAP SEÇİM MODALI -->
      ${a.googleModalOpen ? `
        <div class="fixed inset-0 bg-black/80 z-[200] backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div class="bg-[#181210] border border-white/20 rounded-3xl w-full max-w-[360px] p-5 space-y-4 text-white shadow-2xl">
            <div class="flex justify-between items-center border-b border-white/10 pb-3">
              <div class="flex items-center space-x-2">
                <span class="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">G</span>
                <span class="font-bold text-sm">Google ile Oturum Aç</span>
              </div>
              <button onclick="closeGoogleAccountModal()" class="text-white/60 hover:text-white text-sm">✕</button>
            </div>

            <p class="text-[11px] text-white/70">
              ToHUM uygulamasına devam etmek için Google hesabınızı seçin veya kendi Gmail adresinizi girin:
            </p>

            <!-- Hazır Google Hesabı Seçeneği -->
            <button onclick="completeGoogleAuth('Buse Nur', 'Baltacıoğlu', 'busenur.baltacioglu@gmail.com', 'onboarding')"
              class="w-full p-3 bg-white/5 hover:bg-white/10 border border-white/15 rounded-2xl flex items-center space-x-3 text-left transition">
              <img src="${state.user.avatar}" class="w-9 h-9 rounded-full object-cover">
              <div class="flex-1 overflow-hidden">
                <div class="font-bold text-xs text-white truncate">Buse Nur Baltacıoğlu</div>
                <div class="text-[10px] text-white/60 truncate">busenur.baltacioglu@gmail.com</div>
              </div>
              <span class="text-amber-300 text-xs">Seç ➔</span>
            </button>

            <!-- Kendi Gerçek Gmail Adresini Yazarak Giriş -->
            <div class="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-2 text-xs">
              <div class="font-semibold text-amber-200 text-[11px]">Başka Bir Google Hesabı Kullan:</div>
              <div class="grid grid-cols-2 gap-1.5">
                <input id="googleCustomFirst" type="text" value="${fName}" placeholder="Adınız"
                  oninput="state.auth.firstName = this.value"
                  class="bg-white/5 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
                <input id="googleCustomLast" type="text" value="${lName}" placeholder="Soyadınız"
                  oninput="state.auth.lastName = this.value"
                  class="bg-white/5 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
              </div>
              <input id="googleCustomEmail" type="email" value="${emailVal}" placeholder="gmail adresiniz (örn: ad.soyad@gmail.com)"
                oninput="state.auth.email = this.value"
                class="w-full bg-white/5 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
              <button onclick="completeCustomGoogleAuth()"
                class="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition">
                Bu Google Hesabıyla Devam Et ➔
              </button>
            </div>
          </div>
        </div>
      ` : ''}

    </div>
  `;
}

// =========================================================================
// 3 ADIMLI MAHREMİYET DOSTU İLK TANIŞMA ANKETİ (KONUMSUZ, SADE VE AKICI)
// Adım 1: Bebeğin İsmi & Kaçıncı Haftada Olduğun
// Adım 2: Genel Sağlık & Kullandığın Vitaminler (Tıbbi Terimsiz)
// Adım 3: Eş & Doktor Bilgileri (İsteğe Bağlı)
// =========================================================================
function renderOnboardingWizardScreen() {
  const step = Math.min(3, Math.max(1, state.auth.onboardingStep || 1));
  const u = state.user;
  const p = state.partner;
  const b = state.baby;
  const sv = u.survey || { waterHabit: "5-7", supplements: ["iron", "magnesium"], symptoms: [] };
  const m0 = window.computeM0BaselineProfile();

  const stepTitles = [
    { num: 1, title: "Hoş Geldin ${u.shortName}! Bebeğini Tanıyalım 👶", sub: "Bebeğinin ismini ve kaçıncı haftada olduğunu belirleyelim" },
    { num: 2, title: "Sağlık & Vitamin Anketi 🩺", sub: "Sana doğru hatırlatmalar yapabilmemiz için birkaç basit soru" },
    { num: 3, title: "Eşin & Doktorun 🤝🏥 (İsteğe Bağlı)", sub: "İstersen şimdi, istersen daha sonra menüden ekleyebilirsin" }
  ];
  const curStepInfo = stepTitles[step - 1] || stepTitles[0];

  return `
    <div class="w-full h-full px-4 py-5 flex flex-col justify-between text-white overflow-y-auto bg-[#0E0907]">
      
      <!-- Üst Adım Çubuğu -->
      <div class="space-y-2.5 pb-3 border-b border-white/10">
        <div class="flex justify-between items-center">
          <span class="text-[10px] bg-amber-500/20 text-amber-200 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-bold">
            Adım ${step} / 3 · İlk Kurulum
          </span>
          <button onclick="finishOnboardingAndStartApp()" class="text-[10px] text-white/50 hover:text-white underline">
            Şimdilik Geç ✕
          </button>
        </div>

        <!-- 3 Adım İlerleme Çizgisi -->
        <div class="grid grid-cols-3 gap-2">
          ${[1, 2, 3].map(idx => `
            <button onclick="setOnboardingStep(${idx})"
              class="h-2 rounded-full transition-all ${idx === step ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : idx < step ? 'bg-emerald-400/70' : 'bg-white/15'}"></button>
          `).join('')}
        </div>

        <div>
          <h2 class="text-base font-serif font-bold text-white">${curStepInfo.title.replace('${u.shortName}', u.shortName || 'Anne Adayı')}</h2>
          <p class="text-[11px] text-white/60">${curStepInfo.sub}</p>
        </div>
      </div>

      <!-- Orta İçerik (Adım 1..3) -->
      <div class="flex-1 py-3 space-y-3.5 overflow-y-auto pr-0.5 text-xs">
        
        ${step === 1 ? `
          <!-- ADIM 1: KİŞİSEL BİLGİ KONTROLÜ, BEBEK İSMİ VE HAFTA SEÇİMİ (KONUM YOK!) -->
          <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
            <div class="grid grid-cols-2 gap-2.5">
              <div>
                <label class="text-[10px] text-amber-200 font-semibold block mb-1">Adın Soyadın</label>
                <input type="text" value="${u.name}" placeholder="Adın Soyadın"
                  oninput="silentUpdateField('user', 'name', this.value)"
                  class="w-full bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
              </div>
              <div>
                <label class="text-[10px] text-amber-200 font-semibold block mb-1">Yaşın (İsteğe Bağlı)</label>
                <input type="number" min="17" max="52" value="${u.age || 31}"
                  oninput="silentUpdateField('user', 'age', this.value)"
                  class="w-full bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
              </div>
            </div>

            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">1. Bebeğine bir isim veya sevgi dolu bir lakap koydunuz mu?</label>
              <div class="flex space-x-2">
                <input id="onbBabyNameInput" type="text" value="${b.name}" placeholder="Örn: Güneş, Can, Minik Tohum..."
                  oninput="silentUpdateField('baby', 'name', this.value)"
                  class="flex-1 bg-black/40 border border-amber-400/40 rounded-2xl px-3.5 py-2.5 text-sm font-bold text-amber-200 focus:outline-none focus:border-amber-400">
                <button onclick="setBabyNicknameQuick('Minik Tohum')"
                  class="px-3 py-2 bg-white/10 hover:bg-white/15 rounded-2xl text-[10px] text-white/85 border border-white/10 shrink-0">
                  Henüz Yok ("Minik Tohum")
                </button>
              </div>
            </div>

            <!-- Kaçıncı Haftada Olduğu Seçimi -->
            <div class="p-3.5 bg-black/40 rounded-2xl border border-white/10 space-y-2.5">
              <div class="flex justify-between items-center">
                <span class="text-[11px] font-semibold text-emerald-300">2. Şu an hamileliğinin kaçıncı haftasındasın?</span>
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
                🌱 <b>${b.week}. Hafta:</b> Bebeğin şu an yaklaşık <b>${getLifecycleDataForWeek(b.week).weight}</b> ağırlığında ve doğuma yaklaşık <b>${b.daysLeft} gün</b> var.
              </div>

              <div class="pt-2 border-t border-white/10 space-y-1">
                <label class="text-[10px] text-white/65 block">💡 <b>Haftanı tam bilmiyor musun?</b> Son adet gördüğün ilk günü seç, biz hesaplayalım:</label>
                <input type="date" value="${u.lmpDate || '2026-01-17'}"
                  onchange="calculateWeekFromLmpDate(this.value)"
                  class="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none">
              </div>
            </div>

            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1.5">3. Bu senin ilk hamileliğin mi?</label>
              <div class="grid grid-cols-2 gap-2">
                <button onclick="selectFirstBabyOption(true)"
                  class="p-2.5 rounded-2xl border text-left transition ${u.isFirstBaby !== false ? 'bg-emerald-500/25 border-emerald-400 text-white font-bold' : 'bg-black/30 border-white/10 text-white/65'}">
                  <div class="text-xs">🌱 Evet, İlk Bebeğim</div>
                </button>
                <button onclick="selectFirstBabyOption(false)"
                  class="p-2.5 rounded-2xl border text-left transition ${u.isFirstBaby === false ? 'bg-emerald-500/25 border-emerald-400 text-white font-bold' : 'bg-black/30 border-white/10 text-white/65'}">
                  <div class="text-xs">🌿 Daha Önce Doğum Yaptım</div>
                </button>
              </div>
            </div>
          </div>
        ` : ''}

        ${step === 2 ? `
          <!-- ADIM 2: SAĞLIK VE VİTAMİN ANKETİ (TIBBİ TERİMSİZ, ZORLAMASIZ) -->
          <div class="space-y-3">
            
            <!-- Soru 1: Normal Tansiyon Yapısı -->
            <div class="p-3.5 bg-white/5 rounded-3xl border border-white/10 space-y-2">
              <label class="text-[11px] font-semibold text-amber-200 block">1. Normalde tansiyonun nasıldır?</label>
              <p class="text-[10px] text-white/55">Sana yanlış uyarı vermememiz için kendi doğal yapını seçmen yeterli:</p>
              <div class="space-y-1.5">
                ${[
                  { id: 'low', title: '📉 Genelde Düşüktür (9/6 gibi)', desc: 'Ayağa kalkınca bazen başım döner, hep düşük çıkar', sys: 90, dia: 60 },
                  { id: 'normal', title: '⚖️ Normaldir (11/7 veya 12/8 gibi)', desc: 'Ne düşük ne yüksek, standart aralıktadır', sys: 110, dia: 70 },
                  { id: 'high', title: '📈 Bazen Yüksek Çıkar (13/8 ve üzeri)', desc: 'Tansiyonum çabuk yükselir, dikkat ediyorum', sys: 125, dia: 80 }
                ].map(opt => `
                  <button onclick="selectBaselineBpCategory('${opt.id}', ${opt.sys}, ${opt.dia})"
                    class="w-full p-2.5 rounded-2xl border text-left transition ${u.baselineCategory === opt.id ? 'bg-emerald-500/25 border-emerald-400 text-white shadow-sm' : 'bg-black/30 border-white/10 text-white/70'}">
                    <div class="font-bold text-xs">${opt.title}</div>
                    <div class="text-[10px] text-white/60 mt-0.5">${opt.desc}</div>
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Soru 2: Kullanılan Vitamin ve İlaçlar -->
            <div class="p-3.5 bg-white/5 rounded-3xl border border-white/10 space-y-2">
              <label class="text-[11px] font-semibold text-amber-200 block">2. Şu an hangi vitaminleri veya ilaçları içiyorsun?</label>
              <p class="text-[10px] text-white/55">Seçtiklerini sana her gün doğru saatte hatırlatacağız:</p>
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

            <!-- Soru 3: Bugünlerdeki Şikayetler -->
            <div class="p-3.5 bg-white/5 rounded-3xl border border-white/10 space-y-2">
              <label class="text-[11px] font-semibold text-amber-200 block">3. Bugünlerde seni en çok ne yoruyor?</label>
              <div class="flex flex-wrap gap-1.5">
                ${[
                  'Hafif Bel Ağrısı', 'Mide Bulantısı / Yanması', 'Bacak Krampı',
                  'Akşam Yorgunluğu', 'Baş Dönmesi', 'Uyku Zorluğu', 'Çok Şükür İyiyim'
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

            <!-- Soru 4: Kan Grubu ve İsteğe Bağlı Boy/Kilo -->
            <div class="p-3.5 bg-white/5 rounded-3xl border border-white/10 space-y-2">
              <div class="flex justify-between items-center">
                <label class="text-[11px] font-semibold text-amber-200">4. Kan Grubun & Kilo Takibi</label>
                <span class="text-[9px] text-white/45">İsteğe Bağlı</span>
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div>
                  <span class="text-[9px] text-white/55 block mb-1">Kan Grubun</span>
                  <select onchange="updateProfileField('bloodGroup', this.value)"
                    class="w-full bg-black/40 border border-white/15 rounded-xl px-2 py-2 text-xs text-white">
                    ${['A Rh+', 'A Rh-', '0 Rh+', '0 Rh-', 'B Rh+', 'B Rh-', 'AB Rh+', 'AB Rh-', 'Bilmiyorum'].map(bg => `
                      <option value="${bg}" ${u.bloodGroup === bg ? 'selected' : ''}>${bg}</option>
                    `).join('')}
                  </select>
                </div>
                <div>
                  <span class="text-[9px] text-white/55 block mb-1">Başlangıç Kilon</span>
                  <input type="number" step="0.5" value="${u.startWeight || 58}"
                    oninput="silentUpdateField('user', 'startWeight', this.value)"
                    class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-white">
                </div>
                <div>
                  <span class="text-[9px] text-white/55 block mb-1">Şu Anki Kilon</span>
                  <input type="number" step="0.5" value="${u.currentWeight || 65}"
                    oninput="silentUpdateField('user', 'currentWeight', this.value)"
                    class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs text-amber-200 font-bold">
                </div>
              </div>
            </div>

          </div>
        ` : ''}

        ${step === 3 ? `
          <!-- ADIM 3: EŞ TANIMLAMA VE HASTANE / DOKTOR BİLGİLERİ (İSTEĞE BAĞLI, AKICI YAZILABİLİR) -->
          <div class="space-y-3">
            
            <!-- Eş / Baba Tanımlama Kartı -->
            <div class="p-4 bg-white/5 rounded-3xl border border-amber-400/30 space-y-3">
              <div class="flex justify-between items-center">
                <span class="font-bold text-amber-200 text-xs">🤝 Eş / Baba Tanımlama (İsteğe Bağlı)</span>
                <span class="text-[9px] text-white/50">Sonra da ekleyebilirsin</span>
              </div>

              <div class="grid grid-cols-2 gap-2.5">
                <div>
                  <label class="text-[10px] text-white/60 block mb-1">Eşinin Adı Soyadı</label>
                  <input type="text" value="${p.name}" placeholder="Örn: Oğuz Baltacıoğlu"
                    oninput="silentUpdateField('partner', 'name', this.value)"
                    class="w-full bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
                </div>
                <div>
                  <label class="text-[10px] text-white/60 block mb-1">Eşinin Kan Grubu</label>
                  <select onchange="updatePartnerField('bloodGroup', this.value)"
                    class="w-full bg-black/40 border border-white/20 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none">
                    ${['0 Rh+', '0 Rh-', 'A Rh+', 'A Rh-', 'B Rh+', 'B Rh-', 'AB Rh+', 'AB Rh-', 'Bilmiyorum'].map(bg => `
                      <option value="${bg}" ${p.bloodGroup === bg ? 'selected' : ''}>${bg}</option>
                    `).join('')}
                  </select>
                </div>
              </div>

              <!-- Kan Uyuşmazlığı Durumu -->
              <div class="p-2.5 rounded-2xl border ${m0.rhIncompatibility ? 'bg-rose-950/40 border-rose-400/50 text-rose-200' : 'bg-emerald-950/30 border-emerald-400/30 text-emerald-200'}">
                <div class="font-bold text-[11px]">${m0.rhStatusText}</div>
                <p class="text-[10px] text-white/80 mt-0.5 leading-relaxed">${m0.rhDetailText}</p>
              </div>
            </div>

            <!-- Hastane ve Doktor Bilgileri Kartı -->
            <div class="p-4 bg-white/5 rounded-3xl border border-emerald-400/30 space-y-2.5">
              <div class="flex justify-between items-center">
                <span class="font-bold text-emerald-200 text-xs">🏥 Hastane & Doktor Bilgisi (İsteğe Bağlı)</span>
                <span class="text-[9px] text-white/50">Randevu takibi için</span>
              </div>

              <div class="grid grid-cols-2 gap-2.5">
                <div>
                  <label class="text-[10px] text-white/60 block mb-1">Hastane / Klinik Adı</label>
                  <input type="text" value="${u.hospitalName || 'Manisa Şehir Hastanesi'}" placeholder="Hastane adı"
                    oninput="silentUpdateField('user', 'hospitalName', this.value)"
                    class="w-full bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
                </div>
                <div>
                  <label class="text-[10px] text-white/60 block mb-1">Doktorunun Adı</label>
                  <input type="text" value="${u.doctorName || 'Dr. Ayşe Yılmaz'}" placeholder="Doktor adı"
                    oninput="silentUpdateField('user', 'doctorName', this.value)"
                    class="w-full bg-black/40 border border-white/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
                </div>
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
            ‹ Üyelik Ekranı
          </button>
        `}

        ${step < 3 ? `
          <button onclick="setOnboardingStep(${step + 1})"
            class="flex-1 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 text-black font-bold text-xs rounded-2xl shadow-lg transition">
            Devam Et (Adım ${step + 1} / 3) ➔
          </button>
        ` : `
          <button onclick="finishOnboardingAndStartApp()"
            class="flex-1 py-3.5 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 text-black font-bold text-xs rounded-2xl shadow-lg transition">
            🌱 Bilgilerimi Kaydet ve Başla ➔
          </button>
        `}
      </div>

    </div>
  `;
}

// =========================================================================
// 8. MODÜL: PROFİLİM & FARKLI MENÜLER ALTINDA BİLGİLERİMİ GÜNCELLEME MERKEZİ
// Tüm <input> alanları silentUpdateField() kullanır; yazarken asla odak kaybolmaz!
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
            <h2 id="profileHeaderName" class="text-sm font-bold text-white leading-tight">${state.user.name}</h2>
            <p class="text-[10px] text-amber-200 font-medium mt-0.5"><span id="profileHeaderBaby">${state.baby.name}</span> (${curW}. Hafta) · ${state.auth && state.auth.email ? state.auth.email : 'Kayıtlı Üye'}</p>
            <div class="flex items-center space-x-1.5 mt-1">
              <span id="profileSyncBadge" class="px-2 py-0.5 bg-emerald-500/20 rounded-full text-[9px] text-emerald-200 border border-emerald-400/30">
                ${state.auth ? state.auth.syncStatus : 'Kaydedildi ✓'}
              </span>
              <button onclick="openOnboardingWizardAtStep(1)" class="px-2 py-0.5 bg-amber-500/20 hover:bg-amber-500/30 rounded-full text-[9px] text-amber-200 border border-amber-400/30 font-semibold">
                📋 Tanışma Anketi
              </button>
            </div>
          </div>
        </div>
        <button onclick="openAuthWelcomeFlow()" class="px-2.5 py-2 bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl text-[9px] text-white/85 font-semibold shrink-0 text-center leading-tight transition" title="Üye Ol / Giriş Ekranını Aç">
          🚪 Üyelik<br>/ Giriş
        </button>
      </div>

      <!-- 5 Ayrı Bilgi Güncelleme Menüsü -->
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

  // =========================================================================
  // MENÜ 1: BEN & BEBEĞİM (ANNE ADI/SOYADI, ÇOCUK İSMİ, KAÇINCI HAFTA)
  // =========================================================================
  if (sub === "identity") {
    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        
        <!-- Çocuk İsmi & Kaçıncı Haftada Olduğu Kartı -->
        <div class="p-4 bg-white/5 rounded-3xl border border-amber-400/30 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold text-amber-200 text-xs">👶 Bebeğimin İsmi ve Haftası</span>
              <p class="text-[10px] text-white/55">Rahatça yazıp güncelleyebilirsiniz</p>
            </div>
            <span class="px-2.5 py-1 bg-amber-500/20 text-amber-200 border border-amber-400/30 rounded-full text-[10px] font-bold">
              ${curW}. Hafta
            </span>
          </div>

          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label class="text-[10px] text-white/60 block mb-1">Bebeğimin İsmi / Hitabı</label>
              <input type="text" value="${b.name}"
                oninput="silentUpdateField('baby', 'name', this.value)"
                class="w-full bg-black/40 border border-amber-400/40 rounded-xl px-3 py-2 text-xs font-bold text-amber-200 focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/60 block mb-1">Tahmini Doğum Tarihi</label>
              <input type="text" value="${u.dueDate}"
                oninput="silentUpdateField('user', 'dueDate', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
          </div>

          <!-- Canlı Hafta Seçici -->
          <div class="space-y-2 bg-black/30 p-3 rounded-2xl border border-white/5">
            <div class="flex justify-between text-[10px] text-white/75">
              <span>Kaçıncı Haftadayım? (Kaydırarak Seç):</span>
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

        <!-- Kişisel Bilgilerim Kartı (Kesintisiz Yazılabilir Ad & Soyad) -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="font-bold text-white/95 text-xs">👩 Kişisel Bilgilerim</div>
          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Adım ve Soyadım</label>
              <input type="text" value="${u.name}"
                oninput="silentUpdateField('user', 'name', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Hitap Adım</label>
              <input type="text" value="${u.shortName}"
                oninput="silentUpdateField('user', 'shortName', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Yaşım</label>
              <input type="number" min="17" max="52" value="${u.age || 31}"
                oninput="silentUpdateField('user', 'age', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
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
          </div>

          <button onclick="saveProfileToBackend(true)"
            class="w-full py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 rounded-2xl text-emerald-200 font-bold text-xs transition">
            💾 Bilgilerimi Kaydet ve Güncelle ✓
          </button>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // MENÜ 2: HASTANE & DOKTOR BİLGİLERİ
  // =========================================================================
  if (sub === "hospital") {
    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        
        <div class="p-4 bg-white/5 rounded-3xl border border-emerald-400/30 space-y-3">
          <div>
            <span class="font-bold text-emerald-200 text-xs">🏥 Hastane ve Doktor Bilgilerim</span>
            <p class="text-[10px] text-white/55">Randevu takvimi ve doktor özet raporu bu bilgilere göre hazırlanır</p>
          </div>

          <div class="space-y-2.5">
            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">Gittiğim Hastane / Sağlık Kurumu</label>
              <input type="text" value="${u.hospitalName || 'Manisa Şehir Hastanesi'}"
                oninput="silentUpdateField('user', 'hospitalName', this.value)"
                class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-amber-400">
            </div>

            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">Beni Takip Eden Doktorum / Ebem</label>
              <input type="text" value="${u.doctorName || 'Dr. Ayşe Yılmaz'}"
                oninput="silentUpdateField('user', 'doctorName', this.value)"
                class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-xs font-bold text-white focus:outline-none focus:border-amber-400">
            </div>

            <div>
              <label class="text-[11px] font-semibold text-amber-200 block mb-1">Sıradaki Kontrol Randevu Tarihim</label>
              <input type="text" value="${u.nextCheckupDate || '10 Eylül 2026 · 14:30'}"
                oninput="silentUpdateField('user', 'nextCheckupDate', this.value)"
                class="w-full bg-black/40 border border-white/20 rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
          </div>

          <button onclick="saveProfileToBackend(true)"
            class="w-full py-2.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 rounded-2xl text-emerald-200 font-bold text-xs transition">
            💾 Hastane ve Doktor Bilgilerimi Kaydet ✓
          </button>
        </div>

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
  // MENÜ 3: EŞİM & DAVET KÖPRÜSÜ
  // =========================================================================
  if (sub === "partner") {
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
              <input type="text" value="${p.name}"
                oninput="silentUpdateField('partner', 'name', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
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
              <label class="text-[10px] text-white/55 block mb-1">Eşimin Telefonu (İsteğe Bağlı)</label>
              <input type="text" value="${p.phone}"
                oninput="silentUpdateField('partner', 'phone', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
            <div>
              <label class="text-[10px] text-white/55 block mb-1">Eşimin E-Postası (İsteğe Bağlı)</label>
              <input type="text" value="${p.email || 'oguz@tohum.app'}"
                oninput="silentUpdateField('partner', 'email', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400">
            </div>
          </div>

          <button onclick="saveProfileToBackend(true)"
            class="w-full py-2 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/40 rounded-xl text-emerald-200 font-bold text-[11px] transition">
            💾 Eş Bilgilerini Kaydet ✓
          </button>

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
        
        <div class="p-3.5 bg-gradient-to-br from-amber-950/45 via-white/5 to-white/5 rounded-3xl border border-amber-400/35 space-y-2">
          <div class="flex justify-between items-center">
            <span class="font-bold text-amber-200 text-xs">⚡ Hızlı Senaryo Testi</span>
            <button onclick="openOnboardingWizardAtStep(2)" class="text-[10px] text-emerald-300 underline font-semibold">
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
              <label class="text-[9px] text-white/50 block mb-1">Normal Büyük</label>
              <input type="number" min="75" max="135" value="${u.baselineSys}" onchange="updateProfileField('baselineSys', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-emerald-300">
            </div>
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Normal Küçük</label>
              <input type="number" min="45" max="90" value="${u.baselineDia}" onchange="updateProfileField('baselineDia', this.value)"
                class="w-full bg-black/40 border border-white/15 rounded-xl px-2.5 py-2 text-xs font-bold text-emerald-300">
            </div>
            <div>
              <label class="text-[9px] text-white/50 block mb-1">Normal Nabzım</label>
              <input type="number" min="50" max="110" value="${u.baselineHR || 72}" oninput="silentUpdateField('user', 'baselineHR', this.value)"
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

        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <span class="font-bold text-white/95 text-xs">⚖️ Boyum ve Kilom (İsteğe Bağlı)</span>
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
      
      <div class="p-4 bg-gradient-to-r from-amber-950/45 to-emerald-950/35 rounded-3xl border border-amber-400/40 space-y-2.5">
        <div class="font-bold text-amber-200 text-xs">🚪 Üyelik, Giriş ve İlk Kurulum Sihirbazı</div>
        <p class="text-[10px] text-white/75 leading-relaxed">
          Uygulamayı yeni indiren bir annenin gördüğü <b>Üye Ol / Google Giriş Ekranını</b> ve <b>3 Adımlı Kısa Tanışma Anketini</b> istediğiniz an buradan açabilirsiniz:
        </p>
        <div class="grid grid-cols-2 gap-2">
          <button onclick="openAuthWelcomeFlow()"
            class="py-2.5 px-3 bg-white text-gray-900 font-bold text-[11px] rounded-2xl shadow-md">
            🔵 Üye Ol / Giriş Ekranı
          </button>
          <button onclick="openOnboardingWizardAtStep(1)"
            class="py-2.5 px-3 bg-amber-500/25 border border-amber-400/40 text-amber-200 font-bold text-[11px] rounded-2xl">
            📋 3 Adımlı Anketi Aç
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

    </div>
  `;
}

// =========================================================================
// KESİNTİSİZ YAZMA (ODAK KAYBETMEYEN INPUT) VE ÜYELİK / GOOGLE HANDLER'LARI
// =========================================================================
window.silentUpdateField = function(targetObj, field, val) {
  if (targetObj === "user") {
    if (field === "age" || field === "baselineHR" || field === "heightCm") {
      const n = parseInt(val, 10);
      if (!isNaN(n)) state.user[field] = n;
    } else if (field === "startWeight" || field === "currentWeight") {
      const f = parseFloat(val);
      if (!isNaN(f)) state.user[field] = f;
    } else {
      state.user[field] = val;
      if (field === "name" && val.trim()) {
        const parts = val.trim().split(" ");
        state.user.shortName = parts[0];
        const hdr = document.getElementById("profileHeaderName");
        if (hdr) hdr.textContent = val;
      }
    }
  } else if (targetObj === "baby") {
    state.baby[field] = val;
    const bhdr = document.getElementById("profileHeaderBaby");
    if (bhdr) bhdr.textContent = val;
  } else if (targetObj === "partner") {
    state.partner[field] = val;
    if (field === "name" && val.trim()) {
      state.partner.shortName = val.trim().split(" ")[0];
    }
  }
  saveState();
};

window.silentUpdateAuthName = function() {
  const fEl = document.getElementById("regFirstNameInput");
  const lEl = document.getElementById("regLastNameInput");
  const fVal = fEl ? fEl.value : (state.auth.firstName || "");
  const lVal = lEl ? lEl.value : (state.auth.lastName || "");
  state.auth.firstName = fVal;
  state.auth.lastName = lVal;
  const full = `${fVal.trim()} ${lVal.trim()}`.trim();
  if (full) {
    state.user.name = full;
    state.user.shortName = fVal.trim() || full.split(" ")[0];
  }
  saveState();
};

window.switchAuthModeTab = function(tabName) {
  if (!state.auth) state.auth = {};
  state.auth.authTab = tabName;
  state.auth.authError = "";
  triggerHaptic(10);
  render();
};

window.openGoogleAccountModal = function() {
  if (!state.auth) state.auth = {};
  state.auth.googleModalOpen = true;
  triggerHaptic(15);
  render();
};

window.closeGoogleAccountModal = function() {
  if (!state.auth) state.auth = {};
  state.auth.googleModalOpen = false;
  render();
};

window.completeGoogleAuth = function(firstName, lastName, email, nextScreen) {
  if (!state.auth) state.auth = {};
  state.auth.googleModalOpen = false;
  state.auth.provider = "google";
  state.auth.isAuthenticated = true;
  state.auth.firstName = firstName;
  state.auth.lastName = lastName;
  state.auth.email = email;
  const full = `${firstName} ${lastName}`.trim();
  if (full) {
    state.user.name = full;
    state.user.shortName = firstName || full.split(" ")[0];
  }
  state.auth.screen = nextScreen || "onboarding";
  state.auth.onboardingStep = 1;
  triggerHaptic([20, 40]);
  saveProfileToBackend(false);
  render();
};

window.completeCustomGoogleAuth = function() {
  const fEl = document.getElementById("googleCustomFirst");
  const lEl = document.getElementById("googleCustomLast");
  const eEl = document.getElementById("googleCustomEmail");
  const f = (fEl ? fEl.value : state.auth.firstName || "Buse Nur").trim();
  const l = (lEl ? lEl.value : state.auth.lastName || "").trim();
  const e = (eEl ? eEl.value : state.auth.email || "anne@gmail.com").trim();
  window.completeGoogleAuth(f || "Anne", l, e || "anne@gmail.com", "onboarding");
};

window.submitEmailRegistration = function() {
  window.silentUpdateAuthName();
  const eEl = document.getElementById("regEmailInput");
  const pEl = document.getElementById("regPasswordInput");
  if (eEl) state.auth.email = eEl.value.trim();
  if (pEl) state.auth.password = pEl.value;

  if (!state.user.name || !state.auth.email) {
    state.auth.authError = "Lütfen adınızı ve e-posta adresinizi girin.";
    render();
    return;
  }
  state.auth.authError = "";
  state.auth.isAuthenticated = true;
  state.auth.screen = "onboarding";
  state.auth.onboardingStep = 1;
  triggerHaptic([20, 40]);
  saveProfileToBackend(false);
  render();
};

window.submitEmailLogin = function() {
  const eEl = document.getElementById("loginEmailInput");
  if (eEl && eEl.value.trim()) state.auth.email = eEl.value.trim();
  state.auth.authError = "";
  state.auth.isAuthenticated = true;
  state.auth.screen = "app";
  state.currentTab = "home";
  triggerHaptic([20, 40]);
  saveProfileToBackend(false);
  render();
};

window.setBabyNicknameQuick = function(nick) {
  state.baby.name = nick;
  saveState();
  render();
};

window.saveProfileToBackend = function(showFeedback) {
  saveState();
  if (typeof fetch !== "undefined") {
    fetch("/api/profile/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: (state.auth && state.auth.userId) || "buse_founder",
        email: (state.auth && state.auth.email) || "busenur.baltacioglu@gmail.com",
        user: state.user,
        baby: { name: state.baby.name, week: state.baby.week, daysLeft: state.baby.daysLeft },
        partner: state.partner
      })
    })
      .then(r => r.json())
      .then(() => {
        if (state.auth) state.auth.syncStatus = "Sunucuya Kaydedildi ✓";
        const bdg = document.getElementById("profileSyncBadge");
        if (bdg) bdg.textContent = "Kaydedildi ✓";
        if (showFeedback) {
          triggerHaptic([20, 30]);
          triggerReaction("folic", "Bilgileriniz başarıyla kaydedildi.");
          render();
        }
      })
      .catch(() => {});
  }
};

window.openAuthWelcomeFlow = function() {
  if (!state.auth) state.auth = { isAuthenticated: false, screen: "login", authTab: "register", onboardingStep: 1 };
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
  state.auth.onboardingStep = Math.max(1, Math.min(3, stepNum));
  triggerHaptic(15);
  saveProfileToBackend(false);
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
};

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

code = code[:idx_s] + new_block + code[idx_e:]

with open(path, "w", encoding="utf-8") as f:
    f.write(code)

idx_path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\index.html"
with open(idx_path, "r", encoding="utf-8") as f:
    ih = f.read()
ih = ih.replace("app.js?v=v23_fullstack_onboarding", "app.js?v=v24_smooth_auth_no_location")
with open(idx_path, "w", encoding="utf-8") as f:
    f.write(ih)

print("Successfully updated Auth (Register/Login + Google Modal), removed intrusive location questions, and fixed input focus loss via silentUpdateField!")
