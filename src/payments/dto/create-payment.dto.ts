// Importa los decoradores de validación de class-validator.
import { IsInt, IsNumber, Min } from 'class-validator';

// Define el DTO (Data Transfer Object) para crear un pago.
export class CreatePaymentDto {
  // Valida que el ID de la venta sea un número entero.
  @IsInt()
  saleId!: number;

  // Valida que el monto sea un número y como mínimo 0.01.
  @IsNumber()
  @Min(0.01)
  monto!: number;
}
