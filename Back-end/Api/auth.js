const express = require('express');
const router = express.Router();
const { Schema } = require('mongoose');
const mongodb = require('../mongodb/mongodb')
const userSchema = require('../models/user')
let User = null;

(async() => {
    const db = await mongodb;
    User = db.model('user', userSchema);
})();

router.post('/login',async (req,res) => {
    reqJson = req.body;
    try {        
        try{
            const user = await User.findOne({Email : reqJson.Email, Password : reqJson.Password});
            res.status(200).json(user);
        }catch(err){
            throw err;
        }
    } catch (error) {
        res.status(400).json({messange : 'Something went wrong .!', error});
    }
})

router.post('/signup',async (req,res) => {
    reqJson = req.body;
    try{
        const user = new User({
            FirstName : reqJson.FirstName,
            LastName :  reqJson.LastName,
            Mobile :  reqJson.Mobile,
            UserRole :  reqJson.UserRole,
            Email :  reqJson.Email,
            Password :  reqJson.Password
        }); 
        try{
            await user.save();
            res.status(200).json(user);
        }catch(err){
            throw err;
        }
    }catch(error){
        res.status(400).json({messange : 'Something went wrong .!', error});
    }
})

module.exports = router;