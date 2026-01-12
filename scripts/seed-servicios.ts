import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Inicializando servicios...');

  const servicios = [
    { tipo: 'monocolumnas', nombre: 'Monocolumnas' },
    { tipo: 'pantallas-led', nombre: 'Pantallas LED' },
    { tipo: 'ruteros', nombre: 'Ruteros' },
    { tipo: 'medianeras', nombre: 'Medianeras' },
    { tipo: 'grandes-formatos', nombre: 'Grandes Formatos / Hipervallas' },
    { tipo: 'sextuples', nombre: 'Séxtuples' },
    { tipo: 'marketing-deportivo', nombre: 'Marketing Deportivo' },
    { tipo: 'eventos', nombre: 'Eventos' },
    { tipo: 'rental', nombre: 'Rental' },
  ];

  for (const servicio of servicios) {
    await prisma.servicio.upsert({
      where: { tipo: servicio.tipo },
      update: {},
      create: servicio,
    });
    console.log(`✅ Servicio "${servicio.nombre}" creado/actualizado`);
  }

  console.log('✨ Inicialización completada!');
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
