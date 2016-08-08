import category

class category_repository:

    def __init__(self, connection):
        self.conn = connection


    def create(self, category):
        cur = self.conn.cursor()
        cur.execute("""INSERT INTO categories(code, name, created_by) VALUES(%s, %s, %s) RETURNING id""", (category.code, category.name, category.created_by))
        category.id = cur.fetchone()[0]
        cur.close()
        self.conn.commit()

        return category

    def delete(self, id):
        cur = self.conn.cursor()
        cur.execute("""DELETE FROM categories WHERE id = %s""", (id,))
        cur.close()
        self.conn.commit()

    def get_by_id(self, id):
        cur = self.conn.cursor()
        cur.execute("""SELECT id, code, name, created_by FROM categories WHERE id=%s""", (id,))
        row = cur.fetchone()
        cur.close()

        return category.category(row[0], row[1], row[2], row[3])

    def get_all(self):
        cur = self.conn.cursor()
        cur.execute("""SELECT id, code, name, created_by FROM categories""")
        rows = cur.fetchall()
        cur.close()

        categories = []

        for row in rows:
            categories.append(category.category(row[0], row[1], row[2], row[3]))

        return categories

