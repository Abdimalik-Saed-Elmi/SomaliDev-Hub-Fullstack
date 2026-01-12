import { Request, Response, NextFunction } from "express";

export const isAdmin = (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction
) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};
