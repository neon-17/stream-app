const path = require('path');
const Notification = require(path.join(__dirname, '..', 'services', 'NotificationService')).Notification
const eventConsumer = new Notification('events');
const mongoose = require('mongoose');
const config = require(path.join(__dirname, '..', 'config'));
mongoose.connect(config.db_url, { useNewUrlParser: true });

(async function() {
    await eventConsumer.processEvent(eventConsumer.insertEvent);
})()