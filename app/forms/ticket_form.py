from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, IntegerField, StringField, SelectField
from app.routes.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired

class TicketForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    type = SelectField("type", validators=[DataRequired()], choices=["Question", "Incident", "Problem", "Task"])
    priority = SelectField("priority", validators=[DataRequired()], choices=["Low", "Medium", "High", "Urgent"])
    assignee = SelectField("assignee", choices=[])
    requester = SelectField("requester", choices=[])
    apply_macro = SelectField("apply_macro", validators=[DataRequired()], choices=[])
    description = StringField("description", validators=[DataRequired()])
    submit = SubmitField("Submit Ticket")


"""EXAMPLE ROUTE 



image_routes = Blueprint("images", __name__)


"""