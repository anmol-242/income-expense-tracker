const express=require('express');
const { createAccountCtrl, allAccountsCtrl, singleAccountCtrl, deleteAccountCtrl, updateAccountCtrl } = require('../../controllers/accounts/accountsCtrl');
const isLoginValid = require('../../middlewares/validLogin');
const accountsRoute=express.Router();

accountsRoute.post('/',isLoginValid,createAccountCtrl)

accountsRoute.get('/',allAccountsCtrl)

accountsRoute.get('/:id',singleAccountCtrl)

accountsRoute.delete('/:id',deleteAccountCtrl)

accountsRoute.put('/:id',updateAccountCtrl)

module.exports=accountsRoute;