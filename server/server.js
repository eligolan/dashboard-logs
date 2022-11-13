const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const mongoDB = 'mongodb+srv://eli:sc9azHai2rfosh8X@cluster0.rn00oed.mongodb.net/?retryWrites=true&w=majority';
var cors = require('cors')

const app = express();

app.use(cors())
app.use(bodyParser.json());

require('./rest.js')(app);

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('mongoDB is connected')
}).catch(err => console.log(err))

app.listen(3000, () => {
  console.log('Listening on 3000...');
});