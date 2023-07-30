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
        type: Schema.Types.String,
        data: SchemaTypes.Buffer
    }
});

const User = model('user', userSchema);

module.exports = User;