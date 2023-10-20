import { ApiProperty } from '@nestjs/swagger';
import {
    BaseEntity,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from '../../user/user.entity'; // Import the User entity if not already imported
import { Log } from 'src/modules/loges/entities/log.entity';

@Entity('applications')
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
    secretKey: string;

    @ApiProperty({ description: 'When app was created' })
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty({ description: 'When app was updated' })
    @UpdateDateColumn()
    updatedAt: Date;
    @Column({ type: 'int', nullable: true }) // Add the user_id column
    userId: number;
  
    @ManyToOne(() => User, (user) => user.applications)
    @JoinColumn({ name: 'userId' })
    user: User;


@OneToMany(() => Log, (log) => log.application, { cascade: true })
logs: Log[];
}

