// Importa los módulos necesarios de NestJS.
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

// Define el controlador para la ruta 'sales'.
@Controller("sales")
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  // Endpoint para crear una nueva venta.
  @Post()
  create(@Body() dto: CreateSaleDto) {
    return this.salesService.create(dto);
  }

  // Endpoint para obtener todas las ventas, con un filtro opcional por estado.
  @Get()
  findAll(@Query("status") status?: "PENDIENTE" | "PAZ_Y_SALVO") {
    return this.salesService.findAll(status);
  }

  // Endpoint para obtener una venta por su ID.
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.salesService.findOne(+id);
  }

  // Endpoint para actualizar una venta por su ID.
  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateSaleDto) {
    return this.salesService.update(+id, dto);
  }

  // Endpoint para eliminar una venta por su ID.
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.salesService.remove(+id);
  }
}
