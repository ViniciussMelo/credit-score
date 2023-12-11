import { Repository, getRepository } from 'typeorm';

import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export class UserRepository {
  private readonly repository: Repository<UserEntity>;

  constructor() {
    this.repository = getRepository(UserEntity);
  }

  async create(data: CreateUserDto): Promise<UserEntity> {
    const user = this.repository.create(data);

    const response = await this.repository.save(user);

    return response;
  }

  async findByEmailAndPassword(email: string, password: string) {
    return this.repository.findOne({
      where: {
        email,
        password,
      }
    });
  }

  async findByEmail(email: string): Promise<UserEntity | undefined> {
    return this.repository.findOne({
      where: {
        email
      }
    });
  }

  async findById(id: number): Promise<UserEntity | undefined> {
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