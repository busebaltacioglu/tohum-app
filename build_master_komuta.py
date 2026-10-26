# -*- coding: utf-8 -*-
import sys

out_path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html"

html_content = '''<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ToHUM · Master Hibe & 12 Aylık İcra Masası (Kasım 2026 - Mayıs 2028)</title>
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
              Master Hibe & İcra Masası (Kasım '26 – Mayıs '28)
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

    <!-- HERO: NEREDE KALDIK & ZAMANLAMA RADARI -->
    <section class="p-6 rounded-3xl bg-gradient-to-r from-[#221813] via-[#1a1411] to-[#251b14] border border-amber-500/30 shadow-xl relative overflow-hidden">
      <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
        
        <div class="space-y-2 max-w-2xl">
          <div class="flex items-center gap-2">
            <span class="w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping"></span>
            <span class="text-[11px] font-bold uppercase tracking-wider text-amber-300 font-mono">ŞU ANDA BURADAYIZ · FAZ 0 (ÖN HAZIRLIK)</span>
          </div>
          <h2 class="text-xl sm:text-2xl font-bold text-white font-serif tracking-tight">
            Kasım 2026: M0 Veri Bilimi Savunması & Jüri Öncesi Boşluk Kapatma
          </h2>
          <p class="text-xs sm:text-sm text-white/70 leading-relaxed">
            Resmi BiGG 12 aylık proje süresi şirket tesciliyle (Mayıs 2027) başlar ve Mayıs 2028'de biter. Şu an cebimizden 1 TL harcamadan jüri sunumu ve M0 algoritmamızı sağlama alıyoruz; ardından 3 Milyon TL çift fon girişi ve Ocak 2028'de TÜBİTAK 1507 köprüsüyle sıfır nakit açığı hedefliyoruz.
          </p>
        </div>

        <!-- Global Progress Card -->
        <div class="bg-[#181311]/80 backdrop-blur border border-white/10 rounded-2xl p-4 sm:p-5 flex flex-col justify-between min-w-[260px] space-y-3">
          <div class="flex items-center justify-between text-xs">
            <span class="text-white/60 font-medium">Toplam Hibe/İcra İlerlemesi</span>
            <span id="globalPctText" class="text-amber-300 font-bold font-mono text-base">%0</span>
          </div>
          <div class="w-full h-2.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
            <div id="globalProgressBar" class="h-full bg-gradient-to-r from-amber-500 to-emerald-400 rounded-full transition-all duration-500" style="width: 0%"></div>
          </div>
          <div class="flex items-center justify-between text-[11px] text-white/40 font-mono">
            <span id="globalCountText">0 / 25 Görev</span>
            <span class="text-emerald-400">Kasım '26 – Mayıs '28</span>
          </div>
        </div>

      </div>
    </section>

    <!-- 2 COLUMN WORKBENCH: TASKS (LEFT 65%) + MEMORY & TEŞVİK RADARI (RIGHT 35%) -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">

      <!-- LEFT: MASTER TASK TIMELINE (8 COLS) -->
      <div class="lg:col-span-8 space-y-6">

        <!-- Quarter / Phase Filter Tabs -->
        <div class="flex items-center justify-between flex-wrap gap-2 pb-1 border-b border-white/10">
          <div class="flex items-center gap-1.5 flex-wrap">
            <button onclick="setFilter('all')" id="btn-all" class="tab-btn px-3 py-1.5 text-xs font-semibold rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/30 transition">
              Tümü (Kasım '26 – Mayıs '28)
            </button>
            <button onclick="setFilter('F0')" id="btn-F0" class="tab-btn px-3 py-1.5 text-xs font-medium rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition">
              Faz 0: Şirketsiz (Şu An)
            </button>
            <button onclick="setFilter('F1')" id="btn-F1" class="tab-btn px-3 py-1.5 text-xs font-medium rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition">
              BiGG Ay 1-3 (Mayıs '27)
            </button>
            <button onclick="setFilter('F2')" id="btn-F2" class="tab-btn px-3 py-1.5 text-xs font-medium rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition">
              BiGG Ay 4-6 (Güz '27)
            </button>
            <button onclick="setFilter('F3')" id="btn-F3" class="tab-btn px-3 py-1.5 text-xs font-medium rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition">
              BiGG Ay 7-9 (1507 Köprüsü)
            </button>
            <button onclick="setFilter('F4')" id="btn-F4" class="tab-btn px-3 py-1.5 text-xs font-medium rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition">
              BiGG Ay 10-12 (Mayıs '28)
            </button>
          </div>

          <div class="flex items-center gap-2">
            <button onclick="addNewTaskPrompt()" class="px-2.5 py-1 text-xs rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[#c59b6d] hover:text-white transition flex items-center gap-1 font-medium">
              <span>+</span> Yeni Adım
            </button>
          </div>
        </div>

        <!-- Task List Container -->
        <div id="tasksContainer" class="space-y-6">
          <!-- Dynamic rendering from JS -->
        </div>

      </div>

      <!-- RIGHT: ORTAKLIK HAFIZA DEFTERİ & KURUMSAL TEŞVİK RADARI (4 COLS) -->
      <div class="lg:col-span-4 space-y-6">

        <!-- Kurumsal Hibe & Teşvik Takvimi Radarı (Zamanlama Kaçırma Kalkanı) -->
        <div class="p-5 rounded-3xl bg-[#181311] border border-amber-500/20 space-y-4 shadow-lg">
          <div class="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="text-base">📅</span>
              <h3 class="text-xs font-bold uppercase tracking-wider text-amber-300">Hibe & Teşvik Zamanlaması</h3>
            </div>
            <span class="text-[10px] text-white/40 font-mono">Kritik Tarihler</span>
          </div>

          <div class="space-y-3 text-xs">
            <div class="p-3 rounded-2xl bg-[#120f0e] border border-white/10 space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-white text-[11px]">1. Microsoft Founders Hub</span>
                <span class="text-[10px] text-amber-300 font-mono">Aralık 2026</span>
              </div>
              <p class="text-[11px] text-white/60">25.000 $ Bulut/OpenAI kredisi. Şirketsiz alınır; ilk yıl sunucu maliyeti 0 TL olur.</p>
            </div>

            <div class="p-3 rounded-2xl bg-[#120f0e] border border-white/10 space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-white text-[11px]">2. KOSGEB Kadın Girişimci</span>
                <span class="text-[10px] text-emerald-400 font-mono">Mayıs 2027</span>
              </div>
              <p class="text-[11px] text-white/60">Şirket tescilinin ertesi günü! 35.000 TL kuruluş hibesi + 1.650.000 TL faizsiz iş geliştirme desteği.</p>
            </div>

            <div class="p-3 rounded-2xl bg-[#120f0e] border border-amber-500/30 bg-amber-950/20 space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-amber-200 text-[11px]">3. TÜBİTAK 1507 KOBİ Ar-Ge</span>
                <span class="text-[10px] text-amber-300 font-mono font-bold">Ocak 2028 (9. Ay)</span>
              </div>
              <p class="text-[11px] text-white/70">BiGG bitmeden 4 ay önce başvurulur (2.4M ₺). BiGG bittiği gün fon başlar; nakit uçurumu sıfırlanır.</p>
            </div>

            <div class="p-3 rounded-2xl bg-[#120f0e] border border-white/10 space-y-1">
              <div class="flex items-center justify-between">
                <span class="font-bold text-white text-[11px]">4. Arya Women & Melek Yatırım</span>
                <span class="text-[10px] text-purple-300 font-mono">Nisan - Mayıs 2028</span>
              </div>
              <p class="text-[11px] text-white/60">BiGG başarıyla kapanırken çalışan ürün ve hekim gelirleriyle tohum (seed) yatırım turu.</p>
            </div>
          </div>
        </div>

        <!-- Active Decision / Memory Card -->
        <div class="p-5 rounded-3xl bg-[#181311] border border-white/10 space-y-3.5 shadow-lg">
          <div class="flex items-center justify-between border-b border-white/5 pb-2.5">
            <div class="flex items-center gap-2">
              <span class="text-base">🧠</span>
              <h3 class="text-xs font-bold uppercase tracking-wider text-white">Ortaklık Karar Hafızası</h3>
            </div>
            <span class="text-[10px] text-emerald-400 font-mono">Canlı Kayıt</span>
          </div>

          <textarea id="founderNotes" oninput="saveNotes()" rows="8" 
            placeholder="Toplantı notları ve anlık kararlarımız buraya yazılır, asla kaybolmaz..." 
            class="w-full bg-[#120f0e] border border-white/10 rounded-2xl p-3.5 text-xs text-white/90 placeholder-white/20 focus:outline-none focus:border-amber-500/50 resize-y font-mono leading-relaxed"></textarea>

          <div class="flex items-center justify-between text-[10px] text-white/40 pt-1">
            <span id="notesStatus">Son kayıt: Az önce</span>
            <button onclick="clearNotes()" class="text-red-400/60 hover:text-red-400 hover:underline">Temizle</button>
          </div>
        </div>

      </div>

    </div>

  </main>

  <script>
    // TOHUM MASTER HİBE & İCRA TAKVİMİ (Kasım 2026 - Mayıs 2028)
    const DEFAULT_MASTER_TASKS = [
      // FAZ 0: ŞİRKET ÖNCESİ ONAY & CAN SUYU (Kasım 2026 – Nisan 2027 / 6 Ay)
      { 
        id: "T-01", 
        f: "F0", 
        period: "Faz 0: Şirketsiz Ön Hazırlık · Kasım 2026 – Nisan 2027", 
        title: "DEPARK 137 No'lu BiGG İş Planı Dokümanı Teslim Edildi", 
        desc: "AGY112 formatında iş planı tamamlandı, sistem üzerinden resmi teslim gerçekleştirildi.",
        tag: "BiGG Başvuru", 
        done: true 
      },
      { 
        id: "T-02", 
        f: "F0", 
        period: "Faz 0: Şirketsiz Ön Hazırlık · Kasım 2026 – Nisan 2027", 
        title: "KOSGEB İleri Girişimci Belgesi Alındı (23.10.2026)", 
        desc: "Sertifika hazır (KSB01UGE0115336423). Şirket kurulduğu an 300.000 TL hibe hakkı garanti altına alındı.",
        tag: "Mevzuat", 
        done: true 
      },
      { 
        id: "T-03", 
        f: "F0", 
        period: "Faz 0: Şirketsiz Ön Hazırlık · Kasım 2026 – Nisan 2027", 
        title: "M0 Dengesiz Veri & F1 ≥ %90 Model Savunma Raporu", 
        desc: "Preeklampsi/gestasyonel risklerde %95'e %5 dengesiz veri çözümü (SMOTE & Maliyet Duyarlı Öğrenme) savunması hazırlandı.",
        tag: "M0 Çekirdek", 
        done: false 
      },
      { 
        id: "T-04", 
        f: "F0", 
        period: "Faz 0: Şirketsiz Ön Hazırlık · Kasım 2026 – Nisan 2027", 
        title: "MDR Kalkanı: 'Tıbbi Teşhis Değil, Trend Analitiği' Tanımı", 
        desc: "Sağlık Bakanlığı ve CE MDR tıbbi cihaz engelini aşmak için iş planı terminolojisi hukuki ve regülatif olarak kilitlendi.",
        tag: "Regülasyon", 
        done: false 
      },
      { 
        id: "T-05", 
        f: "F0", 
        period: "Faz 0: Şirketsiz Ön Hazırlık · Kasım 2026 – Nisan 2027", 
        title: "Kişisel Bazal Eşik (14 Günlük Kalibrasyon) Algoritma Şeması", 
        desc: "Standart tansiyon sınırları yerine gebe kadının kendi bazalini öğrenen fark yaratan inovasyon şeması tamamlandı.",
        tag: "M0 Çekirdek", 
        done: false 
      },
      { 
        id: "T-06", 
        f: "F0", 
        period: "Faz 0: Şirketsiz Ön Hazırlık · Kasım 2026 – Nisan 2027", 
        title: "Microsoft Founders Hub Başvurusu (25.000 $ Kredi)", 
        desc: "Aralık 2026'da şirket olmadan başvuru yapılacak; ilk 1 yıl sunucu ve OpenAI API maliyetleri sıfırlanacak.",
        tag: "Bulut Teşviki", 
        done: false 
      },
      { 
        id: "T-07", 
        f: "F0", 
        period: "Faz 0: Şirketsiz Ön Hazırlık · Kasım 2026 – Nisan 2027", 
        title: "DEPARK Jüri Sunum Provamız: 10 Kritik Soru-Cevap Kartı", 
        desc: "Jürinin soracağı en zor sorular (tıbbi risk, pazar, rakip analizi, ekip) için prova ve konuşma rehberi tamamlandı.",
        tag: "Jüri Hazırlığı", 
        done: false 
      },
      { 
        id: "T-08", 
        f: "F0", 
        period: "Faz 0: Şirketsiz Ön Hazırlık · Kasım 2026 – Nisan 2027", 
        title: "Kuveyt Türk Lonca & Arya Women Başvuruları", 
        desc: "Şubat 2027: Şirket kurmadan girilebilen yarışmalarla hissesiz ön nakit ödülü başvurusu.",
        tag: "Ön Fonlama", 
        done: false 
      },
      { 
        id: "T-09", 
        f: "F0", 
        period: "Faz 0: Şirketsiz Ön Hazırlık · Kasım 2026 – Nisan 2027", 
        title: "TÜBİTAK 1812 2. Aşama Panel Değerlendirmesi & Mühür Onayı", 
        desc: "Nisan 2027: TÜBİTAK Mükemmeliyet Mührü tebliği ile 1.350.000 ₺ şirketleşme çağrısı alındı.",
        tag: "BiGG Mühür", 
        done: false 
      },

      // FAZ 1: BİGG 1-3. AY · ŞİRKETLEŞME & KOSGEB ÇİFT FON GİRİŞİ (Mayıs – Temmuz 2027)
      { 
        id: "T-10", 
        f: "F1", 
        period: "Faz 1: BiGG 1-3. Ay · Mayıs – Temmuz 2027", 
        title: "Mevcut İşten İhbar Süresiyle Resmi Ayrılış (SGK 4a Çıkışı)", 
        desc: "Mühür kesinleştikten sonra kurallara tam uyumlu şekilde istifa ve devir tamamlandı.",
        tag: "Geçiş", 
        done: false 
      },
      { 
        id: "T-11", 
        f: "F1", 
        period: "Faz 1: BiGG 1-3. Ay · Mayıs – Temmuz 2027", 
        title: "DEPARK Teknopark'ta Tohum Bilişim A.Ş. Resmi Kuruluşu", 
        desc: "Teknopark vergi/SGK muafiyetli A.Ş. tescili yapıldı (%97 Buse Nur, %3 BiGG Fonu).",
        tag: "A.Ş. Kuruluş", 
        done: false 
      },
      { 
        id: "T-12", 
        f: "F1", 
        period: "Faz 1: BiGG 1-3. Ay · Mayıs – Temmuz 2027", 
        title: "TÜBİTAK BiGG 1.350.000 ₺ Fonunun Şirket Hesabına Girişi", 
        desc: "BiGG Fonu sözleşmesi imzalandı ve resmi 12 aylık proje saati başladı.",
        tag: "BiGG Sermaye", 
        done: false 
      },
      { 
        id: "T-13", 
        f: "F1", 
        period: "Faz 1: BiGG 1-3. Ay · Mayıs – Temmuz 2027", 
        title: "KOSGEB Kadın Girişimci (1.685.000 ₺) Başvurusu (Hemen Ertesi Gün)", 
        desc: "35.000 ₺ kuruluş hibesi + 1.650.000 ₺ faizsiz destek başvurusu (Kasadaki toplam güç: 3.035.000 ₺).",
        tag: "KOSGEB Fonu", 
        done: false 
      },
      { 
        id: "T-14", 
        f: "F1", 
        period: "Faz 1: BiGG 1-3. Ay · Mayıs – Temmuz 2027", 
        title: "1 Tam Zamanlı Kıdemli Full-Stack/Mobil Yazılımcı İşe Alımı", 
        desc: "İş şartnamesi hazır olan kıdemli yazılımcı BiGG bütçesinden bordrolu istihdam edildi.",
        tag: "Ekip", 
        done: false 
      },

      // FAZ 2: BİGG 4-6. AY · KLİNİK PAKT & M0/M1 MVP (Ağustos – Ekim 2027)
      { 
        id: "T-15", 
        f: "F2", 
        period: "Faz 2: BiGG 4-6. Ay · Ağustos – Ekim 2027", 
        title: "DEÜ Tıp Perinatoloji & Pediatri ile Klinik Protokol İmzası", 
        desc: "F1 ≥ %90 raporumuzla 3 hekimlik danışma kurulu kuruldu, algoritmaların klinik onayı alındı (İP-2).",
        tag: "Klinik Pakt", 
        done: false 
      },
      { 
        id: "T-16", 
        f: "F2", 
        period: "Faz 2: BiGG 4-6. Ay · Ağustos – Ekim 2027", 
        title: "React Native M0 (Gebelik) ve M1 (0-2 Yaş) MVP Entegrasyonu", 
        desc: "Anne & Baba çift oturumlu, haptik titreşimli, sakinleştirici dilli stabil mobil uygulama derlendi.",
        tag: "M0/M1 MVP", 
        done: false 
      },
      { 
        id: "T-17", 
        f: "F2", 
        period: "Faz 2: BiGG 4-6. Ay · Ağustos – Ekim 2027", 
        title: "BiGG 1. Dönem İlerleme Raporu (AGY312) Teslimi", 
        desc: "TÜBİTAK izleyicisine 6. ay teknik ve mali ilerleme raporu başarıyla sunuldu.",
        tag: "BiGG Rapor", 
        done: false 
      },

      // FAZ 3: BİGG 7-9. AY · CANLI LANSMAN & TÜBİTAK 1507 KÖPRÜSÜ (Kasım 2027 – Ocak 2028)
      { 
        id: "T-18", 
        f: "F3", 
        period: "Faz 3: BiGG 7-9. Ay · Kasım 2027 – Ocak 2028", 
        title: "100 Gebe ve Yeni Anne ile Kapalı Beta Testleri", 
        desc: "TestFlight ve Google Play Internal kanallarından gerçek kullanıcı geri bildirimleri toplandı.",
        tag: "Beta Test", 
        done: false 
      },
      { 
        id: "T-19", 
        f: "F3", 
        period: "Faz 3: BiGG 7-9. Ay · Kasım 2027 – Ocak 2028", 
        title: "App Store & Google Play Store Resmi Canlı Lansmanı", 
        desc: "ToHUM v1.0 genel indirmeye açıldı. İlk B2C ücretli 'ToHUM Aile Paketi' (199 ₺/ay) satışları başladı.",
        tag: "Lansman", 
        done: false 
      },
      { 
        id: "T-20", 
        f: "F3", 
        period: "Faz 3: BiGG 7-9. Ay · Kasım 2027 – Ocak 2028", 
        title: "⚠️ KRİTİK: TÜBİTAK 1507 KOBİ Ar-Ge (2.4 Milyon ₺) Başvurusu", 
        desc: "BiGG'in 9. ayında (Ocak 2028) başvuru yapılır. Amaç: BiGG bittiği gün 1507 hibe musluğu açılır; şirket fon boşluğu yaşamaz.",
        tag: "1507 Hibe Köprüsü", 
        done: false 
      },

      // FAZ 4: BİGG 10-12. AY · TİCARİ GELİRLER & BİGG KAPANIŞI (Şubat – Mayıs 2028)
      { 
        id: "T-21", 
        f: "F4", 
        period: "Faz 4: BiGG 10-12. Ay · Şubat – Mayıs 2028", 
        title: "İzmir Özel Hastaneleri B2B Doğum Paketi Abonelikleri", 
        desc: "Kadın doğum kliniklerine aylık 1.450 TL B2B lisans satışı ile düzenli nakit akışı oluşturuldu.",
        tag: "B2B Gelir", 
        done: false 
      },
      { 
        id: "T-22", 
        f: "F4", 
        period: "Faz 4: BiGG 10-12. Ay · Şubat – Mayıs 2028", 
        title: "Arya Women & Melek Yatırım Ağı (Seed Turu: 300K - 500K $)", 
        desc: "Çalışan ürün, 5.000+ aktif anne ve B2B hekim gelirleri ile melek yatırımcılara sunum yapıldı.",
        tag: "Melek Yatırım", 
        done: false 
      },
      { 
        id: "T-23", 
        f: "F4", 
        period: "Faz 4: BiGG 10-12. Ay · Şubat – Mayıs 2028", 
        title: "BiGG 12. Ay Proje Sonuç Raporu (AGY350) & Başarılı Kapanış", 
        desc: "TÜBİTAK 1812 BiGG projesi %100 başarıyla kapatıldı; TÜBİTAK'tan onay belgesi alındı.",
        tag: "BiGG Kapanış", 
        done: false 
      },
      { 
        id: "T-24", 
        f: "F4", 
        period: "Faz 4: BiGG 10-12. Ay · Şubat – Mayıs 2028", 
        title: "KOSGEB 1. Yıl Faaliyet ve İzleme Raporunun Verilmesi", 
        desc: "KOSGEB İş Geliştirme Desteği 1. yıl harcama ve bordro tevsikleri onaylandı.",
        tag: "KOSGEB İnceleme", 
        done: false 
      },
      { 
        id: "T-25", 
        f: "F4", 
        period: "Faz 4: BiGG 10-12. Ay · Şubat – Mayıs 2028", 
        title: "TÜBİTAK 1507 Sözleşme İmzası & Kesintisiz 2. Yıl Ar-Ge Başlangıcı", 
        desc: "BiGG bittiği gün 2.400.000 ₺ bütçeli 1507 projesi başlar. ToHUM sıfır gün nakit açığıyla 2. yılına geçer.",
        tag: "Kesintisiz Runway", 
        done: false 
      }
    ];

    let currentFilter = 'all';
    let tasks = [];

    function init() {
      // Load tasks
      const savedTasks = localStorage.getItem('tohum_tasks_master_18m_v1');
      if (savedTasks) {
        try {
          tasks = JSON.parse(savedTasks);
        } catch(e) {
          tasks = JSON.parse(JSON.stringify(DEFAULT_MASTER_TASKS));
        }
      } else {
        tasks = JSON.parse(JSON.stringify(DEFAULT_MASTER_TASKS));
      }

      // Load notes
      const savedNotes = localStorage.getItem('tohum_notes_master_18m_v1');
      if (savedNotes) {
        document.getElementById('founderNotes').value = savedNotes;
      }

      render();
    }

    function saveState() {
      localStorage.setItem('tohum_tasks_master_18m_v1', JSON.stringify(tasks));
      render();
    }

    function toggleTask(id) {
      const t = tasks.find(item => item.id === id);
      if (t) {
        t.done = !t.done;
        saveState();
      }
    }

    function setFilter(fKey) {
      currentFilter = fKey;
      document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('bg-amber-500/20', 'text-amber-300', 'border', 'border-amber-500/30', 'font-semibold');
        btn.classList.add('text-white/60');
      });
      const activeBtn = document.getElementById('btn-' + fKey);
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
        filtered = tasks.filter(t => t.f === currentFilter);
      }

      const phases = [
        { id: "F0", title: "Faz 0: Şirketsiz Ön Hazırlık · Kasım 2026 – Nisan 2027 (Jüri, F1 Savunması & Mühür)", isCurrent: true },
        { id: "F1", title: "Faz 1: BiGG 1-3. Ay · Mayıs – Temmuz 2027 (A.Ş. Kuruluşu & 3 Milyon TL Çift Fon)", isCurrent: false },
        { id: "F2", title: "Faz 2: BiGG 4-6. Ay · Ağustos – Ekim 2027 (Klinik Pakt & M0/M1 MVP Entegrasyonu)", isCurrent: false },
        { id: "F3", title: "Faz 3: BiGG 7-9. Ay · Kasım 2027 – Ocak 2028 (Mağaza Lansmanı & TÜBİTAK 1507 Başvurusu)", isCurrent: false },
        { id: "F4", title: "Faz 4: BiGG 10-12. Ay · Şubat – Mayıs 2028 (Ticari Gelirler, BiGG Kapanışı & Melek Yatırım)", isCurrent: false }
      ];

      phases.forEach(pObj => {
        const pTasks = filtered.filter(t => t.f === pObj.id);
        if (pTasks.length === 0) return;

        const card = document.createElement('div');
        card.className = 'p-5 sm:p-6 rounded-3xl bg-[#181311] border border-white/10 space-y-4 shadow-lg';

        card.innerHTML = `
          <div class="flex items-center justify-between border-b border-white/5 pb-3">
            <div class="flex items-center gap-2.5">
              <span class="w-3 h-3 rounded-full ${pObj.isCurrent ? 'bg-amber-400 animate-pulse' : 'bg-white/20'}"></span>
              <h3 class="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">${pObj.title}</h3>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded-full ${pObj.isCurrent ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' : 'bg-white/5 text-white/40'}">
              ${pObj.isCurrent ? 'ŞU ANKİ FAZ' : 'Planlanan Dönem'}
            </span>
          </div>
          <div class="space-y-2.5" id="list_${pObj.id}"></div>
        `;

        container.appendChild(card);
        const listEl = card.querySelector('#list_' + pObj.id);

        pTasks.forEach(t => {
          const isCrucial = t.title.includes('⚠️ KRİTİK') || t.title.includes('1507');
          const row = document.createElement('div');
          row.className = `p-3.5 sm:p-4 rounded-2xl border transition flex items-start gap-3.5 ${
            t.done 
              ? 'bg-white/[0.02] border-white/5 opacity-55' 
              : isCrucial 
                ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-500/70 shadow-sm' 
                : 'bg-[#120f0e] border-white/10 hover:border-amber-500/30 shadow-sm'
          }`;

          row.innerHTML = `
            <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleTask('${t.id}')"
              class="mt-1 w-4 h-4 rounded border-white/20 text-[#c59b6d] focus:ring-0 cursor-pointer bg-white/5 flex-shrink-0">
            <div class="flex-1 min-w-0 space-y-1">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="text-xs sm:text-sm font-semibold ${t.done ? 'line-through text-white/40' : 'text-white'}">
                  ${t.title}
                </span>
                <span class="text-[9px] font-mono px-2 py-0.5 rounded ${isCrucial ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold' : 'bg-white/5 text-white/60 border border-white/5'}">
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
      localStorage.setItem('tohum_notes_master_18m_v1', val);
      const st = document.getElementById('notesStatus');
      st.innerText = 'Kaydedildi: ' + new Date().toLocaleTimeString();
    }

    function clearNotes() {
      if (confirm('Tüm notları temizlemek istediğinizden emin misiniz?')) {
        document.getElementById('founderNotes').value = '';
        localStorage.removeItem('tohum_notes_master_18m_v1');
        document.getElementById('notesStatus').innerText = 'Temizlendi';
      }
    }

    function addNewTaskPrompt() {
      const title = prompt('Yeni mikro-adım başlığı:');
      if (!title || !title.trim()) return;
      const desc = prompt('Kısa açıklama / not:', '');
      const f = prompt('Hangi Faz? (F0: Şu An, F1: Ay 1-3, F2: Ay 4-6, F3: Ay 7-9, F4: Ay 10-12):', currentFilter === 'all' ? 'F0' : currentFilter);

      tasks.push({
        id: "T-" + Date.now(),
        f: (f || 'F0').toUpperCase(),
        period: 'Özel Eklenen Adım',
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
        notes: localStorage.getItem('tohum_notes_master_18m_v1') || '',
        exportedAt: new Date().toISOString()
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `tohum_master_hibe_icra_yedegi_${new Date().toISOString().slice(0,10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }

    function resetDefaults() {
      if (confirm('Tüm hibe ve icra adımlarını ilk varsayılan durumuna döndürmek istiyor musunuz?')) {
        localStorage.removeItem('tohum_tasks_master_18m_v1');
        tasks = JSON.parse(JSON.stringify(DEFAULT_MASTER_TASKS));
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

print("Generated clean Master Hibe & 18-Month Execution Cockpit successfully!")
