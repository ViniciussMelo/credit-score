import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm"

import { AssetType } from '../../../assets/entities/asset.entity';

export class AssetEntity1702306648758 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'assets',
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
                        name: 'quantity',
                        type: 'int',
                    },
                    {
                        name: 'type',
                        type: 'enum',
                        enum: Object.values(AssetType)
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
            'assets',
            new TableIndex({
                name: 'assets_user_id_idx',
                columnNames: ['user_id']
            })
        );

        await queryRunner.createForeignKey(
            'assets',
            new TableForeignKey({
                name: 'assets_user_id_fk',
                columnNames: ['user_id'],
                referencedTableName: 'users',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE'
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('assets', 'assets_user_id_idx');
        await queryRunner.dropForeignKey('assets', 'assets_user_id_fk');
        await queryRunner.dropTable('assets');
    }

}
