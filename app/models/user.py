from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    users_message_triggers = db.relationship(
        "MessageTrigger",
        back_populates = 'message_triggers_user',
        cascade="delete"
    )

    users_macros = db.relationship(
        "Macro",
        back_populates = "macros_user",
        cascade="delete"
    )

    users_tickets = db.relationship(
        "Ticket",
        back_populates = "tickets_user"
    )

    users_customers = db.relationship(
        "Customer",
        back_populates = "customers_user"
    )

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # "users_message_triggers": [trigger.to_dict() for trigger in self.users_message_triggers],
            # "users_macros": [macro.to_dict() for macro in self.users_macros],
            # "users_tickets": [ticket.to_dict() for ticket in self.users_tickets],
            # "users_customers": [customer.to_dict() for customer in self.users_customers]
        }
