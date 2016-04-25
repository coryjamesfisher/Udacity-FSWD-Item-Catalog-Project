#!/usr/bin/python

import SimpleHTTPServer
import SocketServer
import os

# Serve the htdocs dir
os.chdir("htdocs")

PORT = 8000
Handler = SimpleHTTPServer.SimpleHTTPRequestHandler
httpd = SocketServer.TCPServer(("", PORT), Handler)

print "serving at port", PORT
httpd.serve_forever()
