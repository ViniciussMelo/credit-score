import { UserRepository } from '../repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data: CreateUserDto): Promise<void> {
    const alreadyExistsUser = await this.userRepository.getByEmail(data.email);

    if (alreadyExistsUser) return;

    await this.userRepository.create(data);
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.userRepository.getById(id);
  }
}