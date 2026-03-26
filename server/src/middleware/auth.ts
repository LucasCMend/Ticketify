import type { Request, Response, NextFunction } from "express";

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  if (req.session.userId) {
    return next(); // Pode passar
  }
  return res
    .status(401)
    .json({ message: "Você precisa fazer login primeiro." });
}
