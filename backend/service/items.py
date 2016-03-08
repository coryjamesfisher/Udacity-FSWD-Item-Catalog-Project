import db.item

class items:

    def __init__(self):
        # Inject database here
        self.db_connection = ""

    def get_items(self):
        return [self.get_item_by_code(1)]

    def get_items_by_category(self, category_code):
        return [self.get_item_by_code(1)]

    def get_item_by_code(self, code):
        return db.item.item(code, "FIRST ITEM", 1.00, ["1"])

    def create_item(self, code, name, price, categories):
        return db.item.item(code, name, price, categories)

    def update_item(self, code, name, price, categories):
        return db.item.item(code, name, price, categories)