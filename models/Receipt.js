const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const receiptSchema = new Schema({
    Rep:{ type: String , required: true},
    Restaurant:{ type: String , required: true},
    Amount:{ type: Number , required: true},
    SharedAmount:{ type: Number},
    Date :{ type: String},
    Event:{ type: String},
    Doctors :{ type: String},
    Notes:{ type: String}
});

receiptSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Receipt',receiptSchema);