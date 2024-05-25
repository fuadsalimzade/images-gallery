from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv(dotenv_path="./.env.local")

HOST = os.environ.get("MONGO_HOST", "mongo")
USERNAME = os.environ.get("MONGO_USERNAME", "")
PASSWORD = os.environ.get("MONGO_PASSWORD", "")
PORT = os.environ.get("MONGO_PORT", 27017)

mongo_client = MongoClient(
    host=HOST,
    username=USERNAME,
    password=PASSWORD,
    port=PORT,
)


def insert_test_document():
    db = mongo_client.test
    test_collection = db.test_collection
    res = test_collection.insert_one({"name": "Fuad"})
    print(res)


if "__name__" == "__mongo_client__":
    insert_test_document()
