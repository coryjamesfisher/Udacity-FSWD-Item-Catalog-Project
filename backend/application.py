#!/usr/bin/python
from flask import Flask, jsonify
from rest import categories, items, auth
from client import sample

# DATABASE = '/tmp/item_catalog.db'
# DEBUG = True
# SECRET_KEY = 'somedevkey'
# USERNAME = 'admin'
# PASSWORD = 'default'

app = Flask(__name__)

app.register_blueprint(auth.auth_rest)
app.register_blueprint(categories.categories_rest)
app.register_blueprint(items.items_rest)
app.register_blueprint(sample.client_rest)

if __name__ == '__main__':
	app.run(debug=True, host='0.0.0.0', port=8080)
