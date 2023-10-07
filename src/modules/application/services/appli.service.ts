import { Injectable, NotFoundException } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { events } from '../../../common/constants/event.constants';

import { CreateAppliDto } from '../dto/create-appli.dto';
import { Application } from '../entities/appli.entity';
//import { ResponseAddEvent } from '../events/response-add.event';
import { ApplicationRepository } from '../repositories/appli.repository';
import { randomBytes } from 'crypto';

@Injectable()
export class AppliService {
  constructor(
    @InjectRepository(ApplicationRepository) private appRepository: ApplicationRepository,
  ) {}

  async getAllAppli(): Promise<Application[]> {
    return await this.appRepository
      .createQueryBuilder('q')
      .leftJoinAndSelect('q.logs', 'qt')
      .getMany();
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Application>> {
    const qb = this.appRepository.createQueryBuilder('q');
    qb.orderBy('q.id', 'DESC');

    return paginate<Application>(qb, options);
  }

  async getAppById(id: number): Promise<Application> {
    return await this.appRepository.findOne(id, {
      relations: ['logs'],
    });
  }
  async getAppBySecretKey(secretKey: string): Promise<Application> {
    const app = await this.appRepository.findOne({ secret_key: secretKey });

    if (!app) {
      throw new NotFoundException('Application not found');
    }

    return app;
  }

  async createNewApp(app: CreateAppliDto) {
    const secretKey = this.generateSecretKey();
    return await this.appRepository.save({...app,
      secret_key: secretKey, }       
      );
  }

  // Helper method to generate a random secret key
  private generateSecretKey(): string {
    const secretKeyLength = 32; // Set the desired length of the secret key
    return randomBytes(secretKeyLength).toString('hex');
  }
 
}
