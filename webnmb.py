from flask import *


app = Flask('webnmb')


@app.route('/')
def index():
    return 'webnmb'
