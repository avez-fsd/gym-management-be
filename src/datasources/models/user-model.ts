import { Table, Column, Model } from 'sequelize-typescript';
import Business from './business-model';
import Employee from './employee-model';
import Role from './role-model';
import UserDynamicPermission from './user-dynamic-permission-model';

@Table({
  tableName: 'users',
  timestamps: true,
  modelName: 'user'
})
export default class User extends Model {

  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true
  })
  id?: number;

  @Column({
    field: 'email'
  })
  email?: string;

  @Column({
    field: 'password'
  })
  password?: string;

  @Column({
    field: 'business_id'
  })
  businessId?: number;

  @Column({
    field: 'employee_id'
  })
  employeeId?: number;

  @Column({
    field: 'role_id'
  })
  roleId?: number;

  @Column({
    field: 'email_verified_at'
  })
  emailVerifiedAt?: number;

  @Column({
    field: 'created_at',
  })
  createdAt?: Date;

  @Column({
    field: 'updated_at',
  })
  updatedAt?: Date;
}

export function userAssociations() {
    User.belongsTo(Business);
    User.belongsTo(Employee);
    User.belongsTo(Role);
    User.hasMany(UserDynamicPermission);
}