from app.models import db, Message, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_messages():
    message_one = Message(
        sender_id=1, receiver_id=2, message='I will help you when I am back')
    message_two = Message(
        sender_id=1, receiver_id=3, message='Greet the customer right away')
    message_three = Message(
        sender_id=1, receiver_id=2, message='permanence')
    message_four = Message(
        sender_id=1, receiver_id=3, message='Why?')
    message_five = Message(
        sender_id=2, receiver_id=1, message='trying another message')
    message_six = Message(
        sender_id=3, receiver_id=1, message='One more time?')

    messages = [message_one, message_two, message_three, message_four, message_five, message_six]
    for message in messages:
        db.session.add(message)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_messages():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.messages RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM messages"))
        
    db.session.commit()