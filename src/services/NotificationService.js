const path = require('path');
const Queue = require(path.join(__dirname, 'QueueService')).Queue
const NotificationEvent = require(path.join(__dirname, '..', 'models', 'NotificationModel'))


class NotificationService {

    constructor(eventQueue) {
        this.queueHandler = new Queue(eventQueue)
    }

    async addEvent(eventStream) {
        await this.queueHandler.publishEvent(eventStream);
    }

    async insertEvent(eventStream) {
        return await NotificationEvent.insertEvent(eventStream)
    }

    async processEvent(callback) {
        await this.queueHandler.consumeEvent(callback);
    }
}

module.exports.Notification = NotificationService