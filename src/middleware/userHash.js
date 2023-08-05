//import { Scheme, SchemaTypes, model } from 'mongoose';
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

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