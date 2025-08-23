import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AttributesService } from './attributes.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from '../auth/guards/role.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('attributes')
export class AttributesController {
  constructor(private readonly attributesService: AttributesService) {}

  @Post('tipo')
  @Roles('master')
  createTipo(@Body('nombre') nombre: string) {
    return this.attributesService.createTipo(nombre);
  }

  @Get('tipo')
  findAllTipos() {
    return this.attributesService.findAllTipos();
  }

  @Delete('tipo/:id')
  @Roles('master')
  removeTipo(@Param('id') id: string) {
    return this.attributesService.removeTipo(+id);
  }

  @Patch('tipo/:id')
  @Roles('master')
  updateTipo(@Param('id') id: string, @Body('nombre') nombre: string) {
    return this.attributesService.updateTipo(+id, nombre);
  }

  @Post('color')
  @Roles('master')
  createColor(@Body('nombre') nombre: string) {
    return this.attributesService.createColor(nombre);
  }

  @Get('color')
  findAllColors() {
    return this.attributesService.findAllColors();
  }

  @Delete('color/:id')
  @Roles('master')
  removeColor(@Param('id') id: string) {
    return this.attributesService.removeColor(+id);
  }

  @Patch('color/:id')
  @Roles('master')
  updateColor(@Param('id') id: string, @Body('nombre') nombre: string) {
    return this.attributesService.updateColor(+id, nombre);
  }
}
