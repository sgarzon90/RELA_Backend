import { IsEnum, IsInt, IsNotEmpty, IsString, Min } from 'class-validator';
export enum PaymentType { CONTADO = 'CONTADO', CREDITO = 'CREDITO' }
export class CreateSaleDto {
  @IsString() @IsNotEmpty() cliente!: string;
  @IsInt() productoId!: number;
  @IsInt() @Min(1) cantidad!: number;
  @IsEnum(PaymentType) formaPago!: PaymentType;
}