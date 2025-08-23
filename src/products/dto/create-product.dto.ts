// Importa los decoradores de validación y transformación de class-validator y class-transformer.
import { Transform } from "class-transformer";
import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from "class-validator";

// Define el DTO (Data Transfer Object) para crear un producto.
export class CreateProductDto {
  // Valida que el tipo sea una cadena de texto y no esté vacío.
  @Transform(({ value }) => Number(value))
  @IsInt()
  tipoId!: number;

  // Valida que el color sea una cadena de texto y no esté vacío.
  @Transform(({ value }) => Number(value))
  @IsInt()
  colorId!: number;

  // Valida que la talla sea una cadena de texto y no esté vacía.
  @IsString()
  @IsNotEmpty()
  talla!: string;

  // Transforma el valor a número y valida que sea un entero no negativo.
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Min(0)
  cantidad!: number;

  // Transforma el valor a número y valida que sea un número con hasta 2 decimales y no negativo.
  @Transform(({ value }) => Number(value))
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  precio!: number;

  // Valida que la URL de la foto sea opcional y una URL válida si se proporciona.
  @IsOptional()
  @IsUrl({}, { message: "La foto debe ser una URL válida" })
  fotoUrl?: string;
}
