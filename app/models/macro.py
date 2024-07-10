from .db import db, environment, SCHEMA, add_prefix_for_prod


class Macro(db.Model):
     __tablename__ = 'macros'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey(add_prefix_for_prod("user.id")))
    name = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    available_for = db.Column(db.Select, nullable=False)
    actions = db.Column(db.String(255), nullable=False)

    macros_user = db.relationship(
        "User",
        back_populates = "users_macros"
    )

    macros_ticket = db.relationship(
        "Ticket",
        back_populates = "tickets_macros"
    )

    def to_dict(self):
        return {
            "id": self.id, 
            "user_id": self.user_id,
            "name": self.name,
            "description": self.description,
            "available_for": self.available_for,
            "actions": self.actions,
            "macros_user": self.macros_user.to_dict()
        }