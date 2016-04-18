import user

class user_repository:

    def __init__(self, connection):
        self.conn = connection


    def create(self, user):

        cur = self.conn.cursor()
        cur.execute("""INSERT INTO user(email, first_name, last_name, google_id, facebook_id) VALUES(%s, %s, %s, %s, %s) RETURNING id""", (user.email, user.first_name, user.last_name, user.google_id, user.facebook_id))
        user.id = cur.fetchone()[0]
        cur.close()
        self.conn.commit()

        return user

    def get_by_id(self, id):

        cur = self.conn.cursor()
        cur.execute("""SELECT id, email, first_name, last_name, google_id, facebook_id FROM user WHERE id=%s""", (id,))
        row = cur.fetchone()
        cur.close()

        return user.user(row[0], row[1], row[2], row[3], row[4], row[5])

    def get_all(self):

        cur = self.conn.cursor()
        cur.execute("""SELECT id, email, first_name, last_name, google_id, facebook_id FROM user""")
        rows = cur.fetchall()
        cur.close()

        users = []

        for row in rows:
            users.append(user.user(row[0], row[1], row[2], row[3], row[4], row[5]))

        return users

