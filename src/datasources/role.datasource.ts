import { RedisHelper } from "@helpers/redis.helper"
import Role from "./models/role-model"


const setRolesInReds = (roles: Role[], ttl:number) => {
    return RedisHelper.getInstance().set(`ROLES`, JSON.stringify(roles), ttl);
}

const getRolesFromRedis = () => {
    return RedisHelper.getInstance().get(`ROLES`,(err, data)=>{
        if(err) return null;
        return data;
    });
}

const getRolesFromDb = () => {
    return Role.findAll();
}

const getRoles = async () => {
    let roles = await getRolesFromRedis();
    if(roles) return JSON.parse(roles) as unknown as Role[];
    const rolesDb = await getRolesFromDb();
    setRolesInReds(rolesDb, 60 * 60 * 24);
    return rolesDb;
}

export const getRoleIdByName = async (roleName:string) => {
    let roles = await getRoles();
    return roles.find((role: Role) => role.name === roleName)?.id
}

export const getRoleNameById = async (roleId:number) => {
    let roles = await getRoles();
    return roles.find((role: Role) => role.id === roleId)?.name
}