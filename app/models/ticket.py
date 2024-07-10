from .db import db, environment, SCHEMA, add_prefix_for_prod


class Ticket(db.Model):
    __tablename__ = 'tickets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey(add_prefix_for_prod("user.id")))
    customer_id = db.Column(db.Integer, nullable=False, db.ForeignKey(add_prefix_for_prod("customer.id")))
    title = db.Column(db.String(40), nullable=False)
    requester = db.Column(db.Integer, nullable=False)
    assignee = db.Column(db.Integer, nullable=False)
    type = db.Column(db.String(255), nullable=False)
    priority = db.Column(db.String(40), nullable=False)
    photo_url = db.Column(String(2000))
    apply_macro = db.Column(db.String(2000), nullable=False, db.ForeignKey(add_prefix_for_prod("macros.id")))

    tickets_user = db.relationship(
        "User",
        back_populates = "users_tickets"
    )

    tickets_customer = db.relationship(
        "Customer",
        back_populates = "customers_tickets"
    )

    tickets_macros = db.relationship(
        "Macro",
        back_populates = "macros_ticket"
    )

    def to_dict(self):
        return {
            "id": self.id, 
            "user_id": self.user_id, 
            "customer_id": self.customer_id
            "title": self.title,
            "requester": self.requester,
            "assignee": self.assignee,
            "type": self.type,
            "priority": self.priority,
            "photo_url": self.photo_url,
            "apply_macro": self.apply_macro
        }