import sys
sys.stdout.reconfigure(encoding='utf-8')

html_path = r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html'
with open(html_path, 'r', encoding='utf-8') as f:
    text = f.read()

old_tier_block = """  if (probConsultation < 25.0) {
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
  }"""

new_tier_block = """  const isTripleAlert = (matRisk >= 70.0 && infRisk >= 70.0 && kovRisk >= 60.0);
  const isDualAlert = ((matRisk >= 65.0 && infRisk >= 65.0) || (matRisk >= 65.0 && kovRisk >= 65.0) || (infRisk >= 65.0 && kovRisk >= 65.0));
  const isSingleAlert = (matRisk >= 25.0 || infRisk >= 35.0 || kovRisk >= 35.0);

  if (isTripleAlert || (probConsultation >= 90.0 && kovRisk >= 60.0)) {
    tierBadge = 'KADEME 4: KRİTİK ÇOKLU AJAN ALARMI (3 AJAN KIRMIZI) / ACİL SEVK ÖNERİSİ';
    badgeClass = 'bg-rose-100 text-rose-950 border-rose-300 animate-pulse';
    advice = '🚨 3 Ajanın tamamı kritik eşik aşımı bildirdi! Akut perinatal kriz, bebekte dehidrasyon/şiddetli kilo kaybı ve çevresel tehlike tespit edildi. Vakit kaybetmeden en yakın pediatrik / perinatal acil servise veya doktorunuza başvurunuz.';
    clinician = 'ACİL KLİNİK SEVK: 3 Ajan eşzamanlı alarm durumunda. Anne EPDS >= 26 ve/veya hiper-reaktif vital değerler; bebek WAZ < -2.2 SD ve dehidrasyon riski.';
    if (advBox) advBox.className = 'p-2.5 rounded-lg bg-rose-50/70 border border-rose-300 transition-all space-y-1';
  } else if (isDualAlert || (matRisk >= 65.0 && infRisk >= 65.0)) {
    tierBadge = 'KADEME 3: ÇİFT AJAN ALARMI (OR: 423.28) / ÖNCELİKLİ HEKİM KONSÜLTASYONU';
    badgeClass = 'bg-orange-100 text-orange-950 border-orange-300';
    advice = '⚠️ Anne ve Bebek Ajanları eşzamanlı stres sinyali veriyor (Çift Ajan Alarmı). Annede tükenmişlik/depresyon eğilimi ve bebekte büyüme duraksaması/akut sancı birleşmiştir. Çocuk hekiminiz ve kadın doğum uzmanınız ile planlı bir ön-görüşme randevusu alınız.';
    clinician = 'DİKKAT: Anne-bebek ikilisi eşzamanlı risk bandında. Haldane-Woolf OR = 423.28 (p < 0.0001). EPDS ve infant WAZ persentil takibi önceliklidir.';
    if (advBox) advBox.className = 'p-2.5 rounded-lg bg-orange-50/60 border border-orange-200 transition-all space-y-1';
  } else if (isSingleAlert || probConsultation >= 20.0) {
    tierBadge = 'KADEME 2: TEKİL AJAN UYARISI / HEDEFE YÖNELİK REFAKAT';
    badgeClass = 'bg-amber-100 text-amber-900 border-amber-300';
    if (infVal === 'colic' || infRisk >= 35.0) {
      advice = 'Bebek Ajanı akut bağırsak spazmı ve yüksek ağlama perdesi (F0 > 510 Hz) tespit etti; ancak anne parametreleri dengelidir. Bebeğe saat yönünde hafif karın masajı, bacak bisiklet egzersizi uygulayınız ve sakinleştirici beyaz gürültü eşliğinde kucağınızda dik tutunuz.';
      clinician = 'İzole infant gastrointestinal rahatsızlık/kolik şüphesi. Maternal vital ve psikolojik skorlar stabil.';
    } else if (matVal === 'tired' || matRisk >= 25.0) {
      advice = 'Anne Ajanı uyku borcu ve subklinik yorgunluk saptadı. Eş ve aile desteğini devreye sokarak en az 3 saat kesintisiz gündüz dinlenmesi planlayınız. Sıvı tüketimini 3 litreye çıkarınız.';
      clinician = 'İzole maternal yorgunluk / uyku açığı. Bebek gelişim parametreleri normatif sınırda.';
    } else {
      advice = 'Kovan Ajanı bebek ekipmanında veya ortamında ergonomik/güvenlik uyarısı verdi. Beşik parmaklıklarını, giysi etiketlerini ve oda sıcaklığını (ideal 21-22°C) gözden geçiriniz.';
      clinician = 'Çevresel / ekipman uyumsuzluk bildirimi. Biyometrik değerler stabil.';
    }
    if (advBox) advBox.className = 'p-2.5 rounded-lg bg-amber-50/60 border border-amber-200 transition-all space-y-1';
  } else {
    tierBadge = 'KADEME 1: TAM UYUMLU / RUTİN TAKİP';
    badgeClass = 'bg-emerald-100 text-emerald-900 border-emerald-300';
    advice = 'Tüm biyometrik sinyaller ideal normatif aralıktadır. Anne dinlenme nabzı dengeli, bebeğin büyüme ve ağlama göstergeleri huzurlu bir seyre işaret ediyor. Bebeğinizle ten tene temas kurarak anın keyfini çıkarınız; mevcut beslenme ve uyku rutininizi koruyunuz.';
    clinician = 'Kohort normunda stabil seyir. Akut risk göstergesi bulunmamaktadır. Dual Alert OR = 423.28 filtre mekanizması tetiklenmemiştir.';
    if (advBox) advBox.className = 'p-2.5 rounded-lg bg-emerald-50/60 border border-emerald-200 transition-all space-y-1';
  }"""

if old_tier_block in text:
    text = text.replace(old_tier_block, new_tier_block)
    with open(html_path, 'w', encoding='utf-8') as f:
        f.write(text)
    print("Updated tier logic successfully!")
else:
    print("ERROR: old_tier_block not found!")
