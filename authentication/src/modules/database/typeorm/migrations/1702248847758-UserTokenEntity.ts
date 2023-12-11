import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class UserTokenEntity1702248847758 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_tokens',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'int',
          },
          {
            name: 'refresh_token',
            type: 'varchar',
          },
          {
            name: 'expires_date',
            type: 'TIMESTAMP',
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'user_tokens',
      new TableIndex({
        name: 'user_tokens_user_id_idx',
        columnNames: ['user_id']
      })
    );

    await queryRunner.createForeignKey(
      'user_tokens',
      new TableForeignKey({
        name: 'user_tokens_user_id_fk',
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('user_tokens', 'user_tokens_user_id_idx');
    await queryRunner.dropForeignKey('user_tokens', 'user_tokens_user_id_fk');
    await queryRunner.dropTable('user_tokens');
  }

}
