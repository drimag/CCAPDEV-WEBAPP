const { Schema, SchemaTypes, model } = require('mongoose');

const postSchema = new Schema({
    // place code
    postNum: {
        type: SchemaTypes.Number,
        required: true
    },
    user_id: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: SchemaTypes.String,
        required: true
    },
    description: {
        type: SchemaTypes.String,
        required: true
    },
    votes: {
        type: SchemaTypes.Number,
        required: true,
        default: 0
    },
    num_comments: {
        type: SchemaTypes.Number,
        required: true,
        default: 0
    },
    comments_id: {
        type: [{
            type: SchemaTypes.ObjectId,
            ref: 'Comment'
        }],
        default: []
    },
    edited: {
        type: SchemaTypes.Boolean,
        required: true,
        default: false
    }
});

const Post = model('Post', postSchema);

module.exports = Post;