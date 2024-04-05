const checkUser = async(req, res, next) => {
    const { name, email, password } = req.body;
    const errors = [];
    if (!name)
        errors.push('Name');
    if (!email)
        errors.push('Email');
    if (!password)
        errors.push('Password');

    if (errors.length > 0)
        return res.status(400).json({ error: `${errors.join(', ')} are required` });

    next();
};

module.exports = { checkUser };