// ToHUM - Bütünleşik Sağlık & Yaşayan Anne Karnı Mimarisi
// =========================================================================
// MODÜL 1: GÜNEŞ (YAŞAYAN ALAN + REÇETEDEN DİNAMİK BESLENEN GÜNLÜK TAKVİYE LİSTESİ)
// MODÜL 2: ŞİFA & SAĞLIK (GÜVENLİK KORİDORU + BİYOMETRİ + HORMON & BABA SANCI ALARMI + TAHLİL TRENDİ & REÇETE EMİLİM REHBERİ + OYUNLAŞTIRILMIŞ PELVİK + ULTRASON)
// =========================================================================
// Buse, Oğuz ve Güneş • Manisa / Yunusemre / Muradiye

const state = {
  isLoggedIn: true,
  currentTab: "health",
  isDrawerOpen: false,
  isPlayingAudio: false,
  audioCtx: null,
  humOsc: null,
  heartbeatInterval: null,

  // 1. MODÜL: GÜNEŞ - ÇEKMECE & BESLEME DURUMU
  isSheetExpanded: false,
  isMealSelectorOpen: false,
  homeSubtab: "feed",

  interactive: {
    mouseX: 0,
    mouseY: 0,
    targetTiltX: 0,
    targetTiltY: 0,
    currentTiltX: 0,
    currentTiltY: 0,
    kicksToday: 14,
    reactionText: "Güneş 31. haftasında sakin bir ritimle dinleniyor.",
    reactionColor: "idle"
  },

  nurture: {
    water: { count: 4, target: 8, morningTarget: 4, label: "Su (Amniyotik Sıvı)" },
    meal: { taken: true, detail: "Zeytinyağlı enginar ve ev yoğurdu", time: "13:15" }
  },

  // Ortak Reçete & İlaç Veri Yapısı (Tahliller sekmesinden tanımlanır, Güneş'in Besle alanında günlük alınır)
  prescriptions: [
    {
      id: "magnesium",
      name: "Magnimore Plus (Magnezyum)",
      shortName: "Magnezyum Saşe",
      dose: "Günde 1 Saşe · Akşam Tok",
      doctor: "Dr. Ayşe Yılmaz",
      target: "Kas kramplarını önleme & rahim kaslarını gevşetme",
      bioTip: "Akşam yemeğinden sonra ılık suyla için. Gece bacak kramplarını ve rahim gerginliğini çözer. Kalsiyumlu gıdalarla aynı anda almayın.",
      takenToday: true,
      takenTime: "21:30",
      particleColor: "magnesium",
      badge: "Akşam Tok"
    },
    {
      id: "iron",
      name: "Ferro Sanol Duodenal (Demir)",
      shortName: "Demir Kapsülü",
      dose: "Günde 1 Kapsül · Sabah Aç",
      doctor: "Dr. Ayşe Yılmaz",
      target: "Ferritin ve hemoglobin desteği (oksijen taşıma)",
      bioTip: "Portakal suyu veya C vitaminiyle için (emilim 3 kat artar). Çay, kahve ve süt ürünlerinden en az 2 saat uzak tutun.",
      takenToday: false,
      takenTime: null,
      particleColor: "omega",
      badge: "Sabah Aç"
    },
    {
      id: "omega",
      name: "Ocean Mummy (Multivitamin & DHA)",
      shortName: "Omega 3 & DHA",
      dose: "Günde 1 Kapsül · Öğle Tok",
      doctor: "Dr. Ayşe Yılmaz",
      target: "Güneş'in beyin dokusu, retina ve sinir gelişimi",
      bioTip: "Yağ içeren öğünlerle (zeytinyağlı yemekler) birlikte tüketildiğinde beyin dokusuna geçişi maksimuma ulaşır.",
      takenToday: false,
      takenTime: null,
      particleColor: "folic",
      badge: "Öğle Tok"
    },
    {
      id: "d3",
      name: "Coledan D3 Damla (1000 IU)",
      shortName: "D3 Vitamini Damlası",
      dose: "Günde 4 Damla · Sabah",
      doctor: "Dr. Ayşe Yılmaz",
      target: "Kalsiyum emilimi & kemik mineralizasyonu",
      bioTip: "Bir lokma ekmek veya zeytinyağı üzerine damlatılarak alınmalıdır. Yağda çözünen bir vitamin olduğu için emilimi hızlanır.",
      takenToday: false,
      takenTime: null,
      particleColor: "water",
      badge: "Sabah"
    }
  ],

  growth: {
    points: 155,
    maxPoints: 200,
    level: 3,
    levelName: "Köklenen Fidan"
  },

  user: {
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
  },

  baby: {
    name: "Güneş",
    week: 31,
    weight: "1.650 gr",
    height: "41.5 cm",
    sizeComparison: "Boyut: 41.5 cm · Bir Ananas Hacminde",
    daysLeft: 63,
    bpm: 142,
    presentation: "Sefalik (Baş Aşağı)",
    image: "cinematic_womb_31w.jpg"
  },

  // 2. MODÜL: ŞİFA & SAĞLIK TAKİBİ VERİLERİ
  healthData: {
    activeHealthSubtab: "biometrics", // biometrics, hormone, lab, exercise, ultrasound
    isBpAccordionOpen: false,
    isSafetyCorridorOpen: false,
    labFilterCategory: "all",
    isHormoneDetailOpen: false,
    
    // 1. Güncel Tansiyon Takip Geçmişi
    bloodPressureHistory: [
      { id: 1, date: "04 Eylül (Bugün · 09:15)", systolic: 92, diastolic: 62, note: "Sabah dinlenik ölçüm · Güvenli", isNormal: true },
      { id: 2, date: "02 Eylül (14:30)", systolic: 90, diastolic: 60, note: "Buse'nin doğal baz seviyesi", isNormal: true },
      { id: 3, date: "30 Ağustos (18:40)", systolic: 95, diastolic: 64, note: "Spil yürüyüşü sonrası", isNormal: true },
      { id: 4, date: "26 Ağustos (10:00)", systolic: 88, diastolic: 58, note: "Dinlenik ölçüm", isNormal: true }
    ],

    // 2. Gebelik Başlangıcından İtibaren Seyir (0.H ➔ 31.H)
    progressionHistory: [
      { weekNum: 0, label: "0.H", weight: 58.0, waist: 68, gain: "+0.0 kg" },
      { weekNum: 12, label: "12.H", weight: 59.2, waist: 74, gain: "+1.2 kg" },
      { weekNum: 20, label: "20.H", weight: 61.0, waist: 82, gain: "+3.0 kg" },
      { weekNum: 26, label: "26.H", weight: 63.0, waist: 90, gain: "+5.0 kg" },
      { weekNum: 28, label: "28.H", weight: 63.8, waist: 93, gain: "+5.8 kg" },
      { weekNum: 31, label: "31.H", weight: 65.0, waist: 98, gain: "+7.0 kg" }
    ],

    // 3. Hormon ve Beden Dili
    selectedSymptoms: ["Bel ve Sırt Esnemesi", "Hafif Mide Yanması"],
    selectedMood: "Yuva Kurma & Derin Bağ (Nesting)",
    painLevel: "Hafif",

    // 4. Oyunlaştırılmış Pelvik Egzersiz Görevleri (Sade Numaralandırma & Temiz Tipografi)
    pelvicStreakDays: 4,
    selectedExerciseIndex: 2,
    exercises: [
      {
        id: 1,
        number: "01",
        name: "Derin Doğum Çömelmesi (Deep Squat)",
        target: "Pelvis çapını %30 genişletir",
        duration: "3 Set · 8 Tekrar",
        desc: "Ayaklar omuz genişliğinde açık, sırt düz tutularak nefes verilerek çömelinir. Güneş'in başının doğum kanalına yumuşakça yerleşmesini sağlar.",
        bioFeedback: "Doğru Duruş: Karnınızı içeri çekmeyin; çömelirken pelvik tabanın doğal olarak açılmasına izin verin.",
        partnerRole: "Oğuz arkadan ellerinden tutarak dengede durmana destek olabilir.",
        completed: true,
        points: 10
      },
      {
        id: 2,
        number: "02",
        name: "Kedi - Deve Esnemesi (Cat-Cow)",
        target: "Omurga ve bel gerginliğini dengeler",
        duration: "10 Yavaş Döngü",
        desc: "Dört ayak üzerinde nefes alırken sırt çukurlaştırılır (baş yukarı), nefes verirken sırt kamburlaştırılır. Bebeğin ağırlığını omurgadan alır.",
        bioFeedback: "Doğru Duruş: Belinizi zorlamayın; hareketi omurganızdaki akıcı dalgalanma hissiyle yapın.",
        partnerRole: "Oğuz bel çukuruna avuç içiyle hafif ısı masajı uygulayabilir.",
        completed: true,
        points: 10
      },
      {
        id: 3,
        number: "03",
        name: "Kelebek Oturuşu (Tailor Sitting)",
        target: "Kasık ve iç bacak esnekliği",
        duration: "5 Dakika",
        desc: "Ayak tabanları birleştirilip dizler iki yana açılır. Doğum esnasında kasık dokusunun yırtılmadan esnemesine yardımcı olur.",
        bioFeedback: "Doğru Duruş: Dizlerinizi yere doğru zorla bastırmayın; yerçekiminin bacakları serbest bırakmasına izin verin.",
        partnerRole: "Oğuz omuzlarınıza arkadan hafif dairesel baskı yaparak gerginliği alabilir.",
        completed: false,
        points: 10
      },
      {
        id: 4,
        number: "04",
        name: "Kegel & 4-7-8 Doğum Nefesi",
        target: "Dalga anında gevşeme refleksi",
        duration: "5 Dk Rehberli",
        desc: "4 saniye burundan derin nefes alınırken pelvik taban nazikçe toparlanır, 7 saniye tutulur, 8 saniyede ağızdan üfleyerek tamamen gevşetilir.",
        bioFeedback: "Doğru Duruş: Karın kaslarınızı kasmayın. Sadece alt taban kaslarını toparlayıp nefes verirken tamamen serbest bırakın.",
        partnerRole: "Oğuz nefes sayımını sesli yaparak ritmi tutmana yardımcı olabilir.",
        completed: false,
        points: 10
      }
    ],
    isExerciseRunning: false,
    exerciseTimer: 0,
    exerciseInterval: null,
    exercisePhase: "Sık (4 sn Nefes Al)",

    // 5. Tahliller Tablosu & 3 Trimester Trendi
    bloodwork: [
      { 
        id: 1, 
        name: "Ferritin (Demir Deposu)", 
        value: "32.4", 
        unit: "ng/mL", 
        category: "normal", 
        status: "Optimal", 
        min: "15", 
        max: "150", 
        note: "Kansızlık riski yok, Ferro Sanol takviyesi dengeliyor", 
        source: "Lab_02Sep_Manisa.pdf",
        trend: [
          { week: "12.H", val: "65.0" },
          { week: "20.H", val: "48.2" },
          { week: "31.H", val: "32.4" }
        ],
        trendDesc: "Bebek büyüdükçe demir harcaması arttı; takviyeyle güvenli aralıkta tutuluyor."
      },
      { 
        id: 2, 
        name: "Hemoglobin (Hb)", 
        value: "12.2", 
        unit: "g/dL", 
        category: "normal", 
        status: "İyi", 
        min: "11.0", 
        max: "15.0", 
        note: "Oksijen taşıma kapasitesi dengeli", 
        source: "Lab_02Sep_Manisa.pdf",
        trend: [
          { week: "12.H", val: "13.0" },
          { week: "20.H", val: "12.6" },
          { week: "31.H", val: "12.2" }
        ],
        trendDesc: "Gebelik kan hacmi genişlemesine bağlı fizyolojik seyir ideal."
      },
      { 
        id: 3, 
        name: "D Vitamini (25-OH)", 
        value: "44.1", 
        unit: "ng/mL", 
        category: "normal", 
        status: "Güçlü", 
        min: "30", 
        max: "100", 
        note: "Kemik ve kalsiyum emilimi yüksek", 
        source: "Lab_02Sep_Manisa.pdf",
        trend: [
          { week: "12.H", val: "28.0" },
          { week: "20.H", val: "36.5" },
          { week: "31.H", val: "44.1" }
        ],
        trendDesc: "Coledan D3 takviyesi ile düzenli artış yakalandı."
      },
      { 
        id: 4, 
        name: "B12 Vitamini", 
        value: "185", 
        unit: "pg/mL", 
        category: "attention", 
        status: "Takip / Düşük", 
        min: "200", 
        max: "900", 
        note: "Doktor takviye dozu artırımı önerdi", 
        source: "Lab_02Sep_Manisa.pdf",
        trend: [
          { week: "12.H", val: "240" },
          { week: "20.H", val: "210" },
          { week: "31.H", val: "185" }
        ],
        trendDesc: "Hücresel enerji için folik asit & B12 desteği gerekiyor."
      },
      { 
        id: 5, 
        name: "Açlık Kan Şekeri (OGTT 75g)", 
        value: "88", 
        unit: "mg/dL", 
        category: "normal", 
        status: "Normal", 
        min: "70", 
        max: "95", 
        note: "Gebelik diyabeti riski bulunmuyor", 
        source: "Lab_18Aug_Manisa.pdf",
        trend: [
          { week: "24.H", val: "88" }
        ],
        trendDesc: "Şeker yükleme testi sonucu dengeli."
      }
    ],

    // 6. Ultrason Fotoğraf Galerisi
    ultrasoundGallery: [
      { id: 1, title: "31. Hafta Yüz Profili & Duruş", week: "31. Hafta", date: "02 Eylül 2026", doctor: "Dr. Ayşe Yılmaz", image: "cinematic_womb_31w.jpg", desc: "Güneş baş aşağı sefalik pozisyonda, eli çenesinde uyuyor." },
      { id: 2, title: "22. Hafta Detaylı Organ Anatomisi", week: "22. Hafta", date: "08 Temmuz 2026", doctor: "Dr. Ayşe Yılmaz", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80", desc: "Tüm organ gelişimi, omurga ve kalp 4 odacık tam uyumlu." },
      { id: 3, title: "12. Hafta İlk 2D Silüet", week: "12. Hafta", date: "12 Mayıs 2026", doctor: "Dr. Ayşe Yılmaz", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80", desc: "Burun kemiği ve ense kalınlığı (NT: 1.1 mm) kusursuz ölçüldü." }
    ]
  },

  dailyQuiz: {
    answered: false,
    selected: null,
    isCorrect: null,
    question: "31. haftada bebeğin ters (baş aşağı) duruşu ne anlama gelir?",
    options: [
      { text: "Doğum kanalına uyum sağlayan en doğal sefalik pozisyondur.", correct: true },
      { text: "Bebeğin ters yönde hareket ettiğini gösterir.", correct: false },
      { text: "Henüz pozisyonu netleşmemiştir.", correct: false }
    ],
    explanation: "31. haftada Güneş baş aşağı pozisyona yerleşir. Bacakları yukarıda karnın üst tarafına doğru tatlı tekmeler atar."
  },

  timeCapsules: [
    {
      id: 1,
      title: "Güneş'e İlk Mektup: Kalbini Duyduğumuz Gün",
      author: "Buse",
      date: "12 Mayıs 2026",
      unlockEvent: "18. Yaş Günü (2044)",
      preview: "Güneş, klinikte kalp atışını ilk kez duyduğumuz an içimizde tarifsiz bir huzur ve sevgi oluştu...",
      isLocked: true
    },
    {
      id: 2,
      title: "Babanın Doğum Öncesi Notu",
      author: "Oğuz",
      date: "28 Ağustos 2026",
      unlockEvent: "Doğum Günü (24 Ekim 2026)",
      preview: "Muradiye'de beşiğini kurarken ve odanı hazırlarken seninle göz göze geleceğimiz günü düşündüm...",
      isLocked: true
    }
  ],

  // 3. MODÜL: DOĞUM & HAZIRLIK
  birthPlan: {
    isTimerRunning: false,
    waveSeconds: 0,
    waveInterval: null,
    lastWaveDuration: "45 sn",
    lastWaveFrequency: "8 dk",
    bagItems: [
      { id: 1, title: "Ten Tene Temas Doğum Tercih Belgesi", forWho: "Anne", done: true },
      { id: 2, title: "0-3 Ay Yıkanmış Pamuklu Çıkış Seti (Güneş)", forWho: "Bebek", done: true },
      { id: 3, title: "Gümüş Kapaklar ve Organik Göğüs Balmı", forWho: "Anne", done: true },
      { id: 4, title: "Oğuz için Enerji Atıştırmalığı & Kamera", forWho: "Baba", done: false },
      { id: 5, title: "Lohusa Geceliği & Rahat Terlik", forWho: "Anne", done: true }
    ],
    preferences: [
      { id: 1, title: "Doğum anında ten tene temas (İlk 60 dk kesintisiz)", selected: true },
      { id: 2, title: "Kordonun geç klemplenmesi (Beyazlaşana kadar)", selected: true },
      { id: 3, title: "Doğum odasında loş ışık ve 8.3 Hz sakinleştirici müzik", selected: true },
      { id: 4, title: "İlk kontrollerin anne kucağında yapılması", selected: true }
    ]
  },

  shopping: {
    categories: ["Tümü", "Bebek Odası", "Giyim & Tekstil", "Beslenme & Bakım", "Doğum Çantası"],
    activeCategory: "Tümü",
    items: [
      { id: 1, title: "Organik Ahşap Anne Yanı Beşik", category: "Bebek Odası", price: 3200, done: true, note: "Muradiye komşu ağında takas imkanı var" },
      { id: 2, title: "0-3 Ay Pamuk Zıbın & Tulum Seti", category: "Giyim & Tekstil", price: 650, done: true, note: "Yıkandı ve ütülendi" },
      { id: 3, title: "Doğal Keten Kanguru", category: "Giyim & Tekstil", price: 1450, done: false, note: "Ergonomik model seçildi" },
      { id: 4, title: "Gümüş Göğüs Kapakları ve Balm", category: "Beslenme & Bakım", price: 920, done: true, note: "Doğal koruma seti hazır" },
      { id: 5, title: "Lohusa Geceliği ve Sabahlık", category: "Doğum Çantası", price: 1100, done: true, note: "Hastaneye hazırlandı" },
      { id: 6, title: "Bebek Bakım & Alt Açma Minderi", category: "Beslenme & Bakım", price: 420, done: false, note: "Su geçirmez kumaş" }
    ]
  },

  ultrasoundAudios: [
    { id: 1, title: "12. Hafta Kalp Atışı Kaydı", date: "12 Mayıs 2026", bpm: 156, duration: "0:38", isPlaying: false, note: "İlk ultrason seansı, çok ritmik" },
    { id: 2, title: "28. Hafta Doppler Kaydı", date: "18 Ağustos 2026", bpm: 142, duration: "1:12", isPlaying: false, note: "Güneş çok hareketliydi, güçlü vuruşlar" },
    { id: 3, title: "31. Hafta Bugünün Ritmi", date: "02 Eylül 2026", bpm: 140, duration: "0:45", isPlaying: false, note: "Sakin ve stabil kardiyak ritim" }
  ],

  appointments: [
    {
      id: 1,
      title: "32. Hafta Rutin Ultrason & NST",
      dateFormatted: "14 Eylül 2026 · 14:30",
      dateKey: "2026-09-14",
      doctor: "Dr. Ayşe Yılmaz",
      hospital: "Manisa Şehir Hastanesi",
      questions: ["Magnezyum takviyesi dozu", "Güneş'in baş aşağı sefalik pozisyon durumu", "Doğum planı başlangıcı"]
    },
    {
      id: 2,
      title: "36. Hafta Kontrol & Çatı Muayenesi",
      dateFormatted: "12 Ekim 2026 · 11:00",
      dateKey: "2026-10-12",
      doctor: "Dr. Ayşe Yılmaz",
      hospital: "Manisa Şehir Hastanesi",
      questions: ["Doğum çantası kontrolü", "Hastaneye geliş süreci"]
    }
  ],

  imeceItems: [
    { id: 1, title: "Organik Ahşap Beşik", user: "Merve", bio: "Muradiye · 2. Anne", dist: "400m", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", type: "gift", desc: "4 ay kullanıldı, sıfır gibi temiz durumda devrediyorum." },
    { id: 2, title: "0-3 Ay Pamuklu Tulum Seti", user: "Elif", bio: "Güzelyurt · 1. Gebelik", dist: "1.5km", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", type: "trade", desc: "Temiz yıkanmış pamuklu tulumlar, sembolik takas veya hediye." },
    { id: 3, title: "Bebek Reflü Yatağı", user: "Selin", bio: "Uncubozköy · 1 Yaş Bebek", dist: "3.2km", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", type: "gift", desc: "İhtiyacı olan bir anneye memnuniyetle ulaştırabilirim." }
  ],

  messages: [
    { sender: "Merve (Muradiye)", text: "Merhaba Buse, ahşap beşiği bugün eşimle getirebiliriz, Spil tarafındayız.", time: "14:10", isMe: false },
    { sender: "Buse", text: "Çok teşekkürler Merve, evdeyiz, bekleriz.", time: "14:15", isMe: true }
  ]
};

function triggerHaptic(pattern = 15) {
  if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
    try { window.navigator.vibrate(pattern); } catch (e) {}
  }
}

// Canvas & Ses Simülasyonu
let particles = [];
let ripples = [];
let animFrameId = null;

class OrganicParticle {
  constructor(x, y, color, speed = 1) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 0.8 * speed;
    this.vy = (Math.random() - 0.5) * 0.8 * speed - 0.3;
    this.radius = Math.random() * 2.5 + 1.2;
    this.color = color;
    this.alpha = Math.random() * 0.7 + 0.3;
    this.decay = Math.random() * 0.008 + 0.004;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 8;
    ctx.shadowColor = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class LiquidRipple {
  constructor(x, y, color = "rgba(255,240,220,0.8)") {
    this.x = x;
    this.y = y;
    this.r = 6;
    this.maxR = 100;
    this.color = color;
    this.alpha = 0.85;
  }
  update() {
    this.r += 2.4;
    this.alpha -= 0.018;
  }
  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

function spawnNutrientFlow(type, count = 30) {
  const canvas = document.getElementById("cinematicCanvas");
  if (!canvas) return;
  const w = canvas.width;
  const h = canvas.height;

  let color = "#F6C887";
  if (type === "water") color = "#67E8F9";
  else if (type === "meal") color = "#FCA5A5";
  else if (type === "folic") color = "#6EE7B7";
  else if (type === "magnesium") color = "#FDE047";
  else if (type === "omega") color = "#FDBA74";

  for (let i = 0; i < count; i++) {
    const x = w * 0.7 + (Math.random() - 0.5) * 60;
    const y = h * 0.55 + (Math.random() - 0.5) * 80;
    particles.push(new OrganicParticle(x, y, color, 1.6));
  }
}

function initCinematicCanvas() {
  const canvas = document.getElementById("cinematicCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (Math.random() < 0.12 && particles.length < 35) {
      particles.push(new OrganicParticle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        "#FADBB3",
        0.5
      ));
    }

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
      if (particles[i].alpha <= 0) particles.splice(i, 1);
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
      ripples[i].update();
      ripples[i].draw(ctx);
      if (ripples[i].alpha <= 0) ripples.splice(i, 1);
    }

    state.interactive.currentTiltX += (state.interactive.targetTiltX - state.interactive.currentTiltX) * 0.08;
    state.interactive.currentTiltY += (state.interactive.targetTiltY - state.interactive.currentTiltY) * 0.08;

    const bgElem = document.getElementById("cinematicBabyVisual");
    if (bgElem) {
      bgElem.style.transform = `scale(1.04) translate(${state.interactive.currentTiltX * 8}px, ${state.interactive.currentTiltY * 8}px)`;
    }

    animFrameId = requestAnimationFrame(loop);
  }

  if (animFrameId) cancelAnimationFrame(animFrameId);
  animFrameId = requestAnimationFrame(loop);
}

document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    if (animFrameId) cancelAnimationFrame(animFrameId);
    if (state.audioCtx && state.audioCtx.state === "running") {
      state.audioCtx.suspend();
    }
  } else {
    if (state.currentTab === "home") {
      initCinematicCanvas();
    }
    if (state.isPlayingAudio && state.audioCtx && state.audioCtx.state === "suspended") {
      state.audioCtx.resume();
    }
  }
});

function checkDeficiency() {
  const missing = [];
  if (state.nurture.water.count < state.nurture.water.morningTarget) missing.push("Su");
  if (!state.nurture.meal.taken) missing.push("Öğün");
  
  state.prescriptions.forEach(p => {
    if (!p.takenToday) missing.push(p.shortName);
  });

  return missing;
}

function toggleAudio() {
  if (state.isPlayingAudio) {
    if (state.humOsc) state.humOsc.stop();
    if (state.audioCtx) state.audioCtx.close();
    if (state.heartbeatInterval) clearInterval(state.heartbeatInterval);
    state.isPlayingAudio = false;
    triggerReaction("idle", "Güneş sakin uyku döngüsüne geçti.");
  } else {
    try {
      state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      state.humOsc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();
      state.humOsc.type = "sine";
      state.humOsc.frequency.setValueAtTime(136.1, state.audioCtx.currentTime);

      const lfo = state.audioCtx.createOscillator();
      lfo.frequency.setValueAtTime(8.3, state.audioCtx.currentTime);
      const lfoGain = state.audioCtx.createGain();
      lfoGain.gain.setValueAtTime(0.25, state.audioCtx.currentTime);
      lfo.connect(gain.gain);
      lfo.start();

      gain.gain.setValueAtTime(0.12, state.audioCtx.currentTime);
      state.humOsc.connect(gain);
      gain.connect(state.audioCtx.destination);
      state.humOsc.start();

      state.heartbeatInterval = setInterval(() => {
        if (!state.audioCtx || state.audioCtx.state !== "running") return;
        const osc = state.audioCtx.createOscillator();
        const g = state.audioCtx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(60, state.audioCtx.currentTime);
        g.gain.setValueAtTime(0.2, state.audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, state.audioCtx.currentTime + 0.14);
        osc.connect(g);
        g.connect(state.audioCtx.destination);
        osc.start();
        osc.stop(state.audioCtx.currentTime + 0.15);
        triggerHaptic([10, 40, 10]);
      }, 850);

      state.isPlayingAudio = true;
      triggerReaction("music", "8.3 Hz frekans Güneş'in kalp ritmiyle senkronize.");
    } catch(e) {
      console.warn("Audio error:", e);
    }
  }
  render();
}

function render() {
  const root = document.getElementById("appRoot");
  if (!root) return;
  renderAppShell(root);
  if (state.currentTab === "home") {
    setTimeout(initCinematicCanvas, 50);
  }
}

// MAIN APP SHELL
function renderAppShell(root) {
  const missing = checkDeficiency();
  const hasDeficiency = missing.length > 0;

  root.innerHTML = `
    <!-- Top Header -->
    <header class="px-5 pt-4 pb-3 flex justify-between items-center absolute top-0 inset-x-0 z-40 pointer-events-auto bg-gradient-to-b from-black/80 via-black/40 to-transparent">
      <button onclick="toggleDrawer()" class="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/90 hover:text-white active:scale-95 transition shadow-lg" title="Menü">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h11"></path>
        </svg>
      </button>

      <div class="text-center cursor-pointer" onclick="navigateTab('home')">
        <h1 class="text-xs font-serif tracking-[0.25em] text-white uppercase font-medium drop-shadow-sm">ToHUM</h1>
        <p class="text-[10px] text-white/70 tracking-wider font-light mt-0.5">Güneş · 31. Hafta</p>
      </div>

      <div class="flex items-center space-x-2">
        <span class="text-[10px] font-medium ${hasDeficiency ? 'text-amber-200 bg-amber-500/25 border-amber-400/40' : 'text-emerald-200 bg-emerald-500/25 border-emerald-400/40'} px-2.5 py-1 rounded-full border backdrop-blur-md shadow-xs">
          ${hasDeficiency ? missing.length + ' İhtiyaç' : 'Dengede'}
        </span>
        <div class="relative cursor-pointer" onclick="navigateTab('profile')" title="Profil">
          <img src="${state.user.avatar}" alt="${state.user.name}" class="w-9 h-9 rounded-full object-cover border-2 border-white/30 shadow-md">
          <span class="absolute bottom-0 right-0 w-2.5 h-2.5 ${hasDeficiency ? 'bg-amber-400' : 'bg-emerald-400'} border border-black rounded-full"></span>
        </div>
      </div>
    </header>

    ${renderDrawerMenu()}

    <main class="flex-1 w-full h-full relative overflow-hidden flex flex-col">
      ${getTabContent()}
    </main>
  `;
}

// SLIDING DRAWER MENU
function renderDrawerMenu() {
  if (!state.isDrawerOpen) return '';

  return `
    <div class="absolute inset-0 bg-black/75 z-[90] backdrop-blur-sm transition-opacity" onclick="toggleDrawer()"></div>
    <div class="absolute top-0 left-0 bottom-0 w-[290px] bg-[#140D0B] z-[100] shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col justify-between p-6 border-r border-white/15 text-white animate-in slide-in-from-left duration-200">
      <div>
        <div class="flex justify-between items-center pb-4 border-b border-white/10">
          <div class="flex items-center space-x-2.5">
            <img src="${state.user.avatar}" class="w-9 h-9 rounded-full object-cover border border-white/20">
            <div>
              <div class="text-xs font-serif font-semibold text-white/90">ToHUM Çemberi</div>
              <div class="text-[10px] text-white/50">${state.user.shortName}, ${state.partner.shortName} ve ${state.baby.name}</div>
            </div>
          </div>
          <button onclick="toggleDrawer()" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white text-xs">✕</button>
        </div>

        <div class="mt-4 space-y-1 text-xs">
          <button onclick="navigateTab('home')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'home' ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30' : 'text-white/70 hover:bg-white/5'}">
            <span>1. Güneş</span>
            <span class="text-[10px] opacity-70">31. Hafta</span>
          </button>

          <button onclick="navigateTab('health')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'health' ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30' : 'text-white/70 hover:bg-white/5'}">
            <span>2. Şifa & Sağlık Takibi</span>
            <span class="text-[10px] bg-emerald-500/30 text-emerald-200 px-1.5 py-0.5 rounded-full">Aktif</span>
          </button>

          <button onclick="navigateTab('birth')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'birth' ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30' : 'text-white/70 hover:bg-white/5'}">
            <span>3. Doğum & Hazırlık</span>
            <span class="text-[10px] bg-rose-500/30 text-rose-200 px-1.5 py-0.5 rounded-full">M0</span>
          </button>

          <button onclick="navigateTab('calendar')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'calendar' ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30' : 'text-white/70 hover:bg-white/5'}">
            <span>4. Bütünleşik Takvim</span>
            <span class="text-[10px] opacity-70">Randevular & Günlük</span>
          </button>

          <button onclick="navigateTab('shopping')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'shopping' ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30' : 'text-white/70 hover:bg-white/5'}">
            <span>5. İhtiyaç & Bütçe Planı</span>
            <span class="text-[10px] opacity-70">Çeyiz & Liste</span>
          </button>

          <button onclick="navigateTab('kovan')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'kovan' ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30' : 'text-white/70 hover:bg-white/5'}">
            <span>6. Muradiye Komşu Ağı</span>
            <span class="text-[10px] opacity-70">İmece & Paylaşım</span>
          </button>

          <button onclick="navigateTab('father')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'father' ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30' : 'text-white/70 hover:bg-white/5'}">
            <span>7. Baba Destek Alanı</span>
            <span class="text-[10px] opacity-70">Oğuz</span>
          </button>
        </div>
      </div>

      <div class="pt-3 border-t border-white/10 text-xs text-white/50 flex justify-between items-center">
        <span>Muradiye, Manisa</span>
        <button onclick="navigateTab('profile')" class="text-amber-200 font-medium hover:underline">Profilim ➔</button>
      </div>
    </div>
  `;
}

function getTabContent() {
  switch(state.currentTab) {
    case "home": return renderHomeTab();
    case "health": return renderHealthTab();
    case "birth": return renderBirthTab();
    case "calendar": return renderCalendarTab();
    case "shopping": return renderShoppingTab();
    case "kovan": return renderKovanTab();
    case "father": return renderFatherTab();
    case "profile": return renderProfileTab();
    default: return renderHomeTab();
  }
}

// =========================================================================
// 1. MODÜL: GÜNEŞ (REÇETEDEN BESLENEN CANLI GÜNLÜK BESLEME ÇEKMECESİ)
// =========================================================================
function renderHomeTab() {
  const missing = checkDeficiency();
  const hasDeficiency = missing.length > 0;

  return `
    <div class="absolute inset-0 flex flex-col justify-between overflow-hidden bg-[#0A0605]">
      <div 
        id="cinematicTouchStage"
        onpointerdown="handleCinematicTouch(event)"
        onpointermove="handleCinematicMove(event)"
        class="absolute inset-0 w-full h-full cursor-crosshair overflow-hidden touch-none"
      >
        <img 
          id="cinematicBabyVisual"
          src="${state.baby.image}" 
          alt="Güneş 31. Hafta"
          class="w-full h-full object-cover select-none pointer-events-none filter brightness-95 contrast-105 animate-amniotic-float transition-transform duration-300 ease-out"
        >
        <canvas id="cinematicCanvas" width="420" height="860" class="absolute inset-0 w-full h-full pointer-events-none z-10"></canvas>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0A0605] via-transparent to-black/35 pointer-events-none z-10 animate-maternal-breath"></div>
      </div>

      <div class="absolute top-20 right-4 z-30 flex flex-col space-y-2 pointer-events-auto">
        <button onclick="triggerDirectKick()" class="px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white text-[11px] font-medium flex items-center space-x-1.5 hover:bg-white/15 active:scale-95 transition shadow-lg">
          <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
          <span>Tekme: ${state.interactive.kicksToday}</span>
        </button>

        <button onclick="toggleAudio()" class="px-3 py-1.5 rounded-full bg-black/45 backdrop-blur-md border border-white/15 text-white text-[11px] font-medium flex items-center space-x-1.5 hover:bg-white/15 active:scale-95 transition shadow-lg">
          <span>${state.isPlayingAudio ? '8.3 Hz Çalıyor' : '8.3 Hz Dinleti'}</span>
        </button>

        <div class="px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-light text-center shadow-lg">
          ${state.baby.sizeComparison}
        </div>
      </div>

      <div class="absolute bottom-0 inset-x-0 z-40 pointer-events-auto flex flex-col justify-end" onclick="event.stopPropagation()">
        <div class="bg-[#140D0B]/95 backdrop-blur-2xl rounded-t-[32px] border-t border-white/15 text-white shadow-[0_-10px_35px_rgba(0,0,0,0.6)] transition-all duration-300 overflow-hidden">
          <div onclick="toggleBottomSheet()" class="px-5 pt-3 pb-3.5 cursor-pointer hover:bg-white/5 active:bg-white/10 transition flex flex-col justify-center select-none">
            <div class="w-10 h-1 bg-white/30 rounded-full mx-auto mb-2.5"></div>
            <div class="flex justify-between items-center text-xs">
              <div class="flex items-center space-x-2 truncate">
                <span class="w-2 h-2 rounded-full ${hasDeficiency ? 'bg-amber-400' : 'bg-emerald-400'} animate-pulse shrink-0"></span>
                <span id="cinematicFeedbackBox" class="font-serif italic text-white/90 truncate">
                  "${state.interactive.reactionText}"
                </span>
              </div>
              <div class="flex items-center space-x-1 text-amber-200 text-[11px] font-medium shrink-0 ml-2 bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                <span>${state.isSheetExpanded ? 'Kapat ✕' : 'Güneş’i Besle & Duyular ⌃'}</span>
              </div>
            </div>
          </div>

          ${state.isSheetExpanded ? `
            <div class="px-5 pb-6 border-t border-white/10 animate-in fade-in duration-200">
              <div class="grid grid-cols-4 gap-1 bg-white/5 p-1 rounded-2xl text-xs my-3">
                <button onclick="setHomeSubtab('feed')" class="py-2 rounded-xl transition ${state.homeSubtab === 'feed' ? 'bg-white/20 text-white font-semibold shadow-xs' : 'text-white/50'}">
                  Besle
                  ${hasDeficiency ? `<span class="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 ml-1"></span>` : ''}
                </button>
                <button onclick="setHomeSubtab('play')" class="py-2 rounded-xl transition ${state.homeSubtab === 'play' ? 'bg-white/20 text-white font-semibold shadow-xs' : 'text-white/50'}">
                  Bağ Kur
                </button>
                <button onclick="setHomeSubtab('quiz')" class="py-2 rounded-xl transition ${state.homeSubtab === 'quiz' ? 'bg-white/20 text-white font-semibold shadow-xs' : 'text-white/50'}">
                  Gelişim
                </button>
                <button onclick="setHomeSubtab('capsule')" class="py-2 rounded-xl transition ${state.homeSubtab === 'capsule' ? 'bg-white/20 text-white font-semibold shadow-xs' : 'text-white/50'}">
                  Mektuplar
                </button>
              </div>

              <div class="max-h-[230px] overflow-y-auto pr-1">
                ${getHomeSubtabContent()}
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    </div>
  `;
}

function getHomeSubtabContent() {
  if (state.homeSubtab === "feed") {
    const isWaterDeficient = state.nurture.water.count < state.nurture.water.morningTarget;
    const remainingWater = Math.max(0, state.nurture.water.target - state.nurture.water.count);

    return `
      <div class="space-y-2.5 text-xs">
        <!-- 1. Su Kartı -->
        <div class="p-3 bg-white/5 rounded-2xl border ${isWaterDeficient ? 'border-amber-400/40 bg-amber-500/10' : 'border-white/10'}">
          <div class="flex justify-between items-center mb-1">
            <span class="font-medium text-white/90">Su (Amniyotik Sıvı)</span>
            <span class="text-cyan-300 font-semibold">${state.nurture.water.count} / ${state.nurture.water.target} Bardak</span>
          </div>
          
          <div class="w-full bg-white/10 h-1.5 rounded-full overflow-hidden my-2">
            <div class="bg-cyan-400 h-full rounded-full transition-all duration-300" style="width: ${(state.nurture.water.count / state.nurture.water.target) * 100}%"></div>
          </div>

          <div class="text-[10px] text-white/60 mb-2 italic">
            ${remainingWater > 0 
              ? `Güneş'in amniyotik sıvısı için bugün ${remainingWater} bardak kaldı, harika gidiyorsun Buse.` 
              : `Günün su dengesi tamamlandı; Güneş'in yaşam ortamı taptaze ve berrak.`}
          </div>

          <button onclick="feedAction('water')" class="w-full py-2 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/30 text-cyan-200 text-xs font-medium rounded-xl transition flex items-center justify-center space-x-1.5 shadow-sm">
            <span>+ 1 Bardak Su İçtim (Sıvıyı Tazele)</span>
          </button>
        </div>

        <!-- 2. Dengeli Öğün Kartı -->
        <div class="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-2">
          <div class="flex items-center justify-between">
            <div>
              <div class="font-medium text-white/90">Dengeli Öğün & Besin</div>
              <div class="text-[10px] text-white/50 mt-0.5">${state.nurture.meal.detail}</div>
            </div>
            <button onclick="toggleMealSelector()" class="px-3 py-1.5 bg-rose-500/20 border border-rose-400/30 text-rose-200 rounded-xl font-medium">
              ${state.isMealSelectorOpen ? 'Vazgeç' : (state.nurture.meal.taken ? 'Öğün Seç' : 'Öğün Kaydet')}
            </button>
          </div>

          ${state.isMealSelectorOpen ? `
            <div class="pt-2 border-t border-white/10 grid grid-cols-2 gap-1.5 animate-in fade-in duration-150">
              <button onclick="quickSelectMeal('Zeytinyağlı Sebze & Yeşillik')" class="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] text-white/90 text-left border border-white/5">
                Zeytinyağlı Sebze
              </button>
              <button onclick="quickSelectMeal('Izgara Somon & Protein')" class="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] text-white/90 text-left border border-white/5">
                Protein & Balık
              </button>
              <button onclick="quickSelectMeal('Ev Yoğurdu & Ceviz')" class="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] text-white/90 text-left border border-white/5">
                Ev Yoğurdu & Ceviz
              </button>
              <button onclick="quickSelectMeal('Taze Mevsim Meyveleri')" class="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] text-white/90 text-left border border-white/5">
                Taze Mevsim Meyveleri
              </button>
              <button onclick="customMealInput()" class="p-2 bg-rose-500/20 hover:bg-rose-500/30 rounded-xl text-[10px] text-rose-200 text-center border border-rose-400/30 col-span-2 font-medium">
                Kendi Öğününü Yaz...
              </button>
            </div>
          ` : ''}
        </div>

        <!-- 3. DOKTOR REÇETESİNDEN GELEN DİNAMİK TAKVİYE LİSTESİ -->
        <div class="pt-1">
          <div class="text-[11px] font-semibold text-amber-200 px-1 mb-1.5 flex justify-between items-center">
            <span>Doktor Reçeteli Takviyeler</span>
            <button onclick="navigateTab('health'); setHealthSubtab('lab');" class="text-[10px] text-white/50 hover:underline">Reçeteleri Yönet ➔</button>
          </div>

          <div class="space-y-2">
            ${state.prescriptions.map(p => `
              <div class="p-3 bg-white/5 rounded-2xl border ${p.takenToday ? 'border-emerald-400/30 bg-emerald-500/10' : 'border-amber-400/30 bg-amber-500/10'} flex items-center justify-between">
                <div class="pr-2">
                  <div class="flex items-center space-x-1.5">
                    <span class="font-medium ${p.takenToday ? 'text-emerald-200' : 'text-white/95'}">${p.shortName || p.name}</span>
                    <span class="text-[9px] px-1.5 py-0.2 rounded-full bg-white/10 text-white/70">${p.badge}</span>
                  </div>
                  <div class="text-[10px] text-white/50 mt-0.5">${p.dose} · ${p.target.substring(0, 32)}...</div>
                  ${p.takenToday ? `<div class="text-[9px] text-emerald-300 font-medium">✓ Alındı (${p.takenTime || 'Bugün'})</div>` : ''}
                </div>

                <button onclick="takePrescriptionInHome('${p.id}')" class="px-3 py-1.5 ${p.takenToday ? 'bg-emerald-500/20 text-emerald-200 border-emerald-400/30' : 'bg-amber-500/25 text-amber-200 border-amber-400/40 hover:bg-amber-500/35'} border rounded-xl font-medium shrink-0 shadow-xs transition">
                  ${p.takenToday ? 'Alındı ✓' : 'İçtim / Al'}
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else if (state.homeSubtab === "play") {
    return `
      <div class="space-y-2 text-xs">
        <div class="p-3 bg-white/5 rounded-2xl border border-white/10">
          <div class="font-semibold text-white/90">31. Hafta Duyusal Deneyim</div>
          <p class="text-[10px] text-white/60 mt-1 leading-relaxed">
            Ekrana dokunarak veya ses/ışık göndererek Güneş ile derin bir rezonans yakalayabilirsiniz.
          </p>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button onclick="triggerLightFlash()" class="p-3 bg-white/5 rounded-2xl border border-white/10 text-left hover:bg-white/10 transition">
            <div class="font-medium text-amber-200">Işık Deneyimi</div>
            <div class="text-[9px] text-white/50 mt-0.5">Işığın yönüne başını çevirir</div>
          </button>
          <button onclick="playFatherVoice()" class="p-3 bg-white/5 rounded-2xl border border-white/10 text-left hover:bg-white/10 transition">
            <div class="font-medium text-cyan-200">Oğuz'un Sesi</div>
            <div class="text-[9px] text-white/50 mt-0.5">Babasının ses tonu</div>
          </button>
        </div>
      </div>
    `;
  } else if (state.homeSubtab === "quiz") {
    return `
      <div class="p-3 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs">
        <div class="font-medium text-white/90">${state.dailyQuiz.question}</div>
        <div class="space-y-1.5">
          ${!state.dailyQuiz.answered ? state.dailyQuiz.options.map((opt, idx) => `
            <button onclick="handleQuizAnswer(${idx})" class="w-full text-left p-2.5 bg-white/10 rounded-xl hover:bg-white/20 transition text-white/90">
              ${opt.text}
            </button>
          `).join('') : `
            <div class="p-2.5 bg-emerald-500/20 border border-emerald-400/30 rounded-xl text-emerald-200 text-[11px]">
              ${state.dailyQuiz.explanation}
            </div>
          `}
        </div>
      </div>
    `;
  } else if (state.homeSubtab === "capsule") {
    return `
      <div class="space-y-2 text-xs">
        <div class="flex justify-between items-center">
          <span class="font-medium text-white/90">Güneş'e Mektuplar</span>
          <button onclick="openNewLetterModal()" class="text-amber-200 text-[11px] font-medium">+ Mektup Yaz</button>
        </div>
        ${state.timeCapsules.map(cap => `
          <div class="p-2.5 bg-white/5 rounded-xl border border-white/10 text-xs">
            <div class="flex justify-between text-white/90 font-medium">
              <span>${cap.title}</span>
              <span class="text-[9px] text-white/50">${cap.unlockEvent}</span>
            </div>
            <div class="text-[10px] text-white/50 italic mt-0.5">"${cap.preview}"</div>
          </div>
        `).join('')}
      </div>
    `;
  }
}

// =========================================================================
// 2. MODÜL: ŞİFA & SAĞLIK TAKİBİ (BİYOMETRİ, HORMON, TAHLİL & RX, PELVİK, ULTRASON)
// =========================================================================
function renderHealthTab() {
  return `
    <div class="w-full h-full pt-16 pb-12 px-5 space-y-4 text-white overflow-y-auto">
      
      <!-- Başlık Kartı -->
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h2 class="text-base font-serif font-semibold text-white/95">Şifa & Sağlık Takibi</h2>
          <p class="text-[11px] text-white/60">Buse · 31. Hafta Biyometri, Hormon ve Klinik Güvenlik</p>
        </div>
        <span class="text-xs bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 rounded-full font-medium">
          Dengede
        </span>
      </div>

      <!-- 5 Net Alt Kategori Filtre Butonları (Emoji İçermeyen Temiz Tasarım) -->
      <div class="grid grid-cols-5 gap-1 bg-white/5 p-1 rounded-2xl text-[11px]">
        <button onclick="setHealthSubtab('biometrics')" class="py-2 rounded-xl transition ${state.healthData.activeHealthSubtab === 'biometrics' ? 'bg-white/20 text-white font-semibold shadow-xs' : 'text-white/50'}">
          Biyometri
        </button>
        <button onclick="setHealthSubtab('hormone')" class="py-2 rounded-xl transition ${state.healthData.activeHealthSubtab === 'hormone' ? 'bg-white/20 text-white font-semibold shadow-xs' : 'text-white/50'}">
          Hormon
        </button>
        <button onclick="setHealthSubtab('lab')" class="py-2 rounded-xl transition ${state.healthData.activeHealthSubtab === 'lab' ? 'bg-white/20 text-white font-semibold shadow-xs' : 'text-white/50'}">
          Tahlil & Rx
        </button>
        <button onclick="setHealthSubtab('exercise')" class="py-2 rounded-xl transition ${state.healthData.activeHealthSubtab === 'exercise' ? 'bg-white/20 text-white font-semibold shadow-xs' : 'text-white/50'}">
          Pelvik
        </button>
        <button onclick="setHealthSubtab('ultrasound')" class="py-2 rounded-xl transition ${state.healthData.activeHealthSubtab === 'ultrasound' ? 'bg-white/20 text-white font-semibold shadow-xs' : 'text-white/50'}">
          Ultrason
        </button>
      </div>

      <!-- Dinamik Sağlık İçeriği -->
      ${getHealthSubtabContent()}

    </div>
  `;
}

function setHealthSubtab(tab) {
  state.healthData.activeHealthSubtab = tab;
  triggerHaptic(10);
  render();
}

function setLabFilterCategory(cat) {
  state.healthData.labFilterCategory = cat;
  triggerHaptic(10);
  render();
}

function toggleBpAccordion() {
  state.healthData.isBpAccordionOpen = !state.healthData.isBpAccordionOpen;
  triggerHaptic(10);
  render();
}

function toggleSafetyCorridor() {
  state.healthData.isSafetyCorridorOpen = !state.healthData.isSafetyCorridorOpen;
  triggerHaptic(10);
  render();
}

function toggleHormoneDetail() {
  state.healthData.isHormoneDetailOpen = !state.healthData.isHormoneDetailOpen;
  triggerHaptic(10);
  render();
}

function getHealthSubtabContent() {
  // 1. BİYOMETRİ (TANSİYON + GÜVENLİK KORİDORU + 0-31. HAFTA SVG GRAFİĞİ)
  if (state.healthData.activeHealthSubtab === "biometrics") {
    const weightGain = (state.user.currentWeight - state.user.startWeight).toFixed(1);
    const waistGain = state.user.waistCircumference - state.user.startWaist;

    return `
      <div class="space-y-4 animate-in fade-in duration-150">
        
        <!-- Güncel Tansiyon Takip Kartı & Güvenlik Koridoru -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3 shadow-sm">
          <div class="flex justify-between items-center">
            <div>
              <span class="text-xs font-semibold text-white/95">Güncel Tansiyon Takibi</span>
              <p class="text-[10px] text-white/50">Kişisel Baz: ${state.user.baselineBP} mmHg (Hipotansif)</p>
            </div>
            <button onclick="addNewBloodPressureLog()" class="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-xs font-medium rounded-xl transition">
              + Ölçüm Ekle
            </button>
          </div>

          <div class="p-3.5 bg-white/5 rounded-2xl flex items-center justify-between border border-white/5">
            <div>
              <div class="text-lg font-bold text-white">${state.healthData.bloodPressureHistory[0].systolic}/${state.healthData.bloodPressureHistory[0].diastolic} <span class="text-xs font-normal text-white/60">mmHg</span></div>
              <div class="text-[10px] text-emerald-300 mt-0.5">✓ Son Ölçüm: ${state.healthData.bloodPressureHistory[0].date}</div>
            </div>
            <span class="text-[10px] bg-emerald-500/15 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 rounded-full font-medium">
              Doğal Dengede
            </span>
          </div>

          <!-- Kişisel Güvenlik Koridoru & Kırmızı Bayraklar Rehberi -->
          <div class="p-3 bg-gradient-to-r from-amber-950/40 to-black/30 rounded-2xl border border-amber-400/25 space-y-2">
            <div class="flex justify-between items-center cursor-pointer select-none" onclick="toggleSafetyCorridor()">
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-amber-400"></span>
                <span class="text-xs font-bold text-amber-200">Tansiyon Güvenlik Protokolü</span>
              </div>
              <span class="text-[10px] text-amber-300 font-semibold">${state.healthData.isSafetyCorridorOpen ? 'Kapat ▲' : 'Nasıl Yorumlanır? ▼'}</span>
            </div>

            ${state.healthData.isSafetyCorridorOpen ? `
              <div class="pt-2 border-t border-white/10 space-y-2 text-[11px] animate-in fade-in duration-150">
                <div class="grid grid-cols-3 gap-1.5 text-center">
                  <div class="p-2 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-emerald-200">
                    <div class="font-bold text-xs">85-115</div>
                    <div class="text-[9px] opacity-75">Güvenli / Normal</div>
                  </div>
                  <div class="p-2 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-200">
                    <div class="font-bold text-xs">120-130</div>
                    <div class="text-[9px] opacity-75">Takip / Dinlen</div>
                  </div>
                  <div class="p-2 rounded-xl bg-rose-500/20 border border-rose-400/40 text-rose-200">
                    <div class="font-bold text-xs">135+</div>
                    <div class="text-[9px] opacity-75">Doktora Başvurun</div>
                  </div>
                </div>

                <div class="p-2.5 bg-black/40 rounded-xl border border-white/5 space-y-1 text-[10px] text-white/70 leading-relaxed">
                  <div class="font-bold text-rose-300">Acil Durum Göstergeleri (Dr. Ayşe Yılmaz Protokolü):</div>
                  <div>• Sistolik tansiyonun 130 mmHg üzerine çıkması</div>
                  <div>• Görme alanında bulanıklık veya ışık parlamaları</div>
                  <div>• Üst karın bölgesinde ani baskı veya elde/yüzde belirgin ödem</div>
                </div>
              </div>
            ` : ''}
          </div>

          <!-- Açılır Kapanır Akordiyon Geçmiş -->
          <div class="pt-1">
            <button onclick="toggleBpAccordion()" class="w-full flex items-center justify-between py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-[11px] text-white/70 transition border border-white/5">
              <span>Önceki Ölçümler (${state.healthData.bloodPressureHistory.length - 1} Kayıt)</span>
              <span class="text-amber-200 font-bold">${state.healthData.isBpAccordionOpen ? '▲ Kapat' : '▼ Aç'}</span>
            </button>

            ${state.healthData.isBpAccordionOpen ? `
              <div class="space-y-1.5 mt-2 animate-in fade-in duration-150">
                ${state.healthData.bloodPressureHistory.slice(1).map(bp => `
                  <div class="flex justify-between items-center text-xs p-2.5 rounded-xl bg-white/5 border border-white/5 text-white/80">
                    <div>
                      <div class="text-[11px] text-white/90">${bp.date}</div>
                      <div class="text-[9px] text-white/40">${bp.note}</div>
                    </div>
                    <span class="font-bold text-white/95">${bp.systolic}/${bp.diastolic} mmHg</span>
                  </div>
                `).join('')}
              </div>
            ` : ''}
          </div>
        </div>

        <!-- Hamilelik Başlangıcından İtibaren İlerleme Eğrisi (0.H ➔ 31.H) -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3.5 shadow-sm">
          <div class="flex justify-between items-center">
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
            </div>
            <div class="p-3 bg-white/5 rounded-2xl border border-white/5">
              <span class="text-[10px] text-white/50">Karın Çevresi Artışı</span>
              <div class="text-base font-bold text-amber-200 mt-0.5">+${waistGain} cm</div>
              <span class="text-[9px] text-white/40">Fundus: ~${state.user.fundalHeight} cm</span>
            </div>
          </div>

          <!-- Saf SVG Çizgi Grafiği -->
          <div class="p-3 bg-black/30 rounded-2xl border border-white/5 space-y-2">
            <div class="flex justify-between text-[10px] text-white/60">
              <span class="flex items-center space-x-1"><span class="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> <span>Kilo (kg)</span></span>
              <span class="flex items-center space-x-1"><span class="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> <span>Karın Çevresi (cm)</span></span>
            </div>

            <svg class="w-full h-28 overflow-visible" viewBox="0 0 320 80">
              <line x1="0" y1="20" x2="320" y2="20" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3,3" />
              <line x1="0" y1="50" x2="320" y2="50" stroke="rgba(255,255,255,0.08)" stroke-dasharray="3,3" />
              <line x1="0" y1="75" x2="320" y2="75" stroke="rgba(255,255,255,0.15)" />

              <polyline fill="none" stroke="#FBBF24" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                points="15,65 75,52 135,38 195,24 255,18 305,10" />

              <polyline fill="none" stroke="#34D399" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"
                points="15,72 75,66 135,58 195,46 255,42 305,34" />

              <circle cx="15" cy="72" r="3.5" fill="#34D399" />
              <circle cx="75" cy="66" r="3.5" fill="#34D399" />
              <circle cx="135" cy="58" r="3.5" fill="#34D399" />
              <circle cx="195" cy="46" r="3.5" fill="#34D399" />
              <circle cx="255" cy="42" r="3.5" fill="#34D399" />
              <circle cx="305" cy="34" r="4.5" fill="#34D399" stroke="#000" stroke-width="1.5" />

              <circle cx="15" cy="65" r="3.5" fill="#FBBF24" />
              <circle cx="75" cy="52" r="3.5" fill="#FBBF24" />
              <circle cx="135" cy="38" r="3.5" fill="#FBBF24" />
              <circle cx="195" cy="24" r="3.5" fill="#FBBF24" />
              <circle cx="255" cy="18" r="3.5" fill="#FBBF24" />
              <circle cx="305" cy="10" r="4.5" fill="#FBBF24" stroke="#000" stroke-width="1.5" />
            </svg>

            <div class="flex justify-between text-[9px] text-white/40 pt-1">
              <span>0.H (58kg)</span>
              <span>12.H</span>
              <span>20.H</span>
              <span>26.H</span>
              <span>28.H</span>
              <span class="text-emerald-300 font-bold">31.H (65kg / 98cm)</span>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  // 2. HORMON & BEDEN DİLİ (BABA SANCI ALARMI ENTEGRE)
  else if (state.healthData.activeHealthSubtab === "hormone") {
    return `
      <div class="space-y-4 animate-in fade-in duration-150 text-xs">
        
        <!-- OĞUZ'A SANCI & DESTEK UYARISI GÖNDERME KARTI -->
        <div class="p-4 bg-gradient-to-r from-rose-950/40 via-red-950/20 to-amber-950/40 rounded-3xl border border-rose-400/40 space-y-3 shadow-lg">
          <div class="flex justify-between items-start">
            <div>
              <div class="font-bold text-white text-sm">Sancı veya Şiddetli Ağrı Durumu</div>
              <div class="text-[10px] text-rose-200 mt-0.5">Tek dokunuşla Oğuz'un telefonuna acil destek bildirimi gönderin</div>
            </div>
          </div>

          <div class="grid grid-cols-2 gap-2 pt-1">
            <button onclick="sendPartnerPainAlert('Orta Seviye Sancı (Dinlenme & Masaj İhtiyacı)')" class="p-2.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/40 rounded-2xl text-left transition text-amber-200 font-semibold shadow-xs">
              <div class="text-xs font-bold">Destek & Masaj İste</div>
              <div class="text-[9px] opacity-75 font-normal">Oğuz'a dinlenme notu</div>
            </button>
            <button onclick="sendPartnerPainAlert('Şiddetli Sancı Dalgası / Erken Doğum Kontrolü')" class="p-2.5 bg-rose-600/30 hover:bg-rose-600/50 border border-rose-400/60 rounded-2xl text-left transition text-rose-200 font-bold shadow-xs">
              <div class="text-xs font-bold">Acil Sancı Bildir</div>
              <div class="text-[9px] opacity-80 font-normal">Yüksek öncelikli çağrı</div>
            </button>
          </div>
        </div>

        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3.5 shadow-md">
          <div class="flex justify-between items-start">
            <div>
              <span class="text-xs font-semibold text-white/95">Hormon Evreniz</span>
              <div class="text-base font-bold text-amber-200 mt-0.5">3. Trimester Hazırlık & Yuva Kurma</div>
            </div>
            <span class="text-[10px] bg-rose-500/20 text-rose-200 px-2.5 py-1 rounded-full border border-rose-400/30 font-medium">
              31. Hafta
            </span>
          </div>

          <div class="p-3 bg-black/40 rounded-2xl border border-white/5 space-y-2">
            <div class="flex justify-between text-[9px] text-white/60">
              <span class="flex items-center space-x-1"><span class="w-2 h-2 rounded-full bg-rose-400 inline-block"></span> <span>Progesteron</span></span>
              <span class="flex items-center space-x-1"><span class="w-2 h-2 rounded-full bg-sky-400 inline-block"></span> <span>Östrojen</span></span>
              <span class="flex items-center space-x-1"><span class="w-2 h-2 rounded-full bg-amber-400 inline-block"></span> <span>Relaksin</span></span>
              <span class="flex items-center space-x-1"><span class="w-2 h-2 rounded-full bg-emerald-400 inline-block"></span> <span>Oksitosin</span></span>
            </div>

            <svg class="w-full h-24 overflow-visible" viewBox="0 0 320 70">
              <rect x="0" y="0" width="100" height="70" fill="rgba(244,63,94,0.06)" rx="8" />
              <rect x="105" y="0" width="100" height="70" fill="rgba(56,189,248,0.06)" rx="8" />
              <rect x="210" y="0" width="110" height="70" fill="rgba(251,191,36,0.08)" rx="8" />

              <path d="M 10 58 Q 100 45, 180 25 T 255 12 T 310 10" fill="none" stroke="#F43F5E" stroke-width="2.2" stroke-linecap="round" />
              <path d="M 10 64 Q 100 55, 180 32 T 255 16 T 310 8" fill="none" stroke="#38BDF8" stroke-width="2.2" stroke-linecap="round" />
              <path d="M 10 40 Q 80 15, 150 48 T 255 20 T 310 12" fill="none" stroke="#FBBF24" stroke-width="2.2" stroke-linecap="round" />
              <path d="M 10 66 Q 100 64, 180 52 T 255 35 T 310 14" fill="none" stroke="#34D399" stroke-width="2.2" stroke-dasharray="3,2" />

              <line x1="255" y1="0" x2="255" y2="70" stroke="#FBBF24" stroke-width="1.8" stroke-dasharray="2,2" />
              <circle cx="255" cy="12" r="4.5" fill="#F43F5E" stroke="#fff" stroke-width="1" />
              <circle cx="255" cy="20" r="4" fill="#FBBF24" stroke="#fff" stroke-width="1" />
            </svg>

            <div class="flex justify-between text-[9px] text-white/40 pt-1">
              <span>1. Trimester</span>
              <span>2. Trimester</span>
              <span class="text-amber-200 font-bold">31.H (Şu An)</span>
              <span>Doğum</span>
            </div>
          </div>

          <div class="pt-1 flex justify-between items-center">
            <span class="text-[11px] text-white/80 font-medium">Progesteron & Relaksin Zirvede</span>
            <button onclick="toggleHormoneDetail()" class="px-3 py-1.5 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 text-sky-200 font-semibold rounded-xl transition text-[11px]">
              ${state.healthData.isHormoneDetailOpen ? 'Kapat ✕' : 'Daha Fazlasını Öğren ➔'}
            </button>
          </div>

          ${state.healthData.isHormoneDetailOpen ? `
            <div class="pt-3 border-t border-white/10 space-y-2 animate-in fade-in duration-150">
              <div class="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1.5">
                <div class="flex justify-between text-[11px] font-bold text-rose-300">
                  <span>Progesteron Etkisi</span>
                  <span>Rahim Koruma Fonksiyonu</span>
                </div>
                <p class="text-[10px] text-white/70 leading-relaxed">
                  Sindirim sistemini bilinçli olarak yavaşlatır; besinlerin Güneş'e daha zengin geçmesini sağlar. Mide yanması veya hafif şişkinlik hissetmeniz bu hormonun doğal bir sonucudur.
                </p>
              </div>

              <div class="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1.5">
                <div class="flex justify-between text-[11px] font-bold text-amber-300">
                  <span>Relaksin Etkisi</span>
                  <span>Doğum Kanalı Genişlemesi</span>
                </div>
                <p class="text-[10px] text-white/70 leading-relaxed">
                  Leğen kemiği eklemlerini gevşetir. Yürürken kalça hassasiyeti, vücudunuzun Güneş'in doğum inişine alan açmasından kaynaklanır.
                </p>
              </div>
            </div>
          ` : ''}
        </div>

        <div class="space-y-2.5">
          <div class="text-xs font-semibold text-white/60 uppercase tracking-wider px-1">Beden Dili ve Günlük Sinyaller</div>

          <div class="p-4 bg-white/5 hover:bg-white/10 rounded-3xl border border-white/10 space-y-2 cursor-pointer transition" onclick="logSymptomAction()">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300 font-bold text-xs">
                  S
                </div>
                <div>
                  <div class="font-bold text-white text-sm">Fiziksel Sinyaller & Ağrı</div>
                  <div class="text-[10px] text-white/50">${state.healthData.selectedSymptoms.join(' · ')}</div>
                </div>
              </div>
              <span class="text-white/40 text-sm">➔</span>
            </div>
            <p class="text-[10px] text-white/60 pt-1 border-t border-white/5 leading-relaxed">
              Relaksin etkisiyle bel ve kalça eklemlerinde gevşeme normaldir; dinlenik yürüyüş ve ılık duş rahatlatır.
            </p>
          </div>

          <div class="p-4 bg-white/5 hover:bg-white/10 rounded-3xl border border-white/10 space-y-2 cursor-pointer transition" onclick="logMoodAction()">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 font-bold text-xs">
                  M
                </div>
                <div>
                  <div class="font-bold text-white text-sm">Duygular & Ruh Hali</div>
                  <div class="text-[10px] text-amber-200">${state.healthData.selectedMood}</div>
                </div>
              </div>
              <span class="text-white/40 text-sm">➔</span>
            </div>
            <p class="text-[10px] text-white/60 pt-1 border-t border-white/5 leading-relaxed">
              Oksitosin yükselişiyle odayı düzenleme ve beşiği hazırlama isteği yoğunlaşır.
            </p>
          </div>
        </div>
      </div>
    `;
  }

  // 3. TAHLİLLER & REÇETELER (TREND ÇİZGİLERİ VE EMİLİM REHBERİ)
  else if (state.healthData.activeHealthSubtab === "lab") {
    let filteredLabs = state.healthData.bloodwork;
    if (state.healthData.labFilterCategory === "normal") {
      filteredLabs = state.healthData.bloodwork.filter(l => l.category === "normal");
    } else if (state.healthData.labFilterCategory === "attention") {
      filteredLabs = state.healthData.bloodwork.filter(l => l.category === "attention");
    }

    const attentionCount = state.healthData.bloodwork.filter(l => l.category === "attention").length;

    return `
      <div class="space-y-4 animate-in fade-in duration-150 text-xs">
        
        <!-- TAHLİL RAPORLARI VE PDF YÜKLEME -->
        <div class="p-4 bg-gradient-to-br from-amber-950/30 via-white/5 to-white/5 rounded-3xl border border-amber-400/30 space-y-2.5 shadow-md">
          <div class="flex justify-between items-center">
            <div>
              <span class="font-bold text-white text-sm">Tahlil Raporu Yükle</span>
              <p class="text-[10px] text-white/60">PDF veya Fotoğraftan Otomatik İçe Aktar</p>
            </div>
            <button onclick="simulatePdfUpload()" class="px-3 py-1.5 bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 font-semibold rounded-xl transition text-xs">
              PDF / Fotoğraf Yükle
            </button>
          </div>
        </div>

        <!-- 3 Kategori Filtresi -->
        <div class="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-2xl text-xs">
          <button onclick="setLabFilterCategory('all')" class="py-2 rounded-xl transition ${state.healthData.labFilterCategory === 'all' ? 'bg-white/20 text-white font-semibold' : 'text-white/50'}">
            Tümü (${state.healthData.bloodwork.length})
          </button>
          <button onclick="setLabFilterCategory('normal')" class="py-2 rounded-xl transition ${state.healthData.labFilterCategory === 'normal' ? 'bg-emerald-500/25 text-emerald-200 font-semibold border border-emerald-400/30' : 'text-white/50'}">
            Dengede
          </button>
          <button onclick="setLabFilterCategory('attention')" class="py-2 rounded-xl transition relative ${state.healthData.labFilterCategory === 'attention' ? 'bg-amber-500/30 text-amber-200 font-semibold border border-amber-400/40' : 'text-white/50'}">
            <span>Dikkat / Takip</span>
            ${attentionCount > 0 ? `<span class="inline-block w-2 h-2 rounded-full bg-amber-400 ml-1"></span>` : ''}
          </button>
        </div>

        <!-- 3 Trimester Trendiyle Donatılmış Tahlil Kartları -->
        <div class="space-y-3">
          ${filteredLabs.map(item => `
            <div class="p-3.5 bg-white/5 rounded-2xl border ${item.category === 'attention' ? 'border-amber-400/50 bg-amber-500/10' : 'border-white/10'} space-y-2">
              <div class="flex justify-between items-center">
                <span class="font-bold text-white text-xs">${item.name}</span>
                <span class="px-2 py-0.5 ${item.category === 'attention' ? 'bg-amber-500/25 text-amber-200 border-amber-400/40' : 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30'} border rounded-full text-[9px] font-medium">
                  ${item.status}
                </span>
              </div>

              <div class="flex items-baseline space-x-1">
                <span class="text-sm font-bold ${item.category === 'attention' ? 'text-amber-300' : 'text-white'}">${item.value}</span>
                <span class="text-[10px] text-white/50">${item.unit} (Ref: ${item.min} - ${item.max})</span>
              </div>

              <!-- 3 Trimester Trend Çizgisi -->
              ${item.trend ? `
                <div class="p-2 bg-black/30 rounded-xl border border-white/5 space-y-1">
                  <div class="flex justify-between text-[9px] text-white/60">
                    <span class="font-medium">Trimester Trendi:</span>
                    <span class="text-amber-200/90 font-mono">${item.trend.map(t => `${t.week}: ${t.val}`).join(' ➔ ')}</span>
                  </div>
                  <div class="text-[9px] text-white/50 italic">${item.trendDesc}</div>
                </div>
              ` : ''}

              <div class="flex justify-between items-center pt-1 border-t border-white/5 text-[9px]">
                <span class="${item.category === 'attention' ? 'text-amber-200' : 'text-white/60'} italic">${item.note}</span>
                <span class="text-white/40">${item.source}</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- DOKTOR REÇETESİ VE İLAÇ TANIMLAMA (EMİLİM İPUÇLARIYLA) -->
        <div class="pt-3 border-t border-white/10 space-y-3">
          <div class="flex justify-between items-center px-1">
            <div>
              <span class="font-bold text-white text-sm">Doktor Reçetesi & İlaç Tanımları</span>
              <p class="text-[10px] text-white/50">Dr. Ayşe Yılmaz · 31. Hafta Reçetesi</p>
            </div>
            <button onclick="addNewPrescription()" class="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 font-semibold rounded-xl transition text-xs shadow-xs">
              + İlaç / Reçete Ekle
            </button>
          </div>

          <p class="text-[10px] text-white/60 bg-white/5 p-2.5 rounded-xl border border-white/5 leading-relaxed italic">
            Not: Burada tanımlanan ilaç ve takviyeler, günlük olarak <strong>1. Güneş</strong> menüsünün 'Besle' çekmecesinde yer alır.
          </p>

          <div class="space-y-2.5">
            ${state.prescriptions.map(p => `
              <div class="p-3 bg-white/5 rounded-2xl border ${p.takenToday ? 'border-emerald-400/30 bg-emerald-500/10' : 'border-white/10'} space-y-2">
                <div class="flex items-center justify-between">
                  <div class="space-y-0.5">
                    <div class="flex items-center space-x-1.5">
                      <span class="font-bold ${p.takenToday ? 'text-emerald-200' : 'text-white'} text-xs">${p.name}</span>
                      <span class="text-[9px] px-1.5 py-0.2 rounded-full bg-white/10 text-white/70 font-medium">${p.badge}</span>
                    </div>
                    <div class="text-[10px] text-amber-200/90">${p.dose} · <span class="text-white/40">${p.doctor}</span></div>
                  </div>

                  <span class="text-[10px] px-2 py-1 rounded-lg ${p.takenToday ? 'bg-emerald-500/20 text-emerald-300 font-medium' : 'bg-white/10 text-white/50'}">
                    ${p.takenToday ? '✓ Alındı' : 'Bekliyor'}
                  </span>
                </div>

                <!-- Akıllı Emilim & Biyoyararlanım Rehberi -->
                <div class="p-2 bg-black/40 rounded-xl border border-white/5 text-[10px] text-amber-200/85 leading-relaxed">
                  <span class="font-semibold text-white/80">Kullanım Notu:</span> ${p.bioTip}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    `;
  }

  // 4. PELVİK GÖREVLERİ (SADE NUMARALANDIRMA & EŞ ROLÜ)
  else if (state.healthData.activeHealthSubtab === "exercise") {
    const completedCount = state.healthData.exercises.filter(e => e.completed).length;
    const totalCount = state.healthData.exercises.length;
    const progressPercent = Math.round((completedCount / totalCount) * 100);
    const currentEx = state.healthData.exercises[state.healthData.selectedExerciseIndex];

    return `
      <div class="space-y-4 animate-in fade-in duration-150 text-xs">
        <div class="p-4 bg-gradient-to-br from-emerald-950/40 via-white/5 to-white/5 rounded-3xl border border-emerald-400/30 space-y-3 shadow-lg">
          <div class="flex justify-between items-center">
            <div>
              <span class="text-emerald-200 font-bold text-sm">Günün Pelvik Çemberi</span>
              <p class="text-[10px] text-white/60">Güneş'in Doğum Yolunu Açma Hazırlığı</p>
            </div>
            <span class="px-2.5 py-1 bg-amber-500/20 text-amber-200 border border-amber-400/30 rounded-full text-[10px] font-bold">
              ${state.healthData.pelvicStreakDays} Günlük Seri
            </span>
          </div>

          <div class="space-y-1.5">
            <div class="flex justify-between text-[11px] font-medium">
              <span class="text-white/90">${completedCount} / ${totalCount} Hareket Tamamlandı</span>
              <span class="text-emerald-300 font-bold">%${progressPercent} Açıklık</span>
            </div>
            <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div class="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500" style="width: ${progressPercent}%"></div>
            </div>
          </div>

          <p class="text-[10px] text-white/70 italic">
            ${completedCount === totalCount 
              ? 'Günün tüm pelvik hazırlığı başarıyla tamamlandı.' 
              : 'Günün hareketlerini tamamladıkça pelvik dokular esner ve doğum uyumu artar.'}
          </p>
        </div>

        <div class="space-y-2.5">
          <div class="text-xs font-semibold text-white/60 uppercase tracking-wider px-1">4 Temel Doğum Hareketi</div>

          ${state.healthData.exercises.map((ex, idx) => `
            <div class="p-3.5 bg-white/5 rounded-2xl border ${ex.completed ? 'border-emerald-400/40 bg-emerald-500/10' : (state.healthData.selectedExerciseIndex === idx ? 'border-amber-400/40' : 'border-white/10')} flex items-center justify-between transition">
              <div class="flex items-center space-x-3 cursor-pointer flex-1" onclick="selectPelvicExercise(${idx})">
                <span class="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center font-mono font-bold text-xs text-amber-200 border border-white/10">${ex.number}</span>
                <div>
                  <div class="font-bold ${ex.completed ? 'text-emerald-200' : 'text-white'} text-xs flex items-center space-x-1.5">
                    <span>${ex.name}</span>
                    ${ex.completed ? '<span class="text-emerald-400 font-bold">✓</span>' : ''}
                  </div>
                  <div class="text-[10px] text-white/50 mt-0.5">${ex.duration} · <span class="text-amber-200/90">${ex.target}</span></div>
                </div>
              </div>

              <button onclick="toggleExerciseComplete(${ex.id})" class="px-3 py-1.5 rounded-xl font-semibold text-[11px] shrink-0 ml-2 transition ${ex.completed ? 'bg-emerald-500/25 border border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/35' : 'bg-white/10 hover:bg-white/20 border border-white/15 text-white/80'}">
                ${ex.completed ? 'Tamamlandı ✓' : 'Tamamla'}
              </button>
            </div>
          `).join('')}
        </div>

        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <span class="font-bold text-white text-xs">${currentEx.name} Seansı</span>
            <span class="text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded-full">${currentEx.duration}</span>
          </div>

          <p class="text-[11px] text-white/70 leading-relaxed bg-black/20 p-3 rounded-2xl border border-white/5">
            ${currentEx.desc}
          </p>

          <!-- Biyo-Geri Bildirim & Doğru Hissediş Uyarısı -->
          <div class="p-2.5 bg-rose-950/30 rounded-2xl border border-rose-400/30 text-[10px] text-rose-200 leading-relaxed">
            ${currentEx.bioFeedback}
          </div>

          <!-- Baba / Eş Katılım Rolü -->
          <div class="p-2.5 bg-cyan-950/30 rounded-2xl border border-cyan-400/30 text-[10px] text-cyan-200 leading-relaxed flex items-center justify-between">
            <div>
              <span class="font-bold">Eş / Destekçi Rolü:</span> ${currentEx.partnerRole}
            </div>
          </div>

          <div class="p-4 bg-black/30 rounded-2xl border border-white/5 text-center space-y-2">
            <div class="text-3xl font-serif font-bold text-white tracking-wider">
              ${state.healthData.exerciseTimer > 0 ? state.healthData.exerciseTimer + ' sn' : '00:00'}
            </div>
            <p class="text-xs font-medium ${state.healthData.exercisePhase.includes('Sık') ? 'text-amber-200' : 'text-emerald-300'} animate-pulse">
              ${state.healthData.isExerciseRunning ? state.healthData.exercisePhase : 'Rehberli seansı başlatabilirsiniz'}
            </p>

            <button onclick="togglePelvicExercise()" class="w-full py-2.5 ${state.healthData.isExerciseRunning ? 'bg-emerald-600 text-white' : 'bg-emerald-500/20 text-emerald-200 border border-emerald-400/40'} font-semibold text-xs rounded-xl transition shadow-md">
              ${state.healthData.isExerciseRunning ? 'Seansı Bitir & Kaydet' : 'Rehberli Seansı Başlat'}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // 5. ULTRASON & DOPPLER
  else if (state.healthData.activeHealthSubtab === "ultrasound") {
    return `
      <div class="space-y-4 animate-in fade-in duration-150 text-xs">
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <div class="font-semibold text-white/95">Doppler Kalp Sesleri</div>
              <div class="text-[10px] text-white/50">Klinik kontrollerde kaydedilen ses dalgaları</div>
            </div>
            <button onclick="addUltrasoundAudio()" class="px-2.5 py-1 bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-medium rounded-xl hover:bg-amber-500/30 transition">
              + Ses Ekle
            </button>
          </div>

          <div class="space-y-2">
            ${state.ultrasoundAudios.map(aud => `
              <div class="p-3 bg-white/5 rounded-2xl flex items-center justify-between border ${aud.isPlaying ? 'border-amber-400/40 bg-amber-500/10' : 'border-white/5'} transition">
                <div class="flex items-center space-x-3">
                  <button onclick="playHeartbeatAudio(${aud.id})" class="w-10 h-10 rounded-full ${aud.isPlaying ? 'bg-amber-400 text-black animate-pulse' : 'bg-white/15 text-white'} flex items-center justify-center text-xs font-bold transition shadow-sm">
                    ${aud.isPlaying ? '■' : '▶'}
                  </button>
                  <div>
                    <div class="font-medium text-white/95">${aud.title}</div>
                    <div class="text-[10px] text-white/50 mt-0.5">${aud.date} · <strong class="text-emerald-300 font-semibold">${aud.bpm} BPM</strong> (${aud.duration})</div>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <div>
              <div class="font-semibold text-white/95">Güneş'in Ultrason Galerisi</div>
              <div class="text-[10px] text-white/50">2D / 4D Klinik Görüntüleri</div>
            </div>
            <button onclick="addNewUltrasoundPhoto()" class="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/15 text-amber-200 text-xs font-medium rounded-xl">
              + Fotoğraf Ekle
            </button>
          </div>

          <div class="space-y-3">
            ${state.healthData.ultrasoundGallery.map(us => `
              <div class="bg-white/5 rounded-2xl overflow-hidden border border-white/10 group">
                <img src="${us.image}" class="w-full h-36 object-cover filter contrast-105">
                <div class="p-3 space-y-1">
                  <div class="flex justify-between items-center">
                    <span class="font-bold text-white text-xs">${us.title}</span>
                    <span class="text-[10px] bg-white/10 text-white/70 px-2 py-0.5 rounded-full">${us.week}</span>
                  </div>
                  <div class="text-[10px] text-emerald-300 font-medium">${us.date} · ${us.doctor}</div>
                  <p class="text-[10px] text-white/60 leading-relaxed pt-1">
                    "${us.desc}"
                  </p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }
}

// OĞUZ'A SANCI / DESTEK ÇAĞRISI GÖNDERME İŞLEYİCİSİ
window.sendPartnerPainAlert = function(type) {
  triggerHaptic([50, 40, 50, 40, 100]);
  const now = new Date();
  const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
  
  state.messages.push({
    sender: "Buse (Sağlık Sinyali)",
    text: `[SAĞLIK SİNYALİ]: ${type}. Yanımda olmana ihtiyacım var.`,
    time: timeStr,
    isMe: true
  });

  alert(`Oğuz'a Sağlık Sinyali İletildi:\n\n"${type}"\n\nOğuz'un ekranına anlık bildirim yönlendirildi.`);
  render();
};

// GÜNEŞ'İN BESLE ALANINDAN REÇETELİ İLAÇ ALMA İŞLEYİCİSİ
window.takePrescriptionInHome = function(id) {
  const item = state.prescriptions.find(p => p.id === id);
  if (!item) return;

  item.takenToday = !item.takenToday;
  if (item.takenToday) {
    const now = new Date();
    item.takenTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    state.growth.points += 10;
    triggerHaptic([25, 20, 30]);
    spawnNutrientFlow(item.particleColor || "magnesium", 40);
    triggerReaction(item.particleColor || "magnesium", `"${item.name}" takviyesi kordon bağıyla iletildi. Güneş canlı bir kıpırtıyla karşıladı!`);
  } else {
    item.takenTime = null;
    state.growth.points = Math.max(0, state.growth.points - 10);
    triggerHaptic(10);
  }
  render();
};

window.addNewPrescription = function() {
  const name = prompt("İlaç veya Takviye Adı (Örn: Solgar Demir 17mg):", "");
  if (!name) return;
  const dose = prompt("Kullanım Dozu ve Zamanı (Örn: Günde 1 Kapsül · Sabah Aç):", "Günde 1 Kapsül · Sabah");
  const target = prompt("Kullanım Amacı / Doktor Notu:", "Fetal gelişim ve kan desteği");
  const bioTip = prompt("Emilim & Kullanım Notu (Örn: Bol suyla ve C vitaminiyle için):", "Bol suyla için ve doktorun önerdiği saatte alın.");
  
  state.prescriptions.push({
    id: "rx_" + Date.now(),
    name: name,
    shortName: name.split(' ')[0],
    dose: dose || "Günde 1 kez",
    doctor: "Dr. Ayşe Yılmaz",
    target: target || "Gebelik takviyesi",
    bioTip: bioTip || "Düzenli kullanım önerilir.",
    takenToday: false,
    takenTime: null,
    particleColor: "folic",
    badge: "Özel"
  });
  triggerHaptic(15);
  alert(`"${name}" reçetesi eklendi! 1. Güneş menüsünün "Besle" çekmecesinde alım için hazır.`);
  render();
};

// PELVİK GÖREV İŞLEYİCİLERİ
window.toggleExerciseComplete = function(id) {
  const ex = state.healthData.exercises.find(e => e.id === id);
  if (!ex) return;
  ex.completed = !ex.completed;
  if (ex.completed) {
    state.growth.points += ex.points;
    triggerHaptic([20, 30, 20]);
    
    const allDone = state.healthData.exercises.every(e => e.completed);
    if (allDone) {
      triggerHaptic([30, 50, 30, 50]);
      alert("Tebrikler Buse! Günün tüm 4 pelvik doğum hareketi tamamlandı! Doğum kanalı esnekliği desteklendi (+40 Puan).");
    } else {
      alert(`Harika! "${ex.name}" tamamlandı (+${ex.points} Puan).`);
    }
  } else {
    state.growth.points = Math.max(0, state.growth.points - ex.points);
    triggerHaptic(10);
  }
  render();
};

window.selectPelvicExercise = function(idx) {
  state.healthData.selectedExerciseIndex = idx;
  triggerHaptic(10);
  render();
};

window.togglePelvicExercise = function() {
  if (state.healthData.isExerciseRunning) {
    clearInterval(state.healthData.exerciseInterval);
    state.healthData.isExerciseRunning = false;
    state.healthData.exerciseTimer = 0;
    
    const currentEx = state.healthData.exercises[state.healthData.selectedExerciseIndex];
    if (currentEx && !currentEx.completed) {
      currentEx.completed = true;
      state.growth.points += currentEx.points;
    }
    
    triggerHaptic([20, 40, 20]);
    alert("Rehberli egzersiz seansı başarıyla tamamlandı ve kaydedildi (+10 Puan)!");
  } else {
    state.healthData.isExerciseRunning = true;
    state.healthData.exerciseTimer = 1;
    state.healthData.exercisePhase = "Sık (4 sn Nefes Al)";
    triggerHaptic(20);

    state.healthData.exerciseInterval = setInterval(() => {
      state.healthData.exerciseTimer++;
      const sec = state.healthData.exerciseTimer % 12;
      if (sec < 4) {
        state.healthData.exercisePhase = "Sık (4 sn Nefes Al)";
      } else if (sec < 8) {
        state.healthData.exercisePhase = "Tut (4 sn Sakin Kal)";
      } else {
        state.healthData.exercisePhase = "Gevşe (4 sn Nefes Ver)";
      }
      render();
    }, 1000);
  }
  render();
};

// HORMON VE DUYGU/BELİRTİ KAYIT İŞLEYİCİLERİ
window.logSymptomAction = function() {
  const options = ["Bel ve Sırt Esnemesi", "Mide Yanması", "Bacak Krampları", "Pelvik Baskı / Sancı", "Hafif Ödem", "Rahat ve Zinde"];
  const chosen = prompt("Bugün hissettiğiniz bedensel sinyali seçin veya yazın:\n" + options.join("\n"), state.healthData.selectedSymptoms[0]);
  if (chosen) {
    state.healthData.selectedSymptoms = [chosen];
    triggerHaptic(15);
    alert(`"${chosen}" sinyali kaydedildi. Hormonal analize göre bu evrede çok olağandır.`);
    render();
  }
};

window.logMoodAction = function() {
  const options = ["Yuva Kurma & Derin Bağ (Nesting)", "Duygusal & Hassas", "Sakin & Huzurlu", "Hafif Yorgunluk / Dinlenme İsteği"];
  const chosen = prompt("Bugünkü ruh halinizi seçin:\n" + options.join("\n"), state.healthData.selectedMood);
  if (chosen) {
    state.healthData.selectedMood = chosen;
    triggerHaptic(15);
    alert(`Ruh haliniz kaydedildi: "${chosen}". Oksitosin ve Progesteron dengenizle uyumlu.`);
    render();
  }
};

window.addNewBloodPressureLog = function() {
  const sys = prompt("Büyük tansiyon (Sistolik - mmHg):", "92");
  if (!sys) return;
  const dia = prompt("Küçük tansiyon (Diyastolik - mmHg):", "62");
  if (!dia) return;
  const sysInt = parseInt(sys) || 92;
  const diaInt = parseInt(dia) || 62;
  
  let note = "Dinlenik ölçüm";
  if (sysInt >= 135) {
    note = "Yüksek tansiyon uyarısı";
    alert("DİKKAT: Sistolik tansiyonunuz 135 mmHg üzerinde çıktı. Lütfen 15 dakika sol tarafınıza yatarak dinlenin ve doktorunuz Dr. Ayşe Yılmaz'ı bilgilendirin.");
  }

  state.healthData.bloodPressureHistory.unshift({
    id: Date.now(),
    date: "Bugün (Şimdi)",
    systolic: sysInt,
    diastolic: diaInt,
    note: note,
    isNormal: sysInt < 130
  });
  triggerHaptic(15);
  render();
};

window.editCurrentWeight = function() {
  const w = prompt("Güncel kilonuzu girin (kg):", state.user.currentWeight);
  if (w && !isNaN(parseFloat(w))) {
    state.user.currentWeight = parseFloat(w);
    state.healthData.progressionHistory[state.healthData.progressionHistory.length - 1].weight = parseFloat(w);
    state.healthData.progressionHistory[state.healthData.progressionHistory.length - 1].gain = `+${(parseFloat(w) - state.user.startWeight).toFixed(1)} kg`;
    triggerHaptic(15);
    render();
  }
};

window.simulatePdfUpload = function() {
  alert("Manisa Şehir Hastanesi Laboratuvar Raporu taranıyor...");
  setTimeout(() => {
    state.healthData.bloodwork.unshift({
      id: Date.now(),
      name: "Magnezyum (Mg)",
      value: "2.15",
      unit: "mg/dL",
      category: "normal",
      status: "Optimal",
      min: "1.7",
      max: "2.4",
      note: "PDF'ten otomatik aktarıldı",
      source: "Lab_04Sep_Manisa_OCR.pdf",
      trend: [
        { week: "20.H", val: "1.90" },
        { week: "31.H", val: "2.15" }
      ],
      trendDesc: "Magnezyum takviyesiyle rahim kasılmaları dengelendi."
    });
    triggerHaptic([20, 40, 20]);
    alert("Başarılı! Yeni tahlil raporu taranarak değerler trendiyle birlikte tabloya işlendi.");
    render();
  }, 400);
};

window.addNewUltrasoundPhoto = function() {
  const title = prompt("Ultrason Başlığı:", "31. Hafta Yüz Profili");
  if (!title) return;
  state.healthData.ultrasoundGallery.unshift({
    id: Date.now(),
    title: title,
    week: "31. Hafta",
    date: "04 Eylül 2026",
    doctor: "Dr. Ayşe Yılmaz",
    image: "cinematic_womb_31w.jpg",
    desc: "Yeni eklenen klinik ultrason karesi."
  });
  triggerHaptic(15);
  render();
};

// 3. MODÜL: DOĞUM & HAZIRLIK SEKMESİ (M0)
function renderBirthTab() {
  return `
    <div class="w-full h-full pt-16 pb-12 px-5 space-y-4 text-white overflow-y-auto">
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h2 class="text-base font-serif font-semibold text-white/95">Doğum & Hazırlık</h2>
          <p class="text-[11px] text-white/60">Doğum Tercihleri, Çanta ve Dalga Sayacı</p>
        </div>
        <span class="text-xs bg-rose-500/20 text-rose-200 px-3 py-1 rounded-full border border-rose-400/30 font-medium">
          63 Gün Kaldı
        </span>
      </div>

      <div class="p-5 bg-gradient-to-br from-rose-950/40 via-white/5 to-white/5 rounded-3xl border border-rose-400/30 text-center space-y-3 shadow-lg">
        <div class="flex justify-between items-center text-xs">
          <span class="text-rose-200 font-medium">Doğum Dalgası Sayacı</span>
          <span class="text-white/50 text-[10px]">Son: ${state.birthPlan.lastWaveDuration} · ${state.birthPlan.lastWaveFrequency} arayla</span>
        </div>

        <div class="py-2">
          <div class="text-3xl font-serif font-bold text-white tracking-wider">
            ${state.birthPlan.isTimerRunning ? state.birthPlan.waveSeconds + ' sn' : '00:00'}
          </div>
          <p class="text-[11px] text-white/60 mt-1">
            ${state.birthPlan.isTimerRunning ? 'Derin nefes alın, dalga geçiyor...' : 'Kasılma başladığında dokunun'}
          </p>
        </div>

        <button onclick="toggleContractionTimer()" class="w-full py-3 ${state.birthPlan.isTimerRunning ? 'bg-rose-600 text-white' : 'bg-rose-500/20 text-rose-200 border border-rose-400/40'} font-semibold text-xs rounded-2xl transition shadow-md">
          ${state.birthPlan.isTimerRunning ? 'Dalga Bitti (Kaydet)' : 'Dalga Başladı'}
        </button>
      </div>

      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3 text-xs">
        <div class="flex justify-between items-center">
          <div class="font-semibold text-white/95">Akıllı Doğum Çantası</div>
          <span class="text-[10px] text-amber-200">Buse, Güneş & Oğuz</span>
        </div>

        <div class="space-y-2">
          ${state.birthPlan.bagItems.map(item => `
            <div class="p-3 bg-white/5 rounded-2xl flex items-center justify-between border border-white/5">
              <div class="flex items-center space-x-3">
                <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleBagItem(${item.id})" class="w-4 h-4 rounded-md accent-rose-400 cursor-pointer">
                <span class="${item.done ? 'line-through text-white/40' : 'text-white/90'} font-medium">${item.title}</span>
              </div>
              <span class="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/60">${item.forWho}</span>
            </div>
          `).join('')}
        </div>
      </div>

      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3 text-xs">
        <div class="font-semibold text-amber-200">Buse & Oğuz Doğum Tercihleri</div>
        <div class="space-y-2">
          ${state.birthPlan.preferences.map(pref => `
            <div class="p-3 bg-white/5 rounded-2xl flex items-start space-x-2.5">
              <span class="text-emerald-300 font-bold">✓</span>
              <span class="text-white/85 text-[11px] leading-relaxed">${pref.title}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// 4. MODÜL: BÜTÜNLEŞİK YAŞAM TAKVİMİ
function renderCalendarTab() {
  return `
    <div class="w-full h-full pt-16 pb-12 px-5 space-y-4 text-white overflow-y-auto">
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h2 class="text-base font-serif font-semibold text-white/95">Bütünleşik Takvim</h2>
          <p class="text-[11px] text-white/60">Tüm Randevular, Ölçümler ve Ses Kayıtları</p>
        </div>
        <span class="text-xs bg-white/10 text-amber-200 px-3 py-1 rounded-full border border-white/10 font-medium">
          Eylül 2026
        </span>
      </div>

      <div class="space-y-2.5">
        <div class="text-xs font-semibold text-amber-200 uppercase tracking-wider">Planlanan Doktor Kontrolleri</div>
        ${state.appointments.map(app => `
          <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2 text-xs">
            <div class="flex justify-between items-start">
              <div>
                <div class="font-bold text-white/95 text-sm">${app.title}</div>
                <div class="text-[11px] text-emerald-300 font-medium mt-0.5">${app.dateFormatted}</div>
              </div>
              <span class="px-2 py-0.5 bg-amber-500/20 text-amber-200 border border-amber-400/30 rounded-full text-[10px]">
                ${app.doctor}
              </span>
            </div>
            <div class="text-[11px] text-white/60 font-light">${app.hospital}</div>
            <div class="pt-2 border-t border-white/5 space-y-1">
              <div class="text-[10px] text-white/40 uppercase font-medium">Doktora Sorulacak Sorular:</div>
              ${app.questions.map(q => `
                <div class="text-[11px] text-white/80 flex items-center space-x-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0"></span>
                  <span>${q}</span>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="space-y-2.5 pt-2">
        <div class="text-xs font-semibold text-white/50 uppercase tracking-wider">Geçmiş Günlük Veriler</div>
        <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-xs">
          <div class="font-medium text-white/90">02 Eylül 2026</div>
          <div class="text-[11px] text-white/50 mt-0.5">4 Bardak Su · Magnezyum Alındı · 14 Tekme Kaydı</div>
        </div>
        <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-xs">
          <div class="font-medium text-white/90">18 Ağustos 2026</div>
          <div class="text-[11px] text-white/50 mt-0.5">28. Hafta Doppler Kaydı Yapıldı (142 BPM)</div>
        </div>
      </div>
    </div>
  `;
}

// 5. MODÜL: İHTİYAÇ VE BÜTÇE PLANI
function renderShoppingTab() {
  const totalSpent = state.shopping.items.filter(i => i.done).reduce((acc, cur) => acc + cur.price, 0);
  const totalEstimated = state.shopping.items.reduce((acc, cur) => acc + cur.price, 0);
  const filteredItems = state.shopping.activeCategory === "Tümü" 
    ? state.shopping.items 
    : state.shopping.items.filter(i => i.category === state.shopping.activeCategory);

  return `
    <div class="w-full h-full pt-16 pb-12 px-5 space-y-4 text-white overflow-y-auto">
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h2 class="text-base font-serif font-semibold text-white/95">İhtiyaç & Bütçe Planı</h2>
          <p class="text-[11px] text-white/60">Güneş için sade ve bilinçli hazırlık</p>
        </div>
        <button onclick="addNewShoppingItem()" class="px-3 py-1.5 bg-amber-500/20 border border-amber-400/30 text-amber-200 text-xs font-medium rounded-xl hover:bg-amber-500/30 transition">
          + Ekle
        </button>
      </div>

      <div class="grid grid-cols-2 gap-3 p-4 bg-white/5 rounded-3xl border border-white/10 text-xs shadow-sm">
        <div>
          <div class="text-[10px] text-white/50">Harcanan Bütçe</div>
          <div class="text-lg font-bold text-white mt-0.5">${totalSpent.toLocaleString('tr-TR')} TL</div>
        </div>
        <div>
          <div class="text-[10px] text-white/50">Tahmini Toplam</div>
          <div class="text-lg font-bold text-white/60 mt-0.5">${totalEstimated.toLocaleString('tr-TR')} TL</div>
        </div>
      </div>

      <div class="flex space-x-1.5 overflow-x-auto pb-1 text-xs">
        ${state.shopping.categories.map(cat => `
          <button onclick="filterShoppingCategory('${cat}')" class="px-3 py-1.5 rounded-xl whitespace-nowrap transition ${state.shopping.activeCategory === cat ? 'bg-amber-500/25 text-amber-200 font-semibold border border-amber-400/30' : 'bg-white/5 text-white/60 hover:bg-white/10'}">
            ${cat}
          </button>
        `).join('')}
      </div>

      <div class="space-y-2">
        ${filteredItems.map(item => `
          <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
            <div class="flex items-center space-x-3">
              <input type="checkbox" ${item.done ? 'checked' : ''} onchange="toggleShoppingItem(${item.id})" class="w-4 h-4 rounded-md accent-amber-400 cursor-pointer">
              <div>
                <div class="font-medium ${item.done ? 'line-through text-white/40' : 'text-white/95'}">${item.title}</div>
                <div class="text-[10px] text-white/40">${item.category} ${item.note ? '· ' + item.note : ''}</div>
              </div>
            </div>
            <div class="text-xs font-semibold text-amber-200 cursor-pointer hover:underline" onclick="editItemPrice(${item.id})" title="Fiyatı Düzenle">
              ${item.price.toLocaleString('tr-TR')} TL
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 6. MODÜL: MURADİYE KOMŞU AĞI
function renderKovanTab() {
  return `
    <div class="w-full h-full pt-16 pb-12 px-5 space-y-4 text-white overflow-y-auto">
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h2 class="text-base font-serif font-semibold text-white/95">Muradiye Komşu Ağı</h2>
          <p class="text-[11px] text-white/60">Yunusemre ve Çevresi Anne İmecesi (11 Anne)</p>
        </div>
        <span class="text-xs bg-cyan-500/20 text-cyan-200 px-2.5 py-1 rounded-full border border-cyan-400/30 font-medium">
          Aktif Çember
        </span>
      </div>

      <div class="space-y-2.5">
        <div class="text-xs font-semibold text-amber-200 uppercase tracking-wider">Komşulardan Paylaşılan Eşyalar</div>
        ${state.imeceItems.map(i => `
          <div class="p-4 bg-white/5 rounded-3xl flex items-start justify-between text-xs border border-white/10">
            <div class="flex items-start space-x-3">
              <img src="${i.avatar}" class="w-10 h-10 rounded-full object-cover border border-white/20">
              <div>
                <div class="font-bold text-white/95 text-sm">${i.title}</div>
                <div class="text-[11px] text-amber-200 mt-0.5">${i.user} · ${i.bio} (${i.dist})</div>
                <div class="text-[11px] text-white/60 mt-1 leading-relaxed">${i.desc}</div>
              </div>
            </div>
            <button onclick="sendNeighborMessage('${i.user}')" class="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs text-white font-medium shrink-0 ml-2 transition">
              Mesaj
            </button>
          </div>
        `).join('')}
      </div>

      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2 text-xs">
        <div class="font-semibold text-white/90">Son Komşu Mesajlaşması</div>
        ${state.messages.map(m => `
          <div class="p-2.5 rounded-2xl ${m.isMe ? 'bg-amber-500/15 border border-amber-400/20 text-right ml-4' : 'bg-white/5 border border-white/5 mr-4'}">
            <div class="text-[10px] text-white/50">${m.sender} · ${m.time}</div>
            <div class="text-[11px] text-white/90 mt-0.5">${m.text}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 7. MODÜL: BABA DESTEK ALANI
function renderFatherTab() {
  return `
    <div class="w-full h-full pt-16 pb-12 px-5 space-y-4 text-white overflow-y-auto">
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h2 class="text-base font-serif font-semibold text-white/95">Baba Destek Alanı</h2>
          <p class="text-[11px] text-white/60">Oğuz için rehber ve eşlik alanı</p>
        </div>
        <span class="text-xs bg-amber-500/20 text-amber-200 px-2.5 py-1 rounded-full border border-amber-400/30 font-medium">
          31. Hafta
        </span>
      </div>

      <div class="flex items-center space-x-3.5 p-4 bg-white/5 rounded-3xl border border-amber-400/30">
        <img src="${state.partner.avatar}" class="w-14 h-14 rounded-full object-cover border-2 border-amber-300 shadow-md">
        <div>
          <h3 class="text-base font-serif font-semibold text-white">${state.partner.name}</h3>
          <p class="text-[11px] text-amber-200/90 mt-0.5">Buse ve Güneş'in Yol Arkadaşı</p>
          <p class="text-[10px] text-white/50">Muradiye, Manisa</p>
        </div>
      </div>

      <div class="p-4 bg-white/5 rounded-3xl text-xs space-y-2.5 text-white/85 border border-white/10">
        <div class="font-bold text-amber-200">31. Haftada Oğuz'a Özel İpuçları:</div>
        <div class="space-y-2 text-[11px] leading-relaxed">
          <div class="p-2.5 bg-white/5 rounded-2xl flex items-start space-x-2">
            <span class="text-amber-300">·</span>
            <span>Buse bugünlerde 31. hafta ağırlığıyla bel ağrısı yaşayabilir; akşamları dairesel sakrum masajı rahatlatacaktır.</span>
          </div>
          <div class="p-2.5 bg-white/5 rounded-2xl flex items-start space-x-2">
            <span class="text-amber-300">·</span>
            <span>Güneş babasının derin frekanslı sesine çok duyarlıdır; karına yaklaşıp sakin ses tonuyla konuşabilirsiniz.</span>
          </div>
          <div class="p-2.5 bg-white/5 rounded-2xl flex items-start space-x-2">
            <span class="text-amber-300">·</span>
            <span>Akşamları Magnezyum saşesini ılık suyla hazırlayıp Buse'ye getirebilirsiniz.</span>
          </div>
        </div>
      </div>

      <button onclick="playFatherVoice()" class="w-full py-3 bg-gradient-to-r from-amber-500/30 to-amber-600/20 border border-amber-400/40 text-amber-200 text-xs font-semibold rounded-2xl hover:from-amber-500/40 hover:to-amber-600/30 transition shadow-lg flex items-center justify-center space-x-2">
        <span>Güneş'e Sesini Dinlet (Ses Frekansı)</span>
      </button>
    </div>
  `;
}

// 8. MODÜL: BUSE'NİN PROFİLİ
function renderProfileTab() {
  return `
    <div class="w-full h-full pt-16 pb-12 px-5 space-y-4 text-white overflow-y-auto">
      <div class="p-5 bg-white/5 rounded-3xl border border-white/15 text-center relative overflow-hidden shadow-lg">
        <img src="${state.user.avatar}" class="w-20 h-20 mx-auto rounded-full object-cover border-2 border-amber-400 shadow-md">
        <h2 class="text-base font-bold text-white mt-2.5">${state.user.name}</h2>
        <p class="text-xs text-amber-200 font-medium">${state.user.role} · ${state.user.neighborhood}, ${state.user.district}</p>
        <div class="mt-2 inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] text-white/70 border border-white/10">
          Kan Grubu: ${state.user.bloodGroup} · Hedef Doğum: ${state.user.dueDate}
        </div>
      </div>

      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2 text-xs">
        <div class="flex justify-between items-center font-medium">
          <span class="text-white/90">Güneş'in Yolculuğu</span>
          <span class="text-amber-200">31. Hafta (63 Gün Kaldı)</span>
        </div>
        <div class="w-full bg-white/10 h-2 rounded-full overflow-hidden my-2">
          <div class="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full" style="width: ${(31 / 40) * 100}%"></div>
        </div>
        <div class="flex justify-between text-[10px] text-white/50">
          <span>Başlangıç</span>
          <span>Doğum (40. Hafta)</span>
        </div>
      </div>

      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 flex items-center justify-between text-xs">
        <div>
          <div class="text-[10px] text-white/50">ToHUM Bilinç Puanı</div>
          <div class="text-base font-bold text-white mt-0.5">${state.growth.points} Puan · ${state.growth.levelName}</div>
        </div>
        <span class="px-3 py-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-xl text-xs font-semibold">
          Seviye ${state.growth.level}
        </span>
      </div>

      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2.5 text-xs">
        <div class="flex justify-between items-center">
          <div class="font-semibold text-white/95">Güneş'e Mektuplarım (${state.timeCapsules.length})</div>
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

      <button onclick="alert('Buse & Oğuz aile hesabı senkronize durumda.')" class="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-xs font-medium rounded-2xl transition">
        Hesap ve Aile Senkronizasyonu Bilgisi
      </button>
    </div>
  `;
}

// GENEL ETKİLEŞİM İŞLEYİCİLERİ
window.toggleDrawer = function() {
  state.isDrawerOpen = !state.isDrawerOpen;
  triggerHaptic(10);
  render();
};

window.navigateTab = function(tab) {
  state.currentTab = tab;
  state.isDrawerOpen = false;
  state.isSheetExpanded = false;
  state.isMealSelectorOpen = false;
  triggerHaptic(15);
  render();
};

window.toggleBottomSheet = function() {
  state.isSheetExpanded = !state.isSheetExpanded;
  state.isMealSelectorOpen = false;
  triggerHaptic(15);
  render();
};

window.setHomeSubtab = function(sub) {
  state.homeSubtab = sub;
  triggerHaptic(10);
  render();
};

window.filterShoppingCategory = function(cat) {
  state.shopping.activeCategory = cat;
  triggerHaptic(10);
  render();
};

window.toggleMealSelector = function() {
  state.isMealSelectorOpen = !state.isMealSelectorOpen;
  triggerHaptic(10);
  render();
};

window.quickSelectMeal = function(mealName) {
  state.nurture.meal.taken = true;
  state.nurture.meal.detail = mealName;
  state.growth.points += 10;
  state.isMealSelectorOpen = false;
  triggerHaptic([25, 15, 25]);
  spawnNutrientFlow("meal", 40);
  triggerReaction("meal", `"${mealName}" besinleri kordon bağıyla ulaştı. Güneş neşeyle hareketlendi.`);
  render();
};

window.customMealInput = function() {
  const custom = prompt("Tükettiğiniz özel öğünü girin:", "Zeytinyağlı taze fasulye ve yoğurt");
  if (custom) {
    window.quickSelectMeal(custom);
  }
};

window.toggleContractionTimer = function() {
  if (state.birthPlan.isTimerRunning) {
    clearInterval(state.birthPlan.waveInterval);
    state.birthPlan.isTimerRunning = false;
    state.birthPlan.lastWaveDuration = state.birthPlan.waveSeconds + " sn";
    triggerHaptic([30, 40, 30]);
    alert(`Dalga ${state.birthPlan.waveSeconds} saniye sürdü ve güvenle kaydedildi.`);
    state.birthPlan.waveSeconds = 0;
  } else {
    state.birthPlan.isTimerRunning = true;
    state.birthPlan.waveSeconds = 0;
    triggerHaptic(20);
    state.birthPlan.waveInterval = setInterval(() => {
      state.birthPlan.waveSeconds++;
      render();
    }, 1000);
  }
  render();
};

window.toggleBagItem = function(id) {
  const item = state.birthPlan.bagItems.find(b => b.id === id);
  if (item) {
    item.done = !item.done;
    triggerHaptic(15);
    render();
  }
};

window.handleCinematicMove = function(e) {
  const stage = document.getElementById("cinematicTouchStage");
  if (!stage) return;
  const rect = stage.getBoundingClientRect();
  const relX = (e.clientX - rect.left) / rect.width - 0.5;
  const relY = (e.clientY - rect.top) / rect.height - 0.5;

  state.interactive.targetTiltX = relX;
  state.interactive.targetTiltY = relY;
};

window.handleCinematicTouch = function(e) {
  if (state.isSheetExpanded) {
    state.isSheetExpanded = false;
    state.isMealSelectorOpen = false;
    triggerHaptic(10);
    render();
    return;
  }

  const stage = document.getElementById("cinematicTouchStage");
  if (!stage) return;
  const rect = stage.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const clickY = e.clientY - rect.top;
  const relY = clickY / rect.height;

  ripples.push(new LiquidRipple(clickX, clickY, "rgba(255,230,200,0.85)"));

  if (relY < 0.5) {
    state.interactive.kicksToday++;
    triggerHaptic([30, 20, 40]);
    spawnNutrientFlow("magnesium", 30);
    triggerReaction("magnesium", "Güneş dokunuşunuza doğru anında canlı bir tekme savurdu!");
    state.interactive.targetTiltY = -0.35;
    setTimeout(() => { state.interactive.targetTiltY = 0; }, 350);
  } else {
    triggerHaptic(20);
    spawnNutrientFlow("meal", 20);
    triggerReaction("meal", "Güneş başını elinizin sıcaklığına doğru yasladı ve sakinleşti.");
    state.interactive.targetTiltY = 0.25;
    setTimeout(() => { state.interactive.targetTiltY = 0; }, 350);
  }
};

function triggerReaction(type, text) {
  state.interactive.reactionColor = type;
  state.interactive.reactionText = text;
  
  const box = document.getElementById("cinematicFeedbackBox");
  if (box) {
    box.innerHTML = `"${text}"`;
  }

  setTimeout(() => {
    if (state.interactive.reactionColor === type) {
      state.interactive.reactionColor = "idle";
      const b = document.getElementById("cinematicFeedbackBox");
      if (b) b.innerHTML = `"Güneş 31. haftasında sakin bir ritimle dinleniyor."`;
    }
  }, 4500);
}

window.triggerDirectKick = function() {
  state.interactive.kicksToday++;
  triggerHaptic([35, 25, 45]);
  const canvas = document.getElementById("cinematicCanvas");
  if (canvas) {
    ripples.push(new LiquidRipple(canvas.width / 2, canvas.height * 0.35, "rgba(255,255,255,0.9)"));
  }
  spawnNutrientFlow("magnesium", 35);
  triggerReaction("magnesium", `Güneş'in ${state.interactive.kicksToday}. tekmesi kaydedildi. Güçlü bir bacak hareketiyle karşılık verdi!`);
  state.interactive.targetTiltY = -0.4;
  setTimeout(() => { state.interactive.targetTiltY = 0; }, 400);
};

window.triggerLightFlash = function() {
  triggerHaptic(15);
  spawnNutrientFlow("omega", 25);
  triggerReaction("omega", "Karın bölgesine tutulan ışıkla Güneş göz kapaklarını araladı ve başını ışığa çevirdi.");
};

window.feedAction = function(type) {
  if (type === "water") {
    triggerHaptic([20, 30, 20]);
    if (state.nurture.water.count < state.nurture.water.target) {
      state.nurture.water.count++;
      state.growth.points += 5;
      spawnNutrientFlow("water", 45);
      triggerReaction("water", "İçilen su amniyotik sıvıyı tazeledi. Güneş su dalgalarıyla ferahladı.");
    } else {
      triggerReaction("water", "Günün su hedefi tamamlandı. Güneş'in yaşam ortamı dengede.");
    }
  }
  render();
};

window.playFatherVoice = function() {
  triggerHaptic([15, 60, 15]);
  spawnNutrientFlow("omega", 25);
  triggerReaction("omega", "Oğuz'un ses tonu iletildi; Güneş babasının sesine aşina bir hareketle karşılık verdi.");
};

window.handleQuizAnswer = function(idx) {
  const opt = state.dailyQuiz.options[idx];
  state.dailyQuiz.answered = true;
  state.dailyQuiz.selected = idx;
  state.dailyQuiz.isCorrect = opt.correct;
  if (opt.correct) {
    state.growth.points += 15;
    triggerHaptic([20, 20, 20]);
  }
  render();
};

window.toggleShoppingItem = function(id) {
  const item = state.shopping.items.find(i => i.id === id);
  if (item) {
    item.done = !item.done;
    triggerHaptic(15);
    render();
  }
};

window.editItemPrice = function(id) {
  const item = state.shopping.items.find(i => i.id === id);
  if (!item) return;
  const newPrice = prompt(`"${item.title}" için güncel fiyat (TL):`, item.price);
  if (newPrice !== null && !isNaN(parseFloat(newPrice))) {
    item.price = parseFloat(newPrice);
    render();
  }
};

window.addNewShoppingItem = function() {
  const title = prompt("İhtiyaç adı:", "Müslin örtü");
  if (!title) return;
  const price = prompt("Fiyat (TL):", "350");
  state.shopping.items.unshift({
    id: Date.now(),
    title: title,
    category: "Giyim & Tekstil",
    price: parseFloat(price) || 0,
    done: false,
    note: "Yeni eklendi"
  });
  render();
};

window.playHeartbeatAudio = function(id) {
  const item = state.ultrasoundAudios.find(a => a.id === id);
  if (!item) return;
  state.ultrasoundAudios.forEach(a => a.isPlaying = (a.id === id ? !a.isPlaying : false));
  toggleAudio();
};

window.addUltrasoundAudio = function() {
  const title = prompt("Kayıt başlığı:", "32. Hafta Doppler Kalp Sesi");
  if (title) {
    state.ultrasoundAudios.push({
      id: Date.now(),
      title: title,
      date: "Yeni Kayıt",
      bpm: 145,
      duration: "0:50",
      isPlaying: false,
      note: "Yeni eklenen klinik kaydı"
    });
    render();
  }
};

window.sendNeighborMessage = function(userName) {
  const msg = prompt(`${userName} komşunuza iletmek istediğiniz mesaj:`, "Merhaba, paylaştığınız eşya ile ilgileniyorum.");
  if (msg) {
    state.messages.push({
      sender: "Buse",
      text: msg,
      time: "Şimdi",
      isMe: true
    });
    alert(`${userName} kullanıcısına mesajınız güvenle iletildi.`);
    render();
  }
};

window.openNewLetterModal = function() {
  const title = prompt("Mektup başlığı:", "Güneş'e Mektup");
  if (!title) return;
  const content = prompt("Mektup içeriği:", "Canım Güneş, bugün Muradiye'de sakin bir gün...");
  if (content) {
    state.timeCapsules.push({
      id: Date.now(),
      title: title,
      author: "Buse",
      date: "02 Eylül 2026",
      unlockEvent: "18. Yaş Günü (2044)",
      preview: content,
      isLocked: true
    });
    render();
  }
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", render);
} else {
  render();
}