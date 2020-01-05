const dotenv = require('dotenv');
const envFound = dotenv.config();

if (!envFound) {
    // This error should crash whole process
    throw new Error("Couldn't find .env file");
}

module.exports = {
    port: process.env.PORT,
    logs: {
        level: process.env.LOG_LEVEL || 'silly',
    },
    conn_url: process.env.QUEUE_CONN_URL,
    db_url: process.env.DB_CONN_URL
};