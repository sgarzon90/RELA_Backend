// Importa los módulos necesarios de NestJS.
import { Controller, Get } from '@nestjs/common';
import { ReportsService } from './reports.service';

// Define el controlador para la ruta 'reports'.
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  // Endpoint para obtener un resumen de las ventas.
  @Get('summary')
  getSummary() {
    return this.reportsService.getSummary();
  }

  // Endpoint para obtener los productos más vendidos.
  @Get('top-selling-products')
  getTopSellingProducts() {
    return this.reportsService.getTopSellingProducts();
  }
}
