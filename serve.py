import http.server
import socketserver
import os
import webbrowser

PORT = 8080
DIRECTORY = os.path.join(os.path.dirname(__file__), 'public')

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

print(f"ToHUM Canlı Web Simülatörü Başlatılıyor...")
print(f"URL: http://localhost:{PORT}")

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Sunucu aktif! Tarayıcınızda açılıyor...")
        webbrowser.open(f"http://localhost:{PORT}")
        httpd.serve_forever()
except Exception as e:
    print(f"Sunucu hatası: {e}")