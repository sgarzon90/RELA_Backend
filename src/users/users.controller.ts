// Importa los módulos necesarios de NestJS.
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';

// Protege todas las rutas de este controlador con la estrategia de autenticación JWT.
@UseGuards(AuthGuard('jwt'))
// Define el controlador para la ruta 'users'.
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Endpoint para crear un nuevo usuario.
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // Endpoint para obtener todos los usuarios.
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  // Endpoint para obtener un usuario por su ID.
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  // Endpoint para actualizar un usuario por su ID.
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  // Endpoint para eliminar un usuario por su ID.
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
