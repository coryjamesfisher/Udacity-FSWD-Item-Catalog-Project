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

        self.itemsService = service.items.items(self.conn)

    def tearDown(self):
        self.conn.close()

    def test_create_item(self):
        item = self.itemsService.create_item("A", "FIRST ITEM", 1.00, 1, [1])
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

    def test_delete_item(self):
        self.itemsService.delete_item(1, 1)

if __name__ == '__main__':
    unittest.main()
