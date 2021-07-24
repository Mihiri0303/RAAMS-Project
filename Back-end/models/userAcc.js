const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userAcc = new Schema({
    ReserveDate : { type : Date, required : true},
    Acc_id : { type : Schema.Types.ObjectId, ref : 'accommodations', required : true},
    User_id : { type : Schema.Types.ObjectId, ref : 'users', required : true},
});

module.exports =  mongoose.model('useraccommodations', userAcc);
// module.exports =  new Promise(async (resolve,reject) => {
//     const db = await mongodb;
//     resolve(db.model('useraccommodations', userAcc));
// });