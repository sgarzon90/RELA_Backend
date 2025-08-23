// Importa los módulos necesarios de NestJS.
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

// Define el módulo de Prisma como global, para que esté disponible en toda la aplicación.
@Global()
@Module({
  providers: [PrismaService], // Registra el servicio de Prisma.
  exports: [PrismaService], // Exporta el servicio de Prisma para que pueda ser utilizado en otros módulos.
})
export class PrismaModule {}
