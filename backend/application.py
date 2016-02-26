import sqlite3
from flask import Flask, request, session, g, redirect, url_for, \
	abort, render_template, flash

DATABASE = '/tmp/item_catalog.db'
DEBUG = True
SECRET_KEY = 'somedevkey'
USERNAME = 'admin'
PASSWORD = 'default'

app = Flask(__name__)
app.config.from_object(__name__)
