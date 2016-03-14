from flask import Blueprint, request
import service.items
import util

items_rest = Blueprint('items_rest', __name__)

@items_rest.route('/rest/v1/items', methods = ['GET'])
def get_items():
    itemService = service.items.items()
    return util.rest_format(itemService.get_items())

@items_rest.route('/rest/v1/items/<int:item_id>', methods = ['GET'])
def get_item_by_id(item_id):
    itemService = service.items.items()
    return util.rest_format(itemService.get_item_by_id(item_id))

@items_rest.route('/rest/v1/items/category/<int:category_id>', methods = ['GET'])
def get_items_by_category(category_id):
    itemService = service.items.items()
    return util.rest_format(itemService.get_items_by_category(category_id))

@items_rest.route('/rest/v1/items', methods = ['POST'])
def create_item():
    itemService = service.items.items()
    return util.rest_format(itemService.create_item(request.json['code'], request.json['name'], request.json['price'], request.json['categories']))

@items_rest.route('/rest/v1/items/<int:item_id>', methods = ['PUT'])
def update_item(item_id):
    itemService = service.items.items()
    return util.rest_format(itemService.update_item(item_id, request.json['code'], request.json['name'], request.json['price'], request.json['categories']))