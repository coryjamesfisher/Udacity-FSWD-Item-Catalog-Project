import item
from datetime import datetime

class item_repository:

    def __init__(self, connection):
        self.conn = connection

    def create(self, item):
        cur = self.conn.cursor()
        cur.execute("""INSERT INTO items(code, name, price, created_by) VALUES(%s, %s, %s, %s) RETURNING id""", (item.code, item.name, item.price, item.created_by))
        item.id = cur.fetchone()[0]

        for category_id in item.categories:
            cur.execute("""INSERT INTO item_categories(item_id, category_id) VALUES(%s, %s)""", (item.id, category_id))

        cur.close()
        self.conn.commit()

        return self.get_by_id(item.id)

    def update(self, item):
        cur = self.conn.cursor()
        cur.execute("""UPDATE items SET code=%s, name=%s, price=%s WHERE id=%s""", (item.code, item.name, item.price, item.id))
        cur.execute("""DELETE FROM item_categories where item_id=%s""", (item.id,))
        for category_id in item.categories:
            cur.execute("""INSERT INTO item_categories(item_id, category_id) VALUES(%s, %s)""", (item.id, category_id))

        cur.close()
        self.conn.commit()

        return item

    def get_by_id(self, id):
        cur = self.conn.cursor()
        cur.execute("""SELECT i.id, i.code, i.name, i.price, i.created_on, i.created_by, array_to_string(array_agg(c.id), ',') as categories
FROM items i
LEFT JOIN item_categories ic on ic.item_id = i.id
INNER JOIN categories c ON c.id = ic.category_id
WHERE i.id=%s
GROUP BY i.id, i.code, i.name, i.price, i.created_on""", (id,))
        row = cur.fetchone()
        cur.close()

        return item.item(row[0], row[1], row[2], row[3], row[4], row[5], row[6].split(","))

    def get_all(self):
        cur = self.conn.cursor()
        cur.execute("""SELECT i.id, i.code, i.name, i.price, i.created_on, i.created_by, array_to_string(array_agg(c.id), ',') as categories
FROM items i
LEFT JOIN item_categories ic on ic.item_id = i.id
INNER JOIN categories c ON c.id = ic.category_id
GROUP BY i.id, i.code, i.name, i.price, i.created_on, i.created_by""")
        rows = cur.fetchall()
        cur.close()

        items = []

        for row in rows:
            items.append(item.item(row[0], row[1], row[2], row[3], row[4], row[5], row[6].split(",")))

        return items

    def get_all_by_category(self, category_id):

        cur = self.conn.cursor()
        cur.execute("""SELECT i.id, i.code, i.name, i.price, i.created_on, i.created_by, array_to_string(array_agg(c.id), ',') as categories
FROM items i
INNER JOIN item_categories ic on ic.item_id = i.id
INNER JOIN categories c ON c.id = ic.category_id
WHERE c.id=%s
GROUP BY i.id, i.code, i.name, i.price, i.created_on, i.created_by""", (category_id,))
        rows = cur.fetchall()
        cur.close()

        items = []

        for row in rows:
            items.append(item.item(row[0], row[1], row[2], row[3], row[4], row[5], row[6].split(",")))

        return items

