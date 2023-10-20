import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateLogsTable16523678956781696772902761 implements MigrationInterface {
    name = 'UpdateLogsTable16523678956781696772902761'
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Ajoutez la colonne app_id
        await queryRunner.query(`
        ALTER TABLE logs
        DROP CONSTRAINT IF EXISTS logs_app_id_fkey;  -- Remove the existing foreign key constraint if it exists
    
        -- Add the ON DELETE CASCADE option to the existing "app_id" column
        ALTER TABLE logs
        ADD CONSTRAINT logs_app_id_fkey FOREIGN KEY (app_id) REFERENCES application(id) ON DELETE CASCADE;
      `); }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        // Revertir les modifications si nécessaire
        await queryRunner.query(`ALTER TABLE logs DROP COLUMN app_id`);
      }
}
