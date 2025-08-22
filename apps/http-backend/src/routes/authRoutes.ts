import express, { Router } from 'express';

import {LoginUser, register} from "../controller/authController";

const router: Router = express.Router();

router.post('/auth/login', LoginUser);

router.post('/auth/register', register);

export default router;
