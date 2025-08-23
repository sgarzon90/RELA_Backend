// Importa los módulos necesarios de NestJS y otras bibliotecas.
import { Injectable, UnauthorizedException } from '@nestjs/common'; // Injectable para la inyección de dependencias y UnauthorizedException para manejar errores de autenticación.
import { PrismaService } from 'src/prisma/prisma.service'; // Servicio de Prisma para interactuar con la base de datos.
import { JwtService } from '@nestjs/jwt'; // Servicio de JWT para manejar los tokens.
import * as bcrypt from 'bcrypt'; // Biblioteca para el hashing de contraseñas.

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, // Inyecta el servicio de Prisma.
    private jwtService: JwtService, // Inyecta el servicio de JWT.
  ) {}

  // Valida las credenciales del usuario.
  async validateUser(email: string, pass: string): Promise<any> {
    // Busca un usuario por su correo electrónico.
    const user = await this.prisma.user.findUnique({ where: { email } });
    // Si el usuario existe y la contraseña es correcta, devuelve el usuario sin la contraseña.
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    // Si las credenciales no son válidas, devuelve nulo.
    return null;
  }

  // Inicia sesión del usuario y genera un token de acceso.
  async login(email: string, pass: string) {
    // Valida al usuario.
    const user = await this.validateUser(email, pass);
    // Si el usuario no es válido, lanza una excepción de no autorizado.
    if (!user) {
      throw new UnauthorizedException();
    }
    // Crea el payload para el token JWT, incluyendo el rol del usuario.
    const payload = { email: user.email, sub: user.id, role: user.role };
    // Devuelve el token de acceso firmado.
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
