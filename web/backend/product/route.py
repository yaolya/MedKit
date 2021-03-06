from backend.models import Product
from flask import request, Blueprint, session
from flask.json import jsonify
from backend.database import db
from collections import Counter
import backend.medicament.route
from datetime import date


products = Blueprint('products', __name__)

def format_product(product):
    return {
        "id": product.id,
        "expiration_date": product.expiration_date,
        "medicament_id": product.medicament_id
    }

@products.route('/withoutquantity', methods=['GET'])
def get_users_products():
    products = Product.query.filter_by(user_id=session["user_id"]).all()
    products_list = []
    for product in products:
        products_list.append(format_product(product))
    return jsonify(products_list)

@products.route('/withdate', methods=['GET'])
def get_products_with_date():
    products = Product.query.filter_by(user_id=session["user_id"]).all()
    products_list = []
    for product in products:
        if product.expiration_date is not None:
            products_list.append(format_product(product))
    return jsonify(products_list)

@products.route('/withoutdate', methods=['GET'])
def get_products_without_date():
    products = Product.query.filter_by(user_id=session["user_id"]).all()
    medicaments_id = []
    for product in products:
        if product.expiration_date is None or product.expiration_date == '':
            medicaments_id.append(product.medicament_id)
    dictionary = dict(Counter(medicaments_id))
    products_array = backend.medicament.route.get_medicaments_by_id_array(dictionary)
    return products_array

@products.route('/expired', methods=['GET'])
def get_expired_products():
    products = Product.query.filter_by(user_id=session["user_id"]).all()
    products_list = []
    today = date.today()
    for product in products:
        if product.expiration_date is not None:
            if product.expiration_date < today:
                products_list.append(format_product(product))
    return jsonify(products_list)

@products.route('/notexpired', methods=['GET'])
def get_not_expired_products():
    products = Product.query.filter_by(user_id=session["user_id"]).all()
    products_list = []
    today = date.today()
    for product in products:
        if product.expiration_date is not None:
            if product.expiration_date >= today:
                products_list.append(format_product(product))
    return jsonify(products_list)

@products.route('/<id>', methods=['GET'])
def get_products_for_medicament(id):
    products = Product.query.filter_by(user_id=session["user_id"]).all()
    products_list = []
    for product in products:
        if product.medicament_id==int(id) and (product.expiration_date is None or product.expiration_date == ''):
            products_list.append(format_product(product))
    return jsonify(products_list)

# ???? id ?????????????????? ?????? ????????????????????
@products.route('/quantity', methods=['GET'])
def get_users_products_with_quantity():
    products = Product.query.filter_by(user_id=session["user_id"]).all()
    medicaments_id = []
    for product in products:
        medicaments_id.append(product.medicament_id)
    dictionary = dict(Counter(medicaments_id))
    products_array = backend.medicament.route.get_medicaments_by_id_array(dictionary)
    return products_array

@products.route('/', methods=['POST'])
def create_product():
    expiration_date = request.json['expiration_date']
    medicament_id = int(request.json['medicament_id'])
    number = int(request.json['quantity'])
    for i in range(number):
        if expiration_date != '':
            product = Product(expiration_date=expiration_date, medicament_id=medicament_id, user_id=session["user_id"])
        else:
            product = Product(expiration_date=None, medicament_id=medicament_id, user_id=session["user_id"])
        db.session.add(product)
    db.session.commit()
    return format_product(product) 

@products.route('/formedicament/<medicament_id>', methods=['DELETE'])
def delete_product_without_date(medicament_id):
    products = Product.query.filter_by(medicament_id=medicament_id).all()
    for product in products:
        if product.expiration_date is None or product.expiration_date == '':
            if product.user_id == session["user_id"]:
                db.session.delete(product)
    db.session.commit()
    return f'products for medicament {id} deleted'

@products.route('/<id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.filter_by(id=id).first()
    db.session.delete(product)
    db.session.commit()
    return f'product {id} deleted'

@products.route('/<id>', methods=['PUT'])
def update_product(id):
    int_id = int(id)
    product = Product.query.filter_by(id=int_id)
    exp_date = request.json['expiration_date']
    if exp_date != '':
        new_expiration_date = exp_date
    else:
        new_expiration_date = None
    product.update(dict(expiration_date=new_expiration_date))
    db.session.commit()
    return format_product(product.one())