const express = require('express')
const mongodb = require('./mongodb/mongodb')
const acco = require('./routes/accommodation')
const app = express()

const port = 8000

mongodb.then(async db => {
  const collection = db.collection("devices").find();
  await collection.forEach(data => console.log(data))
}).catch(err => console.error(err))

app.use('/accommodation',acco);

app.get('/',(req,res) => {
    res.send('Hello World!')
})

app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
})