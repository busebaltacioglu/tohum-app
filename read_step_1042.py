import os, json, sys
sys.stdout.reconfigure(encoding='utf-8')

conv_id = '235ca72a-c3d9-4d21-a1c3-c03b4171d201'
log_path = os.path.join(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\brain', conv_id, r'.system_generated\logs\transcript.jsonl')
with open(log_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

for line in lines:
    d = json.loads(line)
    if d.get('step_index') in [1040, 1041, 1042, 1043, 1044, 1045]:
        content = d.get('content', '')
        print(f"--- Step {d.get('step_index')} ({d.get('source')} / {d.get('type')}) ---")
        print(content[:1500])
