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
POST /service/rest/v1/oauth2
GET /service/rest/v1/categories
GET /service/rest/v1/categories/{category_code}
GET /service/rest/v1/items
GET /service/rest/v1/items/{item_code}
GET /service/rest/v1/items/categories/{category_code}

Examples
--------------------------------------
curl -XPOST --data "username=test&password=test" http://localhost:8080/service/rest/v1/oauth2
