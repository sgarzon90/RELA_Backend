import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSaleDto, PaymentType } from "./dto/create-sale.dto";
import { UpdateSaleDto } from "./dto/update-sale.dto";
@Injectable()
export class SalesService {
  constructor(private prisma: PrismaService) {}
  async create(dto: CreateSaleDto) {
    const product = await this.prisma.product.findUnique({
      where: { id: dto.productoId },
    });
    if (!product) throw new NotFoundException("Producto no encontrado");
    if (product.cantidad < dto.cantidad)
      throw new BadRequestException("Inventario insuficiente");
    const total = Number(product.precio) * dto.cantidad;
    const isCredito = dto.formaPago === PaymentType.CREDITO;
    const saldoPendiente = isCredito ? total : 0;
    const status = isCredito ? "PENDIENTE" : "PAZ_Y_SALVO";
    const result = await this.prisma.$transaction(async (tx) => {
      const sale = await tx.sale.create({
        data: {
          cliente: dto.cliente,
          productoId: dto.productoId,
          cantidad: dto.cantidad,
          formaPago: dto.formaPago,
          total,
          saldoPendiente,
          status: status as any,
        },
      });
      await tx.product.update({
        where: { id: dto.productoId },
        data: { cantidad: product.cantidad - dto.cantidad },
      });
      return sale;
    });
    return result;
  }
  findAll(status?: "PENDIENTE" | "PAZ_Y_SALVO") {
    return this.prisma.sale.findMany({
      where: status ? { status } : undefined,
      include: { producto: true, payments: true },
      orderBy: { id: "desc" },
    });
  }
  findOne(id: number) {
    return this.prisma.sale.findUnique({
      where: { id },
      include: { producto: true, payments: true },
    });
  }

  async update(id: number, dto: UpdateSaleDto) {
    const sale = await this.findOne(id);
    if (!sale) throw new NotFoundException("Venta no encontrada");

    const data: any = { ...dto };

    if (dto.cantidad && sale.producto) {
      const newTotal = Number(sale.producto.precio) * dto.cantidad;
      data.total = newTotal;
      if (data.formaPago === PaymentType.CREDITO || sale.formaPago === "CREDITO") {
        data.saldoPendiente = newTotal;
      }
    }

    if (dto.formaPago) {
      const isCredito = dto.formaPago === PaymentType.CREDITO;
      data.saldoPendiente = isCredito ? data.total || sale.total : 0;
      data.status = isCredito ? "PENDIENTE" : "PAZ_Y_SALVO";
    }

    return this.prisma.sale.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const sale = await this.findOne(id);
    if (!sale) throw new NotFoundException("Venta no encontrada");

    return this.prisma.$transaction(async (tx) => {
      // Devolver el stock al producto
      await tx.product.update({
        where: { id: sale.productoId },
        data: { cantidad: { increment: sale.cantidad } },
      });

      // Eliminar pagos asociados
      await tx.payment.deleteMany({ where: { saleId: id } });

      // Eliminar la venta
      return tx.sale.delete({ where: { id } });
    });
  }
}
