const mongoose = require('mongoose');
const Joi = require('@hapi/joi');
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
const User = mongoose.model('User', userSchema);

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
module.exports = {
    User,
    validator
};
