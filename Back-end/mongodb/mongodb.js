require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.DbConnection;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = new Promise((resolve,reject) => {
    client.connect(async err => {
        if(err) reject(err)
        resolve(client.db('test'))
    })
});