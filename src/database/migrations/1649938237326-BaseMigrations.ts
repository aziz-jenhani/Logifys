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
     CREATE TABLE "applications" (
        "id" serial PRIMARY KEY,
        "name" varchar(255) NOT NULL,
        "description" text NOT NULL,
        "secretKey" varchar(255) NOT NULL,
        "userId" integer,
        "createdAt" timestamp NOT NULL DEFAULT current_timestamp,
        "updatedAt" timestamp NOT NULL DEFAULT current_timestamp,
        CONSTRAINT "FK_user_application" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
      )
  `);
 
    // Create the "logs" table
    await queryRunner.query(`
       CREATE TABLE "logs" (
        "id" serial PRIMARY KEY,
        "description" text NOT NULL,
        "applicationId" integer,
        "createdAt" timestamp NOT NULL DEFAULT now(),
        "updatedAt" timestamp NOT NULL DEFAULT now(),
        CONSTRAINT "FK_application_log" FOREIGN KEY ("applicationId") REFERENCES "applications"("id") ON DELETE CASCADE
      )
    `);
    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the "logs" table
    await queryRunner.query('DROP TABLE logs');

    // Drop the "application" table
    await queryRunner.query('DROP TABLE applications');

    // Drop the "users" table
    await queryRunner.query('DROP TABLE "users"');
  
  }
}
