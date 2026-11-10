import subprocess, time, urllib.request, json, asyncio
import websockets

async def test_cry_sim():
    edge = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
    proc = subprocess.Popen([edge, '--headless=new', '--remote-debugging-port=9229', 'http://localhost:8080/komuta_merkezi.html'])
    time.sleep(2)
    try:
        res = urllib.request.urlopen('http://localhost:9229/json').read()
        pages = json.loads(res.decode())
        target = [p for p in pages if 'komuta_merkezi' in p.get('url', '')][0]
        ws_url = target['webSocketDebuggerUrl']
        
        async with websockets.connect(ws_url) as ws:
            await ws.send(json.dumps({'id': 1, 'method': 'Runtime.enable'}))
            
            async def call_eval(eval_id, expr):
                await ws.send(json.dumps({
                    'id': eval_id,
                    'method': 'Runtime.evaluate',
                    'params': {'expression': expr, 'returnByValue': True}
                }))
                while True:
                    m = await ws.recv()
                    d = json.loads(m)
                    if d.get('id') == eval_id:
                        return d.get('result', {})
            
            # Open baby_cry_audio report
            res = await call_eval(2, "openDatasetReport('baby_cry_audio')")
            print("openDatasetReport result:", res)
            await asyncio.sleep(0.5)
            
            # Check if elements exist
            check_js = """
            ({
                simCryPitch: !!document.getElementById('simCryPitch'),
                simCryDuration: !!document.getElementById('simCryDuration'),
                simCryEnergy: !!document.getElementById('simCryEnergy'),
                simCryLastFeed: !!document.getElementById('simCryLastFeed'),
                simCryF0: !!document.getElementById('simCryF0'),
                simCryCentroid: !!document.getElementById('simCryCentroid'),
                simCryBadge: !!document.getElementById('simCryBadge'),
                simCryAdvice: !!document.getElementById('simCryAdvice'),
                badgeText: document.getElementById('simCryBadge')?.textContent,
                f0Text: document.getElementById('simCryF0')?.textContent
            })
            """
            elements = await call_eval(3, check_js)
            print("Elements check initial:", json.dumps(elements, indent=2))
            
            # Now set values like Buse did in the screenshot:
            # pitchType = 'burp' (Kesik, Grunt), duration = 20, energy = 'high', lastFeed = 'long'
            interact_js = """
            (function() {
                var p = document.getElementById('simCryPitch');
                var d = document.getElementById('simCryDuration');
                var e = document.getElementById('simCryEnergy');
                var l = document.getElementById('simCryLastFeed');
                if (p) p.value = 'burp';
                if (d) d.value = '20';
                if (e) e.value = 'high';
                if (l) l.value = 'long';
                
                // Now run runCryAudioSimulation()
                runCryAudioSimulation();
                
                return {
                    pitchVal: p?.value,
                    badgeText: document.getElementById('simCryBadge')?.textContent,
                    f0Text: document.getElementById('simCryF0')?.textContent,
                    centText: document.getElementById('simCryCentroid')?.textContent,
                    painText: document.getElementById('simCryPainAlarm')?.textContent,
                    adviceText: document.getElementById('simCryAdvice')?.textContent
                };
            })()
            """
            after = await call_eval(4, interact_js)
            print("After interaction:", json.dumps(after, indent=2, ensure_ascii=False))

    finally:
        proc.terminate()

asyncio.run(test_cry_sim())
