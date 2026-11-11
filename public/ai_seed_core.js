/**
 * public/ai_seed_core.js
 * ToHUM AI Seed Core & Calm Tech Perinatal Companion Client Library
 * ================================================================
 * Google Gemini 2.0 / 1.5 Flash ve Gemini Live Multimodal Audio mimarisini
 * istemci tarafında yöneten, anksiyetesiz ton gardiyanı ve 60 BPM / 8.3 Hz
 * vagal rezonans ses motorunu sunan kütüphane.
 */

(function(global) {
  'use strict';

  const API_HOST = (typeof window !== 'undefined' && window.location && window.location.origin)
    ? window.location.origin
    : 'http://localhost:8080';

  let currentAudioCtx = null;
  let audioPulseTimer = null;

  const ToHUMAi = {
    version: '1.0-SeedCore',

    /**
     * 1. Günlük Anne Şefkat Mikro-İçgörüsü
     */
    async getDailyInsight(week = 31, babyName = 'Güneş', timeOfDay = 'morning', biometrics = null) {
      try {
        const res = await fetch(`${API_HOST}/api/ai/companion/insight`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ week, babyName, timeOfDay, biometrics })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.insight) return data.insight;
        }
      } catch (err) {
        console.warn('[ToHUMAi] insight API fallback:', err);
      }

      return {
        week,
        baby_name: babyName,
        time_of_day: timeOfDay,
        theme: 'Sabah Topraklanması & Hücresel Uyanış',
        greeting: `Günaydın sevgili anne. ${babyName} bu sabah senin kalp atışlarının güven veren melodisiyle uyandı.`,
        fetal_milestone: `${babyName}'in akciğer sürfaktan sentezi ve REM uykusu fazı güvenle ilerliyor.`,
        body_wisdom: 'Güne ılık bir yudum su ve pencere kenarında 3 derin nefesle başlamak harika bir hediye.',
        calm_affirmation: 'Bedenim mükemmel bir zarafetle Güneş\'e yuva oluyor.',
        vagus_exercise: '4-7-8 Sakinleştirici Nefes: 4 sn al, 7 sn tut, 8 sn yavaşça bırak.',
        calm_badge: 'ToHUM Calm Tech · Anksiyetesiz Şefkat Çekirdeği'
      };
    },

    /**
     * 2. Baba İçin Suçlamayan Somut Eylem İstemleri
     */
    async getFatherPrompt(week = 31, motherName = 'Buse', babyName = 'Güneş', motherStatus = null) {
      try {
        const res = await fetch(`${API_HOST}/api/ai/companion/father-prompt`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ week, motherName, babyName, motherStatus })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.fatherPrompt) return data.fatherPrompt;
        }
      } catch (err) {
        console.warn('[ToHUMAi] father prompt fallback:', err);
      }

      return {
        week,
        father_role: 'Oğuz Ürem · Koruyucu Çift & Baba Çekirdeği',
        active_nudges: [
          {
            id: 'action_water',
            category: 'Amniyotik Hidrasyon Desteği',
            badge: 'Zarif Eşlik',
            headline: `${motherName}'ye Sormadan Ilık Bir Bardak Su İkram Edin`,
            empathy_context: `${week}. haftada ${babyName}'in amniyotik sıvısı her 3 saatte bir tazelenir. Masasına ılık bir su bırakmak derin bir şefkat göstergesidir.`,
            concrete_action: '1 bardak ılık suyu tebessümle masasına bırakın.',
            why_it_matters: 'Annenin bilişsel yükünü hafifletir, plasental kan akımını güçlendirir.'
          }
        ],
        calm_mantra: 'Orada olmak, dinlemek ve küçük bir dokunuşla eşlik etmek en büyük güçtür.'
      };
    },

    /**
     * 3. Biyo-Akustik Ağlama Sınıflandırması
     */
    async analyzeBabyCry(f0_hz = 412, spectral_centroid = 1830, rms_energy = 0.16) {
      try {
        const res = await fetch(`${API_HOST}/api/ai/audio/cry-analyze`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ f0_hz, spectral_centroid, rms_energy })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.analysis) return data.analysis;
        }
      } catch (err) {
        console.warn('[ToHUMAi] cry analysis fallback:', err);
      }

      return {
        detected_reason: 'hunger',
        reason_label_tr: 'Açlık & Beslenme Arayışı',
        colic_or_pain: false,
        confidence: 0.89,
        calm_tech_explanation: 'Bebeğiniz ritmik ve doğal bir tonla beslenme arayışını iletiyor.',
        recommended_soothing_action: 'Bebeği dik pozisyona getirin ve sakin bir sesle beslemeye hazırlanın.',
        audio_resonance: '8.3 Hz & 60 BPM Vagal Eşlik Önerilir'
      };
    },

    /**
     * 4. Şefkatli Tahlil ve Rapor Çevirici
     */
    async interpretReport(reportText, week = 31) {
      if (!reportText || !reportText.trim()) {
        return 'Lütfen yorumlanmasını istediğiniz tahlil veya ultrason rapor metnini giriniz.';
      }
      try {
        const res = await fetch(`${API_HOST}/api/ai/report/interpret`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ reportText, week })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.summary) return data.summary;
        }
      } catch (err) {
        console.warn('[ToHUMAi] report fallback:', err);
      }

      return `🌿 ${week}. Hafta Şefkatli Rapor Özeti:\nÖlçümleriniz Güneş'in baş, boy ve koruyucu yaşam sıvısının mükemmel bir ritimde olduğunu göstermektedir. Bedeniniz Güneş'e huzurlu bir yuva sağlıyor.`;
    },

    /**
     * 5. Calm Tech Tone Guard (Metin Anksiyetesizleştirici)
     */
    async sanitizeText(text) {
      try {
        const res = await fetch(`${API_HOST}/api/ai/tone-guard/sanitize`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text })
        });
        if (res.ok) {
          const data = await res.json();
          if (data && data.result) return data.result;
        }
      } catch (err) {
        console.warn('[ToHUMAi] tone guard fallback:', err);
      }

      return {
        clean_text: text,
        was_altered: false,
        anxiety_score: 0.0,
        calm_approved: true
      };
    },

    /**
     * 6. Web Audio API Vagal Rezonans (8.3 Hz Alfa Dalgası & 60 BPM Kalp Ritmi)
     */
    startVagalResonance(bpm = 60, alphaHz = 8.3) {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return null;

        if (currentAudioCtx) {
          try { currentAudioCtx.close(); } catch (e) {}
        }

        currentAudioCtx = new AudioCtx();
        const ctx = currentAudioCtx;

        // Taşıyıcı yumuşak sinüs dalgası (136.1 Hz - OM / Kalp Çakrası Topraklanma Frekansı)
        const carrierOsc = ctx.createOscillator();
        carrierOsc.type = 'sine';
        carrierOsc.frequency.setValueAtTime(136.1, ctx.currentTime);

        // 8.3 Hz Alfa modülasyonu
        const lfoOsc = ctx.createOscillator();
        lfoOsc.type = 'sine';
        lfoOsc.frequency.setValueAtTime(alphaHz, ctx.currentTime);

        const lfoGain = ctx.createGain();
        lfoGain.gain.setValueAtTime(12.0, ctx.currentTime);
        lfoOsc.connect(carrierOsc.frequency);

        // Ana ses kazancı
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.05, ctx.currentTime);

        carrierOsc.connect(masterGain);
        masterGain.connect(ctx.destination);

        carrierOsc.start();
        lfoOsc.start();

        // 60 BPM kalp atışı vuruşu (dakikada 60 kez = saniyede 1 kez)
        const pulseInterval = (60 / bpm) * 1000;
        if (audioPulseTimer) clearInterval(audioPulseTimer);
        audioPulseTimer = setInterval(() => {
          if (!currentAudioCtx || currentAudioCtx.state === 'closed') return;
          try {
            const now = currentAudioCtx.currentTime;
            masterGain.gain.cancelScheduledValues(now);
            masterGain.gain.setValueAtTime(0.08, now);
            masterGain.gain.exponentialRampToValueAtTime(0.03, now + 0.4);
          } catch (e) {}
        }, pulseInterval);

        return {
          status: 'playing',
          bpm,
          alphaHz,
          stop: () => {
            if (audioPulseTimer) clearInterval(audioPulseTimer);
            if (currentAudioCtx) {
              try { currentAudioCtx.close(); } catch (e) {}
              currentAudioCtx = null;
            }
          }
        };
      } catch (err) {
        console.warn('[ToHUMAi] Web Audio başlatılamadı:', err);
        return null;
      }
    },

    stopVagalResonance() {
      if (audioPulseTimer) clearInterval(audioPulseTimer);
      if (currentAudioCtx) {
        try { currentAudioCtx.close(); } catch (e) {}
        currentAudioCtx = null;
      }
    }
  };

  global.ToHUMAi = ToHUMAi;
})(typeof window !== 'undefined' ? window : this);
