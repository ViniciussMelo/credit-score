import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repositories/user.repository';

export class UserService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async create(data: CreateUserDto) {
    const alreadyExistsUser = await this.userRepository.getByEmail(data.email);

    if (alreadyExistsUser) return;

    await this.userRepository.create(data);
  }
}