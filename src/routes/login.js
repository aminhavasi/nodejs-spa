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
        console.log('/*/');
        res.send('ok');
    } catch (err) {
        res.send('pl');
    }
});
router.post('/sign', async (req, res) => {
    try {
        const { error } = validator(req.body);

        if (error) return res.status(400).send(error.details[0].message);

        let user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).send('user already registred');
        user = new User(_.pick(req.body, ['name', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(req.body.password, salt);
        await user.save();
        res.status(200).send(_.pick(user, ['_id', 'name', 'email']));
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
