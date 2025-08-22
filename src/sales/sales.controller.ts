import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { SalesService } from "./sales.service";
import { CreateSaleDto } from "./dto/create-sale.dto";
import { UpdateSaleDto } from "src/sales/dto/update-sale.dto";
@Controller("sales")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}
  @Post() create(@Body() dto: CreateSaleDto) {
    return this.salesService.create(dto);
  }
  @Get() findAll(@Query("status") status?: "PENDIENTE" | "PAZ_Y_SALVO") {
    return this.salesService.findAll(status);
  }
  @Get(":id") findOne(@Param("id") id: string) {
    return this.salesService.findOne(+id);
  }
  @Patch(":id") update(@Param("id") id: string, @Body() dto: UpdateSaleDto) {
    return this.salesService.update(+id, dto);
  }
  @Delete(":id") remove(@Param("id") id: string) {
    return this.salesService.remove(+id);
  }
}
