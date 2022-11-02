const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const managerSchema = new Schema({
    FirstName:{ type: String , required: true},
    LastName:{ type: String , required: true},
    Territory:{ type: String , required: true},
    Division:{ type: String},
    District:{ type: String},
    Phone:{ type: String},
    Mobile :{ type: String},
    Email :{ type: String},
    Notes:{ type: String}
});

managerSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Manager',managerSchema);