import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}
  @Post() create(@Body() dto: CreatePaymentDto) { return this.paymentsService.create(dto); }
  @Get('by-sale/:saleId') listBySale(@Param('saleId') saleId: string) { return this.paymentsService.listBySale(+saleId); }
}