import os
from dotenv import load_dotenv
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS
from mongo_client import mongo_client

db = mongo_client.gallery
images_collection = db.images

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

    headers = {"Authorization": f"Client-ID {UNSPLASH_KEY}", "Accept-Version": "v1"}
    payload = {"query": word}
    response = requests.get(url=UNSPLASH_URL, headers=headers, params=payload)
    response.headers["Access-Control-Allow-Origin"] = "*"
    data = response.json()
    return data


@app.route("/images", methods=["GET", "POST", "DELETE"])
def images():
    if request.method == "GET":
        if images_collection.count_documents({}) == 0:
            return []
        images_file = images_collection.find({})
        return jsonify([img for img in images_file])

    if request.method == "POST":
        image = request.get_json()
        image["_id"] = image.get("id")
        inserted_id = images_collection.insert_one(image).inserted_id
        return jsonify({"inserted_id": inserted_id})

    if request.method == "DELETE":
        image = request.get_json()
        image_id = image.get("_id")
        images_collection.delete_one({"_id": image_id})
        return f"image_id {image_id} deleted"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050)
