// Importa los módulos necesarios de NestJS y Prisma.
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  // Obtiene un resumen de las ventas y el inventario.
  async getSummary() {
    // Calcula el total de ventas.
    const totalSales = await this.prisma.sale.aggregate({
      _sum: {
        total: true,
      },
    });

    // Calcula la cantidad total de productos vendidos.
    const productsSolds = await this.prisma.sale.aggregate({
      _sum: {
        cantidad: true,
      },
    });

    // Calcula el saldo pendiente total.
    const pendingBalance = await this.prisma.sale.aggregate({
      _sum: {
        saldoPendiente: true,
      },
    });

    // Calcula la cantidad total de productos en stock.
    const productsInStock = await this.prisma.product.aggregate({
      _sum: {
        cantidad: true,
      },
    });

    return {
      totalSales: totalSales._sum.total || 0,
      productsSolds: productsSolds._sum.cantidad || 0,
      pendingBalance: pendingBalance._sum.saldoPendiente || 0,
      productsInStock: productsInStock._sum.cantidad || 0,
    };
  }

  // Obtiene los 5 productos más vendidos.
  async getTopSellingProducts() {
    // Agrupa las ventas por producto y suma las cantidades vendidas.
    const sales = await this.prisma.sale.groupBy({
      by: ["productoId"],
      _sum: {
        cantidad: true,
      },
      orderBy: {
        _sum: {
          cantidad: "desc",
        },
      },
      take: 5,
    });

    // Obtiene la información de los productos más vendidos.
    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: sales.map((s) => s.productoId),
        },
      },
    });

    // Combina la información de los productos con la cantidad vendida.
    return sales.map((s) => {
      const product = products.find((p) => p.id === s.productoId);
      return {
        ...product,
        cantidad: s._sum.cantidad,
      };
    });
  }
}
