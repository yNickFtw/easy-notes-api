import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export function checkIfIsAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers["authorization"];

    if (!token) return res.status(401).json({ message: "Token not found" });

    const tokenSplited = token.split("Bearer ");

    const decoded = jwt.verify(tokenSplited[1], JWT_SECRET);

    if (!decoded) return res.status(401).json({ message: "Invalid token" });

    next();
  } catch (error: any) {
    return res.status(401).json({ message: error.message });
  }
}
