import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRuralProducerPlantedCropsTable1726625509836
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create table
    await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS public.rural_producers_planted_crops_planted_crops
            (
                "ruralProducersId" integer NOT NULL,
                "plantedCropsId" integer NOT NULL,
                CONSTRAINT "PK_2ef64fe5b1a62e97053bda70bb9" PRIMARY KEY ("ruralProducersId", "plantedCropsId"),
                CONSTRAINT "FK_8ec265a43af113f66bf08f9d500" FOREIGN KEY ("ruralProducersId")
                    REFERENCES public.rural_producers (id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE,
                CONSTRAINT "FK_be9d0dd0b54f1066c58e6ebb0c9" FOREIGN KEY ("plantedCropsId")
                    REFERENCES public.planted_crops (id) MATCH SIMPLE
                    ON UPDATE CASCADE
                    ON DELETE CASCADE
            )
            TABLESPACE pg_default;
        `);

    // Create indexes
    await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_8ec265a43af113f66bf08f9d50"
                ON public.rural_producers_planted_crops_planted_crops USING btree
                ("ruralProducersId" ASC NULLS LAST)
                TABLESPACE pg_default;
        `);

    await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS "IDX_be9d0dd0b54f1066c58e6ebb0c"
                ON public.rural_producers_planted_crops_planted_crops USING btree
                ("plantedCropsId" ASC NULLS LAST)
                TABLESPACE pg_default;
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_be9d0dd0b54f1066c58e6ebb0c";`,
    );
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_8ec265a43af113f66bf08f9d50";`,
    );

    // Drop table
    await queryRunner.query(
      `DROP TABLE IF EXISTS public.rural_producers_planted_crops_planted_crops;`,
    );
  }
}
