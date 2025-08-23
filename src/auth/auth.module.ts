// Importa los módulos necesarios de NestJS.
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaModule } from '../prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

// Define el módulo de autenticación.
@Module({
  imports: [
    PrismaModule, // Importa el módulo de Prisma para la interacción con la base de datos.
    PassportModule, // Importa el módulo de Passport para la autenticación.
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Clave secreta para firmar los tokens JWT.
      signOptions: { expiresIn: '1h' }, // Opciones de firma, como el tiempo de expiración del token.
    }),
  ],
  controllers: [AuthController], // Registra el controlador de autenticación.
  providers: [AuthService, JwtStrategy], // Registra el servicio de autenticación y la estrategia JWT.
})
export class AuthModule {}
