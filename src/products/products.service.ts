import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateProductDto) {
    return this.prisma.product.create({ data: dto as any });
  }
  findAll() {
    return this.prisma.product.findMany({ orderBy: { id: "desc" } });
  }
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException("Producto no encontrado");
    return product;
  }
  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id);
    return this.prisma.product.update({ where: { id }, data: dto as any });
  }
  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.product.delete({ where: { id } });
  }
}
