import { NestFactory } from '@nestjs/core';
import { EnvVars } from './main/utils/adapters/envVars-adapter';
import { AppModule } from './main/nest/app.module';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('api-user-management')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(new EnvVars().port || 3000);
}
bootstrap();
