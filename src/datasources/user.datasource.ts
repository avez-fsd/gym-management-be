import { BusinessSignUpRequest } from "@interfaces/auth.interface";
import User from "./models/user-model";
import bcrypt from 'bcryptjs'
import Business from "./models/business-model";
import Employee from "./models/employee-model";
import { getRoleIdByName } from "./role.datasource";
import { ROLES } from "@constants";
import { Transaction } from "sequelize";
import { getCurrentDateTime } from "@helpers/common.helper";


export const getUserByEmail = (email:string) => {
    return User.findOne({
        where: {
            email
        }
    });
}

export const createUser = async (signUpData: BusinessSignUpRequest, transaction: Transaction, business?: Business, employee?: Employee) => {
    const hashedPassword = await bcrypt.hash(signUpData.password, 8);
    return User.create({
        name: signUpData.name,
        email: signUpData.email,
        password: hashedPassword,
        ...(business) && {businessId: business.id},
        ...(employee) && {employeeId: employee.id},
        roleId: await getRoleIdByName(ROLES.ADMIN),
        emailVerifiedAt: getCurrentDateTime()
    }, {transaction})
}