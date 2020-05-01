from flask import *
from flask_cors import *
from werkzeug.middleware.dispatcher import DispatcherMiddleware
from werkzeug.serving import run_simple

from admnb import app as app_adnmb
from webnmb import app as app_webnmb




app = Flask(__name__)

CORS(app, supports_credentials=True)

dm = DispatcherMiddleware(app,
    {
        '/adnmb': app_adnmb,
        '/webnmb': app_webnmb
    }
)


if __name__ == '__main__':
    run_simple('0.0.0.0', 80, dm)