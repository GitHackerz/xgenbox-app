const { verify } = require('jsonwebtoken');

const auth = (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).json({ error: 'Unauthorized' });

    const token = authorization.split(' ')[1];
    if (!token)
        return res.status(401).json({ error: 'Unauthorized' });

    const decoded = verify(token, process.env.JWT_SECRET);
    if (!decoded)
        return res.status(401).json({ error: 'Unauthorized' });

    req.payload = decoded;
    next();
};

const isAdmin = (req, res, next) => {
    const { role } = req.payload;
    if (role !== 'admin')
        return res.status(403).json({ error: 'Forbidden' });

    next();
};

module.exports = { auth, isAdmin };