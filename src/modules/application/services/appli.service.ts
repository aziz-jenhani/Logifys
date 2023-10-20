import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
import { UpdateAppliDto } from '../dto/update-appli.dto';

@Injectable()
export class AppliService {
  constructor(
    @InjectRepository(ApplicationRepository) private appRepository: ApplicationRepository,
  ) {}

  async getAllAppli(userId: number): Promise<Application[]> {
    return await this.appRepository.find({
      where: { user: { id: userId } }, // Filter by user_id
      relations: ['logs'],
    });
  }
  
  
  async paginate(options: IPaginationOptions, userId: number): Promise<Pagination<Application>> {
    const qb = this.appRepository.createQueryBuilder('q');
    qb.orderBy('q.id', 'DESC');

    // Ajoutez une condition WHERE pour filtrer par ID d'utilisateur
    qb.where('q.userId = :userId', { userId });

    return paginate<Application>(qb, options);
  }


  async getAppById(id: number, userId: number): Promise<Application> {
    try {
      const application = await this.appRepository.findOne({
        where: {
          id: id,
          userId: userId, // Vérifie que l'application appartient à l'utilisateur actuellement authentifié.
        },
      });

      if (!application) {
        throw new NotFoundException(`L'application avec l'ID ${id} n'a pas été trouvée.`);
      }

      return application;
    } catch (error) {
      throw new HttpException(
        `Erreur lors de la récupération de l'application : ${error.message}`,
        HttpStatus.NOT_FOUND, // Utilisez le code HTTP 404 pour "Not Found"
      );
    }
  }







  async getAppByName(application_name: string): Promise<Application> {
    return await this.appRepository.findOne({
      where: { name: application_name },
      relations: ['logs'],
    });
  }
  
  async getAppBySecretKey(secretKey: string): Promise<Application> {
    const app = await this.appRepository.findOne({ secretKey: secretKey });

    if (!app) {
      throw new NotFoundException('Application not found');
    }

    return app;
  }

  async createNewApp(app: CreateAppliDto, userId: number): Promise<Application> {
    const secretKey = this.generateSecretKey();
    const newApp = this.appRepository.create({
      ...app,
      secretKey: secretKey,
      userId: userId, // Associate the user with the new application
    });
    return await this.appRepository.save(newApp);
  }
  

  // Helper method to generate a random secret key
  private generateSecretKey(): string {
    const secretKeyLength = 32; // Set the desired length of the secret key
    return randomBytes(secretKeyLength).toString('hex');
  }
 




  async updateApp(id: number, appData: UpdateAppliDto, userId: number): Promise<Application> {
    const app = await this.getAppById(id, userId);
  
    if (!app) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }
  
    app.name = appData.name || app.name;
    app.description = appData.description || app.description;
  
    return await this.appRepository.save(app);
  }

  
  async deleteApp(id: number, userId: number): Promise<Application> {
    const app = await this.getAppById(id, userId);
  
    if (!app) {
      throw new NotFoundException(`Application with id ${id} not found`);
    }
  
    await this.appRepository.remove(app);
  
    return app;
  }
  
}
