const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const persianDate = require('persian-date');
persianDate.toLocale('fa');
const postSchema = new mongoose.Schema({
    postTitle: { type: String, required: true, trim: true },
    postDate: {
        type: String,
        required: false,
        trim: true,
        default: new persianDate().format('YYYY/MM/DD')
    },
    postImageUrl: { type: String, required: false, trim: true },
    postContent: { type: String, required: true },
    postTags: [String],
    postLike: { type: Number, default: 0 }
});
const Post = mongoose.model('Post', postSchema);
const validate = post => {
    const Schema = Joi.object({
        postTitle: Joi.string().required(),
        postDate: Joi.string(),
        postImageUrl: Joi.string(),
        postContent: Joi.string().required(),
        postTags: Joi.array(),
        postLike: Joi.number()
    });
    return Schema.validate(Schema);
};

module.exports = {
    Post,
    validate
};
