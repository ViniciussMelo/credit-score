import { AuthenticationService } from '../../authentication/services/authentication.service';
import { ILoginResponse } from '../interfaces/login-response.interface';
import { BcryptHash } from '../../../shared/utils/bcrypt-hash.utils';
import { UserRepository } from '../repositories/user.repository';
import { AppError } from '../../../shared/errors/app.error';
import { UserUtil } from '../../../shared/utils/user.util';
import { CreateUserDto } from '../dtos/create-user.dto';
import { LoginDto } from '../dtos/login.dto';

export class UserService {
  private readonly authenticationService: AuthenticationService;

  private readonly userRepository: UserRepository;

  constructor(userRepository = new UserRepository()) {
    this.authenticationService = new AuthenticationService();
    this.userRepository = userRepository;
  }

  async create({ email, name, password, role }: CreateUserDto): Promise<void> {
    const alreadyExistsUser = await this.userRepository.findByEmail(email);

    if (alreadyExistsUser) {
      throw new AppError('User already exists', 409);
    }

    password = await BcryptHash.hashPassword(password);

    await this.userRepository.create({
      email,
      name,
      password,
      role
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

    return this.authenticationService.signIn({ ...foundUser, isAdmin: UserUtil.isAdmin(foundUser.role) });
  }

  async delete(userId: number): Promise<void> {
    const foundUser = await this.userRepository.findById(userId);

    if (!foundUser) {
      throw new AppError('Unauthorized', 401);
    }

    await this.userRepository.deleteById(userId);
  }
}