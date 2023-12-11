import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm"

export class DebtEntity1702306664168 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'debts',
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
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'price',
                        type: 'decimal',
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
                ]
            })
        );


        await queryRunner.createIndex(
            'debts',
            new TableIndex({
                name: 'debts_user_id_idx',
                columnNames: ['user_id']
            })
        );

        await queryRunner.createForeignKey(
            'debts',
            new TableForeignKey({
                name: 'debts_user_id_fk',
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('debts', 'debts_user_id_idx');
        await queryRunner.dropForeignKey('debts', 'debts_user_id_fk');
        await queryRunner.dropTable('debts');
    }

}
