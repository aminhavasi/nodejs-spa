const joi = require('@hapi/joi');

const validate = joi.object({
    username: joi
        .string()
        .email()
        .required(),
    password: joi
        .number()
        .max(30)
        .min(3)
        .required()
});

const value = validate.validate({ username: 'amin', password: 123445 });
console.log(value);
