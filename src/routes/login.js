const express = require('express');
const router = express.Router();
const { User, validator } = require('./../models/user');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const bcrypt = require('bcryptjs');
router.post('/', async (req, res) => {
    try {
        const { error } = validationLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });

        if (!user) return res.status(400).send('invalid eamil or password');

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword)

            return res.status(400).send('invalid eamil or password');
        console.log('**')
        const token = user.genAuthToken();
        console.log(token)
        res.status(200).send(token);
    } catch (err) {
        res.status(400).send(err);
    }
});

const validationLogin = req => {
    const shema = Joi.object({
        email: Joi.string()
            .min(5)
            .max(255)
            .required()
            .email(),

        password: Joi.string()
            .min(6)
            .max(1024)
            .required()
    });
    return shema.validate(req);
};

module.exports = router;
