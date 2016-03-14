from flask import Blueprint, request
import service.categories
import json
import util

categories_rest = Blueprint('categories_rest', __name__)

@categories_rest.route('/rest/v1/categories', methods = ['GET'])
def get_categories():
    categoryService = service.categories.categories()
    return util.rest_format(categoryService.get_categories())

@categories_rest.route('/rest/v1/categories/<int:category_id>', methods = ['GET'])
def get_category_by_id(category_id):
    categoryService = service.categories.categories()
    return util.rest_format(categoryService.get_category_by_id(category_id))

@categories_rest.route('/rest/v1/categories', methods = ['POST'])
def create_category():
    categoryService = service.categories.categories()
    return util.rest_format(categoryService.create_category(request.json['code'], request.json['name']))

@categories_rest.route('/rest/v1/categories/<int:category_id>', methods = ['PUT'])
def update_category(category_id):
    categoryService = service.categories.categories()
    return util.rest_format(categoryService.update_category(category_id, request.json['code'], request.json['name']))