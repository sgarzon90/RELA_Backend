// Importa los decoradores de validación de class-validator.
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

// Define el DTO (Data Transfer Object) para actualizar un usuario.
export class UpdateUserDto {
  // Valida que el correo electrónico sea una dirección de correo electrónico válida y sea opcional.
  @IsEmail()
  @IsOptional()
  email?: string;

  // Valida que la contraseña sea una cadena de texto, tenga una longitud mínima de 6 caracteres y sea opcional.
  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;
}
