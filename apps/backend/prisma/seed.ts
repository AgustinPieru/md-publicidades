import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Cargar variables de entorno
dotenv.config({ path: path.join(__dirname, '../.env') });

const prisma = new PrismaClient();

const servicios = [
  {
    tipo: 'monocolumnas',
    nombre: 'Monocolumnas',
    descripcion: 'Estructuras publicitarias de gran altura ubicadas estratégicamente',
  },
  {
    tipo: 'pantallas-led',
    nombre: 'Pantallas LED',
    descripcion: 'Más de 350 ubicaciones en todo el país',
  },
  {
    tipo: 'ruteros',
    nombre: 'Ruteros',
    descripcion: 'Más de 250 ubicaciones distribuidas en el país',
  },
  {
    tipo: 'medianeras',
    nombre: 'Medianeras',
    descripcion: 'Gran escala y ubicación estratégica para visibilidad periférica efectiva',
  },
  {
    tipo: 'grandes-formatos',
    nombre: 'Grandes Formatos / Hipervallas',
    descripcion: 'Más de 1.500 ubicaciones en puntos de tráfico intenso',
  },
  {
    tipo: 'sextuples',
    nombre: 'Séxtuples',
    descripcion: 'Soportes en avenidas y zonas de alto tránsito con repetición secuencial',
  },
  {
    tipo: 'marketing-deportivo',
    nombre: 'Marketing Deportivo',
    descripcion: 'Activaciones con presencia en clubes de alcance nacional',
  },
  {
    tipo: 'eventos',
    nombre: 'Eventos',
    descripcion: 'Comercialización de eventos importantes en Rafaela',
  },
  {
    tipo: 'rental',
    nombre: 'Rental',
    descripcion: 'Alquiler de pantallas LED P3 para eventos y publicidad',
  },
];

async function main() {
  console.log('🌱 Iniciando seed de servicios...');

  for (const servicio of servicios) {
    const result = await prisma.servicio.upsert({
      where: { tipo: servicio.tipo },
      update: {
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
      },
      create: {
        tipo: servicio.tipo,
        nombre: servicio.nombre,
        descripcion: servicio.descripcion,
        pdfUrl: null,
      },
    });

    console.log(`✅ Servicio creado/actualizado: ${result.nombre}`);
  }

  console.log('🎉 Seed completado!');
}

main()
  .catch((e) => {
    console.error('❌ Error en seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
