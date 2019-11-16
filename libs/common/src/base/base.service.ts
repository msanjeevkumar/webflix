import { BadGatewayException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IBaseService } from '../base/IBase.service';
import { BaseEntity } from './base.entity';

export class BaseService<T extends BaseEntity> implements IBaseService<T> {
  constructor(private readonly genericRepository: Repository<T>) {}

  async create(entity: any): Promise<T> {
    try {
      return this.genericRepository.save(entity);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async getAll(): Promise<T[]> {
    try {
      return this.genericRepository.find();
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async get(id: number): Promise<T> {
    try {
      return this.genericRepository.findOne(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }

  async delete(id: number) {
    try {
      await this.genericRepository.delete(id);
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
}
