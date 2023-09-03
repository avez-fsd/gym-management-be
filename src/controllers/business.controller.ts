import { Request, Response } from "express";
import response from '@helpers/response.helper'
import { validateRequest } from "@helpers/validation.helper";
import { BusinessSignInSchema, BusinessSignUpSchema, ResendEmailVerificationSchema, VerifyEmailSchema } from "@requests/auth.schema";
import logger from "@helpers/logger.helper";
class BusinessController {

    async signUp(req: Request, res: Response){
        try {

            validateRequest(BusinessSignUpSchema, req.body, req);

            return response.success(req, res);
            
        } catch (err:any) {
            logger.error(err.message, err);
            return response.failed(req, res, err.message, null, err.httpCode);
        }
    }

}

export default new BusinessController();