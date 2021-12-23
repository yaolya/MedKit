from backend.models import User
from flask import request, Blueprint, session
from flask.json import jsonify
from backend.database import db
import backend.config
from os import environ


users = Blueprint('users', __name__)

def format_user(user):
    return {
        "user_id": user.id,
        "name": user.name,
        "email": user.email,
        "is_admin": user.is_admin
    }

@users.route('/login', methods=['POST'])
def login():
    name = request.json['name']
    email = request.json['email']
    u = db.session.query(User).filter_by(email=email).first()
    if u is None:
        is_admin = False
        if email == environ.get('ADMIN'):
            is_admin = True
        user = User(name=name, email=email, is_admin=is_admin)
        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.id
        return format_user(user) 
    else: 
        session["user_id"] = u.id
        return format_user(u)


@users.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"response": "logout completed"})


@users.route('/', methods=['GET'])
def get_users():
    users = User.query.order_by(User.id.asc()).all()
    users_list = []
    for user in users:
        users_list.append(format_user(user))
    return jsonify(users_list)


@users.route('/<id>', methods=['GET'])
def get_user(id):
    user = User.query.filter_by(id=id).one()
    formated_user = format_user(user)
    return formated_user