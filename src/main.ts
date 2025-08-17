import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3333);

  await connectToDatabase();
}

async function connectToDatabase() {
  const prisma = new PrismaClient();
  try {
    await prisma.$connect();
    console.log('Connected to the database');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
  process.exit(1);
});
