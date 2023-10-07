import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseMigrations1649938237326 implements MigrationInterface {
  name = 'BaseMigrations1649938237326';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create the "users" table
    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" serial PRIMARY KEY,
        "name" varchar(255) NOT NULL,
        "campanyName" varchar(255) NOT NULL,
        "email" varchar(255) NOT NULL,
        "password" varchar(255) NOT NULL,
        "createdAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "UQ_email" UNIQUE ("email")
      )
    `);

    // Create the "application" table
    await queryRunner.query(`
    CREATE TABLE application (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      secret_key VARCHAR(255) NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT unique_name UNIQUE (name),
      CONSTRAINT unique_secret_key UNIQUE (secret_key)
    )
  `);

    // Create the "logs" table
    await queryRunner.query(`
      CREATE TABLE logs (
        id SERIAL PRIMARY KEY,
        app_id SERIAL REFERENCES application(id),
        information_log TEXT NOT NULL,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        
      )
    `);
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the "logs" table
    await queryRunner.query('DROP TABLE logs');

    // Drop the "application" table
    await queryRunner.query('DROP TABLE application');

    // Drop the "users" table
    await queryRunner.query('DROP TABLE "users"');
  
  }
}
