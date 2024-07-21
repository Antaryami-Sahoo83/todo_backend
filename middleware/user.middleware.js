const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];


      if(!token || token==""){
            return res.status(401).json({ message: "Access denied. No token provided." });
      }

      try {
            if(req.role === "admin") {
                  console.log("Hello");
                  next();
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user;
            next();
      } catch (error) {
            res.status(401).json({ message: "Invalid token. Please Signin" });
      }
};

module.exports = authMiddleware;
