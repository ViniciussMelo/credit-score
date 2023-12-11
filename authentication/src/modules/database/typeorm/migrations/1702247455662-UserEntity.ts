import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { UserRole } from '../../../users/entities/user.entity';

export class UserEntity1702247455662 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'role',
            type: 'enum',
            enum: Object.values(UserRole)
          },
          {
            name: 'created_at',
            type: 'TIMESTAMP',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'TIMESTAMP',
            isNullable: true,
            onUpdate: 'now()',
          },
          {
            name: 'deleted_at',
            type: 'TIMESTAMP',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
