import { createBusiness } from "@datasources/business.datasource";
import dbConnection from "@datasources/models/connection";
import User from "@datasources/models/user-model";
import { getRoleNameById } from "@datasources/role.datasource";
import { createUser, getUserByEmail } from "@datasources/user.datasource";
import UnauthorizedException from "@exceptions/unauthorized.exception";
import jwtHelper from "@helpers/jwt.helper";
import { BusinessSignInRequest, BusinessSignUpRequest } from "@interfaces/auth.interface";
import bcrypt from 'bcryptjs'
import { Sequelize } from "sequelize";
import CommunicationService from "./communication.service";

class AuthService {

    async signUp(signUpData: BusinessSignUpRequest){

        const transaction = await dbConnection.transaction();

        try {

            const business = await createBusiness(signUpData, transaction);
            const user = await createUser(signUpData, transaction, business);

            await transaction.commit();

            const commService = new CommunicationService();

            const subject = `Welcome to Gym Management Software ${business.name}`
            const body = `Please click this link to verify your email: https://www.google.com/`

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

}

export default AuthService;