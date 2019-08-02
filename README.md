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

## How to use it
Using this API is very simple. Here is a short documentation of the available endpoints:

##### POST `/movies`
Add a movie to the database

**body:**
```javascript
{
    title: 'Harry Potter', // string; required
    type: 'movie', // one of ['movie', 'series', 'episode']; optional
    year: 2011, // number; optional
    plot: 'short' // one of ['short', 'full']; optional
}
```

**response:**
```javascript
{
    "movieId": 1,
    "imdbId": "tt1201607",
    "title": "Harry Potter and the Deathly Hallows: Part 2",
    "year": "2011",
    "runtime": "130 min",
    "genre": "Adventure, Drama, Fantasy, Mystery",
    "director": "David Yates",
    "plot": "Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.",
    "poster": "https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
    "website": "http://www.HarryPotter.com/",
    "updatedAt": "2019-08-02T17:18:45.780Z",
    "createdAt": "2019-08-02T17:18:45.780Z"
}
```

##### GET `/movies`
Get movies from the database

**body:**

_no params required_

**response:**
```javascript
[
    {
        "movieId":1,
        "imdbId":"tt1201607",
        "title":"Harry Potter and the Deathly Hallows: Part 2",
        "year":2011,
        "runtime":"130 min",
        "genre":"Adventure, Drama, Fantasy, Mystery",
        "director":"David Yates",
        "plot":"Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.",
        "poster":"https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
        "website":"http://www.HarryPotter.com/",
        "createdAt":"2019-08-02T17:18:45.000Z",
        "updatedAt":"2019-08-02T17:18:45.000Z"
    }
]
```

##### POST `/comments`
Add a comment to the movie

**body:**
```javascript
{
    movieId: 1, // number; required
    userId: null, // number or null; optional
    content: 'I am Iron Man', // string; min 10 chars; required
}
```

**response:**
```javascript
{
    "commentId": 1,
    "content": "I am Iron Man",
    "userId": null,
    "updatedAt": "2019-08-02T17:24:25.638Z",
    "createdAt": "2019-08-02T17:24:25.626Z",
    "movie_id": 1
}
```

##### GET `/comments`
Get all comments

**body:**

_no params required_

**response:**
```javascript
[
    {
        "commentId":1,
        "content":"I am Iron Man",
        "userId":null,
        "createdAt":"2019-08-02T17:24:25.000Z",
        "updatedAt":"2019-08-02T17:24:25.000Z",
        "movie_id":1,
        "Movie": {
            "movieId":1,
            "imdbId":"tt1201607",
            "title":"Harry Potter and the Deathly Hallows: Part 2",
            "year":2011,
            "runtime":"130 min",
            "genre":"Adventure, Drama, Fantasy, Mystery",
            "director":"David Yates",
            "plot":"Harry, Ron, and Hermione search for Voldemort's remaining Horcruxes in their effort to destroy the Dark Lord as the final battle rages on at Hogwarts.",
            "poster":"https://m.media-amazon.com/images/M/MV5BMjIyZGU4YzUtNDkzYi00ZDRhLTljYzctYTMxMDQ4M2E0Y2YxXkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg",
            "website":"http://www.HarryPotter.com/",
            "createdAt":"2019-08-02T17:18:45.000Z",
            "updatedAt":"2019-08-02T17:18:45.000Z"
        }
    }
]
```