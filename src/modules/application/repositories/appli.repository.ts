import { EntityRepository, Repository } from 'typeorm';
import { Application } from '../entities/appli.entity';

@EntityRepository(Application)
export class ApplicationRepository extends Repository<Application> {}
