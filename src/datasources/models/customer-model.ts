import { Table, Column, Model } from 'sequelize-typescript';
import Business from './business-model';

@Table({
  tableName: 'customers',
  timestamps: true,
  modelName: 'customer'
})
export default class Customer extends Model {

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

export function customerAssociations() {
    Customer.belongsTo(Business);
}