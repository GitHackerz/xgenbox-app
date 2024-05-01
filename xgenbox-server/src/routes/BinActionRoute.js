const express = require('express');
const router = express.Router();

const { GetBinActions, GetBinAction, CreateBinAction, UpdateBinAction, GetBinActionsByBin, GetBinActionsByUser, GetBinActionsByType,
    GetBinActionsByCompany
} = require('../controllers/BinActionController');

router.get('/bin/:bin', GetBinActionsByBin);
router.get('/user/:user', GetBinActionsByUser);
router.get('/type/:type', GetBinActionsByType);
router.get('/company/:company', GetBinActionsByCompany);

router.route('/')
    .get(GetBinActions)
    .post(CreateBinAction);

router.route('/:id')
    .get(GetBinAction)
    .put(UpdateBinAction);

module.exports = router;