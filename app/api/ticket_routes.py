from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Ticket

ticket_routes = Blueprint('tickets', __name__)

