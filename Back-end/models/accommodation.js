const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accommodation = new Schema({
    Title : { type : String, required : true },
    Address : { type : String },
    Amount : { type : Number, required : true },
    Latitude : { type : Number, required : true },
    Longitude : { type : Number, required : true },
    Mobile : { type : Number },
    Type : { type : String },
    Owner_id : {type : Schema.Types.ObjectId, refs : "user"}
});

module.exports =  mongoose.model('accommodations', accommodation);