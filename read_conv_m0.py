import os, json, sys
sys.stdout.reconfigure(encoding='utf-8')

conv_id = '235ca72a-c3d9-4d21-a1c3-c03b4171d201'
log_path = os.path.join(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\brain', conv_id, r'.system_generated\logs\transcript.jsonl')
with open(log_path, 'r', encoding='utf-8') as f:
    for line in f:
        try:
            d = json.loads(line)
            content = d.get('content', '')
            if 'M0' in content and d.get('source') == 'USER_EXPLICIT':
                s_idx = d.get('step_index')
                clean = content.replace('\n', ' ')
                print(f"Step {s_idx}: {clean[:140]}")
        except:
            pass
