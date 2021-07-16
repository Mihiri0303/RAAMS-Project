const express = require('express');
const router = express.Router();

router.get('/',(req,res) => {
    res.send('accommodation');
})

router.get('/:id',(req,res) => {
    res.send("get"); // retrive accom data 
})

router.delete('/:id',(req,res) => {
    res.send("deleted");
})

module.exports = router;