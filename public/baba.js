// =========================================================================
// TOHUM BABA - BAĞIMSIZ BABA VE EŞ KORUYUCU EKOSİSTEMİ
// Oğuz Ürem · Ürem Ailesi · Manisa / Yunusemre / Muradiye
// 31. Gebelik Haftası · Bebek: Güneş · Anne: Buse Nur Ürem
// Anne portalına geçiş yoktur; baba tamamen kendi bağımsız portalında yaşar.
// =========================================================================

// Güvenli HTML Escape Fonksiyonu (XSS Koruması)
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
window.escapeHtml = escapeHtml;

const initialHospitalBag = [
  // ANNE İÇİN (6 Öğe - 5 Hazır)
  { id: "a1", cat: "anne", label: "Doğum geceliği & pamuklu lohusa pijaması (önden düğmeli)", checked: true },
  { id: "a2", cat: "anne", label: "Rahat kaydırmaz terlik & sıcak tutan pamuklu çoraplar", checked: true },
  { id: "a3", cat: "anne", label: "Emzirme sütyeni & emzirme atleti (2 adet)", checked: true },
  { id: "a4", cat: "anne", label: "Organik göğüs pedi & Lanolin göğüs ucu bakım kremi", checked: true },
  { id: "a5", cat: "anne", label: "Lohusa pedi & tek kullanımlık yüksek bel pamuklu külotlar", checked: true },
  { id: "a6", cat: "anne", label: "Dudak nemlendirici (lip balm) & ferahlatıcı termal sprey", checked: false },

  // BEBEK / GÜNEŞ İÇİN (6 Öğe - 5 Hazır)
  { id: "b1", cat: "bebek", label: "Yenidoğan hastane çıkış seti (zıbın, tulum, şapka, eldiven - 2 takım)", checked: true },
  { id: "b2", cat: "bebek", label: "Pamuklu çıtçıtlı body / iç zıbın (3 adet)", checked: true },
  { id: "b3", cat: "bebek", label: "Müslin kundak örtüleri & organik pamuk gaz tülbentleri (4 adet)", checked: true },
  { id: "b4", cat: "bebek", label: "Yenidoğan organik bebek bezi (1 paket) & saf su ıslak mendil", checked: true },
  { id: "b5", cat: "bebek", label: "Maxi-Cosi Isofix güvenli oto koltuğu (araca monte edilmiş)", checked: true },
  { id: "b6", cat: "bebek", label: "Yumuşak pamuklu & örgü bebek battaniyesi", checked: false },

  // BABA & EVRAKLAR (6 Öğe - 4 Hazır)
  { id: "c1", cat: "baba", label: "Kimlik kartları (Buse & Oğuz) ve Aile Cüzdanı", checked: true },
  { id: "c2", cat: "baba", label: "Manisa Şehir Hastanesi gebelik dosyası, testler & kan grubu kartları", checked: true },
  { id: "c3", cat: "baba", label: "SGK / Özel Sağlık Sigortası poliçe ve provizyon evrakları", checked: true },
  { id: "c4", cat: "baba", label: "Telefon şarj cihazları (2m uzun kablo) & 20.000 mAh Powerbank", checked: true },
  { id: "c5", cat: "baba", label: "Baba için rahat yedek t-shirt, polar hırka ve eşofman", checked: false },
  { id: "c6", cat: "baba", label: "Acil enerji atıştırmalıkları (hurma, badem, ceviz) & sıcak çelik termos", checked: false }
];

function loadHospitalBagFromStorage() {
  try {
    const saved = localStorage.getItem("tohum_baba_hospital_bag_v2");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Hospital bag storage read error:", e);
  }
  return JSON.parse(JSON.stringify(initialHospitalBag));
}

function saveHospitalBagToStorage(items) {
  try {
    localStorage.setItem("tohum_baba_hospital_bag_v2", JSON.stringify(items));
  } catch (e) {
    console.warn("Hospital bag storage write error:", e);
  }
}

const babaState = {
  activeTab: "analysis", // 'analysis' | 'home' | 'guide' | 'kovan' | 'profile'
  bagFilter: "all",      // 'all' | 'anne' | 'bebek' | 'baba'
  hospitalBag: loadHospitalBagFromStorage(),
  user: {
    name: "Oğuz Ürem",
    shortName: "Oğuz",
    role: "Baba & Koruyucu Eş",
    bloodGroup: "0 Rh+",
    pairingCode: "THM-31G-UREM",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    city: "Manisa",
    district: "Yunusemre",
    neighborhood: "Muradiye",
    pairedWith: "Buse Nur Ürem"
  },
  mother: {
    name: "Buse Nur Ürem",
    shortName: "Buse",
    bloodGroup: "A Rh-",
    baselineBP: "90/60",
    latestBP: { systolic: 92, diastolic: 62 },
    waterCount: 4,
    waterTarget: 8,
    magnesiumTaken: false,
    massageCompleted: false,
    selectedMood: "tired"
  },
  baby: {
    name: "Güneş",
    week: 31,
    weight: "1.650 gr",
    height: "41.5 cm",
    sizeComparison: "Boyut: 41.5 cm · Bir Ananas Hacminde",
    bpm: 142,
    daysLeft: 63,
    edd: "12 Ocak 2027"
  },
  emergencyLogistics: {
    hospital: "Manisa Şehir Hastanesi",
    doctor: "Op. Dr. Ayşe Yılmaz",
    phone: "02362292600",
    displayPhone: "0 (236) 229 26 00",
    distance: "14.2 km · ~19 dakika",
    route: "Muradiye -> Menemen Yolu -> Manisa Çevre Yolu -> Şehir Hastanesi Acil Doğumhane"
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
  ],
  kovanItems: [
    {
      id: 1,
      title: "Maxi-Cosi Isofix Bazalı Yenidoğan Oto Koltuğu",
      user: "Mehmet",
      bio: "Muradiye · 1 Yaş Baba",
      dist: "500m",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
      type: "gift",
      desc: "Kazasız, tertemiz durumda; ihtiyacı olan bir babaya hediye etmek isterim."
    },
    {
      id: 2,
      title: "Doğum & Hastane Lojistik Kabin Bavulu",
      user: "Can",
      bio: "Güzelyurt · 2. Baba",
      dist: "1.4km",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
      type: "trade",
      desc: "Geniş bölmeli doğum lojistik çantası ve acil termos."
    },
    {
      id: 3,
      title: "Bebek Arabası Yağmurluk & Sineklik Takımı",
      user: "Burak",
      bio: "Muradiye · Baba Adayı",
      dist: "1.8km",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80",
      type: "gift",
      desc: "Kullanılmamış puset koruyucu aksesuarlar."
    }
  ],
  kovanMessages: [
    { sender: "Mehmet (Muradiye)", text: "Beyler eşimin 31. haftasındayız, akşamları çok çabuk yoruluyor. Sol yan yatışta sırtına yastık koymak gerçekten çok rahatlatıyor.", time: "12:10", isMe: false },
    { sender: "Oğuz", text: "Selam Mehmet, bizde de 31. hafta. Sistemden Buse'nin hidrasyon ve bel yükü analizine bakıp destek oluyorum, çok faydalı oluyor.", time: "12:20", isMe: true },
    { sender: "Can", text: "Oto koltuğunu şimdiden arabaya monte edip denediniz mi beyler? Doğum günü telaşında pratiklik şart.", time: "12:35", isMe: false }
  ]
};

// 10 DAKİKALIK MASAJ ZAMANLAYICISI YÖNETİMİ
let massageTimerInterval = null;
let massageTimerSeconds = 600;
let massageTimerRunning = false;

window.toggleMassageTimer = function() {
  if (massageTimerRunning) {
    clearInterval(massageTimerInterval);
    massageTimerRunning = false;
    showCalmToast("Zamanlayıcı Duraklatıldı", "Masaj desteğini sürdürebilirsiniz.", "⏸");
    renderBabaApp();
  } else {
    massageTimerRunning = true;
    showCalmToast("10 Dk Masaj Başlatıldı", "Buse'ye sol yan pozisyonda hafif bel ve sakrum desteği uygulayın.", "🌿");
    renderBabaApp();
    massageTimerInterval = setInterval(() => {
      if (massageTimerSeconds > 0) {
        massageTimerSeconds--;
        const timerEl = document.getElementById("massageTimerDisplay");
        if (timerEl) {
          const m = Math.floor(massageTimerSeconds / 60);
          const s = massageTimerSeconds % 60;
          timerEl.textContent = `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
        }
      } else {
        clearInterval(massageTimerInterval);
        massageTimerRunning = false;
        massageTimerSeconds = 600;
        window.completeFatherAction('massage');
      }
    }, 1000);
  }
};

// CALM TECH TOAST / HAPTİK BİLDİRİM MOTORU
window.showCalmToast = function(title, message, icon = "🌿") {
  let toastEl = document.getElementById("babaToastContainer");
  if (!toastEl) {
    toastEl = document.createElement("div");
    toastEl.id = "babaToastContainer";
    toastEl.className = "fixed top-4 inset-x-4 max-w-sm mx-auto z-50 pointer-events-none transition-all duration-300 transform opacity-0 -translate-y-4";
    document.body.appendChild(toastEl);
  }

  toastEl.innerHTML = `
    <div class="bg-[#121915]/95 border border-emerald-400/40 text-white rounded-2xl p-3 shadow-[0_10px_30px_rgba(0,0,0,0.85)] backdrop-blur-xl flex items-center space-x-3 pointer-events-auto">
      <div class="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 text-sm font-bold shrink-0">
        ${icon}
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-xs font-semibold text-emerald-200">${title}</div>
        <div class="text-[11px] text-white/80 truncate">${message}</div>
      </div>
    </div>
  `;

  requestAnimationFrame(() => {
    toastEl.classList.remove("opacity-0", "-translate-y-4");
    toastEl.classList.add("opacity-100", "translate-y-0");
  });

  if (window._babaToastTimeout) clearTimeout(window._babaToastTimeout);
  window._babaToastTimeout = setTimeout(() => {
    toastEl.classList.remove("opacity-100", "translate-y-0");
    toastEl.classList.add("opacity-0", "-translate-y-4");
  }, 3200);
};

// TOHUM ANNE İHTİYAÇ ANALİZ MOTORU
function getMaternalAnalysis() {
  const cards = [];
  const waterDeficit = Math.max(0, babaState.mother.waterTarget - babaState.mother.waterCount);

  // 1. Amniyotik Hidrasyon
  if (waterDeficit > 0) {
    cards.push({
      id: "water",
      category: "Amniyotik Hidrasyon",
      badge: `${waterDeficit} Bardak Açık`,
      badgeColor: "text-sky-300 bg-sky-950/60 border-sky-400/30",
      headline: "Amniyotik Döngü İçin Hidrasyon Desteği Gerekiyor",
      insight: `Buse bugün ${babaState.mother.waterCount}/${babaState.mother.waterTarget} bardak su tüketti. 31. haftada amniyotik sıvı her 3 saatte bir tamamen yenilenir. Sıvı eksikliği plasental perfüzyonu ve Güneş'in hareket alanını etkileyebilir.`,
      actionTitle: "Buse'ye 1 bardak ılık su götürün",
      actionType: "water",
      buttonText: "Ilık Su Götürdüm",
      completed: false
    });
  } else {
    cards.push({
      id: "water",
      category: "Amniyotik Hidrasyon",
      badge: "Tam Dengede",
      badgeColor: "text-emerald-300 bg-emerald-950/60 border-emerald-400/30",
      headline: "Amniyotik Sıvı Mükemmel Seviyede",
      insight: `Buse bugün ${babaState.mother.waterCount} bardak su tüketimini tamamladı. Güneş'in amniyotik yaşam havuzu taze ve dengeli.`,
      actionTitle: "Hidrasyon dengelendi, dinlenmeye eşlik edin",
      actionType: "water",
      buttonText: "Su İkramı Yapıldı",
      completed: true
    });
  }

  // 2. Biomekanik & Lomber Yük
  const isMassageDone = babaState.mother.massageCompleted;
  cards.push({
    id: "massage",
    category: "Biomekanik & Lomber Yük",
    badge: isMassageDone ? "Lomber Yük Hafifletildi" : "Pelvis Yükü Yüksek",
    badgeColor: isMassageDone ? "text-emerald-300 bg-emerald-950/60 border-emerald-400/30" : "text-amber-300 bg-amber-950/60 border-amber-400/30",
    headline: "31. Hafta Ağırlık Merkezi Değişimi & Bel Hassasiyeti",
    insight: "31. haftada Güneş'in 1600 gramı aşan ağırlığı annenin sakroiliak eklemlerine baskı yapar. Buse akşam yorgunluğu ve bel hassasiyeti hissettiğini kaydetti. Sol yan pozisyonda destek ve 10 dk hafif bel masajı pelvis gerilimini çözer.",
    actionTitle: "Buse'yi sol yan yatışa geçirin, diz arasına destek yastığı koyun ve 10 dk hafif bel masajı uygulayın",
    actionType: "massage",
    buttonText: "Bel Desteği Sağladım",
    completed: isMassageDone,
    hasTimer: true
  });

  // 3. Kardiyovasküler Bazal
  cards.push({
    id: "cardio",
    category: "Kardiyovasküler Bazal",
    badge: "90/60 Bazal İle Uyumlu",
    badgeColor: "text-emerald-300 bg-emerald-950/60 border-emerald-400/30",
    headline: `Son Ölçüm: ${babaState.mother.latestBP.systolic}/${babaState.mother.latestBP.diastolic} mmHg`,
    insight: "Buse'nin sistolik ve diyastolik değerleri kendi doğal 90/60 bazal koridoru içinde seyrediyor. 90/60 Buse için hipotansiyon değil, sakin fizyolojik normdur. Anne kardiyak açıdan huzurlu ve güvende.",
    actionTitle: "Ortamın sakinliğini ve loş ışığını koruyun",
    actionType: "cardio",
    buttonText: "Dinginlik Sağlandı",
    completed: true
  });

  // 4. DMT1 Magnezyum Saati
  const isMagDone = babaState.mother.magnesiumTaken;
  cards.push({
    id: "magnesium",
    category: "DMT1 Mineral Zamanlaması",
    badge: isMagDone ? "Alındı" : "Saat 21:30 Bekleniyor",
    badgeColor: isMagDone ? "text-emerald-300 bg-emerald-950/60 border-emerald-400/30" : "text-amber-300 bg-amber-950/60 border-amber-400/30",
    headline: "Magnimore Plus (Magnezyum Saşe - 21:30)",
    insight: "Demir ve kalsiyum ile yarışmaması için magnezyum akşam tok karnına (21:30) alınmalıdır. Gece bacak kramplarını ve miyometriyal rahim gerginliğini engeller.",
    actionTitle: "Saat 21:30'da magnezyum saşesini 1 bardak ılık suyla karıştırıp Buse'ye ikram edin",
    actionType: "magnesium",
    buttonText: "Magnezyumu Hazırladım",
    completed: isMagDone
  });

  return cards;
}

// BABA ŞEFKATLİ DESTEK EYLEMİ TAMAMLAMA
window.completeFatherAction = async function(actionType) {
  let title = "Şefkatli Destek";
  let toastMsg = "Oğuz Buse'nin ihtiyacına yönelik şefkatli desteği tamamladı.";

  if (actionType === "water") {
    babaState.mother.waterCount = Math.min(babaState.mother.waterTarget, babaState.mother.waterCount + 1);
    title = "Amniyotik Hidrasyon Desteği";
    toastMsg = `Buse'ye 1 bardak ılık su götürüldü. Günlük hidrasyon: ${babaState.mother.waterCount}/${babaState.mother.waterTarget} bardak.`;
  } else if (actionType === "massage") {
    babaState.mother.massageCompleted = true;
    if (massageTimerRunning) {
      clearInterval(massageTimerInterval);
      massageTimerRunning = false;
      massageTimerSeconds = 600;
    }
    title = "Lomber Pelvis Rahatlatma";
    toastMsg = "10 dk sol yan pozisyonda hafif bel ve sakrum desteği sağlandı.";
  } else if (actionType === "magnesium") {
    babaState.mother.magnesiumTaken = true;
    title = "DMT1 Magnezyum Desteği";
    toastMsg = "Magnimore Plus magnezyumu ılık suyla hazırlanarak Buse'ye ikram edildi.";
  } else if (actionType === "cardio") {
    title = "Kardiyovasküler Dinginlik";
    toastMsg = "Ortam loşlaştırıldı ve kardiyak dinginlik sağlandı.";
  }

  showCalmToast(title, toastMsg, "✓");

  if (navigator.vibrate) {
    try { navigator.vibrate([25, 45, 25]); } catch(e) {}
  }

  const now = new Date();
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  babaState.liveFeed.unshift({
    id: Date.now(),
    time: timeStr,
    type: "care_completed",
    title: title,
    text: toastMsg
  });

  renderBabaApp();

  try {
    const res = await fetch('/api/partner/care-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: actionType })
    });
    if (!res.ok) {
      console.warn("Care action sync note: server returned status", res.status);
    }
  } catch (err) {
    console.warn("Care action sync offline:", err);
  }
};

// SES KÖPRÜSÜ & AKUSTİK FREKANS REZONANSI
window.playFatherVoice = function() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(110, ctx.currentTime); // 110 Hz derin pes ses tınısı
      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.onended = () => {
        try { ctx.close(); } catch(e) {}
      };
      osc.start();
      osc.stop(ctx.currentTime + 2.3);
    }
  } catch (e) {
    console.log("AudioContext note:", e);
  }

  showCalmToast(
    "Akustik Ses Köprüsü Aktif",
    "Oğuz'un 110 Hz pes frekansı amniyotik sıvıya rezonansla iletildi. Güneş ritmik kıpırtıyla yanıt verdi.",
    "♡"
  );

  babaState.liveFeed.unshift({
    id: Date.now(),
    time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    type: "acoustic_resonance",
    title: "Akustik Ses Köprüsü",
    text: "Oğuz'un pes ses frekansı Güneş'e dinletildi. Ritmik güven bağı güçlendi."
  });
};

// HASTANE ÇANTASI ÖĞE SEÇİMİ
window.toggleBagItem = function(id) {
  const item = babaState.hospitalBag.find(i => i.id === id);
  if (!item) return;
  item.checked = !item.checked;
  saveHospitalBagToStorage(babaState.hospitalBag);
  if (navigator.vibrate) {
    try { navigator.vibrate(12); } catch(e) {}
  }
  const doneCount = babaState.hospitalBag.filter(i => i.checked).length;
  const totalCount = babaState.hospitalBag.length;
  showCalmToast(
    item.checked ? "Çantaya Eklendi" : "Hazırlık Güncellendi",
    `${item.label.slice(0, 30)}... (${doneCount}/${totalCount} Hazır)`,
    item.checked ? "✓" : "○"
  );
  renderBabaApp();
};

window.setBagFilter = function(filter) {
  babaState.bagFilter = filter;
  renderBabaApp();
};

window.copyPairingCode = function() {
  const code = babaState.user.pairingCode || "THM-31G-UREM";
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => {
      showCalmToast("Eşleşme Kodu Kopyalandı", `${code} panoya kaydedildi.`, "✓");
    }).catch(() => {
      showCalmToast("Eşleşme Kodu", code, "📋");
    });
  } else {
    showCalmToast("Eşleşme Kodu", code, "📋");
  }
};

window.setBabaTab = function(tabId) {
  babaState.activeTab = tabId;
  renderBabaApp();
};

window.sendBabaKovanMessage = function() {
  const inp = document.getElementById("babaKovanMsgInput");
  if (!inp || !inp.value.trim()) return;
  // Savunma: Maksimum 400 karakter sınırlaması ve trim
  const text = inp.value.trim().slice(0, 400);
  babaState.kovanMessages.push({
    sender: "Oğuz",
    text: text,
    time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    isMe: true
  });
  inp.value = "";
  showCalmToast("Babalar Ocağı", "Mesajınız gruptaki babalarla paylaşıldı.", "▦");
  renderBabaApp();
};

window.sendBabaNeighborMessage = function(userName) {
  const safeUser = String(userName || "Komşu Baba").slice(0, 50);
  const text = prompt(`${safeUser} komşunuza iletmek istediğiniz mesaj:`, "Merhaba, paylaştığınız eşya ile ilgileniyorum. Durumu hakkında görüşebilir miyiz?");
  if (!text || !text.trim()) return;
  const cleanMsg = text.trim().slice(0, 400);
  babaState.kovanMessages.push({
    sender: "Oğuz",
    text: `[@${safeUser}]: ${cleanMsg}`,
    time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    isMe: true
  });
  showCalmToast("Özel Mesaj İletildi", `${safeUser} adlı babaya mesajınız aktarıldı.`, "💬");
  renderBabaApp();
};

// ANA RENDER FONKSİYONU
function renderBabaApp() {
  const root = document.getElementById("babaRoot");
  if (!root) return;

  const analysisCards = getMaternalAnalysis();
  const curW = babaState.baby.week;

  root.innerHTML = `
    <!-- Top Header (Calm Tech Dark Green) -->
    <header style="padding-top: max(14px, env(safe-area-inset-top, 14px))" class="px-5 pb-2.5 flex justify-between items-center absolute top-0 inset-x-0 z-40 bg-gradient-to-b from-[#080A09]/95 via-[#080A09]/80 to-transparent text-white border-b border-white/5">
      <div class="flex items-center space-x-2.5">
        <img src="${babaState.user.avatar}" class="w-9 h-9 rounded-full object-cover border border-amber-300/40 shadow-sm">
        <div>
          <div class="text-xs font-serif font-semibold text-white/95 tracking-wide">ToHUM Baba Portali</div>
          <div class="text-[10px] text-white/50">${babaState.user.name} · ${babaState.baby.name} (${curW}. Hafta)</div>
        </div>
      </div>
      <div class="flex items-center space-x-1.5">
        <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
        <span class="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-[10px] text-emerald-200 font-medium tracking-wide">
          Bağımsız Eş Sistemi
        </span>
      </div>
    </header>

    <!-- Content Area -->
    <main class="flex-1 w-full h-full pt-16 pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] px-4 overflow-y-auto space-y-3.5 text-white">
      ${renderBabaTabContent(analysisCards)}
    </main>

    <!-- Bottom Navigation -->
    <nav style="padding-bottom: env(safe-area-inset-bottom, 0px)" class="absolute bottom-0 inset-x-0 z-50 h-[calc(4rem+env(safe-area-inset-bottom,0px))] bg-[#0B0F0D]/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around px-2 shadow-2xl">
      <button onclick="setBabaTab('analysis')" class="flex flex-col items-center justify-center space-y-1 px-3 py-1.5 rounded-xl transition ${babaState.activeTab === 'analysis' ? 'text-amber-300 font-semibold' : 'text-white/40 hover:text-white/70'}">
        <span class="text-lg">◎</span>
        <span class="text-[10px]">Analiz</span>
      </button>
      <button onclick="setBabaTab('home')" class="flex flex-col items-center justify-center space-y-1 px-3 py-1.5 rounded-xl transition ${babaState.activeTab === 'home' ? 'text-amber-300 font-semibold' : 'text-white/40 hover:text-white/70'}">
        <span class="text-lg">♡</span>
        <span class="text-[10px]">Güneş</span>
      </button>
      <button onclick="setBabaTab('guide')" class="flex flex-col items-center justify-center space-y-1 px-3 py-1.5 rounded-xl transition ${babaState.activeTab === 'guide' ? 'text-amber-300 font-semibold' : 'text-white/40 hover:text-white/70'}">
        <span class="text-lg">🛡️</span>
        <span class="text-[10px]">Rehber</span>
      </button>
      <button onclick="setBabaTab('kovan')" class="flex flex-col items-center justify-center space-y-1 px-3 py-1.5 rounded-xl transition ${babaState.activeTab === 'kovan' ? 'text-amber-300 font-semibold' : 'text-white/40 hover:text-white/70'}">
        <span class="text-lg">▦</span>
        <span class="text-[10px]">Kovan</span>
      </button>
      <button onclick="setBabaTab('profile')" class="flex flex-col items-center justify-center space-y-1 px-3 py-1.5 rounded-xl transition ${babaState.activeTab === 'profile' ? 'text-amber-300 font-semibold' : 'text-white/40 hover:text-white/70'}">
        <span class="text-lg">👤</span>
        <span class="text-[10px]">Profil</span>
      </button>
    </nav>
  `;
}

function renderBabaTabContent(analysisCards) {
  if (babaState.activeTab === "analysis") {
    const isTimerActive = massageTimerRunning;
    const mLeft = Math.floor(massageTimerSeconds / 60);
    const sLeft = massageTimerSeconds % 60;
    const timeFormatted = `${mLeft.toString().padStart(2, '0')}:${sLeft.toString().padStart(2, '0')}`;

    return `
      <!-- Bilgi Kutusu: Anne İstek Bildirmez, Sistem Analiz Eder -->
      <div class="p-3.5 bg-gradient-to-r from-emerald-950/40 to-slate-900/60 rounded-2xl border border-emerald-500/20 text-[11px] space-y-1 shadow-sm">
        <div class="flex items-center space-x-2">
          <span class="text-amber-300 text-xs">🌿</span>
          <span class="font-semibold text-amber-200">ToHUM Anne İhtiyaç Analiz Motoru</span>
        </div>
        <p class="text-white/70 leading-relaxed text-[10px]">
          Buse uygulamadan doğrudan istek bildirmez; sistemimiz Buse'nin biyometrik, fizyolojik ve anket verilerini analiz ederek size özel şefkatli aksiyon kartları hazırlar.
        </p>
      </div>

      <!-- TOHUM AKILLI ANNE İHTİYAÇ ANALİZİ KARTLARI -->
      <div class="space-y-2.5">
        <div class="flex justify-between items-center px-1">
          <span class="text-xs font-semibold text-white/90">Buse İçin Günlük İhtiyaç Analizi</span>
          <span class="text-[10px] text-amber-200/80">${babaState.baby.week}. Hafta · 3. Trimester</span>
        </div>

        ${analysisCards.map(card => `
          <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-2.5 transition hover:bg-white/[0.07] backdrop-blur-sm">
            <div class="flex justify-between items-center">
              <span class="text-[11px] font-bold text-white/95">${card.category}</span>
              <span class="text-[9px] px-2 py-0.5 rounded-full border ${card.badgeColor}">
                ${card.badge}
              </span>
            </div>
            <div class="text-[11px] font-medium text-amber-200/90">${card.headline}</div>
            <p class="text-[10px] text-white/70 leading-relaxed">${card.insight}</p>

            ${card.id === 'massage' && !card.completed ? `
              <!-- 10 Dk Masaj Zamanlayıcısı Kartı -->
              <div class="p-2.5 bg-black/40 rounded-xl border border-amber-400/20 flex items-center justify-between text-[10px]">
                <div class="flex items-center space-x-2">
                  <span class="text-amber-300 text-xs ${isTimerActive ? 'animate-pulse' : ''}">⏱</span>
                  <div>
                    <div class="font-medium text-amber-200">10 Dk Bel & Pelvis Masajı</div>
                    <div class="text-white/50 text-[9px]">Sol yan pozisyonda ritmik dokunuş</div>
                  </div>
                </div>
                <div class="flex items-center space-x-2">
                  <span id="massageTimerDisplay" class="font-mono text-amber-300 text-xs font-bold px-2 py-1 bg-amber-500/10 rounded-lg border border-amber-400/30">
                    ${timeFormatted}
                  </span>
                  <button onclick="toggleMassageTimer()" class="px-2.5 py-1 ${isTimerActive ? 'bg-rose-500/20 border-rose-400/40 text-rose-200' : 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200'} border text-[10px] font-medium rounded-lg transition active:scale-95">
                    ${isTimerActive ? 'Duraklat' : 'Başlat'}
                  </button>
                </div>
              </div>
            ` : ''}

            <div class="pt-2 border-t border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-white/50 italic">${card.actionTitle}</span>
              ${card.completed ? `
                <span class="text-[10px] text-emerald-300 font-semibold px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-xl flex items-center space-x-1">
                  <span>✓</span>
                  <span>Tamamlandı</span>
                </span>
              ` : `
                <button onclick="completeFatherAction('${card.actionType}')" class="px-3 py-1.5 bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-[10px] font-semibold rounded-xl transition shadow-xs active:scale-95">
                  ${card.buttonText}
                </button>
              `}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Canlı Tamamlanan Destek Geçmişi -->
      <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs">
        <div class="flex justify-between items-center">
          <span class="font-medium text-white/90">Tamamlanan Şefkatli Destekler</span>
          <span class="text-[9px] text-amber-200 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-400/20">${babaState.liveFeed.length} Kayıt</span>
        </div>
        <div class="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          ${babaState.liveFeed.map(f => `
            <div class="p-2.5 bg-black/30 rounded-xl border border-white/5 flex justify-between items-start text-[10px]">
              <div>
                <div class="font-medium text-amber-200 flex items-center space-x-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span>${escapeHtml(f.title)}</span>
                </div>
                <div class="text-white/70 mt-0.5 leading-relaxed break-words">${escapeHtml(f.text)}</div>
              </div>
              <span class="text-[9px] text-white/40 font-mono shrink-0 ml-2 mt-0.5">${escapeHtml(f.time)}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (babaState.activeTab === "home") {
    return `
      <!-- GÜNEŞ & SES KÖPRÜSÜ TAB -->
      <div class="space-y-3">
        <!-- Güneş Hero Kartı -->
        <div class="p-4 bg-gradient-to-br from-emerald-950/40 via-black/40 to-amber-950/20 rounded-3xl border border-white/10 space-y-3 relative overflow-hidden">
          <div class="flex justify-between items-start">
            <div>
              <span class="text-[10px] uppercase tracking-wider text-amber-300/80 font-medium">Bebek Biyometrisi</span>
              <h3 class="font-serif font-bold text-xl text-white mt-0.5">Güneş · 31. Hafta</h3>
              <p class="text-[11px] text-white/60 mt-0.5">${babaState.baby.sizeComparison}</p>
            </div>
            <div class="flex flex-col items-end space-y-1">
              <div class="flex items-center space-x-1.5 px-2.5 py-1 bg-rose-500/15 border border-rose-400/30 rounded-full text-rose-300 text-xs font-mono font-semibold">
                <span class="w-2 h-2 rounded-full bg-rose-400 animate-ping"></span>
                <span>${babaState.baby.bpm} bpm</span>
              </div>
              <span class="text-[9px] text-white/40">Kardiyak Ritim</span>
            </div>
          </div>

          <!-- Metrikler -->
          <div class="grid grid-cols-3 gap-2 pt-2 border-t border-white/10 text-center">
            <div class="p-2 bg-white/5 rounded-2xl border border-white/5">
              <div class="text-[9px] text-white/50">Tahmini Ağırlık</div>
              <div class="text-xs font-bold text-amber-200 mt-0.5 font-mono">${babaState.baby.weight}</div>
            </div>
            <div class="p-2 bg-white/5 rounded-2xl border border-white/5">
              <div class="text-[9px] text-white/50">Baş-Topuk Boyu</div>
              <div class="text-xs font-bold text-amber-200 mt-0.5 font-mono">${babaState.baby.height}</div>
            </div>
            <div class="p-2 bg-white/5 rounded-2xl border border-white/5">
              <div class="text-[9px] text-white/50">Doğuma Kalan</div>
              <div class="text-xs font-bold text-emerald-300 mt-0.5 font-mono">${babaState.baby.daysLeft} Gün</div>
            </div>
          </div>

          <div class="p-2.5 bg-black/30 rounded-2xl border border-white/5 text-[10px] text-white/70 leading-relaxed">
            Tahmini doğum tarihi: <b class="text-white">${babaState.baby.edd}</b>. Güneş şu an amniyotik havuzunda göz kapaklarını açıp kapayabilmekte, solunum denemeleri yapmakta ve REM uykusunda rüya görmektedir.
          </div>
        </div>

        <!-- Akustik Ses Köprüsü & Babanın Ses Frekansı -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <h4 class="font-serif font-bold text-base text-white">Akustik Ses Köprüsü</h4>
              <p class="text-[10px] text-white/60">İşitsel Nörogelişim & Babanın Pes Ses Frekansları</p>
            </div>
            <span class="text-[9px] px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-400/30 rounded-full font-mono">
              85 - 150 Hz Rezonans
            </span>
          </div>

          <p class="text-[11px] text-white/80 leading-relaxed">
            31. haftada Güneş amniyotik sıvı içinde dış sesleri net olarak ayırt edebilir. Babanın pes ve kalın ses tonu rahim duvarından en rezonanslı geçen akustik titreşimlerdir. Anne karnına elinizi koyup sakin bir tonla konuşmanız nörolojik güven duygusunu tesis eder.
          </p>

          <div id="soundWaveGraphic" class="p-3 bg-black/40 rounded-2xl border border-white/5 flex items-center justify-around space-x-1.5 h-12">
            <span class="w-1 bg-amber-400/80 rounded-full h-3 animate-pulse"></span>
            <span class="w-1 bg-amber-300/80 rounded-full h-6 animate-pulse" style="animation-delay: 150ms"></span>
            <span class="w-1 bg-emerald-400/80 rounded-full h-8 animate-pulse" style="animation-delay: 300ms"></span>
            <span class="w-1 bg-amber-200/90 rounded-full h-5 animate-pulse" style="animation-delay: 450ms"></span>
            <span class="w-1 bg-emerald-300/80 rounded-full h-9 animate-pulse" style="animation-delay: 200ms"></span>
            <span class="w-1 bg-amber-400/80 rounded-full h-4 animate-pulse" style="animation-delay: 350ms"></span>
            <span class="w-1 bg-amber-300/80 rounded-full h-7 animate-pulse" style="animation-delay: 100ms"></span>
          </div>

          <button onclick="playFatherVoice()" class="w-full py-3 bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-xs font-semibold rounded-2xl transition flex items-center justify-center space-x-2 shadow-sm active:scale-95">
            <span>♡</span>
            <span>Güneş'e Sesini Dinlet (Akustik Rezonans)</span>
          </button>
        </div>
      </div>
    `;
  } else if (babaState.activeTab === "guide") {
    // REHBER / LOJİSTİK / HASTANE ÇANTASI TAB
    const items = babaState.hospitalBag;
    const filter = babaState.bagFilter;
    const filteredItems = filter === "all" ? items : items.filter(i => i.cat === filter);
    const totalCount = items.length;
    const doneCount = items.filter(i => i.checked).length;
    const percent = Math.round((doneCount / totalCount) * 100);

    const anneDone = items.filter(i => i.cat === "anne" && i.checked).length;
    const anneTotal = items.filter(i => i.cat === "anne").length;
    const bebekDone = items.filter(i => i.cat === "bebek" && i.checked).length;
    const bebekTotal = items.filter(i => i.cat === "bebek").length;
    const babaDone = items.filter(i => i.cat === "baba" && i.checked).length;
    const babaTotal = items.filter(i => i.cat === "baba").length;

    return `
      <script id="babaGuideMeta">/* Doğum & Hastane Çantası */</script>
      <div class="space-y-3.5">
        <!-- 31. HAFTA DOĞUM & HASTANE ÇANTASI KONTROL LİSTESİ -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-start">
            <div>
              <span class="text-[9px] uppercase tracking-wider text-amber-300 font-medium">31. Hafta Hazırlığı</span>
              <h3 class="text-sm font-serif font-bold text-white mt-0.5">Doğum &amp; Hastane Çantası</h3>
              <p class="text-[10px] text-white/60">Anne, Bebek (Güneş), Baba &amp; Evraklar</p>
            </div>
            <div class="text-right">
              <span class="text-xs font-mono font-bold text-emerald-300">${doneCount}/${totalCount} Hazır</span>
              <div class="text-[9px] text-white/50">%${percent} Tamamlandı</div>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div class="h-full bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full transition-all duration-500" style="width: ${percent}%"></div>
          </div>

          <!-- Kategori Filtreleri -->
          <div class="grid grid-cols-4 gap-1 pt-1 text-[10px]">
            <button onclick="setBagFilter('all')" class="py-1.5 rounded-xl border transition ${filter === 'all' ? 'bg-amber-500/25 border-amber-400/40 text-amber-200 font-semibold' : 'bg-white/5 border-white/10 text-white/60'}">
              Tümü (${doneCount}/${totalCount})
            </button>
            <button onclick="setBagFilter('anne')" class="py-1.5 rounded-xl border transition ${filter === 'anne' ? 'bg-amber-500/25 border-amber-400/40 text-amber-200 font-semibold' : 'bg-white/5 border-white/10 text-white/60'}">
              Anne (${anneDone}/${anneTotal})
            </button>
            <button onclick="setBagFilter('bebek')" class="py-1.5 rounded-xl border transition ${filter === 'bebek' ? 'bg-amber-500/25 border-amber-400/40 text-amber-200 font-semibold' : 'bg-white/5 border-white/10 text-white/60'}">
              Bebek (${bebekDone}/${bebekTotal})
            </button>
            <button onclick="setBagFilter('baba')" class="py-1.5 rounded-xl border transition ${filter === 'baba' ? 'bg-amber-500/25 border-amber-400/40 text-amber-200 font-semibold' : 'bg-white/5 border-white/10 text-white/60'}">
              Baba (${babaDone}/${babaTotal})
            </button>
          </div>

          <!-- Liste Öğeleri -->
          <div class="space-y-1.5 max-h-56 overflow-y-auto pr-1">
            ${filteredItems.map(item => `
              <div onclick="toggleBagItem('${item.id}')" class="p-2.5 rounded-2xl border transition cursor-pointer flex items-center justify-between text-xs ${item.checked ? 'bg-emerald-950/30 border-emerald-500/30 text-white' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/[0.08]'}">
                <div class="flex items-center space-x-2.5 min-w-0 pr-2">
                  <span class="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border ${item.checked ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold text-[11px]' : 'bg-black/30 border-white/20 text-transparent'}">
                    ✓
                  </span>
                  <span class="text-[11px] leading-tight ${item.checked ? 'text-white/95 line-through opacity-75' : 'text-white/90'}">
                    ${item.label}
                  </span>
                </div>
                <span class="text-[9px] uppercase px-1.5 py-0.5 rounded-md border shrink-0 ${item.cat === 'anne' ? 'text-pink-300 border-pink-400/30 bg-pink-950/40' : (item.cat === 'bebek' ? 'text-sky-300 border-sky-400/30 bg-sky-950/40' : 'text-amber-300 border-amber-400/30 bg-amber-950/40')}">
                  ${item.cat === 'anne' ? 'Anne' : (item.cat === 'bebek' ? 'Bebek' : 'Baba & Evrak')}
                </span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- ACİL DOĞUM LOJİSTİĞİ KARTI (MANİSA ŞEHİR HASTANESİ) -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="text-[9px] uppercase tracking-wider text-rose-300 font-medium">Acil Doğum Hattı</span>
              <h4 class="text-sm font-serif font-bold text-white mt-0.5">Manisa Şehir Hastanesi</h4>
              <p class="text-[10px] text-white/60">Kadın Hastalıkları ve Doğum Kliniği</p>
            </div>
            <span class="text-[10px] px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full font-mono">
              ~19 dk (14.2 km)
            </span>
          </div>

          <div class="p-2.5 bg-black/30 rounded-2xl border border-white/5 space-y-1.5 text-[10px]">
            <div class="flex justify-between text-white/80">
              <span class="text-white/50">Sorumlu Hekim:</span>
              <span class="font-semibold text-amber-200">Op. Dr. Ayşe Yılmaz</span>
            </div>
            <div class="flex justify-between text-white/80">
              <span class="text-white/50">Acil Güzergah:</span>
              <span class="text-white/90">Muradiye -> Çevre Yolu -> Doğumhane Girişi</span>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-1.5 pt-1">
            <a href="tel:112" class="py-2.5 px-2 bg-rose-500/25 hover:bg-rose-500/35 border border-rose-400/40 text-rose-200 text-[10px] font-semibold rounded-2xl transition flex items-center justify-center space-x-1 active:scale-95 text-center">
              <span>🚨</span>
              <span>112 Acil</span>
            </a>
            <a href="tel:+902362292600" class="py-2.5 px-2 bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-400/40 text-emerald-200 text-[10px] font-semibold rounded-2xl transition flex items-center justify-center space-x-1 active:scale-95 text-center">
              <span>📞</span>
              <span>Hastane Santral</span>
            </a>
            <a href="tel:+902362292600" class="py-2.5 px-2 bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-[10px] font-semibold rounded-2xl transition flex items-center justify-center space-x-1 active:scale-95 text-center">
              <span>🩺</span>
              <span>Dr. Ayşe Yılmaz</span>
            </a>
          </div>
        </div>

        <!-- 5-1-1 DÜZENLİ KASILMA KILAVUZU -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2.5 text-xs">
          <div class="flex justify-between items-center">
            <div class="font-bold text-white text-sm">5-1-1 Kasılma Kuralı</div>
            <span class="text-[9px] px-2 py-0.5 bg-sky-500/20 text-sky-200 rounded-full border border-sky-400/30">Hastaneye Çıkış Kriteri</span>
          </div>
          <p class="text-[10px] text-white/70 leading-relaxed">
            Doğum eyleminin aktif fazına geçtiğini gösteren altın klinik kuraldır:
          </p>

          <div class="grid grid-cols-3 gap-1.5 text-center pt-1">
            <div class="p-2 bg-black/40 rounded-xl border border-white/10">
              <div class="text-sm font-bold text-amber-300 font-mono">5 Dk</div>
              <div class="text-[9px] text-white/60 mt-0.5">Kasılmalar 5 dakikada bir geliyorsa</div>
            </div>
            <div class="p-2 bg-black/40 rounded-xl border border-white/10">
              <div class="text-sm font-bold text-amber-300 font-mono">1 Dk</div>
              <div class="text-[9px] text-white/60 mt-0.5">Her kasılma en az 60 sn sürüyorsa</div>
            </div>
            <div class="p-2 bg-black/40 rounded-xl border border-white/10">
              <div class="text-sm font-bold text-amber-300 font-mono">1 Saat</div>
              <div class="text-[9px] text-white/60 mt-0.5">Bu ritim 1 saattir kesintisizse</div>
            </div>
          </div>

          <div class="p-2 bg-amber-500/10 border border-amber-400/20 rounded-xl text-[10px] text-amber-200/90 leading-relaxed">
            5-1-1 sağlandığında veya su gelişi (membran rüptürü) olduğunda sakin adımlarla hastane çantası alınıp Manisa Şehir Hastanesi'ne geçilir.
          </div>
        </div>

        <!-- Rh İzoimmünizasyon Koruma Güvencesi -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2 text-xs">
          <div class="font-medium text-white">Rh İzoimmünizasyon Güvenlik Takibi</div>
          <div class="text-[10px] text-white/60">Buse (${babaState.mother.bloodGroup}) & Oğuz (${babaState.user.bloodGroup})</div>
          <div class="p-2.5 bg-emerald-950/30 border border-emerald-400/30 rounded-xl text-[10px] text-emerald-200 leading-relaxed">
            Anne Rh(-) ve Baba Rh(+) olduğu için 28. hafta İndirekt Coombs ve Rhogam profilaksisi hekim kontrolünde yapılmıştır; Güneş tam koruma altındadır.
          </div>
        </div>
      </div>
    `;
  } else if (babaState.activeTab === "kovan") {
    return `
      <!-- MURADİYE BABA KOVANI (BABALAR OCAĞI - YALNIZCA ERKEKLER) -->
      <div class="space-y-3.5">
        <div class="flex justify-between items-center pb-2 border-b border-white/10">
          <div>
            <h2 class="text-base font-serif font-semibold text-white/95">Muradiye Baba Kovanı (Babalar Ocağı)</h2>
            <p class="text-[11px] text-white/60">Yunusemre ve Çevresi Baba & Erkek Dayanışması</p>
          </div>
          <span class="text-[10px] bg-sky-500/20 text-sky-200 px-2.5 py-1 rounded-full border border-sky-400/30 font-medium shrink-0">
            Babalar ve Erkeklere Özel Alan
          </span>
        </div>

        <!-- Erkekler Çemberi Bilgilendirmesi -->
        <div class="p-3 bg-white/5 rounded-2xl border border-white/10 text-[10px] text-white/70 leading-relaxed">
          Bu alan yalnızca baba ve erkek kullanıcıların doğum lojistiği, oto koltuğu montajı, eşe doğru destek olma ve baba olma tecrübelerini paylaştığı bağımsız erkekler çemberidir.
        </div>

        <div class="space-y-2.5">
          <div class="text-xs font-semibold text-amber-200 uppercase tracking-wider">Babalardan Paylaşılan Eşyalar & İmece</div>
          ${babaState.kovanItems.map(i => `
            <div class="p-4 bg-white/5 rounded-3xl flex items-start justify-between text-xs border border-white/10 transition hover:bg-white/[0.08]">
              <div class="flex items-start space-x-3">
                <img src="${escapeHtml(i.avatar)}" class="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0">
                <div>
                  <div class="font-bold text-white/95 text-sm">${escapeHtml(i.title)}</div>
                  <div class="text-[11px] text-amber-200 mt-0.5">${escapeHtml(i.user)} · ${escapeHtml(i.bio)} (${escapeHtml(i.dist)})</div>
                  <div class="text-[11px] text-white/60 mt-1 leading-relaxed">${escapeHtml(i.desc)}</div>
                </div>
              </div>
              <button onclick="sendBabaNeighborMessage('${i.user.replace(/'/g, "\\'")}')" class="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs text-white font-medium shrink-0 ml-2 transition active:scale-95">
                Mesaj
              </button>
            </div>
          `).join('')}
        </div>

        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2 text-xs">
          <div class="font-semibold text-white/90">Babalar Ocağı Sohbet Hattı</div>
          <div class="space-y-2 max-h-36 overflow-y-auto pr-1">
            ${babaState.kovanMessages.map(m => `
              <div class="p-2.5 rounded-2xl ${m.isMe ? 'bg-amber-500/15 border border-amber-400/20 text-right ml-6' : 'bg-white/5 border border-white/5 mr-6'}">
                <div class="text-[9px] text-white/40">${escapeHtml(m.sender)} · ${escapeHtml(m.time)}</div>
                <div class="text-[11px] text-white/90 mt-0.5 break-words">${escapeHtml(m.text)}</div>
              </div>
            `).join('')}
          </div>
          <div class="flex items-center space-x-2 pt-2 border-t border-white/10">
            <input id="babaKovanMsgInput" type="text" placeholder="Babalar ocağına yaz..."
              class="flex-1 bg-white/8 border border-white/15 rounded-xl px-3 py-2 text-[11px] text-white placeholder-white/25 focus:outline-none focus:border-amber-400/50 transition"
              onkeydown="if(event.key==='Enter') sendBabaKovanMessage()">
            <button onclick="sendBabaKovanMessage()"
              class="px-3.5 py-2 bg-amber-500/25 border border-amber-400/30 text-amber-200 text-[11px] font-semibold rounded-xl hover:bg-amber-500/35 transition shrink-0">
              Gönder
            </button>
          </div>
        </div>
      </div>
    `;
  } else if (babaState.activeTab === "profile") {
    return `
      <!-- BABANIN PROFİLİ & AİLE EŞLEŞME KODU -->
      <div class="space-y-3.5">
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3 text-xs">
          <div class="flex items-center space-x-3.5">
            <img src="${babaState.user.avatar}" class="w-14 h-14 rounded-full object-cover border-2 border-amber-300 shadow-sm">
            <div>
              <h3 class="text-base font-serif font-bold text-white">${babaState.user.name}</h3>
              <p class="text-[11px] text-amber-200 mt-0.5">${babaState.user.role} · Kan Grubu: <b>${babaState.user.bloodGroup}</b></p>
              <p class="text-[10px] text-white/50">${babaState.user.neighborhood}, ${babaState.user.district} / ${babaState.user.city}</p>
            </div>
          </div>
          <div class="pt-2 border-t border-white/10 text-[11px] text-white/70 leading-relaxed">
            ToHUM Bağımsız Baba Portali aktif. Eş ve bebek koruyucu kalkanı devrede.
          </div>
        </div>

        <!-- Aile Eşleşme Kodu Kartı -->
        <div class="p-4 bg-gradient-to-br from-emerald-950/40 to-black/40 rounded-3xl border border-emerald-500/20 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <div class="text-[9px] uppercase tracking-wider text-emerald-300 font-semibold">Aile Eşleşme Kodu</div>
              <div class="text-xs text-white/60 mt-0.5">Eşzamanlı Calm Tech Koruma Ağı</div>
            </div>
            <span class="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[9px] text-emerald-200 font-medium">
              Eşleşti
            </span>
          </div>

          <div class="p-3 bg-black/50 rounded-2xl border border-white/10 flex items-center justify-between">
            <div class="font-mono text-base font-bold text-amber-300 tracking-wider">
              ${babaState.user.pairingCode}
            </div>
            <button onclick="copyPairingCode()" class="px-3 py-1.5 bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-[10px] font-semibold rounded-xl transition active:scale-95">
              Kodu Kopyala
            </button>
          </div>

          <div class="text-[10px] text-white/70 leading-relaxed flex items-center space-x-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Buse Nur Ürem ile eşleşti (31. Hafta · Güneş)</span>
          </div>
        </div>

        <!-- Gizlilik & Calm Tech Standartları -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2 text-xs">
          <div class="font-medium text-white text-xs">Veri Güvenliği ve Mahremiyet</div>
          <div class="space-y-1.5 text-[10px] text-white/60 leading-relaxed">
            <div>• Sıfır Reklam Garantisi: Hassas sağlık verileriniz asla ticari amaçla işlenmez.</div>
            <div>• E2E Şifreli Aile İletişimi: Anne ve baba arasındaki sinyaller şifreli olarak senkronize edilir.</div>
            <div>• Bağımsız Portal İzolasyonu: Baba arayüzü koruyucu eş ihtiyaçlarına odaklı izole bir deneyim sunar.</div>
          </div>
        </div>
      </div>
    `;
  }
}

function initBabaPortal() {
  try {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam && ["analysis", "home", "guide", "kovan", "profile"].includes(tabParam)) {
      babaState.activeTab = tabParam;
    }
  } catch(e) {}
  renderBabaApp();
}

document.addEventListener("DOMContentLoaded", initBabaPortal);
if (document.readyState !== "loading") initBabaPortal();
