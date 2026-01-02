import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Frontend'den (localhost:5173) gelen isteklere izin ver (CORS)
  app.enableCors();

  // Gelen verileri kontrol et (Validasyon)
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();