from .db import db, environment, SCHEMA, add_prefix_for_prod


class Ticket(db.Model):
    __tablename__ = 'tickets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, nullable=False, db.ForeignKey(add_prefix_for_prod("customer.id")))
    title = db.Column(db.String(40), nullable=False)
    type = db.Column(db.String(255), nullable=False)
    priority = db.Column(db.String(40), nullable=False)
    assignee = db.Column(db.Integer, nullable=False, db.ForeignKey(add_prefix_for_prod("user.id")))
    apply_macro = db.Column(db.String(2000), db.ForeignKey(add_prefix_for_prod("macros.id")))

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

    tickets_images = db.relationship(
        "Image",
        back_populates = images_ticket
    )

    def to_dict(self):
        return {
            "id": self.id,  
            "customer_id": self.customer_id
            "title": self.title,
            "type": self.type,
            "priority": self.priority,
            "assignee": self.assignee,
            "tickets_images": [image.to_dict() for image in self.tickets_images]
            "apply_macro": self.apply_macro
        }