rm -rf node_modules
rm -rf dist
#heroku login
#heroku container:login
heroku container:push movies genres web --recursive
#heroku container:release movies
#heroku container:release genres
#heroku container:release web
