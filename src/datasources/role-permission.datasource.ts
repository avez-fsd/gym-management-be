import { RedisHelper } from "@helpers/redis.helper";
import User from "./models/user-model";
import RolePermission from "./models/role-permission-model";
import Permission from "./models/permission-model";
import UserDynamicPermission from "./models/user-dynamic-permission-model";


const setRolePermissionInReds = (rolePermissions: RolePermission[], roleId:number, ttl:number) => {
    return RedisHelper.getInstance().set(`ROLE_PERMISSIONS_${roleId}`, JSON.stringify(rolePermissions), ttl);
}

const getRolePermissionsFromRedis = (roleId:number) => {
    return RedisHelper.getInstance().get(`ROLE_PERMISSIONS_${roleId}`,(err, data)=>{
        if(err) return null;
        return data;
    });
}

const getRolePermissionsFromDb = (roleId:number) => {
    return RolePermission.findAll({
        include: [
            {
                model: Permission,
                attributes: ['name']
            }
        ],
        where: {
            roleId
        },
        attributes:[]
    });
}

const getStaticRolePermissions = async (roleId:number) => {
    let roles = await getRolePermissionsFromRedis(roleId);
    if(roles) return JSON.parse(roles) as unknown as RolePermission[];
    const rolesPermissionsDb = await getRolePermissionsFromDb(roleId);
    setRolePermissionInReds(rolesPermissionsDb, roleId, 60 * 60 * 24);
    return rolesPermissionsDb;
}

const getUserDynamicPermissionsFromRedis = async (userId:number) => {
    return RedisHelper.getInstance().get(`USER_PERMISSIONS_${userId}`,(err, data)=>{
        if(err) return null;
        return data;
    });
}

const getUserDynamicPermissionsFromDb = (userId:number) => {
    return UserDynamicPermission.findAll({
        include: [
            {
                model: Permission,
                attributes: ['name']
            }
        ],
        where: {
            userId
        },
        attributes:[]
    });
}


const setUserDynamicPermissionInReds = (userPermissions: UserDynamicPermission[], userId:number, ttl:number) => {
    return RedisHelper.getInstance().set(`USER_PERMISSIONS_${userId}`, JSON.stringify(userPermissions), ttl);
}

const getUserDynamicPermissions = async (userId:number) => {
    let roles = await getUserDynamicPermissionsFromRedis(userId);
    if(roles) return JSON.parse(roles) as unknown as RolePermission[];
    const userDynamicPermissionsDb = await getUserDynamicPermissionsFromDb(userId);
    setUserDynamicPermissionInReds(userDynamicPermissionsDb, userId, 60 * 60 * 24);
    return userDynamicPermissionsDb;
}

export const getAllPermissionsForUser = async (user: User) => {
    let staticRolePermissions: any[] = await getStaticRolePermissions(user.roleId as number);
    staticRolePermissions = staticRolePermissions.map(e=> e.permission?.name)
    let dynamicPermissions: any[] = await getUserDynamicPermissions(user.id as number);
    dynamicPermissions = dynamicPermissions.map(e=> e.permission?.name)
    return [...staticRolePermissions, ...dynamicPermissions];
}
