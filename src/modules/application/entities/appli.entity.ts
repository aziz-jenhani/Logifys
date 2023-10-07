import { ApiProperty } from '@nestjs/swagger';
import {
    BaseEntity,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { User } from '../../user/user.entity'; // Import the User entity if not already imported
import { Log } from 'src/modules/loges/entities/log.entity';

@Entity('application')
export class Application extends BaseEntity {
    @ApiProperty({ description: 'Primary key as application ID', example: 1 })
    @PrimaryGeneratedColumn({
        comment: 'The application unique identifier',
    })
    id: number;



    @ApiProperty({
        description: 'Title of the application',
        example: 'Sample Laravel application',
    })
    @Column({ type: 'varchar', length: 255 })
    name: string;



    @ApiProperty({
        description: 'Description of the application',
        example: 'Lorem ipsum',
    })
    @Column({ type: 'text', nullable: true })
    description: string;
    
    @ApiProperty({
        description: 'Key of App',})
    @Column({ type: 'varchar', length: 255 })
    secret_key: string;

    @ApiProperty({ description: 'When app was created' })
    @CreateDateColumn()
    created_at: Date;

    @ApiProperty({ description: 'When app was updated' })
    @UpdateDateColumn()
    updated_at: Date;

@OneToMany(() => Log, (log) => log.application)
logs: Log[];
}

