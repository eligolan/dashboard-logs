const mongoose = require('mongoose');
const Log = require('./models/logs');
const io = require('socket.io')(3000)
const mongoDB = 'mongodb+srv://eli:sc9azHai2rfosh8X@cluster0.rn00oed.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('mongoDB is connected')
}).catch(err => console.log(err))
io.on('connection', (socket) => {

    //io.emit('message', "hello world");
    Log.find().then(result => {
        //console.log(result);
        io.emit('all-logs', result)
    })
    //console.log('a user connected');
    //socket.emit('message', 'Hello world');
    /*  socket.on('disconnect', () => {
         console.log('user disconnected');
     }); */
    /*     socket.on('logmessage', msg => {
            const log = new Log({
                name: msg,
                url: "www.google.com"
            });
            log.save().then(() => {
                io.emit('message', msg)
            })
    
    
        }) */
});

const logEventEmitter = Log.watch()

logEventEmitter.on('change', change => {
    console.log(change.fullDocument);
    io.emit('message', change.fullDocument)
});