from flask import Flask,jsonify,request,session,send_from_directory
import os
import pathlib
import time

import auth
import db
import utils

app=Flask(__name__)
app.secret_key = 'RANDOM STUFF'
app.config['UPLOAD_PATH']='static'

# return 1 or 0
@app.route('/isLoggedIn',methods=['GET'])
def isLoggedIn():
    if 'username' in session :
        user=auth.get_user(session['username'])
        if user != ():
            return 'true',200
    return 'false',200

@app.route('/login',methods=['POST'])
def authLogin():
    username,password=request.form['username'],request.form['password']
    if auth.check_creds(username,password):
        session['username']='username'
        return 'true',200
    time.sleep(1)       # f you, brute forcers
    return 'false',200

@app.route('/logout',methods=['POST'])
def authLogout():
    session.clear()
    return 'true',200
    
def authorized():
    if 'username' in session:
        return True
    return False

@app.route('/uploadAd',methods=['POST'])
def uploadAd():
    if not authorized():
        return False,401
    metadata=request.form
    media=request.files['media']
    filename=db.add_ad(metadata)
    media.save(os.path.join(app.config['UPLOAD_PATH'], filename))
    return 'true',200

@app.route('/deleteAd/<id>',methods=['GET'])
def deleteAd(id):
    if not authorized():
        return False,401
    filename=db.delete_ad(id) 
    os.remove(os.path.join(app.config['UPLOAD_PATH'],filename))
    return 'true',200

@app.route('/getAds',methods=['GET'])
def getAds():
    ads=db.get_ads()
    return jsonify(ads),200

@app.route('/ad/<filename>')
def getAd(filename):
    return send_from_directory(app.config['UPLOAD_PATH'], filename)




