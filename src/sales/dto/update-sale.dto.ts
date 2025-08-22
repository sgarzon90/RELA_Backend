import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { PaymentType } from "./create-sale.dto";

export class UpdateSaleDto {
  @IsString()
  @IsOptional()
  cliente?: string;

  @IsInt()
  @IsOptional()
  productoId?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  cantidad?: number;

  @IsEnum(PaymentType)
  @IsOptional()
  formaPago?: PaymentType;
}
