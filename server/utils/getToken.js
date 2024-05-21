const getToken = (req) => {
    const headerObj = req.headers;
    const token = headerObj["authorization"].split(" ")[1];

    if (token !== undefined) {
        return token;
    } else {
        return {
            status: "Failed",
            message: "No Token Attached With Header"
        }
    }
}

module.exports = getToken;