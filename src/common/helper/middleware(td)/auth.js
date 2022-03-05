const JWT = require("jsonwebtoken");
const User = require("../../../api/User/model");

module.exports = async (req, res, next) => {
  try {
    if (req.originalUrl === "/api/authentication/signin") {
      next();
      return;
    }

    const token = req.headers.authorization;
    const decodedToken = JWT.verify(token, "secretKey");
    const userId = decodedToken._id;
    const userData = userId ? await User.findById(userId) : null;
    if (!userId || !userData) {
      throw "Invalid user ID";
    } else {
      req.credentials = userData;
      next();
    }
  } catch (err) {
    res.status(401).json({ message: "unathorized" });
  }
};
