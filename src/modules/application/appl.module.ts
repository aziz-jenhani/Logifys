import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogController } from '../loges/log.controller';
import { LogRepository } from './repositories/logs.repository';
import { LogService } from '../loges/log.service';
import { ApplController } from './controllers/appli.controller';
import { ApplicationRepository } from './repositories/appli.repository';
import { AppliService } from './services/appli.service';

import { UserModule } from '../user/user.module';


@Module({
  controllers: [
    ApplController,
    LogController,
  
  ],
  imports: [
    TypeOrmModule.forFeature([
        ApplicationRepository,
        LogRepository,
   
    ]),
    UserModule,
  ],
  providers: [LogService, AppliService],
})
export class ApplicationModule {}
