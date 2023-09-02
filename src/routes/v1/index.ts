import AuthController from '@controllers/auth.controller';
import express from 'express';

const router = express.Router({ mergeParams: true });

router.post("/auth/signup", AuthController.signUp);
router.post("/auth/signin", AuthController.signIn);
router.get("/auth/verify/email", AuthController.verifyEmail);
router.post("/auth/verify-email/send", AuthController.resendEmailVerification);

export default router;