const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

// const FormDataSchema = new mongoose.Schema({
//     name : String,
//     email: String,
//     password: String,
//     UserType:String
// })
const FormDataSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    userType: String
}); 

FormDataSchema.plugin(passportLocalMongoose);

const FormDataModel = mongoose.model('log_reg_form', FormDataSchema);

module.exports = FormDataModel;
