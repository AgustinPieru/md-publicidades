#!/usr/bin/env node

/**
 * Script para crear usuarios administradores en MD Publicidades
 * Uso: node create-admin-user.js [email] [password]
 */

const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function createAdmin(email, password) {
  try {
    console.log('🔐 Creando usuario administrador...');
    
    // Verificar si el usuario ya existe
    const existingAdmin = await prisma.admin.findUnique({
      where: { email }
    });
    
    if (existingAdmin) {
      console.log('❌ El usuario ya existe:', email);
      return;
    }
    
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear el usuario
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    
    console.log('✅ Usuario administrador creado exitosamente:');
    console.log('   Email:', admin.email);
    console.log('   ID:', admin.id);
    console.log('   Creado:', admin.createdAt);
    
  } catch (error) {
    console.error('❌ Error al crear usuario:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

async function listAdmins() {
  try {
    console.log('👥 Listando usuarios administradores...');
    
    const admins = await prisma.admin.findMany({
      select: {
        id: true,
        email: true,
        createdAt: true
      }
    });
    
    if (admins.length === 0) {
      console.log('📭 No hay usuarios administradores');
      return;
    }
    
    console.log('📋 Usuarios administradores:');
    admins.forEach(admin => {
      console.log(`   ID: ${admin.id} | Email: ${admin.email} | Creado: ${admin.createdAt}`);
    });
    
  } catch (error) {
    console.error('❌ Error al listar usuarios:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

async function deleteAdmin(email) {
  try {
    console.log('🗑️  Eliminando usuario administrador...');
    
    const admin = await prisma.admin.findUnique({
      where: { email }
    });
    
    if (!admin) {
      console.log('❌ Usuario no encontrado:', email);
      return;
    }
    
    await prisma.admin.delete({
      where: { email }
    });
    
    console.log('✅ Usuario eliminado exitosamente:', email);
    
  } catch (error) {
    console.error('❌ Error al eliminar usuario:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

// Función principal
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  switch (command) {
    case 'create':
      if (args.length < 3) {
        console.log('❌ Uso: node create-admin-user.js create [email] [password]');
        process.exit(1);
      }
      await createAdmin(args[1], args[2]);
      break;
      
    case 'list':
      await listAdmins();
      break;
      
    case 'delete':
      if (args.length < 2) {
        console.log('❌ Uso: node create-admin-user.js delete [email]');
        process.exit(1);
      }
      await deleteAdmin(args[1]);
      break;
      
    default:
      console.log('🔧 Gestión de Usuarios Administradores - MD Publicidades');
      console.log('');
      console.log('Comandos disponibles:');
      console.log('  create [email] [password]  - Crear nuevo usuario admin');
      console.log('  list                       - Listar usuarios admin');
      console.log('  delete [email]             - Eliminar usuario admin');
      console.log('');
      console.log('Ejemplos:');
      console.log('  node create-admin-user.js create admin@mdpublicidades.com admin123');
      console.log('  node create-admin-user.js list');
      console.log('  node create-admin-user.js delete admin@mdpublicidades.com');
      break;
  }
}

main();
