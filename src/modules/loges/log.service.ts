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

  async findLogById(id: number): Promise<Log> {

    const log = await this.logRepository.findOne(id, {
      relations: ['application'],
    });
    if (!log) {
      throw new NotFoundException(`Log with id ${id} not found`);
    }
    return log;
  }
  ;
  async getAllLogs(userId: number): Promise<Log[]> {
    const apps = await this.appliService.getAllAppli(userId);

    const appIds = apps.map(app => app.id);

    const logs = await this.logRepository.find({
      where: {
        application: {
          id: In(appIds),
        },
      },
    });

    if (!logs)
      throw new NotFoundException("you have not yet Logs")
    return logs;
  }

  async getLogById(id: number,userId: number): Promise<Log> {

    const log = await this.logRepository.findOne(id, {
      relations: ['application'],
      where: {
        application: {
          user_id:userId,
        },
      },
    });
    if (!log) {
      throw new NotFoundException(`Log with id ${id} not found`);
    }
    return log;
  }

  async createLog(log: LogDto, app: Application): Promise<Log> {
    // Assurez-vous que la valeur de secret_key est définie dans l'objet Log
    const newLog = new Log();
    newLog.information_log = log.information_log;
    newLog.application_name = app.name;

    // Enregistrez le journal
    const savedLog = await this.logRepository.save({ ...newLog, application: app });

    // Assurez-vous d'ajouter le journal à l'application
    app.logs = [...app.logs, savedLog];
    await app.save();

    return savedLog;
  }





}
