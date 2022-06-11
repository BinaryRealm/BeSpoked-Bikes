"""
This is the database model
"""
from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()


class AppUser(UserMixin, db.Model):
    """
    User model
    """

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(100))

class LikeEvents(db.Model):
    """
    LikeEvents model
    """

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    like_list = db.Column(db.String(800))
    dislike_list = db.Column(db.String(800))
