import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AppliService } from '../../application/services/appli.service';

@Injectable()
export class LogGuard implements CanActivate {
    constructor(private readonly applicationService: AppliService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const secretKey = request.params.secretKey; // Vous pouvez personnaliser ceci en fonction de vos besoins

        if (!secretKey) {
            throw new UnauthorizedException('Missing secret key');
        }

        const application = await this.applicationService.getAppBySecretKey(secretKey);

        if (!application) {
            throw new UnauthorizedException('Invalid secret key');
        }

        // Vous pouvez également ajouter d'autres vérifications ici si nécessaire

        return true;
    }
}
