from flask import Blueprint, request
import service.categories
import json

categories_rest = Blueprint('categories_rest', __name__)

@categories_rest.route('/rest/v1/categories', methods = ['GET'])
def get_categories():
    categoryService = service.categories.categories()
    return json.dumps([ob.__dict__ for ob in categoryService.get_categories()])

@categories_rest.route('/rest/v1/categories/<int:category_id>', methods = ['GET'])
def get_category_by_id(category_id):
    categoryService = service.categories.categories()
    return json.dumps(categoryService.get_category_by_id(category_id).__dict__)

@categories_rest.route('/rest/v1/categories/<int:category_id>', methods = ['POST'])
def create_category(category_id):
    categoryService = service.categories.categories()
    return json.dumps(categoryService.create_category(category_id, request.json['code'], request.json['name']).__dict__)

@categories_rest.route('/rest/v1/categories/<int:category_id>', methods = ['PUT'])
def update_category(category_id):
    categoryService = service.categories.categories()
    return json.dumps(categoryService.update_category(category_id, request.json['code'], request.json['name']).__dict__)