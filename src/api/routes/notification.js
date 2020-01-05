const router = require('express').Router();
const path = require('path');
const Notification = require(path.join(__dirname, '..', '..', 'services', 'NotificationService')).Notification

router.post('/event', async(req, res) => {
    const params = req.body;
    const eventHandler = new Notification("events");
    await eventHandler.addEvent(params);
    res.send({ message: "success" });
});

module.exports = router;