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
  currentTab: "birth", // Varsayılan olarak 3. Modül Doğum & Hazırlık
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

      <div class="text-center cursor-pointer group" onclick="toggleWeekSelector()" title="Haftayı Değiştir">
        <h1 class="text-xs font-serif tracking-[0.25em] text-white uppercase font-medium drop-shadow-sm">ToHUM</h1>
        <div class="flex items-center justify-center space-x-1 mt-0.5 bg-white/10 hover:bg-white/20 px-2.5 py-0.5 rounded-full border border-white/15 transition shadow-xs">
          <span class="text-[10px] text-amber-200 font-semibold">Güneş · ${state.baby.week}. Hafta</span>
          <span class="text-[8px] text-white/60">▼</span>
        </div>
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
    ${renderWeekSelectorModal()}

    <main class="flex-1 w-full h-full relative overflow-hidden flex flex-col">
      ${getTabContent()}
    </main>
  `;
}

// SLIDING DRAWER MENU
function renderDrawerMenu() {
  if (!state.isDrawerOpen) return '';

  const curData = getLifecycleDataForWeek(state.baby.week);

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
          <!-- 1. GÜNEŞ (YAŞAYAN ALAN) -->
          <button onclick="navigateTab('home')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'home' ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30' : 'text-white/70 hover:bg-white/5'}">
            <span>1. Güneş</span>
            <span class="text-[10px] font-semibold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/20">
              ${state.baby.week}. Hafta
            </span>
          </button>

          <!-- 2. ŞİFA & SAĞLIK (DİNAMİK TRİMESTER) -->
          <button onclick="navigateTab('health')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'health' ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30' : 'text-white/70 hover:bg-white/5'}">
            <span>2. Şifa & Sağlık Takibi</span>
            <span class="text-[10px] bg-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded-full border border-emerald-400/25 font-medium">
              ${state.baby.week < 14 ? 'hCG & Folat' : (state.baby.week < 28 ? 'Organ & Demir' : 'Tansiyon & Pelvik')}
            </span>
          </button>

          <!-- 3. MODÜL: 1-13W KÖKLENME / 14-27W GELİŞİM / 28-40W DOĞUM & HAZIRLIK -->
          <button onclick="navigateTab('birth')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'birth' ? 'bg-rose-500/25 text-rose-200 font-semibold border border-rose-400/40' : 'text-white/70 hover:bg-white/5'}">
            <span>3. ${state.baby.week < 14 ? 'Köklenme & Erken Güvenlik' : (state.baby.week < 28 ? 'Gelişim & Beden Uyumu' : 'Doğum & Hazırlık')}</span>
            <span class="text-[10px] ${state.baby.week >= 28 ? 'bg-rose-500/30 text-rose-200' : 'bg-white/10 text-white/60'} px-2 py-0.5 rounded-full font-medium">
              ${curData.trimester}
            </span>
          </button>

          <!-- 4. TAKVİM (DİNAMİK RANDEVU & YOL HARİTASI) -->
          <button onclick="navigateTab('calendar')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'calendar' ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30' : 'text-white/70 hover:bg-white/5'}">
            <span>4. Bütünleşik Takvim</span>
            <span class="text-[10px] opacity-70">
              ${state.baby.week < 14 ? 'İkili Test' : (state.baby.week < 28 ? 'Organ Taraması' : 'NST & Randevu')}
            </span>
          </button>

          <!-- 5. İHTİYAÇ & BÜTÇE -->
          <button onclick="navigateTab('shopping')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'shopping' ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30' : 'text-white/70 hover:bg-white/5'}">
            <span>5. İhtiyaç & Bütçe Planı</span>
            <span class="text-[10px] opacity-70">
              ${state.baby.week < 14 ? 'Erken İhtiyaç' : (state.baby.week < 28 ? 'Oda & Çeyiz' : 'Çanta & Liste')}
            </span>
          </button>

          <!-- 6. KOMŞU AĞI -->
          <button onclick="navigateTab('kovan')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'kovan' ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30' : 'text-white/70 hover:bg-white/5'}">
            <span>6. Muradiye Komşu Ağı</span>
            <span class="text-[10px] opacity-70">İmece & Paylaşım</span>
          </button>

          <!-- 7. BABA DESTEK -->
          <button onclick="navigateTab('father')" class="w-full text-left px-3.5 py-2.5 rounded-2xl flex items-center justify-between transition ${state.currentTab === 'father' ? 'bg-amber-500/20 text-amber-200 font-semibold border border-amber-500/30' : 'text-white/70 hover:bg-white/5'}">
            <span>7. Baba Destek Alanı</span>
            <span class="text-[10px] opacity-70">Oğuz (${state.baby.week}.H)</span>
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
    default: return renderBirthTab();
  }
}

// 1. MODÜL VE 2. MODÜL KORUMA ALTINDA (AYNEN ÇALIŞIR)
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
          <div class="font-semibold text-white/90">${state.baby.week}. Hafta Duyusal Deneyim</div>
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

// ŞİFA & SAĞLIK TAKİBİ (KORUMA ALTINDAKİ RENDER METODU)
function renderHealthTab() {
  return `
    <div class="w-full h-full pt-16 pb-12 px-5 space-y-4 text-white overflow-y-auto">
      <div class="flex justify-between items-center pb-2 border-b border-white/10">
        <div>
          <h2 class="text-base font-serif font-semibold text-white/95">Şifa & Sağlık Takibi</h2>
          <p class="text-[11px] text-white/60">Buse · ${state.baby.week}. Hafta (${getLifecycleDataForWeek(state.baby.week).trimester}) Biyometri & Klinik Güvenlik</p>
        </div>
        <span class="text-xs bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-2.5 py-1 rounded-full font-medium">
          Dengede
        </span>
      </div>

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

    return `
      <div class="space-y-4 animate-in fade-in duration-150">
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
        <!-- 1. ve 2. Trimester Sekme Çubuğu -->
        <div class="grid grid-cols-5 gap-1 bg-white/5 p-1 rounded-2xl text-[10px]">
          <button onclick="setBirthSubtab('overview')" class="py-2 px-1 text-center rounded-xl transition truncate ${state.birthModule.activeSubtab === 'overview' ? 'bg-white/20 text-white font-bold shadow-xs' : 'text-white/50'}">
            ${curW < 14 ? 'Köklenme' : 'Gelişim'}
          </button>
          <button onclick="setBirthSubtab('donts')" class="py-2 px-1 text-center rounded-xl transition truncate ${state.birthModule.activeSubtab === 'donts' ? 'bg-rose-500/25 text-rose-200 font-bold border border-rose-400/30 shadow-xs' : 'text-white/50'}">
            Kaçın 🛡️
          </button>
          <button onclick="setBirthSubtab('dos')" class="py-2 px-1 text-center rounded-xl transition truncate ${state.birthModule.activeSubtab === 'dos' ? 'bg-emerald-500/25 text-emerald-200 font-bold border border-emerald-400/30 shadow-xs' : 'text-white/50'}">
            Yap ✓
          </button>
          <button onclick="setBirthSubtab('partner')" class="py-2 px-1 text-center rounded-xl transition truncate ${state.birthModule.activeSubtab === 'partner' ? 'bg-amber-500/25 text-amber-200 font-bold border border-amber-400/30 shadow-xs' : 'text-white/50'}">
            Oğuz
          </button>
          <button onclick="setBirthSubtab('questions')" class="py-2 px-1 text-center rounded-xl transition truncate ${state.birthModule.activeSubtab === 'questions' ? 'bg-sky-500/25 text-sky-200 font-bold border border-sky-400/30 shadow-xs' : 'text-white/50'}">
            Doktor
          </button>
        </div>
      ` : `
        <!-- 3. Trimester Doğum Paketi Sekme Çubuğu -->
        <div class="grid grid-cols-5 gap-1 bg-white/5 p-1 rounded-2xl text-[10px]">
          <button onclick="setBirthSubtab('kick')" class="py-2 px-1 text-center rounded-xl transition truncate ${state.birthModule.activeSubtab === 'kick' ? 'bg-white/20 text-white font-bold shadow-xs' : 'text-white/50'}">
            Tekme 10
          </button>
          <button onclick="setBirthSubtab('waves')" class="py-2 px-1 text-center rounded-xl transition truncate ${state.birthModule.activeSubtab === 'waves' ? 'bg-white/20 text-white font-bold shadow-xs' : 'text-white/50'}">
            Dalgalar
          </button>
          <button onclick="setBirthSubtab('bag')" class="py-2 px-1 text-center rounded-xl transition truncate ${state.birthModule.activeSubtab === 'bag' ? 'bg-white/20 text-white font-bold shadow-xs' : 'text-white/50'}">
            Çanta
          </button>
          <button onclick="setBirthSubtab('plan')" class="py-2 px-1 text-center rounded-xl transition truncate ${state.birthModule.activeSubtab === 'plan' ? 'bg-white/20 text-white font-bold shadow-xs' : 'text-white/50'}">
            Plan A/B
          </button>
          <button onclick="setBirthSubtab('logistics')" class="py-2 px-1 text-center rounded-xl transition truncate ${state.birthModule.activeSubtab === 'logistics' ? 'bg-rose-500/25 text-rose-200 font-bold border border-rose-400/40 shadow-xs' : 'text-white/50'}">
            Lojistik
          </button>
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
            ${(data.donts || []).map((item, idx) => `
              <div class="p-3.5 bg-black/40 rounded-2xl border border-rose-500/20 flex items-start space-x-2.5 text-xs text-white/90">
                <span class="w-5 h-5 rounded-full bg-rose-500/20 text-rose-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✕</span>
                <span class="leading-relaxed text-[11px]">${item}</span>
              </div>
            `).join('')}
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
          ${cats.map(c => `
            <button onclick="setBagCategory('${c}')" class="py-2 text-center rounded-xl transition ${curCat === c ? 'bg-amber-500/25 text-amber-200 font-bold border border-amber-400/30' : 'text-white/50'}">
              ${c}
            </button>
          `).join('')}
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

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", render);
} else {
  render();
}

// =========================================================================
