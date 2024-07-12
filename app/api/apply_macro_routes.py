from app.models import db, Macro
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required



apply_macro_routes = Blueprint('macro', __name__)

@apply_macro_routes.route('/')
@login_required
def get_macro_Id():
    macros = Macro.query.filter_by(user_id=current_user.id).all()
   
    if macros is None:
        return {"error": "Macro Not Found" }
    else:
        return [macro.to_dict() for macro in macros]
    