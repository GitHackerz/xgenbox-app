const UserService = require('../services/UserService');

const GetUsers = async(req, res) => {
    try {
        const users = await UserService.getAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const GetUsersByType = async(req, res) => {
    try {
        const users = await UserService.getByType(req.params.type);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const GetCompanyUsers = async(req, res) => {
    try {
        const users = await UserService.getByCompany(req.params.company);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const GetPendingUsers = async(req, res) => {
    try {
        const users = await UserService.getPending();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const GetUser = async(req, res) => {
    try {
        const user = await UserService.getById(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        if (error.message === 'User not found')
            return res.status(404).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

const CreateUser = async(req, res) => {
    try {
        const user = await UserService.create(req.body);
        return res.status(201).json(user);
    } catch (error) {
        if (error.message === 'User already exists')
            return res.status(400).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

const UpdateUser = async(req, res) => {
    try {
        const user = await UserService.update(req.params.id, req.body);
        return res.status(200).json(user);
    } catch (error) {
        if (error.message === 'User not found')
            return res.status(404).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

const DeleteUser = async(req, res) => {
    try {
        const user = await UserService.delete(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        if (error.message === 'User not found')
            return res.status(404).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

const SignIn = async(req, res) => {
    try {
        const { email, password } = req.body;
        const { token } = await UserService.signin(email, password);
        return res.status(200).json({ token });
    } catch (error) {
        if (error.message === 'User not found')
            return res.status(404).json({ error: error.message });

        if (error.message === 'Invalid credentials')
            return res.status(400).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

const approveUser = async(req, res) => {
    try {
        const user = await UserService.approve(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        if (error.message === 'User not found')
            return res.status(404).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

const rejectUser = async(req, res) => {
    try {
        const user = await UserService.reject(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        if (error.message === 'User not found')
            return res.status(404).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

const grantUser = async(req, res) => {
    try {
        const user = await UserService.grant(req.params.id);
        return res.status(200).json(user);
    } catch (error) {
        if (error.message === 'User not found')
            return res.status(404).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

module.exports = { GetUsers, GetUsersByType, GetCompanyUsers, GetPendingUsers, GetUser, CreateUser, UpdateUser, DeleteUser, SignIn, approveUser, rejectUser, grantUser };