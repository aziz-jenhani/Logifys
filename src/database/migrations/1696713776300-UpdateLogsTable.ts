import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateLogsTable1652367890123 implements MigrationInterface {
  name = 'UpdateLogsTable1652367890123';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Supprimez la colonne app_id
    await queryRunner.query(`ALTER TABLE logs DROP COLUMN app_id`);
    
    // Ajoutez les nouvelles colonnes
    await queryRunner.query(`
      ALTER TABLE logs
      ADD COLUMN application_name VARCHAR(255) NOT NULL,
      ADD COLUMN secret_key VARCHAR(255) NOT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir les modifications si nécessaire
    await queryRunner.query(`ALTER TABLE logs DROP COLUMN application_name`);
    await queryRunner.query(`ALTER TABLE logs DROP COLUMN secret_key`);
  }
}
