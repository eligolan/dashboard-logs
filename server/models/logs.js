const mongoose = require('mongoose');
const logSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
    },
})

const Log = mongoose.model('log', logSchema);
module.exports = Log;