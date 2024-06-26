const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const { UserRole, AccountType, UserStatus } = require('../enums/EUser');

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
    status: {
        type: String,
        default: UserStatus.PENDING,
        enum: Object.values(UserStatus)
    },
    // Only for Employee and Collectors if accountType is Company
    company: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    // Only for Company
    companyName: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    accountType: {
        type: String,
        enum: Object.values(AccountType)
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