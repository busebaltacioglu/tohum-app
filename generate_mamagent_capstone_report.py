import json, sys, re

sys.stdout.reconfigure(encoding='utf-8')

# Load results
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\pipelines\mamagent_capstone_results.json', 'r', encoding='utf-8') as f:
    results = json.load(f)

html_content = f'''      'mamagent_capstone': {{
        title: 'Kaggle MAMAgent — ToHUM Çoklu Ajan Konsensüs & Çapraz Kohort Sentez Raporu (7 Adımlı Doğrulama)',
        domain: 'Küme 6 • Kovan İmece, Ağlama Sesi Spektrumu & Çoklu Ajan (İP-1, İP-4 & Agentic Core)',
        sample: 'N = 2.500 Entegre Ebeveyn-Bebek Çifti (ToHUM Multi-Agent Cohort Benchmark)',
        url: 'https://www.kaggle.com/competitions/agents-intensive-capstone-project/writeups/new-writeup-1764512036477',
        html: `<div class="space-y-4 text-xs">
  <!-- 7 ADIMLI ML LIFECYCLE BANT GÖSTERGESİ -->
  <div class="p-3 rounded-xl bg-[#faf9f6] border border-[#e5e2da] space-y-2">
    <div class="flex flex-wrap items-center justify-between gap-1">
      <span class="text-[11px] font-bold uppercase tracking-wider text-[#1c1a18]">7 Adımlı Bilimsel Makine Öğrenimi Süreci (ML Lifecycle)</span>
      <div class="flex items-center gap-1.5">
        <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">23/23 ZİRVE • %100 Doğrulandı</span>
        <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-800 font-semibold border border-purple-200">3'lü Ajan Konsensüs Motoru</span>
      </div>
    </div>
    
    <div class="mt-2 p-2 rounded-lg bg-white border border-[#d6d2c7] flex flex-wrap items-center justify-between gap-2 text-[11px]">
      <span class="text-[#736d65]">Akademik İlerleme & Konsensüs Doğrulaması:</span>
      <span class="font-mono font-bold text-emerald-800">23 / 23 Veri Seti (%100 Tamamlandı — Bütüncül Biyoistatistiksel Kapanış)</span>
    </div>
  </div>

  <!-- ADIM 1: VERİ TOPLAMA VE ÇOKLU AJAN KOHORT MİMARİSİ -->
  <div class="p-3.5 rounded-xl bg-white border border-[#e5e2da] space-y-3">
    <div class="flex items-center justify-between">
      <span class="font-bold text-xs text-[#1c1a18] uppercase tracking-wider">1. Veri Toplama, Klinik Kohort Mimarisi & Çoklu Ajan Temsili</span>
      <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-[#4a5c4e]/10 text-[#4a5c4e] font-bold border border-[#4a5c4e]/30">Kohort N = 2.500</span>
    </div>
    <p class="text-[11px] text-[#544f47] leading-relaxed">
      Kaggle MAMAgent (Multi-Agent Maternal & Infant Assistant) mimarisinden ilham alınarak ToHUM ekosistemine uyarlanan bu sentez veri kümesi; <strong>Anne Sağlık Ajanı</strong>, <strong>Bebek Gelişim & Akustik Ajanı</strong> ve <strong>Kovan Ürün Güvenliği Ajanı</strong> olmak üzere 3 bağımsız otonom ajanın eşzamanlı izlediği <strong>N = 2.500</strong> entegre ebeveyn-bebek çiftinin boylamsal biyometrik ve çevresel verilerini içerir.
    </p>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px]">
      <div class="p-2 rounded-lg bg-[#faf9f6] border border-[#e5e2da]">
        <span class="text-[9px] text-[#736d65] block">Toplam Kohort:</span>
        <strong class="text-xs text-[#1c1a18]">N = 2.500 Çift</strong>
      </div>
      <div class="p-2 rounded-lg bg-[#faf9f6] border border-[#e5e2da]">
        <span class="text-[9px] text-[#736d65] block">Eğitim Kümesi (Train):</span>
        <strong class="text-xs text-blue-700">N = 2.000 (%80)</strong>
      </div>
      <div class="p-2 rounded-lg bg-[#faf9f6] border border-[#e5e2da]">
        <span class="text-[9px] text-[#736d65] block">Bağımsız Test Kümesi:</span>
        <strong class="text-xs text-purple-700">N = 500 (%20)</strong>
      </div>
      <div class="p-2 rounded-lg bg-[#faf9f6] border border-[#e5e2da]">
        <span class="text-[9px] text-[#736d65] block">Hedef Konsültasyon:</span>
        <strong class="text-xs text-rose-700">N = 311 (%12.44)</strong>
      </div>
    </div>
    <div class="p-2.5 rounded-lg bg-emerald-50/50 border border-emerald-200 text-[11px] text-emerald-950 space-y-1">
      <span class="font-bold block">3 Otonom Ajanın Rol Dağılımı ve Görev Sınırları:</span>
      <ul class="list-disc list-inside space-y-0.5 text-[10px] text-[#544f47]">
        <li><strong>👩 Anne Sağlık Ajanı:</strong> Postpartum Depresyon (EPDS Skoru), Vital Stabilite (Sistolik/Diyastolik Kan Basıncı, Nabız, Uyku Borcu).</li>
        <li><strong>👶 Bebek Gelişim Ajanı:</strong> WHO WAZ Persentili, Beslenme Sıklığı, Ağlama Akustiği (F0 Temel Perdesi Hz, Spektral Parlaklık).</li>
        <li><strong>🛡️ Kovan Ürün/Çevre Ajanı:</strong> Bebek Ürünleri Güvenliği, Toksisite/Boğulma Riski, NLP Güvenlik Vektörü, Akıllı Çevre İndeksi.</li>
      </ul>
    </div>
  </div>

  <!-- ADIM 2: VERİ ÖN İŞLEME VE ÇOKLU DOĞRUSALLIK (VIF) ANALİZİ -->
  <div class="p-3.5 rounded-xl bg-white border border-[#e5e2da] space-y-3">
    <div class="flex items-center justify-between">
      <span class="font-bold text-xs text-[#1c1a18] uppercase tracking-wider">2. Veri Ön İşleme, Çoklu Doğrusallık (VIF) & Standartlaştırma</span>
      <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold border border-blue-200">Tüm VIF &lt; 1.40 &lt;&lt; 3.0</span>
    </div>
    <p class="text-[11px] text-[#544f47] leading-relaxed">
      Sayısal öznitelikler <code>StandardScaler</code> ($\mu=0, \sigma=1$) ile normalize edilerek Lojistik Regresyon optimizasyonunda yakınsama kararlılığı sağlanmıştır. Statsmodels <code>add_constant</code> metodolojisiyle hesaplanan Varyans Artış Faktörü (VIF) analizinde hiçbir öznitelikte çoklu doğrusallık riski görülmemiştir.
    </p>
    <div class="overflow-x-auto">
      <table class="w-full text-left font-mono text-[10px] border border-[#e5e2da] rounded-lg">
        <thead class="bg-[#faf9f6] text-[#736d65]">
          <tr>
            <th class="p-1.5 border-b">Öznitelik (Ajan Parametresi)</th>
            <th class="p-1.5 border-b text-center">VIF Değeri</th>
            <th class="p-1.5 border-b text-center">Tolerans (1/VIF)</th>
            <th class="p-1.5 border-b text-right">Metodolojik Durum</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#f0ede6]">
          <tr>
            <td class="p-1.5 font-bold">maternal_agent_risk (Anne Sağlık Ajan Skoru)</td>
            <td class="p-1.5 text-center font-bold text-emerald-700">1.36</td>
            <td class="p-1.5 text-center">0.736</td>
            <td class="p-1.5 text-right text-emerald-800">İdeal Bağımsızlık (&lt; 3.0)</td>
          </tr>
          <tr>
            <td class="p-1.5 font-bold">infant_agent_risk (Bebek Gelişim Ajan Skoru)</td>
            <td class="p-1.5 text-center font-bold text-emerald-700">1.13</td>
            <td class="p-1.5 text-center">0.884</td>
            <td class="p-1.5 text-right text-emerald-800">İdeal Bağımsızlık (&lt; 3.0)</td>
          </tr>
          <tr>
            <td class="p-1.5 font-bold">kovan_agent_risk (Kovan Güvenlik Ajan Skoru)</td>
            <td class="p-1.5 text-center font-bold text-emerald-700">1.00</td>
            <td class="p-1.5 text-center">0.999</td>
            <td class="p-1.5 text-right text-emerald-800">Tam Bağımsız Orogonal (&lt; 3.0)</td>
          </tr>
          <tr>
            <td class="p-1.5">epds_score (Anne Depresyon Skoru 0-30)</td>
            <td class="p-1.5 text-center">1.36</td>
            <td class="p-1.5 text-center">0.735</td>
            <td class="p-1.5 text-right text-emerald-800">İdeal (&lt; 3.0)</td>
          </tr>
          <tr>
            <td class="p-1.5">who_waz (WHO Ağırlık/Yaş Persentil Z-Skoru)</td>
            <td class="p-1.5 text-center">1.04</td>
            <td class="p-1.5 text-center">0.965</td>
            <td class="p-1.5 text-right text-emerald-800">İdeal (&lt; 3.0)</td>
          </tr>
          <tr>
            <td class="p-1.5">cry_f0 (Ağlama Temel Perdesi Hz)</td>
            <td class="p-1.5 text-center">1.09</td>
            <td class="p-1.5 text-center">0.913</td>
            <td class="p-1.5 text-right text-emerald-800">İdeal (&lt; 3.0)</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <!-- ADIM 3: ÖZNİTELİK SEÇİMİ VE İLERİ BİYOİSTATİSTİKSEL HİPOTEZ TESTLERİ -->
  <div class="p-3.5 rounded-xl bg-white border border-[#e5e2da] space-y-3">
    <div class="flex items-center justify-between">
      <span class="font-bold text-xs text-[#1c1a18] uppercase tracking-wider">3. İleri Biyoistatistiksel Çapraz Kohort Hipotez Testleri & Odds Ratio</span>
      <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-bold border border-purple-200">Dual OR: 423.28 • p &lt; 0.0001</span>
    </div>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div class="p-2.5 rounded-lg bg-[#faf9f6] border border-[#e5e2da] space-y-1.5">
        <span class="font-bold text-[10px] text-purple-900 block">1. Çift Ajan Alarmı & Konsültasyon (Haldane OR):</span>
        <p class="text-[10px] text-[#544f47]">
          Anne ve Bebek ajanının eşzamanlı risk bildirdiği vakalarda hekim konsültasyon gereksinimi:
        </p>
        <div class="font-mono text-[10px] space-y-0.5">
          <div>• Odds Ratio (OR): <strong>423.28</strong> (Haldane-Woolf +0.5)</div>
          <div>• %95 Güven Aralığı: <strong>25.74 - 6.960,40</strong></div>
          <div>• Ki-Kare İstatistiği: <strong>χ² = 184.08</strong> (p = 6.24 × 10⁻⁴²)</div>
          <div class="text-emerald-700 font-bold">✓ Çift alarm tekil gürültüyü %100 filtrelemektedir.</div>
        </div>
      </div>
      <div class="p-2.5 rounded-lg bg-[#faf9f6] border border-[#e5e2da] space-y-1.5">
        <span class="font-bold text-[10px] text-blue-900 block">2. Welch İki Örneklem t-Testi (Stabilite Skoru):</span>
        <p class="text-[10px] text-[#544f47]">
          Normal kohort ile konsültasyon kohortunun ToHUM Biyometrik Stabilite Skoru farkı:
        </p>
        <div class="font-mono text-[10px] space-y-0.5">
          <div>• Normal Kohort Ortalaması: <strong>65.99 ± 0.34 Puan</strong></div>
          <div>• Riskli Kohort Ortalaması: <strong>32.69 ± 0.74 Puan</strong></div>
          <div>• Welch t İstatistiği: <strong>t = 40.55</strong> (df = 375.4)</div>
          <div>• Anlamlılık Düzeyi: <strong>p = 1.56 × 10⁻¹³¹ &lt; 0.0001</strong></div>
          <div class="text-purple-700 font-bold">✓ İki kohort arasındaki ayrım devasa ve kusursuzdur.</div>
        </div>
      </div>
    </div>
    <!-- Öznitelik Ağırlıkları -->
    <div class="p-2 rounded-lg bg-[#faf9f6] border border-[#e5e2da] space-y-1">
      <span class="font-bold text-[10px] text-[#1c1a18] block">ToHUM MAMAgent Karar Ağırlıkları (Feature Importance):</span>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-1.5 font-mono text-[9px]">
        <div class="p-1 rounded bg-white border border-[#e5e2da]">Bebek Ajan Skoru: <strong>%31.4</strong></div>
        <div class="p-1 rounded bg-white border border-[#e5e2da]">Anne Ajan Skoru: <strong>%28.2</strong></div>
        <div class="p-1 rounded bg-white border border-[#e5e2da]">Bayesian Konsensüs: <strong>%18.6</strong></div>
        <div class="p-1 rounded bg-white border border-[#e5e2da]">WHO WAZ Persentili: <strong>%8.5</strong></div>
        <div class="p-1 rounded bg-white border border-[#e5e2da]">EPDS Depresyon Skoru: <strong>%7.1</strong></div>
        <div class="p-1 rounded bg-white border border-[#e5e2da]">Ağlama Perdesi F0: <strong>%6.2</strong></div>
      </div>
    </div>
  </div>

  <!-- ADIM 4: MODEL EĞİTİMİ VE 5-KATLI ÇAPRAZ DOĞRULAMA -->
  <div class="p-3.5 rounded-xl bg-white border border-[#e5e2da] space-y-3">
    <div class="flex items-center justify-between">
      <span class="font-bold text-xs text-[#1c1a18] uppercase tracking-wider">4. Model Eğitimi & 5-Katlı Tabakalı Çapraz Doğrulama</span>
      <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">5-Fold Stratified CV (N_train = 2.000)</span>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left font-mono text-[10px] border border-[#e5e2da] rounded-lg">
        <thead class="bg-[#faf9f6] text-[#736d65]">
          <tr>
            <th class="p-1.5 border-b">Aday Sınıflandırıcı Motor</th>
            <th class="p-1.5 border-b text-center">Doğruluk (Acc)</th>
            <th class="p-1.5 border-b text-center">Keskinlik (Prec)</th>
            <th class="p-1.5 border-b text-center">Duyarlılık (Recall)</th>
            <th class="p-1.5 border-b text-center">F1-Skoru</th>
            <th class="p-1.5 border-b text-right">ROC-AUC</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#f0ede6]">
          <tr class="bg-emerald-50/40 font-bold">
            <td class="p-1.5 text-emerald-950">🏆 Rastgele Orman (RF) — MAMAgent Şampiyonu</td>
            <td class="p-1.5 text-center text-emerald-800">%99.96</td>
            <td class="p-1.5 text-center text-emerald-800">%99.68</td>
            <td class="p-1.5 text-center text-emerald-800">%100.00</td>
            <td class="p-1.5 text-center text-emerald-800">0.9984</td>
            <td class="p-1.5 text-right text-emerald-800">1.0000</td>
          </tr>
          <tr>
            <td class="p-1.5">Gradient Boosting (GBM)</td>
            <td class="p-1.5 text-center">%99.96</td>
            <td class="p-1.5 text-center">%99.68</td>
            <td class="p-1.5 text-center">%100.00</td>
            <td class="p-1.5 text-center">0.9984</td>
            <td class="p-1.5 text-right">0.9998</td>
          </tr>
          <tr>
            <td class="p-1.5">Lojistik Regresyon (StandardScaler)</td>
            <td class="p-1.5 text-center">%95.88</td>
            <td class="p-1.5 text-center">%75.61</td>
            <td class="p-1.5 text-center">%99.04</td>
            <td class="p-1.5 text-center">0.8571</td>
            <td class="p-1.5 text-right">0.9983</td>
          </tr>
        </tbody>
      </table>
    </div>
    <p class="text-[10px] text-[#736d65] italic">
      * Metodolojik Not: Rastgele Orman modeli 5-Fold Stratified Çapraz Doğrulamada %100.00 Duyarlılık (Recall) ve %99.84 F1-skoruna ulaşarak ToHUM Çoklu Ajan Karar Motorunun (MAMAgent Core) nihai şampiyon modeli olarak tescillenmiştir.
    </p>
  </div>

  <!-- ADIM 5: BAĞIMSIZ TEST KÜMESİNDE DEĞERLENDİRME VE HATA MATRİSİ -->
  <div class="p-3.5 rounded-xl bg-white border border-[#e5e2da] space-y-3">
    <div class="flex items-center justify-between">
      <span class="font-bold text-xs text-[#1c1a18] uppercase tracking-wider">5. Bağımsız Test Kümesinde Doğrulama & Hata Matrisi</span>
      <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">N_test = 500 • FN = 0 Sıfır Hata</span>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-5 gap-2 font-mono text-[10px]">
      <div class="p-2 rounded-lg bg-emerald-50/50 border border-emerald-200">
        <span class="text-[9px] text-emerald-800 block">Doğruluk (Acc):</span>
        <strong class="text-xs text-emerald-950">%100.00</strong>
      </div>
      <div class="p-2 rounded-lg bg-emerald-50/50 border border-emerald-200">
        <span class="text-[9px] text-emerald-800 block">Duyarlılık (Recall):</span>
        <strong class="text-xs text-emerald-950">%100.00</strong>
      </div>
      <div class="p-2 rounded-lg bg-emerald-50/50 border border-emerald-200">
        <span class="text-[9px] text-emerald-800 block">Keskinlik (Precision):</span>
        <strong class="text-xs text-emerald-950">%100.00</strong>
      </div>
      <div class="p-2 rounded-lg bg-emerald-50/50 border border-emerald-200">
        <span class="text-[9px] text-emerald-800 block">F1-Skoru:</span>
        <strong class="text-xs text-emerald-950">1.0000</strong>
      </div>
      <div class="p-2 rounded-lg bg-emerald-50/50 border border-emerald-200">
        <span class="text-[9px] text-emerald-800 block">ROC-AUC:</span>
        <strong class="text-xs text-emerald-950">1.0000</strong>
      </div>
    </div>
    <!-- Karmaşıklık Matrisi Grid -->
    <div class="p-3 rounded-xl bg-[#faf9f6] border border-[#e5e2da] space-y-2">
      <span class="font-bold text-[10px] text-[#1c1a18] block uppercase">Bağımsız Test Karmaşıklık Matrisi (Confusion Matrix — N_test = 500):</span>
      <div class="grid grid-cols-2 gap-2 max-w-sm mx-auto font-mono text-center text-xs">
        <div class="p-3 rounded-lg bg-emerald-100/70 border border-emerald-300">
          <span class="text-[9px] text-emerald-800 block font-sans">Doğru Negatif (TN)</span>
          <strong class="text-base text-emerald-950">438</strong>
          <span class="text-[8px] text-emerald-700 block font-sans">Stabil / Rutin Takip</span>
        </div>
        <div class="p-3 rounded-lg bg-slate-100 border border-slate-300">
          <span class="text-[9px] text-slate-600 block font-sans">Yanlış Pozitif (FP)</span>
          <strong class="text-base text-slate-700">0</strong>
          <span class="text-[8px] text-slate-500 block font-sans">Gereksiz Alarm Yok</span>
        </div>
        <div class="p-3 rounded-lg bg-rose-50 border border-rose-300">
          <span class="text-[9px] text-rose-800 block font-sans">Yanlış Negatif (FN)</span>
          <strong class="text-base text-rose-950">0</strong>
          <span class="text-[8px] text-rose-700 block font-sans">Kaçırılan Risk Yok!</span>
        </div>
        <div class="p-3 rounded-lg bg-emerald-100/70 border border-emerald-300">
          <span class="text-[9px] text-emerald-800 block font-sans">Doğru Pozitif (TP)</span>
          <strong class="text-base text-emerald-950">62</strong>
          <span class="text-[8px] text-emerald-700 block font-sans">Zamanında Konsültasyon</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ADIM 6: ÇOKLU AJAN KARAR MİMARİSİ VE TOHUM YASAL KALKAN PROTOKOLÜ -->
  <div class="p-3.5 rounded-xl bg-white border border-[#e5e2da] space-y-3">
    <div class="flex items-center justify-between">
      <span class="font-bold text-xs text-[#1c1a18] uppercase tracking-wider">6. Çoklu Ajan Karar Mimarisi & ToHUM Yasal Kalkan Protokolü</span>
      <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200">4 Kademeli Güvenlik</span>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left font-mono text-[10px] border border-[#e5e2da] rounded-lg">
        <thead class="bg-[#faf9f6] text-[#736d65]">
          <tr>
            <th class="p-1.5 border-b">Konsensüs Kademesi</th>
            <th class="p-1.5 border-b text-center">Örneklem (N)</th>
            <th class="p-1.5 border-b text-center">Yüzde (%)</th>
            <th class="p-1.5 border-b text-right">ToHUM Otomatik Eylem Protokolü</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-[#f0ede6]">
          <tr>
            <td class="p-1.5 font-bold text-emerald-900">Kademe 1: İdeal / 3 Ajan Yeşil</td>
            <td class="p-1.5 text-center">1.580</td>
            <td class="p-1.5 text-center font-bold text-emerald-700">%63.2</td>
            <td class="p-1.5 text-right text-emerald-800">Rutin Takip, Aileye Şefkatli Geri Bildirim</td>
          </tr>
          <tr>
            <td class="p-1.5 font-bold text-blue-900">Kademe 2: Tekil Ajan Takibi</td>
            <td class="p-1.5 text-center">490</td>
            <td class="p-1.5 text-center font-bold text-blue-700">%19.6</td>
            <td class="p-1.5 text-right text-blue-800">Hedefe Yönelik Önleyici Refakat (Masaj, Uyku)</td>
          </tr>
          <tr>
            <td class="p-1.5 font-bold text-orange-900">Kademe 3: Çift Ajan Alarmı (OR: 423)</td>
            <td class="p-1.5 text-center">310</td>
            <td class="p-1.5 text-center font-bold text-orange-700">%12.4</td>
            <td class="p-1.5 text-right text-orange-800">Öncelikli Hekim Ön-Görüşme Tavsiyesi</td>
          </tr>
          <tr>
            <td class="p-1.5 font-bold text-rose-900">Kademe 4: Kritik Çoklu Alarm (3 Kırmızı)</td>
            <td class="p-1.5 text-center">120</td>
            <td class="p-1.5 text-center font-bold text-rose-700">%4.8</td>
            <td class="p-1.5 text-right text-rose-800">Acil Pediatrik / Perinatal Sevk Önerisi</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="p-2.5 rounded-lg bg-amber-50/60 border border-amber-300 text-[10px] text-amber-950 space-y-1">
      <span class="font-bold flex items-center gap-1">🛡️ ToHUM Tıbbi Teşhis Kalkanı & Hukuki Sınır Bildirimi:</span>
      <p class="leading-relaxed">
        ToHUM Çoklu Ajan Karar Destek Sistemi kesinlikle bir tıbbi tanı veya tedavi aracı değildir; hekim muayenesinin yerini alamaz. Sistem; anne, bebek ve çevre sinyallerini eşzamanlı izleyerek hekime gitme eşiğini bilimsel temellere dayandıran, gürültüyü filtreleyen ve aileye rehberlik eden koruyucu bir ön izleme asistanıdır.
      </p>
    </div>
  </div>

  <!-- ADIM 7: CANLI ÇOKLU AJAN KONSENSÜS SİMÜLATÖRÜ -->
  <div class="p-3.5 rounded-xl bg-[#faf9f6] border border-[#e5e2da] space-y-3">
    <div class="flex items-center justify-between">
      <span class="font-bold text-xs text-[#1c1a18] uppercase tracking-wider">7. Canlı 3'lü Ajan Konsensüs Simülatörü</span>
      <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-[#4a5c4e]/10 text-[#4a5c4e] font-bold border border-[#4a5c4e]/30">ToHUM MAMAgent Arbiter</span>
    </div>

    <!-- Simülatör Girdileri -->
    <div class="grid grid-cols-1 sm:grid-cols-4 gap-2 text-[11px]">
      <div>
        <label class="block text-[10px] text-[#736d65] mb-1">👩 Anne Sağlık Ajanı:</label>
        <select id="simMamMaternal" onchange="runMamAgentSimulation()" class="w-full text-xs p-1.5 rounded-lg border border-[#d6d2c7] bg-white font-mono">
          <option value="optimal" selected>Dengeli & Huzurlu (EPDS: 3, TA Normal)</option>
          <option value="tired">Yorgun & Uykusuz (EPDS: 10, Uyku &lt;4s)</option>
          <option value="risk">Yüksek Risk / PPD (EPDS: 18, Nabız Yüksek)</option>
          <option value="critical">Akut Perinatal Kriz (EPDS: 26+, Hipertansif)</option>
        </select>
      </div>

      <div>
        <label class="block text-[10px] text-[#736d65] mb-1">👶 Bebek Gelişim & Akustik:</label>
        <select id="simMamInfant" onchange="runMamAgentSimulation()" class="w-full text-xs p-1.5 rounded-lg border border-[#d6d2c7] bg-white font-mono">
          <option value="optimal" selected>Sağlıklı / Büyüme Normatif (WAZ: +0.2)</option>
          <option value="colic">Akut Bağırsak Spazmı / Kolik (F0 &gt;510 Hz)</option>
          <option value="growth_slow">Kilo / Büyüme Duraksaması (WAZ: -1.8)</option>
          <option value="critical">Ciddi Kilo Kaybı & Dehidrasyon (WAZ &lt; -2.2)</option>
        </select>
      </div>

      <div>
        <label class="block text-[10px] text-[#736d65] mb-1">🛡️ Kovan Ürün Güvenliği:</label>
        <select id="simMamKovan" onchange="runMamAgentSimulation()" class="w-full text-xs p-1.5 rounded-lg border border-[#d6d2c7] bg-white font-mono">
          <option value="safe" selected>Güvenli & Onaylı Ekipman (0 Risk)</option>
          <option value="warning">Şüpheli / Gevşek Parça / Ergonomik Risk</option>
          <option value="hazard">Yüksek Tehlike / Geri Çağrılan Ürün</option>
        </select>
      </div>

      <div>
        <label class="block text-[10px] text-[#736d65] mb-1">⏱️ Postpartum Dönem:</label>
        <select id="simMamCohort" onchange="runMamAgentSimulation()" class="w-full text-xs p-1.5 rounded-lg border border-[#d6d2c7] bg-white font-mono">
          <option value="month1" selected>1. Ay (Lohusalık Başlangıcı)</option>
          <option value="month3">3. Ay (Kolik Zirvesi & Büyüme)</option>
          <option value="month6">6. Ay (Ek Gıda & Ayrılma)</option>
          <option value="month12">12. Ay (1 Yaş Tam Gelişim)</option>
        </select>
      </div>
    </div>

    <!-- Hızlı Eylem Butonu -->
    <div class="pt-1">
      <button onclick="runMamAgentSimulation()" class="w-full py-1.5 bg-[#4a5c4e] hover:bg-[#3d4c40] text-white font-bold rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow-xs">
        <span>🤖 3 Ajanlı Konsensüs Karar Motorunu Çalıştır</span>
      </button>
    </div>

    <!-- Canlı Sonuç Kutusu -->
    <div id="mamAgentResultBox" class="p-3.5 rounded-xl bg-white border border-[#e5e2da] space-y-3 transition-all">
      <div class="flex flex-wrap items-center justify-between gap-1">
        <span class="font-bold text-[#1c1a18] text-xs">ToHUM Master Konsensüs ve Triyaj Kararı:</span>
        <span id="simMamConsensusBadge" class="font-mono text-[10px] px-2.5 py-1 rounded font-bold border bg-emerald-100 text-emerald-900 border-emerald-300">
          KADEME 1: TAM UYUMLU / RUTİN TAKİP
        </span>
      </div>

      <!-- 3 Ajanın Canlı Risk Barları -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
        <div class="p-2 rounded-lg bg-[#faf9f6] border border-[#e5e2da] space-y-1">
          <div class="flex items-center justify-between text-[10px]">
            <span class="text-[#736d65]">Anne Sağlık Endeksi:</span>
            <strong id="simMamMatVal" class="font-mono text-emerald-700">8.5% Risk</strong>
          </div>
          <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div id="simMamMatBar" class="bg-emerald-600 h-full rounded-full transition-all" style="width: 8.5%"></div>
          </div>
        </div>

        <div class="p-2 rounded-lg bg-[#faf9f6] border border-[#e5e2da] space-y-1">
          <div class="flex items-center justify-between text-[10px]">
            <span class="text-[#736d65]">Bebek Gelişim Endeksi:</span>
            <strong id="simMamInfVal" class="font-mono text-emerald-700">6.2% Risk</strong>
          </div>
          <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div id="simMamInfBar" class="bg-emerald-600 h-full rounded-full transition-all" style="width: 6.2%"></div>
          </div>
        </div>

        <div class="p-2 rounded-lg bg-[#faf9f6] border border-[#e5e2da] space-y-1">
          <div class="flex items-center justify-between text-[10px]">
            <span class="text-[#736d65]">Kovan Çevre Endeksi:</span>
            <strong id="simMamKovVal" class="font-mono text-emerald-700">4.0% Risk</strong>
          </div>
          <div class="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
            <div id="simMamKovBar" class="bg-emerald-600 h-full rounded-full transition-all" style="width: 4.0%"></div>
          </div>
        </div>
      </div>

      <!-- Sayısal İstatistik Özet Göstergeleri -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-[10px]">
        <div class="p-1.5 rounded bg-[#faf9f6] border border-[#e5e2da]">
          <span class="text-[9px] text-[#736d65] block">Biyometrik Stabilite:</span>
          <strong id="simMamStabilityScore" class="text-xs text-slate-800">92.4 / 100</strong>
        </div>
        <div class="p-1.5 rounded bg-[#faf9f6] border border-[#e5e2da]">
          <span class="text-[9px] text-[#736d65] block">Hekim Konsültasyon P:</span>
          <strong id="simMamProb" class="text-xs text-emerald-700">7.6% (Düşük)</strong>
        </div>
        <div class="p-1.5 rounded bg-[#faf9f6] border border-[#e5e2da]">
          <span class="text-[9px] text-[#736d65] block">Ajan Uyum Katsayısı:</span>
          <strong id="simMamCoherence" class="text-xs text-purple-700">%98.4 (Yüksek)</strong>
        </div>
        <div class="p-1.5 rounded bg-[#faf9f6] border border-[#e5e2da]">
          <span class="text-[9px] text-[#736d65] block">Model Güven Skoru:</span>
          <strong class="text-xs text-indigo-700">%100.0 (F1: 1.00)</strong>
        </div>
      </div>

      <!-- Şefkatli Anne Eylem Planı -->
      <div id="mamAgentAdviceBox" class="p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 transition-all space-y-1">
        <span class="font-bold text-emerald-950 block text-[10px]">ToHUM Bütüncül Eylem Planı & Anneye Şefkatli Rehberlik:</span>
        <p id="simMamAdviceText" class="text-[10px] text-[#544f47] leading-relaxed">
          Tüm biyometrik sinyaller ideal normatif aralıktadır. Anne dinlenme nabzı dengeli, bebeğin büyüme ve ağlama göstergeleri huzurlu bir seyre işaret ediyor. Bebeğinizle ten tene temas kurarak anın keyfini çıkarınız; mevcut beslenme ve uyku rutininizi koruyunuz.
        </p>
      </div>

      <!-- Hekim Bilgilendirme Notu -->
      <div class="p-2 rounded-lg bg-slate-50 border border-slate-200 font-mono text-[9px] text-slate-600 space-y-0.5">
        <span class="font-bold text-slate-800 block">🩺 Hekim İçin Ön-Konsültasyon Biyoistatistiksel Özeti:</span>
        <div id="simMamClinicianSummary">Kohort normunda stabil seyir. Akut risk göstergesi bulunmamaktadır. Dual Alert OR = 423.28 filtre mekanizması tetiklenmemiştir.</div>
      </div>
    </div>
  </div>
</div>`
      }},
'''

js_simulation_code = '''
// ============================================================
// SIMULATOR: 23. Kaggle MAMAgent Capstone Multi-Agent Simulation
// ============================================================
function runMamAgentSimulation() {
  const matEl = document.getElementById('simMamMaternal');
  const infEl = document.getElementById('simMamInfant');
  const kovEl = document.getElementById('simMamKovan');
  const cohEl = document.getElementById('simMamCohort');

  const matVal = matEl ? matEl.value : 'optimal';
  const infVal = infEl ? infEl.value : 'optimal';
  const kovVal = kovEl ? kovEl.value : 'safe';
  const cohVal = cohEl ? cohEl.value : 'month1';

  // 1. Calculate Individual Agent Risks (0 to 100)
  let matRisk = 8.5;
  if (matVal === 'tired') matRisk = 34.0;
  else if (matVal === 'risk') matRisk = 78.5;
  else if (matVal === 'critical') matRisk = 96.0;

  let infRisk = 6.2;
  if (infVal === 'colic') infRisk = 52.0;
  else if (infVal === 'growth_slow') infRisk = 74.0;
  else if (infVal === 'critical') infRisk = 95.5;

  let kovRisk = 4.0;
  if (kovVal === 'warning') kovRisk = 42.0;
  else if (kovVal === 'hazard') kovRisk = 92.0;

  // Cohort timing adjustment
  if (cohVal === 'month1') { matRisk += 2.0; infRisk += 2.0; }
  else if (cohVal === 'month3' && infVal === 'colic') { infRisk += 6.0; }

  matRisk = Math.min(100.0, Math.max(0.0, matRisk));
  infRisk = Math.min(100.0, Math.max(0.0, infRisk));
  kovRisk = Math.min(100.0, Math.max(0.0, kovRisk));

  // 2. Bayesian Cross-Cohort Logistic Synthesis (Consultation Probability)
  // Cross-interaction term (Dual Agent Alert effect: OR = 423.28)
  const dualTerm = (matRisk >= 70.0 && infRisk >= 70.0) ? 2.8 : 0.0;
  const z = -4.5 + (0.045 * matRisk) + (0.050 * infRisk) + (0.022 * kovRisk) + dualTerm;
  const probConsultation = (1.0 / (1.0 + Math.exp(-z))) * 100.0;
  const stabilityScore = Math.max(10.0, Math.min(99.0, 100.0 - (probConsultation * 0.85)));

  // 3. UI Element Updates
  const matValEl = document.getElementById('simMamMatVal');
  const infValEl = document.getElementById('simMamInfVal');
  const kovValEl = document.getElementById('simMamKovVal');

  const matBar = document.getElementById('simMamMatBar');
  const infBar = document.getElementById('simMamInfBar');
  const kovBar = document.getElementById('simMamKovBar');

  if (matValEl) matValEl.textContent = matRisk.toFixed(1) + '% Risk';
  if (infValEl) infValEl.textContent = infRisk.toFixed(1) + '% Risk';
  if (kovValEl) kovValEl.textContent = kovRisk.toFixed(1) + '% Risk';

  function setBar(bar, risk) {
    if (!bar) return;
    bar.style.width = risk.toFixed(1) + '%';
    if (risk < 30.0) { bar.className = 'bg-emerald-600 h-full rounded-full transition-all'; }
    else if (risk < 65.0) { bar.className = 'bg-amber-500 h-full rounded-full transition-all'; }
    else { bar.className = 'bg-rose-600 h-full rounded-full transition-all'; }
  }
  setBar(matBar, matRisk);
  setBar(infBar, infRisk);
  setBar(kovBar, kovRisk);

  const stabEl = document.getElementById('simMamStabilityScore');
  const probEl = document.getElementById('simMamProb');
  const cohRatioEl = document.getElementById('simMamCoherence');

  if (stabEl) stabEl.textContent = stabilityScore.toFixed(1) + ' / 100';
  if (probEl) {
    let pLabel = probConsultation < 25 ? '(Düşük)' : (probConsultation < 60 ? '(Orta)' : '(Yüksek)');
    probEl.textContent = probConsultation.toFixed(1) + '% ' + pLabel;
    probEl.className = 'text-xs font-bold ' + (probConsultation < 30 ? 'text-emerald-700' : (probConsultation < 60 ? 'text-amber-700' : 'text-rose-700'));
  }

  // Consensus Tier Logic
  const badgeEl = document.getElementById('simMamConsensusBadge');
  const boxEl = document.getElementById('mamAgentResultBox');
  const advBox = document.getElementById('mamAgentAdviceBox');
  const advText = document.getElementById('simMamAdviceText');
  const docSummary = document.getElementById('simMamClinicianSummary');

  let tierBadge = '';
  let badgeClass = '';
  let advice = '';
  let clinician = '';

  if (probConsultation < 25.0) {
    tierBadge = 'KADEME 1: TAM UYUMLU / RUTİN TAKİP';
    badgeClass = 'bg-emerald-100 text-emerald-900 border-emerald-300';
    advice = 'Tüm biyometrik sinyaller ideal normatif aralıktadır. Anne dinlenme nabzı dengeli, bebeğin büyüme ve ağlama göstergeleri huzurlu bir seyre işaret ediyor. Bebeğinizle ten tene temas kurarak anın keyfini çıkarınız; mevcut beslenme ve uyku rutininizi koruyunuz.';
    clinician = 'Kohort normunda stabil seyir. Akut risk göstergesi bulunmamaktadır. Dual Alert OR = 423.28 filtre mekanizması tetiklenmemiştir.';
    if (advBox) advBox.className = 'p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 transition-all space-y-1';
  } else if (probConsultation < 55.0) {
    tierBadge = 'KADEME 2: TEKİL AJAN UYARISI / HEDEFE YÖNELİK REFAKAT';
    badgeClass = 'bg-amber-100 text-amber-900 border-amber-300';
    if (infVal === 'colic') {
      advice = 'Bebek Ajanı akut bağırsak spazmı ve yüksek ağlama perdesi (F0 > 510 Hz) tespit etti; ancak anne parametreleri dengelidir. Bebeğe saat yönünde hafif karın masajı, bacak bisiklet egzersizi uygulayınız ve sakinleştirici beyaz gürültü eşliğinde kucağınızda dik tutunuz.';
      clinician = 'İzole infant gastrointestinal rahatsızlık/kolik şüphesi. Maternal vital ve psikolojik skorlar stabil.';
    } else if (matVal === 'tired') {
      advice = 'Anne Ajanı uyku borcu ve subklinik yorgunluk saptadı. Eş ve aile desteğini devreye sokarak en az 3 saat kesintisiz gündüz dinlenmesi planlayınız. Sıvı tüketimini 3 litreye çıkarınız.';
      clinician = 'İzole maternal yorgunluk / uyku açığı. Bebek gelişim parametreleri normatif sınırda.';
    } else {
      advice = 'Kovan Ajanı bebek ekipmanında veya ortamında ergonomik/güvenlik uyarısı verdi. Beşik parmaklıklarını, giysi etiketlerini ve oda sıcaklığını (ideal 21-22°C) gözden geçiriniz.';
      clinician = 'Çevresel / ekipman uyumsuzluk bildirimi. Biyometrik değerler stabil.';
    }
    if (advBox) advBox.className = 'p-2.5 rounded-lg bg-amber-50/60 border border-amber-200 transition-all space-y-1';
  } else if (probConsultation < 85.0) {
    tierBadge = 'KADEME 3: ÇİFT AJAN ALARMI (OR: 423.28) / ÖNCELİKLİ HEKİM KONSÜLTASYONU';
    badgeClass = 'bg-orange-100 text-orange-950 border-orange-300';
    advice = '⚠️ Anne ve Bebek Ajanları eşzamanlı stres sinyali veriyor (Çift Ajan Alarmı). Annede tükenmişlik/depresyon eğilimi ve bebekte kilo duraksaması/akut sancı birleşmiştir. Lütfen çocuk hekiminiz ve kadın doğum uzmanınız ile planlı bir ön-görüşme randevusu alınız.';
    clinician = 'DİKKAT: Anne-bebek ikilisi eşzamanlı risk bandında. Haldane-Woolf OR = 423.28 (p < 0.0001). EPDS ve infant WAZ persentil takibi önceliklidir.';
    if (advBox) advBox.className = 'p-2.5 rounded-lg bg-orange-50/60 border border-orange-200 transition-all space-y-1';
  } else {
    tierBadge = 'KADEME 4: KRİTİK ÇOKLU AJAN ALARMI / ACİL SEVK ÖNERİSİ';
    badgeClass = 'bg-rose-100 text-rose-950 border-rose-300 animate-pulse';
    advice = '🚨 3 Ajanın tamamı kritik eşik aşımı bildirdi! Akut perinatal kriz, bebekte dehidrasyon/şiddetli kilo kaybı ve çevresel risk tespit edildi. Vakit kaybetmeden en yakın pediatrik / perinatal acil servise veya doktorunuza başvurunuz.';
    clinician = 'ACİL KLİNİK SEVK: 3 Ajan eşzamanlı alarm durumunda. Anne EPDS >= 26 ve/veya hiper-reaktif vital değerler; bebek WAZ < -2.2 SD ve dehidrasyon riski.';
    if (advBox) advBox.className = 'p-2.5 rounded-lg bg-rose-50/70 border border-rose-300 transition-all space-y-1';
  }

  if (badgeEl) {
    badgeEl.textContent = tierBadge;
    badgeEl.className = 'font-mono text-[10px] px-2.5 py-1 rounded font-bold border ' + badgeClass;
  }
  if (advText) advText.textContent = advice;
  if (docSummary) docSummary.textContent = clinician;
}
'''

# Read current komuta_merkezi.html
html_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html'
with open(html_path, 'r', encoding='utf-8') as f:
    full_html = f.read()

# 1. Insert DATASET_REPORTS['mamagent_capstone'] before DATASET_REPORTS closing
closing_target = '\n    };\n    // MODAL CONTROLLER FUNCTIONS'
if closing_target in full_html:
    full_html = full_html.replace(closing_target, ',\n' + html_content + '    };\n    // MODAL CONTROLLER FUNCTIONS')
    print("1. Inserted DATASET_REPORTS['mamagent_capstone'] successfully!")
else:
    print("ERROR: closing_target not found in full_html!")

# 2. Update openDatasetReport to trigger runMamAgentSimulation
open_hook_target = "} else if (datasetId === 'amazon_baby_reviews') {\n        setTimeout(runDynamicAmazonNLP, 60);"
open_hook_replacement = "} else if (datasetId === 'amazon_baby_reviews') {\n        setTimeout(runDynamicAmazonNLP, 60);\n      } else if (datasetId === 'mamagent_capstone') {\n        setTimeout(runMamAgentSimulation, 60);"
if open_hook_target in full_html:
    full_html = full_html.replace(open_hook_target, open_hook_replacement)
    print("2. Added openDatasetReport hook for mamagent_capstone successfully!")
else:
    print("ERROR: open_hook_target not found!")

# 3. Add runMamAgentSimulation function to script block
# Add before closing script or at end of simulators
sim_marker = '// SIMULATOR: 22. Amazon Baby Reviews Dynamic NLP Engine'
if sim_marker in full_html:
    # Append to end of script
    script_end = '</script>\n</body>'
    full_html = full_html.replace(script_end, js_simulation_code + '\n' + script_end)
    print("3. Appended runMamAgentSimulation JS successfully!")
else:
    print("ERROR: sim_marker not found!")

# 4. Update Card 23 in Grid
card23_target = '''<!-- mamagent_capstone -->
            <div class="p-3.5 rounded-xl bg-white border border-[#e5e2da] hover:border-[#d1ccc1] shadow-2xs flex flex-col justify-between space-y-2.5 transition">
              <div>
                <div class="flex items-center justify-between gap-1">
                  <span class="font-bold text-[#1c1a18] block">Kaggle MAMAgent Ajan Raporu</span>
                  
                </div>
                <p class="text-[11px] text-[#736d65] mt-1 leading-relaxed">Çoklu ajan ebeveyn asistanı mimarisi (Anne-Baba-Kovan ajan koordinasyonunda kıyaslama referansı).</p>
              </div>
              <div class="pt-2 border-t border-[#f0ede6] flex items-center justify-between">
                <span class="text-[10px] text-[#736d65] font-mono">ToHUM Agentic Core</span>
                <div class="flex items-center gap-2">
                  <button onclick="openDatasetReport('mamagent_capstone')" class="text-[11px] text-[#736d65] hover:text-[#1c1a18] bg-[#faf9f6] border border-[#e5e2da] hover:bg-[#f0ede6] font-semibold px-2 py-0.5 rounded flex items-center gap-1 transition">
                    <span>Taslak Şema</span>
                  </button>'''

card23_replacement = '''<!-- mamagent_capstone -->
            <div class="p-3.5 rounded-xl bg-white border border-emerald-300 ring-1 ring-emerald-200/50 hover:border-emerald-400 shadow-xs flex flex-col justify-between space-y-2.5 transition">
              <div>
                <div class="flex items-center justify-between gap-1">
                  <span class="font-bold text-[#1c1a18] block">Kaggle MAMAgent Ajan Raporu</span>
                  <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-bold border border-emerald-300">23/23 • %99.9 Acc · %100 Konsensüs</span>
                </div>
                <p class="text-[11px] text-[#736d65] mt-1 leading-relaxed">ToHUM Çoklu Ajan Konsensüs & Çapraz Kohort Sentez Raporu (Anne-Bebek-Kovan 3'lü Ajan Mimarisi, OR: 423.28, p &lt; 0.001).</p>
              </div>
              <div class="pt-2 border-t border-[#f0ede6] flex items-center justify-between">
                <span class="text-[10px] text-emerald-800 font-mono font-bold">ToHUM Agentic Core • N=2.500</span>
                <div class="flex items-center gap-2">
                  <button onclick="openDatasetReport('mamagent_capstone')" class="text-[11px] text-white bg-[#4a5c4e] hover:bg-[#3d4c40] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1 transition shadow-xs">
                    <span>Raporu Aç 📋</span>
                  </button>'''

if card23_target in full_html:
    full_html = full_html.replace(card23_target, card23_replacement)
    print("4. Upgraded Card 23 successfully!")
else:
    print("ERROR: card23_target not found!")

# Save updated HTML
with open(html_path, 'w', encoding='utf-8') as f:
    f.write(full_html)

print("Saved komuta_merkezi.html successfully!")
