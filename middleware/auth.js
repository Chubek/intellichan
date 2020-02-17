const jwt = require("jsonwebtoken")
require("dotenv").config()

function auth(req, res, next) {
    const token = req.header("x-auth-token")
    console.log("token", token)
    if (!token) return res.status(401).json({ message: "No token, access denied." })

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        console.log("decoded", decoded)
        req.user = decoded.data
        next()
    }
    catch {
        res.status(400).json({ message: "Token is not valid"} )
    }
}

module.exports = auth