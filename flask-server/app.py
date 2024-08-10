from flask import Flask

app = Flask(__name__)

@app.route('/members')
def members():
    return {"Members": ["Shakcs", "Memfdsafsdr2", "sadfsa"]}


if __name__ == "__main__":
    app.run(debug=True)