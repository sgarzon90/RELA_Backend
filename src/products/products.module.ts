// Importa los módulos necesarios de NestJS.
import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";

// Define el módulo de productos.
@Module({
  controllers: [ProductsController], // Registra el controlador de productos.
  providers: [ProductsService], // Registra el servicio de productos.
  exports: [ProductsService], // Exporta el servicio de productos para que pueda ser utilizado en otros módulos.
})
export class ProductsModule {}
