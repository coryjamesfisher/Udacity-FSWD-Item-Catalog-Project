from flask import Blueprint, jsonify
import service.categories
import json

categories_rest = Blueprint('categories_rest', __name__)

@categories_rest.route('/rest/v1/categories', methods = ['GET'])
def get_categories():
    categoryService = service.categories.categories()
    return json.dumps([ob.__dict__ for ob in categoryService.get_categories()])

@categories_rest.route('/rest/v1/categories/<string:category_code>', methods = ['GET'])
def get_category_by_code(category_code):
    categoryService = service.categories.categories()
    return json.dumps(categoryService.get_category_by_code(category_code).__dict__)