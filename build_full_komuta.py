# -*- coding: utf-8 -*-
import sys

out_path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html"

# Write out the complete file
with open(out_path, "w", encoding="utf-8") as f:
    f.write('''<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ToHUM · Kurumsal Yönetim & Operasyon Masası</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">
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
      width: 5px;
      height: 5px;
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
<body class="h-screen flex overflow-hidden bg-[#120f0e]">

  <!-- LEFT SIDEBAR -->
  <aside class="w-72 bg-[#181311] border-r border-white/10 flex flex-col flex-shrink-0 z-30 select-none">
    
    <!-- Brand Header -->
    <div class="p-5 border-b border-white/10">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#c59b6d] to-[#805b38] flex items-center justify-center shadow-lg shadow-amber-950/40 text-white font-bold text-xl">
          🌱
        </div>
        <div class="min-w-0">
          <h1 class="text-sm font-bold text-white tracking-wide truncate">ToHUM A.Ş.</h1>
          <p class="text-[11px] text-[#cca086] font-medium">Kurumsal Komuta & Asistan</p>
        </div>
      </div>
      <div class="mt-3 flex items-center justify-between text-[11px] px-2.5 py-1.5 rounded-xl bg-[#1e1815] border border-white/5">
        <span class="text-white/60">İcra Masası</span>
        <span class="text-emerald-400 font-semibold flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Çift Ortak Aktif
        </span>
      </div>
    </div>

    <!-- Navigation Scroll Area -->
    <div class="flex-1 overflow-y-auto p-3 space-y-6">
      
      <!-- Ana Menü -->
      <div class="space-y-1">
        <p class="px-3 text-[10px] font-bold uppercase tracking-wider text-white/40 mb-2">Genel Yönetim</p>
        
        <button onclick="navigate('view-dashboard')" id="nav-view-dashboard" class="nav-item w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition text-white bg-white/10 border border-white/5">
          <span class="text-base">📊</span>
          <span>Genel Bakış & Risk Radarı</span>
        </button>

        <button onclick="navigate('view-timeline')" id="nav-view-timeline" class="nav-item w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-xl transition text-white/70 hover:text-white hover:bg-white/5">
          <div class="flex items-center gap-2.5 min-w-0">
            <span class="text-base">🎯</span>
            <span class="font-bold text-amber-300 truncate">Tarih Bazlı Süreç Takip</span>
          </div>
          <span class="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold font-mono">BiGG & M0/M1</span>
        </button>

        <button onclick="navigate('view-gantt')" id="nav-view-gantt" class="nav-item w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition text-white/70 hover:text-white hover:bg-white/5">
          <span class="text-base">📅</span>
          <span>24 Aylık Hibe & Gantt</span>
        </button>

        <button onclick="navigate('view-finance')" id="nav-view-finance" class="nav-item w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition text-white/70 hover:text-white hover:bg-white/5">
          <span class="text-base">💰</span>
          <span>KOSGEB Finans & Başabaş</span>
        </button>

        <button onclick="navigate('view-roles')" id="nav-view-roles" class="nav-item w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-xl transition text-white/70 hover:text-white hover:bg-white/5">
          <span class="text-base">👥</span>
          <span>Roller & Danışma Kurulu</span>
        </button>
      </div>

      <!-- 19 Kurumsal Süreç -->
      <div class="space-y-1">
        <div class="flex items-center justify-between px-3 mb-2">
          <p class="text-[10px] font-bold uppercase tracking-wider text-white/40">19 Kurumsal Süreç</p>
          <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-[#c59b6d]">19/19</span>
        </div>

        <!-- Category A: Strateji -->
        <div class="pt-1">
          <p class="px-3 text-[10px] font-semibold text-amber-400/80 mb-1">A. Strateji & Yönetim</p>
          <div class="space-y-0.5" id="processListA"></div>
        </div>

        <!-- Category B: Üretim / Teknoloji -->
        <div class="pt-3">
          <p class="px-3 text-[10px] font-semibold text-emerald-400/80 mb-1">B. Teknoloji & Yaşam Döngüsü</p>
          <div class="space-y-0.5" id="processListB"></div>
        </div>

        <!-- Category C: Ticari / Destek -->
        <div class="pt-3">
          <p class="px-3 text-[10px] font-semibold text-sky-400/80 mb-1">C. Ticari & Destek</p>
          <div class="space-y-0.5" id="processListC"></div>
        </div>
      </div>

    </div>

    <!-- Sidebar Footer -->
    <div class="p-3 border-t border-white/10 bg-[#120f0e]/50 space-y-2">
      <a href="index.html" target="_blank" class="w-full flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl bg-gradient-to-r from-[#b68364] to-[#86553e] text-white shadow-lg shadow-amber-950/40 hover:opacity-95 transition">
        <span>📱 Mobil Simülatörü Aç</span>
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
      </a>
      <div class="text-[10px] text-center text-white/40">
        ToHUM Bilişim ve Teknoloji A.Ş. · 2026
      </div>
    </div>
  </aside>

  <!-- MAIN WORKSPACE CONTENT -->
  <main class="flex-1 flex flex-col min-w-0 bg-[#120f0e] overflow-y-auto">

    <!-- Top Sticky Bar -->
    <div class="sticky top-0 z-20 bg-[#120f0e]/90 backdrop-blur border-b border-white/10 px-8 py-3.5 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span id="currentSectionIcon" class="text-xl">📊</span>
        <div>
          <h2 id="currentSectionTitle" class="text-sm font-bold text-white">Genel Bakış & Komuta Masası</h2>
          <p id="currentSectionSubtitle" class="text-[11px] text-white/50">ToHUM Bilişim ve Teknoloji A.Ş. İcra Özeti</p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <div class="hidden sm:flex items-center gap-2 text-xs bg-[#1e1815] px-3 py-1.5 rounded-xl border border-white/10">
          <span class="text-white/40">Genel İlerleme:</span>
          <span id="globalProgressText" class="font-bold text-emerald-400">0%</span>
        </div>
        <button onclick="resetAllDefaults()" class="text-[11px] text-white/40 hover:text-white/80 transition px-2 py-1 rounded bg-white/5">
          Sıfırla
        </button>
      </div>
    </div>

    <!-- DYNAMIC VIEW CONTAINER -->
    <div class="p-8 max-w-6xl mx-auto w-full space-y-8 flex-1">
      
      <!-- VIEW 1: DASHBOARD & RISK RADAR -->
      <section id="view-dashboard" class="view-panel space-y-6">
        
        <!-- Soft Alert Banner -->
        <div class="p-5 rounded-2xl bg-gradient-to-r from-amber-950/30 via-stone-900/40 to-stone-900/60 border border-amber-500/20 shadow-xl space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="text-lg">🛡️</span>
              <h3 class="text-xs font-bold uppercase tracking-wider text-amber-300">Ortaklık Kalkanı: Hayati Hukuk & Fon Kuralları</h3>
            </div>
            <span class="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-mono">İleri Girişimci Onaylandı</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div class="p-3 rounded-xl bg-[#1e1815]/60 border border-white/5">
              <p class="font-bold text-emerald-400 mb-1">✅ 1. KOSGEB İleri Girişimci (Tamamlandı)</p>
              <p class="text-white/70 text-[11px]">23.10.2026 belgesiyle 300.000 ₺ makine/yazılım ve 10.000 ₺ mentörlük hakkı yasal olarak cepte.</p>
            </div>
            <div class="p-3 rounded-xl bg-[#1e1815]/60 border border-white/5">
              <p class="font-bold text-amber-400 mb-1">⏳ 2. Şirketleşme Yasağı (BiGG Mührü)</p>
              <p class="text-white/70 text-[11px]">TÜBİTAK 1812 mühür kararı çıkana kadar şirket kurulmayacak. 1.350.000 ₺ hibe hakkı korunuyor.</p>
            </div>
            <div class="p-3 rounded-xl bg-[#1e1815]/60 border border-white/5">
              <p class="font-bold text-sky-400 mb-1">💼 3. SGK 4(a) & İhbar Geçişi</p>
              <p class="text-white/70 text-[11px]">Mühür açıklandığında ihbar süresi başlatılacak; çıkış yapıldığı gün A.Ş. tescili ve KBS kaydı yapılacak.</p>
            </div>
          </div>
        </div>

        <!-- 4 Key Stat Cards -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div class="p-4 rounded-2xl bg-[#1e1815] border border-white/10">
            <p class="text-[11px] text-white/50">Mevcut Evre</p>
            <p class="text-lg font-bold text-white mt-1">BİGGSİNERJİ (DEPARK)</p>
            <p class="text-[11px] text-emerald-400 mt-1">137 No'lu Proje · TRL 3-4</p>
          </div>
          <div class="p-4 rounded-2xl bg-[#1e1815] border border-white/10">
            <p class="text-[11px] text-white/50">Mayıs 2027 Hedef Kasa Gücü</p>
            <p class="text-lg font-bold text-[#e5c17b] mt-1">3.035.000 ₺</p>
            <p class="text-[11px] text-white/40 mt-1">BiGG (1.35M) + KOSGEB (1.685M)</p>
          </div>
          <div class="p-4 rounded-2xl bg-[#1e1815] border border-white/10">
            <p class="text-[11px] text-white/50">Kesintisiz Yaşam (Runway)</p>
            <p class="text-lg font-bold text-sky-400 mt-1">25 – 30 Ay</p>
            <p class="text-[11px] text-emerald-400 mt-1">Nakit Uçurumu Riski %0</p>
          </div>
          <div class="p-4 rounded-2xl bg-[#1e1815] border border-white/10">
            <p class="text-[11px] text-white/50">Bulut Maliyet Kalkanı</p>
            <p class="text-lg font-bold text-purple-400 mt-1">25.000 $</p>
            <p class="text-[11px] text-white/40 mt-1">Microsoft Founders Hub (Azure/AI)</p>
          </div>
        </div>

        <!-- Quick Action Desk Overview -->
        <div class="p-6 rounded-2xl bg-[#1e1815] border border-white/10 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-sm font-bold text-white">Öncelikli Eylem ve Taahhütler Listesi</h3>
              <p class="text-xs text-white/50">Tüm süreçlerden toplanan kritik dönüm noktaları</p>
            </div>
            <button onclick="navigate('view-timeline')" class="text-xs text-[#c59b6d] hover:underline font-semibold">Tarih Bazlı Süreç Takibini Gör →</button>
          </div>
          <div id="quickActionList" class="space-y-2"></div>
        </div>

      </section>

      <!-- VIEW: TARİH BAZLI SÜREÇ TAKİP (MASTER TIMELINE & PRIORITY MATRIX) -->
      <section id="view-timeline" class="view-panel hidden space-y-6">
        
        <!-- #1 North Star Priority Banner -->
        <div class="p-6 rounded-2xl bg-gradient-to-r from-amber-950/50 via-amber-900/25 to-stone-900 border-2 border-amber-500/40 shadow-2xl space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <span class="text-2xl animate-pulse">🎯</span>
              <h3 class="text-xs font-extrabold uppercase tracking-widest text-amber-300">ŞİRKETİN 1 NUMARALI KUZEY YILDIZI & HAYATTA KALMA KURALI</h3>
            </div>
            <span class="text-[10px] px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-200 border border-amber-500/40 font-bold font-mono">EN BÜYÜK ÖNCELİK</span>
          </div>
          <h2 class="text-base font-bold text-white tracking-wide">TÜBİTAK BiGG İş Planı (AGY112) Onayı + M0 (Gebelik) ve M1 (0-2 Yaş) Ürün Çekirdeği</h2>
          <p class="text-xs text-white/80 leading-relaxed">
            KOSGEB ve TÜBİTAK mevzuatı uyarınca; <strong>projenin varlık sebebi ve can suyu bu iki unsurdur.</strong> M2-M7 çocukluk modülleri, fiziksel ev robotu donanımı ve global ihracat hedeflerimiz ancak ve ancak BiGG 1812 sermayesinin (1.35M ₺) hesaba geçmesi ve M0/M1 ürün çekirdeğimizin klinik olarak doğrulanıp mağazalarda yer bulmasıyla hayat bulacaktır.
          </p>
        </div>

        <!-- Filter & Control Bar -->
        <div class="flex flex-wrap items-center justify-between gap-3 bg-[#1e1815] p-3 rounded-2xl border border-white/10">
          <div class="flex flex-wrap items-center gap-2 text-xs">
            <button onclick="setTimelineFilter('all')" id="tl-btn-all" class="tl-filter-btn px-3 py-1.5 rounded-xl bg-white/10 text-white font-medium">Tüm Adımlar</button>
            <button onclick="setTimelineFilter('priority')" id="tl-btn-priority" class="tl-filter-btn px-3 py-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-medium flex items-center gap-1.5">
              <span class="text-amber-400">🔥</span> #1 Öncelikliler (BiGG & M0/M1)
            </button>
            <button onclick="setTimelineFilter('pending')" id="tl-btn-pending" class="tl-filter-btn px-3 py-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-medium">Bekleyenler</button>
            <button onclick="setTimelineFilter('done')" id="tl-btn-done" class="tl-filter-btn px-3 py-1.5 rounded-xl text-white/60 hover:text-white hover:bg-white/5 font-medium">Tamamlananlar</button>
          </div>
          <div class="flex items-center gap-2">
            <span id="timelineStatsText" class="text-xs font-mono text-emerald-400 font-semibold"></span>
            <button onclick="addNewGlobalTask()" class="px-3 py-1.5 rounded-xl bg-[#c59b6d] hover:bg-[#d8ab7c] text-black font-semibold text-xs transition">
              + Yeni Taahhüt Ekle
            </button>
          </div>
        </div>

        <!-- Master Chronological Task Container -->
        <div id="timelineContainer" class="space-y-6"></div>

      </section>

      <!-- VIEW 2: 24-MONTH GRANT & GANTT ROADMAP -->
      <section id="view-gantt" class="view-panel hidden space-y-6">
        <div class="p-6 rounded-2xl bg-[#1e1815] border border-white/10 space-y-6">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs">CFO STRATEJİSİ</span>
                <h3 class="text-sm font-bold text-white">Zincirleme Fonlama & Nakit Kalkanı (Cascading Runway)</h3>
              </div>
              <p class="text-xs text-white/50 mt-1">Ölüm Vadisi ve Nakit Uçurumunu (Funding Cliff) önleyen 3 aşamalı kesintisiz fon zinciri</p>
            </div>
            <div class="text-right">
              <span class="text-xs px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold">Toplam Fon Gücü: 5.4 Milyon ₺+</span>
              <p class="text-[10px] text-white/40 mt-1">Geri Ödemesiz Hibe + Sermaye + Faizsiz KOSGEB</p>
            </div>
          </div>

          <div class="space-y-4 text-xs">
            <!-- 1. Aşama -->
            <div class="p-4 rounded-xl bg-[#120f0e] border border-emerald-500/30 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-emerald-400 text-xs">🟢 1. AŞAMA: ŞU AN (Şirket Yokken / Sıfır Maliyet & Ön Hazırlık)</span>
                <span class="font-mono text-emerald-400 font-bold">Kasım 2026 – Nisan 2027</span>
              </div>
              <p class="text-[11px] text-white/60">Cebimizden 1 TL çıkmadan alınabilecek tüm kaynakları toplama ve BiGG onayını bekleme dönemi:</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5">
                  <p class="font-semibold text-white">1. TÜBİTAK 1812 BİGG (#137 / DEPARK):</p>
                  <p class="text-white/60 text-[11px]">1.350.000 ₺ Sermaye Desteği. Şirketin ana can suyu.</p>
                </div>
                <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5">
                  <p class="font-semibold text-emerald-300">2. KOSGEB LMS Sertifikaları:</p>
                  <p class="text-white/60 text-[11px]">Geleneksel (21.10) ve İleri Girişimci (23.10) ALINDI! ✅ 1.685.000 ₺ hak cepte.</p>
                </div>
                <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5">
                  <p class="font-semibold text-white">3. Microsoft Founders Hub (Aralık 2026):</p>
                  <p class="text-white/60 text-[11px]">25.000 $ OpenAI & Azure bulut kredisi. İlk yıl sunucu faturası 0 ₺.</p>
                </div>
                <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5">
                  <p class="font-semibold text-white">4. Kuveyt Türk Lonca & Arya Women:</p>
                  <p class="text-white/60 text-[11px]">150.000 – 250.000 ₺ hissesiz nakit yarışma ödülleri (şirketsiz alınabilir).</p>
                </div>
              </div>
            </div>

            <!-- 2. Aşama -->
            <div class="p-4 rounded-xl bg-[#120f0e] border border-sky-500/30 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-sky-400 text-xs">🔵 2. AŞAMA: ŞİRKET KURULDUĞU AN (Çift Fon Girişi ile Kasada 3 Milyon ₺)</span>
                <span class="font-mono text-sky-400 font-bold">Mayıs – Haziran 2027</span>
              </div>
              <p class="text-[11px] text-white/60">Tek kaynağa bağımlı kalmadan aynı anda iki devlet kaynağından 3 Milyon ₺ nakit gücü:</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5">
                  <p class="font-semibold text-white">Adım 1: DEPARK Teknopark A.Ş. Kuruluşu:</p>
                  <p class="text-white/60 text-[11px]">%25 Kurumlar Vergisi ve SGK/Gelir Vergisi stopaj muafiyeti (yılda 300K ₺ tasarruf).</p>
                </div>
                <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5">
                  <p class="font-semibold text-white">Adım 2: TÜBİTAK BiGG 1.350.000 ₺:</p>
                  <p class="text-white/60 text-[11px]">Tek seferde A.Ş. hesabına geçer. 1 tam zamanlı yazılımcı ve M0-M1 Ar-Ge'si.</p>
                </div>
                <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5">
                  <p class="font-semibold text-white">Adım 3: KOSGEB Kadın Girişimci Hibesi:</p>
                  <p class="text-white/60 text-[11px]">35.000 ₺ Kuruluş Hibesi (%100 hibe) + Noter/Tescil masraflarını karşılar.</p>
                </div>
                <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5">
                  <p class="font-semibold text-white">Adım 4: KOSGEB 1.650.000 ₺ İş Geliştirme:</p>
                  <p class="text-white/60 text-[11px]">36 ay 0 ₺ geri ödemesiz, 3 yıl sonra faizsiz taksitli fon. Kasadaki Toplam Güç: <strong>3.035.000 ₺</strong></p>
                </div>
              </div>
              <div class="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-amber-300 text-[11px] font-medium">
                ⚡ <strong>Ölüm Vadisi Kuralı:</strong> Aylık şirket harcaması (yazılımcı + operasyon) kesinlikle <strong>100.000 – 120.000 ₺</strong> bandında kilitlenecektir. Sıfır satışla dahi <strong>25–30 ay yaşam süresi (Runway)</strong> garanti!
              </div>
            </div>

            <!-- 3. Aşama -->
            <div class="p-4 rounded-xl bg-[#120f0e] border border-purple-500/30 space-y-2">
              <div class="flex items-center justify-between">
                <span class="font-bold text-purple-400 text-xs">🟣 3. AŞAMA: BİGG BİTMEDEN DEVREYE GİRECEK B PLANLARI</span>
                <span class="font-mono text-purple-400 font-bold">Ocak 2028 ve Sonrası</span>
              </div>
              <p class="text-[11px] text-white/60">BiGG'in 8. ve 9. ayında masaya konarak fon kesintisini ve nakit uçurumunu sıfıra indiren mekanizma:</p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1">
                <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5">
                  <p class="font-semibold text-white">🛡️ B Planı 1: TÜBİTAK 1507</p>
                  <p class="text-purple-300 text-[11px] font-bold">~2.400.000 ₺ (%75 Hibe)</p>
                  <p class="text-white/60 text-[10px] mt-1">BiGG 9. ayında başvuru: ToHum Ev Robotu donanımı & M2-M4 modülleri.</p>
                </div>
                <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5">
                  <p class="font-semibold text-white">🛡️ B Planı 2: B2B Hekim Portali</p>
                  <p class="text-emerald-300 text-[11px] font-bold">45.000 ₺ / Ay Net Nakit</p>
                  <p class="text-white/60 text-[10px] mt-1">30 kadın doğum/çocuk hekimine aylık 1.450 ₺ abonelikle sabit ofis/sunucu masrafı sıfırlanır.</p>
                </div>
                <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5">
                  <p class="font-semibold text-white">🛡️ B Planı 3: Arya & Melek Yatırım</p>
                  <p class="text-[#e5c17b] text-[11px] font-bold">300.000 – 500.000 $ Seed</p>
                  <p class="text-white/60 text-[10px] mt-1">5.000+ aktif anne ve B2B hekim geliri metrikleriyle yüksek değerlemeyle Seri A öncesi tur.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- VIEW: KOSGEB FINANSAL PLAN & BAŞABAŞ -->
      <section id="view-finance" class="view-panel hidden space-y-6">
        
        <!-- Header -->
        <div class="p-6 rounded-2xl bg-[#1e1815] border border-white/10 space-y-3">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold text-xs">KOSGEB BÖLÜM 10 & 16</span>
                <h3 class="text-sm font-bold text-white">1. Yıl Proforma Finansal Tablolar & Başabaş Analizi</h3>
              </div>
              <p class="text-xs text-white/50 mt-1">Standart bilanço dengesi (Aktif = Pasif) ve nakit akış kalkanı</p>
            </div>
            <span class="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-emerald-400 font-bold">Teknokent %0 Vergi Muafiyeti</span>
          </div>
        </div>

        <!-- 3 KPI Cards for Financial Health -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div class="p-4 rounded-xl bg-[#1e1815] border border-white/10">
            <span class="text-white/40 block text-[10px]">1. Yıl Net Satış Hasılatı</span>
            <span class="text-lg font-bold text-white block mt-1">650.000 ₺</span>
            <span class="text-[10px] text-emerald-400">Brüt Kâr Marjı: %87,7</span>
          </div>
          <div class="p-4 rounded-xl bg-[#1e1815] border border-white/10">
            <span class="text-white/40 block text-[10px]">Hibe Destek Gelirleri</span>
            <span class="text-lg font-bold text-[#e5c17b] block mt-1">+1.050.000 ₺</span>
            <span class="text-[10px] text-white/40">BiGG & KOSGEB Mahsubu</span>
          </div>
          <div class="p-4 rounded-xl bg-[#1e1815] border border-white/10">
            <span class="text-white/40 block text-[10px]">1. Yıl Sonu Net Kâr</span>
            <span class="text-lg font-bold text-emerald-400 block mt-1">+510.000 ₺</span>
            <span class="text-[10px] text-white/40">Bilanço Özkaynaklara Devir</span>
          </div>
        </div>

        <!-- Proforma Gelir Tablosu & Bilanço Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 text-xs">
          
          <!-- Gelir Tablosu -->
          <div class="p-5 rounded-2xl bg-[#1e1815] border border-white/10 space-y-3">
            <div class="flex items-center justify-between border-b border-white/10 pb-2">
              <span class="font-bold text-white text-xs">Proforma Gelir Tablosu (12 Ay / TL)</span>
              <span class="font-mono text-[10px] text-white/40">KOSGEB Ek Tablo 3</span>
            </div>
            <div class="space-y-1.5 text-[11px]">
              <div class="flex justify-between py-1 border-b border-white/5"><span class="text-white/80 font-semibold">A. Brüt Satışlar (B2C + B2B + Affiliate)</span><span class="font-mono text-white">666.000 ₺</span></div>
              <div class="flex justify-between py-1 border-b border-white/5 text-red-400/80"><span>B. Satış İndirimleri ve İadeler (-)</span><span class="font-mono">-16.000 ₺</span></div>
              <div class="flex justify-between py-1 border-b border-white/5 font-semibold"><span class="text-white">C. Net Satışlar</span><span class="font-mono text-emerald-400">650.000 ₺</span></div>
              <div class="flex justify-between py-1 border-b border-white/5 text-red-400/80"><span>D. Satışların Maliyeti (Apple/Google %15 + SMS)</span><span class="font-mono">-80.000 ₺</span></div>
              <div class="flex justify-between py-1.5 bg-white/[0.02] px-2 rounded font-bold"><span class="text-emerald-300">BRÜT SATIŞ KÂRI (%87,7 Marj)</span><span class="font-mono text-emerald-300">570.000 ₺</span></div>
              <div class="flex justify-between py-1 border-b border-white/5 text-red-400/80"><span>E. Faaliyet Giderleri (Ar-Ge Yazılımcı + Pazarlama + Ofis)</span><span class="font-mono">-1.110.000 ₺</span></div>
              <div class="flex justify-between py-1 border-b border-white/5"><span>Faaliyet Sonucu (EBIT)</span><span class="font-mono text-amber-400">-540.000 ₺</span></div>
              <div class="flex justify-between py-1 border-b border-white/5 text-emerald-400 font-semibold"><span>F. Hibe Gelirleri Mahsubu (TÜBİTAK/KOSGEB)</span><span class="font-mono">+1.050.000 ₺</span></div>
              <div class="flex justify-between py-2 bg-emerald-500/10 px-2 rounded font-bold border border-emerald-500/20"><span class="text-emerald-400">DÖNEM NET KÂRI</span><span class="font-mono text-emerald-400">+510.000 ₺</span></div>
            </div>
          </div>

          <!-- Bilanço -->
          <div class="p-5 rounded-2xl bg-[#1e1815] border border-white/10 space-y-3">
            <div class="flex items-center justify-between border-b border-white/10 pb-2">
              <span class="font-bold text-white text-xs">Proforma Bilanço (31.12.2027 / TL)</span>
              <span class="font-mono text-[10px] text-emerald-400">Aktif = Pasif Dengesi</span>
            </div>
            <div class="space-y-3 text-[11px]">
              <div>
                <p class="font-bold text-[#c59b6d] mb-1">AKTİF (VARLIKLAR)</p>
                <div class="flex justify-between py-0.5 text-white/70"><span>• Dönen Varlıklar (Kasa/Banka + Alacaklar)</span><span class="font-mono">910.000 ₺</span></div>
                <div class="flex justify-between py-0.5 text-white/70"><span>• Duran Varlıklar (Ar-Ge Donanımı + Aktif Yazılım)</span><span class="font-mono">650.000 ₺</span></div>
                <div class="flex justify-between py-1 border-t border-white/10 font-bold text-white"><span>AKTİF TOPLAMI</span><span class="font-mono text-emerald-400">1.560.000 ₺</span></div>
              </div>

              <div class="pt-2 border-t border-white/10">
                <p class="font-bold text-sky-400 mb-1">PASİF (KAYNAKLAR)</p>
                <div class="flex justify-between py-0.5 text-white/70"><span>• Kısa Vadeli Yabancı Kaynaklar (Ticari Borçlar)</span><span class="font-mono">60.000 ₺</span></div>
                <div class="flex justify-between py-0.5 text-white/70"><span>• Uzun Vadeli Yabancı Kaynaklar (Kredi Borcu)</span><span class="font-mono">0 ₺</span></div>
                <div class="flex justify-between py-0.5 text-white/70"><span>• Özkaynaklar (Sermaye 50K + BiGG Fonu 940K + Kâr 510K)</span><span class="font-mono">1.500.000 ₺</span></div>
                <div class="flex justify-between py-1 border-t border-white/10 font-bold text-white"><span>PASİF TOPLAMI</span><span class="font-mono text-emerald-400">1.560.000 ₺</span></div>
              </div>
            </div>
          </div>

        </div>

        <!-- Başabaş Noktası & Katkı Payı Kartı -->
        <div class="p-6 rounded-2xl bg-[#1e1815] border border-white/10 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-xs font-bold uppercase tracking-wider text-amber-400">Başabaş Noktası (Break-Even) Analizi [b / (f - a)]</h4>
              <p class="text-[11px] text-white/50">Aylık Sabit Maliyet: 110.000 ₺ · Hibrit Gelir Modeli Başabaş Eşiği</p>
            </div>
            <span class="text-xs px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 font-mono font-bold">Eşik: 30 Hekim + 400 Aile</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            <div class="p-3 rounded-xl bg-[#120f0e] border border-white/10">
              <span class="text-white/40 block text-[10px]">B2C Aile Katkı Marjı</span>
              <p class="font-bold text-white text-sm mt-1">169 ₺ / Abone</p>
              <p class="text-[10px] text-white/40 mt-1">199 ₺ Fiyat - 30 ₺ Komisyon (%84,9 Katkı Marjı)</p>
            </div>
            <div class="p-3 rounded-xl bg-[#120f0e] border border-white/10">
              <span class="text-white/40 block text-[10px]">B2B Hekim Katkı Marjı</span>
              <p class="font-bold text-white text-sm mt-1">1.400 ₺ / Hekim</p>
              <p class="text-[10px] text-white/40 mt-1">1.450 ₺ Fiyat - 50 ₺ Gider (%96,5 Katkı Marjı)</p>
            </div>
            <div class="p-3 rounded-xl bg-[#120f0e] border border-white/10">
              <span class="text-white/40 block text-[10px]">Başabaş Güvencesi</span>
              <p class="font-bold text-emerald-400 text-sm mt-1">110.107 ₺ Katkı</p>
              <p class="text-[10px] text-white/40 mt-1">30 Hekim (42K ₺) + 403 Aile (68.1K ₺) ile sıfır risk!</p>
            </div>
          </div>
        </div>

        <!-- 30 Saniyelik Asansör Cümlesi Kartı -->
        <div class="p-6 rounded-2xl bg-gradient-to-r from-amber-950/20 to-stone-900 border border-[#c59b6d]/30 space-y-3">
          <div class="flex items-center justify-between">
            <span class="text-xs font-bold uppercase tracking-wider text-[#e5c17b]">🎙️ 30 Saniyelik Resmi Asansör Cümlesi (Elevator Pitch)</span>
            <span class="text-[10px] font-mono text-white/40">Bölüm 9 · sf. 187</span>
          </div>
          <p class="text-xs text-white/90 italic leading-relaxed bg-[#120f0e]/80 p-3.5 rounded-xl border border-white/5">
            "Türkiye'de her yıl 1,1 milyon bebek doğuyor ancak piyasadaki tüm gebelik uygulamaları babayı dışarıda bırakan, herkese sabit tansiyon eşikleri sunarak panik yaratan ve doğum günü silinen tekil araçlar. Biz ToHUM ile; veri bilimi modellerimizi kullanarak annenin kişisel bazal değerlerini sakinleştirici bir dille yorumlayan, babaya anneye hissettirmeden proaktif görevler atayan ve doğumdan sonra 0-2 yaş bakımına dönüşerek silinmeyen yapay zekâ destekli bütüncül bir yaşam ekosistemi kurduk. Halihazırda 4.300 satırlık çalışan prototipimizle DEPARK BİGGSİNERJİ programındayız ve 1.35 Milyon TL TÜBİTAK sermayesiyle pazara çıkıyoruz."
          </p>
        </div>

      </section>

      <!-- VIEW 3: ROLES & ADVISORY MATRIX -->
      <section id="view-roles" class="view-panel hidden space-y-6">
        <div class="p-6 rounded-2xl bg-[#1e1815] border border-white/10 space-y-6">
          <div>
            <h3 class="text-sm font-bold text-white">ToHUM Kurumsal Rol ve Uzmanlık Mimarisi</h3>
            <p class="text-xs text-white/50">KOSGEB Bölüm 14 kurumsallaşma ilkeleri gereğince unvan ve yetki ayrılığı</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <!-- 1. Halka -->
            <div class="p-4 rounded-xl bg-[#120f0e] border border-white/10 space-y-2">
              <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold text-[10px]">1. ÇEKİRDEK İCRA EKİBİ</span>
              <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5 space-y-1">
                <p class="font-bold text-white">Genel Müdür (CEO)</p>
                <p class="text-white/60 text-[11px]">Yönetim Kurulu Başkanı · Tek Temsil</p>
                <p class="text-white/40 text-[10px]">Vizyon, strateji, resmi imzalar, KOSGEB & BiGG koordinasyonu.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5 space-y-1">
                <p class="font-bold text-white">Baş Veri Bilimci (AI Lead)</p>
                <p class="text-white/60 text-[11px]">Algoritmik Ar-Ge Lideri</p>
                <p class="text-white/40 text-[10px]">'AI Seed Core', makine öğrenmesi, özellik seçimi ve dengesiz veri modelleri.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5 space-y-1">
                <p class="font-bold text-white">Kıdemli Yazılım Geliştirici</p>
                <p class="text-white/60 text-[11px]">Full-Stack & Mobile Lead (BiGG İstihdam)</p>
                <p class="text-white/40 text-[10px]">React Native, Node.js API, TimescaleDB ve mağaza sürümleri.</p>
              </div>
            </div>

            <!-- 2. Halka -->
            <div class="p-4 rounded-xl bg-[#120f0e] border border-white/10 space-y-2">
              <span class="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold text-[10px]">2. BİLİMSEL DANIŞMA KURULU</span>
              <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5 space-y-1">
                <p class="font-bold text-white">Klinik Danışman (Perinatolog)</p>
                <p class="text-white/60 text-[11px]">Kadın Hastalıkları & Doğum</p>
                <p class="text-white/40 text-[10px]">Gebelik tahlil aralıkları, tansiyon koridoru ve 5-1-1 dalga onayları.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5 space-y-1">
                <p class="font-bold text-white">Pediatri & Gelişim Danışmanı</p>
                <p class="text-white/60 text-[11px]">Çocuk Sağlığı & Psikolojisi</p>
                <p class="text-white/40 text-[10px]">M1-M7 gelişimsel kazanımlar, okulsuz yaşam ve çocuk mahremiyeti.</p>
              </div>
            </div>

            <!-- 3. Halka -->
            <div class="p-4 rounded-xl bg-[#120f0e] border border-white/10 space-y-2">
              <span class="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px]">3. DIŞ HİZMET PARTNERLERİ</span>
              <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5 space-y-1">
                <p class="font-bold text-white">Mali Müşavir (SMMM)</p>
                <p class="text-white/60 text-[11px]">Teknokent & Ar-Ge Uzmanı</p>
                <p class="text-white/40 text-[10px]">A.Ş. tescili, KOSGEB hibe fatura tevsiki ve Ar-Ge vergi muafiyeti.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5 space-y-1">
                <p class="font-bold text-white">Patent & Marka Vekili</p>
                <p class="text-white/60 text-[11px]">TÜRKPATENT Tescil</p>
                <p class="text-white/40 text-[10px]">ToHUM marka tescili (9, 44, 45) ve 5846 telif kalkanı.</p>
              </div>
              <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5 space-y-1">
                <p class="font-bold text-white">Marka ve Büyüme Uzmanı</p>
                <p class="text-white/60 text-[11px]">Growth & ASO Danışmanı</p>
                <p class="text-white/40 text-[10px]">App Store Optimizasyonu, viral 2x büyüme ve B2B hastane paketleri.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- VIEW 4: PROCESS DETAIL VIEW (DYNAMIC) -->
      <section id="view-process-detail" class="view-panel hidden space-y-6">
        
        <!-- Header of Selected Process -->
        <div class="p-6 rounded-2xl bg-[#1e1815] border border-white/10 space-y-4">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="flex items-center gap-3">
              <span id="procDetailBadge" class="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold border border-emerald-500/20">
                PR-YZM-01
              </span>
              <h3 id="procDetailTitle" class="text-base font-bold text-white">Yapay Zekâ Model Mimarisi Süreci</h3>
            </div>
            <span id="procDetailProgress" class="text-xs font-mono px-3 py-1 rounded-full bg-white/5 text-white/70">
              0 / 0 Tamamlandı (%0)
            </span>
          </div>

          <p id="procDetailDesc" class="text-xs text-white/70 leading-relaxed"></p>

          <!-- Status & Responsible Row -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
            <div class="p-3 rounded-xl bg-[#120f0e] border border-white/10">
              <span class="text-white/40 block text-[10px]">Süreç Sorumlusu</span>
              <span id="procDetailLead" class="font-semibold text-white"></span>
            </div>
            <div class="p-3 rounded-xl bg-[#120f0e] border border-white/10">
              <span class="text-white/40 block text-[10px]">Mevcut Aşama / Neredeyiz?</span>
              <span id="procDetailStage" class="font-semibold text-amber-400"></span>
            </div>
            <div class="p-3 rounded-xl bg-[#120f0e] border border-white/10">
              <span class="text-white/40 block text-[10px]">İlişkili Prosedür Kodu</span>
              <span id="procDetailCode" class="font-mono font-semibold text-sky-400"></span>
            </div>
          </div>

          <!-- Dependencies (Süreç Bağlantıları) -->
          <div class="p-4 rounded-xl bg-[#120f0e] border border-white/10 space-y-2">
            <span class="text-xs font-bold uppercase tracking-wider text-white/50 block">🔗 Süreç Bağlantıları (Girdiler & Çıktılar)</span>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5">
                <span class="text-emerald-400 font-semibold block mb-1">⬅️ Besleyen / Girdi Alınan Süreçler:</span>
                <p id="procDetailInputs" class="text-white/70 text-[11px]"></p>
              </div>
              <div class="p-2.5 rounded-lg bg-[#1e1815] border border-white/5">
                <span class="text-sky-400 font-semibold block mb-1">➡️ Çıktı Sağlanan / Beslenen Süreçler:</span>
                <p id="procDetailOutputs" class="text-white/70 text-[11px]"></p>
              </div>
            </div>
          </div>
        </div>

        <!-- Baştan Aşağı Yapılacaklar (Checklist) -->
        <div class="p-6 rounded-2xl bg-[#1e1815] border border-white/10 space-y-4">
          <div class="flex items-center justify-between">
            <div>
              <h4 class="text-sm font-bold text-white">Baştan Aşağı İş Listesi & Taahhütler</h4>
              <p class="text-xs text-white/50">İşaretlediğiniz adımlar tarih takip sayfasıyla anlık eşzamanlanır</p>
            </div>
            <button onclick="addNewCustomStep()" class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-medium text-white transition">
              + Yeni Adım Ekle
            </button>
          </div>

          <div id="procChecklist" class="space-y-2"></div>
        </div>

      </section>

    </div>
  </main>

  <script>
    // 19 Kurumsal Süreç Metadata Kataloğu
    const PROCESS_META = {
      "STR": { id: "STR", name: "Stratejik Planlama Süreci", category: "A", icon: "🧭", code: "PR-STR-01", lead: "Genel Müdür (CEO)", stage: "Faz 0: BİGGSİNERJİ Doğrulama", desc: "Şirketin 24 aylık master stratejisi, hibe bütçeleri, çeyreklik KPI ve OKR hedefleri ile kurucu ortaklık prensiplerinin yürütülmesi.", inputs: "Pazar analizleri, DEPARK ve TÜBİTAK çağrı takvimleri.", outputs: "YAZ (Yazılım), FIN (Finans), BUY (Büyüme) süreçlerine yol haritası." },
      "EYS": { id: "EYS", name: "Entegre Yönetim Sistemleri", category: "A", icon: "📋", code: "PR-EYS-01", lead: "Kalite ve Bilgi Güvenliği Uzmanı", stage: "SOP ve Doküman Tasarımı", desc: "ISO 9001 kalite yönetim sistemi, ISO 27001 bilgi güvenliği standartları ve süreç dokümantasyonu denetimi.", inputs: "Tüm 19 sürecin prosedür ve talimat taslakları.", outputs: "Şirket içi kalite el kitabı ve tetkik onay belgeleri." },
      "ARG": { id: "ARG", name: "Ar-Ge ve İnovasyon Süreci", category: "A", icon: "💡", code: "PR-ARG-01", lead: "Baş Veri Bilimci & Genel Müdür", stage: "TRL-4 Doğrulama", desc: "Akademik tez bulgularının (özellik seçimi ve dengesiz veri) ticarileştirilmesi, Ar-Ge fikir havuzu ve yeni modül inovasyonları.", inputs: "Akademik literatür, klinik veri setleri, kullanıcı geri bildirimleri.", outputs: "YZM (AI Model Mimarisi) ve URN (Ürün Yönetimi) süreçleri." },
      "MRK": { id: "MRK", name: "Marka ve İletişim Süreci", category: "A", icon: "🏷️", code: "PR-MRK-01", lead: "Marka Uzmanı & Patent Vekili", stage: "Marka Tescil Öncesi", desc: "'To Hum. To Seed. Bee to Hum' felsefesinin kurumsal marka standartlarına dönüştürülmesi ve TÜRKPATENT koruması.", inputs: "Proje felsefesi, logo eskizleri, renk kodları.", outputs: "BUY (Satış & Büyüme) ve URN (Ürün Yönetimi) arayüzleri." },
      "YZM": { id: "YZM", name: "Yapay Zekâ Model Mimarisi", category: "B", icon: "🧠", code: "PR-YZM-01", lead: "Baş Veri Bilimci", stage: "Model Doğrulama (AI Seed Core)", desc: "Dengesiz veri sınıflandırma modelleri, özellik seçimi algoritmaları, 8.3 Hz & 60 BPM frekans sentezi ve MLOps mimarisi.", inputs: "Kişisel bazal tansiyon/tahlil verileri, semptom skorları.", outputs: "YAZ (Yazılım Yaşam Döngüsü) ve KLN (Klinik Doğrulama)." },
      "YAZ": { id: "YAZ", name: "Yazılım Geliştirme (SDLC)", category: "B", icon: "💻", code: "PR-YAZ-01", lead: "Kıdemli Yazılım Geliştirici", stage: "İnteraktif Prototip (v21)", desc: "React Native çapraz platform mobil uygulama, Node.js API, PostgreSQL/TimescaleDB veri mimarisi ve 2 haftalık Agile sprintleri.", inputs: "YZM algoritmaları, UI/UX ekran tasarımları, KLN onayları.", outputs: "BLT (Depo & Dağıtım) ve SIS (Sistem İzleme)." },
      "URN": { id: "URN", name: "Yaşam Döngüsü Ürün Mimarisi", category: "B", icon: "🌱", code: "PR-URN-01", lead: "Baş Veri Bilimci & Pediatrist", stage: "M0 Tamamlandı / M1 Tasarımı", desc: "Çocuğun gebelikten (M0) yetişkinliğe (M7) kadar silinmeyen dijital hafıza ve gelişim evreleri yol haritası.", inputs: "Gelişim psikolojisi kriterleri, ebeveyn ihtiyaçları.", outputs: "YAZ (Yazılım) iş paketleri." },
      "KLN": { id: "KLN", name: "Klinik Doğrulama & QA", category: "B", icon: "🩺", code: "PR-KLN-01", lead: "Klinik Danışman & Kalite Sorumlusu", stage: "Danışma Kurulu Protokolü", desc: "Algoritmaların tıbbi doğruluğu, panik yaratmayan sakinleştirici dil filtresi ve hekim onaylı klinik referans testleri.", inputs: "YZM karar eşikleri, haftalık tahlil rehberleri.", outputs: "YAZ (Yazılım) ve EYS (Kalite Sistemi)." },
      "BLT": { id: "BLT", name: "Bulut Depo & Mağaza Dağıtımı", category: "B", icon: "☁️", code: "PR-BLT-01", lead: "Kıdemli Yazılım Geliştirici", stage: "Lokal Sunucu (serve.py)", desc: "TimescaleDB bulut ambarı, App Store & Google Play Store release yönetimi, versiyonlama ve CI/CD pipeline.", inputs: "Testleri tamamlanmış stabil yazılım derlemeleri.", outputs: "Müşterilere canlı erişim." },
      "SIS": { id: "SIS", name: "Sistem İzleme & Süreklilik", category: "B", icon: "⚡", code: "PR-SIS-01", lead: "Kıdemli Yazılım Geliştirici", stage: "Planlama", desc: "7/24 kesintisiz çalışma (99.9% Uptime), Sentry hata yakalama, API yanıt süresi izleme (<200ms) ve felaket kurtarma.", inputs: "Canlı sunucu metrikleri ve hata logları.", outputs: "Sistem güvenilirliği ve kullanıcı memnuniyeti." },
      "FIN": { id: "FIN", name: "Finans & Teşvik Yönetimi", category: "C", icon: "💰", code: "PR-FIN-01", lead: "Mali Müşavir (SMMM) & Genel Müdür", stage: "Bütçe ve Teşvik Hazırlığı", desc: "1.350.000 ₺ BiGG fonu harcama planı, KOSGEB İleri Girişimci (300K ₺) tevsiki ve sıfır nakit yakma (zero-burn) bütçesi.", inputs: "Şirketleşme kararları, harcama faturaları, KOSGEB mevzuatı.", outputs: "STR (Strateji) ve TED (Satın Alma)." },
      "TED": { id: "TED", name: "Tedarik & Satın Alma Süreci", category: "C", icon: "🛒", code: "PR-TED-01", lead: "Genel Müdür & Mali Müşavir", stage: "Ücretsiz Altyapı Aşaması", desc: "Bulut sunucu (Supabase/AWS), harici API lisansları ve cihaz alımlarında KOSGEB 3 teklifli satın alma kuralı.", inputs: "Geliştirici ihtiyaç listesi, bütçe kısıtları.", outputs: "FIN (Finans) ve YAZ (Yazılım)." },
      "BUY": { id: "BUY", name: "Büyüme & Satış Süreci (Growth)", category: "C", icon: "📈", code: "PR-BUY-01", lead: "Marka ve Büyüme Uzmanı", stage: "B2C Büyüme Modeli Hazır", desc: "Anne-baba çift oturumlu 2x viral davet döngüsü, App Store Search Ads, Özel Hastane doğum paketi B2B lisanslaması.", inputs: "Kullanıcı yolculukları, pazar büyüklüğü (TAM/SAM/SOM).", outputs: "Şirket gelirleri ve LTV maksimizasyonu." },
      "INK": { id: "INK", name: "İnsan ve Kurum Kültürü", category: "C", icon: "👥", code: "PR-INK-01", lead: "Genel Müdür (CEO)", stage: "İş Şartnameleri Taslağı", desc: "KOSGEB Bölüm 14 gereğince iş analizi, iş şartnameleri, çekirdek ekip ve danışma kurulu yetkinlik yönetimi.", inputs: "İş paketleri ve teknik gereksinimler.", outputs: "Şirket içi rol netliği ve çalışma kültürü." },
      "BTG": { id: "BTG", name: "Bilgi Teknolojileri & Güvenlik", category: "C", icon: "🔒", code: "PR-BTG-01", lead: "Kıdemli Yazılım Geliştirici", stage: "Güvenlik Mimarisi", desc: "KVKK ve GDPR uyumlu ebeveyn sağlık verisi şifrelemesi, 2FA kimlik doğrulama ve API güvenlik duvarı.", inputs: "Sağlık Bakanlığı regülasyonları, KVKK ilkeleri.", outputs: "Kullanıcı güveni ve yasal uyum." },
      "OTM": { id: "OTM", name: "Otomasyon & Dijitalleşme", category: "C", icon: "⚙️", code: "PR-OTM-01", lead: "Baş Veri Bilimci & Yazılımcı", stage: "İç Süreç Entegrasyonu", desc: "Şirket içi operasyonların, görev takibinin ve raporlamaların yazılımsal botlar ve komuta panelleriyle otomatikleştirilmesi.", inputs: "Tüm süreçlerin takip ihtiyaçları.", outputs: "Zaman tasarrufu ve sıfır hata." },
      "IHR": { id: "IHR", name: "Dijital İhracat & Global", category: "C", icon: "🌍", code: "PR-IHR-01", lead: "Genel Müdür & Marka Uzmanı", stage: "Pazar Araştırması", desc: "ToHUM platformunun MENA ve Avrupa pazarlarına çok dilli yerelleştirilmesi (Localization) ve sınır ötesi dijital hizmet satışı.", inputs: "Küresel FemTech ve ebeveynlik pazarı verileri.", outputs: "Döviz geliri ve uluslararası büyüme." },
      "YSL": { id: "YSL", name: "Yeşil Bilişim (Green AI)", category: "C", icon: "🍃", code: "PR-YSL-01", lead: "Baş Veri Bilimci", stage: "Konsept Mimarisi", desc: "10W altı düşük güç tüketimli 'Green Edge AI' donanım mimarisi ve az kullanılan bebek eşyalarının 'Kovan' Sıfır Atık döngüsü.", inputs: "Sürdürülebilirlik ilkeleri ve enerji optimizasyonu.", outputs: "Düşük karbon ayak izi ve döngüsel ekonomi." },
      "ISG": { id: "ISG", name: "Çalışma Güvenliği & İSG", category: "C", icon: "🦺", code: "PR-ISG-01", lead: "Genel Müdür (CEO)", stage: "Mevzuat Analizi", desc: "6331 sayılı İş Sağlığı ve Güvenliği Kanunu kapsamında az tehlikeli yazılım ofisi ve ergonomi kurallarının uygulanması.", inputs: "İSG mevzuatı ve ofis ergonomisi standartları.", outputs: "Yasal uyum ve sağlıklı çalışma ortamı." }
    };

    // MASTER UNIFIED TASK REGISTRY (Tarih Bazlı & İki Yönlü Eşzamanlama)
    const DEFAULT_MASTER_TASKS = [
      // DÖNEM 1: Kasım 2026 - Ocak 2027 (BiGG Başvuru & M0/M1 Doğrulama)
      { id: "T-01", procId: "STR", period: "1. DÖNEM: Kasım 2026 – Ocak 2027 (BiGG Başvuru & M0/M1 Doğrulama)", text: "DEPARK 137 No'lu başvuru iş planı dokümanının (AGY112) tamamlanması", isPriority: true, priorityLabel: "BiGG İş Planı", done: true },
      { id: "T-02", procId: "FIN", period: "1. DÖNEM: Kasım 2026 – Ocak 2027 (BiGG Başvuru & M0/M1 Doğrulama)", text: "KOSGEB İleri Girişimci Eğitimi tamamlandı ve belgesi alındı (23.10.2026)", isPriority: true, priorityLabel: "Mevzuat", done: true },
      { id: "T-03", procId: "YZM", period: "1. DÖNEM: Kasım 2026 – Ocak 2027 (BiGG Başvuru & M0/M1 Doğrulama)", text: "Kişisel bazal tansiyon koridoru ve semptom takip algoritmalarının Python modelleri (AI Seed Core)", isPriority: true, priorityLabel: "M0 Çekirdek", done: true },
      { id: "T-04", procId: "YAZ", period: "1. DÖNEM: Kasım 2026 – Ocak 2027 (BiGG Başvuru & M0/M1 Doğrulama)", text: "React Native M0 (Çimlenme) çift oturumlu (Anne & Baba) mobil kullanıcı arayüzü ve haptik motoru", isPriority: true, priorityLabel: "M0 Çekirdek", done: true },
      { id: "T-05", procId: "URN", period: "1. DÖNEM: Kasım 2026 – Ocak 2027 (BiGG Başvuru & M0/M1 Doğrulama)", text: "Doğum gerçekleştiğinde tek tıkla M1 (0-2 Yaş) modülüne kesintisiz geçiş mimarisi", isPriority: true, priorityLabel: "M1 Çekirdek", done: true },
      { id: "T-06", procId: "TED", period: "1. DÖNEM: Kasım 2026 – Ocak 2027 (BiGG Başvuru & M0/M1 Doğrulama)", text: "Microsoft Founders Hub başvurusu ile 25.000 $ bulut ve OpenAI kredisinin onaylanması (Aralık 2026)", isPriority: false, done: false },
      { id: "T-07", procId: "FIN", period: "1. DÖNEM: Kasım 2026 – Ocak 2027 (BiGG Başvuru & M0/M1 Doğrulama)", text: "KOSGEB Bölüm 10 formatında 1. Yıl Proforma Gelir Tablosu ve Bilanço dengesinin çıkarılması", isPriority: false, done: true },
      { id: "T-08", procId: "STR", period: "1. DÖNEM: Kasım 2026 – Ocak 2027 (BiGG Başvuru & M0/M1 Doğrulama)", text: "30 Saniyelik resmi Asansör Cümlesi (Elevator Pitch) kartının jüri provasına hazırlanması", isPriority: true, priorityLabel: "BiGG İş Planı", done: true },
      { id: "T-09", procId: "MRK", period: "1. DÖNEM: Kasım 2026 – Ocak 2027 (BiGG Başvuru & M0/M1 Doğrulama)", text: "TÜRKPATENT nezdinde 'ToHUM' marka tescil ön araştırması (09, 44 ve 45. sınıflar)", isPriority: false, done: false },

      // DÖNEM 2: Şubat – Nisan 2027 (Jüri Sunumu, Panel & Mühür Onayı)
      { id: "T-10", procId: "STR", period: "2. DÖNEM: Şubat – Nisan 2027 (DEPARK Jüri Sunumu & Mühür Onayı)", text: "DEPARK 137 Jüri sunum provasının konuşma metni rehberiyle sesli olarak simüle edilmesi", isPriority: true, priorityLabel: "BiGG İş Planı", done: false },
      { id: "T-11", procId: "KLN", period: "2. DÖNEM: Şubat – Nisan 2027 (DEPARK Jüri Sunumu & Mühür Onayı)", text: "DEÜ Tıp Perinatoloji ve Pediatri uzmanlarıyla Klinik Danışma Protokolünün (FR-KLN-01) imzalanması", isPriority: true, priorityLabel: "M0/M1 Klinik", done: false },
      { id: "T-12", procId: "BUY", period: "2. DÖNEM: Şubat – Nisan 2027 (DEPARK Jüri Sunumu & Mühür Onayı)", text: "50 hamile birey ve yeni anneyle saha kullanıcı görüşmelerinin ve anketlerinin tamamlanması", isPriority: true, priorityLabel: "M0/M1 Saha", done: false },
      { id: "T-13", procId: "FIN", period: "2. DÖNEM: Şubat – Nisan 2027 (DEPARK Jüri Sunumu & Mühür Onayı)", text: "Kuveyt Türk Lonca & Arya Women hissesiz yarışma başvurularının yapılması", isPriority: false, done: false },
      { id: "T-14", procId: "STR", period: "2. DÖNEM: Şubat – Nisan 2027 (DEPARK Jüri Sunumu & Mühür Onayı)", text: "TÜBİTAK 1812 2. Aşama Panel Değerlendirmesi & Mükemmeliyet Mührü onayı alınması", isPriority: true, priorityLabel: "BiGG İş Planı", done: false },

      // DÖNEM 3: Mayıs – Haziran 2027 (A.Ş. Kuruluşu & 3 Milyon ₺ Çift Fon Girişi)
      { id: "T-15", procId: "STR", period: "3. DÖNEM: Mayıs – Haziran 2027 (A.Ş. Kuruluşu & Çift Fon Girişi)", text: "Mevcut işten ihbar süresiyle ayrılış & DEPARK Teknopark'ta Tohum Bilişim ve Teknoloji A.Ş. tescili", isPriority: true, priorityLabel: "Şirketleşme", done: false },
      { id: "T-16", procId: "FIN", period: "3. DÖNEM: Mayıs – Haziran 2027 (A.Ş. Kuruluşu & Çift Fon Girişi)", text: "TÜBİTAK BiGG 1.350.000 ₺ sermaye desteğinin A.Ş. banka hesabına geçişi", isPriority: true, priorityLabel: "BiGG Fonu", done: false },
      { id: "T-17", procId: "FIN", period: "3. DÖNEM: Mayıs – Haziran 2027 (A.Ş. Kuruluşu & Çift Fon Girişi)", text: "KOSGEB KBS kaydı & Kadın Girişimci 1.650.000 ₺ İş Geliştirme + 35.000 ₺ Kuruluş Hibesi başvurusu", isPriority: true, priorityLabel: "KOSGEB Fonu", done: false },
      { id: "T-18", procId: "INK", period: "3. DÖNEM: Mayıs – Haziran 2027 (A.Ş. Kuruluşu & Çift Fon Girişi)", text: "BiGG bütçesinden 1 tam zamanlı Kıdemli Full-Stack/Mobil Yazılımcı işe alımı (İş Şartnamesi hazır)", isPriority: true, priorityLabel: "M0/M1 İcra", done: false },
      { id: "T-19", procId: "MRK", period: "3. DÖNEM: Mayıs – Haziran 2027 (A.Ş. Kuruluşu & Çift Fon Girişi)", text: "Kültür Bakanlığı 5846 İsteğe Bağlı Telif Tescili ve TÜRKPATENT resmi marka başvurusu", isPriority: false, done: false },

      // DÖNEM 4: Temmuz – Aralık 2027 (M0/M1 Lansmanı & İlk Gelirler)
      { id: "T-20", procId: "YAZ", period: "4. DÖNEM: Temmuz – Aralık 2027 (M0/M1 Lansmanı & İlk Gelirler)", text: "M0 (Gebelik) ve M1 (0-2 Yaş) App Store & Google Play Store resmi lansmanı (TRL-8/9)", isPriority: true, priorityLabel: "M0/M1 Lansman", done: false },
      { id: "T-21", procId: "BUY", period: "4. DÖNEM: Temmuz – Aralık 2027 (M0/M1 Lansmanı & İlk Gelirler)", text: "B2C Freemium ve 'ToHUM Aile Paketi' (199 ₺/ay) ücretli abone dönüşümlerinin başlatılması", isPriority: true, priorityLabel: "B2C Gelir", done: false },
      { id: "T-22", procId: "BUY", period: "4. DÖNEM: Temmuz – Aralık 2027 (M0/M1 Lansmanı & İlk Gelirler)", text: "İzmir özel hastaneleri için kurumsal B2B Doğum Paketi tekliflerinin sunulması (1.450 ₺/ay)", isPriority: true, priorityLabel: "B2B Gelir", done: false },
      { id: "T-23", procId: "BTG", period: "4. DÖNEM: Temmuz – Aralık 2027 (M0/M1 Lansmanı & İlk Gelirler)", text: "Mobil arayüz ekranları için TÜRKPATENT Endüstriyel Tasarım Tescili (25 yıl koruma)", isPriority: false, done: false },
      { id: "T-24", procId: "FIN", period: "4. DÖNEM: Temmuz – Aralık 2027 (M0/M1 Lansmanı & İlk Gelirler)", text: "Aylık şirket harcama kilidi (100K-120K ₺) denetimi ile 25-30 ay nakit kalkanının korunması", isPriority: true, priorityLabel: "CFO Kalkanı", done: false },

      // DÖNEM 5: 2028 ve Sonrası (TÜBİTAK 1507, Ev Robotu & Global)
      { id: "T-25", procId: "STR", period: "5. DÖNEM: 2028 ve Sonrası (TÜBİTAK 1507, Ev Robotu & Global)", text: "BiGG 9. ayında TÜBİTAK 1507 KOBİ Ar-Ge (2.4M ₺ - Ev Robotu & M2-M4) başvurusu", isPriority: false, done: false },
      { id: "T-26", procId: "URN", period: "5. DÖNEM: 2028 ve Sonrası (TÜBİTAK 1507, Ev Robotu & Global)", text: "M2-M4 (2-9 Yaş) duygu düzenleme, adab-ı muaşeret ve okulsuz yaşam modüllerinin yayına alınması", isPriority: false, done: false },
      { id: "T-27", procId: "YSL", period: "5. DÖNEM: 2028 ve Sonrası (TÜBİTAK 1507, Ev Robotu & Global)", text: "10W altı düşük güçlü 'Green Edge AI' sesli ev asistanı donanım prototipinin tamamlanması", isPriority: false, done: false },
      { id: "T-28", procId: "IHR", period: "5. DÖNEM: 2028 ve Sonrası (TÜBİTAK 1507, Ev Robotu & Global)", text: "MENA ve Avrupa pazarlarına çok dilli (İngilizce/Arapça) dijital hizmet ihracatı başlatılması", isPriority: false, done: false }
    ];

    let masterTasks = [];
    let currentView = 'view-dashboard';
    let currentProcessId = 'STR';
    let timelineFilter = 'all';

    function init() {
      const saved = localStorage.getItem('tohum_master_tasks_v3');
      if (saved) {
        try {
          masterTasks = JSON.parse(saved);
        } catch(e) {
          masterTasks = JSON.parse(JSON.stringify(DEFAULT_MASTER_TASKS));
        }
      } else {
        masterTasks = JSON.parse(JSON.stringify(DEFAULT_MASTER_TASKS));
      }

      renderSidebar();
      renderQuickActions();
      renderTimeline();
      renderProcessDetail(currentProcessId);
      updateGlobalProgress();
    }

    function saveState() {
      localStorage.setItem('tohum_master_tasks_v3', JSON.stringify(masterTasks));
      renderSidebar();
      renderQuickActions();
      renderTimeline();
      renderProcessDetail(currentProcessId);
      updateGlobalProgress();
    }

    function resetAllDefaults() {
      if (confirm('Tüm kurumsal süreçleri ve eylemleri varsayılan ayarlara sıfırlamak istiyor musunuz?')) {
        localStorage.removeItem('tohum_master_tasks_v3');
        masterTasks = JSON.parse(JSON.stringify(DEFAULT_MASTER_TASKS));
        saveState();
      }
    }

    // GLOBAL TWO-WAY SYNCHRONIZED TOGGLE
    function toggleMasterTask(taskId) {
      const t = masterTasks.find(item => item.id === taskId);
      if (t) {
        t.done = !t.done;
        saveState();
      }
    }

    function setTimelineFilter(filterKey) {
      timelineFilter = filterKey;
      document.querySelectorAll('.tl-filter-btn').forEach(b => {
        b.classList.remove('bg-white/10', 'text-white');
        b.classList.add('text-white/60');
      });
      const btn = document.getElementById('tl-btn-' + filterKey);
      if (btn) {
        btn.classList.add('bg-white/10', 'text-white');
        btn.classList.remove('text-white/60');
      }
      renderTimeline();
    }

    function renderTimeline() {
      const container = document.getElementById('timelineContainer');
      if (!container) return;
      container.innerHTML = '';

      let filtered = masterTasks;
      if (timelineFilter === 'priority') {
        filtered = masterTasks.filter(t => t.isPriority);
      } else if (timelineFilter === 'pending') {
        filtered = masterTasks.filter(t => !t.done);
      } else if (timelineFilter === 'done') {
        filtered = masterTasks.filter(t => t.done);
      }

      const totalP = masterTasks.filter(t => t.isPriority).length;
      const doneP = masterTasks.filter(t => t.isPriority && t.done).length;
      const statsEl = document.getElementById('timelineStatsText');
      if (statsEl) {
        statsEl.innerText = `#1 Öncelikli Durum: ${doneP}/${totalP} Tamamlandı`;
      }

      const periods = [
        "1. DÖNEM: Kasım 2026 – Ocak 2027 (BiGG Başvuru & M0/M1 Doğrulama)",
        "2. DÖNEM: Şubat – Nisan 2027 (DEPARK Jüri Sunumu & Mühür Onayı)",
        "3. DÖNEM: Mayıs – Haziran 2027 (A.Ş. Kuruluşu & Çift Fon Girişi)",
        "4. DÖNEM: Temmuz – Aralık 2027 (M0/M1 Lansmanı & İlk Gelirler)",
        "5. DÖNEM: 2028 ve Sonrası (TÜBİTAK 1507, Ev Robotu & Global)"
      ];

      periods.forEach(pName => {
        const pTasks = filtered.filter(t => t.period === pName);
        if (pTasks.length === 0 && timelineFilter !== 'all') return;

        const card = document.createElement('div');
        card.className = 'p-5 rounded-2xl bg-[#1e1815] border border-white/10 space-y-3';

        const isCurrentPeriod = pName.includes('1. DÖNEM');

        card.innerHTML = `
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-white/5 pb-2">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full ${isCurrentPeriod ? 'bg-amber-400 animate-pulse' : 'bg-white/20'}"></span>
              <h4 class="text-xs font-bold text-white uppercase tracking-wider">${pName}</h4>
            </div>
            <span class="text-[10px] font-mono px-2 py-0.5 rounded ${isCurrentPeriod ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-white/40'}">
              ${isCurrentPeriod ? 'Şu Anki Dönem' : 'Planlanan Faz'}
            </span>
          </div>
          <div class="space-y-2 pt-1" id="pTasks_${pName.replace(/[^a-zA-Z0-9]/g, '_')}"></div>
        `;

        container.appendChild(card);
        const listEl = card.querySelector(`#pTasks_${pName.replace(/[^a-zA-Z0-9]/g, '_')}`);

        pTasks.forEach(t => {
          const proc = PROCESS_META[t.procId] || { code: t.procId, icon: "📌", lead: "Sorumlu" };
          const row = document.createElement('div');
          row.className = `p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
            t.done 
              ? 'bg-white/[0.01] border-white/5 opacity-50' 
              : t.isPriority 
                ? 'bg-amber-950/20 border-amber-500/40 hover:border-amber-500/70 shadow-sm' 
                : 'bg-[#120f0e] border-white/5 hover:border-white/20'
          }`;

          row.innerHTML = `
            <label class="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
              <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleMasterTask('${t.id}')" 
                class="w-4 h-4 rounded border-white/20 text-[#c59b6d] focus:ring-0 cursor-pointer bg-white/5">
              <div class="min-w-0">
                <div class="flex items-center gap-2 flex-wrap">
                  <span class="text-xs font-medium ${t.done ? 'line-through text-white/40' : 'text-white'}">
                    ${t.text}
                  </span>
                  ${t.isPriority ? `
                    <span class="text-[9px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30 flex items-center gap-1">
                      <span>🔥</span> #1 ÖNCELİK: ${t.priorityLabel || 'BİGG & M0/M1'}
                    </span>
                  ` : ''}
                </div>
                <div class="text-[10px] text-white/40 flex items-center gap-2 mt-0.5">
                  <span>${proc.icon} <strong>${proc.code}</strong></span>
                  <span>•</span>
                  <span>Sorumlu: ${proc.lead}</span>
                </div>
              </div>
            </label>
            <button onclick="showProcessDetail('${t.procId}')" class="text-xs text-[#c59b6d] hover:underline px-2 py-1 rounded bg-white/5 hover:bg-white/10 whitespace-nowrap">
              Sürece Git →
            </button>
          `;
          listEl.appendChild(row);
        });
      });
    }

    function renderProcessDetail(procId) {
      const proc = PROCESS_META[procId];
      if (!proc) return;

      const procTasks = masterTasks.filter(t => t.procId === procId);
      const doneCount = procTasks.filter(s => s.done).length;
      const totalCount = procTasks.length;
      const pct = totalCount === 0 ? 0 : Math.round((doneCount / totalCount) * 100);

      document.getElementById('currentSectionIcon').innerText = proc.icon;
      document.getElementById('currentSectionTitle').innerText = proc.name;
      document.getElementById('currentSectionSubtitle').innerText = `${proc.code} · ${proc.lead}`;

      document.getElementById('procDetailBadge').innerText = proc.code;
      document.getElementById('procDetailTitle').innerText = proc.name;
      document.getElementById('procDetailDesc').innerText = proc.desc;
      document.getElementById('procDetailLead').innerText = proc.lead;
      document.getElementById('procDetailStage').innerText = proc.stage;
      document.getElementById('procDetailCode').innerText = proc.code;
      document.getElementById('procDetailInputs').innerText = proc.inputs;
      document.getElementById('procDetailOutputs').innerText = proc.outputs;

      document.getElementById('procDetailProgress').innerText = `${doneCount} / ${totalCount} Tamamlandı (%${pct})`;

      const list = document.getElementById('procChecklist');
      list.innerHTML = '';

      if (procTasks.length === 0) {
        list.innerHTML = `<p class="text-xs text-white/40 italic p-4 text-center">Bu süreç için henüz bir adım tanımlanmamış. Yukarıdaki butondan ekleyebilirsiniz.</p>`;
        return;
      }

      procTasks.forEach((t, idx) => {
        const item = document.createElement('div');
        item.className = `p-3 rounded-xl border flex items-center justify-between gap-3 transition ${
          t.done 
            ? 'bg-white/[0.01] border-white/5 opacity-50' 
            : t.isPriority
              ? 'bg-amber-950/20 border-amber-500/30 hover:border-amber-500/60'
              : 'bg-[#120f0e] border-white/5 hover:border-white/20'
        }`;

        item.innerHTML = `
          <label class="flex items-center gap-3 flex-1 min-w-0 cursor-pointer">
            <input type="checkbox" ${t.done ? 'checked' : ''} onchange="toggleMasterTask('${t.id}')" 
              class="w-4 h-4 rounded border-white/20 text-[#c59b6d] focus:ring-0 cursor-pointer bg-white/5">
            <div class="min-w-0">
              <span class="text-xs ${t.done ? 'line-through text-white/40' : 'text-white'}">
                ${t.text}
              </span>
              ${t.isPriority ? `
                <span class="ml-2 text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                  🔥 #1 ÖNCELİK
                </span>
              ` : ''}
              <div class="text-[10px] text-white/30 font-mono mt-0.5">${t.period}</div>
            </div>
          </label>
          <span class="text-[10px] font-mono text-white/30">Adım ${idx + 1}</span>
        `;
        list.appendChild(item);
      });
    }

    function showProcessDetail(procId) {
      currentProcessId = procId;
      navigate('view-process-detail');
      renderProcessDetail(procId);
    }

    function renderSidebar() {
      const listA = document.getElementById('processListA');
      const listB = document.getElementById('processListB');
      const listC = document.getElementById('processListC');

      listA.innerHTML = '';
      listB.innerHTML = '';
      listC.innerHTML = '';

      Object.values(PROCESS_META).forEach(proc => {
        const pTasks = masterTasks.filter(t => t.procId === proc.id);
        const doneCount = pTasks.filter(s => s.done).length;
        const totalCount = pTasks.length;
        const isDoneAll = totalCount > 0 && doneCount === totalCount;

        const btn = document.createElement('button');
        btn.id = `proc-btn-${proc.id}`;
        btn.className = `w-full flex items-center justify-between px-3 py-1.5 text-xs rounded-xl transition text-left ${
          currentProcessId === proc.id && currentView === 'view-process-detail'
            ? 'bg-[#c59b6d]/20 text-[#e5c17b] border border-[#c59b6d]/40 font-semibold'
            : 'text-white/60 hover:text-white hover:bg-white/5'
        }`;
        btn.onclick = () => showProcessDetail(proc.id);

        btn.innerHTML = `
          <div class="flex items-center gap-2 truncate">
            <span class="text-sm">${proc.icon}</span>
            <span class="truncate">${proc.name}</span>
          </div>
          <span class="text-[10px] font-mono px-1.5 py-0.2 rounded ${
            isDoneAll ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/5 text-white/40'
          }">${doneCount}/${totalCount}</span>
        `;

        if (proc.category === 'A') listA.appendChild(btn);
        else if (proc.category === 'B') listB.appendChild(btn);
        else listC.appendChild(btn);
      });
    }

    function renderQuickActions() {
      const container = document.getElementById('quickActionList');
      if (!container) return;
      container.innerHTML = '';

      let items = masterTasks.filter(t => !t.done);
      items.sort((a, b) => (b.isPriority ? 1 : 0) - (a.isPriority ? 1 : 0));

      items.slice(0, 6).forEach(t => {
        const proc = PROCESS_META[t.procId] || { code: t.procId, icon: "📌", lead: "Sorumlu" };
        const div = document.createElement('div');
        div.className = 'p-3 rounded-xl bg-[#120f0e] border border-white/5 flex items-center justify-between gap-3 hover:border-white/10 transition';
        div.innerHTML = `
          <div class="flex items-center gap-3 min-w-0">
            <input type="checkbox" onchange="toggleMasterTask('${t.id}')" class="w-4 h-4 rounded border-white/20 text-[#c59b6d] focus:ring-0 cursor-pointer bg-white/5">
            <div class="min-w-0">
              <div class="flex items-center gap-2">
                <span class="text-xs text-white block truncate">${t.text}</span>
                ${t.isPriority ? '<span class="text-[9px] px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">🔥 #1</span>' : ''}
              </div>
              <span class="text-[10px] text-white/40 font-mono">${proc.code} · ${proc.lead} · ${t.period}</span>
            </div>
          </div>
          <button onclick="showProcessDetail('${t.procId}')" class="text-xs text-[#c59b6d] hover:underline whitespace-nowrap px-2">
            Sürece Git →
          </button>
        `;
        container.appendChild(div);
      });
    }

    function updateGlobalProgress() {
      const total = masterTasks.length;
      const completed = masterTasks.filter(s => s.done).length;
      const pct = total === 0 ? 0 : Math.round((completed / total) * 100);
      const progressEl = document.getElementById('globalProgressText');
      if (progressEl) progressEl.innerText = `%${pct}`;
    }

    function addNewGlobalTask() {
      const text = prompt('Yeni taahhüt/eylem maddesi:');
      if (!text || !text.trim()) return;
      const procKey = prompt('İlişkili süreç kodu (Örn: STR, YZM, YAZ, KLN, FIN, URN):', 'STR');
      const isP = confirm('Bu madde #1 ÖNCELİKLİ (BiGG İş Planı veya M0/M1) mi?');

      masterTasks.push({
        id: "T-" + Date.now(),
        procId: (procKey || 'STR').toUpperCase(),
        period: "1. DÖNEM: Kasım 2026 – Ocak 2027 (BiGG Başvuru & M0/M1 Doğrulama)",
        text: text.trim(),
        isPriority: isP,
        priorityLabel: isP ? 'Öncelikli' : '',
        done: false
      });
      saveState();
    }

    function addNewCustomStep() {
      const text = prompt('Bu süreç için yeni bir yapılacaklar adımı giriniz:');
      if (!text || !text.trim()) return;
      masterTasks.push({
        id: "T-" + Date.now(),
        procId: currentProcessId,
        period: "1. DÖNEM: Kasım 2026 – Ocak 2027 (BiGG Başvuru & M0/M1 Doğrulama)",
        text: text.trim(),
        isPriority: false,
        done: false
      });
      saveState();
    }

    function navigate(viewId) {
      currentView = viewId;
      document.querySelectorAll('.view-panel').forEach(el => el.classList.add('hidden'));
      document.getElementById(viewId).classList.remove('hidden');

      document.querySelectorAll('.nav-item').forEach(btn => {
        btn.classList.remove('bg-white/10', 'text-white', 'border', 'border-white/5');
        btn.classList.add('text-white/70');
      });

      const activeNav = document.getElementById('nav-' + viewId);
      if (activeNav) {
        activeNav.classList.add('bg-white/10', 'text-white', 'border', 'border-white/5');
        activeNav.classList.remove('text-white/70');
      }

      if (viewId === 'view-dashboard') {
        document.getElementById('currentSectionIcon').innerText = '📊';
        document.getElementById('currentSectionTitle').innerText = 'Genel Bakış & Komuta Masası';
        document.getElementById('currentSectionSubtitle').innerText = 'ToHUM Bilişim ve Teknoloji A.Ş. İcra Özeti';
      } else if (viewId === 'view-timeline') {
        document.getElementById('currentSectionIcon').innerText = '🎯';
        document.getElementById('currentSectionTitle').innerText = 'Tarih Bazlı Süreç & Taahhüt Takibi';
        document.getElementById('currentSectionSubtitle').innerText = '#1 Kuzey Yıldızı: BiGG İş Planı (AGY112) Onayı + M0 & M1 Çekirdeği';
        renderTimeline();
      } else if (viewId === 'view-gantt') {
        document.getElementById('currentSectionIcon').innerText = '📅';
        document.getElementById('currentSectionTitle').innerText = '24 Aylık Hibe & Proje Takvimi';
        document.getElementById('currentSectionSubtitle').innerText = 'BiGG (1.35M ₺) + KOSGEB İleri Girişimci (375K ₺) + TÜBİTAK 1507 (2.4M ₺)';
      } else if (viewId === 'view-finance') {
        document.getElementById('currentSectionIcon').innerText = '💰';
        document.getElementById('currentSectionTitle').innerText = 'KOSGEB Standartlarında Finansal Plan';
        document.getElementById('currentSectionSubtitle').innerText = 'Proforma Bilanço, Gelir Tablosu & Başabaş Noktası Analizi';
      } else if (viewId === 'view-roles') {
        document.getElementById('currentSectionIcon').innerText = '👥';
        document.getElementById('currentSectionTitle').innerText = 'Roller & Danışma Kurulu';
        document.getElementById('currentSectionSubtitle').innerText = 'KOSGEB Bölüm 14 Kurumsallaşma İlkeleri Mimarisi';
      }

      renderSidebar();
    }

    // Start
    init();
  </script>
</body>
</html>''')

print("Built full komuta_merkezi.html successfully!")
