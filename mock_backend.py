import json
from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse

class MockBackendHandler(BaseHTTPRequestHandler):
    def _set_headers(self, status_code=200):
        self.send_response(status_code)
        self.send_header('Content-type', 'application/json')
        # Allow CORS
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(200)

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data.decode('utf-8'))

        if self.path == '/generate/from-code':
            filename = data.get('filename', 'unknown.py')
            code = data.get('code', '')
            response_data = [
                {
                    "filename": filename,
                    "markdown": f"## Overview\nThis is a mock documentation for `{filename}` generated from raw code.\n\n## Key Components\n- Mock function: Does something.\n\n## Code Snippet\n```python\n{code[:100]}...\n```"
                }
            ]
            self._set_headers(200)
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
            
        elif self.path == '/generate/from-pr':
            pr_url = data.get('pr_url', '')
            response_data = [
                {
                    "filename": "mock_file_1.py",
                    "markdown": f"## Overview\nMock docs for file 1 from PR: {pr_url}\n\n## Key Components\n- `foo()`: Foo function."
                },
                {
                    "filename": "mock_file_2.py",
                    "markdown": f"## Overview\nMock docs for file 2 from PR: {pr_url}\n\n## Key Components\n- `bar()`: Bar function."
                }
            ]
            self._set_headers(200)
            self.wfile.write(json.dumps(response_data).encode('utf-8'))
            
        else:
            self._set_headers(404)
            self.wfile.write(json.dumps({"detail": "Not Found"}).encode('utf-8'))

def run(server_class=HTTPServer, handler_class=MockBackendHandler, port=8000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f'Starting mock backend on port {port}...')
    httpd.serve_forever()

if __name__ == '__main__':
    run()
