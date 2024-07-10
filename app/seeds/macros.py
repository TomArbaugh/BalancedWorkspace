from app.models import db, Macro, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_macros():
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    demo = Macro(
        user_id='Demo', name='demo@aa.io', description='password', available_for='', actions='')
    

    db.session.add()
    db.session.add()
    db.session.add()
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_macros():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.macro RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM macro"))
        
    db.session.commit()