// Importa los decoradores de validación de class-validator.
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
// Importa el enumerador PaymentType del DTO de creación de ventas.
import { PaymentType } from "./create-sale.dto";

// Define el DTO (Data Transfer Object) para actualizar una venta.
export class UpdateSaleDto {
  // Valida que el cliente sea una cadena de texto y sea opcional.
  @IsString()
  @IsOptional()
  cliente?: string;

  // Valida que el ID del producto sea un número entero y sea opcional.
  @IsInt()
  @IsOptional()
  productoId?: number;

  // Valida que la cantidad sea un número entero, como mínimo 1, y sea opcional.
  @IsInt()
  @Min(1)
  @IsOptional()
  cantidad?: number;

  // Valida que la forma de pago sea uno de los valores del enumerador PaymentType y sea opcional.
  @IsEnum(PaymentType)
  @IsOptional()
  formaPago?: PaymentType;
}
