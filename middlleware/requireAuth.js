const jwt = require("jsonwebtoken");
const User = require("../models/UserModels");
const requireAuth = async (req, res, next) => {
  // const {id} =req.params

  //verifying authenticaton
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }
  const token = authorization.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

const isAdmin = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.redirect("/");
    }
    const token = authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET);
    console.log(decodedToken);

    if (decodedToken.role && decodedToken.role.includes("admin")) {
      next();
    } else {
      return res.status(403).json({ error: "You do not have permission to access this resource" });
    }

  } catch (error) {
    console.error("Token verification failed:", error);
    return res.status(401).json({ error: "Request is not authorized" });
    // return res.redirect("/login");
  }
};


const checkIfOwner = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: "Authorization token required" });
    }
    const token = authorization.split(" ")[1];
    const isUser = jwt.verify(token, process.env.SECRET);
    const id = isUser.id;
    const user = await User.findOne({ where: { id } });
    if (user) {
      next();
    }
  } catch (error) {
    res.status(403).json({ error: "You forbiden to perform that action" });
    res.redirect("/");
  }
};


 const routeProtection = (req, res, next) =>{
  try {

  } catch (error) {

  }
 }
module.exports = { requireAuth, isAdmin, checkIfOwner, routeProtection };
