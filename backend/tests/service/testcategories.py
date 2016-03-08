import unittest
import service.categories
import db.category

class TestCategories(unittest.TestCase):

    def setUp(self):
        self.categoriesService = service.categories.categories()

    def test_get_all_categories(self):
        categories = self.categoriesService.get_categories()
        self.assertIsInstance(categories, list)

    def test_get_category_by_code(self):
        category = self.categoriesService.get_category_by_code("1")
        self.assertIsInstance(category, db.category.category)
        self.assertEquals("1", category.code)
        self.assertEquals("FIRST CATEGORY", category.name)

    def test_create_category(self):
        category = self.categoriesService.create_category("1", "FIRST CATEGORY")
        self.assertIsInstance(category, db.category.category)

    def test_update_category(self):
        category = self.categoriesService.update_category("1", "FIRST CATEGORY")
        self.assertIsInstance(category, db.category.category)

if __name__ == '__main__':
    unittest.main()