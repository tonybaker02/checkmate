const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const pharmaSchema = new Schema({
    Name:{ type: String, required: true},
    Phone:{ type: String , required: true},
    Email:{ type: String , required: true},
    Password:{ type: String},
    Notes:{ type: String}
});

pharmaSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Pharma',pharmaSchema);