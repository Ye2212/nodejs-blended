const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }

  try {
    const token = req.headers.authorization;
    const splitToken = token.split(" ")[1];

    if (!token.startsWith("Bearer") || !splitToken) {
      res.status(403);
      throw new Error("User is not login");
    }

    const { decodedData } = jwt.verify(splitToken, process.env.JWT_SECRET_KEY);
    req.user = decodedData;

    next();
  } catch (error) {
    res.status(403).json({
      code: 403,
      message: "User is not authorized",
    });
  }
};

module.exports = authMiddleware;
