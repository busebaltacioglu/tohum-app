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

// -------------------------------------------------------------------------
// HASTANE ÇANTASI VERİLERİ (31. Hafta)
// -------------------------------------------------------------------------
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

// -------------------------------------------------------------------------
// MODÜL 1: "BUNU BEN HALLEDİYORUM" ZİHİNSEL YÜK MASASI (Mental Load Offloader)
// -------------------------------------------------------------------------
const initialMentalLoadTasks = [
  { id: "ml1", title: "Magnimore Plus & Ferro Sanol Stok Kontrolü", category: "Takviye & Eczane", claimed: true, hoursSaved: 1.5 },
  { id: "ml2", title: "Maxi-Cosi Isofix Oto Koltuğu Montaj & Kemer Testi", category: "Araç & Lojistik", claimed: true, hoursSaved: 2.0 },
  { id: "ml3", title: "Manisa Şehir Hastanesi NST & 32. Hafta Randevu Kaydı", category: "Klinik Takip", claimed: false, hoursSaved: 2.0 },
  { id: "ml4", title: "Organik Yenidoğan Bez & Saf Su Mendil Paketi Siparişi", category: "Bebek Lojistiği", claimed: false, hoursSaved: 1.5 },
  { id: "ml5", title: "Akşam Mutfağı & Koku Hassasiyeti Yönetimi ('Ne Yiyelim?' Sormadan Hazır Seçenek)", category: "Ev & Konfor", claimed: false, hoursSaved: 1.5 }
];

function loadMentalLoadTasksFromStorage() {
  try {
    const saved = localStorage.getItem("tohum_baba_mental_load_v1");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn("Mental load storage read error:", e);
  }
  return JSON.parse(JSON.stringify(initialMentalLoadTasks));
}

function saveMentalLoadTasksToStorage(tasks) {
  try {
    localStorage.setItem("tohum_baba_mental_load_v1", JSON.stringify(tasks));
  } catch (e) {
    console.warn("Mental load storage write error:", e);
  }
}

// -------------------------------------------------------------------------
// MODÜL 6: EV-İŞ DİNAMİK VARDİYA MATRİSİ
// -------------------------------------------------------------------------
const initialWorkLifeMatrix = {
  activeModel: "office_8_18", // "office_8_18" | "remote" | "hybrid" | "role_reversal" | "both_home"
  commuteDuration: "1_2_hours" // "<30_min" | "1_2_hours" | "2_plus_hours"
};

function loadWorkMatrixFromStorage() {
  try {
    const saved = localStorage.getItem("tohum_baba_work_matrix_v1");
    if (saved) {
      return JSON.parse(saved);
    }
  } catch(e) {}
  return JSON.parse(JSON.stringify(initialWorkLifeMatrix));
}

function saveWorkMatrixToStorage(mat) {
  try {
    localStorage.setItem("tohum_baba_work_matrix_v1", JSON.stringify(mat));
  } catch(e) {}
}

// -------------------------------------------------------------------------
// MODÜL 9: KOVAN HAFTALIK ANONİM MİNİ ANKETLER ("Kankalar Ne Durumda?")
// -------------------------------------------------------------------------
const initialKovanPolls = [
  {
    id: "poll1",
    weekLabel: "31. Hafta Kovan Mini Anketi #1",
    question: "Bu hafta iş-ev temposu arasında sıkışıp eşinize veya sürece yetemediğinizi hissettiğiniz bir an oldu mu?",
    totalVotes: 142,
    agreePercent: 82,
    voted: false,
    userChoice: null,
    insight: "%82 Evet dedi (142 Baba). Yalnız değilsin Oğuz; 3. trimesterde Kovan'daki babaların büyük çoğunluğu aynı sessiz baskıyı hissediyor."
  },
  {
    id: "poll2",
    weekLabel: "31. Hafta Kovan Mini Anketi #2",
    question: "Bebek alışverişi listesinde 'Gereksiz pazarlama ürünlerine bütçe mi harcıyoruz?' endişesi yaşadınız mı?",
    totalVotes: 118,
    agreePercent: 76,
    voted: false,
    userChoice: null,
    insight: "%76 Evet dedi (118 Baba). Kovan'daki babaların 4'te 3'ü aynı bütçe stresini yaşıyor; İmece ve Akıllı Bütçe Filtresi tam bunun için var."
  }
];

function loadKovanPollsFromStorage() {
  try {
    const saved = localStorage.getItem("tohum_baba_kovan_polls_v1");
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch(e) {}
  return JSON.parse(JSON.stringify(initialKovanPolls));
}

function saveKovanPollsToStorage(polls) {
  try {
    localStorage.setItem("tohum_baba_kovan_polls_v1", JSON.stringify(polls));
  } catch(e) {}
}

// -------------------------------------------------------------------------
// ANA UYGULAMA DURUMU (babaState)
// -------------------------------------------------------------------------
const babaState = {
  activeTab: "analysis", // 'analysis' | 'home' | 'guide' | 'kovan' | 'profile'
  bagFilter: "all",      // 'all' | 'anne' | 'bebek' | 'baba'
  hospitalBag: loadHospitalBagFromStorage(),
  mentalLoadTasks: loadMentalLoadTasksFromStorage(),
  workLifeMatrix: loadWorkMatrixFromStorage(),
  kovanWeeklyPolls: loadKovanPollsFromStorage(),

  // MODÜL 6: EV-İŞ DİNAMİK VARDİYA MATRİS MODELLERİ
  workLifeModels: {
    office_8_18: {
      key: "office_8_18",
      name: "Saha & Ofis (8-18 Mesai)",
      buffer: "15 Dk Eve Giriş Tamponu: Trafikten çıktın; kapıdan girmeden 5 dk nefes al, ilk 20 dk eşini dinle.",
      shift: "19:30 - 23:00 Babanın Altın Saatleri (Buse kesintisiz ilk uykusunu uyur) · 23:00 - 06:30 Babanın Blok Gece Uykusu (İş ve trafik güvenliği için hafta içi gece bölünmez) · Cuma-Cumartesi: Hafta Sonu Takası."
    },
    remote: {
      key: "remote",
      name: "Görünmez Komşu (Tamamen Remote)",
      buffer: "Kapı Kapalı Odak Modu: Toplantı saatlerinde (14:00-15:30) Buse'nin ekranında 'Oğuz Odak Saatinde' görünür; sınır karmaşası önlenir.",
      shift: "10 Dk Pomodoro Kahve Molası Desteği · 18:00 Keskin Mesai Bitiş Zili (Yol süresi olmadığı için 18:00'de doğrudan sahaya iniş)."
    },
    hybrid: {
      key: "hybrid",
      name: "Dinamik Vardiya (Hibrit Çalışma)",
      buffer: "Ofis günlerinde Model 1 (Akşam Odaklı + Gece Blok Uyku), Ev günlerinde Model 2 (Öğle Pomodoro + 18:00 Devri) otomatik devreye girer.",
      shift: "Haftalık takvime göre otomatik senkronize olan esnek aile nöbet çizelgesi."
    },
    role_reversal: {
      key: "role_reversal",
      name: "Rol Değişimi & Ters Lojistik (Anne İşe Döndü)",
      buffer: "Buse işe döndüğünde 'Anne İş Modu Kalkanı' açılır; sabah hazırlığı, gece/sabah nöbeti ve sağılmış süt stoğu takibi Oğuz'a geçer.",
      shift: "Sabah 06:30 - 08:30 Anne İş Hazırlığı Kalkanı · Akşam süt stoğu & sterilizasyon lojistiği."
    },
    both_home: {
      key: "both_home",
      name: "Çift Mesai / 7-24 Çekirdek Ekip (İkisi de Evde/İzinli)",
      buffer: "08:00 - 14:00 (1. Vardiya) ve 14:00 - 20:00 (2. Vardiya) olarak net 6+6 saatlik görev bölümü; 'Sen yap / ben yapayım' çatışmasını sıfırlar.",
      shift: "Eşit 6+6 blok nöbet takası ile her iki ebeveyn için garantili 4'er saat kesintisiz kişisel dinlenme."
    }
  },

  // MODÜL 7: BİREYSEL MUTLULUK & ÇİFT BAĞI
  individualWellbeing: {
    breakActive: false,
    coupleBondActive: false,
    appreciation: {
      quote: "Buse'den Haftanın Takdiri: 'Bu hafta takviye stoklarını ve akşam mutfağını bana hiç sormadan üstlenmen bana nefes aldırdı. Haftanın kurtarıcısısın!'",
      time: "Dün akşam kaydedildi"
    },
    coupleQuestion: {
      prompt: "Son günlerde sadece tahlil, çanta ve hazırlık konuştunuz. Şimdi telefonları ters çevirin ve 5 dakika sadece şunu konuşun: 'Bu süreç sağlıkla tamamlandığında baş başa yapacağımız ilk kaçamak neresi olsun?'",
      duration: "10 Dk 'Biz Bizeyiz' Modu"
    }
  },

  // MODÜL 8: EŞ ÇEVİRİCİ, USTA BABA MİKRO BECERİLER & AKILLI BÜTÇE
  empathyTranslator: [
    {
      id: "emp1",
      whatSheSaid: "Bana hiç yardım etmiyorsun, her şeyi ben düşünüyorum!",
      whatSheMeant: "Seni suçlamıyorum ama zihinsel yüküm taştı. Savunmaya geçme ve 'Ne yapayım?' diye sorma; doğrudan mutfağı topla veya 1 saat tüm kontrolü devralıp 'Sen uzan' de.",
      tacticApplied: false
    },
    {
      id: "emp2",
      whatSheSaid: "Bugün kendimi çok şiş ve ağır hissediyorum...",
      whatSheMeant: "31. haftada bedenim hızla değişiyor ve bir eş olarak hâlâ beğenildiğimi duymaya ihtiyacım var. Mantıklı açıklama yapma; sadece sarıl ve ne kadar güzel göründüğünü söyle.",
      tacticApplied: false
    }
  ],

  masterDadSkills: [
    {
      id: "ms1",
      title: "Seviye 1: Kolda Kaplan Duruşu (Tiger in the Tree)",
      desc: "Bebeği kolunun üzerine yüzüstü yatırıp başını avucunda destekle, çenesini kol oyuntusuna al. Gaz sancısını 60 saniyede keser.",
      duration: "60 Saniye",
      mastered: false
    },
    {
      id: "ms2",
      title: "Seviye 2: Gece Işığı Açmadan Sessiz Bez Değişimi",
      desc: "Kırmızı loş gece lambası altında 40 saniyede bebeği uyandırmadan çıtçıtları çözüp bezi değiştirme tekniği.",
      duration: "40 Saniye",
      mastered: false
    },
    {
      id: "ms3",
      title: "Seviye 3: Göğüs Göğse (Skin-to-Skin) Tensel Temas",
      desc: "T-shirtünü çıkarıp bebeği çıplak göğsüne yatır. Babanın pes kalp atışları ve ten sıcaklığı yenidoğanın kortizol seviyesini dakikalar içinde düşürür.",
      duration: "10 Dakika",
      mastered: false
    }
  ],

  budgetFilter: [
    {
      id: "bf1",
      item: "Mama Hazırlama & Isıtma Makinesi (8.500 ₺)",
      verdict: "Pazarlama Tuzağı! Derece göstergeli çelik termos (650 ₺) gece ve dışarıda çok daha pratiktir.",
      savedAmount: "+7.850 ₺",
      filtered: true
    },
    {
      id: "bf2",
      item: "Yenidoğan Ayakkabısı & Sert Kot Takımlar (3.200 ₺)",
      verdict: "Gereksiz Harcama! İlk 6 ay bebek yürümez; %100 organik pamuklu önden çıtçıtlı tulumlar tercih edilmeli.",
      savedAmount: "+3.200 ₺",
      filtered: true
    }
  ],

  // MODÜL 2: BİLİMSEL KALKAN & ZİYARETÇİ KALKANI
  scientificShields: [
    {
      id: "s1",
      title: "Süt Yetersizliği Hurafesi",
      myth: "Bu çocuk doymuyor, sütün yetmiyor galiba, mama verelim!",
      shield: "İlk günlerde bebeğin midesi kiraz büyüklüğündedir (5-7 ml). Günde 5-6 ıslak bez çıkarması doyduğunun kesin tıbbi kanıtıdır. Doktorumuz anne sütü dışında bir şey önermedi, süreci ben takip ediyorum."
    },
    {
      id: "s2",
      title: "Sarı Tülbent & Şekerli Su Hurafesi",
      myth: "Sarılık olmasın diye yüzüne sarı tülbent örtelim, şekerli su verelim!",
      shield: "Yenidoğan sarılığı sarı tülbentle değil, sık emzirme ile geçer; şekerli su bebeğin bağırsak florasını bozar. Sarı örtü cilt rengini yanıltıp takibi zorlaştırır."
    },
    {
      id: "s3",
      title: "Karın Boyutu & Kilo Hurafesi",
      myth: "Karnın çok küçük, bebek zayıf mı kaldı acaba?",
      shield: "Karın şekli annenin kas yapısıyla ilgilidir. Güneş şu an 31. haftada 1.650 gr ile tam persentilinde, Dr. Ayşe Hanım ile tüm ölçümleri bizzat inceledik."
    }
  ],
  visitorShieldTemplate: "Sevgili Ailemiz ve Dostlarımız, Güneş'in ve Buse'nin doğum sonrası ilk 15 günü bağışıklık koruması ve toparlanma süreci için hastanede ve evde kısa/parfümsüz ziyaret kuralı uyguluyoruz. Anne ve bebeğin kesintisiz dinlenmesi için ziyaret süremiz en fazla 30 dakikadır. Ziyaret planı ve uygun saatler için lütfen doğrudan benimle (Oğuz) iletişime geçin. Anlayışınız ve sevginiz için çok teşekkür ederiz! — Oğuz Ürem",
  visitorShieldRules: "İlk 15 gün bağışıklık koruması, parfümsüz ziyaret, maksimum 30 dakika süre, randevu için Oğuz ile iletişim.",

  // MODÜL 3: DOKTOR ODASI TAKTİKLERİ & TIBBİ TERCÜMAN
  medicalTerms: [
    { term: "AFI & NST (Non-Stres Test)", definition: "Amniyotik Sıvı İndeksi (AFI) ve bebek kalp ritmi ile rahim kasılmalarının 20 dk boyunca dinlenmesidir; ağrısız ve zararsız bir refah takibidir." },
    { term: "EFW & Persentil", definition: "Tahmini Fetal Ağırlık (EFW) ve bebeğin haftasına göre büyüme eğrisidir. Güneş %50 ideal koridorunda seyretmektedir." },
    { term: "İndirekt Coombs & Rhogam", definition: "Anne ile bebek arasındaki Rh uyumsuzluğu için 28. haftada yapılan koruyucu antikor iğnesidir; tam koruma sağlar." }
  ],
  medicalTranslator: [
    { term: "NST (Non-Stres Test)", definition: "Bebek kalp atışları ile rahim kasılmalarının 20 dk boyunca eşzamanlı dinlenmesidir; ağrısız ve zararsız bir refah takibidir." },
    { term: "EFW & Persentil", definition: "Tahmini Fetal Ağırlık ve bebeğin haftasına göre büyüme eğrisidir. Güneş %50 ideal koridorunda seyretmektedir." },
    { term: "İndirekt Coombs & Rhogam", definition: "Anne ile bebek arasındaki Rh uyumsuzluğu için 28. haftada yapılan koruyucu antikor iğnesidir; tam koruma sağlar." }
  ],
  doctorQuestions: [
    { id: "dq1", text: "31. haftada Güneş'in amniyotik sıvı indeksi (AFI) ve plasenta yerleşimi ideal sınırlar içinde mi?", asked: false },
    { id: "dq2", text: "Buse'nin akşamları artan bel/pelvis baskısı için pelvik tilt egzersizlerine devam etmesinde sakınca var mı?", asked: false },
    { id: "dq3", text: "32. haftadaki NST takibimize hangi gün başlayacağız ve doğumhane ön kaydı için getirmemiz gereken ek bir evrak var mı?", asked: false }
  ],

  // MODÜL 4: AKILLI SAAT (WEARABLE) SESSİZ NÖBET & BABA PİLİ
  wearable: {
    motherSleep: {
      deepSleep: "1s 15dk (Son 48 Saat)",
      nightWakings: "3 Gece Bölünmesi",
      effortTrend: "Yorgunluk Eğilimi",
      tactic: "Buse'nin son 2 gecedir derin uyku açığı var. 'Saha & Ofis (8-18)' modelindesin: Hafta içi gece blok uykun korunuyor; bunun yerine doğrudan sevdiği akşam yemeğiyle gel ve 19:30-23:00 Babanın Altın Saatleri'ni devral (Cuma-Cumartesi gece takası devrede)."
    },
    fatherBattery: {
      batteryLevel: 68,
      sleepTotal: "17.5 Saat (Son 3 Gün)",
      restingPulse: "74 bpm",
      tactic: "İş ve hazırlık temposuyla yorgunluğun birikiyor. Eve girmeden önce arabada 5 dakika 4-7-8 nefes egzersizi yap; kendi pilin dolu olmalı ki ailene sağlam kalkan olabilesin."
    }
  },

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
    nightShiftActive: false,
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

// -------------------------------------------------------------------------
// MODÜL 5: OPERASYONEL ETKİ KARNESİ HESAPLAYICI (Gamification)
// -------------------------------------------------------------------------
function getImpactScorecard() {
  const tasks = babaState.mentalLoadTasks || [];
  const totalTasks = tasks.length;
  const claimedCount = tasks.filter(t => t.claimed).length;

  const baseHours = tasks.filter(t => t.claimed).reduce((acc, t) => acc + (t.hoursSaved || 0), 0);
  const careBonus = Math.min(3.5, (babaState.liveFeed.filter(f => f.type === "care_completed").length) * 0.5);
  const hoursSaved = (baseHours + careBonus).toFixed(1);

  const shieldIndex = Math.min(99, 78 + (claimedCount * 4) + (babaState.mother.magnesiumTaken ? 3 : 0));

  return {
    claimedCount,
    totalTasks,
    hoursSaved,
    shieldIndex
  };
}

// -------------------------------------------------------------------------
// 10 DAKİKALIK MASAJ ZAMANLAYICISI YÖNETİMİ
// -------------------------------------------------------------------------
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

// -------------------------------------------------------------------------
// CALM TECH TOAST / HAPTİK BİLDİRİM MOTORU
// -------------------------------------------------------------------------
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
        <div class="text-xs font-semibold text-emerald-200">${escapeHtml(title)}</div>
        <div class="text-[11px] text-white/80 truncate">${escapeHtml(message)}</div>
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

// -------------------------------------------------------------------------
// TOHUM ANNE İHTİYAÇ ANALİZ MOTORU
// -------------------------------------------------------------------------
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

  // 4. DMT1 Mineral Zamanlaması
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

// -------------------------------------------------------------------------
// BABA ŞEFKATLİ DESTEK EYLEMİ TAMAMLAMA
// -------------------------------------------------------------------------
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

// -------------------------------------------------------------------------
// MODÜL 1 İŞLEVİ: ZİHİNSEL YÜK GÖREVİNİ DEVRALMA (claimMentalLoadTask)
// -------------------------------------------------------------------------
window.claimMentalLoadTask = async function(taskId) {
  const task = babaState.mentalLoadTasks.find(t => t.id === taskId);
  if (!task) return;

  task.claimed = !task.claimed;
  saveMentalLoadTasksToStorage(babaState.mentalLoadTasks);

  if (navigator.vibrate) {
    try { navigator.vibrate([20, 40, 20]); } catch(e) {}
  }

  const title = task.claimed ? "Bunu Ben Hallediyorum ✓" : "Görev Geri Alındı";
  const toastMsg = task.claimed
    ? `${task.title} devralındı. Buse'nin zihninden düşürüldü (+${task.hoursSaved}s dinlenme).`
    : `${task.title} görev listesine yeniden eklendi.`;

  showCalmToast(title, toastMsg, "🛡️");

  if (task.claimed) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    babaState.liveFeed.unshift({
      id: Date.now(),
      time: timeStr,
      type: "care_completed",
      title: "Bunu Ben Hallediyorum (Zihinsel Yük Masası)",
      text: `${task.title} Oğuz tarafından üstlenildi. Buse'ye ${task.hoursSaved} saat kesintisiz dinlenme kazandırıldı.`
    });

    try {
      await fetch('/api/partner/care-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: "mental_load_claim",
          title: "Bunu Ben Hallediyorum (Zihinsel Yük Masası)",
          text: `${task.title} Oğuz tarafından üstlenildi.`
        })
      });
    } catch (err) {
      console.warn("Care action sync offline:", err);
    }
  }

  renderBabaApp();
};

// -------------------------------------------------------------------------
// MODÜL 2 İŞLEVİ: BİLİMSEL KALKAN VE ZİYARETÇİ KALKANI
// -------------------------------------------------------------------------
window.useScientificShield = async function(shieldId) {
  const shield = babaState.scientificShields.find(s => s.id === shieldId);
  if (!shield) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(shield.shield);
    } catch (e) {
      console.warn("Clipboard note:", e);
    }
  }

  showCalmToast("Bilimsel Kalkan Kopyalandı", "Cevap panoya alındı. Akrabalara nazikçe iletebilirsin.", "🛡️");

  const now = new Date();
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  babaState.liveFeed.unshift({
    id: Date.now(),
    time: timeStr,
    type: "care_completed",
    title: "Bilimsel Hurafe Kalkanı",
    text: `"${shield.title}" için kanıta dayalı koruyucu yanıt panoya kopyalandı.`
  });

  try {
    await fetch('/api/partner/care-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: "scientific_shield",
        title: "Bilimsel Hurafe Kalkanı",
        text: shield.shield
      })
    });
  } catch (err) {
    console.warn("Care action sync offline:", err);
  }

  renderBabaApp();
};

window.copyVisitorShieldMessage = async function() {
  const msg = babaState.visitorShieldTemplate;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(msg);
    } catch (e) {
      console.warn("Clipboard note:", e);
    }
  }

  showCalmToast("Ziyaretçi Kalkanı Kopyalandı", "WhatsApp aile grubuna göndermeye hazır.", "📋");

  const now = new Date();
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  babaState.liveFeed.unshift({
    id: Date.now(),
    time: timeStr,
    type: "care_completed",
    title: "Lohusa Ziyaretçi Kalkanı",
    text: "Oğuz aile ziyaret kurallarını WhatsApp şablonuyla devraldı."
  });

  try {
    await fetch('/api/partner/care-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: "visitor_shield",
        title: "Lohusa Ziyaretçi Kalkanı",
        text: "Ziyaretçi kalkanı mesajı kopyalandı."
      })
    });
  } catch (err) {
    console.warn("Care action sync offline:", err);
  }

  renderBabaApp();
};

// -------------------------------------------------------------------------
// MODÜL 3 İŞLEVİ: DOKTOR ODASI TAKTİKLERİ & SORU İŞARETLEME
// -------------------------------------------------------------------------
window.toggleDoctorQuestion = async function(qId) {
  const q = babaState.doctorQuestions.find(item => item.id === qId);
  if (!q) return;

  q.asked = !q.asked;

  if (navigator.vibrate) {
    try { navigator.vibrate(15); } catch(e) {}
  }

  showCalmToast(q.asked ? "Soruldu / Not Alındı ✓" : "Soru Listesi Güncellendi", `${q.text.slice(0, 36)}...`, "🩺");

  if (q.asked) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    babaState.liveFeed.unshift({
      id: Date.now(),
      time: timeStr,
      type: "care_completed",
      title: "Doktor Odası Tıbbi Soru & Not",
      text: `Dr. Ayşe Yılmaz'a yöneltildi: "${q.text}"`
    });

    try {
      await fetch('/api/partner/care-action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: "doctor_question",
          title: "Doktor Odası Tıbbi Soru & Not",
          text: q.text
        })
      });
    } catch (err) {
      console.warn("Care action sync offline:", err);
    }
  }

  renderBabaApp();
};

// -------------------------------------------------------------------------
// MODÜL 4 İŞLEVİ: AKILLI SAAT SESSİZ NÖBET VE BABA PİL YÖNETİMİ
// -------------------------------------------------------------------------
window.activateNightShiftHandover = async function() {
  babaState.mother.nightShiftActive = true;

  if (navigator.vibrate) {
    try { navigator.vibrate([30, 60, 30]); } catch(e) {}
  }

  showCalmToast("Gece Nöbeti Devralındı", "22:30 sonrası sessiz nöbet ve akşam mutfak sorumluluğu Oğuz'da.", "🌙");

  const now = new Date();
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  babaState.liveFeed.unshift({
    id: Date.now(),
    time: timeStr,
    type: "care_completed",
    title: "Gece Nöbeti & Akşam Konforu",
    text: "Oğuz Buse'nin derin uyku açığını kapatmak için 22:30 sonrası nöbeti ve akşam karar yükünü devraldı."
  });

  try {
    await fetch('/api/partner/care-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: "night_shift",
        title: "Gece Nöbeti & Akşam Konforu",
        text: "Oğuz 22:30 sonrası nöbeti devraldı."
      })
    });
  } catch (err) {
    console.warn("Care action sync offline:", err);
  }

  renderBabaApp();
};

window.completeFatherRecharge = async function() {
  babaState.wearable.fatherBattery.batteryLevel = Math.min(100, babaState.wearable.fatherBattery.batteryLevel + 12);

  if (navigator.vibrate) {
    try { navigator.vibrate([20, 30, 20]); } catch(e) {}
  }

  showCalmToast("5 Dk Nefes Molası Tamamlandı", "4-7-8 ritmiyle sakinleştiniz. Aileniz için piliniz tazelendi.", "🔋");

  const now = new Date();
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  babaState.liveFeed.unshift({
    id: Date.now(),
    time: timeStr,
    type: "care_completed",
    title: "Baba Pil Yönetimi & Sakinleşme",
    text: "Oğuz 5 dakikalık nefes ve sakinleşme molası vererek ailesine sağlam kalkan olmak için pilini tazeledi."
  });

  try {
    await fetch('/api/partner/care-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: "father_recharge",
        title: "Baba Pil Yönetimi & Sakinleşme",
        text: "Oğuz 5 dakikalık nefes molası verdi."
      })
    });
  } catch (err) {
    console.warn("Care action sync offline:", err);
  }

  renderBabaApp();
};

// -------------------------------------------------------------------------
// MODÜL 6 İŞLEVLERİ: EV-İŞ DİNAMİK VARDİYA MATRİSİ
// -------------------------------------------------------------------------
function getDynamicMotherSleepTactic(modelKey) {
  switch (modelKey) {
    case 'office_8_18':
      return "Buse'nin son 2 gecedir derin uyku açığı var. 'Saha & Ofis (8-18)' modelindesin: Hafta içi gece blok uykun korunuyor; bunun yerine doğrudan sevdiği akşam yemeğiyle gel ve 19:30-23:00 Babanın Altın Saatleri'ni devral (Cuma-Cumartesi gece takası devrede).";
    case 'remote':
      return "Buse'nin son 2 gecedir derin uyku açığı var. 'Uzaktan / Remote' modelindesin: 18:00 keskin mesai bitişiyle çalışma odasını kapat, 10 dk nefes molası al ve 18:15-22:00 anne derin dinlenme koridorunu hemen başlat.";
    case 'hybrid':
      return "Buse'nin son 2 gecedir derin uyku açığı var. 'Hibrit' modelindesin: Ev günlerinde 18:00'de hemen devral, ofis günlerinde trafik tamponu sonrası 19:30'da Babanın Altın Saatleri ile Buse'nin ilk uykusunu koru.";
    case 'role_reversal':
      return "Buse'nin son 2 gecedir derin uyku açığı var. 'Rol Değişimi' modelindesin: Anne İş Modu Kalkanı devrede; lojistik, yemek ve dinlenme alanını sen yöneterek Buse'nin iş çıkışı ilk 3 saat deliksiz dinlenmesini sağla.";
    case 'both_home':
      return "Buse'nin son 2 gecedir derin uyku açığı var. 'Çift Mesai / 7-24 Çekirdek Ekip' modelindesin: 14:00-20:00 vardiyasını devralarak Buse'ye kesintisiz 6 saatlik derin uyku ve zihinsel mola alanı aç.";
    default:
      return "Buse'nin son 2 gecedir derin uyku açığı var. 'Saha & Ofis (8-18)' modelindesin: Hafta içi gece blok uykun korunuyor; bunun yerine doğrudan sevdiği akşam yemeğiyle gel ve 19:30-23:00 Babanın Altın Saatleri'ni devral (Cuma-Cumartesi gece takası devrede).";
  }
}
window.getDynamicMotherSleepTactic = getDynamicMotherSleepTactic;

window.setWorkLifeModel = async function(modelKey) {
  if (!babaState.workLifeModels[modelKey]) return;
  babaState.workLifeMatrix.activeModel = modelKey;
  saveWorkMatrixToStorage(babaState.workLifeMatrix);

  babaState.wearable.motherSleep.tactic = getDynamicMotherSleepTactic(modelKey);
  const model = babaState.workLifeModels[modelKey];

  if (navigator.vibrate) {
    try { navigator.vibrate([25, 45, 25]); } catch(e) {}
  }

  showCalmToast("Çalışma Modeli Güncellendi", `${model.name} aktif edildi. Vardiya takvimi uyarlandı.`, "💼");

  const now = new Date();
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  babaState.liveFeed.unshift({
    id: Date.now(),
    time: timeStr,
    type: "care_completed",
    title: "Ev-İş Dinamik Vardiya Matrisi",
    text: `Çalışma düzeni "${model.name}" olarak uyarlandı. Gece nöbet ve odak saatleri senkronize edildi.`
  });

  try {
    await fetch('/api/partner/care-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: "work_model_sync",
        title: "Ev-İş Dinamik Vardiya Matrisi",
        text: `${model.name} seçildi.`
      })
    });
  } catch (err) {
    console.warn("Care action sync offline:", err);
  }

  renderBabaApp();
};

window.setCommuteDuration = function(commuteKey) {
  babaState.workLifeMatrix.commuteDuration = commuteKey;
  saveWorkMatrixToStorage(babaState.workLifeMatrix);
  if (navigator.vibrate) {
    try { navigator.vibrate([20, 20]); } catch(e) {}
  }
  showCalmToast("Yol Süresi Güncellendi", "Eve giriş tamponu yeniden hesaplandı.", "⏱");
  renderBabaApp();
};

// -------------------------------------------------------------------------
// MODÜL 7 İŞLEVLERİ: BİREYSEL MUTLULUK & ÇİFT BAĞI
// -------------------------------------------------------------------------
window.claimLegitimateBreak = async function() {
  babaState.individualWellbeing.breakActive = true;

  if (navigator.vibrate) {
    try { navigator.vibrate([30, 60, 30]); } catch(e) {}
  }

  showCalmToast("45 Dk Meşru Mola Başlatıldı", "Buse'nin onayı devrede. Kahveni iç veya yürüyüşe çık; bu meşru bakımdır.", "☕");

  const now = new Date();
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  babaState.liveFeed.unshift({
    id: Date.now(),
    time: timeStr,
    type: "care_completed",
    title: "45 Dk Meşru Mola Takası",
    text: "Oğuz Buse'nin istirahat onayıyla 45 dakikalık meşru zihinsel bakım molasını başlattı."
  });

  try {
    await fetch('/api/partner/care-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: "legitimate_break",
        title: "45 Dk Meşru Mola Takası",
        text: "Oğuz meşru mola başlattı."
      })
    });
  } catch (err) {
    console.warn("Care action sync offline:", err);
  }

  renderBabaApp();
};

window.startCoupleMicroSession = async function() {
  babaState.individualWellbeing.coupleBondActive = true;

  if (navigator.vibrate) {
    try { navigator.vibrate([40, 40]); } catch(e) {}
  }

  showCalmToast("Biz Bizeyiz Modu Aktif", "Telefonları ters çevirin. 10 dakika sadece ikinizi konuşun.", "🕊️");

  const now = new Date();
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  babaState.liveFeed.unshift({
    id: Date.now(),
    time: timeStr,
    type: "care_completed",
    title: "Biz Bizeyiz Çift Kilidi",
    text: "Oğuz ve Buse bebek hazırlığı dışındaki baş başa çift seansını başlattı."
  });

  try {
    await fetch('/api/partner/care-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: "couple_bond",
        title: "Biz Bizeyiz Çift Kilidi",
        text: "10 dk çift bağı başlatıldı."
      })
    });
  } catch (err) {
    console.warn("Care action sync offline:", err);
  }

  renderBabaApp();
};

// -------------------------------------------------------------------------
// MODÜL 8 İŞLEVLERİ: EŞ ÇEVİRİCİ, USTA BABA & BÜTÇE FİLTRESİ
// -------------------------------------------------------------------------
window.applyEmpathyTactic = async function(id) {
  const item = babaState.empathyTranslator.find(e => e.id === id);
  if (!item) return;

  item.tacticApplied = true;

  if (navigator.vibrate) {
    try { navigator.vibrate(20); } catch(e) {}
  }

  showCalmToast("Eş Çevirici Taktiği Uygulandı", "Savunmayı bırakıp şefkatle yaklaştın. Buse'nin zihni rahatladı.", "🤍");

  const now = new Date();
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  babaState.liveFeed.unshift({
    id: Date.now(),
    time: timeStr,
    type: "care_completed",
    title: "Eş Çevirici Şefkat Taktiği",
    text: `Oğuz Buse'nin sitemini şefkatle tercüme edip doğrudan sorumluluk aldı.`
  });

  try {
    await fetch('/api/partner/care-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: "empathy_translator",
        title: "Eş Çevirici Şefkat Taktiği",
        text: item.whatSheMeant
      })
    });
  } catch (err) {
    console.warn("Care action sync offline:", err);
  }

  renderBabaApp();
};

window.completeMasterSkill = async function(id) {
  const skill = babaState.masterDadSkills.find(s => s.id === id);
  if (!skill) return;

  skill.mastered = true;

  if (navigator.vibrate) {
    try { navigator.vibrate([20, 40]); } catch(e) {}
  }

  showCalmToast("Usta Baba Becerisi Tamamlandı", `${skill.title} hazır.`, "🎖️");

  const now = new Date();
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  babaState.liveFeed.unshift({
    id: Date.now(),
    time: timeStr,
    type: "care_completed",
    title: "Usta Baba Mikro Becerisi",
    text: `"${skill.title}" pratiği başarıyla tamamlandı.`
  });

  try {
    await fetch('/api/partner/care-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: "master_skill",
        title: "Usta Baba Mikro Becerisi",
        text: skill.title
      })
    });
  } catch (err) {
    console.warn("Care action sync offline:", err);
  }

  renderBabaApp();
};

window.applyBudgetFilter = async function(id) {
  const item = babaState.budgetFilter.find(b => b.id === id);
  if (!item) return;

  item.filtered = true;

  if (navigator.vibrate) {
    try { navigator.vibrate(25); } catch(e) {}
  }

  showCalmToast("Akıllı Bütçe Filtresi", `${item.savedAmount} tasarruf aile bütçesinde kaldı.`, "💰");

  const now = new Date();
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  babaState.liveFeed.unshift({
    id: Date.now(),
    time: timeStr,
    type: "care_completed",
    title: "Akıllı Bütçe Tasarrufu",
    text: `${item.item} elendi. Aile bütçesi kazancı: ${item.savedAmount}.`
  });

  try {
    await fetch('/api/partner/care-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: "budget_filter",
        title: "Akıllı Bütçe Tasarrufu",
        text: `${item.item} elendi. Tasarruf: ${item.savedAmount}`
      })
    });
  } catch (err) {
    console.warn("Care action sync offline:", err);
  }

  renderBabaApp();
};

// -------------------------------------------------------------------------
// MODÜL 9 İŞLEVİ: KOVAN MİNİ ANKETİNDE OY KULLANMA (voteKovanMiniPoll)
// -------------------------------------------------------------------------
window.voteKovanMiniPoll = async function(pollId, choice) {
  const poll = babaState.kovanWeeklyPolls.find(p => p.id === pollId);
  if (!poll) return;

  if (poll.voted) {
    showCalmToast("Oyunuz Zaten Kayıtlı", "Kovan babaları dayanışmanız için teşekkür eder.", "✓");
    return;
  }

  poll.voted = true;
  poll.userChoice = choice;
  poll.totalVotes++;
  saveKovanPollsToStorage(babaState.kovanWeeklyPolls);

  if (navigator.vibrate) {
    try { navigator.vibrate([20, 30]); } catch(e) {}
  }

  showCalmToast("Oyunuz Kaydedildi", "Kovan babalarıyla anonim olarak paylaşıldı.", "▦");

  const now = new Date();
  const timeStr = now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
  babaState.liveFeed.unshift({
    id: Date.now(),
    time: timeStr,
    type: "care_completed",
    title: "Kovan Haftalık Mini Anketi",
    text: `Oğuz "${poll.weekLabel}" anketinde anonim oy kullandı.`
  });

  try {
    await fetch('/api/partner/care-action', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: "kovan_poll_vote",
        title: poll.weekLabel,
        text: `Oğuz ${poll.weekLabel} anketinde oy kullandı.`
      })
    });
  } catch (err) {
    console.warn("Care action sync offline:", err);
  }

  renderBabaApp();
};

// -------------------------------------------------------------------------
// SES KÖPRÜSÜ & AKUSTİK FREKANS REZONANSI
// -------------------------------------------------------------------------
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

// -------------------------------------------------------------------------
// HASTANE ÇANTASI ÖĞE SEÇİMİ
// -------------------------------------------------------------------------
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
  const rawText = inp.value.trim();
  const text = rawText.slice(0, 400); // 400 karakter üst sınırı
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
  const text = prompt(`${userName} komşunuza iletmek istediğiniz mesaj:`, "Merhaba, paylaştığınız eşya ile ilgileniyorum. Durumu hakkında görüşebilir miyiz?");
  if (!text) return;
  const cleanText = text.trim().slice(0, 400);
  babaState.kovanMessages.push({
    sender: "Oğuz",
    text: `[@${userName}]: ${cleanText}`,
    time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    isMe: true
  });
  showCalmToast("Özel Mesaj İletildi", `${userName} adlı babaya mesajınız aktarıldı.`, "💬");
  renderBabaApp();
};

// -------------------------------------------------------------------------
// ANA RENDER FONKSİYONU
// -------------------------------------------------------------------------
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
          <div class="text-[10px] text-white/50">${escapeHtml(babaState.user.name)} · ${escapeHtml(babaState.baby.name)} (${curW}. Hafta)</div>
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

// -------------------------------------------------------------------------
// SEKME İÇERİK OLUŞTURUCU
// -------------------------------------------------------------------------
function renderBabaTabContent(analysisCards) {
  if (babaState.activeTab === "analysis") {
    const isTimerActive = massageTimerRunning;
    const mLeft = Math.floor(massageTimerSeconds / 60);
    const sLeft = massageTimerSeconds % 60;
    const timeFormatted = `${mLeft.toString().padStart(2, '0')}:${sLeft.toString().padStart(2, '0')}`;
    const scorecard = getImpactScorecard();
    const mentalTasks = babaState.mentalLoadTasks || [];
    const activeModelKey = babaState.workLifeMatrix.activeModel || "office_8_18";
    const activeModel = babaState.workLifeModels[activeModelKey];
    const activeCommuteKey = (babaState.workLifeMatrix && babaState.workLifeMatrix.commuteDuration) || "1_2_hours";
    const dynamicMotherSleepTactic = getDynamicMotherSleepTactic(activeModelKey);
    babaState.wearable.motherSleep.tactic = dynamicMotherSleepTactic;

    let computedEntryBuffer = activeModel.buffer;
    if (activeModelKey === 'office_8_18') {
      if (activeCommuteKey === '<30_min') {
        computedEntryBuffer = "10 dk sessiz nefes tamponu (Trafik akıcı; kapıdan girince ilk 10 dk dinlenme, 18:20 devir hazır).";
      } else if (activeCommuteKey === '2_plus_hours') {
        computedEntryBuffer = "25-30 dk dekompresyon & duş tamponu (Yoğun Manisa-İzmir trafiği sonrası zihinsel deşarj; 19:45 nöbet devri).";
      } else {
        computedEntryBuffer = "15 dk eve giriş tamponu (Kapıdan girince ilk 15 dk dekompresyon, 19:30 Altın Saatler tam odak).";
      }
    } else if (activeModelKey === 'remote') {
      computedEntryBuffer = "Uzaktan / Ev Modu: 0 dk yol; 10 dk çalışma odasından çıkış ve zihinsel sınır tamponu (18:10 nöbet devri).";
    } else if (activeModelKey === 'hybrid') {
      if (activeCommuteKey === '<30_min') {
        computedEntryBuffer = "Hibrit Gün: Ofiste 10 dk eve giriş tamponu, uzaktan çalışma gününde 18:00 anında devir.";
      } else if (activeCommuteKey === '2_plus_hours') {
        computedEntryBuffer = "Hibrit Gün: Ofiste 25 dk yoğun trafik dekompresyonu, ev gününde 18:00 anında devir.";
      } else {
        computedEntryBuffer = "Hibrit Gün: Ofiste 15 dk eve giriş tamponu, uzaktan çalışma gününde 18:00 anında devir.";
      }
    } else if (activeModelKey === 'role_reversal') {
      computedEntryBuffer = "Babanın lojistik tamponu: Buse'nin eve dönüş saatine göre akşam ortamı hazır, zihinsel sınır tam korumalı.";
    } else if (activeModelKey === 'both_home') {
      computedEntryBuffer = "0 dk yol; vardiya devirlerinde (08:00 ve 14:00) 15 dk sessiz oda takası tamponu.";
    }

    return `
      <!-- MODÜL 5: OPERASYONEL ETKİ KARNESİ (EN ÜSTTE) -->
      <div class="p-3.5 bg-gradient-to-br from-emerald-950/60 via-slate-900/70 to-amber-950/30 rounded-2xl border border-emerald-500/30 text-white space-y-2.5 shadow-md">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <span class="text-amber-300 text-sm">⚡</span>
            <span class="font-serif font-bold text-xs text-amber-200 tracking-wide">Operasyonel Etki Karnesi</span>
          </div>
          <span class="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 font-medium">
            Erkek Odaklı Koruyucu Liderlik
          </span>
        </div>

        <div class="grid grid-cols-3 gap-2 text-center pt-1">
          <div class="p-2 bg-black/40 rounded-xl border border-white/5">
            <div class="text-[9px] text-white/50">Üstlenilen Sorumluluk</div>
            <div class="text-xs font-mono font-bold text-amber-200 mt-0.5">${scorecard.claimedCount} / ${scorecard.totalTasks} Görev</div>
          </div>
          <div class="p-2 bg-black/40 rounded-xl border border-white/5">
            <div class="text-[9px] text-white/50">Kazandırılan Kesintisiz Dinlenme</div>
            <div class="text-xs font-mono font-bold text-emerald-300 mt-0.5">+${scorecard.hoursSaved} Saat</div>
          </div>
          <div class="p-2 bg-black/40 rounded-xl border border-white/5">
            <div class="text-[9px] text-white/50">Aile Kalkanı Endeksi</div>
            <div class="text-xs font-mono font-bold text-amber-300 mt-0.5">%${scorecard.shieldIndex}</div>
          </div>
        </div>

        <div class="text-[9px] text-white/70 flex items-center justify-between pt-1 border-t border-white/5">
          <span>Buse'nin Destek Hissi: <b class="text-emerald-300 font-medium">Çok Yüksek</b></span>
          <span class="text-amber-200/80">31. Hafta Koruması Devrede</span>
        </div>
      </div>

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

      <!-- MODÜL 1: "BUNU BEN HALLEDİYORUM" ZİHİNSEL YÜK MASASI -->
      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
        <div class="flex justify-between items-start">
          <div>
            <span class="text-[9px] uppercase tracking-wider text-amber-300 font-medium">Zihinsel Yük Masası</span>
            <h3 class="text-sm font-serif font-bold text-white mt-0.5">"Bunu Ben Hallediyorum"</h3>
            <p class="text-[10px] text-white/60">Buse'nin zihninden düşürülen lojistik ve hazırlık sorumlulukları</p>
          </div>
          <span class="text-[10px] font-mono font-bold text-amber-200 bg-amber-500/15 border border-amber-400/30 px-2 py-0.5 rounded-full">
            ${scorecard.claimedCount}/${scorecard.totalTasks} Devralındı
          </span>
        </div>

        <div class="space-y-2">
          ${mentalTasks.map(task => `
            <div class="p-3 rounded-2xl border transition ${task.claimed ? 'bg-emerald-950/25 border-emerald-500/30' : 'bg-black/30 border-white/10'} space-y-2">
              <div class="flex justify-between items-center text-[10px]">
                <span class="text-[9px] px-2 py-0.5 rounded-full border ${task.claimed ? 'text-emerald-200 border-emerald-400/30 bg-emerald-500/10' : 'text-amber-200 border-amber-400/30 bg-amber-500/10'}">
                  ${escapeHtml(task.category)}
                </span>
                <span class="text-[9px] text-emerald-300 font-mono font-semibold">+${task.hoursSaved} Saat Dinlenme</span>
              </div>
              <div class="text-xs font-medium ${task.claimed ? 'text-white/95 line-through opacity-85' : 'text-white'}">
                ${escapeHtml(task.title)}
              </div>
              <div class="pt-1 flex justify-end">
                <button onclick="claimMentalLoadTask('${task.id}')" class="px-3 py-1.5 rounded-xl text-[10px] font-semibold border transition active:scale-95 ${task.claimed ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200' : 'bg-amber-500/25 hover:bg-amber-500/35 border-amber-400/40 text-amber-200'}">
                  ${task.claimed ? 'Devralındı ✓ (Buse\'nin Zihninden Düşürüldü)' : 'Bunu Ben Hallediyorum'}
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- MODÜL 4: AKILLI SAAT (WEARABLE) SESSİZ NÖBET & BABA PİL YÖNETİMİ -->
      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
        <div class="flex justify-between items-center">
          <div>
            <span class="text-[9px] uppercase tracking-wider text-sky-300 font-medium">Biyoritim Radarı (MDR Uyumlu)</span>
            <h3 class="text-sm font-serif font-bold text-white mt-0.5">Akıllı Saat Sessiz Nöbet &amp; Baba Pil Yönetimi</h3>
          </div>
          <span class="text-[9px] px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-200 font-mono">
            Operasyonel Taktik
          </span>
        </div>

        <!-- 4A. Anne Biyoritim & Uyku Radarı -->
        <div class="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-2 text-[10px]">
          <div class="flex justify-between items-center">
            <span class="font-semibold text-amber-200">Anne Biyoritim &amp; Uyku Radarı</span>
            <span class="text-rose-300 font-mono">${escapeHtml(babaState.wearable.motherSleep.effortTrend)}</span>
          </div>
          <div class="text-white/70 leading-relaxed">
            ${escapeHtml(babaState.wearable.motherSleep.deepSleep)} · ${escapeHtml(babaState.wearable.motherSleep.nightWakings)}
          </div>
          <div class="p-2 bg-white/5 rounded-xl text-white/80 border border-white/5 leading-relaxed">
            <b class="text-amber-200">Operasyonel Taktik:</b> ${escapeHtml(babaState.wearable.motherSleep.tactic)}
          </div>
          <button onclick="activateNightShiftHandover()" class="w-full py-2 bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-[10px] font-semibold rounded-xl transition flex items-center justify-center space-x-1.5 active:scale-95">
            <span>🌙</span>
            <span>Gece Nöbetini &amp; Akşam Yemeğini Devraldım</span>
          </button>
        </div>

        <!-- 4B. Babanın Kendi Tükenmişlik Kotası -->
        <div class="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-2 text-[10px]">
          <div class="flex justify-between items-center">
            <span class="font-semibold text-emerald-200">Babanın Kendi Tükenmişlik Kotası</span>
            <span class="text-emerald-300 font-mono font-bold">Pil: %${babaState.wearable.fatherBattery.batteryLevel}</span>
          </div>
          <div class="text-white/70 leading-relaxed">
            ${escapeHtml(babaState.wearable.fatherBattery.sleepTotal)} · Dinlenik Nabız: ${escapeHtml(babaState.wearable.fatherBattery.restingPulse)}
          </div>
          <div class="p-2 bg-white/5 rounded-xl text-white/80 border border-white/5 leading-relaxed">
            <b class="text-emerald-200">Taktik:</b> ${escapeHtml(babaState.wearable.fatherBattery.tactic)}
          </div>
          <button onclick="completeFatherRecharge()" class="w-full py-2 bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-400/40 text-emerald-200 text-[10px] font-semibold rounded-xl transition flex items-center justify-center space-x-1.5 active:scale-95">
            <span>🔋</span>
            <span>5 Dk Nefes &amp; Sakinleşme Molası Verdim</span>
          </button>
        </div>
      </div>

      <!-- MODÜL 6: EV-İŞ DİNAMİK VARDİYA MATRİSİ KARTI -->
      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
        <div class="flex justify-between items-center">
          <div>
            <span class="text-[9px] uppercase tracking-wider text-amber-300 font-medium">Esnek Aile Lojistiği</span>
            <h3 class="text-sm font-serif font-bold text-white mt-0.5">Ev-İş Dinamik Vardiya Matrisi</h3>
          </div>
          <span class="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 font-medium">
            5 Model
          </span>
        </div>

        <!-- Model Seçici Hap Butonlar -->
        <div class="space-y-1">
          <div class="text-[9px] text-white/50 font-medium">Çalışma Modeli Seçimi:</div>
          <div class="grid grid-cols-3 gap-1 text-[9px]">
            <button onclick="setWorkLifeModel('office_8_18')" class="py-1.5 px-1 rounded-xl border text-center transition ${activeModelKey === 'office_8_18' ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold' : 'bg-white/5 border-white/10 text-white/60'}">
              Saha/Ofis 8-18
            </button>
            <button onclick="setWorkLifeModel('remote')" class="py-1.5 px-1 rounded-xl border text-center transition ${activeModelKey === 'remote' ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold' : 'bg-white/5 border-white/10 text-white/60'}">
              Remote
            </button>
            <button onclick="setWorkLifeModel('hybrid')" class="py-1.5 px-1 rounded-xl border text-center transition ${activeModelKey === 'hybrid' ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold' : 'bg-white/5 border-white/10 text-white/60'}">
              Hibrit
            </button>
            <button onclick="setWorkLifeModel('role_reversal')" class="py-1.5 px-1 rounded-xl border text-center transition ${activeModelKey === 'role_reversal' ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold' : 'bg-white/5 border-white/10 text-white/60'}">
              Rol Değişimi
            </button>
            <button onclick="setWorkLifeModel('both_home')" class="py-1.5 px-1 rounded-xl border text-center transition ${activeModelKey === 'both_home' ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold' : 'bg-white/5 border-white/10 text-white/60'} col-span-2">
              Çift Mesai / 7-24 Çekirdek Ekip
            </button>
          </div>
        </div>

        <!-- Günlük Yol / Trafik Süresi Seçici Butonları -->
        <div class="space-y-1">
          <div class="flex justify-between items-center text-[9px]">
            <span class="text-white/50 font-medium">Günlük Yol / Trafik Süresi:</span>
            <span class="text-amber-200 font-mono font-medium">${activeCommuteKey === '<30_min' ? '&lt; 30 Dk' : (activeCommuteKey === '2_plus_hours' ? '2+ Saat' : '1-2 Saat')}</span>
          </div>
          <div class="grid grid-cols-3 gap-1 text-[9px]">
            <button onclick="setCommuteDuration('<30_min')" class="py-1.5 px-1 rounded-xl border text-center transition ${activeCommuteKey === '<30_min' ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold' : 'bg-white/5 border-white/10 text-white/60'}">
              &lt; 30 Dk
            </button>
            <button onclick="setCommuteDuration('1_2_hours')" class="py-1.5 px-1 rounded-xl border text-center transition ${activeCommuteKey === '1_2_hours' ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold' : 'bg-white/5 border-white/10 text-white/60'}">
              1-2 Saat
            </button>
            <button onclick="setCommuteDuration('2_plus_hours')" class="py-1.5 px-1 rounded-xl border text-center transition ${activeCommuteKey === '2_plus_hours' ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold' : 'bg-white/5 border-white/10 text-white/60'}">
              2+ Saat
            </button>
          </div>
        </div>

        <div class="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-2 text-[10px]">
          <div class="font-bold text-amber-200 flex items-center justify-between">
            <span>${escapeHtml(activeModel.name)}</span>
            <span class="text-white/40 text-[9px] font-normal">Aktif Çizelge</span>
          </div>
          <div class="p-2 bg-white/5 rounded-xl text-white/80 border border-white/5 leading-relaxed">
            <b class="text-emerald-300">Eve Giriş Tamponu:</b> ${escapeHtml(computedEntryBuffer)}
          </div>
          <div class="p-2 bg-white/5 rounded-xl text-white/80 border border-white/5 leading-relaxed">
            <b class="text-amber-200">Vardiya Dağılımı:</b> ${escapeHtml(activeModel.shift)}
          </div>
        </div>
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
                <div class="text-white/70 mt-0.5 leading-relaxed">${escapeHtml(f.text)}</div>
              </div>
              <span class="text-[9px] text-white/40 font-mono shrink-0 ml-2 mt-0.5">${f.time}</span>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  } else if (babaState.activeTab === "home") {
    const wellbeing = babaState.individualWellbeing;

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

        <!-- MODÜL 7: BİREYSEL MUTLULUK & ÇİFT BAĞI KARTI -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="text-[9px] uppercase tracking-wider text-amber-300 font-medium">Bireysel Mutluluk &amp; Çift Bağı</span>
              <h4 class="font-serif font-bold text-base text-white mt-0.5">Meşru Mola &amp; "Biz Bizeyiz"</h4>
            </div>
            <span class="text-[9px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full font-mono">
              Çift Bağı
            </span>
          </div>

          <!-- 45 Dk Meşru Mola Takası -->
          <div class="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-2 text-[10px]">
            <div class="flex justify-between items-center">
              <span class="font-semibold text-amber-200">45 Dk Meşru Mola Takası (Pass-the-Torch)</span>
              <span class="text-emerald-300 font-mono">${wellbeing.breakActive ? '45 Dk Meşru Mola Aktif ✓' : 'Buse Dinlenmede ✓'}</span>
            </div>
            <p class="text-white/70 leading-relaxed">
              Bu akşam 20:00 - 20:45 arası senin "Meşru Mola" saatin. Buse'nin dinlenme verisi stabil ve onayı alındı. Kahveni iç, yürüyüşe çık veya oyununu oyna; bu bir kaçamak değil, meşru zihinsel bakım.
            </p>
            <button onclick="claimLegitimateBreak()" class="w-full py-2 ${wellbeing.breakActive ? 'bg-emerald-600/40 border-emerald-400 text-emerald-100 font-bold' : 'bg-emerald-500/25 hover:bg-emerald-500/35 border-emerald-400/40 text-emerald-200'} text-[10px] font-semibold rounded-xl transition flex items-center justify-center space-x-1.5 active:scale-95">
              <span>☕</span>
              <span>${wellbeing.breakActive ? '45 Dk Meşru Mola Aktif ✓' : '45 Dk Meşru Molamı Başlat'}</span>
            </button>
          </div>

          <!-- Gizli Teşekkür & "Biz Bizeyiz" Çift Kilidi -->
          <div class="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-2 text-[10px]">
            <div class="flex justify-between items-center">
              <span class="font-semibold text-rose-200">Gizli Teşekkür &amp; "Biz Bizeyiz" Çift Kilidi</span>
              <span class="${wellbeing.coupleBondActive ? 'text-rose-300 font-bold' : 'text-white/40'} text-[9px]">${wellbeing.coupleBondActive ? 'Biz Bizeyiz Modu Aktif ✓' : '10 Dk Baş Başa'}</span>
            </div>
            <div class="p-2 bg-rose-950/20 rounded-xl border border-rose-400/20 text-rose-200 italic leading-relaxed">
              "${escapeHtml(wellbeing.appreciation.quote)}"
            </div>
            <div class="text-white/70 leading-relaxed bg-white/5 p-2 rounded-xl border border-white/5">
              <b class="text-amber-200">Çift Sorusu:</b> ${escapeHtml(wellbeing.coupleQuestion.prompt)}
            </div>
            <button onclick="startCoupleMicroSession()" class="w-full py-2 ${wellbeing.coupleBondActive ? 'bg-rose-600/40 border-rose-400 text-rose-100 font-bold' : 'bg-rose-500/25 hover:bg-rose-500/35 border-rose-400/40 text-rose-200'} text-[10px] font-semibold rounded-xl transition flex items-center justify-center space-x-1.5 active:scale-95">
              <span>🕊️</span>
              <span>${wellbeing.coupleBondActive ? 'Biz Bizeyiz Modu Aktif ✓' : 'Telefonu Ters Çevir &amp; 10 Dk "Biz Bizeyiz" Moduna Geç'}</span>
            </button>
          </div>
        </div>

        <!-- Akustik Ses Köprüsü & Babanın Ses Frekansı -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <h4 class="font-serif font-bold text-base text-white">Akustik Ses Köprüsü</h4>
              <p class="text-[10px] text-white/60">İşitsel Nörogelişim &amp; Babanın Pes Ses Frekansları</p>
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
          <div class="space-y-1.5 max-h-52 overflow-y-auto pr-1">
            ${filteredItems.map(item => `
              <div onclick="toggleBagItem('${item.id}')" class="p-2.5 rounded-2xl border transition cursor-pointer flex items-center justify-between text-xs ${item.checked ? 'bg-emerald-950/30 border-emerald-500/30 text-white' : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/[0.08]'}">
                <div class="flex items-center space-x-2.5 min-w-0 pr-2">
                  <span class="w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border ${item.checked ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold text-[11px]' : 'bg-black/30 border-white/20 text-transparent'}">
                    ✓
                  </span>
                  <span class="text-[11px] leading-tight ${item.checked ? 'text-white/95 line-through opacity-75' : 'text-white/90'}">
                    ${escapeHtml(item.label)}
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

        <!-- MODÜL 3: DOKTOR ODASI TAKTİKLERİ & TIBBİ TERCÜMAN -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="text-[9px] uppercase tracking-wider text-amber-300 font-medium">Hekim Muayene Hazırlığı</span>
              <h4 class="text-sm font-serif font-bold text-white mt-0.5">Doktor Odası Taktikleri &amp; Tıbbi Tercüman</h4>
            </div>
            <span class="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-200 font-mono">
              Dr. Ayşe Yılmaz
            </span>
          </div>

          <!-- Tıbbi Terim Tercümanı -->
          <div class="space-y-1.5 text-[10px]">
            <div class="font-semibold text-white/90">Tıbbi Tercüman (Baba İçin Sade Özet)</div>
            ${babaState.medicalTerms.map(t => `
              <div class="p-2 bg-black/40 rounded-xl border border-white/5">
                <div class="font-bold text-amber-200">${escapeHtml(t.term)}</div>
                <div class="text-white/70 mt-0.5 leading-relaxed">${escapeHtml(t.definition)}</div>
              </div>
            `).join('')}
          </div>

          <!-- Op. Dr. Ayşe Yılmaz'a Senin Sorman Gereken 3 Net Soru -->
          <div class="space-y-2 pt-1 border-t border-white/5 text-[10px]">
            <div class="font-semibold text-white/90">Op. Dr. Ayşe Yılmaz'a Senin Sorman Gereken 3 Net Soru:</div>
            ${babaState.doctorQuestions.map(q => `
              <div class="p-2.5 rounded-2xl border transition ${q.asked ? 'bg-emerald-950/25 border-emerald-500/30' : 'bg-black/30 border-white/10'} space-y-1.5">
                <div class="text-[11px] ${q.asked ? 'text-white/95 line-through opacity-80' : 'text-white/90'} leading-relaxed">
                  "${escapeHtml(q.text)}"
                </div>
                <div class="flex justify-end">
                  <button onclick="toggleDoctorQuestion('${q.id}')" class="px-2.5 py-1 rounded-xl text-[9px] font-semibold border transition active:scale-95 ${q.asked ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200' : 'bg-amber-500/25 hover:bg-amber-500/35 border-amber-400/40 text-amber-200'}">
                    ${q.asked ? 'Soruldu / Not Alındı ✓' : 'Soruldu Olarak İşaretle'}
                  </button>
                </div>
              </div>
            `).join('')}
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

        <!-- MODÜL 2: KALKAN MODU ("Hurafe Savar & Lohusa Ziyaretçi Kalkanı") -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="text-[9px] uppercase tracking-wider text-rose-300 font-medium">Lohusalık Mahremiyeti</span>
              <h4 class="text-sm font-serif font-bold text-white mt-0.5">Kalkan Modu (Hurafe Savar &amp; Ziyaretçi Kalkanı)</h4>
            </div>
            <span class="text-[9px] px-2 py-0.5 rounded-full bg-rose-500/15 border border-rose-400/30 text-rose-200 font-mono">
              Koruyucu Eş
            </span>
          </div>

          <!-- 2A. Bilimsel Kalkan -->
          <div class="space-y-2 text-[10px]">
            <div class="font-semibold text-white/90">Bilimsel Kalkan (Hurafelere Kanıta Dayalı Yanıtlar)</div>
            ${babaState.scientificShields.map(shield => `
              <div class="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-1.5">
                <div class="text-rose-300 font-medium italic">Hurafe: "${escapeHtml(shield.myth)}"</div>
                <div class="text-emerald-200 leading-relaxed bg-white/5 p-2 rounded-xl border border-white/5">
                  <b class="text-white">Bilimsel Kalkan:</b> "${escapeHtml(shield.shield)}"
                </div>
                <div class="flex justify-end pt-0.5">
                  <button onclick="useScientificShield('${shield.id}')" class="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 text-[9px] font-semibold rounded-xl transition active:scale-95 flex items-center space-x-1">
                    <span>📋</span>
                    <span>Cevabı Panoya Kopyala</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- 2B. Ziyaretçi Kalkanı -->
          <div class="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-2 text-[10px] pt-2">
            <div class="flex justify-between items-center">
              <span class="font-semibold text-white/90">Ziyaretçi Kalkanı (WhatsApp Aile Şablonu)</span>
              <span class="text-[9px] text-amber-200">İlk 15 Gün Kuralları</span>
            </div>
            <p class="text-white/70 leading-relaxed italic bg-white/5 p-2.5 rounded-xl border border-white/5">
              "${escapeHtml(babaState.visitorShieldTemplate)}"
            </p>
            <button onclick="copyVisitorShieldMessage()" class="w-full py-2 bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-[10px] font-semibold rounded-xl transition flex items-center justify-center space-x-1.5 active:scale-95">
              <span>📋</span>
              <span>WhatsApp Aile Mesajını Kopyala</span>
            </button>
          </div>
        </div>

        <!-- MODÜL 8: EŞ ÇEVİRİCİ, USTA BABA MİKRO BECERİLER & AKILLI BÜTÇE -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3.5">
          <div class="flex justify-between items-center">
            <div>
              <span class="text-[9px] uppercase tracking-wider text-amber-300 font-medium">Usta Eş &amp; Baba Becerileri</span>
              <h4 class="text-sm font-serif font-bold text-white mt-0.5">Eş Çevirici, Usta Baba &amp; Akıllı Bütçe</h4>
            </div>
            <span class="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 font-medium">
              Saha Taktikleri
            </span>
          </div>

          <!-- 8A: Eş Çevirici -->
          <div class="space-y-2 text-[10px]">
            <div class="font-semibold text-white/90 flex items-center space-x-1.5">
              <span>💬</span>
              <span>Eş Çevirici (Ne Dedi? / Aslında Ne Demek İstedi?)</span>
            </div>
            ${babaState.empathyTranslator.map(item => `
              <div class="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-1.5">
                <div class="text-amber-200 font-medium italic">Ne Dedi: "${escapeHtml(item.whatSheSaid)}"</div>
                <div class="text-white/80 bg-white/5 p-2 rounded-xl border border-white/5 leading-relaxed">
                  <b class="text-emerald-300">Aslında Ne Demek İstedi:</b> ${escapeHtml(item.whatSheMeant)}
                </div>
                <div class="flex justify-end pt-0.5">
                  <button onclick="applyEmpathyTactic('${item.id}')" class="px-2.5 py-1 rounded-xl text-[9px] font-semibold border transition active:scale-95 ${item.tacticApplied ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200' : 'bg-amber-500/25 hover:bg-amber-500/35 border-amber-400/40 text-amber-200'}">
                    ${item.tacticApplied ? 'Şefkatle Karşılandı ✓' : 'Şefkatli Taktiği Uygula'}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- 8B: Usta Baba 30 Sn Mikro Beceriler -->
          <div class="space-y-2 text-[10px] pt-1 border-t border-white/5">
            <div class="font-semibold text-white/90 flex items-center space-x-1.5">
              <span>🎖️</span>
              <span>Usta Baba 30 Sn Mikro Beceriler</span>
            </div>
            ${babaState.masterDadSkills.map(skill => `
              <div class="p-2.5 bg-black/40 rounded-2xl border border-white/10 space-y-1">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-amber-200">${escapeHtml(skill.title)}</span>
                  <span class="text-[9px] font-mono text-emerald-300">${escapeHtml(skill.duration)}</span>
                </div>
                <div class="text-white/70 leading-relaxed text-[10px]">${escapeHtml(skill.desc)}</div>
                <div class="flex justify-end pt-1">
                  <button onclick="completeMasterSkill('${skill.id}')" class="px-2.5 py-1 rounded-xl text-[9px] font-semibold border transition active:scale-95 ${skill.mastered ? 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200' : 'bg-emerald-500/25 hover:bg-emerald-500/35 border-emerald-400/40 text-emerald-200'}">
                    ${skill.mastered ? 'Tamamlandı ✓' : 'Pratiği Tamamladım'}
                  </button>
                </div>
              </div>
            `).join('')}
          </div>

          <!-- 8C: Akıllı Bütçe & Gereksiz Harcama Filtresi -->
          <div class="space-y-2 text-[10px] pt-1 border-t border-white/5">
            <div class="font-semibold text-white/90 flex items-center space-x-1.5">
              <span>💰</span>
              <span>Akıllı Bütçe &amp; Gereksiz Harcama Filtresi</span>
            </div>
            ${babaState.budgetFilter.map(item => `
              <div class="p-2.5 bg-black/40 rounded-2xl border border-white/10 space-y-1.5">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-rose-300">${escapeHtml(item.item)}</span>
                  <span class="text-emerald-300 font-mono font-bold">${escapeHtml(item.savedAmount)}</span>
                </div>
                <div class="text-white/70 bg-white/5 p-2 rounded-xl border border-white/5 leading-relaxed">
                  ${escapeHtml(item.verdict)}
                </div>
                <div class="flex justify-end">
                  <button onclick="applyBudgetFilter('${item.id}')" class="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-[9px] font-semibold rounded-xl transition active:scale-95">
                    Filtreyi Onayla ✓
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Rh İzoimmünizasyon Koruma Güvencesi -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2 text-xs">
          <div class="font-medium text-white">Rh İzoimmünizasyon Güvenlik Takibi</div>
          <div class="text-[10px] text-white/60">Buse (${babaState.mother.bloodGroup}) &amp; Oğuz (${babaState.user.bloodGroup})</div>
          <div class="p-2.5 bg-emerald-950/30 border border-emerald-400/30 rounded-xl text-[10px] text-emerald-200 leading-relaxed">
            Anne Rh(-) ve Baba Rh(+) olduğu için 28. hafta İndirekt Coombs ve Rhogam profilaksisi hekim kontrolünde yapılmıştır; Güneş tam koruma altındadır.
          </div>
        </div>
      </div>
    `;
  } else if (babaState.activeTab === "kovan") {
    const polls = babaState.kovanWeeklyPolls || [];

    return `
      <!-- MURADİYE BABA KOVANI (BABALAR OCAĞI - YALNIZCA ERKEKLER) -->
      <div class="space-y-3.5">
        <div class="flex justify-between items-center pb-2 border-b border-white/10">
          <div>
            <h2 class="text-base font-serif font-semibold text-white/95">Muradiye Baba Kovanı (Babalar Ocağı)</h2>
            <p class="text-[11px] text-white/60">Yunusemre ve Çevresi Baba &amp; Erkek Dayanışması</p>
          </div>
          <span class="text-[10px] bg-sky-500/20 text-sky-200 px-2.5 py-1 rounded-full border border-sky-400/30 font-medium shrink-0">
            Babalar ve Erkeklere Özel Alan
          </span>
        </div>

        <!-- MODÜL 9: KOVAN HAFTALIK ANONİM MİNİ ANKETLER ("KANKALAR NE DURUMDA?") EN ÜSTTE -->
        <div class="p-4 bg-gradient-to-br from-sky-950/40 via-black/40 to-amber-950/30 rounded-3xl border border-sky-500/25 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <span class="text-[9px] uppercase tracking-wider text-sky-300 font-semibold">Haftalık Anonim Dayanışma</span>
              <h3 class="text-sm font-serif font-bold text-white mt-0.5">Kankalar Ne Durumda? (Mini Anket)</h3>
            </div>
            <span class="text-[9px] px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-200 border border-sky-400/30 font-mono">
              %100 Anonim
            </span>
          </div>

          <div class="space-y-2.5">
            ${polls.map(poll => `
              <div class="p-3 bg-black/50 rounded-2xl border border-white/10 space-y-2 text-[10px]">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-amber-200">${escapeHtml(poll.weekLabel)}</span>
                  <span class="text-white/50 text-[9px] font-mono">${poll.totalVotes} Baba Katıldı</span>
                </div>
                <div class="text-white/90 leading-relaxed font-medium">
                  "${escapeHtml(poll.question)}"
                </div>

                ${poll.voted ? `
                  <!-- Sonuç Görünümü -->
                  <div class="p-2.5 bg-white/5 rounded-xl border border-white/5 space-y-1.5">
                    <div class="flex justify-between items-center text-[9px]">
                      <span class="text-emerald-300 font-semibold">%${poll.agreePercent} Evet</span>
                      <span class="text-white/50">Oyunuz Kaydedildi ✓</span>
                    </div>
                    <div class="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                      <div class="h-full bg-emerald-400 rounded-full" style="width: ${poll.agreePercent}%"></div>
                    </div>
                    <div class="text-white/70 text-[9px] leading-relaxed pt-0.5">
                      ${escapeHtml(poll.insight)}
                    </div>
                  </div>
                ` : `
                  <!-- Oy Verme Butonları -->
                  <div class="grid grid-cols-2 gap-2 pt-1">
                    <button onclick="voteKovanMiniPoll('${poll.id}', 'yes')" class="py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 text-emerald-200 font-semibold rounded-xl transition active:scale-95 text-center">
                      Evet, Hissettim
                    </button>
                    <button onclick="voteKovanMiniPoll('${poll.id}', 'no')" class="py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white/80 font-medium rounded-xl transition active:scale-95 text-center">
                      Hayır, Sorun Yok
                    </button>
                  </div>
                `}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Erkekler Çemberi Bilgilendirmesi -->
        <div class="p-3 bg-white/5 rounded-2xl border border-white/10 text-[10px] text-white/70 leading-relaxed">
          Bu alan yalnızca baba ve erkek kullanıcıların doğum lojistiği, oto koltuğu montajı, eşe doğru destek olma ve baba olma tecrübelerini paylaştığı bağımsız erkekler çemberidir.
        </div>

        <div class="space-y-2.5">
          <div class="text-xs font-semibold text-amber-200 uppercase tracking-wider">Babalardan Paylaşılan Eşyalar &amp; İmece</div>
          ${babaState.kovanItems.map(i => `
            <div class="p-4 bg-white/5 rounded-3xl flex items-start justify-between text-xs border border-white/10 transition hover:bg-white/[0.08]">
              <div class="flex items-start space-x-3">
                <img src="${i.avatar}" class="w-10 h-10 rounded-full object-cover border border-white/20 shrink-0">
                <div>
                  <div class="font-bold text-white/95 text-sm">${escapeHtml(i.title)}</div>
                  <div class="text-[11px] text-amber-200 mt-0.5">${escapeHtml(i.user)} · ${escapeHtml(i.bio)} (${escapeHtml(i.dist)})</div>
                  <div class="text-[11px] text-white/60 mt-1 leading-relaxed">${escapeHtml(i.desc)}</div>
                </div>
              </div>
              <button onclick="sendBabaNeighborMessage('${escapeHtml(i.user)}')" class="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs text-white font-medium shrink-0 ml-2 transition active:scale-95">
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
                <div class="text-[9px] text-white/40">${escapeHtml(m.sender)} · ${m.time}</div>
                <div class="text-[11px] text-white/90 mt-0.5">${escapeHtml(m.text)}</div>
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
    const scorecard = getImpactScorecard();
    const activeModelKey = babaState.workLifeMatrix.activeModel || "office_8_18";
    const activeModel = babaState.workLifeModels[activeModelKey];
    const activeCommuteKey = (babaState.workLifeMatrix && babaState.workLifeMatrix.commuteDuration) || "1_2_hours";
    const dynamicMotherSleepTactic = getDynamicMotherSleepTactic(activeModelKey);
    babaState.wearable.motherSleep.tactic = dynamicMotherSleepTactic;

    let computedEntryBuffer = activeModel.buffer;
    if (activeModelKey === 'office_8_18') {
      if (activeCommuteKey === '<30_min') {
        computedEntryBuffer = "10 dk sessiz nefes tamponu (Trafik akıcı; kapıdan girince ilk 10 dk dinlenme, 18:20 devir hazır).";
      } else if (activeCommuteKey === '2_plus_hours') {
        computedEntryBuffer = "25-30 dk dekompresyon & duş tamponu (Yoğun Manisa-İzmir trafiği sonrası zihinsel deşarj; 19:45 nöbet devri).";
      } else {
        computedEntryBuffer = "15 dk eve giriş tamponu (Kapıdan girince ilk 15 dk dekompresyon, 19:30 Altın Saatler tam odak).";
      }
    } else if (activeModelKey === 'remote') {
      computedEntryBuffer = "Uzaktan / Ev Modu: 0 dk yol; 10 dk çalışma odasından çıkış ve zihinsel sınır tamponu (18:10 nöbet devri).";
    } else if (activeModelKey === 'hybrid') {
      if (activeCommuteKey === '<30_min') {
        computedEntryBuffer = "Hibrit Gün: Ofiste 10 dk eve giriş tamponu, uzaktan çalışma gününde 18:00 anında devir.";
      } else if (activeCommuteKey === '2_plus_hours') {
        computedEntryBuffer = "Hibrit Gün: Ofiste 25 dk yoğun trafik dekompresyonu, ev gününde 18:00 anında devir.";
      } else {
        computedEntryBuffer = "Hibrit Gün: Ofiste 15 dk eve giriş tamponu, uzaktan çalışma gününde 18:00 anında devir.";
      }
    } else if (activeModelKey === 'role_reversal') {
      computedEntryBuffer = "Babanın lojistik tamponu: Buse'nin eve dönüş saatine göre akşam ortamı hazır, zihinsel sınır tam korumalı.";
    } else if (activeModelKey === 'both_home') {
      computedEntryBuffer = "0 dk yol; vardiya devirlerinde (08:00 ve 14:00) 15 dk sessiz oda takası tamponu.";
    }

    return `
      <!-- BABANIN PROFİLİ & AİLE EŞLEŞME KODU -->
      <div class="space-y-3.5">
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3 text-xs">
          <div class="flex items-center space-x-3.5">
            <img src="${babaState.user.avatar}" class="w-14 h-14 rounded-full object-cover border-2 border-amber-300 shadow-sm">
            <div>
              <h3 class="text-base font-serif font-bold text-white">${escapeHtml(babaState.user.name)}</h3>
              <p class="text-[11px] text-amber-200 mt-0.5">${escapeHtml(babaState.user.role)} · Kan Grubu: <b>${babaState.user.bloodGroup}</b></p>
              <p class="text-[10px] text-white/50">${escapeHtml(babaState.user.neighborhood)}, ${escapeHtml(babaState.user.district)} / ${escapeHtml(babaState.user.city)}</p>
            </div>
          </div>
          <div class="pt-2 border-t border-white/10 text-[11px] text-white/70 leading-relaxed">
            ToHUM Bağımsız Baba Portali aktif. Eş ve bebek koruyucu kalkanı devrede.
          </div>
        </div>

        <!-- MODÜL 5 ÖZETİ: OPERASYONEL ETKİ KARNESİ -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2.5 text-xs">
          <div class="flex justify-between items-center">
            <div class="font-serif font-bold text-white text-sm">Operasyonel Etki Karnesi</div>
            <span class="text-[10px] text-emerald-300 font-mono font-bold">%${scorecard.shieldIndex} Liderlik</span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-center pt-1">
            <div class="p-2.5 bg-black/40 rounded-2xl border border-white/5">
              <div class="text-[9px] text-white/50">Üstlenilen Sorumluluk</div>
              <div class="text-xs font-mono font-bold text-amber-200 mt-0.5">${scorecard.claimedCount} / ${scorecard.totalTasks} Görev</div>
            </div>
            <div class="p-2.5 bg-black/40 rounded-2xl border border-white/5">
              <div class="text-[9px] text-white/50">Kazandırılan Dinlenme</div>
              <div class="text-xs font-mono font-bold text-emerald-300 mt-0.5">+${scorecard.hoursSaved} Saat</div>
            </div>
          </div>
        </div>

        <!-- MODÜL 6 ÖZETİ: ÇALIŞMA VARDİYASI -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2 text-xs">
          <div class="flex justify-between items-center">
            <span class="font-serif font-bold text-white">Ev-İş Dinamik Vardiya Matrisi</span>
            <span class="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30">${escapeHtml(activeModel.name)}</span>
          </div>
          <div class="p-2.5 bg-black/40 rounded-2xl border border-white/5 text-[10px] space-y-1 text-white/70">
            <div><b class="text-emerald-300">Tampon:</b> ${escapeHtml(activeModel.buffer)}</div>
            <div><b class="text-amber-200">Vardiya:</b> ${escapeHtml(activeModel.shift)}</div>
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
