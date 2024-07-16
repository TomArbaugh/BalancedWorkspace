from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField
from wtforms.validators import DataRequired

class CreateCustomerForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    email = StringField("email", validators=[DataRequired()])
    submit = SubmitField("Submit Ticket")