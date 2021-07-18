const express = require('express')
const mongoose  = require('mongoose');
const mongodb = require('./mongodb/mongodb')
const { Schema } = mongoose;


const acco = require('./routes/accommodation')
const auth = require('./routes/auth')
const app = express()

const port = 8000

mongodb.then(async db => {
  const MyModel = db.model('devices', new Schema({ name: String }))
  const doc = await MyModel.find({});
  console.log(doc)
}).catch(err => console.error(err))

app.use(auth)
app.use('/accommodation',acco)

app.get('/',(req,res) => {
    res.send('Hello World!')
})

app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
})