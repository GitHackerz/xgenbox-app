const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', function(next) {
    if (!this.isModified('password'))
        return next();

    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

userSchema.pre('findOneAndUpdate', function(next) {
    if (!this._update.password)
        return next();

    this._update.password = bcrypt.hashSync(this._update.password, 10);
    next();
});

userSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = model('User', userSchema);