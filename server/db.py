import pymysql
from functools import reduce
from utils import getFilename

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

def get_ads() : 
    db,cur = connect()
    cur.execute('select * from advertisements order by timestamp desc limit 100');
    results=cur.fetchall()
    return results;

def add_ad(metadata,filename):
    db,cur=connect()
    cur.execute('insert into advertisements(title,description,filename) values(\'{title}\',\'{description}\',\'{filename}\')'.format(title=metadata['title'],description=metadata['description'],filename=filename))
    db.commit()

def delete_ad(id):
    db,cur=connect()
    cur.execute('select * from advertisements where id = {id}'.format(id=id))
    results=cur.fetchall()
    cur.execute('delete from advertisements where id = {id}'.format(id=id))
    db.commit()
    return results[0]['filename']

def update_ad(id,metadata,filename):
    db,cur=connect()
    cur.execute('select * from advertisements where id = {id}'.format(id=id))
    ad=cur.fetchall()[0]
    cur.execute('update advertisements set title=\'{title}\',description=\'{description}\' where id={id}'.format(title=metadata['title'],description=metadata['description'],id=id))
    if filename==None:
        cur.execute('update advertisements set filename={filename}'.format(filename=filename))
    db.commit()
    
