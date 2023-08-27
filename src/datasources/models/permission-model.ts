import { Table, Column, Model } from 'sequelize-typescript';
import RolePermission from './role-permission-model';
import UserDynamicPermission from './user-dynamic-permission-model';

@Table({
  tableName: 'permissions',
  timestamps: true,
  modelName: 'permission'
})
export default class Permission extends Model {

  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true
  })
  id?: number;

  @Column({
    field: 'name'
  })
  name?: string;

  @Column({
    field: 'description'
  })
  description?: string;

  @Column({
    field: 'is_dynamic'
  })
  isDynamic?: number;

  @Column({
    field: 'created_at',
  })
  createdAt?: Date;

  @Column({
    field: 'updated_at',
  })
  updatedAt?: Date;
}

export function permissionAssociations() {
    Permission.hasMany(RolePermission);
    Permission.hasMany(UserDynamicPermission);
}
