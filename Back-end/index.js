const express = require('express')
const acco = require('./routes/accommodation')
const app = express()
const port = 8000


app.use('/accommodation',acco);

app.get('/',(req,res) => {
    res.send('Hello World!')
})

app.listen(port,() => {
    console.log(`Example app listening at http://localhost:${port}`)
})