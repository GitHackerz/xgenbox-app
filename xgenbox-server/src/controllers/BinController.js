const BinService = require('../services/BinService');

const GetBins = async(req, res) => {
    try {
        const bins = await BinService.getAll();
        res.status(200).json(bins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const GetBinsByType = async(req, res) => {
    try {
        const bins = await BinService.getByType(req.params.type);
        res.status(200).json(bins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const GetBin = async(req, res) => {
    try {
        const bin = await BinService.getById(req.params.id);
        return res.status(200).json(bin);
    } catch (error) {
        if (error.message === 'Bin not found')
            return res.status(404).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

const GetBinsByLocation = async(req, res) => {
    try {
        const bins = await BinService.getByLocation(req.params.latitude, req.params.longitude);
        res.status(200).json(bins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const CreateBin = async(req, res) => {
    try {
        const bin = await BinService.create(req.body);
        return res.status(201).json(bin);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const UpdateBin = async(req, res) => {
    try {
        const bin = await BinService.update(req.params.id, req.body);
        return res.status(200).json(bin);
    } catch (error) {
        if (error.message === 'Bin not found')
            return res.status(404).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

const DeleteBin = async(req, res) => {
    try {
        await BinService.delete(req.params.id);
        return res.status(204).json();
    } catch (error) {
        if (error.message === 'Bin not found')
            return res.status(404).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    GetBins,
    GetBinsByType,
    GetBinsByLocation,
    GetBin,
    CreateBin,
    UpdateBin,
    DeleteBin
};
