import db.category

class categories:

    def __init__(self):

        # Inject database here
        self.db_connection = ""

    def get_categories(self):

        return [self.get_category_by_code("1")]

    def get_category_by_code(self, category_code):

        return db.category.category("1", "FIRST CATEGORY")

    def create_category(self, code, name):

        return db.category.category(code, name)