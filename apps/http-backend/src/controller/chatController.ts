import { AuthenticatedRequest } from "../middleware/authMiddleware";
import { Response } from "express";
export default function chat(req: AuthenticatedRequest, res: Response) {
if (!req.user) {
  return res.status(401).json({ error: "User not authenticated" });
}

console.log("User making chat request:", req.user); // Now safe!

try {
  res.status(200).json({ message: "Chat endpoint reached", user: req.user });
} catch (error) {
  console.error("Error occurred in chat controller:", error);
  res.status(500).json({ error: "Internal server error" });
}
}