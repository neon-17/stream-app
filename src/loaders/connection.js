const path = require('path');
const config = require(path.join(__dirname, '..', 'config'));
const mongoose = require('mongoose');
mongoose.connect(config.db_url, { useNewUrlParser: true });

const db = mongoose.connection;
// Added check for DB connection

if (!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")