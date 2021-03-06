const express = require('express');
const router = express.Router();
const auth = require('./../middleware/auth');
const { Post, validate } = require('./../models/posts');
router.get('/', async (req, res) => {
    const posts = await Post.find({});
    if (!posts)
        return res.status(400).send('there is not anything on database');

    res.status(200).send(posts);
    console.log(posts)
});

router.get('/count', async (req, res) => {
    const documentCount = await Post.countDocuments();
    if (!documentCount)
        return res.status(400).send('there is not data on database');

    res.status(200).send({ count: documentCount });
});

router.post('/', auth, async (req, res) => {
    try {
        console.log(req.body);
        const { error } = validate(req.body);
        if (error) return res.status(400).send(error.details[0]);

        let post = new Post(req.body);
        post = await post.save();
        res.status(200).send(post);
    } catch (err) {
        res.status(400).send();
    }
});

router.put('/:id', auth, async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const post = await Post.findByIdAndUpdate(
        req.params.id,
        {
            postTitle: req.body.postTitle,
            postDate: req.body.postDate,
            postImageUrl: req.body.postImageUrl,
            postContent: req.body.postContent,
            postTags: req.body.postTags,
            postLike: req.body.postLike
        },
        { new: true }
    );
    if (!post)
        return res.status(404).send('There is not post for the given id');
    res.status(200).send(post);
});

router.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id);

    if (!post)
        return res.status(404).send('There is no post for the given id.');

    res.status(200).send(post);
});

router.put('/like/:id', async (req, res) => {
    const post = await Post.findByIdAndUpdate(
        req.params.id,
        { $inc: { postLike: +1 } },
        { new: true }
    );

    if (!post)
        return res.status(404).send('There is no post for the given id.');

    res.status(200).send(post);
});

router.delete('/:id', auth, async (req, res) => {
    const post = await Post.findByIdAndRemove(req.params.id);

    if (!post)
        return res.status(404).send('There is no post for the given id.');
    res.status(200).send(post);
});
module.exports = router;
