import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateSaleDto, PaymentType } from "./dto/create-sale.dto";
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
}
