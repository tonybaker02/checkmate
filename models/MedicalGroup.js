const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const medicalGroupSchema = new Schema({
    Name:{ type: String, required: true},
    Address:{ type: String , required: true},
    Office:{ type: String , required: true},
    Mobile:{ type: String},
    Email:{ type: String},
    Password:{ type: String},
    Notes:{ type: String}
});

medicalGroupSchema.plugin(uniqueValidator);
module.exports = mongoose.model('MedicalGroup',medicalGroupSchema);