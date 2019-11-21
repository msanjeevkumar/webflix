<h3 align="center">webflix</h3>

<div align="center">

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

## 📝 Table of Contents

- [About](#about)
- [Architecture](#architecture)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

A Microservices architecture implementation using NestJS, The project contains two services (Genres and Movies) utilising PostgreSQL.
Each microservice consists basic actions (index, show, insert, and delete)

The minimal fields for Genres are name and description. For Movies, the minimal fields are name, description, release date, Genre(s), duration and rating.

## Architecture <a name = "about"></a>

![Architecture](/architecture.jpg)

Project contains mainly 3 parts, API Gateway, MovieService, GenreService. All these 3 are dockerized and dependencies are boostrapped using docker compose files

API Gateway uses Redis as message broker to perform communication with microservices

## 🏁 Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See [deployment](#deployment) for notes on how to deploy the project on a live system.

### Clone Repo

Clone webflix Git repo

```
git clone https://github.com/msanjeevkumar/webflix.git
```

Make sure docker is installed on the system

### Installing

Currently, we are using `Yarn` (instead of `npm`), so make sure you have latest Yarn version installed before running the project:

```
npm install -g yarn@latest
```

Install dependencies

```
yarn install
```

Start the application by the following command

```
docker-compose -f "docker-compose.dev.yml" up -d --build
```

Stop the application by the following command

```
docker-compose -f "docker-compose.dev.yml" down
```

Now the application will be running at http://localhost:3000

## 🔧 Running the tests <a name = "tests"></a>

```
yarn test
```

## 🎈 Usage <a name="usage"></a>

I have added swagger OpenAPI support for the project
<br>
Swagger UI can be accessed at http://localhost:3000/swagger

## 🚀 Deployment <a name = "deployment"></a>

Deployment to heroku is achieved through a bash script currently

```
bash ./deploy.sh
```

You can check the project running live at https://webflixapi.herokuapp.com/swaggermov

## ⛏️ Built Using <a name = "built_using"></a>

- [PostgreSQL](https://www.postgresql.org/) - Database
- [Redis](https://redis.io/) - Message broker
- [NestJS](https://nestjs.com/) - Server Framework
- [NodeJS](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@msanjeevkumar](https://github.com/msanjeevkumar)
