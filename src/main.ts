import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');
  app.useGlobalPipes(
    new ValidationPipe({
      stopAtFirstError: true,
      exceptionFactory: (errors) => {
        const messages = errors[0].constraints;
        const message = Object.values(messages)[0];
        const response = { message, statusCode: HttpStatus.BAD_REQUEST };
        throw new HttpException(response, HttpStatus.BAD_REQUEST);
      },
    }),
  );
  await app.listen(port);
  console.log(`Server is running at http://localhost:${port}`);
}
bootstrap();
