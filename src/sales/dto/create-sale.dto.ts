// Importa los decoradores de validación de class-validator.
import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

// Define un enumerador para los tipos de pago.
export enum PaymentType {
  CONTADO = "CONTADO",
  CREDITO = "CREDITO",
}

// Define el DTO (Data Transfer Object) para crear una venta.
export class CreateSaleDto {
  // Valida que el cliente sea una cadena de texto y no esté vacío.
  @IsString()
  @IsNotEmpty()
  cliente!: string;

  // Valida que el ID del producto sea un número entero.
  @IsInt()
  productoId!: number;

  // Valida que la cantidad sea un número entero y como mínimo 1.
  @IsInt()
  @Min(1)
  cantidad!: number;

  // Valida que la forma de pago sea uno de los valores del enumerador PaymentType.
  @IsEnum(PaymentType)
  formaPago!: PaymentType;
}
