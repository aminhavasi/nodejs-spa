const express = require('express');
const router = express.Router();
const { User } = require('./../models/user');
const Joi = require('@hapi/joi');

router.post('/', async (req, res) => {
    const { error } = validationLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    console.log(req.body);
    // let user = await User.findOne({ email: req.body.email });
    // console.log(user);
    // if (!user) return res.status(400).send('invalid eamil or password');
    // console.log('/*/');
    res.send('ok');
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
