import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { SalesService } from "./sales.service";
import { CreateSaleDto } from "./dto/create-sale.dto";
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
}
