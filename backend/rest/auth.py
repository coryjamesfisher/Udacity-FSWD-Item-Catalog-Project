from flask import Blueprint, request
import service.auth
import util
import psycopg2

auth_rest = Blueprint('auth_rest', __name__)
conn = psycopg2.connect("dbname='main' user='serviceuser' password='serviceuser' host='localhost'")

@auth_rest.route('/rest/v1/auth/sso/{provider}/auth', methods = ['POST'])
def authenticate(provider):
    authService = service.auth.auth(conn)
    return util.rest_format(authService.authenticate(request.json['auth_token'], provider))

@auth_rest.route('/rest/v1/auth/sso/{provider}/register', methods = ['POST'])
def register(provider):
    authService = service.auth.auth(conn)
    return util.rest_format(authService.register(request.json['auth_token'], provider))
