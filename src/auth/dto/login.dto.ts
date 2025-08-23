// Importa los decoradores de validación de class-validator.
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// Define el DTO (Data Transfer Object) para el inicio de sesión.
export class LoginDto {
  // Valida que el correo electrónico sea una dirección de correo electrónico válida y no esté vacío.
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  // Valida que la contraseña sea una cadena de texto y no esté vacía.
  @IsString()
  @IsNotEmpty()
  password!: string;
}
