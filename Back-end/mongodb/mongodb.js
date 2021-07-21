require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.DbConnection;
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

module.exports = new Promise((resolve,reject) => {
    const db = mongoose.connection;
    db.on('error', (err) => reject(err));
    db.once('open', function() {
        resolve(mongoose)
    });
});