"""
Main App
"""

import os
import re
import flask
import flask_login
from dotenv import find_dotenv, load_dotenv
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, AppUser, LikeEvents
from spoonacular import (
    get_recipe_info,
    get_ingredient_info,
    search_recipe,
    search_ingredients,
    search_recipe_by_cuisine_type,
)

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
        return flask.render_template("landing.html")
    return flask.render_template("index.html")


@app.route("/search", methods=["POST"])
@flask_login.login_required
def search():
    """
    search the spoonacular api
    """
    data = flask.request.json
    number = data["length"]
    if data["type"] == "Recipes":
        results = search_recipe(data["query"], number)
    else:
        results = search_ingredients(data["query"], number)
    return flask.jsonify(results)


# pylint: disable=too-many-locals
@app.route("/recipe/<int:recipe_id>")
def recipe(recipe_id):
    """
    return a page with info about a recipe
    """
    if not flask_login.current_user.is_authenticated:
        return flask.redirect(flask.url_for("login"))

    results = get_recipe_info(recipe_id=recipe_id)
    if results == "apierror":
        return flask.render_template("error.html")

    (
        title,
        image,
        source_url,
        ready_in_minutes,
        servings,
        price_per_serving,
        cuisines,
        dish_types,
        instructions,
        analyzed_instructions,
        ingredients,
        diets,
        dairy_free,
        gluten_free,
        vegan,
        vegetarian,
        nutrition_info,
    ) = results

    return flask.render_template(
        "recipe.html",
        title=title,
        image=image,
        source_url=source_url,
        ready_in_minutes=ready_in_minutes,
        servings=servings,
        price_per_serving=price_per_serving,
        cuisines=cuisines,
        dish_types=dish_types,
        instructions=instructions,
        analyzed_instructions=analyzed_instructions,
        ingredients=ingredients,
        diets=diets,
        dairy_free=dairy_free,
        gluten_free=gluten_free,
        vegan=vegan,
        vegetarian=vegetarian,
        nutrition_info=nutrition_info,
        username=flask_login.current_user.username,
    )


@app.route("/ingredient/<int:ingredient_id>")
def ingredient(ingredient_id):
    """
    return a page with info about an ingredient
    """
    if not flask_login.current_user.is_authenticated:
        return flask.redirect(flask.url_for("login"))
    results = get_ingredient_info(ingredient_id=ingredient_id)
    if results == "apierror":
        return flask.render_template("error.html")

    (
        name,
        image,
        aisle,
        estimated_cost,
        caloric_breakdown,
        nutrients,
        weight_per_serving,
    ) = results
    return flask.render_template(
        "ingredient.html",
        name=name,
        image=image,
        aisle=aisle,
        estimated_cost=estimated_cost,
        caloric_breakdown=caloric_breakdown,
        nutrients=nutrients,
        weight_per_serving=weight_per_serving,
        username=flask_login.current_user.username,
    )


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
    # data = flask.request.form
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
            flask.flash("Please check your login details and try again.")
            return flask.redirect(flask.url_for("login"))

        # if data["username"] == "":
        # flask.flash("Please enter a username")
        # return flask.redirect(flask.url_for("login"))
        # query = AppUser.query.filter_by(username=data["username"]).first()
        if user is not None:
            flask_login.login_user(user)
            return flask.redirect(flask.url_for("index"))
        flask.flash("User does not exist")
        return flask.redirect(flask.url_for("login"))
    flask.flash("Please check your email")
    return flask.redirect(flask.url_for("login"))


@app.route("/register")
def register():
    """
    Display register page
    """
    return flask.render_template("register.html")


@app.route("/register", methods=["POST"])
def register_post():
    """
    Register the user
    Validates that username is a valid username,
    and that the username does not already exist in the database.
    Upon successful registration, user is redirected to login page.
    """
    email = flask.request.form.get("email")
    user_name = flask.request.form.get("username")
    password = flask.request.form.get("password")

    regex = re.compile(
        r"([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(.[A-Z|a-z]{2,})+"
    )
    if re.fullmatch(regex, email):
        email_query = AppUser.query.filter_by(
            email=email
        ).first()  # if this returns a user, then the email already exists in database

        if (
            email_query
        ):  # if a user is found, we want to redirect back to signup page so user can try again
            flask.flash("Email address already exists")
            return flask.redirect(flask.url_for("register"))

        username_query = AppUser.query.filter_by(
            username=user_name
        ).first()  # if this returns a user, then the user already exists in database

        if (
            username_query
        ):  # if a user is found, we want to redirect back to signup page so user can try again
            flask.flash("Username already exists")
            return flask.redirect(flask.url_for("register"))

        # create new user with the form data. Hash the password so plaintext version isn't saved.
        new_user = AppUser(
            email=email,
            username=user_name,
            password=generate_password_hash(password, method="sha256"),
        )
        # new_user = AppUser(username=data["username"])
        # query = AppUser.query.filter_by(username=new_user.username).first()
        if new_user is not None:
            db.session.add(new_user)
            db.session.commit()
        else:
            flask.flash("User already signed up")
            return flask.redirect(flask.url_for("register"))
        flask.flash("Successfully Registered")
        return flask.redirect(flask.url_for("login"))
    flask.flash("Please check your email")
    return flask.redirect(flask.url_for("register"))


@app.route("/recommendation", methods=["POST"])
def get_recommendation():
    """
    get daily recommendation given user choosed cuisine and dish_type
    """
    data = flask.request.get_json()
    return flask.jsonify(
        search_recipe_by_cuisine_type(data["cuisine"], data["dish_type"], 3)
    )

@app.route("/likeEvent", methods=["POST"])
def like_recommandation():
    """
    record user behavior on like or dislike the recommandation
    """
    data = flask.request.get_json()
    username_query = LikeEvents.query.filter_by(
            username=flask_login.current_user.username
        ).first()
    event = None
    if username_query is None:
        if data["like"]:
            event = LikeEvents(username=flask_login.current_user.username,
            like_list=','.join(data['id_list']), dislike_list=[])
        else:
            event = LikeEvents(username=flask_login.current_user.username,
            like_list=[], dislike_list=','.join(data['id_list']))
        db.session.add(event)
    else:
        if data["like"]:
            username_query.like_list += ','.join(data['id_list'])
        else:
            username_query.dislike_list += ','.join(data['id_list'])

    db.session.commit()

    return flask.jsonify(
        {"status" : "succeed"}
    )

@app.route("/getLike", methods=["get"])
def get_liked_recipes():
    """get liked receipes for current user"""
    username_query = LikeEvents.query.filter_by(
            username=flask_login.current_user.username
        ).first()

    return flask.jsonify({
        'like_list' : username_query.like_list,
        'dislike_list' : username_query.dislike_list
    })

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
