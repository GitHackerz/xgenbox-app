const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { UserRole, AccountType } = require('../enums/EUser');

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
    },
    phone: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: UserRole.EMPLOYEE,
        enum: Object.values(UserRole)
    },
    // Only For Collectors & Companies
    accountType: {
        type: String,
        enum: Object.values(AccountType)
    },
    // Only for Collectors if accountType is Company
    companyName: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    // Only for Company
    address: {
        type: String
    },
    city: {
        type: String
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