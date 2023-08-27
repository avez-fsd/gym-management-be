import { BusinessSignUpRequest } from "@interfaces/auth.interface";
import Business from "./models/business-model";
import { Transaction } from "sequelize";


export const createBusiness = (signUpData: BusinessSignUpRequest, transaction: Transaction) => {
    return Business.create({
        name: signUpData.name,
        email: signUpData.email,
        phoneNumber: signUpData.phoneNumber,
        state: signUpData.state,
        address: signUpData.address,
        pincode: signUpData.pincode,
        country: signUpData.country
    }, {transaction})
}