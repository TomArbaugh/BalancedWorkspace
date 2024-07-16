from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField
from wtforms.validators import DataRequired


class CreateMacroForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description", validators=[DataRequired()])
    submit = SubmitField("Submit Ticket")