const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    FirstName : { type : String, required : true},
    LastName : { type : String, required : true},
    Mobile : { type : Number},
    UserRole : { type : Number},
    Email : { type : String, required : true, unique: true, uniqueCaseInsensitive: true},
    Password : { type : String, required : true}
});

module.exports =  mongoose.model('users', user);