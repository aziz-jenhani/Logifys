import {
    Body,
    Controller,
    DefaultValuePipe,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Query,
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
  
  @ApiTags('Application')
  @Controller('application')
  @ApiSecurity('bearer')
  @UseGuards(JwtAuthGuard)
  export class ApplController {
    constructor(private applService: AppliService) {}
  
    @Get('/')
    @ApiPaginatedResponse({ model: Application, description: 'List of application' })
    async getAllQuiz(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
      @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 1,
    ): Promise<Pagination<Application>> {
      const options: IPaginationOptions = {
        limit,
        page,
      };
      return await this.applService.paginate(options);
    }
  
    @Get('/:id')
    @ApiOkResponse({ description: 'Get an app by Key', type: Application })
    async getAppByKey(@Param('id', ParseIntPipe) id: number): Promise<Application> {
      return await this.applService.getAppById(id);
    }
  
    @ApiCreatedResponse({ description: 'The app that got created', type: Application })
    @Post('/create')
    @UsePipes(ValidationPipe)
   // @UseGuards(RolesGuard)
   // @Roles('admin')
    async createQuiz(@Body() appData: CreateAppliDto): Promise<Application> {
      return await this.applService.createNewApp(appData);
    }
  }
  