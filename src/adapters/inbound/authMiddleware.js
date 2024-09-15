const jwt = require("jsonwebtoken");
const responseHandler = require("../../utils/responseHandler");

module.exports = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return responseHandler.error(req, res, "No token provided", 403);
  }

  jwt.verify(
    token.replace("Bearer ", ""),
    process.env.JWT_SECRET,
    (err, decoded) => {
      if (err) {
        return responseHandler.error(
          req,
          res,
          "Failed to authenticate token",
          403
        );
      }
      req.user = decoded;
      next();
    }
  );
};
