import sys
sys.stdout.reconfigure(encoding='utf-8')

html_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html'
with open(html_path, 'r', encoding='utf-8') as f:
    text = f.read()

old_banner = """<!-- Veri Seti Akademik Takip ve Durum Çubuğu -->
        <div class="bg-white rounded-2xl border border-[#e5e2da] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-xl bg-[#4a5c4e] text-white flex items-center justify-center font-bold text-base shadow-xs">18/23</div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-[#1c1a18]">Veri Analizi & 7 Adımlı Akademik Doğrulama Takibi</span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">%78.3 Tamamlandı</span>
              </div>
              <p class="text-[11px] text-[#736d65] mt-0.5">Her veri seti için özel Python boru hattı (pipeline) çalıştırılarak 7 adımlı tıp/istatistik raporu ve interaktif simülatör inşa edilmektedir.</p>
            </div>
          </div>
          <!-- Lejant Rozetleri -->
          <div class="flex items-center gap-2 text-xs flex-wrap">
            <span class="px-2.5 py-1 rounded-lg bg-[#faf9f6] text-[#2b2825] border border-[#e5e2da] font-semibold flex items-center gap-1.5 shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>18 Tamamlandı</span>
            </span>
            <span class="px-2.5 py-1 rounded-lg bg-[#faf9f6] text-[#2b2825] border border-[#e5e2da] font-semibold flex items-center gap-1.5 shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span>Sırada: DSÖ Büyüme Eğrileri & Laktasyon Analitiği</span>
            </span>
            <span class="px-2.5 py-1 rounded-lg bg-[#faf9f6] text-[#736d65] border border-[#e5e2da] font-medium flex items-center gap-1.5">
              <span class="w-2 h-2 rounded-full bg-[#bbb5ab]"></span>
              <span>5 Taslak Şema</span>
            </span>
          </div>
        </div>"""

new_banner = """<!-- Veri Seti Akademik Takip ve Durum Çubuğu -->
        <div class="bg-white rounded-2xl border border-emerald-300 ring-1 ring-emerald-200/50 p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-base shadow-xs">23/23</div>
            <div>
              <div class="flex items-center gap-2">
                <span class="text-sm font-bold text-[#1c1a18]">Veri Analizi & 7 Adımlı Akademik Doğrulama Takibi</span>
                <span class="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold">%100.0 Tamamlandı (Zirve Kapanış)</span>
              </div>
              <p class="text-[11px] text-[#736d65] mt-0.5">23 veri setinin tamamı için bağımsız Python boru hatları çalıştırılmış; 7 adımlı ML döngüleri, Odds Ratio hipotezleri ve interaktif simülatörler eksiksiz doğrulanmıştır.</p>
            </div>
          </div>
          <!-- Lejant Rozetleri -->
          <div class="flex items-center gap-2 text-xs flex-wrap">
            <span class="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-900 border border-emerald-200 font-bold flex items-center gap-1.5 shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>23/23 Veri Seti %100 Doğrulandı</span>
            </span>
            <span class="px-2.5 py-1 rounded-lg bg-purple-50 text-purple-900 border border-purple-200 font-semibold flex items-center gap-1.5 shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-purple-600"></span>
              <span>MAMAgent 3'lü Konsensüs Aktif</span>
            </span>
            <span class="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 border border-blue-200 font-semibold flex items-center gap-1.5 shadow-2xs">
              <span class="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>TÜBİTAK BiGG & DEPARK Sunumuna Hazır</span>
            </span>
          </div>
        </div>"""

if old_banner in text:
    text = text.replace(old_banner, new_banner)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("Updated top banner successfully!")
else:
    print("ERROR: old_banner not found!")
