const { Schema } = require('mongoose');

const accommodation = new Schema({
    Title : { type : String, required : true },
    Address : { type : String },
    Amount : { type : Schema.Types.Decimal128, required : true },
    Latitude : { type : String, required : true },
    Longitude : { type : String, required : true },
    Mobile : { type : Number },
    Type : { type : String },
    owner_id : {type : Schema.Types.ObjectId, refs : "user"}
});

module.exports = accommodation;