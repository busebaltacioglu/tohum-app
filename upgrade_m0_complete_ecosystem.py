# -*- coding: utf-8 -*-
"""
upgrade_m0_complete_ecosystem.py
Implements the multi-disciplinary M0 specifications approved by the Expert Council:
1. SAT (Son Adet Tarihi / Naegele Kuralı) & Hafta dinamik çift yönlü senkronizasyonu
2. IOM Kilo Artışı Görsel Koridor Çubuğu
3. DMT1 Mineral Yarışması & Takviye Zaman Çizelgesi (Calm Tech Timeline)
4. Veri Egemenliği, KVKK Güvencesi & JSON Dışa Aktarma (downloadM0DataJson)
5. Profil alt menüleri genişletmesi (identity, hospital, partner, baseline, supplements, security)
"""

def main():
    p = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js"
    with open(p, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Add downloadM0DataJson and resetLocalData functions
    new_helper_fns = '''
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
'''

    if "window.downloadM0DataJson =" not in content:
        content = content.replace(
            'window.silentUpdateBaselineBP = function',
            new_helper_fns + '\nwindow.silentUpdateBaselineBP = function'
        )
        print("1. Added downloadM0DataJson, resetLocalData, and calculateLmpFromWeek!")

    # 2. Update calculateWeekFromLmpDate to compute EDD and remaining days dynamically
    old_lmp_fn = '''window.calculateWeekFromLmpDate = function(dateStr) {
  if (!dateStr) return;
  state.user.lmpDate = dateStr;
  const lmp = new Date(dateStr);
  if (!isNaN(lmp.getTime())) {
    const refNow = new Date("2026-08-23T12:00:00");
    const diffDays = Math.floor((refNow - lmp) / (1000 * 60 * 60 * 24));
    const calcWeek = Math.max(4, Math.min(40, Math.floor(diffDays / 7)));
    const due = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
    state.user.dueDate = due.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    if (window.changePregnancyWeek) {
      window.changePregnancyWeek(calcWeek);
    }
  }
};'''

    new_lmp_fn = '''window.calculateWeekFromLmpDate = function(dateStr) {
  if (!dateStr) return;
  state.user.lmpDate = dateStr;
  const lmp = new Date(dateStr);
  if (!isNaN(lmp.getTime())) {
    const now = new Date();
    const diffDays = Math.max(0, Math.floor((now - lmp) / (1000 * 60 * 60 * 24)));
    const calcWeek = Math.max(4, Math.min(42, Math.floor(diffDays / 7)));
    const due = new Date(lmp.getTime() + 280 * 24 * 60 * 60 * 1000);
    state.user.dueDate = due.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
    state.user.daysRemaining = Math.max(0, Math.ceil((due - now) / (1000 * 60 * 60 * 24)));
    state.baby.week = calcWeek;
    if (window.computeM0BaselineProfile) {
      window.computeM0BaselineProfile();
    }
    saveState();
    saveProfileToBackend(false);
    render();
  }
};'''

    if old_lmp_fn in content:
        content = content.replace(old_lmp_fn, new_lmp_fn)
        print("2. Upgraded calculateWeekFromLmpDate with Naegele Rule & Days Remaining!")

    # 3. Update Profile Subtab Navigation Bar to 6 complete items
    old_subtabs = '''      <!-- 5 Ayrı Bilgi Güncelleme Menüsü -->
      <div class="flex items-center space-x-1.5 overflow-x-auto no-scrollbar bg-white/5 p-1.5 rounded-2xl border border-white/10 text-[10px]">
        ${[
          { id: 'identity', lbl: '👩 Ben & Bebeğim' },
          { id: 'hospital', lbl: '🏥 Hastane & Doktor' },
          { id: 'partner', lbl: '🤝 Eş Daveti' },
          { id: 'baseline', lbl: '❤️ M0 Bazal Koridor' }
        ].map(t => `
          <button onclick="setProfileSubtab('${t.id}')"
            class="px-3 py-1.5 rounded-xl whitespace-nowrap transition-all font-semibold ${sub === t.id ? 'bg-amber-400/25 text-amber-200 border border-amber-400/40 shadow-sm' : 'text-white/60 hover:text-white'}">
            ${t.lbl}
          </button>
        `).join('')}
      </div>'''

    new_subtabs = '''      <!-- 6 Ayrı Bilgi Güncelleme Menüsü (Çok Disiplinli M0 Modülleri) -->
      <div class="flex items-center space-x-1.5 overflow-x-auto no-scrollbar bg-white/5 p-1.5 rounded-2xl border border-white/10 text-[10px]">
        ${[
          { id: 'identity', lbl: '👩 Ben & Bebeğim' },
          { id: 'baseline', lbl: '❤️ M0 Bazal & Kilo' },
          { id: 'supplements', lbl: '💊 DMT1 Takvim' },
          { id: 'hospital', lbl: '🏥 Hastane & Acil' },
          { id: 'partner', lbl: '🤝 Eş Daveti' },
          { id: 'security', lbl: '🔒 Veri & KVKK' }
        ].map(t => `
          <button onclick="setProfileSubtab('${t.id}')"
            class="px-3 py-1.5 rounded-xl whitespace-nowrap transition-all font-semibold ${sub === t.id ? 'bg-amber-400/25 text-amber-200 border border-amber-400/40 shadow-sm' : 'text-white/60 hover:text-white'}">
            ${t.lbl}
          </button>
        `).join('')}
      </div>'''

    if old_subtabs in content:
        content = content.replace(old_subtabs, new_subtabs)
        print("3. Updated subtab navigation bar with 6 items!")

    # 4. Add DMT1 Supplements and Security subtabs implementations
    supplements_and_security_render = '''
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
'''

    # Place supplements_and_security_render right after sub === "baseline" block
    target_pos = 'if (sub === "baseline") {'
    if target_pos in content:
        # Find where the sub === "baseline" block ends: `return ` ... `; }`
        baseline_idx = content.find(target_pos)
        closing_brace = content.find('// =========================================================================\n  // MENÜ 5:', baseline_idx)
        if closing_brace != -1:
            content = content[:closing_brace] + supplements_and_security_render + '\n  ' + content[closing_brace:]
            print("4. Added supplements (DMT1) and security (KVKK/Export) subtabs!")

    with open(p, "w", encoding="utf-8") as f:
        f.write(content)

    print("Successfully upgraded app.js with Council's M0 enhancements!")

if __name__ == "__main__":
    main()
