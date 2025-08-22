import express, {NextFunction, Request, Response} from "express";
import { JWT_SECRET, PORT } from "@repo/backend-common";
import jwt from 'jsonwebtoken';
import cors from 'cors';

import bcrypt from 'bcrypt';
const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from "./routes/authRoutes";

app.use('/api/v1', authRoutes);
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    message: "Welcome to Backend API"
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
