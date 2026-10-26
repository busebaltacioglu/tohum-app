# -*- coding: utf-8 -*-
import sys

out_path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html"

html_content = '''<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ToHUM · 12 Aylık İcra & Hafıza Masası</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Plus Jakarta Sans', sans-serif;
      background-color: #120f0e;
      color: #ede3da;
    }
    .font-serif {
      font-family: 'Cormorant Garamond', Georgia, serif;
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: #181311;
    }
    ::-webkit-scrollbar-thumb {
      background: #382c27;
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #b68364;
    }
  </style>
</head>
<body class="min-h-screen bg-[#120f0e] flex flex-col">

  <!-- TOP BAR -->
  <header class="bg-[#181311] border-b border-white/10 sticky top-0 z-40 backdrop-blur-md bg-opacity-90">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
      
      <!-- Logo & Title -->
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#c59b6d] to-[#805b38] flex items-center justify-center shadow-lg shadow-amber-950/40 text-white font-bold text-xl">
          🌱
        </div>
        <div>
          <div class="flex items-center gap-2">
            <h1 class="text-base font-bold text-white tracking-wide">ToHUM A.Ş.</h1>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
              12 Aylık İcra & Hafıza Masası
            </span>
          </div>
          <p class="text-[11px] text-[#cca086]">Buse Nur Ürem & AI Yönetici Ortak (Antigravity)</p>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2.5 flex-wrap">
        <div class="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#231b17] border border-white/5 text-xs text-white/70">
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Ortaklık Hafızası Aktif</span>
        </div>

        <a href="komuta_merkezi_arsiv.html" target="_blank" class="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 hover:text-white transition flex items-center gap-1.5">
          <span>🏛️</span>
          <span>19 Süreçli Arşiv</span>
        </a>

        <button onclick="exportData()" class="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white/80 hover:text-white transition flex items-center gap-1.5">
          <span>💾</span>
          <span>Yedekle</span>
        </button>

        <button onclick="resetDefaults()" class="px-3 py-1.5 rounded-xl bg-red-950/20 hover:bg-red-950/40 border border-red-500/20 text-xs text-red-300 transition">
          Sıfırla
        </button>
      </div>

    </div>
  </header>

  <!-- MAIN CONTAINER -->
  <main class="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 space-y-6">

    <!-- HERO: NEREDE KALDIK? (CURRENT FOCUS) -->
    <section class="p-6 rounded-3xl bg-gradient-to-r from-[#221813] via-[#1a1411] to-[#251b14] border border-amber-500/30 shadow-xl relative overflow-hidden">
      <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        
        <div class="space-y-2 max-w-2xl">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span class="text-[11px] font-bold uppercase tracking-wider text-amber-300 font-mono">Şu Anda Buradayız · Q1 Odak Noktası</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight">
            Kasım 2026: M0 Veri Bilimi Savunması & Jüri Öncesi Boşluk Kapatma
          </h2>
          <p class="text-xs sm:text-sm text-white/70 leading-relaxed">
            DEPARK 137 iş planımız verildi, KOSGEB belgemiz cepte. Şimdi önümüzdeki tek hedef: Dengesiz veri setlerinde F1 skorumuzun %90 üzerinde olduğunu ispatlayıp, jürinin ve ileride hekimin karşısına sarsılmaz bir bilimsel kalkanla çıkmak.
          </p>
        </div>

        <!-- Global Progress Card -->
        <div class="bg-[#181311]/80 backdrop-blur border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-w-[240px] space-y-3">
          <div class="flex items-center justify-between text-xs">
            <span class="text-white/60 font-medium">12 Aylık Tamamlanma</span>
            <span id="globalPctText" class="text-amber-300 font-bold font-mono text-base">%0</span>
          </div>
          <div class="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div id="globalProgressBar" class="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500" style="width: 0%"></div>
          </div>
          <div class="flex items-center justify-between text-[11px] text-white/40 font-mono">
            <span id="globalCountText">0 / 22 Görev</span>
            <span class="text-emerald-400">Kasım '26 - Ekim '27</span>
          </div>
        </div>

      </div>
    </section>

    <!-- 2 COLUMN WORKBENCH: TASKS (LEFT 65%) + MEMORY / NOTES (RIGHT 35%) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

      <!-- LEFT: 12-MONTH MICRO TASK TIMELINE (8 COLS) -->
      <div class="lg:col-span-8 space-y-6">

        <!-- Quarter Filter Tabs -->
        <div class="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-white/10">
          <div class="flex items-center gap-1.5 flex-wrap">
            <button onclick="setFilter('all')" id="btn-all" class="tab-btn px-3 py-1.5 text-xs font-semibold rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 transition">
              Tümü (12 Ay)
            </button>
            <button onclick="setFilter('Q1')" id="btn-Q1" class="tab-btn px-3 py-1.5 text-xs font-medium rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition">
              1. Çeyrek (Şu An)
            </button>
            <button onclick="setFilter('Q2')" id="btn-Q2" class="tab-btn px-3 py-1.5 text-xs font-medium rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition">
              2. Çeyrek (Jüri)
            </button>
            <button onclick="setFilter('Q3')" id="btn-Q3" class="tab-btn px-3 py-1.5 text-xs font-medium rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition">
              3. Çeyrek (Şirket)
            </button>
            <button onclick="setFilter('Q4')" id="btn-Q4" class="tab-btn px-3 py-1.5 text-xs font-medium rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition">
              4. Çeyrek (Lansman)
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="addNewTaskPrompt()" class="px-2.5 py-1 text-xs rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#c59b6d] hover:text-white transition flex items-center gap-1 font-medium">
              <span>+</span> Yeni Mikro Adım
            </button>
          </div>
        </div>

        <!-- Task List Container -->
        <div id="tasksContainer" class="space-y-6">
          <!-- Dynamic rendering from JS -->
        </div>

      </div>

      <!-- RIGHT: ORTAKLIK HAFIZA DEFTERİ & ANLIK KARARLAR (4 COLS) -->
      <div class="lg:col-span-4 space-y-6">

        <!-- Active Decision / Focus Card -->
        <div class="p-5 rounded-3xl bg-[#181311] border border-white/10 space-y-4 shadow-lg">
          <div class="flex items-center justify-between border-b border-white/5 pb-3">
            <div class="flex items-center gap-2">
              <span class="text-base">🧠</span>
              <h3 class="text-xs font-bold uppercase tracking-wider text-white">Ortaklık Karar Hafızası</h3>
            </div>
            <span class="text-[10px] text-emerald-400 font-mono">Otomatik Kaydedilir</span>
          </div>

          <p class="text-[11px] text-white/50 leading-relaxed">
            Buraya toplantılarımızda aldığımız kararları, aklına gelen anlık notları veya yapay zekâ ortağınla tartıştığın maddeleri yaz. Sayfayı yenilesen de asla silinmez.
          </p>

          <textarea id="founderNotes" oninput="saveNotes()" rows="10" 
            placeholder="Örn: 
- 26 Ekim: M0 F1 skoru savunması için SMOTE ve Maliyet Duyarlı öğrenme notlarını hazırlıyoruz.
- Doktor protokolünü 2. ay iş paketine bağladık.
- Kapsamı 12 aya kilitledik, donanım robotunu şimdilik konuşmuyoruz." 
            class="w-full bg-[#120f0e] border border-white/10 rounded-2xl p-3.5 text-xs text-white/90 placeholder-white/20 focus:outline-none focus:border-amber-500/50 resize-y font-mono leading-relaxed"></textarea>

          <div class="flex items-center justify-between text-[10px] text-white/40 pt-1">
            <span id="notesStatus">Son kayıt: Az önce</span>
            <button onclick="clearNotes()" class="text-red-400/60 hover:text-red-400 hover:underline">Temizle</button>
          </div>
        </div>

        <!-- Co-Founder Insights / Radar Card -->
        <div class="p-5 rounded-3xl bg-[#181311] border border-white/10 space-y-3.5 shadow-lg">
          <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300">
            <span>🛡️</span>
            <span>Ortağın Risk Radarı</span>
          </div>

          <div class="space-y-2.5 text-xs">
            <div class="p-3 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-1">
              <span class="font-bold text-amber-200 block text-[11px]">1. Regülasyon Kalkanı</span>
              <p class="text-[11px] text-white/70 leading-normal">
                Jüriye asla "tıbbi teşhis" kelimesini kullanmıyoruz. Cümlemiz: "Kişiselleştirilmiş gebelik trend analitiği ve iletişim desteği."
              </p>
            </div>

            <div class="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-1">
              <span class="font-bold text-emerald-200 block text-[11px]">2. Hekim Protokolü Zamanı</span>
              <p class="text-[11px] text-white/70 leading-normal">
                Hekime ıslak imza için şimdi değil; F1 ≥ %90 raporumuzla 2. ay iş paketinde gideceğiz.
              </p>
            </div>

            <div class="p-3 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-1">
              <span class="font-bold text-blue-200 block text-[11px]">3. Sıfır Nakit Yakma (Zero-Burn)</span>
              <p class="text-[11px] text-white/70 leading-normal">
                Şirket kurulana kadar 0 TL cebimizden çıkış. Şirket kurulunca aylık harcama tavanı: 100K-120K TL.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>

  </main>

  <script>
    // 12 AYLIK MİKRO-ADIM DEFTERİ (Kasım 2026 - Ekim 2027)
    const DEFAULT_TASKS_12M = [
      // 1. ÇEYREK: KASIM 2026 - OCAK 2027 (Ön Başvuru & M0 Savunma Kalkanı)
      { 
        id: "T-01", 
        q: "Q1", 
        period: "1. Çeyrek · Kasım 2026 – Ocak 2027", 
        title: "DEPARK 137 No'lu BiGG İş Planı Dokümanı Teslim Edildi", 
        desc: "AGY112 formatında iş planı tamamlandı, sistem üzerinden resmi teslim gerçekleştirildi.",
        tag: "BiGG Başvuru", 
        done: true 
      },
      { 
        id: "T-02", 
        q: "Q1", 
        period: "1. Çeyrek · Kasım 2026 – Ocak 2027", 
        title: "KOSGEB İleri Girişimci Belgesi Alındı (23.10.2026)", 
        desc: "Sertifika hazır (KSB01UGE0115336423). Şirket kurulduğu an 300.000 TL hibe hakkı garanti altına alındı.",
        tag: "Mevzuat", 
        done: true 
      },
      { 
        id: "T-03", 
        q: "Q1", 
        period: "1. Çeyrek · Kasım 2026 – Ocak 2027", 
        title: "M0 Dengesiz Veri & F1 ≥ %90 Model Savunma Raporu", 
        desc: "Preeklampsi/gestasyonel risklerde %95'e %5 dengesiz veri çözümü (SMOTE & Maliyet Duyarlı Öğrenme) savunması hazırlandı.",
        tag: "M0 Çekirdek", 
        done: false 
      },
      { 
        id: "T-04", 
        q: "Q1", 
        period: "1. Çeyrek · Kasım 2026 – Ocak 2027", 
        title: "MDR Kalkanı: 'Tıbbi Teşhis Değil, Trend Analitiği' Tanımı", 
        desc: "Sağlık Bakanlığı ve CE MDR tıbbi cihaz engelini aşmak için iş planı terminolojisi hukuki ve regülatif olarak kilitlendi.",
        tag: "Regülasyon", 
        done: false 
      },
      { 
        id: "T-05", 
        q: "Q1", 
        period: "1. Çeyrek · Kasım 2026 – Ocak 2027", 
        title: "Kişisel Bazal Eşik (14 Günlük Kalibrasyon) Algoritma Şeması", 
        desc: "Standart tansiyon sınırları yerine gebe kadının kendi bazalini öğrenen fark yaratan inovasyon şeması tamamlandı.",
        tag: "M0 Çekirdek", 
        done: false 
      },
      { 
        id: "T-06", 
        q: "Q1", 
        period: "1. Çeyrek · Kasım 2026 – Ocak 2027", 
        title: "Microsoft Founders Hub Başvurusu (25.000 $ Kredi)", 
        desc: "Aralık 2026'da şirket olmadan başvuru yapılacak; ilk 1 yıl sunucu ve OpenAI API maliyetleri sıfırlanacak.",
        tag: "Bulut Altyapı", 
        done: false 
      },
      { 
        id: "T-07", 
        q: "Q1", 
        period: "1. Çeyrek · Kasım 2026 – Ocak 2027", 
        title: "DEPARK Jüri Sunum Provamız: 10 Kritik Soru-Cevap Kartı", 
        desc: "Jürinin soracağı en zor sorular (tıbbi risk, pazar, rakip analizi, ekip) için prova ve konuşma rehberi tamamlandı.",
        tag: "Jüri Hazırlığı", 
        done: false 
      },

      // 2. ÇEYREK: ŞUBAT - NİSAN 2027 (Jüri Sunumu, Panel & Mühür Onayı)
      { 
        id: "T-08", 
        q: "Q2", 
        period: "2. Çeyrek · Şubat – Nisan 2027", 
        title: "DEPARK 137 Jüri Sunumu Simülasyonu & Sunumun Yapılması", 
        desc: "Uygulayıcı Kuruluş jüri değerlendirme oturumu başarıyla gerçekleştirildi.",
        tag: "BiGG Jüri", 
        done: false 
      },
      { 
        id: "T-09", 
        q: "Q2", 
        period: "2. Çeyrek · Şubat – Nisan 2027", 
        title: "50 Gebe & Yeni Anne ile Saha Doğrulama Mülakatları", 
        desc: "Anne adaylarının en çok korktuğu semptomlar ve panik atak anları anketlenip raporlaştırıldı.",
        tag: "Saha Doğrulama", 
        done: false 
      },
      { 
        id: "T-10", 
        q: "Q2", 
        period: "2. Çeyrek · Şubat – Nisan 2027", 
        title: "Kuveyt Türk Lonca & Arya Women Başvuruları", 
        desc: "Şirket kurmadan girilebilen yarışmalarla hissesiz ön sermaye arayışı.",
        tag: "Ön Fonlama", 
        done: false 
      },
      { 
        id: "T-11", 
        q: "Q2", 
        period: "2. Çeyrek · Şubat – Nisan 2027", 
        title: "TÜBİTAK 1812 2. Aşama Panel Değerlendirmesi", 
        desc: "Ankara TÜBİTAK paneli bağımsız hakem değerlendirmesi tamamlandı.",
        tag: "TÜBİTAK Onay", 
        done: false 
      },
      { 
        id: "T-12", 
        q: "Q2", 
        period: "2. Çeyrek · Şubat – Nisan 2027", 
        title: "TÜBİTAK Mükemmeliyet Mührü Onayı Tebliğ Edildi", 
        desc: "1.350.000 ₺ yatırım/hibe onaylandı; şirket kurma çağrısı (60 günlük süre) başladı.",
        tag: "BiGG Mühür", 
        done: false 
      },

      // 3. ÇEYREK: MAYIS - TEMMUZ 2027 (Şirketleşme & Çift Fon: 3 Milyon TL)
      { 
        id: "T-13", 
        q: "Q3", 
        period: "3. Çeyrek · Mayıs – Temmuz 2027", 
        title: "Mevcut İşten İhbar Süresiyle Ayrılış (SGK 4a Çıkışı)", 
        desc: "Mühür kesinleştikten sonra kurallara tam uyumlu şekilde istifa ve devir tamamlandı.",
        tag: "Geçiş", 
        done: false 
      },
      { 
        id: "T-14", 
        q: "Q3", 
        period: "3. Çeyrek · Mayıs – Temmuz 2027", 
        title: "DEPARK Teknopark'ta Tohum Bilişim A.Ş. Resmi Kuruluşu", 
        desc: "Teknopark vergi/SGK muafiyetli A.Ş. tescili yapıldı (%97 Buse Nur, %3 BiGG Fonu).",
        tag: "A.Ş. Kuruluş", 
        done: false 
      },
      { 
        id: "T-15", 
        q: "Q3", 
        period: "3. Çeyrek · Mayıs – Temmuz 2027", 
        title: "TÜBİTAK BiGG 1.350.000 ₺ Fonunun Şirket Hesabına Girişi", 
        desc: "BiGG Fonu sözleşmesi imzalandı ve ilk sermaye transferi gerçekleşti.",
        tag: "Sermaye", 
        done: false 
      },
      { 
        id: "T-16", 
        q: "Q3", 
        period: "3. Çeyrek · Mayıs – Temmuz 2027", 
        title: "KOSGEB Kadın Girişimci İş Geliştirme (1.685.000 ₺) Başvurusu", 
        desc: "35.000 ₺ kuruluş hibesi + 1.650.000 ₺ faizsiz destek başvurusu yapıldı (Kasadaki toplam: 3.035.000 ₺).",
        tag: "KOSGEB Fonu", 
        done: false 
      },
      { 
        id: "T-17", 
        q: "Q3", 
        period: "3. Çeyrek · Mayıs – Temmuz 2027", 
        title: "1 Tam Zamanlı Kıdemli Full-Stack/Mobil Yazılımcı İşe Alımı", 
        desc: "İş şartnamesi hazır olan kıdemli yazılımcı BiGG bütçesinden bordrolu istihdam edildi.",
        tag: "Ekip", 
        done: false 
      },

      // 4. ÇEYREK: AĞUSTOS - EKİM 2027 (Klinik Pakt, M0/M1 MVP & Lansman)
      { 
        id: "T-18", 
        q: "Q4", 
        period: "4. Çeyrek · Ağustos – Ekim 2027", 
        title: "DEÜ Tıp Perinatoloji & Pediatri ile Klinik Protokol İmzası", 
        desc: "F1 ≥ %90 raporumuzla 3 hekimlik danışma kurulu kuruldu, algoritmaların klinik onayı alındı.",
        tag: "Klinik Pakt", 
        done: false 
      },
      { 
        id: "T-19", 
        q: "Q4", 
        period: "4. Çeyrek · Ağustos – Ekim 2027", 
        title: "React Native M0 (Gebelik) ve M1 (0-2 Yaş) MVP Yayını", 
        desc: "Anne & Baba çift oturumlu, haptik titreşimli, sakinleştirici dilli stabil mobil uygulama derlendi.",
        tag: "M0/M1 MVP", 
        done: false 
      },
      { 
        id: "T-20", 
        q: "Q4", 
        period: "4. Çeyrek · Ağustos – Ekim 2027", 
        title: "100 Gebe ve Yeni Anne ile Kapalı Beta Testleri", 
        desc: "TestFlight ve Google Play Internal kanallarından gerçek kullanıcı geri bildirimleri toplandı.",
        tag: "Beta Test", 
        done: false 
      },
      { 
        id: "T-21", 
        q: "Q4", 
        period: "4. Çeyrek · Ağustos – Ekim 2027", 
        title: "App Store & Google Play Store Resmi Canlı Lansmanı", 
        desc: "ToHUM v1.0 genel indirmeye açıldı. İlk B2C ücretli 'ToHUM Aile Paketi' (199 ₺/ay) satışları başladı.",
        tag: "Lansman", 
        done: false 
      },
      { 
        id: "T-22", 
        q: "Q4", 
        period: "4. Çeyrek · Ağustos – Ekim 2027", 
        title: "1. Yıl Faaliyet ve KOSGEB/TÜBİTAK Hibe Kapanış Raporu", 
        desc: "BiGG 1. yıl taahhütleri eksiksiz teslim edildi, 2. yıl için TÜBİTAK 1507 hazırlığı başlatıldı.",
        tag: "Hibe Kapanış", 
        done: false 
      }
    ];

    let currentFilter = 'all';
    let tasks = [];

    function init() {
      // Load tasks
      const savedTasks = localStorage.getItem('tohum_tasks_12m_v1');
      if (savedTasks) {
        try {
          tasks = JSON.parse(savedTasks);
        } catch(e) {
          tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS_12M));
        }
      } else {
        tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS_12M));
      }

      // Load notes
      const savedNotes = localStorage.getItem('tohum_notes_12m_v1');
      if (savedNotes) {
        document.getElementById('founderNotes').value = savedNotes;
      }

      render();
    }

    function saveState() {
      localStorage.setItem('tohum_tasks_12m_v1', JSON.stringify(tasks));
      render();
    }

    function toggleTask(id) {
      const t = tasks.find(item => item.id === id);
      if (t) {
        t.done = !t.done;
        saveState();
      }
    }

    function setFilter(qKey) {
      currentFilter = qKey;
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500/20', 'text-amber-300', 'border', 'border-amber-500/30', 'font-semibold');
        btn.classList.add('text-white/60');
      });
      const activeBtn = document.getElementById('btn-' + qKey);
      if (activeBtn) {
        activeBtn.classList.add('bg-amber-500/20', 'text-amber-300', 'border', 'border-amber-500/30', 'font-semibold');
        activeBtn.classList.remove('text-white/60');
      }
      renderTasks();
    }

    function render() {
      renderTasks();
      updateProgress();
    }

    function renderTasks() {
      const container = document.getElementById('tasksContainer');
      container.innerHTML = '';

      let filtered = tasks;
      if (currentFilter !== 'all') {
        filtered = tasks.filter(t => t.q === currentFilter);
      }

      const quarters = [
        { id: "Q1", title: "1. Çeyrek · Kasım 2026 – Ocak 2027 (Ön Başvuru & M0 Savunma Kalkanı)", isCurrent: true },
        { id: "Q2", title: "2. Çeyrek · Şubat – Nisan 2027 (Jüri Sunumu, Panel & Mühür Onayı)", isCurrent: false },
        { id: "Q3", title: "3. Çeyrek · Mayıs – Temmuz 2027 (Şirketleşme & Çift Fon: 3 Milyon TL)", isCurrent: false },
        { id: "Q4", title: "4. Çeyrek · Ağustos – Ekim 2027 (Klinik Pakt, M0/M1 MVP & Lansman)", isCurrent: false }
      ];

      quarters.forEach(qObj => {
        const qTasks = filtered.filter(t => t.q === qObj.id);
        if (qTasks.length === 0) return;

        const card = document.createElement('div');
        card.className = 'p-5 sm:p-6 rounded-3xl bg-[#181311] border border-white/10 space-y-4 shadow-lg';

        card.innerHTML = `
          <div class="flex items-center justify-between border-b border-white/5 pb-3">
            <div class="flex items-center gap-2.5">
              <span class="w-3 h-3 rounded-full ${qObj.isCurrent ? 'bg-amber-400 animate-pulse' : 'bg-white/20'}"></span>
              <h3 class="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">${qObj.title}</h3>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full ${qObj.isCurrent ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-white/5 text-white/40'}">
              ${qObj.isCurrent ? 'ŞU ANKİ AŞAMA' : 'Gelecek Faz'}
            </span>
          </div>
          <div class="space-y-2.5" id="list_${qObj.id}"></div>
        `;

        container.appendChild(card);
        const listEl = card.querySelector('#list_' + qObj.id);

        qTasks.forEach(t => {
          const row = document.createElement('div');
          row.className = `p-3.5 sm:p-4 rounded-2xl border transition flex items-start gap-3.5 ${
            t.done 
              ? 'bg-white/[0.02] border-white/5 opacity-55' 
              : 'bg-[#120f0e] border-white/10 hover:border-amber-500/40 shadow-sm'
          }`;

          row.innerHTML = `
            <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTask('${t.id}')"
              class="mt-1 w-4 h-4 rounded border-white/20 text-[#c59b6d] focus:ring-0 cursor-pointer bg-white/5 flex-shrink-0">
            <div class="flex-1 min-w-0 space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs sm:text-sm font-semibold ${t.done ? 'line-through text-white/40' : 'text-white'}">
                  ${t.title}
                </span>
                <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60 border border-white/5">
                  ${t.tag}
                </span>
              </div>
              <p class="text-[11px] sm:text-xs text-white/60 leading-relaxed ${t.done ? 'line-through text-white/30' : ''}">
                ${t.desc}
              </p>
            </div>
          `;

          listEl.appendChild(row);
        });
      });
    }

    function updateProgress() {
      const total = tasks.length;
      const done = tasks.filter(t => t.done).length;
      const pct = total === 0 ? 0 : Math.round((done / total) * 100);

      document.getElementById('globalPctText').innerText = `%${pct}`;
      document.getElementById('globalProgressBar').style.width = `${pct}%`;
      document.getElementById('globalCountText').innerText = `${done} / ${total} Tamamlandı`;
    }

    function saveNotes() {
      const val = document.getElementById('founderNotes').value;
      localStorage.setItem('tohum_notes_12m_v1', val);
      const st = document.getElementById('notesStatus');
      st.innerText = 'Kaydedildi: ' + new Date().toLocaleTimeString();
    }

    function clearNotes() {
      if (confirm('Tüm notları temizlemek istediğinizden emin misiniz?')) {
        document.getElementById('founderNotes').value = '';
        localStorage.removeItem('tohum_notes_12m_v1');
        document.getElementById('notesStatus').innerText = 'Temizlendi';
      }
    }

    function addNewTaskPrompt() {
      const title = prompt('Yeni mikro-adım başlığı:');
      if (!title || !title.trim()) return;
      const desc = prompt('Kısa açıklama / not:', '');
      const q = prompt('Hangi çeyrek? (Q1, Q2, Q3, Q4):', currentFilter === 'all' ? 'Q1' : currentFilter);

      tasks.push({
        id: "T-" + Date.now(),
        q: (q || 'Q1').toUpperCase(),
        period: q === 'Q2' ? '2. Çeyrek' : q === 'Q3' ? '3. Çeyrek' : q === 'Q4' ? '4. Çeyrek' : '1. Çeyrek',
        title: title.trim(),
        desc: (desc || '').trim(),
        tag: 'Özel Adım',
        done: false
      });
      saveState();
    }

    function exportData() {
      const data = {
        tasks: tasks,
        notes: localStorage.getItem('tohum_notes_12m_v1') || '',
        exportedAt: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tohum_12ay_hafiza_yedegi_${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }

    function resetDefaults() {
      if (confirm('12 aylık adımları ilk varsayılan durumuna döndürmek istiyor musunuz?')) {
        localStorage.removeItem('tohum_tasks_12m_v1');
        tasks = JSON.parse(JSON.stringify(DEFAULT_TASKS_12M));
        render();
      }
    }

    // Init
    init();
  </script>
</body>
</html>
'''

with open(out_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print("Generated clean 12-Month Project Tracker & Memory Cockpit!")
