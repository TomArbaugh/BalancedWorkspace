from .db import db, environment, SCHEMA, add_prefix_for_prod


class Customer(db.Model):
    __tablename__ = 'customers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey(add_prefix_for_prod("user.id")))
    name = db.Column(db.string(40), nullable=False)
    email = db.Column(db.string(255), nullable=False, unique=True)

    customers_user = db.relationship(
        "User",
        back_populates = "users_customers"
    )

    customers_tickets = db.relationship(
        "Ticket",
        back_populates = "tickets_customer",
        cascade="delete"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "email": self.email
        }