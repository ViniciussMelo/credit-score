import { DebtRepository } from '../repositories/debt.repository';
import { UserService } from '../../user/services/user.service';
import { AppError } from '../../../shared/errors/app.error';
import { CreateDebtDto } from '../dtos/create-debt.dto';
import { UpdateDebtDto } from '../dtos/update-debt.dto';
import { DebtEntity } from '../entities/debt.entity';

export class DebtService {
  private readonly debtRepository: DebtRepository;
  private readonly userService: UserService;

  constructor() {
    this.debtRepository = new DebtRepository();
    this.userService = new UserService();
  }

  async create(data: CreateDebtDto): Promise<void> {
    const user = await this.userService.findById(data.userId);

    if (!user) {
      throw new AppError('User does not exists', 400);
    }

    if (data.price <= 0) {
      throw new AppError('Invalid price', 400);
    }

    await this.debtRepository.create(data);
  }

  async getByUserId(userId: number): Promise<DebtEntity[]> {
    return this.debtRepository.getByUserId(userId);
  }

  async update(id: number, data: UpdateDebtDto) {
    const debt = await this.debtRepository.getById(id);

    if (!debt) {
      throw new AppError('Not found', 404);
    }

    await this.debtRepository.update(id, data);
  }

  async deleteById(id: number): Promise<void> {
    const debt = await this.debtRepository.getById(id);

    if (!debt) {
      throw new AppError('Not found', 404);
    }

    await this.debtRepository.delete(id);
  }
}