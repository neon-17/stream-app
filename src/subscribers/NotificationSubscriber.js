const path = require('path');
const Notification = require(path.join(__dirname, '..', 'services', 'NotificationService')).Notification
const config = require(path.join(__dirname, '..', 'config'));
const eventConsumer = new Notification(config.notification_event_queue);

require(path.join(__dirname, '..', 'loaders', 'connection'));

(async function() {
    await eventConsumer.processEvent(eventConsumer.insertEvent);
})()