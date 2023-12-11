import { Repository } from 'typeorm';

import { AppDataSource } from '../../database/typeorm/data-source';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

export class UserRepository {
  private readonly repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const user = this.repository.create(data);

    return this.repository.save(user);
  }

  async getByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: {
        email
      }
    });
  }

  async getById(id: number): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: {
        id
      }
    });
  }
}