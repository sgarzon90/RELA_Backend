import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttributesService {
  constructor(private prisma: PrismaService) {}

  createTipo(nombre: string) {
    return this.prisma.tipo.create({ data: { nombre } });
  }

  findAllTipos() {
    return this.prisma.tipo.findMany();
  }

  removeTipo(id: number) {
    return this.prisma.tipo.delete({ where: { id } });
  }

  updateTipo(id: number, nombre: string) {
    return this.prisma.tipo.update({ where: { id }, data: { nombre } });
  }

  createColor(nombre: string) {
    return this.prisma.color.create({ data: { nombre } });
  }

  findAllColors() {
    return this.prisma.color.findMany();
  }

  removeColor(id: number) {
    return this.prisma.color.delete({ where: { id } });
  }

  updateColor(id: number, nombre: string) {
    return this.prisma.color.update({ where: { id }, data: { nombre } });
  }
}
