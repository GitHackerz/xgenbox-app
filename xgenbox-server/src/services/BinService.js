const BinModel = require('../models/BinModel');

const BinService = {
    getAll: () => BinModel.find(),
    create: (data) => BinModel.create(data),
    update: (id, data) => BinModel.findByIdAndUpdate(id, data, { new: true }),
    delete: (id) => BinModel.findByIdAndDelete(id),
    getById: (id) => BinModel.findById(id),
    getByType: (type) => BinModel.find({ type }),
    getByLocation: (latitude, longitude) => BinModel.find({ latitude, longitude }),
    getByCompany: (company) => BinModel.find({ company })
};

module.exports = BinService;