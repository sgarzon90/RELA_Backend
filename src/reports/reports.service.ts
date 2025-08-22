import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const totalSales = await this.prisma.sale.aggregate({
      _sum: {
        total: true,
      },
    });

    const productsSolds = await this.prisma.sale.aggregate({
      _sum: {
        cantidad: true,
      },
    });

    const pendingBalance = await this.prisma.sale.aggregate({
      _sum: {
        saldoPendiente: true,
      },
    });

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

  async getTopSellingProducts() {
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

    const products = await this.prisma.product.findMany({
      where: {
        id: {
          in: sales.map((s) => s.productoId),
        },
      },
    });

    return sales.map((s) => {
      const product = products.find((p) => p.id === s.productoId);
      return {
        ...product,
        cantidad: s._sum.cantidad,
      };
    });
  }
}
