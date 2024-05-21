const jwt = require("jsonwebtoken");


const genToken = id =>{
    return jwt.sign({id},"anykey",{expiresIn: "1d"});
}

module.exports = genToken;