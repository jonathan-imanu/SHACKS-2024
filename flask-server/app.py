from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime

from dotenv import load_dotenv
import os
from openai import OpenAI

app = Flask(__name__)
CORS(app)

load_dotenv()

# @app.route('/data', methods=["POST"])
# def get_time():
#     x = datetime.datetime.now()
#     return jsonify({'Date': x.isoformat()})

@app.route('/data', methods=["POST"])
def check_fraud():
    user_input = request.json.get('text')
    
    client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": f"How likely is the following to be fraud? Please rate it on a scale of 1 to 100, where 1 is 'very unlikely' and 100 is 'very likely'. Provide the rating followed by a period then an explanation.\n\n{user_input}",
            }
        ],
        model="gpt-3.5-turbo",
    )

    parts=chat_completion.choices[0].message.content.split('. ', 1)
    number=parts[0]
    message=parts[1]

    return {"number": number, "message": message}


if __name__ == '__main__':
    app.run(debug=True)
