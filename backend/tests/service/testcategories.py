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
        cur.execute("CREATE TEMPORARY SEQUENCE test_item_sequence")
        cur.execute("CREATE TEMPORARY SEQUENCE test_category_sequence")
        cur.execute("select setval('test_item_sequence', (select max(id) from items) + 1)")
        cur.execute("select setval('test_category_sequence', (select max(id) from categories) + 1)")
        cur.execute("ALTER TABLE items ALTER COLUMN id SET DEFAULT nextval('test_item_sequence')")
        cur.execute("ALTER TABLE categories ALTER COLUMN id SET DEFAULT nextval('test_category_sequence')")
        cur.execute("INSERT INTO items (code, name, price, created_on, created_by) values('TEST', 'Test Item', 5.95, NOW(), 1)")
        cur.execute("INSERT INTO categories (code, name, created_by) values('TEST', 'Test Category', 1)")
        cur.execute("INSERT INTO item_categories (item_id, category_id) values((select max(id) from items), (select max(id) from categories))")
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

        from pprint import pprint

        for cat in cats:
            pprint(vars(cat))

        anycategory = cats.pop()

        # Look up the category by id and compare data
        category = self.categoriesService.get_category_by_id(anycategory.id)

        self.assertIsInstance(category, db.category.category)
        self.assertEqual(category.id, anycategory.id)
        self.assertEqual(category.code, anycategory.code)
        self.assertEqual(category.name, anycategory.name)

    def test_create_category(self):
        category = self.categoriesService.create_category("A", "FIRST CATEGORY", 1)
        self.assertIsInstance(category, db.category.category)

    def test_update_category(self):
        category = self.categoriesService.update_category(1, "TEST2", "Test Category2", 1)
        self.assertIsInstance(category, db.category.category)

    def test_delete_category(self):
        self.categoriesService.delete_category(1, 1)

if __name__ == '__main__':
    unittest.main()
