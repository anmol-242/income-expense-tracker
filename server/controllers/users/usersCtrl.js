const userModel = require("../../models/Users");
const bcrypt = require('bcryptjs');
const { appError } = require("../../utils/appError");
const genToken = require("../../utils/genToken");

const registerUserCtrl = async (req, res, next) => {
    const { fullname, password, email } = req.body;
    try {
        const userFound = await userModel.findOne({ email });
        if (userFound) {
            return next(appError("User already exists!", 400))
        };


        const salt = await bcrypt.genSalt(10);
        const hashedPWD = await bcrypt.hash(password, salt);


        const user = await userModel.create({
            fullname,
            email,
            password: hashedPWD
        });
        res.json({
            status: "Success",
            fullname: user.fullname,
            email: user.email,
            id: user._id

        })
    } catch (error) {
        next(appError(error.message, 500))
    }
}

const loginUserCtrl = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const userFound = await userModel.findOne({ email });
        if (!userFound) {
            return next(appError("Invalid Login Credentials", 400));
        }

        const isPasswordMatch = await bcrypt.compare(password, userFound.password);
        if (!isPasswordMatch) {
            return next(appError("Invalid Login Credentials", 400));
        }
        res.json({
            status: "Success",
            fullname: userFound.fullname,
            id: userFound._id,
            token: genToken(userFound._id)
        });
    } catch (error) {
        next(appError(error.message, 500));
    }
}

const profileUserCtrl = async (req, res, next) => {

    try {
        const user = await userModel.findById(req.user).populate({
            path: 'accounts',
            populate: {
                path: 'transactions'
            }
        });

        res.json({ user });
    } catch (error) {
        next(appError(error.message, 500));
    }
}

const deleteUserCtrl = async (req, res, next) => {
    try {
        await userModel.findByIdAndDelete(req.user);
        res.status(200).json({
            status: "success",
            data: null
        })
        res.json({ msg: "Delete User Route" });
    } catch (error) {
        next(appError(error.message, 500));
    }
}

const updateUserCtrl = async (req, res, next) => {
    try {
        if (req.body.email) {
            const userFound = await userModel.findOne({ email: req.body.email });
            if (userFound) return next(appError("Email is taken / You already have this mail", 400));
        }


        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPWD = await bcrypt.hash(req.body.password, salt);

            const user = await userModel.findByIdAndUpdate(
                req.user,
                { password: hashedPWD },
                {
                    new: true,
                    runValidators: true
                });

            return res.status(200).json({
                status: "success",
                data: user
            });
        }

        const user = await userModel.findByIdAndUpdate(req.user, req.body, {
            new: true,
            runValidators: true
        })

        res.status(200).json({
            status: "success",
            data: user
        });
    } catch (error) {
        next(appError(error.message, 500));
    }
}
module.exports = { registerUserCtrl, loginUserCtrl, profileUserCtrl, deleteUserCtrl, updateUserCtrl }