import { Repository } from 'typeorm';

import { AppDataSource } from '../../database/typeorm/data-source';
import { CreateDebtDto } from '../dtos/create-debt.dto';
import { UpdateDebtDto } from '../dtos/update-debt.dto';
import { DebtEntity } from '../entities/debt.entity';

export class DebtRepository {
  private readonly repository: Repository<DebtEntity>;

  constructor() {
    this.repository = AppDataSource.getRepository(DebtEntity);
  }

  async create(data: CreateDebtDto): Promise<DebtEntity> {
    const debt = this.repository.create(data);

    return this.repository.save(debt);
  }

  async getByUserId(userId: number): Promise<DebtEntity[]> {
    return this.repository.find({
      where: {
        userId,
      }
    });
  }

  async getById(id: number): Promise<DebtEntity | null> {
    return this.repository.findOne({
      where: {
        id,
      }
    });
  }

  async update(id: number, data: UpdateDebtDto): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    await this.repository.softDelete(id);
  }
}