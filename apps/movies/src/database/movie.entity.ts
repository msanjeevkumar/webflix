import { Column, Model, CreatedAt, UpdatedAt, DataType, Table } from 'sequelize-typescript';

@Table
export class Movie extends Model<Movie> {
  @Column
  name: string;

  @Column
  description: string;

  @Column
  releaseDate: Date;

  @Column
  durationInMins: number;

  @Column({ type: DataType.JSON })
  genres: number[];

  @Column({ type: DataType.FLOAT(1, 1) })
  rating: number;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}
