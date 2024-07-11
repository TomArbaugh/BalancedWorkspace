from app.models import db, Customer, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_customers():
    customer_one = Customer(
        user_id= 1, name='John Smith', email='abc@email.com')
    customer_two = Customer(
        user_id= 2, name='Andrew Kim', email='def@email.com')
    customer_three = Customer(
        user_id= 3, name='Katrina Garcia', email='ghi@email.com')
    customer_four = Customer(
        user_id= 1, name='Xiao Gao', email='jkl@email.com')
    customer_five = Customer(
        user_id= 2, name='Raj Koothrapali', email='mno@email.com')
    customer_six = Customer(
        user_id= 3, name='Sheldon Cooper', email='pqr@email.com')
    customer_seven = Customer(
        user_id= 1, name='Lennard Hofsteader', email='stu@email.com')
    customer_eight = Customer(
        user_id= 2, name='Howard Dunawitz', email='vwx@email.com')
    customer_nine = Customer(
        user_id= 3, name='Penny Lane', email='yza@email.com')
    customer_ten = Customer(
        user_id= 1, name='Elinor Rigby', email='bcd@email.com')
    customer_eleven = Customer(
        user_id= 2, name='Sergey Levine', email='efg@email.com')
    customer_twelve = Customer(
        user_id= 3, name='Albert Einstein', email='hig@email.com')
    customer_thirteen = Customer(
        user_id= 1, name='Erwin Schrödinger', email='klm@email.com')
    customer_fourteen = Customer(
        user_id= 2, name='Pythagoras', email='nop@email.com')
    customer_fifteen = Customer(
        user_id= 3, name='Socrates', email='qrs@email.com')
    customer_sixteen = Customer(
        user_id= 1, name='Plato', email='tuv@email.com')
    customer_seventeen = Customer(
        user_id= 2, name='Aristotle', email='wxy@email.com')
    customer_eighteen = Customer(
        user_id= 3, name='Heraclitus', email='zab@email.com')
    customer_nineteen = Customer(
        user_id= 1, name='Thales Of Miletus', email='cde@email.com')
    customer_twenty = Customer(
        user_id= 2, name='Parmenides', email='fga@email.com')

    customers = [customer_one, customer_two, customer_three, customer_four, customer_five, customer_six, customer_seven, customer_eight, customer_nine, customer_ten, customer_eleven, customer_twelve, customer_thirteen, customer_fourteen, customer_fifteen, customer_sixteen, customer_seventeen, customer_eighteen, customer_nineteen, customer_twenty]
    
    for customer in customers:
        db.session.add(customer)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_customers():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.customers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM customers"))
        
    db.session.commit()