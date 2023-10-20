import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from 'typeorm';

export class AddUserApplicationsRelation1696766414625 implements MigrationInterface {
    name = 'AddUserApplicationsRelation1696766414625'

        public async up(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.addColumn(
              'application',
              new TableColumn({
                name: 'user_id',
                type: 'int',
                isNullable: true, // Set this to false if a user must always be associated with an application
              }),
            );
        
            await queryRunner.createForeignKey(
              'application',
              new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'CASCADE', // Choose the appropriate action for onDelete
              }),
            );
          }
        
          public async down(queryRunner: QueryRunner): Promise<void> {
            const applicationTable = await queryRunner.getTable('application');
            const foreignKey = applicationTable.foreignKeys.find((fk) => fk.columnNames.indexOf('user_id') !== -1);
        
            if (foreignKey) {
              await queryRunner.dropForeignKey('application', foreignKey);
            }
        
            await queryRunner.dropColumn('application', 'user_id');
          }
}
