import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
export class CreateProductDto {
  @IsString() @IsNotEmpty() tipo!: string;
  @IsString() @IsNotEmpty() color!: string;
  @IsString() @IsNotEmpty() talla!: string;
  @IsInt() @Min(0) cantidad!: number;
  @IsNumber() @Min(0) precio!: number;
}
