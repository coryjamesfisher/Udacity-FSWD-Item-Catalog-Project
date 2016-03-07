#!/usr/bin/python
from flask import Flask, jsonify
from rest import categories

# DATABASE = '/tmp/item_catalog.db'
# DEBUG = True
# SECRET_KEY = 'somedevkey'
# USERNAME = 'admin'
# PASSWORD = 'default'

app = Flask(__name__)

app.register_blueprint(categories.categories_rest)

if __name__ == '__main__':
	app.run(debug=True)
