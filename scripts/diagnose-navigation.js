// Script para diagnosticar problemas de navegación
const axios = require('axios');

async function diagnoseNavigation() {
  console.log('🔍 Diagnosticando problemas de navegación...\n');
  
  try {
    // 1. Verificar que el backend esté funcionando
    console.log('1️⃣ Verificando backend...');
    const healthResponse = await axios.get('http://localhost:3001/health');
    console.log('✅ Backend health check:', healthResponse.data);
    
    // 2. Probar login
    console.log('\n2️⃣ Probando login...');
    const loginResponse = await axios.post('http://localhost:3001/api/auth/login', {
      email: 'admin@mdpublicidades.com',
      password: 'admin123'
    });
    console.log('✅ Login exitoso');
    console.log('📧 Email:', loginResponse.data.admin.email);
    console.log('🔑 Token:', loginResponse.data.token.substring(0, 30) + '...');
    
    // 3. Probar endpoint protegido
    console.log('\n3️⃣ Probando endpoint protegido...');
    const novedadesResponse = await axios.get('http://localhost:3001/api/novedades', {
      headers: {
        'Authorization': `Bearer ${loginResponse.data.token}`
      }
    });
    console.log('✅ Endpoint protegido funciona');
    console.log('📊 Novedades encontradas:', novedadesResponse.data.length);
    
    // 4. Verificar frontend
    console.log('\n4️⃣ Verificando frontend...');
    try {
      const frontendResponse = await axios.get('http://localhost:3000');
      console.log('✅ Frontend responde');
    } catch (error) {
      console.log('❌ Frontend no responde:', error.message);
    }
    
    console.log('\n🎯 Diagnóstico completado');
    console.log('\n📋 Pasos para solucionar:');
    console.log('1. Ve a: http://localhost:3000/admin/login');
    console.log('2. Usa las credenciales: admin@mdpublicidades.com / admin123');
    console.log('3. Después del login, ve a: http://localhost:3000/admin/novedades/nueva');
    
  } catch (error) {
    console.error('❌ Error en el diagnóstico:', error.message);
  }
}

diagnoseNavigation();

