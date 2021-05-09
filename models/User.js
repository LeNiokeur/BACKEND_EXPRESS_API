const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');       //Aide à rendre des informations uniques

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: {type: String, required: true }
}) ;


userSchema.plugin(uniqueValidator);         //Application du plugin

module.exports = mongoose.model('User', userSchema);