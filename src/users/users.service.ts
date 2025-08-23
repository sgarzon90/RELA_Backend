// Importa los módulos necesarios de NestJS y otras bibliotecas.
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Crea un nuevo usuario.
  async create(createUserDto: CreateUserDto) {
    // Hashea la contraseña antes de guardarla en la base de datos.
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    return this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword,
      },
    });
  }

  // Obtiene todos los usuarios.
  findAll() {
    return this.prisma.user.findMany();
  }

  // Obtiene un usuario por su ID.
  findOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  // Actualiza un usuario por su ID.
  async update(id: number, updateUserDto: UpdateUserDto) {
    // Si se proporciona una nueva contraseña, la hashea antes de actualizar.
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  // Elimina un usuario por su ID.
  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
