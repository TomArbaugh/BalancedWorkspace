from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField, IntegerField, StringField, SelectField
from app.routes.aws_helpers import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired

class TicketForm(FlaskForm):
    title = StringField("title", validators=[DataRequired()])
    assignee = SelectField("assignee", validators=[DataRequired()], choices=[])
    type = SelectField("type", validators=[DataRequired()], choices=["Question", "Incident", "Problem", "Task"])
    priority = SelectField("priority", validators=[DataRequired()], choices=["Low", "Medium", "High", "Urgent"])
    image = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    apply_macro = SelectField("apply_macro", validators=[DataRequired()], choices=[])
    submit = SubmitField("Submit Ticket")


"""EXAMPLE ROUTE 

from flask import Blueprint, request
from app.models import db, Image
from flask_login import current_user, login_required
from app.s3_helpers import (
    upload_file_to_s3, get_unique_filename)

image_routes = Blueprint("images", __name__)


@image_routes.route("", methods=["POST"])
@login_required
def upload_image():
    form = ImageForm()
 
    if form.validate_on_submit():
          
        image = form.data["image"]
        image.filename = get_unique_filename(image.filename)
        upload = upload_file_to_s3(image)
        print(upload)

        if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when you tried to upload
        # so you send back that error message (and you printed it above)
            return render_template("post_form.html", form=form, errors=[upload])

        url = upload["url"]
        new_image = Post(image= url)
        db.session.add(new_image)
        db.session.commit()
        return redirect("/posts/all")

    if form.errors:
        print(form.errors)
        return render_template("post_form.html", form=form, errors=form.errors)

    return render_template("post_form.html", form=form, errors=None)"""