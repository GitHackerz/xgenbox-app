const BinActionService = require('../services/BinActionService');

const GetBinActions = async(req, res) => {
    try {
        const binActions = await BinActionService.getAll();
        res.status(200).json(binActions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const GetBinAction = async(req, res) => {
    try {
        const binAction = await BinActionService.getById(req.params.id);
        return res.status(200).json(binAction);
    } catch (error) {
        if (error.message === 'BinAction not found')
            return res.status(404).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

const GetBinActionsByBin = async(req, res) => {
    try {
        const binActions = await BinActionService.getByBin(req.params.bin);
        res.status(200).json(binActions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const GetBinActionsByUser = async(req, res) => {
    try {
        const binActions = await BinActionService.getByUser(req.params.user);
        res.status(200).json(binActions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const GetBinActionsByType = async(req, res) => {
    try {
        const binActions = await BinActionService.getByType(req.params.type);
        res.status(200).json(binActions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const GetBinActionsByCompany = async(req, res) => {
    try {
        const actions = await BinActionService.getAll();

        const binActions = actions.filter(action => action.bin.company.toString() === req.params.company);
        res.status(200).json(binActions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const CreateBinAction = async(req, res) => {
    try {
        const binAction = await BinActionService.create(req.body);
        return res.status(201).json(binAction);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

const UpdateBinAction = async(req, res) => {
    try {
        const binAction = await BinActionService.update(req.params.id, req.body);
        return res.status(200).json(binAction);
    } catch (error) {
        if (error.message === 'BinAction not found')
            return res.status(404).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

const DeleteBinAction = async(req, res) => {
    try {
        await BinActionService.delete(req.params.id);
        return res.status(204).json();
    } catch (error) {
        if (error.message === 'BinAction not found')
            return res.status(404).json({ error: error.message });

        return res.status(500).json({ error: error.message });
    }
};

module.exports = { GetBinActions, GetBinAction, GetBinActionsByBin, GetBinActionsByUser, GetBinActionsByType, CreateBinAction, UpdateBinAction, DeleteBinAction, GetBinActionsByCompany };