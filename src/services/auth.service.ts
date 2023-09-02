import { createBusiness } from "@datasources/business.datasource";
import dbConnection from "@datasources/models/connection";
import User from "@datasources/models/user-model";
import { getRoleNameById } from "@datasources/role.datasource";
import { createUser, getUserByEmail, updateEmailVerification } from "@datasources/user.datasource";
import UnauthorizedException from "@exceptions/unauthorized.exception";
import jwtHelper from "@helpers/jwt.helper";
import { BusinessSignInRequest, BusinessSignUpRequest } from "@interfaces/auth.interface";
import bcrypt from 'bcryptjs'
import { Sequelize } from "sequelize";
import CommunicationService from "./communication.service";
import { generateToken } from "@helpers/crypto.helper";
import { RedisHelper } from "@helpers/redis.helper";
import NotFoundException from "@exceptions/not-found.exception";
import InvalidRequestException from "@exceptions/invalid-request.exception";
import AccessDeniedException from "@exceptions/access-denied.exception";

class AuthService {

    async signUp(signUpData: BusinessSignUpRequest){

        const transaction = await dbConnection.transaction();

        try {

            const business = await createBusiness(signUpData, transaction);
            const user = await createUser(signUpData, transaction, business);

            await transaction.commit();

            const token = await generateToken(32);

            RedisHelper.getInstance().set(token as string, user.email, 60 * 60 * 24);

            const commService = new CommunicationService();

            const subject = `Welcome to Gym Management Software ${business.name}`
            const body = `Please click this link to verify your email: ${process.env.BACKEND_URL}/v1/auth/verify/email?token=${token}`

            commService.sendMail(user.email as string, subject, body);
            

        } catch (err) {
            await transaction.rollback();
            throw err;
        }
        
    }

    async signIn(signInData: BusinessSignInRequest, user?: User){

        if(!user) user = await getUserByEmail(signInData.email) as User;

        const isPasswordValid = await bcrypt.compare(signInData.password.toString(), user.password as string);

        if(!isPasswordValid) throw new UnauthorizedException("Invalid Email Or Password!");
        
        const payload = {
            id: user.id,
            role: await getRoleNameById(user.roleId as number)
        };
        
        return jwtHelper.generateToken(payload);
    }

    async verifyEmail(token: string){

        const email = await RedisHelper.getInstance().get(token,(err, data)=>{
            if(err) return null;
            return data;
        });
        
        if(!email) throw new InvalidRequestException("Invalid Token.");
        
        const user = await getUserByEmail(email);

        if(user?.emailVerifiedAt) throw new AccessDeniedException("Email Already Verifed.");

        const emailVerifcation = await updateEmailVerification(email);

        if(emailVerifcation) return RedisHelper.getInstance().remove(token);
        
        throw new AccessDeniedException("Email verification failed.");

    }

}

export default AuthService;