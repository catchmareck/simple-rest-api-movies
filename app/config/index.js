'use strict';

module.exports = {
    port: process.env.PORT,
    db: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        name: process.env.DB_NAME
    },
    api: {
        url: process.env.API_URL,
        key: process.env.API_KEY
    }
};
