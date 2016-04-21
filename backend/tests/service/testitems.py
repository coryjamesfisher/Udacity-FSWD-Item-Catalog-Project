import unittest
import service.items
import db.item
import psycopg2

class TestItems(unittest.TestCase):

    def setUp(self):
        self.conn = psycopg2.connect("dbname='main' user='serviceuser' password='serviceuser' host='localhost'")
        cur = self.conn.cursor()
        cur.execute("CREATE TEMPORARY TABLE items as SELECT * FROM items;")
        cur.execute("CREATE TEMPORARY TABLE categories as SELECT * FROM categories;")
        cur.execute("CREATE TEMPORARY TABLE item_categories as SELECT * FROM item_categories;")
	cur.execute("INSERT INTO items (id, code, name, price, created_on) values(1, 'TEST', 'Test Item', 5.95, NOW())") 
	cur.execute("INSERT INTO categories (id, code, name) values(1, 'TEST', 'Test Category')") 
	cur.execute("INSERT INTO item_categories (item_id, category_id) values(1, 1)") 
        cur.close()
        self.conn.commit()

        self.itemsService = service.items.items(self.conn)

    def tearDown(self):
        self.conn.close()

    def test_create_item(self):
        item = self.itemsService.create_item("A", "FIRST ITEM", 1.00, [1])
        self.assertIsInstance(item, db.item.item)

    def test_get_all_items(self):
        items = self.itemsService.get_items()
        self.assertIsInstance(items, list)

    def test_get_item_by_id(self):
        item = self.itemsService.get_item_by_id(1)
        self.assertIsInstance(item, db.item.item)

    def test_get_items_by_category(self):
        items = self.itemsService.get_items_by_category(1)
        self.assertIsInstance(items, list)

if __name__ == '__main__':
    unittest.main()
