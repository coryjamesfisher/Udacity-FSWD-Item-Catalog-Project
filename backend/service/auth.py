import service.google
import service.facebook

class auth:

    def __init__(self, conn):
       self.conn = conn

    def authenticate(self, auth_code, provider):

	provider = self.providerFactory(provider)
        return provider.auth(auth_code)

    def register(self, auth_code, provider):
        provider = self.providerFactory(provider)
        return provider.register(auth_code)

    def providerFactory(provider):
	if (provider == "google"):
            return service.google.google(conn)

        if (provider == "facebook"):
            return service.facebook.facebook(conn)

        raise ValueError("Invalid sso provider")

