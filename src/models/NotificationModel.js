const mongoose = require('mongoose');

const NotifyEventSchema = mongoose.Schema({
    notification_id: String,
    event_type: String,
    event_updated_at: Date,
}, {
    timestamps: true
});

const NotifyEvent = mongoose.model('NotificationEvent', NotifyEventSchema);

NotifyEvent.insertEvent = async(event) => {
    const eventInstance = new NotifyEvent()
    eventInstance.notification_id = event.notification_id
    eventInstance.event_type = event.type
    eventInstance.event_updated_at = event.created_at
    try {
        await eventInstance.save()
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

module.exports = NotifyEvent;