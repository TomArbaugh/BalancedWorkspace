from app.models import db, MessageTrigger, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_message_triggers():
    trigger_one = MessageTrigger(
        user_id=1, title='Out of office', description='I will help you when I am back', active='yes', run_trigger='when a customer requests a conversation', conditions='outside of business hours', actions="Hello and thank you for your interest! I am out of the office, but will be back durring normal business hours to assist you!")
    trigger_two = MessageTrigger(
        user_id=1, title='One Moment', description='Greet the customer right away', active='yes', run_trigger='when a customer requests a conversation', conditions='during business hours', actions="Hello, I will be right with you!")
    trigger_three = MessageTrigger(
        user_id=1, title='substance', description='permanence', active='no', run_trigger='when message is sent', conditions='customer name is Heraclitus', actions="Heraclitus, your scuba certification will remain permanently in existance, regardless of the permanents of the phrase that nothing remains permanently in existance.")
    trigger_five = MessageTrigger(
        user_id=1, title='Why', description='Why?', active='yes', run_trigger='when a customer requests a conversation', conditions='customer name is Socrates', actions='WHY???')

    
    for trigger in triggers:
        db.session.add(trigger)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_message_triggers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.message_triggers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM message_triggers"))
        
    db.session.commit()