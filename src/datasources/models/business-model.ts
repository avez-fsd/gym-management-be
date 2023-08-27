import { Table, Column, Model } from 'sequelize-typescript';
import User from './user-model';
import Employee from './employee-model';
import Customer from './customer-model';

@Table({
  tableName: 'businesses',
  timestamps: true,
  modelName: 'business'
})
export default class Business extends Model {

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
    field: 'email'
  })
  email?: string;

  @Column({
    field: 'phone_number'
  })
  phoneNumber?: string;

  @Column({
    field: 'pincode'
  })
  pincode?: string;

  @Column({
    field: 'address'
  })
  address?: string;

  @Column({
    field: 'state'
  })
  state?: string;

  @Column({
    field: 'country'
  })
  country?: string;

  @Column({
    field: 'subscription_end_date'
  })
  subscriptionEndDate?: Date;

  @Column({
    field: 'created_at',
  })
  createdAt?: Date;

  @Column({
    field: 'updated_at',
  })
  updatedAt?: Date;
}

export function businessAssociations() {
    Business.hasOne(User);
    Business.hasMany(Employee);
    Business.hasMany(Customer);
}