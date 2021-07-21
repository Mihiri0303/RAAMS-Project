const { Schema } = require('mongoose');

const userRole = new Schema({
    Title : { type : String, required : true},
});

module.exports = userRole;