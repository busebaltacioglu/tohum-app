with open(r'C:\Users\busenur.baltacioglu\.gemini\antigravity\scratch\tohum-app\public\komuta_merkezi.html', encoding='utf-8') as f:
    text = f.read()

# Check curly braces in script tag
scripts = text.split('<script')[1:]
for i, s in enumerate(scripts):
    code = s.split('</script>')[0]
    open_c = code.count('{')
    close_c = code.count('}')
    open_p = code.count('(')
    close_p = code.count(')')
    print(f"Script {i+1}: {{ {open_c}/{close_c} }} | ( {open_p}/{close_p} )")
