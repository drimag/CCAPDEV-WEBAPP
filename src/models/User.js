const { Schema, SchemaTypes, model } = require('mongoose');

const userSchema = new Schema({
    // place code
    username: {
        type: SchemaTypes.String,
        required: true,
        unique: true
    },
    password: {
        type: SchemaTypes.String,
        required: true
    },
    bio: {
        type: SchemaTypes.String,
        required: false,
        default: ""
    },
    pfp: {
        data: SchemaTypes.Buffer,
        contentType: SchemaTypes.String
        // TODO: maybe add a default img if none added?
    },
    upvoteComments: {
        type: [SchemaTypes.Number],
        default: []
    },
    downvoteComments: {
        type: [SchemaTypes.Number],
        default: []
    },
    upvotePosts: {
        type: [SchemaTypes.Number],
        default: []
    },
    downvotePosts: {
        type: [SchemaTypes.Number],
        default: []
    }
});

const User = model('User', userSchema);

module.exports = User;