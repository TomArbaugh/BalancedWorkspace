from app.models import db, Image, environment, SCHEMA
from sqlalchemy.sql import text

# Adds a demo user, you can add other users here if you want
def seed_images():
    image_one = Customer(
        ticket_id=1, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/17636766_10155282365826495_8571014394843847501_o.jpg')
    image_two = Customer(
        ticket_id=2, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/17436093_10155282351821495_5402089099493990569_o.jpg')
    image_three = Customer(
        ticket_id=3 image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/GPTempDownload+8.jpg')
    image_four = Customer(
        ticket_id=4, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/17796123_10155282344681495_6837470877082983069_n.jpg')
    image_five = Customer(
        ticket_id=5, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/GPTempDownload.jpg')
    image_six= Customer(
        ticket_id=6, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/17492873_10155282357376495_226287308396872968_o.jpg')
    image_seven = Customer(
        ticket_id=7, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/17620189_10155282365526495_7201474761420171703_o.jpg')
    image_eight = Customer(
        ticket_id=8, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/17795872_10155282338391495_8125173508302383704_n.jpg')
    image_nine = Customer(
        ticket_id=9, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/Screenshot+2024-07-10+at+6.12.47%E2%80%AFPM.png')
    image_ten = Customer(
        ticket_id=10, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/12489275_10153932470491495_5056287276298904428_o.jpg')
    image_eleven = Customer(
        ticket_id=11, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/530735_10151430873726495_657095351_n.jpg')
    image_twelve = Customer(
        ticket_id=12, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/23748_10151430868916495_439594784_n.jpg')
    image_thirteen = Customer(
        ticket_id=13, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/17966251_10155323631096495_3172275008512528051_o.jpg')
    image_fourteen = Customer(
        ticket_id=14, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/Screenshot+2024-07-10+at+6.13.58%E2%80%AFPM.png')
    image_fifteen = Customer(
        ticket_id=15, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/GPTempDownload+2.jpg')
    image_sixteen = Customer(
        ticket_id=16, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/17620222_10155282345831495_3430212171992731514_o.jpg')
    image_seventeen = Customer(
        ticket_id=17, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/GPTempDownload+5.jpg')
    image_eighteen = Customer(
        ticket_id=18, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/17855126_10155323632346495_1822373095425265915_o.jpg')
    image_nineteen = Customer(
        ticket_id=19, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/Screenshot+2024-07-10+at+6.12.19%E2%80%AFPM.png')
    image_twenty = Customer(
        ticket_id=20, image='https://balancedworkspace.s3.us-west-2.amazonaws.com/Dive+pictures+/17492873_10155282357376495_226287308396872968_o.jpg')

    images = [image_one, image_two, image_three, image_four, image_five, image_six, image_seven, image_eight, image_nine, image_ten, image_eleven, image_twelve, image_thirteen, image_fourteen, image_fifteen, image_sixteen, image_seventeen, image_eighteen, image_nineteen, image_twenty]

    for image in images:
        db.session.add(image)
    
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM images"))
        
    db.session.commit()