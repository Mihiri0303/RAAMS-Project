const express = require('express');
const router = express.Router();
const { Schema } = require('mongoose');
const mongodb = require('../mongodb/mongodb');

const accSchema = require('./../models/accommodation');
let Acc = null;
(async() => {
    const db = await mongodb;
    Acc = db.model('accommodation', accSchema);
})();

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