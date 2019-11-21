set -e
set -x
npm run lint
rm -rf dist
nest build movies
nest build genres
nest build api
heroku container:push movies genres web --recursive
heroku container:release movies
heroku container:release genres
heroku container:release web
