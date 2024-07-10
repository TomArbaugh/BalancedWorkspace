from .db import db, environment, SCHEMA, add_prefix_for_prod


class Ticket(db.Model):
    __tablename__ = 'tickets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey(add_prefix_for_prod("user.id")))
    customer_id = db.Column(db.Integer, nullable=False, db.ForeignKey(add_prefix_for_prod("customer.id")))
    title = db.Column(db.String(50), nullable=False)
    requester = db.Column(db.Integer, nullable=False)
    assignee = db.Column(db.Integer, nullable=False)
    type = db.Column(db.Select, nullable=False)
    priority = db.Column(db.Select, nullable=False)
    apply_macro = db.Column(db.Select, nullable=False, db.ForeignKey(add_prefix_for_prod("macros.id")))

    tickets_user = db.relationship(
        "tickets_user",
        back_populates = "users_tickets"
    )

    tickets_customer = db.relationship(
        "tickets_customer",
        back_populates = "customers_tickets"
    )

    tickets_macros = db.relationship(
        "tickets_macros",
        back_populates = "macros_ticket"
    )

    def to_dict(self):
        return {
            "id": self.id, 
            "user_id": self.user_id, 
            "title": self.title,
            "requester": self.requester,
            "assignee": self.assignee,
            "type": self.type,
            "priority": self.priority,
            "apply_macro": self.apply_macro
        }