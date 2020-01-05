const express = require('express');
const app = express();
const path = require('path');
const config = require(path.join(__dirname, 'config'));
const logger = require(path.join(__dirname, 'loaders', 'logger'));
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false })) // parse application/x-www-form-urlencoded
app.use(bodyParser.json()) // parse application/json

require(path.join(__dirname, 'loaders', 'connection'))
require(path.join(__dirname, 'api'))(app); // registering all routes



app.listen(config.port, err => {
    if (err) {
        logger.error(err);
        process.exit(1);
        return;
    }
    logger.info(`Server listening on port: ${config.port}`);
});