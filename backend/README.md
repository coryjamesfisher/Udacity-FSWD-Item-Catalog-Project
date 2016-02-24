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

POST /service/rest/v1/oauth2
```bash
curl -XPOST --data "username=test&password=test" http://localhost:8080/service/rest/v1/oauth2
```

**Categories**

GET /service/rest/v1/categories
```bash
curl -XGET http://localhost:8080/service/rest/v1/categories
```
GET /service/rest/v1/categories/{category_code}
```bash
curl -XGET http://localhost:8080/service/rest/v1/categories/A1
```
POST /service/rest/v1/categories/{category_code}
```bash
curl -XPOST --data "name=First+Category" http://localhost:8080/service/rest/v1/categories/A1
```

**Items**

GET /service/rest/v1/items
```bash
curl -XGET http://localhost:8080/service/rest/v1/items
```
GET /service/rest/v1/items/{item_code}
```bash
curl -XGET http://localhost:8080/service/rest/v1/items/1
```
GET /service/rest/v1/items/categories/{category_code}
```bash
curl -XGET http://localhost:8080/service/rest/v1/items/categories/A1
```
POST /service/rest/v1/items/{item_code}
```bash
curl -XPOST --data "name=First+Item&image=https%3A%2F%2Fwww.google.com%2Fimages%2Fbranding%2Fgooglelogo%2F2x%2Fgooglelogo_color_272x92dp.png" http://localhost:8080/service/rest/v1/items/A1
```

