from app.models import Ticket, db
from flask import Blueprint, request, jsonify
from app.forms import TicketForm
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, get_unique_filename)


ticket_routes = Blueprint('tickets', __name__)

@ticket_routes.route("/add-image", methods=["POST"])
@login_required
def upload_image(ticket_id):

    form = TicketForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
          
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
        return new_image.to_dict()

    if form.errors:
        print(form.errors)
        return {'errors': form.errors}, 400

    return 

@ticket_routes.route("/api/create-ticket", methods=["POST"])
@login_required
def create_ticket():
    form = TicketForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
          
        new_ticket = Ticket(
            customer_id = current_user.id,
            title = form.data["title"],
            type = form.data["type"],
            priority = form.data["priority"],
            assignee = form.data["assignee"],
            apply_macro = form.data["apply_macro"]
        )
        db.session.add(new_ticket)
        db.session.commit()
        return new_ticket.to_dict()

    if form.errors:
        print(form.errors)
        return {'errors': form.errors}, 400

    return 