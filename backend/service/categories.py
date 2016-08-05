import db.category_repository
import db.category

class categories:

    def __init__(self, conn):
       self.category_repository = db.category_repository.category_repository(conn)

    def get_categories(self):
        return self.category_repository.get_all()

    def get_category_by_id(self, id):
        return self.category_repository.get_by_id(id)

    def create_category(self, code, name, created_by):
        category = db.category.category(None, code, name, created_by)
        return self.category_repository.create(category)

    def update_category(self, id, code, name, updater_user_id):
        #@todo this is busted
        return db.category.category(id, code, name, updater_user_id)

    def delete_category(self, id, updater_user_id):
        category = self.category_repository.get_by_id(id)

        if category.created_by != updater_user_id:
            raise ValueError("You do not have permission to update this category.")

        self.category_repository.delete(id)