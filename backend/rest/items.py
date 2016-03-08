from flask import Blueprint, request
import service.items
import json

items_rest = Blueprint('items_rest', __name__)

@items_rest.route('/rest/v1/items', methods = ['GET'])
def get_items():
    itemService = service.items.items()
    return json.dumps([ob.__dict__ for ob in itemService.get_items()])

@items_rest.route('/rest/v1/items/<string:item_code>', methods = ['GET'])
def get_item_by_code(item_code):
    itemService = service.items.items()
    return json.dumps(itemService.get_item_by_code(item_code).__dict__)

@items_rest.route('/rest/v1/items/categories/<string:category_code>', methods = ['GET'])
def get_items_by_category(category_code):
    itemService = service.items.items()
    return json.dumps(itemService.get_items_by_category(category_code).__dict__)

@items_rest.route('/rest/v1/items/<string:item_code>', methods = ['POST'])
def create_item(item_code):
    itemService = service.items.items()
    return json.dumps(itemService.create_item(item_code, request.json['name'], request.json['price'], request.json['categories']).__dict__)

@items_rest.route('/rest/v1/items/<string:item_code>', methods = ['PUT'])
def update_item(item_code):
    itemService = service.items.items()
    return json.dumps(itemService.update_item(item_code, request.json['name'], request.json['price'], request.json['categories']).__dict__)