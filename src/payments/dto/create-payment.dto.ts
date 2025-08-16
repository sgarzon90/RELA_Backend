import { IsInt, IsNumber, Min } from 'class-validator';
export class CreatePaymentDto { @IsInt() saleId!: number; @IsNumber() @Min(0.01) monto!: number; }