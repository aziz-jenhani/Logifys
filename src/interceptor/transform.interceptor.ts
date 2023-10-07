import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

@Injectable()
export class FormatResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    return next
      .handle()
      .pipe(map((data) => this.formatResponse(context, data)));
  }

  formatResponse(context: ExecutionContext, data: any) {
    const statusCode = context.switchToHttp().getResponse().statusCode;
    return {
      statusCode,
      success: statusCode < 400,
      data,
    };
  }
}