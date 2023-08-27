import { Table, Column, Model } from 'sequelize-typescript';
import User from './user-model';
import Permission from './permission-model';

@Table({
  tableName: 'user_dynamic_permissions',
  timestamps: true,
  modelName: 'userDynamicPermission'
})
export default class UserDynamicPermission extends Model {

  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true
  })
  id?: number;

  @Column({
    field: 'user_id'
  })
  userId?: number;

  @Column({
    field: 'permission_id'
  })
  permissionId?: number;

  @Column({
    field: 'is_active'
  })
  isActive?: number;

  @Column({
    field: 'created_at',
  })
  createdAt?: Date;

  @Column({
    field: 'updated_at',
  })
  updatedAt?: Date;
}

export function userDynamicAssociations() {
    UserDynamicPermission.belongsTo(User);
    UserDynamicPermission.belongsTo(Permission)
}