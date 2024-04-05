const UserModel = require('../models/UserModel');
const { sign } = require('jsonwebtoken');

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
    signin: async(email, password) => {
        const user = await UserService.getByEmail(email);
        if (!user)
            throw new Error('User not found');

        const isMatch = await user.comparePassword(password);
        if (!isMatch)
            throw new Error('Invalid credentials');

        return {
            user,
            token: sign({ user }, process.env.JWT_SECRET)
        };
    }
};

module.exports = UserService;