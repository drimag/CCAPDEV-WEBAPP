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
    date: {
        type: SchemaTypes.Date,
        required: true,
        default: Date.now()
    },
    title: {
        type: SchemaTypes.String,
        required: true
    },
    description: {
        type: SchemaTypes.String,
        required: true
    },
    image: {
        data: SchemaTypes.Buffer,
        contentType: SchemaTypes.String
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

const Post = model('Post', postSchema);

module.exports = Post;