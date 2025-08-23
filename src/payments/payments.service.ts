// Importa los módulos necesarios de NestJS y Prisma.
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  // Crea un nuevo pago.
  async create(dto: CreatePaymentDto) {
    const sale = await this.prisma.sale.findUnique({ where: { id: dto.saleId } });
    if (!sale) throw new NotFoundException('Venta no encontrada');
    if (sale.saldoPendiente <= 0) throw new BadRequestException('La venta ya está a paz y salvo');

    const nuevoSaldo = Math.max(Number(sale.saldoPendiente) - dto.monto, 0);
    const nuevoStatus = nuevoSaldo === 0 ? 'PAZ_Y_SALVO' : 'PENDIENTE';

    // Usa una transacción para asegurar la consistencia de los datos.
    const result = await this.prisma.$transaction(async (tx) => {
      const payment = await tx.payment.create({ data: { saleId: dto.saleId, monto: dto.monto } });
      // Actualiza el saldo pendiente y el estado de la venta.
      await tx.sale.update({ where: { id: dto.saleId }, data: { saldoPendiente: nuevoSaldo, status: nuevoStatus as any } });
      return payment;
    });
    return result;
  }

  // Obtiene todos los pagos de una venta específica.
  listBySale(saleId: number) {
    return this.prisma.payment.findMany({ where: { saleId }, orderBy: { id: 'desc' } });
  }
}
