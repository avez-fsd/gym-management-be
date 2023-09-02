import { Request, Response } from "express";
import response from '@helpers/response.helper'
import { validateRequest } from "@helpers/validation.helper";
import { BusinessSignInSchema, BusinessSignUpSchema, ResendEmailVerificationSchema, VerifyEmailSchema } from "@requests/auth.schema";
import AuthService from "@services/auth.service";
import { BusinessSignInRequest, BusinessSignUpRequest } from "@interfaces/auth.interface";
import InvalidRequestException from "@exceptions/invalid-request.exception";
import logger from "@helpers/logger.helper";
import NotFoundException from "@exceptions/not-found.exception";
import { getUserByEmail } from "@datasources/user.datasource";
import AccessDeniedException from "@exceptions/access-denied.exception";
import UnauthorizedException from "@exceptions/unauthorized.exception";
class AuthController {

    async signUp(req: Request, res: Response){
        try {
            validateRequest(BusinessSignUpSchema, req.body, req);

            const user = await getUserByEmail(req.body.email);
            if(user) throw new InvalidRequestException("User Already Exist!");

            const authService = new AuthService();
            await authService.signUp(req.body as BusinessSignUpRequest)

            return response.success(req, res);
            
        } catch (err:any) {
            logger.error(err.message, err);
            return response.failed(req, res, err.message, null, err.httpCode);
        }
    }

    async signIn(req: Request, res: Response){
        try {
            validateRequest(BusinessSignInSchema, req.body, req);
            
            const user = await getUserByEmail(req.body.email);
            if(!user) throw new UnauthorizedException("Invalid email or password");

            if(!user.emailVerifiedAt) throw new AccessDeniedException("Email not verified");

            const authService = new AuthService();
            const token = await authService.signIn(req.body as BusinessSignInRequest, user);
            
            return response.success(req, res, {token});
            
        } catch (err:any) {
            return response.failed(req, res, err.message, null, err.httpCode);
        }
    }

    async verifyEmail(req: Request, res: Response){
        try {
            validateRequest(VerifyEmailSchema, req.query, req);

            const authService = new AuthService();
            await authService.verifyEmail(req.query.token as string);

            return response.success(req, res);
            
        } catch (err:any) {
            return response.failed(req, res, err.message, null, err.httpCode);
        }
    }

    async resendEmailVerification(req: Request, res: Response){
        try {
            validateRequest(ResendEmailVerificationSchema, req.body, req);

            const user = await getUserByEmail(req.body.email);

            if(!user) throw new NotFoundException("User not found");

            if(user.emailVerifiedAt) throw new AccessDeniedException("Email already verified!");

            const authService = new AuthService();
            await authService.resendEmailVerification(user);

            return response.success(req, res);
            
        } catch (err:any) {
            return response.failed(req, res, err.message, null, err.httpCode);
        }
    }
}

export default new AuthController();