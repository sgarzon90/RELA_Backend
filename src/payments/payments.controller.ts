// Importa los módulos necesarios de NestJS.
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

// Define el controlador para la ruta 'payments'.
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // Endpoint para crear un nuevo pago.
  @Post()
  create(@Body() dto: CreatePaymentDto) {
    return this.paymentsService.create(dto);
  }

  // Endpoint para obtener todos los pagos de una venta específica.
  @Get('by-sale/:saleId')
  listBySale(@Param('saleId') saleId: string) {
    return this.paymentsService.listBySale(+saleId);
  }
}
