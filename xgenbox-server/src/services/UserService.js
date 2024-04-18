const UserModel = require('../models/UserModel');
// const { sign } = require('jsonwebtoken');
const { SignJWT } = require('jose');

const UserService = {
    getAll: () => UserModel.find(),
    create: async(data) => {
        const existingUser = await UserService.getByEmail(data.email);
        if (existingUser)
            throw new Error('User already exists');

        return UserModel.create(data);
    },
    update: (id, data) => UserModel.findByIdAndUpdate(id, data, { new: true }),
    delete: (id) => UserModel.findByIdAndDelete(id),
    getById: (id) => UserModel.findById(id),
    getByEmail: (email) => UserModel.findOne({ email }),
    getByType: (type) => UserModel.find({ role: type.toUpperCase() }),
    signin: async(email, password) => {
        const user = await UserService.getByEmail(email);
        if (!user)
            throw new Error('User not found');

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            throw new Error('Invalid credentials');

        const key = new TextEncoder().encode(process.env.JWT_SECRET);

        const token = await new SignJWT({ ...user, id: user._id.toString() })
            .setProtectedHeader({ alg: 'HS256' })
            .setIssuedAt()
            .setExpirationTime('24h')
            .sign(key);
        if (!token)
            throw new Error('Error signing token');

        return {
            user,
            token
        };
    }
};

module.exports = UserService;