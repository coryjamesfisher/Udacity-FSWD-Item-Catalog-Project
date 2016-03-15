import unittest
import service.categories
import db.category
import psycopg2

class TestCategories(unittest.TestCase):

    def setUp(self):
        self.conn = psycopg2.connect("dbname='main' user='serviceuser' password='serviceuser' host='localhost'")
        cur = self.conn.cursor()
        cur.execute("CREATE TEMPORARY TABLE items as SELECT * FROM items;")
        cur.execute("CREATE TEMPORARY TABLE categories as SELECT * FROM categories;")
        cur.execute("CREATE TEMPORARY TABLE item_categories as SELECT * FROM item_categories;")
        cur.close()
        self.conn.commit()

        self.categoriesService = service.categories.categories(self.conn)

    def tearDown(self):
        self.conn.close()

    def test_get_all_categories(self):
        categories = self.categoriesService.get_categories()
        self.assertIsInstance(categories, list)

    def test_get_category_by_id(self):

        # Get any category
        cats =  self.categoriesService.get_categories()
        anycategory = cats.pop()

        # Look up the category by id and compare data
        category = self.categoriesService.get_category_by_id(anycategory.id)
        self.assertIsInstance(category, db.category.category)
        self.assertEqual(category.id, anycategory.id)
        self.assertEqual(category.code, anycategory.code)
        self.assertEqual(category.name, anycategory.name)

    def test_create_category(self):
        category = self.categoriesService.create_category("A", "FIRST CATEGORY")
        self.assertIsInstance(category, db.category.category)

    def test_update_category(self):
        category = self.categoriesService.update_category(1, "A", "FIRST CATEGORY")
        self.assertIsInstance(category, db.category.category)

if __name__ == '__main__':
    unittest.main()