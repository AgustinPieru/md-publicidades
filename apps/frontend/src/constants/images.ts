/**
 * Constantes para las rutas de imágenes locales
 * Las imágenes deben estar almacenadas en public/images/
 */

export const images = {
  // Logo de la empresa
  logo: '/images/logo.png',
  
  // Logo horizontal para Footer
  logoHorizontal: '/images/logo-horizontal.png',
  
  // Imagen de portada (Home)
  cover: '/images/cover.jpg',
  
  // Imagen sobre nosotros (About)
  about: '/images/about.jpeg',
  
  // Imagen del fundador (About)
  founder: 'https://i.pravatar.cc/400?img=12', // Imagen de test - Reemplazar con imagen real
  
  // Imágenes del equipo (About) - Imágenes de test - Reemplazar con imágenes reales
  team: {
    marcelo: 'https://i.pravatar.cc/300?img=33',
    marina: 'https://i.pravatar.cc/300?img=47',
    angelina: 'https://i.pravatar.cc/300?img=32',
    paula: 'https://i.pravatar.cc/300?img=45',
    carolina: 'https://i.pravatar.cc/300?img=28',
    liliana: 'https://i.pravatar.cc/300?img=51',
    gaston: 'https://i.pravatar.cc/300?img=20',
  },
  
  // Imágenes de servicios (Services) - Solo para OOH / Vía Pública
  services: {
    led: [
      '/images/led-1.png',
    ],
    monocolumnas: [
      '/images/monocolumnas-1.jpg',
    ],
    ruteros: [
      '/images/ruteros-1.jpg',
    ],
  },
  
  // Logos de clientes (para el carrusel)
  // Usando logos de placeholder para pruebas - Reemplazar con logos reales cuando estén disponibles
  clients: [
    'https://logo.clearbit.com/coca-cola.com',
    'https://logo.clearbit.com/microsoft.com',
    'https://logo.clearbit.com/apple.com',
    'https://logo.clearbit.com/google.com',
    'https://logo.clearbit.com/amazon.com',
    'https://logo.clearbit.com/nike.com',
    'https://logo.clearbit.com/adidas.com',
    'https://logo.clearbit.com/pepsi.com',
  ],
} as const;

