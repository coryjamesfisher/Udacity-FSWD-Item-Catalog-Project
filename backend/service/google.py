import json
import httplib2
from oauth2client import client
import db.user_repository

class google:

    def __init__(self, conn):
       self.userService = service.users.users(conn)

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


       http = httplib2.Http()
       credentials.authorize(http)
       resp, content = http.request("https://www.googleapis.com/oauth2/v2/userinfo", "GET")
       user_info = json.loads(content)

       user = self.userService.findByGoogleUserId(user_info["id"])

       if (user):
           return user

       # @todo create service.users.users create & findByGoogleUserId methods
       return self.userService.create(user_info["email"], user_info["given_name"], user_info["family_name"], user_info["id"], None) 
