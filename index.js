'use strict';

require('dotenv').config();

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const log = require('./app/logger');
const config = require('./app/config');
const { port } = config;

const routes = require('./app/routes');

app.use(bodyParser.json());
app.use(routes);

const models = require('./app/models');
models.sequelize.sync().then(() => {

    app.listen(port, () => {

        log.info(`Listening on ${port}`);
    });
});
