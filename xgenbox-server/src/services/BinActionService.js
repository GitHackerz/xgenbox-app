const BinActionModel = require('../models/BinActionModel');

const BinActionService = {
    getAll: () => BinActionModel.find().populate('bin').populate('user'),
    create: (data) => BinActionModel.create(data),
    update: (id, data) => BinActionModel.findByIdAndUpdate(id, data, { new: true }).populate('bin').populate('user'),
    delete: (id) => BinActionModel.findByIdAndDelete(id).populate('bin').populate('user'),
    getById: (id) => BinActionModel.findById(id).populate('bin').populate('user'),
    getByBin: (bin) => BinActionModel.find({ bin }).populate('bin').populate('user'),
    getByUser: (user) => BinActionModel.find({ user }).populate('bin').populate('user'),
    getByType: (type) => BinActionModel.find({ type }).populate('bin').populate('user')
};

module.exports = BinActionService;