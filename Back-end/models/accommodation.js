const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const accommodation = new Schema({
    Title : { type : String, required : true, index : true },
    Address : { type : String, index : true },
    Amount : { type : Number, required : true },
    Latitude : { type : Number, required : true },
    Longitude : { type : Number, required : true },
    Mobile : { type : Number },
    Type : { type : String },
    Owner_id : {type : Schema.Types.ObjectId,  ref : 'users', required : true}
});

accommodation.index({Title : 'text', Address : 'text'});

module.exports =  mongoose.model('accommodations', accommodation);