# Final Project Sprint 2

## Heroku URL: https://blooming-peak-83738.herokuapp.com/
## Kanban Board URL: https://github.com/datatext33/SE-Group-15-Final-Project/projects/1

## All setup/installation commands ran in a WSL or powershell terminal:-

To install python package:
`sudo apt install python3-pip` <-- or `python` instead of `python3` if it is not supported/recognized

To install requests:
`pip3 install requests` <-- or `pip` instead of `pip3` depending on which one is supported/recognized

To install dotenv:
`pip3 install python-dotenv` <-- or `pip` instead of `pip3` depending on which one is supported/recognized

To install pylint:
`pip3 install pylint` <-- or `pip` instead of `pip3` depending on which one is supported/recognized

To install flask:
`pip3 install flask` <-- or `pip` instead of `pip3` depending on which one is supported/recognized

To install postgresql:
`sudo apt install postgresql` (Reference) https://github.com/csc4350-sp22/setup-and-demos/blob/main/csc-4350-setup.md#:~:text=sudo%20apt%20install%20postgresql%0Asudo%20service%20postgresql%20start%0Asudo%20%2Du%20postgres%20psql%20%20%23%20just%20testing%20that%20psql%20is%20installed.%20You%20should%20get%20an%20interactive%20prompt.%20Quit%20by%20entering%20%22%5Cq%22%0Apip3%20install%20psycopg2%2Dbinary%0Apip3%20install%20Flask%2DSQLAlchemy%3D%3D2.1

To install psycopg2-binary:
`pip3 install psycopg2-binary`

To install flask sqlalchemy version 2.1:
`pip3 install Flask-SQLAlchemy==2.1`

To install npm for dependencies/node
`sudo apt install npm`

To install Bootstrap
`npm install bootstrap`
`gem install bootstrap -v 5.1.3` to install its version

To install ESlint for Javascript
Refer to https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb

To setup black lint formatting
Refer to https://marcobelo.medium.com/setting-up-python-black-on-visual-studio-code-5318eba4cd00

## Technologies, Frameworks, Libraries, and APIs

This application uses Python and Node.js (for React).

To run this app, the python packages Flask, requests, python-dotenv, flask_login, flask_sqlalchemy, psycopg2 need to be installed through the `pip3 install` command.

# Other libraries used for login user purposes is:
1. `werkzeug.security` to generate and check password in and from postgresql database
2. `re`this library is particularly for regular expression to check whether or not user entered email in correct format.

# API used:

The Spoonacular api: This api gives the information about the recipes/ingredients of a particular food which is searched for. 
[More information about the api can be found here -->](https://rapidapi.com/spoonacular/api/recipe-food-nutrition/)


## Project Setup and Deployment 

1. `static` and `templates` folders are used when using Flask. Static folder contains react, css files and image folder which contains image of the project logo.
2. Templates on the other hand, contains all html files needed as per project requirements.
3. `app.py`contains all the main code of the project i.e., it renders all the code 
4. `models.py` contains the database table of the user that signs up. Basically, it keeps track of the user data. 
5. `spoonacular.py` contains code for fetching the information from spoonacular api using json fields.
6. `.env` file that consists of my API key and secret keys. Naming variable can be in all caps and should be the same name as used in `app.py` and `spoonacular.py` file.
7. `Procfile` that tells (basically) how to run the app when in Heroku
8. `requirements.txt` file to have all the external libraries that had to be install i.e. Flask, requests, python-dotenv flask_login, flask_sqlalchemy, psycopg2, `werkzeug.security` (for generating and checking) and `re` (for regular expression)
9. `run.mjs` contains the parcel implementation for hot reload.
10. `.gitignore` contains the files/folders that are not supposed to be pushed to Github.
<-------react folder in static folder------->
11. `LandingPage.js` contains the code for the main page that user sees clicking on the heroku link
12. `Navigation.js` contains the code for the navigation bar at the top of the page right after user authenticates
13. `RecipePanel.js` contains the code for the bootstrap cards style for the recipe
14. `RecipeSearchResult` contains the code for showing the search result
15. `RecommendationPage.js` contains the code for showing user the results for recommended food.
16. `SearchPage.js` contains the template of search page i.e., where each field will be printed.
<-------css files in static folder------->
17. `index.css` file contains the styling for landing page and navigation page
18. `login.css` file contains the styling for login page
19. `register.css` file contains the styling for signup page
<-------html files in templates folder------->
20. `ingredient.html` file contains bootstrap code for ingredients page
21. `landing.html` file contains bootstrap code for landing main i.e., the first page
22. `login.html` file contains bootstrap code for login page
23. `register.html` file contains bootstrap code for signup page
24. `recipe.html` file contains the code for recipe page
25. `index.html` file contains the dependencies for bootstrap

For React, running the command `npm ci` will initialize the necessary Node modules for this application.

To add the Database, create a file called .env, and add the line `DATABASE_URL="<your postgre database link>"`
To add the Secret Key, in .env include line `SECRET_KEY="<your secret key>"`
To add the Spoonacular key, in .env include line `SPOONACULAR_KEY="<your spoonacular key>"`. Spoonacular key can be found after getting the access of Spoonacular Api (More information about api can be found above).
Above link and keys will be added in .env and ignore .env file in `.gitignore` file.

Application contains Procfile and requirements.txt files, which enable it to be deployed using the Heroku command line interface.  The commands `heroku create` and `git push heroku your_branch` can be used.  A Postgresql database can be setup using the `heroku addons:create heroku-postgresql:hobby-dev`.  Using the `heroku config` command the DATABASE_URL variable can be added to the .env file.  Additionally a SECRET_KEY environment variable must be defined to enable the flask-login package to be used.

To set up hot reload (to never have to npm build everytime before running the program), `parcel` was integrated which saves building time. 

To run the application, run `npm run start`

Continuous depolyment is set active so whenever code is pushed to main branch in Github, web app is updated accordingly. 


## Web app after going through heroku link:

1. User will be directed to a login page where user will be able to login themselves but if they do not have an account, 
they have the option to also signup.
2. To Signup, user will have to click on the hyperlink to get to the signup/register page.
3. User will have to enter unique email and username to authenticate themselves or the message will say "it already exists"
4. After authenticating, user will be directed to main page where user can select the option of search page and recommendation.
5. If serach page, user can search for either the recipes or its ingredients.
    - User will have access to select how many results, they want to see
    - Upon clicking the `Search` button, results will be shown along with pictures where users can interact with it.
    - Upon clicking on the food, its detailed information will be shown which is fetched by the API
6. If Ingredients is selected in search page, results will be shown along with pictures which consists only the ingredients of that particular food.
7. If user wants to see the recomendation option, they can select the cuisine and dish type using the drop down.
8. Upon clicking on the button `Get Recommendation`, user will be able see list of recommended foods.
9. User can interact between search page and recommendation page going back-and-fourth.
10. If user wants to exit out, they have the option to logout.

## Liniting:
`# pylint: disable=too-many-locals` - There were too many locals in a function because of the api usage. We disabled it to not have these errors because we needed to integrate api and we did not find a way to not use locals.
`# pylint: disable=unused-argument` - This was caused because there were dummy variable/s which caused this issue/argument. We suppressed the warning because flask needs it but linter disagrees..
`# pylint: disable=too-few-public-methods` - We had to suppress this pylint error because this methods were used eleswhere in other classes and lot of the times it gave error.
`disable=no-member` - We suppressed this error because we noticed a bug while implementing the flask-sqlAlchemy but the program run well. So, we just had to suppress it.
`invalid-envvar-default` - We suppressed it because when we access the env variable, it underlines it but there were no actual errors causing an error running the project.
