import jwt
payload = {'some': 'stuff'};
blah = jwt.encode(payload, 'secret', algorithm='HS256')

result = jwt.decode(blah, 'secret', algorithm='HS256')
