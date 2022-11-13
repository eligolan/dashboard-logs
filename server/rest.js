const Log = require('./models/logs');

module.exports = function (app) {
    app.get('/api/logs', async (req, res) => {
        console.log('route: /api/logs')
        const result = await Log.find();
        res.end(JSON.stringify(result));
    });
}