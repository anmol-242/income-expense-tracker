const express = require('express');
const { registerUserCtrl, loginUserCtrl, profileUserCtrl, deleteUserCtrl, updateUserCtrl } = require('../../controllers/users/usersCtrl');
const isLoginValid = require('../../middlewares/validLogin');

const usersRoute= express.Router();

usersRoute.post('/register',registerUserCtrl);

usersRoute.post('/login',loginUserCtrl);

usersRoute.get('/profile',isLoginValid ,profileUserCtrl)

usersRoute.delete('/',isLoginValid,deleteUserCtrl)

usersRoute.put('/',isLoginValid, updateUserCtrl)

module.exports= usersRoute; 