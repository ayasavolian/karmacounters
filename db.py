import MySQLdb

cxn = MySQLdb.connect(user='root',passwd='root')
cxn.query('DROP DATABASE test')
cxn.query('CREATE DATABASE test')
cxn.query("GRANT ALL ON test.* to ''@'localhost'")
cxn.commit()
cxn.close()

cxn = MySQLdb.connect(db='test')
cur = cxn.cursor()
cur.execute('CREATE TABLE users(login VARCHAR(8), uid INT)')
cur.execute("INSERT INTO users VALUES('john', 7000)")
cur.execute("INSERT INTO users VALUES('jane', 7001)")
cur.execute("INSERT INTO users VALUES('bob', 7200)")
cur.execute("SELECT * FROM users WHERE login LIKE 'j%'")
for data in cur.fetchall():
      print '%s\t%s' % data

cur.execute("UPDATE users SET uid=7100 WHERE uid=7001")
cur.execute("SELECT * FROM users")
for data in cur.fetchall():
    print '%s\t%s' % data
cur.execute('DELETE FROM users WHERE login="bob"')
cur.execute('DROP TABLE users')
cur.close()
cxn.commit()
cxn.close()