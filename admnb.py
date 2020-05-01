from flask import *
import requests
from pyadnmb.pyadmnb import *

'''
self.host = 'https://adnmb2.com'
self.apis = {
    'getForumList': self.host + '/Api/getForumList',
    'showf': self.host + '/Api/showf',
    'thread': self.host + '/Api/thread',
    'search': self.host + '/Api/Search'
}
'''
app = Flask('adnmb')
ad = Admnb()


def get_args():
    args0 = dict(request.args)
    args = {}
    for arg in args0:
        val = args0[arg]
        if type(val) is list:
            args[arg] = val[0]
        else:
            args[arg] = val
    return args


def jsonify_response(content):
    return Response(content, mimetype='application/json')


@app.route('/')
def index():
    return render_template('adnmb/index.html')


@app.route('/getForumList/', methods=['GET'])
def get_forum_list():
    return jsonify_response(requests.get(ad.apis['getForumList']).content)


@app.route('/thread/', methods=['GET'])
def thread():
    return jsonify_response(requests.get(ad.apis['thread'] + '/?' + request.query_string.decode(errors='ignore')))


@app.route('/showf/', methods=['GET'])
def showf():
    return jsonify_response(requests.get(ad.apis['showf'] + '/?' + request.query_string.decode(errors='ignore')))


@app.route('/Search/', methods=['GET'])
def search():
    return jsonify_response(requests.get(ad.apis['search'] + '/?' + request.query_string.decode(errors='ignore'), cookies=request.cookies))