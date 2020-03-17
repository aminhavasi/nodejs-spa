const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');
const config = require('./../config.json');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        minlength: 5,
        maxlength: 255,
        required: true
    },
    password: {
        type: String,
        minlength: 6,
        maxlength: 1024,
        required: true
    }
});
userSchema.methods.genAuthToken = function() {
   
    const token = jwt.sign({ _id: this._id }, config.jwt_key);
    return token;
};
const validator = user => {
    const shcema = Joi.object({
        name: Joi.string()
            .required()
            .min(5)
            .max(255),
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .required()
            .min(6)
            .max(1026)
    });
    return shcema.validate(user);
};
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    validator
};
