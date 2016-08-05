from flask import Blueprint, request
import service.auth
import util
import psycopg2

auth_rest = Blueprint('auth_rest', __name__)
conn = psycopg2.connect("dbname='main' user='serviceuser' password='serviceuser' host='localhost'")

@auth_rest.route('/rest/v1/auth/sso/<string:provider>/auth_or_register', methods = ['POST'])
def auth_or_register(provider):
    authService = service.auth.auth(conn)
    token = authService.auth_or_register(request.json['auth_token'], provider)
    return '{"token": "' + token + '"}'

@auth_rest.route('/rest/v1/auth/sso/<string:provider>/auth', methods = ['POST'])
def authenticate(provider):
    authService = service.auth.auth(conn)
    token = authService.authenticate(request.json['auth_token'], provider)
    return '{"token": "' + token + '"}'

@auth_rest.route('/rest/v1/auth/sso/<string:provider>/register', methods = ['POST'])
def register(provider):
    authService = service.auth.auth(conn)
    token = authService.register(request.json['auth_token'], provider)
    return '{"token": "' + token + '"}'
