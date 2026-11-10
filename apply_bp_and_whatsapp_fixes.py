# -*- coding: utf-8 -*-
"""
apply_bp_and_whatsapp_fixes.py
- Tansiyonu ortalamanız büyük/küçük (sistolik/diyastolik) olarak soran şık, bilimsel ve akıcı kart ekler.
- WhatsApp tıklandığında açık, belirgin "‹ Geri Dön" butonu bulunan, mesaj önizlemeli ve kopyalama seçenekli
  in-app WhatsApp Modal penceresini ekler.
- sendPartnerInviteWhatsApp, sendPartnerPainAlert ve shareClinicalSummaryWhatsApp fonksiyonlarını modal ile entegre eder.
"""

import sys

def main():
    path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js"
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. State içine whatsAppModal ekle
    if "whatsAppModal:" not in content:
        content = content.replace(
            'auth: {',
            'whatsAppModal: {\n    isOpen: false,\n    title: "WhatsApp Paylaşımı",\n    recipientName: "Oğuz Baltacıoğlu",\n    recipientPhone: "+90 532 123 45 67",\n    message: "",\n    waUrl: "",\n    type: "partner_invite"\n  },\n  auth: {'
        )
        print("1. Added whatsAppModal to state!")

    # 2. WhatsApp modal fonksiyonları ve Tansiyon yardımcı fonksiyonlarını ekle
    helper_code = '''
// =========================================================================
// TANSİYON ORTALAMASI (BÜYÜK / KÜÇÜK) VE WHATSAPP GERİ DÖNÜŞLÜ MODAL SİSTEMİ
// =========================================================================
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
    banner.innerHTML = '<span>✅</span> <span><b>Mesaj WhatsApp\\'a aktarıldı!</b> İşiniz bittiğinde yukarıdaki <b>‹ Geri Dön</b> butonuyla devam edebilirsiniz.</span>';
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
'''

    if "window.openWhatsAppModal =" not in content:
        content = content.replace(
            'window.silentUpdateAuthName = function() {',
            helper_code + '\nwindow.silentUpdateAuthName = function() {'
        )
        print("2. Added helper functions and renderWhatsAppModal!")

    # 3. WhatsApp açma fonksiyonlarını modal ile güncelle
    # sendPartnerInviteWhatsApp
    old_wa_invite = '''window.sendPartnerInviteWhatsApp = function() {
  state.partner.inviteStatus = "pending";
  const code = state.partner.inviteCode || "THM-31G-834";
  const msg = encodeURIComponent(
    `Canım ${state.partner.shortName}, ToHUM'da ${state.baby.name}'in ${state.baby.week}. hafta gelişim ve sağlık çemberini kurdum. ` +
    `Baba Destek Arayüzüne bağlanmak için Eşleştirme Kodumuz: ${code} 🌱`
  );
  const waUrl = "https://wa.me/" + (state.partner.phone || "").replace(/[^0-9]/g, '') + "?text=" + msg;
  triggerHaptic([20, 40]);
  saveProfileToBackend(false);
  render();
  setTimeout(() => window.open(waUrl, '_blank'), 300);
};'''

    new_wa_invite = '''window.sendPartnerInviteWhatsApp = function() {
  state.partner.inviteStatus = "pending";
  const code = state.partner.inviteCode || "THM-31G-834";
  const msg =
    `Canım ${state.partner.shortName || 'Eşim'}, ToHUM'da ${state.baby.name}'in ${state.baby.week}. hafta gelişim ve sağlık çemberini kurdum. ` +
    `Baba Destek Arayüzüne bağlanmak için Eşleştirme Kodumuz: ${code} 🌱\\n\\n` +
    `Bağlantı: http://localhost:8080/index.html?tab=father`;
  saveProfileToBackend(false);
  openWhatsAppModal(
    "partner_invite",
    state.partner.name || "Oğuz Baltacıoğlu",
    state.partner.phone || "+90 532 000 00 00",
    msg
  );
};'''

    if old_wa_invite in content:
        content = content.replace(old_wa_invite, new_wa_invite)
        print("3. Updated sendPartnerInviteWhatsApp to open modal!")

    # sendPartnerPainAlert
    old_pain_alert = '''window.sendPartnerPainAlert = function() {
  const week = state.baby.week;
  const msg = encodeURIComponent(
    "Oğuz, " + week +
    ". haftadayız ve biraz desteğe ihtiyacım var. Bana ulaşabilir misin? (ToHUM'dan gönderildi)"
  );
  const waUrl = "https://wa.me/" + state.partner.phone.replace(/[^0-9]/g, '') + "?text=" + msg;
  triggerHaptic([30, 50, 30]);
  triggerReaction("magnesium", "Oğuz'a WhatsApp mesajı hazırlanıyor...");
  setTimeout(() => window.open(waUrl, '_blank'), 400);
};'''

    new_pain_alert = '''window.sendPartnerPainAlert = function() {
  const week = state.baby.week;
  const msg =
    `${state.partner.shortName || 'Oğuz'}, ${week}. haftadayız ve biraz desteğe ihtiyacım var. Bana ulaşabilir misin? (ToHUM'dan gönderildi 🌱)`;
  openWhatsAppModal(
    "partner_pain",
    state.partner.name || "Oğuz Baltacıoğlu",
    state.partner.phone || "+90 532 000 00 00",
    msg
  );
};'''

    if old_pain_alert in content:
        content = content.replace(old_pain_alert, new_pain_alert)
        print("4. Updated sendPartnerPainAlert to open modal!")

    # shareClinicalSummaryWhatsApp
    # Let's see how shareClinicalSummaryWhatsApp is defined
    old_clinical_search = "window.shareClinicalSummaryWhatsApp = function() {"
    if old_clinical_search in content:
        idx = content.find(old_clinical_search)
        end_idx = content.find("};", idx) + 2
        new_clinical_fn = '''window.shareClinicalSummaryWhatsApp = function() {
  const curW = state.baby.week;
  const bp = state.healthData.bloodPressureHistory[0] || { systolic: 92, diastolic: 62 };
  const w = state.wearable;
  const analysis = window.runAiSeedCoreAnalysis(bp.systolic, bp.diastolic);
  const m0 = window.computeM0BaselineProfile();

  const msg =
    `*ToHUM Klinik & M0 Sağlık Özeti (${curW}. Hafta)*\\n` +
    `👤 Anne: ${state.user.name} (${state.user.bloodGroup})\\n` +
    `👶 Bebek: ${state.baby.name} (${curW}. Hafta · ${state.baby.weightGram}g)\\n` +
    `🩺 Güncel Tansiyon: ${bp.systolic}/${bp.diastolic} mmHg (Bazal: ${state.user.baselineBP})\\n` +
    `💓 Nabız: ${w.heartRate} bpm · HRV: ${w.hrv} ms\\n` +
    `⚖️ Kilo Artışı: +${m0.actualGain} kg (${m0.weightStatusText})\\n` +
    `🤖 AI Tohum Çekirdek Notu: ${analysis.message}\\n` +
    `_ToHUM Calm Tech Sağlık Takip Sistemi_ 🌱`;

  openWhatsAppModal(
    "clinical_summary",
    state.user.doctorName ? `Dr. ${state.user.doctorName}` : "Doktorum / Eşim",
    "",
    msg
  );
};'''
        content = content[:idx] + new_clinical_fn + content[end_idx:]
        print("5. Updated shareClinicalSummaryWhatsApp to open modal!")

    # 4. renderAppShell içine renderWhatsAppModal ekle
    if "${renderWhatsAppModal()}" not in content:
        content = content.replace(
            '${renderClinicalReportModal()}',
            '${renderClinicalReportModal()}\n    ${renderWhatsAppModal()}'
        )
        # Also in login and onboarding screens
        content = content.replace(
            'root.innerHTML = renderAuthLoginScreen();',
            'root.innerHTML = renderAuthLoginScreen() + renderWhatsAppModal();'
        )
        content = content.replace(
            'root.innerHTML = renderOnboardingWizardScreen();',
            'root.innerHTML = renderOnboardingWizardScreen() + renderWhatsAppModal();'
        )
        print("6. Added renderWhatsAppModal to renderAppShell, login and onboarding!")

    # 5. Onboarding Step 2: Tansiyon sorusunu "büyük / küçük ortalamanız" formatına çevir
    old_bp_question_target = '<!-- Soru 1: Normal Tansiyon Yapısı -->'
    new_bp_question = '''<!-- Soru 1: Ortalama Tansiyon Yapısı (Büyük & Küçük Tansiyon) -->
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
            </div>'''

    if old_bp_question_target in content:
        start_q = content.find(old_bp_question_target)
        # Find the next question <!-- Soru 2: Kullanılan Vitamin ve İlaçlar -->
        next_q = content.find('<!-- Soru 2: Kullanılan Vitamin ve İlaçlar -->', start_q)
        if next_q != -1:
            content = content[:start_q] + new_bp_question + "\n\n            " + content[next_q:]
            print("7. Upgraded blood pressure question to elegant systolic/diastolic in Step 2!")

    # 6. Onboarding Step 3: Add WhatsApp invite button right under partner details
    partner_block = '<!-- Eş / Baba Tanımlama Kartı -->'
    if partner_block in content:
        idx_p = content.find(partner_block)
        # Find the closing of this card before <!-- Hastane ve Doktor Bilgileri Kartı -->
        next_hosp = content.find('<!-- Hastane ve Doktor Bilgileri Kartı -->', idx_p)
        if next_hosp != -1:
            # Insert WhatsApp invite button inside the partner card before the next card
            wa_step3_btn = '''
              <!-- WhatsApp ile Eş Daveti Butonu (Geri tuşu destekli) -->
              <button onclick="sendPartnerInviteWhatsApp()" class="w-full py-2.5 bg-gradient-to-r from-amber-500/30 to-emerald-500/25 hover:from-amber-500/40 border border-amber-400/40 rounded-2xl text-amber-100 font-bold text-[11px] transition flex items-center justify-center space-x-1.5 shadow-md">
                <span>💌</span>
                <span>${p.shortName || 'Eşine'}'a WhatsApp ile Davet Gönder</span>
              </button>
            </div>
'''
            # Replace the closing </div> of partner card
            # Let's see the end of partner card:
            # <div class="p-2.5 rounded-2xl border ..."> ... </div> \n </div>
            last_div = content.rfind('</div>', idx_p, next_hosp)
            if last_div != -1:
                content = content[:last_div] + wa_step3_btn + content[next_hosp:]
                print("8. Added WhatsApp invite button to Onboarding Step 3!")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

    print("SUCCESS: All Blood Pressure and WhatsApp fixes successfully applied!")

if __name__ == "__main__":
    main()
