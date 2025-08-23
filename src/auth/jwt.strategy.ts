// Importa los módulos necesarios de NestJS y Passport.
import { Injectable } from '@nestjs/common'; // Injectable para la inyección de dependencias.
import { PassportStrategy } from '@nestjs/passport'; // Módulo de Passport para NestJS.
import { ExtractJwt, Strategy } from 'passport-jwt'; // Clases para la estrategia de JWT.

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // Extrae el token del encabezado de autorización como un token Bearer.
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // No ignora la expiración del token.
      ignoreExpiration: false,
      // Clave secreta para verificar la firma del token.
      secretOrKey: process.env.JWT_SECRET || 'your-secret-key',
    });
  }

  // Valida el payload del token.
  async validate(payload: any) {
    // Devuelve un objeto con el ID del usuario, el correo electrónico y el rol.
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}
