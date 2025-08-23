// Importa los módulos necesarios de NestJS y Prisma.
import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

// Define el servicio de Prisma, que extiende el cliente de Prisma.
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  // Este método se ejecuta cuando el módulo se inicializa.
  async onModuleInit() {
    // Conecta con la base de datos.
    await this.$connect();
  }
}
