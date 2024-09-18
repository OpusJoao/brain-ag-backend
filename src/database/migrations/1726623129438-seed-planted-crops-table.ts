import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedPlantedCropsTable1726623129438 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        INSERT INTO planted_crops (name, created_at, updated_at)
        VALUES
          ('SOJA', NOW(), NOW()),
          ('MILHO', NOW(), NOW()),
          ('ALGODAO', NOW(), NOW()),
          ('CAFE', NOW(), NOW()),
          ('CANA_DE_ACUCAR', NOW(), NOW());
      `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        DELETE FROM planted_crops
        WHERE name IN ('SOJA', 'MILHO', 'ALGODAO','CAFE', 'CANA_DE_ACUCAR');
      `);
  }
}
