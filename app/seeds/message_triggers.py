from app.models import db, MessageTrigger, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_message_triggers():
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
    demo = MessageTrigger(
        user_id='Demo', title='demo@aa.io', description='password', active='', run_trigger='', conditions='', actions='')
        
    


    db.session.add()
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