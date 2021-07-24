const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const UserAccModel = require('../models/userAcc');


router.put('/',async (req,res) => {
    reqJson = req.body;
    try {        
        const userAcc = new UserAccModel({
            ReserveDate : Date.now(),
            Acc_id : mongoose.Types.ObjectId(reqJson.Acc_id),
            User_id : mongoose.Types.ObjectId(reqJson.User_id)
        });
        try{
            await userAcc.save();
            await userAcc.populate('Acc_id').populate('User_id').exec();
            res.status(200).json(userAcc);
        }catch(err){
            throw err;
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message : 'Something went wrong .!', error});
    }
})

router.get('/',async (req,res) => {
    try {        
        const userAcc = await UserAccModel.find({}).populate('Acc_id').populate('User_id').exec();
        res.status(200).json(userAcc);
    } catch (error) {
        console.log(error)
        res.status(400).json({message : 'Something went wrong .!', error});
    }
})


router.get('/:id',async (req,res) => {
    reqJson = req.params;
    try {        
        try{
            const userAcc = await UserAccModel.findById(mongoose.Types.ObjectId(reqJson.id)).populate('Acc_id').populate('User_id').exec();
            res.status(200).json(userAcc);
        }catch(err){
            throw err;
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message : 'Something went wrong .!', error});
    }
})

module.exports = router;