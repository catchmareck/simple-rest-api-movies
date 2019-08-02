# Simple movies REST API
Simple REST API created for recruitment process.

Demo: https://simple-rest-api-movies.herokuapp.com/movies

## Endpoints

- POST `/movies`
- GET `/movies`
- POST `/comments`
- GET `/comments`

## Requirements

- MySQL
- Node.js & NPM
- [OMDb API Key](http://www.omdbapi.com/apikey.aspx)

## How to get it running locally

#### 1. Create a local DB
```mysql
CREATE DATABASE <db name>;
CREATE USER '<username>'@'localhost' IDENTIFIED BY '<password>';
GRANT ALL PRIVILEGES ON *.* TO '<username>'@'localhost';
```

#### 2. Install dependencies
```sbtshell
$ npm i
```

#### 3. Get an OMDb API Key
Visit [this link](http://www.omdbapi.com/apikey.aspx) and follow the instructions.

#### 4. Create .env file
Open a file editor (I like vim):
```sbtshell
$ vi .env
```
and paste the following content:
```sbtshell
PORT=3030
DB_HOST=localhost
DB_PORT=3306
DB_USER=<your db username>
DB_PASSWORD=<your db password>
DB_NAME=<your db name>
API_URL=http://www.omdbapi.com/
API_KEY=<your omdb api key>
```

#### 5. Run the API
```sbtshell
$ npm start
```

## How to test the API
```sbtshell
$ npm test
```
or with coverage
```sbtshell
$ npm run test:coverage
```