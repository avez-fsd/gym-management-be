import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import User, { userAssociations } from './user-model';
import Business, { businessAssociations } from './business-model';
import Employee, { employeeAssociations } from './employee-model';
import Customer, { customerAssociations } from './customer-model';
import Role, { roleAssociations } from './role-model';
import RolePermission, { rolePermissionAssociations } from './role-permission-model';
import UserDynamicPermission, { userDynamicAssociations } from './user-dynamic-permission-model';
import Permission, { permissionAssociations } from './permission-model';

const dbConnectionOptions: SequelizeOptions = {
  dialect: 'mysql',
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT || 3306) as number,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: process.env.NODE_ENV === 'local' ? console.log : false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: process.env.NODE_ENV === 'production' ? true : false,
    }
  },
  models: [__dirname + `/*-model.ts`] ,
};

const dbConnection = new Sequelize(dbConnectionOptions);
dbConnection.addModels(
  [
    User,
    Business,
    Employee,
    Customer,
    Role,
    RolePermission,
    UserDynamicPermission,
    Permission
  ]
);


// dbConnection.sync({force:true})

userAssociations();
businessAssociations();
employeeAssociations();
customerAssociations();
roleAssociations();
permissionAssociations();
userDynamicAssociations();
rolePermissionAssociations();


export default dbConnection;
