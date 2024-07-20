

const roleAuthorization = (allowedRoles) => {
      return (req, res, next) => {
            if (!req.user.role || !allowedRoles.includes(req.user.role)){
                  return res
                        .status(403)
                        .json({ message: "Access denied. You do not have the required role." });
            }
            next();
      };
};

export default roleAuthorization;

