# BeSpoked Bikes Sales Tracking Application

*Deployed Heroku URL*: https://vast-ocean-40209.herokuapp.com/

## Technologies, Frameworks, Libraries

This application uses the Flask framework for the web server and Flask-Sqlalchemy to manage a Postgresql database.  The front end is a React.js application which is set up with Parcel to enable development without manual recompilation.

Python Dependencies: Included in requirements.txt, can be installed using Pip

Node.js Dependencies: Included in package.json

For Javascript dependencies, running the command `npm install` will initialize the necessary Node modules for this application.

Application contains Procfile and requirements.txt files, which enable it to be deployed using the Heroku command line interface (needs to be installed).  The commands `heroku create` and `git push heroku your_branch` can be used.  A Postgresql database can be setup using the `heroku addons:create heroku-postgresql:hobby-dev`.  

Environment Variables: 

Using the `heroku config` command the DATABASE_URL variable can be added to the .env file.  

Additionally a SECRET_KEY environment variable must be defined to enable the flask-login package to be used.

To locally run the application with React hot reload, run the command `npm run start` to start Parcel and the Flask server.

To compile the React code before deployment, run `npm run build`

To have better server-side debugging (without being able to edit the front-end), `python3 app.py` will directly start the flask server.

To initialize sample data in the database, first enter the Postgresql console using `heroku pg:psql`.  Run the command `\i insert.sql`.

To reset the database, run `\i reset.sql`, and then restart the server to regenerate the schema.  Then the sample data can be reinitialized again.