from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, IntegerField, StringField, SelectField
from app.api.aws import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired

class TicketForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    type = SelectField("type", validators=[DataRequired()], choices=["Question", "Incident", "Problem", "Task"])
    priority = SelectField("priority", validators=[DataRequired()], choices=["Low", "Medium", "High", "Urgent"])
    assignee = IntegerField("assignee", validators=[DataRequired()])
    requester = IntegerField("requester", validators=[DataRequired()])
    apply_macro = IntegerField("apply_macro")
    description = StringField("description", validators=[DataRequired()])
    submit = SubmitField("Submit Ticket")

