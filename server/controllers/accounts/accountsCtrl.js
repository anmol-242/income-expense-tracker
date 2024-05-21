const accountModel = require("../../models/Accounts");

const userModel = require("../../models/Users");

const { appError } = require("../../utils/appError");

const createAccountCtrl = async (req, res, next) => {
    const { name, initialBalance, accountType, notes } = req.body;

    try {
        const userFound = await userModel.findById(req.user);
        if (!userFound) return next(appError("User Not Found", 404));

        const account = await accountModel.create({
            name,
            initialBalance,
            accountType,
            notes,
            createdBy: req.user,
        })

        userFound.accounts.push(account._id);

        await userFound.save();
        res.json({
            status: "Success",
            data: account
        });
    } catch (error) {
        next(appError(error.message, 500));
    }
}

const allAccountsCtrl = async (req, res, next) => {
    try {
        const accounts = await accountModel.find().populate('transactions');
        res.json(accounts);

    } catch (error) {
        next(appError(error.message, 500));
    }
}

const singleAccountCtrl = async (req, res, next) => {
    try {
        const { id } = req.params;
        const account = await accountModel.findById(id).populate('transactions');

        res.json({
            status: "Success",
            data: account
        });
    } catch (error) {
        next(appError(error.message, 500));
    }
}

const deleteAccountCtrl = async (req, res, next) => {
    try {
        const {id} = req.params;
        await accountModel.findByIdAndDelete(id);
        res.json({ 
            status: "Success",
        data: null 
    });
    } catch (error) {
        next(appError(error.message, 500));
    }
}

const updateAccountCtrl = async (req, res, next) => {
    try {
        const { id } = req.params;
        const account = await accountModel.findByIdAndUpdate(
            id, req.body, {
            new: true,
            runValidators: true
        }
        )
        res.json({
            status: "Success",
            data: account
        });
    } catch (error) {
        next(appError(error.message, 500));
    }
}

module.exports = { createAccountCtrl, allAccountsCtrl, singleAccountCtrl, deleteAccountCtrl, updateAccountCtrl }