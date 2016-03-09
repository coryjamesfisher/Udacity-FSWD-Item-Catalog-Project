import psycopg2

class category_repository:

    def __init__(self):

         self.conn = psycopg2.connect("dbname='main' user='serviceuser' password='serviceuser' host='localhost'")


    def create(self, category):

        cur = self.conn.cursor()
        cur.execute("""INSERT INTO categories(code, name) VALUES(%s, %s) RETURNING id""", (category.code, category.name))
        category.id = cur.fetchone()[0]
        cur.close()

        return category
