const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    console.log('🔐 Creando usuario admin...');
    
    const email = process.env.ADMIN_EMAIL || 'admin@mdpublicidades.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    
    // Verificar si ya existe un admin
    const existingAdmin = await prisma.admin.findUnique({
      where: { email }
    });
    
    if (existingAdmin) {
      console.log('⚠️  El usuario admin ya existe');
      console.log(`📧 Email: ${email}`);
      return;
    }
    
    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Crear el admin
    const admin = await prisma.admin.create({
      data: {
        email,
        password: hashedPassword
      }
    });
    
    console.log('✅ Usuario admin creado exitosamente');
    console.log(`📧 Email: ${email}`);
    console.log(`🔑 Password: ${password}`);
    console.log('');
    console.log('🌐 Ahora puedes iniciar sesión en:');
    console.log('   http://localhost:3000/admin/login');
    
  } catch (error) {
    console.error('❌ Error al crear usuario admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();

