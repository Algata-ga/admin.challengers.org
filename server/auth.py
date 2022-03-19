import pymysql
import bcrypt

def connect():
    db = pymysql.connect(
        host="localhost",
        user="cryptochallengers",
        password="cryptochallengers",
        database="cryptochallengers",
        cursorclass=pymysql.cursors.DictCursor
    )
    cur = db.cursor()
    return db,cur

def add_user(username,password):
    db,cur = connect()
    salt = bcrypt.gensalt()
    password_hash = bcrypt.hashpw(password.encode('utf-8'),salt)
    insert = 'insert into auth(username,pw_hash) values(%s,_binary %s)'
    values = [username,pymysql.Binary(password_hash)]
    cur.execute(insert,values)
    db.commit()

def check_creds(username,password):
    db,cur = connect() 
    cur.execute('select * from auth') 
    users = cur.fetchall()
    matches = list(filter(lambda user: bcrypt.checkpw(password.encode('utf-8'),user['pw_hash']) and username == user['username'],users))
    if matches == [] :
        return False
    return True
