const router = require('express').Router();
const path = require('path');
const logger = require(path.join(__dirname, '..', '..', 'loaders', 'logger'));
const config = require(path.join(__dirname, '..', '..', 'config'));
const Notification = require(path.join(__dirname, '..', '..', 'services', 'NotificationService')).Notification

router.post('/event', async(req, res) => {
    const params = req.body;
    const eventHandler = new Notification(config.notification_event_queue);
    try {
        await eventHandler.addEvent(params);
        res.send({ message: "event successfully added" });
    } catch (e) {
        logger.error(e)
        res.status(500).send({ message: "something went wrong" });
    }
});

module.exports = router;