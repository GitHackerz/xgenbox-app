const BinModel = require('../models/BinModel');
const { BinStatus } = require('../enums/EBin');

const BinService = {
    getAll: () => BinModel.find(),
    create: (data) => BinModel.create(data),
    update: (id, data) => BinModel.findByIdAndUpdate(id, data, { new: true }),
    delete: (id) => BinModel.findByIdAndDelete(id),
    getById: (id) => BinModel.findById(id),
    getByType: (type) => BinModel.find({ type }),
    getByLocation: (latitude, longitude) => BinModel.find({ latitude, longitude }),
    getByCompany: (company) => BinModel.find({ company }),
    getByStatus: (status) => BinModel.find({ status }),
    approve: async(id) => {
        const bin = await BinService.getById(id);
        if (!bin)
            throw new Error('Bin not found');
        if (!bin.status === BinStatus.PENDING)
            throw new Error('Bin is not pending');
        bin.status = BinStatus.APPROVED;
        return bin.save();
    },
    reject: async(id) => {
        const bin = await BinService.getById(id);
        if (!bin)
            throw new Error('Bin not found');
        if (!bin.status === BinStatus.PENDING)
            throw new Error('Bin is not pending');
        bin.status = BinStatus.REJECTED;
        return bin.save();
    }
};

module.exports = BinService;