import http.server
import os
import webbrowser

PORT = 8080
DIRECTORY = os.path.join(os.path.dirname(__file__), 'public')

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        # Disable caching so changes are immediately visible
        self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

if __name__ == '__main__':
    print(f"ToHUM Canli Web Sunucusu Baslatiliyor...")
    print(f"URL: http://localhost:{PORT}")
    try:
        httpd = http.server.ThreadingHTTPServer(("", PORT), Handler)
        print(f"Sunucu aktif! http://localhost:{PORT}")
        httpd.serve_forever()
    except Exception as e:
        print(f"Sunucu hatasi: {e}")
