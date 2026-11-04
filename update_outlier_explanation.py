# -*- coding: utf-8 -*-
import os

path = r"C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\build_perfect_master_with_celsius.py"
with open(path, "r", encoding="utf-8") as f:
    text = f.read()

s_marker = '<strong>📐 4. Aykırı Değer (Outlier) Kontrolü:</strong>'
e_marker = '<strong>🎯 5. Öznitelik Türetimi (Hemodinamik Göstergeler):</strong>'

s_idx = text.find(s_marker)
e_idx = text.find(e_marker, s_idx)

if s_idx != -1 and e_idx != -1:
    # Find the enclosing div start and end
    div_start = text.rfind('<div class="p-2.5 rounded-lg bg-white border border-emerald-200">', 0, s_idx)
    div_end = text.rfind('</div>', s_idx, e_idx) + 6
    
    new_div = """<div class="p-2.5 rounded-lg bg-white border border-emerald-200">
            <strong>📐 4. Aykırı Değer (Outlier) & Fizyolojik Hata Kontrolü:</strong> 
            Tukey IQR ($1.5 \\times IQR$) kuralıyla parametreler taranarak klinik gerçeklik ve veri hatası ayrımı yapılmıştır:
            <br>• <strong>Klinik Olarak Gerçek Patolojik Uç Değerler (Silinmedi, Korundu):</strong> 
            Sistolik tansiyonu 160 mmHg olan 10 hastanın 10'unun da (%100) hekim etiketi istisnasız <code>high risk</code> ve küçük tansiyonları 100 mmHg'dir. Tıpta 160 mmHg, Amerikan Kadın Doğum Derneği (ACOG) ve Sağlık Bakanlığı kılavuzlarında <em>"Ağır Preeklampsi"</em> tanı kriteridir. Benzer şekilde açlık şekeri 15–19 mmol/L (~270–342 mg/dL) olan hastaların %83'ü hekimlerce <code>high risk</code> etiketlenmiştir. Bu değerler ölçüm hatası değil, modelin öğrenmesi gereken gerçek patolojik vakalardır; verinin klinik bütünlüğü için silinmemiştir.
            <br>• <strong>Fizyolojik İmkansızlık (Yazım Hatası Düzeltildi):</strong> 
            Veri setinde Satır 499 ve 908'de <code>HeartRate = 7 BPM</code> saptanmıştır. Yaşayan bir insanda 7 nabız olamayacağı için (asistoli/kardiyak arrest), bunun klavyede 70 yerine yanlışlıkla 7 yazılmış bariz bir yazım hatası (Typo Artifact) olduğu tespit edilmiş ve medyan (76 BPM) ile düzeltilmiştir.
          </div>"""
          
    text = text[:div_start] + new_div + text[div_end:]
    with open(path, "w", encoding="utf-8") as f:
        f.write(text)
    print("SUCCESS: Replaced Aykırı Değer section in build_perfect_master_with_celsius.py!")
else:
    print(f"Markers not found! s_idx: {s_idx}, e_idx: {e_idx}")
