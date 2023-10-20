// log.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Application } from '../../application/entities/appli.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity('logs')
export class Log extends BaseEntity {
  @ApiProperty({
    description: 'The primary ID of logs.',
    example: 1,
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: 'Description of the log',
  })
  @Column({ type: 'text' })
  description: string;

  @ApiProperty({ description: 'When log was created' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({ description: 'When log was updated' })
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @ManyToOne(() => Application, (application) => application.logs, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'applicationId' })
  application: Application;
}
