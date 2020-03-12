const express = require('express');
const router = express.Router();
const auth = require('./../middleware/auth');
const { Post, validate } = require('./../models/posts');

router.get('/', async (req, res) => {
    const posts = await Post.find({});
    if (!posts)
        return res.status(400).send('there is not anything on database');
    res.status(200).send(posts);
});

module.exports = router;
