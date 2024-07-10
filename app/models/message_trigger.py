from .db import db, environment, SCHEMA, add_prefix_for_prod


class MessageTrigger(db.Model):
    __tablename__ = 'message_triggers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey(add_prefix_for_prod("user.id")))
    title = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    active = db.Column(db.Select, nullable=False)
    run_trigger = db.Column(db.Select, nullable=False)
    conditions = db.Column(db.Select, nullable=False)
    actions = db.Column(db.Select, nullable=False)

    message_triggers_user = db.relationship(
        "message_triggers_user",
        back_populates = "users_message_triggers"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "active": self.active, 
            "run_trigger": self.run_trigger,
            "conditions": self.conditions,
            "actions": self.actions
        }