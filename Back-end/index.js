const express = require('express')
const { MongoClient } = require('mongodb');
const acco = require('./routes/accommodation')
const app = express()
const port = 8000


const uri = "mongodb+srv://mihiri0303:Udara0303@raamsdb.hsngu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async (err) => {
  const collection = await client.db("test").collection("devices").find();
    await collection.forEach(data => console.log(data))
  // perform actions on the collection object
  client.close();
});


app.use('/accommodation',acco);

app.get('/',(req,res) => {
    res.send('Hello World!')
})

app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
})