import { Injectable, NotFoundException, Request } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LogDto } from './dto/log.dto';
import { Log } from './entities/log.entity';
import { LogRepository } from '../application/repositories/logs.repository';
import { Application } from '../application/entities/appli.entity';
import { AppliService } from '../application/services/appli.service';
import { In } from 'typeorm';

@Injectable()
export class LogService {
  constructor(private appliService: AppliService,
    @InjectRepository(LogRepository)
    private logRepository: LogRepository,
  ) { }
              


  async getLogsForApplication(secretKey: string): Promise<Log[]> {
  const application = await this.appliService.getAppBySecretKey(secretKey);
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    return this.logRepository.find({ where: {application:application } });
  }

  async createLogForApplication(secretKey: string, createLogDto: LogDto) {
    const application = await this.appliService.getAppBySecretKey(secretKey);
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    const newLog = new Log();
    newLog.description = createLogDto.description;
    

    newLog.application = application;

    const savedLog = await this.logRepository.save(newLog);
    const createdLogData = {
      id: savedLog.id,
      description: savedLog.description,
      createdAt: savedLog.createdAt,
      updatedAt: savedLog.updatedAt,
    };
    return createdLogData;
  }
  async getLogById(logId: number, secretKey: string) {
    const application = await this.appliService.getAppBySecretKey(secretKey);
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    const log = await this.logRepository.findOne(logId, {
      relations: ['application'],
      where: {
        application,
      },
    });

    if (!log) {
      throw new NotFoundException(`Log with id ${logId} not found`);
    }
    const logData = {
      id: log.id,
      description: log.description,
      createdAt: log.createdAt,
      updatedAt: log.updatedAt,
    };
    return logData;
  }


  async deleteLogById(logId: number, secretKey: string): Promise<void> {
    const application = await this.appliService.getAppBySecretKey(secretKey);
    if (!application) {
      throw new NotFoundException('Application not found');
    }

    const log = await this.logRepository.findOne(logId, {
      where: {
        application,
      },
    });

    if (!log) {
      throw new NotFoundException(`Log with id ${logId} not found`);
    }

    await this.logRepository.remove(log);
  }






}
