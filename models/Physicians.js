const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const physiciansSchema = new Schema({
    Title:{ type: String, required: true},
    FirstName:{ type: String , required: true},
    MI:{ type: String , required: true},
    LastName:{ type: String},
    NPI:{ type: String},
    LicenseID:{ type: String},
    Email:{ type: String},
    Phone:{ type: String},
    Password:{ type: String},
    Notes:{ type: String}
});

physiciansSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Physicians',physiciansSchema);