from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

app = Flask(__name__)
CORS(app)

@app.route('/data', methods=["POST"])
def get_time():
    x = datetime.datetime.now()
    return jsonify({'Date': x.isoformat()})

if __name__ == '__main__':
    app.run(debug=True)