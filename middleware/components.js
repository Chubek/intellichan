const jwt = require("jsonwebtoken")
require("dotenv").config()

const components = {
    auth: function auth(req, res, next) {
        const token = req.header("x-auth-token")
       
    
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
    },
    increment: function increment(req, res, next) {
        let current_id = req.header("current-id")

        if (!current_id) return res.status(401).json({ message: "No id, access denied." })

        current_id = parseInt(current_id)

        try {
            req.inc = {next: current_id + 1}
            next()
        }
        catch {
            res.status(400).json({ message: "Error processing id."} )
        }
    

    }
} 

module.exports = components