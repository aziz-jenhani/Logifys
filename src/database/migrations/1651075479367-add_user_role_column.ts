import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUserRoleColumn1651075479367 implements MigrationInterface {
  name = 'AddUserRoleColumn1651075479367';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // PostgreSQL does not support native ENUM types like MySQL.
    // We will use a VARCHAR column with CHECK constraint to simulate the ENUM behavior.
    await queryRunner.query(`
      ALTER TABLE "users"
      ADD "role" VARCHAR(255) NOT NULL DEFAULT 'member' CHECK ("role" IN ('admin', 'member'))
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "users"
      DROP COLUMN "role"
    `);
  }
}
