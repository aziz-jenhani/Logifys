import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddApplicationUpdateTrigger1649999999999 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE OR REPLACE FUNCTION update_logs_on_application_update()
      RETURNS TRIGGER AS $$
      BEGIN
          -- Update the "application_name" column in "logs" where the "app_id" matches the updated "id"
          UPDATE logs
          SET application_name = NEW.name
          WHERE app_id = NEW.id;
          RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;
    `);

    await queryRunner.query(`
      CREATE TRIGGER update_logs_on_application_update
      AFTER UPDATE ON application
      FOR EACH ROW
      EXECUTE FUNCTION update_logs_on_application_update();
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // You can add a down query here to drop the trigger and function if needed
  }
}
