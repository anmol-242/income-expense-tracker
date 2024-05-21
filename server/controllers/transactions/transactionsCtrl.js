const accountModel = require("../../models/Accounts");
const transaction = require("../../models/Transactions");
const transactionModel = require("../../models/Transactions");
const userModel = require("../../models/Users");
const { appError } = require("../../utils/appError");


const createTransactionCtrl = async (req, res,next) => {
    const {name, amount, notes, transactionType, account, category} = req.body;
    try {
        const UserFound= await userModel.findById(req.user);
        if(!UserFound) return next(appError('User Not Found',404));

        const accountFound = await accountModel.findById(account);
        if(!accountFound) return next(appError("Account Not Found",404));

        const transaction = await transactionModel.create({
            name,
            amount,
            notes,
            account,
            transactionType,
            category,
            createdBy: req.user
        });

        accountFound.transactions.push(transaction._id);

        await accountFound.save(); 

        res.json({ 
            status: "Success",
            data: transaction });
    } catch (error) {
        next(appError(error.message,500));
    }
}

const allTransactionsCtrl = async (req, res,next) => {
    try {
        const transactions= await transactionModel.find();
        res.status(200).json({
            status:"Success",
            data:transactions
        });
    } catch (error) {
        next(appError(error.message,500));
    }
}

const singleTransactionsCtrl = async (req, res,next) => {
    try {
        const {id} =req.params;
        const transaction = await transactionModel.findById(id)
        res.json({ 
            status: "Success",
            data: transaction
     });
    } catch (error) {
        next(appError(error.message,500));
    }
}

const deleteTransactionCtrl = async (req, res,next) => {
    try {
        const {id} =req.params;
        await transactionModel.findByIdAndDelete(id);

        res.json({ 
            status: "Success",
            data: null });
    } catch (error) {
        next(appError(error.message,500));
    }
}

const updateTransactionCtrl = async (req, res,next) => {
    try {
        const {id}= req.params;
        const transaction= await transactionModel.findByIdAndUpdate(id, req.body,{
            new:true,
            runValidators:true
        });
        res.json({ 
            status: "Success",
            data: transaction
        });
    } catch (error) {
        next(appError(error.message,500));
    }
}

module.exports = { createTransactionCtrl, allTransactionsCtrl, singleTransactionsCtrl, deleteTransactionCtrl, updateTransactionCtrl }