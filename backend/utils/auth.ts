import { Request, Response, NextFunction } from "express";
import User, { IUser } from "../models/User"; // how we defend user in mongoose schema

// middleware is reusable logic between routes
// protect routes. only allow authenticated users to access them
// typical middleware param format in express

// next is next middleware function or route handler. needed for next steps to execute
export async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenHeader = req.headers.authorization;
    const token = Array.isArray(tokenHeader) ? tokenHeader[0] : tokenHeader;
    // tokens: server auth checking w/o password

    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const user: IUser | null = await User.findById(token);
    if (!user) return res.status(401).json({ error: "Unauthorized" });

    req.user = user; // ts typing for custom models
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
}
