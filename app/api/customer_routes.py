from app.models import Ticket, db, Image, Customer
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.forms.create_customer import CreateCustomerForm



customer_routes = Blueprint('customers', __name__)

@customer_routes.route('/<int:id>')
@login_required
def get_customer_Id(id):
    customer = Customer.query.get(id)
    if customer is None:
        return {"error": "Customer Not Found" }
    else:
        return customer.to_dict()
    
@customer_routes.route('/')
@login_required
def get_customer():
    customers = Customer.query.filter_by(user_id=current_user.id).order_by(Customer.id.desc()).all()

    if customers is None:
              return {"error": "Customer Not Found" }
    else:
        return [customer.to_dict() for customer in customers]

@customer_routes.route('/create', methods=["POST"])
@login_required
def create_customer():
    form = CreateCustomerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_customer = Customer (
            user_id = current_user.id,
            name = form.data["name"],
            email = form.data["email"]
        )
        db.session.add(new_customer)
        db.session.commit()
        return new_customer.to_dict()

    if form.errors:
        print(form.errors)
        return {"errors": form.errors}, 400
    return

@customer_routes.route('/edit/<int:id>', methods=["PUT"])
@login_required
def edit_customer(id):

    customer = Customer.query.get(id)

    form = CreateCustomerForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
     
        customer.user_id = current_user.id
        customer.name = form.data["name"]
        customer.email = form.data["email"]
    
       
        db.session.commit()
        return customer.to_dict()

    if form.errors:
        print(form.errors)
        return {"errors": form.errors}, 400
    return


@customer_routes.route("/<int:id>/delete")
@login_required
def delete_customer(id):

    customer = Customer.query.get(id)

    if customer is None:
        return {"message": "No Such Customer"}, 404

    db.session.delete(customer)
    db.session.commit()

    return {"message": "Customer deleted successfully"}
    