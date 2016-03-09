import db.category_repository
import db.category

class categories:

    def __init__(self):

       self.category_repository = db.category_repository.category_repository()

    def get_categories(self):

        return [self.get_category_by_id(1)]

    def get_category_by_id(self, id):

        return db.category.category(1, "A", "FIRST CATEGORY")

    def create_category(self, id, code, name):

        category = db.category.category(None, "A", "FIRST")
        return self.category_repository.create(category)

    def update_category(self, id, code, name):

        return db.category.category(id, code, name)