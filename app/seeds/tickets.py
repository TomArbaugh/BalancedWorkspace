from app.models import db, Ticket, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_tickets():
    ticket_one = Ticket(
        requester=1, title='Dive Boat', type='Question', priority='Low', assignee=1, apply_macro=None, description="I recently went on a dive and really liked the boat. Is it possible for you to tell me more about it? I'd really like to try to stay on this kind of boat when I go diving.")
    ticket_two = Ticket(
        requester=2, title='Stage 2', type='Problem', priority='Medium', assignee=2, apply_macro=None, description='I bought this stage two from your shop the last time I was there. It malfunctioned on my dive in Hawaii last weekend. Luckily, I tested it first and ended up borrowing one from the dive shop. I would like my money back.')
    ticket_three = Ticket(
        requester=3, title='Sea Monster', type='Task', priority='High', assignee=3, apply_macro=None, description="I have found a sea monster and am leading a crew to capture it, learn it's language, and colaborate on a music project. I need two of your best divers (one who plays drums).")
    ticket_four = Ticket(
        requester=4, title='Leaned on something', type='Incident', priority='Urgent', assignee=1, apply_macro=None, description="Hey I leaned on this and now my arm feels weird. Serves me right for disturbing life under the sea, but I'm freaking out. What do I do?")
    ticket_five = Ticket(
        requester=5, title="Octopus' Garden", type='Question', priority='Urgent', assignee=2, apply_macro=None, description="Hello from under the sea! Under the sea is where I thought I would find my octopus' garden, but so far no luck. I fell like I was the closest when I was here. What do you think? Right or left?")
    ticket_six = Ticket(
        requester=6, title='Octo', type='Problem', priority='High', assignee=3, apply_macro=None, description="I dove with your shop and my octo didn't work. The dive master let me use hers, but that's not ok.")
    ticket_seven = Ticket(
        requester=7, title='Enrollment', type='Task', priority='Medium', assignee=1, apply_macro=None, description="I'm looking to enroll in this school. I heard you offer classes.")
    ticket_eight = Ticket(
        requester=8, title='Missed Opportunity', type='Incident', priority='Low', assignee=2, apply_macro=None, description="I saw this turtle and I really wanted a picture of it, but all I got was this one. Do you have any better pictures of this turtle?")
    ticket_nine = Ticket(
        requester=9, title='Enriched Air', type='Question', priority='Low', assignee=3, apply_macro=None, description="So, is enriched air just better for you in general? Can I get some from you? I guess I don't need to breath it all the time, but like a little every once in a while would make me better?")
    ticket_ten = Ticket(
        requester=10, title='Flag ignored', type='Problem', priority='Medium', assignee=1, apply_macro=None, description="The local ocean water skiing league has been ignoring dive flags and terring over head of divers trying to come to the surface. They must be stopped.")
    ticket_eleven = Ticket(
        requester=11, title='Under water photo', type='Task', priority='High', assignee=2, apply_macro=None, description="My brothers and I would like to take a photo under water together. Is there someone at your dive shop skilled with a camera under water?")
    ticket_twelve = Ticket(
        requester=12, title='Decompression', type='Incident', priority='Urgent', assignee=3, apply_macro=None, description="We had a diver unable to deflate their BCD, and the shot to the surface. We have given them oxygen and need transport to a decompression chamber.")
    ticket_thirteen = Ticket(
        requester=13, title='This Trip', type='Question', priority='Urgent', assignee=1, apply_macro=None, description="Hello! Is this trip for one day or three? Now that I'm here they say it's three, but I thought is was only one.")
    ticket_fourteen = Ticket(
        requester=14, title='This Class', type='Problem', priority='High', assignee=2, apply_macro=None, description="Hi, I took this class before going on my trip to French Polinesia, and they said it wasn't good enough to go on that dive. Why is your course not good enough? Can I have my money back? Or swap it out for the 'Advanced Open Water' one they keep talking about?")
    ticket_fifteen = Ticket(
        requester=15, title='Lost Go-Pro', type='Task', priority='Medium', assignee=3, apply_macro=None, description="Hi!!! I went for a dive at the Great Barrier Reef, and I totally lost my camera!!! Is there anyway you can dive at the site we went to and look for it for me? Thanks!")
    ticket_sixteen = Ticket(
        requester=16, title='Dive Computer Error', type='Incient', priority='Low', assignee=1, apply_macro=None, description="We just finshed our dive and my dive computer is beeping. We looked up the manual and apparently it thinks we skipped a decompression stop. I was with the dive master the whole time, and think the computer is broken. I have no signs of decompression sickness!")
    ticket_seventeen = Ticket(
        requester=17, title='Lemon or Grey', type='Question', priority='Low', assignee=2, apply_macro=None, description="Had a great dive at Rangiroa Island! I was wondering if the sharks we saw were Lemon Sharsk or Grey Sharks. Can you ask Lucille? Thanks!")
    ticket_eighteen = Ticket(
        requester=18, title='Forgot Mask', type='Problem', priority='Medium', assignee=3, apply_macro=None, description="Hello! I somehow left my mask and snorkel on the boat between the dive shop and the dive site. We're pretty busy tonight and tomorrow, but if we drop by tomorrow around four will we be able to pick it up?")
    ticket_nineteen = Ticket(
        requester=19, title='Advanced Open Water', type='Task', priority='High', assignee=1, apply_macro=None, description="Hello! I am diving tomorrow, and I know it's late notice, but I was wondering if the dive can go towards my Advanced Open Water certification. Let me know what we need to do!")
    ticket_twenty = Ticket(
        requester=20, title='Leaking Tank', type='Incident', priority='Urgent', assignee=2, apply_macro=None, description="Please get your equipment servi ed. My tank was leaking on my second dive and I ran out of air 3 times as fast as normal. I should only have to pay for a third of the dive. Please be more careful with peoples lives.")
    

    tickets = [ticket_one, ticket_two, ticket_three, ticket_four, ticket_five, ticket_six, ticket_seven, ticket_eight, ticket_nine, ticket_ten, ticket_eleven, ticket_twelve, ticket_thirteen, ticket_fourteen, ticket_fifteen, ticket_sixteen, ticket_seventeen, ticket_eighteen, ticket_nineteen, ticket_twenty]

    for ticket in tickets:
        db.session.add(ticket)
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