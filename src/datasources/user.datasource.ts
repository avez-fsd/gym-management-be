import { BusinessSignUpRequest } from "@interfaces/auth.interface";
import User from "./models/user-model";
import bcrypt from 'bcryptjs'
import Business from "./models/business-model";
import Employee from "./models/employee-model";
import { getRoleIdByName } from "./role.datasource";
import { ROLES } from "@constants";
import { Transaction } from "sequelize";
import { getCurrentDateTime } from "@helpers/common.helper";
import { RedisHelper } from "@helpers/redis.helper";


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
        roleId: await getRoleIdByName(ROLES.ADMIN)
    }, {transaction})
}

export const updateEmailVerification = async (email:string) => {
    return User.update({
        emailVerifiedAt: getCurrentDateTime()
    }, {
        where: {
            email
        }
    })
}

const getUserFromRedis = (id:number) => {
    return RedisHelper.getInstance().get(`USER_${id}`,(err, data)=>{
        if(err) return null;
        return data;
    });
}

const setUserInRedis = (user:User, ttl:number) => {
    return RedisHelper.getInstance().set(`USER_${user.id}`, JSON.stringify(user), ttl);
}

export const getUserById = async (id:number) => {
    let user:any = await getUserFromRedis(id);
    if(user) return JSON.parse(user) as User;

    user = await User.findByPk(id);
    setUserInRedis(user.get(), 30 * 60);

    return user.get() as User;
}