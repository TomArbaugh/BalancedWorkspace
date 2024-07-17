from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField
from wtforms.validators import DataRequired

class CreateMessage(FlaskForm):
    message = StringField("message", validators=[DataRequired()])
    submit = SubmitField("Submit Ticket")