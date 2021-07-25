const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const accModel = require('./../models/accommodation');

router.get('/',async (req,res) => {
    reqPram = req.query;
    try {        
        try{
            let acc;
            if(reqPram.owner) acc = await accModel.find({Owner_id : mongoose.Types.ObjectId(reqPram.owner)}).populate('Owner_id','FirstName LastName Email Mobile UserRole').exec();
            else acc = await accModel.find({}).populate('Owner_id','FirstName LastName Email Mobile UserRole').exec();
            res.status(200).json(acc);
        }catch(err){
            throw err;
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message : 'Something went wrong .!', error});
    }
})

router.post('/',async (req,res) => {
    reqBody = req.body;
    try {        
        try{
            let acc = await accModel.find(reqBody).populate('Owner_id','FirstName LastName Email Mobile UserRole').exec();
            res.status(200).json(acc);
        }catch(err){
            throw err;
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message : 'Something went wrong .!', error});
    }
})

router.get('/:id',async (req,res) => {
    reqPram = req.params;
    try {        
        try{
            const acc = await accModel.findById(reqPram.id).populate('Owner_id','FirstName LastName Email Mobile UserRole').exec();
            res.status(200).json(acc);
        }catch(err){
            throw err;
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message : 'Something went wrong .!', error});
    }
})

router.put('/',async (req,res) => {
    reqJson = req.body;
    try{
        const acc = new accModel({
            Title : reqJson.Title,
            Address : reqJson.Address,
            Amount : reqJson.Amount,
            Latitude : reqJson.Latitude,
            Longitude : reqJson.Longitude,
            Mobile : reqJson.Mobile,
            Type : reqJson.Type,
            Owner_id : mongoose.Types.ObjectId(reqJson.Owner_id)
        }); 
        try{
            await acc.save();
            res.status(200).json(acc);
        }catch(err){
            throw err;
        }
    }catch(error){
        console.log(error)
        res.status(400).json({message : 'Something went wrong .!', error});
    }
})

router.delete('/:id',async (req,res) => {
    reqPram = req.params;
    try {        
        try{
            const acc = await accModel.findByIdAndDelete(reqPram.id);
            res.status(200).json({success : true, acc});
        }catch(err){
            throw err;
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message : 'Something went wrong .!', error});
    }
})

module.exports = router;