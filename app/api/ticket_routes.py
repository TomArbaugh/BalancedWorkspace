from app.models import Ticket, db, Image
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.forms.ticket_form import TicketForm
from app.forms.ticket_image_form import TicketImageForm
from app.api.aws import (
    upload_file_to_s3, get_unique_filename)


ticket_routes = Blueprint('tickets', __name__)

@ticket_routes.route("/")
@login_required
def get_all_tickets():

    tickets = Ticket.query.filter_by(assignee=current_user.id).all()
    if tickets is None:
        return {"message": "No Such Ticket"}, 404
    else:
        return [ticket.to_dict() for ticket in tickets]


@ticket_routes.route("/<int:id>")
@login_required
def get_ticket(id):

    ticket = Ticket.query.get(id)

    if ticket is None:
        return {"message": "No Such Ticket"}, 404
    else:
        return ticket.to_dict()

@ticket_routes.route("/<int:ticket_id>/add-image", methods=["POST"])
@login_required
def upload_image(ticket_id):
    # print("-----------------------------------------------------", ticket_id)
    form = TicketImageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # print("-----------------------------------------", "form Validated") 
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return {'errors': upload['errors']}, 400

        url = upload["url"]
        new_image = Image(ticket_id=ticket_id, image= url)
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict(), 201

    else:
        return {'errors': form.errors}, 400



@ticket_routes.route("/create", methods=["POST"])
@login_required
def create_ticket():
    form = TicketForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
          
        new_ticket = Ticket(
        
            title = form.data["title"],
            type = form.data["type"],
            priority = form.data["priority"],
            assignee = form.data["assignee"],
            apply_macro = form.data["apply_macro"],
            requester = form.data["requester"],
            description = form.data["description"]
        )
        db.session.add(new_ticket)
        db.session.commit()
        return new_ticket.to_dict()

    if form.errors:
        print(form.errors)
        return {'errors': form.errors}, 400

    return 


@ticket_routes.route("/<int:ticket_id>/edit", methods=["PUT"])
@login_required
def edit_ticket(ticket_id):

    ticket = Ticket.query.get(ticket_id)

    if ticket is None:
        return {"Error": "No Such Ticket"}
    
    form = TicketForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        
        ticket.title = form.data["title"]
        ticket.type = form.data["type"]
        ticket.priority = form.data["priority"]
        ticket.assignee = form.data["assignee"]
        ticket.apply_macro = form.data["apply_macro"]
        ticket.requester = form.data["requester"]
        ticket.description = form.data["description"]

        db.session.commit()
        return ticket.to_dict()

    if form.errors:
        print(form.errors)
        return {'errors': form.errors}, 400

        

@ticket_routes.route("/<int:ticket_id>/edit-image", methods=["PUT"])
@login_required
def edit_image(ticket_id):
#     # print("-----------------------------------------------------", ticket_id)
    ticket = Ticket.query.get(ticket_id)
    form = TicketImageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
#         print("-----------------------------------------", "form Validated") 
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return {'errors': upload['errors']}, 400

        url = upload["url"]
        ticket.tickets_images[0].image = url
        db.session.commit()
        return ticket.tickets_images[0].to_dict(), 201

    else:
        return {'errors': form.errors}, 400

@ticket_routes.route("/<int:id>/delete")
@login_required
def delete_ticket(id):

    ticket = Ticket.query.get(id)

    if ticket is None:
        return {"message": "No Such Ticket"}, 404

    db.session.delete(ticket)
    db.session.commit()

    return {"message": "Ticket delete successfully"}
    