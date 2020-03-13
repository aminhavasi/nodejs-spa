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

router.get('/count', async (req, res) => {
    const documentCount = await Post.countDocuments();
    if (!documentCount)
        return res.status(400).send('there is not data on database');

    res.status(200).send({ count: documentCount });
});

router.post('/', auth, async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        let post = new Post(req.body);
        post = await post.save();
        res.status(200).send(post);
    } catch (err) {
        res.status(400).send();
    }
});
module.exports = router;
