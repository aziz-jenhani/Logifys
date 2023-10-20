import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Query,
  Request,
  UseGuards,
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
import { LogGuard } from './guards/log.guard';
@ApiTags('Logs')
@ApiBearerAuth()
@Controller('log')
export class LogController {
  constructor(
    private logService: LogService,
    private appliService: AppliService,
  ) { }
  
  @Get('application/:secretKey')
  @UseGuards(LogGuard)
    async getLogsForApplication(@Param('secretKey') secretKey: string) {
      return this.logService.getLogsForApplication(secretKey);
    }

  @Post('/:secretKey')
  @UseGuards(LogGuard)
  async createLogForApplication(@Param('secretKey') secretKey: string, @Body() createLogDto: LogDto, @Request() req) {
    return this.logService.createLogForApplication(secretKey, createLogDto);
  }
  @Get(':id')
  async getLogById(@Param('id') logId: number, @Query('secretKey') secretKey: string) {
    const log = await this.logService.getLogById(logId, secretKey);
    return log;
  }
  @Delete(':id')
  async deleteLogById(@Param('id') logId: number, @Query('secretKey') secretKey: string) {
    await this.logService.deleteLogById(logId, secretKey);
    return { message: 'Log deleted successfully' };
  }

}
