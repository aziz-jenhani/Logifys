import {MigrationInterface, QueryRunner} from "typeorm";

export class DeleteSecretKey1696719460599 implements MigrationInterface {
    name = 'DeleteSecretKey1696719460599'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE logs DROP COLUMN secret_key');
      }
      
      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE logs ADD COLUMN secret_key VARCHAR(255)');
      }
      
}
