import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAppIdToLogs1652367895678 implements MigrationInterface {
  name = 'AddAppIdToLogs1652367895678';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Ajoutez la colonne app_id
    await queryRunner.query(`
    ALTER TABLE logs
    ADD COLUMN app_id SERIAL REFERENCES application(id) ON DELETE CASCADE
  `);  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir les modifications si nécessaire
    await queryRunner.query(`ALTER TABLE logs DROP COLUMN app_id`);
  }
}
