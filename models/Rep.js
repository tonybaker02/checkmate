const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;


const repSchema = new Schema({
    ManagerName :{ type: String, required: true},
    FirstName:{ type: String , required: true},
    LastName:{ type: String},
    Territory:{ type: String},
    Phone:{ type: String},
    Email:{ type: String},
    AnnualBudget:{ type: String},
    Notes:{ type: String}
});

repSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Rep',repSchema);