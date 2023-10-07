import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogDto } from './dto/log.dto';
import { Log } from './entities/log.entity';
import { LogRepository } from '../application/repositories/logs.repository';
import { Application } from '../application/entities/appli.entity';

@Injectable()
export class LogService {
  constructor(
    @InjectRepository(LogRepository)
    private logRepository: LogRepository,
  ) {}

  async findLogById(id: number): Promise<Log> {
    return await this.logRepository.findOne(id, {
      relations: ['application'],
    });
  }

  async createLog(log:LogDto , app:Application
  ): Promise<Log> {
    const newLog = await this.logRepository.save(  log );

    app.logs = [...app.logs, newLog];
    await app.save();

    return newLog;
  }
}
