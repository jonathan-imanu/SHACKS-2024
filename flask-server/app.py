from flask import Flask, request, jsonify
from flask_cors import CORS
import datetime
from langdetect import detect

from dotenv import load_dotenv
import os
import boto3
from openai import OpenAI

app = Flask(__name__)
CORS(app)

load_dotenv()

aws_access_key_id = os.environ.get("aws_access_key_id")
aws_secret_access_key = os.environ.get("aws_secret_access_key")
region_name = os.environ.get("region_name") 

textract = boto3.client(
    'textract',
    aws_access_key_id=aws_access_key_id,
    aws_secret_access_key=aws_secret_access_key,
    region_name=region_name
)

app = Flask(__name__)
CORS(app)

def extract_text_from_image(image_path):
    with open(image_path, 'rb') as document:
        image_bytes = document.read()

    response = textract.detect_document_text(Document={'Bytes': image_bytes})

    extracted_text = ""
    for item in response["Blocks"]:
        if item["BlockType"] == "LINE":
            extracted_text += item["Text"] + " "

    return extracted_text.strip()


@app.route('/data', methods=["POST"])
def check_fraud():
    user_input = request.json.get('text')

    # Detect the language of the user input
    detected_language = detect(user_input)

    # Translate the prompt if necessary (simple example for English and Spanish)
    if detected_language == 'es':
        prompt = (
            f"Responde en el idioma en que termina este mensaje. ¿Qué tan probable es que lo siguiente sea un fraude? "
            f"Por favor califícalo en una escala del 1 al 100, donde 1 es 'muy improbable' y 100 es 'muy probable'. "
            f"Proporciona la calificación seguida de un punto y luego una explicación.\n\n{user_input}"
        )
    else:  # Default to English
        prompt = (
            f"Respond with the language that this message ends in. How likely is the following to be fraud? "
            f"Please rate it on a scale of 1 to 100, where 1 is 'very unlikely' and 100 is 'very likely'. "
            f"Provide the rating followed by a period then an explanation.\n\n{user_input}"
        )

    client = OpenAI(
        api_key=os.environ.get("OPENAI_API_KEY"),
    )

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "user",
                "content": prompt,
            }
        ],
        model="gpt-3.5-turbo",
    )

    parts = chat_completion.choices[0].message.content.split('. ', 1)
    number = parts[0]
    message = parts[1]

    return {"number": number, "message": message}


if __name__ == '__main__':
    app.run(debug=True)
