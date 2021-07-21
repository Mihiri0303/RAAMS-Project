const express = require('express')
const cors = require('cors');

const acco = require('./Api/accommodation')
const auth = require('./Api/auth')

const app = express()
const port = 8000

app.use(cors());

app.use(express.json())
const apiRoute = express.Router();
apiRoute.use('/',auth)
apiRoute.use('/accommodation',acco)

app.use('/api',apiRoute);

app.listen(port,() => {
    console.log(`API listening at http://localhost:${port}`)
})