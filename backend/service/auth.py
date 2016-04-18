import service.google
import service.facebook

class auth:

    def __init__(self, conn):
       self.google = service.google.google(conn)
       self.facebook = service.facebook.facebook(conn)

    def register_or_sign_in(self, auth_code, provider):

	if (provider == "google"):
            return self.google.auth(auth_code)

        if (provider == "facebook"):
            return self.facebook.auth(auth_code)

        raise ValueError("Invalid sso provider")
