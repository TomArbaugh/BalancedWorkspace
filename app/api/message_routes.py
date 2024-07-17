from app.models import Message, db
from flask import Blueprint
from flask_login import current_user, login_required
from app.forms.create_message import CreateMessage

message_routes = Blueprint('messages', __name__)

@message_routes.route('/')
@login_required
def get_all_messages():

    messages = Message.query.filter((Message.sender_id == current_user.id) | (Message.receiver_id == current_user.id)).all()
   
    if messages is None:
        return {"error": "Messages Not Found" }
    else:
        return [message.to_dict() for message in messages]

@message_routes.route('/create/too/<int:otherPerson>', methods=["POST"])
@login_required
def create_message(otherPerson):
    print("OtherPerson-----------------------------------", otherPerson)
    form = CreateMessage()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_message = Message(
            sender_id = current_user.id,
            receiver_id = otherPerson,
            message = form.data["message"]
        )
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()

    if form.errors:
        print(form.errors)
        return {"errors": form.errors}, 400
    return