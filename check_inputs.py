import json, sys
sys.stdout.reconfigure(encoding='utf-8')
with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\brain\27a6a50d-7f77-45af-8ab5-727f2d31b297\.system_generated\logs\transcript.jsonl', encoding='utf-8') as f:
    lines = f.readlines()
user_inputs = []
for l in lines:
    try:
        d = json.loads(l)
        if d.get('source') == 'USER_EXPLICIT':
            user_inputs.append(d)
    except:
        pass

print(f"Total user inputs: {len(user_inputs)}")
for d in user_inputs[-10:]:
    content = d.get('content', '')
    media = [m.get('uri') for m in d.get('media', [])]
    print(f"Step {d.get('step_index')}: {repr(content[:80])} | Media: {media}")
