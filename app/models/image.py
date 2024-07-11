from .db import db, environment, SCHEMA, add_prefix_for_prod

class Image(db.Model):
    __tablename__ = 'images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    ticket_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("tickets.id")), unique=True, nullable=False)
    image = db.Column(db.String(2000), nullable=False)

    images_ticket = db.relationship(
        "Ticket",
        back_populates = "tickets_images"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "ticket_id": self.ticket_id,
            "image": self.image
        }