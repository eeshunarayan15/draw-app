import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '@repo/backend-common';

const router: Router = express.Router();

router.post('/auth/login', async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    res.json({ message: 'Login endpoint working', username });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

router.post('/auth/register', async (req: Request, res: Response) => {
  try {
    const { username, password, email, fullname, mobileNumber } = req.body;
    res.json({ message: 'Register endpoint working', username, email });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

export default router;
