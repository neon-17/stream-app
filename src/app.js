const express = require('express');
const app = express();
const path = require('path');
const config = require(path.join(__dirname, 'config'));
const logger = require(path.join(__dirname, 'loaders', 'logger'));
require(path.join(__dirname, 'api'))(app); // registering all routes



app.listen(config.port, err => {
    if (err) {
      logger.error(err);
      process.exit(1);
      return;
    }
    logger.info(`Server listening on port: ${config.port}`);
});