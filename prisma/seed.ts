// Importa los módulos necesarios de Prisma y bcrypt.
import { PrismaClient } from '@prisma/client'; // Cliente de Prisma para interactuar con la base de datos.
import * as bcrypt from 'bcrypt'; // Biblioteca para el hashing de contraseñas.

// Crea una nueva instancia del cliente de Prisma.
const prisma = new PrismaClient();

// Función principal para sembrar la base de datos.
async function main() {
  // Hashea las contraseñas para los usuarios master y admin.
  const masterPassword = await bcrypt.hash('master123', 10);
  const adminPassword = await bcrypt.hash('admin123', 10);

  // Crea o actualiza el usuario master.
  await prisma.user.upsert({
    where: { email: 'master@example.com' }, // Busca al usuario por su correo electrónico.
    update: {}, // No realiza ninguna actualización si el usuario ya existe.
    create: {
      email: 'master@example.com',
      password: masterPassword,
      role: 'master', // Asigna el rol de 'master'.
    },
  });

  // Crea o actualiza el usuario admin.
  await prisma.user.upsert({
    where: { email: 'admin@example.com' }, // Busca al usuario por su correo electrónico.
    update: {}, // No realiza ninguna actualización si el usuario ya existe.
    create: {
      email: 'admin@example.com',
      password: adminPassword,
      role: 'admin', // Asigna el rol de 'admin'.
    },
  });
}

// Ejecuta la función principal y maneja los errores.
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // Se desconecta de la base de datos al finalizar.
    await prisma.$disconnect();
  });
