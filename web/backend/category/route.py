from jinja2.utils import is_undefined
from backend import medicament
from backend.medicament.route import format_medicament
from backend.models import Category, User, Medicament, MedicamentsUsers
from flask import request, Blueprint, session
from flask.json import jsonify
from backend.database import db


categories = Blueprint('categories', __name__)

def format_category(category):
    return {
        "id": category.id,
        "name": category.name,
        "description": category.description,
        "is_default": category.is_default
    }

@categories.route('/', methods=['POST'])
def create_category():
    name = request.json['name']
    description = request.json['description']
    is_default = request.json['is_default']
    category = Category(name=name, description=description, is_default=is_default, user_id=session["user_id"])
    db.session.add(category)
    db.session.commit()
    return format_category(category) 

@categories.route('/<medicament_id>/<category_id>', methods=['POST'])
def add_medicament_to_category(medicament_id, category_id):
    category = Category.query.filter_by(id=category_id).first()
    medicament = Medicament.query.filter_by(id=medicament_id).first()
    user = User.query.filter_by(id=session["user_id"]).first()
    a = MedicamentsUsers(category_id=category_id, user_id=session["user_id"])
    a.medicament=medicament
    if medicament not in user.usersmedicaments:
        user.usersmedicaments.append(medicament)
    if medicament not in category.medicaments:
        category.medicaments.append(medicament)
    db.session.add(category)
    db.session.add(user)
    db.session.add(a)
    db.session.commit()
    return format_category(category) 

@categories.route('/all', methods=['GET'])
def get_categories():
    categories = Category.query.filter_by(user_id=session["user_id"]).all()
    categories_list = []
    for category in categories:
        if not category.is_default:
            categories_list.append(format_category(category))

    all_categories = Category.query.order_by(Category.id.asc()).all()
    default_categories_list = []
    for category in all_categories:
        if category.is_default:
            default_categories_list.append(format_category(category))
    categories_list += default_categories_list
    categories_list_json = jsonify(categories_list)
    return categories_list_json

@categories.route('/users', methods=['GET'])
def get_users_categories():
    categories = Category.query.filter_by(user_id=session["user_id"]).all()
    categories_list = []
    for category in categories:
        if not category.is_default:
            categories_list.append(format_category(category))

    categories_list_json = jsonify(categories_list)
    return categories_list_json

@categories.route('/default', methods=['GET'])
def get_default_categories():
    categories = Category.query.order_by(Category.id.asc()).all()
    categories_list = []
    for category in categories:
        if category.is_default:
            categories_list.append(format_category(category))

    categories_list_json = jsonify(categories_list)
    return categories_list_json

@categories.route('/<id>', methods=['GET'])
def get_category_by_id(id):
    category = Category.query.filter_by(id=id).one()
    return format_category(category)

@categories.route('/<id>/medicaments', methods=['GET'])
def get_medicaments_by_category_id(id):
    medicaments_list = []
    usersmedicaments = db.session.query(User).filter_by(id=session["user_id"]).first().usersmedicaments
    categorymedicaments = db.session.query(Category).filter_by(id=id).first().medicaments

    for medicament in usersmedicaments:
        if medicament in categorymedicaments:
            medicaments_list.append(format_medicament(medicament))

    return jsonify(medicaments_list)

@categories.route('/<id>', methods=['DELETE'])
def delete_category(id):
    category = Category.query.filter_by(id=id).one()
    medicaments_users = MedicamentsUsers.query.filter_by(category_id=id).all()
    print("medicaments_users", medicaments_users)
    for medicament_user in medicaments_users:
        db.session.delete(medicament_user)
    db.session.delete(category)
    db.session.commit()
    return f'category {id} deleted'

@categories.route('/<medicament_id>/<category_id>', methods=['DELETE'])
def remove_medicament_from_category(medicament_id, category_id):
    category = Category.query.filter_by(id=category_id).first()
    medicament = Medicament.query.filter_by(id=medicament_id).first()
    user = User.query.filter_by(id=session["user_id"]).first()
    m_users = MedicamentsUsers.query.filter_by(category_id=category_id).all()
    for m_user in m_users:
        if m_user.user_id == session["user_id"] and m_user.medicament_id == medicament_id:
            category.medicaments.remove(medicament)
            db.session.delete(m_user)
            db.session.flush()
    db.session.commit()
    return f'medicament {medicament_id} deleted from category {category_id}'
