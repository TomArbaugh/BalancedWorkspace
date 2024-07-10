from app.models import db, Ticket, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_tickets():
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    demo = Ticket(
        user_id='Demo', customer_id='', title='demo@aa.io', requester='password', assignee='', type='', priority='', photo_url='', apply_macro=0)
    

 
    db.session.add()
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tickets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.tickets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM tickets"))
        
    db.session.commit()