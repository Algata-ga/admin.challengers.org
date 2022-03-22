from flask import Flask,jsonify,request,session,send_from_directory
import os
import pathlib
import time
from flask_cors import CORS

import auth
import db
import utils

app=Flask(__name__)
app.secret_key = 'RANDOM STUFF'
app.config['UPLOAD_PATH']= pathlib.Path.home()/'static'
app.config['CORS_METHODS']=['GET']
app.config['CORS_ORIGINS']=['https://cryptochallengers.org','https://preview.algata.in']

CORS(app,supports_credentials=True)

# return 1 or 0
@app.route('/isLoggedIn',methods=['GET'])
def isLoggedIn():
    if 'username' in session :
            return jsonify({'loggedIn':True}),200
    return jsonify({'loggedIn':False}),200

@app.route('/login',methods=['POST'])
def authLogin():
    username,password=request.form['username'],request.form['password']
    if auth.check_creds(username,password):
        session['username']='username'
        return jsonify({'loggedIn':True}),200
    time.sleep(1)       # f you, brute forcers
    return jsonify({'loggedIn':False}),200

@app.route('/logout',methods=['POST'])
def authLogout():
    session.clear()
    return jsonify({'loggedIn':False}),200
    
def authorized():
    if 'username' in session:
        return True
    return False

@app.route('/uploadAd',methods=['POST'])
def uploadAd():
    if not authorized():
        return 'False',401
    metadata=request.form
    media=request.files['media']
    filename=utils.getFilename(metadata,media.filename)
    db.add_ad(metadata,filename)
    media.save(os.path.join(app.config['UPLOAD_PATH'], filename))
    return jsonify({'success':True}),200

@app.route('/deleteAd/<id>',methods=['POST'])
def deleteAd(id):
    if not authorized():
        return 'False',401
    filename=db.delete_ad(id) 
    os.remove(os.path.join(app.config['UPLOAD_PATH'],filename))
    return jsonify({'deleted':True}),200

@app.route('/updateAd/<id>',methods=['POST'])
def updateAd(id):
    if not authorized():
        return 'False',401
    metadata=request.form
    filename=None
    if len(request.files) != 0:
        media=request.files['media']
        print(media.filename)
        filename=utils.getFilename(metadata,media.filename)
        print('^^^'+filename)
        media.save(os.path.join(app.config['UPLOAD_PATH'], filename))
        # need to delete old file...lets do that later lol
    print(filename,'&&&&')
    db.update_ad(id,metadata,filename)
    return jsonify({'updated':True}),200

@app.route('/getAds',methods=['GET'])
def getAds():
    ads=db.get_ads()
    return jsonify(ads),200

@app.route('/ad/<filename>')
def getAd(filename):
    return send_from_directory(app.config['UPLOAD_PATH'], filename)




