import express, { Router } from "express";
import authMiddleware from "../middleware/authMiddleware";
import chat from "../controller/chatController";

 const router: Router = express.Router();

router.post('/chat', authMiddleware, chat);
export default router;