// Importa los módulos necesarios de NestJS.
import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';

// Define el módulo de reportes.
@Module({
  controllers: [ReportsController], // Registra el controlador de reportes.
  providers: [ReportsService] // Registra el servicio de reportes.
})
export class ReportsModule {}
