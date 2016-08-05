from flask import Blueprint, request
import service.categories
import util
import psycopg2
import service.security

categories_rest = Blueprint('categories_rest', __name__)
security = service.security.security()
conn = psycopg2.connect("dbname='main' user='serviceuser' password='serviceuser' host='localhost'")

@categories_rest.route('/rest/v1/categories', methods = ['GET'])
def get_categories():
    categoryService = service.categories.categories(conn)
    return util.rest_format(categoryService.get_categories())

@categories_rest.route('/rest/v1/categories/<int:category_id>', methods = ['GET'])
def get_category_by_id(category_id):
    categoryService = service.categories.categories(conn)
    return util.rest_format(categoryService.get_category_by_id(category_id))

@categories_rest.route('/rest/v1/categories', methods = ['POST'])
@security.authorized()
def create_category():
    categoryService = service.categories.categories(conn)
    return util.rest_format(categoryService.create_category(request.json['code'], request.json['name'], security.getUserId()))

@categories_rest.route('/rest/v1/categories/<int:category_id>', methods = ['PUT'])
@security.authorized()
def update_category(category_id):
    categoryService = service.categories.categories(conn)
    return util.rest_format(categoryService.update_category(category_id, request.json['code'], request.json['name']))
