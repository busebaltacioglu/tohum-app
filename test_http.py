# -*- coding: utf-8 -*-
import urllib.request

req = urllib.request.Request('http://localhost:8080/komuta_merkezi.html')
with urllib.request.urlopen(req) as resp:
    code = resp.getcode()
    content = resp.read().decode('utf-8')
    print('HTTP status code:', code)
    print('Content length:', len(content))
    print('UCI in modal:', "'uci_maternal': {" in content)
    print('Simulator in modal:', "id=\"simResultBox\"" in content)
