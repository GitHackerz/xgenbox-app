const express = require('express');
const router = express.Router();

const { GetBins, GetBin, CreateBin, UpdateBin, DeleteBin, GetBinsByType, GetBinsByLocation, GetBinByCompany,
    GetBinsByStatus, ApproveBin, RejectBin
} = require('../controllers/BinController');

router.get('/type/:type', GetBinsByType);
router.get('/company/:company', GetBinByCompany);
router.get('/status/:status', GetBinsByStatus);
router.get('/location/:latitude/:longitude', GetBinsByLocation);

router.route('/')
    .get(GetBins)
    .post(CreateBin);

router.route('/:id')
    .get(GetBin)
    .put(UpdateBin)
    .delete(DeleteBin);

router.get('/:id/approve', ApproveBin);
router.get('/:id/reject', RejectBin);

module.exports = router;