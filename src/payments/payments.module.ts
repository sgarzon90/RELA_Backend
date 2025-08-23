// Importa los módulos necesarios de NestJS.
import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';

// Define el módulo de pagos.
@Module({
  controllers: [PaymentsController], // Registra el controlador de pagos.
  providers: [PaymentsService], // Registra el servicio de pagos.
})
export class PaymentsModule {}
