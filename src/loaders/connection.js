const path = require('path');
const config = require(path.join(__dirname, '..', 'config'));
const mongoose = require('mongoose');
const logger = require(path.join(__dirname, 'logger'));
mongoose.connect(config.db_url, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('connected', () => {
    logger.info('DB Connected successfully');
});

db.on('error', () => {
    throw new Error("Error connecting db");
});