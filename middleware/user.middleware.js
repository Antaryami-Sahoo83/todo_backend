import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
      const authHeader = req.headers["authorization"];
      const token = authHeader && authHeader.split(" ")[1];

      if (!token) {
            return res
                  .status(401)
                  .json({ message: "Access denied. No token provided." });
      }

      try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded.user; // Set req.user to decoded user data
            next();
      } catch (error) {
            res.status(401).json({ message: "Invalid token." }); // Use 401 for unauthorized
      }
};

export default authMiddleware;
