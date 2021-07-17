const express = require('express');
const router = express.Router();

router.get('/signin',(req,res) => {
    res.send('signed in');
})

router.post('/signup',(req,res) => {
    res.send("signed up");
})

router.get('/signout',(req,res) => {
    res.send("sign out");
})

module.exports = router;