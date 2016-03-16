from flask import Blueprint, request
import codecs, os

client_rest = Blueprint('client_rest', __name__)

@client_rest.route('/rest/v1/client/sample', methods = ['GET'])
def get_sample_client():
    html = codecs.open(os.path.dirname(os.path.realpath(__file__)) + '/index.html')
    return html.read()