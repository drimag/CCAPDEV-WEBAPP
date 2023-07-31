const { Schema, SchemaTypes, model } = require('mongoose');

const commentSchema = new Schema({
    // place code
    commentNum: {
        type: SchemaTypes.Number,
        required: true
    },
    user_id: {
        type: SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    post_id: {
        type: SchemaTypes.ObjectId,
        ref: 'Post',
        required: true
    },
    parent_id: {
        type: SchemaTypes.ObjectId,
        ref: 'Comment',
        default: null
    },
    comment: {
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
    edited: {
        type: SchemaTypes.Boolean,
        required: true,
        default: false
    }
});

const Comment = model('Comment', commentSchema);

module.exports = Comment;