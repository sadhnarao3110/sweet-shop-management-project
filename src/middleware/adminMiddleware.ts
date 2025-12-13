const checkAdminRole = (req: any, res: any, next: any) => {
  if (!req.currentUser || req.currentUser.role !== "ADMIN") {
    return res.status(403).json({ error: "Admin access only" });
  }

  next();
};

module.exports = checkAdminRole;

export {};
