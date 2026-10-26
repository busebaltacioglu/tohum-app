
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
  