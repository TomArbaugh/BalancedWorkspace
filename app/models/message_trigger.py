from .db import db, environment, SCHEMA, add_prefix_for_prod


class MessageTrigger(db.Model):
    __tablename__ = 'message_triggers'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False, db.ForeignKey(add_prefix_for_prod("user.id")))
    title = db.Column(db.String(40), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    active = db.Column(db.String(40), nullable=False)
    run_trigger = db.Column(db.String(255), nullable=False)
    conditions = db.Column(db.String(255), nullable=False)
    actions = db.Column(db.String(255))

    message_triggers_user = db.relationship(
        "User,
        back_populates = "users_message_triggers"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "title": self.title,
            "description": self.description,
            "active": self.active, 
            "run_trigger": self.run_trigger,
            "conditions": self.conditions,
            "actions": self.actions,
            "message_triggers_user": self.message_triggers_user.to_dict()
        }