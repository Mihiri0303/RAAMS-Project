const express = require('express');
const router = express.Router();
const UserModel = require('../models/user')

router.post('/login',async (req,res) => {
    reqJson = req.body;
    try {        
        try{
            const user = await UserModel.findOne({Email : reqJson.Email, Password : reqJson.Password});
            res.status(200).json(user);
        }catch(err){
            throw err;
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({message : 'Something went wrong .!', error});
    }
})

router.post('/signup',async (req,res) => {
    reqJson = req.body;
    try{
        const user = new UserModel({
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
        console.log(error)
        res.status(400).json({message : 'Something went wrong .!', error});
    }
})

module.exports = router;