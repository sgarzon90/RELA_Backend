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
import { put, del } from "@vercel/blob";

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  // Crea un nuevo producto.
  async create(dto: CreateProductDto, file: Express.Multer.File) {
    const { tipoId, colorId, talla, cantidad, precio } = dto;
    let fotoUrl = null;

    // Guarda el archivo en Vercel Blob si se proporciona uno.
    if (file) {
      const blob = await put(file.originalname, file.buffer, {
        access: "public",
      });
      fotoUrl = blob.url;
    }

    // Crea el producto en la base de datos.
    return this.prisma.product.create({
      data: {
        tipo: { connect: { id: Number(tipoId) } },
        color: { connect: { id: Number(colorId) } },
        talla,
        cantidad: Number(cantidad),
        precio: Number(precio),
        fotoUrl,
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
    const product = await this.findOne(id);
    const data: any = { ...dto };
    if (dto.cantidad) data.cantidad = Number(dto.cantidad);
    if (dto.precio) data.precio = Number(dto.precio);
    if (dto.tipoId) data.tipoId = Number(dto.tipoId);
    if (dto.colorId) data.colorId = Number(dto.colorId);

    // Si se proporciona un archivo, lo guarda y actualiza la URL de la foto.
    if (file) {
      if (product.fotoUrl) {
        await del(product.fotoUrl);
      }
      const blob = await put(file.originalname, file.buffer, {
        access: "public",
      });
      data.fotoUrl = blob.url;
    }

    return this.prisma.product.update({ where: { id }, data });
  }

  // Elimina un producto por su ID.
  async remove(id: number) {
    const product = await this.findOne(id);
    // Si el producto tiene una foto, la elimina de Vercel Blob.
    if (product && product.fotoUrl) {
      await del(product.fotoUrl);
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
