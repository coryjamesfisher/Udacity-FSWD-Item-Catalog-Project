import db.item

class items:

    def __init__(self):
        # Inject database here
        self.db_connection = ""

    def get_items(self):
        return [self.get_item_by_id(1)]

    def get_items_by_category(self, category_code):
        return [self.get_item_by_id(1)]

    def get_item_by_id(self, id):
        return db.item.item(id, "A", "FIRST ITEM", 1.00, ["1"])

    def create_item(self, code, name, price, categories):
        # todo remove 1 as item id (pretending to be autoinc)
        return db.item.item(1, code, name, price, categories)

    def update_item(self, id, code, name, price, categories):
        return db.item.item(id, code, name, price, categories)