from app.models import db, Macro, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_macros():
    macro_one = Macro(
        user_id=1, name='No Macros', description='No Macros', available_for='Me Only')
    macro_two = Macro(
        user_id=1, name='Padi Website', description="Hello! To start your adventures under the sea, begin by creating an account at https://www.padi.com/. We'll get you going on the online course work first, and then the fun will begin in the pool at the shop.", available_for='Me Only')
    macro_three = Macro(
        user_id=1, name='Certification Required', description='Hello, and thank you for your interest in one of our amazing dives! Please be ready to provide proof of certification before your dive begins. Open Water certification is required for all of our dives.', available_for='Me Only')
    macro_four = Macro(
        user_id=1, name='Private Instruction', description='Hello! Thank you for your interest in our Private Instruction program. We have many skilled dive masters offering more in depth and personalized training in diving! We will reach out to you shortly to help plan your private pool work sessions. Please be sure to have completed the online course work!', available_for='Me Only')
    macro_five = Macro(
        user_id=1, name='Discovery Dives', description='Hello! It sounds like you are familiar with the Discovery Dive program. We do not offer Discovery Dives, however, we do offer Scuba certification, which only requires two open water dives, and is more similar to the Discovery Dive certification than our full Open Water program.', available_for='Me Only')
    macro_six = Macro(
        user_id=1, name='Courses we offer', description='Hello! We provide certification for Open Water, Advanced Open Water, Dry Suit, and Scuba certification.', available_for='Me Only')
    macro_seven = Macro(
        user_id=1, name="Certification Complete", description="Congragulations on completeing your certification! Now it's time to gear up! Visit our shop this week and recieve 5% off of all purchases!", available_for='Me Only')
    macro_eight = Macro(
        user_id=1, name='Office Hours', description='Hello! Thank you for reaching out to our dive shop. Our hours are 8am - 8pm Monday through Saturday, with group Open Water Dive classes on Monday, Wednesday, and Friday nights. Drop by any time, or sign up for classes on our website! Have a great day!', available_for='Me Only')
    macro_nine = Macro(
        user_id=1, name='No Macros', description='No Macros', available_for='Me Only')
    macro_ten = Macro(
        user_id=1, name='No Macros', description='No Macros', available_for='Me Only')

    macros = [macro_one, macro_two, macro_three, macro_four, macro_five, macro_six, macro_seven, macro_eight, macro_nine, macro_ten]

    for macro in macros:
        db.session.add(macro)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_macros():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.macros RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM macros"))
        
    db.session.commit()