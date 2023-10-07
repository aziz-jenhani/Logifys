import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { FormatResponseInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist:true,forbidNonWhitelisted:true}));

  app.useGlobalInterceptors(new FormatResponseInterceptor())
	app.useGlobalFilters(new HttpExceptionFilter())
  app.enableCors();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle(' LOGIFY manager API')
    .setDescription('Platform that provides users with access to a secure REST API for saving logs')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
