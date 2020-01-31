from flask_sqlalchemy import SQLAlchemy
# from flask import FlaskForm
from wtforms import StringField, FloatField

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class Pet(db.Model):

    __tablename__ = "pets"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(25), nullable=False)
    species = db.Column(db.String(25), nullable=False)
    photo_url = db.Column(db.Text, nullable=True, default='https://www.profitero.com/wp-content/uploads/2016/05/petcare-1.jpg')
    age = db.Column(db.Integer, nullable=False)
    notes = db.Column(db.Text)
    available = db.Column(db.Boolean, default=True)