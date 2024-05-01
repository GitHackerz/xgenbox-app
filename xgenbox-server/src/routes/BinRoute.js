const express = require('express');
const router = express.Router();

const { GetBins, GetBin, CreateBin, UpdateBin, DeleteBin, GetBinsByType, GetBinsByLocation, GetBinByCompany } = require('../controllers/BinController');

router.get('/type/:type', GetBinsByType);
router.get('/company/:company', GetBinByCompany);
router.get('/location/:latitude/:longitude', GetBinsByLocation);
router.route('/')
    .get(GetBins)
    .post(CreateBin);

router.route('/:id')
    .get(GetBin)
    .put(UpdateBin)
    .delete(DeleteBin);

module.exports = router;