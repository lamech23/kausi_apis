const hasAdmin = (req, res, next) => {
    try {
        // Retrieve the user's access token from the request
        const accessToken = req.user;

        // Extract the user ID from the access token
        const roles = accessToken.userId.role;

        // Check if the user has the "admin" role
        if (roles.includes("admin") || roles.includes("agent") ) {
            next();
        } else {
            res.status(403).send({
                message: "Require Admin Role!",
            });
        }
    } catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};

const hasAgent = (req, res, next) => {
    try {
        // Retrieve the user's access token from the request
        const accessToken = req.user;

        console.log(accessToken)
        // Extract the user ID from the access token
        const roles = accessToken.userId.role;

        // Check if the user has the "admin" role
        if (roles.includes("agent")) {
            next();
        } else {
            res.status(403).send({
                message: "Require Agent Role!",
            });
        }
    } catch (error) {
        // Handle token verification errors
        res.status(401).json({ error: "Invalid token" });
    }
};



module.exports = { hasAdmin,hasAgent};