# -*- coding: utf-8 -*-
"""
patch_buse_ux_delighters.py
Implements Buse's 3 real-world user requests:
1. Top header live countdown: "${state.baby.name} · ${state.baby.week}. Hafta · Doğuma ${daysLeft} Gün 🌱"
2. "Sen Nasılsın Buse?" maternal greeting and mood selector with adaptive empathetic advice.
3. "Oğuz'a Fısılda" quick partner assist (Water / Back massage / Live signal).
"""

def main():
    p = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\app.js"
    with open(p, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update Header to show exact countdown
    old_hdr_text = '<span class="text-[10px] text-amber-200 font-semibold">${state.baby.name} · ${state.baby.week}. Hafta</span>'
    new_hdr_text = '<span class="text-[10px] text-amber-200 font-semibold">${state.baby.name} · ${state.baby.week}. Hafta · Doğuma Son ${state.user.daysRemaining || 63} Gün 🌱</span>'
    if old_hdr_text in content:
        content = content.replace(old_hdr_text, new_hdr_text)
        print("1. Updated header with live countdown!")

    # 2. Add selectMaternalMood and quickWhisperToPartner functions
    new_maternal_fns = '''
// =========================================================================
// BUSE'NİN GÖZÜNDEN CALM TECH: "SEN NASILSIN?" VE "OĞUZ'A FISILDA" SİSTEMİ
// =========================================================================
window.selectMaternalMood = function(moodId) {
  state.healthData.selectedMood = moodId;
  const moodResponses = {
    serene: "Dingin ve huzurlusun. Bedenin Güneş'le mükemmel bir sükunette nefes alıyor.",
    tired: "Yorgun hissetmen çok doğal; bedenin şu an mucizevi bir organ ve doku inşa ediyor. Dinlen.",
    emotional: "Hormonlar yaşamın tatlı dalgalarıdır. 8.3 Hz sesimizle biraz baş başa kal.",
    ache: "31. haftada pelvis bebeğe yer açıyor. Oğuz'dan 5 dk hafif bel masajı isteyelim mi?"
  };
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
'''

    if "window.selectMaternalMood =" not in content:
        content = content.replace(
            'window.silentUpdateBaselineBP = function',
            new_maternal_fns + '\nwindow.silentUpdateBaselineBP = function'
        )
        print("2. Added selectMaternalMood and quickWhisperToPartner functions!")

    # 3. Add maternal greeting and quick whisper bar to home bottom sheet
    # Let's see what is inside the expanded sheet
    target_sheet = '<div class="grid grid-cols-4 gap-1 bg-white/5 p-1 rounded-2xl text-xs my-3">'
    maternal_greeting_bar = '''<!-- "Sen Nasılsın Buse?" Şefkatli Karşılama ve Oğuz'a Fısılda Çubuğu -->
              <div class="p-3 bg-gradient-to-r from-amber-950/45 via-black/40 to-emerald-950/35 rounded-2xl border border-amber-400/30 space-y-2 mb-2 text-xs">
                <div class="flex justify-between items-center">
                  <span class="text-[11px] font-bold text-amber-200">🌸 Günaydın ${state.user.shortName || 'Buse'} · Sen Nasılsın?</span>
                  <span class="text-[9px] text-white/50">Doğuma ${state.user.daysRemaining || 63} Gün</span>
                </div>
                <div class="grid grid-cols-4 gap-1.5 text-center text-[10px]">
                  <button onclick="selectMaternalMood('serene')" class="p-1.5 rounded-xl border transition ${state.healthData.selectedMood === 'serene' ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200 font-bold' : 'bg-white/5 border-white/10 text-white/70'}">☀️ Dingin</button>
                  <button onclick="selectMaternalMood('tired')" class="p-1.5 rounded-xl border transition ${state.healthData.selectedMood === 'tired' ? 'bg-amber-500/30 border-amber-400 text-amber-200 font-bold' : 'bg-white/5 border-white/10 text-white/70'}">⛅ Yorgun</button>
                  <button onclick="selectMaternalMood('emotional')" class="p-1.5 rounded-xl border transition ${state.healthData.selectedMood === 'emotional' ? 'bg-sky-500/30 border-sky-400 text-sky-200 font-bold' : 'bg-white/5 border-white/10 text-white/70'}">🌧️ Duygusal</button>
                  <button onclick="selectMaternalMood('ache')" class="p-1.5 rounded-xl border transition ${state.healthData.selectedMood === 'ache' ? 'bg-rose-500/30 border-rose-400 text-rose-200 font-bold' : 'bg-white/5 border-white/10 text-white/70'}">⚡ Bel Ağrısı</button>
                </div>
                <!-- Eşe Hızlı Fısıltı -->
                <div class="pt-1.5 border-t border-white/10 flex items-center justify-between">
                  <span class="text-[9px] text-white/50 font-medium">Oğuz'a Fısılda:</span>
                  <div class="flex space-x-1.5">
                    <button onclick="quickWhisperToPartner('water')" class="px-2 py-0.5 rounded-lg bg-cyan-500/20 text-cyan-200 border border-cyan-400/30 text-[9px]">💧 Ilık Su</button>
                    <button onclick="quickWhisperToPartner('massage')" class="px-2 py-0.5 rounded-lg bg-amber-500/20 text-amber-200 border border-amber-400/30 text-[9px]">💆‍♂️ Bel Masajı</button>
                  </div>
                </div>
              </div>
'''

    if target_sheet in content and "Sen Nasılsın Buse?" not in content:
        content = content.replace(target_sheet, maternal_greeting_bar + '              ' + target_sheet)
        print("3. Added 'Sen Nasılsın Buse?' and 'Oğuz'a Fısılda' to home bottom sheet!")

    with open(p, "w", encoding="utf-8") as f:
        f.write(content)

    print("Successfully patched Buse's UX delighters into app.js!")

if __name__ == "__main__":
    main()
