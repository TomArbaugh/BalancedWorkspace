from app.models import db, Macro
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.forms.create_macro import CreateMacroForm


apply_macro_routes = Blueprint('macro', __name__)

@apply_macro_routes.route('/')
@login_required
def get_all_macros():
    macros = Macro.query.filter_by(user_id=current_user.id).all()
   
    if macros is None:
        return {"error": "Macros Not Found" }
    else:
        return [macro.to_dict() for macro in macros]

@apply_macro_routes.route('/<int:id>')
@login_required
def get_macro_Id(id):
    macro = Macro.query.get(id)

    if macro is None:
        return {"error": "Macro Not Found"}
    else:
        return macro.to_dict()

@apply_macro_routes.route('/create', methods=["POST"])
@login_required
def create_macro():
    form = CreateMacroForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_macro = Macro(
            user_id = current_user.id,
            name = form.data["name"],
            description = form.data["description"],
            available_for = current_user.id
        )
        db.session.add(new_macro)
        db.session.commit()
        return new_macro.to_dict()

    if form.errors:
        print(form.errors)
        return {"errors": form.errors}, 400
    return

@apply_macro_routes.route('/edit/<int:macroId>', methods=["PUT"])
@login_required
def edit_macro(macroId):

    macro = Macro.query.get(id)

    form = CreateMacroForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
       
        macro.user_id = current_user.id,
        macro.name = form.data["name"],
        macro.description = form.data["description"],
        macro.available_for = form.data["available_for"]
        
     
        db.session.commit()
        return new_macro.to_dict()

    if form.errors:
        print(form.errors)
        return {"errors": form.errors}, 400
    return

@apply_macro_routes.route("/<int:id>/delete")
@login_required
def delete_macro(id):

    macro = Macro.query.get(id)

    if macro is None:
        return {"message": "No Such Macro"}, 404

    db.session.delete(macro)
    db.session.commit()

    return {"message": "Macro deleted successfully"}
    