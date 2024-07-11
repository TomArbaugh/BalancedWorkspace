from flask.cli import AppGroup
from .users import seed_users, undo_users
from .customers import seed_customers, undo_customers
from .images import seed_images, undo_images
from .macros import seed_macros, undo_macros
from .message_triggers import seed_message_triggers, undo_message_triggers
from .tickets import seed_tickets, undo_tickets
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_message_triggers()
        undo_images()
        undo_tickets()
        undo_macros()
        undo_customers()
        undo_users()
    seed_users()
    seed_customers()
    seed_macros()
    seed_tickets()
    seed_images()
    seed_message_triggers()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_message_triggers()
    undo_images()
    undo_tickets()
    undo_macros()
    undo_customers()
    undo_users()
    # Add other undo functions here
