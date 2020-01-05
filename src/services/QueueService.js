const path = require('path');
const config = require(path.join(__dirname, '..', 'config'));
const amqp = require('amqplib');

class QueueService {

    constructor(queue) {
        this.connectionUrl = config.conn_url;
        this.queue = queue;
    }

    async publishEvent(data) {
        let connection = await amqp.connect(this.connectionUrl);
        let channel = await connection.createConfirmChannel();
        return new Promise((resolve, reject) => {

            channel.sendToQueue(this.queue, Buffer.from(JSON.stringify(data), 'utf-8'), { persistent: true }, function(err, ok) {
                if (err) {
                    return reject(err);
                }
                resolve();
            })
        });
    }

    // // consume messages from RabbitMQ
    consumeEvent(callback) {
        return new Promise(async(resolve, reject) => {
            let connection = await amqp.connect(this.connectionUrl);
            let channel = await connection.createConfirmChannel();
            await channel.prefetch(1);
            channel.consume(this.queue, async(msg) => {
                const params = JSON.parse(msg.content.toString())
                if (await callback(params)) {
                    await channel.ack(msg);
                    resolve('processed' + msg.content.toString())
                } else {
                    console.log('something went wrong')
                    channel.nack(msg);
                    reject('something went wrong');
                }
            }, { noAck: false });
            //handle connection closed
            connection.on("close", (err) => {
                return reject(err);
            });
            // handle errors
            connection.on("error", (err) => {
                console.log('connection error')
                return reject(err);
            });
        });
    }

}

exports.Queue = QueueService;