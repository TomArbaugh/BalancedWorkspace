from app.models import Message, db
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.forms.create_message import CreateMessage

message_routes = Blueprint('messages', __name__)

@message_routes.route('/')
@login_required
def get_all_messages():

    messages = Message.query.filter((Message.sender_id == current_user.id) | (Message.receiver_id == current_user.id)).order_by(Message.id.desc()).all()
   
    if messages is None:
        return {"error": "Messages Not Found" }
    else:
        return [message.to_dict() for message in messages]

@message_routes.route('/<int:id>')
@login_required
def get_message(id):
    message = Message.query.get(id)

    if message is None:
        return {"message": "message not found"}
    
    return message.to_dict()

@message_routes.route('/create/too/<int:otherPerson>', methods=["POST"])
@login_required
def create_message(otherPerson):
    
    
    form = CreateMessage()
    print("OtherPerson-----------------------------------", otherPerson)
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
        new_message = Message(
            sender_id = current_user.id,
            receiver_id = otherPerson,
            message = form.data["message"]
        )
        print("MESAGE---------------------------", new_message)
        db.session.add(new_message)
        db.session.commit()
        return new_message.to_dict()

    if form.errors:
        print(form.errors)
        return {"errors": form.errors}, 400
    return

@message_routes.route('/edit/<int:id>', methods=["PUT"])
@login_required
def edit_message(id):
    
    message = Message.query.get(id)

    if message is None:
        return {"error": "no such message"}
    
    form = CreateMessage()
  
    form['csrf_token'].data = request.cookies['csrf_token']
    
    if form.validate_on_submit():
       
     
        message.message = form.data["message"]
       
        
        db.session.commit()
        return message.to_dict()

    if form.errors:
        print(form.errors)
        return {"errors": form.errors}, 400
    return

@message_routes.route('/<int:id>/delete')
@login_required
def delete_message(id):

    message = Message.query.get(id)

    if message is None:
        return {"message": "No Such Message"}
    
    db.session.delete(message)
    db.session.commit()

    return {"message": "Message successfully deleted"}