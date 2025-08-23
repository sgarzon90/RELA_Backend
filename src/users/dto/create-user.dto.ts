// Importa los decoradores de validación de class-validator.
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

// Define el DTO (Data Transfer Object) para crear un usuario.
export class CreateUserDto {
  // Valida que el correo electrónico sea una dirección de correo electrónico válida y no esté vacío.
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  // Valida que la contraseña sea una cadena de texto, no esté vacía y tenga una longitud mínima de 6 caracteres.
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
