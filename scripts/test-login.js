const axios = require('axios');

async function testLogin() {
  try {
    console.log('🔐 Probando login...');
    
    const response = await axios.post('http://localhost:3001/api/auth/login', {
      email: 'admin@mdpublicidades.com',
      password: 'admin123'
    });
    
    console.log('✅ Login exitoso');
    console.log('📧 Email:', response.data.admin.email);
    console.log('🔑 Token:', response.data.token.substring(0, 20) + '...');
    
    // Probar endpoint protegido
    console.log('\n🔒 Probando endpoint protegido...');
    
    const protectedResponse = await axios.get('http://localhost:3001/api/novedades', {
      headers: {
        'Authorization': `Bearer ${response.data.token}`
      }
    });
    
    console.log('✅ Endpoint protegido funciona');
    console.log('📊 Novedades encontradas:', protectedResponse.data.length);
    
  } catch (error) {
    console.error('❌ Error en el login:', error.response?.data || error.message);
  }
}

testLogin();

