const jwt = require("jsonwebtoken");

const verifyUserToken = (req: any, res: any, next: any) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token missing" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, "YOUR_SECRET_KEY");

    req.currentUser = decoded;

    next(); // go to next controller

  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = verifyUserToken;

export {};
