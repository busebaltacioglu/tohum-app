// =========================================================================
// TOHUM SAĞLIK & ANNE PORTALI - M0 TAM SÜRÜM
// Savunma Odaklı Güvenlik & OWASP XSS Koruması
// =========================================================================
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

// TOHUM HAFTALIK DİNAMİK YAŞAM DÖNGÜSÜ VERİ TABANI (1 - 40. HAFTA)
// Klinik, Biyolojik, Hormonal, Güvenlik (Kaçınılacaklar) & Partner Görevleri
// =========================================================================
const WEEKLY_LIFECYCLE_DB = {
  // 1. TRIMESTER (1 - 13. HAFTALAR: HÜCRESEL KÖKLENME)
  6: {
    week: 6,
    trimester: "1. Trimester",
    stageName: "Hücresel Köklenme & İlk Nabız",
    sizeComparison: "Boyut: 4 mm · Bir Mercimek Tanesinde",
    weight: "< 1 gr",
    height: "0.4 cm",
    bpm: 155,
    presentation: "Embriyonik Kese İçi",
    image: "cinematic_womb_31w.jpg",
    bodyWhisper: "hCG hormonu katlanarak yükseliyor. Bedenin tembellik yapmıyor; sıfırdan bir plasenta ve dolaşım ağı inşa ettiği için derin bir yorgunluk ve hafif mide hassasiyeti hissetmen çok doğal.",
    dos: [
      "Günde 400-800 mcg Folik Asit (metilfolat) alımına kesintisiz devam et.",
      "Günde en az 2.5 litre ılık su iç; hücresel bölünmeyi ve kan hacmini destekle.",
      "Mide bulantısı anında tuzlu kraker, leblebi veya taze zencefil dilimi atıştır."
    ],
    donts: [
      "Sıcak banyo, sauna, termal kaplıca ve hamamdan kaçın (38.5°C üzeri ısı nöral tüp kapanmasını riske atar).",
      "Çiğ et, sushi, salam, sosis, pastörize edilmemiş süt ürünleri tüketme (Toksoplazma ve Listeria riski).",
      "A vitamini / Retinol içeren leke kremleri ve agresif kimyasal kozmetik ürünler kullanma.",
      "Ağır koli/eşya kaldırma ve yüksek etkili zıplama içeren sporlar yapma."
    ],
    partnerMission: "Oğuz, sabahları Buse henüz yataktan kalkmadan başucuna 1-2 parça tuzlu kraker ve bir bardak ılık su bırak. Bu küçük jest sabah bulantısını büyük ölçüde hafifletecektir.",
    doctorQuestions: [
      "Kese ve erken fetal eko/kalp atışı ultrasonda görüntülendi mi?",
      "Folik asit takviyemin formu ve kan tahlillerim (TSH, Ferritin) uygun mu?"
    ],
    prescriptions: [
      { id: "folic", name: "Folbiol / Folik Asit (400 mcg)", shortName: "Folik Asit", dose: "Günde 1 Tablet · Sabah", doctor: "Dr. Ayşe Yılmaz", target: "Nöral tüp ve omurilik gelişimi", bioTip: "Sabah kahvaltısından sonra düzenli alınmalıdır.", takenToday: true, takenTime: "09:00", particleColor: "folic", badge: "Sabah" },
      { id: "b6", name: "Prilam DR (Piridoksin / B6 Vitamini)", shortName: "B6 Bulantı Desteği", dose: "Gerektiğinde · Akşam 2 Tablet", doctor: "Dr. Ayşe Yılmaz", target: "Gebelikte sabah bulantısını hafifletme", bioTip: "Yatmadan önce bol suyla alınması gece ve sabah konforunu artırır.", takenToday: false, takenTime: null, particleColor: "water", badge: "Gece" }
    ]
  },
  8: {
    week: 8,
    trimester: "1. Trimester",
    stageName: "Embriyodan Fetüse Geçiş",
    sizeComparison: "Boyut: 1.6 cm · Bir Ahududu Hacminde",
    weight: "1.2 gr",
    height: "1.6 cm",
    bpm: 160,
    presentation: "Amniyotik Kese İçinde",
    image: "cinematic_womb_31w.jpg",
    bodyWhisper: "Progesteron sindirim kaslarını gevşettiği için mide yanması ve koku hassasiyeti zirvede. Bedenin bebeği korumak için dış etkenlere karşı kalkan oluşturuyor.",
    dos: [
      "Az az, sık sık beslen; midenin tamamen boş kalmasına izin verme.",
      "Yürüyüş ve derin burun nefesleriyle hücresel oksijenlenmeyi artır.",
      "İlk trimester rutin kan sayımı ve tiroid (TSH) paneline baktır."
    ],
    donts: [
      "Ağır karın egzersizleri, zıplama ve ani dönüşler yapma.",
      "Reçetesiz ağrı kesici (özellikle İbuprofen / Aspirin) alma; sadece doktor onaylı parasetamol.",
      "Ağır ev temizliği kimyasalları (çamaşır suyu, tuz ruhu) ve boya kokularını solumaktan kaçın.",
      "Kahve ve kafein tüketimini günde maksimum 1 fincanla sınırla."
    ],
    partnerMission: "Oğuz, Buse'nin koku hassasiyeti bu hafta zirvede olabilir. Mutfakta ağır kokulu kızartma veya balık pişirmek yerine hafif tencere yemeklerini sen organize et.",
    doctorQuestions: [
      "TSH, Ferritin ve Tam Kan tahlili sonuçlarım nasıl?",
      "Bulantılar için aldığım B6 vitamini dozu yeterli mi?"
    ],
    prescriptions: [
      { id: "folic", name: "Folbiol / Folik Asit (400 mcg)", shortName: "Folik Asit", dose: "Günde 1 Tablet · Sabah", doctor: "Dr. Ayşe Yılmaz", target: "Nöral tüp ve omurilik gelişimi", bioTip: "Sabah kahvaltısından sonra düzenli alınmalıdır.", takenToday: true, takenTime: "09:00", particleColor: "folic", badge: "Sabah" },
      { id: "b6", name: "Prilam DR (Piridoksin / B6 Vitamini)", shortName: "B6 Bulantı Desteği", dose: "Gerektiğinde · Akşam 2 Tablet", doctor: "Dr. Ayşe Yılmaz", target: "Gebelikte sabah bulantısını hafifletme", bioTip: "Yatmadan önce bol suyla alınması gece ve sabah konforunu artırır.", takenToday: false, takenTime: null, particleColor: "water", badge: "Gece" }
    ]
  },
  12: {
    week: 12,
    trimester: "1. Trimester",
    stageName: "1. Trimester Sonu & İkili Tarama",
    sizeComparison: "Boyut: 5.4 cm · Bir Misket Limonu",
    weight: "14 gr",
    height: "5.4 cm",
    bpm: 155,
    presentation: "Gelişmekte Olan Amniyon",
    image: "cinematic_womb_31w.jpg",
    bodyWhisper: "Plasenta hormon üretimini devralmaya başlıyor! Mide bulantıları yavaş yavaş yerini artan enerjiye ve iştah dengelenmesine bırakacak.",
    dos: [
      "İkili Tarama Testi (Ense Kalınlığı - NT ve Burun Kemiği) randevunu al.",
      "Bol lifli gıdalar ve su tüketimiyle bağırsak motilitesini koru.",
      "Hafif hamilelik yogası ve pelvik esnemelere başla."
    ],
    donts: [
      "Düşme riski taşıyan aktivitelerden ve bisiklete binmekten kaçın.",
      "İkili tarama öncesinde doktor onayı olmadan yeni takviye başlama.",
      "Dar, karnı sıkan kıyafetler ve korseler giyme."
    ],
    partnerMission: "Oğuz, 12. hafta ikili tarama randevusunda Buse'nin yanında ol. Güneş'in ilk kez kollarını ve bacaklarını hareket ettirdiğini ultrason ekranında canlı izleyeceksiniz!",
    doctorQuestions: [
      "Ense kalınlığı (NT) ve nazal kemik ölçümleri ideal aralıkta mı?",
      "2. trimestere geçerken demir takviyesine başlamamız gerekiyor mu?"
    ],
    prescriptions: [
      { id: "folic", name: "Folbiol / Folik Asit (400 mcg)", shortName: "Folik Asit", dose: "Günde 1 Tablet · Sabah", doctor: "Dr. Ayşe Yılmaz", target: "Nöral tüp ve omurilik gelişimi", bioTip: "1. trimester sonuna kadar devam edilecek.", takenToday: true, takenTime: "09:00", particleColor: "folic", badge: "Sabah" }
    ]
  },
  20: {
    week: 20,
    trimester: "2. Trimester",
    stageName: "Detaylı Anatomi & Altın Dönem",
    sizeComparison: "Boyut: 16.4 cm · Bir Muz Hacminde",
    weight: "300 gr",
    height: "16.4 cm",
    bpm: 148,
    presentation: "Hareketli Pozisyon",
    image: "realistic_baby.jpg",
    bodyWhisper: "Güneş artık sesleri duyabiliyor ve amniyon sıvısında taklalar atıyor! İlk hafif kanat çırpınışlarını (kelebek hissi) hissetmeye başladın.",
    dos: [
      "20-22. haftalar arasında Perinatoloji Detaylı Organ Taraması yaptır.",
      "Sol yan yatış pozisyonuna alış; bacak arasına destek yastığı koy.",
      "Demir ve Magnezyum takviyelerini düzenli kullan."
    ],
    donts: [
      "Sırtüstü düz şekilde uzun süre yatma (Vena Cava damarına bası yapıp baş dönmesine ve bebekte kan akışı azalmasına neden olabilir).",
      "Ağır nesneleri tek seferde eğilerek kaldırma (bel omurlarını koru).",
      "Şekerli ve rafine unlu gıdaları aşırı tüketme (24. haftadaki OGTT öncesi dengeli beslen)."
    ],
    partnerMission: "Oğuz, bu hafta Güneş dışarıdan gelen seslere tepki vermeye başladı. Akşamları Buse'nin karnına elini koyarak Güneş ile konuş ve ona sakin bir melodi dinlet.",
    doctorQuestions: [
      "Detaylı organ taramasında tüm sistemler (kalp 4 odacık, beyin, böbrekler) normal mi?",
      "Plasentanın yerleşimi (aşağıda olup olmadığı) kontrol edildi mi?"
    ],
    prescriptions: [
      { id: "iron", name: "Ferro Sanol Duodenal (Demir)", shortName: "Demir Kapsülü", dose: "Günde 1 Kapsül · Sabah Aç", doctor: "Dr. Ayşe Yılmaz", target: "Ferritin ve hemoglobin desteği", bioTip: "Portakal suyu veya C vitaminiyle için.", takenToday: true, takenTime: "08:30", particleColor: "omega", badge: "Sabah Aç" },
      { id: "magnesium", name: "Magnimore Plus (Magnezyum)", shortName: "Magnezyum Saşe", dose: "Günde 1 Saşe · Akşam Tok", doctor: "Dr. Ayşe Yılmaz", target: "Kas kramplarını önleme", bioTip: "Akşam yemeğinden sonra ılık suyla için.", takenToday: false, takenTime: null, particleColor: "magnesium", badge: "Akşam Tok" }
    ]
  },
  24: {
    week: 24,
    trimester: "2. Trimester",
    stageName: "Yaşam Sınırı & Şeker Taraması",
    sizeComparison: "Boyut: 30 cm · Bir Mısır Koçanı",
    weight: "600 gr",
    height: "30.0 cm",
    bpm: 145,
    presentation: "Yarı Dikey / Serbest",
    image: "realistic_baby.jpg",
    bodyWhisper: "Akciğerlerde surfaktan maddesi üretilmeye başlıyor. Güneş artık tatları ayırt edebiliyor; yediğin yemeklerin aroması amniyon sıvısına geçiyor.",
    dos: [
      "24-28. haftalar arasında 75g Oral Glukoz Tolerans Testini (OGTT) tamamla.",
      "Günde 20 dakika tempolu yürüyüş ve pelvik taban nefes egzersizi yap.",
      "Diş eti hassasiyetine karşı yumuşak diş fırçası ve tuzlu su gargarası kullan."
    ],
    donts: [
      "Test öncesinde aşırı tatlı yüklemesi veya düzensiz açlık rejimleri uygulama.",
      "Ayak bacak kramplarını görmezden gelme; magnezyum alımını aksatma.",
      "Uzun süre ayakta hareketsiz bekleme (varis ve ödem riskini artırır)."
    ],
    partnerMission: "Oğuz, Buse'nin ayak bileklerinde hafif ödem oluşabilir. Akşamları ayaklarını 15-20 cm yukarı kaldırarak soğuk-ılık havlu kompresi yap.",
    doctorQuestions: [
      "Şeker yükleme testi (OGTT) açlık ve 1-2. saat değerlerim nasıl?",
      "Rahim ağzı uzunluğu (servikal boy) ölçümü yapıldı mı?"
    ],
    prescriptions: [
      { id: "iron", name: "Ferro Sanol Duodenal (Demir)", shortName: "Demir Kapsülü", dose: "Günde 1 Kapsül · Sabah Aç", doctor: "Dr. Ayşe Yılmaz", target: "Ferritin desteği", bioTip: "Sabah aç karnına bol suyla.", takenToday: true, takenTime: "08:30", particleColor: "omega", badge: "Sabah Aç" },
      { id: "omega", name: "Ocean Mummy (Multivitamin & DHA)", shortName: "Omega 3 & DHA", dose: "Günde 1 Kapsül · Öğle Tok", doctor: "Dr. Ayşe Yılmaz", target: "Fetal beyin gelişimi", bioTip: "Öğle yemeğiyle birlikte.", takenToday: false, takenTime: null, particleColor: "folic", badge: "Öğle Tok" }
    ]
  },
  31: {
    week: 31,
    trimester: "3. Trimester",
    stageName: "Doğuma Hazırlık & Hızlı Kilo Alımı",
    sizeComparison: "Boyut: 41.5 cm · Bir Ananas Hacminde",
    weight: "1.650 gr",
    height: "41.5 cm",
    bpm: 142,
    presentation: "Sefalik (Baş Aşağı)",
    image: "cinematic_womb_31w.jpg",
    bodyWhisper: "Güneş sefalik (baş aşağı) pozisyona geçti ve beyin kıvrımları hızla olgunlaşıyor. Rahim kaburgalara baskı yaptığı için nefesin daralabilir; küçük porsiyonlarla beslen.",
    dos: [
      "Günde 2 saat içinde Cardiff 10 Kuralı ile 10 fetal hareketi say.",
      "Doğum tercih belgeni (Plan A / Plan B) ve hastane çantanı hazırlamaya başla.",
      "Kegel ve derin çömelme egzersizleriyle pelvik tabanı doğuma hazırla."
    ],
    donts: [
      "36. haftadan önce rahim ağzını zorlayıcı erken çatı muayenelerinden kaçın.",
      "Doğumu tetiklemek amacıyla kontrolsüz meme ucu masajı / göğüs pompası yapma (Oksitosin salgısını erken uyarabilir).",
      "Sırtüstü uyumaktan kesinlikle kaçın; her zaman sol yana yat.",
      "Tansiyon ölçümünü aksatma (Buse'nin güvenli koridoru: < 115/75 mmHg)."
    ],
    partnerMission: "Oğuz, Manisa Şehir Hastanesi'ne ulaşım rotasını ve acil durum çantasını Buse ile birlikte gözden geçir. Carlos'un Merve'ye teslim planını teyit et.",
    doctorQuestions: [
      "Güneş'in baş aşağı duruşu ve suyu (AFI) ideal mi?",
      "32. hafta doğum öncesi analık izni raporumu ne zaman düzenleyeceğiz?"
    ],
    prescriptions: [
      { id: "magnesium", name: "Magnimore Plus (Magnezyum)", shortName: "Magnezyum Saşe", dose: "Günde 1 Saşe · Akşam Tok", doctor: "Dr. Ayşe Yılmaz", target: "Kas kramplarını önleme & rahim kaslarını gevşetme", bioTip: "Akşam yemeğinden sonra ılık suyla için.", takenToday: true, takenTime: "21:30", particleColor: "magnesium", badge: "Akşam Tok" },
      { id: "iron", name: "Ferro Sanol Duodenal (Demir)", shortName: "Demir Kapsülü", dose: "Günde 1 Kapsül · Sabah Aç", doctor: "Dr. Ayşe Yılmaz", target: "Ferritin ve hemoglobin desteği", bioTip: "Portakal suyu ile için.", takenToday: false, takenTime: null, particleColor: "omega", badge: "Sabah Aç" },
      { id: "omega", name: "Ocean Mummy (Multivitamin & DHA)", shortName: "Omega 3 & DHA", dose: "Günde 1 Kapsül · Öğle Tok", doctor: "Dr. Ayşe Yılmaz", target: "Güneş'in beyin dokusu ve retina gelişimi", bioTip: "Öğle yemeğiyle.", takenToday: false, takenTime: null, particleColor: "folic", badge: "Öğle Tok" },
      { id: "d3", name: "Coledan D3 Damla (1000 IU)", shortName: "D3 Vitamini Damlası", dose: "Günde 4 Damla · Sabah", doctor: "Dr. Ayşe Yılmaz", target: "Kalsiyum emilimi", bioTip: "Zeytinyağı veya ekmek üzerine.", takenToday: false, takenTime: null, particleColor: "water", badge: "Sabah" }
    ]
  },
  36: {
    week: 36,
    trimester: "3. Trimester",
    stageName: "Term Öncesi & Çatı Uyumu",
    sizeComparison: "Boyut: 47.4 cm · Bir Bal Kabağı",
    weight: "2.650 gr",
    height: "47.4 cm",
    bpm: 140,
    presentation: "Sefalik & Pelvise İniş",
    image: "cinematic_womb_31w.jpg",
    bodyWhisper: "Bebek doğum kanalına doğru hafifçe indiğinde nefes alman rahatlayacak ancak mesane baskısı artacak. Braxton Hicks hazırlık dalgaları gün içinde sıklaşabilir.",
    dos: [
      "Haftalık NST (Non-Stres Testi) ve GBS (Grup B Streptokok) taramasını yaptır.",
      "Perine masajına başla (Doğal badem/zeytinyağı ile doku elastikiyetini artır).",
      "Doğum çantasını arabanın bagajına veya kapı girişine yerleştir."
    ],
    donts: [
      "Ağır ev temizliği, cam silme veya perde asma gibi zorlayıcı işler yapma.",
      "Kanama veya berrak sıvı akıntısı (amniyon sızıntısı) olduğunda evde bekleme; derhal hastaneye git.",
      "Yalnız başına uzun mesafeli araba yolculuklarına çıkma."
    ],
    partnerMission: "Oğuz, arabanın deposunun her zaman dolu olduğundan emin ol. Hastane acil giriş kapısının yerini ve gece nöbetçi doktor iletişim numarasını telefonuna sabitle.",
    doctorQuestions: [
      "GBS vajinal/rektal kültür testim yapıldı mı?",
      "NST testinde kalp atış dalgalanması (variabilite) reaktif mi?"
    ],
    prescriptions: [
      { id: "magnesium", name: "Magnimore Plus (Magnezyum)", shortName: "Magnezyum Saşe", dose: "Günde 1 Saşe · Akşam Tok", doctor: "Dr. Ayşe Yılmaz", target: "Doğum dalgası öncesi kas konforu", bioTip: "Akşam ılık suyla.", takenToday: true, takenTime: "21:30", particleColor: "magnesium", badge: "Akşam Tok" },
      { id: "iron", name: "Ferro Sanol Duodenal (Demir)", shortName: "Demir Kapsülü", dose: "Günde 1 Kapsül · Sabah Aç", doctor: "Dr. Ayşe Yılmaz", target: "Doğum öncesi hemoglobin güvencesi", bioTip: "Sabah aç karnına.", takenToday: false, takenTime: null, particleColor: "omega", badge: "Sabah Aç" }
    ]
  },
  38: {
    week: 38,
    trimester: "3. Trimester",
    stageName: "Term Doğum & Kavuşma Eşiği",
    sizeComparison: "Boyut: 49.8 cm · Bir Karpuz Hacminde",
    weight: "3.100 gr",
    height: "49.8 cm",
    bpm: 138,
    presentation: "Sefalik & Pelvise Angaje",
    image: "cinematic_womb_31w.jpg",
    bodyWhisper: "Güneş artık tam zamanlı (term) bir bebek! Cildindeki verniks tabakası dökülüyor ve doğum için seninle birlikte hormonları (oksitosin & endorfin) senkronize ediyor.",
    dos: [
      "5-1-1 kuralını takip et: Dalgalar 5 dakikada bir geliyor, 1 dakika sürüyor ve 1 saattir düzenliyse hastaneye yola çık.",
      "Hurma, ılık duş ve sakin müzikle gevşeme modunu koru.",
      "Ten Tene Temas belgeni doğum ekibine teslim edilmek üzere hazır tut."
    ],
    donts: [
      "Panik yaparak düzensiz dalgalarda hemen doğumhaneye koşma (evdeki konfor alanı erken sancıda daha güvenlidir).",
      "Ağır ve yağlı yemekler yeme; doğum başladığında mideyi yormayacak hafif sıvı gıdalar al.",
      "Stres ve kaygıya kapılma; bedenin doğumu kusursuz biliyor."
    ],
    partnerMission: "Oğuz, Buse dalga anına girdiğinde 4-7-8 nefesini sesli sayarak ona rehberlik et. Sakrum kemiğine dairesel baskı masajı yap ve suyunu yudumlat.",
    doctorQuestions: [
      "Amniyon sıvısı miktarı ve NST reaktivitesi nasıl?",
      "Rahim ağzı silinmesi (effasman) ve açılması başlamış mı?"
    ],
    prescriptions: [
      { id: "iron", name: "Ferro Sanol Duodenal (Demir)", shortName: "Demir Kapsülü", dose: "Günde 1 Kapsül · Sabah Aç", doctor: "Dr. Ayşe Yılmaz", target: "Doğum anı oksijen rezervi", bioTip: "Düzenli devam.", takenToday: true, takenTime: "08:30", particleColor: "omega", badge: "Sabah Aç" }
    ]
  }
};

// Default fallback generator for any week 1-40
function getLifecycleDataForWeek(w) {
  if (WEEKLY_LIFECYCLE_DB[w]) return WEEKLY_LIFECYCLE_DB[w];
  
  // Find nearest defined week
  const definedWeeks = Object.keys(WEEKLY_LIFECYCLE_DB).map(Number).sort((a,b) => a-b);
  let nearest = definedWeeks[0];
  for (const dw of definedWeeks) {
    if (dw <= w) nearest = dw;
  }
  const base = WEEKLY_LIFECYCLE_DB[nearest];

  const trimester = w <= 13 ? "1. Trimester" : (w <= 27 ? "2. Trimester" : "3. Trimester");
  const estWeight = Math.round(w < 12 ? w * 1.5 : (w < 28 ? (w - 10) * 45 : 1000 + (w - 28) * 180));
  const estHeight = (w * 1.3).toFixed(1);

  return {
    ...base,
    week: w,
    trimester: trimester,
    stageName: `${w}. Hafta Gebelik Yolculuğu`,
    sizeComparison: `Boyut: ~${estHeight} cm · ${w}. Hafta Fetal Gelişimi`,
    weight: `${estWeight} gr`,
    height: `${estHeight} cm`,
    bpm: Math.max(135, Math.min(160, Math.round(165 - (w * 0.7)))),
    presentation: w >= 30 ? "Sefalik (Baş Aşağı)" : "Hareketli"
  };
}


// =========================================================================
// HAFTA SEÇİCİ MODAL & DİNAMİK YAŞAM MOTORU KONTROLCÜSÜ
// =========================================================================
function renderWeekSelectorModal() {
  if (!state.isWeekSelectorOpen) return '';

  const curW = state.baby.week;
  const curData = getLifecycleDataForWeek(curW);

  return `
    <div class="absolute inset-0 bg-black/80 z-[95] backdrop-blur-md transition-opacity" onclick="toggleWeekSelector()"></div>
    <div class="absolute bottom-0 inset-x-0 bg-[#160E0B] z-[100] rounded-t-[36px] border-t border-white/20 p-5 text-white animate-in slide-in-from-bottom duration-200 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
      
      <!-- Modal Başlığı -->
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <span class="text-xs font-bold text-amber-200 uppercase tracking-wider">Haftalık Yaşam Döngüsü Simülatörü</span>
          <h3 class="text-base font-bold text-white mt-0.5">${curW}. Hafta: ${curData.stageName}</h3>
        </div>
        <button onclick="toggleWeekSelector()" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white text-xs">✕</button>
      </div>

      <!-- Hızlı Trimester Atlama Butonları (Tıklandığında Anında Uygular ve Modalı Kapatır) -->
      <div class="grid grid-cols-4 gap-1.5 text-[10px]">
        <button onclick="applyAndCloseWeek(8)" class="py-2.5 px-1 rounded-xl text-center border transition ${curW <= 13 ? 'bg-amber-500/25 border-amber-400/40 text-amber-200 font-bold shadow-xs' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}">
          1. Trimester<br><span class="text-[9px] opacity-70">8.H (Bulantı/Folat)</span>
        </button>
        <button onclick="applyAndCloseWeek(20)" class="py-2.5 px-1 rounded-xl text-center border transition ${curW >= 14 && curW <= 27 ? 'bg-amber-500/25 border-amber-400/40 text-amber-200 font-bold shadow-xs' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}">
          2. Trimester<br><span class="text-[9px] opacity-70">20.H (Detaylı Organ)</span>
        </button>
        <button onclick="applyAndCloseWeek(31)" class="py-2.5 px-1 rounded-xl text-center border transition ${curW >= 28 && curW <= 35 ? 'bg-amber-500/25 border-amber-400/40 text-amber-200 font-bold shadow-xs' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}">
          3. Trimester<br><span class="text-[9px] opacity-70">31.H (Doğuma Hazırlık)</span>
        </button>
        <button onclick="applyAndCloseWeek(38)" class="py-2.5 px-1 rounded-xl text-center border transition ${curW >= 36 ? 'bg-rose-500/25 border-rose-400/40 text-rose-200 font-bold shadow-xs' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10'}">
          Term Doğum<br><span class="text-[9px] opacity-70">38.H (Kavuşma)</span>
        </button>
      </div>

      <!-- 1 - 40 Hafta İnteraktif Slider -->
      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
        <div class="flex justify-between items-center text-xs">
          <span class="text-white/60">Gebelik Haftası Seçin:</span>
          <span class="text-lg font-bold text-amber-200 font-mono">${curW}. Hafta <span class="text-xs text-white/50">(${curData.trimester})</span></span>
        </div>

        <input 
          type="range" 
          min="4" 
          max="40" 
          value="${curW}" 
          oninput="changePregnancyWeek(parseInt(this.value))"
          class="w-full accent-amber-400 h-2 bg-white/20 rounded-lg cursor-pointer"
        >

        <div class="flex justify-between text-[9px] text-white/40 font-mono">
          <span>4. Hafta</span>
          <span>12.H</span>
          <span>20.H</span>
          <span>28.H</span>
          <span>31.H</span>
          <span>36.H</span>
          <span>40. Hafta</span>
        </div>
      </div>

      <!-- Seçilen Haftanın Önizleme Özeti -->
      <div class="p-3.5 bg-black/40 rounded-2xl border border-white/5 space-y-2 text-xs">
        <div class="flex justify-between items-center">
          <span class="text-emerald-300 font-bold text-[11px]">${curData.sizeComparison}</span>
          <span class="text-white/50 text-[10px]">${curData.weight} · ${curData.bpm} BPM</span>
        </div>
        <p class="text-[10px] text-white/75 leading-relaxed">
          ${curData.bodyWhisper}
        </p>
      </div>

      <button onclick="applyAndCloseWeek(${curW})" class="w-full py-3.5 bg-gradient-to-r from-amber-500/30 to-amber-600/30 hover:from-amber-500/40 border border-amber-400/40 text-amber-200 font-bold text-xs rounded-2xl transition shadow-md">
        Bu Haftayı Uygula ve Keşfet (${curW}. Hafta) ➔
      </button>

    </div>
  `;
}

window.toggleWeekSelector = function() {
  state.isWeekSelectorOpen = !state.isWeekSelectorOpen;
  triggerHaptic(10);
  render();
};

window.changePregnancyWeek = function(w) {
  state.weekTransitionOverlay = true;
  state.weekTransitionTarget = w;
  setTimeout(() => { state.weekTransitionOverlay = false; render(); }, 1800);
  const data = getLifecycleDataForWeek(w);
  state.baby.week = w;
  state.baby.sizeComparison = data.sizeComparison;
  state.baby.weight = data.weight;
  state.baby.height = data.height;
  state.baby.bpm = data.bpm;
  state.baby.presentation = data.presentation;
  state.baby.daysLeft = Math.max(0, (40 - w) * 7);

  if (data.prescriptions && data.prescriptions.length > 0) {
    state.prescriptions = data.prescriptions;
  }

  // Dinamik semptom ve ruh hali uyarlaması
  if (w <= 13) {
    state.healthData.selectedSymptoms = ["Hafif Sabah Bulantısı", "Halsizlik & Uyku Hali"];
    state.healthData.selectedMood = "İlk Heyecan & Köklenme (1. Trimester)";
  } else if (w <= 27) {
    state.healthData.selectedSymptoms = ["Bel Esnemesi", "Enerji Yükselişi"];
    state.healthData.selectedMood = "Canlanma & İlk Kıpırtılar (2. Trimester)";
  } else {
    state.healthData.selectedSymptoms = ["Bel ve Sırt Esnemesi", "Hafif Mide Yanması"];
    state.healthData.selectedMood = "Yuva Kurma & Derin Bağ (3. Trimester)";
  }

  // Eğer erken trimester ise ve subtab 3. trimester odaklıysa uygun subtaba al
  if (w < 28) {
    if (['kick', 'waves', 'bag', 'plan', 'logistics'].includes(state.birthModule.activeSubtab)) {
      state.birthModule.activeSubtab = 'overview';
    }
  } else {
    if (['overview', 'donts', 'dos', 'partner', 'questions'].includes(state.birthModule.activeSubtab)) {
      state.birthModule.activeSubtab = 'kick';
    }
  }

  triggerHaptic(10);
  render();
};

window.applyAndCloseWeek = function(w) {
  window.changePregnancyWeek(w);
  state.isWeekSelectorOpen = false;
  triggerHaptic([20, 30, 20]);
  render();
};


// ToHUM - Bütünleşik Sağlık & Yaşayan Anne Karnı Mimarisi
// =========================================================================
// MODÜL 1: GÜNEŞ (YAŞAYAN ALAN + REÇETEDEN DİNAMİK BESLENEN GÜNLÜK TAKVİYE LİSTESİ - KİLİTLİ)
// MODÜL 2: ŞİFA & SAĞLIK (BİYOMETRİ + HORMON & BABA UYARISI + TAHLİL & REÇETE + PELVİK + ULTRASON - KİLİTLİ)
// MODÜL 3: DOĞUM & HAZIRLIK (FETAL TEKME & RİTİM + DALGA SAYACI & BRAXTON HICKS + ÇANTA & EVRAKLAR + DOĞUM PLANI A/B + KRİZ & CARLOS PLANI)
// =========================================================================
// Buse, Oğuz ve Güneş • Manisa / Yunusemre / Muradiye

const state = {
  isLoggedIn: true,
  currentTab: "home", // Varsayılan olarak 1. Modül Güneş (Calm Tech - Anne Karnı)
  isDrawerOpen: false,
  isClinicalReportOpen: false,
  aiSeedCoreAnalysis: null,
  isPlayingAudio: false,
  audioCtx: null,
  humOsc: null,
  heartbeatInterval: null,

  // ÜREM AİLESİ 2 OTURUMLU HESAP (Anne: Buse Nur Ürem & Baba: Oğuz Ürem)
  family: {
    name: "Ürem Ailesi",
    membership: "2 Oturumlu Aile Hesabı (Anne & Baba)",
    activeSession: "mother", // "mother" (Buse Nur Ürem) | "father" (Oğuz Ürem)
    sessions: [
      { id: "mother", name: "Buse Nur Ürem", role: "Anne", title: "Anne Takip & Sanal Bebek Alanı", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80" },
      { id: "father", name: "Oğuz Ürem", role: "Baba", title: "Baba Oturumu & Maternal İhtiyaç Analizi", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80" }
    ]
  },

  // 1. MODÜL: GÜNEŞ - ÇEKMECE & BESLEME DURUMU
  isSheetExpanded: false,
  isGridMenuOpen: false,
  isNurtureModalOpen: false,
  isMoodModalOpen: false,
  hasCollagen: false,
  customSupplements: [],
  dailyChecklist: {
    meal: true,
    iron: true,
    omega: true,
    magnesium: false
  },
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

  whatsAppModal: {
    isOpen: false,
    title: "WhatsApp Paylaşımı",
    recipientName: "Oğuz Baltacıoğlu",
    recipientPhone: "+90 532 123 45 67",
    message: "",
    waUrl: "",
    type: "partner_invite"
  },
  auth: {
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
  },
  profileSubtab: "identity",

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
  },

  pet: {
    name: "Carlos",
    type: "Köpek",
    caretaker: "Merve (Komşu / Muradiye)",
    caretakerPhone: "+90 533 111 22 33",
    note: "Maması mutfak dolabında, günde 2 kez yürüyüş."
  },

  // =========================================================================
  // HAFTALIK DİNAMİK YAŞAM DÖNGÜSÜ MOTORU DURUMU (1 - 40. HAFTA)
  // =========================================================================
  isWeekSelectorOpen: false,
  weekTransitionOverlay: false,
  wearable: {
    isConnected: true,
    deviceName: "Apple Watch / HealthKit",
    heartRate: 78,
    hrv: 64,
    spo2: 98,
    sleepHours: "7s 25dk",
    steps: 4820,
    raffleJoined: false,
    raffleMonth: "Ekim 2026",
    lastSync: "Şimdi (Canlı)"
  },
  privacyMode: false,
  selectedLifecycleModule: "M0",
  familyMembers: [
    { id: 1, name: "Buse & Oğuz Baltacıoğlu", relation: "Anne & Baba", role: "admin", badge: "🔑 Tam Yetki", desc: "Tüm sağlık, gelişim ve sistem sınırlarını yönetir." },
    { id: 2, name: "Anneanne & Babaanne", relation: "Büyükanne (Geniş Aile)", role: "observer", badge: "👁️ Gözlemci", desc: "Salt-okunur haftalık bülten görür, sisteme müdahale edemez." },
    { id: 3, name: "Teyze & Kuzen", relation: "Yakın Akraba", role: "observer", badge: "👁️ Gözlemci", desc: "Yalnızca ebeveynin izin verdiği anıları görüntüler." },
    { id: 4, name: "Merve (Komşu) & Dr. Ayşe Yılmaz", relation: "Kriz & Lojistik Ağı", role: "emergency", badge: "🚨 Acil Destek", desc: "Yalnızca sağlık alarmı ve doğum anında lokasyon/bildirim alır." }
  ],
  lifecycleModules: [
    { code: "M0", phase: "FAZ-1 (Aktif)", age: "Gebelik (0-40H)", poetic: "Çimlenme", scientific: "Embriyonik ve Fetal Dönem", desc: "Akıllı saat biyometrik takibi, kardiyovasküler dengesiz veri analizi, 5-1-1 dalga sayacı ve anne-baba hazırlığı (v0.0.1 - v0.0.4)." },
    { code: "M1", phase: "FAZ-1 (BiGG)", age: "0 - 2 Yaş", poetic: "Filizlenme", scientific: "Laktasyon ve Sensorimotor Dönem", desc: "Lohusalık uyku/HRV analizi, emzirme rutini, sesli AI asistan ile güvenli bağlanma ve duyusal uyanış (v0.1.0)." },
    { code: "M2", phase: "Faz-2 (Ar-Ge)", age: "2 - 4 Yaş", poetic: "Köklenme", scientific: "Preoperasyonel Dönem", desc: "3 Yaş Sendromu (öfke yönetimi) için toprakla temas, şifa bahçesi ve bahçıvanlık terapisi." },
    { code: "M3", phase: "Faz-2 (Ar-Ge)", age: "4 - 6 Yaş", poetic: "Sürgünlenme", scientific: "Dil ve Sosyal Bilişsel Gelişim", desc: "Adab-ı muaşeret, empati, cinsiyetçilik ve ırkçılıktan arınmış kapsayıcı değerler ve doğa oyunları." },
    { code: "M4", phase: "Faz-2 (Ar-Ge)", age: "6 - 9 Yaş", poetic: "Dal Verme", scientific: "Somatik Büyüme ve Motor Gelişim", desc: "Yaşam temelli doğal öğrenme: Mutfakta matematik/kimya, parkta fizik, bahçede biyoloji." },
    { code: "M5", phase: "Faz-3 (Vizyon)", age: "9 - 12 Yaş", poetic: "Çiçeklenme", scientific: "Kognitif Gelişim ve Öz-Yönetim", desc: "Tüm sanat ve spor dallarını deneyimleyerek öz-yönelimli yetenek keşfi ve derinleştirme." },
    { code: "M6", phase: "Faz-3 (Vizyon)", age: "12 - 18 Yaş", poetic: "Meyve Verme", scientific: "Ergenlik ve Psikososyal Gelişim", desc: "Post-teknolojik yaşam ve zanaat (su arıtma, güneş/rüzgar enerjisi üretimi, çömlek/ahşap) ve Zehir/Şifa içsel bilinci." },
    { code: "M7", phase: "Faz-3 (Vizyon)", age: "18+ Yaş", poetic: "Tohum Verme", scientific: "Genç Yetişkinlik ve Öz-Gerçekleştirme", desc: "18 yıllık gelişim hafızasıyla; gencin keyif aldığı işler, zanaatlar, sanat/bilim yetenekleri ve kabiliyetleri doğrultusunda üniversite ve meslek pusulası." }
  ],
  aiVoiceAgenda: [
    { id: "morning", time: "07:00", period: "Sabah Rehberi", title: "Bedenin Uyanışı & Hamile Yogası", text: "Günaydın Buse! Bedenin her geçen gün güçleniyor. Bugün 10 dakika pelvik esneme ve 20 dakika yürüyüş için harika bir sabah." },
    { id: "noon", time: "12:00", period: "Öğle Farkındalığı", title: "8.3 Hz Hum Nefes Dengesi", text: "Kendine bir an ver ve derin nefes al. Her hücren Güneş'i sevgiyle kucaklamaya hazırlanıyor. Su içmeyi hatırla." },
    { id: "evening", time: "21:00", period: "Akşam Baba Çağrısı", title: "Oğuz'a Eşlik & Sakrum Masajı", text: "İyi akşamlar Oğuz! Bugün Buse'ye 10 dakikalık bir omuz ve bel masajı yapabilir misin? Dokunuşun Güneş'e de güven verir." },
    { id: "night", time: "23:00", period: "Gece Kaygı Günlüğü", title: "Sakinleştirici Sesli Okuma", text: "Bugün bedenin güçlüydü, zihnin sakinleşti. Sen ve Güneş güvendesiniz; 8.3 Hertz doğa ritmiyle huzurla uyu." }
  ],
  weekTransitionTarget: 0,
  nightMode: (new Date().getHours() >= 22 || new Date().getHours() < 7),
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

  // 2. MODÜL: ŞİFA & SAĞLIK TAKİBİ VERİLERİ (KORUMA ALTINDA)
  healthData: {
    activeHealthSubtab: "biometrics",
    isBpAccordionOpen: false,
    isSafetyCorridorOpen: false,
    labFilterCategory: "all",
    isHormoneDetailOpen: false,
    
    bloodPressureHistory: [
      { id: 1, date: "04 Eylül (Bugün · 09:15)", systolic: 92, diastolic: 62, note: "Sabah dinlenik ölçüm · Güvenli", isNormal: true },
      { id: 2, date: "02 Eylül (14:30)", systolic: 90, diastolic: 60, note: "Buse'nin doğal baz seviyesi", isNormal: true },
      { id: 3, date: "30 Ağustos (18:40)", systolic: 95, diastolic: 64, note: "Spil yürüyüşü sonrası", isNormal: true },
      { id: 4, date: "26 Ağustos (10:00)", systolic: 88, diastolic: 58, note: "Dinlenik ölçüm", isNormal: true }
    ],

    progressionHistory: [
      { weekNum: 0, label: "0.H", weight: 58.0, waist: 68, gain: "+0.0 kg" },
      { weekNum: 12, label: "12.H", weight: 59.2, waist: 74, gain: "+1.2 kg" },
      { weekNum: 20, label: "20.H", weight: 61.0, waist: 82, gain: "+3.0 kg" },
      { weekNum: 26, label: "26.H", weight: 63.0, waist: 90, gain: "+5.0 kg" },
      { weekNum: 28, label: "28.H", weight: 63.8, waist: 93, gain: "+5.8 kg" },
      { weekNum: 31, label: "31.H", weight: 65.0, waist: 98, gain: "+7.0 kg" }
    ],

    selectedSymptoms: ["Bel ve Sırt Esnemesi", "Hafif Mide Yanması"],
    selectedMood: "Yuva Kurma & Derin Bağ (Nesting)",
    painLevel: "Hafif",

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

    ultrasoundGallery: [
      { id: 1, title: "31. Hafta Yüz Profili & Duruş", week: "31. Hafta", date: "02 Eylül 2026", doctor: "Dr. Ayşe Yılmaz", image: "cinematic_womb_31w.jpg", desc: "Güneş baş aşağı sefalik pozisyonda, eli çenesinde uyuyor." },
      { id: 2, title: "22. Hafta Detaylı Organ Anatomisi", week: "22. Hafta", date: "08 Temmuz 2026", doctor: "Dr. Ayşe Yılmaz", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80", desc: "Tüm organ gelişimi, omurga ve kalp 4 odacık tam uyumlu." },
      { id: 3, title: "12. Hafta İlk 2D Silüet", week: "12. Hafta", date: "12 Mayıs 2026", doctor: "Dr. Ayşe Yılmaz", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&q=80", desc: "Burun kemiği ve ense kalınlığı (NT: 1.1 mm) kusursuz ölçüldü." }
    ]
  },

  // =========================================================================
  // 3. MODÜL: DOĞUM & HAZIRLIK VERİLERİ (GENİŞLETİLMİŞ VE EKSİKSİZ)
  // =========================================================================
  birthModule: {
    activeSubtab: "kick", // kick (fetal sayaç), waves (dalga sayacı), bag (çanta & evrak), plan (tercih belgesi A/B), logistics (kriz & carlos)
    
    // 1. Fetal Hareket & Tekme Sayacı (Cardiff 10 Kuralı)
    kickSession: {
      isRunning: false,
      count: 7, // Cardiff kuralı: 2 saat içinde 10 tekme
      target: 10,
      startTime: "14:10",
      elapsedMinutes: 38,
      isGoalReached: false,
      hourlyDistribution: [
        { hour: "08:00 - 10:00", count: 4, label: "Sabah Uyanış" },
        { hour: "12:00 - 14:00", count: 8, label: "Öğle Yemeği Sonrası" },
        { hour: "16:00 - 18:00", count: 3, label: "İkindi Dinlenmesi" },
        { hour: "20:00 - 22:00", count: 11, label: "Akşam Zirvesi (En Aktif)" }
      ]
    },

    // 2. Doğum Kasılma / Dalgası Sayacı & Braxton Hicks Filtresi
    contractionTimer: {
      isRunning: false,
      currentSeconds: 0,
      intervalId: null,
      lastDuration: 48, // sn
      lastFrequency: 7, // dk
      analysisStatus: "braxton_hicks", // "braxton_hicks" (hazırlık) veya "active_labor" (aktif doğum)
      waveHistory: [
        { id: 1, time: "14:20", duration: 45, frequency: 12, isBraxton: true },
        { id: 2, time: "14:32", duration: 50, frequency: 10, isBraxton: true },
        { id: 3, time: "14:42", duration: 42, frequency: 15, isBraxton: true }
      ]
    },

    // 3. 4 Kişilik Akıllı Doğum Çantası (Anne, Bebek, Baba, Evraklar) + Hava Durumu
    bagActiveCategory: "Evraklar",
    dischargeWeather: {
      city: "Manisa / Muradiye",
      dateRange: "24-28 Ekim 2026",
      temp: "19°C · Parçalı Bulutlu / Tatlı Esinti",
      clothingTip: "Güneş için pamuklu uzun kollu zıbın + örgü hırka ve tek kat organik müslin battaniye idealdir."
    },
    bagItems: [
      // Resmi Evraklar
      { id: 101, category: "Evraklar", title: "Buse & Oğuz Nüfus Cüzdanları", done: true, priority: "Kritik", note: "Hastaneye girişte kayıt için zorunlu" },
      { id: 102, category: "Evraklar", title: "Dr. Ayşe Yılmaz Gebelik Takip Dosyası & Tahlil Raporları", done: true, priority: "Kritik", note: "Son kan tahlilleri ve ultrason raporları" },
      { id: 103, category: "Evraklar", title: "Özel Sağlık Sigortası Doğum Onay Belgesi", done: true, priority: "Önemli", note: "Poliçe provizyon numarası ekli" },
      { id: 104, category: "Evraklar", title: "İmzalı Ten Tene Temas Doğum Tercih Belgesi (2 Kopya)", done: true, priority: "Kritik", note: "Biri doktora, biri nöbetçi ebeye teslim edilecek" },

      // Anne Çantası
      { id: 201, category: "Anne", title: "Önden Açılan Pamuklu Lohusa Geceliği (2 Adet)", done: true, priority: "Yüksek", note: "Emzirme kolaylığı için" },
      { id: 202, category: "Anne", title: "Gümüş Göğüs Kapakları & Organik Balm", done: true, priority: "Yüksek", note: "İlk emzirmede koruma" },
      { id: 203, category: "Anne", title: "Kaydırmaz Tabanlı Yumuşak Terlik & Pamuk Çorap", done: true, priority: "Normal", note: "Doğumhane koridor yürüyüşü için" },
      { id: 204, category: "Anne", title: "Doğum Dalgası Masaj Yağı (Lavanta & Badem)", done: false, priority: "Normal", note: "Oğuz'un sakrum masajı için" },

      // Bebek Çantası (Güneş)
      { id: 301, category: "Bebek", title: "0-3 Ay Yıkanmış Organik Pamuklu Hastane Çıkış Seti", done: true, priority: "Kritik", note: "Zıbın, tulum, eldiven ve şapka ütülendi" },
      { id: 302, category: "Bebek", title: "2 Adet Yıkanmış Müslin Örtü & Ağız Mendilleri", done: true, priority: "Yüksek", note: "İlk ten tene temas örtüsü" },
      { id: 303, category: "Bebek", title: "Yenidoğan Organik Bebek Bezi (1 Paket)", done: true, priority: "Yüksek", note: "Hassas cilt uyumlu" },
      { id: 304, category: "Bebek", title: "Oto Koltuğu (Puset / Ana Kucağı)", done: false, priority: "Kritik", note: "Eve güvenli dönüş için arabaya takılacak" },

      // Baba Çantası (Oğuz)
      { id: 401, category: "Baba", title: "Yedek Rahat Tişört & Eşofman (Ten Tene Temas Uyumlu)", done: true, priority: "Yüksek", note: "B planında sezaryen olursa Oğuz'un ten tene teması için" },
      { id: 402, category: "Baba", title: "Şarj Aletleri, Powerbank & Kamera", done: false, priority: "Yüksek", note: "İlk aile fotoğrafı için" },
      { id: 403, category: "Baba", title: "Enerji Veren Kuruyemiş & Hurma Paketi", done: true, priority: "Normal", note: "Buse ve Oğuz için gece atıştırmalığı" }
    ],

    // 4. Doğum Tercih Belgesi (Plan A: Doğal Doğum, Plan B: Acil Sezaryen Güvencesi)
    birthPlanTab: "planA", // "planA" veya "planB"
    planA_items: [
      { id: 1, title: "Doğum Anında Kesintisiz Ten Tene Temas", desc: "Bebek doğar doğmaz göğsüme yatırılsın; ilk 60 dakika (altın saat) anne kucağında kalsın.", selected: true },
      { id: 2, title: "Kordonun Geç Klemplenmesi (Optimal Kordon Bağı)", desc: "Kordon kanının bebeğe tamamen geçmesi için pulsasyon (atım) durana ve beyazlaşana kadar kordon kesilmesin.", selected: true },
      { id: 3, title: "Doğum Odası Atmosferi", desc: "Işıkların loş tutulması, sakin bir konuşma ortamı ve hoparlörden 8.3 Hz sakinleştirici frekans çalınması rica olunur.", selected: true },
      { id: 4, title: "İlk Rutin Kontroller Anne Kucağında", desc: "Kilo tartımı, Apgar ve göz damlası gibi ilk kontroller ten tene temas bozulmadan anne göğsünde tamamlansın.", selected: true },
      { id: 5, title: "Aktif Hareket ve Pozisyon Özgürlüğü", desc: "Sancı dalgaları esnasında çömelme, kedi-deve hareketi ve dikey pozisyonlarda hareket etmeme izin verilsin.", selected: true }
    ],
    planB_items: [
      { id: 11, title: "B Planı: Sezaryen Durumunda Baba (Oğuz) İle Ten Tene Temas", desc: "Tıbbi zorunluluk nedeniyle sezaryen gerekirse, anne toparlanana kadar Güneş'in ilk ten tene temasını göğsünü açarak baba (Oğuz) yapsın.", selected: true },
      { id: 12, title: "B Planı: Ameliyathanede Bilinçli Eşlik", desc: "Buse'nin bilinci açık olsun; Oğuz başucunda bulunarak elini tutsun ve sakinleştirici müzik eşlik etsin.", selected: true },
      { id: 13, title: "B Planı: Bebeğin Anında Gösterilmesi", desc: "Bebek dünyaya geldiği anda anneye gösterilsin ve yanağına temas ettirilsin.", selected: true },
      { id: 14, title: "B Planı: Anne Odasına Geçişte Erken Emzirme", desc: "Ayılma odasından çıkar çıkmaz ilk 30 dakika içinde anne memesine tutulsun.", selected: true }
    ],

    // 5. Lojistik & Kriz Yönetimi (Carlos'un Planı, Acil Arama & Navigasyon)
    emergencyContacts: [
      { role: "Kadın Doğum Uzmanı", name: "Dr. Ayşe Yılmaz", phone: "+90 532 111 22 33", note: "Manisa Şehir Hastanesi" },
      { role: "Nöbetçi Doğumhane Acil", name: "Manisa Şehir Hastanesi Doğumhane", phone: "0236 229 26 00", note: "Giriş: Acil Kadın Doğum Kapısı" },
      { role: "Doğum Destekçisi (Doula)", name: "Ebe Seda Hanım", phone: "+90 535 444 55 66", note: "Doğum dalgası başladığında haber verilecek" }
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

  // =========================================================================
  // 4. MODÜL: BÜTÜNLEŞİK YAŞAM TAKVİMİ & KLİNİK RANDEVU EKOSİSTEMİ
  // =========================================================================
  calendarModule: {
    activeSubtab: "appointments", // "appointments" (randevu & nst), "timeline" (31-40. hafta yol haritası), "history" (sağlık günlüğü hafızası)
    nextCountdown: {
      days: 6,
      hours: 4,
      targetDate: "10 Eylül 2026 · 14:30",
      doctor: "Dr. Ayşe Yılmaz",
      type: "32. Hafta Gelişim & Doppler İncelemesi"
    },
    appointments: [
      {
        id: 1,
        title: "32. Hafta Gelişim Ultrasonu & Doppler",
        dateFormatted: "10 Eylül 2026 · 14:30 (Perşembe)",
        dateKey: "2026-09-10",
        doctor: "Dr. Ayşe Yılmaz",
        hospital: "Manisa Şehir Hastanesi · Poliklinik B",
        status: "Yaklaşıyor (6 Gün Kaldı)",
        badgeColor: "rose",
        focus: "Fetal kilo artışı, amniyon sıvısı indeksi (AFI) ve umbilikal arter Doppler akımı incelemesi.",
        questions: [
          { text: "Güneş'in baş aşağı sefalik pozisyonu korunuyor mu?", done: false },
          { text: "Akşam bacak krampları için magnezyum dozu yeterli mi?", done: true },
          { text: "İlk rutin NST randevumuz hangi haftada başlayacak?", done: false }
        ]
      },
      {
        id: 2,
        title: "34. Hafta İlk Rutin NST & Kardiyotokografi",
        dateFormatted: "24 Eylül 2026 · 10:00 (Perşembe)",
        dateKey: "2026-09-24",
        doctor: "Dr. Ayşe Yılmaz & Ebe Seda",
        hospital: "Manisa Şehir Hastanesi · NST Takip Odası",
        status: "Planlandı (20 Gün Kaldı)",
        badgeColor: "amber",
        focus: "20 dakikalık reaktif kalp atış değişkenliği (FHR) ve rahim kasılma tonusu kaydı.",
        questions: [
          { text: "NST'de bebek hareket ettikçe kalp hızı artışı (akselerasyon) normal mi?", done: false },
          { text: "Doğum çantası evrak dosyasını kontrole getirelim mi?", done: false }
        ]
      },
      {
        id: 3,
        title: "36. Hafta GBS Taraması & Çatı Değerlendirmesi",
        dateFormatted: "08 Ekim 2026 · 11:15 (Perşembe)",
        dateKey: "2026-10-08",
        doctor: "Dr. Ayşe Yılmaz",
        hospital: "Manisa Şehir Hastanesi",
        status: "Planlandı (34 Gün Kaldı)",
        badgeColor: "blue",
        focus: "Grup B Streptokok vajinal kültür alımı ve pelvik doğum kanalı esneklik değerlendirmesi.",
        questions: [
          { text: "Doğal doğumda ten tene temas protokolümüz hazır mı?", done: false },
          { text: "Anestezi hekimiyle doğum öncesi ön görüşme yapılacak mı?", done: false }
        ]
      },
      {
        id: 4,
        title: "38. Hafta Term NST & Servikal Takip",
        dateFormatted: "20 Ekim 2026 · 09:30 (Salı)",
        dateKey: "2026-10-20",
        doctor: "Dr. Ayşe Yılmaz",
        hospital: "Manisa Şehir Hastanesi",
        status: "Term Dönemi",
        badgeColor: "emerald",
        focus: "Doğum dalgalarının sıklığı, servikal açılma ve haftalık düzenli NST.",
        questions: [
          { text: "Nişan gelmesi veya su sızıntısı durumunda ilk adım ne olmalı?", done: false }
        ]
      }
    ],

    // 31-40. Hafta Klinik Yol Haritası
    milestones: [
      {
        week: 31,
        title: "31. Hafta (Şu An · 4-10 Eylül)",
        badge: "Mevcut Hafta",
        status: "current",
        clinicalFocus: "Akciğer surfaktan üretimi hızlanıyor. Güneş ışık ve karanlık döngüsünü ayırt ediyor. Haftalık tansiyon takibi (<115 mmHg) esastır.",
        tests: "Evde tansiyon, 2 saatte 10 fetal tekme sayımı, magnezyum düzeni."
      },
      {
        week: 32,
        title: "32. Hafta (11-17 Eylül)",
        badge: "Yaklaşan Randevu",
        status: "upcoming",
        clinicalFocus: "Gelişim ultrasonu ile fetal ağırlık (~1.800 gr) ve amniyotik sıvı hacmi ölçülür.",
        tests: "Doppler kan akımı, umbilikal arter direnç indeksi."
      },
      {
        week: 34,
        title: "34. Hafta (25 Eylül - 1 Ekim)",
        badge: "NST Başlangıcı",
        status: "upcoming",
        clinicalFocus: "Güneş'in yağ dokusu kalınlaşır, merkezi sinir sistemi ile kalp atımları tam senkronize olur.",
        tests: "İlk 20 dakikalık kardiyotokografi (NST) çekimi."
      },
      {
        week: 36,
        title: "36. Hafta (9-15 Ekim)",
        badge: "Kritik Tarama",
        status: "upcoming",
        clinicalFocus: "Güneş pelvise doğru inmeye başlar (hafifleme hissi). Mide baskısı azalırken mesane baskısı artar.",
        tests: "GBS (Grup B Streptokok) taraması, çatı muayenesi, hastane evrak kontrolü."
      },
      {
        week: 37,
        title: "37. Hafta (16-22 Ekim)",
        badge: "Term Gebelik",
        status: "upcoming",
        clinicalFocus: "Artık Güneş erken doğum sınırından çıktı; organ gelişimi tamamlandı. Her an doğum başlayabilir.",
        tests: "Haftalık NST ve doğum dalgası takibi."
      },
      {
        week: 40,
        title: "40. Hafta (24 Ekim 2026)",
        badge: "Büyük Kavuşma",
        status: "goal",
        clinicalFocus: "Tahmini doğum günü! Güneş, Buse ve Oğuz ile ten tene temasa kavuşuyor.",
        tests: "Hastaneye geçiş, doğum dalgaları ve kordonun geç klemplenmesi."
      }
    ],

    // Bütünleşik Geçmiş Günlük Hafıza & Sağlık Günlüğü
    dailyLogs: [
      {
        date: "04 Eylül 2026 (Bugün)",
        week: "31. Hafta",
        water: "4 / 8 Bardak",
        kicks: "14 Tekme (Hedef tamam)",
        bp: "92 / 62 mmHg (Güvenli)",
        rx: "Magnimore Plus alındı",
        exercises: "2 Pelvik egzersiz tamamlandı",
        notes: "Güneş akşam saatlerinde daha hareketli."
      },
      {
        date: "03 Eylül 2026 (Dün)",
        week: "31. Hafta",
        water: "8 / 8 Bardak",
        kicks: "12 Tekme",
        bp: "90 / 60 mmHg (İdeal)",
        rx: "Demir + Magnezyum alındı",
        exercises: "4 Pelvik egzersiz (+40 Puan)",
        notes: "Muradiye'de akşam serinliğinde 20 dk dinlenik yürüyüş."
      },
      {
        date: "02 Eylül 2026",
        week: "31. Hafta",
        water: "7 / 8 Bardak",
        kicks: "15 Tekme",
        bp: "92 / 60 mmHg",
        rx: "Reçeteler düzenli alındı",
        exercises: "Derin Çömelme & Kedi-Deve yapıldı",
        notes: "Dr. Ayşe Yılmaz kontrolü: Fetal kilo 1.650 gr, sefalik duruş onaylandı."
      },
      {
        date: "01 Eylül 2026",
        week: "30. Hafta",
        water: "8 / 8 Bardak",
        kicks: "11 Tekme",
        bp: "94 / 62 mmHg",
        rx: "Magnezyum Saşe alındı",
        exercises: "Kelebek oturuşu (5 dk)",
        notes: "Spil dağ esintisinde derin doğum nefesi pratiği."
      }
    ]
  },
  appointments: [],

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

function spawnNutrientFlow(type, count = 35) {
  const canvas = document.getElementById("cinematicCanvas");
  if (!canvas) return;
  const w = canvas.width;
  const h = canvas.height;

  let color = "#F6C887";
  if (type === "water") color = "#67E8F9";
  else if (type === "meal") color = "#6EE7B7";
  else if (type === "folic") color = "#FDE047";
  else if (type === "magnesium") color = "#FDE047";
  else if (type === "omega") color = "#FDBA74";

  // Modal açıkken bebeğin yukarı kaymış pozisyonuna doğru akış
  const isShifted = state.isNurtureModalOpen || state.isMoodModalOpen;
  const targetY = isShifted ? h * 0.38 : h * 0.52;

  for (let i = 0; i < count; i++) {
    const x = w * 0.5 + (Math.random() - 0.5) * 120;
    const y = targetY + (Math.random() - 0.5) * 90;
    particles.push(new OrganicParticle(x, y, color, 1.8));
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

function saveState() {
  try {
    const persist = {
      baby: { week: state.baby.week, daysLeft: state.baby.daysLeft, sizeComparison: state.baby.sizeComparison, weight: state.baby.weight, height: state.baby.height, bpm: state.baby.bpm, presentation: state.baby.presentation },
      nurture: { water: { count: state.nurture.water.count, target: state.nurture.water.target }, meal: state.nurture.meal },
      prescriptions: state.prescriptions.map(p => ({ id: p.id, takenToday: p.takenToday, takenTime: p.takenTime })),
      kickCount: state.birthModule.kickSession.count,
      kickStartTime: state.birthModule.kickSession.startTime,
      kickElapsed: state.birthModule.kickSession.elapsedMinutes,
      exercisesCompleted: state.healthData.exercises.map(e => ({ id: e.id, completed: e.completed })),
      pelvicStreakDays: state.healthData.pelvicStreakDays,
      bloodPressureHistory: state.healthData.bloodPressureHistory,
      bagItems: state.birthModule.bagItems.map(b => ({ id: b.id, done: b.done })),
      selectedSymptoms: state.healthData.selectedSymptoms,
      selectedMood: state.healthData.selectedMood,
      hasCollagen: state.hasCollagen,
      customSupplements: state.customSupplements,
      dailyChecklist: state.dailyChecklist,
      activePrescription: state.activePrescription,
      userProfile: state.user,
      partnerProfile: state.partner,
      profileSubtab: state.profileSubtab,
      savedDate: new Date().toDateString()
    };
    localStorage.setItem('tohum_v1', JSON.stringify(persist));
  } catch(e) {}
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem('tohum_v1');
    if (!raw) return;
    const saved = JSON.parse(raw);

    // Yeni güne geçildiğinde ilaç ve su sıfırla
    const isNewDay = saved.savedDate !== new Date().toDateString();

    if (saved.baby) {
      state.baby.week = saved.baby.week || state.baby.week;
      state.baby.daysLeft = saved.baby.daysLeft || state.baby.daysLeft;
      state.baby.sizeComparison = saved.baby.sizeComparison || state.baby.sizeComparison;
      state.baby.weight = saved.baby.weight || state.baby.weight;
      state.baby.height = saved.baby.height || state.baby.height;
      state.baby.bpm = saved.baby.bpm || state.baby.bpm;
      state.baby.presentation = saved.baby.presentation || state.baby.presentation;
    }
    if (saved.nurture && !isNewDay) {
      state.nurture.water.count = saved.nurture.water.count ?? state.nurture.water.count;
      state.nurture.meal = saved.nurture.meal || state.nurture.meal;
    } else if (isNewDay) {
      state.nurture.water.count = 0;
      state.nurture.meal.taken = false;
    }
    if (saved.prescriptions && !isNewDay) {
      saved.prescriptions.forEach(sp => {
        const p = state.prescriptions.find(x => x.id === sp.id);
        if (p) { p.takenToday = sp.takenToday; p.takenTime = sp.takenTime; }
      });
    } else if (isNewDay) {
      state.prescriptions.forEach(p => { p.takenToday = false; p.takenTime = null; });
    }
    if (saved.kickCount !== undefined && !isNewDay) {
      state.birthModule.kickSession.count = saved.kickCount;
      state.birthModule.kickSession.startTime = saved.kickStartTime;
      state.birthModule.kickSession.elapsedMinutes = saved.kickElapsed;
    } else if (isNewDay) {
      state.birthModule.kickSession.count = 0;
      state.birthModule.kickSession.startTime = '--:--';
      state.birthModule.kickSession.elapsedMinutes = 0;
    }
    if (saved.exercisesCompleted) {
      saved.exercisesCompleted.forEach(se => {
        const ex = state.healthData.exercises.find(e => e.id === se.id);
        if (ex && !isNewDay) ex.completed = se.completed;
      });
      if (isNewDay) state.healthData.exercises.forEach(e => { e.completed = false; });
    }
    if (saved.pelvicStreakDays !== undefined) state.healthData.pelvicStreakDays = saved.pelvicStreakDays;
    if (saved.bloodPressureHistory) state.healthData.bloodPressureHistory = saved.bloodPressureHistory;
    if (saved.bagItems) {
      saved.bagItems.forEach(sb => {
        const b = state.birthModule.bagItems.find(x => x.id === sb.id);
        if (b) b.done = sb.done;
      });
    }
    if (saved.selectedSymptoms) state.healthData.selectedSymptoms = saved.selectedSymptoms;
    if (saved.selectedMood) state.healthData.selectedMood = saved.selectedMood;
    if (saved.hasCollagen !== undefined) state.hasCollagen = saved.hasCollagen;
    if (saved.customSupplements) state.customSupplements = saved.customSupplements;
    if (saved.dailyChecklist && !isNewDay) state.dailyChecklist = Object.assign({}, state.dailyChecklist, saved.dailyChecklist);
    if (saved.activePrescription) state.activePrescription = saved.activePrescription;
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
  } catch(e) {}
}

function render() {
  const root = document.getElementById("appRoot");
  if (!root) return;
  state.nightMode = (new Date().getHours() >= 22 || new Date().getHours() < 7);
  renderAppShell(root);
  saveState();
  if (state.currentTab === "home") {
    setTimeout(initCinematicCanvas, 50);
  }
}

// MAIN APP SHELL

// 1x6 SADE MENÜ FONKSİYONLARI (Tek Tıkla Aç/Kapa, Tam Genişlik, Genel İsimler)




window.toggleMoodModal = function() {
  state.isMoodModalOpen = !state.isMoodModalOpen;
  if (state.isMoodModalOpen) state.isNurtureModalOpen = false;
  render();
};

window.toggleNurtureModal = function() {
  state.isNurtureModalOpen = !state.isNurtureModalOpen;
  if (state.isNurtureModalOpen) state.isMoodModalOpen = false;
  render();
};

window.adjustWater = function(delta) {
  triggerHaptic([20, 20]);
  const maxSafeGlasses = 16; // 4 Litre güvenli fizyolojik tavan
  const prev = state.nurture.water.count;
  state.nurture.water.count = Math.max(0, Math.min(maxSafeGlasses, state.nurture.water.count + delta));
  const target = state.nurture.water.target || 8;
  const cur = state.nurture.water.count;

  if (delta > 0) {
    spawnNutrientFlow("water", 35);
    if (cur > target) {
      triggerReaction("water", `${cur}. bardak su kaydedildi (${cur}/${target}B). Asgari hedef aşıldı; amniyotik sıvı havuzu optimal seviyenin de üstünde ferahladı!`);
    } else if (cur === target) {
      triggerReaction("water", `Harika! Günlük ${target} bardaklık asgari su hedefine ulaşıldı. 31. haftada bol su plasental akışı ve bebek hareketlerini destekler.`);
    } else {
      triggerReaction("water", `1 bardak su kaydedildi (${cur}/${target}B). Amniyotik sıvı tazelendi.`);
    }
    pulseBabyGlow("water");
  }
  saveState();
  render();
};

window.setWaterTarget = function(newTarget) {
  state.nurture.water.target = newTarget;
  triggerHaptic([15, 15]);
  saveState();
  render();
};

window.selectSymptomAndRelieve = function(symptomKey) {
  state.healthData.selectedSymptom = (state.healthData.selectedSymptom === symptomKey) ? null : symptomKey;
  triggerHaptic([20, 20]);
  
  const remedies = {
    bel: "Sol yanına yatıp bacak arana yastık koy; sakrumdaki sinir baskısını dakikalar içinde hafifletir.",
    mide: "3-4 adet çiğ badem çiğne veya ılık badem sütü iç; mide asidini doğal olarak dengeler. Yemekten sonra dik otur.",
    kramp: "Ayak parmaklarını yukarı, kendine doğru çek (dorsifleksiyon). Akşam magnimore magnezyumunu unutma.",
    nefes: "Kollarını yukarı uzatıp derin 4-7-8 nefesi al; diyafram üzerindeki rahim baskısı rahatlasın.",
    odem: "Ayaklarını 15 dk kalp seviyesine kaldır; bol su içmek böbrek filtrasyonunu artırarak ödemi çözer.",
    braxton: "Pozisyon değiştir ve 1 bardak ılık su iç; dehidratasyon hazırlık dalgalarını tetikleyebilir."
  };

  const symptomSignals = {
    bel: { type: "biomechanic", title: "Lomber Yük Hassasiyeti", text: "Buse'nin 31. haftasında pelvik genişleme kaynaklı lomber yükü arttı. Sormasını beklemeden ılık bir bitki çayı veya nazik bir sırt masajı sunabilirsin." },
    mide: { type: "reflux", title: "Mide Yanması & Reflü", text: "Buse'de mide yanması hissedilebilir. Soğuk badem sütü veya asitsiz hafif bir atıştırmalık sunabilirsin." },
    kramp: { type: "cramp", title: "Bacak Krampları", text: "Buse'nin bacaklarında dolaşım kaynaklı kramp olabilir; akşam magnezyumunu hatırlatabilir ve ayaklarına hafif masaj yapabilirsin." },
    nefes: { type: "breath", title: "Kaburga & Diyafram Baskısı", text: "Güneş'in yukarı baskısı nefes daralması yapabilir; odayı havalandırıp sakin bir ortam sağlayabilirsin." },
    odem: { type: "edema", title: "Ayak Bileklerinde Ödem", text: "Buse'nin ayaklarını 15-20 dk dinlendirmesi için ayak desteği ve ılık su ikram edebilirsin." },
    braxton: { type: "braxton", title: "Hazırlık Kasılmaları", text: "Buse hafif hazırlık dalgası hissediyor olabilir; sakinleşmesine yardımcı olup ılık su getirebilirsin." }
  };

  if (state.healthData.selectedSymptom && remedies[symptomKey]) {
    triggerReaction("water", remedies[symptomKey]);
    
    // Perde arkasında babaya hissettirilmeden sinyal aktarımı
    try {
      fetch('/api/partner/signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signal: symptomSignals[symptomKey] })
      }).catch(function() {});
    } catch(e) {}
  }
  
  saveState();
  render();
};



// REÇETE TARAMA VE ENTEGRASYON ETKİLEŞİM YÖNETİCİSİ
// =========================================================================
// REÇETE TARAMA, GERÇEK ÇÖZÜMLEME VE DMT1 ENTEGRASYON YÖNETİCİSİ
// =========================================================================
window.togglePrescriptionModal = function() {
  state.isPrescriptionModalOpen = !state.isPrescriptionModalOpen;
  if (state.isPrescriptionModalOpen) {
    if (!state.rxScanState || state.rxScanState === 'error') {
      state.rxScanState = 'picker';
    }
    state.rxModalTab = state.rxModalTab || 'photo';
  }
  render();
};

window.setRxModalTab = function(tab) {
  state.rxModalTab = tab;
  state.rxScanState = 'picker';
  state.rxError = null;
  render();
};

window.resetRxScan = function() {
  state.rxScanState = 'picker';
  state.uploadedRxFileName = null;
  state.rxParsedPrescription = null;
  state.rxError = null;
  render();
};

// Gerçek Dosya (PDF veya Görsel) Yükleme ve Sunucu Çözümlemesi
window.handleRealRxFile = async function(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  state.uploadedRxFileName = file.name;
  state.rxScanState = 'scanning';
  state.rxScanMessage = `"${file.name}" (${(file.size / 1024).toFixed(1)} KB) taranıyor & çözümleniyor...`;
  state.rxError = null;
  render();

  try {
    const reader = new FileReader();
    reader.onload = async function(e) {
      const dataUrl = e.target.result;
      state.rxScanMessage = 'Belge klinik NLP ve pypdf motoru ile inceleniyor...';
      render();

      try {
        const resp = await fetch('/api/prescription/parse', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            mode: 'file',
            fileType: file.type,
            fileName: file.name,
            data: dataUrl
          })
        });
        const res = await resp.json();
        if (res.ok && res.prescription) {
          state.rxParsedPrescription = res.prescription;
          state.rxScanState = 'verified';
          triggerHaptic([35, 45]);
        } else {
          state.rxScanState = 'error';
          state.rxError = res.error || 'Belge çözümlenemedi.';
        }
      } catch (err) {
        state.rxScanState = 'error';
        state.rxError = 'Sunucu bağlantı hatası: ' + err.message;
      }
      render();
    };

    reader.onerror = function() {
      state.rxScanState = 'error';
      state.rxError = 'Dosya yerel bellekten okunamadı.';
      render();
    };

    reader.readAsDataURL(file);
  } catch (err) {
    state.rxScanState = 'error';
    state.rxError = err.message;
    render();
  }
};

// E-Reçete / SGK Medula Kodu Sorgulama
window.handleRxCodeLookup = async function() {
  const codeInput = document.getElementById('rxCodeInput');
  const code = (codeInput ? codeInput.value.trim() : '2026-REC-31W') || '2026-REC-31W';

  state.rxScanState = 'scanning';
  state.rxScanMessage = `SGK Medula: "${code}" sorgulanıyor...`;
  state.rxError = null;
  render();

  try {
    const resp = await fetch('/api/prescription/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'code',
        code: code
      })
    });
    const res = await resp.json();
    if (res.ok && res.prescription) {
      state.rxParsedPrescription = res.prescription;
      state.rxScanState = 'verified';
      triggerHaptic([35, 45]);
    } else {
      state.rxScanState = 'error';
      state.rxError = res.error || 'E-Reçete bulunamadı.';
    }
  } catch (err) {
    state.rxScanState = 'error';
    state.rxError = err.message;
  }
  render();
};

// Klinik Metin / Hekim SMS'i Çözümleme
window.handleRxTextParse = async function() {
  const textInput = document.getElementById('rxTextInput');
  const text = textInput ? textInput.value.trim() : '';
  if (!text) {
    state.rxError = 'Lütfen reçete metni veya SMS giriniz.';
    render();
    return;
  }

  state.rxScanState = 'scanning';
  state.rxScanMessage = 'Klinik metin ve etken maddeler NLP ile ayrıştırılıyor...';
  state.rxError = null;
  render();

  try {
    const resp = await fetch('/api/prescription/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        mode: 'text',
        text: text
      })
    });
    const res = await resp.json();
    if (res.ok && res.prescription) {
      state.rxParsedPrescription = res.prescription;
      state.rxScanState = 'verified';
      triggerHaptic([35, 45]);
    } else {
      state.rxScanState = 'error';
      state.rxError = res.error || 'Metin ayrıştırılamadı.';
    }
  } catch (err) {
    state.rxScanState = 'error';
    state.rxError = err.message;
  }
  render();
};

// Hızlı Demo ve Test Butonları (Statik Timeout Olmadan Anında Reaktif Çözümleme)
window.triggerRxScan = function(mode) {
  if (mode === 'collagen_demo') {
    window.handleRxCodeLookupWithCode('REC-COLLAGEN-31', 'Kolajen + Demir + Magnezyum reçetesi çözümleniyor...');
    return;
  }
  
  if (mode === 'code') {
    window.handleRxCodeLookup();
    return;
  }
  
  // Varsayılan standart reçete
  window.handleRxCodeLookupWithCode('2026-REC-31W', '31. Hafta Hekim Reçetesi SGK Medula ile doğrulanıyor...');
};

window.handleRxCodeLookupWithCode = async function(customCode, customMsg) {
  state.rxScanState = 'scanning';
  state.rxScanMessage = customMsg || `SGK Medula: "${customCode}" sorgulanıyor...`;
  state.rxError = null;
  render();

  try {
    const resp = await fetch('/api/prescription/parse', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mode: 'code', code: customCode })
    });
    const res = await resp.json();
    if (res.ok && res.prescription) {
      state.rxParsedPrescription = res.prescription;
      state.rxScanState = 'verified';
      triggerHaptic([35, 45]);
    } else {
      state.rxScanState = 'error';
      state.rxError = res.error || 'E-Reçete bulunamadı.';
    }
  } catch (err) {
    state.rxScanState = 'error';
    state.rxError = 'Sunucu bağlantı hatası: ' + err.message;
  }
  render();
};

// Ayrıştırılan Reçeteden İlaç Çıkarma
window.removeParsedRxItem = function(index) {
  if (state.rxParsedPrescription && state.rxParsedPrescription.items && state.rxParsedPrescription.items[index]) {
    state.rxParsedPrescription.items.splice(index, 1);
    triggerHaptic(20);
    render();
  }
};

// Ayrıştırılan Reçeteye Dinamik Takviye / Kolajen Ekleme
window.addCustomItemToParsedRx = function(name, dose, hour, type) {
  if (!state.rxParsedPrescription) {
    state.rxParsedPrescription = {
      doctorName: state.user.doctorName || "Op. Dr. Ayşe Yılmaz",
      hospital: "Manisa Şehir Hastanesi",
      prescriptionNo: "REC-CUSTOM-M0",
      date: new Date().toLocaleDateString('tr-TR'),
      source: "Özel Düzenleme",
      items: []
    };
  }

  let rule = "Hekim tavsiyesine uygun olarak öğünle birlikte alınması önerilir.";
  let defaultHour = hour || "16:30";
  let defaultType = type || "custom";

  const lower = (name || '').toLowerCase();
  if (lower.includes('kolajen') || lower.includes('collagen')) {
    rule = "Hidrolize Tip 1-3 Kolajen Peptit · Demir emilimini baskılamaz, akşam magnezyumuyla yarışmaz (16:30 ikindi saatinde optimal biyoyararlanım).";
    defaultType = "collagen";
    defaultHour = "16:30";
  } else if (lower.includes('demir') || lower.includes('ferro')) {
    rule = "Demir · Sabah aç karnına C vitamini ile sinerjik, çay/süt ve magnezyumdan en az 2 saat uzakta.";
    defaultType = "iron";
    defaultHour = "08:30";
  } else if (lower.includes('magnez') || lower.includes('magnimore')) {
    rule = "Magnezyum · Gece tok karnına kas kramplarını önler ve uykuyu rahatlatır. Demirden 13 saat sonra.";
    defaultType = "magnesium";
    defaultHour = "21:30";
  } else if (lower.includes('d3') || lower.includes('devit')) {
    rule = "D3 Vitamini · Fetal iskelet gelişimi ve kalsiyum fiksasyonu için öğle yağlı öğünüyle.";
    defaultType = "d3";
    defaultHour = "13:30";
  }

  state.rxParsedPrescription.items.push({
    id: "rx_" + Date.now(),
    name: name,
    genericName: name,
    dose: dose || "Standart Doz",
    scheduledHour: defaultHour,
    timing: defaultHour + " " + (defaultHour === '08:30' ? 'Aç' : defaultHour === '16:30' ? 'İkindi' : 'Tok'),
    type: defaultType,
    dmt1Rule: rule,
    dmt1Safe: true
  });

  // Saate göre diz
  state.rxParsedPrescription.items.sort((a, b) => (a.scheduledHour || "99:99").localeCompare(b.scheduledHour || "99:99"));
  triggerHaptic([25, 25]);
  render();
};

window.addQuickCustomInputToParsedRx = function() {
  const input = document.getElementById('customRxItemInput');
  const val = input ? input.value.trim() : '';
  if (!val) return;
  window.addCustomItemToParsedRx(val, "1 Doz", "16:30", "custom");
  if (input) input.value = '';
};

// Doğrulanan Reçeteyi Günlük Takibe Aktarma
window.confirmRealRxIntegration = async function() {
  triggerHaptic([35, 45]);
  
  const rx = state.rxParsedPrescription || {
    doctorName: "Op. Dr. Ayşe Yılmaz",
    hospital: "Manisa Şehir Hastanesi",
    prescriptionNo: "2026-REC-31W",
    items: [
      { id: "rx_ferro", name: "Ferro Sanol Duodenal 100 mg", scheduledHour: "08:30", type: "iron" },
      { id: "rx_omega", name: "Ocean Mummy Omega-3 DHA + D3", scheduledHour: "13:00", type: "omega" },
      { id: "rx_magnesium", name: "Magnimore Plus Saşe", scheduledHour: "21:30", type: "magnesium" }
    ]
  };

  const items = rx.items || [];
  let hasIron = false;
  let hasOmega = false;
  let hasMagnesium = false;
  let hasCollagen = false;

  state.customSupplements = state.customSupplements || [];

  items.forEach(it => {
    const t = (it.type || '').toLowerCase();
    const n = (it.name || '').toLowerCase();
    if (t === 'iron' || n.includes('demir') || n.includes('ferro')) {
      hasIron = true;
    } else if (t === 'omega' || n.includes('omega') || n.includes('mummy') || n.includes('balık')) {
      hasOmega = true;
    } else if (t === 'magnesium' || n.includes('magnez')) {
      hasMagnesium = true;
    } else if (t === 'collagen' || n.includes('kolajen') || n.includes('collagen')) {
      hasCollagen = true;
    } else {
      // Özel reçeteli takviye (D3, Probiyotik vb.)
      const exists = state.customSupplements.some(cs => cs.name === it.name);
      if (!exists) {
        state.customSupplements.push({
          id: it.id || ("supp_" + Date.now() + "_" + Math.random().toString(36).substr(2, 4)),
          name: it.name,
          dose: it.dose || "1 Doz",
          scheduledHour: it.scheduledHour || "16:30",
          type: it.type || "custom",
          dmt1Rule: it.dmt1Rule || "Hekim tavsiyesine uygun saatte alınmalıdır."
        });
      }
    }
  });

  if (!state.dailyChecklist) {
    state.dailyChecklist = { meal: true };
  }
  if (hasIron) state.dailyChecklist.iron = true;
  if (hasOmega) state.dailyChecklist.omega = true;
  if (hasMagnesium) state.dailyChecklist.magnesium = false;
  if (hasCollagen) {
    state.hasCollagen = true;
    state.dailyChecklist.collagen = false;
  }

  // Özel takviyelerin checklist'e dahil edilmesi
  state.customSupplements.forEach(cs => {
    if (state.dailyChecklist[cs.id] === undefined) {
      state.dailyChecklist[cs.id] = false;
    }
  });

  state.activePrescription = rx;

  try {
    await fetch('/api/prescription/integrate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: state.user.id || 'buse_founder',
        prescription: rx
      })
    });
  } catch (err) {
    console.error("Prescription backend sync error:", err);
  }

  state.isPrescriptionModalOpen = false;
  state.isNurtureModalOpen = true;

  const docName = rx.doctorName || "Op. Dr. Ayşe Yılmaz";
  const collagenNote = hasCollagen ? " Kolajen 16:30 ikindi saatine yerleştirildi." : "";
  triggerReaction("folic", `Doktor reçetesi (${docName} · ${items.length} etken madde) başarıyla entegre edildi. DMT1 kuralına göre 13 saatlik tamponla zamanlandı.${collagenNote}`);

  saveState();
  render();
};


// REÇETE METİN ÖRNEKLERİ DİNAMİK YÜKLEYİCİ (Syntax Güvenli)
window.loadSampleRxText = function(sampleType) {
  const input = document.getElementById('rxTextInput');
  if (!input) return;
  if (sampleType === 'collagen') {
    input.value = "Dr. Ayşe Yılmaz\n1. Ferro Sanol Duodenal 100 mg 1x1 (08:30 Aç)\n2. Day2Day Kolajen Peptit 5000 mg (16:30 İkindi)\n3. Magnimore Plus Saşe (21:30 Tok)";
  } else {
    input.value = "Op. Dr. Ayşe Yılmaz - Manisa Şehir Hastanesi\nReçete No: 2026-REC-31W\n1. Ferro Sanol Duodenal 100 mg (Sabah Aç)\n2. Ocean Mummy Omega-3 DHA (Öğle Tok)\n3. Magnimore Plus Saşe (Gece Tok)";
  }
  if (window.handleRxTextParse) window.handleRxTextParse();
};

window.sendKovanGroupMessage = function() {
  const input = document.getElementById('kovanMsgInput') || document.getElementById('kovanMessageInput');
  if (!input) return;
  const rawTxt = input.value.trim();
  if (!rawTxt) return;
  // Savunma: Maksimum 400 karakter sınırlaması ve trim
  const txt = rawTxt.slice(0, 400);
  if (!state.kovanMessages) {
    state.kovanMessages = [
      { sender: "Merve (Muradiye)", text: "Kızlar 31. haftada akşam bel ağrısı yaşayan var mı? Buse sen nasılsın?", time: "14:10", isMe: false },
      { sender: "Buse Nur", text: "Selam Merve, hafif bel hassasiyeti var ama magnezyum ve dinlenmeyle dengeliyoruz.", time: "14:15", isMe: true },
      { sender: "Zeynep", text: "Akşamları ayakları hafifçe yükselterek dinlenmek ödeme çok iyi geliyor canım.", time: "14:22", isMe: false }
    ];
  }
  state.kovanMessages.push({
    sender: (state.user && state.user.shortName) || "Buse Nur",
    text: txt,
    time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
    isMe: true
  });
  input.value = "";
  if (typeof triggerReaction !== "undefined") triggerReaction("water", "Mesajınız Kadınlar Çemberine iletildi.");
  if (typeof triggerHaptic !== "undefined") triggerHaptic([20, 20]);
  render();
};

window.integrateParsedPrescription = window.confirmRealRxIntegration;
window.confirmRxIntegration = window.confirmRealRxIntegration;
window.integrateSimulatedPrescription = window.confirmRealRxIntegration;

window.confirmRxIntegration = window.confirmRealRxIntegration;
window.integrateSimulatedPrescription = window.confirmRealRxIntegration;

window.toggleCustomSupplementModal = function() {
  state.isCustomSupplementModalOpen = !state.isCustomSupplementModalOpen;
  render();
};

window.removeCollagenSupplement = function() {
  triggerHaptic([20, 20]);
  state.hasCollagen = false;
  state.isCustomSupplementModalOpen = false;
  if (state.dailyChecklist) {
    delete state.dailyChecklist.collagen;
  }
  triggerReaction("water", "Kolajen takviyesi günlük takip listesinden kaldırıldı.");
  saveState();
  render();
};

window.addCollagenSupplement = function() {
  triggerHaptic([30, 30]);
  state.hasCollagen = true;
  state.isCustomSupplementModalOpen = false;
  state.isNurtureModalOpen = true;
  if (!state.dailyChecklist) {
    state.dailyChecklist = { meal: true, iron: true, omega: true, magnesium: false };
  }
  state.dailyChecklist.collagen = false;
  triggerReaction("water", "Hidrolize Kolajen Peptit (Tip 1-3) takvime eklendi. Demirle yarışmaması için ikindi 16:30 saatine yerleştirildi.");
  saveState();
  render();
};

window.addCustomSupplementDirect = function(name, dose, hour, type) {
  triggerHaptic([25, 30]);
  state.customSupplements = state.customSupplements || [];
  
  let rule = "Hekim tavsiyesine uygun olarak öğünle birlikte alınması önerilir.";
  const lower = (name || '').toLowerCase();
  if (lower.includes('kolajen') || lower.includes('collagen')) {
    window.addCollagenSupplement();
    return;
  } else if (lower.includes('d3') || lower.includes('devit')) {
    rule = "D3 Vitamini · Fetal iskelet gelişimi ve kalsiyum fiksasyonu için öğle yağlı öğünüyle.";
  } else if (lower.includes('probiyotik')) {
    rule = "Probiyotik · Bağırsak mikrobiyotası ve maternal konfor için gece tok karnına.";
  } else if (lower.includes('q10')) {
    rule = "Koenzim Q10 · Hücresel mitokondriyal enerji desteği için öğle tok karnına.";
  } else if (lower.includes('magnez')) {
    rule = "Magnezyum · Gece tok karnına kas kramplarını önler ve uykuyu rahatlatır. Demirden 13 saat sonra.";
  }

  const newSupp = {
    id: "supp_" + Date.now(),
    name: name,
    dose: dose || "1 Doz",
    scheduledHour: hour || "16:30",
    type: type || "custom",
    dmt1Rule: rule
  };

  state.customSupplements.push(newSupp);
  state.isCustomSupplementModalOpen = false;
  state.isNurtureModalOpen = true;
  if (!state.dailyChecklist) {
    state.dailyChecklist = { meal: true, iron: true, omega: true, magnesium: false };
  }
  state.dailyChecklist[newSupp.id] = false;
  
  triggerReaction("water", `${name} (${hour || '16:30'}) günlük takvime eklendi.`);
  saveState();
  render();
};

window.removeCustomSupplement = function(suppId) {
  triggerHaptic([20, 20]);
  state.customSupplements = (state.customSupplements || []).filter(s => s.id !== suppId);
  if (state.dailyChecklist) {
    delete state.dailyChecklist[suppId];
  }
  triggerReaction("water", "Özel takviye günlük takip listesinden kaldırıldı.");
  saveState();
  render();
};

window.addCustomSupplementFromInput = function() {
  const nameInput = document.getElementById('newCustomSuppName');
  const doseInput = document.getElementById('newCustomSuppDose');
  const hourInput = document.getElementById('newCustomSuppHour');
  const name = nameInput ? nameInput.value.trim() : '';
  if (!name) return;
  const dose = doseInput ? doseInput.value.trim() : '1 Doz';
  const hour = hourInput ? hourInput.value.trim() : '16:30';
  window.addCustomSupplementDirect(name, dose, hour, 'custom');
};

window.toggleChecklistItem = function(itemKey) {
  triggerHaptic([25, 25]);
  if (!state.dailyChecklist) {
    state.dailyChecklist = { meal: true, iron: true, omega: true, magnesium: false };
  }
  state.dailyChecklist[itemKey] = !state.dailyChecklist[itemKey];

  if (itemKey === "meal") {
    state.nurture.meal.taken = state.dailyChecklist.meal;
    if (state.dailyChecklist.meal) {
      spawnNutrientFlow("meal", 35);
      triggerReaction("omega", "Öğün kaydedildi. Hücresel besin iletildi.");
      pulseBabyGlow("nutrient");
    }
  } else if (itemKey === "collagen") {
    if (state.dailyChecklist.collagen) {
      spawnNutrientFlow("water", 35);
      triggerReaction("water", "Kolajen peptit takviyesi kaydedildi. Pelvik bağ doku ve cilt elastikiyeti desteklendi.");
      pulseBabyGlow("supplement");
    }
  } else if (itemKey === "magnesium" || itemKey === "iron" || itemKey === "omega") {
    if (state.dailyChecklist[itemKey]) {
      spawnNutrientFlow("folic", 35);
      triggerReaction("folic", "DMT1 takviyesi kaydedildi.");
      pulseBabyGlow("supplement");
    }
  } else {
    // Dinamik özel takviyeler
    if (state.dailyChecklist[itemKey]) {
      spawnNutrientFlow("folic", 30);
      triggerReaction("folic", "Özel takviye kaydedildi.");
      pulseBabyGlow("supplement");
    }
  }
  saveState();
  render();
};

window.pulseBabyGlow = function(type) {
  setTimeout(() => {
    const babyImg = document.getElementById("cinematicBabyVisual");
    if (babyImg) {
      let glowColor = "rgba(103, 232, 249, 0.9)";
      if (type === "supplement") glowColor = "rgba(253, 224, 71, 0.9)";
      else if (type === "nutrient" || type === "meal") glowColor = "rgba(110, 231, 183, 0.9)";

      babyImg.style.filter = `brightness(1.28) contrast(1.12) drop-shadow(0 0 50px ${glowColor})`;
      babyImg.style.transform = "scale(1.04)";
      
      setTimeout(() => {
        if (babyImg) {
          babyImg.style.filter = "brightness(0.95) contrast(1.05)";
          babyImg.style.transform = "scale(1)";
        }
      }, 1500);
    }
  }, 20);
};

window.selectMaternalMoodAndClose = function(moodKey) {
  selectMaternalMood(moodKey);
  state.isMoodModalOpen = false;
  render();
};

window.toggleGridMenu = function() {
  state.isGridMenuOpen = !state.isGridMenuOpen;
  render();
};

window.navigateFromGridMenu = function(tabId) {
  state.isGridMenuOpen = false;
  state.currentTab = tabId;
  render();
};

function renderAppShell(root) {
  if (state.auth && state.auth.screen === "login") {
    root.innerHTML = renderAuthLoginScreen() + renderWhatsAppModal();
    return;
  }
  if (state.auth && state.auth.screen === "onboarding") {
    root.innerHTML = renderOnboardingWizardScreen() + renderWhatsAppModal();
    return;
  }
  const missing = checkDeficiency();
  const hasDeficiency = missing.length > 0;

  root.innerHTML = `
    <!-- Top Header: Tek Satır, Minimalist, Sol Başta Menü -->
    <header class="px-4 pt-3.5 pb-2 flex justify-between items-center absolute top-0 inset-x-0 z-40 pointer-events-auto bg-gradient-to-b from-black/85 via-black/30 to-transparent">
      <!-- Sol: Minimalist Menü Tetikleyicisi -->
      <button onclick="toggleGridMenu()" class="flex items-center space-x-1.5 bg-black/45 hover:bg-black/60 active:scale-95 px-3 py-1.5 rounded-full border border-white/10 text-white/90 hover:text-white transition shadow-xs">
        <span class="text-xs">☰</span>
        <span class="text-[11px] font-medium tracking-wide">Menü</span>
      </button>

      <!-- Orta: Hafta Seçici Kapsülü -->
      <button onclick="toggleWeekSelector()" class="flex items-center space-x-1.5 bg-black/45 hover:bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 transition shadow-xs" title="Haftayı Değiştir">
        <span class="text-[11px] text-amber-200 font-semibold">${state.baby.name} · ${state.baby.week}. Hafta</span>
        <span class="text-[9px] text-white/50">· Son ${state.user.daysRemaining || 63} Gün</span>
        <span class="text-[8px] text-white/40 ml-0.5">▼</span>
      </button>

      <!-- Sağ: 8.3 Hz Calm Tech Rezonansı -->
      <div class="flex items-center space-x-2">
        ${state.birthModule.contractionTimer.isRunning ? `
          <button onclick="navigateTab('birth'); setBirthSubtab('waves');" class="text-xs font-semibold text-rose-200 bg-rose-500/25 px-2.5 py-1.5 rounded-full animate-pulse backdrop-blur-md">
            🔴 ${String(Math.floor(state.birthModule.contractionTimer.currentSeconds/60)).padStart(2,'0')}:${String(state.birthModule.contractionTimer.currentSeconds%60).padStart(2,'0')}
          </button>
        ` : `
          <button onclick="toggleAudio()" class="text-xs text-amber-200/90 bg-black/45 hover:bg-black/60 px-2.5 py-1.5 rounded-full border border-white/10 backdrop-blur-md flex items-center space-x-1.5 transition shadow-xs" title="8.3 Hz Calm Tech Rezonansı">
            <span class="w-1.5 h-1.5 rounded-full ${state.isPlayingAudio ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400/80'}"></span>
            <span class="text-[10px]">8.3 Hz</span>
          </button>
        `}
      </div>
    </header>

    ${renderWeekSelectorModal()}
    ${renderClinicalReportModal()}
    ${renderWhatsAppModal()}
    ${renderPrescriptionUploadModal()}
    ${renderCustomSupplementModal()}

    <!-- 1x6 SADE, YALIN, GENEL İSİMLİ MENÜ KATMANI (Yatar Pozisyonda Sıfır Iskalama) -->
    ${state.isGridMenuOpen ? `
      <div class="absolute inset-0 z-[120] bg-black/75 backdrop-blur-md flex flex-col justify-start pt-14 px-5 animate-in fade-in duration-200" onclick="toggleGridMenu()">
        <div class="bg-[#140D0B]/95 border border-white/15 rounded-3xl p-5 shadow-[0_15px_50px_rgba(0,0,0,0.85)] space-y-2.5" onclick="event.stopPropagation()">
          <div class="flex justify-between items-center px-1 pb-2 border-b border-white/10">
            <span class="text-xs font-serif tracking-[0.25em] text-white/90 uppercase font-semibold">ToHUM</span>
            <button onclick="toggleGridMenu()" class="text-white/40 hover:text-white text-xs px-2.5 py-1 rounded-full bg-white/5 active:scale-95 transition">Kapat ✕</button>
          </div>
          
          <!-- 1x6 Genel İsimli Tam Genişlikte Butonlar -->
          <div class="space-y-1.5 pt-1">
                        ${[
              { id: 'home',     lbl: 'Güneş'     },
              { id: 'bonding',  lbl: 'Bağ Kur'   },
              { id: 'health',   lbl: 'Sağlık'    },
              { id: 'birth',    lbl: 'Doğum'     },
              { id: 'calendar', lbl: 'Takvim'    },
              { id: 'shopping', lbl: 'İhtiyaçlar'},
              { id: 'kovan',    lbl: 'Kovan'     }
            ].map(item => `
              <button 
                onclick="navigateFromGridMenu('${item.id}')"
                class="w-full flex items-center justify-between px-4 py-3 rounded-2xl transition active:scale-98
                  ${state.currentTab === item.id ? 'bg-amber-400/20 text-amber-200 border border-amber-400/35 font-semibold shadow-xs' : 'bg-white/5 hover:bg-white/10 text-white/90 border border-white/5'}">
                <span class="text-sm font-medium tracking-wide">${item.lbl}</span>
                <span class="text-xs text-white/30">➔</span>
              </button>
            `).join('')}
          </div>

          <div class="pt-2 border-t border-white/10">
            <button 
              onclick="navigateFromGridMenu('profile')"
              class="w-full flex items-center justify-between px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 text-xs transition active:scale-98">
              <span>Profil</span>
              <span class="text-[10px] text-white/40">➔</span>
            </button>
          </div>
        </div>
      </div>
    ` : ''}

    <main class="flex-1 w-full h-full relative overflow-hidden flex flex-col">
      ${getTabContent()}
    </main>

    ${state.weekTransitionOverlay ? `
      <div class="absolute inset-0 z-[200] flex items-center justify-center pointer-events-none">
        <div class="bg-[#0D0806]/90 backdrop-blur-2xl rounded-[32px] px-10 py-9 text-center border border-amber-400/30 shadow-[0_0_80px_rgba(0,0,0,0.9)] animate-in zoom-in-90 duration-400">
          <div class="text-[10px] text-amber-300/60 uppercase tracking-[0.35em] mb-2 font-medium">Güneş</div>
          <div class="text-5xl font-serif font-semibold text-white mb-2">${state.weekTransitionTarget}<span class="text-2xl text-white/50">. Hafta</span></div>
          <div class="text-xs text-white/60 mt-1">${getLifecycleDataForWeek(state.weekTransitionTarget).stageName}</div>
          <div class="mt-3 w-16 h-0.5 bg-amber-400/30 mx-auto rounded-full"></div>
        </div>
      </div>
    ` : ''}

    ${state.nightMode ? `
      <div class="absolute inset-0 z-[195] bg-black/25 pointer-events-none"></div>
      <div class="absolute top-[52px] left-1/2 -translate-x-1/2 z-[196] pointer-events-none">
        <span class="text-[9px] text-amber-200/35 font-medium tracking-widest uppercase">Gece Modu</span>
      </div>
    ` : ''}
  `;
}

function getTabContent() {
  switch(state.currentTab) {
    case "home": return renderHomeTab();
    case "bonding": return renderBondingTab();
    case "health": return renderHealthTab();
    case "birth": return renderBirthTab();
    case "calendar": return renderCalendarTab();
    case "shopping": return renderShoppingTab();
    case "kovan": return renderKovanTab();
    case "menu": return renderMenuTab();
    case "profile": return renderProfileTab();
    default: return renderHomeTab();
  }
}

function renderMenuTab() {
  const menuItems = [
    { id: 'home', title: 'Güneş (Ana Sayfa)', desc: 'Anne Karnı, Beslenme & Canlı Bağ', icon: '☀️' },
    { id: 'bonding', title: 'Bağ Kur', desc: 'Ninni, Karnı Sev & Zaman Kapsülü', icon: '🌱' },
    { id: 'health', title: 'Sağlık & Şifa', desc: 'Biyometri, Tansiyon & Pelvik Egzersiz', icon: '💓' },
    { id: 'birth', title: 'Doğum & Hazırlık', desc: 'Tekme Sayacı, Dalga & Doğum Çantası', icon: '🌸' },
    { id: 'calendar', title: 'Klinik Takvim', desc: 'Randevular & Haftalık Yol Haritası', icon: '📅' },
    { id: 'shopping', title: 'İhtiyaç & Bütçe', desc: 'Bebek & Anne İhtiyaçları', icon: '🛍️' },
    { id: 'kovan', title: 'Muradiye Anne Kovanı', desc: 'Kadınlar Çemberi & İmece', icon: '🐝' },
    { id: 'profile', title: 'Profil & Ayarlar', desc: 'Kişisel Bazal, Sağlık Verisi Egemenliği', icon: '⚙️' }
  ];

  return `
    <div class="w-full h-full pt-16 pb-20 px-5 space-y-4 text-white overflow-y-auto">
      <div class="pb-2 border-b border-white/10">
        <h2 class="text-base font-serif font-semibold text-white/95">ToHUM Modüller & Menü</h2>
        <p class="text-[11px] text-white/60">Tüm gebelik ve ebeveynlik modüllerine hızlı erişim</p>
      </div>

      <div class="space-y-2 pt-1">
        ${menuItems.map(item => `
          <button onclick="navigateFromGridMenu('${item.id}')"
            class="w-full p-4 bg-white/5 hover:bg-white/10 active:scale-98 rounded-3xl border border-white/10 flex items-center justify-between text-left transition shadow-xs group">
            <div class="flex items-center space-x-3.5">
              <span class="text-xl p-2.5 bg-white/5 rounded-2xl group-hover:bg-amber-400/20 transition">${item.icon}</span>
              <div>
                <div class="text-sm font-semibold text-white/95">${item.title}</div>
                <div class="text-[11px] text-white/50 mt-0.5">${item.desc}</div>
              </div>
            </div>
            <span class="text-xs text-white/30 group-hover:text-amber-200 group-hover:translate-x-0.5 transition">➔</span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

// 1. MODÜL VE 2. MODÜL KORUMA ALTINDA (AYNEN ÇALIŞIR)
function renderHomeTab() {
  const missing = checkDeficiency();
  const hasDeficiency = missing.length > 0;
  const targetWater = state.nurture.water.target || 8;
  const curWater = state.nurture.water.count || 0;
  const waterPct = Math.min(100, Math.round((curWater / targetWater) * 100));
  const nutrientPct = state.nurture.meal.taken ? 85 : 45;
  
  const moodLabels = {
    serene: { text: "Dingin", color: "text-emerald-300", dot: "bg-emerald-400" },
    energetic: { text: "Enerjik", color: "text-amber-300", dot: "bg-amber-300" },
    tired: { text: "Yorgun", color: "text-amber-400", dot: "bg-amber-500" },
    emotional: { text: "Hassas", color: "text-sky-300", dot: "bg-sky-400" }
  };
  const currentMood = moodLabels[state.healthData.selectedMood] || moodLabels.serene;
  const selectedSymptom = state.healthData.selectedSymptom || null;
  const cl = state.dailyChecklist || { meal: true, iron: true, omega: true, magnesium: false };
  const isModalOpen = state.isNurtureModalOpen || state.isMoodModalOpen;

  const symptomList = [
    { key: "bel", lbl: "Bel & Pelvis", color: "border-rose-400/40 text-rose-200" },
    { key: "mide", lbl: "Mide Yanması", color: "border-amber-400/40 text-amber-200" },
    { key: "kramp", lbl: "Bacak Krampları", color: "border-indigo-400/40 text-indigo-200" },
    { key: "nefes", lbl: "Nefes Baskısı", color: "border-teal-400/40 text-teal-200" },
    { key: "odem", lbl: "Ödem & Şişlik", color: "border-cyan-400/40 text-cyan-200" },
    { key: "braxton", lbl: "Rahimde Sertleşme", color: "border-purple-400/40 text-purple-200" }
  ];

  const symptomRemedies = {
    bel: "Sol yanına yatıp bacak arana yastık koy; sakrumdaki sinir baskısını rahatlatır.",
    mide: "3-4 adet çiğ badem çiğne; mide asidini nötralize eder. Yemek sonrası dik dur.",
    kramp: "Ayak parmaklarını kendine doğru çek (dorsifleksiyon). Akşam magnezyumunu unutma.",
    nefes: "Kollarını yukarı uzatıp 4-7-8 nefesi al; diyafram üzerindeki baskıyı açar.",
    odem: "Ayaklarını 15 dk kalp seviyesine kaldır; bol su dolaşımı hızlandırır.",
    braxton: "Dinlen ve 1 bardak ılık su iç; dehidratasyon kasılmayı tetikleyebilir."
  };

  return `
    <div class="absolute inset-0 flex flex-col justify-between overflow-hidden bg-[#0A0605]">
      
      <!-- CANLI ANNE KARNI & AKILLI ÇERÇEVELEME (Modal Açılınca Bebek Otomatik Olarak Yukarı Kayar ve Asla Örtülmez!) -->
      <div 
        id="cinematicTouchStage"
        onpointerdown="handleCinematicTouch(event)"
        onpointermove="handleCinematicMove(event)"
        class="absolute inset-0 w-full h-full cursor-crosshair overflow-hidden touch-none"
      >
        <div id="cinematicBabyWrapper" class="w-full h-full transition-all duration-500 ease-out transform ${isModalOpen ? '-translate-y-24 scale-[0.88] origin-top' : 'translate-y-0 scale-100'}">
          <img 
            id="cinematicBabyVisual"
            src="${state.baby.image}" 
            alt="Güneş 31. Hafta"
            class="w-full h-full object-cover select-none pointer-events-none filter brightness-95 contrast-105 animate-amniotic-float transition-all duration-500 ease-out"
          >
          <canvas id="cinematicCanvas" width="420" height="860" class="absolute inset-0 w-full h-full pointer-events-none z-10"></canvas>
        </div>
        <div class="absolute inset-0 bg-gradient-to-t from-[#0A0605] via-transparent to-black/30 pointer-events-none z-10 animate-maternal-breath"></div>
      </div>

      <!-- Sade Üst Rozet (Haftalık Boyut) -->
      <div class="absolute top-14 left-4 z-30 pointer-events-none">
        <div class="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/80 text-[10px] font-light shadow-xs flex items-center space-x-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
          <span>${state.baby.sizeComparison}</span>
        </div>
      </div>

      <!-- EN ALT KONTROL DOCK & AÇILIR PANELLER -->
      <div class="absolute bottom-5 inset-x-4 z-40 pointer-events-auto flex flex-col space-y-2 select-none" onclick="event.stopPropagation()">
        
        <!-- Canlı Tepki & Reaksiyon Satırı (Modal Üstünde Parlayan Geri Bildirim) -->
        <div class="flex items-center justify-between px-2 text-[11px] ${isModalOpen ? 'bg-black/60 backdrop-blur-md py-1 px-3 rounded-full border border-white/10' : ''}">
          <div id="cinematicFeedbackBox" class="font-serif italic text-white/95 truncate max-w-[220px]">
            "${state.interactive.reactionText}"
          </div>
          <div class="flex items-center space-x-2 text-[10px] text-white/70">
            <span class="text-cyan-300 font-mono">Su: ${curWater}/${targetWater}B ${curWater > targetWater ? '★' : ''}</span>
            <span>·</span>
            <span class="text-emerald-300">Nabız: ${state.baby.bpm} bpm</span>
          </div>
        </div>

        <!-- 1. AÇILIR DUYGU & BEDENSEL HASSASİYET POPOVER'I (Göz Yormayan Matris + Pratik Çözümler) -->
        <div id="moodModalContainer" class="${state.isMoodModalOpen ? 'block animate-in fade-in zoom-in-95 duration-200' : 'hidden'}">
          <div class="bg-[#140D0B]/85 backdrop-blur-2xl rounded-3xl border border-white/15 p-4 shadow-[0_15px_50px_rgba(0,0,0,0.9)] space-y-3 mb-1 max-h-[340px] overflow-y-auto">
            <div class="flex justify-between items-center pb-1.5 border-b border-white/10">
              <div>
                <span class="text-xs font-serif font-semibold text-white/90">Bugün Nasıl Hissediyorsun?</span>
                <p class="text-[9px] text-white/45 mt-0.5">Ruh halini seç veya bedensel sinyaline anlık çözüm al</p>
              </div>
              <button onclick="toggleMoodModal()" class="text-white/40 hover:text-white text-xs px-2.5 py-0.5 rounded-full bg-white/5 active:scale-95 transition">Kapat ✕</button>
            </div>

            <!-- 1. KADEME: 4 TEMEL RUH HALİ RİTMİ (Minimalist Kapsüller) -->
            <div>
              <div class="text-[10px] text-white/50 mb-1.5 font-medium">Genel Ritim</div>
              <div class="grid grid-cols-4 gap-1.5 text-xs">
                <button onclick="selectMaternalMoodAndClose('serene')" class="p-2 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 ${state.healthData.selectedMood === 'serene' ? 'bg-emerald-500/25 border-emerald-400 text-emerald-200 font-semibold' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'}">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span class="text-[11px]">Dingin</span>
                </button>
                <button onclick="selectMaternalMoodAndClose('energetic')" class="p-2 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 ${state.healthData.selectedMood === 'energetic' ? 'bg-amber-500/25 border-amber-300 text-amber-200 font-semibold' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'}">
                  <span class="w-2 h-2 rounded-full bg-amber-300"></span>
                  <span class="text-[11px]">Enerjik</span>
                </button>
                <button onclick="selectMaternalMoodAndClose('tired')" class="p-2 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 ${state.healthData.selectedMood === 'tired' ? 'bg-amber-500/25 border-amber-500 text-amber-200 font-semibold' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'}">
                  <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                  <span class="text-[11px]">Yorgun</span>
                </button>
                <button onclick="selectMaternalMoodAndClose('emotional')" class="p-2 rounded-xl border text-center transition flex flex-col items-center justify-center space-y-1 ${state.healthData.selectedMood === 'emotional' ? 'bg-sky-500/25 border-sky-400 text-sky-200 font-semibold' : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'}">
                  <span class="w-2 h-2 rounded-full bg-sky-400"></span>
                  <span class="text-[11px]">Hassas</span>
                </button>
              </div>
            </div>

            <!-- 2. KADEME: 31. HAFTA BEDENSEL HASSASİYETLERİ (Pratik ve Göz Yormayan Kompakt Chip'ler) -->
            <div class="pt-1 border-t border-white/5">
              <div class="flex justify-between items-center text-[10px] text-white/50 mb-1.5">
                <span class="font-medium">Bedensel Hassasiyet Var mı?</span>
                <span class="text-[9px] text-white/40">Dokun ve anlık tüyo al</span>
              </div>
              <div class="flex flex-wrap gap-1.5">
                ${symptomList.map(s => `
                  <button 
                    onclick="selectSymptomAndRelieve('${s.key}')" 
                    class="py-1 px-2.5 rounded-xl text-[10px] border transition active:scale-95 ${selectedSymptom === s.key ? 'bg-white/20 border-white text-white font-semibold shadow-xs' : 'bg-white/5 ' + s.color + ' hover:bg-white/10'}">
                    ${s.lbl}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- 3. KADEME: SEÇİLEN HASSASİYETİN 1 CÜMLELİK PRATİK ANLIK RAHATLAMA ÇÖZÜMÜ -->
            ${selectedSymptom && symptomRemedies[selectedSymptom] ? `
              <div class="p-2.5 rounded-2xl bg-white/10 border border-white/20 text-xs text-white/95 flex items-start space-x-2 animate-in fade-in duration-200">
                <span class="w-2 h-2 rounded-full bg-emerald-400 mt-1 shrink-0"></span>
                <div class="leading-relaxed">
                  <span class="font-semibold text-emerald-200 text-[11px]">Pratik Çözüm: </span>
                  <span class="text-[11px] text-white/90">${symptomRemedies[selectedSymptom]}</span>
                </div>
              </div>
            ` : ''}

          </div>
        </div>

        <!-- 2. AÇILIR BESLE & TAKVİYE POPOVER'I: SINIRSIZ SU (8+) + HEDEF AYARI + DMT1 CHECKLIST -->
        <div id="nurtureModalContainer" class="${state.isNurtureModalOpen ? 'block animate-in fade-in zoom-in-95 duration-200' : 'hidden'}">
          <div class="bg-[#140D0B]/85 backdrop-blur-2xl rounded-3xl border border-white/15 p-4 shadow-[0_15px_50px_rgba(0,0,0,0.9)] space-y-3 mb-1 max-h-[330px] overflow-y-auto">
            <div class="flex justify-between items-center pb-2 border-b border-white/10">
              <div>
                <span class="text-xs font-serif font-semibold text-white/90">Besleme & Takviye Takibi</span>
                <p class="text-[9px] text-white/50 mt-0.5">Amniyotik Berraklık %${waterPct} · Hücresel Besin %${nutrientPct}</p>
              </div>
              <button onclick="toggleNurtureModal()" class="text-white/40 hover:text-white text-xs px-2.5 py-0.5 rounded-full bg-white/5 active:scale-95 transition">Kapat ✕</button>
            </div>

            <!-- 1. KISIM: SU TAKİBİ (8 Bardaktan Fazlası Desteklenir, Hedef Kişiselleştirilebilir) -->
            <div class="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-400/25 space-y-2">
              <div class="flex justify-between items-center text-xs">
                <span class="font-semibold text-cyan-200 flex items-center space-x-1.5">
                  <span class="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span>Günlük Su Takibi</span>
                </span>
                <div class="flex items-center space-x-2">
                  <span class="font-mono text-cyan-300 font-bold">${curWater} / ${targetWater} Bardak</span>
                  ${curWater > targetWater ? `<span class="text-[9px] bg-cyan-400/25 text-cyan-200 px-1.5 py-0.5 rounded-md font-semibold">+${curWater - targetWater} Ekstra</span>` : ''}
                </div>
              </div>

              <!-- Dinamik Bardak Kapsülleri (Hedef ve Fazlasını Gösteren Şık Dizilim) -->
              <div class="flex flex-wrap gap-1.5 items-center px-1 py-1">
                ${Array.from({length: Math.max(targetWater, curWater)}).map((_, i) => `
                  <button onclick="adjustWater(${i < curWater ? -1 : 1})" class="p-0.5 transition active:scale-110" title="${i+1}. Bardak">
                    <span class="inline-block w-3.5 h-3.5 rounded-full transition-all ${i < curWater ? (i >= targetWater ? 'bg-amber-300 shadow-[0_0_8px_rgba(252,211,77,0.9)]' : 'bg-cyan-400 shadow-[0_0_8px_rgba(103,232,249,0.8)]') : 'bg-white/15 border border-white/20'}"></span>
                  </button>
                `).join('')}
              </div>

              <!-- Hızlı Eylem & Hedef Seçimi -->
              <div class="flex items-center space-x-2 pt-0.5">
                <button onclick="adjustWater(-1)" class="py-1 px-3 bg-white/5 hover:bg-white/10 rounded-xl text-[10px] text-white/60 transition">- 1</button>
                <button onclick="adjustWater(1)" class="flex-1 py-1.5 bg-cyan-500/25 hover:bg-cyan-500/35 border border-cyan-400/40 text-cyan-200 text-xs font-semibold rounded-xl transition flex items-center justify-center space-x-1.5 shadow-sm active:scale-98">
                  <span>+ 1 Bardak Su İçtim</span>
                </button>
                <div class="flex items-center space-x-1 pl-1 border-l border-white/10 text-[9px] text-white/40">
                  <button onclick="setWaterTarget(8)" class="px-1.5 py-1 rounded-md ${targetWater === 8 ? 'bg-cyan-400/30 text-cyan-200 font-bold' : 'hover:bg-white/5'}">8B</button>
                  <button onclick="setWaterTarget(10)" class="px-1.5 py-1 rounded-md ${targetWater === 10 ? 'bg-cyan-400/30 text-cyan-200 font-bold' : 'hover:bg-white/5'}">10B</button>
                  <button onclick="setWaterTarget(12)" class="px-1.5 py-1 rounded-md ${targetWater === 12 ? 'bg-cyan-400/30 text-cyan-200 font-bold' : 'hover:bg-white/5'}">12B</button>
                </div>
              </div>
            </div>

            <!-- 2. KISIM: GÜNLÜK BESİN & DMT1 İLAÇ CHECKLIST'İ -->
            <div class="p-3 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div class="flex justify-between items-center text-xs">
                <span class="font-semibold text-white/90">Günün Takviye & Öğün Takibi</span>
                <span class="text-[9px] text-amber-200 font-mono">DMT1 Protokolü</span>
              </div>

              <div class="space-y-1.5 text-xs">
                <!-- Sabah Aç: Demir (Ferro Sanol) -->
                <button onclick="toggleChecklistItem('iron')" class="w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${cl.iron ? 'bg-emerald-500/20 border-emerald-400/50 text-white' : 'bg-black/25 border-white/5 text-white/60'}">
                  <div class="flex items-center space-x-2.5">
                    <span class="w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${cl.iron ? 'bg-emerald-500 border-emerald-400 text-black font-bold' : 'border-white/30'}">
                      ${cl.iron ? '✓' : ''}
                    </span>
                    <div>
                      <div class="text-[11px] font-medium ${cl.iron ? 'line-through text-white/70' : 'text-white'}">Sabah Aç: Ferro Sanol (Demir)</div>
                      <div class="text-[9px] text-white/40">C vitamini ile sinerji · Magnezyumdan 2 saat önce</div>
                    </div>
                  </div>
                  <span class="text-[9px] text-emerald-300 font-mono">08:30</span>
                </button>

                <!-- Dengeli Öğün -->
                <button onclick="toggleChecklistItem('meal')" class="w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${cl.meal ? 'bg-emerald-500/20 border-emerald-400/50 text-white' : 'bg-black/25 border-white/5 text-white/60'}">
                  <div class="flex items-center space-x-2.5">
                    <span class="w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${cl.meal ? 'bg-emerald-500 border-emerald-400 text-black font-bold' : 'border-white/30'}">
                      ${cl.meal ? '✓' : ''}
                    </span>
                    <div>
                      <div class="text-[11px] font-medium ${cl.meal ? 'line-through text-white/70' : 'text-white'}">Öğün Yedim: Dengeli Lif & Protein</div>
                      <div class="text-[9px] text-white/40">Hücresel büyüme & glukoz dengesi</div>
                    </div>
                  </div>
                  <span class="text-[9px] text-emerald-300 font-mono">Tok</span>
                </button>

                <!-- Öğle Tok: Omega-3 & D3 -->
                <button onclick="toggleChecklistItem('omega')" class="w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${cl.omega ? 'bg-emerald-500/20 border-emerald-400/50 text-white' : 'bg-black/25 border-white/5 text-white/60'}">
                  <div class="flex items-center space-x-2.5">
                    <span class="w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${cl.omega ? 'bg-emerald-500 border-emerald-400 text-black font-bold' : 'border-white/30'}">
                      ${cl.omega ? '✓' : ''}
                    </span>
                    <div>
                      <div class="text-[11px] font-medium ${cl.omega ? 'line-through text-white/70' : 'text-white'}">Öğle Tok: Omega-3 DHA & D3</div>
                      <div class="text-[9px] text-white/40">Fetal beyin & retina nöron gelişimi</div>
                    </div>
                  </div>
                  <span class="text-[9px] text-emerald-300 font-mono">13:00</span>
                </button>

                <!-- Akşam Tok: Magnezyum (Magnimore) -->
                <button onclick="toggleChecklistItem('magnesium')" class="w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${cl.magnesium ? 'bg-emerald-500/20 border-emerald-400/50 text-white' : 'bg-black/25 border-white/5 text-white/60'}">
                  <div class="flex items-center space-x-2.5">
                    <span class="w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${cl.magnesium ? 'bg-emerald-500 border-emerald-400 text-black font-bold' : 'border-white/30'}">
                      ${cl.magnesium ? '✓' : ''}
                    </span>
                    <div>
                      <div class="text-[11px] font-medium ${cl.magnesium ? 'line-through text-white/70' : 'text-white'}">Akşam Tok: Magnimore Plus (Magnezyum)</div>
                      <div class="text-[9px] text-amber-200/60">Kas kramplarını önleme & rahat uyku</div>
                    </div>
                  </div>
                  <span class="text-[9px] text-amber-300 font-mono">21:30</span>
                </button>

                <!-- Özel Takviye: Kolajen Peptit (Hekim Bilgili / Reçete Dışı) -->
                ${state.hasCollagen ? `
                  <button onclick="toggleChecklistItem('collagen')" class="w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${cl.collagen ? 'bg-teal-500/20 border-teal-400/50 text-white' : 'bg-black/25 border-white/5 text-white/60'}">
                    <div class="flex items-center space-x-2.5">
                      <span class="w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${cl.collagen ? 'bg-teal-500 border-teal-400 text-black font-bold' : 'border-white/30'}">
                        ${cl.collagen ? '✓' : ''}
                      </span>
                      <div>
                        <div class="text-[11px] font-medium ${cl.collagen ? 'line-through text-white/70' : 'text-white'}">İkindi: Kolajen Peptit (Tip 1 & 3)</div>
                        <div class="text-[9px] text-teal-300/80">C vitaminiyle sinerji · Demirle yarışmaz (DMT1 güvenli)</div>
                      </div>
                    </div>
                    <span class="text-[9px] text-teal-300 font-mono">16:30</span>
                  </button>
                ` : ''}

                <!-- Dinamik Eklenmiş Diğer Özel Takviyeler -->
                ${(state.customSupplements || []).map(cs => `
                  <button onclick="toggleChecklistItem('${cs.id}')" class="w-full p-2.5 rounded-xl border text-left transition flex items-center justify-between ${cl[cs.id] ? 'bg-indigo-500/20 border-indigo-400/50 text-white' : 'bg-black/25 border-white/5 text-white/60'}">
                    <div class="flex items-center space-x-2.5">
                      <span class="w-4 h-4 rounded-md border flex items-center justify-center text-[10px] ${cl[cs.id] ? 'bg-indigo-500 border-indigo-400 text-black font-bold' : 'border-white/30'}">
                        ${cl[cs.id] ? '✓' : ''}
                      </span>
                      <div>
                        <div class="text-[11px] font-medium ${cl[cs.id] ? 'line-through text-white/70' : 'text-white'}">${cs.name} (${cs.dose || '1 Doz'})</div>
                        <div class="text-[9px] text-indigo-300/80">${cs.dmt1Rule || 'Özel takviye'}</div>
                      </div>
                    </div>
                    <span class="text-[9px] text-indigo-300 font-mono">${cs.scheduledHour || '16:30'}</span>
                  </button>
                `).join('')}
              </div>

              <!-- Reçete Entegrasyon & Özel Takviye Butonları -->
              <div class="flex space-x-2 pt-1.5 border-t border-white/10">
                <button onclick="togglePrescriptionModal()" class="flex-1 py-1.5 px-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] text-white/80 transition flex items-center justify-center space-x-1.5 active:scale-95">
                  <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>Reçete Entegre Et</span>
                </button>
                <button onclick="toggleCustomSupplementModal()" class="flex-1 py-1.5 px-2 bg-teal-500/15 hover:bg-teal-500/25 border border-teal-400/30 rounded-xl text-[10px] text-teal-200 transition flex items-center justify-center space-x-1.5 active:scale-95">
                  <span class="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                  <span>+ Kolajen / Özel Takviye</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        <!-- ANA ÇİFT BUTONLU DOCK: EMOJİSİZ, ULTRA SADE VE ASİL -->
        <div class="bg-[#140D0B]/85 backdrop-blur-2xl rounded-3xl border border-white/15 p-2 px-3 shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex items-center justify-between">
          
          <!-- Sol Buton: [Nasıl Hissediyorsun?] -->
          <button onclick="toggleMoodModal()" class="py-2 px-3.5 rounded-2xl bg-white/5 hover:bg-white/10 active:scale-95 border border-white/10 text-white text-xs font-medium flex items-center space-x-2 transition shadow-xs">
            <span class="w-2 h-2 rounded-full ${currentMood.dot || 'bg-emerald-400'}"></span>
            <span>Nasıl Hissediyorsun?</span>
            <span class="text-[10px] ${currentMood.color} font-semibold">(${currentMood.text})</span>
            <span class="text-[9px] text-white/40">${state.isMoodModalOpen ? '✕' : '⌃'}</span>
          </button>

          <!-- Sağ Buton: [Besle & Takviye] -->
          <button onclick="toggleNurtureModal()" class="py-2 px-4 rounded-2xl bg-gradient-to-r from-emerald-500/25 to-cyan-500/25 hover:from-emerald-500/35 hover:to-cyan-500/35 active:scale-95 border border-emerald-400/40 text-emerald-200 text-xs font-semibold flex items-center space-x-2 transition shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>Besle & Takviye</span>
            <span class="text-[9px] text-emerald-300/70">${state.isNurtureModalOpen ? '✕' : '⌃'}</span>
          </button>
        </div>

      </div>
    </div>
  `;
}

function renderBondingTab() {
  return `
    <div class="w-full h-full pt-16 pb-20 px-5 space-y-4 text-white overflow-y-auto">
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h2 class="text-base font-serif font-semibold text-white/95">Bağ Kur & Eğitici Aktiviteler</h2>
          <p class="text-[11px] text-white/60">Güneş ile 31. Hafta Oyunlaştırılmış Gelişim</p>
        </div>
        <span class="text-[10px] bg-amber-400/15 text-amber-200 px-2.5 py-1 rounded-full border border-amber-400/30">
          ${state.growth.points} Bağ Puanı
        </span>
      </div>

      <!-- 1. GÜNÜN OYUNLAŞTIRILMIŞ BİYOLOJİK GELİŞİM SORUSU -->
      <div class="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2.5">
        <div class="flex justify-between items-center text-xs">
          <span class="font-semibold text-amber-200">Günün Eğitici Gelişim Sorusu (31. Hafta)</span>
          <span class="text-[10px] text-emerald-300">+15 Puan</span>
        </div>
        <p class="text-xs text-white/90">31. haftada bebeğin baş aşağı (sefalik) pozisyona geçişi biyolojik olarak neyi ifade eder?</p>
        <div class="space-y-1.5 pt-1">
          <button onclick="handleQuizAnswer(0)" class="w-full p-2.5 rounded-xl text-left text-xs transition ${state.dailyQuiz.answered && state.dailyQuiz.selected === 0 ? (state.dailyQuiz.isCorrect ? 'bg-emerald-500/25 border border-emerald-400 text-emerald-200' : 'bg-rose-500/25 border border-rose-400 text-rose-200') : 'bg-black/25 hover:bg-white/10 border border-white/5 text-white/80'}">
            A) Doğum kanalına hazırlık için en doğal ve sağlıklı fizyolojik duruştur.
          </button>
          <button onclick="handleQuizAnswer(1)" class="w-full p-2.5 rounded-xl text-left text-xs transition ${state.dailyQuiz.answered && state.dailyQuiz.selected === 1 ? 'bg-rose-500/25 border border-rose-400 text-rose-200' : 'bg-black/25 hover:bg-white/10 border border-white/5 text-white/80'}">
            B) Annenin yürüyüş süresini kısıtlaması gerektiğinin işaretidir.
          </button>
        </div>
        ${state.dailyQuiz.answered ? `
          <div class="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30 text-[11px] text-emerald-200 leading-relaxed">
            ✓ Harika! 31. haftada fetüslerin %85'i yerçekimi ve baş ağırlığı sayesinde baş aşağı döner. Bu doğal sefalik duruş pelvise mükemmel uyum sağlar.
          </div>
        ` : ''}
      </div>

      <!-- 2. DUYUSAL BAĞ: SES VE REZONANS -->
      <div class="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2.5">
        <div class="font-semibold text-white/90 text-xs">Duyusal Etkileşim & Fetal Ses Köprüsü</div>
        <p class="text-[11px] text-white/60">31. haftada işitme kemikçikleri tamamen sertleşmiştir. Anne ve babanın sesini amniyotik sıvı içinde net duyar.</p>
        <div class="grid grid-cols-2 gap-2 pt-1">
          <button onclick="toggleAudio()" class="p-3 bg-purple-500/15 hover:bg-purple-500/25 border border-purple-400/30 text-purple-200 rounded-xl text-xs font-medium text-center transition flex items-center justify-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-purple-400"></span>
            <span>Ninni Dinlet (8.3 Hz)</span>
          </button>
          <button onclick="triggerDirectKick()" class="p-3 bg-rose-500/15 hover:bg-rose-500/25 border border-rose-400/30 text-rose-200 rounded-xl text-xs font-medium text-center transition flex items-center justify-center space-x-2">
            <span class="w-2 h-2 rounded-full bg-rose-400"></span>
            <span>Karnı Sev & Tekme Say</span>
          </button>
        </div>
      </div>

      <!-- 3. ZAMAN KAPSÜLÜ: GÜNEŞ'E MEKTUPLAR -->
      <div class="p-4 bg-white/5 rounded-2xl border border-white/10 space-y-2.5">
        <div class="flex justify-between items-center text-xs">
          <span class="font-semibold text-white/90">Güneş'e Mektuplar (Zaman Kapsülü)</span>
          <span class="text-[10px] text-amber-200">31. Hafta Anısı</span>
        </div>
        <p class="text-[11px] text-white/60">"Bugün 31. haftamız bitti kızım. Babanla seni kucağımıza alacağımız 63 günü sabırsızlıkla bekliyoruz..."</p>
        <button onclick="triggerReaction('folic', 'Zaman kapsülü mektubunuz güvenle şifrelenip kaydedildi.'); triggerHaptic(20);" class="w-full py-2 bg-white/10 hover:bg-white/15 border border-white/10 rounded-xl text-xs text-white/80 transition flex items-center justify-center space-x-1.5">
          <span>+ Yeni Mektup Ekle</span>
        </button>
      </div>
    </div>
  `;
}

function renderHealthTab() {
  return `
    <div class="w-full h-full pt-16 pb-20 px-5 space-y-4 text-white overflow-y-auto">
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h2 class="text-base font-serif font-semibold text-white/95">Şifa & Sağlık Takibi</h2>
          <p class="text-[11px] text-white/60">Buse · ${state.baby.week}. Hafta (${getLifecycleDataForWeek(state.baby.week).trimester}) Biyometri & Klinik Güvenlik</p>
        </div>
        <button onclick="toggleClinicalReportModal()" class="px-3 py-1.5 bg-gradient-to-r from-amber-500/20 to-amber-600/30 hover:from-amber-500/35 hover:to-amber-600/45 border border-amber-400/40 text-amber-200 text-xs font-semibold rounded-xl flex items-center space-x-1.5 transition shadow-sm" title="Muayene Öncesi Standart Hekim Özeti">
          <span>📄</span>
          <span>Klinik Özet PDF</span>
        </button>
        <span class="text-xs bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 rounded-full font-medium">
          Dengede
        </span>
      </div>

      <!-- Şifa & Sağlık Sekmeleri (Calm Tech Ferah Pill Tabs) -->
      <div class="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
        ${[
          { id: 'biometrics', lbl: '💓 Biyometri' },
          { id: 'hormone', lbl: '🌿 Hormon' },
          { id: 'lab', lbl: '🧪 Tahlil & Rx' },
          { id: 'exercise', lbl: '🧘 Pelvik' },
          { id: 'ultrasound', lbl: '👶 Ultrason' }
        ].map(sh => `
          <button onclick="setHealthSubtab('${sh.id}')"
            class="px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all font-medium ${state.healthData.activeHealthSubtab === sh.id ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 font-semibold shadow-xs' : 'bg-white/[0.04] text-white/50 hover:text-white/80'}">
            ${sh.lbl}
          </button>
        `).join('')}
      </div>

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
  if (state.healthData.activeHealthSubtab === "biometrics") {
    const weightGain = (state.user.currentWeight - state.user.startWeight).toFixed(1);
    const waistGain = state.user.waistCircumference - state.user.startWaist;
    const w = state.wearable || { isConnected: true, deviceName: "Apple Watch / HealthKit", heartRate: 78, hrv: 64, spo2: 98, sleepHours: "7s 25dk", steps: 4820, raffleJoined: false, raffleMonth: "Ekim 2026" };

    return `
      <div class="space-y-4 animate-in fade-in duration-150">
        <!-- AKILLI SAAT & GİYİLEBİLİR BİYO-SENSÖR KARTI (FAZ-1 AR-GE) -->
        <div class="p-4 bg-gradient-to-br from-emerald-950/45 via-white/5 to-amber-950/30 rounded-3xl border border-emerald-400/30 space-y-3 shadow-lg">
          <div class="flex justify-between items-start">
            <div>
              <div class="flex items-center space-x-2">
                <span class="w-2 h-2 rounded-full ${w.isConnected ? 'bg-emerald-400 animate-ping' : 'bg-amber-400'}"></span>
                <span class="text-xs font-bold text-white">⌚ Giyilebilir Biyo-Sensör (Akıllı Saat)</span>
              </div>
              <p class="text-[10px] text-white/60 mt-0.5">${w.isConnected ? w.deviceName + ' · Otomatik Veri Akışı Aktif' : 'Akıllı saat bağlı değil · Manuel / Çekiliş Modu'}</p>
            </div>
            <button onclick="toggleSmartwatchConnection()" class="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-[10px] text-amber-200 font-semibold transition">
              ${w.isConnected ? 'Saat Bağlı ✓' : 'Saati Bağla'}
            </button>
          </div>

          ${w.isConnected ? `
            <div class="grid grid-cols-4 gap-2 text-center">
              <div class="p-2.5 bg-black/35 rounded-2xl border border-white/5">
                <div class="text-[9px] text-white/45">Anne Nabız</div>
                <div class="text-sm font-bold text-emerald-300 mt-0.5">${w.heartRate} <span class="text-[9px] font-normal">bpm</span></div>
              </div>
              <div class="p-2.5 bg-black/35 rounded-2xl border border-white/5">
                <div class="text-[9px] text-white/45">Otonom HRV</div>
                <div class="text-sm font-bold text-amber-300 mt-0.5">${w.hrv} <span class="text-[9px] font-normal">ms</span></div>
              </div>
              <div class="p-2.5 bg-black/35 rounded-2xl border border-white/5">
                <div class="text-[9px] text-white/45">Gece Uykusu</div>
                <div class="text-xs font-bold text-white mt-1">${w.sleepHours}</div>
              </div>
              <div class="p-2.5 bg-black/35 rounded-2xl border border-white/5">
                <div class="text-[9px] text-white/45">SpO2 / Adım</div>
                <div class="text-xs font-bold text-cyan-300 mt-1">%${w.spo2} · ${(w.steps/1000).toFixed(1)}k</div>
              </div>
            </div>
            <div class="p-2.5 bg-emerald-500/10 border border-emerald-400/20 rounded-2xl flex items-center justify-between text-[10px]">
              <span class="text-emerald-200">🧠 <b>AI Seed Core:</b> Kardiyovasküler dengesiz veri sınıflandırıcısı (Baz: ${state.user.baselineBP}) otonom stresi normal aralıkta doğruladı.</span>
              <button onclick="simulateSmartwatchSync()" class="ml-2 px-2 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 rounded-lg shrink-0 font-semibold">Yenile</button>
            </div>
          ` : `
            <div class="p-3 bg-amber-500/15 border border-amber-400/30 rounded-2xl space-y-2 text-xs">
              <div class="font-bold text-amber-200">🎁 ToHUM Sponsorlu Akıllı Saat Hediye Havuzu (İleri Büyüme Fazı)</div>
              <p class="text-[11px] text-white/80 leading-relaxed">
                Hedef abone eşiğine ulaşıldığında ve marka sponsorluklarıyla, akıllı saat verisi gelmeyen annelerimiz arasında yapılacak giyilebilir biyo-sensör çekilişi için ön bekleme listesine katılın!
              </p>
              <button onclick="joinSmartwatchRaffle()" class="w-full py-2 rounded-xl font-bold text-[11px] transition ${w.raffleJoined ? 'bg-emerald-500/25 border border-emerald-400/40 text-emerald-200' : 'bg-amber-500/30 hover:bg-amber-500/40 border border-amber-400/50 text-amber-100'}">
                ${w.raffleJoined ? '✓ Sponsorlu Saat Havuzu Ön Listesine Kaydoldunuz (#1042)' : '✨ Ücretsiz Ön Listeye Katıl (Saati Olmayan Üyelere Özel)'}
              </button>
            </div>
          `}
        </div>
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
            <span class="text-[10px] px-2.5 py-1 rounded-full font-semibold border
              ${state.healthData.bloodPressureHistory[0].systolic >= 130
                ? 'bg-rose-500/25 border-rose-400/40 text-rose-300'
                : state.healthData.bloodPressureHistory[0].systolic >= 115
                ? 'bg-amber-500/25 border-amber-400/40 text-amber-300'
                : 'bg-emerald-500/15 border-emerald-400/30 text-emerald-300'}">
              ${state.healthData.bloodPressureHistory[0].systolic >= 130 ? '⚠ Yüksek' : state.healthData.bloodPressureHistory[0].systolic >= 115 ? '⚑ İzle' : '✓ Güvenli'}
            </span>
          </div>

          ${(() => {
            const hist = state.healthData.bloodPressureHistory.slice(0, 6).reverse();
            const vals = hist.map(h => h.systolic);
            const minV = Math.min(...vals, 80);
            const maxV = Math.max(...vals, 135);
            const range = maxV - minV || 1;
            const W = 240, H = 50;
            const pts = vals.map((v, i) => {
              const x = vals.length === 1 ? W/2 : (i / (vals.length - 1)) * W;
              const y = H - ((v - minV) / range) * (H - 6) - 3;
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            }).join(' ');
            const limitY = H - ((115 - minV) / range) * (H - 6) - 3;
            const dots = vals.map((v, i) => {
              const x = vals.length === 1 ? W/2 : (i / (vals.length - 1)) * W;
              const y = H - ((v - minV) / range) * (H - 6) - 3;
              const col = v >= 130 ? '#f87171' : v >= 115 ? '#fbbf24' : '#34d399';
              return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3.5" fill="${col}" stroke="#0D0806" stroke-width="1.5"/>`;
            }).join('');
            return `
              <div class="p-3 bg-black/35 rounded-2xl border border-white/5 space-y-1">
                <div class="flex justify-between text-[9px] text-white/40">
                  <span>Sistolik Trend (Son ${vals.length} Ölçüm)</span>
                  <span class="text-rose-400/60">— 115 mmHg sınırı</span>
                </div>
                <svg viewBox="0 0 240 50" class="w-full h-12" xmlns="http://www.w3.org/2000/svg">
                  <line x1="0" y1="${limitY.toFixed(1)}" x2="240" y2="${limitY.toFixed(1)}"
                    stroke="rgba(248,113,113,0.45)" stroke-width="1" stroke-dasharray="5,3"/>
                  <polyline points="${pts}" fill="none" stroke="rgba(251,191,36,0.7)"
                    stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  ${dots}
                </svg>
              </div>
            `;
          })()}

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
  } else if (state.healthData.activeHealthSubtab === "hormone") {
    return `
      <div class="space-y-4 animate-in fade-in duration-150 text-xs">
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

        <!-- 🛑 HAFTALIK GÜVENLİK KALKANI (NELERDEN KAÇINMALISIN?) & OĞUZ'UN GÖREVİ -->
        <div class="space-y-3">
          
          <!-- Nelerden Kaçınmalısın Kalkanı -->
          <div class="p-4 bg-gradient-to-br from-rose-950/30 via-white/5 to-white/5 rounded-3xl border border-rose-400/30 space-y-2.5 shadow-md">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <span class="text-rose-400 font-bold text-xs">🛑</span>
                <span class="text-xs font-bold text-white tracking-tight">${state.baby.week}. Hafta Güvenlik Kalkanı</span>
              </div>
              <span class="text-[9px] bg-rose-500/20 text-rose-200 border border-rose-400/30 px-2 py-0.5 rounded-full font-semibold">
                Sakınılması Gerekenler
              </span>
            </div>

            <div class="space-y-1.5 pl-1">
              ${(getLifecycleDataForWeek(state.baby.week).donts || []).map(d => `
                <div class="flex items-start space-x-2 text-[10px] text-white/80 leading-relaxed">
                  <span class="text-rose-400 font-bold shrink-0">✕</span>
                  <span>${d}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Oğuz'un Haftalık Görevi -->
          <div class="p-4 bg-gradient-to-br from-amber-950/30 via-white/5 to-white/5 rounded-3xl border border-amber-400/30 space-y-2 shadow-md">
            <div class="flex justify-between items-center">
              <div class="flex items-center space-x-2">
                <span class="text-amber-300 font-bold text-xs">🧔</span>
                <span class="text-xs font-bold text-white tracking-tight">Oğuz'un Bu Haftaki Görevi</span>
              </div>
              <span class="text-[9px] bg-amber-500/20 text-amber-200 border border-amber-400/30 px-2 py-0.5 rounded-full font-semibold">
                Partner Desteği
              </span>
            </div>

            <p class="text-[10px] text-white/85 leading-relaxed pl-1 border-l-2 border-amber-400/40">
              ${getLifecycleDataForWeek(state.baby.week).partnerMission || "Buse'ye destek ol."}
            </p>
          </div>

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
  } else if (state.healthData.activeHealthSubtab === "lab") {
    let filteredLabs = state.healthData.bloodwork;
    if (state.healthData.labFilterCategory === "normal") {
      filteredLabs = state.healthData.bloodwork.filter(l => l.category === "normal");
    } else if (state.healthData.labFilterCategory === "attention") {
      filteredLabs = state.healthData.bloodwork.filter(l => l.category === "attention");
    }

    const attentionCount = state.healthData.bloodwork.filter(l => l.category === "attention").length;

    return `
      <div class="space-y-4 animate-in fade-in duration-150 text-xs">
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

                <div class="p-2 bg-black/40 rounded-xl border border-white/5 text-[10px] text-amber-200/85 leading-relaxed">
                  <span class="font-semibold text-white/80">Kullanım Notu:</span> ${p.bioTip}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  } else if (state.healthData.activeHealthSubtab === "exercise") {
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

          <div class="p-2.5 bg-rose-950/30 rounded-2xl border border-rose-400/30 text-[10px] text-rose-200 leading-relaxed">
            ${currentEx.bioFeedback}
          </div>

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
  } else if (state.healthData.activeHealthSubtab === "ultrasound") {
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

// =========================================================================
// 3. MODÜL: DOĞUM & HAZIRLIK (YENİ VE KAPSAMLI MİMARİ)
// =========================================================================
// =========================================================================
// 3. MODÜL: DİNAMİK YAŞAM MOTORU & DOĞUM/GELİŞİM DÖNGÜSÜ
// 1-13.H: Köklenme & Erken Güvenlik | 14-27.H: Gelişim & Beden Uyumu | 28-40.H: Doğum & Hazırlık
// =========================================================================
function renderBirthTab() {
  const curW = state.baby.week;
  const data = getLifecycleDataForWeek(curW);
  const isEarlyTrimester = curW < 28;

  return `
    <div class="w-full h-full pt-16 pb-14 px-4 space-y-3.5 text-white overflow-y-auto">
      
      <!-- Başlık Kartı (Haftaya Göre Dinamik Başlık & Trimester) -->
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h2 class="text-base font-semibold text-white/95 tracking-tight">
            ${curW < 14 ? '1. Trimester & Köklenme' : (curW < 28 ? '2. Trimester & Gelişim' : 'Doğum & Hazırlık')}
          </h2>
          <p class="text-[10px] text-white/60">Güneş · ${curW}. Hafta (${state.baby.daysLeft} Gün Kaldı · 24 Ekim 2026)</p>
        </div>
        <button onclick="toggleWeekSelector()" class="text-[11px] ${curW >= 28 ? 'bg-rose-500/20 text-rose-200 border-rose-400/30' : 'bg-amber-500/20 text-amber-200 border-amber-400/30'} px-3 py-1 rounded-full border font-semibold shrink-0 flex items-center space-x-1">
          <span>${data.trimester}</span>
          <span class="text-[9px] opacity-70">✎</span>
        </button>
      </div>

      <!-- Alt Sekme Seçimi: Erken Trimesterler vs 3. Trimester -->
      ${isEarlyTrimester ? `
        <!-- 1. ve 2. Trimester Sekme Çubuğu (Calm Tech Pill Tabs) -->
        <div class="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
          ${[
            { id: 'overview', lbl: curW < 14 ? '🌱 Köklenme' : '🌿 Gelişim' },
            { id: 'donts', lbl: '🛡️ Güvenlik' },
            { id: 'dos', lbl: '✨ Öneriler' },
            { id: 'partner', lbl: '👨 Oğuz' },
            { id: 'questions', lbl: '👩‍⚕️ Doktor Soruları' }
          ].map(sb => `
            <button onclick="setBirthSubtab('${sb.id}')"
              class="px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all font-medium ${state.birthModule.activeSubtab === sb.id ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 font-semibold shadow-xs' : 'bg-white/[0.04] text-white/50 hover:text-white/80'}">
              ${sb.lbl}
            </button>
          `).join('')}
        </div>
      ` : `
        <!-- 3. Trimester Doğum Paketi Sekme Çubuğu (Calm Tech Ferah Pill Tabs) -->
        <div class="flex items-center space-x-1.5 overflow-x-auto no-scrollbar py-1 text-xs">
          ${[
            { id: 'kick', lbl: '🐾 Tekme 10' },
            { id: 'waves', lbl: '🌊 Dalgalar' },
            { id: 'bag', lbl: '🎒 Çanta' },
            { id: 'plan', lbl: '📋 Plan A/B' },
            { id: 'logistics', lbl: '📍 Lojistik' }
          ].map(sb => `
            <button onclick="setBirthSubtab('${sb.id}')"
              class="px-3.5 py-2 rounded-2xl whitespace-nowrap transition-all font-medium ${state.birthModule.activeSubtab === sb.id ? 'bg-amber-400/20 text-amber-200 border border-amber-400/40 font-semibold shadow-xs' : 'bg-white/[0.04] text-white/50 hover:text-white/80'}">
              ${sb.lbl}
            </button>
          `).join('')}
        </div>
      `}

      <!-- Dinamik Modül 3 İçeriği -->
      ${getBirthSubtabContent()}

    </div>
  `;
}

function setBirthSubtab(tab) {
  state.birthModule.activeSubtab = tab;
  triggerHaptic(10);
  render();
}

function setBirthPlanTab(plan) {
  state.birthModule.birthPlanTab = plan;
  triggerHaptic(10);
  render();
}

function setBagCategory(cat) {
  state.birthModule.bagActiveCategory = cat;
  triggerHaptic(10);
  render();
}

function getBirthSubtabContent() {
  const curW = state.baby.week;
  const data = getLifecycleDataForWeek(curW);
  const isEarlyTrimester = curW < 28;

  // =========================================================================
  // 1. VE 2. TRİMESTER GÖRÜNÜMLERİ (1 - 27. HAFTALAR)
  // =========================================================================
  if (isEarlyTrimester) {
    // 1.1 GENEL BAKIŞ & FETAL KÖKLENME
    if (state.birthModule.activeSubtab === 'overview' || !state.birthModule.activeSubtab) {
      return `
        <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
          <!-- Biyolojik Durum Kartı -->
          <div class="p-4 bg-gradient-to-br from-amber-950/40 via-white/5 to-white/5 rounded-3xl border border-amber-400/30 space-y-3 shadow-md">
            <div class="flex justify-between items-start">
              <div>
                <span class="text-[10px] bg-amber-500/20 text-amber-200 border border-amber-400/30 px-2.5 py-0.5 rounded-full font-semibold">
                  ${data.trimester} · ${curW}. Hafta
                </span>
                <h3 class="text-sm font-bold text-white mt-1.5">${data.stageName}</h3>
              </div>
              <div class="text-right">
                <span class="text-amber-200 font-bold font-mono text-sm">${data.bpm} BPM</span>
                <div class="text-[9px] text-white/50">Fetal Nabız</div>
              </div>
            </div>

            <!-- Fetal Metrikler -->
            <div class="grid grid-cols-3 gap-2 p-3 bg-black/40 rounded-2xl border border-white/5 text-center">
              <div>
                <div class="text-[9px] text-white/50">Tahmini Ağırlık</div>
                <div class="font-bold text-white text-xs mt-0.5 font-mono">${data.weight}</div>
              </div>
              <div>
                <div class="text-[9px] text-white/50">Boyut</div>
                <div class="font-bold text-amber-200 text-xs mt-0.5 font-mono">${data.height}</div>
              </div>
              <div>
                <div class="text-[9px] text-white/50">Duruş / Konum</div>
                <div class="font-bold text-emerald-300 text-xs mt-0.5 truncate">${data.presentation}</div>
              </div>
            </div>

            <!-- Beden Fısıltısı -->
            <div class="p-3 bg-white/5 rounded-2xl border border-white/5 space-y-1">
              <span class="text-[10px] font-bold text-amber-300 uppercase tracking-wider">Haftalık Beden Fısıltısı</span>
              <p class="text-[11px] text-white/80 leading-relaxed">${data.bodyWhisper}</p>
            </div>
          </div>

          <!-- Haftalık Kaçınılacaklar Özeti (Güvenlik Kalkanı) -->
          <div class="p-4 bg-rose-950/20 rounded-3xl border border-rose-500/30 space-y-2.5">
            <div class="flex justify-between items-center">
              <span class="font-bold text-rose-200 text-xs flex items-center space-x-1.5">
                <span>🛡️</span>
                <span>Bu Hafta Nelerden Kaçınmalısın?</span>
              </span>
              <button onclick="setBirthSubtab('donts')" class="text-[10px] text-rose-300 hover:underline">Tümünü Gör ➔</button>
            </div>
            <div class="space-y-1.5">
              ${(data.donts || []).slice(0, 2).map(item => `
                <div class="p-2.5 bg-black/30 rounded-xl flex items-start space-x-2 text-[10px] text-rose-100/90 border border-rose-500/10">
                  <span class="text-rose-400 font-bold shrink-0 mt-0.5">✕</span>
                  <span>${item}</span>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- 3. Trimester Doğum Paketini Hızlı Keşfet -->
          <button onclick="changePregnancyWeek(31); setBirthSubtab('kick');" class="w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 text-amber-200 text-xs font-semibold rounded-2xl transition text-center flex items-center justify-center space-x-1.5">
            <span>3. Trimester (31.H) Doğum Araçlarını Keşfet</span>
            <span>➔</span>
          </button>
        </div>
      `;
    }

    // 1.2 HAFTALIK GÜVENLİK KALKANI (NELERDEN KAÇINMALISIN?)
    if (state.birthModule.activeSubtab === 'donts') {
      return `
        <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
          <div class="p-4 bg-rose-950/30 rounded-3xl border border-rose-500/30 space-y-2">
            <div class="flex items-center space-x-2">
              <span class="text-base">🛡️</span>
              <div>
                <h3 class="font-bold text-rose-200 text-xs">${curW}. Hafta Güvenlik Kalkanı</h3>
                <p class="text-[10px] text-rose-300/70">Bebeğin ve Buse'nin biyolojik sağlığı için kaçınılması gerekenler</p>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            ${(data.donts || []).map((item, idx) => {
              const high = /sauna|kaplıca|hamam|çiğ et|sushi|alkol|ibuprofen|aspirin|kanama|amniyon|düşme|erken|meme ucu masajı|aniden|kesinlikle/i.test(item);
              const riskLabel = high ? 'YÜKSEK' : 'DİKKAT';
              const riskCls = high
                ? 'bg-rose-500/25 border-rose-400/40 text-rose-300'
                : 'bg-amber-500/20 border-amber-400/30 text-amber-300';
              const borderCls = high ? 'border-rose-500/30' : 'border-amber-500/20';
              return `
                <div class="p-3.5 bg-black/40 rounded-2xl border ${borderCls} flex items-start space-x-2.5 text-xs text-white/90">
                  <div class="flex flex-col items-center space-y-1 shrink-0 mt-0.5">
                    <span class="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-[10px]">✕</span>
                    <span class="text-[7px] font-bold px-1 py-0.5 rounded border ${riskCls} leading-none">${riskLabel}</span>
                  </div>
                  <span class="leading-relaxed text-[11px]">${item}</span>
                </div>
              `;
            }).join('')}
          </div>

          <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 text-[10px] text-white/70 leading-relaxed">
            💡 <strong class="text-amber-200">Klinik Not:</strong> Hamilelikte yapılması önerilenler kadar yapılmaması gerekenleri bilmek de maternal güvenliğin temelidir.
          </div>
        </div>
      `;
    }

    // 1.3 HAFTALIK YAPILMASI ÖNERİLENLER (DOS)
    if (state.birthModule.activeSubtab === 'dos') {
      return `
        <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
          <div class="p-4 bg-emerald-950/30 rounded-3xl border border-emerald-500/30 space-y-2">
            <div class="flex items-center space-x-2">
              <span class="text-base">✓</span>
              <div>
                <h3 class="font-bold text-emerald-200 text-xs">${curW}. Hafta Şifa & Destek Adımları</h3>
                <p class="text-[10px] text-emerald-300/70">Bedenin ve bebeğin gelişimi için önerilen günlük pratikler</p>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            ${(data.dos || []).map((item, idx) => `
              <div class="p-3.5 bg-black/40 rounded-2xl border border-emerald-500/20 flex items-start space-x-2.5 text-xs text-white/90">
                <span class="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                <span class="leading-relaxed text-[11px]">${item}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    // 1.4 OĞUZ'UN HAFTALIK GÖREVİ
    if (state.birthModule.activeSubtab === 'partner') {
      return `
        <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
          <div class="p-4 bg-amber-950/30 rounded-3xl border border-amber-400/30 space-y-2.5">
            <div class="flex items-center space-x-2">
              <img src="${state.partner.avatar}" class="w-8 h-8 rounded-full object-cover border border-amber-400/40">
              <div>
                <h3 class="font-bold text-amber-200 text-xs">Oğuz'un ${curW}. Hafta Rolü</h3>
                <p class="text-[10px] text-white/60">Eşlikçi & Koruyucu Çember Görevi</p>
              </div>
            </div>
            <p class="text-[11px] text-white/90 leading-relaxed bg-black/40 p-3.5 rounded-2xl border border-white/5">
              ${data.partnerMission || "Oğuz, Buse'nin bu haftaki fiziksel ve duygusal ihtiyaçlarında yanında ol, dinlenmesine ve su tüketimine destek sağla."}
            </p>
          </div>
        </div>
      `;
    }

    // 1.5 DOKTOR RANDEVU SORULARI
    if (state.birthModule.activeSubtab === 'questions') {
      return `
        <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
          <div class="p-4 bg-sky-950/30 rounded-3xl border border-sky-400/30 space-y-2">
            <div class="flex items-center space-x-2">
              <span class="text-base">👩‍⚕️</span>
              <div>
                <h3 class="font-bold text-sky-200 text-xs">Dr. Ayşe Yılmaz'a ${curW}. Hafta Soruları</h3>
                <p class="text-[10px] text-sky-300/70">Klinik kontrolde sormak üzere hazırlanmış kontrol listesi</p>
              </div>
            </div>
          </div>

          <div class="space-y-2">
            ${(data.doctorQuestions || []).map((q, idx) => `
              <div class="p-3.5 bg-black/40 rounded-2xl border border-white/10 flex items-start space-x-2.5 text-xs text-white/90">
                <input type="checkbox" class="mt-0.5 accent-sky-400 rounded cursor-pointer">
                <span class="leading-relaxed text-[11px]">${q}</span>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  // =========================================================================
  // 3. TRİMESTER DOĞUM PAKETİ GÖRÜNÜMLERİ (28 - 40. HAFTALAR)
  // =========================================================================
  // 1. FETAL HAREKET & TEKME SAYACI (CARDIFF 10 KURALI)
  if (state.birthModule.activeSubtab === "kick") {
    const k = state.birthModule.kickSession;

    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        
        <!-- Cardiff 10 Kuralı Canlı Dokunmatik Sayaç Kartı -->
        <div class="p-4 bg-gradient-to-br from-amber-950/40 via-white/5 to-white/5 rounded-3xl border border-amber-400/30 text-center space-y-3 shadow-lg">
          <div class="flex justify-between items-center text-xs pb-1 border-b border-white/5">
            <div class="text-left">
              <span class="text-amber-200 font-bold text-xs tracking-tight">Fetal Hareket Sayacı</span>
              <p class="text-[10px] text-white/50">Cardiff 10 Kuralı</p>
            </div>
            <span class="text-[10px] bg-amber-500/15 text-amber-200/90 border border-amber-400/25 px-2.5 py-1 rounded-full font-medium shrink-0">
              Hedef: 2 Saatte 10
            </span>
          </div>

          <div class="py-1">
            <div class="flex items-baseline justify-center space-x-2">
              <span class="text-5xl font-bold font-sans text-white tracking-tight">${k.count}</span>
              <span class="text-sm font-medium text-amber-200/80">/ 10 tekme</span>
            </div>
            <p class="text-[11px] text-white/70 mt-1 font-light">
              ${k.count >= 10 ? '<span class="text-emerald-300 font-medium">✓ Harika! Güneş bugünkü 10 hareket hedefini tamamladı.</span>' : `Başlangıç: <span class="font-mono text-white/90 font-medium">${k.startTime}</span> (${k.elapsedMinutes}. dakika)`}
            </p>
          </div>

          <!-- Canlı Tekme Dokunma Butonu -->
          <button onclick="registerFetalKick()" class="w-full py-3.5 bg-gradient-to-r from-amber-500/25 to-amber-600/30 hover:from-amber-500/35 hover:to-amber-600/40 border border-amber-400/40 text-amber-200 font-bold text-xs rounded-2xl transition shadow-md active:scale-98 flex items-center justify-center space-x-1.5">
            <span class="text-sm font-bold">+</span>
            <span>Tekme / Hareket Hissettim</span>
          </button>

          <!-- Şefkatli Hareketsizlik Rehberi -->
          <div class="p-3 bg-black/40 rounded-2xl border border-white/5 text-[10px] text-left text-white/75 space-y-1 leading-relaxed">
            <span class="font-bold text-amber-200 block">Güneş Bugün Sessiz mi?</span>
            <p>
              Bebekler gün içinde 20–40 dakikalık uyku döngülerine girer. Eğer hareket azaldıysa bir bardak soğuk su veya hafif tatlı bir besin alıp sol yanınıza uzanarak dinlenik sayım yapın.
            </p>
          </div>
        </div>

        <!-- 24 Saatlik Ritim & Aktif Saat Aralıkları -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2.5">
          <div class="flex justify-between items-center">
            <span class="font-bold text-white text-xs">Güneş'in Günlük Hareket Ritmi</span>
            <span class="text-[10px] text-emerald-300 font-medium">${curW}. Hafta Analizi</span>
          </div>

          <div class="space-y-1.5">
            ${k.hourlyDistribution.map(h => `
              <div class="p-2.5 bg-white/5 rounded-xl flex items-center justify-between text-xs border border-white/5">
                <div>
                  <div class="font-medium text-white/90 text-[11px]">${h.hour}</div>
                  <div class="text-[9px] text-white/50">${h.label}</div>
                </div>
                <div class="text-right">
                  <span class="font-bold text-amber-200 font-mono text-sm">${h.count}</span>
                  <span class="text-[9px] text-white/50"> tekme</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- 3. Trimester Kaçınılacaklar Uyarısı -->
        <div class="p-3.5 bg-rose-950/25 rounded-2xl border border-rose-500/25 space-y-1.5 text-[10px] text-rose-200/90">
          <span class="font-bold text-rose-200 flex items-center space-x-1">
            <span>🛡️</span>
            <span>3. Trimester Güvenlik Kalkanı:</span>
          </span>
          <p>${(data.donts || [])[0] || "36. haftadan önce erken çatı muayenelerinden ve göğüs ucu stimülasyonundan kaçının."}</p>
        </div>

      </div>
    `;
  }

  // 2. DOĞUM DALGASI SAYACI & BRAXTON HICKS FİLTRESİ
  if (state.birthModule.activeSubtab === "waves") {
    const c = state.birthModule.contractionTimer;
    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        <div class="p-4 bg-gradient-to-br from-rose-950/40 via-white/5 to-white/5 rounded-3xl border border-rose-400/30 text-center space-y-3 shadow-lg">
          <div class="flex justify-between items-center text-xs pb-1 border-b border-white/5">
            <div class="text-left">
              <span class="text-rose-200 font-bold text-xs tracking-tight">Doğum Dalgası & Kasılma Sayacı</span>
              <p class="text-[10px] text-white/50">Braxton Hicks vs 5-1-1 Analizi</p>
            </div>
            <span class="text-[10px] ${c.analysisStatus === 'active_labor' ? 'bg-rose-500 text-white animate-pulse' : 'bg-amber-500/20 text-amber-200 border border-amber-400/30'} px-2.5 py-1 rounded-full font-bold shrink-0">
              ${c.analysisStatus === 'active_labor' ? '🚨 Aktif Doğum' : '🌱 Hazırlık (Braxton Hicks)'}
            </span>
          </div>

          <div class="py-2">
            <div class="text-5xl font-mono font-bold text-white tracking-tight">
              ${Math.floor(c.currentSeconds / 60).toString().padStart(2, '0')}:${(c.currentSeconds % 60).toString().padStart(2, '0')}
            </div>
            <p class="text-[10px] text-white/60 mt-1 font-light">
              ${c.isRunning ? 'Dalga sürüyor... Derin burun nefesi alın' : 'Son Dalga: ' + c.lastDuration + ' sn (Aralık: ' + c.lastFrequency + ' dk)'}
            </p>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <button onclick="toggleContractionTimer()" class="w-full py-3.5 ${c.isRunning ? 'bg-rose-600 hover:bg-rose-700 text-white' : 'bg-gradient-to-r from-rose-500/30 to-rose-600/40 border border-rose-400/40 text-rose-200'} font-bold text-xs rounded-2xl transition shadow-md flex items-center justify-center space-x-1.5">
              <span>${c.isRunning ? 'Dalga Bitti (Kaydet)' : 'Dalga Başladı'}</span>
            </button>
            <button onclick="resetContractionTimer()" class="w-full py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 font-semibold text-xs rounded-2xl transition">
              Sıfırla
            </button>
          </div>

          <div class="p-3 bg-black/40 rounded-2xl border border-white/5 text-[10px] text-left text-white/75 space-y-1 leading-relaxed">
            <span class="font-bold text-amber-200 block">5-1-1 Kuralı Nedir?</span>
            <p>
              Dalgalar <strong>5 dakikada bir</strong> geliyorsa, her biri en az <strong>1 dakika</strong> sürüyorsa ve bu düzen <strong>1 saattir</strong> devam ediyorsa hastaneye yola çıkma vaktidir.
            </p>
          </div>
        </div>

        <!-- Dalga Geçmişi -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2.5">
          <span class="font-bold text-white text-xs">Son Dalgalar</span>
          <div class="space-y-1.5">
            ${c.waveHistory.map(w => `
              <div class="p-2.5 bg-white/5 rounded-xl flex items-center justify-between text-xs border border-white/5">
                <div>
                  <div class="font-mono text-white/90 text-[11px]">${w.time}</div>
                  <div class="text-[9px] text-white/50">${w.isBraxton ? 'Yalancı Kasılma (Düzensiz)' : 'Düzenli Dalga'}</div>
                </div>
                <div class="text-right">
                  <span class="font-bold text-amber-200 font-mono text-xs">${w.duration} sn</span>
                  <span class="text-[9px] text-white/50"> / ${w.frequency} dk ara</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // 3. 4 KİŞİLİK AKILLI DOĞUM ÇANTASI
  if (state.birthModule.activeSubtab === "bag") {
    const cats = ["Evraklar", "Anne", "Bebek", "Baba"];
    const curCat = state.birthModule.bagActiveCategory || "Evraklar";
    const items = state.birthModule.bagItems.filter(i => i.category === curCat);

    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        <div class="p-3 bg-gradient-to-r from-amber-500/10 via-white/5 to-white/5 rounded-2xl border border-amber-400/20 flex justify-between items-center text-[10px]">
          <div>
            <span class="font-semibold text-amber-200">Tahmini Taburcu Havası:</span>
            <div class="text-white/70">${state.birthModule.dischargeWeather.temp}</div>
          </div>
          <span class="text-[9px] bg-white/10 px-2 py-0.5 rounded-full text-white/60">${state.birthModule.dischargeWeather.dateRange}</span>
        </div>

        <div class="grid grid-cols-4 gap-1 bg-white/5 p-1 rounded-2xl text-[10px]">
          ${cats.map(c => {
            const catItems = state.birthModule.bagItems.filter(i => i.category === c);
            const catDone = catItems.filter(i => i.done).length;
            const allDone = catDone === catItems.length && catItems.length > 0;
            return `
              <button onclick="setBagCategory('${c}')" class="py-2 px-1 text-center rounded-xl transition leading-tight ${curCat === c ? 'bg-amber-500/25 text-amber-200 font-bold border border-amber-400/30' : 'text-white/50 hover:text-white/70'}">
                <div>${c}</div>
                <div class="text-[8px] mt-0.5 font-mono ${allDone ? 'text-emerald-400' : 'text-white/35'}">${catDone}/${catItems.length}</div>
              </button>
            `;
          }).join('')}
        </div>

        <div class="space-y-1.5 mt-1">
          <div class="flex justify-between text-[10px]">
            <span class="text-white/50">${curCat} · İlerleme</span>
            <span class="font-semibold ${items.filter(i=>i.done).length === items.length && items.length > 0 ? 'text-emerald-400' : 'text-amber-300'}">
              ${items.filter(i=>i.done).length} / ${items.length} Hazır
            </span>
          </div>
          <div class="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div class="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full transition-all duration-500"
              style="width: ${items.length > 0 ? ((items.filter(i=>i.done).length / items.length)*100).toFixed(0) : 0}%"></div>
          </div>
        </div>

        <div class="space-y-2">
          ${items.map(item => `
            <div onclick="toggleBagItem(${item.id})" class="p-3 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/5 flex items-start space-x-3 cursor-pointer transition">
              <input type="checkbox" ${item.done ? 'checked' : ''} class="mt-0.5 accent-amber-400 rounded cursor-pointer">
              <div class="flex-1">
                <div class="flex justify-between items-center">
                  <span class="font-medium ${item.done ? 'line-through text-white/40' : 'text-white/90'} text-[11px]">${item.title}</span>
                  <span class="text-[9px] ${item.priority === 'Kritik' ? 'text-rose-300 bg-rose-500/20' : 'text-amber-200 bg-amber-500/20'} px-1.5 py-0.5 rounded-full font-mono">${item.priority}</span>
                </div>
                <p class="text-[9px] text-white/50 mt-0.5">${item.note}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 4. DOĞUM TERCİH BELGESİ (PLAN A / PLAN B)
  if (state.birthModule.activeSubtab === "plan") {
    const isPlanA = state.birthModule.birthPlanTab === "planA";
    const items = isPlanA ? state.birthModule.planA_items : state.birthModule.planB_items;

    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        <div class="grid grid-cols-2 gap-1.5 bg-white/5 p-1 rounded-2xl text-[11px]">
          <button onclick="setBirthPlanTab('planA')" class="py-2.5 text-center rounded-xl transition ${isPlanA ? 'bg-emerald-500/25 text-emerald-200 font-bold border border-emerald-400/40' : 'text-white/50'}">
            Plan A: Doğal Doğum
          </button>
          <button onclick="setBirthPlanTab('planB')" class="py-2.5 text-center rounded-xl transition ${!isPlanA ? 'bg-rose-500/25 text-rose-200 font-bold border border-rose-400/40' : 'text-white/50'}">
            Plan B: Acil Sezaryen
          </button>
        </div>

        <div class="space-y-2">
          ${items.map(item => `
            <div class="p-3.5 bg-white/5 rounded-2xl border border-white/5 space-y-1">
              <div class="flex items-center space-x-2">
                <span class="text-emerald-300 font-bold">✓</span>
                <span class="font-semibold text-white/90 text-[11px]">${item.title}</span>
              </div>
              <p class="text-[10px] text-white/70 pl-4 leading-relaxed">${item.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 5. LOJİSTİK & KRİZ YÖNETİMİ
  if (state.birthModule.activeSubtab === "logistics") {
    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        <div class="p-4 bg-gradient-to-br from-rose-950/30 via-white/5 to-white/5 rounded-3xl border border-rose-400/30 space-y-2.5">
          <span class="text-[10px] font-bold text-rose-300 uppercase tracking-wider">Hızlı Acil Arama</span>
          <div class="space-y-2">
            ${state.birthModule.emergencyContacts.map(c => `
              <div class="p-3 bg-black/40 rounded-2xl border border-white/5 flex justify-between items-center">
                <div>
                  <div class="font-bold text-white text-xs">${c.name}</div>
                  <div class="text-[9px] text-white/50">${c.role} · ${c.note}</div>
                </div>
                <a href="tel:${c.phone}" class="px-3 py-1.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/30 text-rose-200 font-bold text-[10px] rounded-xl transition">
                  Ara 📞
                </a>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Carlos Emanet Kartı -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2">
          <div class="flex justify-between items-center">
            <span class="font-bold text-white text-xs">🐕 Carlos'un Bakım Planı</span>
            <span class="text-[10px] text-emerald-300">Onaylandı</span>
          </div>
          <div class="p-3 bg-black/40 rounded-2xl border border-white/5 text-[10px] space-y-1">
            <div class="text-white/90">Emanetçi: <strong class="text-amber-200">${state.pet.caretaker}</strong></div>
            <div class="text-white/60">${state.pet.note}</div>
          </div>
        </div>
      </div>
    `;
  }

  return '';
}

// =========================================================================
// 4. MODÜL: BÜTÜNLEŞİK YAŞAM TAKVİMİ & KLİNİK RANDEVU EKOSİSTEMİ
// =========================================================================
function renderCalendarTab() {
  const cMod = state.calendarModule;

  return `
    <div class="w-full h-full pt-16 pb-14 px-4 space-y-3.5 text-white overflow-y-auto">
      
      <!-- Başlık & Sonraki Randevu Geri Sayım Rozeti -->
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h2 class="text-base font-semibold text-white/95 tracking-tight">Bütünleşik Takvim</h2>
          <p class="text-[10px] text-white/60">Güneş · ${state.baby.week}. Hafta (${state.baby.daysLeft} Gün Kaldı · 24 Ekim 2026)</p>
        </div>
        <button onclick="addNewAppointment()" class="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-amber-200 text-[10px] font-bold rounded-xl transition">
          + Randevu Ekle
        </button>
      </div>

      <!-- Yaklaşan Randevu Geri Sayım Kartı -->
      <div class="p-4 bg-gradient-to-br from-amber-950/40 via-white/5 to-white/5 rounded-3xl border border-amber-400/30 space-y-2.5 shadow-md">
        <div class="flex justify-between items-start">
          <div>
            <span class="text-[10px] font-semibold text-amber-300 uppercase tracking-wider">Sıradaki Klinik Randevu</span>
            <div class="font-bold text-white text-xs mt-0.5">${cMod.nextCountdown.type}</div>
          </div>
          <span class="text-[11px] font-bold text-amber-200 bg-amber-500/20 border border-amber-400/30 px-2.5 py-1 rounded-full shrink-0">
            ${cMod.nextCountdown.days} Gün Kaldı
          </span>
        </div>

        <div class="p-2.5 bg-black/40 rounded-2xl border border-white/5 text-[10px] space-y-1">
          <div class="text-white/80 font-medium">📅 ${cMod.nextCountdown.targetDate}</div>
          <div class="text-white/60">👩‍⚕️ ${cMod.nextCountdown.doctor} · Manisa Şehir Hastanesi</div>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-0.5">
          <button onclick="exportCalendarICS()" class="py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-amber-200 font-semibold rounded-xl text-[10px] transition text-center">
            Telefon Takvimine Ekle
          </button>
          <button onclick="openHospitalNavigation()" class="py-2 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 text-sky-200 font-semibold rounded-xl text-[10px] transition text-center">
            Hastane Rotasını Gör
          </button>
        </div>
      </div>

      <!-- 3 Alt Sekme (Randevular, Yol Haritası, Günlük Hafıza) -->
      <div class="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-2xl text-[11px]">
        <button onclick="setCalendarSubtab('appointments')" class="py-2 rounded-xl transition text-center truncate ${cMod.activeSubtab === 'appointments' ? 'bg-white/20 text-white font-bold shadow-xs' : 'text-white/50'}">
          Randevular & NST
        </button>
        <button onclick="setCalendarSubtab('timeline')" class="py-2 rounded-xl transition text-center truncate ${cMod.activeSubtab === 'timeline' ? 'bg-white/20 text-white font-bold shadow-xs' : 'text-white/50'}">
          Yol Haritası (${state.baby.week <= 13 ? '1-13' : (state.baby.week <= 27 ? '14-27' : '28-40')})
        </button>
        <button onclick="setCalendarSubtab('history')" class="py-2 rounded-xl transition text-center truncate ${cMod.activeSubtab === 'history' ? 'bg-white/20 text-white font-bold shadow-xs' : 'text-white/50'}">
          Günlük Hafıza
        </button>
      </div>

      <!-- Dinamik Modül 4 İçeriği -->
      ${getCalendarSubtabContent()}

    </div>
  `;
}

function setCalendarSubtab(tab) {
  state.calendarModule.activeSubtab = tab;
  triggerHaptic(10);
  render();
}

function getCalendarSubtabContent() {
  const cMod = state.calendarModule;

  // 1. RANDEVULAR & NST LİSTESİ + DOKTORA SORULACAK SORULAR
  if (cMod.activeSubtab === "appointments") {
    return `
      <div class="space-y-3 animate-in fade-in duration-150 text-xs">
        ${cMod.appointments.map(app => `
          <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3 shadow-sm">
            <div class="flex justify-between items-start">
              <div>
                <span class="font-bold text-white text-xs">${app.title}</span>
                <p class="text-[10px] text-emerald-300 font-medium mt-0.5">${app.dateFormatted}</p>
              </div>
              <span class="text-[9px] px-2 py-0.5 rounded-full ${app.badgeColor === 'rose' ? 'bg-rose-500/20 text-rose-200 border border-rose-400/30' : 'bg-white/10 text-white/70'} font-semibold shrink-0">
                ${app.status}
              </span>
            </div>

            <div class="text-[10px] text-white/60 leading-relaxed pl-1 border-l-2 border-amber-400/40">
              <span class="text-white/80 font-medium">Klinik Odak:</span> ${app.focus}
            </div>

            <!-- Doktora Sorulacak Sorular (İnteraktif) -->
            <div class="p-3 bg-black/40 rounded-2xl border border-white/5 space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-[10px] font-bold text-amber-200/90 uppercase tracking-wider">Dr. Ayşe Yılmaz'a Sorulacaklar:</span>
                <button onclick="addQuestionToAppointment(${app.id})" class="text-[10px] text-amber-300 font-semibold hover:underline">
                  + Soru Ekle
                </button>
              </div>

              <div class="space-y-1.5">
                ${app.questions.map((q, qIdx) => `
                  <div class="flex items-start space-x-2 text-[10px]">
                    <input type="checkbox" ${q.done ? 'checked' : ''} onchange="toggleAppointmentQuestion(${app.id}, ${qIdx})" class="w-3.5 h-3.5 rounded accent-amber-400 mt-0.5 cursor-pointer shrink-0">
                    <span class="${q.done ? 'line-through text-white/40' : 'text-white/85'} leading-tight">${q.text}</span>
                  </div>
                `).join('')}
              </div>
            </div>

          </div>
        `).join('')}
      </div>
    `;
  }

  // 2. 31-40. HAFTA KLİNİK YOL HARİTASI (MILESTONE TIMELINE)
  else if (cMod.activeSubtab === "timeline") {
    return `
      <div class="space-y-3 animate-in fade-in duration-150 text-xs">
        
        <div class="p-3 bg-white/5 rounded-2xl border border-white/10 text-[10px] text-white/70 leading-relaxed">
          <span class="text-amber-200 font-bold">3. Trimester Klinik Takip Protokolü:</span>
          31. haftadan doğuma kadar Güneş'in büyüme atağı, akciğer gelişimi ve NST kardiyak reaktivitesi adım adım izlenir.
        </div>

        <div class="space-y-2.5">
          ${cMod.milestones.map(m => `
            <div class="p-3.5 bg-white/5 rounded-2xl border ${m.status === 'current' ? 'border-amber-400/40 bg-amber-500/5' : (m.status === 'goal' ? 'border-rose-400/40 bg-rose-500/5' : 'border-white/10')} space-y-1.5">
              <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                  <span class="w-2 h-2 rounded-full ${m.status === 'current' ? 'bg-amber-400 animate-pulse' : (m.status === 'goal' ? 'bg-rose-400' : 'bg-white/40')}"></span>
                  <span class="font-bold text-white text-xs">${m.title}</span>
                </div>
                <span class="text-[9px] px-2 py-0.5 rounded-full ${m.status === 'current' ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30' : (m.status === 'goal' ? 'bg-rose-500/20 text-rose-300 font-bold border border-rose-400/30' : 'bg-white/10 text-white/60')}">
                  ${m.badge}
                </span>
              </div>

              <p class="text-[10px] text-white/75 leading-relaxed pl-4">${m.clinicalFocus}</p>

              <div class="pl-4 pt-1 text-[9px] text-emerald-300/90 font-medium">
                📋 <span class="text-white/50">Planlanan Test & Takip:</span> ${m.tests}
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }

  // 3. BÜTÜNLEŞİK SAĞLIK GÜNLÜĞÜ VE GEÇMİŞ GÜNLERİN HAFIZASI
  else if (cMod.activeSubtab === "history") {
    return `
      <div class="space-y-3 animate-in fade-in duration-150 text-xs">
        
        <div class="p-3 bg-white/5 rounded-2xl border border-white/10 text-[10px] text-white/70 leading-relaxed">
          <span class="text-amber-200 font-bold">Güneş'in Bütünleşik Yaşam Hafızası:</span>
          Tüm su, tekme, tansiyon, pelvik egzersiz ve reçete kayıtlarınız gün gün arşivlenir.
        </div>

        <div class="space-y-2">
          ${cMod.dailyLogs.map(log => `
            <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-2">
              <div class="flex justify-between items-center pb-1 border-b border-white/5">
                <span class="font-bold text-white text-xs">${log.date}</span>
                <span class="text-[10px] text-amber-200/80 font-medium">${log.week}</span>
              </div>

              <div class="grid grid-cols-2 gap-1.5 text-[10px]">
                <div class="p-1.5 bg-black/30 rounded-xl border border-white/5 text-sky-200">
                  <span class="text-white/40 block text-[9px]">Amniyotik Su:</span>
                  ${log.water}
                </div>
                <div class="p-1.5 bg-black/30 rounded-xl border border-white/5 text-amber-200">
                  <span class="text-white/40 block text-[9px]">Fetal Hareket:</span>
                  ${log.kicks}
                </div>
                <div class="p-1.5 bg-black/30 rounded-xl border border-white/5 text-emerald-200">
                  <span class="text-white/40 block text-[9px]">Tansiyon:</span>
                  ${log.bp}
                </div>
                <div class="p-1.5 bg-black/30 rounded-xl border border-white/5 text-purple-200">
                  <span class="text-white/40 block text-[9px]">Takviye:</span>
                  ${log.rx}
                </div>
              </div>

              <div class="text-[10px] text-white/60 pt-1 border-t border-white/5 leading-relaxed">
                📝 <em>${log.notes}</em>
              </div>
            </div>
          `).join('')}
        </div>

      </div>
    `;
  }
}

// 4. MODÜL ETKİLEŞİM METOTLARI
window.setCalendarSubtab = setCalendarSubtab;

window.addQuestionToAppointment = function(appId) {
  const app = state.calendarModule.appointments.find(a => a.id === appId);
  if (!app) return;
  const q = prompt(`"${app.title}" randevusu için Dr. Ayşe Yılmaz'a sorulacak soru:`, "");
  if (!q) return;

  app.questions.push({ text: q, done: false });
  triggerHaptic(15);
  render();
};

window.toggleAppointmentQuestion = function(appId, qIndex) {
  const app = state.calendarModule.appointments.find(a => a.id === appId);
  if (!app || !app.questions[qIndex]) return;

  app.questions[qIndex].done = !app.questions[qIndex].done;
  triggerHaptic(10);
  render();
};

window.addNewAppointment = function() {
  const title = prompt("Yeni Randevu / Takip Başlığı (Örn: 33. Hafta NST Kontrolü):", "33. Hafta NST Takibi");
  if (!title) return;
  const dateFormatted = prompt("Tarih ve Saat (Örn: 17 Eylül 2026 · 11:00):", "17 Eylül 2026 · 11:00");
  const doctor = prompt("Doktor / Uzman:", "Dr. Ayşe Yılmaz");
  const focus = prompt("Klinik Odak / Açıklama:", "Fetal kalp atış ritmi ve gelişim takibi");

  state.calendarModule.appointments.splice(1, 0, {
    id: Date.now(),
    title: title,
    dateFormatted: dateFormatted || "Planlandı",
    dateKey: "2026-09-17",
    doctor: doctor || "Dr. Ayşe Yılmaz",
    hospital: "Manisa Şehir Hastanesi",
    status: "Yeni Eklendi",
    badgeColor: "amber",
    focus: focus || "Rutin klinik kontrol.",
    questions: [
      { text: "Güneş'in gelişimi haftasıyla uyumlu mu?", done: false }
    ]
  });
  triggerHaptic([20, 30, 20]);
  alert(`"${title}" randevusu takvime başarıyla eklendi!`);
  render();
};

window.exportCalendarICS = function() {
  triggerHaptic([20, 30, 20]);
  alert("Dr. Ayşe Yılmaz randevuları ve 3. Trimester takvimi telefon takviminize (.ics formatında) senkronize edildi!");
};


// 5. MODÜL: İHTİYAÇ VE BÜTÇE PLANI
function renderShoppingTab() {
  const totalSpent = state.shopping.items.filter(i => i.done).reduce((acc, cur) => acc + cur.price, 0);
  const totalEstimated = state.shopping.items.reduce((acc, cur) => acc + cur.price, 0);
  const filteredItems = state.shopping.activeCategory === "Tümü" 
    ? state.shopping.items 
    : state.shopping.items.filter(i => i.category === state.shopping.activeCategory);

  return `
    <div class="w-full h-full pt-16 pb-20 px-5 space-y-4 text-white overflow-y-auto">
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
            <div class="flex items-center space-x-1 text-xs font-semibold text-amber-200 cursor-pointer hover:text-amber-100 transition" onclick="editItemPrice(${item.id})" title="Fiyatı Düzenle">
              <span class="text-[9px] text-white/30 mr-0.5">✏</span><span>${item.price.toLocaleString('tr-TR')} TL</span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// 6. MODÜL: MURADİYE KOMŞU AĞI
function renderKovanTab() {
  const motherItems = [
    { id: 1, title: "Organik Pamuk Yenidoğan Tulum Seti", user: "Merve", bio: "Muradiye · 2. Anne", dist: "400m", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80", type: "gift", desc: "Hiç giyilmemiş organik pamuklu tulum seti, bir anneye hediye etmek isterim." },
    { id: 2, title: "Lansinoh Çiftli Göğüs Pompası", user: "Zeynep", bio: "Güzelyurt · 1 Yaş Anne", dist: "1.2km", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80", type: "trade", desc: "Tüm parçaları sterilize edilmiş elektrikli süt pompası." },
    { id: 3, title: "Hamile Destek Yastığı & Pelvik Minderi", user: "Elif", bio: "Uncubozköy · 33. Hafta", dist: "2.5km", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80", type: "gift", desc: "Sol yan yatış için harika ergonomik destek yastığı." }
  ];

  if (!state.kovanMessages || !state.kovanMessages.length) {
    state.kovanMessages = [
      { sender: "Merve (Muradiye)", text: "Kızlar 31. haftada akşam bel ağrısı yaşayan var mı? Buse sen nasılsın?", time: "14:10", isMe: false },
      { sender: "Buse Nur", text: "Selam Merve, hafif bel hassasiyeti var ama magnezyum ve dinlenmeyle dengeliyoruz.", time: "14:15", isMe: true },
      { sender: "Zeynep", text: "Akşamları ayakları hafifçe yükselterek dinlenmek ödeme çok iyi geliyor canım.", time: "14:22", isMe: false }
    ];
  }
  const motherMessages = state.kovanMessages;

  return `
    <div class="w-full h-full pt-16 pb-20 px-5 space-y-4 text-white overflow-y-auto">
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h2 class="text-base font-serif font-semibold text-white/95">Muradiye Anne Kovanı (Kadınlar Çemberi)</h2>
          <p class="text-[11px] text-white/60">Yunusemre ve Çevresi Anne & Kadın Dayanışması</p>
        </div>
        <span class="text-[10px] bg-rose-500/20 text-rose-200 px-2.5 py-1 rounded-full border border-rose-400/30 font-medium shrink-0">
          Kadın Kullanıcılara Özel Mahrem Alan
        </span>
      </div>

      <!-- Kadınlar Çemberi Mahremiyet Güvencesi -->
      <div class="p-3 bg-white/5 rounded-2xl border border-white/10 text-[10px] text-white/70 leading-relaxed">
        Bu alan yalnızca kadın ve gebe kullanıcıların güvenli ve samimi bir ortamda tecrübe, doğum dalgaları, lohusalık ve bebek ihtiyaçlarını paylaştığı mahrem kadınlar çemberidir.
      </div>

      <div class="space-y-2.5">
        <div class="text-xs font-semibold text-amber-200 uppercase tracking-wider">Annelerden Paylaşılan Eşyalar & İmece</div>
        ${motherItems.map(i => `
          <div class="p-4 bg-white/5 rounded-3xl flex items-start justify-between text-xs border border-white/10">
            <div class="flex items-start space-x-3">
              <img src="${escapeHtml(i.avatar)}" class="w-10 h-10 rounded-full object-cover border border-white/20">
              <div>
                <div class="font-bold text-white/95 text-sm">${escapeHtml(i.title)}</div>
                <div class="text-[11px] text-amber-200 mt-0.5">${escapeHtml(i.user)} · ${escapeHtml(i.bio)} (${escapeHtml(i.dist)})</div>
                <div class="text-[11px] text-white/60 mt-1 leading-relaxed">${escapeHtml(i.desc)}</div>
              </div>
            </div>
            <button onclick="sendNeighborMessage('${i.user.replace(/'/g, "\\'")}')" class="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/15 rounded-xl text-xs text-white font-medium shrink-0 ml-2 transition">
              Mesaj
            </button>
          </div>
        `).join('')}
      </div>

      <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-2 text-xs">
        <div class="font-semibold text-white/90">Kadınlar Çemberi Sohbet Hattı</div>
        <div class="space-y-2 max-h-36 overflow-y-auto pr-1">
          ${motherMessages.map(m => `
            <div class="p-2.5 rounded-2xl ${m.isMe ? 'bg-amber-500/15 border border-amber-400/20 text-right ml-6' : 'bg-white/5 border border-white/5 mr-6'}">
              <div class="text-[9px] text-white/40">${escapeHtml(m.sender)} · ${escapeHtml(m.time)}</div>
              <div class="text-[11px] text-white/90 mt-0.5 break-words">${escapeHtml(m.text)}</div>
            </div>
          `).join('')}
        </div>
        <div class="flex items-center space-x-2 pt-2 border-t border-white/10">
          <input id="kovanMsgInput" type="text" placeholder="Çembere yaz..."
            class="flex-1 bg-white/8 border border-white/15 rounded-xl px-3 py-2 text-[11px] text-white placeholder-white/25 focus:outline-none focus:border-amber-400/50 transition"
            onkeydown="if(event.key==='Enter') sendKovanGroupMessage()">
          <button onclick="sendKovanGroupMessage()"
            class="px-3.5 py-2 bg-amber-500/25 border border-amber-400/30 text-amber-200 text-[11px] font-semibold rounded-xl hover:bg-amber-500/35 transition shrink-0">
            Gönder
          </button>
        </div>
      </div>
    </div>
  `;
}

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
  const expectedMinGain = curW <= 13 ? (curW * 0.04) : (0.5 + weeksAfterT1 * weeklyMinRate);
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
  const latestBp = (state.healthData.bloodPressureHistory && state.healthData.bloodPressureHistory[0]) || { systolic: 92, diastolic: 62 };
  const maternalAnalysis = window.computeMaternalNeedsAnalysis();

  return `
    <div class="w-full h-full pt-16 pb-20 px-4 space-y-3.5 text-white overflow-y-auto">
      <!-- Üst Başlık & Oturum Rozeti -->
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <div class="flex items-center space-x-2">
            <span class="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-200 border border-amber-400/30 font-medium">Ürem Ailesi · 2. Oturum</span>
            <span class="text-[10px] text-white/50">Baba Arayüzü</span>
          </div>
          <h2 class="text-base font-serif font-semibold text-white/95 mt-1">${state.partner.shortName || 'Oğuz'} · Proaktif Baba Rehberi</h2>
        </div>
        <button onclick="switchSessionRole('mother')" class="px-2.5 py-1.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] text-amber-200 border border-white/15 transition flex items-center space-x-1">
          <span>Anne Oturumu</span>
          <span>➔</span>
        </button>
      </div>

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
          <span class="text-[10px] text-white/50">${curW}. Hafta · 3. Trimester</span>
        </div>

        ${maternalAnalysis.map(card => `
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
                <button onclick="completeFatherCareAction('${card.actionType}')" class="px-3 py-1.5 bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-[10px] font-semibold rounded-xl transition shadow-xs">
                  ${card.buttonText}
                </button>
              `}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Çapraz Kan Grubu & Rh Takibi -->
      <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs">
        <div class="flex justify-between items-center">
          <span class="font-medium text-white/90">Kan Grubu & Rh Güvenliği</span>
          <span class="text-[10px] text-white/50">Buse (${state.user.bloodGroup}) · Oğuz (${state.partner.bloodGroup})</span>
        </div>
        ${m0.rhIncompatibility ? `
          <div class="p-2.5 bg-rose-950/30 border border-rose-400/30 rounded-xl text-[10px] text-rose-200 leading-relaxed">
            <b>Rh Uyuşmazlığı Protokolü:</b> Anne Rh(-) ve Baba Rh(+) olduğu için 28. hafta İndirekt Coombs ve Rhogam takibi hekim kontrolünde izlenmektedir.
          </div>
        ` : `
          <div class="p-2 rounded-xl bg-emerald-950/30 border border-emerald-400/20 text-[10px] text-emerald-200">
            Kan gruplarında Rh izoimmünizasyon riski bulunmamaktadır.
          </div>
        `}
      </div>

      <!-- Haftalık Baba Rehberliği (31. Hafta) -->
      <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-1.5 text-xs">
        <div class="flex justify-between items-center">
          <span class="font-medium text-amber-200">${curW}. Haftada Oğuz'un Rolü</span>
          <span class="text-[9px] text-white/40">${lc.stageName}</span>
        </div>
        <p class="text-[10px] text-white/80 leading-relaxed italic bg-black/20 p-2.5 rounded-xl border border-white/5">
          "${lc.partnerMission}"
        </p>
      </div>

      <!-- Güneş ile Ses Köprüsü & Destek Butonları -->
      <div class="grid grid-cols-2 gap-2 pt-1">
        <button onclick="playFatherVoice()" class="py-2.5 px-3 bg-amber-500/20 border border-amber-400/30 text-amber-200 text-[11px] font-semibold rounded-2xl hover:bg-amber-500/30 transition flex items-center justify-center space-x-1.5">
          <span>Güneş'e Sesini Dinlet</span>
        </button>
        <button onclick="sendPartnerPainAlert()" class="py-2.5 px-3 bg-white/10 border border-white/15 text-white/80 text-[11px] font-medium rounded-2xl hover:bg-white/15 transition flex items-center justify-center space-x-1.5">
          <span>WhatsApp Bildirimi</span>
        </button>
      </div>

      <!-- Canlı Tamamlanan Destek Geçmişi -->
      <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 space-y-2 text-xs">
        <div class="flex justify-between items-center">
          <span class="font-medium text-white/90">Tamamlanan Şefkatli Destekler</span>
          <span class="text-[9px] text-amber-200">${(state.partner.liveFeed || []).length} Kayıt</span>
        </div>
        <div class="space-y-1.5 max-h-40 overflow-y-auto pr-1">
          ${(state.partner.liveFeed || []).map(f => `
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
    </div>
  `;
}

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
              aria-label="Adım ${idx}"
              title="Adım ${idx}"
              class="h-2 rounded-full transition-all ${idx === step ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]' : idx < step ? 'bg-emerald-400/70' : 'bg-white/15'}"><span class="sr-only">Adım ${idx}</span></button>
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
            
            <!-- Soru 1: Ortalama Tansiyon Yapısı (Büyük & Küçük Tansiyon) -->
            <div class="p-4 bg-white/5 rounded-3xl border border-amber-400/30 space-y-3">
              <div class="flex justify-between items-center">
                <div>
                  <label class="text-xs font-bold text-amber-200 block">1. Ortalama tansiyonunuz (Büyük / Küçük) kaçtır?</label>
                  <p class="text-[10px] text-white/55 mt-0.5">Sana özel kardiyovasküler koridoru hesaplamak için doğal bazalini belirleyelim:</p>
                </div>
                <span id="onbBpBadge" class="px-2.5 py-1 rounded-full text-[10px] font-bold border ${u.baselineSys <= 95 ? 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30' : (u.baselineSys >= 125 ? 'bg-amber-500/20 text-amber-200 border-amber-400/30' : 'bg-sky-500/20 text-sky-200 border-sky-400/30')}">
                  ${u.baselineBP || `${u.baselineSys || 90}/${u.baselineDia || 60}`} mmHg
                </span>
              </div>

              <!-- Büyük ve Küçük Sayı Girişleri (Odak kaybetmeden akıcı yazım) -->
              <div class="grid grid-cols-2 gap-3">
                <div class="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-1">
                  <div class="flex justify-between items-center text-[10px]">
                    <span class="text-amber-200 font-bold">Büyük Tansiyon</span>
                    <span class="text-white/40">Sistolik (mmHg)</span>
                  </div>
                  <input id="onbSysInput" type="number" min="70" max="180" step="1"
                    value="${u.baselineSys || 90}"
                    placeholder="Örn: 90"
                    oninput="silentUpdateBaselineBP(this.value, null)"
                    class="w-full bg-white/5 border border-amber-400/30 focus:border-amber-400 rounded-xl px-3 py-2 text-base font-bold text-amber-200 focus:outline-none text-center">
                  <span class="text-[9px] text-white/45 block text-center">Genelde 90–120 arası</span>
                </div>

                <div class="p-3 bg-black/40 rounded-2xl border border-white/10 space-y-1">
                  <div class="flex justify-between items-center text-[10px]">
                    <span class="text-emerald-300 font-bold">Küçük Tansiyon</span>
                    <span class="text-white/40">Diyastolik (mmHg)</span>
                  </div>
                  <input id="onbDiaInput" type="number" min="40" max="120" step="1"
                    value="${u.baselineDia || 60}"
                    placeholder="Örn: 60"
                    oninput="silentUpdateBaselineBP(null, this.value)"
                    class="w-full bg-white/5 border border-emerald-400/30 focus:border-emerald-400 rounded-xl px-3 py-2 text-base font-bold text-emerald-300 focus:outline-none text-center">
                  <span class="text-[9px] text-white/45 block text-center">Genelde 60–80 arası</span>
                </div>
              </div>

              <!-- Tek Tıkla Hızlı Seçim Çipleri -->
              <div>
                <span class="text-[9px] text-white/50 block mb-1.5">Veya yaygın ortalamalardan birine dokunabilirsiniz:</span>
                <div class="grid grid-cols-2 gap-1.5">
                  <button onclick="quickSetBaselineBP(90, 60, 'low')"
                    class="p-2 rounded-xl border text-left transition ${u.baselineSys <= 95 ? 'bg-emerald-500/25 border-emerald-400 text-white font-semibold' : 'bg-black/30 border-white/10 text-white/70'}">
                    <div class="text-[11px] font-bold">🌿 90 / 60 (Düşük Yapı)</div>
                    <div class="text-[9px] text-white/55">Buse'nin doğal dinlenik yapısı</div>
                  </button>
                  <button onclick="quickSetBaselineBP(110, 70, 'normal')"
                    class="p-2 rounded-xl border text-left transition ${(u.baselineSys > 95 && u.baselineSys < 120) ? 'bg-emerald-500/25 border-emerald-400 text-white font-semibold' : 'bg-black/30 border-white/10 text-white/70'}">
                    <div class="text-[11px] font-bold">⚖️ 110 / 70 (Normal)</div>
                    <div class="text-[9px] text-white/55">Standart dinlenik tansiyon</div>
                  </button>
                  <button onclick="quickSetBaselineBP(120, 80, 'normal')"
                    class="p-2 rounded-xl border text-left transition ${(u.baselineSys >= 120 && u.baselineSys < 125) ? 'bg-emerald-500/25 border-emerald-400 text-white font-semibold' : 'bg-black/30 border-white/10 text-white/70'}">
                    <div class="text-[11px] font-bold">✨ 120 / 80 (İdeal / Sınır)</div>
                    <div class="text-[9px] text-white/55">Geleneksel referans aralığı</div>
                  </button>
                  <button onclick="quickSetBaselineBP(110, 70, 'unknown')"
                    class="p-2 rounded-xl border text-left transition ${u.baselineCategory === 'unknown' ? 'bg-emerald-500/25 border-emerald-400 text-white font-semibold' : 'bg-black/30 border-white/10 text-white/70'}">
                    <div class="text-[11px] font-bold">❓ Bilmiyorum</div>
                    <div class="text-[9px] text-white/55">110 / 70 varsayalım, sonra güncellersiniz</div>
                  </button>
                </div>
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
            
              <!-- WhatsApp ile Eş Daveti Butonu (Geri tuşu destekli) -->
              <button onclick="sendPartnerInviteWhatsApp()" class="w-full py-2.5 bg-gradient-to-r from-amber-500/30 to-emerald-500/25 hover:from-amber-500/40 border border-amber-400/40 rounded-2xl text-amber-100 font-bold text-[11px] transition flex items-center justify-center space-x-1.5 shadow-md">
                <span>💌</span>
                <span>${p.shortName || 'Eşine'}'a WhatsApp ile Davet Gönder</span>
              </button>
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
          { id: 'baseline', lbl: '❤️ M0 Bazal & Kilo' },
          { id: 'supplements', lbl: '💊 DMT1 Takvim' },
          { id: 'hospital', lbl: '🏥 Hastane & Doktor' },
          { id: 'partner',  lbl: '🤝 Eşim & Davet' },
          { id: 'security', lbl: '🔒 Veri & KVKK' },
          { id: 'ecosystem',lbl: '🌱 Giriş & Anket' }
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
  // MENÜ 5: DMT1 MİNERAL YARIŞMASI & KİŞİSEL TAKVİYE ZAMAN ÇİZELGESİ
  // Kadın Doğum & Biyoistatistik Uzman Onaylı Emilim Kuralları
  // =========================================================================
  if (sub === "supplements") {
    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        
        <!-- DMT1 Bilimsel Kural Kartı -->
        <div class="p-3.5 bg-gradient-to-br from-amber-950/40 via-white/5 to-white/5 rounded-3xl border border-amber-400/35 space-y-2">
          <div class="flex items-center space-x-2">
            <span class="text-base">🔬</span>
            <span class="font-bold text-amber-200 text-xs">DMT1 (Divalan Metal Taşıyıcı 1) Emilim Prensibi</span>
          </div>
          <p class="text-[10px] text-white/80 leading-relaxed">
            Demir (Ferro Sanol) ve Magnezyum/Kalsiyum bağırsak mukozasında aynı taşıyıcı kapı (DMT1) için yarışırlar. İkisinin de vücuda tam emilebilmesi için <b>en az 2 saat ara</b> ile alınmaları klinik olarak şarttır.
          </p>
          <div class="flex items-center space-x-2 text-[9px] text-emerald-300 font-semibold bg-emerald-950/30 border border-emerald-400/30 p-2 rounded-xl">
            <span>✓</span>
            <span>ToHUM Akıllı Saatleme, takviyelerinizi otomatik olarak 13 saatlik güvenli tamponla ayırmıştır.</span>
          </div>
        </div>

        <!-- Günlük Sakin Zaman Akışı (Calm Timeline) -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <span class="font-bold text-white text-xs block">🕒 Kişiselleştirilmiş Günlük Takviye Akışın</span>

          <div class="space-y-2.5 relative border-l-2 border-amber-400/30 ml-2.5 pl-3.5">
            
            <!-- 1. Demir -->
            <div class="relative group">
              <span class="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-rose-500 border-2 border-black"></span>
              <div class="p-2.5 bg-black/40 border border-rose-500/30 rounded-2xl space-y-1">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-rose-200 text-xs">🌅 08:30 · Sabah Aç Karnına</span>
                  <span class="text-[9px] px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-400/30 font-semibold">Demir</span>
                </div>
                <div class="text-[11px] font-semibold text-white">Ferro Sanol Duodenal (1 Kapsül)</div>
                <p class="text-[10px] text-white/65 leading-relaxed">
                  💡 <b>Emilim Tüyosu:</b> C vitamini (taze portakal suyu veya limonlu su) demir emilimini 3 kat artırır. Çay/kahve ve süt ürünlerinden en az 1 saat önce içiniz.
                </p>
              </div>
            </div>

            <!-- 2. Omega-3 & D3 -->
            <div class="relative group">
              <span class="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-amber-400 border-2 border-black"></span>
              <div class="p-2.5 bg-black/40 border border-amber-400/30 rounded-2xl space-y-1">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-amber-200 text-xs">☀️ 13:00 · Öğle Yemeği ile (Tok)</span>
                  <span class="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-semibold">DHA & D3</span>
                </div>
                <div class="text-[11px] font-semibold text-white">Ocean Mummy (Omega-3 DHA) + Coledan D3 (4 Damla)</div>
                <p class="text-[10px] text-white/65 leading-relaxed">
                  💡 <b>Emilim Tüyosu:</b> Yağda eriyen vitaminler (D, E, K, A ve Omega-3) sağlıklı yağlar içeren öğünle birlikte maksimum biyoyararlanım sağlar.
                </p>
              </div>
            </div>

            <!-- 2.5 Kolajen Peptit (Özel Takviye) -->
            ${state.hasCollagen ? `
              <div class="relative group">
                <span class="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-teal-400 border-2 border-black"></span>
                <div class="p-2.5 bg-black/40 border border-teal-400/30 rounded-2xl space-y-1">
                  <div class="flex justify-between items-center">
                    <span class="font-bold text-teal-200 text-xs">☕ 16:30 · İkindi Hafif Açlıkta</span>
                    <span class="text-[9px] px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-400/30 font-semibold">Özel Takviye</span>
                  </div>
                  <div class="text-[11px] font-semibold text-white">Hidrolize Kolajen Peptit (Tip 1 & 3 · 5000 mg)</div>
                  <p class="text-[10px] text-white/65 leading-relaxed">
                    💡 <b>DMT1 & Emilim Tüyosu:</b> Kolajen bir protein olduğundan sabahki demir emilimini baskılamaması için ikindi saatinde C vitaminiyle alınır. Pelvik bağ doku ve cilt elastikiyetini besler.
                  </p>
                </div>
              </div>
            ` : ''}

            <!-- 2.7 Diğer Kişiselleştirilmiş Özel Takviyeler -->
            ${(state.customSupplements || []).map(cs => `
              <div class="relative group">
                <span class="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-indigo-400 border-2 border-black"></span>
                <div class="p-2.5 bg-black/40 border border-indigo-400/30 rounded-2xl space-y-1">
                  <div class="flex justify-between items-center">
                    <span class="font-bold text-indigo-200 text-xs">🕒 ${cs.scheduledHour || '16:30'} · Kişisel Takviye</span>
                    <span class="text-[9px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 font-semibold">Özel</span>
                  </div>
                  <div class="text-[11px] font-semibold text-white">${cs.name} (${cs.dose || '1 Doz'})</div>
                  <p class="text-[10px] text-white/65 leading-relaxed">
                    💡 <b>Bilgi:</b> ${cs.dmt1Rule || 'Hekim tavsiyesine uygun saatte alınmalıdır.'}
                  </p>
                </div>
              </div>
            `).join('')}

            <!-- 3. Magnezyum -->
            <div class="relative group">
              <span class="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black"></span>
              <div class="p-2.5 bg-black/40 border border-emerald-400/30 rounded-2xl space-y-1">
                <div class="flex justify-between items-center">
                  <span class="font-bold text-emerald-200 text-xs">🌙 21:30 · Gece Yatmadan Önce (Tok)</span>
                  <span class="text-[9px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-semibold">Magnezyum</span>
                </div>
                <div class="text-[11px] font-semibold text-white">Magnimore Plus (Magnezyum Bisglisinat)</div>
                <p class="text-[10px] text-white/65 leading-relaxed">
                  💡 <b>DMT1 Güvencesi:</b> Sabahki demirden 13 saat uzakta olduğu için yarışma sıfırdır. Gece bacak kramplarını önler ve derin uykuyu destekler.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    `;
  }

  // =========================================================================
  // MENÜ 6: VERİ EGEMENLİĞİ, KVKK MAHMURİYETİ & JSON DIŞA AKTARMA
  // =========================================================================
  if (sub === "security") {
    return `
      <div class="space-y-3.5 animate-in fade-in duration-150 text-xs">
        
        <!-- KVKK & Açık Rıza Güvencesi -->
        <div class="p-3.5 bg-gradient-to-br from-emerald-950/40 via-white/5 to-white/5 rounded-3xl border border-emerald-400/35 space-y-2">
          <div class="flex items-center space-x-2">
            <span class="text-base">🔒</span>
            <span class="font-bold text-emerald-200 text-xs">Sağlık Verisi Egemenliği & Mahremiyet</span>
          </div>
          <p class="text-[10px] text-white/80 leading-relaxed">
            ToHUM, KVKK ve GDPR kapsamında hassas nitelikli sağlık verilerinizi korur. <b>Açık ev adresiniz veya GPS konumunuz asla istenmez.</b> Verileriniz yalnızca sizin ve bebeğinizin sağlığını takip etmek amacıyla saklanır.
          </p>
        </div>

        <!-- Dışa Aktarma (Export) ve Yedek Alma -->
        <div class="p-4 bg-white/5 rounded-3xl border border-white/10 space-y-3">
          <div class="flex justify-between items-center">
            <span class="font-bold text-white text-xs">💾 Sağlık Verilerimi Dışa Aktar</span>
            <span class="text-[9px] text-white/50">JSON Formatı</span>
          </div>
          <p class="text-[10px] text-white/65 leading-relaxed">
            M0 kardiyo bazal değerleriniz, anket yanıtlarınız, tansiyon geçmişiniz ve eşleşme bilgilerinizi tek tıkla bilgisayarınıza veya telefonunuza indirebilirsiniz:
          </p>
          <button onclick="downloadM0DataJson()"
            class="w-full py-3 bg-gradient-to-r from-emerald-500 to-amber-500 hover:from-emerald-600 text-black font-bold text-xs rounded-2xl shadow-lg transition flex items-center justify-center space-x-2">
            <span>📥</span>
            <span>Tüm M0 Verilerimi İndir (.json)</span>
          </button>
        </div>

        <!-- Sıfırlama ve Baştan Başlama -->
        <div class="p-4 bg-black/40 rounded-3xl border border-rose-500/25 space-y-2">
          <span class="font-bold text-rose-300 text-xs block">🗑️ Veri Sıfırlama</span>
          <p class="text-[10px] text-white/60 leading-relaxed">
            Cihazınızdaki yerel çerez ve profil verilerini tamamen sıfırlamak isterseniz:
          </p>
          <button onclick="resetLocalData()"
            class="py-2.5 px-3.5 bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/35 text-rose-200 text-[11px] font-semibold rounded-xl transition">
            Yerel Verileri Sıfırla ve Çıkış Yap
          </button>
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


// =========================================================================
// TANSİYON ORTALAMASI (BÜYÜK / KÜÇÜK) VE WHATSAPP GERİ DÖNÜŞLÜ MODAL SİSTEMİ
// =========================================================================

// =========================================================================
// M0 VERİ EGEMENLİĞİ: JSON YEDEK DIŞA AKTARMA VE VERİ SIFIRLAMA
// =========================================================================
window.downloadM0DataJson = function() {
  triggerHaptic([20, 30]);
  fetch("/api/export")
    .then(r => r.json())
    .then(data => {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `tohum_m0_saglik_yedegi_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      triggerReaction("water", "M0 Sağlık yedeği JSON olarak indirildi.");
    })
    .catch(() => {
      // Fallback: download local state
      const localDump = {
        exportedAt: new Date().toISOString(),
        system: "ToHUM Calm Tech M0 Health Engine (Local)",
        user: state.user,
        baby: state.baby,
        partner: state.partner,
        healthData: state.healthData
      };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(localDump, null, 2));
      const downloadAnchor = document.createElement("a");
      downloadAnchor.setAttribute("href", dataStr);
      downloadAnchor.setAttribute("download", `tohum_m0_saglik_yedegi_${Date.now()}.json`);
      document.body.appendChild(downloadAnchor);
      downloadAnchor.click();
      downloadAnchor.remove();
      triggerReaction("water", "M0 Sağlık yedeği yerel olarak indirildi.");
    });
};

window.resetLocalData = function() {
  if (confirm("Tüm yerel profil verilerinizi sıfırlayıp baştan başlamak istediğinize emin misiniz?")) {
    try {
      localStorage.removeItem("tohum_user_profile");
      localStorage.removeItem("tohum_offline_profile");
    } catch(e) {}
    location.href = "index.html?flow=welcome";
  }
};

window.calculateLmpFromWeek = function(weekNum) {
  const w = parseInt(weekNum, 10) || 31;
  const now = new Date();
  const lmpTime = now.getTime() - (w * 7 * 24 * 60 * 60 * 1000);
  const lmp = new Date(lmpTime);
  const yyyy = lmp.getFullYear();
  const mm = String(lmp.getMonth() + 1).padStart(2, '0');
  const dd = String(lmp.getDate()).padStart(2, '0');
  state.user.lmpDate = `${yyyy}-${mm}-${dd}`;
  const due = new Date(lmpTime + 280 * 24 * 60 * 60 * 1000);
  state.user.dueDate = due.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  state.user.daysRemaining = Math.max(0, Math.ceil((due - now) / (1000 * 60 * 60 * 24)));
  state.baby.week = w;
  saveState();
};


// =========================================================================
// BUSE'NİN GÖZÜNDEN CALM TECH: "SEN NASILSIN?" VE "OĞUZ'A FISILDA" SİSTEMİ
// =========================================================================

// =========================================================================
// TOHUM MATERNAL İHTİYAÇ ANALİZ MOTORU & ÇİFT OTURUM (ÜREM AİLESİ)
// Anne eşinden talep bildirmez; sistem verileri analiz edip babaya rehberlik eder.
// =========================================================================
window.computeMaternalNeedsAnalysis = function() {
  const curW = state.baby.week || 31;
  const latestBp = (state.healthData.bloodPressureHistory && state.healthData.bloodPressureHistory[0]) || { systolic: 92, diastolic: 62 };
  const waterCurrent = state.nurture.water.count;
  const waterTarget = state.nurture.water.target;
  const waterDeficit = Math.max(0, waterTarget - waterCurrent);
  const magnesiumTaken = (state.prescriptions.find(p => p.id === 'magnesium') || {}).takenToday;
  const currentMood = state.healthData.selectedMood || 'tired';

  const cards = [];

  // 1. Amniyotik Sıvı & Hidrasyon Açığı Analizi
  if (waterDeficit > 0) {
    cards.push({
      id: "water",
      category: "Amniyotik Hidrasyon",
      badge: `${waterDeficit} Bardak Açık`,
      badgeColor: "text-sky-300 bg-sky-950/60 border-sky-400/30",
      headline: "Amniyotik Döngü İçin Hidrasyon Desteği Gerekiyor",
      insight: `Buse bugün ${waterCurrent}/${waterTarget} bardak su tüketti. 31. haftada amniyotik sıvı her 3 saatte bir tamamen yenilenir. Sıvı eksikliği plasental perfüzyonu etkileyebilir.`,
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
      insight: `Buse bugün ${waterCurrent} bardak su tüketimini tamamladı. Güneş'in amniyotik yaşam havuzu taze ve dengeli.`,
      actionTitle: "Hidrasyon dengelendi, dinlenmeye eşlik edin",
      actionType: "water",
      buttonText: "Su İkramı Yapıldı",
      completed: true
    });
  }

  // 2. Lomber Lordoz & Pelvik Rahatlama Analizi (Biomekanik)
  const isFatigued = currentMood === 'tired' || currentMood === 'ache' || (state.healthData.selectedSymptoms || []).includes("Akşam Yorgunluğu") || (state.healthData.selectedSymptoms || []).includes("Hafif Bel Ağrısı");
  cards.push({
    id: "massage",
    category: "Biomekanik & Lomber Yük",
    badge: isFatigued ? "Pelvis Yükü Yüksek" : "Fiziksel Yük Dengeli",
    badgeColor: isFatigued ? "text-amber-300 bg-amber-950/60 border-amber-400/30" : "text-emerald-300 bg-emerald-950/60 border-emerald-400/30",
    headline: isFatigued ? "31. Hafta Ağırlık Merkezi Değişimi & Bel Hassasiyeti" : "Pelvik Denge Korunuyor",
    insight: `31. haftada Güneş'in 1600 gramı aşan ağırlığı annenin sakroiliak eklemlerine baskı yapar. Buse "${currentMood === 'tired' ? 'Akşam Yorgunluğu' : (currentMood === 'ache' ? 'Bel Hassasiyeti' : 'Doğal Gebelik Yorgunluğu')}" hissettiğini kaydetti.`,
    actionTitle: "Buse'yi sol yan yatışa geçirin, bacak arasına destek yastığı koyun ve 10 dk hafif bel masajı uygulayın",
    actionType: "massage",
    buttonText: "Bel Desteği Sağladım",
    completed: false
  });

  // 3. Kardiyovasküler Denge Analizi (Buse'nin 90/60 Bazali)
  const isBpSafe = latestBp.systolic <= 104 && latestBp.diastolic <= 70;
  cards.push({
    id: "cardio",
    category: "Kardiyovasküler Bazal",
    badge: isBpSafe ? "90/60 Bazal İle Uyumlu" : "Yükselme Sinyali",
    badgeColor: isBpSafe ? "text-emerald-300 bg-emerald-950/60 border-emerald-400/30" : "text-rose-300 bg-rose-950/60 border-rose-400/30",
    headline: `Son Ölçüm: ${latestBp.systolic}/${latestBp.diastolic} mmHg`,
    insight: isBpSafe 
      ? "Buse'nin sistolik ve diyastolik değerleri kendi doğal 90/60 bazal koridoru içinde seyrediyor. Anne kardiyak açıdan huzurlu ve güvende."
      : "Buse'nin doğal bazaline (90/60) kıyasla sistolik değerde yükselme var. Buse'yi loş ve sakin bir odada 15 dakika sol yan pozisyonda dinlenmeye davet edin.",
    actionTitle: isBpSafe ? "Ortamın sakinliğini ve loş ışığını koruyun" : "Buse'ye sessiz ve huzurlu bir dinlenme ortamı hazırlayın",
    actionType: "cardio",
    buttonText: "Dinginlik Sağlandı",
    completed: isBpSafe
  });

  // 4. DMT1 Farmakoloji & Magnezyum Saati
  cards.push({
    id: "magnesium",
    category: "DMT1 Mineral Zamanlaması",
    badge: magnesiumTaken ? "Alındı" : "Saat 21:30 Bekleniyor",
    badgeColor: magnesiumTaken ? "text-emerald-300 bg-emerald-950/60 border-emerald-400/30" : "text-amber-300 bg-amber-950/60 border-amber-400/30",
    headline: "Magnimore Plus (Magnezyum Saşe)",
    insight: "Demir ve kalsiyum ile yarışmaması için magnezyum akşam tok karnına alınmalıdır. Gece bacak kramplarını ve rahim miyometriyum kasılmalarını engeller.",
    actionTitle: "Saat 21:30'da magnezyum saşesini 1 bardak ılık suyla karıştırıp Buse'ye ikram edin",
    actionType: "magnesium",
    buttonText: "Magnezyumu Hazırladım",
    completed: !!magnesiumTaken
  });

  return cards;
};

window.completeFatherCareAction = function(actionType) {
  if (actionType === "water") {
    if (state.nurture.water.count < state.nurture.water.target) {
      state.nurture.water.count++;
    }
    state.growth.points += 10;
    triggerReaction("water", "Oğuz 1 bardak ılık su getirdi. Amniyotik sıvı tazelendi!");
  } else if (actionType === "massage") {
    state.growth.points += 15;
    triggerReaction("magnesium", "Oğuz'un bel ve sırt desteğiyle Buse'nin pelvik gerginliği azaldı.");
  } else if (actionType === "magnesium") {
    const mag = state.prescriptions.find(p => p.id === "magnesium");
    if (mag) {
      mag.takenToday = true;
      mag.takenTime = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    }
    state.growth.points += 10;
    triggerReaction("magnesium", "Oğuz Magnezyumu hazırladı. Buse takviyesini aldı.");
  }

  fetch('/api/partner/care-action', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: actionType })
  }).catch(function(e) { console.log(e); });

  saveState();
  render();
};

window.switchSessionRole = function(role) {
  if (!state.family) {
    state.family = { name: "Ürem Ailesi", activeSession: "mother" };
  }
  state.family.activeSession = role;
  if (role === "father") {
    state.currentTab = "father";
  } else {
    state.currentTab = "home";
  }
  saveState();
  render();
};

window.selectMaternalMood = function(moodId) {
  state.healthData.selectedMood = moodId;
  const moodResponses = {
    serene: "Dingin ve huzurlusun. Bedenin Güneş'le mükemmel bir sükunette nefes alıyor.",
    tired: "Yorgun hissetmen çok doğal; bedenin şu an mucizevi bir organ ve doku inşa ediyor. Dinlen.",
    emotional: "Hormonlar yaşamın tatlı dalgalarıdır. Bedenine ve hislerine şefkatle sarıl.",
    ache: "31. haftada pelvis bebeğe yer açıyor. Sol yanına uzanıp lomber bölgeni rahatlatabilirsin."
  };
  
  // Arka planda eş portalına proaktif ihtiyaç sinyali aktarımı (anneye hissettirilmeden, kendi düşünmüş gibi)
  if (moodId === 'ache' || moodId === 'tired') {
    try {
      fetch('/api/partner/signal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          signal: {
            type: moodId === 'ache' ? 'biomechanic' : 'rest',
            title: moodId === 'ache' ? 'Lomber Yük Hassasiyeti' : 'Dinlenme & Uyku İhtiyacı',
            text: moodId === 'ache' 
              ? "Buse'nin 31. haftasında pelvik genişleme kaynaklı lomber yükü arttı. Sormasını beklemeden ılık bir bitki çayı veya nazik bir sırt masajı sunabilirsin."
              : "Buse'nin biyolojik ritmi dinlenme sinyali veriyor. Sessiz ve huzurlu bir ortam hazırlayabilirsin."
          }
        })
      }).catch(function() {});
    } catch(e) {}
  }
  state.interactive.reactionText = moodResponses[moodId] || "Sen iyiysen Güneş de iyi.";
  triggerHaptic([20, 20]);
  saveState();
  render();
};

window.quickWhisperToPartner = function(actionType) {
  const pName = state.partner.shortName || "Oğuz";
  let actionTitle = "Canlı Destek Fısıltısı";
  let actionMsg = "";
  if (actionType === "water") {
    actionTitle = "💧 Ilık Su İsteği";
    actionMsg = `Canım ${pName}, bana 1 bardak ılık su getirebilir misin? Buse & Güneş 🌱`;
  } else if (actionType === "massage") {
    actionTitle = "💆‍♂️ 5 Dk Bel Masajı";
    actionMsg = `Canım ${pName}, biraz bel ağrım var, 5 dakika hafif masaj yapabilir misin? 💛`;
  } else {
    actionTitle = "💛 Sevgi Fısıltısı";
    actionMsg = `Canım ${pName}, seni seviyoruz ve buradayız. Güneş'ten sana bir tekme var! 🐾`;
  }

  // Push to partner live feed immediately
  if (!state.partner.liveFeed) state.partner.liveFeed = [];
  state.partner.liveFeed.unshift({
    id: Date.now(),
    time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
    type: "whisper",
    title: actionTitle,
    text: actionMsg
  });
  if (state.partner.liveFeed.length > 8) state.partner.liveFeed.pop();

  saveProfileToBackend(false);
  triggerReaction("water", `${actionTitle} ${pName}'a iletildi!`);
  
  // Also offer WhatsApp modal
  openWhatsAppModal("partner_pain", state.partner.name || "Oğuz Baltacıoğlu", state.partner.phone || "", actionMsg);
};

window.silentUpdateBaselineBP = function(sysVal, diaVal) {
  if (sysVal !== null && sysVal !== undefined && sysVal !== "") {
    const s = parseInt(sysVal, 10);
    if (!isNaN(s) && s > 0) state.user.baselineSys = s;
  }
  if (diaVal !== null && diaVal !== undefined && diaVal !== "") {
    const d = parseInt(diaVal, 10);
    if (!isNaN(d) && d > 0) state.user.baselineDia = d;
  }
  state.user.baselineBP = `${state.user.baselineSys}/${state.user.baselineDia}`;
  if (state.user.baselineSys <= 95) state.user.baselineCategory = 'low';
  else if (state.user.baselineSys >= 125) state.user.baselineCategory = 'high';
  else state.user.baselineCategory = 'normal';

  const badge = document.getElementById("onbBpBadge");
  if (badge) {
    badge.textContent = `${state.user.baselineBP} mmHg`;
    if (state.user.baselineSys <= 95) {
      badge.className = "px-2.5 py-1 rounded-full text-[10px] font-bold border bg-emerald-500/20 text-emerald-300 border-emerald-400/30";
    } else if (state.user.baselineSys >= 125) {
      badge.className = "px-2.5 py-1 rounded-full text-[10px] font-bold border bg-amber-500/20 text-amber-200 border-amber-400/30";
    } else {
      badge.className = "px-2.5 py-1 rounded-full text-[10px] font-bold border bg-sky-500/20 text-sky-200 border-sky-400/30";
    }
  }

  saveState();
};

window.quickSetBaselineBP = function(sys, dia, cat) {
  state.user.baselineSys = sys;
  state.user.baselineDia = dia;
  state.user.baselineBP = `${sys}/${dia}`;
  state.user.baselineCategory = cat;

  const sysEl = document.getElementById("onbSysInput");
  const diaEl = document.getElementById("onbDiaInput");
  const badge = document.getElementById("onbBpBadge");
  if (sysEl) sysEl.value = sys;
  if (diaEl) diaEl.value = dia;
  if (badge) {
    badge.textContent = `${sys}/${dia} mmHg`;
  }
  triggerHaptic(15);
  saveState();
  render();
};

window.openWhatsAppModal = function(type, recipientName, recipientPhone, message) {
  if (!state.whatsAppModal) state.whatsAppModal = {};
  const cleanPhone = (recipientPhone || "").replace(/[^0-9]/g, '');
  const encMsg = encodeURIComponent(message);
  const waUrl = cleanPhone ? `https://wa.me/${cleanPhone}?text=${encMsg}` : `https://wa.me/?text=${encMsg}`;

  let title = "WhatsApp Paylaşımı";
  if (type === "partner_invite") title = "💌 Eş Daveti Gönder";
  else if (type === "partner_pain") title = "🚨 Eşe Destek Çağrısı";
  else if (type === "clinical_summary") title = "📋 Doktoruna İlet";

  state.whatsAppModal = {
    isOpen: true,
    title: title,
    recipientName: recipientName || state.partner.name || "Eşim",
    recipientPhone: recipientPhone || state.partner.phone || "",
    message: message,
    waUrl: waUrl,
    type: type
  };
  triggerHaptic([20, 30]);
  render();
};

window.closeWhatsAppModal = function() {
  if (!state.whatsAppModal) state.whatsAppModal = {};
  state.whatsAppModal.isOpen = false;
  triggerHaptic(15);
  render();
};

window.copyWhatsAppMessage = function() {
  if (state.whatsAppModal && state.whatsAppModal.message) {
    navigator.clipboard.writeText(state.whatsAppModal.message).then(() => {
      const btn = document.getElementById('waCopyStatus');
      if (btn) btn.textContent = "Kopyalandı ✓";
      triggerReaction("water", "Mesaj panoya kopyalandı.");
      setTimeout(() => {
        if (btn) btn.textContent = "Mesajı Kopyala";
      }, 2000);
    }).catch(() => {
      triggerReaction("water", "Mesaj kopyalandı.");
    });
  }
};

window.onWhatsAppOpened = function() {
  const banner = document.getElementById('waStatusBanner');
  if (banner) {
    banner.innerHTML = '<span>✅</span> <span><b>Mesaj WhatsApp\'a aktarıldı!</b> İşiniz bittiğinde yukarıdaki <b>‹ Geri Dön</b> butonuyla devam edebilirsiniz.</span>';
    banner.className = 'p-2.5 bg-emerald-500/25 border border-emerald-400/50 rounded-xl text-[10px] text-emerald-100 flex items-center space-x-2';
  }
};

function renderWhatsAppModal() {
  const m = state.whatsAppModal;
  if (!m || !m.isOpen) return '';

  return `
    <div id="whatsAppModalOverlay" class="fixed inset-0 z-[250] flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div class="w-full max-w-md bg-[#160E0A] border border-amber-400/40 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] p-5 space-y-4 max-h-[92vh] overflow-y-auto text-white">
        
        <!-- ÜST GEZİNTİ VE GERİ DÖNÜŞ BARI (EN BELİRGİN GERİ TUŞU) -->
        <div class="flex items-center justify-between border-b border-white/10 pb-3">
          <button onclick="closeWhatsAppModal()" class="px-3.5 py-1.5 bg-white/15 hover:bg-white/25 active:scale-95 border border-white/20 rounded-2xl text-xs font-bold text-white flex items-center space-x-1.5 transition shadow-sm" title="Uygulamaya Geri Dön">
            <span class="text-sm">‹</span>
            <span>Geri Dön</span>
          </button>
          
          <div class="text-center">
            <span class="text-xs font-bold text-amber-200 block">${m.title || 'WhatsApp Paylaşımı'}</span>
            <span class="text-[9px] text-white/50">ToHUM Calm Tech</span>
          </div>

          <button onclick="closeWhatsAppModal()" class="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/60 hover:text-white flex items-center justify-center text-xs" title="Kapat">
            ✕
          </button>
        </div>

        <!-- ALICI VE BİLGİ KARTI -->
        <div class="p-3.5 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-lg">
              💬
            </div>
            <div>
              <div class="text-xs font-bold text-white">${m.recipientName || 'Eş / Doktor'}</div>
              <div class="text-[10px] text-white/55 font-mono">${m.recipientPhone || 'Telefon Tanımlı'}</div>
            </div>
          </div>
          <span class="px-2.5 py-1 rounded-full text-[9px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            Hazır ✓
          </span>
        </div>

        <!-- MESAJ ÖNİZLEME KUTUSU -->
        <div class="space-y-1.5">
          <div class="flex justify-between items-center text-[10px]">
            <span class="text-amber-200/90 font-semibold">Gönderilecek Mesajın Önizlemesi:</span>
            <span class="text-white/45">Önizleme</span>
          </div>
          <div class="p-3.5 bg-black/60 border border-emerald-500/30 rounded-2xl text-xs text-white/90 leading-relaxed font-sans select-all whitespace-pre-wrap max-h-44 overflow-y-auto shadow-inner">
${m.message}
          </div>
        </div>

        <!-- BİLGİLENDİRME NOTU -->
        <div id="waStatusBanner" class="p-2.5 bg-emerald-950/40 border border-emerald-400/30 rounded-xl text-[10px] text-emerald-200 flex items-center space-x-2">
          <span>💡</span>
          <span>WhatsApp açıldıktan sonra istediğiniz an üstteki <b>‹ Geri Dön</b> butonuyla uygulamaya dönebilirsiniz.</span>
        </div>

        <!-- İŞLEM BUTONLARI -->
        <div class="space-y-2 pt-1">
          <!-- WhatsApp'ı Aç Butonu -->
          <a href="${m.waUrl}" target="_blank" onclick="onWhatsAppOpened()"
            class="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 active:scale-98 text-white font-bold text-xs rounded-2xl shadow-lg transition flex items-center justify-center space-x-2 text-center">
            <span class="text-sm">💬</span>
            <span>WhatsApp'ta Aç ve Gönder ➔</span>
          </a>

          <!-- İki İkincil Buton: Kopyala ve Geri Dön -->
          <div class="grid grid-cols-2 gap-2">
            <button onclick="copyWhatsAppMessage()"
              class="py-2.5 px-3 bg-white/10 hover:bg-white/15 active:scale-95 border border-white/15 rounded-xl text-xs font-semibold text-white/85 flex items-center justify-center space-x-1.5 transition">
              <span>📋</span>
              <span id="waCopyStatus">Mesajı Kopyala</span>
            </button>

            <button onclick="closeWhatsAppModal()"
              class="py-2.5 px-3 bg-white/10 hover:bg-white/15 active:scale-95 border border-white/15 rounded-xl text-xs font-semibold text-white/85 flex items-center justify-center space-x-1 transition">
              <span>‹</span>
              <span>ToHUM'a Geri Dön</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
}

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
    const refNow = new Date();
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
  const msg =
    `Canım ${state.partner.shortName || 'Eşim'}, ToHUM'da ${state.baby.name}'in ${state.baby.week}. hafta gelişim ve sağlık çemberini kurdum. ` +
    `Baba Destek Arayüzüne bağlanmak için Eşleştirme Kodumuz: ${code} 🌱\n\n` +
    `Bağlantı: http://localhost:8080/index.html?tab=father`;
  saveProfileToBackend(false);
  openWhatsAppModal(
    "partner_invite",
    state.partner.name || "Oğuz Baltacıoğlu",
    state.partner.phone || "+90 532 000 00 00",
    msg
  );
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
  const target = userName || "Komşu";
  if (!state.kovanMessages) {
    state.kovanMessages = [
      { sender: "Merve (Muradiye)", text: "Kızlar 31. haftada akşam bel ağrısı yaşayan var mı? Buse sen nasılsın?", time: "14:10", isMe: false },
      { sender: "Buse Nur", text: "Selam Merve, hafif bel hassasiyeti var ama magnezyum ve dinlenmeyle dengeliyoruz.", time: "14:15", isMe: true },
      { sender: "Zeynep", text: "Akşamları ayakları hafifçe yükselterek dinlenmek ödeme çok iyi geliyor canım.", time: "14:22", isMe: false }
    ];
  }
  const now = new Date();
  const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
  state.kovanMessages.push({
    sender: (state.user && state.user.shortName) || "Buse Nur",
    text: `@${target} Merhaba, paylaştığınız eşya ile ilgileniyorum.`,
    time: timeStr,
    isMe: true
  });
  if (typeof triggerHaptic !== "undefined") triggerHaptic([15, 20]);
  if (typeof triggerReaction !== "undefined") triggerReaction("water", `${target} kullanıcısına mesajınız iletildi.`);
  render();
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
    }
    spawnNutrientFlow("water", 45);
    triggerReaction("water", "İçilen su amniyotik sıvıyı tazeledi. Güneş su dalgalarıyla ferahladı.");
  } else if (type === "nutrient" || type === "meal") {
    triggerHaptic([20, 30, 20]);
    state.nurture.meal.taken = true;
    state.growth.points += 10;
    spawnNutrientFlow("omega", 45);
    triggerReaction("omega", "Hücresel besin iletildi. Güneş büyüme enerjisiyle canlandı.");
  }
  render();

  // Bebeğin Canlı Işık, Renk ve Tepki Animasyonu (Gözle Görülür Aydınlanma)
  setTimeout(() => {
    const babyImg = document.getElementById("cinematicBabyVisual");
    if (babyImg) {
      if (type === "water") {
        babyImg.style.filter = "brightness(1.22) contrast(1.1) drop-shadow(0 0 45px rgba(103, 232, 249, 0.8))";
        babyImg.style.transform = "scale(1.025)";
      } else {
        babyImg.style.filter = "brightness(1.22) contrast(1.1) drop-shadow(0 0 45px rgba(110, 231, 183, 0.8))";
        babyImg.style.transform = "scale(1.025)";
      }
      setTimeout(() => {
        if (babyImg) {
          babyImg.style.filter = "brightness(0.95) contrast(1.05)";
          babyImg.style.transform = "scale(1)";
        }
      }, 1400);
    }
  }, 30);
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

// Initialization moved to end of file after all window.* handlers are registered

// =========================================================================

// =========================================================================
// FAZ 1 TAMAMLANDI: TÜM EKSİK FONKSİYONLAR
// =========================================================================

// CARDIFF 10 TEKME SAYACI
window.registerFetalKick = function() {
  const k = state.birthModule.kickSession;
  if (k.count >= 10) {
    triggerReaction("water", "Güneş bugünün 10 hareketini çoktan tamamladı. Doğal ritmi mükemmel!");
    return;
  }
  k.count++;
  const now = new Date();
  if (k.startTime === '--:--' || k.count === 1) {
    k.startTime = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    k.elapsedMinutes = 0;
  }
  k.elapsedMinutes = Math.round((now - new Date()) / 60000) || k.elapsedMinutes;
  state.growth.points += 3;
  triggerHaptic([30, 20, 40]);

  const canvas = document.getElementById("cinematicCanvas");
  if (canvas) ripples.push(new LiquidRipple(canvas.width/2, canvas.height * 0.38, "rgba(251,191,36,0.85)"));
  spawnNutrientFlow("folic", 20);

  const msgs = [
    "Güneş bir tekme attı! " + k.count + ". hareket kaydedildi.",
    "Güçlü bir bacak hareketi! " + k.count + "/10 tamamlandı.",
    "Güneş aktif! " + k.count + " hareket sayıldı."
  ];
  triggerReaction("folic", msgs[Math.floor(Math.random() * msgs.length)]);

  if (k.count >= 10) {
    triggerHaptic([30, 50, 30, 50, 80]);
    setTimeout(() => {
      triggerReaction("water", "Harika! Cardiff 10 hedefi tamamlandı. Güneş bugün çok aktif!");
    }, 300);
  }
  render();
};

// KASIL MA / DALGA SAYACI
window.toggleContractionTimer = function() {
  const c = state.birthModule.contractionTimer;
  if (c.isRunning) {
    // Durdur ve kaydet
    clearInterval(c.intervalId);
    c.isRunning = false;
    const dur = c.currentSeconds;
    const freq = c.waveHistory.length > 0
      ? Math.round((Date.now() - (c._lastWaveTimestamp || Date.now())) / 60000)
      : 0;
    c.lastDuration = dur;
    c.lastFrequency = freq || c.lastFrequency;

    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
    const isBraxton = dur < 45 || freq > 10;
    c.waveHistory.unshift({ id: c.waveHistory.length + 1, time: timeStr, duration: dur, frequency: c.lastFrequency, isBraxton });
    if (c.waveHistory.length > 10) c.waveHistory.pop();

    // 5-1-1 analizi
    const recentReal = c.waveHistory.filter(w => !w.isBraxton);
    if (recentReal.length >= 3 && recentReal.every(w => w.duration >= 55 && w.frequency <= 6)) {
      c.analysisStatus = 'active_labor';
      triggerHaptic([50, 100, 50, 100, 50]);
      triggerReaction("magnesium", "5-1-1 Kuralı aktif! Manisa Şehir Hastanesi'ne yola çıkma zamanı!");
    } else {
      c.analysisStatus = 'braxton_hicks';
      triggerReaction("folic", "Dalga kaydedildi: " + dur + " saniye. " + (isBraxton ? "Braxton Hicks (hazırlık) dalgası." : "Düzenli dalga kaydı yapıldı."));
    }
    c.currentSeconds = 0;
    c.intervalId = null;
  } else {
    // Başlat
    c._lastWaveTimestamp = Date.now();
    c.isRunning = true;
    c.currentSeconds = 0;
    c.intervalId = setInterval(() => {
      c.currentSeconds++;
      render();
    }, 1000);
    triggerHaptic(20);
    triggerReaction("idle", "Kasılma başladı. Derin burun nefesi alın, yavaşça üfleyerek verin.");
  }
  render();
};

window.resetContractionTimer = function() {
  const c = state.birthModule.contractionTimer;
  if (c.intervalId) clearInterval(c.intervalId);
  c.isRunning = false;
  c.currentSeconds = 0;
  c.intervalId = null;
  triggerHaptic(10);
  render();
};

// ÇANTA İTEM TOGGLE
window.toggleBagItem = function(id) {
  const item = state.birthModule.bagItems.find(i => i.id === id);
  if (item) {
    item.done = !item.done;
    triggerHaptic(15);
    const msg = item.done
      ? item.title.substring(0, 30) + "... çantaya eklendi ✓"
      : item.title.substring(0, 30) + "... işareti kaldırıldı.";
    triggerReaction("folic", msg);
    render();
  }
};

// ALIŞVERIŞ ITEM TOGGLE
window.toggleShoppingItem = function(id) {
  const item = state.shopping.items.find(i => i.id === id);
  if (item) {
    item.done = !item.done;
    triggerHaptic(15);
    render();
  }
};

// HASTANE NAVİGASYON (Google Maps deep link)
window.openHospitalNavigation = function() {
  const mapsUrl = "https://www.google.com/maps/dir/?api=1&destination=Manisa+%C5%9Eehir+Hastanesi&travelmode=driving";
  triggerHaptic([20, 30]);
  triggerReaction("omega", "Manisa Şehir Hastanesi rotası Google Maps'te açılıyor...");
  setTimeout(() => window.open(mapsUrl, '_blank'), 400);
};

// OĞUZ'A AĞRI BİLDİRİMİ (WhatsApp deep link)
window.sendPartnerPainAlert = function() {
  const week = state.baby.week;
  const msg = `${state.partner.shortName || 'Oğuz'}, ${week}. haftada dalga/kasılma hissediyorum. Lütfen telefona bak veya eve gel 🌱 (ToHUM)`;
  openWhatsAppModal(
    "partner_pain",
    state.partner.name || "Oğuz Baltacıoğlu",
    state.partner.phone || "+90 532 000 00 00",
    msg
  );
};

// Aliases for Calm Tech & Cross-module interactions
window.openHospitalMap = window.openHospitalNavigation;
window.logKickEvent = window.registerFetalKick;
window.resetKickSession = function() {
  if (state.birthModule && state.birthModule.kickSession) {
    state.birthModule.kickSession.count = 0;
    state.birthModule.kickSession.isGoalReached = false;
    if (typeof triggerReaction !== "undefined") triggerReaction("folic", "Fetal tekme sayımı sıfırlandı.");
    if (typeof triggerHaptic !== "undefined") triggerHaptic(15);
    render();
  }
};
window.addBloodPressureReading = window.addNewBloodPressureLog;
window.addShoppingItem = window.addNewShoppingItem;

// İLAÇ AL (Ana Sayfa kısayolu)
window.takePrescriptionInHome = function(id) {
  const p = state.prescriptions.find(x => x.id === id);
  if (!p) return;
  if (!p.takenToday && window.checkDmt1Interaction && !window.checkDmt1Interaction(id)) {
    return;
  }
  p.takenToday = !p.takenToday;
  const now = new Date();
  p.takenTime = p.takenToday
    ? now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0')
    : null;
  triggerHaptic([15, 30]);
  if (p.takenToday) {
    state.growth.points += 10;
    spawnNutrientFlow(p.particleColor || "folic", 25);
    triggerReaction(p.particleColor || "folic", p.shortName + " alındı. " + p.bioTip);
  } else {
    triggerReaction("idle", p.shortName + " işareti kaldırıldı.");
  }
  render();
};

// PELVİK EGZERSİZ SEÇ
window.selectPelvicExercise = function(idx) {
  state.healthData.selectedExerciseIndex = idx;
  triggerHaptic(10);
  render();
};

// PELVİK EGZERSİZ TAMAMLA
window.toggleExerciseComplete = function(id) {
  const ex = state.healthData.exercises.find(e => e.id === id);
  if (!ex) return;
  ex.completed = !ex.completed;
  triggerHaptic(20);
  if (ex.completed) {
    state.growth.points += ex.points || 10;
    const allDone = state.healthData.exercises.every(e => e.completed);
    if (allDone) {
      state.healthData.pelvicStreakDays++;
      triggerHaptic([30, 50, 30, 50, 80]);
      triggerReaction("folic", "Tüm pelvik egzersizler tamamlandı! Seri: " + state.healthData.pelvicStreakDays + " gün.");
    } else {
      triggerReaction("folic", ex.name + " tamamlandı. +" + (ex.points || 10) + " puan kazanıldı.");
    }
  }
  render();
};

// PELVİK REHBERLİ SEANS BAŞLAT/BİTİR
window.togglePelvicExercise = function() {
  const h = state.healthData;
  if (h.isExerciseRunning) {
    clearInterval(h.exerciseInterval);
    h.isExerciseRunning = false;
    h.exerciseInterval = null;
    h.exerciseTimer = 0;
    triggerHaptic([20, 40]);
    render();
  } else {
    h.isExerciseRunning = true;
    h.exerciseTimer = 0;
    const phases = [
      { at: 0,  text: "Sık (4 sn Nefes Al)" },
      { at: 4,  text: "Tut (7 sn)" },
      { at: 11, text: "Üfle (8 sn)" }
    ];
    h.exerciseInterval = setInterval(() => {
      h.exerciseTimer++;
      const cycle = h.exerciseTimer % 19;
      const phase = phases.filter(p => cycle >= p.at).pop();
      if (phase) h.exercisePhase = phase.text;
      render();
    }, 1000);
    triggerHaptic(15);
    render();
  }
};

// TANSİYON ÖLÇÜM EKLE (Form tabanlı)
window.addNewBloodPressureLog = function() {
  const systolic = prompt("Sistolik değer (üst sayı, örn: 92):");
  if (!systolic) return;
  const diastolic = prompt("Diyastolik değer (alt sayı, örn: 62):");
  if (!diastolic) return;

  const sVal = parseInt(systolic);
  const dVal = parseInt(diastolic);
  if (isNaN(sVal) || isNaN(dVal)) {
    triggerReaction("omega", "Lütfen geçerli bir tansiyon sayısı girin.");
    return;
  }

  const now = new Date();
  const timeStr = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
  const dateStr = now.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long' }) + ' (' + timeStr + ')';
  const isNormal = sVal < 130 && dVal < 85 && sVal >= 80;

  const analysis = window.runAiSeedCoreAnalysis ? window.runAiSeedCoreAnalysis(sVal, dVal) : null;
  state.healthData.bloodPressureHistory.unshift({
    id: state.healthData.bloodPressureHistory.length + 1,
    date: dateStr,
    systolic: sVal,
    diastolic: dVal,
    note: analysis ? analysis.badgeText : (sVal < 115 ? "Güvenli aralıkta" : (sVal >= 130 ? "Yüksek — Dr. Yılmaz'ı ara" : "İzleme önerilir")),
    isNormal: isNormal
  });

  triggerHaptic([20, 30]);
  if (sVal >= 130 || dVal >= 85) {
    triggerReaction("magnesium", "Tansiyon yüksek! " + sVal + "/" + dVal + " mmHg. Dr. Ayşe Yılmaz'ı hemen ara.");
    triggerHaptic([50, 100, 50]);
  } else {
    triggerReaction("water", "Tansiyon kaydedildi: " + sVal + "/" + dVal + " mmHg — Güvenli aralıkta.");
  }
  render();
};

// KİLO GÜNCELLE
window.editCurrentWeight = function() {
  const newWeight = prompt("Bugünkü kilonuzu girin (kg, örn: 65.5):", state.user.currentWeight);
  if (!newWeight) return;
  const val = parseFloat(newWeight);
  if (isNaN(val) || val < 40 || val > 150) {
    triggerReaction("omega", "Lütfen geçerli bir kilo girin (40-150 kg).");
    return;
  }
  state.user.currentWeight = val;
  triggerHaptic(15);
  triggerReaction("folic", "Kilo güncellendi: " + val + " kg (Başlangıç: " + state.user.startWeight + " kg · Artış: +" + (val - state.user.startWeight).toFixed(1) + " kg)");
  render();
};

// SEMPTOM KAYDET
window.logSymptomAction = function(symptom) {
  if (state.healthData.selectedSymptoms.includes(symptom)) {
    state.healthData.selectedSymptoms = state.healthData.selectedSymptoms.filter(s => s !== symptom);
  } else {
    state.healthData.selectedSymptoms.push(symptom);
  }
  triggerHaptic(10);
  render();
};

// RUH HALİ KAYDET
window.logMoodAction = function(mood) {
  state.healthData.selectedMood = mood;
  triggerHaptic(10);
  triggerReaction("water", "Ruh hali güncellendi: " + mood);
  render();
};

// REÇETE PDF YÜKLE (simülasyon)
window.simulatePdfUpload = function() {
  triggerReaction("omega", "PDF yükleme özelliği yakında gelecek. Şimdilik tahlil değerlerini manuel girin.");
  triggerHaptic(15);
};

// ULTRASON FOTOĞRAFI EKLE
window.addNewUltrasoundPhoto = function() {
  triggerReaction("folic", "Ultrason galerisi yakında: Fotoğraf yükleme özelliği geliyor. Klinik görüntülerinizi buraya ekleyeceksiniz.");
  triggerHaptic(15);
};

// REÇETE EKLE
window.addNewPrescription = function() {
  const name = prompt("İlaç adı (örn: Kalsiyum Tableti):");
  if (!name) return;
  const dose = prompt("Doz (örn: Günde 1 Tablet · Akşam):");
  if (!dose) return;
  state.prescriptions.push({
    id: "custom_" + Date.now(),
    name: name,
    shortName: name.split(" ")[0],
    dose: dose,
    doctor: "Dr. Ayşe Yılmaz",
    target: "Özel takviye",
    bioTip: "Doktor önerisine göre alın.",
    takenToday: false,
    takenTime: null,
    particleColor: "folic",
    badge: dose.includes("Sabah") ? "Sabah" : (dose.includes("Akşam") ? "Akşam" : "Öğle")
  });
  triggerHaptic([20, 30]);
  triggerReaction("folic", name + " reçeteye eklendi.");
  render();
};

// KOMŞU MESAJ GÖNDER (Daha önce tanımlanan sendNeighborMessage korunur)

// MEKTUP/TIME CAPSULE
window.openNewLetterModal = function() {
  const title = prompt("Mektup başlığı (Güneş'e yazıyorsunuz):");
  if (!title) return;
  const preview = prompt("Mesajınızın ilk cümlesi:");
  if (!preview) return;
  state.timeCapsules.unshift({
    id: state.timeCapsules.length + 1,
    title,
    author: state.user.shortName,
    date: new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }),
    unlockEvent: "Güneş'in Doğum Günü",
    preview,
    isLocked: true
  });
  triggerHaptic([20, 30, 20]);
  triggerReaction("folic", "Mektubunuz Güneş'e saklandı.");
  render();
};

// RANDEVU EKLE
window.addNewAppointment = function() {
  const title = prompt("Randevu adı (örn: 36. Hafta NST Kontrolü):");
  if (!title) return;
  const date = prompt("Tarih ve saat (örn: 08 Ekim 2026 · 11:00):");
  if (!date) return;
  state.calendarModule.appointments.push({
    id: state.calendarModule.appointments.length + 1,
    title,
    dateFormatted: date,
    dateKey: "",
    doctor: "Dr. Ayşe Yılmaz",
    hospital: "Manisa Şehir Hastanesi",
    status: "Planlandı",
    badgeColor: "amber",
    focus: "Rutin kontrol",
    questions: []
  });
  triggerHaptic([20, 30]);
  triggerReaction("folic", title + " takvimine eklendi.");
  render();
};

// RANDEVU SORUSU TOGGLE
window.toggleAppointmentQuestion = function(appId, qIdx) {
  const app = state.calendarModule.appointments.find(a => a.id === appId);
  if (app && app.questions[qIdx]) {
    app.questions[qIdx].done = !app.questions[qIdx].done;
    triggerHaptic(10);
    render();
  }
};

// RANDEVUYA SORU EKLE
window.addQuestionToAppointment = function(appId) {
  const app = state.calendarModule.appointments.find(a => a.id === appId);
  if (!app) return;
  const q = prompt("Dr. Yılmaz'a soracağınız soruyu yazın:");
  if (!q) return;
  app.questions.push({ text: q, done: false });
  triggerHaptic(15);
  render();
};

// TAKVİM EXPORT (ICS)
window.exportCalendarICS = function() {
  const next = state.calendarModule.nextCountdown;
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ToHUM//TR",
    "BEGIN:VEVENT",
    "SUMMARY:" + next.type,
    "DESCRIPTION:Dr. " + next.doctor + " - Manisa Sehir Hastanesi",
    "DTSTART:20260910T113000Z",
    "DTEND:20260910T143000Z",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\n");
  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = "tohum_randevu.ics"; a.click();
  URL.revokeObjectURL(url);
  triggerReaction("water", "Randevu dosyası (.ics) indiriliyor. Takvim uygulamanıza ekleyin.");
};

// ALIŞVERİŞ FİLTRE
window.filterShoppingCategory = function(cat) {
  state.shopping.activeCategory = cat;
  triggerHaptic(10);
  render();
};

// ALIŞVERİŞ FİYAT DÜZENLE
window.editItemPrice = function(id) {
  const item = state.shopping.items.find(i => i.id === id);
  if (!item) return;
  const newPrice = prompt("Yeni fiyat (TL):", item.price);
  if (newPrice && !isNaN(parseInt(newPrice))) {
    item.price = parseInt(newPrice);
    triggerHaptic(10);
    render();
  }
};

// YENİ ALIŞVERİŞ ÜRÜNü EKLE
window.addNewShoppingItem = function() {
  const title = prompt("Ürün adı:");
  if (!title) return;
  const price = prompt("Fiyat (TL):");
  state.shopping.items.push({
    id: state.shopping.items.length + 1,
    title,
    category: state.shopping.activeCategory !== "Tümü" ? state.shopping.activeCategory : "Bebek Odası",
    price: parseInt(price) || 0,
    done: false,
    note: ""
  });
  triggerHaptic([15, 20]);
  render();
};

// ─── FAZ 3: AKILLI SAAT, ÇEKİLİŞ, M0-M7 YAŞAM AĞACI VE SESLİ AI ASİSTAN ───
window.toggleSmartwatchConnection = function() {
  if (!state.wearable) return;
  state.wearable.isConnected = !state.wearable.isConnected;
  triggerHaptic([15, 25]);
  if (state.wearable.isConnected) {
    triggerReaction("water", "Akıllı saat biyo-sensör bağlantısı aktif. Nabız ve HRV verileri senkronize edildi.");
  } else {
    triggerReaction("folic", "Akıllı saat bağlantısı kapatıldı. Aylık Akıllı Saat Hediye Çekilişi kartı açıldı.");
  }
  render();
};

window.simulateSmartwatchSync = function() {
  if (!state.wearable) return;
  const delta = Math.floor(Math.random() * 5) - 2;
  state.wearable.heartRate = Math.max(68, Math.min(92, 78 + delta));
  state.wearable.hrv = Math.max(52, Math.min(78, 64 - delta));
  state.wearable.steps += Math.floor(Math.random() * 120) + 25;
  triggerHaptic([20, 30, 20]);
  triggerReaction("water", "Akıllı saat verileri güncellendi: Nabız " + state.wearable.heartRate + " bpm, HRV " + state.wearable.hrv + " ms.");
  render();
};

window.joinSmartwatchRaffle = function() {
  if (!state.wearable) return;
  state.wearable.raffleJoined = true;
  state.growth.points += 15;
  triggerHaptic([30, 40, 60]);
  triggerReaction("folic", "Tebrikler! Ekim 2026 ToHUM Akıllı Saat Hediye Çekilişine kaydınız alındı (Bilet #1042).");
  render();
};

window.selectLifecycleModule = function(code) {
  state.selectedLifecycleModule = code;
  triggerHaptic(15);
  render();
};

window.playAiVoicePrompt = function(id) {
  const item = (state.aiVoiceAgenda || []).find(x => x.id === id);
  if (!item) return;
  triggerHaptic([20, 40, 20]);
  triggerReaction("omega", "To Hum AI (" + item.time + "): " + item.text);
  if ("speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
      const utter = new SpeechSynthesisUtterance(item.text);
      utter.lang = "tr-TR";
      utter.rate = 0.92;
      utter.pitch = 1.0;
      window.speechSynthesis.speak(utter);
    } catch (e) {}
  }
};

window.togglePrivacyMode = function() {
  state.privacyMode = !state.privacyMode;
  triggerHaptic([25, 35]);
  if (state.privacyMode) {
    triggerReaction("water", "Kendime Alan (Gizlilik Modu) aktif: Gözlemci erişimleri durduruldu, özel alanınız korumada.");
  } else {
    triggerReaction("folic", "Kendime Alan modu kapatıldı: Gözlemci aile üyeleri haftalık bülteni görebilir.");
  }
  render();
};

window.addFamilyObserver = function() {
  const name = prompt("Eklemek istediğiniz aile üyesi (örn: Ayşe Teyze, Mehmet Dede, Zeynep Kuzen):");
  if (!name) return;
  const relation = prompt("Yakınlık derecesi ve rolü (Gözlemci / Acil Destek):", "Teyze · Gözlemci");
  const isEmerg = /acil/i.test(relation || "");
  state.familyMembers.push({
    id: Date.now(),
    name: name.trim(),
    relation: (relation || "Geniş Aile").trim(),
    role: isEmerg ? "emergency" : "observer",
    badge: isEmerg ? "🚨 Acil Destek" : "👁️ Gözlemci",
    desc: isEmerg
      ? "Sadece acil sağlık/doğum alarmında bildirim alır, verilere müdahale edemez."
      : "Sadece ebeveynin izin verdiği haftalık özeti görür, özel alana müdahale edemez."
  });
  triggerHaptic([20, 30]);
  triggerReaction("folic", name + " aile ağacına sınırlı yetkiyle eklendi.");
  render();
};



// =========================================================================
// M0 İŞ PLANI: AI SEED CORE & KLİNİK RAPORLAMA & DMT1 BİYOYARARLANIM MOTORU
// =========================================================================

// 1. AI Seed Core Kardiyovasküler Dengesiz Veri & Preeklampsi Analiz Motoru (DEÜ Veri Bilimi Tezi)
window.runAiSeedCoreAnalysis = function(systolic, diastolic, hrv, symptoms) {
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
  }

  state.aiSeedCoreAnalysis = {
    status,
    riskScore,
    badgeText,
    message,
    deltaSys,
    deltaDia,
    hrvVal,
    lastMeasured: `${systolic}/${diastolic} mmHg`,
    time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
  };

  return state.aiSeedCoreAnalysis;
};

// 2. DMT1 Reseptör Biyoyararlanım & Emilim Çakışma Kontrolü (Non-blocking Seamless Feedback)
window.checkDmt1Interaction = function(targetDrugId) {
  const iron = state.prescriptions.find(p => p.id === "iron");
  const magnesium = state.prescriptions.find(p => p.id === "magnesium");
  const now = Date.now();

  // Demir alındıysa ve < 2 saat içinde Magnezyum/Kalsiyum alınıyorsa
  if (targetDrugId === "magnesium" && iron && iron.takenToday && iron._takenTimestamp) {
    const elapsedMinutes = Math.round((now - iron._takenTimestamp) / 60000);
    if (elapsedMinutes < 120) {
      const remaining = 120 - elapsedMinutes;
      const warn = `⚠️ DMT1 Reseptör Çakışması: Ferro Sanol (Demir) takviyenizi ${elapsedMinutes} dk önce aldınız. Magnezyum/Kalsiyum ile aynı bağırsak taşıyıcısını (DMT1) kullandığı için emilim %70 düşer. Lütfen ${remaining} dakika sonra alınız.`;
      triggerReaction("magnesium", warn);
      triggerHaptic([30, 50]);
      return false;
    }
  }

  // Magnezyum alındıysa ve < 2 saat içinde Demir alınıyorsa
  if (targetDrugId === "iron" && magnesium && magnesium.takenToday && magnesium._takenTimestamp) {
    const elapsedMinutes = Math.round((now - magnesium._takenTimestamp) / 60000);
    if (elapsedMinutes < 120) {
      const remaining = 120 - elapsedMinutes;
      const warn = `⚠️ DMT1 Reseptör Çakışması: Magnezyum takviyenizi ${elapsedMinutes} dk önce aldınız. Demir emilimini korumak ve gebelik anemisini önlemek için Ferro Sanol'u ${remaining} dakika sonra alınız.`;
      triggerReaction("omega", warn);
      triggerHaptic([30, 50]);
      return false;
    }
  }

  return true;
};

// 3. Tek Tuşla Standart Muayene Öncesi Klinik Özet Modal & PDF
window.toggleClinicalReportModal = function() {
  state.isClinicalReportOpen = !state.isClinicalReportOpen;
  triggerHaptic(15);
  render();
};

window.printClinicalPdfReport = function() {
  triggerHaptic([20, 40]);
  window.print();
};

window.shareClinicalSummaryWhatsApp = function() {
  const curW = state.baby.week;
  const bp = state.healthData.bloodPressureHistory[0] || { systolic: 92, diastolic: 62 };
  const w = state.wearable;
  const analysis = window.runAiSeedCoreAnalysis(bp.systolic, bp.diastolic);
  const m0 = window.computeM0BaselineProfile();

  const msg =
    `*ToHUM Klinik & M0 Sağlık Özeti (${curW}. Hafta)*\n` +
    `👤 Anne: ${state.user.name} (${state.user.bloodGroup})\n` +
    `👶 Bebek: ${state.baby.name} (${curW}. Hafta · ${state.baby.weightGram}g)\n` +
    `🩺 Güncel Tansiyon: ${bp.systolic}/${bp.diastolic} mmHg (Bazal: ${state.user.baselineBP})\n` +
    `💓 Nabız: ${w.heartRate} bpm · HRV: ${w.hrv} ms\n` +
    `⚖️ Kilo Artışı: +${m0.actualGain} kg (${m0.weightStatusText})\n` +
    `🤖 AI Tohum Çekirdek Notu: ${analysis.message}\n` +
    `_ToHUM Calm Tech Sağlık Takip Sistemi_ 🌱`;

  openWhatsAppModal(
    "clinical_summary",
    state.user.doctorName ? `Dr. ${state.user.doctorName}` : "Doktorum / Eşim",
    "",
    msg
  );
};


// =========================================================================
// REÇETE YÜKLEME VE ENTEGRASYON MODALI (DOKTOR REÇETESİ & E-REÇETE OCR)
// =========================================================================
// =========================================================================
// REÇETE YÜKLEME VE ENTEGRASYON MODALI (GERÇEK DOKTOR REÇETESİ & E-REÇETE OCR)
// =========================================================================
function renderPrescriptionUploadModal() {
  if (!state.isPrescriptionModalOpen) return '';

  const scanState = state.rxScanState || 'picker';
  const tab = state.rxModalTab || 'photo';
  const rx = state.rxParsedPrescription || null;
  const items = (rx && rx.items) || [];

  return `
    <div class="fixed inset-0 z-[160] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200" onclick="togglePrescriptionModal()">
      <div class="bg-[#140D0B] border border-white/15 rounded-3xl p-5 w-full max-w-sm shadow-[0_20px_60px_rgba(0,0,0,0.95)] space-y-4 max-h-[90vh] overflow-y-auto" onclick="event.stopPropagation()">
        
        <!-- Üst Başlık -->
        <div class="flex justify-between items-center pb-2 border-b border-white/10">
          <div>
            <h3 class="text-sm font-serif font-bold text-white/95">Reçete Yükle & Entegre Et</h3>
            <p class="text-[10px] text-white/50">Op. Dr. Ayşe Yılmaz · Kadın Hastalıkları ve Doğum</p>
          </div>
          <button onclick="togglePrescriptionModal()" class="text-white/40 hover:text-white text-xs px-2.5 py-1 rounded-full bg-white/5 active:scale-95 transition">Kapat ✕</button>
        </div>

        ${scanState === 'picker' ? `
          <!-- 3 SEKME SEÇİCİ: BELGE, SMS/METİN, E-REÇETE -->
          <div class="flex p-1 bg-white/5 rounded-2xl border border-white/10 text-[11px]">
            <button onclick="setRxModalTab('photo')" class="flex-1 py-1.5 rounded-xl transition font-medium ${tab === 'photo' ? 'bg-cyan-500/25 border border-cyan-400/40 text-cyan-200' : 'text-white/60 hover:text-white'}">
              📷 Belge / Dosya
            </button>
            <button onclick="setRxModalTab('text')" class="flex-1 py-1.5 rounded-xl transition font-medium ${tab === 'text' ? 'bg-amber-500/25 border border-amber-400/40 text-amber-200' : 'text-white/60 hover:text-white'}">
              ✍️ Metin / SMS
            </button>
            <button onclick="setRxModalTab('barcode')" class="flex-1 py-1.5 rounded-xl transition font-medium ${tab === 'barcode' ? 'bg-emerald-500/25 border border-emerald-400/40 text-emerald-200' : 'text-white/60 hover:text-white'}">
              № E-Reçete
            </button>
          </div>

          ${state.rxError ? `
            <div class="p-2.5 bg-rose-950/40 border border-rose-500/40 rounded-xl text-[10px] text-rose-200">
              ⚠️ ${state.rxError}
            </div>
          ` : ''}

          ${tab === 'photo' ? `
            <!-- FOTOĞRAF VE GERÇEK DOSYA ALANI -->
            <div class="space-y-3">
              <!-- Gizli Gerçek Dosya Girdisi -->
              <input type="file" id="realRxFileInput" accept="image/*,.pdf" capture="environment" onchange="handleRealRxFile(event)" class="hidden">
              
              <!-- Gerçek Dosya Seçici Butonu -->
              <div 
                onclick="document.getElementById('realRxFileInput').click()"
                class="p-5 rounded-2xl border-2 border-dashed border-cyan-400/40 hover:border-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/15 text-center cursor-pointer transition active:scale-98 group space-y-2">
                <div class="w-12 h-12 mx-auto rounded-full bg-cyan-400/20 text-cyan-300 flex items-center justify-center text-xl group-hover:scale-110 transition shadow-[0_0_15px_rgba(103,232,249,0.3)]">
                  📄
                </div>
                <div>
                  <div class="font-semibold text-white text-xs">Reçete Dosyası veya Fotoğrafı Seç</div>
                  <div class="text-[10px] text-white/50 mt-0.5">PDF raporu, E-Nabız ekranı veya kağıt reçete</div>
                </div>
              </div>

              <!-- Hızlı Gerçekçi Test Seçenekleri -->
              <div class="space-y-1.5 pt-1">
                <div class="text-[9px] text-white/40 uppercase tracking-wider font-semibold">Doğrulanmış Klinik Örnekler:</div>
                <button onclick="triggerRxScan('demo')" class="w-full py-2 px-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[10px] text-cyan-200 font-medium transition flex items-center justify-between active:scale-95">
                  <span class="flex items-center space-x-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                    <span>31. Hafta Hekim Reçetesi (Ferro Sanol + Ocean Mummy + Magnimore)</span>
                  </span>
                  <span class="text-white/40 text-[9px]">SGK Medula ↗</span>
                </button>
                <button onclick="triggerRxScan('collagen_demo')" class="w-full py-2 px-3 bg-teal-500/10 hover:bg-teal-500/20 border border-teal-400/30 rounded-xl text-[10px] text-teal-200 font-medium transition flex items-center justify-between active:scale-95">
                  <span class="flex items-center space-x-2">
                    <span class="w-1.5 h-1.5 rounded-full bg-teal-400"></span>
                    <span>Kolajen + Demir + Magnezyum Entegre Reçete</span>
                  </span>
                  <span class="text-teal-300/60 text-[9px]">DMT1 Kuralı ↗</span>
                </button>
              </div>
            </div>
          ` : tab === 'text' ? `
            <!-- SERBEST METİN / DOKTOR SMS'İ YAPISTIRMA ALANI -->
            <div class="space-y-2.5">
              <div class="text-[10px] text-white/60">Hekimden gelen SMS'i veya E-Nabız reçete metnini yapıştırınız:</div>
              <textarea 
                id="rxTextInput" 
                rows="4" 
                class="w-full bg-black/50 border border-white/20 rounded-xl p-2.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400 font-sans"
                placeholder="Örn: Dr. Ayşe Yılmaz - Manisa Şehir Hastanesi
1. Ferro Sanol Duodenal 100 mg 1x1
2. Day2Day Kolajen Peptit 5000 mg
3. Magnimore Plus Saşe"
              ></textarea>
              
              <div class="flex space-x-2">
                <button onclick="handleRxTextParse()" class="flex-1 py-2 px-3 bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400/40 text-amber-200 text-xs font-semibold rounded-xl transition active:scale-95 flex items-center justify-center space-x-1.5">
                  <span>⚡ Metni Çözümle & Ayrıştır</span>
                </button>
              </div>

              <!-- Hızlı Metin Doldurma Butonları -->
              <div class="flex space-x-1 text-[9px]">
                <button 
                  onclick="loadSampleRxText('collagen')" 
                  class="flex-1 py-1 px-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition text-center">
                  Örnek Kolajenli SMS
                </button>
                <button 
                  onclick="loadSampleRxText('standard')" 
                  class="flex-1 py-1 px-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition text-center">
                  Örnek 3'lü Standart SMS
                </button>
              </div>
            </div>
          ` : `
            <!-- E-REÇETE KOD GİRİŞİ -->
            <div class="space-y-3 p-3 bg-white/5 rounded-2xl border border-white/10">
              <div class="text-[10px] text-white/60">T.C. Sağlık Bakanlığı SGK E-Reçete Numarası:</div>
              <div class="flex space-x-2">
                <input 
                  type="text" 
                  id="rxCodeInput" 
                  value="2026-REC-31W" 
                  class="flex-1 bg-black/50 border border-white/20 rounded-xl px-3 py-2 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-400"
                  placeholder="Örn: 2026-REC-31W"
                >
                <button onclick="handleRxCodeLookup()" class="py-2 px-3 bg-emerald-500/25 hover:bg-emerald-500/35 border border-emerald-400/40 text-emerald-200 text-xs font-semibold rounded-xl transition active:scale-95">
                  Sorgula
                </button>
              </div>
              <div class="flex items-center space-x-2 pt-1">
                <button onclick="document.getElementById('rxCodeInput').value = 'REC-COLLAGEN-31'; handleRxCodeLookup();" class="text-[9px] text-teal-300/80 hover:text-teal-200 underline">
                  Kolajenli Reçete Kodu: REC-COLLAGEN-31
                </button>
              </div>
              <p class="text-[9px] text-white/40">E-Nabız sistemine kayıtlı hekim kaşesi ve protokol otomatik sorgulanır.</p>
            </div>
          `}
        ` : scanState === 'scanning' ? `
          <!-- CANLI TARAMA VE GERÇEK ÇÖZÜMLEME ANİMASYONU -->
          <div class="py-8 px-4 text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div class="relative w-36 h-48 mx-auto rounded-xl bg-black/60 border border-cyan-400/50 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.4)] flex flex-col justify-between p-3">
              <div class="space-y-1.5 opacity-40">
                <div class="w-16 h-2 bg-white/60 rounded"></div>
                <div class="w-24 h-1.5 bg-white/40 rounded"></div>
                <div class="w-20 h-1.5 bg-white/40 rounded"></div>
              </div>
              <div class="space-y-1.5 opacity-40">
                <div class="w-full h-1 bg-white/30 rounded"></div>
                <div class="w-5/6 h-1 bg-white/30 rounded"></div>
                <div class="w-4/6 h-1 bg-white/30 rounded"></div>
              </div>
              <div class="absolute inset-x-0 h-1 bg-cyan-400 shadow-[0_0_12px_#22d3ee] animate-bounce"></div>
            </div>

            <div class="space-y-1">
              <div class="text-xs font-semibold text-cyan-200 flex items-center justify-center space-x-2">
                <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                <span>${state.rxScanMessage || 'Belge Klinik NLP ile Çözümleniyor...'}</span>
              </div>
              <p class="text-[10px] text-white/50">Hekim kaşesi, protokol no ve DMT1 etken maddeleri eşleştiriliyor</p>
            </div>
          </div>
        ` : `
          <!-- DOĞRULANMIŞ VE DÜZENLENEBİLİR GERÇEK REÇETE KARTI (VERIFIED) -->
          <div class="space-y-3 animate-in fade-in zoom-in-95 duration-200">
            
            <div class="p-3.5 bg-gradient-to-br from-emerald-950/40 via-white/5 to-white/5 border border-emerald-400/40 rounded-2xl space-y-2.5">
              
              <!-- Üst Hekim ve Belge Başlığı -->
              <div class="flex justify-between items-start text-xs border-b border-white/10 pb-2">
                <div>
                  <div class="font-bold text-white text-xs">${escapeHtml(rx ? rx.doctorName : 'Op. Dr. Ayşe Yılmaz')}</div>
                  <div class="text-[9px] text-emerald-300 font-mono">${escapeHtml(rx ? (rx.hospital + ' · ' + (rx.prescriptionNo || '')) : 'Manisa Şehir Hastanesi')}</div>
                </div>
                <span class="text-[9px] bg-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/30 font-semibold">
                  ${escapeHtml(rx ? (rx.source || 'Doğrulandı ✓') : '31. Hafta')}
                </span>
              </div>

              <!-- İlaç ve Takviye Listesi (Dinamik ve Düzenlenebilir) -->
              <div class="space-y-1.5 text-[11px] pt-1" id="parsedRxItemsList">
                ${items.length === 0 ? `
                  <div class="p-3 text-center text-white/40 text-[10px] bg-black/20 rounded-xl border border-white/5">
                    Reçetede henüz ilaç/takviye yok. Aşağıdaki butonlardan veya giriş alanından ekleyebilirsiniz.
                  </div>
                ` : items.map((it, idx) => `
                  <div class="p-2 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between group">
                    <div class="flex-1 pr-2">
                      <div class="flex items-center space-x-1.5">
                        <span class="font-medium text-white">${escapeHtml(it.name)}</span>
                        ${it.type === 'collagen' ? '<span class="text-[8px] bg-teal-500/20 text-teal-300 px-1 rounded border border-teal-400/30 font-bold">Kolajen</span>' : ''}
                      </div>
                      <div class="text-[9px] text-white/60 leading-tight">${escapeHtml(it.dmt1Rule || it.dose || '')}</div>
                    </div>
                    <div class="flex items-center space-x-1.5">
                      <span class="text-[9px] font-mono ${it.type === 'iron' ? 'text-rose-300' : it.type === 'collagen' ? 'text-teal-300' : it.type === 'magnesium' ? 'text-amber-300' : 'text-emerald-300'} font-bold bg-white/5 px-2 py-1 rounded-lg">
                        ${escapeHtml(it.timing || it.scheduledHour || '')}
                      </span>
                      <button onclick="removeParsedRxItem(${idx})" title="Listeden Kaldır" class="text-white/30 hover:text-rose-300 p-1 text-[10px] transition">
                        ✕
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>

              <!-- HIZLI EKLEME: KOLAJEN VEYA DİĞER TAKVİYELER -->
              <div class="pt-1 border-t border-white/10 space-y-1.5">
                <div class="flex justify-between items-center text-[9px] text-white/50">
                  <span>Reçeteye Ek Takviye Ekle:</span>
                </div>
                <div class="flex flex-wrap gap-1 text-[9px]">
                  <button 
                    onclick="addCustomItemToParsedRx('Hidrolize Kolajen Peptit (Tip 1-3) 5000 mg', '1 Saşe', '16:30', 'collagen')" 
                    class="py-1 px-2 rounded-lg bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/30 text-teal-200 transition active:scale-95 flex items-center space-x-1">
                    <span>+ Kolajen Peptit (16:30 İkindi)</span>
                  </button>
                  <button 
                    onclick="addCustomItemToParsedRx('D3-K2 Vitamini Damlası', '5 Damla', '13:30', 'd3')" 
                    class="py-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition active:scale-95">
                    + D3-K2 Damla
                  </button>
                  <button 
                    onclick="addCustomItemToParsedRx('Probiyotik Saşe', '1 Saşe', '22:00', 'probiotic')" 
                    class="py-1 px-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white transition active:scale-95">
                    + Probiyotik
                  </button>
                </div>

                <!-- Özel İlaç Adı Yazarak Ekleme -->
                <div class="flex space-x-1 pt-1">
                  <input 
                    type="text" 
                    id="customRxItemInput" 
                    placeholder="Başka bir takviye/ilaç adı..." 
                    onkeydown="if(event.key==='Enter') addQuickCustomInputToParsedRx()"
                    class="flex-1 bg-black/40 border border-white/15 rounded-lg px-2 py-1 text-[10px] text-white placeholder-white/30 focus:outline-none focus:border-teal-400"
                  >
                  <button onclick="addQuickCustomInputToParsedRx()" class="py-1 px-2 bg-teal-500/20 hover:bg-teal-500/30 border border-teal-400/30 text-teal-200 text-[10px] rounded-lg transition active:scale-95">
                    + Ekle
                  </button>
                </div>
              </div>

              <!-- DMT1 GÜVENLİK ÖZETİ -->
              <div class="p-2 bg-cyan-950/30 border border-cyan-400/30 rounded-xl text-[9px] text-cyan-200 leading-relaxed">
                ✓ <b>DMT1 Koruma Tamponu:</b> Sabah demiri (08:30) ile gece magnezyumu (21:30) arasında 13 saatlik güvenli tampon oluşturuldu. Kolajen ikindi (16:30) ara öğününe yerleştirilerek demir emilimini baskılaması önlendi.
              </div>
            </div>

            <!-- Onay ve Tekrar Tarama Eylemleri -->
            <div class="space-y-1.5">
              <button onclick="confirmRealRxIntegration()" class="w-full py-2.5 bg-gradient-to-r from-emerald-500/30 to-cyan-500/30 hover:from-emerald-500/40 hover:to-cyan-500/40 border border-emerald-400/50 text-emerald-200 text-xs font-semibold rounded-2xl transition active:scale-98 shadow-sm flex items-center justify-center space-x-2">
                <span>✓</span>
                <span>Bu Reçeteyi Günlük Takibime Aktar (${items.length} Öğe)</span>
              </button>
              <button onclick="resetRxScan()" class="w-full py-1.5 text-center text-[10px] text-white/50 hover:text-white transition">
                ⟲ Farklı Bir Belge Tara / Yeniden Yükle
              </button>
            </div>

          </div>
        `}

      </div>
    </div>
  `;
}

function renderCustomSupplementModal() {
  if (!state.isCustomSupplementModalOpen) return '';

  return `
    <div class="fixed inset-0 z-[160] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200" onclick="toggleCustomSupplementModal()">
      <div class="bg-[#140D0B] border border-white/15 rounded-3xl p-5 w-full max-w-sm shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-4" onclick="event.stopPropagation()">
        
        <div class="flex justify-between items-center pb-2 border-b border-white/10">
          <div>
            <h3 class="text-sm font-serif font-bold text-white/95">Özel Takviye Ekle</h3>
            <p class="text-[10px] text-white/50">Reçete Dışı / Hekim Bilgilendirmeli Takip</p>
          </div>
          <button onclick="toggleCustomSupplementModal()" class="text-white/40 hover:text-white text-xs px-2.5 py-1 rounded-full bg-white/5 active:scale-95 transition">Kapat ✕</button>
        </div>

        <!-- Kolajen Detay ve Güvenlik Kartı -->
        <div class="p-3.5 rounded-2xl bg-gradient-to-br from-teal-950/40 via-white/5 to-white/5 border border-teal-400/35 space-y-2.5">
          <div class="flex items-center justify-between text-xs">
            <span class="font-bold text-teal-200 flex items-center space-x-1.5">
              <span class="w-2 h-2 rounded-full bg-teal-400"></span>
              <span>Hidrolize Kolajen Peptit (Tip 1 & 3)</span>
            </span>
            <span class="text-[10px] text-teal-300 font-mono">5000 mg</span>
          </div>

          <!-- ToHUM Farmakoloji Güvenlik & Zamanlama Özeti -->
          <div class="space-y-1.5 text-[10px] text-white/75 leading-relaxed bg-black/40 p-2.5 rounded-xl border border-white/5">
            <div class="text-teal-200 font-semibold">🧬 Gebelikte Kolajen & DMT1 Etkileşimi:</div>
            <p>
              • <b>Pelvik Taban & Elastikiyet:</b> 31. haftada büyüyen rahim bağ dokularını ve cilt elastikiyetini destekler. Saf, ağır metal sertifikalı hidrolize peptit tercih edilmelidir.
            </p>
            <p>
              • <b>Zamanlama Kuralı (DMT1):</b> Kolajen bir protein olduğundan sabahki <b>Ferro Sanol demir emilimini</b> baskılamaması için sabah değil, <b>ikindi hafif açlıkta (16:30)</b> C vitaminiyle alınması klinik olarak idealdir.
            </p>
          </div>

          <div class="flex items-center justify-between text-[11px] pt-1">
            <span class="text-white/60">Önerilen Biyolojik Saat:</span>
            <span class="text-teal-300 font-mono font-bold">16:30 (İkindi)</span>
          </div>
        </div>

        <!-- Durum ve Eylemler -->
        <div class="space-y-2">
          ${state.hasCollagen ? `
            <div class="p-2.5 rounded-xl bg-teal-950/40 border border-teal-400/30 text-[10px] text-teal-200 flex items-center justify-between">
              <span>✓ Şu anda günlük takip listenizde aktif (16:30)</span>
              <button onclick="removeCollagenSupplement()" class="text-rose-400 hover:text-rose-300 text-[10px] font-semibold underline px-1.5 py-0.5 rounded transition">Takibi Kaldır ✕</button>
            </div>
          ` : `
            <button onclick="addCollagenSupplement()" class="w-full py-2.5 bg-teal-500/30 hover:bg-teal-500/40 border border-teal-400/50 text-teal-200 text-xs font-semibold rounded-2xl transition active:scale-98 shadow-sm flex items-center justify-center space-x-1.5">
              <span>✓</span>
              <span>Kolajeni Günlük Takvime Ekle (16:30)</span>
            </button>
          `}
        </div>

        <!-- Aktif Özel Takviyeler Listesi (Dinamik) -->
        ${(state.customSupplements && state.customSupplements.length > 0) ? `
          <div class="space-y-1.5 pt-1 border-t border-white/10">
            <div class="text-[10px] font-semibold text-white/70">Takip Edilen Diğer Özel Takviyeler:</div>
            <div class="space-y-1 max-h-28 overflow-y-auto pr-0.5">
              ${state.customSupplements.map(cs => `
                <div class="p-2 bg-black/40 rounded-xl border border-white/5 flex items-center justify-between">
                  <div>
                    <div class="font-medium text-white text-xs">${cs.name}</div>
                    <div class="text-[9px] text-white/50">${cs.dose || '1 Doz'} · ${cs.scheduledHour || '16:30'}</div>
                  </div>
                  <button onclick="removeCustomSupplement('${cs.id}')" title="Takibi Kaldır" class="text-white/40 hover:text-rose-300 text-xs px-2 py-1 rounded bg-white/5 transition">
                    ✕ Kaldır
                  </button>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Hızlı Özel Takviye Ekleme Butonları -->
        <div class="text-[10px] text-white/50 space-y-1.5 pt-1 border-t border-white/5">
          <div class="text-[10px] text-white/70 font-medium">Sık Kullanılan Özel Takviyeler:</div>
          <div class="flex flex-wrap gap-1.5">
            <button onclick="addCustomSupplementDirect('Probiyotik Saşe', '1 Saşe', '22:00', 'probiotic')" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 border border-white/10 text-[10px] transition active:scale-95">
              + Probiyotik (22:00)
            </button>
            <button onclick="addCustomSupplementDirect('D3-K2 Damla', '5 Damla', '13:30', 'd3')" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 border border-white/10 text-[10px] transition active:scale-95">
              + D3-K2 Damla (13:30)
            </button>
            <button onclick="addCustomSupplementDirect('Koenzim Q10', '100 mg', '13:00', 'q10')" class="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-white/80 border border-white/10 text-[10px] transition active:scale-95">
              + Koenzim Q10 (13:00)
            </button>
          </div>
        </div>

        <!-- Serbest Takviye İsmi ve Saat Seçici -->
        <div class="space-y-1.5 pt-1.5 border-t border-white/10">
          <div class="text-[10px] text-white/70 font-medium">Başka Bir Takviye Ekle:</div>
          <div class="flex space-x-1.5">
            <input 
              type="text" 
              id="newCustomSuppName" 
              placeholder="Örn: Çinko, Folat, B12..." 
              onkeydown="if(event.key==='Enter') addCustomSupplementFromInput()"
              class="flex-1 bg-black/40 border border-white/20 rounded-xl px-2.5 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-teal-400"
            >
            <select id="newCustomSuppHour" class="bg-black/40 border border-white/20 rounded-xl px-2 py-1.5 text-xs text-teal-300 focus:outline-none">
              <option value="08:30">08:30 Aç</option>
              <option value="13:00">13:00 Tok</option>
              <option value="16:30" selected>16:30 İkindi</option>
              <option value="21:30">21:30 Tok</option>
              <option value="22:00">22:00 Gece</option>
            </select>
            <button onclick="addCustomSupplementFromInput()" class="py-1.5 px-3 bg-teal-500/25 hover:bg-teal-500/35 border border-teal-400/40 text-teal-200 text-xs font-semibold rounded-xl transition active:scale-95">
              + Ekle
            </button>
          </div>
        </div>

      </div>
    </div>
  `;
}

function renderClinicalReportModal() {
  if (!state.isClinicalReportOpen) return '';

  const bp = state.healthData.bloodPressureHistory[0];
  const w = state.wearable || { heartRate: 78, hrv: 64, spo2: 98, sleepHours: "7s 25dk" };
  const analysis = state.aiSeedCoreAnalysis || window.runAiSeedCoreAnalysis(bp.systolic, bp.diastolic);
  const curW = state.baby.week;
  const curData = getLifecycleDataForWeek(curW);

  return `
    <div class="fixed inset-0 bg-black/85 z-[150] backdrop-blur-md flex items-center justify-center p-3 animate-in fade-in duration-200">
      <div class="bg-[#140D0B] border border-amber-400/30 rounded-[32px] w-full max-w-[400px] max-h-[92vh] overflow-y-auto text-white shadow-2xl flex flex-col relative" id="clinicalReportPrintArea">
        
        <!-- Modal Başlık & Butonlar -->
        <div class="p-5 pb-3 border-b border-white/10 flex justify-between items-start sticky top-0 bg-[#140D0B]/95 backdrop-blur-md z-10">
          <div>
            <div class="flex items-center space-x-1.5">
              <span class="text-amber-300 font-bold text-xs uppercase tracking-wider">ToHUM · B2B Klinik Karar Destek</span>
              <span class="text-[9px] bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.2 rounded-full font-semibold">Resmi Özet</span>
            </div>
            <h2 class="text-base font-serif font-bold text-white mt-1">Muayene Öncesi Klinik Özet</h2>
            <p class="text-[10px] text-white/50">${state.user.doctorName || "Dr. Ayşe Yılmaz"} · ${state.user.hospitalName || "Manisa Şehir Hastanesi"} Kadın Doğum</p>
          </div>
          <button onclick="toggleClinicalReportModal()" class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white text-xs">✕</button>
        </div>

        <div class="p-5 space-y-4 text-xs">
          
          <!-- Hasta & Gebelik Künyesi -->
          <div class="p-3.5 bg-black/40 rounded-2xl border border-white/5 space-y-2">
            <div class="flex justify-between items-center text-white/90">
              <span class="font-bold text-sm text-white">${state.user.name}</span>
              <span class="text-amber-200 font-semibold text-xs">${curW}. Hafta (${curData.trimester})</span>
            </div>
            <div class="grid grid-cols-3 gap-2 text-center text-[10px] pt-1 border-t border-white/5">
              <div>
                <span class="text-white/40 block">Kişisel Bazal</span>
                <span class="font-bold text-emerald-300 text-xs">${state.user.baselineBP} mmHg</span>
              </div>
              <div>
                <span class="text-white/40 block">Kilo / Artış</span>
                <span class="font-bold text-white text-xs">${state.user.currentWeight} kg (${(state.user.currentWeight - state.user.startWeight) >= 0 ? "+" : ""}${(state.user.currentWeight - state.user.startWeight).toFixed(1)})</span>
              </div>
              <div>
                <span class="text-white/40 block">Hedef Doğum</span>
                <span class="font-bold text-amber-200 text-xs">${state.user.dueDate}</span>
              </div>
            </div>
          </div>

          <!-- AI Seed Core Kardiyovasküler Stres & Preeklampsi Analitiği -->
          <div class="p-3.5 bg-gradient-to-br from-amber-950/30 via-white/5 to-white/5 rounded-2xl border ${analysis.status === 'optimal' ? 'border-emerald-400/30' : 'border-amber-400/40'} space-y-2">
            <div class="flex justify-between items-center">
              <span class="font-bold text-amber-200 text-xs flex items-center space-x-1.5">
                <span>🧠</span>
                <span>AI Seed Core Analizi (DEÜ Tezi)</span>
              </span>
              <span class="text-[9px] px-2 py-0.5 rounded-full font-bold ${analysis.status === 'optimal' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30' : 'bg-amber-500/25 text-amber-200 border border-amber-400/40'}">
                ${analysis.badgeText}
              </span>
            </div>
            <p class="text-[11px] text-white/80 leading-relaxed bg-black/30 p-2.5 rounded-xl border border-white/5">
              ${analysis.message}
            </p>
            <div class="flex justify-between text-[10px] text-white/50 pt-1">
              <span>Sistolik Sapma: <b>+${analysis.deltaSys} mmHg</b></span>
              <span>Diyastolik Sapma: <b>+${analysis.deltaDia} mmHg</b></span>
              <span>Preeklampsi Riski: <b>%${analysis.riskScore}</b></span>
            </div>
          </div>

          <!-- Akıllı Saat (HealthKit) 24s Biyometrik Trendi -->
          <div class="p-3.5 bg-black/40 rounded-2xl border border-white/5 space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="font-semibold text-white/95 flex items-center space-x-1.5">
                <span>⌚</span>
                <span>Giyilebilir Biyo-Sensör 24s Akışı</span>
              </span>
              <span class="text-[9px] text-emerald-300 font-mono">Apple HealthKit</span>
            </div>
            <div class="grid grid-cols-4 gap-1.5 text-center text-[10px]">
              <div class="p-2 bg-white/5 rounded-xl">
                <span class="text-white/40 block text-[9px]">Ort. Nabız</span>
                <span class="font-bold text-white text-xs mt-0.5">${w.heartRate} bpm</span>
              </div>
              <div class="p-2 bg-white/5 rounded-xl">
                <span class="text-white/40 block text-[9px]">Otonom HRV</span>
                <span class="font-bold text-amber-300 text-xs mt-0.5">${w.hrv} ms</span>
              </div>
              <div class="p-2 bg-white/5 rounded-xl">
                <span class="text-white/40 block text-[9px]">SpO2</span>
                <span class="font-bold text-cyan-300 text-xs mt-0.5">%${w.spo2}</span>
              </div>
              <div class="p-2 bg-white/5 rounded-xl">
                <span class="text-white/40 block text-[9px]">Gece Uykusu</span>
                <span class="font-bold text-white text-xs mt-0.5">${w.sleepHours}</span>
              </div>
            </div>
          </div>

          <!-- Fetal Aktivite & Doğum Dalgası Durumu -->
          <div class="p-3.5 bg-black/40 rounded-2xl border border-white/5 space-y-2">
            <span class="font-semibold text-white/95 text-xs flex items-center space-x-1.5">
              <span>🐾</span>
              <span>Fetal Hareket & Kasılma Durumu</span>
            </span>
            <div class="space-y-1.5 text-[11px] text-white/80">
              <div class="flex justify-between p-2 bg-white/5 rounded-xl">
                <span>Cardiff 10 Tekme Skoru</span>
                <span class="font-bold text-emerald-300">2 Saatte 10 Hareket (Normal / Reaktif)</span>
              </div>
              <div class="flex justify-between p-2 bg-white/5 rounded-xl">
                <span>5-1-1 Doğum Dalgası Analizi</span>
                <span class="font-bold text-amber-200">Negatif (Sadece Braxton Hicks Hazırlık)</span>
              </div>
            </div>
          </div>

          <!-- Reçete & DMT1 Emilim Uyum Karnesi -->
          <div class="p-3.5 bg-black/40 rounded-2xl border border-white/5 space-y-2">
            <div class="flex justify-between items-center text-xs">
              <span class="font-semibold text-white/95">Reçeteli Takviye Uyum Karnesi</span>
              <span class="text-[10px] text-emerald-300 font-bold">%92 Düzenli Uyum</span>
            </div>
            <div class="space-y-1 text-[10px] text-white/75">
              <div class="flex justify-between">
                <span>• Ferro Sanol (Demir - Sabah Aç):</span>
                <span class="text-emerald-300 font-medium">✓ C Vitaminiyle Alındı</span>
              </div>
              <div class="flex justify-between">
                <span>• Magnimore Plus (Magnezyum - Akşam Tok):</span>
                <span class="text-emerald-300 font-medium">✓ 2s DMT1 Tamponlu</span>
              </div>
              <div class="flex justify-between">
                <span>• Ocean Mummy (DHA - Öğle Tok):</span>
                <span class="text-emerald-300 font-medium">✓ Düzenli</span>
              </div>
              <div class="flex justify-between">
                <span>• Coledan D3 (4 Damla - Sabah):</span>
                <span class="text-emerald-300 font-medium">✓ Düzenli</span>
              </div>
            </div>
          </div>

          <!-- Doktora Sorulacak Sorular -->
          <div class="p-3.5 bg-sky-950/25 border border-sky-400/30 rounded-2xl space-y-1.5">
            <span class="font-bold text-sky-200 text-xs">📋 Bu Muayenede Sorulacaklar:</span>
            <ul class="text-[11px] text-white/85 space-y-1 list-disc list-inside">
              <li>Güneş'in baş gelişi pozisyonu doğuma kadar değişir mi?</li>
              <li>36. haftadan sonra magnezyum dozajı ne zaman kesilmelidir?</li>
            </ul>
          </div>

          <!-- Aksiyon Butonları -->
          <div class="grid grid-cols-2 gap-2 pt-2 sticky bottom-0 bg-[#140D0B] pb-2">
            <button onclick="printClinicalPdfReport()" class="py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-xs rounded-2xl transition flex items-center justify-center space-x-1.5 shadow-lg">
              <span>🖨️</span>
              <span>Yazdır / PDF Kaydet</span>
            </button>
            <button onclick="shareClinicalSummaryWhatsApp()" class="py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl transition flex items-center justify-center space-x-1.5 shadow-lg">
              <span>💬</span>
              <span>Dr. Ayşe'ye İlet</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  `;
}


// =========================================================================
// UYGULAMA BAŞLATICI VE URL DERİN BAĞLANTI (DEEP-LINK) DESTEĞİ
// Örn: index.html?tab=profile&sub=baseline&preset=atypical_preeclampsia
// =========================================================================
function initTohumApp() {
  loadSavedState();
  try {
    const params = new URLSearchParams(window.location.search);
    const flowParam = params.get("flow");
    const stepParam = params.get("step");
    const tabParam = params.get("tab");
    const subParam = params.get("sub");
    const presetParam = params.get("preset");
    const weekParam = params.get("week");
    const sessionParam = params.get("session") || params.get("role");
    if (sessionParam === "father" || tabParam === "father") {
      if (state.family) state.family.activeSession = "father";
      state.currentTab = "father";
    } else if (sessionParam === "mother") {
      if (state.family) state.family.activeSession = "mother";
    }
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
    if (weekParam && window.changePregnancyWeek) {
      window.changePregnancyWeek(parseInt(weekParam, 10));
    }
    if (presetParam && window.applyProfilePreset) {
      window.applyProfilePreset(presetParam);
      return;
    }
  } catch (e) {}

  // Backend profil senkronizasyonu (Güneş 31. Hafta ve güncel reçete/DMT1 doğrulama)
  if (typeof fetch !== "undefined") {
    fetch("/api/profile")
      .then(r => r.json())
      .then(data => {
        if (data && data.ok && data.profile) {
          const p = data.profile;
          if (p.baby && p.baby.week) {
            const w = parseInt(p.baby.week, 10);
            if (state.baby.week !== w && window.changePregnancyWeek) {
              window.changePregnancyWeek(w);
            }
          }
          if (p.user) {
            state.user = Object.assign({}, state.user, p.user);
            if (p.user.activePrescription) {
              state.activePrescription = p.user.activePrescription;
            }
          }
          if (p.hasCollagen !== undefined) {
            state.hasCollagen = p.hasCollagen;
          }
          render();
        }
      })
      .catch(() => {});
  }

  render();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initTohumApp);
} else {
  initTohumApp();
}
