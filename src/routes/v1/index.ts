import AuthController from '@controllers/auth.controller';
import express from 'express';

const router = express.Router({ mergeParams: true });

router.post("/auth/signup", AuthController.signUp);
router.post("/auth/signin", AuthController.signIn);

export default router;