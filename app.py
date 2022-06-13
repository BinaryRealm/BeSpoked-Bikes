"""
Main App
"""
# pylint: disable=no-member, bare-except
import os
import re
import datetime
import flask
import flask_login
from dotenv import find_dotenv, load_dotenv
from werkzeug.security import check_password_hash
from models import db, AppUser, Salespersons, Products, Customers, Sales, Discounts

# modify database url environment variable so it is usable by SQLAlchemy
load_dotenv(find_dotenv())
uri = os.getenv("DATABASE_URL")
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

# initialize application, database, and flask-login
app = flask.Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.secret_key = os.getenv("SECRET_KEY")


db.init_app(app)

with app.app_context():
    db.create_all()

login_manager = flask_login.LoginManager()
login_manager.init_app(app)


@login_manager.user_loader
def user_loader(user_id):
    """
    returns user id,
    required by flask-login
    """
    return AppUser.query.get(user_id)


@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def index(path):  # pylint: disable=unused-argument
    """
    root page
    """
    if not flask_login.current_user.is_authenticated:
        return flask.render_template("login.html")
    return flask.render_template("index.html")


@app.route("/api/salespersons")
@flask_login.login_required
def salespersons():
    """
    api endpoint to return all salespersons
    """
    query = Salespersons.query.order_by(Salespersons.id)
    salespersons_list = []
    for salesperson in query:
        salespersons_list.append(
            {
                "id": salesperson.id,
                "first_name": salesperson.first_name,
                "last_name": salesperson.last_name,
                "address": salesperson.address,
                "phone": salesperson.phone,
                "start_date": salesperson.start_date,
                "termination_date": salesperson.termination_date,
                "manager": salesperson.manager,
            }
        )
    return flask.jsonify(salespersons_list)


@app.route("/api/salesperson/<int:salesperson_id>")
@flask_login.login_required
def salesperson(salesperson_id):
    """
    fetch a salesperson
    """
    sp = Salespersons.query.filter_by(id=salesperson_id).first()
    if not sp:
        return "Salesperson not found"
    else:
        return flask.jsonify(
            {
                "id": sp.id,
                "first_name": sp.first_name,
                "last_name": sp.last_name,
                "address": sp.address,
                "phone": sp.phone,
                "start_date": sp.start_date,
                "termination_date": sp.termination_date,
                "manager": sp.manager,
            }
        )


@app.route("/api/salesperson/update/", methods=["POST"])
@flask_login.login_required
def update_salesperson():
    """
    update a salesperson
    """
    data = flask.request.json
    print(data)
    sp = Salespersons.query.filter_by(id=data["id"]).first()
    sp.first_name = data["first_name"]
    sp.last_name = data["last_name"]
    sp.address = data["address"]
    sp.phone = data["phone"]
    sp.start_date = data["start_date"]
    sp.termination_date = data["termination_date"]
    sp.manager = data["manager"]
    try:
        db.session.commit()
        return flask.jsonify("Changes successfully saved")
    except:
        return flask.jsonify("Error saving to database")


@app.route("/api/products")
@flask_login.login_required
def products():
    """
    api endpoint to return all products
    """
    query = Products.query.order_by(Products.id)
    products_list = []
    for product in query:
        products_list.append(
            {
                "id": product.id,
                "name": product.name,
                "manufacturer": product.manufacturer,
                "style": product.style,
                "purchase_price": product.purchase_price,
                "sale_price": product.sale_price,
                "qty_on_hand": product.qty_on_hand,
                "commission_percentage": product.commission_percentage,
            }
        )
    return flask.jsonify(products_list)


@app.route("/api/product/<int:product_id>")
@flask_login.login_required
def product(product_id):
    """
    fetch a product
    """
    product = Products.query.filter_by(id=product_id).first()
    if not product:
        return "Product not found"
    else:
        return flask.jsonify(
            {
                "id": product.id,
                "name": product.name,
                "manufacturer": product.manufacturer,
                "style": product.style,
                "purchase_price": product.purchase_price,
                "sale_price": product.sale_price,
                "qty_on_hand": product.qty_on_hand,
                "commission_percentage": product.commission_percentage,
            }
        )


@app.route("/api/product/update/", methods=["POST"])
@flask_login.login_required
def update_product():
    """
    update a product
    """
    data = flask.request.json
    print(data)
    p = Products.query.filter_by(id=data["id"]).first()
    p.name = data["name"]
    p.manufacturer = data["manufacturer"]
    p.style = data["style"]
    p.purchase_price = data["purchase_price"]
    p.sale_price = data["sale_price"]
    p.qty_on_hand = data["qty_on_hand"]
    p.commission_percentage = data["commission_percentage"]
    try:
        db.session.commit()
        return flask.jsonify("Changes successfully saved")
    except:
        return flask.jsonify("Error saving to database")


@app.route("/api/customers")
@flask_login.login_required
def customers():
    """
    api endpoint to return all customers
    """
    query = Customers.query.order_by(Customers.id)
    customers_list = []
    for customer in query:
        customers_list.append(
            {
                "id": customer.id,
                "first_name": customer.first_name,
                "last_name": customer.last_name,
                "address": customer.address,
                "phone": customer.phone,
                "start_date": customer.start_date,
            }
        )
    return flask.jsonify(customers_list)


@app.route("/api/sales")
@flask_login.login_required
def sale():
    """
    api endpoint to get sales info
    """
    query = Sales.query.order_by(Sales.sales_date)
    sales_list = format_sales(query)
    return flask.jsonify(sales_list)


def format_sales(query):
    """
    process a list of sales into a useful format
    """
    sales_list = []
    for sale in query:
        product = Products.query.filter_by(id=sale.product_id).first()
        customer = Customers.query.filter_by(id=sale.customer_id).first()
        salesperson = Salespersons.query.filter_by(id=sale.salesperson_id).first()
        product_name = product.name
        customer_name = customer.first_name + " " + customer.last_name
        price = product.sale_price
        salesperson_name = salesperson.first_name + " " + salesperson.last_name
        commission_percentage = product.commission_percentage
        sales_list.append(
            {
                "product": product_name,
                "customer": customer_name,
                "date": sale.sales_date,
                "price": price,
                "discount_price": get_price_with_discount(
                    price, product.id, sale.sales_date
                ),
                "salesperson": salesperson_name,
                "commission": calculate_commission(
                    price, commission_percentage, product.id, sale.sales_date
                ),
            }
        )
    return sales_list


def get_price_with_discount(price, product_id, sales_date):
    """
    apply discounts to the sale price
    """
    discounts = Discounts.query.filter_by(product_id=product_id).all()
    discount_price = price
    if not discounts:
        return price
    else:
        for discount in discounts:
            if (
                discount.begin_date.date()
                <= sales_date.date()
                <= discount.end_date.date()
            ):
                discount_price = discount_price - (
                    discount_price * (discount.discount_percentage / 100)
                )
        return discount_price


def calculate_commission(price, commission_percentage, product_id, sales_date):
    """
    Calculate commission
    """
    return get_price_with_discount(price, product_id, sales_date) * (
        commission_percentage / 100
    )


@app.route("/sale/new", methods=["POST"])
@flask_login.login_required
def new_sale():
    """
    create a new sale
    """
    data = flask.request.json
    sale = Sales(
        product_id=data["product_id"],
        salesperson_id=data["salesperson_id"],
        customer_id=data["customer_id"],
        sales_date=datetime.datetime.now(),
    )
    product = Products.query.filter_by(id=sale.product_id).first()
    if product.qty_on_hand == 0:
        return flask.jsonify("Invalid Purchase: Product Out of Stock")
    product.qty_on_hand -= 1
    db.session.add(sale)
    db.session.commit()
    return flask.jsonify("Sale Successfully Created")


@app.route("/report", methods=["POST"])
@flask_login.login_required
def report():
    """
    create a new sale
    """
    data = flask.request.json
    sales = Sales.query.filter_by(salesperson_id=data["salesperson_id"]).all()
    if not sales:
        return flask.jsonify("Salesperson has no sales")
    year_sales = []
    for sale in sales:
        if sale.sales_date.year == data["year"]:
            year_sales.append(sale)
    if len(year_sales) == 0:
        return flask.jsonify(f"Salesperson has no sales in the year { data['year'] } ")
    quarter_sales = []
    quarter = data["quarter"]
    if quarter == 1:
        for sale in year_sales:
            if 1 <= sale.sales_date.month <= 3:
                quarter_sales.append(sale)
    elif quarter == 2:
        for sale in year_sales:
            if 4 <= sale.sales_date.month <= 6:
                quarter_sales.append(sale)
    elif quarter == 3:
        for sale in year_sales:
            if 7 <= sale.sales_date.month <= 9:
                quarter_sales.append(sale)
    elif quarter == 4:
        for sale in year_sales:
            if 10 <= sale.sales_date.month <= 12:
                quarter_sales.append(sale)
    if len(quarter_sales) == 0:
        return flask.jsonify(
            f"Salesperson has no sales in the quarter { data['quarter'] } of year { data['year'] } "
        )

    sales_list = format_sales(quarter_sales)
    bonus = 0
    for sale in sales_list:
        bonus += sale["commission"]
    return flask.jsonify(sales=sales_list, bonus=bonus)


@app.route("/login")
def login():
    """
    Display login page
    """
    return flask.render_template("login.html")


@app.route("/login", methods=["POST"])
def login_post():
    """
    Login the user
    Ensures username is valid, otherwise reprompting the user to login again
    """
    email = flask.request.form.get("email")
    password = flask.request.form.get("password")

    regex = re.compile(
        r"([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(.[A-Z|a-z]{2,})+"
    )
    if re.fullmatch(regex, email):
        user = AppUser.query.filter_by(email=email).first()

        # check if user actually exists
        # take the user supplied password, hash it,
        # and compare it to the hashed password in database
        if not user or not check_password_hash(user.password, password):
            flask.flash("Please check your login details and try again")
            return flask.redirect(flask.url_for("login"))
        if user is not None:
            flask_login.login_user(user)
            return flask.redirect(flask.url_for("index"))
        flask.flash("User does not exist")
        return flask.redirect(flask.url_for("login"))
    flask.flash("Please check your email is correct")
    return flask.redirect(flask.url_for("login"))


@app.route("/logout")
@flask_login.login_required
def logout():
    """
    Logout the user
    """
    flask_login.logout_user()
    return flask.redirect(flask.url_for("login"))


@app.route("/username")
@flask_login.login_required
def username():
    """
    API endpoint to get the currently logged-in user's username
    """
    return flask.jsonify(flask_login.current_user.username)


if __name__ == "__main__":
    app.run(
        host=os.getenv("IP", "0.0.0.0"), port=int(os.getenv("PORT", 8080)), debug=True
    )
