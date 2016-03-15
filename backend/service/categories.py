import db.category_repository
import db.category

class categories:

    def __init__(self, conn):
       self.category_repository = db.category_repository.category_repository(conn)

    def get_categories(self):
        return self.category_repository.get_all()

    def get_category_by_id(self, id):
        return self.category_repository.get_by_id(id)

    def create_category(self, code, name):
        category = db.category.category(None, code, name)
        return self.category_repository.create(category)

    def update_category(self, id, code, name):
        return db.category.category(id, code, name)