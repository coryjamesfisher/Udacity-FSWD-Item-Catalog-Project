import category

class category_repository:

    def __init__(self, connection):
        self.conn = connection


    def create(self, category):

        cur = self.conn.cursor()
        cur.execute("""INSERT INTO categories(code, name) VALUES(%s, %s) RETURNING id""", (category.code, category.name))
        category.id = cur.fetchone()[0]
        cur.close()
        self.conn.commit()

        return category

    def get_by_id(self, id):

        cur = self.conn.cursor()
        cur.execute("""SELECT id, code, name FROM categories WHERE id=%s""", (id,))
        row = cur.fetchone()
        cur.close()

        return category.category(row[0], row[1], row[2])

    def get_all(self):

        cur = self.conn.cursor()
        cur.execute("""SELECT id, code, name FROM categories""")
        rows = cur.fetchall()
        cur.close()

        categories = []

        for row in rows:
            categories.append(category.category(row[0], row[1], row[2]))

        return categories

