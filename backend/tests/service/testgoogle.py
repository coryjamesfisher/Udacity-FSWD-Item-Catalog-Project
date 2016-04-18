import unittest
import service.google
import psycopg2
import db.user

class TestGoogle(unittest.TestCase):

    def setUp(self):
       self.conn = psycopg2.connect("dbname='main' user='serviceuser' password='serviceuser' host='localhost'")
#        cur = self.conn.cursor()
#        cur.execute("CREATE TEMPORARY TABLE items as SELECT * FROM items;")
#        cur.execute("CREATE TEMPORARY TABLE categories as SELECT * FROM categories;")
#        cur.execute("CREATE TEMPORARY TABLE item_categories as SELECT * FROM item_categories;")
#        cur.close()
#        self.conn.commit()

       self.google = service.google.google(self.conn)

    def tearDown(self):
        self.conn.close()

    def test_register_or_sign_in(self):
        user = self.google.register_or_sign_in("")
        self.assertIsInstance(user, db.user.user)

if __name__ == '__main__':
    unittest.main()
