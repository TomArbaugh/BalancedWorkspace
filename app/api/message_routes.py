from app.models import Message, db
from flask import Blueprint
from flask_login import current_user, login_required

message_routes = Blueprint('messages', __name__)

@message_routes.route('/')
@login_required
def get_all_messages():

    messages = Message.query.filter((Message.sender_id == current_user.id) | (Message.receiver_id == current_user.id)).all()
   
    if messages is None:
        return {"error": "Messages Not Found" }
    else:
        return [message.to_dict() for message in messages]