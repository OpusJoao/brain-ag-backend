import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedRuralProducerPlantedCropsTable1726625678863
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Inserir dados na tabela rural_producers_planted_crops_planted_crops
    await queryRunner.query(`
            INSERT INTO public.rural_producers_planted_crops_planted_crops ("ruralProducersId", "plantedCropsId")
            VALUES
                (1, 1),
                (2, 2);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover dados inseridos na tabela rural_producers_planted_crops_planted_crops
    await queryRunner.query(`
            DELETE FROM public.rural_producers_planted_crops_planted_crops
            WHERE ("ruralProducersId", "plantedCropsId") IN
                ((1, 1), (2, 2));
        `);
  }
}
