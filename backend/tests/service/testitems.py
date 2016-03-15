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
        cur.close()
        self.conn.commit()

        self.itemsService = service.items.items(self.conn)

    def tearDown(self):
        self.conn.close()

    def test_get_all_items(self):
        items = self.itemsService.get_items()
        self.assertIsInstance(items, list)

    def test_get_item_by_id(self):
        item = self.itemsService.get_item_by_id(4)
        self.assertIsInstance(item, db.item.item)

    def test_get_items_by_category(self):
        items = self.itemsService.get_items_by_category(9)
        self.assertIsInstance(items, list)

    def test_create_item(self):
        item = self.itemsService.create_item("A", "FIRST ITEM", 1.00, [9])
        self.assertIsInstance(item, db.item.item)

if __name__ == '__main__':
    unittest.main()