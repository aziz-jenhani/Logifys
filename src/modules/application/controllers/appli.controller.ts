import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { ApiPaginatedResponse } from '../../../common/decorator/api-pagination.response';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RolesGuard } from '../../auth/roles.guard';

import { CreateAppliDto } from '../dto/create-appli.dto';
import { Application } from '../entities/appli.entity';
import { AppliService } from '../services/appli.service';
import { Log } from 'src/modules/loges/entities/log.entity';
import { LogService } from 'src/modules/loges/log.service';
import { UpdateAppliDto } from '../dto/update-appli.dto';

@ApiTags('Application')
@Controller('application')
@ApiSecurity('bearer')
@UseGuards(JwtAuthGuard)
export class ApplController {
  constructor(
    private applService: AppliService,
    private logService: LogService,
  ) {}

  // Reordered routes with routes that accept parameters first



  @Get('/log/:id')
  async getLogById(@Param('id', ParseIntPipe) id: number, @Request() req): Promise<Log> {
    return await this.logService.getLogById(id, req.user.id);
  }

  // The rest of your routes

  @Get('/')
  @ApiPaginatedResponse({ model: Application, description: 'List of application' })
  async getAllApplication(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 1,
    @Request() req,
  ): Promise<Pagination<Application>> {
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return await this.applService.paginate(options, req.user.id);
  }

  @ApiCreatedResponse({ description: 'The app that got created', type: Application })
  @Post('/create')
  @UsePipes(ValidationPipe)
  async createQuiz(@Body() appData: CreateAppliDto, @Request() req): Promise<Application> {
    return await this.applService.createNewApp(appData, req.user.id);
  }

  @Get('/log')
  async getAllLogs(@Request() req): Promise<Log[]> {
    return await this.logService.getAllLogs(Number(req.user.id));
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Get an app by Key', type: Application })
  async getAppByKey(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Application> {
    return await this.applService.getAppById(id, req.user.id);
  }

  @Put('/:id')
  @ApiOkResponse({ description: 'Update an app', type: Application })
  async updateApp(
    @Param('id', ParseIntPipe) id: number,
    @Body() appData: UpdateAppliDto,
    @Request() req,
  ): Promise<Application> {
    return await this.applService.updateApp(id, appData, req.user.id);
  }

  @Delete('/:id')
  @ApiOkResponse({ description: 'Delete an app', type: Application })
  async deleteApp(
    @Param('id', ParseIntPipe) id: number,
    @Request() req,
  ): Promise<Application> {
    return await this.applService.deleteApp(id, req.user.id);
  }
}
