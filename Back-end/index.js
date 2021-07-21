const express = require('express')
const cors = require('cors');

const acco = require('./Api/accommodation')
const auth = require('./Api/auth')
const app = express()

const port = 8000

app.use(cors());

app.use(express.json())
app.use(auth)
app.use('/accommodation',acco)

app.get('/',(req,res) => {
    res.send('Hello World!')
})

app.listen(port,() => {
    console.log(`API listening at http://localhost:${port}`)
})