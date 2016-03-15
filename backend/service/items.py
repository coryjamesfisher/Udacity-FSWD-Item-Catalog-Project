import db.item_repository
import db.item

class items:

    def __init__(self, conn):
       self.item_repository = db.item_repository.item_repository(conn)

    def get_items(self):
        return self.item_repository.get_all()

    def get_items_by_category(self, category_id):
        return self.item_repository.get_all_by_category(category_id);

    def get_item_by_id(self, id):
        return self.item_repository.get_by_id(id)

    def create_item(self, code, name, price, categories):
        item = db.item.item(None, code, name, price, None, categories)
        return self.item_repository.create(item)

    def update_item(self, id, code, name, price, categories):
        item = db.item.item(id, code, name, price, categories)
        return self.item_repository.update(item)