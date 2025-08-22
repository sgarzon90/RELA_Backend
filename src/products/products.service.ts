import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { join } from "path";
import { createWriteStream, existsSync, mkdirSync, unlinkSync } from "fs";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateProductDto, file: Express.Multer.File) {
    const { tipo, color, talla, cantidad, precio } = dto;
    const fotoUrl = file ? `/uploads/${file.filename}` : null;

    // Guardar el archivo en el sistema de archivos
    if (file) {
      const uploadsDir = join(__dirname, "..", "..", "uploads");
      if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir, { recursive: true });
      }
      const writeStream = createWriteStream(join(uploadsDir, file.originalname));
      writeStream.write(file.buffer);
    }

    return this.prisma.product.create({
      data: {
        tipo,
        color,
        talla,
        cantidad: Number(cantidad),
        precio: Number(precio),
        fotoUrl: file ? file.originalname : null,
      },
    });
  }
  findAll() {
    return this.prisma.product.findMany({ orderBy: { id: "desc" } });
  }
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException("Producto no encontrado");
    return product;
  }
  async update(id: number, dto: UpdateProductDto, file: Express.Multer.File) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.cantidad) data.cantidad = Number(dto.cantidad);
    if (dto.precio) data.precio = Number(dto.precio);

    if (file) {
      const uploadsDir = join(__dirname, "..", "..", "uploads");
      if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir, { recursive: true });
      }
      const writeStream = createWriteStream(join(uploadsDir, file.originalname));
      writeStream.write(file.buffer);
      data.fotoUrl = file.originalname;
    }

    return this.prisma.product.update({ where: { id }, data });
  }
  async remove(id: number) {
    const product = await this.findOne(id);
    if (product && product.fotoUrl && typeof product.fotoUrl === "string") {
      const uploadsDir = join(__dirname, "..", "..", "uploads");
      const path = join(uploadsDir, product.fotoUrl);
      if (existsSync(path)) {
        unlinkSync(path);
      }
    }
    try {
      return await this.prisma.product.delete({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2003") {
          throw new BadRequestException(
            "No se puede eliminar el producto porque tiene ventas asociadas.",
          );
        }
      }
      throw e;
    }
  }
}
