import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaClient } from '@prisma/client';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);
  await connectToDatabase();

  await app.listen(process.env.PORT ?? 3333);
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

function setupSwagger(app: any) {
  try {
    const config = new DocumentBuilder()
      .setTitle('Escola API')
      .setDescription('API para gerenciamento de uma escola')
      .setVersion('1.0')
      .addTag('escola')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, document);
    if (!process.env.PORT) {
      process.env.PORT = '3333';
    }
    console.log(
      `Swagger is set up at http://localhost:${process.env.PORT}/docs`,
    );
  } catch (error) {
    console.error('Error setting up Swagger:', error);
  }
}

bootstrap().catch((error) => {
  console.error('Error during bootstrap:', error);
  process.exit(1);
});
