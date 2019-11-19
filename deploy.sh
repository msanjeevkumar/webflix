rm -rf node_modules
#heroku login
#heroku container:login
heroku container:push movies genres web --recursive
heroku container:release movie genres web
