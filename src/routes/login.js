const express = require('express');
const router = express.Router();
const {} = require('./../models/user');
const Joi = require('@hapi/joi');

router.post('/api/login', async (req, res) => {
    try {
        const { error } = validationLogin(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let user = await user.findOne({ email: req.body.email });
        if (!user) return res.status(400).send('invalid eamil or password');
        res.send('ok');
    } catch (err) {}
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
