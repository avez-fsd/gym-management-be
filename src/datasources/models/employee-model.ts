import { Table, Column, Model } from 'sequelize-typescript';
import User from './user-model';
import Business from './business-model';

@Table({
  tableName: 'employees',
  timestamps: true,
  modelName: 'employee'
})
export default class Employee extends Model {

  @Column({
    field: 'id',
    primaryKey: true,
    autoIncrement: true
  })
  id?: number;

  @Column({
    field: 'business_id'
  })
  businessId?: number;

  @Column({
    field: 'name'
  })
  name?: string;

  @Column({
    field: 'email'
  })
  email?: string;

  @Column({
    field: 'phone_number'
  })
  phoneNumber?: string;

  @Column({
    field: 'created_at',
  })
  createdAt?: Date;

  @Column({
    field: 'updated_at',
  })
  updatedAt?: Date;
}

export function employeeAssociations() {
    Employee.hasOne(User);
    Employee.belongsTo(Business);
}