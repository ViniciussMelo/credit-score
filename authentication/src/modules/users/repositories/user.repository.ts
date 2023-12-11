import { Repository } from 'typeorm';

import { AppDataSource } from '../../database/typeorm/data-source';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity, UserRole } from '../entities/user.entity';

export class UserRepository {
  private repository: Repository<UserEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(UserEntity);
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const user = this.repository.create({ ...data, role: UserRole.customer });

    const response = await this.repository.save(user);

    return response;
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: {
        email
      }
    });
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.repository.findOne({
      where: {
        id
      }
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}