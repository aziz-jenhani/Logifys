import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

import { LogDto } from './dto/log.dto';
import { Log } from './entities/log.entity';
import { LogRepository } from '../application/repositories/logs.repository';
import { Application } from '../application/entities/appli.entity';
import { LogService } from './log.service';
import { AppliService } from '../application/services/appli.service';
@ApiTags('Logs')
@ApiBearerAuth()
@Controller('log')
export class LogController {
  constructor(
    private logService: LogService,
    private appliService: AppliService,
  ) { }


  

  
  
  @Post('')
  @UsePipes(ValidationPipe)
  @ApiCreatedResponse({
    description: 'Log added to Application',
    type: Log,
  })
  // LogController
  // LogController
  async saveLog(@Body() log: LogDto): Promise<Log> {
    const app = await this.appliService.getAppByName(log.application_name);
    if(!app){
             throw new NotFoundException(`Application with name ${log.application_name} not found`);

    }
    return await this.logService.createLog(log, app);
  }

}
