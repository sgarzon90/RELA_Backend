// Importa el tipo PartialType de @nestjs/mapped-types.
import { PartialType } from "@nestjs/mapped-types";
// Importa el DTO de creación de productos.
import { CreateProductDto } from "./create-product.dto";

// Define el DTO para actualizar un producto, que hereda del DTO de creación pero hace todas las propiedades opcionales.
export class UpdateProductDto extends PartialType(CreateProductDto) {}
