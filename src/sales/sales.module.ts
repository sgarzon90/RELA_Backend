// Importa los módulos necesarios de NestJS.
import { Module } from '@nestjs/common';
import { SalesService } from './sales.service';
import { SalesController } from './sales.controller';

// Define el módulo de ventas.
@Module({
  controllers: [SalesController], // Registra el controlador de ventas.
  providers: [SalesService], // Registra el servicio de ventas.
  exports: [SalesService], // Exporta el servicio de ventas para que pueda ser utilizado en otros módulos.
})
export class SalesModule {}
