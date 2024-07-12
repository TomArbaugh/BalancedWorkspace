from app.models import Ticket, db, Image, Customer
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required



customer_routes = Blueprint('customers', __name__)

@customer_routes.route('<int:id>')
@login_required
def get_customer_Id(id):
    customer = Customer.query.get(id)
    if customer is None:
        return {"error": "Customer Not Found" }
    else:
        return customer.to_dict()
    