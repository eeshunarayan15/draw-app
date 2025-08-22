import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

console.log("JWT_KEY at verify:", process.env.JWT_SECRET);

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"] as string;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const secret = process.env.JWT_SECRET; // now type is string

    const decoded = jwt.verify(token, secret);

    // const user = await userModel
    //     .findOne({ email: decoded.email })
    //     .select("-password");
    //
    // if (!user) {
    //     return res.status(404).json({ error: "User not found" });
    // }
    //
    // req.user = user;
    next();
  } catch (err) {
    // console.error("JWT verification failed:", err.message);
    // return res.status(401).json({ error: "Invalid or expired token" });
  }
};
