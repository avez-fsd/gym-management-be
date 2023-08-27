import { Table, Column, Model } from 'sequelize-typescript';
import User from './user-model';

@Table({
  tableName: 'roles',
  timestamps: true,
  modelName: 'role'
})
export default class Role extends Model {

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
    field: 'created_at',
  })
  createdAt?: Date;

  @Column({
    field: 'updated_at',
  })
  updatedAt?: Date;

}

export function roleAssociations() {
    Role.hasOne(User);
}