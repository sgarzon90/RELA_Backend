// Importa los módulos necesarios de NestJS.
import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';

// Define el controlador para la ruta 'auth'.
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Endpoint para iniciar sesión.
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  // Endpoint para obtener el perfil del usuario autenticado.
  @UseGuards(AuthGuard('jwt')) // Protege la ruta con la estrategia de autenticación JWT.
  @Post('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }
}
