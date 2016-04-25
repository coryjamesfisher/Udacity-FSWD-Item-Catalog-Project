import unittest
import service.google
import psycopg2
import db.user

class TestGoogle(unittest.TestCase):

    def setUp(self):

       self.conn = psycopg2.connect("dbname='main' user='serviceuser' password='serviceuser' host='localhost'")
       cur = self.conn.cursor()
       cur.execute("CREATE TEMPORARY TABLE users as SELECT * FROM users where 1=0;")
       cur.execute("CREATE TEMPORARY SEQUENCE test_user_sequence START WITH 1")
       cur.execute("ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('test_user_sequence')")
       cur.execute("INSERT INTO users(first_name, last_name, email, google_id) values('Cory', 'Fisher', 'coryjamesfisher@forthecoder.com', '117370290112067995028')")
       cur.close()
       self.conn.commit()

       self.google = service.google.google(self.conn)

    def tearDown(self):
        self.conn.close()

    def test_register(self):
        user = self.google.register("")
        self.assertIsInstance(user, db.user.user)

    def test_auth(self):
        user = self.google.auth("")
        self.assertIsInstance(user, db.user.user)

if __name__ == '__main__':
    unittest.main()
