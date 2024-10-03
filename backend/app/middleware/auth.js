const jwt = require("jsonwebtoken");
const config = require("../config/config");

verifyToken = (req, res, next) => {

  // Allow access to these endpoints without token
  if (req.path === '/api/v1/login' || req.path === '/api/v1/signup'
    || req.path === '/api/gadget/open_redirect' || req.path === '/api/gadget/jsonp'
    || req.path === '/api/translation/fr.js' || req.path === '/api/translation/en.js') {
    return next();
  }

  //Token verification
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token,
    config.jwtSecret,
    (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Unauthorized!",
        });
      }
      req.userId = decoded.id;
      req.role = decoded.role;
      next();
    });
};

// Check if user is admin
isAdmin = (req, res, next) => {
  if (req.role === "admin") {
    next();
    return;
  } else {
    res.status(403).send({ message: "Require Admin Role!" });
    return;
  }
};

const auth = {
  verifyToken,
  isAdmin
};

module.exports = auth