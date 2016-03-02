#!/usr/bin/python
from flask import Flask, jsonify

# DATABASE = '/tmp/item_catalog.db'
# DEBUG = True
# SECRET_KEY = 'somedevkey'
# USERNAME = 'admin'
# PASSWORD = 'default'

app = Flask(__name__)

@app.route('/')
def index():
	return "Hello, Cory!"

if __name__ == '__main__':
	app.run(debug=True)
