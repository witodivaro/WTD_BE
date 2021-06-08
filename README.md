### Wito's To-Dos Backend

## Stack technologies

- JavaScript, Node.js, express.js, Sequelize
- DB: PostgreSQL
- Auth: passport.js, jsonwebtoken (JWT)
- Config: dotenv
- Security: CORS, bcrypt
- Utility: nodemailer, winston, express-validator

## Sequelize Documentation

- [Sequelize docs](http://docs.sequelizejs.com/manual/getting-started.html)

## Express.js Documentation

- [Express.js docs](https://expressjs.com/)

## Installation

1. clone repository
2. make sure you have nodejs installed (version 10 or higher)

3. install node modules packages (npm version 6.4 or higher)

   ```bash
   $ yarn install
   ```

4. install database PostgreSQL (version 11 or higher)

   - [postgreSQL Linux installation](https://www.digitalocean.com/community/tutorials/postgresql-ubuntu-16-04-ru)
   - [postgreSQL Mac installation](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb)
   - create database
   - configure database connection (see `Configs` section)

5. run project in root folder

   ```bash
   $ npm start
   ```
