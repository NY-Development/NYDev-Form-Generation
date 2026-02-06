export const requireRole = (roles = []) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (roles.length && !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Forbidden" });
  }

  return next();
};
