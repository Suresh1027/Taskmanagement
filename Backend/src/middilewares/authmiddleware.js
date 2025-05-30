const jwt = require("jsonwebtoken")

const authmiddileware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" })
    }

    jwt.verify(token, "suresh123", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.user = decoded;
        next()
    })
}

module.exports = authmiddileware;