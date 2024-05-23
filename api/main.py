import os
from dotenv import load_dotenv
import requests
from flask import Flask, request
from flask_cors import CORS

load_dotenv(dotenv_path="./.env.local")

UNSPLASH_URL = "https://api.unsplash.com/photos/random"
UNSPLASH_KEY = os.getenv("UNSPLASH_KEY", "")
DEBUG = bool(os.environ.get("DEBUG", True))

if not UNSPLASH_KEY:
    EnvironmentError("Please create UNSPLASH_KEY in .env.local")

app = Flask(__name__)
CORS(app)

app.config["DEBUG"] = DEBUG

@app.route("/new-image")
def new_image():
    word = request.args.get("query")

    headers = {
        "Authorization": f"Client-ID {UNSPLASH_KEY}",
        "Accept-Version": "v1"
    }
    payload = {
        "query": word
    }
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=payload)
    response.headers["Access-Control-Allow-Origin"] = "*"
    data = response.json()
    return data

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
