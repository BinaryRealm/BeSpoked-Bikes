"""
This is the database model
"""
# pylint: disable=no-member
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


class Products(db.Model):
    """
    Product model
    Unique constraint on product name ensures uniqueness of products
    """

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    manufacturer = db.Column(db.String(50), nullable=False)
    style = db.Column(db.String(50), nullable=False)
    purchase_price = db.Column(db.Float, nullable=False)
    sale_price = db.Column(db.Float, nullable=False)
    qty_on_hand = db.Column(db.Integer, nullable=False)
    commission_percentage = db.Column(db.Float, nullable=False)
    sales = db.relationship("Sales", backref="products", lazy=True)
    discounts = db.relationship("Discounts", backref="products", lazy=True)


class Salespersons(db.Model):
    """
    Salesperson model
    """

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    termination_date = db.Column(db.DateTime)
    manager = db.Column(db.String(75), nullable=False)
    sales = db.relationship("Sales", backref="salespersons", lazy=True)


class Customers(db.Model):
    """
    Customer model
    """

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40), nullable=False)
    last_name = db.Column(db.String(40), nullable=False)
    address = db.Column(db.String(200), nullable=False)
    phone = db.Column(db.String(50), nullable=False)
    start_date = db.Column(db.DateTime, nullable=False)
    sales = db.relationship("Sales", backref="customers", lazy=True)


class Sales(db.Model):
    """
    Sales model
    """

    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), primary_key=True)
    salesperson_id = db.Column(
        db.Integer, db.ForeignKey("salespersons.id"), primary_key=True
    )
    customer_id = db.Column(db.Integer, db.ForeignKey("customers.id"), primary_key=True)
    sales_date = db.Column(db.DateTime, primary_key=True)


class Discounts(db.Model):
    """
    Discount model
    """

    product_id = db.Column(db.Integer, db.ForeignKey("products.id"), primary_key=True)
    begin_date = db.Column(db.DateTime, primary_key=True)
    end_date = db.Column(db.DateTime, primary_key=True)
    discount_percentage = db.Column(db.Float, primary_key=True)
