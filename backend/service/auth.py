import service.google
#import service.facebook
import jwt

class auth:

    def __init__(self, conn):
       self.conn = conn

    def authenticate(self, auth_code, provider):
        provider = self.providerFactory(provider)
        user = provider.auth(auth_code)

        token = auth.generateToken(user)
        return token

    def register(self, auth_code, provider):
        provider = self.providerFactory(provider)
        user = provider.register(auth_code)
	token = auth.generateToken(user)
	return token

    def providerFactory(self, provider):
        if (provider == "google"):
            return service.google.google(self.conn)

        if (provider == "facebook"):
            print "Facebook not implemented"
            #return service.facebook.facebook(self.conn)

        raise ValueError("Invalid sso provider")

    @staticmethod
    def generateToken(user):
        # return hs256(base64encode('{"alg":"hs256"}') + '.' + base64encode('{"iss": "classycoders.com"}') + '.' + base64encode('myspecialkey1234'))
        return jwt.encode({'iss': 'classycoders', 'sub': user.id}, 'classycoders-secretkey', algorithm='HS256')

    @staticmethod
    def parseToken(token):

        token = token.replace('Bearer ', '')
        return jwt.decode(token, 'classycoders-secretkey', algorithm='HS256')
