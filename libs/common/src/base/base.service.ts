import { BadGatewayException, HttpStatus, HttpException, NotFoundException } from '@nestjs/common';
import { IBaseService } from '../base/IBase.service';
import { Model, Repository } from 'sequelize-typescript';
import { RpcException } from '@nestjs/microservices';

export class BaseService<T extends Model> implements IBaseService<T> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async create(entity: any): Promise<T> {
    try {
      return this.genericRepository.create(entity);
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getAll(): Promise<T[]> {
    try {
      return this.genericRepository.findAll();
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async get(id: number): Promise<T> {
    const movie = await this.genericRepository.findOne({
      where: {
        id,
      },
    });

    if (!movie) {
      throw new RpcException(`No movie found with id ${id}`);
    }

    return movie;
  }

  async delete(id: number) {
    try {
      await this.genericRepository.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
