// Importa los módulos necesarios de NestJS y otras bibliotecas.
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express"; // Interceptor para manejar la carga de archivos.
import { ProductsService } from "./products.service"; // Servicio de productos.
import { CreateProductDto } from "src/products/dto/create-product.dto"; // DTO para crear un producto.
import { UpdateProductDto } from "src/products/dto/update-product.dto"; // DTO para actualizar un producto.

// Define el controlador para la ruta 'products'.
@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // Endpoint para crear un nuevo producto.
  @Post()
  @UseInterceptors(FileInterceptor("foto")) // Usa el interceptor para manejar la carga de un archivo llamado 'foto'.
  create(@UploadedFile() file: Express.Multer.File, @Body() dto: CreateProductDto) {
    return this.productsService.create(dto, file);
  }

  // Endpoint para obtener todos los productos.
  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  // Endpoint para obtener un producto por su ID.
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.productsService.findOne(+id);
  }

  // Endpoint para actualizar un producto por su ID.
  @Patch(":id")
  @UseInterceptors(FileInterceptor("foto")) // Usa el interceptor para manejar la carga de un archivo llamado 'foto'.
  update(
    @Param("id") id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, dto, file);
  }

  // Endpoint para eliminar un producto por su ID.
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.productsService.remove(+id);
  }
}
