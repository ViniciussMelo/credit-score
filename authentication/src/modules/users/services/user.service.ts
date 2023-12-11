import { AuthenticationService } from '../../authentication/services/authentication.service';
import { ILoginResponse } from '../interfaces/login-response.interface';
import { BcryptHash } from '../../../shared/utils/bcrypt-hash.utils';
import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../../../shared/errors/app.error';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';

export class UserService {
  private readonly authenticationService: AuthenticationService;

  private readonly userRepository: UserRepository;

  constructor() {
    this.authenticationService = new AuthenticationService();
    this.userRepository = new UserRepository();
  }

  async create({ email, name, password }: CreateUserDto): Promise<void> {
    const alreadyExistsUser = await this.userRepository.findByEmail(email);

    if (alreadyExistsUser) {
      throw new AppError('User already exists', 409);
    }

    password = await BcryptHash.hashPassword(password);

    await this.userRepository.create({
      email,
      name,
      password
    });
  }

  async login({ email, password }: LoginDto): Promise<ILoginResponse> {
    const foundUser = await this.userRepository.findByEmail(email);

    if (!foundUser) {
      throw new AppError('Unauthorized', 401);
    }

    const isSamePassword = await BcryptHash.verifyPassword(
      password,
      foundUser.password,
    );

    if (!isSamePassword) {
      throw new AppError('Unauthorized', 401);
    }

    return this.authenticationService.signIn(foundUser);
  }

  async delete(userId: number): Promise<void> {
    const foundUser = await this.userRepository.findById(userId);

    if (!foundUser) {
      throw new AppError('Unauthorized', 401)
    }

    await this.userRepository.deleteById(userId);
  }
}