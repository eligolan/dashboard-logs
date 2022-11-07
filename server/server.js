const mongoose = require('mongoose');
const Log = require('./models/logs');
const io = require('socket.io')(3000)
const mongoDB = 'mongodb+srv://eli:sc9azHai2rfosh8X@cluster0.rn00oed.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('mongoDB is connected')
}).catch(err => console.log(err))
io.on('connection', (socket) => {
    Log.find().then(result => {
        io.emit('all-logs', result)
    })
});

const logEventEmitter = Log.watch()

logEventEmitter.on('change', change => {
    console.log(change.fullDocument);
    io.emit('message', change.fullDocument)
});