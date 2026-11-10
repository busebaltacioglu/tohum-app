import sys
sys.stdout.reconfigure(encoding='utf-8')
import subprocess, time, urllib.request, json, asyncio
import websockets

async def test_mamagent():
    edge = r'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe'
    proc = subprocess.Popen([edge, '--headless=new', '--remote-debugging-port=9231', 'http://localhost:8080/komuta_merkezi.html'])
    time.sleep(2)
    try:
        res = urllib.request.urlopen('http://localhost:9231/json').read()
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
                        return d.get('result', {}).get('result', {}).get('value')
            
            # 1. Open mamagent_capstone report
            await call_eval(2, "openDatasetReport('mamagent_capstone')")
            await asyncio.sleep(0.3)
            
            # 2. Check modal title and elements
            init_check = await call_eval(3, """
            ({
                modalTitle: document.getElementById('reportModalTitle')?.textContent,
                modalDomain: document.getElementById('reportModalDomainBadge')?.textContent,
                badgeText: document.getElementById('simMamConsensusBadge')?.textContent,
                matVal: document.getElementById('simMamMatVal')?.textContent,
                infVal: document.getElementById('simMamInfVal')?.textContent,
                kovVal: document.getElementById('simMamKovVal')?.textContent,
                prob: document.getElementById('simMamProb')?.textContent,
                stability: document.getElementById('simMamStabilityScore')?.textContent
            })
            """)
            print("1. Initial Modal State:")
            print(json.dumps(init_check, indent=2, ensure_ascii=False))
            
            # 3. Test Scenario A: Isolated Infant Colic
            scen_a = await call_eval(4, """
            (function() {
                document.getElementById('simMamInfant').value = 'colic';
                runMamAgentSimulation();
                return {
                    badge: document.getElementById('simMamConsensusBadge')?.textContent,
                    infVal: document.getElementById('simMamInfVal')?.textContent,
                    prob: document.getElementById('simMamProb')?.textContent,
                    advice: document.getElementById('simMamAdviceText')?.textContent
                };
            })()
            """)
            print("\n2. Scenario A (Isolated Infant Colic):")
            print(json.dumps(scen_a, indent=2, ensure_ascii=False))

            # 4. Test Scenario B: Dual Agent Alert (Maternal Risk + Infant Growth Slow) -> OR = 423.28!
            scen_b = await call_eval(5, """
            (function() {
                document.getElementById('simMamMaternal').value = 'risk';
                document.getElementById('simMamInfant').value = 'growth_slow';
                runMamAgentSimulation();
                return {
                    badge: document.getElementById('simMamConsensusBadge')?.textContent,
                    matVal: document.getElementById('simMamMatVal')?.textContent,
                    infVal: document.getElementById('simMamInfVal')?.textContent,
                    prob: document.getElementById('simMamProb')?.textContent,
                    stability: document.getElementById('simMamStabilityScore')?.textContent,
                    advice: document.getElementById('simMamAdviceText')?.textContent,
                    clinician: document.getElementById('simMamClinicianSummary')?.textContent
                };
            })()
            """)
            print("\n3. Scenario B (Dual Agent Alert - Maternal PPD + Infant Growth Slow):")
            print(json.dumps(scen_b, indent=2, ensure_ascii=False))

            # 5. Test Scenario C: 3 Agents Critical
            scen_c = await call_eval(6, """
            (function() {
                document.getElementById('simMamMaternal').value = 'critical';
                document.getElementById('simMamInfant').value = 'critical';
                document.getElementById('simMamKovan').value = 'hazard';
                runMamAgentSimulation();
                return {
                    badge: document.getElementById('simMamConsensusBadge')?.textContent,
                    prob: document.getElementById('simMamProb')?.textContent,
                    stability: document.getElementById('simMamStabilityScore')?.textContent,
                    advice: document.getElementById('simMamAdviceText')?.textContent
                };
            })()
            """)
            print("\n4. Scenario C (Critical 3-Agent Alert):")
            print(json.dumps(scen_c, indent=2, ensure_ascii=False))

    finally:
        proc.terminate()

asyncio.run(test_mamagent())
