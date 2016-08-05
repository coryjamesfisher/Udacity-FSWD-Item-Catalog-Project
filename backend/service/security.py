# @todo move this into a security package
# get rid of user role and just check if user exists
# add created_by to category & item
# add additional security to those services
import service.auth
from flask import request
from functools import wraps

class security:
    def authorized(self, *params):
        def wrapper(f):
            @wraps(f)
            def wrapped(*args, **kwargs):

                token = request.headers.get('Authorization')
                if token is None or token is False or token == "":
                    return "Please log in to perform this function."

                # If there is a sub(user id) then the user is authenticated
                token = service.auth.auth.parseToken(token)
                if type(token) is not dict or 'sub' not in token or token['sub'] == "":
                    return "User not authorized"

                return f(*args, **kwargs)
            return wrapped
        return wrapper

    def matchUser(self, userId):
        token = request.headers.get('Authorization')
        token = service.auth.auth.parseToken(token)

        if token['sub'] != userId:
            raise Exception('You do not have permission to perform this update.')

    def getUserId(self):
        token = request.headers.get('Authorization')
        token = service.auth.auth.parseToken(token)
        return token['sub']