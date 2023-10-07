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
  export class Log  extends BaseEntity{
    @ApiProperty({
        description: 'The primary ID of logs.',
        example: 1,
      })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: 'Information log',
      })
    @Column({ name: 'information_log', type: 'text' })
    information_log: string;
  
    @ApiProperty({ description: 'When log was updated' })
    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
    
  
    @ManyToOne(() => Application, (application) => application.logs)
    @JoinColumn({ name: 'app_id' })
    application: Application;
  }
  