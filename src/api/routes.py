"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity)


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/signup', methods=["POST"])
def signup():

    body = request.json

    existing_user = User.query.filter_by(
        email=body["email"]
    ).first()

    if existing_user:

        return jsonify({

            "msg": "usuario ya existe"

        }), 400

    new_user = User(

        email=body["email"],
        password=body["password"]

    )

    db.session.add(new_user)

    db.session.commit()

    return jsonify({

        "msg": "usuario creado"

    }), 200


@api.route('/login', methods=["POST"])
def login():

    body = request.json

    user = User.query.filter_by(

        email=body["email"]

    ).first()


    if user is None:

        return jsonify({

            "msg":"usuario no existe"

        }),401


    if user.password != body["password"]:

        return jsonify({

            "msg":"contraseña incorrecta"

        }),401


    token = create_access_token(

        identity=str(user.id)

    )


    return jsonify({

        "token":token

    }),200

@api.route('/private')
@jwt_required()
def private():

    user_id = get_jwt_identity()

    return jsonify({

        "msg":"bienvenido",

        "user":user_id

    }),200