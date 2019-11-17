import { Column, Model, CreatedAt, UpdatedAt, DataType, Table } from 'sequelize-typescript';

@Table
export class Genre extends Model<Genre> {
  @Column
  name: string;

  @Column
  description: string;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
