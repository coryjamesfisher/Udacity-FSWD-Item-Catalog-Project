REST API
==================================================

Authentication
--------------------------------------
OAuth 2.0 Specification

Standard Conventions
--------------------------------------
HTTP 1.1 Specification

Endpoint Documentation
--------------------------------------
**Authentication**

POST /service/rest/v1/auth/sso/{provider_id}/auth_or_register  
POST /service/rest/v1/auth/sso/{provider_id}/auth  
POST /service/rest/v1/auth/sso/{provider_id}/register  
```bash
curl -XPOST --data "auth_token=abcd1234" http://localhost:8080/service/rest/v1/auth/sso/1/auth_or_register
curl -XPOST --data "auth_token=abcd1234" http://localhost:8080/service/rest/v1/auth/sso/1/auth
curl -XPOST --data "auth_token=abcd1234" http://localhost:8080/service/rest/v1/auth/sso/1/register
```

**Categories**

GET /service/rest/v1/categories
```bash
curl -XGET http://localhost:8080/service/rest/v1/categories
```
GET /service/rest/v1/categories/{category_id}
```bash
curl -XGET http://localhost:8080/service/rest/v1/categories/1
```
POST /service/rest/v1/categories
```bash
curl -XPOST --data "name=First+Category" http://localhost:8080/service/rest/v1/categories
```
PUT /service/rest/v1/categories/{category_id}
```bash
curl -XPUT --data "name=First+Category" http://localhost:8080/service/rest/v1/categories/1
```


**Items**

GET /service/rest/v1/items
```bash
curl -XGET http://localhost:8080/service/rest/v1/items
```
GET /service/rest/v1/items/{item_id}
```bash
curl -XGET http://localhost:8080/service/rest/v1/items/1
```
GET /service/rest/v1/items/categories/{category_id}
```bash
curl -XGET http://localhost:8080/service/rest/v1/items/categories/1
```
POST /service/rest/v1/items
```bash
curl -XPOST --data "name=First+Item&code=A" http://localhost:8080/service/rest/v1/items
```
PUT /service/rest/v1/items/{item_id}
```bash
curl -XPUT --data "name=First+Item&code=A" http://localhost:8080/service/rest/v1/items/1
```

