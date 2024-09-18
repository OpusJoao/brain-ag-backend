import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRuralProducer1726624709757 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criação da tabela rural_producers
    await queryRunner.createTable(
      new Table({
        name: 'rural_producers',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'document',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'farm_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'city',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'state',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'total_area',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'agricultural_area',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'vegetation_area',
            type: 'float',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Criação da chave estrangeira para planted_crops
    await queryRunner.createForeignKey(
      'rural_producers',
      new TableForeignKey({
        columnNames: ['id'],
        referencedTableName: 'planted_crops',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('rural_producers');
  }
}
