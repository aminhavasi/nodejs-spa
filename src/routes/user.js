const express = require('express');
const router = express.Router();
const { User } = require('./../models/user');
const admin = {
    name: 'amin havasi',
    email: 'pau.ahq@gmail.com',
    password: '123456789'
};
let neuuser = new User(admin);
neuuser.save();
module.exports = router;
