from app.models import Ticket, db, Image, Customer
from flask import Blueprint, request, jsonify, abort, current_app as app
from flask_login import current_user, login_required
from app.forms.create_customer import CreateCustomerForm



customer_routes = Blueprint('customers', __name__)

@customer_routes.route('/validate/<email>/<name>')
@login_required
def validate_customer(email, name):
    """
    Validates that a customer with the given email or name doesn't already exist.
    
    Args:
        email (str): Customer email to validate
        name (str): Customer name to validate
        
    Returns:
        dict: Success message if validation passes, error if customer exists
    """
    customer = Customer.query.filter((Customer.email == email) | (Customer.name == name)).all()
    if customer:
        return abort(400, description="Customer Already Exists")

    else:
        return {"message": "successfully created"}
    return

@customer_routes.route('/<int:id>')
@login_required
def get_customer_by_id(id):
    """
    Retrieves a customer by their ID.
    
    Args:
        id (int): The customer ID
        
    Returns:
        dict: Customer data or error message if not found
    """
    customer = Customer.query.get(id)
    if customer is None:
        return {"error": "Customer Not Found" }
    else:
        return customer.to_dict()
    
@customer_routes.route('/')
@login_required
def get_customer():
    customers = Customer.query.order_by(Customer.id.desc()).all()

    if customers is None:
              return {"error": "Customer Not Found" }
    else:
        return [customer.to_dict() for customer in customers]

@customer_routes.route('/create', methods=["POST"])
@login_required
def create_customer():
    """
    Creates a new customer for the current user.
    
    Returns:
        dict: Created customer data or validation errors
    """
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
        app.logger.error(f"Customer creation form validation errors: {form.errors}")
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
        app.logger.error(f"Customer edit form validation errors: {form.errors}")
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
    