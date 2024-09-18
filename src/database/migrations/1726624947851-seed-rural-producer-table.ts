import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRuralProducerTable1726624947851 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          INSERT INTO rural_producers (document, name, farm_name, city, state, total_area, agricultural_area, vegetation_area, created_at, updated_at)
          VALUES
            ('12345678900', 'John Doe', 'Doe Farm', 'Springfield', 'IL', 150.5, 120.3, 30.2, NOW(), NOW()),
            ('09876543211', 'Jane Smith', 'Smith Farm', 'Shelbyville', 'IL', 200.0, 180.0, 20.0, NOW(), NOW());
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
          DELETE FROM rural_producers
          WHERE document IN ('12345678900', '09876543211');
        `);
  }
}
