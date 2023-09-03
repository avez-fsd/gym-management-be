import { Table, Column, Model } from 'sequelize-typescript';
import Role from './role-model';
import Permission from './permission-model';

@Table({
  tableName: 'role_permissions',
  timestamps: true,
  modelName: 'rolePermission'
})

//static permission

export default class RolePermission extends Model {

  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true
  })
  id?: number;

  @Column({
    field: 'role_id'
  })
  roleId?: number;

  @Column({
    field: 'permission_id'
  })
  permissionId?: number;

  @Column({
    field: 'created_at',
  })
  createdAt?: Date;

  @Column({
    field: 'updated_at',
  })
  updatedAt?: Date;

  permission?:Permission
}

export function rolePermissionAssociations() {
    RolePermission.belongsTo(Role);
    RolePermission.belongsTo(Permission);
}