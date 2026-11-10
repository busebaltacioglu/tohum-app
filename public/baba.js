// =========================================================================
// TOHUM BABA - BAĞIMSIZ BABA VE EŞ KORUYUCU EKOSİSTEMİ
// Oğuz Ürem · Ürem Ailesi · Manisa / Yunusemre / Muradiye
// Anneye geçiş yoktur; baba tamamen kendi bağımsız portalında yaşar.
// =========================================================================

const babaState = {
  activeTab: "analysis", // 'analysis' | 'home' | 'guide' | 'kovan' | 'profile'
  user: {
    name: "Oğuz Ürem",
    shortName: "Oğuz",
    role: "Baba & Destekçi",
    bloodGroup: "0 Rh+",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
    city: "Manisa",
    district: "Yunusemre",
    neighborhood: "Muradiye"
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
    selectedMood: "tired"
  },
  baby: {
    name: "Güneş",
    week: 31,
    weight: "1.650 gr",
    height: "41.5 cm",
    sizeComparison: "Boyut: 41.5 cm · Bir Ananas Hacminde",
    bpm: 142,
    daysLeft: 63
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
  // ERKEKLER / BABALAR KOVANI (BABALAR OCAĞI)
  kovanItems: [
    { id: 1, title: "Maxi-Cosi Isofix Bazalı Yenidoğan Oto Koltuğu", user: "Mehmet", bio: "Muradiye · 1 Yaş Baba", dist: "500m", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80", type: "gift", desc: "Kazasız, tertemiz durumda; ihtiyacı olan bir babaya hediye etmek isterim." },
    { id: 2, title: "Doğum & Hastane Lojistik Kabin Bavulu", user: "Can", bio: "Güzelyurt · 2. Baba", dist: "1.4km", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80", type: "trade", desc: "Geniş bölmeli doğum lojistik çantası ve acil termos." },
    { id: 3, title: "Bebek Arabası Yağmurluk & Sineklik Takımı", user: "Burak", bio: "Muradiye · Baba Adayı", dist: "1.8km", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=100&q=80", type: "gift", desc: "Kullanılmamış puset koruyucu aksesuarlar." }
  ],
  kovanMessages: [
    { sender: "Mehmet (Muradiye)", text: "Beyler eşimin 31. haftasındayız, akşamları çok çabuk yoruluyor. Sol yan yatışta sırtına yastık koymak gerçekten çok rahatlatıyor.", time: "12:10", isMe: false },
    { sender: "Oğuz", text: "Selam Mehmet, bizde de 31. hafta. Sistemden Buse'nin hidrasyon ve bel yükü analizine bakıp destek oluyorum, çok faydalı oluyor.", time: "12:20", isMe: true },
    { sender: "Can", text: "Oto koltuğunu şimdiden arabaya monte edip denediniz mi beyler? Doğum günü telaşında pratiklik şart.", time: "12:35", isMe: false }
  ]
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
      insight: `Buse bugün ${babaState.mother.waterCount}/${babaState.mother.waterTarget} bardak su tüketti. 31. haftada amniyotik sıvı her 3 saatte bir tamamen yenilenir. Sıvı eksikliği plasental perfüzyonu etkileyebilir.`,
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
  cards.push({
    id: "massage",
    category: "Biomekanik & Lomber Yük",
    badge: "Pelvis Yükü Yüksek",
    badgeColor: "text-amber-300 bg-amber-950/60 border-amber-400/30",
    headline: "31. Hafta Ağırlık Merkezi Değişimi & Bel Hassasiyeti",
    insight: "31. haftada Güneş'in 1600 gramı aşan ağırlığı annenin sakroiliak eklemlerine baskı yapar. Buse akşam yorgunluğu ve bel hassasiyeti hissettiğini kaydetti.",
    actionTitle: "Buse'yi sol yan yatışa geçirin, bacak arasına destek yastığı koyun ve 10 dk hafif bel masajı uygulayın",
    actionType: "massage",
    buttonText: "Bel Desteği Sağladım",
    completed: false
  });

  // 3. Kardiyovasküler Bazal
  cards.push({
    id: "cardio",
    category: "Kardiyovasküler Bazal",
    badge: "90/60 Bazal İle Uyumlu",
    badgeColor: "text-emerald-300 bg-emerald-950/60 border-emerald-400/30",
    headline: `Son Ölçüm: ${babaState.mother.latestBP.systolic}/${babaState.mother.latestBP.diastolic} mmHg`,
    insight: "Buse'nin sistolik ve diyastolik değerleri kendi doğal 90/60 bazal koridoru içinde seyrediyor. Anne kardiyak açıdan huzurlu ve güvende.",
    actionTitle: "Ortamın sakinliğini ve loş ışığını koruyun",
    actionType: "cardio",
    buttonText: "Dinginlik Sağlandı",
    completed: true
  });

  // 4. DMT1 Magnezyum Saati
  cards.push({
    id: "magnesium",
    category: "DMT1 Mineral Zamanlaması",
    badge: babaState.mother.magnesiumTaken ? "Alındı" : "Saat 21:30 Bekleniyor",
    badgeColor: babaState.mother.magnesiumTaken ? "text-emerald-300 bg-emerald-950/60 border-emerald-400/30" : "text-amber-300 bg-amber-950/60 border-amber-400/30",
    headline: "Magnimore Plus (Magnezyum Saşe)",
    insight: "Demir ve kalsiyum ile yarışmaması için magnezyum akşam tok karnına alınmalıdır. Gece bacak kramplarını ve rahim gerginliğini engeller.",
    actionTitle: "Saat 21:30'da magnezyum saşesini 1 bardak ılık suyla karıştırıp Buse'ye ikram edin",
    actionType: "magnesium",
    buttonText: "Magnezyumu Hazırladım",
    completed: babaState.mother.magnesiumTaken
  });

  return cards;
}

// BABA EYLEMİNİ TAMAMLAMA
window.completeFatherAction = function(actionType) {
  if (actionType === "water") {
    babaState.mother.waterCount++;
  } else if (actionType === "magnesium") {
    babaState.mother.magnesiumTaken = true;
  }

  fetch('/api/partner/care-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: actionType })
  }).catch(function(e) { console.log(e); });

  babaState.liveFeed.unshift({
    id: Date.now(),
    time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    type: "care_completed",
    title: actionType === "water" ? "Amniyotik Hidrasyon Desteği" : (actionType === "massage" ? "Lomber Pelvis Rahatlatma" : "DMT1 Magnezyum Desteği"),
    text: "Oğuz Buse'nin ihtiyacına yönelik şefkatli desteği tamamladı."
  });

};

window.playFatherVoice = function() {
  alert("Oğuz'un ses tınısı iletildi. Güneş babasının sesine aşina ritmik bir kıpırtıyla yanıt verdi.");
};

window.setBabaTab = function(tabId) {
  babaState.activeTab = tabId;
};

window.sendBabaKovanMessage = function() {
  const inp = document.getElementById("babaKovanMsgInput");
  if (!inp || !inp.value.trim()) return;
  babaState.kovanMessages.push({
    sender: "Oğuz",
    text: inp.value.trim(),
    time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    isMe: true
  });
  inp.value = "";
};

// ANA RENDER FONKSİYONU
function renderBabaApp() {
  const root = document.getElementById("babaRoot");
  if (!root) return;

  const analysisCards = getMaternalAnalysis();
  const curW = babaState.baby.week;

  root.innerHTML = `
    <!-- Top Header -->
    <header class="px-5 pt-4 pb-3 flex justify-between items-center absolute top-0 inset-x-0 z-40 bg-gradient-to-b from-black/80 via-black/40 to-transparent text-white">
      <div class="flex items-center space-x-2.5">
        <img src="${babaState.user.avatar}" class="w-9 h-9 rounded-full object-cover border border-amber-300/40">
        <div>
          <div class="text-xs font-serif font-semibold text-white/95">ToHUM Baba Portali</div>
          <div class="text-[10px] text-white/50">${babaState.user.name} · ${babaState.baby.name} (${curW}. Hafta)</div>
        </div>
      </div>
      <div class="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-[10px] text-emerald-200 font-medium">
        Bağımsız Oturum
      </div>
    </header>

    <!-- Content Area -->
    <main class="flex-1 w-full h-full pt-16 pb-20 px-4 overflow-y-auto space-y-3.5 text-white">
      ${renderBabaTabContent(analysisCards)}
    </main>

    <!-- Bottom Navigation -->
    <nav class="absolute bottom-0 inset-x-0 z-50 h-16 bg-[#0B0F0D]/95 backdrop-blur-2xl border-t border-white/10 flex items-center justify-around px-2 shadow-2xl">
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
    return `
      <!-- Bilgi Kutusu: Anne İstek Bildirmez, Sistem Analiz Eder -->
      <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-[11px] space-y-1">
        <div class="font-semibold text-amber-200">ToHUM Anne İhtiyaç Analiz Motoru</div>
        <p class="text-white/70 leading-relaxed text-[10px]">
          Buse uygulamadan doğrudan istek bildirmez; sistemimiz Buse'nin biyometrik, fizyolojik ve anket verilerini analiz ederek size özel şefkatli aksiyon kartları hazırlar.
        </p>
      </div>

      <!-- TOHUM AKILLI ANNE İHTİYAÇ ANALİZİ KARTLARI -->
      <div class="space-y-2.5">
        <div class="flex justify-between items-center px-1">
          <span class="text-xs font-semibold text-white/90">Buse İçin Günlük İhtiyaç Analizi</span>
          <span class="text-[10px] text-white/50">${babaState.baby.week}. Hafta · 3. Trimester</span>
        </div>

        ${analysisCards.map(card => `
          <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-2 transition hover:bg-white/[0.07]">
            <div class="flex justify-between items-center">
              <span class="text-[11px] font-bold text-white/95">${card.category}</span>
              <span class="text-[9px] px-2 py-0.5 rounded-full border ${card.badgeColor}">
                ${card.badge}
              </span>
            </div>
            <div class="text-[11px] font-medium text-amber-200/90">${card.headline}</div>
            <p class="text-[10px] text-white/70 leading-relaxed">${card.insight}</p>
            <div class="pt-2 border-t border-white/5 flex items-center justify-between">
              <span class="text-[10px] text-white/50 italic">${card.actionTitle}</span>
              ${card.completed ? `
                <span class="text-[10px] text-emerald-300 font-semibold px-2.5 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-xl">
                  Tamamlandı
                </span>
              ` : `
                <button onclick="completeFatherAction('${card.actionType}')" class="px-3 py-1.5 bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-[10px] font-semibold rounded-xl transition shadow-xs">
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
          <span class="text-[9px] text-amber-200">${babaState.liveFeed.length} Kayıt</span>
        </div>
        <div class="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          ${babaState.liveFeed.map(f => `
            <div class="p-2 bg-black/30 rounded-xl border border-white/5 flex justify-between items-start text-[10px]">
              <div>
                <div class="font-medium text-amber-200">${f.title}</div>
                <div class="text-white/70 mt-0.5">${f.text}</div>
              </div>
              <span class="text-[9px] text-white/40 font-mono shrink-0 ml-2">${f.time}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (babaState.activeTab === "home") {
    return `
      <!-- GÜNEŞ & SES KÖPRÜSÜ -->
      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
        <div class="flex justify-between items-center">
          <div>
            <h3 class="font-serif font-bold text-base text-white">Güneş · 31. Hafta</h3>
            <p class="text-[10px] text-white/60">İşitsel Nörogelişim & Babanın Ses Tonu</p>
          </div>
          <span class="text-xs px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full font-mono">
            ${babaState.baby.bpm} bpm
          </span>
        </div>
        <p class="text-[11px] text-white/80 leading-relaxed">
          31. haftada Güneş amniyotik sıvı içinde dış sesleri ayırt edebilir. Babanın pes ve kalın ses frekansları rahim duvarından en net geçen akustik titreşimlerdir.
        </p>
        <button onclick="playFatherVoice()" class="w-full py-3 bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-xs font-semibold rounded-2xl transition flex items-center justify-center space-x-2">
          <span>Güneş'e Sesini Dinlet</span>
        </button>
      </div>
    `;
  } else if (babaState.activeTab === "guide") {
    return `
      <!-- REHBER & RH GÜVENLİK PROTOKOLÜ -->
      <div class="space-y-3">
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2">
          <div class="font-bold text-sm text-white">31. Haftada Babanın Koruyucu Rolü</div>
          <p class="text-[11px] text-white/70 leading-relaxed italic bg-black/20 p-3 rounded-2xl border border-white/5">
            "Oğuz, 31. haftada Buse'nin ağırlık merkezi öne doğru kaydığı için akşamları sırt ve bel desteği en büyük konfordur. Yatarken sol yan pozisyonuna alışmasına ve hidrasyonuna sessizce eşlik edin."
          </p>
        </div>

        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2 text-xs">
          <div class="font-medium text-white">Rh İzoimmünizasyon Güvenlik Takibi</div>
          <div class="text-[10px] text-white/60">Buse (${babaState.mother.bloodGroup}) & Oğuz (${babaState.user.bloodGroup})</div>
          <div class="p-2.5 bg-rose-950/30 border border-rose-400/30 rounded-xl text-[10px] text-rose-200 leading-relaxed">
            Anne Rh(-) ve Baba Rh(+) olduğu için 28. hafta İndirekt Coombs ve Rhogam takibi hekim kontrolünde izlenmektedir.
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
            <div class="p-4 bg-white/5 rounded-3xl flex items-start justify-between text-xs border border-white/10">
              <div class="flex items-start space-x-3">
                <img src="${i.avatar}" class="w-10 h-10 rounded-full object-cover border border-white/20">
                <div>
                  <div class="font-bold text-white/95 text-sm">${i.title}</div>
                  <div class="text-[11px] text-amber-200 mt-0.5">${i.user} · ${i.bio} (${i.dist})</div>
                  <div class="text-[11px] text-white/60 mt-1 leading-relaxed">${i.desc}</div>
                </div>
              </div>
              <button class="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs text-white font-medium shrink-0 ml-2 transition">
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
                <div class="text-[9px] text-white/40">${m.sender} · ${m.time}</div>
                <div class="text-[11px] text-white/90 mt-0.5">${m.text}</div>
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
      <!-- BABANIN PROFİLİ -->
      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3 text-xs">
        <div class="flex items-center space-x-3">
          <img src="${babaState.user.avatar}" class="w-14 h-14 rounded-full object-cover border-2 border-amber-300">
          <div>
            <h3 class="text-sm font-bold text-white">${babaState.user.name}</h3>
            <p class="text-[11px] text-amber-200 mt-0.5">${babaState.user.role} · Kan Grubu: <b>${babaState.user.bloodGroup}</b></p>
            <p class="text-[10px] text-white/50">${babaState.user.neighborhood}, ${babaState.user.city}</p>
          </div>
        </div>
        <div class="pt-2 border-t border-white/10 text-[11px] text-white/60">
          ToHUM Bağımsız Baba Portali aktif. Eş ve bebek koruyucu kalkanı devrede.
        </div>
      </div>
    `;
  }
}


function initBabaPortal() {
  try {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get("tab");
    if (tabParam) {
      babaState.activeTab = tabParam;
    }
  } catch(e) {}
  renderBabaApp();
}

document.addEventListener("DOMContentLoaded", initBabaPortal);
if (document.readyState !== "loading") initBabaPortal();
