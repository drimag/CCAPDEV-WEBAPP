const { Schema, SchemaTypes, model } = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

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

userSchema.pre('save', async function (next){
    const user = this;

    if(!user.isModified('password'))
        return next();
    
    try{
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);

        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
        next();
    } catch (err) {
        console.error(err);
        return next(err);
    }
});

userSchema.method('comparePassword', function (candidatePassword){
    return bcrypt.compare(candidatePassword, this.password);
});
const User = model('User', userSchema);

module.exports = User;