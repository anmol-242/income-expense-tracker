const { appError } = require("../utils/appError");
const getToken = require("../utils/getToken");
const verifyToken = require("../utils/verifyToken");

const isLoginValid = (req, res, next) => {
    const token = getToken(req);

    const decodedUser = verifyToken(token);

    req.user = decodedUser.id;
    if (!decodedUser) {
        return next(appError("Invalid/Expired Token! Please Logn Again", 401));
    }
    next();
}

module.exports = isLoginValid;