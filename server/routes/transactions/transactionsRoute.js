const express=require('express');
const { createTransactionCtrl, allTransactionsCtrl, singleTransactionsCtrl, deleteTransactionCtrl, updateTransactionCtrl } = require('../../controllers/transactions/transactionsCtrl');
const isLoginValid = require('../../middlewares/validLogin');
const transactionsRoute=express.Router();

transactionsRoute.post('/', isLoginValid, createTransactionCtrl)

transactionsRoute.get('/',allTransactionsCtrl)

transactionsRoute.get('/:id',singleTransactionsCtrl)

transactionsRoute.delete('/:id',deleteTransactionCtrl)

transactionsRoute.put('/:id',updateTransactionCtrl)

module.exports=transactionsRoute;