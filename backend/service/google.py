import json
from oauth2client import client
import db.user_repository

class google:

    def __init__(self, conn):
       self.user_repository = db.user_repository.user_repository(conn)

    def register_or_sign_in(self, auth_code):
       flow = client.flow_from_clientsecrets(
           'config/google_sso.json',
           scope='profile email',
           redirect_uri='http://localhost/sso?provider=google')

       if (auth_code == ""):
           print flow.step1_get_authorize_url()
           auth_code = input('Enter auth code:')

       if (len(auth_code) == 0):
           raise ValueError('Please enter an authorization code')

       credentials = flow.step2_exchange(auth_code)
       credentials = credentials.to_json()


       json.dumps(credentials)
       print credentials
