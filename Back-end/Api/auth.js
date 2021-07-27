const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const UserModel = require('../models/user')

router.post('/login',async (req,res) => {
    reqJson = req.body;
    try {        
        try{
            const user = await UserModel.findOne({Email : reqJson.Email});
            const AuthedUser = await bcrypt.compare(reqJson.Password,user.Password);
            if(!AuthedUser) throw "Password not matched"; // eslint-disable-line
            const {Password, ...NewUser} = user._doc;
            res.status(200).json(NewUser);
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
        const saltRounds = 10;
        const HashedPassword = await bcrypt.hash(reqJson.Password,saltRounds);
        const user = new UserModel({
            FirstName : reqJson.FirstName,
            LastName :  reqJson.LastName,
            Mobile :  reqJson.Mobile,
            UserRole :  reqJson.UserRole,
            Email :  reqJson.Email,
            Password :  HashedPassword
        }); 
        try{
            await user.save();
            const {Password, ...NewUser} = user._doc;
            res.status(200).json(NewUser);
        }catch(err){
            throw err;
        }
    }catch(error){
        console.log(error)
        res.status(400).json({message : 'Something went wrong .!', error});
    }
})

module.exports = router;