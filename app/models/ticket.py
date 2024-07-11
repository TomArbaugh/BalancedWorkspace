from .db import db, environment, SCHEMA, add_prefix_for_prod


class Ticket(db.Model):
    __tablename__ = 'tickets'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(40), nullable=False)
    type = db.Column(db.String(255), nullable=False)
    priority = db.Column(db.String(40), nullable=False)
    assignee = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),  nullable=False)
    requester = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("customers.id")), nullable=False)
    apply_macro = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("macros.id")))
    description = db.Column(db.String(2000), nullable=False)

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
        back_populates = "images_ticket",
        cascade="delete"
    )

    def to_dict(self):
        return {
            "id": self.id,  
            "title": self.title,
            "type": self.type,
            "priority": self.priority,
            "assignee": self.assignee,
            "requester": self.requester,
            "apply_macro": self.apply_macro,
            "description": self.description,
            "tickets_images": [image.to_dict() for image in self.tickets_images]
        }