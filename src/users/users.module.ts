// Importa los módulos necesarios de NestJS.
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

// Define el módulo de usuarios.
@Module({
  imports: [PrismaModule], // Importa el módulo de Prisma para la interacción con la base de datos.
  controllers: [UsersController], // Registra el controlador de usuarios.
  providers: [UsersService], // Registra el servicio de usuarios.
})
export class UsersModule {}
