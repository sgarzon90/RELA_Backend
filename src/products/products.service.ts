// Importa los módulos necesarios de NestJS, Prisma y Node.js.
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

  // Crea un nuevo producto.
  create(dto: CreateProductDto, file: Express.Multer.File) {
    const { tipoId, colorId, talla, cantidad, precio } = dto;

    // Guarda el archivo en el sistema de archivos si se proporciona uno.
    if (file) {
      const uploadsDir = join(__dirname, "..", "..", "uploads");
      if (!existsSync(uploadsDir)) {
        mkdirSync(uploadsDir, { recursive: true });
      }
      const writeStream = createWriteStream(join(uploadsDir, file.originalname));
      writeStream.write(file.buffer);
    }

    // Crea el producto en la base de datos.
    return this.prisma.product.create({
      data: {
        tipo: { connect: { id: Number(tipoId) } },
        color: { connect: { id: Number(colorId) } },
        talla,
        cantidad: Number(cantidad),
        precio: Number(precio),
        fotoUrl: file ? file.originalname : null,
      },
    });
  }

  // Obtiene todos los productos.
  findAll() {
    return this.prisma.product.findMany({
      include: { tipo: true, color: true },
      orderBy: { id: "desc" },
    });
  }

  // Obtiene un producto por su ID.
  async findOne(id: number) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) throw new NotFoundException("Producto no encontrado");
    return product;
  }

  // Actualiza un producto por su ID.
  async update(id: number, dto: UpdateProductDto, file: Express.Multer.File) {
    await this.findOne(id);
    const data: any = { ...dto };
    if (dto.cantidad) data.cantidad = Number(dto.cantidad);
    if (dto.precio) data.precio = Number(dto.precio);
    if (dto.tipoId) data.tipoId = Number(dto.tipoId);
    if (dto.colorId) data.colorId = Number(dto.colorId);

    // Si se proporciona un archivo, lo guarda y actualiza la URL de la foto.
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

  // Elimina un producto por su ID.
  async remove(id: number) {
    const product = await this.findOne(id);
    // Si el producto tiene una foto, la elimina del sistema de archivos.
    if (product && product.fotoUrl && typeof product.fotoUrl === "string") {
      const uploadsDir = join(__dirname, "..", "..", "uploads");
      const path = join(uploadsDir, product.fotoUrl);
      if (existsSync(path)) {
        unlinkSync(path);
      }
    }
    try {
      // Intenta eliminar el producto de la base de datos.
      return await this.prisma.product.delete({ where: { id } });
    } catch (e) {
      // Si hay un error de clave foránea, lanza una excepción personalizada.
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
