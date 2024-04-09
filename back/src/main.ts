import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['https://gaiaalimentos.vercel.app/ventas', 'https://gaiaalimentos.vercel.app/ordena-aqui']
  });
  await app.listen(3000);
}
bootstrap();
