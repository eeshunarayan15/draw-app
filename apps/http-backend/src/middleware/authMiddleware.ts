import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import {prismaClient} from "@repo/db";
import {JWT_SECRET} from "@repo/backend-common";
 export interface JWTPayload {
  email:string;
  name:string;
  mobileNumber:string;
  iat?:number;
  exp?:number;
  sub?:string;
  iss:string;
  aud?:string

} export interface User {
  id: string;
  email: string;
  name: string;
  mobileNumber: string;
  photo?: string;
}
 export interface AuthenticatedRequest extends Request {
  user?: User;
}
console.log("JWT_SECRET at middleware:", JWT_SECRET);

export default async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"] as string;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    throw new Error("Token is missing");
  }

  try {
    // const payload = {
    //   email: user.email,
    //   name: user.name,
    //   mobileNumber: user.mobileNumber,
    // };
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const userId = decoded.sub;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await prismaClient.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        mobileNumber: true,
        photo: true,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (user.email !== decoded.email) {
      return res.status(401).json({ message: "Token email mismatch" });
    }
    req.user = user;
    return next();
  } catch (err: any) {
    console.error("JWT verification failed:", err);

    // Check what KIND of error happened
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({
        error: "Your login session has expired. Please log in again.",
      });
    }

    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({
        error: "Invalid login token. Please log in again.",
      });
    }

    if (err.name === "NotBeforeError") {
      return res.status(401).json({
        error: "Token is not active yet.",
      });
    }

    // For any other unknown errors
    return res.status(401).json({
      error: "Authentication failed. Please try again.",
    });
  }
};
