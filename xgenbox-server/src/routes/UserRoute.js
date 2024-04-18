const express = require('express');
const router = express.Router();

const { GetUsers, GetUser, CreateUser, UpdateUser, DeleteUser, SignIn, GetUsersByType } = require('../controllers/UserController');
// const { auth } = require('../config/AuthMiddlewares');

router.post('/signin', SignIn);
router.get('/type/:type', GetUsersByType);
router.route('/')
    .get(GetUsers)
    .post(CreateUser);

router.route('/:id')
    .get(GetUser)
    .put(UpdateUser)
    .delete(DeleteUser);

module.exports = router;
