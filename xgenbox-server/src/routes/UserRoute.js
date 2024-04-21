const express = require('express');
const router = express.Router();

const { GetUsers, GetUser, CreateUser, UpdateUser, DeleteUser, SignIn, GetUsersByType, approveUser, rejectUser,
    GetPendingUsers
} = require('../controllers/UserController');
// const { auth } = require('../config/AuthMiddlewares');

router.post('/signin', SignIn);
router.get('/type/:type', GetUsersByType);
router.route('/')
    .get(GetUsers)
    .post(CreateUser);

router.get('/pending', GetPendingUsers);

router.get('/:id/approve', approveUser);
router.get('/:id/reject', rejectUser);

router.route('/:id')
    .get(GetUser)
    .put(UpdateUser)
    .delete(DeleteUser);

module.exports = router;
