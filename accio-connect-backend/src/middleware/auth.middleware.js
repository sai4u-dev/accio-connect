const jwt = require("jsonwebtoken");

// const authorize = (req, res, next) => {
//   const token = req.cookies["accioConnectToken"];
//   if (!token) return res.err(401, "Authentication required");

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.err(401, "Invalid or expired token");
//   }
// };

const authorize = (req, res, next) => {
  const token =
    req.cookies?.accioConnectToken || req.headers.authorization?.split(" ")[1];

  if (!token) return res.err(401, "Authentication required");

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id };
    next();
  } catch {
    return res.err(401, "Invalid or expired token");
  }
};

module.exports = authorize;
