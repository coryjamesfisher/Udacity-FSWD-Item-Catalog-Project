from flask import Blueprint, request
import service.items
import json

items_rest = Blueprint('items_rest', __name__)

@items_rest.route('/rest/v1/items', methods = ['GET'])
def get_items():
    itemService = service.items.items()
    return json.dumps([ob.__dict__ for ob in itemService.get_items()])

@items_rest.route('/rest/v1/items/<int:item_id>', methods = ['GET'])
def get_item_by_id(item_id):
    itemService = service.items.items()
    return json.dumps(itemService.get_item_by_code(item_id).__dict__)

@items_rest.route('/rest/v1/items/categories/<int:category_id>', methods = ['GET'])
def get_items_by_category(category_id):
    itemService = service.items.items()
    return json.dumps(itemService.get_items_by_category(category_id).__dict__)

@items_rest.route('/rest/v1/items', methods = ['POST'])
def create_item():
    itemService = service.items.items()
    return json.dumps(itemService.create_item(request.json['code'], request.json['name'], request.json['price'], request.json['categories']).__dict__)

@items_rest.route('/rest/v1/items/<int:item_id>', methods = ['PUT'])
def update_item(item_id):
    itemService = service.items.items()
    return json.dumps(itemService.update_item(item_id, request.json['code'], request.json['name'], request.json['price'], request.json['categories']).__dict__)